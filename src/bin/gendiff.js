#!/usr/bin/env node

import program from 'commander';
import { description, version } from '../../package.json';
import genDiff from '..';

program
  .version(`${version}`, '-V, --version')
  .description(`${description}`)
  .option('-f --format [format]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
