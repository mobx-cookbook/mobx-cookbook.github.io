"use strict";(self.webpackChunkmobx_cookbook=self.webpackChunkmobx_cookbook||[]).push([[982],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,k=m["".concat(s,".").concat(d)]||m[d]||u[d]||l;return t?r.createElement(k,o(o({ref:n},c),{},{components:t})):r.createElement(k,o({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=m;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3327:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const l={},o="\u041a\u043b\u0430\u0441\u0441\u044b \u0438 this",i={unversionedId:"classes",id:"classes",title:"\u041a\u043b\u0430\u0441\u0441\u044b \u0438 this",description:"MobX \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u044b\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f \u043a\u0430\u043a \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432, \u0442\u0430\u043a \u0438 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043b\u0430\u0441\u0441\u043e\u0432. \u0412 \u043a\u043d\u0438\u0433\u0435 \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u0438\u043c\u0435\u0440\u044b \u043d\u0430 \u043a\u043b\u0430\u0441\u0441\u0430\u0445, \u0442.\u043a. \u0441 \u043a\u043b\u0430\u0441\u0441\u0430\u043c\u0438 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043c\u043e\u0434\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u0430, \u0430 \u0435\u0449\u0451 \u0441 \u043d\u0438\u043c\u0438 \u043b\u0443\u0447\u0448\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432\u044b\u0432\u043e\u0434 \u0442\u0438\u043f\u043e\u0432 TS (\u043e\u0431 \u044d\u0442\u043e\u043c \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u0433\u043b\u0430\u0432\u0430 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0445).",source:"@site/docs/classes.md",sourceDirName:".",slug:"/classes",permalink:"/classes",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430",permalink:"/installation"},next:{title:"\u041d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435",permalink:"/observable-state"}},s={},p=[{value:"\u041f\u043e\u043b\u044f \u043a\u043b\u0430\u0441\u0441\u0430",id:"\u043f\u043e\u043b\u044f-\u043a\u043b\u0430\u0441\u0441\u0430",level:3},{value:"\u041c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u0430",id:"\u043c\u0435\u0442\u043e\u0434\u044b-\u043a\u043b\u0430\u0441\u0441\u0430",level:3},{value:"\u042d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440 \u043a\u043b\u0430\u0441\u0441\u0430",id:"\u044d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440-\u043a\u043b\u0430\u0441\u0441\u0430",level:3},{value:"This",id:"this",level:3}],c={toc:p};function u(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u043a\u043b\u0430\u0441\u0441\u044b-\u0438-this"},"\u041a\u043b\u0430\u0441\u0441\u044b \u0438 this"),(0,a.kt)("p",null,"MobX \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u044b\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f \u043a\u0430\u043a \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432, \u0442\u0430\u043a \u0438 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043b\u0430\u0441\u0441\u043e\u0432. \u0412 \u043a\u043d\u0438\u0433\u0435 \u043c\u044b \u0431\u0443\u0434\u0435\u043c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u0438\u043c\u0435\u0440\u044b \u043d\u0430 \u043a\u043b\u0430\u0441\u0441\u0430\u0445, \u0442.\u043a. \u0441 \u043a\u043b\u0430\u0441\u0441\u0430\u043c\u0438 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043c\u043e\u0434\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u0430, \u0430 \u0435\u0449\u0451 \u0441 \u043d\u0438\u043c\u0438 \u043b\u0443\u0447\u0448\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432\u044b\u0432\u043e\u0434 \u0442\u0438\u043f\u043e\u0432 TS (\u043e\u0431 \u044d\u0442\u043e\u043c ",(0,a.kt)("a",{parentName:"p",href:"/classess-vs-functions"},"\u043e\u0442\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u0433\u043b\u0430\u0432\u0430")," \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0445)."),(0,a.kt)("p",null,"\u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u043e\u043f\u044b\u0442 \u0440\u0430\u0431\u043e\u0442\u044b \u0441 \u043a\u043b\u0430\u0441\u0441\u0430\u043c\u0438, \u0432\u044b \u043f\u043e\u043d\u0438\u043c\u0430\u0435\u0442\u0435, \u0447\u0442\u043e \u0442\u0430\u043a\u043e\u0435 \u043f\u043e\u043b\u044f \u0438 \u043c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u0430, \u0438 \u043a\u0430\u043a \u043d\u0435 \u0442\u0435\u0440\u044f\u0442\u044c this, \u0442\u043e \u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043c\u0435\u043b\u043e \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u0443\u044e \u0433\u043b\u0430\u0432\u0443."),(0,a.kt)("p",null,"\u0418\u0442\u0430\u043a, \u043a\u043b\u0430\u0441\u0441\u044b \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u044e\u0442\u0441\u044f \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043b\u044e\u0447\u0435\u0432\u043e\u0433\u043e \u0441\u043b\u043e\u0432\u0430 class:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class User {}\n")),(0,a.kt)("h3",{id:"\u043f\u043e\u043b\u044f-\u043a\u043b\u0430\u0441\u0441\u0430"},"\u041f\u043e\u043b\u044f \u043a\u043b\u0430\u0441\u0441\u0430"),(0,a.kt)("p",null,"\u041a\u043b\u0430\u0441\u0441 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435 (\u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430, \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438) \u043e\u0431\u044a\u0435\u043a\u0442\u0430:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"class User {\n  name = 'Anon'\n  age?: number\n}\n")),(0,a.kt)("p",null,"\u041c\u044b \u043c\u043e\u0436\u0435\u043c \u043f\u0440\u0438\u0441\u0432\u043e\u0438\u0442\u044c \u043f\u043e\u043b\u044f\u043c \u043a\u043b\u0430\u0441\u0441\u0430 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f (\u043a\u0430\u043a \u0434\u043b\u044f ",(0,a.kt)("inlineCode",{parentName:"p"},"isAuthorized")," \u0438 ",(0,a.kt)("inlineCode",{parentName:"p"},"name"),"). \u0415\u0441\u043b\u0438 \u043c\u044b \u043d\u0435 \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u043b\u0438 (",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),") \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u043f\u043e\u043b\u044f, \u0442\u043e \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0435\u0433\u043e \u0442\u0438\u043f (\u043a\u0430\u043a ",(0,a.kt)("inlineCode",{parentName:"p"},"number")," \u0434\u043b\u044f ",(0,a.kt)("inlineCode",{parentName:"p"},"age"),")."),(0,a.kt)("h3",{id:"\u043c\u0435\u0442\u043e\u0434\u044b-\u043a\u043b\u0430\u0441\u0441\u0430"},"\u041c\u0435\u0442\u043e\u0434\u044b \u043a\u043b\u0430\u0441\u0441\u0430"),(0,a.kt)("p",null,"\u041f\u043e\u043c\u0438\u043c\u043e \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u0434\u0430\u043d\u043d\u044b\u0445, \u043c\u044b \u043c\u043e\u0436\u0435\u043c \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043c\u0435\u0442\u043e\u0434\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043e\u043f\u0438\u0441\u044b\u0432\u0430\u044e\u0442 \u043f\u043e\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043a\u043b\u0430\u0441\u0441\u0430."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class User {\n  name = 'Anon'\n\n  greeting() {\n    console.log('Hello', this.name)\n  }\n}\n")),(0,a.kt)("h3",{id:"\u044d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440-\u043a\u043b\u0430\u0441\u0441\u0430"},"\u042d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440 \u043a\u043b\u0430\u0441\u0441\u0430"),(0,a.kt)("p",null,"\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043b\u044e\u0447\u0435\u0432\u043e\u0433\u043e \u0441\u043b\u043e\u0432\u0430 ",(0,a.kt)("inlineCode",{parentName:"p"},"new")," \u043c\u044b \u043c\u043e\u0436\u0435\u043c \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0441\u043e\u0431\u043e\u0439 \u044d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440 (\u0438\u043d\u0441\u0442\u0430\u043d\u0441) \u043a\u043b\u0430\u0441\u0441\u0430."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class User {\n  name = 'Anon'\n\n  greeting() {\n    console.log('Hello', this.name)\n  }\n}\n\nconst user = new User()\n")),(0,a.kt)("h3",{id:"this"},"This"),(0,a.kt)("p",null,"\u0412 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0435\u043c \u043f\u0440\u0438\u043c\u0435\u0440\u0435 \u0432 \u043c\u0435\u0442\u043e\u0434\u044b ",(0,a.kt)("inlineCode",{parentName:"p"},"greeting")," \u043c\u044b \u043e\u0431\u0440\u0430\u0442\u0438\u043b\u0438\u0441\u044c \u043a \u043f\u043e\u043b\u044e ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043b\u044e\u0447\u0435\u0432\u043e\u0433\u043e \u0441\u043b\u043e\u0432\u0430 ",(0,a.kt)("inlineCode",{parentName:"p"},"this"),". \u0412 JavaScript, \u0432 \u043e\u0442\u043b\u0438\u0447\u0438\u0435 \u043e\u0442 \u043c\u043d\u043e\u0433\u0438\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u044f\u0437\u044b\u043a\u043e\u0432, \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043e\u0442 \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0430."),(0,a.kt)("p",null,"\u0412 ECMAScript 5 \u0434\u043b\u044f \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0438 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," \u0431\u044b\u043b \u0441\u043e\u0437\u0434\u0430\u043d \u043c\u0435\u0442\u043e\u0434 ",(0,a.kt)("inlineCode",{parentName:"p"},"bind"),". \u0412 MobX \u0434\u043b\u044f \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0438 \u044d\u043a\u0448\u0435\u043d\u043e\u0432 \u043a \u044d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440\u0443 \u043c\u043e\u0436\u043d\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0430\u043d\u043d\u043e\u0442\u0430\u0446\u0438\u044e ",(0,a.kt)("inlineCode",{parentName:"p"},"action.bound")," \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u0442\u044c \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440 ",(0,a.kt)("inlineCode",{parentName:"p"},"autoBind"),"."),(0,a.kt)("p",null,"\u041d\u043e \u0442\u0430\u043a \u043a\u0430\u043a \u0441\u0442\u0440\u0435\u043b\u043e\u0447\u043d\u044b\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438 \u043d\u0435 \u0441\u043e\u0437\u0434\u0430\u044e\u0442 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0438 \u043a ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," \u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u044e\u0442 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," \u043b\u0435\u043a\u0441\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u044f, \u0442\u043e \u043c\u043e\u0436\u043d\u043e \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u043e\u0432\u0430\u0442\u044c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0438\u0445 \u0432 \u043c\u0435\u0442\u043e\u0434\u0430\u0445 \u043a\u043b\u0430\u0441\u0441\u0430\u0445 \u0438 \u043d\u0435 \u0434\u0443\u043c\u0430\u0442\u044c \u043e \u0440\u0443\u0447\u043d\u043e\u0439 \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0435 ",(0,a.kt)("inlineCode",{parentName:"p"},"this"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class User {\n  name = 'Anon'\n\n  greeting = () => {\n    console.log('Hello', this.name)\n  }\n}\n")),(0,a.kt)("p",null,"\u0411\u043e\u043b\u0435\u0435 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u043e \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 this \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0430 \u0432 \u0433\u043b\u0430\u0432\u0435 ",(0,a.kt)("a",{parentName:"p",href:"/reactivity-loss"},"\u0412\u0441\u0435 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u043f\u043e\u0442\u0435\u0440\u0438 \u0440\u0435\u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438"),"."))}u.isMDXComponent=!0}}]);