import SuperTask from "../superTask";

let superTask: SuperTask;

afterEach(() => {
  jest.useRealTimers();
});

beforeAll(() => {
  superTask = new SuperTask(2);
});

test("test SuperTask1", (done) => {
  const start = Date.now();
  superTask.addTask(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("task-1");
        resolve(1);
        console.log(Date.now() - start + "毫秒");
        done();
      }, 5000);
    });
  });

  superTask.addTask(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("task-2");
        resolve(2);
        console.log(Date.now() - start + "毫秒");
      }, 2000);
    });
  });

  superTask.addTask(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("task-3");
        console.log(Date.now() - start + "毫秒");
        resolve(1);
      }, 2000);
    });
  });
}, 20000);
