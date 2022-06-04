import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react';
import { Mesh, Vector3 } from 'three';
import './App2.css';
import { config, useSpring, animated } from "@react-spring/three"
import { Text, Image, useScroll, ScrollControls, Scroll, PresentationControls } from '@react-three/drei';
import Mousemove from './Mousemove';

const Rig = ({ v = new Vector3() }) => {
  return useFrame((state) => {
    //   x,yは値が大きいほど動かなくなる0.05のとこは変えると慣性がかかる
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}

function Info() {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      {/* <Text position={[-5, -height*2, 1]} fontSize={2.5} color={"#927c9c"}>Data</Text> */}
      <Text position={[-4, -height+3, 0.5]} fontSize={2}>Birthday</Text>
      <Text position={[-3, -height+1.5, 0]} fontSize={1.5}>2002/07/10</Text>
      <Text position={[-5.5, -height-1, 0]} fontSize={2} color={"black"}>From</Text>
      <Text position={[-3, -height-3, 0]} fontSize={2} color={"black"}>Osaka</Text>
    </>
  )
}

function Images() {
  // useThreeで現在のサイズをもらえる
  const { width, height } = useThree((state) => state.viewport)
  const group = useRef()
  const data = useScroll();
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1, 0.1);
  }
  )
  return (
    <group ref={group}>
      <Image url="./gakkousyunya.jpg" scale={[width/1.5, height/1.5, 1]} position={[2.5, 2,-1]} />
      <Image url="./kakkoii.jpg" scale={[width/2, height, 1]} position={[5.5, -height-1, -1]} />
    </group>
  );
}



function App() {
  const [changeMouse, setChangeMouse] = useState(false)
  // const { width, height } = useThree((state) => state.viewport)
  const change = () => {
    setChangeMouse(!changeMouse)
    console.log(changeMouse)
  }
  const width= 0
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            // dampingは慣性を指定する
            damping={3}
            pages={6}
            horizontal={false}
            infinite={false}
          >
            <Rig />
            <Scroll>
              <Text position={[width-4, 5, 0]} fontSize={2} color="black">About</Text>
              <Text position={[width-2, 3.5, -1]} fontSize={2} color="#6b778a">Fujisawa</Text>
              <Text position={[width-2.5, 2, -1]} fontSize={2} color="#6b778a">Syunya</Text>
            </Scroll>
            <Scroll>
              <Images />
              <Info />
            </Scroll>
            <ambientLight intensity={0.5} />
            {/* <spotLight position={[10,10,10] }angle={0.15} penumbra={1} /> */}
            <pointLight position={[-10,-10,-10]} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
export default App
    // {/* <button onClick={change }></button>
    // {!function() {
    //   if(changeMouse==true){
    //     return(
    //       <Mousemove />
    //     );
    //   }
    // }} */}