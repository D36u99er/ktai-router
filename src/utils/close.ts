import { isServiceRunning, cleanupPidFile, getReferenceCount } from './processCheck';
import { readFileSync } from 'fs';
import { HOME_DIR } from '../constants';
import { join } from 'path';
import { t } from '../i18n';

export async function closeService() {
    const PID_FILE = join(HOME_DIR, '.claude-code-router.pid');
    
    if (!isServiceRunning()) {
        console.log(t('close.noService'));
        return;
    }

    if (getReferenceCount() > 0) {
        return;
    }

    try {
        const pid = parseInt(readFileSync(PID_FILE, 'utf-8'));
        process.kill(pid);
        cleanupPidFile();
        console.log(t('close.success'));
    } catch (e) {
        console.log(t('close.failed'));
        cleanupPidFile();
    }
}
