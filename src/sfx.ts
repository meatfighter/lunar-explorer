const audioContext = new AudioContext();

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    } else if (document.visibilityState === 'hidden') {
        if (audioContext.state === 'running') {
            audioContext.suspend();
        }
    }
});

const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);
masterGain.gain.value = 0.1;

const promises: Promise<Map<string, AudioBuffer>>[] = [];

const audioBuffers = new Map<string, AudioBuffer>();

export function getVolume() {
    return 100 * masterGain.gain.value;
}

export function setVolume(volume: number) {
    masterGain.gain.value = volume / 100;
}

export function decodeAudioData(name: string, data: ArrayBuffer) {
    promises.push(audioContext.decodeAudioData(data).then(buffer => audioBuffers.set(name, buffer)));
}

export async function waitForDecodes() {
    await Promise.all(promises);
    promises.length = 0;
}

export function playSoundEffect(name: string) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers.get(name) as AudioBuffer;
    source.connect(masterGain);
    source.start();
}