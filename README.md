# block-test-kit
カスタムブロックの Deprecated テストのサンプルコードです。

## 前提
以下のdeprecatedテストを実装するには以下の要件満たす必要があります。
- block.jsonがある。
- カスタムブロック内で、`wp`オブジェクトではなく、`import {} from @wordpress/xxx`ノードモジュールを使う。
- wp-scripts使用。（webpack.config.jsをカスタムしていた時は動作しない場合があります）

## 準備

自分のプラグインにテストを実装するには、以下の手順に従います。

### 1.設定ファイルを用意

1. `$ npm install @emotion/babel-plugin babel-plugin-inline-json-import cross-env jest-transform-stub @wordpress/blocks --save-dev`

2. `babel.config.js` と `test/`を、プロジェクトルートにコピー。

3. 以下を自分のpackage.jsonにコピー。
```package.json
"scripts": {
	"fixtures:clean": "rimraf \"packages/e2e-tests/fixtures/blocks/*.+(json|serialized.html)\"",
	"fixtures:generate": "cross-env GENERATE_MISSING_FIXTURES=y npm run test-unit",
	"fixtures:regenerate": "npm run fixtures:clean && npm run fixtures:generate",
	"test-unit": "wp-scripts test-unit-js --config test/jest.config.js"
}	
```

### 2.フィクスチャーを新規作成

Deprecated テストを実行するには、各ブロックのフィクスチャー（ブロックの状態データ）を用意する必要があります。

以下の手順に従ってフィクスチャーを作成して下さい。

1. `e2e-tests/fixtures/blocks/`にフィクスチャー用のHTMLファイルを作成。例：`core__image.html`
2. テストしたいブロックを、ブロックエディタに挿入。
3. コードエディターで開き、ブロックマークアップをコピー。
4. 1で作成したファイルに貼り付け。

以下を実行してフィクスチャーを作成する。
`npm run fixtures:regenerate test/integration/full-content/full-content.test.js`

成功すると、以下のようなファイルが生成されます。
- `core__image.json`
- `core__image.parsed.json`
- `core__image.serialized.html`

## 実行手順
上記の、準備1,2を完了後、以下のコマンドでdeprecatedテストを実行します。

`$ npm install`  
`$ npm run test-unit`


## フィクスチャーについて
フィクスチャーの詳細については以下を参照下さい。  
パースとシリアライズ化のテストのために以下のファイル（フィクスチャー）を作成する。

1. fixture-name.html 
    - 初期状態。（ブロックを挿入後、コードエディターで表示した状態）
3. fixture-name.parsed.json
    - 期待されるパース後の状態。
    - JSとPHPパースした結果と比較してテストする
5. fixture-name.json
    - attributesや子ブロックなども含むポストコンテントの状態。
    - 実際のブロックオブジェクトと比較してテストする
7. fixture-name.serialized.html
    - パースしたブロックを`serialize`でシリアライズした状態。
    - 実際に再シリアライズした投稿内容と比較してテストする。投稿を再編集した状態を再現する。
    
### Deprecatedフィクスチャーを作成
deprecated をブロックに追加した場合には、以下のように deprecated フィクスチャーを作成します。
上記と同じ手順で、古いフィクスチャーのファイル名を `core__audio__deprecated-1.html`のように変更する。


## 参考
https://github.com/WordPress/gutenberg/blob/master/packages/e2e-tests/fixtures/blocks/README.md
例：https://github.com/WordPress/gutenberg/blob/master/packages/e2e-tests/fixtures/blocks/core__audio__deprecated-1.html

