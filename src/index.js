import './style.css';
import { todoItem, project } from './todo';
import {
  generateCategories, generateTodoItems, generateTodoDialog, generateCategoryDialog, generateProjects, generateProjectDialog,
} from './domGenerate';

export { getUniqueID };

const bodyElem = document.body;
const categoriesDiv = document.getElementById('categories');
const todoItemsDiv = document.getElementById('todo-items');
const projectsDiv = document.getElementById('projects');

let id = 0; // don't judge me.
function getUniqueID() {
  return id++; // shh.
}

const defaultCat = 'Things to get done.';
const defaultProject = new project('Default project');
defaultProject.addCategory(defaultCat);
const firstTodo = new todoItem('I need to do this thing', 'Go see a man about a dog.', '2023-01-01', 1, 1);
defaultProject.addTodoItem(firstTodo);

const projects = [];
let currentProject = null;
readLocalStorage();
setCurrentProject(projects[0]);

generateDOM();

function generateDOM() {
  if (currentProject) {
    generateCategories(currentProject, categoriesDiv).addEventListener('click', addCategory);
    generateTodoItems(currentProject, todoItemsDiv, todoClicked).forEach((todoButton) => todoButton.addEventListener('click', addTodo));
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach((header) => header.addEventListener('click', categoryClicked));
  } else {
    while (categoriesDiv.hasChildNodes()) {
      categoriesDiv.removeChild(categoriesDiv.lastChild);
    }
    while (todoItemsDiv.hasChildNodes()) {
      todoItemsDiv.removeChild(todoItemsDiv.lastChild);
    }
  }
  generateProjects(projectsDiv, projects).addEventListener('click', addProject);
  const projectTitles = document.querySelectorAll('.project-container');
  projectTitles.forEach((projectTitle) => projectTitle.addEventListener('click', projectTitleClicked));
  const projectEditButtons = document.querySelectorAll('.project-edit');
  projectEditButtons.forEach((projectEditButton) => projectEditButton.addEventListener('click', projectEditClicked));
  updateLocalStorage();
}

function updateLocalStorage() {
  projects.forEach((item) => {
    const writeObj = {
      title: item.title,
      categories: JSON.stringify(item.categories),
      todoItems: JSON.stringify(item.todoItems),
    };
    localStorage.setItem(`todo-project-${item.title}`, JSON.stringify(writeObj));
  });
  localStorage.setItem('todo-id', id);
}

function readLocalStorage() {
  let noStoredProjects = true;

  if (localStorage.length > 0) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      if (key.slice(0, 5) == 'todo-') {
        if (key.slice(0, 7) == 'todo-id') {
          id = Number(value);
        } else {
          noStoredProjects = false;

          const readObj = JSON.parse(value);
          const readTodoItems = [];
          JSON.parse(readObj.todoItems).forEach((item) => {
            readTodoItems.push(new todoItem(item.title, item.description, item.dueDate, item.priority, item.column));
          });

          projects.push(new project(readObj.title, JSON.parse(readObj.categories), readTodoItems));
          currentProject = projects[projects.length - 1];
        }
      }
    }
  }

  if (noStoredProjects) {
    console.log('no stored projects');
    projects.push(defaultProject);
  }
}

function todoClicked(event) {
  const todo = currentProject.getTodoItem(event.target.id);
  const submitButton = generateTodoDialog(bodyElem, currentProject.categories[todo.column - 1], todo.column, todo);
  submitButton.addEventListener('click', todoSubmitted);
  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', todoDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function projectTitleClicked(event) {
  const projectName = event.target.innerText;
  projects.forEach((projectInstance) => {
    if (projectInstance.title == projectName) {
      setCurrentProject(projectInstance);
      generateDOM();
    }
  });
}

function projectEditClicked(event) {
  const submitButton = generateProjectDialog(bodyElem, event.target.id);

  submitButton.addEventListener('click', projectEdited);
  submitButton.id = event.target.id;
  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', projectDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function categoryClicked(event) {
  const column = currentProject.getColumnIndex(event.target.innerText);
  const submitButton = generateCategoryDialog(bodyElem, event.target.innerText);
  submitButton.addEventListener('click', categoryEdited);
  submitButton.id = column;

  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', categoryDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function addCategory() {
  const submitButton = generateCategoryDialog(bodyElem);
  submitButton.addEventListener('click', categorySubmitted);
  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', categoryDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function addProject() {
  const submitButton = generateProjectDialog(bodyElem);
  submitButton.addEventListener('click', projectSubmitted);
  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', projectDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function addTodo(event) {
  const submitButton = generateTodoDialog(bodyElem, currentProject.categories[event.target.data - 1], event.target.data);
  submitButton.addEventListener('click', todoSubmitted);
  const deleteButton = document.getElementById('delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', todoDeleted);
  } else {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', dialogCancelled);
  }
}

function dialogCancelled(event) {
  event.preventDefault();
  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function categorySubmitted(event) {
  event.preventDefault();

  const categoryNameInput = document.getElementById('category-name-input').value;
  if (categoryNameInput) {
    if (!currentProject.categories.includes(categoryNameInput)) {
      currentProject.addCategory(categoryNameInput);
      generateDOM();
    } else {
      alert('You already have a category with this name');
    }
  }

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function categoryEdited(event) {
  event.preventDefault();

  const categoryNameInput = document.getElementById('category-name-input').value;
  if (categoryNameInput) {
    currentProject.setCategory(categoryNameInput, event.target.id);
    generateDOM();
  }

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function projectSubmitted(event) {
  event.preventDefault();

  const projectNameInput = document.getElementById('project-name-input').value;

  if (projectNameInput) {
    let projectExists = false;
    projects.forEach((projectInstance) => {
      if (projectInstance.title == projectNameInput) {
        projectExists = true;
        alert('You already have a project with this name');
      }
    });

    if (!projectExists) {
      projects.push(new project(`${projectNameInput}`));
      setCurrentProject(projects[projects.length - 1]);
      generateDOM();
    }
  }

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function projectEdited(event) {
  event.preventDefault();
  const projectNameInput = document.getElementById('project-name-input').value;

  const currentProjectTitle = event.target.id;
  projects.forEach((item) => {
    if (item.title == currentProjectTitle) {
      localStorage.removeItem(`todo-project-${item.title}`); // delete old key storage or it will remain.
      item.title = projectNameInput;
      generateDOM();
    }
  });

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function setCurrentProject(project) {
  if (currentProject) {
    currentProject.currentProject = false;
  }
  currentProject = project;
  if (currentProject) {
    currentProject.currentProject = true;
  }
}

function categoryDeleted(event) {
  event.preventDefault();

  const categoryNameInput = document.getElementById('category-name-input').value;
  currentProject.removeCategory(categoryNameInput);
  generateDOM();

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function projectDeleted(event) {
  event.preventDefault();

  const projectNameInput = document.getElementById('project-name-input').value;

  projects.forEach((projectInstance) => {
    if (projectInstance.title == projectNameInput) {
      localStorage.removeItem(`todo-project-${projectInstance.title}`);
      projects.splice(projects.indexOf(projectInstance), 1);
      if (projects.length == 0) {
        setCurrentProject(null);
      } else {
        setCurrentProject(projects[0]);
      }
      generateDOM();
    }
  });
  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function todoDeleted(event) {
  event.preventDefault();

  const todo = currentProject.getTodoItem(event.target.data);
  currentProject.removeTodoItem(todo);
  generateDOM();

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}

function todoSubmitted(event) {
  event.preventDefault();

  if (event.target.id == 'new') {
    const inputFieldTitle = document.getElementById('todo-title-input').value;
    const inputFieldDescription = document.getElementById('todo-description-input').value;
    const inputFieldDate = document.getElementById('todo-dueDate-input').value;
    const inputFieldPriority = document.getElementById('todo-priority-input').value;

    const newTodo = new todoItem(inputFieldTitle, inputFieldDescription, inputFieldDate, inputFieldPriority, event.target.data);
    currentProject.addTodoItem(newTodo);
  } else {
    const currentTodo = currentProject.getTodoItem(event.target.id);
    currentTodo.title = document.getElementById('todo-title-input').value;
    currentTodo.description = document.getElementById('todo-description-input').value;
    currentTodo.dueDate = document.getElementById('todo-dueDate-input').value;
    currentTodo.priority = document.getElementById('todo-priority-input').value;
  }
  generateDOM();

  const dialogBox = event.target.parentElement.parentElement;
  dialogBox.remove();
}
