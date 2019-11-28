const test = require('ava')
const { pleasureApi, utils, getEntities } = require('pleasure-api') // pleasure

/*
const server = require('http').createServer()
// initializing api server in this thread
pleasureApi({
  prefix: '/api',
  debug: true
}, server)
*/

test.beforeEach(async t => {
  // clean db
  await utils.emptyModels()

  // user
  const { entities: { user: User, product: Product } } = await getEntities()

  // Register dummy user
  const dummyUser = await new User({
    fullName: 'Martin Rafael Gonzalez',
    email: 'tin@devtin.io',
    level: 'admin',
    password: 'aVeryStrongPassword123:)'
  }).save()

  process.emit('dummy-user', dummyUser)

  // Register dummy product
  const dummyProduct = await new Product({
    name: 'Kombucha',
    price: 1.99,
    stock: 5,
    categories: ['beverages', 'health']
  }).save()

  process.emit('dummy-product', dummyProduct)
})
