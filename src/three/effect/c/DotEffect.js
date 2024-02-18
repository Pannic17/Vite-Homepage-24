import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {DotShader} from "../../shader/DotShader";
import {fade} from "../../utils";
import {effect} from "vue";

export class DotEffect {
    time = 0;
    constructor (composer, max) {
        this.composer = composer;
        this.size = 3;
        this.max = max;
        const DotPass = new ShaderPass( DotShader );
        DotPass.uniforms[ 'scale' ].value = 3;
        DotPass.uniforms[ 'angle' ].value = 0;
        this.pass = DotPass;
    }

    add(size) {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aCrash.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.size = Math.random() * 2 + 2;
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
            if (this.time < 10) {
                let curve = fade(this.time/10);
                this.pass.uniforms[ 'scale' ].value = this.size + 1 - curve;
            } else if (this.time == 10) {
                this.pass.uniforms[ 'scale' ].value = this.size;
            }
            this.time += 1;
        }
    }
}