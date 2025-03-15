<div align="right" style="font-size: 20px;">

[English](./README.md) | **日本語**

</div>


<p align="center"><img src="https://github.com/user-attachments/assets/528184e7-4717-42ac-97a2-d01e4ef350c0" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>
<p align="center"><img src="https://github.com/user-attachments/assets/d456ec37-bd76-40b7-81bd-35234142c9cb" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

# StopWatch Timer - VS Code拡張機能

**StopWatch Timer**は、エクスプローラーのアクションバーにストップウォッチタブを追加し、ステータスバーに経過時間を表示する拡張機能です。

### 動作例

<p align="center"><img src="https://github.com/user-attachments/assets/be91f613-d954-4e39-85a2-643a5c110ae7" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

## インストール💻

この拡張機能のインストール方法は2通りです：

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Y3191.stop-watch)からインストール
- エディタの拡張機能タブで `StopWatch Timer` を検索

## 機能🚀

- **ステータスバー統合**:
  - ステータスバーに経過時間を表示
  - スタート/ストップの切り替えボタンとリセットボタンを統合
  - 設定変更時のリロード確認ダイアログ表示
- **Webviewインターフェース**: ストップウォッチを操作するインタラクティブなWebviewインターフェース
- **開始、停止、リセット**: ストップウォッチの開始、停止、リセットを簡単に操作
- **カスタマイズ可能な表示**: テーマ切り替えボタンでダークモードとライトモードを切り替え
- **カスタムフォント**: `DSEG`, `Orbitron` などのフォントに対応

## 使い方💡

1. エクスプローラーのアクションバーで`STOPWATCH`タブを開きます。
2. 表示されたストップウォッチを使って、`開始`、`停止`、または`リセット`を行い、時間を確認できます。（[動作例](#動作例)を参照）
3. ステータスバーでも時間を確認できます：
   - ⏱️ アイコンで現在の時間を表示
   - ▶️/⏸️ ボタンでスタート/ストップを切り替え
   - 🔄 ボタンでリセット
4. フォントや位置の設定を変更すると、変更を適用するためのリロード確認が表示されます。

<img src="https://github.com/user-attachments/assets/2bb66f17-2a52-406f-8776-bd458aa4b725" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/>

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
        <img src="https://github.com/user-attachments/assets/6b08c978-4ac9-41e0-883b-ff53ada0c5b0" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>DSEG-Regular</p>
        <img src="https://github.com/user-attachments/assets/0e134cc9-0a74-4621-9acc-894065f2a159" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>DSEG-Bold</p>
        <img src="https://github.com/user-attachments/assets/d21380eb-7cd2-4d39-b4c4-59e8dbbdb9d3" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>Orbitron</p>
        <img src="https://github.com/user-attachments/assets/be35011d-f09a-4d67-8f6d-b7816af23751" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>RampartOne</p>
        <img src="https://github.com/user-attachments/assets/3529e6c2-9f36-4bed-a6a0-c644df3b2017" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>瀞ノグリッチ</p>
        <img src="https://github.com/user-attachments/assets/ed432f9d-1eae-4873-affd-b7016af82a75" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>851Gkktt</p>
        <img src="https://github.com/user-attachments/assets/52401d66-399e-41b3-92f3-acc9a138d9bf" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
        <p>rycsminStencily</p>
        <img src="https://github.com/user-attachments/assets/88bffdc5-6d1e-4227-b1b6-e564c3120222" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
  </tr>
  <tr>
    <td>
        <p>Isego</p>
        <img src="https://github.com/user-attachments/assets/f2d5074e-a25d-4036-bea6-c740a1925fcf" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>
    </td>
    <td>
    </td>
  </tr>
</table>

### ダークモード / ライトモード
ダークモード / ライトモード機能では、🌙ボタンを押すとダークモードに、🌞ボタンを押すとライトモードに切り替えができます。<br>
以下はその使用例です。

<img src="https://github.com/user-attachments/assets/aa57bd5e-f109-44e5-a7d5-498ca141cbfd" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>

## 追加機能

# リリース0.0.6

- ステータスバーにスタート/ストップボタン、リセットボタンを統合

<img src="https://github.com/user-attachments/assets/334ebeef-4dd7-4095-a13f-1b378a0b4e37" height=30></img>

- 設定変更時のリロード確認ダイアログを表示

<img src="https://github.com/user-attachments/assets/1059731b-39a8-4fd1-ac43-44494b506fd8" height=80></img>


## 変更履歴📝

すべての変更内容は[CHANGELOG](./CHANGELOG.md)で確認できます。

## ライセンス⚖️

[MIT](./LICENSE)

<hr>

是非試してみてください！ ⏱️
