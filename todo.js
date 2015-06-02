/**
 * Sinelnikov Roman
 */

        var todo;
        todo = {
            list: [],
            done: [],
            deleted: [],
            addItem: function (item) {
                this.list.push(item);
            },
            deleteItem: function (item) {
                this.list.splice(item,1);
            },
            doneItem: function (item) {
                this.done.push(item);
            }
        };
var item;
item = document.getElementById("text").value;
button.onclick = function(){
    var ul = document.getElementById("list");
    var li = document.createElement("li");

    ul.appendChild(item);
    todo.addItem(item);
    console.log(todo.list);
};