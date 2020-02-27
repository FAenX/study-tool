


export function AvarageAtPoint(data){
    
    data = data.reverse()
    console.log(data)

    const addArr=(arr)=>{
        let total=arr[0]
        for(let i=1; i<arr.length; i++){
            total = total+arr[i]
        }
        return total/arr.length
    }

    const movingAvarages = ()=>{
        let ret=[];
        for (let i = 0; i<data.length; i++){
            
            ret.push(addArr(data.slice(i)))
        }
       
        return ret;
    }
    const mv = movingAvarages() 
    return {mv}

    
}


