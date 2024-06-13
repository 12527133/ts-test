"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testAsyncQueue_1 = __importDefault(require("../testAsyncQueue"));
let test1;
afterEach(() => {
    jest.useRealTimers();
});
beforeAll(() => {
    test1 = new testAsyncQueue_1.default(2);
});
test("TaskQueue", async () => {
    test1.addTask(async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('TaskQueue-1');
                resolve(1);
            }, 1000);
        });
    });
    test1.addTask(async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('TaskQueue-2');
                resolve(1);
            }, 900);
        });
    });
    test1.addTask(async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('TaskQueue-3');
                resolve(1);
            }, 1100);
        });
    });
    await test1.runTasks();
});
