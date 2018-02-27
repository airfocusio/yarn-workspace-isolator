const fs = require('fs')
const glob = require('glob')

function readFileAsync(file) {
  return new Promise((resolve, reject) => fs.readFile(file, 'utf8', (err, res) => (!err ? resolve(res) : reject(err))))
}

function writeFileAsync(file, content) {
  return new Promise((resolve, reject) => fs.writeFile(file, content, err => (!err ? resolve() : reject(err))))
}

function renameAsync(file1, file2) {
  return new Promise((resolve, reject) => fs.rename(file1, file2, (err, res) => (!err ? resolve(res) : reject(err))))
}

function unlinkAsync(file) {
  return new Promise((resolve, reject) => fs.unlink(file, err => (!err ? resolve() : reject(err))))
}

function globAsync(pattern) {
  return new Promise((resolve, reject) => glob(pattern, (err, res) => (!err ? resolve(res) : reject(err))))
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  renameAsync,
  unlinkAsync,
  globAsync,
}
