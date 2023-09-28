import './style.css';
import { todoItem, project } from './todo';
import { generateCategories, generateTodoItems, generateTodoDialog, generateCategoryDialog, generateProjects, generateProjectDialog } from './domGenerate';
export { getUniqueID };


const bodyElem = document.body;
const categoriesDiv = document.getElementById("categories");
const todoItemsDiv = document.getElementById("todo-items");
const projectsDiv = document.getElementById("projects");

let id = 0; //don't judge me.
function getUniqueID(){
    return id++; //shh.
}


let defaultCat = "Things to get done.";
let defaultProject = new project("Default project");
defaultProject.addCategory(defaultCat);
let firstTodo = new todoItem("I need to do this thing", "Go see a man about a dog.", "2023-01-01", 1, 1);
defaultProject.addTodoItem(firstTodo);

let projects = [];
let currentProject = null;
readLocalStorage();
setCurrentProject(projects[0]);




generateDOM();


function generateDOM(){
    if(currentProject){
        generateCategories(currentProject, categoriesDiv).addEventListener("click", addCategory);
        generateTodoItems(currentProject, todoItemsDiv, todoClicked).forEach((todoButton) => todoButton.addEventListener("click", addTodo));
        let categoryHeaders = document.querySelectorAll(".category-header");
        categoryHeaders.forEach((header) => header.addEventListener("click", categoryClicked));
    } else{
        while (categoriesDiv.hasChildNodes()) {
            categoriesDiv.removeChild(categoriesDiv.lastChild)
        }
        while (todoItemsDiv.hasChildNodes()) {
            todoItemsDiv.removeChild(todoItemsDiv.lastChild)
        }
    }
    generateProjects(projectsDiv, projects).addEventListener("click", addProject);
    let projectTitles = document.querySelectorAll(".project-container");
    projectTitles.forEach((projectTitle) => projectTitle.addEventListener("click", projectTitleClicked));
    let projectEditButtons = document.querySelectorAll(".project-edit");
    projectEditButtons.forEach((projectEditButton) => projectEditButton.addEventListener("click", projectEditClicked));
    updateLocalStorage();
}


function updateLocalStorage(){
    projects.forEach((item) => {
        let writeObj = {
            title: item.title,
            categories: JSON.stringify(item.categories),
            todoItems: JSON.stringify(item.todoItems)
        }
        localStorage.setItem("todo-project-"+item.title, JSON.stringify(writeObj));
    });
    localStorage.setItem("todo-id", id);
}

function readLocalStorage(){
    let noStoredProjects = true;

    if(localStorage.length > 0){
        for (let i = localStorage.length-1; i >= 0; i--) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            if(key.slice(0,5) == "todo-"){
                if(key.slice(0,7) == "todo-id"){
                    id = Number(value);
                } else{
                    noStoredProjects = false;
                    
                    let readObj = JSON.parse(value);
                    let readTodoItems = [];
                    JSON.parse(readObj.todoItems).forEach((item) => {
                        readTodoItems.push(new todoItem(item.title, item.description, item.dueDate, item.priority, item.column));
                    });
                    
                    projects.push(new project(readObj.title, JSON.parse(readObj.categories), readTodoItems));
                    currentProject = projects[projects.length-1];
                }
            } 
        }    
    }

    if(noStoredProjects){
        console.log("no stored projects");
        projects.push(defaultProject);
    }
}




function todoClicked(event){
    let todo = currentProject.getTodoItem(event.target.id);
    let submitButton = generateTodoDialog(bodyElem, currentProject.categories[todo.column-1], todo.column, todo);
    submitButton.addEventListener("click", todoSubmitted);
    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", todoDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    }
}

function projectTitleClicked(event){
    let projectName = event.target.innerText;
    projects.forEach((projectInstance) =>{
        if(projectInstance.title == projectName){
            setCurrentProject(projectInstance);
            generateDOM();
        }
    });
}

function projectEditClicked(event){
    let submitButton = generateProjectDialog(bodyElem, event.target.id);

    submitButton.addEventListener("click", projectEdited);
    submitButton.id = event.target.id;
    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", projectDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    }
}


function categoryClicked(event){
    let column = currentProject.getColumnIndex(event.target.innerText);
    let submitButton = generateCategoryDialog(bodyElem, event.target.innerText);
    submitButton.addEventListener("click", categoryEdited);
    submitButton.id = column;

    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", categoryDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    }
}

function addCategory(){
    let submitButton = generateCategoryDialog(bodyElem);
    submitButton.addEventListener("click", categorySubmitted);
    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", categoryDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    }
}

function addProject(){
    let submitButton = generateProjectDialog(bodyElem);
    submitButton.addEventListener("click", projectSubmitted);
    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", projectDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    } 
}

function addTodo(event){
    let submitButton = generateTodoDialog(bodyElem, currentProject.categories[event.target.data-1], event.target.data); 
    submitButton.addEventListener("click", todoSubmitted);
    let deleteButton = document.getElementById("delete-button");
    if(deleteButton){
        deleteButton.addEventListener("click", todoDeleted);
    } else{
        let cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", dialogCancelled);
    }
}

function dialogCancelled(event){
    event.preventDefault();
    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function categorySubmitted(event){
    event.preventDefault();

    let categoryNameInput = document.getElementById("category-name-input").value;
    if(categoryNameInput){
        if(!currentProject.categories.includes(categoryNameInput)){
            currentProject.addCategory(categoryNameInput);
            generateDOM();
        } else{
            alert("You already have a category with this name");
        }
    }

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function categoryEdited(event){
    event.preventDefault();

    let categoryNameInput = document.getElementById("category-name-input").value;
    if(categoryNameInput){
        currentProject.setCategory(categoryNameInput, event.target.id);
        generateDOM();
    }
    
    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function projectSubmitted(event){
    event.preventDefault();

    let projectNameInput = document.getElementById("project-name-input").value;
    
    if(projectNameInput){
        let projectExists = false;
        projects.forEach((projectInstance) =>{
            if(projectInstance.title == projectNameInput){
                projectExists = true;
                alert("You already have a project with this name");
            }
        });
       
        if(!projectExists){
            projects.push(new project(`${projectNameInput}`));
            setCurrentProject(projects[projects.length-1]);
            generateDOM();
        }
    }

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function projectEdited(event){
    event.preventDefault();
    let projectNameInput = document.getElementById("project-name-input").value;

    let currentProjectTitle = event.target.id;
    projects.forEach((item) =>{
        if(item.title == currentProjectTitle){
            localStorage.removeItem("todo-project-"+item.title); //delete old key storage or it will remain.
            item.title = projectNameInput;
            generateDOM();
        }
    });


    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}


function setCurrentProject(project){
    if(currentProject){
        currentProject.currentProject = false;
    }
    currentProject = project;
    if(currentProject){
        currentProject.currentProject = true;
    }
}

function categoryDeleted(event){
    event.preventDefault();

    let categoryNameInput = document.getElementById("category-name-input").value;
    currentProject.removeCategory(categoryNameInput);
    generateDOM();

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function projectDeleted(event){
    event.preventDefault();

    let projectNameInput = document.getElementById("project-name-input").value;

    projects.forEach((projectInstance) => {
        if(projectInstance.title == projectNameInput){
            localStorage.removeItem("todo-project-"+projectInstance.title);
            projects.splice(projects.indexOf(projectInstance), 1);
            if(projects.length == 0){
                setCurrentProject(null);
            } else{
                setCurrentProject(projects[0]);
            }
            generateDOM();
        }
    });
    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}


function todoDeleted(event){
    event.preventDefault();

    let todo = currentProject.getTodoItem(event.target.data);
    currentProject.removeTodoItem(todo);
    generateDOM();

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function todoSubmitted(event){
    event.preventDefault();

    if(event.target.id == "new"){
        let inputFieldTitle = document.getElementById("todo-title-input").value;
        let inputFieldDescription = document.getElementById("todo-description-input").value;
        let inputFieldDate = document.getElementById("todo-dueDate-input").value;
        let inputFieldPriority= document.getElementById("todo-priority-input").value;
    
        let newTodo = new todoItem(inputFieldTitle, inputFieldDescription, inputFieldDate ,inputFieldPriority, event.target.data);
        currentProject.addTodoItem(newTodo);
    } else{
        let currentTodo = currentProject.getTodoItem(event.target.id);
        currentTodo.title = document.getElementById("todo-title-input").value;
        currentTodo.description = document.getElementById("todo-description-input").value;
        currentTodo.dueDate  = document.getElementById("todo-dueDate-input").value;
        currentTodo.priority = document.getElementById("todo-priority-input").value;
    }
    generateDOM();

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

