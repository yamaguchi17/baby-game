// BGM用のポップでメルヘンなループ音楽を生成する関数
function createBGM() {
  // Web Audio APIのコンテキストを作成
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // BGMの再生状態を管理
  let isPlaying = false;
  let mainOscillator = null;
  let melodyOscillator = null;
  let mainGain = null;
  let melodyGain = null;
  
  // BGMを開始する関数
  function startBGM() {
    if (isPlaying) return;
    isPlaying = true;

    // iOS対応: ユーザー操作時にresume
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }    
    
    // メインの和音（ベース）
    mainOscillator = audioContext.createOscillator();
    mainOscillator.type = 'sine';
    mainOscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
    
    mainGain = audioContext.createGain();
    mainGain.gain.setValueAtTime(0.2, audioContext.currentTime);
    
    mainOscillator.connect(mainGain);
    mainGain.connect(audioContext.destination);
    
    // メロディー部分
    melodyOscillator = audioContext.createOscillator();
    melodyOscillator.type = 'triangle';
    
    melodyGain = audioContext.createGain();
    melodyGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    melodyOscillator.connect(melodyGain);
    melodyGain.connect(audioContext.destination);
    
    // 開始
    mainOscillator.start();
    melodyOscillator.start();
    
    // シンプルなメロディーパターン
    const notes = [330, 392, 440, 392, 330, 294, 330, 392];
    let noteIndex = 0;
    
    // メロディーを定期的に変更
    function playNextNote() {
      if (!isPlaying) return;
      
      const note = notes[noteIndex];
      melodyOscillator.frequency.setValueAtTime(note, audioContext.currentTime);
      
      // 音量を変化させてリズム感を出す
      melodyGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      melodyGain.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.3);
      
      noteIndex = (noteIndex + 1) % notes.length;
      
      // 次の音符へ
      setTimeout(playNextNote, 500);
    }
    
    // メロディー開始
    playNextNote();
  }
  
  // BGMを停止する関数
  function stopBGM() {
    if (!isPlaying) return;
    
    // フェードアウト
    if (mainGain && melodyGain) {
      mainGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
      melodyGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
      
      setTimeout(() => {
        if (mainOscillator) {
          mainOscillator.stop();
          mainOscillator = null;
        }
        if (melodyOscillator) {
          melodyOscillator.stop();
          melodyOscillator = null;
        }
        mainGain = null;
        melodyGain = null;
        isPlaying = false;
      }, 1000);
    }
  }
  
  // 制御用のオブジェクトを返す
  return {
    start: startBGM,
    stop: stopBGM,
    isPlaying: () => isPlaying
  };
}
