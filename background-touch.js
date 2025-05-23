// 背景タッチ用のシャラシャラ・キラキラ効果音を生成する関数
function createBackgroundTouchSound() {
  // Web Audio APIのコンテキストを作成
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // 複数の音を組み合わせてキラキラ感を出す
  for (let i = 0; i < 8; i++) {
    // 少しずつ遅延させて再生
    setTimeout(() => {
      // オシレーターを作成
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'triangle'; // 三角波（キラキラした音）
      
      // ランダムな高い周波数（キラキラ感）
      const randomFreq = 2000 + Math.random() * 3000;
      oscillator.frequency.setValueAtTime(randomFreq, audioContext.currentTime);
      
      // ゲインノードを作成（音量制御用）
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 小さめの音量
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      // 接続
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 再生開始
      oscillator.start();
      // 短い時間で停止
      oscillator.stop(audioContext.currentTime + 0.3);
    }, i * 50); // 少しずつ遅延
  }
}
