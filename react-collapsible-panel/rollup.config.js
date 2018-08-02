import example from './.configs/example-config';
import component from './.configs/component-config';

const entry = process.env.entry;
const config = entry === 'example' ? example : component;

export default config(entry).rollup;