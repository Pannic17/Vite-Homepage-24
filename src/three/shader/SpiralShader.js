import {
    Vector2
} from 'three';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const SpiralShader = {

    uniforms: {

        'time': { value: 0.0 },
        'height': { value: 0.0 },
        'width': { value: 0.0 },

        "tDiffuse": { value: null },

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`
    
        #define PI 3.1415926

		uniform float height;
		uniform float width;
		uniform float time;
		
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		
		void main() {
		
	        vec2 uv = vUv / 0.5 - 1.0;
	        uv.x *= width / height;
	        
	        float f = 1.0 / length(uv);
	        f += atan(uv.x, uv.y) / acos(0.0);
	        f -= time;
	        f = clamp(sin( f * PI ) * dot(uv, uv) * height / 5.0 + 0.5, 0.0, 1.0);
	        f *= sin(length(uv) + 1.0);
	        // f = step(f, 0.5);
	        
	        vec4 tex = texture2D( tDiffuse, vUv );
	        float alpha = tex.a;
	        
	        
	        gl_FragColor = vec4( f*tex.r, f*tex.g, f*tex.b, alpha*f );
	        
        }`

};

export { SpiralShader };
