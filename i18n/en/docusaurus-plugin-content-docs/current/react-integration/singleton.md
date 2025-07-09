# Singleton

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
