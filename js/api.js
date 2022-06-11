
export class API {

  static loadData(date) {
    return JSON.parse(localStorage.getItem(JSON.stringify(date)));
  }

  static setData(task) {
    const date = JSON.stringify(task.date)
    if (!localStorage[date]) {
      const data = [task]
      localStorage.setItem(date, JSON.stringify(data))
    } else {
      const data = this.loadData(task.date);
      data.push(task);
      localStorage[date] = JSON.stringify(data);
    }
  }

  static updateData(task) {
    const data = this.loadData(task.date);
    const index = data.indexOf(data.find(item => item.name === task.name));
    data[index] = task;
    localStorage[JSON.stringify(task.date)] = JSON.stringify(data);
  }

  static deleteTask(task) {
    let data = this.loadData(task.date);
    data = data.filter(item => item.name !== task.name);
    localStorage[JSON.stringify(task.date)] = JSON.stringify(data);
  }

}