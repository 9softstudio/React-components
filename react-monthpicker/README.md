React Month Picker
=========================

## Demo
[React Month Picker](https://codesandbox.io/s/64r97wr453)

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
    iconElement: PropTypes.any,
    enable: PropTypes.bool
}

defaultProps = {
    open: false,
    onSelect: () => { },
    onFormat: (month, year) => {
        return `${month < 10 ? '0' + month : month}/${year}`
    },
    isReadonly: true,
    monthNames: [
        ['Jan', 'Feb', 'Mar'],
        ['Apr', 'May', 'Jun'],
        ['Jul', 'Aug', 'Sep'],
        ['Oct', 'Nov', 'Dec']
    ],
    enable: true
}
```

## License
MIT