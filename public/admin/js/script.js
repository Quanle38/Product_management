//button status
const buttonStatusList = document.querySelectorAll("[button-status]");
if(buttonStatusList.length > 0){
    let url = new URL(window.location.href)
    buttonStatusList.forEach((buttonStatus)=>{
        buttonStatus.addEventListener("click",(e)=>{
            const status = e.target.getAttribute("button-status");
            console.log(url.searchParams)
            if(status){
                url.searchParams.set("status",status)
            } else{
                url.searchParams.set("status")
            }  
            window.location.href = url.href     
        })
    })
    
    
    
}
//end button-status