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
let firstTodo = new todoItem("Something", "this is a thing", "tomorrow", 1, defaultCat);
currentProject.addTodoItem(firstTodo);
let addCategoryButton = generateCategories(currentProject, categoriesDiv);
let addTodoButton = generateTodoItems(currentProject, todoItemsDiv);


addCategoryButton.addEventListener("click", addCategory);
addTodoButton.addEventListener("click", addTodo);


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
    console.log(event.target.parentElement.parentElement);
    event.preventDefault();
    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function categorySubmitted(event){
    event.preventDefault();

    let categoryNameInput = document.getElementById("category-name-input").value;
    if(categoryNameInput){
        currentProject.addCategory(categoryNameInput);
        addCategoryButton = generateCategories(currentProject, categoriesDiv, true);
        addCategoryButton.addEventListener("click", addCategory);
    }

    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

function todoSubmitted(event){
    event.preventDefault();


    let dialogBox = event.target.parentElement.parentElement;
    dialogBox.remove();
}

