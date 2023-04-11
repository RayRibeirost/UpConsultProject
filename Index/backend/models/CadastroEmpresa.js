/*const db2 = require('./db2');
const seq = require ('sequelize');

const CadastroEmpresa = db2.define('Cadastro_Empresa', {
    Nome_responsavel: {
        type: seq.STRING,
        allowNull: false
    },
    Nome_Empresa: {
        type: seq.STRING,
        allowNull: false
    },    
    CNPJ: {
        type: seq.INTEGER,
        primaryKey: true,
        allowNull: false
    },   
    Email: {
        type: seq.STRING,
        allowNull: false
    },   
    Senha: {
        type: seq.INTEGER,
        allowNull: false
    },   
    Confsenha:
    {
        type: seq.STRING,
        allowNull: false
    },
    DataNasc_Criacao: {
        type: seq.DATE,
        allowNull: true
    },   
    Endereco: {
        type: seq.STRING,
        allowNull: true
    }   
})
    
// CadastroEmpresa.sync();
module.exports = CadastroEmpresa; 


app.post("/cadastrarEmpresa", async (req, res) => {
    //console.log(req.body);

    await CadastroEmpresa.create({
        Nome_Empresa: req.body.nome, 
        CNPJ: req.body.cnpj, 
        Email: req.body.email, 
        Senha: req.body.senha,
        Confsenha: req.body.confsenha
    })
    .then(() => {
        return res.status(200).sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/confirmacao-empresa.html');
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
    //res.send("Página cadastrar");
});*/
