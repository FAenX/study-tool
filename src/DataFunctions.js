


export function AvarageAtPoint(data){
    
    data = data.reverse()

    const addArr=(arr)=>{
        let total = arr.reduce((a,b) => a + b, 0)
        return total/arr.length
    }

    const movingAvarages = ()=>{
        let ret=[];
        for (let i = 0; i<=data.length; i++){
            
            ret.push(addArr(data.slice(i)))
        }
        return ret;
    }
    const dataSet = movingAvarages() 
    return {dataSet}

    
}


