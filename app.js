let numerosPossiveis = 20;
let listaNumerosSorteados = [];

// função para chamarmos uma tag do index.html
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTexto("h1", "JOGO DO NÚMERO SECRETO");
    exibirTexto("p", "Escolha um número de 1 a 20");
}
mensagemInicial();

// função para gerar numeros aleatorios de 1 a 100
function gerarNumeroAleato() {
    let numeroEscolhido = parseInt(Math.random() * numerosPossiveis) + 1;
    let qtdeNumerosSorteados = listaNumerosSorteados.length;
    
    if (qtdeNumerosSorteados == numerosPossiveis) {
        listaNumerosSorteados = [];
    }
     if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleato();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

// função limpar campo onde usuario digitou o chute
function limpaCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

// função para reiniciar o jogo do numero secreto
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleato();
    limpaCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

let numeroSecreto = gerarNumeroAleato();
let tentativas = 1;

// função para verificar se o chute é igual ao numero secreto
function verificarChute() {
    let chute = document.querySelector("input").value;
     if (chute == numeroSecreto) {
        exibirTexto("h1", "Você acertou!");
        let palavraTentativas = tentativas > 1? "tentativas" : "tentativa"; // para a gramatica do jogo
        let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`);
        exibirTexto("p", mensagemTentativas); // html nao entende template de string.
        document.getElementById("reiniciar").removeAttribute("disabled"); // para ativar o botão novo jogo
    } else {
        if (chute > numeroSecreto) {
            exibirTexto("p", "O número secreto é menor");
        } else {
            exibirTexto("p", "O número secreto é maior");
        }
        tentativas++;
        limpaCampo();
    }
}