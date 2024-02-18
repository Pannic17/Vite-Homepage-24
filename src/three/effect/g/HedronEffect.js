import {
    DodecahedronGeometry,
    IcosahedronGeometry,
    LineBasicMaterial,
    LineSegments,
    OctahedronGeometry,
    TetrahedronGeometry,
    WireframeGeometry
} from "three";
import {WireframeGeometry2} from "three/examples/jsm/lines/WireframeGeometry2";
import {LineMaterial} from "three/examples/jsm/lines/LineMaterial";
import {Wireframe} from "three/examples/jsm/lines/Wireframe";
import {fade} from "../../utils";

export class HedronEffect {
    time = 0;
    mesh;
    start;
    direction;
    constructor (scene, max, color) {
        this.max = max;
        this.scene = scene;
        this.color = color;
    }

    add() {
        const audio = document.createElement('audio');
        audio.hidden = true;
        audio.src = './sound/aT3.wav';
        audio.volume = 0.5; audio.play();
        let radius = Math.random() * 0.7 + 1.3;
        let geometry = this.choosePolyhedron(radius);
        let wireframe = new WireframeGeometry2(geometry);
        // wireframe = new WireframeGeometry(wireframe);
        let material = new LineMaterial({
            color: this.color[Math.floor(Math.random()*this.color.length)],
            linewidth: Math.random() * 0.003 + 0.001,
            dashed: false
        })



        this.mesh = new Wireframe(wireframe, material);
        console.log(this.mesh)
        this.mesh.computeLineDistances();
        this.mesh.scale.set(1,1,1);

        this.direction = this.getFactor(Math.floor(Math.random()*4));
        this.start = Math.random() * 20 - 10;
        this.mesh.rotation.x = (90 + this.start * this.direction.x) * Math.PI / 180;
        this.mesh.rotation.y = Math.random() * 180 * Math.PI / 180;
        this.mesh.rotation.z = this.start * this.direction.z * Math.PI / 180;

        this.scene.add(this.mesh);
    }

    choosePolyhedron(radius) {
        let choice = Math.floor(Math.random()*9);
        switch (choice) {
            case 0: return new OctahedronGeometry(radius, 0);
            case 1: return new OctahedronGeometry(radius, 1);
            case 2: return new IcosahedronGeometry(radius, 0);
            case 3: return new IcosahedronGeometry(radius, 1);
            case 4: return new DodecahedronGeometry(radius, 0);
            case 5: return new TetrahedronGeometry(radius, 0);
            case 6: return new TetrahedronGeometry(radius, 1);
            case 7: return new TetrahedronGeometry(radius, 2);
            case 8: return new TetrahedronGeometry(radius, 3);
        }
    }

    getFactor(direction) {
        switch (direction) {
            case 0: return {x: -1, z:0};
            case 1: return {x: 1, z:0};
            case 2: return {x: 0, z:-1};
            case 3: return {x: 0, z:1};
        }
    }

    end() {
        this.scene.remove(this.mesh);
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            let curve = fade(this.time/this.max);

            // this.mesh.material.setValues({
            //     opacity: curve
            // });
            // console.log(this.mesh.material.opacity)
            let angle = this.start + curve * 90;
            this.mesh.rotation.x = (90 + angle * this.direction.x) * Math.PI / 180;
            this.mesh.rotation.z = angle * this.direction.z * Math.PI / 180;
            this.time += 1;
        }
    }
}