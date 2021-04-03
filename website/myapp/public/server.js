const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  app.use(express.static('myapp'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
/*
const express = require('express')
const path = require('path')
const port = 3000

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))

app.listen(3000, () => {
    console.log('Server up at port ' + port)
})
*/