export {generateCategories, generateTodoItems, generateCategoryDialog, generateTodoDialog}
import { project, todoItem } from "./todo"

function generateCategories(project, appendTo){
    while (appendTo.hasChildNodes()) {
        appendTo.removeChild(appendTo.lastChild)
    }
    project.categories.forEach((category) => appendElem(appendTo, "h3", category, "category-header"));
    return appendElem(appendTo, "button", "+","add-category-button");
}

function generateTodoItems(project, appendTo){
    while (appendTo.hasChildNodes()) {
        appendTo.removeChild(appendTo.lastChild)
    }

    project.todoItems.forEach((todoItem) => {
        let newItem = appendElem(appendTo, "p", todoItem.title, "todo-item");
        newItem.style.gridColumn = todoItem.column;
    });

    let buttons = [];
    let column = 1;
    project.categories.forEach((category) => {
        let newButton = appendElem(appendTo, "button", "+","add-todo-button");
    
        newButton.style.gridColumn = column;
        buttons.push(newButton);
        column++;
    });

    return buttons;
}


function generateTodoDialog(parentElem, category, todoItem=null){
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
    if(category){
        appendElem(dialogForm, "button", "Delete", "delete-button", "delete-button").type = "button";
    } else{
        appendElem(dialogForm, "button", "Cancel", "cancel-button", "cancel-button").type = "button";
        
    }
    let submitButton = appendElem(dialogForm, "button", "Submit");
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