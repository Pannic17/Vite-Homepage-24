import {BoxGeometry, Mesh, MeshPhongMaterial} from "three";
import scene from "three/examples/jsm/offscreen/scene";
import {fade} from "../../utils";

export class CubeEffect {
    time = 0;
    cubes = [];
    constructor (scene, max, color) {
        this.max = max;
        this.scene = scene;
        this.color = color;
    }

    add() {
        const audio = document.createElement('audio');
        audio.hidden = true;
        audio.src = './sound/aRimshot.wav';
        audio.volume = 0.5; audio.play();
        for (let i = 0; i < Math.random() * 2 + 4; i++) {
            let cube = this.newSquare(Math.random()*0.8);
            this.cubes.push(cube);
            this.scene.add(cube);
        }
    }

    newSquare(size) {
        let geometry = new BoxGeometry(size, size, size);
        let material = [
            new MeshPhongMaterial({color: 0xffffff}),
            new MeshPhongMaterial({color: 0xff8936}),
            new MeshPhongMaterial({color: 0xffffff}),
            new MeshPhongMaterial({color: 0xf0c239}),
            new MeshPhongMaterial({color: 0xf0c239}),
            new MeshPhongMaterial({color: 0xffffff})
        ]
        let cube = new Mesh(geometry, material);
        cube.position.set(
            (Math.random() + 0.7) * (Math.random() < 0.5 ? -1 : 1),
            (Math.random() + 0.7) * (Math.random() < 0.5 ? -1 : 1),
            Math.random() * 2 - 1
        )
        cube.rotation.x = Math.random() * 360 * Math.PI / 180;
        cube.rotation.y = Math.random() * 360 * Math.PI / 180;
        cube.rotation.z = 0;
        return cube;
    }

    end() {
        for (let i = 0; i < this.cubes.length; i++) {
            this.scene.remove(this.cubes[i]);
        }
        this.cubes = [];
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            let curve = fade(this.time/this.max) * 45;
            for (let i = 0; i < this.cubes.length; i++) {
                this.cubes[i].rotation.z = curve * Math.PI / 180;
            }
            this.time += 1;
        }
    }
}