import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  template,
  url,
  move,
  filter
} from '@angular-devkit/schematics';
import {
  Schema as BuilderSchema,
  Builder as BuilderDefinition
} from '@angular-devkit/architect/src/builders-schema';
import { strings as stringUtils } from '@angular-devkit/core';
import { formatFiles, toFileName, updateJsonInTree } from '@nrwl/workspace';

import { WorkspaceBuilderSchema as Schema } from './schema';

type NormalizedSchema = Schema & typeof schemaDefaults;
const schemaDefaults = {
  autoCompile: true,
  skipFormat: false
};
const workspaceBuildersRoot = 'tools/builders';

export default function(schema: Schema): Rule {
  const options = normalizeOptions(schema);

  return chain([
    branchAndMerge(
      chain([createFiles(options), updateBuildersSchema(options)])
    ),
    formatFiles(options)
  ]);
}

function createFiles(options: NormalizedSchema): Rule {
  const templateSource = apply(url('./files'), [
    template({
      dot: '.',
      tmpl: '',
      utils: stringUtils,
      ...options
    }),
    filter((filePath) => {
      if (options.autoCompile) {
        return !filePath.endsWith('index.ts');
      }
      return !filePath.endsWith('index.js') && !filePath.endsWith('impl.ts');
    }),
    move(workspaceBuildersRoot)
  ]);

  return mergeWith(templateSource);
}

function updateBuildersSchema(options: NormalizedSchema): Rule {
  const builderSchemaConfig = createBuilderSchemaConfig(options);

  return updateJsonInTree<BuilderSchema>(
    `${workspaceBuildersRoot}/builders.json`,
    (json) => {
      json.builders[options.name] = builderSchemaConfig;

      return json;
    }
  );
}

function createBuilderSchemaConfig(
  options: NormalizedSchema
): BuilderDefinition {
  const implSource = options.autoCompile
    ? `${options.name}/index.js`
    : `./dist/${options.name}/index.js`;
  const builderSchemaConfig: BuilderDefinition = {
    description: options.description || 'Builder...',
    implementation: implSource,
    schema: `./${options.name}/schema.json`
  };

  return builderSchemaConfig;
}

function normalizeOptions(options: Schema): NormalizedSchema {
  const name = toFileName(options.name);

  return { ...schemaDefaults, ...options, name };
}
