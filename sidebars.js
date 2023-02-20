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
        {
          type: "category",
          label: "Доступ к состоянию",
          link: { type: "doc", id: "react-integration/react-integration" },
          items: [
            "react-integration/singleton",
            "react-integration/context-api",
            "react-integration/conclusion",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Практика",
      link: { type: "doc", id: "practice" },
      items: [],
    },
    {
      type: "category",
      label: "Продвинутые темы",
      link: { type: "doc", id: "advanced" },
      items: ["render-optimizations", "mobx-inside", "reactivity-loss", "classess-vs-functions"],
    },
    {
      type: "category",
      label: "Поддержка книги",
      link: { type: "doc", id: "support" },
      items: [],
    },
    {
      type: "category",
      label: "Awesome Mobx",
      link: { type: "doc", id: "awesome" },
      items: ["who-uses-mobx"],
    },
  ],
}

module.exports = sidebars
