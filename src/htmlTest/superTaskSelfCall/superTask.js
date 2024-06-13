class SuperTask {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.tasks = [];
        this.runningTasks = 0;
    }
    addTask(task) {
        this.tasks.push(task);
        this._run();
        return this;
    }
    _run() {
        while (this.runningTasks < this.maxConcurrency && this.tasks.length > 0) {
            this.runningTasks++;
            const task = this.tasks.shift();
            task().then((data)=>{
                console.log(data);
            }, (reason)=>{
                console.log(reason);
            }).finally(() => {
                this.runningTasks--;
                this._run();
            });
        }
    }
}
