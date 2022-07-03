# Actions

MobX не обязывает вас изменять наблюдаемые поля именно внутри экшенов. Вы можете мутировать стейт откуда угодно, из любой части вашего приложения.

Если вы вернетесь к файлу `/src/App.tsx`, то при клике на кнопку `"+"` вы могли бы не вызывать экшн `inc`, а мутировать поле `count` прямо внутри компонента. Проверим что это работает, присваивая значение 10 на клик:

```js
import { observer } from 'mobx-react-lite'
import { counterStore } from './counter.store'

const App = observer(() => {
  return (
    <div className='App'>
      <h1>{counterStore.count}</h1>

      <button
        onClick={() => {
          counterStore.count = 10
        }}>
        +
      </button>
      <button onClick={counterStore.dec}>-</button>
    </div>
  )
})

export default App
```

Код работает. Дальше, добавьте в конец файла `/src/counter.store.ts` следующий код:

```js
setInterval(() => {
  counterStore.count++
}, 1000)
```

Здесь мы каждую секунду увеличиваем `count` на единицу. Более того, мы могли бы импортировать `counterStore` в каком-нибудь другом модуле и там могли бы его мутировать.

При этом в нашем сторе на поле `count` завязана производная `double`, а на `double` в теории могли бы быть завязаны еще несколько реакций. Подобные каскадные изменения это не то, с чем хотелось бы сталкиваться в реальном проекте.

Если мы откроем консоль, то увидим что MobX выдает предупреждение:
`[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: Store@1.count`

В строгом режиме изменение наблюдаемых значений без использования экшенов не допускается. Это предупреждение мы получим в рантайме. Чтобы отлавливать такие ошибки на этапе компиляции, мы могли бы пометить наше поле как приватное.

```typescript
class Store {
  constructor() {
    makeAutoObservable(this)
  }

  private _count = 0

  get count() {
    return this._count
  }

  inc = () => {
    this._count++
  }

  dec = () => {
    this._count--
  }

  get double() {
    return this._count * 2
  }
}
```

Мы добавили TypeScript-модификатор `private` к полю `_count`, а чтобы считывать это поле из других функций, мы создали геттер `count`.

Если мы вернемся к файлу `/src/App.tsx`, то увидим, что TypeScript выдает ошибку:
`Cannot assign to 'count' because it is a read-only property`

Хотя создавать на каждое приватное поле свой геттер является хорошей практикой, это может быть утомительным. Поэтому вы можете внутри свой команды выработать договоренности и, как вариант, просто следить за этим на ревью кода.
