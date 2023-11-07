# ゆめみフロントエンド試験提出コード

## 要件

https://notion.yumemi.co.jp/%E6%8E%A1%E7%94%A8%E9%96%A2%E9%80%A3%E8%B3%87%E6%96%99%E5%85%AC%E9%96%8B/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E8%A9%A6%E9%A8%93

【課題】
都道府県別の総人口推移グラフを表示する SPA(Single Page Application)を構築せよ

## 確認しているポイント

https://note.yumemi.co.jp/n/ned7429b59556

## 開発時に入れたいものチェックリスト

- [x] vue
- [ ] nuxt(nuxt の方が望ましいと言われていることに今更気づいた)
- [x] eslint
- [x] prettier
- [x] eslint-config-prettier
- [x] husky + lint-staged
- [x] jest
- [x] storybook
- [x] hygen
- [x] tailwindcss
- [x] コンポーネントの jest でのテスト
- [ ] playwright
- [x] CI
- [ ] storybook の i11y 関連プラグイン(あったと思う。あった方がいいと思うけど今じゃない気がする)
- [ ] VRT(グラフあるしあった方が良いかも？TDD でやったことはないし見た目も fix ではないので後でいいかも)

## 注意書き

### Storybook ファイルで型エラーが出る

vscode+Volar での開発をする場合、テストファイルと Storybook ファイルで vue ファイルの型が適切に解釈されないことがあります。
その場合は vscode に builtin されている typescript 言語機能プラグイン(vscode.typescript-language-features)を切ってください。

参考: https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode

### Storybook で API を叩きたい

コンポーネントテストで API を直接叩くのはあまり良くないので api のサービスクラスを作って、jest ならそれを mock、Storybook は環境変数(`import.meta.env.STORYBOOK`)を読んで mock クラスに置き換えています。
