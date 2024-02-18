import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader";
import {fade} from "../../utils";

export class ShiftEffect {
    time = 0;
    constructor (composer, max, amount, fadeTP) {
        this.composer = composer;
        this.max = max;
        this.amount = amount;
        this.fadeTP = fadeTP;
        const shiftPass = new ShaderPass( RGBShiftShader );
        shiftPass.uniforms[ 'amount' ].value = amount;
        this.pass = shiftPass;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aHiHat.wav';
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
                let curve = fade(this.time/this.fadeTP) * (this.amount - 0.005);
                this.pass.uniforms[ 'amount' ].value = curve + 0.005;
            } else if (this.time == this.fadeTP + 1) {
                this.pass.uniforms[ 'amount' ].value = this.amount;
            }
            this.time += 1;
        }
    }
}