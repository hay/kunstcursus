export function formatMs(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}

export function timeout(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}