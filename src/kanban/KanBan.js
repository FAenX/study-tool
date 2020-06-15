import React, { useEffect, useState } from "react"
import "./KanBan.scss"
import clsx from "clsx"
import Card from "./components/Card"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}



const KanBan =props=>{
    const [positionY, setPositionY]=useState(0)
    const [cards, setCards] = useState(4)
    

    useEffect(()=>{
        window.addEventListener("scroll", watchScrolling);
    })

    const watchScrolling = () => {
        const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
        const winScroll = document.body.scrollTop || scrollTop;
        const winHeight = scrollHeight - clientHeight;
        const scrolled = (winScroll / winHeight) * 100;
        setPositionY(scrolled)
    };

    return(
        <div 
            className={clsx("kan-ban",{
                // "minimize": positionY < 30
            })}
        >
            {makeList(cards).map((i)=>{
                return <Card key={i} positionY={positionY}/>
            })}
            
        </div>
    )
  
}

export default KanBan;