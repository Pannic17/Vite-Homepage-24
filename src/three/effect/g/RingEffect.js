import {CylinderGeometry, DoubleSide, Mesh, MeshPhongMaterial} from "three";
import {fade} from "../../utils";

export class RingEffect {
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
        audio.src = './sound/cRide.wav';
        audio.volume = 0.5; audio.play();
        let radius = Math.random() * 0.5 + 1.4;
        let geometry = new CylinderGeometry(
            radius,
            radius,
            Math.random() * 0.1 + 0.1,
            Math.floor(Math.random()*5) + 4,
            1,
            true,
            0,
            Math.PI * 2
        )
        let material = new MeshPhongMaterial({
            color: this.color[Math.floor(Math.random()*this.color.length)],
            emissive: 0x072534,
            side: DoubleSide,
            flatShading: true
        })
        this.direction = this.getFactor(Math.floor(Math.random()*4));
        this.start = Math.random() * 20 - 10;
        console.log(this.direction);
        this.mesh = new Mesh(geometry, material);
        this.mesh.rotation.x = (90 + this.start * this.direction.x) * Math.PI / 180;
        this.mesh.rotation.y = Math.random() * 180 * Math.PI / 180;
        this.mesh.rotation.z = this.start * this.direction.z * Math.PI / 180;

        this.scene.add(this.mesh);
    }

    end() {
        this.scene.remove(this.mesh);
    }

    getFactor(direction) {
        switch (direction) {
            case 0: return {x: -1, z:0};
            case 1: return {x: 1, z:0};
            case 2: return {x: 0, z:-1};
            case 3: return {x: 0, z:1};
        }
    }

    setColor(color) {
        this.color = color;
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            let curve = fade(this.time/this.max);
            let angle = this.start + curve * 180;
            this.mesh.rotation.x = (90 + angle * this.direction.x) * Math.PI / 180;
            this.mesh.rotation.z = angle * this.direction.z * Math.PI / 180;
            this.time += 1;
        }
    }
}