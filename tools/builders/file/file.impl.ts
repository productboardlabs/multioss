import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, bindNodeCallback, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { json, getSystemPath, normalize } from '@angular-devkit/core';
import { writeFile } from 'fs';
import dateFormat from 'dateformat';

import { TimestampBuilderSchema } from './schema.d';

interface Schema extends TimestampBuilderSchema, json.JsonObject {}

export default createBuilder(createTimestamp);

export function createTimestamp(
  { path, format }: Schema,
  { workspaceRoot, logger }: BuilderContext
): Observable<BuilderOutput> {
  const timestampFileName = `${getSystemPath(
    normalize(workspaceRoot)
  )}/${path}`;
  const writeFileObservable = bindNodeCallback(writeFile);
  const timestampLogger = logger.createChild('Timestamp');

  return writeFileObservable(
    timestampFileName,
    dateFormat(new Date(), format)
  ).pipe(
    map<void, BuilderOutput>(() => ({ success: true })),
    tap(() => timestampLogger.info('Timestamp created')),
    catchError((err) => {
      timestampLogger.error('Failed to create timestamp', err);

      return of<BuilderOutput>({ success: false });
    })
  );
}
