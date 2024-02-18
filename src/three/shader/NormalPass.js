import {
    Color,
    AddEquation, HalfFloatType, NearestFilter,
    OneMinusSrcAlphaFactor,
    ShaderMaterial,
    SrcAlphaFactor,
    UniformsUtils,
    WebGLRenderTarget
} from "three";
import {CopyShader} from "three/examples/jsm/shaders/CopyShader";
import * as THREE from "three";
import {FullScreenQuad, Pass} from "three/examples/jsm/postprocessing/Pass";

export class NormalPass extends Pass{
    constructor (renderer, width, height) {
        super ();

        this.width = ( width !== undefined ) ? width : 512;
        this.height = ( height !== undefined ) ? height : 512;

        this.copyMaterial = new ShaderMaterial( {
            uniforms: UniformsUtils.clone( CopyShader.uniforms ),
            vertexShader: CopyShader.vertexShader,
            fragmentShader: CopyShader.fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blendSrc: SrcAlphaFactor,
            blendDst: OneMinusSrcAlphaFactor,
            blendEquation: AddEquation,
            blendSrcAlpha: SrcAlphaFactor,
            blendDstAlpha: OneMinusSrcAlphaFactor,
            blendEquationAlpha: AddEquation,
            // premultipliedAlpha:true,
        } );

        this.normalRenderTarget = new WebGLRenderTarget( this.width, this.height, {
            minFilter: NearestFilter,
            magFilter: NearestFilter,
            type: HalfFloatType,
        } );

        this.fsQuad = new FullScreenQuad( null );
        this.originalClearColor = new Color();
    }

    render (renderer, writeBuffer) {
        this.copyMaterial.uniforms[ 'tDiffuse' ].value = this.normalRenderTarget.texture;
        this.copyMaterial.blending = THREE.NoBlending;
        this.renderPass( renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer );
    }

    renderPass( renderer, passMaterial, renderTarget, clearColor, clearAlpha ) {

        console.log(this.originalClearColor);
        // save original state
        // this.originalClearColor.copy( renderer.getClearColor( this.tempColor ) );
        // const originalClearAlpha = renderer.getClearAlpha( this.tempColor );
        // const originalAutoClear = renderer.autoClear;

        renderer.setRenderTarget( renderTarget );

        // setup pass state
        renderer.autoClear = false;
        if ( ( clearColor !== undefined ) && ( clearColor !== null ) ) {

            renderer.setClearColor( clearColor );
            renderer.setClearAlpha( clearAlpha || 0.0 );
            renderer.clear();

        }

        console.log(passMaterial);

        this.fsQuad.material = passMaterial;
        this.fsQuad.render( renderer );

        // restore original state
        // renderer.autoClear = originalAutoClear;
        // renderer.setClearColor( this.originalClearColor );
        // renderer.setClearAlpha( originalClearAlpha );

    }
}