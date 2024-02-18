import {
    Vector2
} from 'three';

/**
 * Sobel Shader
 * https://www.shadertoy.com/view/WltSDS
 */

const PaintShader = {

    uniforms: {

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

		uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float height;
		uniform float width;
        
        const float bands = 6.0;
        
        float rand(vec2 co) {
		    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

        vec3 getWaterColor(vec3 color) {
            vec3 col = round(color * bands) / bands;
            color = mix(color, length(col) * normalize(color), 0.7);
            return color;
        }

        void main() {
        
            vec2 uv = vUv;
            vec3 col = vec3(0);
            
            vec4 tex = texture2D(tDiffuse, vUv);
            
            vec2 nuv = clamp(uv + (vec2(rand(uv), rand(uv + vec2(131.61, -215.35))) * 2.0 - 1.0) / vec2(width, height) * 2., vec2(0), vec2(1));
            // mixing between grainy and smooth texture
            vec3 t = mix(textureLod(tDiffuse, nuv, 2.0).rgb, textureLod(tDiffuse, uv, 2.0).rgb, 0.5);
            col = getWaterColor(t);

            gl_FragColor = vec4(col, tex.a);
               
        }
    `

};

export { PaintShader };
