import {
    Vector2
} from 'three';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const HatchShader = {

    uniforms: {

        'tDiffuse': { value: null },
        'tSize': { value: new Vector2( 64, 64 ) },
        'center': { value: new Vector2( 0, 0 ) },
        'width': { value: 0.0 },
        'height': { value: 0.0 }

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

		uniform vec2 center;
		uniform float width;
		uniform float height;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		
		float pDensity = 9.0;
        float pWidth = 5.0;
        
        float hatch_1 = 0.8;
        float hatch_2 = 0.6;
        float hatch_3 = 0.3;
        float hatch_4 = 0.15;

        float hatch_1_brightness = 0.8;
        float hatch_2_brightness = 0.6;
        float hatch_3_brightness = 0.3;
        float hatch_4_brightness = 0.0;
        
        float d = 1.0;
        
        float lookup(vec2 p, float dx, float dy) {
            vec2 uv = (p.xy + vec2(dx * d, dy * d)) / vec2(width, height);
            vec4 c = texture(tDiffuse, uv.xy);
            // return as luma
            return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
        }
        

		void main() {

		    float ratio = width / height;
            float coordX = vUv.x;
            float coordY = vUv.y;
            vec2 dstCoord = vec2(coordX, coordY);
            vec2 srcCoord = vec2(coordX, coordY / ratio);
            vec2 uv = srcCoord.xy;
            
            vec2 fragCoord = vec2(vUv.x * width, vUv.y * height);
            
            vec3 res = vec3(1.0, 1.0, 1.0);
            vec4 tex = texture(tDiffuse, uv);
            float brightness = (0.2126*tex.x) + (0.7152*tex.y) + (0.0722*tex.z);
            
            if (brightness < hatch_1) {
                if (mod(fragCoord.x + fragCoord.y, pDensity) <= pWidth) {
                    res = vec3(hatch_1_brightness);
                }
            }
  
            if (brightness < hatch_2) {
                if (mod(fragCoord.x - fragCoord.y, pDensity) <= pWidth) {
                    res = vec3(hatch_2_brightness);
                }
            }
  
            if (brightness < hatch_3) {
                if (mod(fragCoord.x + fragCoord.y - (pDensity*0.5), pDensity) <= pWidth) {
                    res = vec3(hatch_3_brightness);
                }
            }
  
            if (brightness < hatch_4) {
                if (mod(fragCoord.x - fragCoord.y - (pDensity*0.5), pDensity) <= pWidth) {
                    res = vec3(hatch_4_brightness);
                }
            }
            
            vec2 p = fragCoord.xy;
            
            float gx = 0.0;
            gx += -1.0 * lookup(p, -1.0, -1.0);
            gx += -2.0 * lookup(p, -1.0,  0.0);
            gx += -1.0 * lookup(p, -1.0,  1.0);
            gx +=  1.0 * lookup(p,  1.0, -1.0);
            gx +=  2.0 * lookup(p,  1.0,  0.0);
            gx +=  1.0 * lookup(p,  1.0,  1.0);
    
            float gy = 0.0;
            gy += -1.0 * lookup(p, -1.0, -1.0);
            gy += -2.0 * lookup(p,  0.0, -1.0);
            gy += -1.0 * lookup(p,  1.0, -1.0);
            gy +=  1.0 * lookup(p, -1.0,  1.0);
            gy +=  2.0 * lookup(p,  0.0,  1.0);
            gy +=  1.0 * lookup(p,  1.0,  1.0);
    
            // hack: use g^2 to conceal noise in the video
            float g = gx*gx + gy*gy;
            res *= (1.0-g);
            
            vec4 color = texture2D( tDiffuse, vUv );

            gl_FragColor = vec4(res, 0.0);
			
			// gl_FragColor = vec4( vec3( fr, fg, fb ), fa );

		}`

};

export { HatchShader };
