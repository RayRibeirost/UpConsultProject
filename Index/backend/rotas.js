const express = require('express');
const app = express();
const CadastroEmpresa = require('./models/CadastroEmpresa');
const cadastroConsultor = require('./models/cadastroConsultor');
const db2 = require('./models/db2');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.json());

app.use(express.static('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da sessão
app.use(session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true
}));

app.get("/", async (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/index.html');
});

app.post("/cadastrarEmpresa", async (req, res) => {
    //console.log(req.body);

    await CadastroEmpresa.create({
        Nome_Responsavel: req.body.nomeResponsavel,
        Nome_Empresa: req.body.nomeEmpresa, 
        CNPJ: req.body.cnpj, 
        Email: req.body.email, 
        Senha: req.body.senha,
        Confsenha: req.body.confsenha,
        DataNasc_Criacao: req.body.dataNascCriacao,
        Endereco: req.body.endereco
    })
    .then(() => {
        return res.status(200).sendFile('../Index/confirmacao-empresa.html');
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });
    //res.send("Página cadastrar");
});

app.post("/cadastrarConsultor", async (req, res) => {
    //console.log(req.body);

    await cadastroConsultor.create({
        Nome: req.body.nome, 
        CNPJ: req.body.cnpj, 
        Email: req.body.email, 
        Senha: req.body.senha,
        Confsenha: req.body.confsenha,
        Endereco: req.body.endereco,
        DataNasc: req.body.dataNasc,
        Sexo: req.body.sexo,
        Formacao: req.body.formacao,
        Anexo_Docs: req.body.docs
    })
    .then(() => {
        return res.status(200).send('./Index/confirmacao-consultor.html');
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });

    //res.send("Página cadastrar");
});

// Área de Login
// Rota para página de login da empresa
app.get('/loginEmpresa', (req, res) => {
    res.sendFile(__dirname + './Index/login.html');
});

// Rota para processar o login
app.post('/loginEmpresa', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        db2.query('SELECT * FROM Cadastro_Empresa WHERE Email = ? AND Senha = ?', [username, password], (err, results) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/homeEmpresa');
            } else {
                res.send('Usuário ou senha incorretos!');
            }
            res.end();
        });
    } else {
        res.send('Por favor, preencha todos os campos!');
        res.end();
    }
});

// Rota para página inicial após o login
app.get('/homeEmpresa', (req, res) => {
    if (req.session.loggedin) {
        res.send('Bem-vindo(a), ' + req.session.username + '!');
    } else {
        res.send('Por favor, faça o login para ver esta página!');
    }
    res.end();
});

// Rotas para página de login do consultor

app.get('/loginConsultor', (req, res) => {
    res.sendFile(__dirname + './Index/login.html');
});

// Rota para processar o login
app.post('/loginConsultor', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        db2.query('SELECT * FROM cadastro_Consultor WHERE Email = ? AND Senha = ?', [username, password], (err, results) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/homeConsultor');
            } else {
                res.send('Usuário ou senha incorretos!');
            }
            res.end();
        });
    } else {
        res.send('Por favor, preencha todos os campos!');
        res.end();
    }
});

// Rota para página inicial após o login
app.get('/homeConsultor', (req, res) => {
    if (req.session.loggedin) {
        res.send('Bem-vindo(a), ' + req.session.username + '!');
    } else {
        res.send('Por favor, faça o login para ver esta página!');
    }
    res.end();
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

/* Post.create({
        matricula: req.body.matricula, 
        nome: req.body.nome, 
        data_nascimento: req.body.data_nascimento, 
        sexo: req.body.sexo,
        salario: req.body.salario,
        supervisor: req.body.supervisor,
        departamento: req.body.departamento
        }).then(() => {
            res.send('Dados enviados com sucesso.');
        }).catch((err) => {
            res.send('Houve um erro: ' + err);
    }); */