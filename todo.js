/**
 * Sinelnikov Roman
 */
var Task = function (text) {
    text = document.getElementById("textOfTask");
    this.text=text;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML = "<label><input type = 'checkbox'>" + this.text.value + "</label><button class ='delButton'></button>";
};
Task.prototype.add = function(key){
    if(task.text.value != "" && key.keyCode == 13) {
        console.log(task.text.value);

        console.dir(this);
        task.liElem.getElementsByTagName("label")[0].addEventListener('click', this.check);
        document.getElementById('list').appendChild(task.liElem);



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
var todo = {
    list : [],
    done: [],
    addItem: function () {
        var task = new Task();
        //this.list.push(item);
    },
    deleteItem: function (item) {
        this.list.splice(item, 1);
    }
};
document.getElementById('textOfTask').onkeydown = todo.addItem();
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