import { getUniqueID } from ".";
export {todoItem, project}




class todoItem {
    constructor(title, description, dueDate, priority, column){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.column = column;
        this.id = getUniqueID();
    }

}

class project {
    constructor(title, categories = [], todoItems = []){
        this.title = title;
        this.categories = categories;
        this.todoItems = todoItems;
        this.currentProject = false;
    }

    addCategory(category){
        this.categories.push(category);
    }

    removeCategory(category){
        if(category){
            let column = this.getColumnIndex(category);
            this.todoItems.forEach((todo) => {
                if(todo.column == column){
                    this.todoItems.splice(this.todoItems.indexOf(todo), 1);
                }
            });
            this.categories.splice(this.categories.indexOf(category), 1);
        }
    }

    setCategory(value, column){
        this.categories[column-1] = value;
    }

    addTodoItem(todoItem){
        this.todoItems.push(todoItem) ;
    }

    removeTodoItem(todoItem){
        if(todoItem){
            this.todoItems.splice(this.todoItems.indexOf(todoItem), 1);
        }
    }

    getColumnIndex(category){
        return this.categories.indexOf(category)+1;
    }

    getTodoItem(id){
        let returnItem = null;
        this.todoItems.forEach((item) => {
            if(item.id == id){
                returnItem = item;
            }
        });
        return returnItem;
    }

}