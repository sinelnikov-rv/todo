/**
 * Sinelnikov Roman
 */
var todo;
todo = {
    list: [],
    done: [],
    deleted: [],
    addItem: function (item) {
        list.push(item);
    },
    deleteItem: function(number){
        list.slice(number)
    },
    doneItem: function(item){
        done.push(item)
    }
};
todo.addItem("test");
console.log(todo.list);
