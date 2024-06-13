import TaskQueue from '../testAsyncQueue'
let test1:TaskQueue;
afterEach(() => {
    jest.useRealTimers();
  });

  
beforeAll(() => {
    test1 = new TaskQueue(2);
})

test("TaskQueue", async () => {
    test1.addTask(async () => {
        return new Promise( (resolve) => {
             setTimeout(() => {
                console.log('TaskQueue-1');
                resolve(1);
            }, 1000);
        });
    });
    test1.addTask(async () => {
        return new Promise( (resolve) => {
             setTimeout(() => {
                console.log('TaskQueue-2');
                resolve(1);
            }, 900);
        });
    });
    test1.addTask(async () => {
        return new Promise( (resolve) => {
             setTimeout(() => {
                console.log('TaskQueue-3');
                resolve(1);
            }, 1100);
        });
    });
    await test1.runTasks();
})