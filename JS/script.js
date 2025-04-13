const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const placarX = document.getElementById("placar-x");
const placarO = document.getElementById("placar-o");
const botaoReiniciar = document.getElementById("reiniciar");

let jogador = "X";
let jogo = ["", "", "", "", "", "", "", "", ""];
let vitorias = { X: 0, O: 0 };

function verificarVencedor() {
  const combinacoes = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
  ];

  for (let combinacao of combinacoes) {
    const [a, b, c] = combinacao;
    if (jogo[a] && jogo[a] === jogo[b] && jogo[b] === jogo[c]) {
      mensagem.textContent = `Jogador ${jogo[a]} venceu!`;
      vitorias[jogo[a]]++;
      atualizarPlacar();
      return true;
    }
  }

  if (!jogo.includes("")) {
    mensagem.textContent = "Empate!";
    return true;
  }

  return false;
}

function jogar(i) {
  if (jogo[i] || mensagem.textContent !== "") return;
  jogo[i] = jogador;
  renderizar();
  if (!verificarVencedor()) {
    jogador = jogador === "X" ? "O" : "X";
  }
}

function renderizar() {
  tabuleiro.innerHTML = "";
  jogo.forEach((valor, i) => {
    const celula = document.createElement("div");
    celula.className = "celula";
    celula.textContent = valor;
    celula.onclick = () => jogar(i);
    tabuleiro.appendChild(celula);
  });
}

function atualizarPlacar() {
  placarX.textContent = vitorias["X"];
  placarO.textContent = vitorias["O"];
}

function reiniciarJogo() {
  jogo = ["", "", "", "", "", "", "", "", ""];
  mensagem.textContent = "";
  jogador = "X";
  renderizar();
}

botaoReiniciar.onclick = reiniciarJogo;

renderizar();
atualizarPlacar();