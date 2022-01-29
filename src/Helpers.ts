import * as THREE from "three";

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

export function fitCameraToObject(camera: THREE.PerspectiveCamera, mesh: THREE.Object3D, offset=1.24){
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(mesh);
    var size = new THREE.Vector3();
    boundingBox.getSize(size)

    const fov = camera.fov * (Math.PI/180);
    const fovh = 2*Math.atan(Math.tan(fov/2) * camera.aspect);
    let dx = size.z/2 + Math.abs(size.x/2 / Math.tan(fovh/2));
    let dy = size.z/2 + Math.abs(size.y/2 / Math.tan(fov/2));
    let cameraZ = Math.max(dx, dy);

    camera.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
    camera.translateZ(cameraZ*offset)
}