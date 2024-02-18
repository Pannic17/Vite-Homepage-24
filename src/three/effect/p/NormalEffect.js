import {SSRPass} from "three/examples/jsm/postprocessing/SSRPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {WaterShader} from "../../shader/WaterShader";
import {PaintShader} from "../../shader/PaintShader";

export class NormalEffect {
    time = 0;
    constructor (composer, max, renderer, scene, camera) {
        this.composer = composer;
        this.max = max;
        this.renderer = renderer;

        this.water = new ShaderPass( WaterShader );
        this.paint = new ShaderPass( PaintShader );
        this.water.uniforms[ 'width' ].value = innerWidth;
        this.paint.uniforms[ 'width' ].value = innerWidth;
        this.water.uniforms[ 'height' ].value = innerHeight;
        this.paint.uniforms[ 'height' ].value = innerHeight;

        this.water.uniforms[ 'random' ].value = Math.random() * 200;

        let ssrPass = new SSRPass ({
            renderer,
            scene,
            camera,
            width: innerWidth,
            height: innerHeight
        });
        ssrPass.output = SSRPass.OUTPUT.Normal;
        ssrPass.opacity = 1;
        this.pass = ssrPass;
    }

    add() {
        const audio = document.createElement('audio');
        // audio.hidden = true;
        // audio.src = './sound/aK0.wav';
        // audio.volume = 0.5; audio.play();
        this.time = 0;
        this.composer.addPass(this.pass);
        this.composer.addPass(this.water);
        this.composer.addPass(this.paint);

    }

    end() {
        this.composer.removePass(this.pass);
        this.composer.removePass(this.water);
        this.composer.removePass(this.paint);
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            this.time += 1;
            this.water.uniforms[ 'time' ].value = this.time / this.max;
        }
    }
}