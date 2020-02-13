export function formatMs(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}