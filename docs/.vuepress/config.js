const { javascript, html, css, study, algorithm, frame, engineering, po, blog} = require('./sidebar/index');
const config = {
    title: "Hi Leslie",
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
            "/front-end/frame/": frame,
            "/front-end/engineering/": engineering,
            "/front-end/performance-optimization/": po,
            "/blog/": blog,
            "/other/study/": study,
            "/algorithm/": algorithm,
        }
    }
};
module.exports = config;
