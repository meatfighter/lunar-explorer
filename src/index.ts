export function init() {
    (document.getElementById('playButton') as HTMLButtonElement).addEventListener('click',
        _ => window.location.href = 'pwa/pwa.html');
}

document.addEventListener('DOMContentLoaded', init);