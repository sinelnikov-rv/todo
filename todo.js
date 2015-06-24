/**
 * Sinelnikov Roman
 */
var Task = function (text) {
    this.text = text;
    //console.log(this.text)
    this.liElem = document.createElement("li");
    this.liElem.innerHTML ="<div class='unChecked'><input type = 'checkbox'>" + this.text + "</div><button class ='delButton'>del</button>"
    this.liElem.getElementsByClassName("unChecked")[0].addEventListener('click', this.check.bind(this));
    this.liElem.getElementsByClassName("delButton")[0].addEventListener('click', todo.deleteItem.bind(this));
};
Task.prototype.check = function () {
    if(this.liElem.getElementsByTagName("div")[0].getAttribute("class") === "unChecked") {
        //document.getElementById("list_1").appendChild(this.liElem);
        this.liElem.getElementsByTagName("input")[0].checked = true;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","checked");
    }
    else {
        //document.getElementById("list").appendChild(this.liElem);
        this.liElem.getElementsByTagName("input")[0].checked = false;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","unChecked");
    }
};
var todo = {
    list : [],
    addItem: function (key) {
        var text = document.getElementById("textOfTask");
            if (text.value !== "" && +key.keyCode === 13) {
                if(todo.list.indexOf(text.value) > -1 || done.list.indexOf(text.value) > -1) {
                    document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
                }
                else {
                    console.log(text);
                    document.getElementById("alert").innerHTML = "";
                    var task = new Task(text.value);
                    document.getElementById('list').appendChild(task.liElem);
                    todo.list.push(text.value);
                    //console.log(todo.list);
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
var done = {
    list: [],
    addItem: function () {
        for (var i = 0; i < document.getElementById('list').childNodes.length; i++) {
            if(document.getElementById('list').childNodes[i].getElementsByTagName("div")[0].getAttribute("class") === "checked") {
                var liText = document.getElementById('list').childNodes[i].textContent;
                var doneTask = new Task(liText);
                document.getElementById('list_1').appendChild(doneTask.liElem);
                done.list.push(liText);
            }
            console.log();
        }
    }
};
document.getElementById('textOfTask').onkeydown = todo.addItem;
document.getElementById('setDone').onclick = done.addItem;