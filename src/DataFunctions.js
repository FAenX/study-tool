


export function AvarageAtPoint(data, index){
    const cleanedData = Object.keys(data).map(i=>data[i].data.length*30).reverse()
   

    

    const cumulativeAvarages = cleanedData.map(i=>{
        let cumu=[]
       
        if(cleanedData.indexOf(i)===0){
            cumu.push(i)
        }else{
            
            let prevIndex = cleanedData.indexOf(i)-1
            cumu.push(i+cleanedData[prevIndex])
        }
        return cumu;
    })
   
   
    return {cumulativeAvarages, cleanedData}

    
}


