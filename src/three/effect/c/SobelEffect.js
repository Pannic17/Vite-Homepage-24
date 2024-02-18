import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {SobelShader} from "../../shader/SobelShader";
import {fade} from "../../utils";

export class SobelEffect {
    time = 0;
    constructor (composer, max, width, height, fadeTP) {
        this.composer = composer;
        this.max = max;
        this.fadeTP = fadeTP;

        const effectSobel = new ShaderPass( SobelShader );
        effectSobel.uniforms[ 'width' ].value = width;
        effectSobel.uniforms[ 'height' ].value = height;
        this.pass = effectSobel;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aRide.wav';
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
            if (this.time <= this.fadeTP) {
                let curve = fade(this.time/this.fadeTP);
                this.pass.uniforms[ 'amount' ].value = (1 - curve);
            } else if (this.time == this.fadeTP + 1) {
                this.pass.uniforms[ 'amount' ].value = 0.0;
            }
            this.time += 1;
        }
    }
}