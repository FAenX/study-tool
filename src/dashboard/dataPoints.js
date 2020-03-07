import {AllData, Averages} from "../DataFunctions"
import moment from "moment"

//progress line graph datapoints
export function dataPoints(history, doneToday, historyLength){
    // map history to historyKeysArr
    const dataOfdays = AllData.makeHistoryKeysArr(history, historyLength).map(i=>{
        // if data is undefined
        let datum = AllData.filterHistory(history, i)
        if (datum===undefined){ datum={data: []} }
        // use local data for day today
        if (i === moment().format("YYYYMMMMDD")){
            if(doneToday==null || doneToday === undefined) {}
            else{datum = {data: doneToday}}
        }
        return datum.data.length*30
    })
    const createDataPoints = Object.keys(AllData.makeHistoryKeysArr(history, historyLength)).map(i=>{
        return {x: i, y: dataOfdays[i]}
    })
    return createDataPoints
}

// moving average data points
export function movingAverages (history, doneToday, historyLength){
    // map history to historyKeysArr	
    const dataOfdays = Averages.makeAverageHistoryKeysArr(history).map(i=>{
        // if data is undefined
        let datum = AllData.filterHistory(history, i)
        if (datum===undefined){
            datum={data: []}
        }
        // use local data for day today
        if (i === moment().format("YYYYMMMMDD")){
            if(doneToday==null ||doneToday === undefined){
                datum = {data: []}
            }else{
                datum = {data: doneToday}
            }
        }
        return datum.data.length*30
    })

   

    const average = Averages.AveragesArray(dataOfdays).reverse()
    const [...averageTofit] = average.splice(average.length-historyLength)
    
    const dataPoints = Object.keys(AllData.makeHistoryKeysArr(history, historyLength)).map(i=>{
        return {x: i, y: averageTofit[i]}
    })
    return dataPoints
}

export function makeDaysArr (history, historyLength){
    return AllData.makeDaysArr(history, historyLength)
}
