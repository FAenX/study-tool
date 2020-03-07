import moment from "moment"

export class AllData {

    static  makeHistoryKeysArr (history, historyLength){
        
        let historyKeysArr = [];
        for (let i = 0; i < historyLength;  i++){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
        }
        historyKeysArr = historyKeysArr.reverse()
        return historyKeysArr
    };
    
    static makeDaysArr(history, historyLength){
        let days = []
        for (let i = 0; i < historyLength;  i++){
            days.push(moment().subtract(i, 'days').format("dd"))
        }
        days = days.reverse()
        return days
    }

    // filter history by key, return arr 
    static filterHistory (history, key){ return history.filter(dataPoint=>{
        let data;
        if (dataPoint.day === key )
            {
                data = dataPoint.data
            }
        return data
    })[0];

    };
} 

export class Averages {
    // return Averages array
    static AveragesArray(data){
        data = data.reverse()
        const addArr=(arr)=>arr.reduce((a,b) => a + b, 0)/arr.length
        const movingAverages = ()=>{
        let ret=[];
        for (let i = 0; i<data.length; i++){
            
            ret.push(addArr(data.slice(i)))
        }
        return ret;
        }
        const dataSet = movingAverages() 
        return dataSet
    }

    // create an array of dataPoint keys 
    static makeAverageHistoryKeysArr (history){
        // the last data in array was the first to be recorded
        const [earliestData] = history.reverse()	
        let AverageHistoryKeysArr = [];
        // the whole duration recorded
        const duration = moment.duration(moment().diff(moment(earliestData.day))).asDays()
        // create list of keys == datapoints
        for (let i = 0; i <= duration; i++){
            AverageHistoryKeysArr.push(moment(earliestData.day).add(i, 'days').format("YYYYMMMMDD"));
        }
        return AverageHistoryKeysArr
    };
}


