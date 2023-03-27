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
    if(todo){
        todo = encodeURIComponent(todo)
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
        let html = "";
        for(let i = todos.length-1; i >= 0; i--){
            html += `<li onclick="clearTodo(${i})">${decodeURIComponent(todos[i])}</li>`;
        }
        document.getElementById("ft_list").innerHTML = html;
    }
}

function clearEntireTodos(){
    document.getElementById("ft_list").innerHTML = null;
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