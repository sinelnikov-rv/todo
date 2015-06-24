/**
 * Sinelnikov Roman
 */
var Task = function (text) {
    this.text = text;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML ="<div class='unChecked'><input type = 'checkbox'>" + this.text.value + "</div><button class ='delButton'></button>";
    this.liElem.getElementsByClassName("unChecked")[0].addEventListener('click', this.check.bind(this));
    this.liElem.getElementsByClassName("delButton")[0].addEventListener('click', todo.deleteItem.bind(this));
    document.getElementById('list').appendChild(this.liElem);
};
Task.prototype.check = function () {
    if(this.liElem.parentNode.getAttribute("id") === "list") {
        document.getElementById("list_1").appendChild(this.liElem);
        this.liElem.getElementsByTagName("input")[0].checked = true;
        this.liElem.setAttribute("class","checked");
    }
    else {
        document.getElementById("list").appendChild(this.liElem);
        this.liElem.getElementsByTagName("input")[0].checked = false;
        this.liElem.setAttribute("class","unChecked");
    }
};
var todo = {
    list : [],
    addItem: function (key) {
        var text = document.getElementById("textOfTask");
            if (text.value !== "" && +key.keyCode === 13) {
                if(todo.list.indexOf(text.value) > -1 ) {
                    document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
                }
                else {
                    document.getElementById("alert").innerHTML = "";
                    var task = new Task(text);
                    todo.list.push(text.value);

            }
                text.value = "";
        }
    },
    deleteItem: function () {
        this.liElem.parentNode.removeChild(this.liElem);
        var item = todo.list.indexOf(this.liElem.textContent);
        todo.list.splice(item, 1);
    }
};
document.getElementById('textOfTask').onkeydown = todo.addItem;