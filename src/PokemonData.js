export const extractData = (pokemonData) => {
  const id = pokemonData.id;
  const name = pokemonData.name;
  const img = pokemonData.sprites.front_default;
  const types = [];
  pokemonData.types.forEach((typeItem) => {
    types.push(typeItem.type.name);
  });
  return { id, name, img, types };
};

export const showData = (data) => {
  const htmlData = `
    <dl>
      <dt>Name</dt>
      <dd>${data.name}</dd>
    </dl>
    <img src="${data.img}" alt="${data.name}" class="pokemon-image">
    <dl>
      <dt>Type</dt>
      <dd>${data.types.join(" / ")}</dd>
    </dl>
    <div class="button-container">
      <button class="cry-button" onclick="playPokemonCry(${data.id})">
        <span class="cry-icon">🔊</span> Play Cry
      </button>
    </div>
    <audio id="pokemonCry" src="https://play.pokemonshowdown.com/audio/cries/${data.name.toLowerCase()}.mp3"></audio>
  `;
  document.querySelector("#js-result").innerHTML = htmlData;
};

export const showSuggestions = (pokemonList) => {
  const resultDiv = document.querySelector("#js-result");
  if (pokemonList.length === 0) {
    resultDiv.innerHTML = "<p>No matches found</p>";
    return;
  }

  const suggestions = pokemonList
    .map(
      (pokemon) =>
        `<div class="suggestion-item" data-name="${pokemon.name}">${pokemon.name}</div>`
    )
    .join("");

  resultDiv.innerHTML = `
      <div class="suggestion-list">
        ${suggestions}
      </div>
    `;

  // サジェスチョンクリック時の処理を追加
  document.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", async () => {
      const name = item.dataset.name;
      document.querySelector('input[name="pokeName"]').value = name;
      const pokemonData = await searchPokemonByName(name);
      if (pokemonData) {
        const extractedData = extractData(pokemonData);
        showData(extractedData);
      }
    });
  });
};
