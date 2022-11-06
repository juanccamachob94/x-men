class TasksService {
  static async execute(context, tasks) {
    let results = [];
     await tasks.reduce((promise, task) => {
      return promise
        .then((result) => {
          return TasksService.asyncFunc(task).then(r => {
            results.push(r.bind(context)())
          });
        })
    }, Promise.resolve());
    return results;
  }

  static asyncFunc(f) {
    return new Promise((resolve, reject) => {
      let task = f;
      let time = 0;
      if(typeof(task) !== 'function') {
        task = f.task;
        time = f.time;
      }
      setTimeout(() => resolve(task), time);
    });
  }
}

module.exports = TasksService;
