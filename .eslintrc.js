module.exports = {
    "env": {       // 环境配置
        "browser": false,
        "es6": true,    // 支持es语法
        "node":true,    // 支持node
    },
    "extends": "eslint:recommended",    // 继承推荐的规则
    "parser":"babel-eslint",
    "parserOptions": {  // 额外配置变量
        "ecmaVersion": 6,
        "sourceType": "script"
    },
    "rules": {  // 规则
       "no-console":"warn"
    }
};
