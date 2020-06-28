import React from 'react'
import {Card, List} from '@material-ui/core'
import './summary.scss'
import {useStaticQuery, graphql} from 'gatsby'
import Timer from './timer'
import {connect} from 'react-redux'
import moment from 'moment'

const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

function TotalTime(){
  let data = useStaticQuery(graphql`
    query{
    allMongodbTestTabledatas{
        edges {
            node {
            id
            day
            data
        }
        }
    }
    
    }
  
  `)
  let {allMongodbTestTabledatas} = data
  let from = moment(allMongodbTestTabledatas.edges[0].node.day)
  let diff = moment().diff(moment(from), 'days')
  return(
   <div> {diff} days</div>
  )
}
  

function Summary({dispatch, state,}){
    return(
        <Card variant="outlined" className="summary-wrapper">
          <List>
            <div>Timer:</div>
            <Timer dispatch={dispatch} state={state}/>
          </List>
            {/* {makeList(14).map(i =>(<Cell key={i}/>))} */}
          <List>
            <div>Total time:</div>
             <TotalTime />
          </List>
          <List>
            <div>Streak:</div>
             <TotalTime />
          </List>
          <List>
            <div>Best time:</div>
             <TotalTime />
          </List>
          <List>
            <div>Avarage today:</div>
             <TotalTime />
          </List>
          <List>
            <div>Time to mastery:</div>
             <TotalTime />
          </List>
          
        </Card>
    )
}

export default connect(state=>({
  state
}), null)(Summary) 
