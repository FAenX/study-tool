import { Dispatch } from "redux";
import { UPDATE_CELL } from "../types";
import {graphql} from 'gatsby'

export const updateCell = ({data}) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPDATE_CELL,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const data = graphql`
    {
      allMongodbTestTabledatas(filter: {day: {eq: "2020June23"}}) {
        nodes {
          day
          data
        }
      }
    }
  `

  console.log(data)