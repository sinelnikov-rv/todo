/**
 * Sinelnikov Roman
 */
var todo = {
        list: [],
        done: [],
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
var text = document.getElementById("text");
var ul = document.getElementById("list");
var ulDone = document.getElementById("doneList");
var clickedElement = function () {
    if(this.getAttribute("class") == "checked") {
        this.parentNode.removeChild(this);
        todo.deleteItem(todo.list.indexOf(this.textContent))
    } else {
        var li = document.createElement("li");
        this.setAttribute("class","checked");
        li.setAttribute("class","checked");
        li.appendChild(document.createTextNode("" + this.textContent))
        //console.log(this.value);
        ulDone.appendChild(li);
        li.addEventListener('click', clickedElement);
        todo.doneItem(this.textContent);
    }
};
button.onclick = function () {
    if(text.value != "") {
        var li = document.createElement("li");
        todo.addItem(text.value);
        li.setAttribute("class", "unChecked");
        li.appendChild(document.createTextNode("" + text.value));
        ul.appendChild(li);
        li.addEventListener('click', clickedElement);
    }
    console.log(todo.list);
    console.log(todo.done);
    text.value = "";
};