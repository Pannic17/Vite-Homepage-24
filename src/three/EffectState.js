class EffectState {
    percentage = 0;
    constructor (type) {
        this.type = type;
    }

}

EffectState.TYPE = {
    "2D": 0,
    "3D": 1,
    "Shader": 2,
    "Animation": 3
}