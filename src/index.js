import './style.css';
import { todoItem, project } from './todo';
import { generateCategories, generateTodoItems } from './domGenerate';

const categoriesDiv = document.getElementById("categories");
const todoItemsDiv = document.getElementById("todo-items");

let defaultCat = "Things to get done.";
let defaultProject = new project("Default project", "This is the default project, feel free to add items or make a new project.");
defaultProject.addCategory(defaultCat);

let firstTodo = new todoItem("Something", "this is a thing", "tomorrow", 1, defaultCat);
defaultProject.addTodoItem(firstTodo);

generateCategories(defaultProject, categoriesDiv);
generateTodoItems(defaultProject, todoItemsDiv);


