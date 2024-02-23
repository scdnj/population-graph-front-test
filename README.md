# フロントエンドコーディング試験

## 要件

【課題】
都道府県別の総人口推移グラフを表示する SPA(Single Page Application)を構築せよ

## 開発方法
```
cp .env.template .env.local
```
RESAS API KEYを取得して.env.localのVITE_APP_API_KEYに入力

```
pnpm install
pnpm dev
```

本番環境ではvercelのmiddlewareからAPIを叩いています。

## 確認しているポイント

https://yumemi.notion.site/yumemi/0e9ef27b55704d7882aab55cc86c999d

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
