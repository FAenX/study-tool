import moment from "moment"
import { node } from "prop-types";

interface Data {    
    day: string, 
    data: Array<number>    
}

export class DataFactory {
    length: number
    data: Data[]
    constructor(
        data: any,
        length: number
        ){
            this.length = length;
            this.data = data
        }
    
    private getDataPoint(day: string) {
        let data = this.data
        return data.find((item: Data)=>item.day === day) 
    }
    
    //takes an array retruns an average
    private getaverage(arr: number[], period: number){
            return arr.reduce((a: number,b: number) => a + b, 0) / period 
    }

    //return an array of keys for ${length}
   makeHistoryKeysArr(){        
        let historyKeysArr = [];
        for (let i = 0; i < this.length;  i++){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
        }
        historyKeysArr = historyKeysArr.reverse()
        return historyKeysArr
    };
    
    //retrun an array of strings
    makeDaysArr(){
        let days = []
        for (let i = 0; i < this.length;  i++){
            days.push(moment().subtract(i, 'days').format("dd"))
        }
        days = days.reverse()
        return days
    }

    // filter history by key && multiply returned array.length by 30 mins
    // to get total time on that day 
    dailyData ( key: string ){        
                let dataPoint = this.getDataPoint(key)
                if (!dataPoint){
                    return 0
                }           
                return dataPoint.data.length*30
        };


    average(day: string){
        // the last recorded data
        if(this.data.length < 1){
            return
        }
        const earliestData=this.data[0].day 
        let period = moment(day)
            .diff(moment(earliestData), 'days')  

        let cleanData: number[] = [];
        for (let i=0; i <= period; i++){
            const forDay = moment(earliestData).add(i, 'day').format('YYYYMMMMDD')

            const dailyData = this.dailyData(forDay)
            cleanData.push(dailyData)
        }
        
        let average = this.getaverage(cleanData, period)
        return average
        
    }
}


