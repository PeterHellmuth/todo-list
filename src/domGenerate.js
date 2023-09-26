export {generateCategories}
import { project, todoItem } from "./todo"

function generateCategories(project){
    let content = document.createElement("div");
    project.categories.forEach((category) => appendElem(content, "h3", category, "category-header"));
    return content;
}



function appendElem(parentElem, type, innerText = null, classIn = null, id = null){
    let childElem = document.createElement(`${type}`);
    id ? childElem.id = id : null ;
    classIn ? childElem.classList.add(classIn) : null;
    innerText ? childElem.innerText = innerText : null;
    parentElem.appendChild(childElem);
    return childElem;
}