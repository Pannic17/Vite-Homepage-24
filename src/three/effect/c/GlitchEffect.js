import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {GlitchShader} from "../../shader/GlitchShader";
import {MaskShader} from "../../shader/MaskShader";

export class GlitchEffect {
    time = 0;
    constructor (composer, max) {
        this.composer = composer;
        this.max = max;

        this.pass = new ShaderPass( GlitchShader );
        this.mask = new ShaderPass( MaskShader );
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/dF5.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.pass.uniforms[ 'amount' ].value = Math.random() * 0.1 + 0.2;
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
            this.pass.uniforms[ 'iTime' ].value = this.time;
            this.time += 1;
        }
    }
}