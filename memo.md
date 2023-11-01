
jestを入れた。この後にtailwindcssを入れて動作確認をしてコンポーネントテストを入れる、ということをするのだけれど、そこで何回か躓いた。

今思えばStorybookでもjestでも他のパッケージとの競合で失敗することは何度もあるので小さく動作確認をしてfeatureの依存を小さくするべきだった。
具体的にはまずjestを入れてテストを書くべきだった。それからStorybookを入れたらStorybookとjestのコンポーネントテストを書いて、とjestをベースに進めていくべきだった。

そうすればブランチをfeature/storybookやfeature/tailwindという感じで簡単に切ることが出来た。

直したいけれど開発環境構築に一人日くらいかかっているので急ぎたい気持ちもある。次回への反省としてここに記して先に進むことにする。


## 開発環境やりたいこと

- [x] vue
- [ ] nuxt
- [x] eslint
- [x] prettier
- [x] eslint-config-prettier
- [x] husky + lint-staged
- [x] jest
- [x] storybook
- [ ] hygen
- [ ] tailwindcss
- [ ] コンポーネントのjestでのテスト
- [ ] playwright
- [ ] CI
- [ ] storybookのi11y関連プラグイン(あったと思う。あった方がいいと思うけど今じゃない気がする)
- [ ] VRT(グラフあるしあった方が良いかも？TDDでやったことはないし見た目もfixではないので後でいいかも)
