const Input = document.querySelector(".input");
const Button = document.querySelector(".button");
const List = document.querySelector(".list");
const filter = document.querySelector(".filter");

Button.addEventListener("click", Add);
List.addEventListener("click", Delete);
filter.addEventListener("change", Filter);

function Add(event) {
    if(Input.value==''){
        alert("No relevant information was placed in the free spaces")
    }

    event.preventDefault();
    const division = document.createElement("div");
    division.classList.add("todo");
    const newList = document.createElement("li");
    newList.innerText = Input.value;
    newList.classList.add("item");
    division.appendChild(newList);

    Input.value = "";
    const CButton = document.createElement("button");
    CButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    CButton.classList.add("CButton");
    division.appendChild(CButton);

    const DButton = document.createElement("button");
    DButton.innerHTML = '<i class="fas fa-trash"></li>';
    DButton.classList.add("DButton");
    division.appendChild(DButton);

    List.appendChild(division);

}

function Delete(e) {
    const item = e.target;

    if(item.classList[0] === "DButton") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    if(item.classList[0] === "CButton") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function Filter(e) {
    const todos = List.childNodes;
    todos.forEach(function(todo) {
        if(e.target.value=="all"){
                todo.style.display = "flex";
            }
        else if(e.target.value=="completed"){
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            }
        else{
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            }
        }
    );
}