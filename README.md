# Diary App for Diabetes Type 1 (React Native)

### Development Team

- Developer 1: Artur Wagner
- Developer 2: Arash Afrazeh

### Preparation (Please install these before continuing)

| Technology Required | Developer 1 | Developer 2 |
| ------------------- | ----------- | ----------- |
| expo Cli            | 5.0.1       | 4.13.0      |
| npm                 | 8.4.1       | 8.1.0       |
| git                 | Any         | Any         |

###### It is possible to use a different git client like _GitHub Desktop_ if that is your preference.

| Tested environments | Developer 1                  | Developer 2                  |
| ------------------- | ---------------------------- | ---------------------------- |
| Web                 | Windows 10 Home 64bit (21H2) | Windows 10 Home 64bit (21H1) |
| Android             | Google Pixel 4a              | POCO F3                      |

### Instruction on compiling the app.

These instructions are designed to be made for Windows users who possess and android device.

First locate to a directory that you wish to download the repository to. In this example we have used `C:\GitLab`

> C:\\GitLab> git clone https://gitlab.kingston.ac.uk/CI6330-2021-22-TeamApp07/Diabetes-App-React-Native.git

**Password authentication** might be **required**! Please use the account you have used to access this `./README.md`

The npm modules need to be then installed, including expo.

> C:\\GitLab> cd Diabetes-App-React-Native\\app
>
> C:\\GitLab\\Diabetes-App-React-Native\\app> npm i
>
> C:\\GitLab\\Diabetes-App-React-Native\\app> expo install
>
> C:\\GitLab\\Diabetes-App-React-Native\\app> npm start

Here there is an option to press key `W` on your keyboard while having the command prompt in focus to open a web browser session. It is also possible to scan the visible **QR code** with your [Expo CLI app](https://play.google.com/store/apps/details?id=host.exp.exponent) on mobile.

You can then use and test the app. Information on app usage can be found in the submitted documents and individual videos.

You can close the app by pressing `CTRL` + `C` in your terminal.

### In case of Food Search giving no response or CRASHING THE APP

There is a small chance the API used to request details for _food_ might broke after time passed. If that is the case please visit the [API at rapidapi.com](https://rapidapi.com/edamam/api/edamam-food-and-grocery-database/). You can login using a google account and you will be given a new key which you can then insert into the code _(Line 21)_. App should work as intended after this point.

```javascript
// Line 7 in file: ./app/components/FoodSearch.js
...
export default class FoodSearch extends React.Component {
  state = {
    searchTerm: "",
    data: [],
  };
  getData = () => {
    axios
      .request({
        method: "GET",
        url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
        params: { ingr: this.state.searchTerm },
        headers: {
          "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
          "X-RapidAPI-Key":
            "260a9302d4msh609bc87b86a7f23p155185jsn400074edb05a", // Insert new key here
        },
      })
      .then((response) => {
        console.log(response.data.hints);
        this.setState({
          data: response.data.hints,
        });
      });
  };
...
```
