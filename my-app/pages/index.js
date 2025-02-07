// components/RoseScene.jsx
import { Html, OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PositionalAudio } from "@react-three/drei";

function CityScene({ ready }) {
  return (
    <Canvas
      style={{
        backgroundColor: "lightblue", // Light gray background
        width: "100%",
        height: "100dvh",
      }} // Full screen canvas
      camera={{ position: [0, 2, 20], fov: 40 }}
    >
      <fog attach="fog" args={["#cc7b32", 0, 500]} />
      <CityModel ready={ready} />
    </Canvas>
  );
}

function RoseScene() {
  const [showWish, setShowWish] = useState(true);

  if (showWish)
    return (
      <div className="w-full h-full bg-pink-100 text-2xl p-4 text-center flex flex-col great-vibes-font">
        <p className="text-2xl font-bold mt-auto text-black">
          You are the cutest petal in my life, the sweetest fragrance in my
          world, and the only thorn I’d happily hug forever! 🌹
        </p>
        <br />
        <p className="text-4xl font-bold text-black">
          Love you more than bees love flowers! 💖{" "}
        </p>
        <button
          className="text-white rounded-lg text-[100px] font-bold my-20 mb-auto animate-bounce duration-300"
          onClick={() => setShowWish(false)}
        >
          🎁
        </button>
      </div>
    );

  return (
    <>
      <Canvas
        style={{
          backgroundColor: "#1b1b1b", // Light gray background
          width: "100%",
          height: "100dvh",
        }} // Full screen canvas
        camera={{ position: [0, 150, 250], fov: 100 }}
        shadows
        gl={{ alpha: false }}
      >
        {/* add a cross button to close the wish */}
        {/* Lighting */}
        <ambientLight intensity={0.8} color={"#ffffff"} />{" "}
        {/* Ambient light with a white color */}
        {/* Add a stronger directional light to simulate sunlight */}
        <directionalLight
          position={[10, 10, 10]}
          intensity={0.9}
          color={"#ffffff"}
          castShadow
        />
        {/* Point light for local highlights */}
        <pointLight
          position={[5, 5, 5]}
          intensity={0.8}
          color={"#f0f0f0"}
          castShadow
        />
        {/* Load and display the model */}
        <RoseModel />
        {/* Orbit Controls to move around the scene */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={10}
          enableDamping
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <button
        className="absolute top-0 right-0 m-4 p-2 text-white rounded-lg text-3xl font-bold"
        onClick={() => setShowWish(true)}
      >
        x
      </button>
    </>
  );
}

function CityModel({ ready }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene-draco.glb");
  useFrame(() => (group.current.rotation.y += 0.003));
  return (
    <group ref={group} scale={0.001} position={[0, 0, -100]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-102253.52, -210688.86, -17050.52]}>
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_0.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_1.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_2.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_3.geometry}
          />
        </group>
        <group position={[100000, 120000, 2000]}>
          {ready && (
            <PositionalAudio
              autoplay
              loop
              url="/zapsplat_icecream.mp3"
              distance={3}
            />
          )}
        </group>
        <mesh position={[250000, -200000, 50000]}>
          <sphereGeometry args={[30000, 32, 32]} />
          <meshBasicMaterial color="#ff1020" />
        </mesh>
      </group>
    </group>
  );
}

function RoseModel() {
  const object = useLoader(OBJLoader, "/red_rose3.obj"); // Load the .obj model from the public folder
  const [material, setMaterial] = useState(
    new THREE.MeshStandardMaterial({
      metalness: 0,
      roughness: 0.8,
      side: THREE.DoubleSide,
    }),
  );

  useEffect(() => {
    if (object) {
      object.traverse((child) => {
        if (child.isMesh) {
          let newMaterial = material.clone();

          // Set specific colors for different parts of the rose model
          if (child.name === "rose") {
            newMaterial.color.set("crimson");
          } else if (child.name === "calyx") {
            newMaterial.color.set("#001a14");
          } else if (child.name === "leaf1" || child.name === "leaf2") {
            newMaterial.color.set("#00331b");
          }

          child.material = newMaterial;
        }
      });
      object.rotation.set(0, Math.PI / 1.7, 0); // Set the rotation of the object
    }
  }, [object, material]);

  return <primitive object={object} />;
}

function Home() {
  return (
    <div
      onClick={() => {
        console.log("clicked");
      }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* <CityScene /> */}
      <RoseScene />
    </div>
  );
}

export default Home;
