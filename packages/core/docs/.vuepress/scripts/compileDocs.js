const fs = require('fs');
const path = require('path');
const ejs = require('ejs')

const getAllFiles = (dirPath, arrayOfFiles) => {
  arrayOfFiles = arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(__dirname + '/').pop());
    }
  });

  return arrayOfFiles;
};

function ensureDirectoryExists (filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

function compileTemplate(templateDir, outDir, options) {
  fs.readFile(templateDir, 'utf8', (err, data) => {
    ejs.renderFile(templateDir, options, {}, function(err, rendered) {
      ensureDirectoryExists(outDir);
      fs.writeFile(outDir, rendered, err =>{
        if (err) throw err;
      });
    });
  });
};

const docs = getAllFiles(path.join(__dirname, '../docs'));

docs.forEach((file) => {
  compileTemplate(
    file,
    file.replace('/.vuepress/docs/', '/.vuepress/compiled/'),
    {
      a: 'b'
    }
  );
});