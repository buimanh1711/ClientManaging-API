const loginRouter = require('./login')
const authRouter = require('./auth')

const route = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/login', loginRouter)
}

module.exports = route