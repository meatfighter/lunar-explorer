export function requestFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then().catch();
    }
}

export function exitFullscreen() {
    document.exitFullscreen().then().catch();
}