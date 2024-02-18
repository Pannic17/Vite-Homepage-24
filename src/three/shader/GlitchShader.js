const GlitchShader = {

    uniforms: {

        "amount": { value: 0.3 },
        "speed": { value: 0.005 },
        "iTime": { value: 0.0 },
        "tDiffuse": { value: null },

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

        uniform float amount;
        uniform float speed;
        uniform float iTime;

		uniform sampler2D tDiffuse;
        varying vec2 vUv;

        //2D (returns 0 - 1)
        float random2d(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float randomRange (in vec2 seed, in float min, in float max) {
            return min + random2d(seed) * (max - min);
        }

        // return 1 if v inside 1d range
        float insideRange(float v, float bottom, float top) {
           return step(bottom, v) - step(top, v);
        }

        //inputs
        // float AMT = 0.2; //0 - 1 glitch amount
        // float SPEED = 0.6; //0 - 1 speed


        void main() {
            float time = floor(iTime * speed * 60.0);    
            vec2 uv = vUv;
        
            //copy orig
            vec3 outCol = texture(tDiffuse, uv).rgb;
        
            //randomly offset slices horizontally
            float maxOffset = amount/2.0;
            for (float i = 0.0; i < 10.0 * amount; i += 1.0) {
                float sliceY = random2d(vec2(time , 2345.0 + float(i)));
                float sliceH = random2d(vec2(time , 9035.0 + float(i))) * 0.25;
                float hOffset = randomRange(vec2(time , 9625.0 + float(i)), -maxOffset, maxOffset);
                vec2 uvOff = uv;
                uvOff.x += hOffset;
                if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){
                    outCol = texture(tDiffuse, uvOff).rgb;
                }
            }
        
            //do slight offset on one entire channel
            float maxColOffset = amount/6.0;
            float rnd = random2d(vec2(time , 9545.0));
            vec2 colOffset = vec2(randomRange(vec2(time , 9545.0),-maxColOffset,maxColOffset), 
                               randomRange(vec2(time , 7205.0),-maxColOffset,maxColOffset));
            if (rnd < 0.33) {
                outCol.r = texture(tDiffuse, uv + colOffset).r;
            } else if (rnd < 0.66) {
                outCol.g = texture(tDiffuse, uv + colOffset).g;
            } else{
                outCol.b = texture(tDiffuse, uv + colOffset).b;  
            }
           
            gl_FragColor = vec4(outCol,1.0);

        }
    `

};

export { GlitchShader };
