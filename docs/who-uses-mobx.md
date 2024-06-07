# Кто использует Mobx?

Mobx активно используется, что подтверждают как популярные Open Source-проекты, так и блоги крупных компаний.

### Какие компании используют
- [Amazon](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-104604)
- [Netflix](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-104674)
- [Microsoft](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-420684)
- [Canva](https://github.com/mobxjs/mobx/issues/3772)
- [Coinbase](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-104579)
- [Oracle](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-104687)
- [Baidu](https://github.com/mobxjs/mobx/discussions/681#discussioncomment-104688)

### Какие сайты используют
Список сайтов, сгенерированный анализатором JS-бандлов GradeJS:
- https://gradejs.com/package/mobx
- https://gradejs.com/package/mobx-react-lite

В числе прочих сайтов есть udemy.com, grammarly.com, steamcommunity.com, postman.com

### Как используют
- Mail.ru (VK): https://habr.com/ru/company/vk/blog/522312/
- Tinkoff: https://habr.com/ru/company/tinkoff/blog/503136/
- Яндекс: https://habr.com/ru/company/yandex/blog/339054/
- OK: https://habr.com/ru/company/odnoklassniki/blog/486810/
- СДЭК: https://www.youtube.com/watch?v=5MdwNGttfLg

### Open Source
| Репозиторий                                                                           | Кол-во звёзд | Описание                               | Пример использования Mobx                                                                                                                                                                                     |
|---------------------------------------------------------------------------------------|--------------|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Cypress]( https://github.com/cypress-io/cypress)                                     | ~45k         | Инструмент для E2E-тестирования        | [MobxRunnerStore](https://github.com/cypress-io/cypress/blob/ff89ffa2b2ef36d02bff0588bb0582cfa8a6002d/packages/app/src/store/mobx-runner-store.ts#L17 )                                                       |
| [redoc](https://github.com/Redocly/redoc)                                             | ~21k         | Генератор OpenAPI/Swagger документации | [MenuStore](https://github.com/Redocly/redoc/blob/25394b7aba306755a5cf78dc49217b8c2d23375c/src/services/MenuStore.ts)                                                                                         |
| [lens](https://github.com/lensapp/lens)                                               | ~21k         | Программа для управления Kubernetes    | [EntityRegistry](https://github.com/lensapp/lens/blob/f1a960fd785b62a118acd8b1525d879f39917e21/packages/core/src/main/catalog/entity-registry.ts#L6)                                                          |
| [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) | ~12k         | Утилита для анализа бандлов            | [Store](https://github.com/webpack-contrib/webpack-bundle-analyzer/blob/f01056a51fa16f3274204b5b98bba1be3a3f496d/client/store.js)                                                                             |
| [cloudbeaver](https://github.com/dbeaver/cloudbeaver)                                 | ~2k          | Менеджер баз данных                    | [ResultSetEditAction](https://github.com/dbeaver/cloudbeaver/blob/ab985673b0cce1ea071e2069c2f0353aff9ae489/webapp/packages/plugin-data-viewer/src/DatabaseDataModel/Actions/ResultSet/ResultSetEditAction.ts) |
| [HeyForm](https://github.com/heyform/heyform)                                            | ~2k          | Билдер форм                            | [WorkspaceStore](https://github.com/heyform/heyform/blob/529dc39fad56cae2fbe3872e83c7a4f805aa64d3/packages/webapp/src/store/workspace.store.ts#L9)      |
| [signal](https://github.com/ryohey/signal)                                            | ~1k          | Онлайн музыкальный секвенсор           | [MIDIDeviceStore](https://github.com/ryohey/signal/blob/76ae0ecce53a5c9a3a5e0b6c2136f16fefbf2d4e/src/main/stores/MIDIDeviceStore.ts#L4)                                                                       |
Для проверки того, используется ли Mobx в проекте на GitHub, достаточно внутри репозитория в поиске вбить "mobx". Пример результата: https://github.com/Redocly/redoc/search?q=mobx
