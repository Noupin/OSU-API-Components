
export function randomElement<T>(arr: T[]){
    return arr[Math.floor(Math.random()*arr.length)]
}

export function isWebGL () { 
    try {
        var canvas = document.createElement('canvas'); 
        return !!window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch(e) {
        return false;
    }
};
