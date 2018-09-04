React Month Picker
=========================

## Demo
[React Month Picker](https://codesandbox.io/s/yv9wl5vlq1)

## Usage
```javascript
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect = (month, year) => {
        console.log(month, year);
    }

    render() {
        return (
            <MonthPicker onSelect={this.handleSelect} />
        );
    }
}
```

## License
MIT