# Use Reactions Sparingly

The MobX documentation [states](https://mobx.js.org/reactions.html#use-reactions-sparingly) that reactions should be used sparingly. Let's understand why.

MobX can be criticized for lacking strict architectural solutions, since its main goal is to provide reactivity, that is, a convenient way to selectively re-render components in response to changes. In this case, the architecture of a MobX project remains at the developer's discretion and depends on their experience and preferences. This article proposes one possible strict architectural solution - to abandon or minimize the use of reactions. Let's examine different scenarios - where abandoning reactions is definitely necessary, and where abandoning them doesn't bring much benefit.

In the chapter about [reactions](reactions), we already discussed that reactions refer to the `reaction` and `autorun` functions. They can be used to call side effects in response to changes in `observable` and `computed`. Let's consider the following example:

### 1. Computed instead of reaction

```typescript
class UserStore {
  age = 15
  isAllowed = false
  
  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      this.isAllowed = this.age >= 18
    })
  }
  
  setAge(age: number) {
    this.age = age
    if (this.isAllowed) {
      console.log('Access granted')
    } else {
      console.log('Access denied')
    }
  }
}

const userStore = new UserStore()
userStore.setAge(20)
```

What will this code output? The answer is `Access denied`. This happens because reactions wait for actions to complete fully, so they can be compared to asynchronous functions. They are called not immediately synchronously, but after the action completes.

The problem is solved using `computed`:

```typescript
class UserStore {
  age = 15
  
  constructor() {
    makeAutoObservable(this)
  }
  
  setAge(age: number) {
    this.age = age
    if (this.isAllowed) {
      console.log('Access granted')
    } else {
      console.log('Access denied')
    }
  }

  get isAllowed() {
    return this.age >= 18
  }
}

const userStore = new UserStore()
userStore.setAge(20) // Now outputs 'Access granted'
```

Often reactions can simply be replaced with computed and get more reliable code, without manual subscriptions.

### 2. Lack of strict reaction order
We can go further and make chains of computed values that depend on each other. MobX will build a dependency graph and calculate values in strict order:

```typescript
class ShopStore {
  shop = {
    taxPercent: 8,
    items: [
      { name: "apple", value: 1.2 },
      { name: "orange", value: 0.95 }
    ]
  }

  // Sum without taxes
  get subtotal() {
    return this.shop.items.reduce((acc, item) => acc + item.value, 0)
  }
  
  // Taxes
  get tax() {
    return this.subtotal * (this.shop.taxPercent / 100)
  }
  
  // Total sum
  get total() {
    return this.subtotal + this.tax
  }
}
```

We can use reactions for such code, but [MobX doesn't guarantee](https://mobx.js.org/reactions.html#:~:text=MobX%20does%20not%20guarantee%20the%20order%20in%20which%20reactions%20will%20be%20run.) deterministic execution order of these reactions:

```typescript
class BrokenStore {
  shop = {
    taxPercent: 8,
    items: [
      { name: "apple", value: 1.2 },
      { name: "orange", value: 0.95 }
    ]
  }

  tax = 0
  subtotal = 0
  total = 0

  constructor() {
    makeAutoObservable(this)
    autorun(() => {
      const subtotal = this.shop.items.reduce(
        (acc, item) => acc + item.value,
        0
      );
      runInAction(() => {
        this.subtotal = subtotal;
      });
    })
    autorun(() => {
      const tax = this.subtotal * (this.shop.taxPercent / 100);
      runInAction(() => {
        this.tax = tax;
      })
    })
    autorun(() => {
      const total = this.tax + this.subtotal;
      runInAction(() => {
        this.total = total;
      })
    })
  }
}
```

Note that all modifications of mutable values are wrapped in actions. You can't use the shorter notation `autorun(action(() => ...))` because it will cause an error `[MobX] Autorun does not accept actions since actions are untrackable`. Not the most obvious hint from the library that we did something wrong. The code is not as clean, plus reactions can run in random order and the result is unpredictable.

### 3. Grouping change and side effect

Imagine you see `articleStore.updateText(newValue)` in the code and want to know what happens when article text changes. We click on `updateText` and see such a store:

```typescript
class ArticleStore {
  text = ''
  
  constructor() {
    makeAutoObservable(this)
  }
  
  updateText(text: string) {
    this.text = text
  }
}
```

Here only text is updated. But in the Network tab in devtools, an HTTP request is sent for every text change. Why? Because someone created a reaction in an unknown place that saves the article on every text change:

```typescript
reaction(
  () => articleStore.text,
  value => apiSaveArticle(value)
)
```

Now imagine there can be many such reactions in the code, and as we know they can also execute in different orders... This is confusing, hard-to-maintain code. A consequence of excessive use of reactions that are hard to track.

This can be fixed by combining state change and side effect:

```typescript
class ArticleStore {
  text = ''
  
  constructor() {
    makeAutoObservable(this)
  }
  
  updateText(text: string) {
    this.text = text
    apiSaveArticle(this.text) 
    // Without debounce and change checking for example simplicity
  }
}
```

Advantages of this approach:
- This is regular sequential code, it doesn't introduce new concepts unlike reactions. You immediately see what action leads to what effects, how the data flow moves. Therefore, it's easier to track, understand, and harder to introduce bugs.
- No need to clean up reactions. The `autorun` and `reaction` functions return a function to remove the subscription to avoid memory leaks: https://mobx.js.org/reactions.html#always-dispose-of-reactions

The disadvantages of this approach are increased code coupling. Here are 2 options, and each developer chooses what's closer to their spirit:
- A highly decoupled system that can be changed independently, but is harder to debug since there's no clear picture of what happens when.
- A highly coupled system where it's clear what happens when.

If you prefer event-driven state management, there are more suitable tools for this, such as Effector, Reatom, RxJS. MobX code will be simpler as it's state-oriented, not event-oriented.

To reduce code coupling, you can use any event manager, for example [nanoevents](https://github.com/ai/nanoevents):
```typescript
class ArticleStore {
  text = ''
  
  constructor() {
    makeAutoObservable(this)
  }
  
  updateText(text: string) {
    this.text = text
    emitter.emit('articleChanged', this.text)
  }
}

// In another module
emitter.on('articleChanged', apiSaveArticle)
```

From the author's experience, the need to use exactly this approach arises extremely rarely.

### When to use reactions

There are situations where reactions provide convenience and don't violate the rules described above. For example:
- Updating React components in response to observable value changes. The `observer` component uses reactions internally. If you're writing a MobX wrapper for a new UI library, you also need reactions.
- Automatic serialization of observables to localStorage, IndexedDB, and other external storages


### Conclusion

After analyzing the examples above, we can formulate simple rules for using reactions:
- Reactions should not modify other mutable values. Reactions should not depend on each other, since MobX doesn't guarantee strict execution order.
- Instead of using reactions, you can use computed or group changes in one action.
