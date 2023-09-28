import './style.css';
import { todoItem, project } from './todo';
import { generateCategories, generateTodoItems, generateTodoDialog, generateCategoryDialog } from './domGenerate';

const bodyElem = document.body;
const categoriesDiv = document.getElementById("categories");
const todoItemsDiv = document.getElementById("todo-items");

let currentProject = null;
let defaultCat = "Things to get done.";
let defaultProject = new project("Default project", "This is the default project, feel free to add items or make a new project.");
currentProject = defaultProject;

currentProject.addCategory(defaultCat);
let firstTodo = new todoItem("Something", "this is a thing", "tomorrow", 1, 1);
currentProject.addTodoItem(firstTodo);

generateDOM();

function generateDOM(){
    generateCategories(currentProject, categoriesDiv).addEventListener("click", addCategory);
    generateTodoItems(currentProject, todoItemsDiv, todoClicked).forEach((todoButton) => todoButton.addEventListener("click", addTodo));
    let categoryHeaders = document.querySelectorAll(".category-header");
    categoryHeaders.forEach((header) => header.addEventListener("click", categoryClicked));
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

function categoryClicked(event){
    let submitButton = generateCategoryDialog(bodyElem, event.target.innerText);
    submitButton.addEventListener("click", categorySubmitted);
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

function categoryDeleted(event){
    event.preventDefault();

    let categoryNameInput = document.getElementById("category-name-input").value;
    currentProject.removeCategory(categoryNameInput);
    generateDOM();

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

