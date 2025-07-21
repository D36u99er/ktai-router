import { spawn } from "child_process";
import {
  incrementReferenceCount,
  decrementReferenceCount,
} from "./processCheck";
import { closeService } from "./close";
import { readConfigFile } from ".";
import { t } from '../i18n';

export async function executeCodeCommand(args: string[] = []) {
  // Set environment variables
  const config = await readConfigFile();
  const env = {
    ...process.env,
    ANTHROPIC_AUTH_TOKEN: "test",
    ANTHROPIC_BASE_URL: `http://127.0.0.1:${config.PORT || 3456}`,
    API_TIMEOUT_MS: "600000",
  };

  if (config?.APIKEY) {
    env.ANTHROPIC_API_KEY = config.APIKEY;
    delete env.ANTHROPIC_AUTH_TOKEN;
  }

  // Increment reference count when command starts
  incrementReferenceCount();

  // Execute claude command
  const claudePath = process.env.CLAUDE_PATH || "claude";
  const claudeProcess = spawn(claudePath, args, {
    env,
    stdio: "inherit",
    shell: true,
  });

  claudeProcess.on("error", (error) => {
    console.error(t('codeCommand.errors.failedToStart'), error.message);
    console.log(t('codeCommand.errors.installHint'));
    decrementReferenceCount();
    process.exit(1);
  });

  claudeProcess.on("close", (code) => {
    decrementReferenceCount();
    closeService();
    process.exit(code || 0);
  });
}
