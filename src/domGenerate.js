export {generateCategories, generateTodoItems, generateCategoryDialog, generateTodoDialog, generateProjects, generateProjectDialog}

const MAX_PROJECT_NAME_LENGTH = 15;
const MAX_CATEGORY_NAME_LENGTH = 15;
const TODO_TEXTBOX_DEFAULT_ROWS = 10;

function generateCategories(project, appendTo){
    while (appendTo.hasChildNodes()) {
        appendTo.removeChild(appendTo.lastChild)
    }

    project.categories.forEach((category) => appendElem(appendTo, "h3", category, "category-header"));
    return appendElem(appendTo, "button", "+","add-category-button");
}

function generateTodoItems(project, appendTo, todoClicked){
    while (appendTo.hasChildNodes()) {
        appendTo.removeChild(appendTo.lastChild)
    }

    let buttons = [];
    let column = 1;
    project.categories.forEach(() => {
        let row = 1;
        project.todoItems.forEach((todoItem) => {
            if(todoItem.column == column){
                let newItem = appendElem(appendTo, "p", todoItem.title, "todo-item");
                newItem.style.gridColumn = todoItem.column;
                newItem.style.gridRow = row;
                row++;
                newItem.id = todoItem.id;
                newItem.data = todoItem.column;
                newItem.addEventListener("click", todoClicked);
            }
        });


        let newButton = appendElem(appendTo, "button", "+","add-todo-button");
        newButton.data = column;
        newButton.style.gridColumn = column;
        newButton.style.gridRow = row;
        row++
        buttons.push(newButton);
        column++;
    });

    return buttons;

}

function generateProjects(appendTo, projects){
    while (appendTo.hasChildNodes()) {
        appendTo.removeChild(appendTo.lastChild)
    }

    if(projects){
        projects.forEach((projectInstance) => {
            let projectDiv = appendElem(appendTo, "div", null, "project-container");
            if(projectInstance.currentProject){
                projectDiv.classList.add("current-project");
            }
            appendElem(projectDiv, "h3", projectInstance.title, "project-name");
            appendElem(projectDiv, "button", "edit", "project-edit").id = projectInstance.title;
        });
    }
    return appendElem(appendTo, "button", "+","add-project-button");
}

function generateTodoDialog(parentElem, category, column, todoItem=null){
    let title = "";
    let description = "";
    let dueDate = "";
    let priority = 1;
    if(todoItem){
        title = todoItem.title;
        description = todoItem.description;
        dueDate = todoItem.dueDate;
        priority = todoItem.priority;
    }
    const dialogBox = document.createElement("dialog");
    dialogBox.classList.add("dialog-box");
    let dialogForm = appendElem(dialogBox, "form", null, "todo-form");

    appendElem(dialogForm, "h2", "Title:");
    let inputFieldTitle = appendElem(dialogForm, "input", null, null, "todo-title-input");
    inputFieldTitle.value = title;

    appendElem(dialogForm, "h2", "Description:");
    let inputFieldDescription = appendElem(dialogForm, "textarea", null, null, "todo-description-input");
    inputFieldDescription.rows = TODO_TEXTBOX_DEFAULT_ROWS;
    inputFieldDescription.value = description;

    appendElem(dialogForm, "h2", "Date");
    let inputFieldDate = appendElem(dialogForm, "input", null, null, "todo-dueDate-input");
    inputFieldDate.type = "date";
    inputFieldDate.value = dueDate;

    appendElem(dialogForm, "h2", "Priority:");
    let inputFieldPriority = appendElem(dialogForm, "input", null, null, "todo-priority-input");
    inputFieldPriority.value = priority;

    appendElem(dialogForm, "h2", `Category: ${category}`);

    if(todoItem){
        let deleteButton = appendElem(dialogForm, "button", "Delete", "delete-button", "delete-button");
        deleteButton.type = "button";
        deleteButton.data = todoItem.id;
    } else{
        appendElem(dialogForm, "button", "Cancel", "cancel-button", "cancel-button").type = "button";  
    }
    let submitButton = appendElem(dialogForm, "button", "Submit");
    submitButton.data = column;
    if(todoItem){
        submitButton.id = todoItem.id
    } else{
        submitButton.id = "new";
    };
    parentElem.appendChild(dialogBox);
    dialogBox.showModal();
    
    return submitButton;
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
    inputField.maxLength = MAX_CATEGORY_NAME_LENGTH;
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


function generateProjectDialog(parentElem, title=null){
    let currentValue = "";
    if(title){
        currentValue = title
    }

    const dialogBox = document.createElement("dialog");
    dialogBox.classList.add("dialog-box");
    let dialogForm = appendElem(dialogBox, "form", null, "project-form");
    appendElem(dialogForm, "h2", "Project name:");
    let inputField = appendElem(dialogForm, "input", null, null, "project-name-input");
    inputField.maxLength = MAX_PROJECT_NAME_LENGTH;
    inputField.value = currentValue;
    if(title){
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