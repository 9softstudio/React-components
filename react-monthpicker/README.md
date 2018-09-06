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

## Props
```javascript
propTypes = {
        open: PropTypes.bool,
        minMonth: PropTypes.number,
        minYear: PropTypes.number,
        maxMonth: PropTypes.number,
        maxYear: PropTypes.number,
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        hasRange: PropTypes.bool,
        selectedDropdownYear: PropTypes.number,
        selectedMonth: PropTypes.number,
        onSelect: PropTypes.func,
        onFormat: PropTypes.func,
        isReadonly: PropTypes.bool,
        iconElement: PropTypes.any
}

defaultProps = {
        open: false,
        onSelect: () => { },
        onFormat: defaultFormatFunc,
        isReadonly: true
}
```

## License
MIT