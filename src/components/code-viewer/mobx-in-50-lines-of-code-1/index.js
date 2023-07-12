const observable = (value) => ({
  value,
  // Set, состоящий из колбеков
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

const title = observable('Mobx article')
const views = observable(10)

const logTitle = () => console.log(title.get())
title.subscribe(logTitle)

title.set('Lets write Mobx under 50 LOC')
views.set(11)

export default () => null
