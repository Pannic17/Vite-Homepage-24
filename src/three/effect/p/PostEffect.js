import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {DotScreenShader} from "three/examples/jsm/shaders/DotScreenShader";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader";
import {fade} from "../../utils";

export class PostEffect {
    time = 0;
    constructor (composer, max, fadeTP) {
        this.composer = composer;
        this.max = max;
        this.size = 4
        this.fadeTP = fadeTP;

        const pass1 = new ShaderPass( DotScreenShader );
        pass1.uniforms[ 'scale' ].value = this.size;
        this.p1 = pass1;
        const pass2 = new ShaderPass( RGBShiftShader );
        pass2.uniforms[ 'amount' ].value = 0.0015;
        this.p2 = pass2;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/sF6.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.size = 2 + Math.random();
        this.composer.addPass(this.p1);
        this.composer.addPass(this.p2);
    }

    end() {
        this.composer.removePass(this.p1);
        this.composer.removePass(this.p2);
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            if (this.time < this.fadeTP) {
                let curve = fade(this.time/this.fadeTP);
                this.p1.uniforms[ 'scale' ].value = this.size + 1 - curve;
            } else if (this.time == this.fadeTP) {
                this.p1.uniforms[ 'scale' ].value = this.size;
            }
            this.time += 1;
        }
    }
}