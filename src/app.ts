import { init as initGame, enter as enterGame, exit as exitGame } from "./game";
import { enter as enterStart, exit as exitStart } from "./start";


async function init() {
    window.addEventListener('error', e => {
        console.error(`Caught in global handler: ${e.message}`, { // TODO REMOVE THIS
            source: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });

        e.preventDefault();
        // TODO SHOW DEATH SCREEN
    });
    window.addEventListener('unhandledrejection', e => e.preventDefault());
    document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

    // await initGame();
    // enterGame();

    enterStart();
}

document.addEventListener('DOMContentLoaded', init);