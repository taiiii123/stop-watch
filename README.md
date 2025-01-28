<div align="right" style="font-size: 20px;">

**English** | [日本語](./README.ja.md)

</div>

<p align="center"><img src="https://github.com/user-attachments/assets/29cecc32-12da-489d-b89a-6a5c1cbc532d" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>
<p align="center"><img src="https://github.com/user-attachments/assets/f055e63e-f33e-4876-9230-f5ec04f966e3" height=120 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>


# Stop Watch - VS Code Extension

**Stop Watch** is an extension that adds a stopwatch tab to the Explorer action bar and displays the elapsed time in the status bar.

### Demo

<p align="center"><img src="https://github.com/user-attachments/assets/4f1a82ca-bf5f-4831-9e3b-b443cb3e37cc" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/></p>

## Installation💻

There are 2 ways to install this extension:

- Install from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?XXXX).
- Search for `Stop Watch` in the extensions tab in the editor

## Features🚀

- **Status Bar Integration**: Shows the elapsed time in the status bar.
- **Webview Interface**: An interactive webview interface for controlling the stopwatch.
- **Start, Stop, Reset**: Simple controls to start, stop, and reset the stopwatch.
- **Customizable Display**: Switch between dark and light mode with a theme toggle button.
- **Custom Fonts**: Supports various fonts, including `DSEG`, `Orbitron`, and more.

## Usage💡

1. Open the action bar in the Explorer and navigate to the Stopwatch tab.
2. Use the displayed stopwatch to `start`, `stop`, or `reset` the timer, and check the time. (Refer to:[Demo](#demo)).
3. You can also check the time from the status bar.

<img src="https://github.com/user-attachments/assets/ac896af3-3886-4162-b9ff-ed0f48b4cb8f" style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"/>

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

### Dark Mode / White Mode
The Dark Mode / Light Mode feature allows you to switch to Dark Mode by pressing the 🌙 button, and to Light Mode by pressing the 🌞 button.<br>
Here is an example of how to use it.

<img src="https://github.com/user-attachments/assets/af20f113-0290-4892-9e3e-5b759e7c0ebb" height=250 style="filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));"></img>

## Change Log📝

You can checkout all our changes in our [CHANGELOG](./CHANGELOG.md).

## LICENSE⚖️

[MIT](./LICENSE)

<hr>

Please give it a try! ⏱️