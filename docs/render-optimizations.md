# Оптимизация рендеринга

Давайте создадим тестовый компонент, который содержит один `div` с текстом `test`, и при каждом рендере выводит что-то в консоль.

```jsx
const TestComp = () => {
  console.log('render', new Date())
  return <div>test</div>
}
```

Дальше внедрим этот компонент в корень нашего приложения:

```jsx
import { observer } from 'mobx-react'
import { counterStore } from './counter.store'

const App = observer(() => {
  return (
    <div>
      <h1>{counterStore.count}</h1>
      <TestComp />

      <button onClick={counterStore.inc}>+</button>
    </div>
  )
})
```

Если мы начнем нажимать на кнопку, то увидим в консоли, что при изменении родительского компонента происходит перерендер вложенного. Это стандартное поведение React. Если вы хотите, чтобы дочерние компоненты не отрисовывались повторно, нужно использовать [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) или [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) для классовых компонентов.

В Redux-парадигме вы использовали бы селекторы, чтобы вычислить зависимости данных. Селекторы, курсоры, линзы, коннекторы - все это разные способы сообщить подписчику список его зависимостей.

MobX делает эту работу за нас автоматически. Если мы обернем наш компонент в observer и посмотрим консоль - рендеринг произойдет только один раз, т.к. MobX видит, что компонент не зависит ни от каких полей стора.

```jsx
const TestComp = observer(() => {
  console.log('render', new Date())
  return <div>test</div>
})
```

`Observer` гарантирует, что компоненты не будут повторно отрисовываться если нет соответствующих изменений. На практике, это делает приложения MobX хорошо оптимизированными из коробки.

Для работы наблюдателя не важно, как именно наблюдаемые поля попадают в компонент. Важно только то, что они считываются. Если мы деструктурируем поля стора, то все продолжит работать.

```jsx
const App = observer(() => {
  const { count, inc } = counterStore

  return (
    <div>
      <h1>{count}</h1>
      <TestComp />

      <button onClick={inc}>+</button>
    </div>
  )
})
```

Обратите внимание, что это мышление отличается от Redux, где хорошей практикой является передача примитивов "вниз" по дереву компонентов, чтобы была возможность включить мемоизацию.

Таким образом, можно оборачивать большинство ваших компонентов в `observer`. Это не скажется на производительности, а напротив, сделает рендеринг более детализированными и, за счет этого, эффективным.

### Можно ли оборачивать все компоненты в observer?

Использование observer во всех компонентах является хорошей практикой. Причины:
- Не получится забыть observer для компонента, который рендерит наблюдаемые значения
- `observer` внутри [оборачивает](https://github.com/mobxjs/mobx/blob/b82c7f3229439a6a1f0d35ebb559dc6b0fd0bec7/packages/mobx-react-lite/src/observer.ts#L130) компонент в React.memo, что позволяет предотвратить лишние перерисовки, например когда перерисовка родительского компонента влечёт перерисовку дочернего.

Есть несколько способов упростить создание observer компонентов.

**1. ESLint-правило**

Для Mobx существует официальный [ESLint-плагин](https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx). Нам нужно правило [mobx/missing-observer](https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx#mobxmissing-observer). Оно проверяет, что все функциональные и классовые компоненты являются observer'ами. У правила доступен autofix, поэтому оно может автоматически исправлять код если запустить ESLint с опцией [--fix](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

**2. Сниппет для редактора кода.** 

В редакторе кода можно создать шаблон для компонента, который уже обёрнут в observer. Пример для WebStorm:

Если конвенция именования SomeComponent.tsx -> SomeComponent

```typescript
import React from 'react';
import { observer } from 'mobx-react-lite';

export const $NAME = observer(() => {
  
})
```

Для описания шаблонов используется язык Apache Velocity. Более подробно почитать про настройку шаблонов для WebStorm можно по [ссылке](https://habr.com/ru/articles/764510/). Для VSCode можно попробовать воспользоваться [плагинами](https://marketplace.visualstudio.com/items?itemName=bam.vscode-file-templates) либо сторонними пакетами вроде [Plop.js](https://github.com/plopjs/plop)

### Наблюдаемые массивы

Вышесказанное особенно важно при рендеринге больших коллекций. Чем меньше ваши компоненты, тем меньше изменений они должны будут повторно отобразить.

```jsx
const Component = observer((props) => (
  <div>
    {props.user.name}
    <ul>
      {props.todos.map((todo) => (
        <TodoView todo={todo} key={todo.id} />
      ))}
    </ul>
  </div>
))
```

В этом примере React без необходимости будет согласовать (reconciliation) все `TodoView`-компоненты при изменении `props.user.name`. `TodoView`-компоненты не будут повторно визуализироваться в DOM, но процесс согласования сам по себе является дорогостоящим.

Поэтому при работе с массивами, рекомендуется писать компоненты, которые просто рендерят коллекцию и больше ничего не делают.

```jsx
const Component = observer((props) => (
  <div>
    {props.user.name}
    <TodosView todos={props.todos} />
  </div>
))

const TodosView = observer(({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <TodoView todo={todo} key={todo.id} />
    ))}
  </ul>
))
```

### Можно ли использовать Mobx без оборачивания каждого компонента в observer?

Нет, для использования Mobx нужно оборачивать компоненты в observer. Взамен вам не нужно думать про вложенность, мемоизацию, селекторы и подписки. Более того, использование observer не более затратно чем использование `React.memo`, который вы будете вынуждены использовать для достижения такого же уровня производительности.
