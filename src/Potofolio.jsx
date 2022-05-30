import { Canvas, useFrame,useThree } from '@react-three/fiber'
import { useRef, useState,Suspense } from 'react';
import { Mesh, Vector3 } from 'three';
import './App2.css';
import {config,useSpring,animated} from "@react-spring/three"
import { Text,Image,useScroll ,ScrollControls,Scroll} from '@react-three/drei';
import Mousemove from './Mousemove';

const Rig = ({v=new Vector3()}) => {
    return useFrame((state)=>{
      //   x,yは値が大きいほど動かなくなる0.05のとこは変えると慣性がかかる
      state.camera.position.lerp(v.set(state.mouse.x/2,state.mouse.y/2,10),0.05)
    })
  }

function Info(){
    return(
        <>
        <Text position={[-1,-5,0]} fontSize={2}>Data</Text>
        <Text position={[-1,-5.5,0]} fontSize={2}>Birthday</Text>
        <Text position={[-1,-5,0]} fontSize={2}>2002/07/10</Text>
        <Text position={[-1,-6,0]} fontSize={2} color={"red"}>From</Text>
        <Mousemove />
        </>
    )
}




function App(){
    return(
        <>

        <Canvas gl={{antialias:false}} dpr={[1,1.5]}>
        <Suspense fallback={null}>
        <ScrollControls
          damping={3}
          pages={6}
          horizontal={false}
          infinite={false}
        >
          {/* <Mousemove /> */}
            <Rig/>
            <Scroll>
            <Text position={[-1,5,0]} fontSize={2} color="black">About</Text>
            <Text position={[0,3.5,-1]} fontSize={2} color="#6b778a">Fujisawa</Text>
            <Text position={[0,2,-1]} fontSize={2} color="#6b778a">Syunya</Text>
            </Scroll>
            <Scroll>
            <Info />
            </Scroll>
            <ambientLight intensity={0.5}/>
          <spotLight position={[10,10,10] }angle={0.15} penumbra={1} />
        <pointLight position={[-10,-10,-10]} />
        </ScrollControls>
        </Suspense>
        </Canvas>
        </>
    )
}
export default App