const { javascript, html, css } = require('./sidebar/index');
const config = {
    title: "Hello Leslie",
    description: "Just playing around",
    head: [["link", { rel: "icon", href: "/images/happy.png" }]],
    markdown: {
        // 显示代码行号
        lineNumbers: true
    },
    base: "/learning/",
    themeConfig: {
        lastUpdated: '上次更新',
        nav: require("./nav/index"),
        sidebar: {
            "/front-end/JavaScript/": javascript,
            "/front-end/HTML/": html,
            "/front-end/CSS/": css,
        }
    }
};
module.exports = config;
