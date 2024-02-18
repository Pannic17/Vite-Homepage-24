import {RenderPixelatedPass} from "three/examples/jsm/postprocessing/RenderPixelatedPass";
import {fade} from "../../utils";

export class PixelEffect {
    time = 0;
    constructor (composer, max, scene, camera, fadeTP) {
        this.composer = composer;
        this.max = max;
        // this.size = size;

        this.pass = new RenderPixelatedPass (32, scene, camera);
        this.fadeTP = fadeTP;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/cCrash.wav';
        // audio.volume = 0.5;audio.play();
        this.time = 0;
        this.size = Math.random() * 16 + 32;
        this.composer.addPass(this.pass);
    }

    end() {
        this.composer.removePass(this.pass);
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            if (this.time < this.fadeTP) {
                let curve = fade(this.time/this.fadeTP) * this.fadeTP;
                this.pass.pixelSize = Math.floor(curve);
            } else if (this.time == this.fadeTP) {
                this.pass.pixelSize = this.size;
            }
            this.time += 1;
        }
    }
}