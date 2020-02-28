// filter history by key, return arr 
export function filterHistory (history, key){
    return history.filter(dataPoint=>{
                let data;
                if (dataPoint.day === key )
                    {
                        data = dataPoint.data
                    }
                
                return data
            })[0]
   
};


// return avarages array
export function AvarageAtPoint(data){
    data = data.reverse()
    const addArr=(arr)=>arr.reduce((a,b) => a + b, 0)/arr.length
    const dataSet = Object.keys(data).map(i=>addArr(data.slice(i)))
    return dataSet
}



