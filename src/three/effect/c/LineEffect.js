import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {LineShader} from "../../shader/LineShader";
import {fade} from "../../utils";

export class LineEffect {
    time = 0;
    constructor (composer, max, width, height) {
        this.composer = composer;
        this.max = max;
        this.size = 15;

        const effectLine = new ShaderPass( LineShader );
        effectLine.uniforms[ 'width' ].value = width;
        effectLine.uniforms[ 'height' ].value = height;
        this.pass = effectLine;
    }

    add(size) {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aS2.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.size = Math.random() * 10 + 10;
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
            if (this.time < 20) {
                let curve = fade(this.time/20);
                this.pass.uniforms[ 'size' ].value = this.size + 3 - curve * 3;
            } else if (this.time == 10) {
                this.pass.uniforms[ 'size' ].value = this.size;
            }
            this.time += 1;
        }
    }
}