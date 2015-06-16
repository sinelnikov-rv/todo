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
var ulAll = document.getElementById("list");
var clickedElement = function () {
    if(this.getAttribute("class") == "checked") {
            this.setAttribute("class","unChecked");
       this.firstChild.checked = false
    } else {
        this.firstChild.checked = true;
        this.setAttribute("class","checked");
        }
};
text.onkeydown = function (key) {
    if(text.value != "" && key.keyCode == 13) {
        var checkbox = document.createElement("input");
        var buttonDel = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        var li = document.createElement("li");
        todo.addItem(text.value);
        li.setAttribute("class", "unChecked");
        li.appendChild(checkbox);
        buttonDel.setAttribute("type", "button");
        buttonDel.setAttribute("id", "buttonDel");
        buttonDel.onclick = function () {
            li.parentNode.removeChild(li);
            todo.deleteItem(todo.list.indexOf(this.textContent));
        }
        li.appendChild(document.createTextNode("" + text.value));
        li.appendChild(buttonDel);
        ulAll.appendChild(li);
        li.addEventListener('click', clickedElement);
        text.value = "";
        console.log(todo.list);
    }
};