import { Canvas, useFrame,useThree } from '@react-three/fiber'
import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import './App2.css';
import {config,useSpring,animated} from "@react-spring/three"
import { Text,Image,useScroll ,Scroll} from '@react-three/drei';



function Images() {
  //   // 現在スクロールしている位置を取得
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef();
  useFrame(() => {
    // group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    // group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    // group.current.children[2].material.zoom =
    //   1 + data.range(1.15 / 3, 1 / 3) / 3;
    // group.current.children[3].material.zoom =
    // 1 + data.range(1.15 / 3, 1 / 3) / 3;
  });
  
  return (
    //       {/* z座標によって手前家屋か決めれる */}
    <group ref={group}>
      {/* <Rig /> */}
      <Image url="./img1.jpg" scale={[4, height, 1]} position={[-1, -3, 1]} />
      <Image url="./img2.jpg" scale={3} position={[2, -3, 1]} />
      <Image
        url="./img3.jpg"
        scale={[1, 3.5, 1]}
        position={[-2.3, -height, 2]}
      />
      <Image
        url="./img3.jpg"
        scale={[1, 2.7, 1]}
        position={[-1.4, -height - 0.7, 1]}
      />
      <Image
        url="./img4.jpg"
        scale={[1.4, 2, 1]}
        position={[1.3, -height - 0.3, 3.2]}
      />
    </group>
  );
}

function Box(props){
  const ref = useRef();
  const [Clickd,setClick] =useState(false)
  const [Hoverd,setHover] =useState(false)
  // fiberのライブらり
  useFrame(()=>(ref.current.rotation.x += 0.01));
  
  const {scale} =useSpring({
    scale:Clickd ? 2:1,
    config:config.wobbly,
  })
  
  return(
    <mesh
    // スプレッド構文らしい
    {...props}
    ref={ref} 
    // onClickでスケールをtrueの時２倍、falseの時は１倍にする
    onClick ={()=>setClick(!Clickd)} 
    onPointerOver={()=>setHover(true)}
    onPointerOut={()=>setHover(false)}
    scale={Clickd ? 2 : 1 }
    >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={Hoverd ? "hotpink" :"yellow"}/>
    </mesh>
  )
}
// マウス操作でうにゃうにゃ動く
const Rig = ({v=new Vector3()}) => {
  return useFrame((state)=>{
    //   x,yは値が大きいほど動かなくなる0.05のとこは変えると慣性がかかる
    state.camera.position.lerp(v.set(state.mouse.x/2,state.mouse.y/2,10),0.05)
  })
}


function App2() {
  return (
    <>
    {/* <ResponsiveAppBar /> */}
    <div id = "canvas-container">
      <Canvas>
        {/* meshは３Dオブジェクトのこと */}
        {/* positionは減点から-2した感じ */}
          <Box position={[-1.6,0,0]} />
          <Box position={[1.6,0,0]} />
          <Box position={[0,0,-10]}/>

          <Rig />
          {/* 霧奥に行けば行くほど薄くなる  (色,開始距離,終点距離)*/}
          <fog attach="fog" color={'green'} near={1} far={20}/>
{/* 文字表示 */}
          <Text position={[0,2,0] } fontSize={3} color={'red'}>syunya</Text>
          <Text position={[0,0,2] } fontSize={3} color={'#222'}>fujisawa</Text>

          {/* <boxGeometry args={[2,2,2]} /> */}
          <ambientLight intensity={0.5}/>
          <spotLight position={[10,10,10] }angle={0.15} penumbra={1} />
        <pointLight position={[-10,-10,-10]} />
      </Canvas>
    </div>
    <h1>Threejs Fiber</h1>
    {/* <a href="">もっとみる</a> */}
    </>
  );
}

export default App2;
