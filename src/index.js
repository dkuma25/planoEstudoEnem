const express = require("express")
const bodyParser = require("body-parser")
const calcular = require("./calcular")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/calcular', (req, res) => {
  // console.log(req.body.difficulty)
  // res.send(req.body)
  const comb = calcular(req.body, req.headers["content-type"]);
  res.send(comb)
})

app.listen(process.env.PORT || 3333)