// @ts-check

const fs = require('fs');
const path = require('path');

const {
  readJsonFile,
  readTsConfig,
  readNxJson,
  copyFile
} = require('@nrwl/workspace');
const { writeJsonFile } = require('@nrwl/workspace/src/utils/fileutils');

/**
 * @typedef {import('@nrwl/web/src/utils/types').BundleBuilderOptions & Pick<import('@nrwl/web/src/utils/types').BuildBuilderOptions,'assets'>} BuilderOptions
 */

main();

/**
 * Prepare package.json for publishing and move it to proper dist folder
 *
 * @remarks
 * This should be used architect with @nrwl/workspace:run-commands builder
 *
 * @example
 * ```sh
 * # From workspace root
 * node tools/scripts/build-package-json <path-to-your-library>
 * ```
 *
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    throw new Error(
      `Usage: node tools/scripts/build-package-json <path-to-your-library>`
    );
  }

  const workspaceRoot = process.cwd();
  const projectRoot = args[0];
  const normalizedProjectRoot = path.resolve(workspaceRoot, projectRoot);

  if (!fs.existsSync(normalizedProjectRoot)) {
    throw new Error(`${projectRoot} does not exist`);
  }

  /**
   * @type {BuilderOptions}
   */
  const builderOptions = {
    project: path.resolve(normalizedProjectRoot, 'package.json'),
    tsConfig: path.resolve(normalizedProjectRoot, 'tsconfig.lib.json'),
    outputPath: readTsConfig(
      path.resolve(normalizedProjectRoot, 'tsconfig.lib.json')
    ).options.outDir,
    entryFile: path.resolve(normalizedProjectRoot, 'src/index.ts'),
    assets: [path.resolve(normalizedProjectRoot, 'README.md')]
  };

  copyAssets(workspaceRoot, builderOptions);
  updatePackageJson(workspaceRoot, builderOptions);
}

/**
 * @param {string} workspaceRoot
 * @param {BuilderOptions} options
 */
function copyAssets(workspaceRoot, options) {
  options.assets.forEach((file) => {
    copyFile(file, options.outputPath);
  });
}

/**
 * @param {string} workspaceRoot
 * @param {BuilderOptions} options
 */
function updatePackageJson(workspaceRoot, options) {
  /** @type {import('./types').PackageJSON} */
  const packageJson = readJsonFile(options.project);
  const nxJson = readNxJson();
  const workspaceDeps = getAllWorkspaceDeps(workspaceRoot);

  const strictPackagePeerDeps = normalizePackagePeerDeps(
    workspaceDeps,
    packageJson.peerDependencies
  );

  if (packageJson.name) {
    packageJson.name = `@${nxJson.npmScope}/${packageJson.name}`;
  }
  if (packageJson.peerDependencies) {
    packageJson.peerDependencies = strictPackagePeerDeps;
  }

  delete packageJson.devDependencies;

  writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}

/**
 * @param {string} workspaceRoot
 */
function getAllWorkspaceDeps(workspaceRoot) {
  /** @type {import('./types').PackageJSON} */
  const pkgJson = readJsonFile(path.resolve(workspaceRoot, 'package.json'));
  const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };

  return deps;
}

/**
 *
 * @param {Record<string,string>} workspaceDeps
 * @param {Record<string,string>} deps
 */
function normalizePackagePeerDeps(workspaceDeps, deps) {
  return Object.entries(deps).reduce(
    (acc, [depName, depVersion]) => {
      const workspacePkgVersion = workspaceDeps[depName];
      if (workspacePkgVersion) {
        acc[depName] = `^${workspacePkgVersion}`;
      }

      return acc;
    },
    /** @type {Record<string,string>}*/ ({})
  );
}
