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
    player.createFromSongUrl("http://piapro.jp/t/C0lr/20180328201242"); // サンプル曲
  },
  onVideoReady: () => {
    // 曲の読み込み完了
  },
  onTimerReady: () => {
    // 再生準備完了
    player.requestPlay();
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
  },
});
