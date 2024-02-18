import {
    Vector2
} from 'three';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const DotShader = {

    uniforms: {

        'tDiffuse': { value: 10.0 },
        'tSize': { value: new Vector2( 64, 64 ) },
        'center': { value: new Vector2( 0, 0 ) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 }

    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ) ;
			float c = cos( angle ) ;

			vec2 tex = vUv * tSize - center;
			
			vec2 point = vec2( c * tex.x , c * tex.y ) * scale;

			return step( sin( point.x ) * sin( point.y ), 0.6 );

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;
			
			float fr, fg, fb, fa;
			
			if (pattern() == 0.0) {
			    fr = (color.r) + 0.2;
			    fg = (color.g) + 0.2;
			    fb = (color.b) + 0.2;
			    fa = color.a;
			} else {
			    fr = 0.0;
			    fg = 0.0;
			    fb = 0.0;
			    fa = 0.0;
			}
			
			

			gl_FragColor = vec4( vec3( fr, fg, fb ), fa );

		}`

};

export { DotShader };
