
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
}
//end button-status

//search
const search = document.querySelector("#form-search");
if(search){
    let url = new URL (window.location.href);
    search.addEventListener("submit",(e)=>{
        e.preventDefault();
        const searchInput = document.querySelector(".form-control");
        const value = searchInput.value;
        if(value){
            url.searchParams.set("keyword",value)
        }
        window.location.href = url.href;
    });
}
//deleted search
const deleteSearch = document.querySelector("#clear-search");
if(deleteSearch){
    let url = new URL(window.location.href);
    deleteSearch.addEventListener("click" ,()=>{
        const searchInput = document.querySelector(".form-control");   
        searchInput.value = "";
        url.searchParams.delete("keyword");
        window.location.href = url.href; 
    });
}
//end delete search




