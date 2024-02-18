export function init() {
    (document.getElementById('playButton') as HTMLButtonElement).addEventListener('click',
        _ => window.location.href = 'app/app.html');
}

document.addEventListener('DOMContentLoaded', init);