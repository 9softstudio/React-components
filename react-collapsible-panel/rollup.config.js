import ExampleConfigs from './.configs/rollup.config.example';
import BuildConfigs from './.configs/rollup.config';

const entry = process.env.entry;
const config = entry === 'example' ? ExampleConfigs : BuildConfigs(entry);

export default config;