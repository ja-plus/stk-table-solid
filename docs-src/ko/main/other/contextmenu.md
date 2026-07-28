# 컨텍스트 메뉴

StkTableSolid에는 내장 컨텍스트 메뉴가 없으므로 서드파티 라이브러리를 통합해야 합니다.

여기서는 네이티브 컨텍스트 라이브러리 [ja-contextmenu](https://www.npmjs.com/package/ja-contextmenu)를 사용한 예시를 보여줍니다.


## 의존성 설치

```bash
npm install ja-contextmenu
```

## 기본 사용
```js
import ContextMenu from 'ja-contextmenu'; // types.d.ts supported
const contextMenu = new ContextMenu();
const menuOption = {
  items: [
    { 
      label: 'menu1', // name
      icon: './assets/images/ico.png', // icon url | HTMLElement
      class: 'customClass', // item class, default: ''
      tip: 'tip1', // Prompt text to the right of option, default: ''
      show: true, // default: true
      disabled: false, //  default: false
      onclick(e, payload) {
        // payload is the parameter passed in by calling the menu.show method.
        console.log('menu1 click', payload);
        // return true; // not close menu
      },
    },
}
let menu = contextMenu.create(menuOption);

document.body.oncontextmenu = (e) => {
  let payload = 'payload data: callback when click items';
  menu.show(e, payload);
};
```


## 데모

<demo solid="other/contextmenu/ContextMenu.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/other/contextmenu/ContextMenu.tsx"></demo>
