import '@testing-library/jest-dom'

// jsdom does not implement media playback; stub it so components/hooks using
// HTMLAudioElement don't throw "not implemented" errors during tests.
window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined)
window.HTMLMediaElement.prototype.pause = jest.fn()
window.HTMLMediaElement.prototype.load = jest.fn()
