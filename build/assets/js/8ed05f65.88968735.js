"use strict";(self.webpackChunkmobx_cookbook=self.webpackChunkmobx_cookbook||[]).push([[671],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>b});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},s=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=p(t),b=a,d=m["".concat(c,".").concat(b)]||m[b]||u[b]||o;return t?r.createElement(d,l(l({ref:n},s),{},{components:t})):r.createElement(d,l({ref:n},s))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=t[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4618:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const o={},l="\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435",i={unversionedId:"observable-state",id:"observable-state",title:"\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435",description:"\u0422\u0435\u0440\u043c\u0438\u043d\u043e\u043b\u043e\u0433\u0438\u044f",source:"@site/docs/observable-state.md",sourceDirName:".",slug:"/observable-state",permalink:"/observable-state",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u041a\u043b\u0430\u0441\u0441\u044b \u0438 this",permalink:"/classes"},next:{title:"\u0420\u0435\u0430\u043a\u0446\u0438\u0438",permalink:"/reactions"}},c={},p=[{value:"\u0422\u0435\u0440\u043c\u0438\u043d\u043e\u043b\u043e\u0433\u0438\u044f",id:"\u0442\u0435\u0440\u043c\u0438\u043d\u043e\u043b\u043e\u0433\u0438\u044f",level:2},{value:"\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435",id:"\u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435-\u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435-1",level:2},{value:"Computeds",id:"computeds",level:2},{value:"\u0414\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u044b",id:"\u0434\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u044b",level:2},{value:"makeAutoObservable",id:"makeautoobservable",level:2}],s={toc:p};function u(e){let{components:n,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,o,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435-\u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435"},"\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435"),(0,a.kt)("h2",{id:"\u0442\u0435\u0440\u043c\u0438\u043d\u043e\u043b\u043e\u0433\u0438\u044f"},"\u0422\u0435\u0440\u043c\u0438\u043d\u043e\u043b\u043e\u0433\u0438\u044f"),(0,a.kt)("p",null,"\u041f\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043c \u0438\u0434\u0442\u0438 \u0434\u0430\u043b\u044c\u0448\u0435, \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u043c\u0441\u044f \u0441 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043c\u0438, \u0447\u0442\u043e\u0431\u044b \u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c \u043d\u0430 \u043e\u0434\u043d\u043e\u043c \u044f\u0437\u044b\u043a\u0435."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"MobX Principles",src:t(4976).Z,width:"3445",height:"744"}),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"\u0421\u043c. https://mobx.js.org/assets/flow2.png")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u0418\u0437 \u0432\u043d\u0435\u0448\u043d\u0435\u0439 \u0441\u0440\u0435\u0434\u044b \u043a \u043d\u0430\u043c \u043f\u0440\u0438\u043b\u0435\u0442\u0430\u044e\u0442 \u0441\u043e\u0431\u044b\u0442\u0438\u044f (events), \u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440 \u043a\u043b\u0438\u043a\u0438 \u043c\u044b\u0448\u0438, \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0439 \u0432\u0432\u043e\u0434, \u0442\u0438\u043a\u0438 \u0442\u0430\u0439\u043c\u0435\u0440\u0430 \u0438 \u0442.\u0434."),(0,a.kt)("li",{parentName:"ul"},"\u042d\u043a\u0448\u0435\u043d\u044b (actions) \u044d\u0442\u043e \u0444\u0443\u043d\u043a\u0446\u0438\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043c\u0443\u0442\u0438\u0440\u0443\u044e\u0442 (\u043e\u0431\u043d\u043e\u0432\u043b\u044f\u044e\u0442) \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u044b\u0435 \u043f\u043e\u043b\u044f."),(0,a.kt)("li",{parentName:"ul"},"\u0421\u0443\u043c\u043c\u0430 \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u044b\u0445 \u043f\u043e\u043b\u0435\u0439 (observable state) \u044d\u0442\u043e \u0441\u0442\u0435\u0439\u0442 \u043d\u0430\u0448\u0435\u0433\u043e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f."),(0,a.kt)("li",{parentName:"ul"},"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0441\u0442\u0435\u0439\u0442\u0430 \u043f\u0440\u0438\u0432\u043e\u0434\u0438\u0442 \u043a \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044e \u0432\u044b\u0447\u0438\u0441\u043b\u044f\u0435\u043c\u044b\u0445 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439 (computed values) \u0438 \u043a \u043f\u043e\u0431\u043e\u0447\u043d\u044b\u043c \u044d\u0444\u0444\u0435\u043a\u0442\u0430\u043c (side-effects), \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u043d\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0440\u0435\u0430\u043a\u0446\u0438\u044f\u043c\u0438.")),(0,a.kt)("h2",{id:"\u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435-\u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435-1"},"\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435"),(0,a.kt)("p",null,"\u0418\u0442\u0430\u043a, \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043f\u0435\u0440\u0435\u0439\u0434\u0435\u043c \u0432 \u043f\u0430\u043f\u043a\u0443 ",(0,a.kt)("inlineCode",{parentName:"p"},"/src")," \u0438 \u0441\u043e\u0437\u0434\u0430\u0434\u0438\u043c \u0444\u0430\u0439\u043b ",(0,a.kt)("inlineCode",{parentName:"p"},"counter.store.ts")," \u0441 \u043a\u043e\u0434\u043e\u043c:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class Store {\n  count = 0\n\n  inc = () => {\n    this.count++\n  }\n\n  dec = () => {\n    this.count--\n  }\n\n  get double() {\n    return this.count * 2\n  }\n}\n")),(0,a.kt)("p",null,"\u041f\u043e\u043b\u0435 count - \u044d\u0442\u043e \u0441\u0442\u0435\u0439\u0442, \u0442.\u0435. \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u043d\u0430\u0448\u0435\u0433\u043e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f. \u041c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u0430 \u044d\u0442\u043e \u044d\u043a\u0448\u0435\u043d\u044b, \u0442.\u0435. \u0444\u0443\u043d\u043a\u0446\u0438\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043c\u0443\u0442\u0438\u0440\u0443\u044e\u0442 \u0441\u0442\u0435\u0439\u0442. \u0418\u043d\u043a\u0440\u0435\u043c\u0435\u043d\u0442 ",(0,a.kt)("inlineCode",{parentName:"p"},"inc")," \u0443\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442 ",(0,a.kt)("inlineCode",{parentName:"p"},"count")," \u043d\u0430 \u0435\u0434\u0438\u043d\u0438\u0446\u0443, \u0434\u0435\u043a\u0440\u0435\u043c\u0435\u043d\u0442 ",(0,a.kt)("inlineCode",{parentName:"p"},"dec")," \u0443\u043c\u0435\u043d\u044c\u0448\u0430\u0435\u0442."),(0,a.kt)("p",null,"\u041f\u043e\u043a\u0430 \u0447\u0442\u043e \u0442\u0443\u0442 \u043d\u0435\u0442 \u043d\u0438\u0447\u0435\u0433\u043e \u043e\u0442 MobX, \u0441\u0435\u0439\u0447\u0430\u0441 \u044d\u0442\u043e \u043e\u0431\u044b\u0447\u043d\u044b\u0439 JavaScript-\u043a\u043b\u0430\u0441\u0441. \u0427\u0442\u043e\u0431\u044b \u0440\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u0430\u043b\u0430, \u0432 \u043a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u0435 \u043a\u043b\u0430\u0441\u0441\u0430 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0437\u0432\u0430\u0442\u044c MobX-\u0444\u0443\u043d\u043a\u0446\u0438\u044e ",(0,a.kt)("inlineCode",{parentName:"p"},"makeObservable")," \u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u0432 \u043d\u0435\u0435 \u0441\u0430\u043c \u043a\u043b\u0430\u0441\u0441 \u0438 \u043a\u0430\u0440\u0442\u0443 \u0430\u043d\u043d\u043e\u0442\u0430\u0446\u0438\u0439 \u0432\u0442\u043e\u0440\u044b\u043c \u0430\u0440\u0433\u0443\u043c\u0435\u043d\u0442\u043e\u043c."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { makeObservable, observable, action, computed } from 'mobx'\n\nclass Store {\n  constructor() {\n    makeObservable(this, {\n      count: observable,\n      inc: action,\n      dec: action,\n      double: computed,\n    })\n  }\n\n  count = 0\n\n  inc = () => {\n    this.count++\n  }\n\n  dec = () => {\n    this.count--\n  }\n\n  get double() {\n    return this.count * 2\n  }\n}\n")),(0,a.kt)("p",null,"\u041f\u043e\u043b\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"count")," \u043c\u044b \u043f\u043e\u043c\u0435\u0442\u0438\u043b\u0438 \u043a\u0430\u043a ",(0,a.kt)("inlineCode",{parentName:"p"},"observable"),", \u0442.\u0435. \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u043f\u043e\u043b\u0435. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"observable")," \u043f\u043e\u0434\u043e\u0431\u043d\u043e \u043f\u0440\u0435\u0432\u0440\u0430\u0449\u0435\u043d\u0438\u044e \u043f\u043e\u043b\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u0432 \u044f\u0447\u0435\u0439\u043a\u0443 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u0442\u0430\u0431\u043b\u0438\u0446\u044b. \u041d\u043e \u0432 \u043e\u0442\u043b\u0438\u0447\u0438\u0435 \u043e\u0442 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u044b\u0445 \u0442\u0430\u0431\u043b\u0438\u0446, \u044d\u0442\u0438 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u043f\u0440\u0438\u043c\u0438\u0442\u0438\u0432\u0430\u043c\u0438 (\u0447\u0438\u0441\u043b\u0430, \u0441\u0442\u0440\u043e\u043a\u0438), \u043d\u043e \u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u0430\u043c\u0438, \u043c\u0430\u0441\u0441\u0438\u0432\u0430\u043c\u0438 \u0438 \u0442.\u0434."),(0,a.kt)("p",null,"\u0424\u0443\u043d\u043a\u0446\u0438\u0438 ",(0,a.kt)("inlineCode",{parentName:"p"},"inc")," \u0438 ",(0,a.kt)("inlineCode",{parentName:"p"},"dec")," \u043c\u044b \u043f\u043e\u043c\u0435\u0442\u0438\u043b\u0438 \u043a\u0430\u043a \u044d\u043a\u0448\u0435\u043d\u044b."),(0,a.kt)("h2",{id:"computeds"},"Computeds"),(0,a.kt)("p",null,"\u0413\u0435\u0442\u0442\u0435\u0440 ",(0,a.kt)("inlineCode",{parentName:"p"},"double")," \u043f\u043e\u043c\u0435\u0447\u0435\u043d \u043a\u0430\u043a ",(0,a.kt)("inlineCode",{parentName:"p"},"computed"),". Computed \u044d\u0442\u043e \u0432\u044b\u0447\u0438\u0441\u043b\u044f\u0435\u043c\u044b\u0435 \u0438\u0437 \u0441\u0442\u0435\u0439\u0442\u0430 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f, \u0442.\u0435. \u044d\u0442\u043e \u0447\u0438\u0441\u0442\u0430\u044f \u0444\u0443\u043d\u043a\u0446\u0438\u044f, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u043d\u0443\u044e \u043e\u0442 \u043d\u0430\u0448\u0435\u0433\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f. \u0412 \u0434\u0430\u043d\u043d\u043e\u043c \u0441\u043b\u0443\u0447\u0430\u0435 \u043c\u044b \u043f\u0440\u043e\u0441\u0442\u043e \u0443\u043c\u043d\u043e\u0436\u0430\u0435\u043c \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"count")," \u043d\u0430 \u0434\u0432\u0430."),(0,a.kt)("p",null,"\u041e\u0434\u043d\u0430 \u0438\u0437 \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0435\u0439 ",(0,a.kt)("inlineCode",{parentName:"p"},"computed")," \u0437\u0430\u043a\u043b\u044e\u0447\u0430\u0435\u0442\u0441\u044f \u0432 \u0442\u043e\u043c, \u0447\u0442\u043e \u043e\u043d \u0437\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u0435\u0442 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442. \u0422\u043e \u0435\u0441\u0442\u044c, \u043a\u043e\u0433\u0434\u0430 \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e, MobX \u0441\u0440\u0430\u0432\u043d\u0438\u0432\u0430\u0435\u0442 \u043d\u043e\u0432\u044b\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0441 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u043c. \u0415\u0441\u043b\u0438 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0435\u0442, \u0442\u043e \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0435 \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0442\u0435\u043b\u044f\u043c \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e."),(0,a.kt)("h2",{id:"\u0434\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u044b"},"\u0414\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u044b"),(0,a.kt)("p",null,"\u0412 \u0441\u0442\u0430\u0440\u044b\u0445 \u0432\u0435\u0440\u0441\u0438\u044f\u0445 MobX \u0434\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u044b \u0431\u044b\u043b\u0438 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c\u044b\u043c \u0441\u0438\u043d\u0442\u0430\u043a\u0441\u0438\u0441\u043e\u043c \u0434\u043b\u044f \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u043a\u043b\u0430\u0441\u0441\u043e\u0432. \u0412\u043e \u043c\u043d\u043e\u0433\u0438\u0445 \u0441\u0442\u0430\u0442\u044c\u044f\u0445 \u0438 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u0430\u0445 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0442\u0430\u043a\u043e\u0435 \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435, \u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u0441 \u043d\u0438\u043c \u043d\u0443\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0437\u043d\u0430\u043a\u043e\u043c\u044b\u043c."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { makeObservable, observable, action, computed } from 'mobx'\n\nclass Store {\n  constructor() {\n    makeObservable(this)\n  }\n\n  @observable count = 0\n\n  @action inc = () => {\n    this.count++\n  }\n\n  @action dec = () => {\n    this.count--\n  }\n\n  @computed get double() {\n    return this.count * 2\n  }\n}\n")),(0,a.kt)("p",null,"\u0412\u043c\u0435\u0441\u0442\u043e \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u043a\u0430\u0440\u0442\u044b \u0430\u043d\u043d\u043e\u0442\u0430\u0446\u0438\u0439 \u0432 ",(0,a.kt)("inlineCode",{parentName:"p"},"makeObservable"),", \u043c\u044b \u0434\u0435\u043a\u043e\u0440\u0438\u0440\u0443\u0435\u043c \u043f\u043e\u043b\u044f \u0438 \u043c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u044b \u043f\u043e \u043c\u0435\u0441\u0442\u0443 \u0438\u0445 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f. \u0415\u0441\u043b\u0438 \u043c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u0442\u0430\u043a\u043e\u0439 \u0441\u043f\u043e\u0441\u043e\u0431, \u0442\u043e \u0434\u043e\u043b\u0436\u043d\u044b \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0444\u043b\u0430\u0433 \u0434\u043b\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 \u044d\u043a\u0441\u043f\u0435\u0440\u0438\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440\u043e\u0432 \u0432 \u0444\u0430\u0439\u043b\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"tsconfig.json"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'"experimentalDecorators": true\n')),(0,a.kt)("h2",{id:"makeautoobservable"},"makeAutoObservable"),(0,a.kt)("p",null,"\u0412 \u043f\u0440\u0438\u043d\u0446\u0438\u043f\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u044b\u0431\u0438\u0440\u0430\u0442\u044c \u043b\u044e\u0431\u043e\u0439 \u0441\u043f\u043e\u0441\u043e\u0431 \u0434\u0435\u043a\u043e\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u043a\u0430\u043a\u043e\u0439 \u0432\u0430\u043c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f. \u041d\u0430 \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0435 \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f ",(0,a.kt)("inlineCode",{parentName:"p"},"makeAutoObservable"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { makeAutoObservable } from 'mobx'\n\nclass Store {\n  constructor() {\n    makeAutoObservable(this)\n  }\n\n  count = 0\n\n  inc = () => {\n    this.count++\n  }\n\n  dec = () => {\n    this.count--\n  }\n\n  get double() {\n    return this.count * 2\n  }\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"makeAutoObservable")," \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u043f\u043e\u043c\u0435\u0447\u0430\u0435\u0442 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f \u043a\u043b\u0430\u0441\u0441\u0430 \u043a\u0430\u043a \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u044b\u0435. \u0412\u0441\u0435 \u043c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u0430 \u043f\u043e\u043c\u0435\u0447\u0430\u044e\u0442\u0441\u044f \u043a\u0430\u043a \u044d\u043a\u0448\u0435\u043d\u044b, \u0430 \u0432\u0441\u0435 \u0433\u0435\u0442\u0442\u0435\u0440\u044b \u043a\u0430\u043a ",(0,a.kt)("inlineCode",{parentName:"p"},"computed"),"."))}u.isMDXComponent=!0},4976:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/flow-885013641db22a66d7a1425d9b7c3739.png"}}]);