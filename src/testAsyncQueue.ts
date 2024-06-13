
export default class TaskQueue {
    constructor(private maxConcurrency: number) {
        this.maxConcurrency = maxConcurrency;
    }

    private tasks: Array<() => Promise<any>> = [];
    private runningTasks = 0;

    addTask(task: () => Promise<any>) {
        this.tasks.push(task);
        this.runningTasks++;
    }

    async runTasks() {
        while (this.runningTasks < this.maxConcurrency && this.tasks.length > 0) {
            const task = this.tasks.shift();
            if (task) {
                await task();
                this.runningTasks--;
            }
        }
    }
}

