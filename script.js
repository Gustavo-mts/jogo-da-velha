let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
// é a vez do jogador (x ou o)
let player = '';
// mensagem de vitoria/empate
let warning = '';
// se o jogo está valendo
let playing = false;

reset();

// adiciono um evento de click no botãoo reset
document.querySelector('.reset').addEventListener('click', reset);
// seleciono todos os items e adiciono um evento de click neles
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

function itemClick (event) {
    // item recebe  data-item
    let item = event.target.getAttribute('data-item');
    // se o jogo já estiver valendo e o espaço do quadrado estiver vazio
    if(playing && square[item] === '') {
        // o local do square(do quadrado da partida) recebe x ou o
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    // retorna um número aleatório entre 0 e 1.
    let random = Math.floor(Math.random() * 2);
    // se random for 0, terá x, se for 1, terá o
    player = (random === 0) ? 'x' : 'o';

    // todos as posições ficam vazias
    for (let i in square) {
        square[i] = '';
    }

    // jogo valendo
    playing = true;

    renderSquare();
    renderInfo();
}

// percorre o square. Se tiver algo preenchido, coloca no HTML, se não, não adiciona ao HTML
function renderSquare() {
    for(let i in square) {
        // item recebe a posição
        let item = document.querySelector(`div[data-item=${i}]`);
        // inprimimos na posição o valor contido na mesma posição no objeto square
        // a posição já estava ocupada no objeto square, nós apenas imprimimos
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    // imprimos na area 'vez' o valor de player (x ou o)
    document.querySelector('.vez').innerHTML = player;
    // imprimimos em resultado o valor (frase) de warning
    document.querySelector('.resultado').innerHTML = warning;
}

// esta função alterna a vez dos jogadores
function togglePlayer() {
    // se player é x, agora ele será o, se não, será x
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    
    // se a função com o parâmetro 'x' retornar true, quer dizer que x venceu
    if(checkWinnerFor('x')) {
        warning = "O 'x' venceu.";
        // o jogo se encerra
        playing = false;
    } else if (checkWinnerFor('o')) {   // se a função com o parâmetro 'o' retornar true, quer dizer que o venceu
        warning = "O 'o' venceu.";
        // o jogo se encerra
        playing = false;
    } else if (isFull()) {  // se isFull retorna true, quer dizer que deu empate
        warning = "Deu empate";
        // o jogo se encerra
        playing = false;
    }
}

// função de vitória
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        // criamos um array com todas as posições de vitória e separamo-las por ','
        var pArray = pos[w].split(',');
        // se todas as posições do forem iguais a player (estiverem todas ocupadas por um mesmo sinal)
        let hasWon = pArray.every(option => square[option] === player);
        // se a função retornar true para haswon, então há um vencedor
        if(hasWon) {
            return true;
        }
    }
    return false;
}

// função de empate
function isFull() {
    for(let i in square) {
        // se houver algum espaço em branco, retorne false
        if(square[i] ==='') {
            return false
        }
    }

    return true;
}