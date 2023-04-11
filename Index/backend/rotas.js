const express = require('express');
const app = express();
const CadastroEmpresa = require('./models/CadastroEmpresa');
const cadastroConsultor = require('./models/cadastroConsultor');
const db2 = require('./models/db2');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Khadidja',
  database: 'upconsult'
});

connection.connect();

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

app.get("/Quem-sou-eu", async (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/quem-sou-eu.html');
});

app.get('/cadastrarEmpresa', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/cadastro-empresa.html');
});

app.post('/cadastrarEmpresa', (req, res) => {
  const nome = req.body.nome;
  const cnpj = req.body.cnpj;
  const email = req.body.email;
  const senha = req.body.senha;
  const confsenha = req.body.confsenha;

  connection.query('INSERT INTO cadastro_empresas (Nome_Empresa, CNPJ, Email, Senha, Confsenha) VALUES (?, ?, ?, ?, ?)', [nome, cnpj, email, senha, confsenha], (error, results, fields) => {
    if (error) throw error;
    console.log('Usuário cadastrado com sucesso');
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/confirmacao-empresa.html');
  });
});

app.get('/cadastrarConsultor', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/cadastro-consultor.html');
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

// Área de Login
// Rota para página de login da empresa
app.get('/loginEmpresa', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/login.html');
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