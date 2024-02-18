import {CylinderGeometry, DoubleSide, Group, Mesh, MeshPhongMaterial} from "three";
import {fade} from "../../utils";

export class WrapEffect {
    time = 0;
    start = -3.2;
    group = new Group();
    constructor (scene, max, color) {
        this.max = max;
        this.scene = scene;
        this.color = color;
    }

    add() {
        const audio = document.createElement('audio');
        audio.hidden = true;
        audio.src = './sound/sF7.wav';
        audio.volume = 0.5; audio.play();
        this.group = new Group();
        let sy = this.start;
        let radius = Math.random() * 0.7 + 1.6;
        for (let i = 0; i < Math.random() * 10 + 10; i++) {
            sy -= 0.3
            this.group.add(this.newRing(sy, radius,i % 3 == 0));
        }
        console.log(this.group);
        this.scene.add(this.group);
    }

    newRing(py, radius, close) {
        let segment = Math.floor(Math.random()*6) + 5;
        let start, length;
        if (close) {
            start = 0;
            length = Math.PI * 2
        } else {
            start = Math.random() * Math.PI;
            length = start + Math.random() * Math.PI;
        }
        let geometry = new CylinderGeometry(
            radius,
            radius,
            Math.random() * 0.3 + 0.1,
            segment,
            1,
            true,
            start,
            length
        )
        let material = new MeshPhongMaterial({
            color: this.color[Math.floor(Math.random()*this.color.length)],
            emissive: 0x072534,
            side: DoubleSide,
            flatShading: true
        })
        let mesh = new Mesh(geometry, material);
        mesh.position.y = py;
        mesh.rotation.y = Math.random() * 180 * Math.PI / 180;

        return mesh;
    }

    end() {
        this.scene.remove(this.group);
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
            this.group.position.setY(fade(this.time / this.max) * (6.4 + this.group.children.length * 0.3));
            this.time += 1;
        }
    }
}