import "./style.css";
//import { getPokemonData } from "./HttpRequest.js";
import { searchPokemonByName, getAllPokemonList } from "./HttpRequest.js";
import { extractData, showData, showSuggestions } from "./PokemonData.js";

// グローバルスコープで関数を定義
window.playPokemonCry = function (id) {
  const audio = document.getElementById("pokemonCry");
  audio.play().catch((error) => {
    console.log("Error playing cry:", error);
  });
};

// フォームから入力されたポケモン名を取得する関数
const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
};

const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  const pokemonData = await searchPokemonByName(inputName);
  if (pokemonData) {
    const extractedData = extractData(pokemonData);
    showData(extractedData);
  }
};

// フォーム送信時の処理を行う関数
//const submitHandler = async (e) => {
//e.preventDefault(); // ページのリロードを防止
//const inputName = getInputName(e);
//const pokemonData = await getPokemonData(inputName);
//const extractedData = extractData(pokemonData);
//showData(extractedData);
//};

// フォームにイベントリスナーを設定
document
  .querySelector("#js-form")
  .addEventListener("submit", (e) => submitHandler(e));

// 入力時の処理を追加
document
  .querySelector('input[name="pokeName"]')
  .addEventListener("input", async (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length < 1) return; // 1文字から検索開始に変更

    const allPokemon = await getAllPokemonList();
    const matches = allPokemon
      .filter(
        (pokemon) => pokemon.name.startsWith(searchText) // includesをstartsWithに変更
      )
      .slice(0, 5); // 最大5件表示

    showSuggestions(matches);
  });
