const path = require('path');
const fs = require('fs');
const consola = require('consola');
const chalk = require('chalk');
const chokidar = require('chokidar');

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(__dirname + '/').pop());
    }
  });

  return arrayOfFiles;
};

module.exports = function DefaultThemeModule(moduleOptions) {
  log.info(chalk.green('Starting Theme Module'));

  log.info('Adding theme files...');

  const themeFiles = getAllFiles(path.join(__dirname, 'theme'));

  themeFiles.forEach((file) => {
    this.addTemplate({
      fileName: file.split('theme/').pop(),
      src: path.join(__dirname, file),
      options: {
        apiClient: moduleOptions.apiClient,
        helpers: moduleOptions.helpers,
        composables: moduleOptions.composables
      }
    });
  });

  log.success(`Added ${themeFiles.length} theme file(s) to ${chalk.bold('.nuxt')} folder`);

  this.extendRoutes((routes, resolve) => {
    routes.unshift({
      name: 'home',
      path: '/',
      component: resolve(this.options.buildDir, 'pages/Home.vue')
    });
    routes.unshift({
      name: 'product',
      path: '/p/:slug/',
      component: resolve(this.options.buildDir, 'pages/Product.vue')
    });
    routes.unshift({
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: resolve(this.options.buildDir, 'pages/Category.vue')
    });
    routes.unshift({
      name: 'my-account',
      path: '/my-account/:pageName?',
      component: resolve(this.options.buildDir, 'pages/MyAccount.vue')
    });
  });

  if (global.coreDev) {
    log.info(`Watching theme dir in Theme Module for changes.. ${chalk.italic('[coreDevelopment]')}`);
    this.nuxt.hook('build:before', (builder) => {
      chokidar.watch(path.join(__dirname, '../theme/')).on('all', () => {
        builder.generateRoutesAndFiles();
      });
    });
  }
};
