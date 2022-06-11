import { API } from "./api.js";

export class Task {

  constructor(name, date='09.06.2022', isDone=false, priority=null) {
    this.name = name;
    this.date = date;
    this.isDone = isDone;
    this.priority = priority;
  }

  view(el) {
    const taskRow = document.createElement('tr');

    const taskName = document.createElement('td');
    taskName.textContent = this.name;

    const taskDate = document.createElement('td');
    taskDate.textContent = this.date.toString();

    const taskPriority = document.createElement('td');
    taskPriority.textContent = this.priority ? this.priority : 'No priority';

    const taskControl = document.createElement('td');

    const taskDone = document.createElement('button');
    taskDone.classList.add('app-btn');


    taskDone.addEventListener('click', () => {
      this.isDone = !this.isDone;
      taskDone.classList.toggle('btn-done')
      API.updateData(this);
    })

    const taskDelete = document.createElement('button');
    taskDelete.classList.add('app-btn', 'btn-del');

    taskDelete.addEventListener('click', () => {
      API.deleteTask(this);
      el.removeChild(taskRow);
    })

    taskControl.append(taskDone);
    taskControl.append(taskDelete);

    taskRow.append(taskName);
    taskRow.append(taskDate);
    taskRow.append(taskPriority);
    taskRow.append(taskControl);

    el.append(taskRow);
  }

}