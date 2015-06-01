/**
 * Sinelnikov Roman
 */

        var todo;
        todo = {
            list: [],
            done: [],
            deleted: [],
            addItem: function (item) {
                this.list.push(item);
            },
            deleteItem: function (item) {
                this.list.splice(item,1)
                this.deleted.push(item);
            },
            doneItem: function (item) {
                this.done.push(item);
            }
        };
for (var i=1;i<2;) {
    var item = prompt("Список дел: \n" + todo.list + "\n Введите задание в поле ниже:");
    if (todo.list.indexOf(item) === -1) {
        todo.addItem(item);
    } else {
        todo.deleteItem(item);
    }
    var answer;
    answer = confirm("Желаете продолжить");
    if (!answer) {
        i++
    }
};
console.log(todo.list);
console.log(todo.deleted);