const execa = require('execa');
const path = require('path');
const fs = require('fs-extra');
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const generator = require('./generator-components');

const pkgDir = path.resolve(__dirname, '..');
const resolve = dir => path.resolve(pkgDir, dir);
const pkg = require(resolve('package.json'));

module.exports = async function() {
  console.log(`[Start build ${pkg.name}]`);
  await fs.remove(resolve('dist'));

  generator();

  await execa('rollup', ['-c', resolve('rollup.config.js')], { stdio: 'inherit' });
  const extractorConfigPath = resolve('api-extractor.json');
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    extractorConfigPath
  );
  const result = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  });
  if (result.succeeded) {
    console.log('API Extractor completed successfully.');
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }
  fs.remove(resolve('dist/packages'));
  console.log('');
  console.log('');
}
