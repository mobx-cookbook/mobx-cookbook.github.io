# Доступ к состоянию в компонентах

Существуют различные способы предоставить компонентам доступ к MobX сторам. В данном разделе мы рассмотрим основные способы на примере простого стора, отвечающего за отображение баннера на сайте.

1) Импорт из модуля

2) React Context API

Существует третий способ - функция `inject`. Этот подход является [устаревшим](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react#provider-and-inject) и рассматриваться в книге не будет. Эта функция не была включена в mobx-react-lite, так как вместо неё можно использовать хук `useContext` из React Context API.
