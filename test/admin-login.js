const { ApiClient } = require('@pleasure-js/api-client')

module.exports = {
  adminLogin () {
    const pleasureClient = ApiClient.instance()

    return pleasureClient.login({
      email: 'tin@devtin.io',
      password: 'aVeryStrongPassword123:)'
    })
  }
}
