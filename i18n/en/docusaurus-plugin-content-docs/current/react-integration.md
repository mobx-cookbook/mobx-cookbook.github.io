# Access stores

With MobX, you can access stores in 2 ways - via context or singleton. Let's look at both options.

## Singleton

The JS engine allows you to create a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) - an object that exists as a single instance throughout the entire application. The instance is accessible from anywhere in the application and provides shared access to state for all components that use it. Example:

```typescript jsx
class BannerStore {
  isOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}

export const bannerStore = new BannerStore()
```

Connect it to a component:

```typescript jsx
import { bannerStore } from "./banner-store";

export const Page = observer(() => {
  return (
    <div>
      {bannerStore.isOpen && <Banner />}
      ...
    </div>
  );
})
```

This is the simplest approach, but it has several drawbacks:

### SSR

If you run a server on Node.js, each module will be initialized exactly once. If you create a singleton using module export, the store state will be shared among all users simultaneously.
The store is created once for the server's lifetime and the store state becomes shared across all requests. Example:

```
-- Request 1 - Alice requests the home page
  -- Alice authenticates on the server.
    -- In AuthStore the isLoggedIn flag changes to true, and the observable user field changes to { name: 'Alice' }

-- Request 2 - Anonymous user requests the home page
  -- server returns a page with logged-in user Alice
```

This is incorrect behavior. Therefore, in SSR environments, stores should be created for each request. Working with SSR is covered in detail in a separate chapter.

### Testing

Since the store is a singleton, its state will be shared across all test scenarios. For example, you want to test a React component that uses BannerStore. Example scenario - the banner is closed by default, but the user can open it after clicking a button.

```typescript jsx
describe("Page", () => {
  it("allows to open banner", () => {
    const wrapper = mount(<Page />);
    expect(wrapper.text()).not.toContain("Banner");
    wrapper.find("button").simulate("click");
    expect(wrapper.text()).toContain("Banner");
  });
});
```

But if we want to write another scenario, an unexpected problem arises - after rendering, the banner will be open. It remained open after the previous test. A good practice when writing tests is that each test should be independent. Tests should not affect each other, this will help you find problems faster when tests fail and you need to figure out the cause. To ensure that preconditions are the same in each test, we can add a `reset` method to BannerStore:

```diff
class BannerStore {
  ...

+  reset() {
+    this.isOpen = false
+  }
}
```

This method can be called at the beginning of each test:

```diff
describe('Page', () => {
+  beforeEach(() => {
+    bannerStore.reset()
+  })
...

```

But in this case, the risk of human error increases. Each store should have a `reset` method, and you'll need to add new fields to this method each time to restore the initial value.

### Not a MobX-specific feature

This problem is not specific to MobX or classes. In JS, modules can be stateful, meaning they can have state. Simple example of a stateful module:

```js
export let count = 0

export const increase = () => count++
```

Now the value of the `count` variable will be shared across all files that import this variable.

## React Context API

The recommended way to connect MobX and React is the Context API. Context is a built-in React mechanism for passing data through the component tree without having to pass props down manually at every level. Usage example:

Step 1. Create a context:

```typescript
import { createContext } from "react";

export const UserThemeContext = createContext<"light" | "dark" | null>(null)
```

Step 2. Initialize the context:

```typescript jsx
const Page = () => {
  return <UserThemeContext.Provider value={isDarkMode() ? 'dark' : 'light'}>
    <Child />
  </UserThemeContext.Provider>
}
```

Step 3. Use the value from the context:

```typescript jsx
const Child = () => {
  const theme = useContext(UserThemeContext)

  // Now the theme variable has the value 'dark' | 'light' | null
};
```

Based on this approach, we can create a context for all stores in our application.

Step 1 - Create a store that will contain all global stores:

```typescript
// root-store.ts
export class RootStore {
  bannerStore = new BannerStore()
  authStore = new AuthStore()
}
```

Step 2 - Create a context and a hook for using it:

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

Here we added a null check. The context type is specified as `RootStore | null`, so if we remove the `if`, then everywhere the store is used, we need to add a null check to avoid TypeScript compilation errors. The context can have a null value if the developer forgot to pass a `value` to the context, so it's better to handle this error.

Step 4 - Store initialization:

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

Step 5 - Get access to stores:

```typescript jsx
const Child = observer(() => {
  const { authStore, bannerStore } = useStore()

  //
});
```

When using `useStore` between curly braces, autocomplete works for stores thanks to TypeScript.

### Why MobX if there's context?

React Context API is not a state manager, but a data transport for components without using props. Therefore, context doesn't have the conveniences of MobX, such as memoization and concise work with nested data structures.
Context is not performant, let's demonstrate this with a simple example. Suppose the system has 2 components - a profile editing form and a component that displays the avatar and name of the current user.

```typescript jsx
const Avatar = () => {
  const { avatar, userName } = useContext(UserContext)

  // Render only avatar and userName
};

const UserForm = () => {
  const { avatar, userName, age, dateOfBirth, changeProfile } =
    useContext(UserContext)

  // Render user editing form and call changeProfile when saving data
};
```

This approach has a problem. The `Avatar` component will re-render on every change to the context data. Even if the avatar and userName fields haven't changed. Context can't track granular changes. If context data is used in many places on the page or if the context stores a lot of data, then application performance will decrease. The reactive MobX library can track granular changes, which will prevent performance degradation. Example:

```typescript jsx
const Avatar = observer(() => {
  const { authStore } = useStore()

  // Render only avatar and userName
});

const UserForm = observer(() => {
  const { authStore } = useStore()

  // Render user editing form and call changeProfile when saving data
});
```

### If context is not performant, does it degrade performance when used with MobX?

No. Context leads to unnecessary component re-renders only if the context value changes. More precisely - if the object inside the context is recreated. MobX stores inside the context will not be recreated, store references will remain the same throughout the application's lifetime, so their changes will not lead to unwanted component re-renders.

## Conclusion

We have examined different ways to connect React components and MobX stores. Singleton is the simplest approach. If the application needs SSR, you should switch to React Context API.
