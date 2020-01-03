import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import * as childProcess from 'child_process';

import { CommandRunnerBuilderSchema } from './schema.d';

interface Schema extends CommandRunnerBuilderSchema, JsonObject {}

export default createBuilder(commandBuilder);

export function commandBuilder(
  options: Schema,
  context: BuilderContext
): Promise<BuilderOutput> {
  return new Promise((resolve) => {
    context.reportStatus(`Executing "${options.command}"...`);

    const child = childProcess.spawn(options.command, options.args, {
      stdio: 'pipe'
    });
    child.stdout.on('data', (data) => {
      context.logger.info(data.toString());
    });
    child.stderr.on('data', (data) => {
      context.logger.error(data.toString());
    });

    context.reportStatus(`Done.`);
    child.on('close', (code) => {
      context.logger.info('DONE!!!');
      resolve({ success: code === 0 });
    });
  });
}
