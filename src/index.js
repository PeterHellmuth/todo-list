import './style.css';
import { todoItem, project } from './todo';
import { generateCategories } from './domGenerate';

const categoriesDiv = document.getElementById("categories");

let defaultCat = "Things to get done.";
let defaultProject = new project("Default project", "This is the default project, feel free to add items or make a new project.");
defaultProject.addCategory(defaultCat);

let firstTodo = new todoItem("Something", "this is a thing", "tomorrow", 1, defaultCat);
defaultProject.addTodoItem(firstTodo);

categoriesDiv.appendChild(generateCategories(defaultProject));


