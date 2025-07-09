// @ts-check

/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Введение",
      items: [
        "installation",
        "classes",
        "observable-state",
        "reactions",
        "actions",
        "async-actions",
        "reduce-mobx-api-boilerplate",
        "react-integration",
      ],
    },
    {
      type: "category",
      label: "Продвинутые темы",
      link: { type: "doc", id: "advanced" },
      items: ["render-optimizations", "mobx-inside", "beware-reactions", "reactivity-loss", "classess-vs-functions"],
    },
    "support",
    "awesome",
    "who-uses-mobx",
  ],
}

module.exports = sidebars
