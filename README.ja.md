<div align="right" style="font-size: 20px;">

[English](./README.md) | **日本語**

</div>


<p align="center"><img src="https://github.com/user-attachments/assets/29cecc32-12da-489d-b89a-6a5c1cbc532d" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>
<p align="center"><img src="https://github.com/user-attachments/assets/f055e63e-f33e-4876-9230-f5ec04f966e3" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

# Stop Watch - VS Code拡張機能

**Stop Watch**は、エクスプローラーのアクションバーにストップウォッチタブを追加し、ステータスバーに経過時間を表示する拡張機能です。

### 動作例

<p align="center"><img src="https://github.com/user-attachments/assets/4f1a82ca-bf5f-4831-9e3b-b443cb3e37cc" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

## インストール💻

この拡張機能のインストール方法は2通りです：

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?XXXX)からインストール
- エディタの拡張機能タブで `Stop Watch` を検索

## 機能🚀

- **ステータスバー統合**: ステータスバーに経過時間を表示
- **Webviewインターフェース**: ストップウォッチを操作するインタラクティブなWebviewインターフェース
- **開始、停止、リセット**: ストップウォッチの開始、停止、リセットを簡単に操作
- **カスタマイズ可能な表示**: テーマ切り替えボタンでダークモードとライトモードを切り替え
- **カスタムフォント**: `DSEG`, `Orbitron` などのフォントに対応

## 使い方💡

1. エクスプローラーのアクションバーでストップウォッチタブを開きます。
2. 表示されたストップウォッチを使って、`開始`、`停止`、または`リセット`を行い、時間を確認できます。（[動作例](#動作例)を参照）
3. ステータスバーでも時間を確認できます。

<img src="https://github.com/user-attachments/assets/ac896af3-3886-4162-b9ff-ed0f48b4cb8f" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/>

## 設定⚙️

### settings.json
`settings.json`ファイルで拡張機能の[設定](https://code.visualstudio.com/docs/customization/userandworkspace)を変更できます：

- `stopwatch.setStatusBarPosition`: ステータスバーアイテムの位置を制御します。選択肢は`Left`または`Right`。
- `stopwatch.switchFont`: ストップウォッチの表示フォントを制御します。利用可能なフォントは`Arial, sans-serif`、`DSEG-Regular`、`DSEG-Bold`、`Orbitron`、`RampartOne`、`瀞ノグリッチ`、`851Gkktt`、`rycsminStencily`、`Isego`です。

設定例
```json
// settings.json
{
  "stopwatch.setStatusBarPosition": "Left",
  "stopwatch.switchFont": "DSEG-Regular"
}
```

### フォント設定

`stopwatch.switchFont`を設定した場合の使用例を示します。

<table>
  <tr>
    <td>
        <p>Arial, sans-serif (デフォルト)</p>
        <img src="https://github.com/user-attachments/assets/4185f3a3-4b4a-43c9-967b-5d5de4d337cb" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>DSEG-Regular</p>
        <img src="https://github.com/user-attachments/assets/cfa79e7e-0a3c-464b-958b-23ee505996ad" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>DSEG-Bold</p>
        <img src="https://github.com/user-attachments/assets/77230600-896f-4b6a-8b25-b3c7373b0706" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>Orbitron</p>
        <img src="https://github.com/user-attachments/assets/a280f10d-e216-4977-986f-da4ea5936407" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>RampartOne</p>
        <img src="https://github.com/user-attachments/assets/9ba6f861-063a-4c30-8dc7-ab28b058472b" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>瀞ノグリッチ</p>
        <img src="https://github.com/user-attachments/assets/c0dd8658-8abd-4a6f-aaef-a6dad2bccdf4" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>851Gkktt</p>
        <img src="https://github.com/user-attachments/assets/925dc501-e51e-4b8e-8384-d55161346216" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>rycsminStencily</p>
        <img src="https://github.com/user-attachments/assets/4e341277-30ec-4879-8bc9-b93fcd9d0031" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>Isego</p>
        <img src="https://github.com/user-attachments/assets/fa1193cc-903f-41f7-9aeb-8b4e8c6af454" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
    </td>
  </tr>
</table>

### ダークモード / ライトモード
ダークモード / ライトモード機能では、🌙ボタンを押すとダークモードに、🌞ボタンを押すとライトモードに切り替えができます。<br>
以下はその使用例です。

<img src="https://github.com/user-attachments/assets/af20f113-0290-4892-9e3e-5b759e7c0ebb" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>

## 変更履歴📝

すべての変更内容は[CHANGELOG](./CHANGELOG.md)で確認できます。

## ライセンス⚖️

[MIT](./LICENSE)

<hr>

是非試してみてください！ ⏱️