// Helluva
$(document).ready(function(){
    jQuery("<button>", {
        type: "submit",
        id: "new",
        text: "New"
    }).appendTo("body");

    $("#new").click(function(){
        addTodo();
    });

    jQuery("<div>", {
        id: "ft_list"
    }).appendTo("body");

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = document.cookie;
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    function addTodo(){
        let todo = prompt("Please enter your todo:");
        todo = encodeURIComponent(todo)
        if(todo){
            let todos = getCookie("todos");
            if(todos){
                todos += "," + todo;
            }else{
                todos = todo;
            }
            setCookie("todos", todos, 365);
            showTodos();
        }
    }

    function showTodos(){
        let todos = getCookie("todos");
        if(todos){
            todos = todos.split(",");
            jQuery("#ft_list").empty();
            for(let i = todos.length-1; i >= 0; i--){
                jQuery("<li>", {
                    text: decodeURIComponent(todos[i]),
                    click: function(){
                        clearTodo(i);
                    }
                }).appendTo("#ft_list");


            }
        }
    }

    function clearEntireTodos(){
        jQuery("#ft_list").empty();
        setCookie("todos", "", 365);
        showTodos();
    }

    function clearTodo(i){
        let todos = getCookie("todos");
        if(todos){
            todos = todos.split(",");
            let input = confirm("Do you want to delete this todo? (Yes/No)");
            if(input){
                if (todos.length == 1){
                  clearEntireTodos();
                } else {
                  todos.splice(i, 1);
                  setCookie("todos", todos.join(","), 365);
                  showTodos();
                }
            } else {
                return;
            }
        }
    }

    showTodos();
});