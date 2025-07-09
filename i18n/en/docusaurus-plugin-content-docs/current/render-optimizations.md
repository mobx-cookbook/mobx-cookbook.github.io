# Render Optimizations

Let's create a test component that contains one `div` with the text `test`, and prints something to the console on each render.

```jsx
const TestComp = () => {
  console.log('render', new Date())
  return <div>test</div>
}
```

Next, let's embed this component into the root of our application:

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

If we start clicking the button, we'll see in the console that when the parent component changes, the nested component re-renders. This is standard React behavior. If you want child components not to re-render, you need to use [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) or [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) for class components.

In the Redux paradigm, you would use selectors to calculate data dependencies. Selectors, cursors, lenses, connectors - these are all different ways to tell a subscriber about its list of dependencies.

MobX does this work for us automatically. If we wrap our component in observer and look at the console - rendering will happen only once, because MobX sees that the component doesn't depend on any store fields.

```jsx
const TestComp = observer(() => {
  console.log('render', new Date())
  return <div>test</div>
})
```

`Observer` guarantees that components won't re-render if there are no corresponding changes. In practice, this makes MobX applications well-optimized out of the box.

For the observer to work, it doesn't matter how exactly the observable fields get into the component. What matters is only that they are read. If we destructure store fields, everything will continue to work.

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

Note that this mindset differs from Redux, where good practice is to pass primitives "down" the component tree to enable memoization.

Thus, you can wrap most of your components in `observer`. This won't affect performance, but on the contrary, will make rendering more granular and, therefore, efficient.

### Can you wrap all components in observer?

Using observer in all components is a good practice. Reasons:
- You can't forget observer for a component that renders observable values
- `observer` internally [wraps](https://github.com/mobxjs/mobx/blob/b82c7f3229439a6a1f0d35ebb559dc6b0fd0bec7/packages/mobx-react-lite/src/observer.ts#L130) the component in React.memo, which helps prevent unnecessary re-renders, for example when a parent component re-render causes a child component re-render.

There are several ways to simplify creating observer components.

**1. ESLint rule**

There's an official [ESLint plugin](https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx) for MobX. We need the [mobx/missing-observer](https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx#mobxmissing-observer) rule. It checks that all functional and class components are observers. The rule has autofix available, so it can automatically fix code if you run ESLint with the [--fix](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) option.

**2. Code editor snippet.**

In the code editor, you can create a template for a component that's already wrapped in observer. Example for WebStorm:

If the naming convention is SomeComponent.tsx -> SomeComponent

```typescript
import React from 'react';
import { observer } from 'mobx-react-lite';

export const $NAME = observer(() => {
  
})
```

The Apache Velocity language is used to describe templates. You can read more about setting up templates for WebStorm by [link](https://habr.com/ru/articles/764510/). For VSCode, you can try using [plugins](https://marketplace.visualstudio.com/items?itemName=bam.vscode-file-templates) or third-party packages like [Plop.js](https://github.com/plopjs/plop)

### Observable arrays

The above is especially important when rendering large collections. The smaller your components, the fewer changes they will need to re-render.

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

In this example, React will unnecessarily reconcile all `TodoView` components when `props.user.name` changes. The `TodoView` components won't be re-rendered in the DOM, but the reconciliation process itself is expensive.

Therefore, when working with arrays, it's recommended to write components that simply render the collection and do nothing else.

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

### Can you use MobX without wrapping each component in observer?

No, to use MobX you need to wrap components in observer. In return, you don't need to think about nesting, memoization, selectors and subscriptions. Moreover, using observer is no more expensive than using `React.memo`, which you would be forced to use to achieve the same level of performance.