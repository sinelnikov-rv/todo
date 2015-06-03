/**
 * Sinelnikov Roman
 */
var todo = {
        list: [],
        done: [],
        deleted: [],
        addItem: function (item) {
            this.list.push(item);
            },
        deleteItem: function (item) {
            this.list.splice(item,1);
            },
        };
var text = document.getElementById("text");
var ul = document.getElementById("list");
button.onclick = function () {
    if(text.value != ""){
        var li = document.createElement("li");
        todo.addItem(text.value);
        li.appendChild(document.createTextNode("" + text.value));
        ul.appendChild(li);
        li.addEventListener('click',function(){
            this.parentNode.removeChild(this);
            todo.deleteItem(todo.list.indexOf(this.textContent));
    });
    }
    console.log(todo.list);
    text.value = "";
};