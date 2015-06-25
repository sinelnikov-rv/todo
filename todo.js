/**
 * Sinelnikov Roman
 */
var Task = function (text) {
    this.text = text;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML ="<div class='unChecked'><input type = 'checkbox'>" + this.text + "</div><button class ='delButton'>del</button>";
    this.liElem.getElementsByClassName("unChecked")[0].addEventListener('click', this.check.bind(this));
    this.liElem.getElementsByClassName("delButton")[0].addEventListener('click', this.del.bind(this));
};
Task.prototype.check = function () {
    if(this.liElem.getElementsByTagName("div")[0].getAttribute("class") === "unChecked") {
        this.liElem.getElementsByTagName("input")[0].checked = true;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","checked");
        var move = document.createElement("button");
        move.setAttribute("class","move");
        this.liElem.insertBefore(move,this.liElem.getElementsByClassName("delButton")[0]);
        this.liElem.getElementsByClassName("move")[0].addEventListener('click', this.move.bind(this));
        if(this.liElem.parentNode.getAttribute("id") === "list"){
            this.liElem.getElementsByClassName("move")[0].innerHTML = "-->";
        }
        else {
            this.liElem.getElementsByClassName("move")[0].innerHTML = "<--";
        }
    }
    else {
        this.liElem.getElementsByTagName("input")[0].checked = false;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","unChecked");
        this.liElem.removeChild(this.liElem.getElementsByClassName("move")[0]);
    }
};
Task.prototype.move = function () {
    if(this.liElem.parentNode.getAttribute("id") === "list"){
        var doneTask = new Task(this.liElem.childNodes[0].textContent);
        document.getElementById('list_1').appendChild(doneTask.liElem);
        done.list.push(this.liElem.childNodes[0].textContent);
        todo.deleteItem(this.liElem);
    }
    else {
        var task = new Task(this.liElem.childNodes[0].textContent);
        document.getElementById('list').appendChild(task.liElem);
        todo.list.push(this.liElem.childNodes[0].textContent);
        done.deleteItem(this.liElem);
    }
};
Task.prototype.del = function () {
    if (this.liElem.parentNode.getAttribute("id") === "list"){
        todo.deleteItem(this.liElem);
    }
    else {
        done.deleteItem(this.liElem);
    }
};
var todo = {
    list : [],
    addItem: function(key) {
        var text = document.getElementById("textOfTask");
            if (text.value !== "" && +key.keyCode === 13) {
                if(todo.list.indexOf(text.value) > -1 || done.list.indexOf(text.value) > -1) {
                    document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
                }
                else {
                    document.getElementById("alert").innerHTML = "";
                    var task = new Task(text.value);
                    document.getElementById('list').appendChild(task.liElem);
                    todo.list.push(text.value);
            }
                text.value = "";
        }
    },
    deleteItem: function (item) {
        item.parentNode.removeChild(item);
        item = todo.list.indexOf(item.childNodes[0].textContent);
        todo.list.splice(item, 1);
    }
};
var done = {
    list: [],
    addItem: function () {
        var text = document.getElementById("textOfTask");
        if (text.value !== "") {
            if (todo.list.indexOf(text.value) > -1 || done.list.indexOf(text.value) > -1) {
                document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
            }
            else {
                document.getElementById("alert").innerHTML = "";
                var doneTask = new Task(text.value);
                document.getElementById('list_1').appendChild(doneTask.liElem);
                done.list.push(text.value);
            }
            text.value = "";
        }
    },
    deleteItem: function (item) {
        item.parentNode.removeChild(item);
        item = done.list.indexOf(item.childNodes[0].textContent);
        done.list.splice(item, 1);
    }
};
document.getElementById('textOfTask').onkeydown = todo.addItem;
document.getElementById('add').onclick = done.addItem;