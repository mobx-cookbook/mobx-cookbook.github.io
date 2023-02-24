# MobX в 50 строчек кода

В этой главе мы разберём как создать свой Mobx в 50 строк кода для лучшего понимания того, как он работает. MobX использует шаблон проектирования Observer. Классическая реализация этого паттерна предусматривает ручную подписку на изменения. MobX использует умный подход для того, чтобы подписываться на изменения автоматически. Некоторые разработчики называют это "магией" MobX. Наша цель - развеять мифы и объяснить вам как работают неявные подписки внутри MobX. Обладая этими знаниями вы всегда сможете понять почему компонент не обновляется при изменении сторов. Для простоты объяснения мы не будем использовать прокси, декораторы и классы.

### Шаг 1
Реализуем наблюдаемое значение, используя классический шаблон [Observer](https://en.wikipedia.org/wiki/Observer_pattern). Этот шаблон состоит из двух частей - наблюдаемого (observable) и наблюдателя (observer). Наблюдатель подписывается на изменения наблюдаемого значения. Наблюдаемое значение предоставляет способы подписаться на свои изменения.

```typescript
const observable = (value) => ({
  value,
  // Set, состоящий из колбеков
  observers: new Set(),
  subscribe(observer) {
    this.observers.add(observer)
  },
  unsubscribe(listener) {
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

Давайте протестируем этот объект:

```typescript
const title = observable('Mobx article')
const views = observable(10)

const logTitle = () => console.log(title.get())
title.subscribe(logTitle)

title.set('Lets write Mobx under 50 LOC')
views.set(11)
```

Вывод кода в консоли:

```
Lets write Mobx under 50 LOC
```

Мы создали два observable - _title_ и _views_, затем мы обновили их значения. Обратите внимание, что мы подписались только на изменения _title_, поэтому `console.log` отработал только один раз. Когда компонент не обновляется в ответ на изменение observable - значит дело в отсутствии подписки. Именно это часто ошибочно называют потерей реактивности. Как видим, правильнее охарактеризовать это как отсутствие подписки. Давайте воспользуемся этим подходом для перерисовки компонентов React.

### Шаг 2
Создаём React компонент и подписываемся на изменения в observable:

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
      Article title: {title.get()}
      Views: {views.get()}
    </div>
  )
}
```

Для перерисовки компонента мы создали хук `useRerender`. Хук `useEffect` используется для ручной подписки на изменения _title_ и _views_. Это пример явных подписок. Легко заметить, что такой подход очень многословный, с таким подходом легко допустить ошибки. Вы можете забыть подписаться на используемое observable значение, можете забыть отписаться, что будет приводить к утечкам памяти. Вы можете забыть убрать подписку если компоненту уже не нужен определённый observable. Представьте, как было бы удобно, если бы подписки и отписки были автоматические? MobX именно это и делает за нас!

### Шаг 3
Для понимания какие компоненты от каких observable зависят, MobX запоминает прочитанные observable значения во время отрисовки компонента. Попробуем воссоздать `autorun`, применив этот подход. Для начала добавим запоминание прочитанных observable в глобальную переменную `readObservables`:

```diff
+const readObservables = new Set()

const observable = (value) => ({
  value,
  observers: new Set(),
  subscribe(observer) {
    this.observers.add(observer)
  },
  unsubscribe(listener) {
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

То есть теперь геттер объекта `observable` не только возвращает значение, но и запоминает то, что объект был прочитан. Функция `autorun` в простейшем виде будет выглядеть так:

```typescript
const autorun = (fn) => {
  readObservables.clear()
  fn()
  readObservables.forEach((observable) => observable.subscribe(fn))

  return () => readObservables.forEach((observable) => observable.unsubscribe(fn))
}
```

Функция `autorun` выполняет произвольную функцию `fn`, затем проходится по всем прочитанным observable и создаёт подписку. Функция `autorun` возвращает функцию-callback для отписки. Давайте протестируем:

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

Вывод кода в консоли:

```
Article "Mobx article". Views 10
Article "Mobx article". Views 11
Article "Lets write Mobx under 50 LOC". Views 11
```

Функция `autorun` работает правильно. Мы воссоздали механизм автоматических подписок. Обратите внимание, что после вызова `dispose` слушатель не вызвался, потому что эта функция прекращает подписку.

### Шаг 4
Применим полученные знания и создадим функцию observer, которая будет автоматически подписываться на изменения в observable.

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
  readObservables.forEach((observable) => observable.subscribe(rerender))

  useEffect(() => {
    return () => readObservables.forEach((observable) => observable.unsubscribe(rerender))
  }, [])

  return result
}
```

Эта функция очень похожа на функцию `autorun` выше, за исключением того, что `observer` принимает компонент и возвращает результат отрисовки этого компонента. Рабочий пример вы можете посмотреть на CodeSandbox: https://codesandbox.io/s/mystifying-jones-vc18p?file=/index.js

### Результат

import CodeViewer from '/src/components/code-viewer';

<CodeViewer exampleName="mobx-in-50-lines-of-code" />

### Вывод

Мы создали очень упрощённую версию MobX для понимания того, как его "магия" работает внутри. Как видим, здесь нет никакой магии, только чистая изобретательность.
