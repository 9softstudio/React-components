simple-react-tab
=========================

## Usage
```javascript
import { Tabs, Tab } from '../dist/index'
import Tab1 from './components/Tab1'
import Tab2 from './components/Tab2'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs>
                <Tab isActive={true} label="Tab1">
                    <Tab1 />
                </Tab>
                <Tab isActive={false} label="Tab2">
                    <Tab2 />
                </Tab>
            </Tabs>
        );
    }
}
```

## License

MIT