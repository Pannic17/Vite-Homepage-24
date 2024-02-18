import {
    Vector2
} from 'three';

/**
 * Sobel Shader
 * https://www.shadertoy.com/view/WltSDS
 */

const WaterShader = {

    uniforms: {

        'height': { value: 0.0 },
        'width': { value: 0.0 },
        'random': { value: 140.0 },
        'time': { value: 50.0 },

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
        uniform float random;
        uniform float time;
        
        float loopRad = 10.0;
        
        float RGB2Luminosity(in vec3 color) {
            return 0.3*color.r + 0.59*color.g + 0.11*color.b;
        }

        vec2 Gradient(in sampler2D u_tex, in vec2 st, in vec2 stepSize) {
            float Gx = 0.0;
            Gx += RGB2Luminosity(texture(u_tex, st - vec2(stepSize.x, -stepSize.y)).rbg);
            Gx += 2.0 * RGB2Luminosity(texture(u_tex, st - vec2(stepSize.x, 0.0)).rbg);
            Gx += RGB2Luminosity(texture(u_tex, st - vec2(stepSize.x, stepSize.y)).rbg);

            Gx -= RGB2Luminosity(texture(u_tex, st + vec2(stepSize.x, -stepSize.y)).rbg);
            Gx -= 2.0 * RGB2Luminosity(texture(u_tex, st + vec2(stepSize.x, 0.0)).rbg);
            Gx -= RGB2Luminosity(texture(u_tex, st + vec2(stepSize.x, stepSize.y)).rbg);

            float Gy = 0.0;
            Gy -= RGB2Luminosity(texture(u_tex, st - vec2(-stepSize.x, stepSize.y)).rbg);
            Gy -= 2.0 * RGB2Luminosity(texture(u_tex, st - vec2(stepSize.x, stepSize.y)).rbg);
            Gy -= RGB2Luminosity(texture(u_tex, st - vec2(stepSize.x, stepSize.y)).rbg);

            Gy += RGB2Luminosity(texture(u_tex, st + vec2(-stepSize.x, stepSize.y)).rbg);
            Gy += 2.0 * RGB2Luminosity(texture(u_tex, st + vec2(stepSize.x, stepSize.y)).rbg);
            Gy += RGB2Luminosity(texture(u_tex, st + vec2(stepSize.x, stepSize.y)).rbg);
            return vec2(Gx, Gy);
        }


        void main() {
        
            vec2 uv = vUv;
            vec2 kernelStepSize = 1.0 / vec2(width, height);
    

            vec2 grad = Gradient(tDiffuse, uv, kernelStepSize);

            loopRad = 5.0 * random;

            vec2 grad_tan = vec2(-grad.y, grad.x);

            vec2 loopedSample = uv + loopRad * kernelStepSize * grad * 2.0* sin(2.0 * time) + 2.0*loopRad * kernelStepSize *grad_tan * cos(2.0* time);
     
            gl_FragColor = texture2D( tDiffuse, loopedSample);
        
            // vec4 tex = texture2D(tDiffuse, vUv);
            // vec3 col = pow(tex.xyz, vec3(factor));
            // float c = mod(float(vUv.x * height + vUv.y * width), size);
            // vec3 color = clamp(col * size - c, vec3(0.0), vec3(1.0));
            // gl_FragColor = vec4(pow(color, vec3(1.0/factor)), tex.a);
               
        }
    `

};

export { WaterShader };
