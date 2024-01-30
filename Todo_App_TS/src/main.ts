import './style.css';

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement; // Fix the typo here

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)
  }

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");

  todo.className = "todo";
  //creating a checkBox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find(item => {
      item.id === id ? item.isCompleted = checkBox.checked : "";
    })
    paragraph.className = checkBox.checked ? "textCut" : "";
  }

  //creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = checkBox.checked ? "textCut" : "";

  //creating delete Button
  const button: HTMLButtonElement = document.createElement("button");
  button.innerText = "X";
  button.className = "deleteBtn";
  button.onclick = () => {
    deleteTodo(id);

  }
  //Appending all to TODO
  todo.append(checkBox, paragraph, button);
  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
}

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
}
