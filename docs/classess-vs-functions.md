# Классы VS Функции для сторов

Вопреки распространённому мнению, Mobx не требует использования классов для написания сторов. Более того, в Mobx 6 появилась функция makeAutoObservable, которая ещё сильнее упрощает использование Mobx без классов. Ниже 2 эквивалентных стора, которые написаны с помощью разных подходов:

```js
// Подход с классами
class Counter {
  value = 0
  
  constructor() {
    makeAutoObservable(this)
  }
  
  increment() {
    this.value++
  }
  
  isEven() {
    return this.value % 2 === 0
  }
}

// Подход с функциями и объектами:
const createCounter = () => {
  return makeAutoObservable({
    value: 0,
    increment() {
      this.value++
    },
    get isEven() {
      return this.value % 2 === 0
    }
  })
}
```

В связи с этим возникает вопрос - стоит ли использовать классы для сторов? Если в мире React всё однозначно - классы считаются [устаревшим подходом](https://react.dev/reference/react/Component), то с Mobx сторами всё не так просто. Основные сложности сторов-объектов заключаются в отсутствии автоматического вывода типов TypeScript. Рассмотрим эти проблемы:

### Union-типы

Пример стора с [union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)-полями (например `number | null` или `Song | undefined`):

```typescript
export class PlayerStore {
  song?: Song;
  isPlaying = false;

  constructor() {
    makeAutoObservable(this);
  }

  play(song: Song) {
    this.song = song;
    this.isPlaying = true;
  }
  
  pause() {
    this.isPlaying = false;
  }
}
```

Это стор, моделирующий плеер в приложении. Удобство классов в том, что класс уже является типом для TypeScript. Теперь тип имеет следующую форму:

```typescript
type PlayerStore = {
  song?: Song;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
}
```

Это правильный тип. Что будет, если мы поменяем класс на функцию и объект? Пример:

```typescript
export const createPlayerStore = () => {
  return makeAutoObservable({
    song: undefined,
    isPlaying: false,
    playSong(song: Song) {
      this.song = song;
      this.isPlaying = true
    },
    pause() {
      this.isPlaying = false;
    }
  })
}
```

Во-первых, у нас ещё нет типа PlayerStore. Его можно описать вручную:

```typescript
export type PlayerStore = {
  song?: Song;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
}

export const createPlayerStore = (): PlayerStore => {
  return makeAutoObservable({
    song: undefined,
    isPlaying: false,
    playSong(song: Song) {
      this.song = song;
      this.isPlaying = true
    },
    pause() {
      this.isPlaying = false;
    }
  })
}
```

Однако налицо дублирование кода. Тип нужно будет обновлять каждый раз, когда в свойства, методы класса, либо в аргументы методов будут вноситься изменения. Есть ли способы выводить тип автоматически? Да, с помощью вспомогательного встроенного в TypeScript типа `ReturnType`: 

```typescript
export const createPlayerStore = () => {
  return makeAutoObservable({
    song: undefined,
    isPlaying: false,
    playSong(song: Song) {
      this.song = song;
      this.isPlaying = true
    },
    pause() {
      this.isPlaying = false;
    }
  })
}
  
export type PlayerStore = ReturnType<typeof createPlayerStore>;
```

Однако это ещё не всё. Имеем тип PlayerStore, у которого поле song не имеет union-типа, то есть Song потерялся:
```typescript
export type PlayerStore = {
  song: undefined; // 👈 Должно быть `Song | undefined`
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
}
```

Как же восстановить union-тип? Есть несколько обходных путей, но все они далеки от идеального.

### Кастование типов

```typescript
export const createPlayerStore = () => {
  return makeAutoObservable({
    song: undefined as Song | undefined,
    // ...
  })
}
// ...
```

[Кастование типов TypeScript](https://www.typescripttutorial.net/typescript-tutorial/type-casting/) является плохой практикой, так как кастование - это способ заставить замолчать компилятор там, где он справедливо ругается. Результат - ошибки в рантайме. Пример: 
```typescript
class Dog {
  bark() {}
}

const dog: Dog = {} as Dog;
dog.bark(); // Ошибка в рантайме, но нет ошибки компиляции
```

Подтверждение на [TypeScript Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAiD2BzaBvAUNaAjMAnA1gBQCUqAvmhWsPAHYQAu0AJkgFxxLQC850knRAG40rRADocBEkOgB6OdEC4IIFYQQEIg0QHwggCRBAHCCBGEEBcILuiHNgHhBA-CC7A3CCB5EEBiILt1A).

### Вспомогательная функция для вывода типов

Для избежания кастования типов можно использовать вспомогательную функцию, использующую [дженерики](https://www.typescriptlang.org/docs/handbook/2/generics.html). Полный пример выглядит так:

```typescript
const value = <T extends any>(value: T): T => value;

export const createPlayerStore = () => {
  return makeAutoObservable({
    song: value<Song | undefined>(undefined),
    isPlaying: false,
    playSong(song: Song) {
      this.song = song;
      this.isPlaying = true
    },
    pause() {
      this.isPlaying = false;
    }
  })
}

export type PlayerStore = ReturnType<typeof createPlayerStore>;
```

### Вывод

Финальный выбор, конечно же, остаётся за читателем. Мы лишь сравнили разные варианты. Не стоит предвзято относиться к классам, вместо этого нужно анализировать и принимать взвешенные решения. Классы действительно были неудачным выбором для компонентов, но для сторов они по-прежнему хорошо себя показывают. Классы используются во многих языках и в разных сферах разработки - на бекенде ([пример](https://docs.nestjs.com/fundamentals/custom-providers) из документации Nest.js, там всё на классах), при разработке игр ([пример](https://docs.unity3d.com/ScriptReference/IMGUI.Controls.AdvancedDropdown.html) из игрового движка Unity, там тоже всё на классах), поэтому они по-прежнему актуальны, а в каких-то аспектах дают неоспоримые преимущества.

