import { DEFAULT_SCREEN } from './const.js';

export function parseHash() {
    const hash = window.location.hash.slice(1);

    if (!!hash) {
        hash.split(',').map((action) => {
            const [key, val] = action.split('=');

            // This is not how it should be, but i don't know
            // about another way for checking if a mutation or
            // action exists
            if (key in this.$store._mutations) {
                this.$store.commit(key, val);
            } else if (key in this.$store._actions) {
                this.$store.dispatch(key, val);
            } else {
                console.error(`Unknown action or mutation: ${key}`);
            }
        });
    } else {
        // Why not put the default state in store.js?
        // If the first screen is *not* the splash screen we'll
        // be getting errors, so we fix it this way
        this.$store.commit('screen', DEFAULT_SCREEN);
    }
}