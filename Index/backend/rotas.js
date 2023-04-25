// Constantes Globais
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');


// Conexão com o banco de dados 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Khadidja',
    database: 'upconsult'
  });
  
  connection.connect((error) => {
        if (error) {
          console.error('Erro ao conectar ao banco de dados:', error);
          return;
        }
        console.log('Conexão bem-sucedida com o banco de dados!');
    });

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

// Rota Home da página
app.get("/", async (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/index.html');
});

// Rota Quem sou eu Cadastro
app.get("/quemSouEuCadastro", async (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/quem-sou-eu-cadastro.html');
});

// Rota Quem sou eu Login
app.get("/quemSouEuLogin", async (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/quem-sou-eu-login.html');
});

// Rota Cadastrar Empresa
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

// Rota Cadastrar Consultor
app.get('/cadastrarConsultor', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/cadastro-consultor.html');
});

app.post('/cadastrarConsultor', (req, res) => {
  const nomeC = req.body.nome;
  const cnpjC = req.body.cnpj;
  const emailC = req.body.email;
  const senhaC = req.body.senha;
  const confsenhaC = req.body.confsenha;

  connection.query('INSERT INTO cadastro_consultors (Nome, CNPJ, Email, Senha, Confsenha) VALUES (?, ?, ?, ?, ?)', [nomeC, cnpjC, emailC, senhaC, confsenhaC], (error, results, fields) => {
    if (error) throw error;
    console.log('Usuário cadastrado com sucesso');
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/confirmacao-consultor.html');
  });
});

// Área de Login
// Rota para página de login da empresa
app.get('/loginEmpresa', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/login-empresa.html');
});

// Rota para processar o login da empresa
app.post('/loginEmpresa', (req, res) => {
    const username = req.body.cnpj;
    const password = req.body.senha;

    if (username && password) {
        connection.query('SELECT * FROM cadastro_empresas WHERE CNPJ = ? AND Senha = ?', [username, password], (err, results) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/plataformaEmpresa');
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
app.get('/plataformaEmpresa', (req, res) => {
    if (req.session.loggedin === true) {
        res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/upconsult_index.html');
    } else {
        res.send('Por favor, faça o login para ver esta página!');
    }
});

// Rotas para página de login do consultor
app.get('/loginConsultor', (req, res) => {
    res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/login-consultor.html');
});

// Rota para processar o login do consultor
app.post('/loginConsultor', (req, res) => {
    const usernameC = req.body.cnpj;
    const passwordC = req.body.senha;

    if (usernameC && passwordC) {
        connection.query('SELECT * FROM cadastro_consultors WHERE CNPJ = ? AND Senha = ?', [usernameC, passwordC], (err, results) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = usernameC;
                res.redirect('/plataformaConsultor');
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
app.get('/plataformaConsultor', (req, res) => {
    if (req.session.loggedin === true) {
        res.sendFile('C:/Users/claud/OneDrive/Área de Trabalho/JGT codes/UpConsultProject/Index/upconsult_index.html');
    } else {
        res.send('Por favor, faça o login para ver esta página!');
    }
});

app.get('/plataformaConsultor/feed', (req, res) => {
    // Query SQL para buscar as postagens mais recentes na tabela
    const query = 'SELECT * FROM solicitacao';
    // Executar a query no banco de dados
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao buscar as postagens:', error);
        res.status(500).send('Erro ao buscar as postagens.');
        return;
      }
      // Renderizar as postagens na página HTML
      res.render('upconsult_index.html', { solicitacao: results });
    });
}); 

// Rota POST para a postagem
app.post('/plataformaEmpresa/solicitacao', (req, res) => {
    const nomefeed = req.session.nome
    const titulo = req.body.tituloSolicitacaoEmpresa; 
    const conteudo  = req.body.descricaoSolicitacaoEmpresa;
    const areaConsultoria = req.body.areaDeConsultoriaEmpresa;
  
    // Inserção dos dados no banco de dados
    const posts = `INSERT INTO solicitacao (nome, titulo, conteudo, areaConsultoria) VALUES ('${nomefeed}', '${titulo}', '${conteudo}', '${areaConsultoria}')`;
  
    connection.query(posts, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados no banco de dados:', err);
        res.status(500).send('Erro ao inserir os dados no banco de dados');
      } else {
        console.log('Dados inseridos com sucesso no banco de dados');
        res.redirect('/plataformaEmpresa');
      }
    });
});

// Define as rotas do sistema de agendamento
app.get('/plataformaEmpresa/agendamento', (req, res) => {
     // Query SQL para buscar as postagens mais recentes na tabela
    const agendamentos = 'SELECT * FROM agendamentos ORDER BY datas ASC'
    // Executar a query no banco de dados
    connection.query(agendamentos, (error, results) => {
        if (error) {
          console.error('Erro ao buscar os agendamentos:', error);
          res.status(500).send('Erro ao buscar os agendamentos');
        } else {
         res.render('upconsult_index.html', {agendamentos: results });
        }
    });
});

app.post('/plataformaConsultor/agendamento', (req, res) => {
    const data = req.body.dataAtendimentoConsultor;
    const solucao = req.body.descricaoSolucao;
    const hora = req.body.horaAtendimentoConsultor;

    connection.query('INSERT INTO agendamentos (datas, solucao, hora) VALUES (?, ?, ?)', [data, solucao, hora], (error, result) => {
        if (error) {
        console.error('Erro ao agendar o compromisso:', error);
        res.status(500).send('Erro ao inserir agendamento no banco de dados');
        } else {
        res.redirect('/plataformaConsultor');
        }
    });
});

// Área de Feedbacks 
app.get('/plataformaConsultor/feedbacks', (req, res) => {
    // Query SQL para buscar as postagens mais recentes na tabela
    const feedback = 'SELECT * FROM feedbacks';
    // Executar a query no banco de dados
    connection.query(feedback, (error, results) => {
      if (error) {
        console.error('Erro ao buscar os feedbacks:', error);
        res.status(500).send('Erro ao buscar os feedbacks.');
        return;
      }
      // Renderizar as postagens na página HTML
      res.render('upconsult_index.html', {feedback: results });
    });
}); 

// Rota POST para a postagem
app.post('/plataformaEmpresa/feedbacks', (req, res) => {
    const nomefb = req.session.nome 
    const titulofb = req.body.tituloFeedback; 
    const descricaofb  = req.body.descricaoFeedback;
    const classificacaofb = req.body.classificacaoConsultoriaEmpresa;
  
    // Inserção dos dados no banco de dados
    const posts = `INSERT INTO feedbacks (nome, titulo, descricao, classificacao) VALUES ('${nomefb}', '${titulofb}', '${descricaofb}', '${classificacaofb}')`;
  
    connection.query(posts, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os feedback no banco de dados:', err);
        res.status(500).send('Erro ao inserir os feedback no banco de dados');
      } else {
        console.log('Feedback inseridos com sucesso no banco de dados');
        res.redirect('/plataformaEmpresa');
      }
    });
});

// Início do Servidor
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
}); 
