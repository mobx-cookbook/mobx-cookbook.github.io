# Classes VS Functions for Stores

Contrary to popular belief, MobX does not require using classes to write stores. Moreover, in MobX 6, the makeAutoObservable function was introduced, which further simplifies using MobX without classes. Below are 2 equivalent stores written using different approaches:

```js
// Class approach
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

// Function and object approach:
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

This raises the question - should you use classes for stores? If in the React world everything is clear - classes are considered [legacy approach](https://react.dev/reference/react/Component), then with MobX stores it's not so simple. The main difficulties of object-stores lie in the absence of automatic TypeScript type inference. Let's consider these problems:

### Union types

Example of a store with [union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types) fields (e.g., `number | null` or `Song | undefined`):

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

This is a store modeling a player in an application. The convenience of classes is that the class is already a type for TypeScript. Now the type has the following form:

```typescript
type PlayerStore = {
  song?: Song;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
}
```

This is a correct type. What happens if we change the class to a function and object? Example:

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

First, we don't have a PlayerStore type yet. It can be described manually:

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

However, code duplication is evident. The type will need to be updated every time changes are made to properties, class methods, or method arguments. Are there ways to infer the type automatically? Yes, using the built-in TypeScript utility type `ReturnType`:

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

However, that's not all. We have a PlayerStore type where the song field doesn't have a union type, meaning Song is lost:

```typescript
export type PlayerStore = {
  song: undefined; // 👈 Should be `Song | undefined`
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
}
```

How do we restore the union type? There are several workarounds, but all of them are far from ideal.

### Type casting

```typescript
export const createPlayerStore = () => {
  return makeAutoObservable({
    song: undefined as Song | undefined,
    // ...
  })
}
// ...
```

[TypeScript type casting](https://www.typescripttutorial.net/typescript-tutorial/type-casting/) is bad practice because casting is a way to silence the compiler where it rightfully complains. The result is runtime errors. Example:

```typescript
class Dog {
  bark() {}
}

const dog: Dog = {} as Dog;
dog.bark(); // Runtime error, but no compilation error
```

Proof on [TypeScript Playground](https://www.typescriptlang.org/play?#code/MYGwhgzhAEAiD2BzaBvAUNaAjMAnA1gBQCUqAvmhWsPAHYQAu0AJkgFxxLQC850knRAG40rRADocBEkOgB6OdEC4IIFYQQEIg0QHwggCRBAHCCBGEEBcILuiHNgHhBA-CC7A3CCB5EEBiILt1A).

### Helper function for type inference

To avoid type casting, you can use a helper function that uses [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html). The complete example looks like this:

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

### Conclusion

The final choice, of course, remains with the reader. We have only compared different options. You shouldn't be prejudiced against classes; instead, you need to analyze and make informed decisions. Classes were indeed a poor choice for components, but for stores they still perform well. Classes are used in many languages and in different areas of development - on the backend ([example](https://docs.nestjs.com/fundamentals/custom-providers) from Nest.js documentation, everything is on classes), in game development ([example](https://docs.unity3d.com/ScriptReference/IMGUI.Controls.AdvancedDropdown.html) from Unity game engine, everything is on classes too), so they remain relevant, and in some aspects provide undeniable advantages.
