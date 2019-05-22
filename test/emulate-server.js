const test = require('ava')
const { fork } = require('child_process')
const chalk = require('chalk')

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

        console.log(chalk.grey(`[api::server]: ${data.toString()}`))
      })

      webServer.on('message', m => {
        if (m === 'ready') {
          clearTimeout(c)
          resolve()
        }
      })
    })
  })

  test.after.always(async t => {
    webServer && webServer.kill()
  })
}
