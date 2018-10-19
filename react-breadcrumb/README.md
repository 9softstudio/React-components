react-breadcrumb
=========================
![react-breadcrumb](https://raw.githubusercontent.com/9softstudio/React-components/ReactBreadcrumb/master/screenshots/react-breadcrumb.jpg)
## Install
```
npm i @9softstudio/react-breadcrumb
```
## Usage
```javascript
import { Breadcrumb } from '@9softstudio/react-breadcrumb'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 3
        };
    }

    render() {
        const items = [];
        items.push({ label: "Level 1", value: 1, });
        items.push({ label: "Level 2", value: 2, });
        items.push({ label: "Level 3", value: 3, });

        return (
        <div>
        <Breadcrumb items={items} value={this.state.level} onChange={(item) => this.setState({level: item.value})}/>
        <div>
            Level : {this.state.level}
        </div>
        </div>
        )
    }
}
```

## License

MIT