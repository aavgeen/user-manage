const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "vveurhvurenbaunteoibo",
  // mongoUri: process.env.MONGODB_URI ||
  //   process.env.MONGO_HOST ||
  //   'mongodb://' + (process.env.IP || 'localhost') + ':' +
  //   (process.env.MONGO_PORT || '27017') +
  //   '/social-fly-mern'
  mongoUri: 'mongodb://useradmin:useradmin1@ds157809.mlab.com:57809/usermanagement'
}

export default config
