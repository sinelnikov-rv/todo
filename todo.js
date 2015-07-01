/**
* Sinelnikov Roman
*/
var Task = function (text, listName) {
    this.id = new Date().valueOf();
    this.text = text;
    this.checked = false;
    this.list = listName;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML ="<div class='unChecked'><input type = 'checkbox'>" + this.text + "</div><button class ='delButton'>del</button>";
};
Task.prototype.check = function () {
    if (this.checked) {
        this.checked = false;
        this.liElem.getElementsByTagName('input')[0].checked = false;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","unChecked");
        this.liElem.removeChild(this.liElem.getElementsByClassName("move")[0]);
    } else {
        this.liElem.getElementsByTagName("input")[0].checked = true;
        this.liElem.getElementsByTagName("div")[0].setAttribute("class","checked");
        var move = document.createElement("button");
        move.setAttribute("class","move");
        this.liElem.insertBefore(move,this.liElem.getElementsByClassName("delButton")[0]);
        this.liElem.getElementsByClassName("move")[0].innerHTML = "Move";
        listenersMove(this);
        this.checked = true;
    }

};
Task.prototype.move = function (oldList,newList) {
        newList.list.push(this);
        oldList.deleteItem(this);
};

Task.prototype.del = function (listName){
        listName.deleteItem(this);
};
var todo = {
    list : [],
    addItem: function(textOfTask) {
        var task = new Task(textOfTask, 'todo');
        listeners(task);

        todo.list.push(task);
        document.getElementById('list').appendChild(task.liElem);
    },
    deleteItem: function (item) {
        item.liElem.parentNode.removeChild(item.liElem);
        todo.list.splice(todo.list.indexOf(item.id), 1);
    }
};
var done = {
    list: [],
    addItem: function (textOfTask) {
                var doneTask = new Task(textOfTask, 'done');
        listeners(doneTask);
                document.getElementById('list_1').appendChild(doneTask.liElem);
                done.list.push(doneTask);
    },
    deleteItem: function (item) {
        item.liElem.parentNode.removeChild(item.liElem);
        done.list.splice(done.list.indexOf(item.id), 1);
    }
};

document.getElementById('textOfTask').onkeydown = addElem;
document.getElementById('add').onclick = addElem;

function addElem(event) {
    var text = document.getElementById("textOfTask");
    if (text.value && +event.keyCode === 13 ||text.value && event.type === 'click') {
        textExist(text.value);
        if (!textExists && event.keyCode === 13) {
            todo.addItem(text.value);
            text.value = "";
        } else if(!textExists && event.type === 'click') {
            done.addItem(text.value);
            text.value = "";
        }
    }
}
var textExists = false;
var lists = [todo.list, done.list];
function textExist(text)
{
    lists.forEach(function (list) {
        list.forEach(function (task) {
            if (text == task.text) {
                textExists = true;
                document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
            }
            else{
                textExists = false;
                document.getElementById("alert").innerHTML = "";
            }
        })
    });
}
function listeners(task) {
    task.liElem.getElementsByClassName("unChecked")[0].addEventListener('click', function () {
        task.check();
    });
    task.liElem.getElementsByClassName("delButton")[0].addEventListener('click', function () {
        if(task.list === 'todo') {
            task.del(todo);
        } else {
            task.del(done);
        }
    });
    task.liElem.getElementsByClassName("unChecked")[0].addEventListener('onmousedown', function () {
        task.drag(task);
    });
}
function listenersMove(task){
    task.liElem.getElementsByClassName("move")[0].addEventListener('click', function(){
        if(task.list === 'todo'){
            task.list = 'done';
            task.check();
            task.move(todo,done);
            document.getElementById('list_1').appendChild(task.liElem);
        } else {
                task.list = 'todo';
            task.check();
            task.move(done,todo);
            document.getElementById('list').appendChild(task.liElem);
            }
    });
}

Task.prototype.drag = function (e) {
    console.log(this);
    this.liElem.style.position = 'absolute';
    moveAt(e);
    document.body.appendChild(this.liElem);
    this.liElem.style.zIndex = 1000;
    function moveAt(e) {
        this.liElem.style.left = e.pageX - this.liElem.offsetWidth / 2 + 'px';
        this.liElem.style.top = e.pageY - this.liElem.offsetHeight / 2 + 'px';
    }
    document.onmousemove = function(e) {
        moveAt(e);
    };
    this.liElem.onmouseup = function() {
        document.onmousemove = null;
        this.liElem.onmouseup = null;
    }
};