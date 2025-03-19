// axiosというライブラリをインポート（Webからデータを取得するための便利なツール）
import axios from "axios";
// axiosの設定をカスタマイズしたインスタンスを作成
//全てのリクエストに下記のURLを自動的につける。１秒以上応答なければタイムアウト。
//毎回URLをかかなくても済むように設定している
const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
  timeout: 1000,
});

//export const getPokemonData = async (pokeName) => {
  //try {
    // ポケモン名を使ってAPIにリクエストを送信
    // 例：pokeName = "pikachu" なら "https://pokeapi.co/api/v2/pokemon/pikachu" にリクエスト
    //const response = await instance.get(pokeName);
    //return response.data;
  //} catch (error) {
    //console.error(error);
    //alert("Pokemon not found");
  //}

// 全ポケモンの一覧を取得（名前とURLだけ）
const getAllPokemonList = async () => {
    try {
        const response = await instance.get("?limit=1000");
        return response.data.results; // 配列：[{ name: "bulbasaur", url: "..." }, ...]
      } catch (error) {
        console.error("ポケモン一覧の取得に失敗しました:", error);
        throw error;
      }
    };

    // 部分一致でポケモンを検索
    export const searchPokemonByName = async (searchText) => {
      try {
        const allPokemon = await getAllPokemonList();
        const matched = allPokemon.filter(pokemon =>
          pokemon.name.includes(searchText.toLowerCase())
        );

        if (matched.length === 0) {
          alert("ポケモンが見つかりません");
          return null;
        }

        // 複数見つかった場合、最初の1匹の詳細を取得
        const detailResponse = await axios.get(matched[0].url);
        return detailResponse.data;
      } catch (error) {

        console.error("検索エラー:", error);
        alert("検索中にエラーが発生しました");
      }



};
