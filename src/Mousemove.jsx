import React, { useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"

function Mousemove(){
    const {viewport} = useThree()
    const ref = useRef()
    useFrame(({mouse})=>{
        const x = (mouse.x * viewport.width)/2.5
        const y = (mouse.y * viewport.height)/2
        // ポジション指定
        ref.current.position.set(x, y, 0)
        // 転がり指定
        ref.current.rotation.set(-y, x, 0)
    })

    return(
        <mesh ref={ref} castShadow>
            <dodecahedronBufferGeometry  attach="geometry" />
            {/* <Box color={"red"} /> */}
            <meshBasicMaterial attach="material" color={"red"}/>
        </mesh>
    )
}

export default Mousemove