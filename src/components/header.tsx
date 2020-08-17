import React from "react";
import './header.scss'
import {Button} from '@material-ui/core'
import { studyDataFunctions } from "../backend/studyData";


const Header = () => {

  return(
    <nav className="navbar">
      <div className="logo">study tool</div>
      <Button 
        variant="outlined" 
        className="login-button" 
        // onClick={()=>login()}
      >
        login
        </Button>
    </nav>
  )
};

export default Header;
