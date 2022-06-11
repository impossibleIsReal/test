import { Task } from "./task.js";
import { API } from "./api.js";


window.addEventListener('DOMContentLoaded', () => {

  const dateInput = document.querySelector('.nav-date')

  let currentDate = dateInput.value;

  dateInput.addEventListener('input', () => {
    currentDate = dateInput.value ? dateInput.value : today();
    console.log(currentDate)
  });

  const scene = document.querySelector('.app-container');


  const data = API.loadData(currentDate);
  if (data) {
    data.forEach(item => {
      const task = new Task(item.name, item.date, item.isDone, item.priority);
      task.view(scene);
    });
  } else {
    scene.innerHTML=`
      <tr>Задач на текущий день нет</tr>
    `
  }

  document.querySelector('.app-button').addEventListener('click', () => {
    const value = document.querySelector('.app-input').value
    if (value) {
      const newTask = new Task(value, currentDate);
      if (!data) {
        scene.innerHTML = '';
      }
      API.setData(newTask);
      newTask.view(scene);
    }
  });

  function today() {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  }

});

