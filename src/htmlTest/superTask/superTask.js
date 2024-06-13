class SuperTask {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.tasks = [];
        this.runningTasks = 0;
        this.maxConcurrency = maxConcurrency;
    }
    addTask(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({ task, resolve, reject });
            this._run();
        });
    }
    _run() {
        while (this.runningTasks < this.maxConcurrency && this.tasks.length > 0) {
            this.runningTasks++;
            const { task, resolve, reject } = this.tasks.shift();
            task().then(resolve, reject).finally(() => {
                this.runningTasks--;
                this._run();
            });
        }
    }
}
