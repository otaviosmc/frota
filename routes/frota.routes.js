const express = require("express");
const router = express.Router();

let frota = [];

router.get("/", (req, res) => {
    if (frota.length === 0) {
        return res.status(404).json({ erro: "Frota vazia" });
    }
    res.send(frota);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const veiculo = frota.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({ erro: "Veículo não encontrado" });
    }

    res.json(veiculo);
});

router.post("/", (req, res) => {
    const veiculo = {
        id: frota.length + 1,
        placa: req.body.placa,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        cor: req.body.cor,
        tipo: req.body.tipo,
        ativo: 1,
    };

    if (!veiculo.placa || !veiculo.marca || !veiculo.modelo || !veiculo.ano || !veiculo.cor || !veiculo.tipo) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (frota.find(v => v.placa === veiculo.placa && v.ativo === 1)) {
        return res.status(400).json({ erro: "Veículo já cadastrado" });
    }

    frota.push(veiculo);
    res.send("Veículo adicionado");
});

router.delete("/deleteAll", (req,res) =>{
    frota = [];
    res.send("Frota limpa");
});

router.put("/inativarVeiculo/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const veiculo = frota.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({ erro: "Veículo não encontrado" });
    }

    veiculo.ativo = 0;

    res.json({
        mensagem: "Veículo inativado",
        veiculo
    });
});
module.exports = router;