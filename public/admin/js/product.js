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
        });
    });
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
    });
}
//end change status

const checkedChangeLoop = (listId,status)=>{
    listId.forEach((input)=>{
        input.checked = status
    });
}

//checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const checkAll = checkboxMulti.querySelector("input[name='checkall']");
    const listId = checkboxMulti.querySelectorAll("input[name='id']");
    checkAll.addEventListener("click", ()=>{
        if(checkAll.checked){
            checkedChangeLoop(listId,true);
        } else{
            checkedChangeLoop(listId,false);
        }
    });
    listId.forEach((input)=>{
        input.addEventListener("click",()=>{
            const count = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(count ===listId.length){
                checkAll.checked = true;
            } else{
                checkAll.checked = false;
            }
        });
    });
}
//endcheckout

//formchange
const formchangeMulti = document.querySelector("[form-change-multi]");
if(formchangeMulti){
    formchangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const listChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        const typeCheck = e.target.elements.type.value;
        if(typeCheck === "delete-all"){
            const isComfirm = confirm("Are you really want to delete these Products");
            if(!isComfirm){
                return ;
            };           

        }; 
        if(listChecked.length > 0){
            let listId = [];
            const inputIds = formchangeMulti.querySelector("input[name='ids']");
            listChecked.forEach((input)=>{
                const id = input.value;
                if(typeCheck ==="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    listId.push(`${id}-${position}`);
                } else{
                    listId.push(id);
                }
            });
            inputIds.value = listId.join(", ");
            formchangeMulti.submit();

        }else{
            alert("Pleas choice at least one product !");
        }  

    });
}