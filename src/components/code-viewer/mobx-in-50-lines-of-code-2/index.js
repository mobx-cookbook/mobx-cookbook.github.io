import React, { useState, useEffect } from 'react'

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
    return this.value
  },
  set(value) {
    this.value = value
    this.observers.forEach((notify) => notify())
  },
})

const title = observable('Mobx article')
const views = observable(10)

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
      Article title: {title.get()} Views: {views.get()}{' '}
      <button
        onClick={() => {
          views.set(views.get() + 1)
        }}
      >
        Increase views
      </button>
    </div>
  )
}

export default Article
