import {BoxGeometry, Mesh, MeshPhongMaterial} from "three";
import scene from "three/examples/jsm/offscreen/scene";
import {fade} from "../../utils";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

export class CharEffect {
    font;
    time = 0;
    chars = [];
    constructor (scene, max, color) {
        this.max = max;
        this.scene = scene;
        this.color = color;
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        this.characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        const loader = new FontLoader();
        let _this = this;
        loader.load('./sk.json', function (font) {
            _this.font = font;
        })
    }

    add() {
        const audio = document.createElement('audio');
        audio.hidden = true;
        audio.src = './sound/hPerc.wav';
        audio.volume = 0.5; audio.play();
        let by = 2;
        let line = Math.random() * 3 + 2;
        let step = 4 / (line+1);
        for (let i = 0; i < line; i++) {
            by -= step;
            let size = Math.random() * 0.1 + 0.3;
            let z = Math.random() * 2 - 1;
            let y = by;
            y += Math.random() - 0.5;
            let num = Math.random() * 3 + 1;
            let len = num * (size + 0.01);
            let x = Math.random() * ( 4 - len) - 2;
            for (let j = 0; j < Math.random() * 3 + 1; j++) {
                let text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
                let char = this.newCharacter(text, size, x, y, z);
                this.chars.push(char);
                this.scene.add(char);
                x += size + 0.01;
            }
        }
    }

    newCharacter(text, size, x, y, z) {
        let geometry = new TextGeometry(text, {
            font: this.font,
            size: size,
            height: size/5,
            // bevelEnabled: true
        });
        geometry.computeBoundingBox();
        let material = [
            new MeshPhongMaterial({color: 0xffffff}),
            new MeshPhongMaterial({color: 0x156289}),
            new MeshPhongMaterial({color: 0xf0c239}),
        ]
        let char = new Mesh(geometry, material);
        char.position.set(
            x,
            y,
            z
        )
        // char.rotation.x = Math.random() * 360 * Math.PI / 180;
        // char.rotation.y = Math.random() * 360 * Math.PI / 180;
        char.rotation.z = 0;
        return char;
    }

    end() {
        for (let i = 0; i < this.chars.length; i++) {
            this.scene.remove(this.chars[i]);
        }
        this.chars = [];
    }

    animate(onEnd) {
        if (this.time == this.max) {
            this.end();
            this.time = 0;
            onEnd();
        } else {
            let curve = fade(this.time/this.max) * 45;
            for (let i = 0; i < this.chars.length; i++) {
                this.chars[i].position.z = curve * Math.PI / 180;
            }
            this.time += 1;
        }
    }
}