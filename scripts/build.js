const path = require('path');
const rootPkg = require(path.resolve(__dirname, '../package.json'));

function run() {
  rootPkg.workspaces.forEach(async workspace => {
    const resolve = p => path.resolve(__dirname, '../', workspace, p);
    const pkg = require(resolve('package.json'));
    const run = require(resolve(pkg.scripts.build));
    run();
  });
}

run();
