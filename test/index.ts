import 'mocha';
import { expect } from 'chai';
import * as babel from '@babel/core';
import fs from 'fs';
import path from 'path';
import privateToPublic from '../src';

async function loadSample(file: string) : Promise<string> {
    return (await fs.promises.readFile(path.resolve(__dirname, 'fixtures', file), {
        encoding: 'utf-8',
    })) as string;
}

describe('tests', function() {
    it('should transform a class', async function() {
        const source = await loadSample('sample/in.js');
        const expected = await loadSample('sample/out.js');

        // use our plugin to transform the source
        const out = babel.transform(source, {
            parserOpts: {
                plugins: ['classPrivateProperties'],
            },
            plugins: [privateToPublic],
        });

        expect(out.code).to.equal(expected);
    });
});
