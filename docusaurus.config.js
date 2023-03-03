// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MobX-Cookbook",
  url: "https://mobx-cookbook.github.io",
  baseUrl: "/",
  favicon: "favicon.png",
  trailingSlash: false,
  organizationName: "mobx-cookbook",
  projectName: "mobx-cookbook.github.io",

  i18n: {
    defaultLocale: "ru",
    locales: ["ru"],
  },

  plugins: [
    ['docusaurus-plugin-yandex-metrica', {
      counterID: '92679562',
    }],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // editUrl: 'https://github.com/mobx-cookbook/cookbook',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "MobX-Cookbook",
        logo: {
          alt: "MobX-Cookbook",
          src: "favicon.png",
        },
        items: [
          {
            href: "https://github.com/mobx-cookbook/cookbook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Главы",
            items: [
              {
                label: "Введение",
                to: "installation",
              },
              { label: "Практика", to: "practice" },
              { label: "Продвинутые темы", to: "advanced" },
            ],
          },
          {
            title: "Сообщество",
            items: [
              {
                label: "Telegram",
                href: "https://t.me/mobxjs_ru",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
