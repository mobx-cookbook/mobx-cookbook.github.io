# MobX in 50 Lines of Code

In this chapter, we'll explore how to create our own MobX in 50 lines of code for a better understanding of how it works. MobX uses the Observer design pattern. The classic implementation of this pattern involves manual subscription to changes. MobX uses a clever approach to subscribe to changes automatically. Some developers call this MobX "magic". Our goal is to dispel myths and explain to you how implicit subscriptions work inside MobX. With this knowledge, you'll always be able to understand why a component doesn't update when stores change. For simplicity of explanation, we won't use proxies, decorators, or classes.

### Step 1
Let's implement an observable value using the classic [Observer](https://en.wikipedia.org/wiki/Observer_pattern) pattern. This pattern consists of two parts - observable and observer. The observer subscribes to changes of the observable value. The observable value provides ways to subscribe to its changes.

```typescript
const observable = (value) => ({
  value,
  // Set consisting of callbacks
  observers: new Set(),
  subscribe(observer) {
    this.observers.add(observer)
  },
  unsubscribe(observer) {
    this.observers.delete(observer)
  },
  get() {
    return this.value
  },
  set(value) {
    this.value = value
    this.observers.forEach((notify) => notify())
  },
})
```

Let's test this object:

```typescript
const title = observable('Mobx article')
const views = observable(10)

const logTitle = () => console.log(title.get())
title.subscribe(logTitle)

title.set('Lets write Mobx under 50 LOC')
views.set(11)
```

Code output in console:

```
Lets write Mobx under 50 LOC
```
import CodeViewer from '/src/components/code-viewer';

<CodeViewer exampleName="mobx-in-50-lines-of-code-1" showConsole />

We created two observables - _title_ and _views_, then we updated their values. Notice that we only subscribed to _title_ changes, so `console.log` only executed once. When a component doesn't update in response to observable changes, it means there's no subscription. This is what's often mistakenly called "loss of reactivity". As we can see, it's more accurate to characterize this as absence of subscription. Let's use this approach to re-render React components.

### Step 2
Let's create a React component and subscribe to observable changes:

```typescript jsx
const useRerender = () => {
  const [, setValue] = useState()
  return () => setValue([])
}

const Article = () => {
  const rerender = useRerender()

  useEffect(() => {
    title.subscribe(rerender)
    views.subscribe(rerender)

    return () => {
      title.unsubscribe(rerender)
      views.unsubscribe(rerender)
    }
  }, [])

  return (
    <div>
      Article title: {title.get()}{' '}
      
      Views: {views.get()}{' '}
      
      <button onClick={() => {
        views.set(views.get() + 1);
      }}>Increase views</button>
    </div>
  )
}
```

<CodeViewer exampleName="mobx-in-50-lines-of-code-2" />


To re-render the component, we created a `useRerender` hook. The `useEffect` hook is used for manual subscription to _title_ and _views_ changes. This is an example of explicit subscriptions. It's easy to notice that this approach is very verbose, and it's easy to make mistakes with this approach. You can forget to subscribe to a used observable value, you can forget to unsubscribe, which will lead to memory leaks. You can forget to remove a subscription if the component no longer needs a particular observable. Imagine how convenient it would be if subscriptions and unsubscriptions were automatic? MobX does exactly that for us!

### Step 3
To understand which components depend on which observables, MobX remembers the read observable values during component rendering. Let's try to recreate `autorun` using this approach. First, let's add remembering of read observables to a global variable `readObservables`:

```diff
+const readObservables = new Set()

const observable = (value) => ({
  value,
  observers: new Set(),
  subscribe(observer) {
    this.observers.add(observer)
  },
  unsubscribe(observer) {
    this.observers.delete(observer)
  },
  get() {
+   readObservables.add(this)
    
    return this.value
  },
  set(value) {
    this.value = value
    this.observers.forEach((notify) => notify())
  },
})
```

So now the `observable` object's getter not only returns the value, but also remembers that the object was read. The `autorun` function in its simplest form would look like this:

```typescript
const autorun = (fn) => {
  readObservables.clear()
  fn()
  readObservables.forEach((observable) => observable.subscribe(fn))

  return () => readObservables.forEach((observable) => observable.unsubscribe(fn))
}
```

The `autorun` function executes an arbitrary function `fn`, then goes through all read observables and creates a subscription. The `autorun` function returns a callback function for unsubscription. Let's test:

```typescript
const title = observable('Mobx article')
const views = observable(10)

const dispose = autorun(() => {
  console.log(`Article: "${title.get()}". Views: ${views.get()}`)
})

views.set(11)
title.set('Lets write Mobx under 50 LOC')

dispose()

views.set(12)
```

Code output in console:

```
Article "Mobx article". Views 10
Article "Mobx article". Views 11
Article "Lets write Mobx under 50 LOC". Views 11
```

<CodeViewer exampleName="mobx-in-50-lines-of-code-3" showConsole />

The `autorun` function works correctly. We've recreated the automatic subscription mechanism. Notice that after calling `dispose`, the listener wasn't called because this function stops the subscription.

### Step 4
Let's apply our knowledge and create an observer function that will automatically subscribe to observable changes.

```typescript jsx
const useRerender = () => {
  const [, setValue] = useState([])
  return () => setValue([])
}

// prettier-ignore
const observer = (component) => (...props) => {
  const rerender = useRerender()
  readObservables.clear()
  const result = component(...props)

  useEffect(() => {
    readObservables.forEach((observable) => observable.subscribe(rerender))

    return () => readObservables.forEach((observable) => observable.unsubscribe(rerender))
  }, [])

  return result
}
```

This function is very similar to the `autorun` function above, except that `observer` takes a component and returns the result of rendering that component.

### Result

<CodeViewer exampleName="mobx-in-50-lines-of-code-end" />

### Conclusion

We've created a very simplified version of MobX to understand how its "magic" works internally. As we can see, there's no magic here, just pure ingenuity.
