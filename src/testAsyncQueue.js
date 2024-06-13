"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskQueue {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.tasks = [];
        this.runningTasks = 0;
        this.maxConcurrency = maxConcurrency;
    }
    addTask(task) {
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
exports.default = TaskQueue;
