const {
    javascript,
    html,
    css,
    study,
    algorithm,
    frame,
    engineering,
    po,
    dataStructure,
    designPattern,
    security,
    network,
    node,
} = require('./sidebar/index');
const config = {
    title: "Hi Leslie",
    description: "明确 值得 可实现",
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
            "/blog/study/": study,
            "/advanced/algorithm/": algorithm,
            "/advanced/data-structure/": dataStructure,
            "/advanced/design-pattern/": designPattern,
            "/network-security/network/": network,
            "/network-security/security/": security,
            "/node/": node,
        }
    }
};
module.exports = config;
