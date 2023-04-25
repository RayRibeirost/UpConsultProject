/* Lista de funcionalidades


    1 - Consultor

        1.0 - Botão home
            Faz com que qualquer coisa que esteja no lado direito da tela desapareça
        1.1 - Botão mensagens    
            Faz com que apareça as mensagens de retorno da empresa, depois de aceitar ou pedir para analisar proposta de solução
        1.2 - Botão agenda
            Faz aparecer a agenda do consultor
        1.3 - Botão notificações
            Aqui aparecem as notificações gerais, desde mensagens diretas de outros consultores até feedback de empresas que ele atendeu
        1.4 - Botão atendimento
            Em primeiro caso, aparece a agenda do consultor, mas se ele estiver em atendimento, vai para a chamada, caso ele tenha saído da tela de bate-papo ao vivo
        1.5 - Botão criar feed
            Aciona o formulário de feed
        1.6 - Botão responder feed
            Aciona o formulário de solução
        1.7 - Botão ignorar
            Faz com que o card de feed desepareça dando espaço a outro
        1.8 - Botão aceitar parceria
            Faz aparecer formulário de resposta a outros consultores
        1.9 - Botão Enviar proposta 
            Faz com que apareça a notificação de envio, caso esteja tudo certo e faz o formulário desaparecer
        1.10 - Botão mensagem na agenda
            Faz com que apareça o bate-papo apenas em mensagem
        1.11 - Botão chamada na agenda
            Faz com que se inicie uma chamada de vídeo e texto
        1.12 - Botão cancelamento de atendimento
            Faz com que apareça o formulário de cancelamento para ser enviado para empresa
        1.13 - Botão de publicação de feedback
            Faz com que uma mensagem apareça de que o feedback foi publicado no perfil

    

    2 - Empresa



*/

/* BOTÕES CONSULTOR */

let botaoHome = document.getElementById("menuHome")
let botaoMensagensConsultor = document.getElementById("menu-principal-mensagens")
let botaoAgendaConsultor = document.getElementById("menu-principal-agenda")
let botaoNotificacoesConsultor = document.getElementById("menu-principal-notificacoes")
let botaoAtendimentoConsultor = document.getElementsByClassName("info-principais-card-atendimento-consultor")
let botaoCriarFeedConsultor = document.getElementsByClassName("info-principais-criar-feed-consultor")
let botaoResponderSolicitacaoConsultor = document.getElementsByClassName("feed-botao-responder-consultor")
let botaoIgrorarSolicitacaoConsultor = document.getElementsByClassName("feed-botao-ignorar-consultor")
let botaoAceitarParceriaConsultor = document.getElementsByClassName("comunidade-card-botao-parceria")
let botaoEnviarPropostaSolucaoConsultor = document.getElementById("responder-solicitacao-consultor")
let botaoAgendaMensagemConsultor = document.getElementsByClassName("agenda-consultor-icone-mensagem")
let botaoAgendaChamadaConsultor = document.getElementsByClassName("agenda-consultor-icone-ligacao")
let botãoAgendaCancelarConsultor = document.getElementsByClassName("agenda-consultor-icone-cancelamento")
let botaoPublicarFeedbackConsultor = document.getElementsByClassName("feedback-consultor-botao-publicar")

/* Lado direito Consultor */



let formularioRespostaSolicitacaoConsultor = document.getElementById("formPropostaConsultor")
let agendaConsultor = document.getElementById("agenda-consultor")
let feedbackConsultor = document.getElementById("feedbacks-notificacoes-consultor")
let chamadaConsultor = document.getElementById("atendimento-consultor")
let chamadaEmpresa = document.getElementById("atendimento-empresa")

/* Funções Consultor */

botaoHome.addEventListener("click", function() {

    formularioRespostaSolicitacaoConsultor.style.visibility = "hidden"
    agendaConsultor.style.display = "none"
    feedbackConsultor.style.display= "none"
    
})

