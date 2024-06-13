"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superTask_1 = __importDefault(require("../superTask"));
let superTask;
afterEach(() => {
    jest.useRealTimers();
});
beforeAll(() => {
    superTask = new superTask_1.default(2);
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
