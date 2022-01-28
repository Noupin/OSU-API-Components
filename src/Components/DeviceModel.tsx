import * as THREE from "three";
import { FC, useLayoutEffect, useRef } from "react";
import { Props } from "../Models/Props";
import { DeviceModelProps } from "../Models/DeviceModelProps";
import { isWebGL } from "../Helpers";

export const DeviceModel: FC<Props<DeviceModelProps>> = ({props}) => {
    const modelRef = useRef<HTMLDivElement>(null);
    const hasWebGL = isWebGL();

    const xRot = props.xRot ? props.xRot : 0.01;
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
            const camera = new THREE.PerspectiveCamera(75, props.width/props.height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();

            renderer.setSize(props.width, props.height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(bgColor, 0)
            
            modelRef.current?.appendChild(renderer.domElement);
            
            const geometry = new THREE.BoxGeometry(1, 2, 1);
            const material = new THREE.MeshBasicMaterial({color: 0x40826D});
            const mesh = new THREE.Mesh(geometry, material);
            
            scene.add(mesh);
            camera.position.z = 5;
            
            const animate = function () {
                requestAnimationFrame(animate);

                mesh.rotation.x += xRot;
                mesh.rotation.y += yRot;
                mesh.rotation.z += zRot;

                renderer.render(scene, camera);
            };
            
            animate();

            return () => {
                modelRef.current?.removeChild(renderer.domElement);
                return;
            }
        }
    }, []);


    component = !hasWebGL ? component : (
        <div className="borderRadius-2" style={{display: "flex", alignItems: 'center',
        background: bgColor, justifyContent: 'center', width: props.width+20, height: props.height+20}}>
            <div ref={modelRef}></div>
        </div>
    );

    return component;
}