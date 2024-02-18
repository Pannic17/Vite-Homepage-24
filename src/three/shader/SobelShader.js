import {
    Vector2
} from 'three';

/**
 * Sobel Shader
 */

const SobelShader = {

    uniforms: {

        'height': { value: 0.0 },
        'width': { value: 0.0 },
        "kernelX": { value: [3, 0, -3, 10, 0, -10, 3, 0, -3] },
        "kernelY": { value: [-3, -10, -3, 0, 0, 0, 3, 10, 3] },
        'amount': { value: 0.1 },

        "tDiffuse": { value: null },

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`
		
		uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float width;
        uniform float height;
        uniform float kernelX[9];
        uniform float kernelY[9];
        uniform float amount;

        void main(){
            float step_w = 1.0/width;
            float step_h = 1.0/height;
            vec2 offset[9];
            float alpha = 0.0;
            offset[0] = vec2(-step_w, -step_h);
            offset[1] = vec2(0.0, -step_h);
            offset[2] = vec2(step_w, -step_h);
            offset[3] = vec2(-step_w, 0.0);
            offset[4] = vec2(0.0, 0.0);
            offset[5] = vec2(step_w, 0.0);
            offset[6] = vec2(-step_w, step_h);
            offset[7] = vec2(0.0, step_h);
            offset[8] = vec2(step_w, step_h);
            vec3 x = vec3(0.0);
            vec3 y = vec3(0.0);
            for (int i = 0; i < 9; i++) {
                x += texture2D(tDiffuse, vUv + offset[i]).rgb * kernelX[i];
                y += texture2D(tDiffuse, vUv + offset[i]).rgb * kernelY[i];
            }
            vec4 tex = texture2D(tDiffuse, vUv);
            vec3 color = sqrt((x*x)+(y*y));
            float r = color.r + tex.r * amount;
            float g = color.g + tex.g * amount;
            float b = color.b + tex.b * amount;
            alpha = tex.a;
            gl_FragColor = vec4(vec3(r, g, b), alpha);
        }
    `

};

export { SobelShader };
