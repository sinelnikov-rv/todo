/**
* Sinelnikov Roman
*/
var Task = function (text, listName) {
    this.id = new Date().valueOf();
    this.text = text;
    this.checked = false;
    this.list = listName;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML ='<div class="unChecked"><input type = "checkbox">' + this.text + '</div><div class="drag"> </div><button class ="delButton">del</button>';
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
    task.liElem.getElementsByClassName("drag")[0].addEventListener('mousedown', function(){
        task.drag(task);
    });
    task.liElem.getElementsByClassName("delButton")[0].addEventListener('click', function () {
        if(task.list === 'todo') {
            task.del(todo);
        } else {
            task.del(done);
        }
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


Task.prototype.drag = function(e){
    var self = this;
        var elem = this.liElem;
        var start = elem.getBoundingClientRect();
        elem.style.position = 'absolute';
        moveAt(e);
        document.body.appendChild(elem);
        elem.style.zIndex = 1000;
        function moveAt(e) {
            elem.style.left = e.pageX - elem.offsetWidth / 2 + 'px';
            elem.style.top = e.pageY - elem.offsetHeight / 2 + 'px';
        }
        document.onmousemove = function(e) {
            moveAt(e);
        };
        elem.onmouseup = function() {
            var end = elem.getBoundingClientRect().left;
            var offset = end - start.left;
            console.log(document.body.clientWidth / 2);
            console.log(end);
            console.log(start.left);
            console.log(offset);
            if (end > document.body.clientWidth / 2 && offset > 250) {
                self.list = 'done';

                self.move(todo, done);
                elem.removeAttribute('style');
                document.getElementById('list_1').appendChild(elem);

            } else if (end < document.body.clientWidth / 2 && offset < -250) {
                self.list = 'todo';
                self.move(done, todo);
                elem.removeAttribute('style');
                document.getElementById('list').appendChild(elem);
            }
            else {
                elem.left = start.left;
                elem.top = start.top;
            }
            document.onmousemove = null;
            elem.onmouseup = null;
            //console.dir(todo.list);
            //console.dir(done.list);
        }
    };

