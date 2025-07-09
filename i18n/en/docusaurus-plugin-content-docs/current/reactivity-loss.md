# All Scenarios of Reactivity Loss

Component doesn't update after state changes? This chapter aims to cover all possible scenarios of reactivity loss, so you should definitely find your case here. Some problems are more related to JS features than to MobX.

### 1. Component is not observer

For reactivity to work, components must subscribe to changes and unsubscribe from them. MobX doesn't require [manual subscriptions](https://rxjs.dev/guide/subscription#subscription) like RxJS, doesn't require using hooks like [useSelector](https://react-redux.js.org/api/hooks#useselector-examples) to extract individual parts of state. With MobX, it's enough to wrap components in observer. In return, you don't need to think about nesting, memoization, selectors, and subscriptions. Moreover, using observer is no more expensive than using `React.memo`, which you'd be forced to use to achieve the same level of performance. Let's look at examples:

❌ Won't work, missing subscription:

```typescript jsx
class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}

const store = new Store()

const Counter = () => {
  return <button onClick={() => store.increment()}>Clicked times: {store.count}</button>
}
```

#### ✅ Works, because there's observer:

```typescript jsx
class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}

const store = new Store()

// Added observer 👇
const Counter = observer(() => {
  return <button onClick={() => store.increment()}>Clicked times: {store.count}</button>
})
```

If you're interested in how MobX's subscription mechanism works internally, this is described in simplified form in the chapter [MobX in 50 Lines of Code](mobx-inside). MobX has an [ESLint rule](https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx#mobxexhaustive-make-observable) that checks that all components are wrapped in observer.

### 2. Lost this

❌ The class has observer, but the component doesn't re-render due to lost this:

```typescript jsx
class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }
}

const store = new Store()

const Counter = observer(() => {
  // Changed click handler notation 👇
  return <button onClick={store.increment}>Clicked times: {store.count}</button>
})
```

This was lost due to passing the store method to the click handler directly. Developers often have difficulties with this, but if you know a simple rule, there won't be problems with this.
It's enough to know that **this in methods is lost if you call the method separately from the object**. Let's break down this rule: **method call** is done through paired parentheses, and **separately from the object** means that when calling, we no longer write the object.
Table with examples:

| Code                                                                                   | Explanation                                                                                  | Result       |
|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|--------------|
| ``` <button onClick={() => store.increment()}> ```                                    | Function call with parentheses is not separated from object                                | No this loss |
| ```const increment = store.increment``` <br/><br/> ```<button onClick={increment}>``` | Function call is separated from object                                                     | This lost    |
| ```<button onClick={store.increment}>```                                              | Function call is separated from object. This is the same as the example above, but in shortened form | This lost    |
| ```const { increment } = store``` <br/><br/> ```<button onClick={increment}>```       | Function call is separated from object                                                     | This lost    |

However, there are ways to fix all these examples.

#### ✅ autoBind option in makeAutoObservable:

```typescript jsx
class Store {
  count = 0

  constructor() {
    // Added option once for the entire class 👇
    makeAutoObservable(this, {}, { autoBind: true })
  }

  increment() {
    this.count++
  }
}

const store = new Store()

const Counter = observer(() => {
  // Can call method separately from object or use destructuring
  return <button onClick={store.increment}>Clicked times: {store.count}</button>
})
```

This option automatically binds this for all class methods.

#### ✅ Arrow function methods:

```typescript jsx
class Store {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  // Use arrow functions for each method
  increment = () => {
    this.count++
  }
}

const store = new Store()

const Counter = observer(() => {
  return <button onClick={store.increment}>Clicked times: {store.count}</button>
})
```

The advantage of this approach is independence from MobX, the disadvantage is the need to use it in all methods. If you're interested in a more academic explanation of how this works, you can familiarize yourself with it on the [learn.javascript.ru](https://learn.javascript.ru/object-methods) site.

### 3. Nested observables and third-party non-observer components

The problem often arises when using third-party UI kits. For example, you use a [Table](https://ant.design/components/table/) component from the Ant Design UI kit. This component takes an array of objects as a prop. Since the Table component is not an observer, it can't subscribe to changes of objects inside the array, for example `store.users.isActive = true`. The Table component is not as smart as observer components, so for re-rendering it needs the reference to the array with objects to change. A similar problem can occur with the [FlatList](https://reactnative.dev/docs/flatlist) component from React Native.

❌ Third-party component doesn't re-render because it's not observer, and therefore doesn't track changes to nested fields:

```typescript jsx
type User = {
  id: number;
  isActive: boolean;
}

class Store {
  users: User[] = [
    { id: 1, isActive: false },
    { id: 2, isActive: false },
  ]

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  markActive(user: User) {
    user.isActive = true
  }
}

const store = new Store()

const Component = observer(() => {
  return <VendorTable
    data={store.users}
    columns={[
      {
        label: 'Mark active',
        render: (user) => {
          return <Switcher onClick={() => store.markActive(user.id)} />
        }
      }
    ]}
  />
})
```

There are several solutions.

#### ✅ toJS

Use toJS to convert observable values to pure JS object or array, which gives a new reference on each render:

```typescript jsx
import { toJS } from 'mobx'

type User = {
  // ...
}

class Store {
  // ...
}

const store = new Store()

const Component = observer(() => {
  return <VendorTable
    // Added toJS 👇
    data={toJS(store.users)}
    columns={[
      // ...
    ]}
  />
})
```

#### ✅ Write your own Table component wrapped in observer

```typescript jsx
import { toJS } from 'mobx'

type User = {
  // ...
}

class Store {
  // ...
}

const store = new Store()

const Component = observer(() => {
  return <MyTable
    data={store.users}
    columns={[
      // ...
    ]}
  />
})
```

Writing your own table component can pay off in the long run in a complex project. Tables are complex components, often requiring custom development. Here's just a small list of what you might be asked to do: bulk row editing, hierarchical tables, ability to collapse/expand rows by height, URL synchronization, infinite scrolling, or completely custom design, which can be difficult when using UI kits like Ant Design. In such cases, you can write your own Table component using observer for reactivity support.

### 4. Render-props

This problem can occur with components whose props are functions. React documentation calls this a [render prop](https://reactjs.org/docs/render-props.html). After hooks appeared, such situations are encountered less frequently, but let's look at one of them using [React Final Form](https://final-form.org/react) as an example:

❌ Component doesn't re-render when `store.languages` changes:
```typescript jsx
import { Form } from 'react-final-form'

const MyForm = observer(() => {
  return (
    <Form
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Dropdown
            label={'language'}
            options={store.languages}
            value={store.language}
            onChange={store.changeLanguage}
          />
        </form>)}
    />
  )
})
```

In this example, `MyForm` is an observer, but the function passed as the `render` prop is not, which means it can't subscribe to observable values. As a result, even if the `store.languages` field updates after loading data from the server, the component still won't re-render. There are several solution options.

#### ✅ Use Observer from `mobx-react-lite`/`mobx-react`

```typescript jsx
import { Form } from 'react-final-form'
import { Observer } from 'mobx-react-lite'

const MyForm = observer(() => {
  return (
    <Form
      render={({ handleSubmit }) => (
        <Observer>
          {() => <form onSubmit={handleSubmit}>
            <Dropdown
              label={'language'}
              options={store.languages}
              value={store.language}
              onChange={store.changeLanguage}
            />
          </form>}
        </Observer>)}
    />
  )
})
```

This component is available in both mobx-react-lite and mobx-react (since the latter [exports](https://github.com/mobxjs/mobx/blob/b82c7f3229439a6a1f0d35ebb559dc6b0fd0bec7/packages/mobx-react/src/index.ts#L7+L17) the former).

#### ✅ Abandon render props in favor of hooks:

```typescript jsx
import { Observer } from 'mobx-react-lite'
import { useForm } from 'react-final-form-hooks'

const MyForm = observer(() => {
  const { handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit}>
      <Dropdown
        label={'language'}
        options={store.languages}
        value={store.language}
        onChange={store.changeLanguage}
      />
    </form>
  )
})
```

We've reviewed the main scenarios of reactivity loss. If you master the tool you're using, problems generally shouldn't arise, since all the above problems (except this) are about the same thing - lack of subscription.


### 5. Outdated bundler configuration

If an outdated Babel / TypeScript configuration is used, `makeAutoObservable` may ignore uninitialized fields:

```typescript
class Store {
  count?: number

  constructor() {
    makeAutoObservable(this)
  }
}
```

In this case, changes to the `count` field won't cause component re-renders. To check the bundler, use the following script that should be added to the application code:

```javascript
if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');
```

Note that the script should be inserted into the code, not into the browser console. If after restarting the code you see an exception in the browser console, there are different ways to solve the problem:

##### ✅ TypeScript

In `tsconfig.json` add the `useDefineForClassFields: true` parameter:

```json
{
  "compilerOptions": {
    "useDefineForClassFields": true
  }
}
```

Or check the `target` value in the `compilerOptions` section. It should be _ESNext_ or _ES2022_ (and higher)

##### ✅ Babel

```{
    // Babel < 7.13.0
    "plugins": [["@babel/plugin-proposal-class-properties", { "loose": false }]],

    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    "plugins": [["@babel/plugin-proposal-class-properties"]],
    "assumptions": {
        "setPublicClassFields": false
    }
}
```

The minimum Babel version should be 7.12.

#### ✅ Value initialization

If no other methods helped, initialize the field in the constructor:

```typescript
class Store {
  count?: number = undefined // Or count = 0

  constructor() {
    makeAutoObservable(this)
  }
}
```

#### Is it safe to change bundler settings?

Yes. Class fields appeared in TS and Babel before standardization in ES. `useDefineForClassFields: true` fixes [inconsistency](https://www.typescriptlang.org/tsconfig#useDefineForClassFields) on the TS side. With the `useDefineForClassFields` option, TypeScript will generate the following JS for the above class:

```javascript
class Store {
  count
}
```

Without this option, the field will be missing:

```javascript
class Store {
}
```

`makeAutoObservable` can't mark a non-existent field as observable, so the component won't react to changes.