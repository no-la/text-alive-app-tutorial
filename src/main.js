import { Player } from "textalive-app-api";

// アプリトークンを読み込み
const TEXT_ALIVE_APP_TOKEN = import.meta.env.VITE_TEXT_ALIVE_APP_TOKEN;
console.log("token : ", TEXT_ALIVE_APP_TOKEN);

// 単語が発声されていたら #text に表示する
const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text").textContent = unit.text;
  }
};

// TextAlive Player を作成
const player = new Player({
  app: { token: TEXT_ALIVE_APP_TOKEN },
  mediaElement: document.querySelector("#media"), // <audio>要素を関連付け
});

// 楽曲が読み込まれたら開始
player.addListener({
  onAppReady: () => {
    if (!player.app.managed) {
      player.createFromSongUrl("https://piapro.jp/t/RoPB/20210213190037"); // サンプル曲
    }
  },
  onVideoReady: () => {
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
  },
});
