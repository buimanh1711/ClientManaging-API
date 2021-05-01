const loginRouter = require('./login')
const authRouter = require('./auth')
const guestRouter = require('./guest')
const accountRouter = require('./account')

const route = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/guest', guestRouter)
  app.use('/api/account', accountRouter)
  app.use('/api/login', loginRouter)
}

module.exports = route