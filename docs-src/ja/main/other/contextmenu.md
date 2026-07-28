# コンテキストメニュー

StkTableSolidには組み込みのコンテキストメニューがないため、サードパーティライブラリを統合する必要があります。

ここでは、ネイティブコンテキストライブラリの [ja-contextmenu](https://www.npmjs.com/package/ja-contextmenu) を使用した例を示します。


## 依存関係のインストール

```bash
npm install ja-contextmenu
```

## 基本使用
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


## デモ

<demo solid="other/contextmenu/ContextMenu.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/other/contextmenu/ContextMenu.tsx"></demo>
