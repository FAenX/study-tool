import React from 'react'
import Timer from './timer'
import {connect} from 'react-redux'

const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

function TotalTime(){
  
  return(
   <div> {/* {diff} */} days</div>
  )
}
  

function Summary({dispatch, state,}){
    return(
        <div className="summary-wrapper is-flex is-justify-content-center is-align-content-center is-flex-direction-column ">
          <div className="summary p-2">
            <div>Timer:</div>
            <Timer dispatch={dispatch} state={state}/>
          </div>
            {/* {makeList(14).map(i =>(<Cell key={i}/>))} */}
          <div className="summary p-2">
            <div>Total time:</div>
             {/* <TotalTime /> */}
          </div>
          <div className="summary p-2">
            <div>Streak:</div>
             {/* <TotalTime /> */}
          </div>
          <div className="summary p-2">
            <div>Best time:</div>
             {/* <TotalTime /> */}
          </div>
          <div className="summary p-2">
            <div>Avarage today:</div>
             {/* <TotalTime /> */}
          </div>
          <div className="summary p-2">
            <div>Time to mastery:</div>
             {/* <TotalTime /> */}
          </div>
          
        </div>
    )
}

export default connect((state, dispatch)=>({state, dispatch}))(Summary) 
