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
                this.list.splice(item,1);
            },
            doneItem: function (item) {
                this.done.push(item);
            }
        };
var text = document.getElementById("text");
var ul = document.getElementById("list");
button.onclick = function(){

    var li = document.createElement("li");
    console.log(text.value);
    li.appendChild(document.createTextNode("" + text.value));
    ul.appendChild(li);
    li.addEventListener('click',function(){console.log("ok")});
};
/*
var checked = document.getElementById("list").document.getElementsByTagName("li");
for (var i=0; i<checked.length;i++) {
    checked[i].addEventListener('click', function () {
        console.log("ok")
    }, false);
}*/
