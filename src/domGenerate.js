export {generateCategories, generateTodoItems}
import { project, todoItem } from "./todo"

function generateCategories(project, appendTo){
    project.categories.forEach((category) => appendElem(appendTo, "h3", category, "category-header"));
    appendElem(appendTo, "button", "+","add-category-button");
}

function generateTodoItems(project, appendTo){
    project.todoItems.forEach((todoItem) => {
        let newItem = appendElem(appendTo, "p", todoItem.title, "todo-item");
        newItem.style.gridColumn = project.getGridColumnIndex(newItem.category);
    });

    appendElem(appendTo, "button", "+","add-todo-button");
}

function appendElem(parentElem, type, innerText = null, classIn = null, id = null){
    let childElem = document.createElement(`${type}`);
    id ? childElem.id = id : null ;
    classIn ? childElem.classList.add(classIn) : null;
    innerText ? childElem.innerText = innerText : null;
    parentElem.appendChild(childElem);
    return childElem;
}