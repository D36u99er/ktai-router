#!/usr/bin/env node
import { run } from "./index";
import { showStatus } from "./utils/status";
import { executeCodeCommand } from "./utils/codeCommand";
import { cleanupPidFile, isServiceRunning } from "./utils/processCheck";
import { version } from "../package.json";
import { spawn } from "child_process";
import { PID_FILE, REFERENCE_COUNT_FILE } from "./constants";
import fs, { existsSync, readFileSync } from "fs";
import {join} from "path";
import i18n, { t } from "./i18n";

const command = process.argv[2];

const getHelpText = () => `${t('cli.help.usage')}

${t('cli.help.description')}

${t('cli.help.commands.title')}
${t('cli.help.commands.start')}
${t('cli.help.commands.stop')}
${t('cli.help.commands.status')}
${t('cli.help.commands.restart')}
${t('cli.help.commands.proxy')}
${t('cli.help.commands.default')}

${t('cli.help.options.title')}
${t('cli.help.options.version')}
${t('cli.help.options.help')}

Example:
  ccr start
  ccr status
`;

async function waitForService(
  timeout = 10000,
  initialDelay = 1000
): Promise<boolean> {
  // Wait for an initial period to let the service initialize
  await new Promise((resolve) => setTimeout(resolve, initialDelay));

  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (isServiceRunning()) {
      // Wait for an additional short period to ensure service is fully ready
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return false;
}

async function main() {
  switch (command) {
    case "start":
      run();
      break;
    case "stop":
      try {
        const pid = parseInt(readFileSync(PID_FILE, "utf-8"));
        process.kill(pid);
        cleanupPidFile();
        if (existsSync(REFERENCE_COUNT_FILE)) {
          try {
            fs.unlinkSync(REFERENCE_COUNT_FILE);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        console.log(t('cli.messages.stopSuccess'));
      } catch (e) {
        console.log(t('cli.messages.stopFailed'));
        cleanupPidFile();
      }
      break;
    case "status":
      await showStatus();
      break;
    case "code":
      if (!isServiceRunning()) {
        console.log(t('cli.messages.serviceNotRunning'));
        const cliPath = join(__dirname, "cli.js");
        const startProcess = spawn("node", [cliPath, "start"], {
          detached: true,
          stdio: "ignore",
        });

        startProcess.on("error", (error) => {
          console.error(t('cli.messages.startFailed'), error);
          process.exit(1);
        });

        startProcess.unref();

        if (await waitForService()) {
          executeCodeCommand(process.argv.slice(3));
        } else {
          console.error(t('cli.messages.startupTimeout'));
          process.exit(1);
        }
      } else {
        executeCodeCommand(process.argv.slice(3));
      }
      break;
    case "-v":
    case "version":
      console.log(`claude-code-router version: ${version}`);
      break;
    case "-h":
    case "help":
      console.log(getHelpText());
      break;
    default:
      console.log(getHelpText());
      process.exit(1);
  }
}

main().catch(console.error);
