const childProcess = require('child_process')

function runCommandAsyncPipe(cwd, command, args, stdin) {
  return new Promise((resolve, reject) => {
    const stdout = Buffer.alloc(1024 * 1024)
    let stdoutLength = 0
    const stderr = Buffer.alloc(1024)
    let stderrLength = 0

    const process = childProcess.spawn(command, args, { cwd, stdio: 'pipe' })

    process.stdout.on('data', chunk => {
      chunk.copy(stdout, stdoutLength)
      stdoutLength += chunk.length
    })

    process.stderr.on('data', chunk => {
      chunk.copy(stderr, stderrLength)
      stderrLength += chunk.length
    })

    process.on('close', code => {
      if (code === 0) {
        resolve(stdout.slice(0, stdoutLength))
      } else {
        reject(new Error(`exited with code ${code}:\n\n${stderr.slice(0, stderrLength).toString('utf8')}`))
      }
    })

    if (stdin) {
      process.stdin.write(stdin, () => process.stdin.end())
    } else {
      process.stdin.end()
    }
  })
}

function runCommandAsyncInherit(cwd, command, args) {
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

module.exports = {
  runCommandAsyncPipe,
  runCommandAsyncInherit,
}
