# Observable State

### Terminology

Before we proceed, let's define the terms so we speak the same language.

![MobX Principles](/flow.png)
`See https://mobx.js.org/assets/flow2.png`

- Events come from the external environment (e.g., mouse clicks, user input, timer ticks, etc.)
- Actions are functions that mutate (update) observable fields
- The sum of observable fields (observable state) is the state of our application
- State changes lead to updates of computed values and side-effects, which we'll call reactions

### Observable State

Let's go to the `/src` folder and create a `counter.store.ts` file with the code:

```js
class Store {
  count = 0

  inc = () => {
    this.count++
  }

  dec = () => {
    this.count--
  }

  get double() {
    return this.count * 2
  }
}
```

The `count` field is the state of our application. Class methods are actions, i.e., functions that mutate the state. The `inc` increment increases `count` by one, `dec` decrement decreases it.

So far, there's nothing from MobX here, it's just a regular JavaScript class. For reactivity to work, we need to call the MobX function `makeObservable` in the class constructor and pass the class itself and an annotation map as the second argument.

```js
import { makeObservable, observable, action, computed } from 'mobx'

class Store {
  constructor() {
    makeObservable(this, {
      count: observable,
      inc: action,
      dec: action,
      double: computed,
    })
  }

  count = 0

  inc = () => {
    this.count++
  }

  dec = () => {
    this.count--
  }

  get double() {
    return this.count * 2
  }
}
```

We marked the `count` field as `observable`. Using `observable` is like turning an object field into a spreadsheet cell. But unlike spreadsheets, these values can be not only primitives (numbers, strings) but also objects, arrays, etc.

We marked the `inc` and `dec` functions as actions.

### Computeds

The `double` getter is marked as `computed`. Computed values are derived from state, i.e., a pure function that returns a derivative of our state. In this case, we simply multiply the `count` value by two.

One feature of `computed` is that it memoizes the calculated result. That is, when the calculation is complete, MobX compares the new result with the previous one. If the result matches, no notification will be sent to observers.

### makeAutoObservable

In principle, you can choose any decoration method you like. In practice, `makeAutoObservable` is most commonly used.

```js
import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  count = 0

  inc = () => {
    this.count++
  }

  dec = () => {
    this.count--
  }

  get double() {
    return this.count * 2
  }
}
```

`makeAutoObservable` automatically marks all class fields as observable. All class methods are marked as actions, and all getters as `computed`.