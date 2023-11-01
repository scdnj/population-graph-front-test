Storybookを入れたのでjestを入れるつもりだったのだけれどjestを入れたらeslintのfixがエラーを吐くようになってコミットできなくなってしまった。

https://github.com/eslint/eslint/discussions/17215
↑と同じエラー。globの10.2.2以上のものは内部でstrip-ansi-cjsを使っていて、それが良くないらしい。

とは言うけれどglobの10.2.2以上を使っているのはstorybook-cliなのであまりバージョンは下げたくない。Storybookは比較的最近バージョンが6から7に上がったばかりだし、addon等のバージョンも揃えなければいけなかったりと下げると面倒なことがたくさんある。

エラーを再度見る。

```
There was a problem loading formatter: ...\node_modules\eslint\lib\cli-engine\formatters\stylish
Error: require() of ES Module ...\node_modules\strip-ansi\index.js from ...\assertion-lib\node_modules\eslint\lib\cli-engine\formatters\stylish.js not supported.
Instead change the require of index.js in ...\node_modules\eslint\lib\cli-engine\formatters\stylish.js to a dynamic import() which is available in all CommonJS modules.
```

で、それでstylishってなんなのよ？formatterってディレクトリにあるからformatterなんだとは思うけど。

https://eslint.org/docs/latest/use/formatters/

> ESLint comes with several built-in formatters to control the appearance of the linting results, and supports third-party formatters as well.

eslintの結果表示に使ってるだけっぽい！

> You can specify a formatter using the --format or -f flag in the CLI. For example, --format json uses the json formatter.

とあり、`--format`オプションから別のformatterに変えられるようだった。見た感じcompactがcli上で見やすそうだし環境依存も無さそうだったのでこれを使うことにした。

というわけでeslintのコマンドを`eslint --fix`から`eslint --format compact --fix`に変えた、ら、ちゃんと動くようになった。ばんざい。

jestを入れたのにStorybookが原因でエラーが出てたのはなんなんだろう。Storybookをインストールした時点ではなぜかたまたま上手く動いていたけど[anything]をインストールしたせいで依存がスッキリして結果エラーになったってことかな。

それはそれとしてhuskyでlintを入れるとeslintの謎エラーでコミット出来ないことが起きるという気付き。ユニットテストでも同様のことが起きうる(d3入れたらjestがエラー吐くようになってしまいました、とか)。この辺りのエラーを黙らせる方法はいくらでもある(lint-stageを削除とかeslint-ignoreするとか)んだけど、それをしてしまうと今度はプルリクの時に一見問題が無いように見えてしまう(そういう「逃げ手」を見逃してしまう可能性がある)問題がある。わからない、困っていることは早めにカジュアルにpublicに出来るようにしたいのでhuskyは使わないでCIに全部やってもらった方がいいかも。とりあえずはCIも無いし現実として個人開発なのでそのままにする。

色々と記載したことがあったのでついでなのでConventional Commitsに従うことにした。vscodeの拡張を入れたら簡単にgitmojiも入れられる。kawaii。

色々調べていたら[gitmojiを使うのをやめた話](https://tech.pepabo.com/2023/08/28/stopped-to-use-gitmoji/)が出てきて

> ターミナル上で見るとかなり見づらくなること

がイヤ、と言っているのだけれど[gitmoji-log](https://github.com/zetaron/gitmoji-log)っていうのを入れたらターミナルでもちゃんとgitmojiが表示されるようになった。

## 開発環境やりたいこと

o vue
x nuxt
o eslint
o prettier
o eslint-config-prettier
o husky + lint-staged
x jest
o storybook
x hygen
x tailwindcss
x コンポーネントのjestでのテスト
x playwright
x CI
x storybookのi11y関連プラグイン(あったと思う。あった方がいいと思うけど今じゃない気がする)
x VRT(グラフあるしあった方が良いかも？TDDでやったことはないし見た目もfixではないので後でいいかも)
