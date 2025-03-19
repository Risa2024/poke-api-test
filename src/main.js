import "./style.css";
//import { getPokemonData } from "./HttpRequest.js";
import { searchPokemonByName } from "./HttpRequest.js";
import { extractData, showData } from "./PokemonData.js";

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
