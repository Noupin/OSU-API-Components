import * as THREE from "three";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Props } from "../Models/Props";
import { DeviceModelProps } from "../Models/DeviceModelProps";
import { fitCameraToObject, getMeshSize, isWebGL } from "../Helpers";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { palette } from "../Constants";

export const DeviceModel: FC<Props<DeviceModelProps>> = ({props}) => {
    if(props.glassmorphic === undefined) props.glassmorphic = true

    var classNames = props.glassmorphic ? "glassmorphic" : "";
    var component = (
        <div className={classNames} style={{display: "flex", alignItems: 'center',
        background: "#ececec", justifyContent: 'center', width: props.width, height: props.height}}>
            <image href={props.ImageURL}/>
        </div>
    );

    const [rotation, setRotation] = useState(new THREE.Euler(0, 0, 0))
    const [loaded, setLoaded] = useState(false)
    const mesh = useRef<THREE.Group | THREE.Mesh | THREE.Object3D>();
    const material = new THREE.MeshStandardMaterial({color: palette.light, roughness: 0.45, metalness: 0}) //new THREE.MeshPhongMaterial({color: palette.light})
    const cancelAddress = useRef<number>();
    
    const modelRef = useRef<HTMLDivElement>(null);
    const hasWebGL = isWebGL();

    const xRot = props.xRot ? props.xRot : 0;
    const yRot = props.yRot ? props.yRot : 0.005;
    const zRot = props.zRot ? props.zRot : 0;
    const bgColor = props.bgColor ? props.bgColor : "#00000000"

    var activation = 0.75;
    const startingRotation = Math.PI;
    const endingRotation = 0;

    const scene = new THREE.Scene()
    const loader = new GLTFLoader()
    const camera = new THREE.PerspectiveCamera(15, props.width/props.height, 0.1, 5)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(props.width, props.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(bgColor, props.bgColor ? 1 : 0) //0 is transparent 1 uses the color

    const light = new THREE.DirectionalLight("#FFFFFF", 0.75);
    light.position.set(0, 4, 4);

    useEffect(() => {
        if(!hasWebGL) return;

        loader.load(props.ModelURL, function(gltf){
            gltf.scene.traverse((obj) => {
                if(obj instanceof THREE.Mesh){
                    obj.material = material
                }
            })
            mesh.current = gltf.scene || gltf.scenes[0];
            setLoaded(true)
        }, () => {}, () => {
            mesh.current = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1), material)
            setLoaded(true)
        })
    }, [])

    useLayoutEffect(() => {
        if(!hasWebGL || !loaded || !mesh.current) return;

        modelRef.current?.appendChild(renderer.domElement);

        const locMesh = mesh.current
        locMesh.position.set(0, 0, 0)
        locMesh.rotation.y = startingRotation
        //Normalize model size to 1 unit max in bounding box
        const bbox = getMeshSize(locMesh)
        const scaleValue = Math.max(bbox.x, bbox.y, bbox.z)
        locMesh.scale.set(locMesh.scale.x/scaleValue, locMesh.scale.y/scaleValue, locMesh.scale.z/scaleValue)

        const lightScale = locMesh.scale.x > locMesh.scale.z ? locMesh.scale.x : locMesh.scale.z
        light.position.y = locMesh.scale.y;
        light.scale.set(lightScale, lightScale, lightScale)

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

            //Interactive Rotation
            if(!props.continuous){
                if(bbox && bbox.top < pixelActivation && window.innerHeight-bbox.top < pixelActivation){
                    //activeHeight - something makes the model start rotating from the backwards position
                    var newY = ((activeHeight-(bbox.top-pixelActivation))/activeHeight)*(Math.PI);
                    locMesh.rotation.y = newY
                }
                else if(bbox && bbox.top > pixelActivation){
                    //Lock at starting position if above the view
                    locMesh.rotation.y = startingRotation
                }
                else if(bbox && window.innerHeight-bbox.top > pixelActivation){
                    //Lock at ending position if above the view
                    locMesh.rotation.y = endingRotation
                }
            }
            //Continuous rotation when scrolled over
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

    classNames += " borderRadius-2"
    component = !hasWebGL ? component : (
        <div className={classNames} style={{display: "flex", alignItems: 'center', position: 'relative',
        background: bgColor ? bgColor : undefined, justifyContent: 'center', width: props.width+20,
        height: props.height+20}}>
            <div ref={modelRef}></div>
        </div>
    );

    return component;
}