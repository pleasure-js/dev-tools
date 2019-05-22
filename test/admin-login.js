const { PleasureApiClient } = require('pleasure-api-client')

const pleasureClient = PleasureApiClient.instance()

module.exports = {
  adminLogin () {
    return pleasureClient.login({
      email: 'tin@devtin.io',
      password: 'aVeryStrongPassword123:)'
    })
  }
}
