import {
    Vector2
} from 'three';

/**
 * Sobel Shader
 * https://www.shadertoy.com/view/WltSDS
 */

const MaskShader = {

    uniforms: {

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

        void main() {
            vec4 tex = texture2D(tDiffuse, vUv);
            if (tex.r <= 0.1 && tex.g <= 0.1 && tex.b <= 0.1) {
                gl_FragColor = vec4(tex.xyz, 0.0);
            } else {
                gl_FragColor = tex;
            }   
        }
    `

};

export { MaskShader };
