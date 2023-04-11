/*const seq = require('sequelize');
const db2 = require('./db2');

const Cadastro_Consultor = db2.define('Cadastro_Consultor',
{
    Nome:
    {
        type: seq.STRING,
        allowNull: false
    },
    CNPJ:
    {
        type: seq.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Email:
    {
        type: seq.STRING,
        allowNull: false
    },
    Senha:
    {
        type: seq.STRING,
        allowNull: false
    },
    Confsenha:
    {
        type: seq.STRING,
        allowNull: false
    },
    Endereco:
    {
        type: seq.STRING,
        allowNull: false
    },
    DataNasc: {
        type: seq.DATE,
        allowNull: true
    },
    Sexo:
    {
        type: seq.CHAR,
        allowNull: false
    },
    Formacao:
    {
        type: seq.STRING,
        allowNull: false
    },
    Anexo_Docs:
    {
        type: seq.BLOB,
        allowNull: false
    }
});

app.post("/cadastrarConsultor", async (req, res) => {
    //console.log(req.body);

    await cadastroConsultor.create({
        Nome: req.body.nome, 
        CNPJ: req.body.cnpj, 
        Email: req.body.email, 
        Senha: req.body.senha,
        Confsenha: req.body.confsenha
    })
    .then(() => {
        return res.status(200).send('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/confimacao-consultor.html');
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });

    //res.send("Página cadastrar");
});

//cadastroConsultor.sync();
module.exports = Cadastro_Consultor;*/