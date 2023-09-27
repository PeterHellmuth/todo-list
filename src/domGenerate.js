export {generateCategories, generateTodoItems, generateCategoryDialog, generateTodoDialog}
import { project, todoItem } from "./todo"

function generateCategories(project, appendTo, clearFirst = false){
    if(clearFirst){
        while (appendTo.hasChildNodes()) {
            appendTo.removeChild(appendTo.lastChild)
        }
    }
    project.categories.forEach((category) => appendElem(appendTo, "h3", category, "category-header"));
    return appendElem(appendTo, "button", "+","add-category-button");
}

function generateTodoItems(project, appendTo, clearFirst = false){
    if(clearFirst){
        while (appendTo.hasChildNodes()) {
            appendTo.removeChild(appendTo.lastChild)
        }
    }
    project.todoItems.forEach((todoItem) => {
        let newItem = appendElem(appendTo, "p", todoItem.title, "todo-item");
        newItem.style.gridColumn = project.getGridColumnIndex(newItem.category);
    });

    return appendElem(appendTo, "button", "+","add-todo-button");
}


function generateTodoDialog(parentElem, todoItem=null){
    if(todoItem){

    }
    const dialogBox = document.createElement("dialog");
    dialogBox.classList.add("dialog-box");
    appendElem(dialogBox, "form", null, "todo-form");

}

function generateCategoryDialog(parentElem, category=null){
    let currentValue = "";
    if(category){
        currentValue = category
    }

    const dialogBox = document.createElement("dialog");
    dialogBox.classList.add("dialog-box");
    let dialogForm = appendElem(dialogBox, "form", null, "category-form");
    appendElem(dialogForm, "h2", "Category name:");
    let inputField = appendElem(dialogForm, "input", null, null, "category-name-input");
    inputField.value = currentValue;
    let submitButton = appendElem(dialogForm, "button", "Submit");
    submitButton.type="submit";
    parentElem.appendChild(dialogBox);
    dialogBox.showModal();
    return submitButton;
}




function appendElem(parentElem, type, innerText = null, classIn = null, id = null){
    let childElem = document.createElement(`${type}`);
    id ? childElem.id = id : null ;
    classIn ? childElem.classList.add(classIn) : null;
    innerText ? childElem.innerText = innerText : null;
    parentElem.appendChild(childElem);
    return childElem;
}