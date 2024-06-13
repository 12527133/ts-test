
export default class SuperTask {
    constructor(private maxConcurrency: number) {
        this.maxConcurrency = maxConcurrency;
    }

    private tasks: Array<{task: () => Promise<any>, resolve: (value: unknown) => void, reject: (reason?: any)=>void}> = [];
    private runningTasks = 0;

    addTask(task: () => Promise<any>) {
        return new Promise((resolve, reject) => {
            this.tasks.push({task,resolve,reject});
            this._run();
        });
    }

    _run() {
        while (this.runningTasks < this.maxConcurrency && this.tasks.length > 0) {
            this.runningTasks++;
            const {task,resolve,reject} = this.tasks.shift()!;
            task().then(resolve,reject).finally(() => {
                this.runningTasks--;
                this._run();
            });
        }
    }
}

