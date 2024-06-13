"use strict";

const fs = require('fs');
const params = process.argv.slice(2);

if (params.length < 2) {
    throw new Error("You must enter enough parameters")
}

const [serial, code] = params;
const isFn = code.includes("function");

/** 可能为 function name 或 class name */
let exportName = "";
if (isFn) {
    for (let i = 9; i < code.length; i++) {
        if (code[i] === "(") {
            break;
        }
        exportName += code[i];
    }
} else {
    for (let i = 6; i < code.length; i++) {
        if (code[i] === " ") {
            break;
        }
        exportName += code[i];
    }
}

/** 用来判断使用 toBe 或 toEqual */
let type = '';
let toFn = '';
if (isFn) {
    const startIdx = code.indexOf(')') + 3
    for (let i = startIdx; i < code.length; i++) {
        if (code[i] === ' ') {
            break
        }
        type += code[i]
    }
}
if (['number', 'string', 'boolean'].includes(type)) {
    toFn = 'toBe'
} else {
    toFn = 'toEqual'
}


/** 如果是 function ，替换成箭头函数 */
const mainTemplate = isFn ?
    `${(code ?? "")
      .replace("function", "const")
      .replace("(", " = (")
      .replace("{", "=> {")
      .replace(";", "")}

export default ${exportName}
` :
    `${code}

export default ${exportName}    
`;

/** 测试文件模板 */
let expectTemplate = '';
if (isFn) {
    expectTemplate = `expect(${exportName}()).${toFn}()
    expect(${exportName}()).${toFn}()
    expect(${exportName}()).${toFn}()`
}
const testTemplate = `import ${exportName} from '../${serial}';

test("${serial}", () => {
    ${expectTemplate}
})
`

const createFiles = () => {
    // 生成基本文件
    fs.writeFile(`./src/${serial}.ts`, mainTemplate, (error) => {
        if (error) {
            throw error
        }
    })

    // 生成测试文件
    fs.writeFile(`./src/tests/${serial}.spec.ts`, testTemplate, (error) => {
        if (error) {
            throw error
        }
    })
}

// 判断文件是否存在，并作对应的处理
fs.access(`./src/${serial}.ts`, (error) => {
    if (error) /** 文件不存在 */ {
        createFiles()
    } else /** 文件存在 */ {
        throw new Error("The file already exists")
    }
})
