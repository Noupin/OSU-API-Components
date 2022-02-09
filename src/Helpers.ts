import * as THREE from "three";

export function randomElement<T>(arr: T[]){
    return arr[Math.floor(Math.random()*arr.length)]
}

export function isWebGL(){ 
    try {
        var canvas = document.createElement('canvas'); 
        return !!window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch(e) {
        return false;
    }
};

export function getMeshSize(mesh: THREE.Object3D): THREE.Vector3{
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(mesh);
    var size = new THREE.Vector3();
    boundingBox.getSize(size)

    return size
}

export function fitCameraToObject(camera: THREE.PerspectiveCamera, mesh: THREE.Object3D, offset=1.1){
    var size = getMeshSize(mesh)
    const horizontalFOV = camera.fov * (Math.PI/180);
    const verticalFOV = 2*Math.atan(Math.tan(horizontalFOV/2) * camera.aspect);
    let xDistance = size.z/2 + Math.abs(size.x/2 / Math.tan(verticalFOV/2));
    let yDistance = size.z/2 + Math.abs(size.y/2 / Math.tan(horizontalFOV/2));
    //console.log(`Size(x, y, z): ${size.x}, ${size.y}, ${size.z}\nFOV: ${horizontalFOV}, FOV Vert: ${verticalFOV}\nDx: ${xDistance}, Dy: ${yDistance}`)
    let cameraZ = Math.max(xDistance, yDistance);
    let fov = 2 * Math.atan((size.x/camera.aspect) / (2*cameraZ)) * (180/Math.PI);

    camera.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
    camera.translateZ(cameraZ*offset)
    camera.fov = fov;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height
    };
}

export function vhToPixels (vh: number) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
}

export function scrollIntoView(ref: React.MutableRefObject<HTMLElement | null>){
    ref.current?.scrollIntoView({behavior: "smooth"})
}