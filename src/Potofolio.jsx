import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, Suspense ,useCallback} from 'react';
import { Mesh, Vector3 } from 'three';
import './App2.css';
import { config, useSpring, animated } from "@react-spring/three"
import { Text, Image, useScroll, ScrollControls, Scroll, PresentationControls } from '@react-three/drei';
import Mousemove from './Mousemove';
import { OrbitControls, Bounds, BakeShadows } from '@react-three/drei'
// import { useLocation } from 'react-router';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Link } from "react-router-dom";
import { useEffect } from 'react';


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
      <Text position={[0, -height*2, 0]} fontSize={4} color={"black"}>Food</Text>
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
    group.current.children[2].material.zoom = 2 - data.range(0, 1/2, 0.1);
    group.current.children[3].material.zoom = 2 - data.range(0, 1/2, 0.1);
  }
  )
  return (
    <group ref={group}>
        <OrbitControls/>
      <Image url="./gakkousyunya.jpg" scale={[width/1.5, height/1.5, 1]} position={[2.5, 2,-1]} />
      <Image url="./kakkoii.jpg" scale={[width/2, height, 1]} position={[5.5, -height-1, -1]} />

      <Image url="./delta.jpg" scale={[width/2.5, height/2.5, 1]} position={[-4,-height*2.5-1,1]} />
      <Image url="./okonomi.jpg" scale={[width/2.5, height/2, 1]} position={[5.5, -height*2.5-3,-1]} />
      <Image url="./akafuku.jpg" scale={[width/2, height/2, 1]} position={[-5, -height*3.2,-1]} />
      <Image url="./tonkatu.jpg" scale={[width/2, height/2, 1]} position={[7, -height*3.5,1]} />
    </group>
  );
}



function App() {
  // const navigate = useNavigate();
  const [changeMouse, setChangeMouse] = useState(false)
  const change = () => {
    setChangeMouse(!changeMouse)
    console.log(changeMouse)
  }
  const history = useHistory();
  useEffect(()=>{
    document.addEventListener('keydown', handleClick)
  })
  const handleClick =useCallback((e) => {
    if(e.key ==='d'){
      history.push('/about')
    }
  },[])

  const width= 0
  return (
    <>
    {/* <Link to ={'/about'}>aaa</Link> */}
    {/* <button onClick={gotopage()}></button> */}
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
              <Text position={[width-5.8, 5, 2]} fontSize={2} color="white">About</Text>
              <Text position={[width-5, 3.5, 1]} fontSize={2} color="white">Fujisawa</Text>
              <Text position={[width-4.5, 1.5, 1]} fontSize={2} color="white">Syunya</Text>
              <Images />
              <Info />
            </Scroll>
            <ambientLight intensity={0.5} />
            <pointLight position={[-10,-10,-10]} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
export default App
