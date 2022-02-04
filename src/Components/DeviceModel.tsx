import * as THREE from "three";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Props } from "../Models/Props";
import { DeviceModelProps } from "../Models/DeviceModelProps";
import { fitCameraToObject, isWebGL } from "../Helpers";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const DeviceModel: FC<Props<DeviceModelProps>> = ({props}) => {
    //To offset the rotation of the models set the initial y rotation to 36 degrees apart for each of 10 items.
    var component = (
        <div className="" style={{display: "flex", alignItems: 'center',
        background: "#ececec", justifyContent: 'center', width: props.width, height: props.height}}>
            <image href={props.ImageURL}/>
        </div>
    );

    const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0))
    const [loaded, setLoaded] = useState(false)
    const mesh = useRef<THREE.Group | THREE.Mesh>();
    const cancelAddress = useRef<number>();
    
    const modelRef = useRef<HTMLDivElement>(null);
    const hasWebGL = isWebGL();

    const xRot = props.xRot ? props.xRot : 0;
    const yRot = props.yRot ? props.yRot : 0.005;
    const zRot = props.zRot ? props.zRot : 0;
    const bgColor = props.bgColor ? props.bgColor : "#000000"

    var activation = 0.75;

    const scene = new THREE.Scene()
    const loader = new GLTFLoader()
    const camera = new THREE.PerspectiveCamera(90, props.width/props.height, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(props.width, props.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(bgColor, 0)

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);
    light.position.set(5, 5, 5);
    light.scale.set(100, 100, 100);

    useEffect(() => {
        loader.load(props.ModelURL, (gltf) => {
            mesh.current = gltf.scene
            setLoaded(true)
        }, () => {}, () => {
            mesh.current = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2), new THREE.MeshBasicMaterial({color: 0x40826D}))
            setLoaded(true)
        })
    }, [])

    useLayoutEffect(() => {
        if(!hasWebGL || !loaded || !mesh.current) return;

        modelRef.current?.appendChild(renderer.domElement);

        const locMesh = mesh.current
        locMesh.rotation.y = Math.PI
        scene.add(light)
        scene.add(locMesh);

        fitCameraToObject(camera, locMesh)
        
        if(locMesh.rotation.equals(new THREE.Euler(0, 0, 0))){
            locMesh.rotation.x = rotation.x
            locMesh.rotation.y = rotation.y
            locMesh.rotation.z = rotation.z
        }

        const animate = () => {
            const bbox = modelRef.current?.getBoundingClientRect()
            const distanceFromBottom = window.innerHeight-(bbox && bbox.bottom > 0 ? bbox.bottom : 0)
            const pixelActivation = window.innerHeight*activation;
            const activeHeight = window.innerHeight-((window.innerHeight-pixelActivation)*2);

            cancelAddress.current = requestAnimationFrame(animate);

            if(!props.continuous){
                if(bbox && bbox.top < pixelActivation && window.innerHeight-bbox.top < pixelActivation){
                    console.log(distanceFromBottom, bbox.top, pixelActivation)
                    //activeHeight - something makes the model start rotating from the backwards position
                    var newY = ((activeHeight-(bbox.top-pixelActivation))/activeHeight)*(Math.PI);
                    locMesh.rotation.y = newY
                }
            }
            else{
                if(bbox && bbox.top < pixelActivation && distanceFromBottom < pixelActivation){
                    locMesh.rotation.x += xRot;
                    locMesh.rotation.y += yRot;
                    locMesh.rotation.z += zRot;
                }
            }
    
            renderer.render(scene, camera);
        };
        
        animate();
        setRotation(locMesh.rotation)

        return () => {
            if(cancelAddress.current !== undefined) cancelAnimationFrame(cancelAddress.current)
            renderer.forceContextLoss()
            modelRef.current?.removeChild(renderer.domElement);
        }
    }, [loaded])

    component = !hasWebGL ? component : (
        <div className="borderRadius-2" style={{display: "flex", alignItems: 'center', position: 'relative',
        background: bgColor, justifyContent: 'center', width: props.width+20, height: props.height+20}}>
            <div ref={modelRef}></div>
        </div>
    );

    return component;
}