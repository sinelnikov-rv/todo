/**
* Sinelnikov Roman
*/
var Task = function (text, listName) {
    this.id = new Date().valueOf();
    this.text = text;
    this.checked = false;
    this.list = listName;
    this.liElem = document.createElement("li");
    this.liElem.setAttribute('class','draggable');
    this.liElem.innerHTML ='<div class="unChecked"><input type = "checkbox">' + this.text + '</div><button class ="delButton">del</button>';
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
    if(newList==done){
        doneListActions();
    }
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
        console.log(done.list.length);
    },
    deleteItem: function (item) {
        item.liElem.parentNode.removeChild(item.liElem);
        done.list.splice(done.list.indexOf(item), 1);
    }
};

document.getElementById('textOfTask').onkeydown = addElem;
document.getElementById('add').onclick = addElem;

function addElem(event) {
    var text = document.getElementById("textOfTask");
    if (text.value && +event.keyCode === 13 ||text.value && event.type === 'click') {
        textExist(text.value);
        if (!textExists) {
            todo.addItem(text.value);
            text.value = "";
        }
    }
}
var textExists = false;
var lists = [todo.list, done.list];
function textExist(text) {
    lists.forEach(function (list) {
        list.some(function (task) {
            if (text == task.text) {
                document.getElementById("alert").innerHTML = "<p>такой элемент уже существует</p>";
                return textExists = true;
            } else {
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
    task.liElem.addEventListener('mousedown', function(){
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
function listenersMove(task) {
    task.liElem.getElementsByClassName("move")[0].addEventListener('click', function () {
        if (task.list === 'todo') {
            task.list = 'done';
            task.check();
            task.move(todo, done);
            document.getElementById('list_1').appendChild(task.liElem);
            doneListActions();
        } else {
            task.list = 'todo';
            task.check();
            task.move(done, todo);
            document.getElementById('list').appendChild(task.liElem);
        }
    });
}
var actionBar=false;
function doneListActions(){
    if(done.list.length>0){
        var actionElements=document.createElement("div");
        if(!actionBar) {
            actionElements.setAttribute("id", "actionElements");
            actionElements.innerHTML = '<input type="checkbox" class="checkAll">select all<button class="deleteAll">dellAll</button>';
            document.getElementById("doneList").appendChild(actionElements);
            doneListActionsListeners();
            actionBar = true;
        }
    }
    else {
        document.getElementById("actionElements").parentNode.removeChild(document.getElementById("actionElements"));
        actionBar=false;
    }
}
function doneListActionsListeners (){
    document.getElementsByClassName("checkAll")[0].addEventListener('click', function(){
        if(document.getElementsByClassName("checkAll")[0].checked===true){
            done.list.forEach(function(item){
                item.checked=false;
                item.check();
            }
        )
    } else {
            done.list.forEach(function(item){
                item.checked=true;
                item.check();
        }
            )
        }
}
    );
    document.getElementsByClassName("deleteAll")[0].addEventListener('click', function(){
        done.list.forEach(function(item){
            if(item.checked){
                done.deleteItem(item);
            }
            console.log(done.list)
        })
    })
}



/*
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
    */
Task.prototype.drag = function() {
    if (this.list === 'todo'){
        var oldList = todo;
        var newList = done;
        var listText = 'done';
        var ul = 'list_1';
        document.getElementById('list_1').setAttribute('class','droppable');
    } else {
        document.getElementById('list').setAttribute('class','droppable');
        ul = 'list';
        oldList = done;
        newList = todo;
        listText = 'todo';
    }
    /**
     * составной объект для хранения информации о переносе:
     * {
   *   elem - элемент, на котором была зажата мышь
   *   avatar - аватар
   *   downX/downY - координаты, на которых был mousedown
   *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
   * }
     */
    var dragObject = {};
    var task = this;
    var self = this.liElem;
    function onMouseDown(e) {

        if (e.which != 1) return;

        var elem = e.target.closest('.draggable');
        if (!elem) return;

        dragObject.elem = elem;

        // запомним, что элемент нажат на текущих координатах pageX/pageY
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;

        return false;
    }

    function onMouseMove(e) {
        if (!dragObject.elem) return; // элемент не зажат

        if (!dragObject.avatar) { // если перенос не начат...
            var moveX = e.pageX - dragObject.downX;
            var moveY = e.pageY - dragObject.downY;

            // если мышь передвинулась в нажатом состоянии недостаточно далеко
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            // начинаем перенос
            dragObject.avatar = createAvatar(e); // создать аватар
            if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
                dragObject = {};
                return;
            }

            // аватар создан успешно
            // создать вспомогательные свойства shiftX/shiftY
            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e); // отобразить начало переноса
        }

        // отобразить перенос объекта при каждом движении мыши
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    function onMouseUp(e) {
        if (dragObject.avatar) { // если перенос идет
            finishDrag(e);
        }

        // перенос либо не начинался, либо завершился
        // в любом случае очистим "состояние переноса" dragObject
        dragObject = {};
    }

    function finishDrag(e) {
        var dropElem = findDroppable(e);

        if (!dropElem) {
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem, oldList, newList);
        }
    }

    function createAvatar(e) {

        // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
        var avatar = dragObject.elem;
        var old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };

        // функция для отмены переноса
        avatar.rollback = function() {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex
        };

        return avatar;
    }

    function startDrag(e) {
        var avatar = dragObject.avatar;

        // инициировать начало переноса
        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }

    function findDroppable(event) {
        // спрячем переносимый элемент
        dragObject.avatar.hidden = true;

        // получить самый вложенный элемент под курсором мыши
        var elem = document.elementFromPoint(event.clientX, event.clientY);

        // показать переносимый элемент обратно
        dragObject.avatar.hidden = false;

        if (elem == null) {
            // такое возможно, если курсор мыши "вылетел" за границу окна
            return null;
        }

        return elem.closest('.droppable');
    }

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;

    self.onDragEnd = function(dragObject, dropElem){
        task.move(oldList,newList);
        dropElem.appendChild(dragObject.elem);
        dragObject.elem.removeAttribute('style');
        task.list=listText;
        document.getElementById(ul).removeAttribute('class');
    };
    self.onDragCancel = function(dragObject) {
        document.getElementById(ul).removeAttribute('class');
        dragObject.avatar.rollback();
    };

};


function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
