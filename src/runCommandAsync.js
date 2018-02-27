const childProcess = require('child_process')

function runCommandAsync(cwd, command, args) {
  return new Promise((resolve, reject) => {
    const process = childProcess.spawn(command, args, { cwd, stdio: 'inherit' })

    process.on('close', code => {
      if (code === 0) {
        resolve(0)
      } else {
        reject(new Error(`exited with code ${code}`))
      }
    })
  })
}

module.exports = runCommandAsync
