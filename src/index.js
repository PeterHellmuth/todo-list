import './style.css';
import { todoItem, project } from './todo';
import { generateCategories, generateTodoItems, generateTodoDialog, generateCategoryDialog } from './domGenerate';

const bodyElem = document.body
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
    generateTodoItems(currentProject, todoItemsDiv).forEach((todoButton) => todoButton.addEventListener("click", addTodo));
    let categoryHeaders = document.querySelectorAll(".category-header");
    categoryHeaders.forEach((header) => header.addEventListener("click", categoryClicked));
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

function addTodo(){
    let submitButton = generateTodoDialog(bodyElem);
    submitButton.addEventListener("click", todoSubmitted);
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

function todoSubmitted(event){
    event.preventDefault();


    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

