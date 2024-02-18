import {AfterimagePass} from "three/examples/jsm/postprocessing/AfterimagePass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {MaskShader} from "../../shader/MaskShader";

export class AfterEffect {
    time = 0;
    constructor (composer, max) {
        this.composer = composer;
        this.max = max;

        this.mask = new ShaderPass( MaskShader );
        this.pass = new AfterimagePass();
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aT1.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.composer.addPass(this.pass);
        this.composer.addPass(this.mask);
    }

    end() {
        this.composer.removePass(this.pass);
        this.composer.removePass(this.mask);
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            this.time += 1;
        }
    }
}