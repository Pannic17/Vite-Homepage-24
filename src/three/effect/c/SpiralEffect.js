import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {SpiralShader} from "../../shader/SpiralShader";

export class SpiralEffect {
    time = 0;
    constructor (composer, max, width, height) {
        this.composer = composer;
        this.max = max;

        const spiralPass = new ShaderPass( SpiralShader );
        spiralPass.uniforms[ 'width' ].value = width;
        spiralPass.uniforms[ 'height' ].value = height;
        this.pass = spiralPass;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aTom.wav';
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
            this.pass.uniforms[ 'time' ].value = this.time / this.max;
            this.time += 1;
        }
    }
}