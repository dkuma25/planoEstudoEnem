const express = require("express")
const calcular = require("./calcular")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post('/calcular', (req, res) => {
  /*const comb = calcular(req.body);
  res.send(comb)*/
  res.send(req.body)
})

app.listen(process.env.PORT || 3333)