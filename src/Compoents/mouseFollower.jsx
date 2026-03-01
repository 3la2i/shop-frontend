import { useState, useEffect } from 'react';

const MouseFollower = () => {
    const [posion,setPosion] = useState({x:0,y:0});
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosion({x:e.clientX,y:e.clientY});
        }
        window.addEventListener('mousemove',handleMouseMove);
        return () => {
            window.removeEventListener('mousemove',handleMouseMove);
        }
    },[]);
    return (
        <div style={{position:'fixed',left:posion.x,top:posion.y,zIndex:1000 ,pointerEvents:'none'}}>
            <div style={{width:8 ,height:8,backgroundColor:'green',borderRadius:'50%'}}></div>
        </div>
    )
}
export default MouseFollower;