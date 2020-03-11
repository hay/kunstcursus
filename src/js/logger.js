import { Tracker } from './tracker.js';

const tracker = new Tracker({
    log : window.location.href.includes('debug'),
    trackerName : 'gtm1'
});

export function vuexPlugin(store) {
    store.subscribe((m) => {
        tracker.track(m.type, m.payload);
    });
}