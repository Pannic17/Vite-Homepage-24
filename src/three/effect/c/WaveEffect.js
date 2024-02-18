import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {fade} from "../../utils";
import {WaveShader} from "../../shader/WaveShader";

export class WaveEffect {
    time = 0;
    constructor (composer, max) {
        this.composer = composer;
        this.max = max;

        const effectWave = new ShaderPass( WaveShader );
        this.pass = effectWave;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/sPerc.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
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
            this.pass.uniforms[ 'time' ].value = 2 * this.time / this.max;
            this.time += 1;
        }
    }
}