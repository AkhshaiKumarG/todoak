let todoContainer = document.getElementById("todoContainer");
let onSaving = document.getElementById("onSaving");
let confettiAnimationContainer = document.getElementById("confettiAnimationContainer");
let userInput = document.getElementById("userInput");
let spinner = document.getElementById("spinner");
let sectionHomePage = document.getElementById("sectionHomePage");
let sectionTodoPage = document.getElementById("sectionTodoPage");
let sectionPopupMenu = document.getElementById("sectionPopupMenu");
let doItBtn = document.getElementById("doItBtn");
let backBtn = document.getElementById("backBtn");
let onAddTodo = document.getElementById("onAddTodo");

// let todoList = [
// {
//     text: "To become a Millionaire",
//     uniqueNo: 1
// },
// {
//     text: "To buy a top-end BMW car",
//     uniqueNo: 2
// },
// {
//     text: "To buy a latest iPhone",
//     uniqueNo: 3
// },
// {
//     text: "To help poor people",
//     uniqueNo: 4
// }
// ];

// function to get todos from local storage
function getTodoFromStorage() {
    let stringified = localStorage.getItem("todoList");
    let parsed = JSON.parse(stringified);
    if (parsed === null) {
        return [];
    } else {
        return parsed;
    }
}

let todoList = getTodoFromStorage();

// function for saving todo in local storage
onSaving.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


let todoLength = todoList.length;

// function for adding new todo in lists
function onAdding() {
    if (userInput.value === "") {
        alert("Enter a valid text");
        return;
    }
    todoLength = todoLength + 1;

    let input = userInput.value;

    let newTodo = {
        text: input,
        uniqueNo: todoLength,
        isChecked: false,
        isFilled: false
    }
    todoList.push(newTodo);
    createAppend(newTodo);

}

// function for checked status for completed todo
function statusChange(checkbox, lable, todoId) {
    let checkboxEl = document.getElementById(checkbox);
    let label = document.getElementById(lable);
    // label.classList.toggle("checked");
    // labelContainer.classList.toggle("checked-color")

    // to get the todo from local storage with checked status
    let todoStatusIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoStatus = "todo" + eachTodo.uniqueNo;
        if (eachTodoStatus === todoId) {
            return true;
        } else {
            return false;
        }
        //  return eachTodoStatus === todoId;
    })
    let status = todoList[todoStatusIndex];

    if (status.isChecked === true) {

        // labelContainer.classList.toggle("checked-color")
        status.isChecked = false;
    } else {
        status.isChecked = true;
        // labelContainer.classList.remove("checked-color")
    }

    // to get the todo from local storage with filled color status
    let filledStatusIndex = todoList.findIndex(function(eachTodo) {
        let eachFilledStatus = "todo" + eachTodo.uniqueNo;
        if (eachFilledStatus === todoId) {
            return true;
        } else {
            return false;
        }
    })
    let filledStatus = todoList[filledStatusIndex];
    if (filledStatus.isFilled === true) {
        filledStatus.isFilled = false;
    } else {
        filledStatus.isFilled = true;
    }
}

// function to create a new todo
function createAppend(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkbox = "checkbox" + todo.uniqueNo;
    let lable = "label" + todo.uniqueNo;

    // creating a list for each todo
    let list = document.createElement("li");
    list.classList.add("d-flex", "flex-row");
    list.id = todoId;
    todoContainer.appendChild(list);

    // let inputCheckbox = document.createElement("input");
    // inputCheckbox.type = "checkbox";
    // inputCheckbox.id = checkbox;
    // inputCheckbox.checked = todo.isChecked;
    // inputCheckbox.classList.add("checkbox-style");

    // // function to checked status and color transitions
    // inputCheckbox.onclick = function() {
    //     statusChange(checkbox, lable, todoId);
    //     labelContainer.classList.toggle("checked-color")
    //     label.classList.toggle("black")
    //     completedWord.classList.toggle("completed-word-transition");
    //     completedWord.classList.toggle("completed-white");
    // }
    // list.appendChild(inputCheckbox);


    // to align the completed and delete in row wise
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("lists", "d-flex", "flex-row");
    list.appendChild(labelContainer);


    let label = document.createElement("label");
    label.setAttribute("for", checkbox);
    label.id = lable;
    label.classList.add("label-style");
    label.textContent = todo.text;
    labelContainer.appendChild(label);


    let completedContainer = document.createElement("div");
    completedContainer.classList.add("d-flex", "flex-row", "justify-content-end", "trash-align");
    labelContainer.appendChild(completedContainer);

    let completedWord = document.createElement("label");
    completedWord.textContent = "COMPLETED";
    completedWord.id = checkbox;
    completedWord.checked = todo.isChecked;

    completedWord.classList.add("completedStyles");


    // function for completed word
    completedWord.onclick = function() {
        statusChange(checkbox, lable, todoId);
        // inputCheckbox.checked = todo.isChecked;

        labelContainer.classList.toggle("checked-color")
        label.classList.toggle("black")
        completedWord.classList.add("completed-word-transition");
        completedWord.classList.toggle("completed-white");


        // confetti canvas on clicking the completed word
        let canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 600;
        confettiAnimationContainer.appendChild(canvas);
        let confetti_btn = confetti.create(canvas);
        confetti_btn().then(() => canvas.remove());
    }
    completedContainer.appendChild(completedWord);


    if (todo.isChecked === true) {

        // label.classList.add("checked");
        labelContainer.classList.add("checked-color");
        label.classList.add("black")
        completedWord.classList.add("completed-word-transition");
        completedWord.classList.add("completed-white");
    }
    if (todo.isFilled === true) {
        // label.classList.add("checked");
        labelContainer.classList.add("checked-color");
        label.classList.add("black")
        completedWord.classList.add("completed-word-transition");
        completedWord.classList.add("completed-white");
    }
    // labelContainer.appendChild(label);


    // function to change the style of todo by hovering mouse on the completed word
    function mouse2() {
        labelContainer.classList.toggle("mousing2");
        completedWord.classList.toggle("completed-word-transition");
        label.classList.toggle("black-label");
    }
    completedWord.addEventListener("mouseenter", mouse2);
    completedWord.addEventListener("mouseleave", mouse2);

    let trashContainer = document.createElement("div");
    trashContainer.classList.add("d-flex", "flex-row", "justify-content-end", "trash-align");
    labelContainer.appendChild(trashContainer);


    let deleteWord = document.createElement("label");
    deleteWord.textContent = "DELELTE";
    deleteWord.classList.add("deleteStyles");
    trashContainer.appendChild(deleteWord);


    // function to change the style of todo by hovering mouse on the delete word
    function mouse1() {
        labelContainer.classList.toggle("mousing1");
        deleteWord.classList.toggle("delete-word-transition1");
        label.classList.toggle("black-label");
    }

    deleteWord.addEventListener("mouseenter", mouse1);
    deleteWord.addEventListener("mouseleave", mouse1);


    // function to delete the todo
    let deleting = document.getElementById("deleting");
    deleteWord.onclick = function() {
        // let checkOk = 
        // alert("Are you sure ?")
        if (confirm("Are you sure ?")) {
            onDelete(todoId);
        } else {
            event.preventDefault();
        }

    };

    // setTimeout(() => {
    //     labelContainer.classList.remove("mousing1");
    //     deleteWord.classList.remove("delete-word-transition1");
    //     label.classList.remove("black-label");
    // }, 10);

}






// 'ADD' button onclick function for text area
onAddTodo.onclick = function() {
    onAdding();
    userInput.value = "";
}


// function to delete a todo from local storage
function onDelete(todoId) {
    let deleteId = document.getElementById(todoId);
    todoContainer.removeChild(deleteId);

    let deletingIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletingIndex, 1);

}


for (let todo of todoList) {
    createAppend(todo);
}


// function to display the desired page
function displayResult(targetPage) {
    sectionHomePage.style.display = "none";
    sectionTodoPage.style.display = "none";
    if (targetPage === "sectionTodoPage") {
        sectionTodoPage.style.display = "block";
    } else {
        sectionHomePage.style.display = "block";
    }
}


doItBtn.onclick = function() {
    displayResult("sectionTodoPage");

}
backBtn.onclick = function() {
    displayResult("sectionHomePage")
}