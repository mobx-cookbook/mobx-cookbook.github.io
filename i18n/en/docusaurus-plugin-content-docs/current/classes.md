# Classes and this

MobX allows you to create observable states using both objects and classes. In this book, we'll use class examples because classes allow you to use access modifiers and provide better TypeScript type inference (there's a [separate chapter](/classess-vs-functions) about this for advanced users).

If you have experience working with classes, understand class fields and methods, and know how not to lose this binding, you can safely skip this chapter.

Classes are defined using the class keyword:

```js
class User {}
```

### Class Fields

A class describes the state (properties, characteristics) of an object:

```typescript
class User {
  name = 'Anon'
  age?: number
}
```

We can assign initial values to class fields (like for `isAuthorized` and `name`). If we haven't defined (`undefined`) values for a field, we need to specify its type (like `number` for `age`).

### Class Methods

Besides storing data, we can define methods that describe the behavior of the class.

```js
class User {
  name = 'Anon'

  greeting() {
    console.log('Hello', this.name)
  }
}
```

### Class Instance

Using the `new` keyword, we can create an object that represents an instance of the class.

```js
class User {
  name = 'Anon'

  greeting() {
    console.log('Hello', this.name)
  }
}

const user = new User()
```

### This

In the previous example, in the `greeting` method we accessed the `name` field using the `this` keyword. In JavaScript, unlike many other languages, the value of `this` depends on the context.

In ECMAScript 5, the `bind` method was created to bind the value of `this`. In MobX, you can use the `action.bound` annotation or pass the `autoBind` parameter to bind actions to the instance.

However, since arrow functions don't create their own `this` binding and preserve the `this` value from the lexical environment, it's recommended to use them in class methods and not worry about manual `this` binding.

```js
class User {
  name = 'Anon'

  greeting = () => {
    console.log('Hello', this.name)
  }
}
```

The work with this is covered in more detail in the chapter [All Reactivity Loss Scenarios](reactivity-loss.md).