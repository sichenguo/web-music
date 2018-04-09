// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 最后一行不应该有空行
    "eol-last": 0,
    "arrow-parent": 0,
    "space-before-function-paren": 0,
    //不检测文件末尾是否有空行
    'eol-last': 0,
    //不检测函数左括号前面的空格
    'space-before-function-paren': 0,
    'arrow-parens': 0,
    //不检测注释空格
    "spaced-comment": 0,
    //可以使用拖尾逗号
    "comma-dangle": 0,
    // "indent": [2, "tab"],
    "keyword-spacing": 0,
    "no-unused-vars": 0,
    "no-trailing-spaces": 0,
    "no-unused-vars": [2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 关闭语句强制分号结尾
    "semi": [0],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {
      "max": 100
    }],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": 0,
    "no-tabs":0
  }
}
