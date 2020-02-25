import { AUDIO_FILES } from './const.js';
import { SoundManager } from './sound-manager.js';

export default class Sounds {
    constructor(opts) {
        this.files = {};

        AUDIO_FILES.forEach((id) => {
            this.files[id] = `audio/${id}.mp3`;
        });

        this.manager = new SoundManager({
            loop : false,
            muted : opts.muted,
            players : this.files,
            playFromStart : true,
            single : true
        });
    }

    pause() {
        this.manager.pause();
    }

    play(id) {
        if (this.manager.hasPlayer(id)) {
            const player = this.manager.play(id);
            return player;
        } else {
            console.log('Sound does not exist', id);
        }
    }

    setMuted(bool) {
        this.manager.muted = bool;
    }
}