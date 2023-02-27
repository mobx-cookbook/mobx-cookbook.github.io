const readObservables = new Set()

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
    readObservables.add(this)

    return this.value
  },
  set(value) {
    this.value = value
    this.observers.forEach((notify) => notify())
  },
})

const autorun = (fn) => {
  readObservables.clear()
  fn()
  readObservables.forEach((observable) => observable.subscribe(fn))

  return () => readObservables.forEach((observable) => observable.unsubscribe(fn))
}

const title = observable('Mobx article')
const views = observable(10)

const dispose = autorun(() => {
  console.log(`Article: "${title.get()}". Views: ${views.get()}`)
})

views.set(11)
title.set('Lets write Mobx under 50 LOC')

dispose()

views.set(12)

export default () => null;