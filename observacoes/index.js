const express = require(`express`)
const bodyParser = require(`body-parser`)

const app = express()
app.use(bodyParser.json())

const observacoesPorLembreteId = {}

const { v4: uuidv4 } = require('uuid');

app.put('/lembretes/:id/observacoes', (req,res) => {
    const idObs = uuidv4()
    const {texto} = req.body
    const observacoesDoLembrete = observacoesPorLembreteId[req.id] || []
    observacoesDoLembrete.push({ id: idObs, texto })
    observacoesPorLembreteId[req.id] = observacoesDoLembrete    
    res.status(201).send(observacoesDoLembrete)
})
app.get('/lembretes/:id/observacoes', (req,res) => {
    res.send(observacoesPorLembreteId[req.id] || [])
    
})
app.listen(5000, () => {
    console.log(`Observacoes. Porta 5000`)
})
