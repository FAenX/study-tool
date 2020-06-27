import moment from "moment"
import { node } from "prop-types";

interface Data {
    node: {
        day: string, 
        data: Array<number>
    }
}

export class DataFactory {
    length: number
    data: Data[]
    constructor(
        data: Data[],
        length: number
        ){
            this.length = length;
            this.data = data
        }
    
    private getDataPoint = (day: string)=> (
        this.data.find((item: Data)=>item.node.day === day) 
    ) 
    
    //takes an array retruns an average
    private getaverage=(arr: number[], period: number)=>(
        arr.reduce((a: number,b: number) => a + b, 0) / period 
    )

    makeHistoryKeysArr(){        
        let historyKeysArr = [];
        for (let i = 0; i < this.length;  i++){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
        }
        historyKeysArr = historyKeysArr.reverse()
        return historyKeysArr
    };
    
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
                let dataPoint: Data = this.getDataPoint(key)
                if (!dataPoint){
                    return 0
                }           
                return dataPoint.node.data.length*30
        };


    average(day: string){
        
        const earliestData=this.data[0].node.day 
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


