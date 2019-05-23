const test = require('ava')
const { fork } = require('child_process')
const chalk = require('chalk')

const serverLog = (...lines) => {
  const date = new Date().toTimeString()
  const headline = `[api-server :: ${ date }]`
  lines.forEach(line => {
    console.log(chalk[module.exports.config.infoColor](headline))
    console.log(chalk[module.exports.config.contentColor](line))
  })
}

module.exports = function (dummyProjectPath) {
  let webServer

  test.before(async t => {
    // Fork dummy project (web server)
    await new Promise((resolve, reject) => {
      const c = setTimeout(reject.bind(null, `Web server did not answer`), 3000) // wait 1000 ms for the server to start

      webServer = fork(require.resolve(dummyProjectPath), [], {
        cwd: dummyProjectPath,
        silent: true,
        env: {
          NODE_ENV: 'test',
        }
      })

      webServer.stdout.on('data', (data) => {
        if (process.env.API_ERROR !== 'true') {
          return
        }

        serverLog(data.toString())
      })

      webServer.on('message', m => {
        if (m === 'ready') {
          clearTimeout(c)
          serverLog(`started`)
          resolve()
        }
      })
    })
  })

  test.after.always(async t => {
    webServer && webServer.kill()
  })
}
module.exports.config = {
  infoColor: 'grey',
  contentColor: 'grey'
}
