import scss from 'node-sass';
import fs from 'fs';
import example from './.configs/example-config';
import component from './.configs/component-config';

[
    example().scss,
    component('pro').scss,
    component('dev').scss
].forEach(options => scss.render(options, (err, result) => {
    if (err) {
        console.log('\x1b[31m', err);
        return;
    }

    fs.writeFile(options.outFile, result.css);
    console.log('\x1b[32m', options.outFile);
    console.log('\x1b[0m');
}));