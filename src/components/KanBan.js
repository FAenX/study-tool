import React from "react"
import "./KanBan.scss"
import clsx from "clsx"

class KanBan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            scrolled: 0,
        }
    }

    componentDidMount=()=>{
        window.addEventListener("scroll", this.watchScrolling);
    }

    watchScrolling = () => {
        const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
        const winScroll = document.body.scrollTop || scrollTop;
        const winHeight = scrollHeight - clientHeight;
        const scrolled = (winScroll / winHeight) * 100;

        console.log(scrolled)

        if (winHeight > 0) {
          this.setState({scrolled,})
        } 
    };

    render(){
        const ifScrolled =()=>{
            if(this.state.scrolled >= 60){
                return true
            }
            return false
        }
        return(
            <div 
                className={clsx("kan-ban",{
                    "stretch-in": ifScrolled()
                })}
            >
                KanBan
            </div>
        )
    }
}

export default KanBan;