const { PleasureApiClient } = require('pleasure-api-client')

module.exports = {
  adminLogin () {
    const pleasureClient = PleasureApiClient.instance()

    return pleasureClient.login({
      email: 'tin@devtin.io',
      password: 'aVeryStrongPassword123:)'
    })
  }
}
