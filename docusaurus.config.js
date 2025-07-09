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
    locales: ["ru", "en"],
    localeConfigs: {
      ru: {
        label: "Русский",
        direction: "ltr",
        htmlLang: "ru",
        calendar: "gregory",
      },
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-US",
        calendar: "gregory",
      },
    },
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
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://github.com/mobx-cookbook/cookbook",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://t.me/mobxjs_ru",
            label: "Telegram",
            position: "right",
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
