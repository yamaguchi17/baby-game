// ボールタッチ用の効果音を生成する関数
function createBallTouchSound() {
  // Web Audio APIのコンテキストを作成
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // オシレーターを作成（ポップな音）
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // サイン波（丸い音）
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // 高めの音から
  oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.1); // 低い音へ
  
  // ゲインノードを作成（音量制御用）
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  // 接続
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // 再生開始
  oscillator.start();
  // 0.3秒後に停止
  oscillator.stop(audioContext.currentTime + 0.3);
}
