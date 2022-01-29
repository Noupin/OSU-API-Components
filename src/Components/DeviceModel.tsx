import * as THREE from "three";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { Props } from "../Models/Props";
import { DeviceModelProps } from "../Models/DeviceModelProps";
import { fitCameraToObject, isWebGL } from "../Helpers";
import { useIntersection } from "../Hooks";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const DeviceModel: FC<Props<DeviceModelProps>> = ({props}) => {
    const modelRef = useRef<HTMLDivElement>(null);
    const inView = useIntersection(modelRef, "-25%");
    const hasWebGL = isWebGL();
    const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0));

    const xRot = props.xRot ? props.xRot : 0;
    const yRot = props.yRot ? props.yRot : 0.01;
    const zRot = props.zRot ? props.zRot : 0;

    const bgColor = props.bgColor ? props.bgColor : "#000000"

    var component = (
        <div className="" style={{display: "flex", alignItems: 'center',
        background: "#ececec", justifyContent: 'center', width: props.width, height: props.height}}>
            <image href={props.ImageURL}/>
        </div>
    );

    useLayoutEffect(() => {
        if (hasWebGL) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(90, props.width/props.height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            const loader = new GLTFLoader();

            const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);
            light.position.set(5, 5, 5);
            scene.add(light)

            renderer.setSize(props.width, props.height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(bgColor, 0)
            
            modelRef.current?.appendChild(renderer.domElement);
            
            var mesh: THREE.Group | THREE.Mesh
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshBasicMaterial({color: 0x40826D});
            mesh = new THREE.Mesh(geometry, material);

            loader.load(props.ModelURL, gltf => {
                mesh = gltf.scene;
                scene.add(mesh);
            });

            //When in update loop the visualization give motion
            //sickness but does stay in frame the whole time
            fitCameraToObject(camera, mesh)
            
            if(mesh.rotation.equals(new THREE.Euler(0, 0, 0))){
                mesh.rotation.x = rotation?.x
                mesh.rotation.y = rotation?.y
                mesh.rotation.z = rotation.z
            }
            
            const animate = () => {
                requestAnimationFrame(animate);

                if (inView) {
                    mesh.rotation.x += xRot;
                    mesh.rotation.y += yRot;
                    mesh.rotation.z += zRot;
                }

                renderer.render(scene, camera);
            };
            
            animate();
            setRotation(mesh!.rotation)

            return () => {
                modelRef.current?.removeChild(renderer.domElement);
                return;
            }
        }
    }, [inView]);


    component = !hasWebGL ? component : (
        <div className="borderRadius-2" style={{display: "flex", alignItems: 'center',
        background: bgColor, justifyContent: 'center', width: props.width+20, height: props.height+20}}>
            <div ref={modelRef}></div>
        </div>
    );

    return component;
}