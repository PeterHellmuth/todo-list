export {todoItem, project}


class todoItem {
    constructor(title, description, dueDate, priority, category){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
    }
}

class project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.categories = [];
        this.todoItems = [];
    }

    addCategory(category){
        this.categories.push(category);
    }

    removeCategory(category){
        this.categories.splice(this.categories.indexOf(category), 1);
    }

    addTodoItem(todoItem){
        this.todoItems.push(todoItem) ;
    }

    removeTodoItem(todoItem){
        this.todoItems.splice(this.todoItems.indexOf(todoItem), 1);
    }
}