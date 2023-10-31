const app = require('./app/app')

const port = process.env.PORT || 3001; // Process nos permite acceder a las variables de entorno y PORT es la variable que recuperamos

app.listen(port, () => {
  console.log(`---------- Serever Running on PORT ${port}`)
})