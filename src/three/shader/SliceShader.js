import {
    Vector2
} from 'three';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const SliceShader = {

    uniforms: {

        'ring1': { value: 6.0 },
        'ring2': { value: 10.0 },
        'push1': { value: 1.0 },
        'push2': { value: 1.0 },
        'rand1': { value: 0.7 },
        'rand2': { value: 0.2 },
        'diminish': { value: 0.05 },

        "tDiffuse": { value: null },

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

		uniform float ring1;
		uniform float ring2;
		uniform float push1;
		uniform float push2;
		uniform float rand1;
		uniform float rand2;
		uniform float diminish;
		
		uniform sampler2D tDiffuse;
		
		varying vec2 vUv;
		
		float rand(vec2 co) {
		    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}
		
		void main() {
		
	        float r1 = rand( floor( vUv.yy * ring1 ) / ring1 * rand1 );
	        float r2 = rand( floor( vUv.yy * ring2 ) / ring2 * rand2 );
	        // float r1 = rand1;
	        // float r2 = rand2;

            r1 = -1.0 + 2.0 * r1;
            r2 = -1.0 + 2.0 * r2;

            r1 *= push1;
            r2 *= push2;

            r1 += r2;
            r1 *= diminish;

            vec4 tex = texture2D(tDiffuse, vUv + vec2(r1,0.0));
            if(vUv.x+r1 > 1.0 || vUv.x + r1 <= 0.0){
                gl_FragColor = vec4(vec3(0.0),0.0);
            } else {
                gl_FragColor = tex;
            }

        }`

};

export { SliceShader };
