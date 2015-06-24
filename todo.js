/**
 * Sinelnikov Roman
 */
var Task = function (text) {
    this.text = text;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML = "<label class='unChecked'><input type = 'checkbox'>" + this.text.value + "</label><button class ='delButton'></button>";
    this.liElem.getElementsByTagName("label")[0].addEventListener('click', this.check);
    this.liElem.getElementsByClassName("delButton")[0].addEventListener('click', todo.deleteItem)
    document.getElementById('list').appendChild(this.liElem);
};
Task.prototype.check = function () {
    console.log(this);
    console.log(this.firstChild);
    if (this.getAttribute("class") == "checked") {
        this.setAttribute("class","unChecked");
        this.firstChild.checked = false;
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
var todo = {
    list : [],
    done: [],
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
    deleteItem: function (item) {
        this.list.splice(item, 1);
    }
};
document.getElementById('textOfTask').onkeydown = todo.addItem;
//document.getElementsByClassName("delButton").onclick = task.del;
//Task.prototype.check = func

/*
var task = new Task() ====>
===> task.liElem, this.txt;

task.check();
*/


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