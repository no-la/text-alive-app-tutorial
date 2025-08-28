import { Player } from "textalive-app-api";

// アプリトークンを読み込み
const TEXT_ALIVE_APP_TOKEN = import.meta.env.VITE_TEXT_ALIVE_APP_TOKEN;
console.log("token : ", TEXT_ALIVE_APP_TOKEN);

// 単語が発声されていたら #text に表示する
const animateWord = (now, unit) => {
  if (unit.contains(now)) {
    document.querySelector("#text").textContent = unit.text;
  }
};

const songUrl = () => {
  return (
    document.querySelector("#songUrl").value ||
    "https://www.youtube.com/watch?v=ygY2qObZv24"
  );
};

const run = () => {
  // TextAlive Player を作成
  const player = new Player({
    app: { token: TEXT_ALIVE_APP_TOKEN },
    mediaElement: document.querySelector("#media"), // <audio>要素を関連付け
  });

  const url = songUrl();

  if (!url) {
    alert("楽曲のURLを入力してください");
    return;
  }
  // 楽曲が読み込まれたら開始
  player.addListener({
    onAppReady: () => {
      player.createFromSongUrl(url);
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
};

document.querySelector("button").addEventListener("click", () => {
  run();
});
