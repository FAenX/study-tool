//read from db
export  async function FetchTableData(){
console.info("fetching")
    const fetchData =  await fetch("/api/v1/TableData/", {
      method: "GET",                    
      })
      const response = await fetchData.json()
      try
      {
        localStorage.removeItem("history")
      }
      catch{
        //
      }
    localStorage.setItem("history", JSON.stringify(response))
    return response
}

//update db
async function UpdateTableData(data){
    console.info("updating")
    const updateRequest= await fetch("/api/v1/TableData/", {
      method: "PATCH", 
      headers: {"Content-type": "application/json"},
      body: data                       
      })    
    const response = await updateRequest.json()
    return response
}
//write to db
export async function WriteTableData(data){
    const writeRequest = await fetch("/api/v1/TableData/", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: data                    
      })    
      const response = await writeRequest.json()
      
      if (response.status === 400 && response.id)
      {
        data=JSON.parse(data)
        data["id"]=response.id
       UpdateTableData(JSON.stringify(data))
      }
     
      
    return response
}

