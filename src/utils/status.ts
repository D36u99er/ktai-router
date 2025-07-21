import { getServiceInfo } from './processCheck';
import { t } from '../i18n';

export async function showStatus() {
    const info = await getServiceInfo();
    
    console.log('\n' + t('status.title'));
    console.log('═'.repeat(40));
    
    if (info.running) {
        console.log(t('status.running.status'));
        console.log(t('status.running.pid') + ` ${info.pid}`);
        console.log(t('status.running.port') + ` ${info.port}`);
        console.log(t('status.running.endpoint') + ` ${info.endpoint}`);
        console.log(t('status.running.pidFile') + ` ${info.pidFile}`);
        console.log('');
        console.log(t('status.running.ready'));
        console.log(`   ccr code    # ${t('status.running.claudeCommand')}`);
        console.log('   ccr stop   # Stop the service');
    } else {
        console.log(t('status.notRunning.status'));
        console.log('');
        console.log(t('status.notRunning.hint'));
        console.log('   ccr start');
    }
    
    console.log('');
}
