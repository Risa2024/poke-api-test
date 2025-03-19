// axiosというライブラリをインポート（Webからデータを取得するための便利なツール）
import axios from 'axios';
// axiosの設定をカスタマイズしたインスタンスを作成
//全てのリクエストに下記のURLを自動的につける。１秒以上応答なければタイムアウト。
//毎回URLをかかなくても済むように設定している
const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
});

export const getPokemonData = async (pokeName) => {
  try {
    // ポケモン名を使ってAPIにリクエストを送信
    // 例：pokeName = "pikachu" なら "https://pokeapi.co/api/v2/pokemon/pikachu" にリクエスト
    const response = await instance.get(pokeName);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Pokemon not found");
  }
};
