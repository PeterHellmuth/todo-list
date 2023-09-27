export {todoItem, project}


class todoItem {
    constructor(title, description, dueDate, priority, column){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.column = column;
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
        let column = this.getColumnIndex(category);
        this.todoItems.forEach((todo) => {
            if(todo.column == column){
                this.todoItems.splice(this.todoItems.indexOf(todo), 1);
            }
        });
        this.categories.splice(this.categories.indexOf(category), 1);
    }

    addTodoItem(todoItem){
        this.todoItems.push(todoItem) ;
    }

    removeTodoItem(todoItem){
        this.todoItems.splice(this.todoItems.indexOf(todoItem), 1);
    }

    getColumnIndex(category){
        return this.categories.indexOf(category)+1;
    }
}