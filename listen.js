const app = require('./app')
const { PORT = 9090 } = process.env
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('server listen on the port', PORT)
})
