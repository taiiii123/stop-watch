<div align="right" style="font-size: 20px;">

**English** | [日本語](./README.ja.md)

</div>

<p align="center"><img src="https://github.com/user-attachments/assets/528184e7-4717-42ac-97a2-d01e4ef350c0" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>
<p align="center"><img src="https://github.com/user-attachments/assets/d456ec37-bd76-40b7-81bd-35234142c9cb" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>


# StopWatch Timer - VS Code Extension

**StopWatch Timer** is an extension that adds a stopwatch tab to the Explorer action bar and displays the elapsed time in the status bar.

### Demo

<p align="center"><img src="https://github.com/user-attachments/assets/be91f613-d954-4e39-85a2-643a5c110ae7" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

## Installation💻

There are 2 ways to install this extension:

- Install from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Y3191.stop-watch).
- Search for `StopWatch Timer` in the extensions tab in the editor

## Features🚀

- **Status Bar Integration**:
  - Shows the elapsed time in the status bar.
  - Integrated start/stop toggle button and reset button.
  - Reload confirmation dialog when changing settings.
- **Webview Interface**: An interactive webview interface for controlling the stopwatch.
- **Start, Stop, Reset**: Simple controls to start, stop, and reset the stopwatch.
- **Customizable Display**: Switch between dark and light mode with a theme toggle button.
- **Custom Fonts**: Supports various fonts, including `DSEG`, `Orbitron`, and more.

## Usage💡

1. Open the action bar in the Explorer and navigate to the `STOPWATCH` tab.
2. Use the displayed stopwatch to `start`, `stop`, or `reset` the timer, and check the time. (Refer to:[Demo](#demo))
3. You can also check the time from the status bar:
   - ⏱️ icon shows the current time
   - ▶️/⏸️ button toggles start/stop
   - 🔄 button resets the timer
4. When changing font or position settings, you'll be prompted to reload for changes to take effect.

<img src="https://github.com/user-attachments/assets/2bb66f17-2a52-406f-8776-bd458aa4b725" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/>

## Configuration⚙️

### Settings.json
You can configure the extension [settings](https://code.visualstudio.com/docs/customization/userandworkspace) in your `settings.json` file:

- `stopwatch.setStatusBarPosition`: Controls the position of the status bar item. Options are `Left` or `Right`.
- `stopwatch.switchFont`: Controls the font of the stopwatch display. Available fonts include `Arial, sans-serif`, `DSEG-Regular`, `DSEG-Bold`, `Orbitron`, `RampartOne`, `瀞ノグリッチ`, `851Gkktt`, `rycsminStencily`, and `Isego`.

Example Configuration
```json
// settings.json
{
  "stopwatch.setStatusBarPosition": "Left",
  "stopwatch.switchFont": "DSEG-Regular"
}
```

### Font Settings

When setting `stopwatch.switchFont`, here is an example of usage.

<table>
  <tr>
    <td>
        <p>Arial, sans-serif (default)</p>
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

### Dark Mode / White Mode
The Dark Mode / Light Mode feature allows you to switch to Dark Mode by pressing the 🌙 button, and to Light Mode by pressing the 🌞 button.<br>
Here is an example of how to use it.

<img src="https://github.com/user-attachments/assets/aa57bd5e-f109-44e5-a7d5-498ca141cbfd" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>

## New Features

# Release 0.0.4

- Integrated start/stop and reset buttons in the status bar

<img src="https://github.com/user-attachments/assets/334ebeef-4dd7-4095-a13f-1b378a0b4e37" height=30></img>

- Added reload confirmation dialog when changing settings

<img src="https://github.com/user-attachments/assets/136fd707-d1c3-4472-9e8d-71ab791b3684" height=80></img>

## Change Log📝

You can checkout all our changes in our [CHANGELOG](./CHANGELOG.md).

## LICENSE⚖️

[MIT](./LICENSE)

<hr>

Please give it a try! ⏱️
