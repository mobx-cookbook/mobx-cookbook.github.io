import React, { useState, useEffect } from "react";

const readObservables = new Set();

const observable = (value) => ({
  value,
  listeners: new Set(),
  get() {
    readObservables.add(this);
    return this.value;
  },
  set(value) {
    this.value = value;
    this.notify();
  },
  subscribe(listener) {
    this.listeners.add(listener);
  },
  unsubscribe(listener) {
    this.listeners.delete(listener);
  },
  notify() {
    this.listeners.forEach((listener) => listener());
  }
});

const useRerender = () => {
  const [, setValue] = useState([]);
  return () => setValue([]);
};

const observer = (component) => (...props) => {
  const rerender = useRerender();
  readObservables.clear();
  const result = component(...props);
  readObservables.forEach((observable) => observable.subscribe(rerender));

  useEffect(() => {
    return () =>
      readObservables.forEach((observable) => observable.unsubscribe(rerender));
  }, []);

  return result;
};

const timer = observable(0);

const increment = () => {
  timer.set(timer.get() + 1);
};

const CounterView = observer(() => (
  <button onClick={increment}>Clicked times: {timer.get()}</button>
));

export default CounterView;