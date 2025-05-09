
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
                url.searchParams.delete("status")
            }  
            window.location.href = url.href     
        })
    });

    //search
    const search = document.querySelector("#form-search");
    if(search){
        let url = new URL (window.location.href);
        search.addEventListener("submit",(e)=>{
            e.preventDefault();
            const searchInput = document.querySelector(".form-control");
            console.log(searchInput)
            const value = searchInput.value;
            if(value){
                url.searchParams.set("keyword",value)
            }
            window.location.href = url.href;
        });
    }
    
    
    
}
//end button-status