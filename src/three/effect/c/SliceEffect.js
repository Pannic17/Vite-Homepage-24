import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {SliceShader} from "../../shader/SliceShader";
import {fade} from "../../utils";

export class SliceEffect {
    time = 0;
    constructor (composer, max, fadeTP) {
        this.composer = composer;
        this.max = max;
        this.fadeTP = fadeTP;

        const effectSlice = new ShaderPass( SliceShader );
        effectSlice.uniforms[ 'push1' ].value = 0.0;
        effectSlice.uniforms[ 'push2' ].value = 0.0;
        effectSlice.uniforms[ 'rand1' ].value = Math.random();
        effectSlice.uniforms[ 'rand2' ].value = Math.random();
        this.pass = effectSlice;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/dClap.wav';
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
                this.pass.uniforms[ 'push1' ].value = curve * 2;
                this.pass.uniforms[ 'push2' ].value = curve;
            } else if (this.time == this.fadeTP + 1) {
                this.pass.uniforms[ 'push1' ].value = 2.0;
                this.pass.uniforms[ 'push2' ].value = 1.0;
            }
            this.time += 1;
        }
    }
}