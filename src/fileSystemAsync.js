const copyDir = require('copy-dir')
const fs = require('fs')

function readFileAsync(file) {
  return new Promise((resolve, reject) => fs.readFile(file, 'utf8', (err, res) => (!err ? resolve(res) : reject(err))))
}

function writeFileAsync(file, content) {
  return new Promise((resolve, reject) => fs.writeFile(file, content, err => (!err ? resolve() : reject(err))))
}

function copyDirAsync(from, to, filter) {
  return new Promise((resolve, reject) => copyDir(from, to, filter, (err, res) => (!err ? resolve(res) : reject(err))))
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  copyDirAsync,
}
