
//button status
const buttonStatusList = document.querySelectorAll("[button-status]");
if(buttonStatusList.length > 0){
    let url = new URL(window.location.href)
    buttonStatusList.forEach((buttonStatus)=>{
        buttonStatus.addEventListener("click",(e)=>{
            const status = e.target.getAttribute("button-status");
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
            if(url.searchParams.has("page")){
               url.searchParams.delete("page");
            }
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

//logic next
const buttonGroup = document.querySelectorAll("[button-pagination]");
if(buttonGroup.length > 0){
    let url = new URL(window.location.href)
    buttonGroup.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const value = e.target.attributes[1].value;          
            if(url.searchParams.has("page")){
                const page = parseInt(url.searchParams.get("page"));
                if(page ===1 && value ==="prev"){
                    return;
                }
                if(value==="prev"){
                    url.searchParams.set("page", page - 1)
                } else {
                    url.searchParams.set("page",page +1 )
                }
                window.location.href = url.href;
            }

        })
    })
}
// page-number
const buttonNumber = document.querySelectorAll("[page-pagination]");
if(buttonNumber.length > 0){
    let url = new URL(window.location.href);
    buttonNumber.forEach((button) => {
        button.addEventListener("click", (e) => {
            const value = e.target.attributes[1].value;
            url.searchParams.set("page", value);
            window.location.href = url.href;
        })
    })
}
// end page-number

//show alert
 const showAlert = document.querySelector("[show-alert]")
 if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    }, time);
 }
//end show alert





