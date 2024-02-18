import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {fade} from "../utils";

export function loadModel(path, call) {
    let model
    const loader = new GLTFLoader();
    loader.load(path, function (gltf) {
        model = gltf.scene.children[0];
        model.position.y = -1;
        call(model);
    })
}

export class ChangeCall {
    time = 0;
    max = 200;
    constructor (scene, model, models, background, bgc) {
        this.scene = scene;
        this.model = model;
        this.models = models;
        this.bg = background;
        this.bgc = bgc;
    }

    change() {
        const audio = document.createElement('audio');
        audio.hidden = true;
        audio.src = './sound/fFlute.wav';
        audio.volume = 0.5; audio.play();
        this.old = this.model;
        this.new = this.select();
        this.new.position.y = -4;
        this.scene.add(this.new);
        return this.new;
    }

    select() {
        let model = this.models[Math.floor(Math.random()*this.models.length)];
        if (model == this.model) {
            return this.select();
        } else {
            return model;
        }
    }

    animate(onEnd) {
        if (this.time == this.max) {
            // this.model = this.new;
            this.scene.remove(this.old);
            this.time = 0;
            let index = this.models.indexOf(this.new);
            this.bg.style.backgroundColor = this.bgc[index];
            onEnd();
        } else {
            let curve = fade(this.time/this.max) * 4;
            this.old.position.y = curve;
            this.new.position.y = curve - 5;
            this.time += 1;
        }
    }
}