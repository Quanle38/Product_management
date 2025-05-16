//delete product
const deleteProduct = document.querySelectorAll("[delete-product]");
if(deleteProduct.length > 0){
    const formDelete = document.querySelector(`#form-delete-product`);
    const path = formDelete.getAttribute("data-path");
    deleteProduct.forEach((button)=>{
        button.addEventListener("click",()=>{
            const confirmation = confirm("Are you sure to delete this Product ? ");
            if(confirmation){
                const id = button.getAttribute("product-id");
                const action = path + `/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
        })
    })
}
//end delete product

//change status product
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formStatus = document.querySelector('#form-change-status');
    const path = formStatus.getAttribute("data-path")
    buttonChangeStatus.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            let reStatus = status ==='active' ? "inactive" : "active";
            const action = path +  `/${reStatus}/${id}?_method=PATCH`;
            formStatus.action = action;
            formStatus.submit();
        })
    })
}
//end change status