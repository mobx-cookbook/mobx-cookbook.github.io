// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
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
        {
          type: "category",
          label: "Actions",
          link: { type: "doc", id: "actions" },
          items: ["actions", "async-actions"],
        },
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
      items: ["practice"],
    },
    {
      type: "category",
      label: "Продвинутые темы",
      link: { type: "doc", id: "advanced" },
      items: ["render-optimizations", "mobx-inside", "classess-vs-functions"],
    },
    {
      type: "category",
      label: "Поддержка книги",
      link: { type: "doc", id: "support" },
      items: ["support"],
    },
    {
      type: "category",
      label: "Awesome Mobx",
      link: { type: "doc", id: "awesome" },
      items: ["awesome", "who-uses-mobx"],
    },
  ],
}

module.exports = sidebars
