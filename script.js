quantidade_maxima_pokemons = 898;
fator = 54;

quantidade_de_botoes = quantidade_maxima_pokemons / fator;
quantidade_de_botoes = parseInt(quantidade_de_botoes) + 1;

//gera botões
for (i = 0; i < quantidade_de_botoes; i++) {
  a = i * fator;
  b = i * fator + fator;

  if (a == 0) a = 1;

  botoes_paginacao.innerHTML += `<button onclick="paginacao(${a},${b})" class="btn btn-danger m-1">${
    i + 1
  }</button>`;
}

//cria pokeons

function paginacao(n1, n2) {
  pokemons_div.innerHTML = "";
  console.log(n2);

  for (i = n1; i <= n2; i++) {
    if (i <= quantidade_maxima_pokemons) {
      pokemons_div.innerHTML += `<img onclick="pegar(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png">`;
    }
  }
}

paginacao(1, 55);

// promis
link = "https://pokeapi.co/api/v2/pokemon/3";

async function pegar(n) {
  url = "https://pokeapi.co/api/v2/pokemon/" + n;
  texto = await fetch(url);
  json = await texto.json();
  informacoes_pokemon = json;

  nome_pokemon.innerHTML = informacoes_pokemon.name;

  //cria imagens
  sprites = [];
  Object.values(informacoes_pokemon.sprites)
    .join(" ")
    .split(" ")
    .map((e) => {
      if (e.match(/png/g)) sprites.push(e);
    });

  //cria desc
  moves = [];
  for (i of informacoes_pokemon.moves) moves.push(i.move.name);

  conteudo_pokemon.innerHTML = "";
  textos = moves.join(", ");

  imagens = [];
  sprites.map((e) => imagens.push(`<img src='${e}'>`));
  imagens = imagens.join("");

  conteudo_pokemon.innerHTML = imagens + "<br>" + textos;
}

pegar(3);
