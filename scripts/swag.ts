import { dump } from 'js-yaml';
import data from '../examples/swagger';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as tmp from 'tmp';

// @ts-ignore
import * as prettyJson from 'prettyjson';

const swaggerYaml = dump(data);

console.log(swaggerYaml);
console.log(prettyJson.render(data));

const tmpFile = tmp.fileSync();

fs.writeFileSync(tmpFile.name, swaggerYaml);

spawn(
  'npm',
  ['run', 'md-docs', '--', '-i', tmpFile.name, '-o', path.resolve('test.md')],
  { stdio: 'inherit' },
);
