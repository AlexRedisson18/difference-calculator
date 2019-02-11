#!/usr/bin/env node
import program from 'commander';
import { description, version } from '../../package.json';

program
  .version(`${version}`, '-V, --version')
  .description(`${description}`)
  .option('-f --format [format]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
