/**
 * Sinelnikov Roman
 */
var Task = function () {
    this.text = document.getElementById("textOfTask");

    console.log(this.liElem);
};
Task.prototype.add = function(key){
    if(task.text.value != "" && key.keyCode == 13) {
        console.log(task.text.value);
        this.liElem = document.createElement("li");
        this.liElem.innerHTML = "<input type = 'checkbox'>" + task.text.value + "<button id ='delButton'></button>";
        this.liElem.addEventListener('click', task.check);
        document.getElementById('list').appendChild(this.liElem);
        todo.addItem(task.text.value);
        console.log(todo.list);
        task.text.value = "";
    }
};
Task.prototype.check = function () {
    if (this.getAttribute("class") == "checked") {
        this.setAttribute("class","unChecked");
        this.firstChild.checked = false
    } else {
        this.firstChild.checked = true;
        this.setAttribute("class","checked");
    }
};
Task.prototype.del = function (){
    console.log(this.parentNode.textContent);
    this.liElem.parentNode.removeChild(this);
            todo.deleteItem(todo.list.indexOf(this.parentNode.textContent));
};
var task = new Task();
document.getElementById('textOfTask').onkeydown = task.add;
document.getElementById("delButton").onclick = task.del;
//Task.prototype.check = func

/*
var task = new Task() ====>
===> task.liElem, this.txt;

task.check();
*/

var todo = {
    list : [],
    done: [],
    addItem: function (item) {
        this.list.push(item);
    },
    deleteItem: function (item) {
        this.list.splice(item, 1);
    }
};
//task.liElem.onclick = func...
//var todo = {
//        list: [],
//        done: [],
//        ,
//        ,
//        doneItem: function (item) {
//            this.done.push(item);
//        }
//        };
//var text = document.getElementById("text");
//var ulAll = document.getElementById("list");
//var clickedElement = function () {
//    if(this.getAttribute("class") == "checked") {
//            this.setAttribute("class","unChecked");
//       this.firstChild.checked = false
//    } else {
//        this.firstChild.checked = true;
//        this.setAttribute("class","checked");
//        }
//};
//text.onkeydown = function (key) {
//    if(text.value != "" && key.keyCode == 13) {
//        var checkbox = document.createElement("input");
//        var buttonDel = document.createElement("input");
//        checkbox.setAttribute("type","checkbox");
//        var li = document.createElement("li");
//        todo.addItem(text.value);
//        li.setAttribute("class", "unChecked");
//        li.appendChild(checkbox);
//        buttonDel.setAttribute("type", "button");
//        buttonDel.setAttribute("id", "buttonDel");
//        buttonDel.onclick = function () {
//            li.parentNode.removeChild(li);
//            todo.deleteItem(todo.list.indexOf(this.textContent));
//        }
//        li.appendChild(document.createTextNode("" + text.value));
//        li.appendChild(buttonDel);
//        ulAll.appendChild(li);
//        li.addEventListener('click', clickedElement);
//        text.value = "";
//        console.log(todo.list);
//    }
//};