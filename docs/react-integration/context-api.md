# React Context API

Рекомендуемый способ связывать MobX и React - Context API. Контекст - это встроенный в React механизм для передачи данных через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях. Пример использования:

Шаг 1. Создаём контекст:

```typescript
import { createContext } from "react";

export const UserThemeContext = createContext<"light" | "dark" | null>(null)
```

Шаг 2. Инициализируем контекст:

```typescript jsx
const Page = () => {
  return <UserThemeContext.Provider value={isDarkMode() ? 'dark' : 'light'}>
    <Child/>
  </>
}
```

Шаг 3. Используем значение из контекста:

```typescript jsx
const Child = () => {
  const theme = useContext(UserThemeContext)

  // Теперь у переменной theme значение 'dark' | 'light' | null
};
```

На основании этого подхода можем создать контекст для всех сторов в нашем приложении.

Шаг 1 - Создаём стор, в котором будут находиться все глобальные сторы:

```typescript
// root-store.ts
export class RootStore {
  bannerStore = new BannerStore()
  authStore = new AuthStore()
}
```

Шаг 2 - Создаём контекст и хук для его использования:

```typescript
// root-store-context.ts

import { RootStore } from "./root-store"

export const RootStoreContext = createContext<RootStore | null>(null)

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with RootStoreProvider"
    );
  }
  return context;
};
```

Тут мы добавили проверку на `null`. Тип контекста указан как `RootStore | null`, поэтому если убрать `if`, то во всех местах где будет использоваться стор нужно добавлять проверку на null, чтобы избежать ошибки компиляции TypeScript. У контекста может быть значение null, если разработчик забыл передать контексту `value`, поэтому эту ошибку лучше обработать.

Шаг 4 - Инициализация стора:

```typescript jsx
// app.tsx

import { RootStoreContext } from "./root-store-context"
import { RootStore } from "./root-store"

const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Child />
    </RootStoreContext.Provider>
  );
};
```

Шаг 5 - Получаем доступ к сторам:

```typescript jsx
const Child = observer(() => {
  const { authStore, bannerStore } = useStore()

  //
});
```

При использовании `useStore` между фигурных скобок работает автодополнение сторов благодаря TypeScript.

#### Зачем MobX если есть контекст?

React Context API - это не стейт-менеджер, а транспорт данных для компонентов без использования пропсов. Поэтому контекст не обладает удобствами MobX, такими как мемоизация и лаконичная работа с вложенными структурами данных. Контекст непроизводительный, продемонстрируем это на простом примере. Допустим, в системе есть 2 компонента - форма редактирования профиля и компонент, отображающий аватар и имя текущего пользователя.

```typescript jsx
const Avatar = () => {
  const { avatar, userName } = useContext(UserContext)

  // Рендерим только avatar и userName
};

const UserForm = () => {
  const { avatar, userName, age, dateOfBirth, changeProfile } =
    useContext(UserContext)

  // Рендерим форму редактирования пользователя и вызываем changeProfile при сохранении данных
};
```

У такого подхода есть проблема. Компонент `Avatar` будет перерисовываться на каждое изменение данных в контексте. Даже если поля avatar и userName не поменялись. Контекст не умеет отслеживать точечные изменения. Если данные контекста используются во многих местах на странице или же контекст хранит много данных, то производительность приложения снизится. Реактивная библиотека MobX может отслеживать точечные изменения, что предотвратит ухудшение производительности. Пример:

```typescript jsx
const Avatar = observer(() => {
  const { authStore } = useStore()

  // Рендерим только avatar и userName
});

const UserForm = observer(() => {
  const { authStore } = useStore()

  // Рендерим форму редактирования пользователя и вызываем changeProfile при сохранении данных
});
```

#### Если контекст непроизводительный, то ухудшает ли он производительность в связке с MobX?

Нет. Контекст приводит к лишним перерисовкам компонентов только если значение контекста меняется. Точнее - если объект внутри контекста пересоздаётся. Сторы MobX внутри контекста не будут пересоздаваться, ссылки на сторы будут оставаться прежними на протяжении всей жизни приложения, а потому их изменение не будет приводить к нежелательным перерисовкам компонентов.
