import {HalftonePass} from "three/examples/jsm/postprocessing/HalftonePass";
import {fade} from "../../utils";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {MaskShader} from "../../shader/MaskShader";

export class HalftoneEffect {
    time = 0;
    constructor (composer, max, width, height) {
        this.composer = composer;
        this.max = max;
        const params = {
            shape: 1,
            radius: 2,
            rotateR: Math.PI / 12,
            rotateB: Math.PI / 12 * 2,
            rotateG: Math.PI / 12 * 3,
            scatter: 0,
            blending: 1,
            blendingMode: 3,
            greyscale: false,
            disable: false
        };
        this.mask = new ShaderPass( MaskShader );
        this.pass = new HalftonePass (width, height, params);
        this.fadeTP1 = 50;
        this.fadeTP2 = 100
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aPerc.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.size = Math.random() * 10 + 15;
        this.composer.addPass(this.pass);
        this.composer.addPass(this.mask);
        this.pass.uniforms[ 'shape' ].value = Math.round(Math.random()*3) + 1;
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
            if (this.time <= this.fadeTP1) {
                let curve = fade(this.time/this.fadeTP1);
                this.pass.uniforms[ 'blending' ].value = curve;
            } else if (this.time == this.fadeTP1 + 1) {
                this.pass.uniforms[ 'blending' ].value = 1.0;
            }

            if (this.time <= this.fadeTP2) {
                let curve = fade(this.time/this.fadeTP2) * (this.size - 6);
                this.pass.uniforms[ 'radius' ].value = curve + 6;
            } else if (this.time == this.fadeTP1 + 1) {
                this.pass.uniforms[ 'radius' ].value = this.size;
            }
            this.time += 1;
        }
    }
}