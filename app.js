(() => {
  const $ = (id) => document.getElementById(id);

  const screens = { welcome: $('welcome'), chat: $('chat') };
  const orb = $('orb');
  const statusEl = $('status');
  const timerEl = $('timer');
  const muteBtn = $('mute');
  const muteLabel = $('mute-label');

  const LABELS = {
    connecting: 'جارٍ الاتصال…',
    listening: 'أستمع إليك…',
    thinking: 'لحظة…',
    speaking: 'أتحدّث معك…',
  };
  const MUTED_LABEL = 'الميكروفون مكتوم';

  let state = 'connecting';
  let muted = false;
  let startedAt = 0;
  let timerId = null;
  let demoId = null;

  function render() {
    orb.dataset.state = state;
    orb.classList.toggle('is-muted', muted);
    statusEl.textContent = muted ? MUTED_LABEL : LABELS[state];
  }

  function setState(next) {
    if (!(next in LABELS)) return;
    state = next;
    render();
  }

  function setMuted(next) {
    muted = next;
    muteBtn.setAttribute('aria-pressed', String(muted));
    muteLabel.textContent = muted ? 'إلغاء الكتم' : 'كتم';
    render();
  }

  function show(name) {
    for (const [key, el] of Object.entries(screens)) el.hidden = key !== name;
  }

  function tick() {
    const secs = Math.floor((Date.now() - startedAt) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    timerEl.textContent = `${mm}:${ss}`;
  }

  // Placeholder: cycles through states so the UI can be previewed
  // until real voice is wired up via window.masaha.setState().
  function runDemo() {
    const steps = [
      ['connecting', 1500],
      ['listening', 5000],
      ['thinking', 1800],
      ['speaking', 4500],
    ];
    let i = 0;
    const next = () => {
      const [name, ms] = steps[i];
      setState(name);
      i = i === steps.length - 1 ? 1 : i + 1;
      demoId = setTimeout(next, ms);
    };
    next();
  }

  function startSession() {
    setMuted(false);
    show('chat');
    startedAt = Date.now();
    tick();
    timerId = setInterval(tick, 1000);
    runDemo();
    muteBtn.focus();
  }

  function endSession() {
    clearInterval(timerId);
    clearTimeout(demoId);
    setState('connecting');
    show('welcome');
    $('start').focus();
  }

  $('start').addEventListener('click', startSession);
  $('end').addEventListener('click', endSession);
  muteBtn.addEventListener('click', () => setMuted(!muted));

  window.masaha = { setState, setMuted };
})();
