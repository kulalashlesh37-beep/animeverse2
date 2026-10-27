
/* ==========================================================================
   COOL FEATURE: WEB AUDIO API SYNTHESIZER FX
   Zero audio files required. Uses native Web Audio API oscillators.
   ========================================================================== */
const SoundFX = {
  enabled: true,
  audioCtx: null,

  init() {
    try {
      const stored = localStorage.getItem('animeverse_sound_fx');
      this.enabled = stored !== null ? stored === 'true' : true;
    } catch(e) {}
  },

  getContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  playHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch(e) {}
  },

  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch(e) {}
  },

  playLaser() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
  },

  playPowerUp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch(e) {}
  },

  toggle() {
    this.enabled = !this.enabled;
    try { localStorage.setItem('animeverse_sound_fx', this.enabled); } catch(e) {}
    if (this.enabled) this.playPowerUp();
    return this.enabled;
  }
};
SoundFX.init();


/* ==========================================================================
   COOL FEATURE: AMBIENT CYBERPUNK STARDUST PARTICLES CANVAS
   ========================================================================== */
function initAmbientParticles() {
  if (document.querySelector('#ambient-particles-canvas')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.display = 'block';
  canvas.style.opacity = '0.65';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ['rgba(168, 85, 247, 0.6)', 'rgba(124, 58, 237, 0.5)', 'rgba(6, 182, 212, 0.5)', 'rgba(236, 72, 153, 0.4)'];
  const particles = [];
  const total = Math.min(45, Math.floor(width / 35));

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.15),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   COOL FEATURE: QUICK PREVIEW EDITORIAL MODAL
   ========================================================================== */
function initQuickPreviewModal() {
  if (document.querySelector('.quick-preview-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'quick-preview-modal-overlay';
  overlay.innerHTML = `
    <div class="quick-preview-modal">
      <button class="modal-close-btn" aria-label="Close Preview">✕</button>
      <div style="display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); min-height: 400px;" class="modal-inner-grid">
        <div style="position: relative; overflow: hidden; background: #000;">
          <img id="modal-banner-img" src="" alt="Backdrop" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(90deg, transparent 40%, #12121B 100%), linear-gradient(180deg, transparent 60%, #12121B 100%);"></div>
          <span id="modal-badge-tag" class="badge badge-featured" style="position: absolute; top: 15px; left: 15px;">FEATURED</span>
        </div>
        <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-card);">
          <div>
            <div id="modal-jp" style="font-family: var(--font-jp); font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.35rem;"></div>
            <h3 id="modal-title" style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 900; color: #FFFFFF; line-height: 1.2; margin-bottom: 0.5rem;"></h3>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.85rem; flex-wrap: wrap;">
              <span id="modal-rating" class="badge badge-rating">★ 4.9</span>
              <span id="modal-year" class="badge badge-year">2024</span>
              <span id="modal-episodes" class="badge badge-genre">12 Episodes</span>
            </div>
            <p id="modal-desc" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;"></p>
          </div>
          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
            <a id="modal-crunchyroll-btn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Watch on Crunchyroll ↗</a>
            <a id="modal-details-btn" href="#" class="btn btn-secondary btn-sm">Full Details</a>
            <button id="modal-wl-btn" class="btn btn-secondary btn-sm">+ Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.modal-close-btn');
  closeBtn.onclick = () => {
    SoundFX.playClick();
    overlay.classList.remove('open');
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      SoundFX.playClick();
      overlay.classList.remove('open');
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
    }
  });
}

function openQuickPreview(animeId) {
  const anime = ANIME_DATABASE.find(a => a.id === animeId);
  if (!anime) return;

  SoundFX.playLaser();
  const overlay = document.querySelector('.quick-preview-modal-overlay');
  if (!overlay) return;

  const banner = overlay.querySelector('#modal-banner-img');
  const tag = overlay.querySelector('#modal-badge-tag');
  const jp = overlay.querySelector('#modal-jp');
  const title = overlay.querySelector('#modal-title');
  const rating = overlay.querySelector('#modal-rating');
  const year = overlay.querySelector('#modal-year');
  const ep = overlay.querySelector('#modal-episodes');
  const desc = overlay.querySelector('#modal-desc');
  const crBtn = overlay.querySelector('#modal-crunchyroll-btn');
  const dtBtn = overlay.querySelector('#modal-details-btn');
  const wlBtn = overlay.querySelector('#modal-wl-btn');

  if (banner) banner.src = anime.banner || anime.poster;
  if (tag) tag.textContent = anime.isMovie ? 'THEATRICAL FILM' : anime.trend;
  if (jp) jp.textContent = anime.japaneseTitle;
  if (title) title.textContent = anime.title;
  if (rating) rating.textContent = `★ ${anime.rating}`;
  if (year) year.textContent = `${anime.year}`;
  if (ep) ep.textContent = anime.isMovie ? anime.duration : `${anime.episodes} Episodes`;
  if (desc) desc.textContent = anime.synopsis;

  if (crBtn) crBtn.href = getCrunchyrollUrl(anime.title);
  if (dtBtn) dtBtn.href = `anime-details.html?id=${anime.id}`;
  
  if (wlBtn) {
    function syncModalWl() {
      const saved = WatchlistStore.has(anime.id);
      wlBtn.textContent = saved ? '✓ In Watchlist' : '+ Watchlist';
    }
    syncModalWl();
    wlBtn.onclick = () => {
      SoundFX.playClick();
      WatchlistStore.toggle(anime.id);
      syncModalWl();
    };
  }

  overlay.classList.add('open');
}

/**
 * ANIMEVERSE — PREMIUM ANIME DISCOVERY & WATCH WEBSITE
 * Shared Master JavaScript
 * Handles Catalog Database, Web Image Assets, Watchlist (localStorage),
 * Navigation, Search, Dynamic Page Rendering, and Community Integrations.
 */

/* ==========================================================================
   1. ANIME DATABASE WITH WEB IMAGES
   ========================================================================== */
const ANIME_DATABASE = [
  {
    id: 'black-clover',
    title: 'Black Clover',
    japaneseTitle: 'ブラッククローバー',
    romajiTitle: 'Burakku Kurōbā',
    synopsis: 'In a world where magic is everything, Asta is born without an ounce of magical energy. Unyielding in the face of despair, he trains his physical body to its absolute limits. Upon turning fifteen, he receives a mysterious five-leaf grimoire housing an ancient anti-magic demon sword. Joined by his genius foster brother Yuno, Asta vows to shatter all destinies and become the next Wizard King.',
    rating: 8.15,
    ratingSource: 'MyAnimeList (8.15/10) • Crunchyroll (4.8/5)',
    year: 2017,
    endYear: 2021,
    season: 'Fall 2017',
    status: 'Finished Airing',
    episodes: 170,
    duration: '24 min per ep',
    studio: 'Studio Pierrot',
    source: 'Manga by Yūki Tabata',
    genres: ['Action', 'Adventure', 'Fantasy', 'Comedy'],
    rank: 4,
    views: '48.2M',
    trend: '+2 HOT',
    poster: 'assets/images/web/black-clover.jpg',
    banner: 'assets/images/banners/black-clover-banner.svg',
    trailerId: 'pr0f85j3',
    featured: true,
    spotlight: true,
    airDay: 'Tuesday',
    airTime: '18:25 JST',
    characters: [
      { name: 'Asta', jp: 'アスタ', role: 'Main Protagonist', va: 'Gakuto Kajiwara', ability: 'Anti-Magic & Demon-Slayer Swords', image: 'assets/images/web/char-asta.jpg', bio: 'A loud, energetic orphan who possesses zero magic power but wields immense physical prowess and an Anti-Magic five-leaf grimoire.' },
      { name: 'Yuno Grinberryall', jp: 'ユノ', role: 'Main Rival', va: 'Nobunaga Shimazaki', ability: 'Wind Magic & Sylph Spirit Dive', image: 'assets/images/web/char-yuno.jpg', bio: 'A calm prodigy who wields the legendary four-leaf clover grimoire and commands the wind spirit Sylph.' },
      { name: 'Noelle Silva', jp: 'ノエル・シルヴァ', role: 'Main Heroine', va: 'Kana Yūki', ability: 'Water Creation Magic (Valkyrie Armor)', image: 'assets/images/web/char-noelle.jpg', bio: 'A royal from House Silva who overcomes severe magic control issues to become one of the Black Bulls’ fiercest fighters.' },
      { name: 'Yami Sukehiro', jp: 'ヤミ・スケヒロ', role: 'Black Bulls Captain', va: 'Junichi Suwabe', ability: 'Dark Magic & Katana Swordsmanship', image: 'assets/images/web/char-yami.jpg', bio: 'The formidable captain of the Black Bulls who constantly tells his squad to "surpass their limits right here, right now."' }
    ],
    episodesList: [
      { ep: 1, title: 'Asta and Yuno', duration: '23:45', airDate: 'Oct 3, 2017', desc: 'Asta and Yuno are abandoned at a church on the same day. As they grow up, Yuno shows prodigious magical aptitude while Asta shows none.' },
      { ep: 2, title: 'A Young Man’s Vow', duration: '23:40', airDate: 'Oct 10, 2017', desc: 'At the Grimoire Acceptance Ceremony, Yuno receives a four-leaf clover grimoire. When a former Magic Knight attacks Yuno, Asta awakens the five-leaf grimoire.' },
      { ep: 3, title: 'To the Royal Capital!', duration: '23:50', airDate: 'Oct 17, 2017', desc: 'After six months of intensive training, Asta and Yuno head to the Royal Capital to participate in the Magic Knights Entrance Exam.' },
      { ep: 4, title: 'The Magic Knights Entrance Exam', duration: '23:42', airDate: 'Oct 24, 2017', desc: 'The Magic Knights Squad Captains watch over thousands of candidates. While Yuno impresses every squad captain, Asta must battle with his blade.' },
      { ep: 49, title: 'Beyond Limits', duration: '23:45', airDate: 'Sep 11, 2018', desc: 'Yami steps into the battle against Vetto of the Eye of the Midnight Sun, unveiling his devastating Dark Magic: Dimension Slash.' },
      { ep: 167, title: 'Black Oath', duration: '23:55', airDate: 'Mar 16, 2021', desc: 'Asta faces his inner devil Liebe in the Devil-Binding Ritual, striving to forge an equal contract to protect his comrades.' }
    ]
  },
  {
    id: 'black-clover-season-2',
    title: 'Black Clover: Season 2 (Spade Kingdom Raid Arc)',
    japaneseTitle: 'ブラッククローバー 第2期 (スペード王国攻略編)',
    romajiTitle: 'Burakku Kurōbā Season 2: Spade Oukoku Hen',
    synopsis: 'Following the abduction of Captain Yami and William Vangeance by the Dark Triad, the Magic Knights forge an alliance with the Heart Kingdom. Asta masters Devil Union with Liebe, Yuno unlocks his royal Star Magic, and the Clover Kingdom launches an all-out assault into the Spade Kingdom to prevent the release of the Supreme Devils of Qliphoth.',
    rating: 9.15,
    ratingSource: 'Weekly Shonen Jump • Crunchyroll Anticipation (4.95/5)',
    year: 2024,
    endYear: 2025,
    season: 'Fall 2024',
    status: 'Currently Airing / Simulcast',
    episodes: 24,
    duration: '24 min per ep',
    studio: 'Studio Pierrot',
    source: 'Manga by Yūki Tabata',
    genres: ['Action', 'Adventure', 'Fantasy', 'Shonen', 'Supernatural'],
    rank: 1,
    views: '54.1M',
    trend: 'SEASON 2 PREMIERE',
    poster: 'assets/images/web/black-clover-season-2.jpg',
    banner: 'assets/images/banners/black-clover-season-2-banner.jpg',
    trailerId: 'bc2_trailer',
    featured: true,
    spotlight: true,
    isMovie: false,
    airDay: 'Tuesday',
    airTime: '18:25 JST',
    characters: [
      { name: 'Asta (Devil Union)', jp: 'アスタ (悪魔同化)', role: 'Anti-Magic Devil Host', va: 'Gakuto Kajiwara', ability: 'Devil Union Mode & Demon-Slasher Katana', image: 'assets/images/web/char-asta.jpg', bio: 'Having formed an equal pact with Liebe, Asta reaches full Devil Union to nullify high-ranking devil sorcery.' },
      { name: 'Yuno Grinberryall', jp: 'ユノ (星魔法覚醒)', role: 'Spade Prince & Golden Dawn VC', va: 'Nobunaga Shimazaki', ability: 'Star Magic & Wind Spirit Boreas', image: 'assets/images/web/char-yuno.jpg', bio: 'Awakening his ancestral royal Star Magic grimoire, Yuno wields celestial constellations against Zenon.' },
      { name: 'Noelle Silva', jp: 'ノエル (聖域の舞)', role: 'Saint Valkyrie Royal', va: 'Kana Yūki', ability: 'Saint Valkyrie Dress & Sea Dragon', image: 'assets/images/web/char-noelle.jpg', bio: 'Bonded with the Water Spirit Undine, Noelle achieves Saint Stage purification to confront Megicula.' },
      { name: 'Nacht Faust', jp: 'ナハト・ファウスト', role: 'Black Bulls Vice-Captain', va: 'Hiro Shimono', ability: 'Shadow Magic & Four Devil Unions', image: 'assets/images/web/char-nacht.jpg', bio: 'The shadow infiltrator of the Spade Kingdom who coordinates the invasion against the Dark Triad.' },
      { name: 'Yami Sukehiro', jp: 'ヤミ・スケヒロ', role: 'Black Bulls Captain', va: 'Junichi Suwabe', ability: 'Dark Magic & Dimension Slash', image: 'assets/images/web/char-yami.jpg', bio: 'Held captive as a catalyst for the Qliphoth channel, his unbreakable will inspires the Magic Knights.' }
    ],
    episodesList: [
      { ep: 171, title: 'The Spade Kingdom Assault Begins', duration: '23:50', airDate: 'Oct 2024', desc: 'The elite infiltration squad penetrates the demonic defensive barrier surrounding the Spade Kingdom capital.' },
      { ep: 172, title: 'Devil Union: Asta and Liebe', duration: '24:00', airDate: 'Oct 2024', desc: 'Asta arrives at the royal citadel in complete Devil Union, slicing through the first wave of underworld abominations.' },
      { ep: 173, title: 'The Saint-Stage Valkyrie', duration: '23:45', airDate: 'Nov 2024', desc: 'Noelle unleashes the Saint Valkyrie Dress with Undine, avenging her mother against the Supreme Devil Megicula.' },
      { ep: 174, title: 'Star Magic vs Sun Magic', duration: '24:10', airDate: 'Nov 2024', desc: 'Yuno reveals his dual-grimoire heritage, summoning celestial Star Magic conjunctions in the throne room.' },
      { ep: 175, title: 'Supreme Devil Lucifero Awakens', duration: '24:15', airDate: 'Nov 2024', desc: 'The lowest gate of Qliphoth begins to open as the supreme sovereign of gravity manifests.' }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    japaneseTitle: '俺だけレベルアップな件',
    romajiTitle: 'Ore dake Level Up na Ken',
    synopsis: 'In a world where mysterious dimensional gates connect reality with monster dungeons, superhuman hunters defend mankind. Known universally as "the Weakest Hunter of All Mankind", E-Rank Hunter Sung Jinwoo is fatally trapped in a deadly double dungeon. Surviving on the brink of death, he unlocks a mysterious quest interface that grants him the unique ability to infinitely level up alone.',
    rating: 8.85,
    ratingSource: 'MyAnimeList (8.85/10) • Crunchyroll (4.9/5)',
    year: 2024,
    endYear: 2024,
    season: 'Winter 2024',
    status: 'Currently Airing',
    episodes: 24,
    duration: '24 min per ep',
    studio: 'A-1 Pictures',
    source: 'Korean Webtoon by Chugong & DUBU',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rank: 1,
    views: '64.1M',
    trend: '★ #1 AIRING',
    poster: 'assets/images/web/solo-leveling.jpg',
    banner: 'assets/images/hero-solo-leveling.jpg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '00:00 JST',
    characters: [
      { name: 'Sung Jinwoo', jp: 'ソン・ジヌ', role: 'Main Protagonist', va: 'Taito Ban', ability: 'Shadow Monarch (Ruler of the Dead)', image: 'assets/images/web/char-jinwoo.jpg', bio: 'The weakest hunter who undergoes a mysterious awakening, transforming into the all-powerful Monarch of Shadows.' }
    ],
    episodesList: [
      { ep: 1, title: 'I’m Used to It', duration: '23:45', airDate: 'Jan 7, 2024', desc: 'E-Rank Hunter Sung Jinwoo joins a low-level raid party inside a D-Rank dungeon, only to discover a hidden passage to a deadly C-Rank lair.' },
      { ep: 2, title: 'If I Had One More Chance', duration: '23:50', airDate: 'Jan 14, 2024', desc: 'Trapped inside the Temple of Cartenon, Jinwoo deciphers the God Statue commandments while teammates perish around him.' },
      { ep: 12, title: 'Arise', duration: '24:10', airDate: 'Mar 31, 2024', desc: 'Jinwoo battles the blood-red Commander Igris and completes his Job Quest, unlocking the legendary Necromancy skill: Shadow Extraction.' }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    japaneseTitle: '鬼滅の刃',
    romajiTitle: 'Kimetsu no Yaiba',
    synopsis: 'During Japan’s Taisho Era, Tanjiro Kamado lives a peaceful life selling charcoal until a vicious demon slaughters his entire family. His younger sister Nezuko survives as the sole survivor, but is cursed into a bloodthirsty demon. Tanjiro embarks on a perilous journey to join the Demon Slayer Corps, master the ancient Sun Breathing sword techniques, and slay the demon progenitor Kibutsuji Muzan.',
    rating: 8.79,
    ratingSource: 'MyAnimeList (8.79/10) • Crunchyroll (4.9/5)',
    year: 2019,
    endYear: 2024,
    season: 'Spring 2019',
    status: 'Currently Airing',
    episodes: 63,
    duration: '24 min per ep',
    studio: 'ufotable',
    source: 'Manga by Koyoharu Gotouge',
    genres: ['Action', 'Fantasy', 'Historical', 'Supernatural'],
    rank: 2,
    views: '58.7M',
    trend: 'HOT',
    poster: 'assets/images/web/demon-slayer.jpg',
    banner: 'assets/images/banners/demon-slayer-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '23:15 JST',
    characters: [
      { name: 'Tanjiro Kamado', jp: '竈門炭治郎', role: 'Demon Slayer', va: 'Natsuki Hanae', ability: 'Water Breathing & Hinokami Kagura', image: 'assets/images/web/char-tanjiro.jpg', bio: 'A kind-hearted youth with an acute sense of smell who fights tirelessly to turn his demon sister back into a human.' }
    ],
    episodesList: [
      { ep: 1, title: 'Cruelty', duration: '23:40', airDate: 'Apr 6, 2019', desc: 'Tanjiro returns home to find his family slaughtered. When Nezuko transforms into a demon, water Hashira Giyu Tomioka arrives.' },
      { ep: 19, title: 'Hinokami', duration: '24:00', airDate: 'Aug 10, 2019', desc: 'Cornered by Lower Moon Five Rui on Mt. Natagumo, Tanjiro recalls his father’s fire dance and combines it with Nezuko’s blood art.' }
    ]
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    japaneseTitle: '呪術廻戦',
    romajiTitle: 'Jujutsu Kaisen',
    synopsis: 'Negative human emotions manifest into horrifying Cursed Spirits that haunt daily society. High school athlete Yuji Itadori swallows a dried, decaying finger to protect his schoolmates, inadvertently resurrecting Ryomen Sukuna, the undisputed King of Curses. Guided by modern sorcery titan Satoru Gojo, Yuji enters Tokyo Jujutsu High to track down Sukuna’s remaining fingers and bear a noble death.',
    rating: 8.82,
    ratingSource: 'MyAnimeList (8.82/10) • Crunchyroll (4.8/5)',
    year: 2020,
    endYear: 2023,
    season: 'Fall 2020',
    status: 'Finished Airing',
    episodes: 47,
    duration: '24 min per ep',
    studio: 'MAPPA',
    source: 'Manga by Gege Akutami',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    rank: 3,
    views: '54.9M',
    trend: '+1',
    poster: 'assets/images/web/jujutsu-kaisen.jpg',
    banner: 'assets/images/character-sukuna.jpg',
    featured: true,
    spotlight: false,
    airDay: 'Thursday',
    airTime: '23:56 JST',
    characters: [
      { name: 'Ryomen Sukuna', jp: '宿儺', role: 'King of Curses', va: 'Junichi Suwabe', ability: 'Dismantle, Cleave & Malevolent Shrine', image: 'assets/images/web/char-sukuna.jpg', bio: 'The supreme calamity of the Golden Age of Sorcery who reigns over cursed energy with absolute malice and dominance.' },
      { name: 'Satoru Gojo', jp: '五条悟', role: 'Special Grade Sorcerer', va: 'Yuichi Nakamura', ability: 'Limitless & Six Eyes (Infinite Void)', image: 'assets/images/web/char-gojo.jpg', bio: 'The strongest sorcerer alive whose birth shifted the balance of the world.' }
    ],
    episodesList: [
      { ep: 1, title: 'Ryomen Sukuna', duration: '23:45', airDate: 'Oct 3, 2020', desc: 'Yuji Itadori’s occult club accidentally unseals a Special Grade cursed talisman, attracting deadly curses to Sugisawa High.' },
      { ep: 20, title: 'Nonstandard', duration: '23:55', airDate: 'Feb 27, 2021', desc: 'Satoru Gojo dispels the curtain over the Goodwill Event and unleashes Hollow Purple against the special grade curse Hanami.' }
    ]
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    japaneseTitle: '進撃の巨人',
    romajiTitle: 'Shingeki no Kyojin',
    synopsis: 'Centuries ago, mankind was forced behind three concentric 50-meter stone walls to escape towering humanoid behemoths known as Titans. When the Colossal Titan shatters Wall Maria, young Eren Yeager watches his mother get devoured. Consumed by vengeance, Eren enlists in the Scout Regiment, unaware that the dark truths of Eldia and Marley will reshape the fate of the entire world.',
    rating: 9.04,
    ratingSource: 'MyAnimeList (9.04/10) • Crunchyroll (4.9/5)',
    year: 2013,
    endYear: 2023,
    season: 'Spring 2013',
    status: 'Finished Airing',
    episodes: 89,
    duration: '24 min per ep',
    studio: 'Wit Studio & MAPPA',
    source: 'Manga by Hajime Isayama',
    genres: ['Action', 'Military', 'Mystery', 'Drama'],
    rank: 5,
    views: '72.3M',
    trend: 'LEGEND',
    poster: 'assets/images/web/attack-on-titan.jpg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '24:10 JST',
    characters: [
      { name: 'Levi Ackerman', jp: 'リヴァイ・アッカーマン', role: 'Scout Regiment Captain', va: 'Hiroshi Kamiya', ability: 'Humanity’s Strongest Soldier', image: 'assets/images/web/char-levi.jpg', bio: 'A tactical prodigy and lethal bladesman capable of dismantling titan hordes in seconds.' }
    ],
    episodesList: [
      { ep: 1, title: 'To You, in 2000 Years', duration: '24:10', airDate: 'Apr 7, 2013', desc: 'After a century of peace, the Colossal and Armored Titans breach the Shiganshina district of Wall Maria.' }
    ]
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey’s End',
    japaneseTitle: '葬送のフリーレン',
    romajiTitle: 'Sōsō no Frieren',
    synopsis: 'The Demon King has been defeated, and the victorious hero party disbands after a 10-year quest. But for the thousand-year-old elf mage Frieren, ten years is but an instant. After the hero Himmel passes away from old age, Frieren regrets not understanding human hearts. Accompanied by her young human apprentice Fern, she embarks on a nostalgic pilgrimage to the north to unravel the mystery of life and memory.',
    rating: 9.36,
    ratingSource: 'MyAnimeList #1 Ranked (9.36/10) • Crunchyroll (4.9/5)',
    year: 2023,
    endYear: 2024,
    season: 'Fall 2023',
    status: 'Finished Airing',
    episodes: 28,
    duration: '24 min per ep',
    studio: 'Madhouse',
    source: 'Manga by Kanehito Yamada & Tsukasa Abe',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    rank: 6,
    views: '41.2M',
    trend: '+4',
    poster: 'assets/images/web/frieren.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Friday',
    airTime: '23:00 JST',
    characters: [
      { name: 'Frieren', jp: 'フリーレン', role: 'Elven Mage', va: 'Atsumi Tanezaki', ability: 'Ancient Zoltraak & Mana Suppression', image: 'assets/images/web/char-frieren.jpg', bio: 'An ageless elven mage who slowly discovers the emotional warmth of human connections.' }
    ],
    episodesList: [
      { ep: 1, title: 'The Journey’s End', duration: '25:00', airDate: 'Sep 29, 2023', desc: 'The Hero Party returns victorious after 10 years. Frieren witnesses Himmel’s funeral 50 years later, sparking her journey.' }
    ]
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    japaneseTitle: 'チェンソーマン',
    romajiTitle: 'Chainsaw Man',
    synopsis: 'Living in crushing poverty under the yakuza, teenager Denji hunts devils alongside Pochita, the Chainsaw Devil. Betrayed and butchered by devil-worshipping mobsters, Pochita merges with Denji’s heart to resurrect him as the Chainsaw Man. Recruited into Public Safety Devil Hunters by the enigmatic Makima, Denji trades his miserable existence for dreams of simple breakfasts and intimacy.',
    rating: 8.52,
    ratingSource: 'MyAnimeList (8.52/10) • Crunchyroll (4.8/5)',
    year: 2022,
    endYear: 2022,
    season: 'Fall 2022',
    status: 'Finished Airing',
    episodes: 12,
    duration: '24 min per ep',
    studio: 'MAPPA',
    source: 'Manga by Tatsuki Fujimoto',
    genres: ['Action', 'Supernatural', 'Comedy'],
    rank: 7,
    views: '39.8M',
    trend: 'HOT',
    poster: 'assets/images/web/chainsaw-man.jpg',
    banner: 'assets/images/banners/demon-slayer-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Tuesday',
    airTime: '24:00 JST',
    characters: [
      { name: 'Denji', jp: 'デンジ', role: 'Chainsaw Hybrid', va: 'Kikunosuke Toya', ability: 'Ripcord Chainsaw Metamorphosis', image: 'assets/images/web/char-denji.jpg', bio: 'A raw, impulsive teen whose chainsaw blades shred devils in visceral bloodbaths.' }
    ],
    episodesList: [
      { ep: 1, title: 'Dog & Chainsaw', duration: '24:10', airDate: 'Oct 11, 2022', desc: 'Denji’s life of crushing debt ends when the Zombie Devil ambushes him. Pochita offers his heart to grant Denji a second chance.' }
    ]
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    japaneseTitle: 'SPY×FAMILY',
    romajiTitle: 'Supai Famirī',
    synopsis: 'To maintain peace between rival nations Westalis and Ostania, elite spy codename "Twilight" is tasked with infiltrating an elite private school. To get close to his reclusive target, he constructs a fake family: adopting a telepathic orphan girl named Anya and marrying a polite city hall clerk who is secretly an infamous assassin known as the Thorn Princess.',
    rating: 8.58,
    ratingSource: 'MyAnimeList (8.58/10) • Crunchyroll (4.8/5)',
    year: 2022,
    endYear: 2023,
    season: 'Spring 2022',
    status: 'Finished Airing',
    episodes: 37,
    duration: '24 min per ep',
    studio: 'WIT Studio & CloverWorks',
    source: 'Manga by Tatsuya Endo',
    genres: ['Comedy', 'Action', 'Slice of Life'],
    rank: 8,
    views: '36.4M',
    trend: '+1',
    poster: 'assets/images/web/spy-x-family.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '23:00 JST',
    characters: [
      { name: 'Loid Forger', jp: 'ロイド・フォージャー', role: 'Spy "Twilight"', va: 'Takuya Eguchi', ability: 'Master of Disguise & Tactics', image: 'assets/images/web/spy-x-family.jpg', bio: 'A Westalian super-spy dedicated to engineering world peace.' }
    ],
    episodesList: [
      { ep: 1, title: 'Operation Strix', duration: '24:00', airDate: 'Apr 9, 2022', desc: 'Agent Twilight is assigned Operation Strix and adopts Anya from an underground orphanage.' }
    ]
  },
  {
    id: 'steins-gate',
    title: 'Steins;Gate',
    japaneseTitle: 'シュタインズ・ゲート',
    romajiTitle: 'Shutainzu Gēto',
    synopsis: 'In Tokyo’s Akihabara district, eccentric self-proclaimed "mad scientist" Rintaro Okabe accidentally invents a phonemail microwave capable of sending text messages back into the past. As his Future Gadget Laboratory tinkers with timeline alteration, the covert European syndicate SERN tracks their experiments, thrusting Okabe into a harrowing cycle of death and quantum divergence.',
    rating: 9.07,
    ratingSource: 'MyAnimeList (9.07/10) • Crunchyroll (4.9/5)',
    year: 2011,
    endYear: 2011,
    season: 'Spring 2011',
    status: 'Finished Airing',
    episodes: 24,
    duration: '24 min per ep',
    studio: 'White Fox',
    source: 'Visual Novel by 5pb. / Nitroplus',
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    rank: 9,
    views: '45.1M',
    trend: 'LEGEND',
    poster: 'assets/images/web/steins-gate.jpg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Wednesday',
    airTime: '02:05 JST',
    characters: [
      { name: 'Rintaro Okabe', jp: '岡部倫太郎', role: 'Mad Scientist Hououin Kyouma', va: 'Mamoru Miyano', ability: 'Reading Steiner (Timeline Memory Retention)', image: 'assets/images/web/steins-gate.jpg', bio: 'The dramatic leader of Future Gadget Laboratory who suffers the trauma of infinite world-line shifts.' }
    ],
    episodesList: [
      { ep: 1, title: 'Turning Point', duration: '24:00', airDate: 'Apr 6, 2011', desc: 'Okabe discovers neuroscientist Kurisu Makise murdered in a pool of blood, but sends a text that inexplicably undoes reality.' }
    ]
  },
  {
    id: 'naruto',
    title: 'Naruto Shippuden',
    japaneseTitle: 'ナルト 疾風伝',
    romajiTitle: 'Naruto Shippūden',
    synopsis: 'After two and a half years of training with Jiraiya, Naruto Uzumaki returns to the Hidden Leaf Village older and stronger. But peace is short-lived as the enigmatic Akatsuki organization begins hunting the nine Jinchuriki across the ninja world. Naruto fights to save his comrades, redeem Sasuke Uchiha, and fulfill his dream of becoming Hokage.',
    rating: 8.27,
    ratingSource: 'MyAnimeList (8.27/10) • Crunchyroll (4.8/5)',
    year: 2007,
    endYear: 2017,
    season: 'Winter 2007',
    status: 'Finished Airing',
    episodes: 500,
    duration: '24 min per ep',
    studio: 'Studio Pierrot',
    source: 'Manga by Masashi Kishimoto',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rank: 10,
    views: '88.4M',
    trend: 'LEGEND',
    poster: 'assets/images/web/naruto.jpg',
    banner: 'assets/images/banners/black-clover-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Thursday',
    airTime: '19:30 JST',
    characters: [
      { name: 'Naruto Uzumaki', jp: 'うずまきナルト', role: 'Nine-Tails Jinchuriki', va: 'Junko Takeuchi', ability: 'Rasenshuriken & Sage Mode', image: 'assets/images/web/naruto.jpg', bio: 'The stubborn ninja whose indomitable will and Talk no Jutsu unite the ninja world.' }
    ],
    episodesList: [
      { ep: 1, title: 'Homecoming', duration: '24:00', airDate: 'Feb 15, 2007', desc: 'Naruto returns to the Hidden Leaf and reunites with Sakura and Kakashi for a bell test rematch.' }
    ]
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    japaneseTitle: 'ワンピース',
    romajiTitle: 'Wan Pīsu',
    synopsis: 'Gol D. Roger, the legendary Pirate King, was executed, but his final words ignited the Great Pirate Era: his greatest treasure, the "One Piece", awaits in the Grand Line. Inspired by Red-Haired Shanks, rubber-bodied teen Monkey D. Luffy sets sail with his Straw Hat Pirates to conquer the Grand Line and claim the title of Pirate King.',
    rating: 8.72,
    ratingSource: 'MyAnimeList (8.72/10) • Crunchyroll (4.9/5)',
    year: 1999,
    endYear: 'Present',
    season: 'Fall 1999',
    status: 'Currently Airing',
    episodes: 1120,
    duration: '24 min per ep',
    studio: 'Toei Animation',
    source: 'Manga by Eiichiro Oda',
    genres: ['Action', 'Adventure', 'Fantasy', 'Comedy'],
    rank: 11,
    views: '95.2M',
    trend: 'HOT',
    poster: 'assets/images/web/one-piece.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '09:30 JST',
    characters: [
      { name: 'Monkey D. Luffy', jp: 'モンキー・D・ルフィ', role: 'Captain of Straw Hats', va: 'Mayumi Tanaka', ability: 'Gear 5 Sun God Nika', image: 'assets/images/web/one-piece.jpg', bio: 'The rubber pirate whose boundless freedom and joyful laughter topples emperors.' }
    ],
    episodesList: [
      { ep: 1, title: 'I’m Luffy! The Man Who’s Gonna Be King of the Pirates!', duration: '24:00', airDate: 'Oct 20, 1999', desc: 'Luffy bursts out of a wine barrel on Alvida’s pirate ship and meets young Coby.' }
    ]
  },
  {
    id: 'sword-art-online',
    title: 'Sword Art Online',
    japaneseTitle: 'ソードアート・オンライン',
    romajiTitle: 'Sōdo Āto Onrain',
    synopsis: 'In 2022, ten thousand players log into the revolutionary FullDive VRMMORPG Sword Art Online, only to discover they cannot log out. Game creator Akihiko Kayaba issues a chilling ultimatum: clear all 100 floors of the floating castle Aincrad to earn freedom, but if you die in the game, your NerveGear headset will fry your brain in real life.',
    rating: 7.20,
    ratingSource: 'MyAnimeList (7.20/10) • Crunchyroll (4.6/5)',
    year: 2012,
    endYear: 2020,
    season: 'Summer 2012',
    status: 'Finished Airing',
    episodes: 96,
    duration: '24 min per ep',
    studio: 'A-1 Pictures',
    source: 'Light Novel by Reki Kawahara',
    genres: ['Action', 'Adventure', 'Fantasy', 'Romance', 'Sci-Fi'],
    rank: 12,
    views: '61.7M',
    trend: 'CLASSIC',
    poster: 'assets/images/web/sword-art-online.jpg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '24:00 JST',
    characters: [
      { name: 'Kirito (Kazuto Kirigaya)', jp: 'キリト', role: 'The Black Swordsman', va: 'Yoshitsugu Matsuoka', ability: 'Dual Blades Starburst Stream', image: 'assets/images/web/sword-art-online.jpg', bio: 'A solo beta tester whose lightning-fast reaction speed unravels Aincrad’s death trap.' }
    ],
    episodesList: [
      { ep: 1, title: 'The World of Swords', duration: '24:00', airDate: 'Jul 8, 2012', desc: 'Players log into SAO for launch day and discover the logout button has vanished.' }
    ]
  },
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    japaneseTitle: '僕のヒーローアカデミア',
    romajiTitle: 'Boku no Hīrō Akademia',
    synopsis: 'In a society where 80% of humans possess superpowers known as Quirks, Izuku Midoriya is born completely ordinary. Despite being bullied, his selfless bravery catches the attention of All Might, the world’s greatest hero. Inheriting All Might’s legendary Quirk One For All, Izuku enters U.A. High School to become the next Symbol of Peace.',
    rating: 7.88,
    ratingSource: 'MyAnimeList (7.88/10) • Crunchyroll (4.8/5)',
    year: 2016,
    endYear: 2024,
    season: 'Spring 2016',
    status: 'Currently Airing',
    episodes: 159,
    duration: '24 min per ep',
    studio: 'Bones',
    source: 'Manga by Kohei Horikoshi',
    genres: ['Action', 'Super Power', 'Comedy', 'School'],
    rank: 13,
    views: '57.8M',
    trend: 'HOT',
    poster: 'assets/images/web/my-hero-academia.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '17:30 JST',
    characters: [
      { name: 'Izuku Midoriya (Deku)', jp: '緑谷出久', role: '9th One For All Wielder', va: 'Daiki Yamashita', ability: 'One For All Full Cowl & Gearshift', image: 'assets/images/web/my-hero-academia.jpg', bio: 'The green-haired boy whose analytical heroism inspires heroes and citizens alike.' }
    ],
    episodesList: [
      { ep: 1, title: 'Izuku Midoriya: Origin', duration: '24:00', airDate: 'Apr 3, 2016', desc: 'Quirkless boy Izuku encounters a sludge villain and meets his childhood idol, All Might.' }
    ]
  },
  {
    id: 'suzume',
    title: 'Suzume',
    japaneseTitle: 'すずめの戸締まり',
    romajiTitle: 'Suzume no Tojimari',
    synopsis: '17-year-old high school girl Suzume lives in a quiet Kyushu town until she encounters Souta, a young man searching for mysterious ruins. Following him into the mountains, Suzume opens a weathered door that unleashes catastrophic supernatural disasters across Japan. Joined by Souta—who is cursed into a three-legged child’s chair—Suzume embarks on a cross-country mission to close the calamity doors.',
    rating: 8.35,
    ratingSource: 'MyAnimeList (8.35/10) • Crunchyroll (4.9/5)',
    year: 2022,
    endYear: 2022,
    season: 'Fall 2022',
    status: 'Finished Airing',
    episodes: 1,
    duration: '122 min (Feature Film)',
    studio: 'CoMix Wave Films',
    source: 'Original Film by Makoto Shinkai',
    genres: ['Movie', 'Fantasy', 'Adventure', 'Drama'],
    rank: 14,
    views: '32.1M',
    trend: 'AWARD WINNER',
    poster: 'assets/images/web/suzume.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    isMovie: true,
    characters: [
      { name: 'Suzume Iwato', jp: '岩戸鈴芽', role: 'Main Protagonist', va: 'Nanoka Hara', ability: 'Closer of Disasters', image: 'assets/images/web/suzume.jpg', bio: 'A resilient high schooler who ventures across Japan to lock away ancient calamity portals.' }
    ],
    episodesList: [
      { ep: 1, title: 'Suzume (Full Theatrical Movie)', duration: '122:00', airDate: 'Nov 11, 2022', desc: 'Suzume and Souta travel across Japan to lock disaster doors before the colossal red worm triggers cataclysmic earthquakes.' }
    ]
  },
  {
    id: 'your-name',
    title: 'Your Name (Kimi no Na wa)',
    japaneseTitle: '君の名は。',
    romajiTitle: 'Kimi no Na wa.',
    synopsis: 'Mitsuha Miyamizu, a high school girl in the rural mountain town of Itomori, dreams of living in bustling Tokyo. Taki Tachibana is a hardworking high school boy in Tokyo with aspirations of becoming an architect. One morning, they wake up to find their consciousness swapped into each other’s bodies. As they communicate via notes and develop an unbreakable bond, an impending comet disaster threatens to erase everything.',
    rating: 8.84,
    ratingSource: 'MyAnimeList (8.84/10) • Crunchyroll (4.9/5)',
    year: 2016,
    endYear: 2016,
    season: 'Summer 2016',
    status: 'Finished Airing',
    episodes: 1,
    duration: '106 min (Feature Film)',
    studio: 'CoMix Wave Films',
    source: 'Original Film by Makoto Shinkai',
    genres: ['Movie', 'Romance', 'Drama', 'Supernatural'],
    rank: 15,
    views: '49.8M',
    trend: 'MASTERPIECE',
    poster: 'assets/images/web/your-name.jpg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    isMovie: true,
    characters: [
      { name: 'Taki Tachibana', jp: '立花瀧', role: 'Male Lead', va: 'Ryunosuke Kamiki', ability: 'Body Swapping & Architectural Sketching', image: 'assets/images/web/your-name.jpg', bio: 'A sincere Tokyo teenager whose love transcends space and time to save Itomori.' }
    ],
    episodesList: [
      { ep: 1, title: 'Your Name (Theatrical Film)', duration: '106:00', airDate: 'Aug 26, 2016', desc: 'Taki and Mitsuha navigate inexplicable body-swapping and uncover a 3-year temporal rift before Comet Tiamat strikes.' }
    ]
  },
  {
    id: "death-note",
    title: "Death Note",
    japaneseTitle: "DEATH NOTE",
    romajiTitle: "DEATH NOTE",
    synopsis: "Light Yagami is a genius high school student who is about to learn about life through a book of death. When a bored shinigami, a God of Death, named Ryuk drops a black notepad called a Death Note, Light receives power over life and death with the stroke of a pen. Determined to use this dark gift for the best, Light set...",
    rating: 8.4,
    ratingSource: "AniList Score (84%) • Crunchyroll (4.9/5)",
    year: 2006,
    endYear: 2006,
    season: 'Fall 2006',
    status: "Finished Airing",
    episodes: 37,
    duration: "23 min",
    studio: "MADHOUSE",
    source: "Original Manga / Novel",
    genres: ["Mystery","Psychological","Supernatural","Thriller"],
    rank: 16,
    views: "35.0M",
    trend: "+1 HOT",
    poster: "assets/images/web/death-note.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Wednesday',
    airTime: '24:50 JST',
    characters: [
          {
                "name": "Light Yagami",
                "jp": "夜神月",
                "role": "Main Protagonist / Kira",
                "va": "Mamoru Miyano",
                "ability": "Genius Intellect & Death Note",
                "image": "assets/images/web/death-note.jpg",
                "bio": "A prodigy high school student who vows to rid the world of criminals using the supernatural notebook."
          },
          {
                "name": "L Lawliet",
                "jp": "エル・ローライト",
                "role": "World’s Greatest Detective",
                "va": "Kappei Yamaguchi",
                "ability": "Unrivaled Deductive Logic",
                "image": "assets/images/web/death-note.jpg",
                "bio": "The eccentric, shadowy detective determined to unmask and bring Kira to justice."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 1 of Death Note. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 2 of Death Note. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 3 of Death Note. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 4 of Death Note. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "fullmetal-alchemist-brotherhood",
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    romajiTitle: "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST",
    synopsis: "\"In order for something to be obtained, something of equal value must be lost.\"\n\nAlchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgressi...",
    rating: 9,
    ratingSource: "AniList Score (90%) • Crunchyroll (4.9/5)",
    year: 2009,
    endYear: 2009,
    season: 'Spring 2009',
    status: "Finished Airing",
    episodes: 64,
    duration: "25 min",
    studio: "bones",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Drama","Fantasy"],
    rank: 17,
    views: "36.7M",
    trend: "+1 HOT",
    poster: "assets/images/web/fullmetal-alchemist-brotherhood.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Sunday',
    airTime: '17:00 JST',
    characters: [
          {
                "name": "Edward Elric",
                "jp": "エドワード・エルリック",
                "role": "Fullmetal Alchemist",
                "va": "Romi Park",
                "ability": "Alchemy without Transmutation Circle",
                "image": "assets/images/web/fullmetal-alchemist-brotherhood.jpg",
                "bio": "The youngest State Alchemist searching for the Philosopher’s Stone to restore his brother’s body."
          },
          {
                "name": "Alphonse Elric",
                "jp": "アルフォンス・エルリック",
                "role": "Elric Brother",
                "va": "Rie Kugimiya",
                "ability": "Martial Arts & Alchemy in Iron Armor",
                "image": "assets/images/web/fullmetal-alchemist-brotherhood.jpg",
                "bio": "Edward’s gentle younger brother whose soul is bound to an ancient suit of armor."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2009",
                "desc": "Official episode 1 of Fullmetal Alchemist: Brotherhood. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2009",
                "desc": "Official episode 2 of Fullmetal Alchemist: Brotherhood. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2009",
                "desc": "Official episode 3 of Fullmetal Alchemist: Brotherhood. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2009",
                "desc": "Official episode 4 of Fullmetal Alchemist: Brotherhood. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "bleach-tybw",
    title: "BLEACH: Thousand-Year Blood War",
    japaneseTitle: "BLEACH 千年血戦篇",
    romajiTitle: "BLEACH: Sennen Kessen-hen",
    synopsis: "Was it all just a coincidence, or was it inevitable?\n\nIchigo Kurosaki gained the powers of a Soul Reaper through a chance encounter. As a Substitute\nSoul Reaper, Ichigo became caught in the turmoil of the Soul Society, a place where deceased\nsouls gather. But with help from his friends, Ichigo overcame every challenge ...",
    rating: 8.8,
    ratingSource: "AniList Score (88%) • Crunchyroll (4.9/5)",
    year: 2022,
    endYear: 2022,
    season: 'Fall 2022',
    status: "Finished Airing",
    episodes: 13,
    duration: "24 min",
    studio: "Studio Pierrot",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Supernatural"],
    rank: 18,
    views: "38.4M",
    trend: "+1 HOT",
    poster: "assets/images/web/bleach-tybw.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Saturday',
    airTime: '23:00 JST',
    characters: [
          {
                "name": "Ichigo Kurosaki",
                "jp": "黒崎一護",
                "role": "Substitute Soul Reaper",
                "va": "Masakazu Morita",
                "ability": "Bankai: Tensa Zangetsu & Getsuga Tenshou",
                "image": "assets/images/web/bleach-tybw.jpg",
                "bio": "A human with the powers of a Soul Reaper who stands at the vanguard against the Quincy invasion."
          },
          {
                "name": "Yhwach",
                "jp": "ユーハバッハ",
                "role": "Father of the Quincy",
                "va": "Takayuki Sugo",
                "ability": "The Almighty & Soul Distribution",
                "image": "assets/images/web/bleach-tybw.jpg",
                "bio": "The supreme emperor of the Wandenreich who reawakens to conquer the Soul Society."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 1 of BLEACH: Thousand-Year Blood War. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 2 of BLEACH: Thousand-Year Blood War. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 3 of BLEACH: Thousand-Year Blood War. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 4 of BLEACH: Thousand-Year Blood War. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    japaneseTitle: "ヴィンランド・サガ",
    romajiTitle: "VINLAND SAGA",
    synopsis: "Thorfinn is son to one of the Vikings' greatest warriors, but when his father is killed in battle by the mercenary leader Askeladd, he swears to have his revenge. Thorfinn joins Askeladd's band in order to challenge him to a duel, and ends up caught in the middle of a war for the crown of England.\n\n(Source: Kodansha US...",
    rating: 8.7,
    ratingSource: "AniList Score (87%) • Crunchyroll (4.9/5)",
    year: 2019,
    endYear: 2019,
    season: 'Summer 2019',
    status: "Finished Airing",
    episodes: 24,
    duration: "24 min",
    studio: "WIT STUDIO",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Drama"],
    rank: 19,
    views: "40.1M",
    trend: "+1 HOT",
    poster: "assets/images/web/vinland-saga.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-pivKKffCAwAY.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Monday',
    airTime: '24:30 JST',
    characters: [
          {
                "name": "Thorfinn Karlsefni",
                "jp": "トルフィン",
                "role": "Viking Warrior",
                "va": "Yuto Uemura",
                "ability": "Dual Dagger Combat & Agility",
                "image": "assets/images/web/vinland-saga.jpg",
                "bio": "A fierce young warrior driven by revenge who journeys towards an ideal land free of violence."
          },
          {
                "name": "Askeladd",
                "jp": "アシェラッド",
                "role": "Mercenary Leader",
                "va": "Naoya Uchida",
                "ability": "Master Tactician & Swordsman",
                "image": "assets/images/web/vinland-saga.jpg",
                "bio": "A shrewd commander who manipulates kings and warriors to safeguard his ancestral homeland."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2019",
                "desc": "Official episode 1 of Vinland Saga. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2019",
                "desc": "Official episode 2 of Vinland Saga. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2019",
                "desc": "Official episode 3 of Vinland Saga. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2019",
                "desc": "Official episode 4 of Vinland Saga. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter (2011)",
    japaneseTitle: "HUNTER×HUNTER (2011)",
    romajiTitle: "HUNTER×HUNTER (2011)",
    synopsis: "A Hunter is one who travels the world doing all sorts of dangerous tasks. From capturing criminals to searching deep within uncharted lands for any lost treasures. Gon is a young boy whose father disappeared long ago, being a Hunter. He believes if he could also follow his father's path, he could one day reunite with h...",
    rating: 8.9,
    ratingSource: "AniList Score (89%) • Crunchyroll (4.9/5)",
    year: 2011,
    endYear: 2011,
    season: 'Fall 2011',
    status: "Finished Airing",
    episodes: 148,
    duration: "24 min",
    studio: "MADHOUSE",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Fantasy"],
    rank: 20,
    views: "41.8M",
    trend: "+1 HOT",
    poster: "assets/images/web/hunter-x-hunter.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Sunday',
    airTime: '10:55 JST',
    characters: [
          {
                "name": "Gon Freecss",
                "jp": "ゴン＝フリークス",
                "role": "Hunter Candidate",
                "va": "Megumi Han",
                "ability": "Nen: Jajanken (Enhancer)",
                "image": "assets/images/web/hunter-x-hunter.jpg",
                "bio": "An optimistic boy from Whale Island who embarks on a quest to become a licensed Hunter and find his father."
          },
          {
                "name": "Killua Zoldyck",
                "jp": "キルア＝ゾルディック",
                "role": "Assassin Prodigy",
                "va": "Mariya Ise",
                "ability": "Nen: Godspeed / Lightning Transmutation",
                "image": "assets/images/web/hunter-x-hunter.jpg",
                "bio": "An elite assassin heir who breaks free from his deadly family to travel alongside Gon."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2011",
                "desc": "Official episode 1 of Hunter x Hunter (2011). Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2011",
                "desc": "Official episode 2 of Hunter x Hunter (2011). Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2011",
                "desc": "Official episode 3 of Hunter x Hunter (2011). Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2011",
                "desc": "Official episode 4 of Hunter x Hunter (2011). Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    japaneseTitle: "東京喰種 トーキョーグール",
    romajiTitle: "Tokyo Ghoul",
    synopsis: "The suspense horror/dark fantasy story is set in Tokyo, which is haunted by mysterious \"ghouls\" who are devouring humans. People are gripped by the fear of these ghouls whose identities are masked in mystery. An ordinary college student named Kaneki encounters Rize, a girl who is an avid reader like him, at the café he...",
    rating: 7.6,
    ratingSource: "AniList Score (76%) • Crunchyroll (4.9/5)",
    year: 2014,
    endYear: 2014,
    season: 'Summer 2014',
    status: "Finished Airing",
    episodes: 12,
    duration: "24 min",
    studio: "Studio Pierrot",
    source: "Original Manga / Novel",
    genres: ["Action","Drama","Horror","Mystery","Psychological","Supernatural"],
    rank: 21,
    views: "43.5M",
    trend: "+1 HOT",
    poster: "assets/images/web/tokyo-ghoul.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-RCJ7M71zLmrh.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Thursday',
    airTime: '24:00 JST',
    characters: [
          {
                "name": "Ken Kaneki",
                "jp": "金木研",
                "role": "One-Eyed Ghoul",
                "va": "Natsuki Hanae",
                "ability": "Rinkaku Kagune & Regeneration",
                "image": "assets/images/web/tokyo-ghoul.jpg",
                "bio": "A college student whose life changes forever after an organ transplant turns him into a half-ghoul."
          },
          {
                "name": "Touka Kirishima",
                "jp": "霧嶋董香",
                "role": "Ghoul at Anteiku",
                "va": "Sora Amamiya",
                "ability": "Ukaku Kagune & High-Speed Combat",
                "image": "assets/images/web/tokyo-ghoul.jpg",
                "bio": "A fierce ghoul waitress who protects Kaneki and her surrogate family at Anteiku café."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 1 of Tokyo Ghoul. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 2 of Tokyo Ghoul. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 3 of Tokyo Ghoul. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 4 of Tokyo Ghoul. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "cyberpunk-edgerunners",
    title: "Cyberpunk: Edgerunners",
    japaneseTitle: "サイバーパンク エッジランナーズ",
    romajiTitle: "Cyberpunk: Edgerunners",
    synopsis: "Cyberpunk: Edgerunners tells a standalone, 10-episode story about a street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner—a mercenary outlaw also known as a cyberpunk.\n\n(Source: CD PROJEKT RED)\n\nNote:...",
    rating: 8.5,
    ratingSource: "AniList Score (85%) • Crunchyroll (4.9/5)",
    year: 2022,
    endYear: 2022,
    season: 'Fall 2022',
    status: "Finished Airing",
    episodes: 10,
    duration: "24 min",
    studio: "TRIGGER",
    source: "Original Manga / Novel",
    genres: ["Action","Drama","Psychological","Sci-Fi"],
    rank: 22,
    views: "45.2M",
    trend: "+1 HOT",
    poster: "assets/images/web/cyberpunk-edgerunners.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/120377-c15oLS8CA31s.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Friday',
    airTime: '22:00 JST',
    characters: [
          {
                "name": "David Martinez",
                "jp": "デイビッド・マルティネス",
                "role": "Street Kid / Edgerunner",
                "va": "KENN",
                "ability": "Military-Grade Sandevistan Cyberware",
                "image": "assets/images/web/cyberpunk-edgerunners.jpg",
                "bio": "A high school dropout from Santo Domingo who installs black-market cyberware and shoots for the moon in Night City."
          },
          {
                "name": "Lucy",
                "jp": "ルーシー",
                "role": "Netrunner",
                "va": "Aoi Yuuki",
                "ability": "Deep Dive Cyber Netrunning & Monowire",
                "image": "assets/images/web/cyberpunk-edgerunners.jpg",
                "bio": "An enigmatic netrunner with dreams of escaping Night City for the tranquil surface of the Moon."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 1 of Cyberpunk: Edgerunners. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 2 of Cyberpunk: Edgerunners. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 3 of Cyberpunk: Edgerunners. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2022",
                "desc": "Official episode 4 of Cyberpunk: Edgerunners. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "mob-psycho-100",
    title: "Mob Psycho 100",
    japaneseTitle: "モブサイコ100",
    romajiTitle: "Mob Psycho 100",
    synopsis: "The story revolves around \"Mob,\" a boy who will explode if his emotional capacity reaches 100%. This boy with psychic powers earned his nickname \"Mob\" because he does not stand out among other people. He keeps his psychic powers bottled up so he can live normally, but if his emotional level reaches 100, something will ...",
    rating: 8.4,
    ratingSource: "AniList Score (84%) • Crunchyroll (4.9/5)",
    year: 2016,
    endYear: 2016,
    season: 'Summer 2016',
    status: "Finished Airing",
    episodes: 12,
    duration: "24 min",
    studio: "bones",
    source: "Original Manga / Novel",
    genres: ["Action","Comedy","Drama","Psychological","Slice of Life","Supernatural"],
    rank: 23,
    views: "46.9M",
    trend: "+1 HOT",
    poster: "assets/images/web/mob-psycho-100.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21507-Qx8bGsLXUgLo.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Monday',
    airTime: '23:00 JST',
    characters: [
          {
                "name": "Shigeo Kageyama (Mob)",
                "jp": "影山茂夫",
                "role": "Esper Prodigy",
                "va": "Setsuo Ito",
                "ability": "Psychokinesis & 100% Burst",
                "image": "assets/images/web/mob-psycho-100.jpg",
                "bio": "An ordinary-looking middle school boy possessing godlike psychic powers that erupt when his emotional gauge reaches 100%."
          },
          {
                "name": "Arataka Reigen",
                "jp": "霊幻新隆",
                "role": "Spirits and Such Master",
                "va": "Takahiro Sakurai",
                "ability": "Special Moves: Salt Splash & Charisma",
                "image": "assets/images/web/mob-psycho-100.jpg",
                "bio": "A self-proclaimed master psychic who guides Mob with surprisingly genuine life wisdom."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 1 of Mob Psycho 100. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 2 of Mob Psycho 100. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 3 of Mob Psycho 100. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 4 of Mob Psycho 100. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "code-geass",
    title: "Code Geass: Lelouch of the Rebellion",
    japaneseTitle: "コードギアス 反逆のルルーシュ",
    romajiTitle: "Code Geass: Hangyaku no Lelouch",
    synopsis: "On August 10th of the year 2010 the Holy Empire of Britannia began a campaign of conquest, its sights set on Japan. Operations were completed in one month thanks to Britannia's deployment of new mobile humanoid armor vehicles dubbed Knightmare Frames. Japan's rights and identity were stripped away, the once proud natio...",
    rating: 8.5,
    ratingSource: "AniList Score (85%) • Crunchyroll (4.9/5)",
    year: 2006,
    endYear: 2006,
    season: 'Fall 2006',
    status: "Finished Airing",
    episodes: 25,
    duration: "24 min",
    studio: "Sunrise",
    source: "Original Manga / Novel",
    genres: ["Action","Drama","Mecha","Sci-Fi","Thriller"],
    rank: 24,
    views: "48.6M",
    trend: "+1 HOT",
    poster: "assets/images/web/code-geass.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1575.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Thursday',
    airTime: '25:25 JST',
    characters: [
          {
                "name": "Lelouch vi Britannia",
                "jp": "ルルーシュ・ヴィ・ブリタニア",
                "role": "Zero / Rebellion Leader",
                "va": "Jun Fukuyama",
                "ability": "Geass: Power of Absolute Obedience",
                "image": "assets/images/web/code-geass.jpg",
                "bio": "An exiled prince of Britannia who dons the mask of Zero to dismantle the tyrannical empire."
          },
          {
                "name": "C.C.",
                "jp": "シー・ツー",
                "role": "Immortal Witch",
                "va": "Yukana",
                "ability": "Geass Bestowal & Immortality",
                "image": "assets/images/web/code-geass.jpg",
                "bio": "An enigmatic green-haired girl who bestows the power of Geass upon Lelouch."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 1 of Code Geass: Lelouch of the Rebellion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 2 of Code Geass: Lelouch of the Rebellion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 3 of Code Geass: Lelouch of the Rebellion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2006",
                "desc": "Official episode 4 of Code Geass: Lelouch of the Rebellion. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "one-punch-man",
    title: "One-Punch Man",
    japaneseTitle: "ワンパンマン",
    romajiTitle: "One Punch Man",
    synopsis: "Saitama has a rather peculiar hobby, being a superhero, but despite his heroic deeds and superhuman abilities, a shadow looms over his life. He's become much too powerful, to the point that every opponent ends up defeated with a single punch.\n\nThe lack of challenge has driven him into a state of apathy, as he watches h...",
    rating: 8.2,
    ratingSource: "AniList Score (82%) • Crunchyroll (4.9/5)",
    year: 2015,
    endYear: 2015,
    season: 'Fall 2015',
    status: "Finished Airing",
    episodes: 12,
    duration: "24 min",
    studio: "MADHOUSE",
    source: "Original Manga / Novel",
    genres: ["Action","Comedy","Sci-Fi","Supernatural"],
    rank: 25,
    views: "50.3M",
    trend: "+1 HOT",
    poster: "assets/images/web/one-punch-man.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Sunday',
    airTime: '25:05 JST',
    characters: [
          {
                "name": "Saitama",
                "jp": "サイタマ",
                "role": "Hero for Fun",
                "va": "Makoto Furukawa",
                "ability": "Serious Punch & Absolute Strength",
                "image": "assets/images/web/one-punch-man.jpg",
                "bio": "A hero who trained so hard his hair fell out, granting him the power to defeat any enemy in a single punch."
          },
          {
                "name": "Genos",
                "jp": "ジェノス",
                "role": "Demon Cyborg",
                "va": "Kaito Ishikawa",
                "ability": "Incineration Cannons & Boosters",
                "image": "assets/images/web/one-punch-man.jpg",
                "bio": "A dedicated cyborg warrior who seeks out Saitama to learn the secret of his immense strength."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2015",
                "desc": "Official episode 1 of One-Punch Man. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2015",
                "desc": "Official episode 2 of One-Punch Man. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2015",
                "desc": "Official episode 3 of One-Punch Man. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2015",
                "desc": "Official episode 4 of One-Punch Man. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "cowboy-bebop",
    title: "Cowboy Bebop",
    japaneseTitle: "カウボーイビバップ",
    romajiTitle: "Cowboy Bebop",
    synopsis: "Enter a world in the distant future, where Bounty Hunters roam the solar system. Spike and Jet, bounty hunting partners, set out on journeys in an ever struggling effort to win bounty rewards to survive.\nWhile traveling, they meet up with other very interesting people. Could Faye, the beautiful and ridiculously poor ga...",
    rating: 8.6,
    ratingSource: "AniList Score (86%) • Crunchyroll (4.9/5)",
    year: 1998,
    endYear: 1998,
    season: 'Spring 1998',
    status: "Finished Airing",
    episodes: 26,
    duration: "24 min",
    studio: "Sunrise",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Drama","Sci-Fi"],
    rank: 26,
    views: "52.0M",
    trend: "+1 HOT",
    poster: "assets/images/web/cowboy-bebop.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-OquNCNB6srGe.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Friday',
    airTime: '25:00 JST',
    characters: [
          {
                "name": "Spike Spiegel",
                "jp": "スパイク・スピーゲル",
                "role": "Bounty Hunter",
                "va": "Koichi Yamadera",
                "ability": "Jeet Kune Do & Marksmanship",
                "image": "assets/images/web/cowboy-bebop.jpg",
                "bio": "A laid-back ex-syndicate hitman cruising the solar system aboard the Bebop."
          },
          {
                "name": "Faye Valentine",
                "jp": "フェイ・ヴァレンタイン",
                "role": "Con Artist & Bounty Hunter",
                "va": "Megumi Hayashibara",
                "ability": "Sleight of Hand & Aerial Dogfighting",
                "image": "assets/images/web/cowboy-bebop.jpg",
                "bio": "A gambling femme fatale running from astronomical cryogenic debts."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "1998",
                "desc": "Official episode 1 of Cowboy Bebop. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "1998",
                "desc": "Official episode 2 of Cowboy Bebop. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "1998",
                "desc": "Official episode 3 of Cowboy Bebop. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "1998",
                "desc": "Official episode 4 of Cowboy Bebop. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "evangelion",
    title: "Neon Genesis Evangelion",
    japaneseTitle: "新世紀エヴァンゲリオン",
    romajiTitle: "Shin Seiki Evangelion",
    synopsis: "In the year 2015, the Angels, huge, tremendously powerful, alien war machines, appear in Tokyo for the second time. The only hope for Mankind's survival lies in the Evangelion, a humanoid fighting machine developed by NERV, a special United Nations agency. Capable of withstanding anything the Angels can dish out, the E...",
    rating: 8.3,
    ratingSource: "AniList Score (83%) • Crunchyroll (4.9/5)",
    year: 1995,
    endYear: 1995,
    season: 'Fall 1995',
    status: "Finished Airing",
    episodes: 26,
    duration: "24 min",
    studio: "GAINAX",
    source: "Original Manga / Novel",
    genres: ["Action","Drama","Mecha","Mystery","Psychological","Sci-Fi"],
    rank: 27,
    views: "53.7M",
    trend: "+1 HOT",
    poster: "assets/images/web/evangelion.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/30-gEMoHHIqxDgN.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Wednesday',
    airTime: '18:30 JST',
    characters: [
          {
                "name": "Shinji Ikari",
                "jp": "碇シンジ",
                "role": "Third Children / Eva-01 Pilot",
                "va": "Megumi Ogata",
                "ability": "Evangelion Unit-01 Synch",
                "image": "assets/images/web/evangelion.jpg",
                "bio": "A sensitive teenager summoned to Tokyo-3 by his estranged father to pilot a giant biomechanical Evangelion."
          },
          {
                "name": "Asuka Langley Soryu",
                "jp": "惣流・アスカ・ラングレー",
                "role": "Second Children / Eva-02 Pilot",
                "va": "Yuko Miyamura",
                "ability": "Acrobatic Eva Combat Mastery",
                "image": "assets/images/web/evangelion.jpg",
                "bio": "A fiery, fiercely competitive pilot from Germany determined to prove her supreme combat capability."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "1995",
                "desc": "Official episode 1 of Neon Genesis Evangelion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "1995",
                "desc": "Official episode 2 of Neon Genesis Evangelion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "1995",
                "desc": "Official episode 3 of Neon Genesis Evangelion. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "1995",
                "desc": "Official episode 4 of Neon Genesis Evangelion. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "re-zero",
    title: "Re:ZERO -Starting Life in Another World-",
    japaneseTitle: "Re:ゼロから始める異世界生活",
    romajiTitle: "Re:Zero kara Hajimeru Isekai Seikatsu",
    synopsis: "In the story, Subaru Natsuki is an ordinary high school student who is lost in an alternate world, where he is rescued by a beautiful, silver-haired girl. He stays near her to return the favor, but the destiny she is burdened with is more than Subaru can imagine. Enemies attack one by one, and both of them are killed. ...",
    rating: 8.1,
    ratingSource: "AniList Score (81%) • Crunchyroll (4.9/5)",
    year: 2016,
    endYear: 2016,
    season: 'Spring 2016',
    status: "Finished Airing",
    episodes: 25,
    duration: "25 min",
    studio: "WHITE FOX",
    source: "Original Manga / Novel",
    genres: ["Action","Adventure","Drama","Fantasy","Psychological","Romance","Thriller"],
    rank: 28,
    views: "55.4M",
    trend: "+1 HOT",
    poster: "assets/images/web/re-zero.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21355-f9SjOfEJMk5P.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Wednesday',
    airTime: '25:05 JST',
    characters: [
          {
                "name": "Subaru Natsuki",
                "jp": "ナツキ・スバル",
                "role": "Lugnica Challenger",
                "va": "Yusuke Kobayashi",
                "ability": "Return by Death",
                "image": "assets/images/web/re-zero.jpg",
                "bio": "A modern teenager summoned into a fantasy kingdom who rewinds time to a checkpoint whenever he perishes."
          },
          {
                "name": "Emilia",
                "jp": "エミリア",
                "role": "Royal Candidate",
                "va": "Rie Takahashi",
                "ability": "Spiritual Arts & Ice Magic",
                "image": "assets/images/web/re-zero.jpg",
                "bio": "A kind half-elf spirit arts user running for the throne of Lugnica accompanied by the great spirit Puck."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 1 of Re:ZERO -Starting Life in Another World-. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 2 of Re:ZERO -Starting Life in Another World-. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 3 of Re:ZERO -Starting Life in Another World-. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2016",
                "desc": "Official episode 4 of Re:ZERO -Starting Life in Another World-. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "haikyuu",
    title: "HAIKYU!!",
    japaneseTitle: "ハイキュー!!",
    romajiTitle: "Haikyuu!!",
    synopsis: "Inspired after watching a volleyball ace nicknamed \"Little Giant\" in action, small-statured Shouyou Hinata revives the volleyball club at his middle school. The newly-formed team even makes it to a tournament; however, their first match turns out to be their last when they are brutally squashed by the \"King of the Cour...",
    rating: 8.3,
    ratingSource: "AniList Score (83%) • Crunchyroll (4.9/5)",
    year: 2014,
    endYear: 2014,
    season: 'Spring 2014',
    status: "Finished Airing",
    episodes: 25,
    duration: "24 min",
    studio: "Production I.G",
    source: "Original Manga / Novel",
    genres: ["Comedy","Drama","Sports"],
    rank: 29,
    views: "57.1M",
    trend: "+1 HOT",
    poster: "assets/images/web/haikyuu.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20464-PpYjO9cPN1gs.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Sunday',
    airTime: '17:00 JST',
    characters: [
          {
                "name": "Shoyo Hinata",
                "jp": "日向翔陽",
                "role": "Middle Blocker",
                "va": "Ayumu Murase",
                "ability": "Superhuman Jump & Quick Attack",
                "image": "assets/images/web/haikyuu.jpg",
                "bio": "A diminutive high schooler with an awe-inspiring vertical leap aspiring to follow the \"Little Giant\"."
          },
          {
                "name": "Tobio Kageyama",
                "jp": "影山飛雄",
                "role": "Setter (\"King of the Court\")",
                "va": "Kaito Ishikawa",
                "ability": "Pinpoint Tosses & Game Sense",
                "image": "assets/images/web/haikyuu.jpg",
                "bio": "A volleyball genius whose ruthless perfectionism transforms into unstoppable teamwork with Hinata."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 1 of HAIKYU!!. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 2 of HAIKYU!!. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 3 of HAIKYU!!. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2014",
                "desc": "Official episode 4 of HAIKYU!!. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    japaneseTitle: "怪獣８号",
    romajiTitle: "Kaijuu 8-gou",
    synopsis: "With the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achi...",
    rating: 8.1,
    ratingSource: "AniList Score (81%) • Crunchyroll (4.9/5)",
    year: 2024,
    endYear: 2024,
    season: 'Spring 2024',
    status: "Finished Airing",
    episodes: 12,
    duration: "24 min",
    studio: "Production I.G",
    source: "Original Manga / Novel",
    genres: ["Action","Sci-Fi"],
    rank: 30,
    views: "58.8M",
    trend: "+1 HOT",
    poster: "assets/images/web/kaiju-no-8.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Saturday',
    airTime: '23:00 JST',
    characters: [
          {
                "name": "Kafka Hibino",
                "jp": "日比野カフカ",
                "role": "Defense Force Cadet / Kaiju No. 8",
                "va": "Masaya Fukunishi",
                "ability": "Full Kaiju Transformation & Monster Punch",
                "image": "assets/images/web/kaiju-no-8.jpg",
                "bio": "A 32-year-old monster sweeper who ingests a parasite and gains the terrifying power of Kaiju No. 8."
          },
          {
                "name": "Mina Ashiro",
                "jp": "亜白ミナ",
                "role": "Third Division Captain",
                "va": "Asami Seto",
                "ability": "Anti-Kaiju Heavy Artillery Cannon",
                "image": "assets/images/web/kaiju-no-8.jpg",
                "bio": "Kafka’s childhood friend and legendary commander of the Third Division of the Defense Force."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2024",
                "desc": "Official episode 1 of Kaiju No. 8. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2024",
                "desc": "Official episode 2 of Kaiju No. 8. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2024",
                "desc": "Official episode 3 of Kaiju No. 8. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2024",
                "desc": "Official episode 4 of Kaiju No. 8. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "classroom-of-the-elite",
    title: "Classroom of the Elite",
    japaneseTitle: "ようこそ実力至上主義の教室へ",
    romajiTitle: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e",
    synopsis: "Koudo Ikusei Senior High School is a leading school with state-of-the-art facilities. The students there have the freedom to wear any hairstyle and bring any personal effects they desire. Koudo Ikusei is like a utopia, but the truth is that only the most superior students receive favorable treatment.\n\nKiyotaka Ayanokou...",
    rating: 7.6,
    ratingSource: "AniList Score (76%) • Crunchyroll (4.9/5)",
    year: 2017,
    endYear: 2017,
    season: 'Summer 2017',
    status: "Finished Airing",
    episodes: 12,
    duration: "24 min",
    studio: "Lerche",
    source: "Original Manga / Novel",
    genres: ["Drama","Psychological"],
    rank: 31,
    views: "60.5M",
    trend: "+1 HOT",
    poster: "assets/images/web/classroom-of-the-elite.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/98659-u46B5RCNl9il.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Wednesday',
    airTime: '23:30 JST',
    characters: [
          {
                "name": "Kiyotaka Ayanokouji",
                "jp": "綾小路清隆",
                "role": "Class 1-D Strategist",
                "va": "Shoya Chiba",
                "ability": "Mastermind Deduction & White Room Conditioning",
                "image": "assets/images/web/classroom-of-the-elite.jpg",
                "bio": "An unassuming high school boy who quietly manipulates class politics from the shadows."
          },
          {
                "name": "Suzune Horikita",
                "jp": "堀北鈴音",
                "role": "Class 1-D Leader",
                "va": "Akari Kito",
                "ability": "Academic Excellence & Cold Logic",
                "image": "assets/images/web/classroom-of-the-elite.jpg",
                "bio": "An aloof student determined to prove her worth to her older brother by lifting Class D to Class A."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2017",
                "desc": "Official episode 1 of Classroom of the Elite. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2017",
                "desc": "Official episode 2 of Classroom of the Elite. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2017",
                "desc": "Official episode 3 of Classroom of the Elite. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2017",
                "desc": "Official episode 4 of Classroom of the Elite. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "oshi-no-ko",
    title: "OSHI NO KO",
    japaneseTitle: "【推しの子】",
    romajiTitle: "[Oshi no Ko]",
    synopsis: "When a pregnant young starlet appears in Gorou Amemiya’s countryside medical clinic, the doctor takes it upon himself to safely (and secretly) deliver Ai Hoshino’s child so she can make a scandal-free return to the stage. But no good deed goes unpunished, and on the eve of her delivery, he finds himself slain at the ha...",
    rating: 8.4,
    ratingSource: "AniList Score (84%) • Crunchyroll (4.9/5)",
    year: 2023,
    endYear: 2023,
    season: 'Spring 2023',
    status: "Finished Airing",
    episodes: 11,
    duration: "24 min",
    studio: "Doga Kobo",
    source: "Original Manga / Novel",
    genres: ["Drama","Mystery","Psychological","Supernatural"],
    rank: 32,
    views: "62.2M",
    trend: "+1 HOT",
    poster: "assets/images/web/oshi-no-ko.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/150672-ISwoA0eS722H.jpg",
    featured: false,
    spotlight: false,
    isMovie: false,
    airDay: 'Wednesday',
    airTime: '23:00 JST',
    characters: [
          {
                "name": "Aqua Hoshino",
                "jp": "星野アクアマリン",
                "role": "Reincarnated Prodigy Actor",
                "va": "Takeo Otsuka",
                "ability": "Method Acting & Investigation",
                "image": "assets/images/web/oshi-no-ko.jpg",
                "bio": "Reborn as the twin son of idol legend Ai Hoshino, he enters show business to unravel the truth behind her tragedy."
          },
          {
                "name": "Ruby Hoshino",
                "jp": "星野ルビー",
                "role": "B-Komachi Idol",
                "va": "Yurie Igoma",
                "ability": "Radiant Idol Aura & Dance",
                "image": "assets/images/web/oshi-no-ko.jpg",
                "bio": "Aqua’s ambitious twin sister who forms the new B-Komachi to fulfill her dream on stage."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Episode 1: The Awakening",
                "duration": "24:00",
                "airDate": "2023",
                "desc": "Official episode 1 of OSHI NO KO. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 2,
                "title": "Episode 2: Trials of Fate",
                "duration": "24:00",
                "airDate": "2023",
                "desc": "Official episode 2 of OSHI NO KO. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 3,
                "title": "Episode 3: Shadows Collide",
                "duration": "24:00",
                "airDate": "2023",
                "desc": "Official episode 3 of OSHI NO KO. Follow the escalating journey and pivotal turning points."
          },
          {
                "ep": 4,
                "title": "Episode 4: Beyond the Boundary",
                "duration": "24:00",
                "airDate": "2023",
                "desc": "Official episode 4 of OSHI NO KO. Follow the escalating journey and pivotal turning points."
          }
    ]
  },
  {
    id: "jujutsu-kaisen-0",
    title: "JUJUTSU KAISEN 0",
    japaneseTitle: "呪術廻戦 0",
    romajiTitle: "Jujutsu Kaisen 0",
    synopsis: "Yuta Okkotsu is a nervous high school student who is suffering from a serious problem—his childhood friend Rika has turned into a curse and won't leave him alone. Since Rika is no ordinary curse, his plight is noticed by Satoru Gojo, a teacher at Jujutsu High, a school where fledgling exorcists learn how to combat curs...",
    rating: 8.3,
    ratingSource: "AniList Score (83%) • Crunchyroll (4.9/5)",
    year: 2021,
    endYear: 2021,
    season: 'Winter 2021',
    status: "Finished Airing",
    episodes: 1,
    duration: "105 min",
    studio: "MAPPA",
    source: "Theatrical Film",
    genres: ["Action","Supernatural"],
    rank: 33,
    views: "63.9M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/jujutsu-kaisen-0.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/131573-3veuVz5p0z2I.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Yuta Okkotsu",
                "jp": "乙骨憂太",
                "role": "Special Grade Sorcerer",
                "va": "Megumi Ogata",
                "ability": "Cursed Spirit Rika & Unlimited Energy",
                "image": "assets/images/web/jujutsu-kaisen-0.jpg",
                "bio": "A timid high school student haunted by the spirit of his childhood love who enters Jujutsu High."
          },
          {
                "name": "Suguru Geto",
                "jp": "夏油傑",
                "role": "Curse User Leader",
                "va": "Takahiro Sakurai",
                "ability": "Cursed Spirit Manipulation & Uzumaki",
                "image": "assets/images/web/jujutsu-kaisen-0.jpg",
                "bio": "A charismatic curse user who launches the Night Parade of a Hundred Demons across Tokyo and Kyoto."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "JUJUTSU KAISEN 0 (Theatrical Feature)",
                "duration": "105 min",
                "airDate": "2021",
                "desc": "Full theatrical presentation of JUJUTSU KAISEN 0."
          }
    ]
  },
  {
    id: "black-clover-movie",
    title: "Black Clover: Sword of the Wizard King",
    japaneseTitle: "ブラッククローバー 魔法帝の剣",
    romajiTitle: "Black Clover: Mahou Tei no Ken",
    synopsis: "As a lionhearted boy who can’t wield magic strives for the title of Wizard King, four banished Wizard Kings of yore return to crush the Clover Kingdom.\n(Source: Netflix)...",
    rating: 8,
    ratingSource: "AniList Score (80%) • Crunchyroll (4.9/5)",
    year: 2023,
    endYear: 2023,
    season: 'Summer 2023',
    status: "Finished Airing",
    episodes: 1,
    duration: "113 min",
    studio: "Studio Pierrot",
    source: "Theatrical Film",
    genres: ["Action","Adventure","Fantasy"],
    rank: 34,
    views: "65.6M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/black-clover-movie.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/131680-6jyC01S1Gila.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Asta",
                "jp": "アスタ",
                "role": "Anti-Magic Swordsman",
                "va": "Gakuto Kajiwara",
                "ability": "Demon-Slayer Sword & Black Form",
                "image": "assets/images/web/black-clover.jpg",
                "bio": "Fights against resurrected former Wizard Kings to prove that non-royals can change the world."
          },
          {
                "name": "Conrad Leto",
                "jp": "コンラート・レト",
                "role": "27th Wizard King",
                "va": "Toshihiko Seki",
                "ability": "Key Magic & Imperial Sword Elsdocia",
                "image": "assets/images/web/black-clover-movie.jpg",
                "bio": "The former Wizard King of the Clover Kingdom who returns to reshape society."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Black Clover: Sword of the Wizard King (Theatrical Feature)",
                "duration": "113 min",
                "airDate": "2023",
                "desc": "Full theatrical presentation of Black Clover: Sword of the Wizard King."
          }
    ]
  },
  {
    id: "a-silent-voice",
    title: "A Silent Voice",
    japaneseTitle: "聲の形",
    romajiTitle: "Koe no Katachi",
    synopsis: "After transferring into a new school, a deaf girl, Shouko Nishimiya, is bullied by the popular Shouya Ishida. As Shouya continues to bully Shouko, the class turns its back on him. Shouko transfers and Shouya grows up as an outcast. Alone and depressed, the regretful Shouya finds Shouko to make amends.\n\n(Source: Eleven ...",
    rating: 8.8,
    ratingSource: "AniList Score (88%) • Crunchyroll (4.9/5)",
    year: 2016,
    endYear: 2016,
    season: 'Fall 2016',
    status: "Finished Airing",
    episodes: 1,
    duration: "130 min",
    studio: "Kyoto Animation",
    source: "Theatrical Film",
    genres: ["Drama","Romance","Slice of Life"],
    rank: 35,
    views: "67.3M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/a-silent-voice.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Shoya Ishida",
                "jp": "石田将也",
                "role": "Former Bully Seeking Redemption",
                "va": "Miyu Irino",
                "ability": "Sign Language & Sincere Compassion",
                "image": "assets/images/web/a-silent-voice.jpg",
                "bio": "A high school boy striving to make amends with the deaf girl he tormented during elementary school."
          },
          {
                "name": "Shoko Nishimiya",
                "jp": "西宮硝子",
                "role": "Deaf Heroine",
                "va": "Saori Hayami",
                "ability": "Kindness & Resilience",
                "image": "assets/images/web/a-silent-voice.jpg",
                "bio": "A gentle girl who overcomes hardship and helps Shoya open his heart to friendship."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "A Silent Voice (Theatrical Feature)",
                "duration": "130 min",
                "airDate": "2016",
                "desc": "Full theatrical presentation of A Silent Voice."
          }
    ]
  },
  {
    id: "weathering-with-you",
    title: "Weathering With You",
    japaneseTitle: "天気の子",
    romajiTitle: "Tenki no Ko",
    synopsis: "High school student Hodaka leaves his home on an isolated island and moves to Tokyo, but he immediately becomes broke. He lives his days in isolation, but finally finds a job as a writer for a shady occult magazine. After he starts his job, the weather has been rainy day after day. In a corner of the crowded and busy c...",
    rating: 8.1,
    ratingSource: "AniList Score (81%) • Crunchyroll (4.9/5)",
    year: 2019,
    endYear: 2019,
    season: 'Summer 2019',
    status: "Finished Airing",
    episodes: 1,
    duration: "115 min",
    studio: "CoMix Wave",
    source: "Theatrical Film",
    genres: ["Drama","Romance","Slice of Life","Supernatural"],
    rank: 36,
    views: "35.0M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/weathering-with-you.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/106286-3oKwiwjd7Wkm.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Hodaka Morishima",
                "jp": "森嶋帆高",
                "role": "Runaway Teenager",
                "va": "Kotaro Daigo",
                "ability": "Courage & Devotion",
                "image": "assets/images/web/weathering-with-you.jpg",
                "bio": "A runaway boy who arrives in rain-soaked Tokyo and falls for a girl capable of bringing out the sunshine."
          },
          {
                "name": "Hina Amano",
                "jp": "天野陽菜",
                "role": "Sunshine Maiden (100% Hare Onna)",
                "va": "Nana Mori",
                "ability": "Weather Manipulation Through Prayer",
                "image": "assets/images/web/weathering-with-you.jpg",
                "bio": "An orphaned girl whose heartfelt prayers clear the relentless rain above Tokyo."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Weathering With You (Theatrical Feature)",
                "duration": "115 min",
                "airDate": "2019",
                "desc": "Full theatrical presentation of Weathering With You."
          }
    ]
  },
  {
    id: "spirited-away",
    title: "Spirited Away",
    japaneseTitle: "千と千尋の神隠し",
    romajiTitle: "Sen to Chihiro no Kamikakushi",
    synopsis: "On the way to their new home, 10-year-old Chihiro Ogino's family stumbles upon a deserted theme park. Intrigued, the family investigates the park, though unbeknownst to them, it is secretly inhabited by spirits who sleep by day and appear at night. When Chihiro's mother and father eat food from a restaurant in the stre...",
    rating: 8.6,
    ratingSource: "AniList Score (86%) • Crunchyroll (4.9/5)",
    year: 2001,
    endYear: 2001,
    season: 'Summer 2001',
    status: "Finished Airing",
    episodes: 1,
    duration: "125 min",
    studio: "Studio Ghibli",
    source: "Theatrical Film",
    genres: ["Adventure","Drama","Fantasy","Supernatural"],
    rank: 37,
    views: "36.7M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/spirited-away.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/199-Sm2RU5PSqw7T.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Chihiro Ogino (Sen)",
                "jp": "荻野千尋",
                "role": "Spirit Bathhouse Worker",
                "va": "Rumi Hiiragi",
                "ability": "Inner Courage & Moral Integrity",
                "image": "assets/images/web/spirited-away.jpg",
                "bio": "A ten-year-old girl who finds the strength to survive in an enchanted spirit realm and rescue her parents."
          },
          {
                "name": "Haku (Nigihayami Kohakunushi)",
                "jp": "ハク",
                "role": "River Spirit / Dragon",
                "va": "Miyu Irino",
                "ability": "Dragon Transformation & Spirit Magic",
                "image": "assets/images/web/spirited-away.jpg",
                "bio": "The mysterious boy and river deity who guides Chihiro through Yubaba’s domain."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Spirited Away (Theatrical Feature)",
                "duration": "125 min",
                "airDate": "2001",
                "desc": "Full theatrical presentation of Spirited Away."
          }
    ]
  },
  {
    id: "princess-mononoke",
    title: "Princess Mononoke",
    japaneseTitle: "もののけ姫",
    romajiTitle: "Mononoke-hime",
    synopsis: "A calm village residing in the mountains comes under attack from a demon-possessed boar one day.\nAshitaka, a young man and prince of the tribe, engages the creature in an attempt to save his village. During the battle, the boar bites him on the arm, leaving it blackened and cursed. Following his village's traditions, A...",
    rating: 8.5,
    ratingSource: "AniList Score (85%) • Crunchyroll (4.9/5)",
    year: 1997,
    endYear: 1997,
    season: 'Summer 1997',
    status: "Finished Airing",
    episodes: 1,
    duration: "134 min",
    studio: "Studio Ghibli",
    source: "Theatrical Film",
    genres: ["Action","Adventure","Drama","Fantasy"],
    rank: 38,
    views: "38.4M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/princess-mononoke.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/164-Aj6MINy7VTfs.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Ashitaka",
                "jp": "アシタカ",
                "role": "Emishi Prince",
                "va": "Yoji Matsuda",
                "ability": "Curse-Enhanced Archery & Swordsmanship",
                "image": "assets/images/web/princess-mononoke.jpg",
                "bio": "An upright young prince who journeys westward to see with eyes unclouded by hate."
          },
          {
                "name": "San (Princess Mononoke)",
                "jp": "サン",
                "role": "Wolf God Daughter",
                "va": "Yuriko Ishida",
                "ability": "Dagger Combat & Forest Guerrilla Tactics",
                "image": "assets/images/web/princess-mononoke.jpg",
                "bio": "A human girl raised by the wolf god Moro who fights to preserve the sacred forest against Iron Town."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Princess Mononoke (Theatrical Feature)",
                "duration": "134 min",
                "airDate": "1997",
                "desc": "Full theatrical presentation of Princess Mononoke."
          }
    ]
  },
  {
    id: "one-piece-film-red",
    title: "One Piece Film: Red",
    japaneseTitle: "ONE PIECE FILM RED",
    romajiTitle: "ONE PIECE FILM: RED",
    synopsis: "An almighty voice. With fiery red locks.\nThe story takes place on an island where Uta, the world’s favorite diva, performs for the first time in public. Uta’s singing voice, which she sings with while concealing her true identity, has been described as “otherworldly,” and while the venue is filled with the Straw Hats l...",
    rating: 7.8,
    ratingSource: "AniList Score (78%) • Crunchyroll (4.9/5)",
    year: 2022,
    endYear: 2022,
    season: 'Summer 2022',
    status: "Finished Airing",
    episodes: 1,
    duration: "115 min",
    studio: "Toei Animation",
    source: "Theatrical Film",
    genres: ["Action","Adventure","Comedy","Drama","Fantasy","Music"],
    rank: 39,
    views: "40.1M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/one-piece-film-red.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/141902-SvnRSXnN7DWC.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Uta",
                "jp": "ウタ",
                "role": "World Diva / Shanks’ Daughter",
                "va": "Kaori Nazuka (Vocals: Ado)",
                "ability": "Sing-Sing Fruit (Uta Uta no Mi)",
                "image": "assets/images/web/one-piece-film-red.jpg",
                "bio": "The beloved diva of Elegia who creates an idyllic dream paradise with her otherworldly singing voice."
          },
          {
                "name": "Monkey D. Luffy",
                "jp": "モンキー・D・ルフィ",
                "role": "Straw Hat Captain",
                "va": "Mayumi Tanaka",
                "ability": "Gear 5 Awakening & Gum-Gum Attacks",
                "image": "assets/images/web/one-piece.jpg",
                "bio": "Luffy travels to Elegia island to attend Uta’s first live concert and protect his old friend."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "One Piece Film: Red (Theatrical Feature)",
                "duration": "115 min",
                "airDate": "2022",
                "desc": "Full theatrical presentation of One Piece Film: Red."
          }
    ]
  },
  {
    id: "mugen-train",
    title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
    japaneseTitle: "鬼滅の刃 無限列車編",
    romajiTitle: "Kimetsu no Yaiba: Mugen Ressha-hen",
    synopsis: "This Demon Slayer movie sees Tanjiro Kamado and friends from the Demon Slayer corps board the Infinity Train on a new mission to investigate a mysterious series of disappearances, perpetrated by a demon who has been tormenting people and killing the demon slayers who oppose it.",
    rating: 8.4,
    ratingSource: "AniList Score (84%) • Crunchyroll (4.9/5)",
    year: 2020,
    endYear: 2020,
    season: 'Fall 2020',
    status: "Finished Airing",
    episodes: 1,
    duration: "117 min",
    studio: "ufotable",
    source: "Theatrical Film",
    genres: ["Action","Adventure","Drama","Fantasy","Mystery","Supernatural"],
    rank: 40,
    views: "41.8M",
    trend: "BOX OFFICE HIT",
    poster: "assets/images/web/mugen-train.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/112151-eHCBz19nf2yC.jpg",
    featured: false,
    spotlight: false,
    isMovie: true,
    airDay: 'Theatrical',
    airTime: 'Special',
    characters: [
          {
                "name": "Kyojuro Rengoku",
                "jp": "煉獄杏寿郎",
                "role": "Flame Hashira",
                "va": "Satoshi Hino",
                "ability": "Flame Breathing: Ninth Form Rengoku",
                "image": "assets/images/web/mugen-train.jpg",
                "bio": "The charismatic Flame Hashira who sets his heart ablaze to safeguard all 200 passengers."
          },
          {
                "name": "Tanjiro Kamado",
                "jp": "竈門炭治郎",
                "role": "Demon Slayer",
                "va": "Natsuki Hanae",
                "ability": "Hinokami Kagura & Sun Breathing",
                "image": "assets/images/web/demon-slayer.jpg",
                "bio": "A determined brother fighting through dream illusions to defeat Upper Rank demons."
          }
    ],
    episodesList: [
          {
                "ep": 1,
                "title": "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train (Theatrical Feature)",
                "duration": "117 min",
                "airDate": "2020",
                "desc": "Full theatrical presentation of Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train."
          }
    ]
  }
];

/* Helper to get Crunchyroll Search Link safely */
function getCrunchyrollUrl(title) {
  return `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`;
}

/* ==========================================================================
   2. WATCHLIST STORE (localStorage)
   ========================================================================== */
const WATCHLIST_STORAGE_KEY = 'animeverse_watchlist';

const WatchlistStore = {
  getAll() {
    try {
      const data = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load watchlist from localStorage', e);
      return [];
    }
  },

  has(animeId) {
    const list = this.getAll();
    return list.some(item => item.id === animeId);
  },

  add(animeId, status = 'Watching') {
    const list = this.getAll();
    if (list.some(item => item.id === animeId)) {
      showToast('Anime is already in your Watchlist!', 'info');
      return false;
    }
    const anime = ANIME_DATABASE.find(a => a.id === animeId);
    if (!anime) return false;

    list.push({
      id: anime.id,
      title: anime.title,
      poster: anime.poster,
      rating: anime.rating,
      genres: anime.genres,
      status: status,
      progress: 0,
      totalEpisodes: anime.episodes || (anime.isMovie ? 1 : 12),
      addedAt: new Date().toISOString()
    });

    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
      this.updateBadges();
      showToast(`Added "${anime.title}" to Watchlist!`, 'success');
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      return false;
    }
  },

  updateStatus(animeId, newStatus) {
    const list = this.getAll();
    const item = list.find(x => x.id === animeId);
    if (item) {
      item.status = newStatus;
      if (newStatus === 'Completed' && item.totalEpisodes) {
        item.progress = item.totalEpisodes;
      }
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
      showToast(`Updated status for "${item.title}" to ${newStatus}`, 'info');
      return true;
    }
    return false;
  },

  updateProgress(animeId, delta) {
    const list = this.getAll();
    const item = list.find(x => x.id === animeId);
    if (item) {
      const total = item.totalEpisodes || 12;
      let cur = (item.progress || 0) + delta;
      if (cur < 0) cur = 0;
      if (cur > total) cur = total;
      item.progress = cur;
      if (cur === total && item.status !== 'Completed') {
        item.status = 'Completed';
        showToast(`Congratulations! Completed "${item.title}"! 🎉`, 'success');
      }
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
      return item.progress;
    }
    return 0;
  },

  remove(animeId) {
    let list = this.getAll();
    const anime = ANIME_DATABASE.find(a => a.id === animeId);
    const title = anime ? anime.title : 'Anime';
    list = list.filter(item => item.id !== animeId);

    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
      this.updateBadges();
      showToast(`Removed "${title}" from Watchlist.`, 'info');
      return true;
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
      return false;
    }
  },

  toggle(animeId) {
    if (this.has(animeId)) {
      this.remove(animeId);
      return false;
    } else {
      this.add(animeId);
      return true;
    }
  },

  clear() {
    localStorage.removeItem(WATCHLIST_STORAGE_KEY);
    this.updateBadges();
    showToast('Watchlist cleared.', 'info');
  },

  updateBadges() {
    const count = this.getAll().length;
    document.querySelectorAll('.watchlist-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }
};

/* ==========================================================================
   3. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, 3200);
}

/* ==========================================================================
   4. NAVIGATION & HEADER CONTROLLER
   ========================================================================== */
function initNavigation() {
  // Inject futuristic Audio FX button into header if not present
  const headerActions = document.querySelector('.header-actions');
  if (headerActions && !document.querySelector('#btn-audio-fx')) {
    const sfxBtn = document.createElement('button');
    sfxBtn.id = 'btn-audio-fx';
    sfxBtn.className = `audio-fx-toggle ${SoundFX.enabled ? 'active' : ''}`;
    sfxBtn.title = 'Toggle Futuristic Cyberpunk Audio FX';
    sfxBtn.innerHTML = `
      <span class="eq-bars">
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
      </span>
      <span class="audio-fx-label">${SoundFX.enabled ? 'SFX: ON' : 'SFX: OFF'}</span>
    `;
    headerActions.insertBefore(sfxBtn, headerActions.firstChild);

    sfxBtn.onclick = (e) => {
      e.preventDefault();
      const active = SoundFX.toggle();
      sfxBtn.classList.toggle('active', active);
      sfxBtn.querySelector('.audio-fx-label').textContent = active ? 'SFX: ON' : 'SFX: OFF';
      showToast(active ? 'Cyberpunk Audio FX Enabled' : 'Audio FX Muted', 'info');
    };
  }

  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target) && mobileDrawer.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
      }
    });
  }

  const headerSearchInput = document.querySelector('.header-search-box input');
  const searchDropdown = document.querySelector('.search-results-dropdown');

  if (headerSearchInput && searchDropdown) {
    headerSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchDropdown.classList.remove('active');
        searchDropdown.innerHTML = '';
        return;
      }

      const matches = ANIME_DATABASE.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.genres.some(g => g.toLowerCase().includes(q))
      ).slice(0, 5);

      if (matches.length > 0) {
        searchDropdown.innerHTML = matches.map(a => `
          <a href="anime-details.html?id=${a.id}" class="search-item">
            <img src="${a.poster}" alt="${a.title}" onerror="this.onerror=null; this.src='assets/images/posters/${a.id}.svg'">
            <div class="search-item-info">
              <div class="search-item-title">${a.title}</div>
              <div class="search-item-meta">★ ${a.rating} • ${a.year} • ${a.genres.slice(0, 2).join(', ')}</div>
            </div>
          </a>
        `).join('');
        searchDropdown.classList.add('active');
      } else {
        searchDropdown.innerHTML = `<div style="padding: 0.8rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">No anime found</div>`;
        searchDropdown.classList.add('active');
      }
    });

    headerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = headerSearchInput.value.trim();
        if (q) window.location.href = `explore.html?search=${encodeURIComponent(q)}`;
      }
    });

    document.addEventListener('click', (e) => {
      if (!headerSearchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('active');
      }
    });
  }

  WatchlistStore.updateBadges();
}

/* ==========================================================================
   5. REUSABLE ANIME CARD HTML GENERATOR
   ========================================================================== */
function createAnimeCardHTML(anime, options = {}) {
  const isSaved = WatchlistStore.has(anime.id);
  const showRank = options.showRank && anime.rank;
  const rankClass = anime.rank === 1 ? 'top-1' : anime.rank === 2 ? 'top-2' : anime.rank === 3 ? 'top-3' : '';

  return `
    <div class="anime-card" data-id="${anime.id}">
      <div class="anime-poster-wrap">
        <button class="anime-quick-view-btn" onclick="event.preventDefault(); event.stopPropagation(); openQuickPreview('${anime.id}')">👁️ QUICK PREVIEW</button>
        <img class="anime-poster-img" src="${anime.poster}" alt="${anime.title}" onerror="this.onerror=null; this.src='assets/images/posters/${anime.id}.svg'" loading="lazy">
        ${showRank ? `<div class="rank-badge ${rankClass}">${anime.rank}</div>` : ''}
        <button class="btn-card-watchlist ${isSaved ? 'active' : ''}" data-anime-id="${anime.id}" title="${isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}" aria-label="Watchlist">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <a href="anime-details.html?id=${anime.id}" class="card-play-overlay">
          <div class="card-play-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </a>
      </div>
      <div class="anime-card-body">
        <a href="anime-details.html?id=${anime.id}" class="anime-card-title" title="${anime.title}">${anime.title}</a>
        <div class="anime-card-meta">
          <span>${anime.year}</span>
          <span class="anime-card-rating">★ ${anime.rating}</span>
        </div>
      </div>
    </div>
  `;
}

function bindWatchlistHeartButtons() {
  document.querySelectorAll('.btn-card-watchlist').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-anime-id');
      const nowSaved = WatchlistStore.toggle(id);
      if (nowSaved) {
        btn.classList.add('active');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
    };
  });
}

/* ==========================================================================
   HOMEPAGE INTERACTIVE CONTROLS: QUOTE VAULT, FAN BATTLE & SIMULCAST ALERTS
   ========================================================================== */

const ANIME_QUOTES = [
  {
    quote: "My magic is never giving up! I will shatter every destiny and become the next Wizard King!",
    jp: "「諦めないのがオレの魔法だ！」",
    author: "ASTA • BLACK CLOVER (SPADE KINGDOM RAID ARC)",
    avatar: "assets/images/web/char-asta.jpg",
    fallback: "assets/images/characters/asta.svg"
  },
  {
    quote: "Throughout Heaven and Earth, I alone am the honored one.",
    jp: "「天上天下唯我独尊」",
    author: "GOJO SATORU • JUJUTSU KAISEN",
    avatar: "assets/images/web/char-gojo.jpg",
    fallback: "assets/images/characters/gojo.svg"
  },
  {
    quote: "The only thing we're allowed to do is believe that we won't regret the choice we made.",
    jp: "「悔いが残らない方を自分で選べ」",
    author: "LEVI ACKERMAN • ATTACK ON TITAN",
    avatar: "assets/images/web/char-levi.jpg",
    fallback: "assets/images/characters/levi.svg"
  },
  {
    quote: "My soldiers, rage! My soldiers, scream! My soldiers, fight!",
    jp: "「兵士よ怒れ！兵士よ叫べ！兵士よ戦え！」",
    author: "ERWIN SMITH • ATTACK ON TITAN",
    avatar: "assets/images/web/char-eren.jpg",
    fallback: "assets/images/characters/eren.svg"
  },
  {
    quote: "Arise.",
    jp: "「起きろ (일어나라)」",
    author: "SUNG JIN-WOO • SOLO LEVELING",
    avatar: "assets/images/web/char-jinwoo.jpg",
    fallback: "assets/images/characters/sung-jinwoo.svg"
  },
  {
    quote: "A lesson without pain is meaningless. For something must be sacrificed to gain another.",
    jp: "「痛みを伴わない教訓には意義がない」",
    author: "EDWARD ELRIC • FULLMETAL ALCHEMIST",
    avatar: "assets/images/web/char-deku.jpg",
    fallback: "assets/images/characters/asta.svg"
  },
  {
    quote: "No one knows what the future holds. That's why its potential is infinite.",
    jp: "「未来のことは誰にも分からない。だからこそ可能性は無限なのだ」",
    author: "RINTARO OKABE • STEINS;GATE",
    avatar: "assets/images/web/char-okabe.jpg",
    fallback: "assets/images/characters/okabe.svg"
  },
  {
    quote: "If you don't take risks, you can't create a future.",
    jp: "「命を賭けずに未来は創れない」",
    author: "MONKEY D. LUFFY • ONE PIECE",
    avatar: "assets/images/web/char-luffy.jpg",
    fallback: "assets/images/characters/luffy.svg"
  }
];

let currentQuoteIndex = 0;

function cycleAnimeQuote() {
  SoundFX.playLaser();
  currentQuoteIndex = (currentQuoteIndex + 1) % ANIME_QUOTES.length;
  const q = ANIME_QUOTES[currentQuoteIndex];

  const avatar = document.getElementById('daily-quote-avatar');
  const text = document.getElementById('daily-quote-text');
  const jp = document.getElementById('daily-quote-jp');
  const author = document.getElementById('daily-quote-author');

  if (text) {
    text.style.opacity = '0';
    text.style.transform = 'translateY(6px)';
    text.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      text.textContent = `"${q.quote}"`;
      if (jp) jp.textContent = q.jp;
      if (author) author.textContent = `— ${q.author}`;
      if (avatar) {
        avatar.src = q.avatar;
        avatar.onerror = function() { this.src = q.fallback; };
      }
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)';
    }, 200);
  }
}

function voteFanBattle(fighter) {
  SoundFX.playLaser();
  let votes = JSON.parse(localStorage.getItem('animeverse_fan_battle_votes') || '{"asta": 1284, "sukuna": 1142}');
  if (fighter === 'asta') {
    votes.asta += 1;
    showToast('⚔️ Vote recorded for Asta (Devil Union)! Anti-Magic power surged +1!', 'success');
  } else {
    votes.sukuna += 1;
    showToast('💀 Vote recorded for Ryomen Sukuna! Cursed Energy surged +1!', 'success');
  }
  localStorage.setItem('animeverse_fan_battle_votes', JSON.stringify(votes));
  updateBattleArenaUI(votes);
}

function updateBattleArenaUI(votes) {
  const total = (votes.asta || 1284) + (votes.sukuna || 1142);
  const pctA = Math.round(((votes.asta || 1284) / total) * 100);
  const pctB = 100 - pctA;

  const fillA = document.getElementById('battle-fill-a');
  const labelA = document.getElementById('battle-pct-a');
  const labelB = document.getElementById('battle-pct-b');

  if (fillA) fillA.style.width = `${pctA}%`;
  if (labelA) labelA.textContent = `ASTA: ${pctA}% (${votes.asta.toLocaleString()})`;
  if (labelB) labelB.textContent = `SUKUNA: ${pctB}% (${votes.sukuna.toLocaleString()})`;
}

function setSimulcastAlert(animeName) {
  SoundFX.playLaser();
  showToast(`🔔 Simulcast reminder activated for ${animeName}! You will be alerted before broadcast.`, 'success');
}

window.cycleAnimeQuote = cycleAnimeQuote;
window.voteFanBattle = voteFanBattle;
window.updateBattleArenaUI = updateBattleArenaUI;
window.setSimulcastAlert = setSimulcastAlert;

/* ==========================================================================
   6. PAGE: HOME (index.html)
   ========================================================================== */
function initHomePage() {

  // Initialize Fan Battle Arena Live Poll UI
  const savedVotes = JSON.parse(localStorage.getItem('animeverse_fan_battle_votes') || '{"asta": 1284, "sukuna": 1142}');
  updateBattleArenaUI(savedVotes);

  // Black Clover Season 2 Episode Archive Switcher
  const bc2Btns = document.querySelectorAll('.bc2-ep-btn');
  const bc2Box = document.querySelector('#bc2-ep-preview-box');
  bc2Btns.forEach(btn => {
    btn.onclick = () => {
      SoundFX.playClick();
      bc2Btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const epNum = btn.getAttribute('data-ep');
      const desc = btn.getAttribute('data-desc');
      if (bc2Box) {
        bc2Box.innerHTML = `<strong>Ep ${epNum}:</strong> ${desc}`;
      }
    };
  });


  const trendingWrap = document.querySelector('#home-trending-scroll');
  if (trendingWrap) {
    const trendingList = ANIME_DATABASE.slice(0, 8);
    trendingWrap.innerHTML = trendingList.map((a, i) => createAnimeCardHTML(a, { showRank: true })).join('');
    bindWatchlistHeartButtons();

    const prevBtn = document.querySelector('#btn-trending-prev');
    const nextBtn = document.querySelector('#btn-trending-next');
    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => trendingWrap.scrollBy({ left: -260, behavior: 'smooth' });
      nextBtn.onclick = () => trendingWrap.scrollBy({ left: 260, behavior: 'smooth' });
    }
  }

  const discoverWrap = document.querySelector('#home-discover-grid');
  if (discoverWrap) {
    const discoverList = ANIME_DATABASE.slice(4, 12);
    discoverWrap.innerHTML = discoverList.map(a => createAnimeCardHTML(a)).join('');
    bindWatchlistHeartButtons();
  }

  const heroSlides = [
    {
      id: 'black-clover-season-2',
      tag: 'WORLD PREMIERE SIMULCAST',
      title: 'BLACK CLOVER: SEASON 2',
      sub: 'ブラッククローバー 第2期 (スペード王国攻略編)',
      desc: 'The Magic Knights launch an all-out invasion into the Spade Kingdom. Asta attains Devil Union with Liebe to rescue Captain Yami and stop the gates of the underworld from opening.',
      rating: '4.95',
      year: '2024-2025',
      genres: ['Action', 'Fantasy', 'Shonen'],
      bg: 'assets/images/banners/black clover.jpg'
    },
    {
      id: 'solo-leveling',
      tag: 'FEATURED ANIME',
      title: 'SOLO LEVELING',
      sub: '俺だけレベルアップな件',
      desc: 'In a world where Hunters battle deadly monsters to protect humanity, the weakest hunter Sung Jinwoo discovers a hidden power that changes everything.',
      rating: '4.8',
      year: '2024',
      genres: ['Action', 'Adventure', 'Fantasy'],
      bg: 'assets/images/hero-solo-leveling.jpg'
    },
    {
      id: 'black-clover',
      tag: 'SPOTLIGHT SHONEN',
      title: 'BLACK CLOVER',
      sub: 'ブラッククローバー',
      desc: 'Born without an ounce of magic in a world ruled by arcane power, Asta unlocks an ancient Anti-Magic blade to surpass his limits and conquer the throne of Wizard King.',
      rating: '4.8',
      year: '2017-2021',
      genres: ['Action', 'Fantasy', 'Comedy'],
      bg: 'assets/images/banners/black-clover-banner.svg'
    },
    {
      id: 'jujutsu-kaisen',
      tag: 'DARK FANTASY PHENOMENON',
      title: 'JUJUTSU KAISEN',
      sub: '呪術廻戦',
      desc: 'When high school athlete Yuji Itadori consumes the finger of Ryomen Sukuna, he steps into the ruthless underworld of Tokyo Jujutsu Sorcery.',
      rating: '4.9',
      year: '2020-2023',
      genres: ['Action', 'Supernatural', 'Dark Fantasy'],
      bg: 'assets/images/character-sukuna.jpg'
    }
  ];

  let currentSlide = 0;
  const heroTitle = document.querySelector('#hero-title');
  const heroDesc = document.querySelector('#hero-desc');
  const heroBg = document.querySelector('#hero-bg-img');
  const heroRating = document.querySelector('#hero-rating');
  const heroYear = document.querySelector('#hero-year');
  const heroGenresWrap = document.querySelector('#hero-genres');
  const heroExploreBtn = document.querySelector('#hero-btn-explore');
  const heroWatchBtn = document.querySelector('#hero-btn-watch');
  const heroDots = document.querySelectorAll('.hero-dot');

  function updateHeroSlide(idx) {
    currentSlide = idx;
    const s = heroSlides[idx];
    if (heroTitle) heroTitle.textContent = s.title;
    if (heroDesc) heroDesc.textContent = s.desc;
    if (heroBg) heroBg.src = s.bg;
    if (heroRating) heroRating.textContent = `★ ${s.rating}`;
    if (heroYear) heroYear.textContent = s.year;
    if (heroExploreBtn) heroExploreBtn.href = `anime-details.html?id=${s.id}`;
    if (heroWatchBtn) heroWatchBtn.href = `watch.html?id=${s.id}`;

    if (heroGenresWrap) {
      heroGenresWrap.innerHTML = s.genres.map(g => `<span class="badge badge-genre">${g}</span>`).join('');
    }

    heroDots.forEach((dot, dIdx) => {
      dot.classList.toggle('active', dIdx === idx);
    });
  }

  heroDots.forEach((dot, idx) => {
    dot.onclick = () => updateHeroSlide(idx);
  });

  const heroPrev = document.querySelector('#hero-prev-btn');
  const heroNext = document.querySelector('#hero-next-btn');
  if (heroPrev) {
    heroPrev.onclick = () => {
      const nextIdx = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      updateHeroSlide(nextIdx);
    };
  }
  if (heroNext) {
    heroNext.onclick = () => {
      const nextIdx = (currentSlide + 1) % heroSlides.length;
      updateHeroSlide(nextIdx);
    };
  }
}

/* ==========================================================================
   7. PAGE: EXPLORE (explore.html)
   ========================================================================== */
function initExplorePage() {
  const grid = document.querySelector('#explore-anime-grid');
  const searchInput = document.querySelector('#explore-search-input');
  const sortSelect = document.querySelector('#explore-sort-select');
  const yearSelect = document.querySelector('#explore-year-select');
  const clearBtn = document.querySelector('#explore-clear-filters');
  const resultCount = document.querySelector('#explore-results-count');
  const chips = document.querySelectorAll('.genre-chip');

  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';
  const initialGenre = urlParams.get('genre') || '';

  if (initialSearch && searchInput) searchInput.value = initialSearch;

  let activeGenre = initialGenre;
  if (initialGenre) {
    chips.forEach(chip => {
      if (chip.getAttribute('data-genre').toLowerCase() === initialGenre.toLowerCase()) {
        chip.classList.add('active');
      }
    });
  }

  function filterAndRender() {
    const q = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
    const sortBy = sortSelect ? sortSelect.value : 'rating';
    const yearFilter = yearSelect ? yearSelect.value : 'all';

    let filtered = ANIME_DATABASE.filter(anime => {
      const matchQuery = !q || anime.title.toLowerCase().includes(q) || anime.genres.some(g => g.toLowerCase().includes(q));
      const matchGenre = !activeGenre || activeGenre === 'all' || anime.genres.some(g => g.toLowerCase() === activeGenre.toLowerCase());
      let matchYear = true;
      if (yearFilter === '2024') matchYear = anime.year === 2024;
      else if (yearFilter === '2020s') matchYear = anime.year >= 2020;
      else if (yearFilter === '2010s') matchYear = anime.year >= 2010 && anime.year < 2020;
      else if (yearFilter === 'classic') matchYear = anime.year < 2010;

      return matchQuery && matchGenre && matchYear;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
      return 0;
    });

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} of ${ANIME_DATABASE.length} Anime`;
    }

    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-watchlist-box" style="grid-column: 1 / -1;">
            <div style="font-size: 2.5rem;">🔍</div>
            <h3 style="font-family: var(--font-display); font-size: 1.3rem;">No Anime Found</h3>
            <p style="color: var(--text-secondary); max-width: 440px;">We couldn't find any anime matching your criteria. Try adjusting your search query or reset your filters.</p>
            <button id="btn-reset-empty" class="btn btn-primary btn-sm">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.querySelector('#btn-reset-empty');
        if (resetBtn) resetBtn.onclick = resetFilters;
      } else {
        grid.innerHTML = filtered.map(a => createAnimeCardHTML(a)).join('');
        bindWatchlistHeartButtons();
      }
    }
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'rating';
    if (yearSelect) yearSelect.value = 'all';
    activeGenre = '';
    chips.forEach(c => c.classList.remove('active'));
    filterAndRender();
  }

  if (searchInput) searchInput.addEventListener('input', filterAndRender);
  if (sortSelect) sortSelect.addEventListener('change', filterAndRender);
  if (yearSelect) yearSelect.addEventListener('change', filterAndRender);
  if (clearBtn) clearBtn.addEventListener('click', resetFilters);

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      const genre = chip.getAttribute('data-genre');
      if (activeGenre === genre) {
        activeGenre = '';
      } else {
        chip.classList.add('active');
        activeGenre = genre;
      }
      filterAndRender();
    });
  });

  filterAndRender();
}

/* ==========================================================================
   8. PAGE: ANIME DETAILS (anime-details.html)
   ========================================================================== */
function initAnimeDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id') || 'black-clover';
  const anime = ANIME_DATABASE.find(a => a.id === animeId) || ANIME_DATABASE[0];

  document.title = `${anime.title} — Anime Information | ANIMEVERSE`;

  const heroBg = document.querySelector('#details-hero-bg');
  const posterImg = document.querySelector('#details-poster-img');
  const titleElem = document.querySelector('#details-title');
  const jpElem = document.querySelector('#details-jp');
  const synopsisElem = document.querySelector('#details-synopsis');
  const ratingElem = document.querySelector('#details-rating');
  const statusElem = document.querySelector('#details-status');
  const episodesElem = document.querySelector('#details-episodes');
  const yearElem = document.querySelector('#details-year');
  const studioElem = document.querySelector('#details-studio');
  const sourceElem = document.querySelector('#details-source');
  const genresWrap = document.querySelector('#details-genres');
  const crunchyrollBtn = document.querySelector('#btn-details-crunchyroll');
  const watchHubBtn = document.querySelector('#btn-details-watchhub');
  const watchlistBtn = document.querySelector('#btn-details-watchlist');

  if (heroBg) heroBg.src = anime.banner || anime.poster;
  if (posterImg) {
    posterImg.src = anime.poster;
    posterImg.onerror = () => { posterImg.src = `assets/images/posters/${anime.id}.svg`; };
  }
  if (titleElem) titleElem.textContent = anime.title;
  if (jpElem) jpElem.textContent = anime.japaneseTitle;
  if (synopsisElem) synopsisElem.textContent = anime.synopsis;
  if (ratingElem) ratingElem.textContent = anime.ratingSource || `★ ${anime.rating}`;
  if (statusElem) statusElem.textContent = anime.status;
  if (episodesElem) episodesElem.textContent = `${anime.episodes} Episodes (${anime.duration})`;
  if (yearElem) yearElem.textContent = anime.endYear ? `${anime.year} - ${anime.endYear}` : `${anime.year}`;
  if (studioElem) studioElem.textContent = anime.studio;
  if (sourceElem) sourceElem.textContent = anime.source;

  if (genresWrap) {
    genresWrap.innerHTML = anime.genres.map(g => `<a href="explore.html?genre=${encodeURIComponent(g)}" class="badge badge-genre">${g}</a>`).join('');
  }

  if (crunchyrollBtn) {
    crunchyrollBtn.href = getCrunchyrollUrl(anime.title);
    crunchyrollBtn.target = '_blank';
    crunchyrollBtn.rel = 'noopener noreferrer';
  }

  if (watchHubBtn) {
    watchHubBtn.href = `watch.html?id=${anime.id}`;
  }

  if (watchlistBtn) {
    function updateWlBtn() {
      const saved = WatchlistStore.has(anime.id);
      watchlistBtn.innerHTML = saved 
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> In Watchlist`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Add to Watchlist`;
      watchlistBtn.classList.toggle('btn-primary', !saved);
      watchlistBtn.classList.toggle('btn-secondary', saved);
    }
    updateWlBtn();

    watchlistBtn.onclick = () => {
      WatchlistStore.toggle(anime.id);
      updateWlBtn();
    };
  }

  const charGrid = document.querySelector('#details-characters-grid');
  if (charGrid && anime.characters) {
    charGrid.innerHTML = anime.characters.map(c => `
      <div class="char-mini-card">
        <img class="char-mini-img" src="${c.image}" alt="${c.name}" onerror="this.src='assets/images/characters/asta.svg'">
        <div class="char-mini-info">
          <div class="char-mini-name">${c.name}</div>
          <div class="char-mini-role">${c.role}</div>
        </div>
      </div>
    `).join('');
  }

  const epGuide = document.querySelector('#details-episodes-list');
  if (epGuide && anime.episodesList) {
    epGuide.innerHTML = anime.episodesList.map(ep => `
      <a href="watch.html?id=${anime.id}&ep=${ep.ep}" class="episode-item">
        <div class="episode-num">#${ep.ep}</div>
        <div class="episode-info">
          <div class="episode-title">${ep.title}</div>
          <div class="episode-duration">${ep.duration} • Aired ${ep.airDate}</div>
        </div>
        <div class="badge badge-featured">Preview</div>
      </a>
    `).join('');
  }

  const relatedWrap = document.querySelector('#details-related-grid');
  if (relatedWrap) {
    const related = ANIME_DATABASE.filter(a => a.id !== anime.id && a.genres.some(g => anime.genres.includes(g))).slice(0, 4);
    relatedWrap.innerHTML = related.map(a => createAnimeCardHTML(a)).join('');
    bindWatchlistHeartButtons();
  }
}

/* ==========================================================================
   9. PAGE: WATCH HUB (watch.html)
   ========================================================================== */
function initWatchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id') || 'black-clover';
  const epNum = parseInt(urlParams.get('ep') || '1', 10);
  const anime = ANIME_DATABASE.find(a => a.id === animeId) || ANIME_DATABASE[0];

  document.title = `Watch ${anime.title} — Official Anime Hub | ANIMEVERSE`;

  const titleElem = document.querySelector('#watch-anime-title');
  const epElem = document.querySelector('#watch-episode-badge');
  const epDescElem = document.querySelector('#watch-episode-desc');
  const backdropArt = document.querySelector('#watch-player-art');
  const crunchyrollBtn = document.querySelector('#watch-btn-crunchyroll');
  const crunchyrollAlertBtn = document.querySelector('#btn-alert-crunchyroll');

  if (titleElem) titleElem.textContent = anime.title;
  if (epElem) epElem.textContent = anime.isMovie ? 'Feature Film' : `Episode ${epNum}`;

  const animeSelect = document.querySelector('#watch-anime-select');
  if (animeSelect) {
    animeSelect.innerHTML = ANIME_DATABASE.slice().sort((a,b) => a.title.localeCompare(b.title)).map(a => `
      <option value="${a.id}" ${a.id === anime.id ? 'selected' : ''}>${a.title} ${a.isMovie ? '🎬 [Movie]' : '📺 [Series]'}</option>
    `).join('');
    animeSelect.onchange = (e) => {
      window.location.href = `watch.html?id=${e.target.value}`;
    };
  }
  if (backdropArt) {
    backdropArt.src = anime.banner || anime.poster;
    backdropArt.onerror = () => { backdropArt.src = 'assets/images/banners/black-clover-banner.svg'; };
  }

  const curEp = anime.episodesList ? anime.episodesList.find(e => e.ep === epNum) || anime.episodesList[0] : null;
  if (epDescElem && curEp) {
    epDescElem.textContent = `${curEp.title}: ${curEp.desc}`;
  }

  const crLink = getCrunchyrollUrl(anime.title);
  if (crunchyrollBtn) {
    crunchyrollBtn.href = crLink;
    crunchyrollBtn.target = '_blank';
    crunchyrollBtn.rel = 'noopener noreferrer';
  }
  if (crunchyrollAlertBtn) {
    crunchyrollAlertBtn.href = crLink;
    crunchyrollAlertBtn.target = '_blank';
    crunchyrollAlertBtn.rel = 'noopener noreferrer';
  }

  const playBtn = document.querySelector('#player-center-play');
  const ctrlPlayBtn = document.querySelector('#ctrl-play-pause');
  const scrubberFill = document.querySelector('#player-scrubber-fill');
  const timeDisplay = document.querySelector('#player-timecode');
  let isPlaying = false;
  let playInterval = null;
  let currentSec = 25;
  const totalSec = 1420;

  function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (playBtn) playBtn.style.opacity = '0';
      if (ctrlPlayBtn) ctrlPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      showToast(`Previewing "${anime.title}" Episode ${epNum}. Stream full episodes on Crunchyroll.`, 'info');

      playInterval = setInterval(() => {
        currentSec += 1;
        if (currentSec >= totalSec) currentSec = 0;
        if (scrubberFill) scrubberFill.style.width = `${(currentSec / totalSec) * 100}%`;
        if (timeDisplay) timeDisplay.textContent = `${formatTime(currentSec)} / ${formatTime(totalSec)}`;
      }, 1000);
    } else {
      if (playBtn) playBtn.style.opacity = '1';
      if (ctrlPlayBtn) ctrlPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      clearInterval(playInterval);
    }
  }

  if (playBtn) playBtn.onclick = togglePlay;
  if (ctrlPlayBtn) ctrlPlayBtn.onclick = togglePlay;

  const epListWrap = document.querySelector('#watch-episodes-list');
  if (epListWrap && anime.episodesList) {
    epListWrap.innerHTML = anime.episodesList.map(ep => `
      <a href="watch.html?id=${anime.id}&ep=${ep.ep}" class="episode-item ${ep.ep === epNum ? 'active' : ''}">
        <div class="episode-num">#${ep.ep}</div>
        <div class="episode-info">
          <div class="episode-title">${ep.title}</div>
          <div class="episode-duration">${ep.duration}</div>
        </div>
        ${ep.ep === epNum ? '<span class="badge badge-rating">Playing</span>' : ''}
      </a>
    `).join('');
  }

  const watchWlBtn = document.querySelector('#btn-watch-watchlist');
  if (watchWlBtn) {
    function updateWatchWl() {
      const saved = WatchlistStore.has(anime.id);
      watchWlBtn.textContent = saved ? '✓ In Watchlist' : '+ Add to Watchlist';
    }
    updateWatchWl();
    watchWlBtn.onclick = () => {
      WatchlistStore.toggle(anime.id);
      updateWatchWl();
    };
  }

  const relWrap = document.querySelector('#watch-related-grid');
  if (relWrap) {
    const rel = ANIME_DATABASE.filter(a => a.id !== anime.id).slice(0, 4);
    relWrap.innerHTML = rel.map(a => createAnimeCardHTML(a)).join('');
    bindWatchlistHeartButtons();
  }
}

/* ==========================================================================
   10. PAGE: WATCHLIST (watchlist.html)
   ========================================================================== */
function initWatchlistPage() {
  const grid = document.querySelector('#watchlist-grid');
  const countDisplay = document.querySelector('#watchlist-total-count');
  const clearBtn = document.querySelector('#btn-clear-watchlist');
  const filterTabs = document.querySelectorAll('.wl-tab');

  // Stats elements
  const statTotal = document.querySelector('#wl-stat-total');
  const statWatching = document.querySelector('#wl-stat-watching');
  const statPlan = document.querySelector('#wl-stat-plan');
  const statCompleted = document.querySelector('#wl-stat-completed');

  let activeTab = 'all';

  function updateStats(list) {
    if (statTotal) statTotal.textContent = list.length;
    if (statWatching) statWatching.textContent = list.filter(i => (i.status || 'Watching') === 'Watching').length;
    if (statPlan) statPlan.textContent = list.filter(i => i.status === 'Plan to Watch').length;
    if (statCompleted) statCompleted.textContent = list.filter(i => i.status === 'Completed').length;
  }

  function renderWatchlist() {
    const list = WatchlistStore.getAll();
    updateStats(list);
    if (countDisplay) countDisplay.textContent = `${list.length} Saved ${list.length === 1 ? 'Anime' : 'Animes'}`;

    let filtered = list;
    if (activeTab !== 'all') {
      filtered = list.filter(item => (item.status || 'Watching').toLowerCase() === activeTab.toLowerCase());
    }

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-watchlist-box" style="grid-column: 1 / -1; padding: 3rem 2rem; text-align: center;">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: #FFFFFF; margin-bottom: 0.5rem;">
            ${activeTab === 'all' ? 'Your Personal Watchlist is Empty' : `No Titles in "${activeTab}"`}
          </h3>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem; font-size: 0.9rem;">
            ${activeTab === 'all' 
              ? 'Start building your anime queue! Quick-add these top trending hits or explore the full 41-title catalog.' 
              : 'Switch to "All Titles" or add new anime from the catalog.'}
          </p>
          
          <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="WatchlistStore.add('black-clover-season-2'); initWatchlistPage();">+ Black Clover S2</button>
            <button class="btn btn-secondary btn-sm" onclick="WatchlistStore.add('solo-leveling'); initWatchlistPage();">+ Solo Leveling</button>
            <button class="btn btn-secondary btn-sm" onclick="WatchlistStore.add('demon-slayer'); initWatchlistPage();">+ Demon Slayer</button>
            <button class="btn btn-secondary btn-sm" onclick="WatchlistStore.add('jujutsu-kaisen'); initWatchlistPage();">+ Jujutsu Kaisen</button>
          </div>

          <a href="explore.html" class="btn btn-primary btn-sm">Explore Full 41 Anime Catalog</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const curEp = item.progress || 0;
      const totalEp = item.totalEpisodes || 12;
      const pct = Math.min(100, Math.round((curEp / totalEp) * 100));

      return `
        <div class="anime-card" data-id="${item.id}" style="display: flex; flex-direction: column;">
          <div class="anime-poster-wrap">
            <button class="anime-quick-view-btn" onclick="event.preventDefault(); event.stopPropagation(); openQuickPreview('${item.id}')">👁️ QUICK PREVIEW</button>
            <img class="anime-poster-img" src="${item.poster}" alt="${item.title}" onerror="this.onerror=null; this.src='assets/images/posters/${item.id}.svg'">
            <button class="btn-card-watchlist active" data-wl-remove="${item.id}" title="Remove from Watchlist">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <a href="anime-details.html?id=${item.id}" class="card-play-overlay">
              <div class="card-play-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </a>
          </div>

          <div class="anime-card-body" style="padding: 0.85rem; flex: 1;">
            <a href="anime-details.html?id=${item.id}" class="anime-card-title" style="font-size: 0.95rem; margin-bottom: 0.25rem;">${item.title}</a>
            <div class="anime-card-meta" style="margin-bottom: 0.5rem;">
              <span class="badge badge-rating">★ ${item.rating}</span>
              <span class="badge badge-year">${(item.genres && item.genres[0]) || 'Anime'}</span>
            </div>
          </div>

          <!-- Watchlist Management Panel -->
          <div class="wl-card-controls">
            <!-- Status Dropdown -->
            <select class="wl-status-dropdown" data-wl-status-select="${item.id}">
              <option value="Watching" ${(item.status || 'Watching') === 'Watching' ? 'selected' : ''}>▶ Currently Watching</option>
              <option value="Plan to Watch" ${item.status === 'Plan to Watch' ? 'selected' : ''}>⏳ Plan to Watch</option>
              <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>✓ Completed</option>
              <option value="On Hold" ${item.status === 'On Hold' ? 'selected' : ''}>⏸ On Hold</option>
            </select>

            <!-- Progress Tracker -->
            <div>
              <div class="wl-progress-tracker">
                <span style="font-size: 0.725rem; color: var(--text-muted);">Watched:</span>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <button class="wl-progress-btn" data-wl-dec="${item.id}">−</button>
                  <span style="font-weight: 800; color: #FFFFFF; font-size: 0.75rem;">${curEp} / ${totalEp}</span>
                  <button class="wl-progress-btn" data-wl-inc="${item.id}">+</button>
                </div>
              </div>
              <div class="wl-progress-bar-track">
                <div class="wl-progress-bar-fill" style="width: ${pct}%;"></div>
              </div>
            </div>

            <!-- Direct Watch & Streaming Links -->
            <div class="wl-quick-links">
              <a href="${getCrunchyrollUrl(item.title)}" target="_blank" rel="noopener noreferrer" class="btn-cr-mini" title="Search on Crunchyroll">CR ↗</a>
              <a href="watch.html?id=${item.id}" class="btn-watch-mini" title="Open in Watch Hub">Watch Hub</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind Remove Buttons
    document.querySelectorAll('[data-wl-remove]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        SoundFX.playClick();
        const id = btn.getAttribute('data-wl-remove');
        WatchlistStore.remove(id);
        renderWatchlist();
      };
    });

    // Bind Status Dropdowns
    document.querySelectorAll('[data-wl-status-select]').forEach(sel => {
      sel.onchange = (e) => {
        SoundFX.playClick();
        const id = sel.getAttribute('data-wl-status-select');
        WatchlistStore.updateStatus(id, e.target.value);
        renderWatchlist();
      };
    });

    // Bind Progress Buttons
    document.querySelectorAll('[data-wl-inc]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        SoundFX.playClick();
        const id = btn.getAttribute('data-wl-inc');
        WatchlistStore.updateProgress(id, 1);
        renderWatchlist();
      };
    });

    document.querySelectorAll('[data-wl-dec]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        SoundFX.playClick();
        const id = btn.getAttribute('data-wl-dec');
        WatchlistStore.updateProgress(id, -1);
        renderWatchlist();
      };
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      SoundFX.playClick();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-status');
      renderWatchlist();
    });
  });

  if (clearBtn) {
    clearBtn.onclick = () => {
      SoundFX.playClick();
      if (confirm('Are you sure you want to clear your entire personal watchlist?')) {
        WatchlistStore.clear();
        renderWatchlist();
      }
    };
  }

  renderWatchlist();
}

/* ==========================================================================
   11. PAGE: CHARACTERS (characters.html) — 40 LEGENDS VAULT
   ========================================================================== */
const CHARACTERS_DATABASE = [
  {
    "id": "sukuna",
    "name": "RYOMEN SUKUNA",
    "jpName": "両面宿儺 (キング・オブ・カース)",
    "anime": "Jujutsu Kaisen",
    "category": "Magic & Sorcery",
    "title": "KING OF ALL CURSES",
    "quote": "\"Stand proud. You are strong.\"",
    "image": "assets/images/web/char-sukuna.jpg",
    "bio": "An ancient sorcerer from a thousand years ago who reigns as the supreme calamity in jujutsu history. Sukuna possesses godlike physical strength, lethal slashing techniques (Cleave & Dismantle), and the devastating Domain Expansion: Malevolent Shrine.",
    "stats": {
      "power": 99,
      "speed": 96,
      "cursedEnergy": 100,
      "intelligence": 95,
      "durability": 98
    },
    "clips": [
      {
        "title": "Malevolent Shrine Domain Expansion",
        "ep": "Ep 17"
      },
      {
        "title": "Sukuna vs Jogo Meteor Showdown",
        "ep": "Ep 16"
      },
      {
        "title": "\"Know Your Place, Fool.\"",
        "ep": "Ep 4"
      },
      {
        "title": "Sukuna vs Mahoraga Shibuya Clash",
        "ep": "Ep 17"
      }
    ]
  },
  {
    "id": "gojo",
    "name": "SATORU GOJO",
    "jpName": "五条悟 (現代最強の呪術師)",
    "anime": "Jujutsu Kaisen",
    "category": "Magic & Sorcery",
    "title": "THE STRONGEST SORCERER",
    "quote": "\"Throughout Heaven and Earth, I alone am the honored one.\"",
    "image": "assets/images/web/char-gojo.jpg",
    "bio": "The head of the Gojo clan and master of the Limitless and Six Eyes. Satoru Gojo manipulates space itself through Infinity, unleashes the devastating Hollow Purple, and traps foes in the cognitive overload of Infinite Void.",
    "stats": {
      "power": 100,
      "speed": 100,
      "cursedEnergy": 98,
      "intelligence": 97,
      "durability": 99
    },
    "clips": [
      {
        "title": "Hollow Purple vs Hanami",
        "ep": "Ep 20"
      },
      {
        "title": "0.2 Second Infinite Void in Shibuya",
        "ep": "Ep 9"
      },
      {
        "title": "Gojo Unsealed & Confronts Kenjaku",
        "ep": "Ep 23"
      }
    ]
  },
  {
    "id": "itadori",
    "name": "YUJI ITADORI",
    "jpName": "虎杖悠仁 (宿儺の器)",
    "anime": "Jujutsu Kaisen",
    "category": "Magic & Sorcery",
    "title": "VESSEL OF THE CURSE KING",
    "quote": "\"I don't want to regret the way I lived!\"",
    "image": "assets/images/web/char-itadori.jpg",
    "bio": "A high schooler gifted with superhuman athletic prowess who ingests Sukuna's cursed finger to protect his friends. Mastering Divergent Fist and the Black Flash, he endures unimaginable trauma while fighting relentlessly for human souls.",
    "stats": {
      "power": 93,
      "speed": 94,
      "cursedEnergy": 88,
      "intelligence": 82,
      "durability": 97
    },
    "clips": [
      {
        "title": "Consecutive Black Flash Record",
        "ep": "Ep 19"
      },
      {
        "title": "Yuji & Todo vs Mahito Climax",
        "ep": "Ep 21"
      },
      {
        "title": "Shibuya Awakening Confrontation",
        "ep": "Ep 15"
      }
    ]
  },
  {
    "id": "megumi",
    "name": "MEGUMI FUSHIGURO",
    "jpName": "伏黒恵 (十種影法術)",
    "anime": "Jujutsu Kaisen",
    "category": "Magic & Sorcery",
    "title": "ZEN'IN CLAN SHADOW PRODIGY",
    "quote": "\"I will save people unequally as I see fit.\"",
    "image": "assets/images/web/char-megumi.jpg",
    "bio": "A first-year Tokyo Jujutsu High student inheriting the Zen'in clan’s legendary Ten Shadows Technique. Capable of summoning divine shikigami from darkness and casting the incomplete Chimera Shadow Garden domain.",
    "stats": {
      "power": 88,
      "speed": 89,
      "cursedEnergy": 91,
      "intelligence": 94,
      "durability": 86
    },
    "clips": [
      {
        "title": "Chimera Shadow Garden Awakening",
        "ep": "Ep 23"
      },
      {
        "title": "Summoning Eight-Handled Mahoraga",
        "ep": "Ep 17"
      }
    ]
  },
  {
    "id": "nobara",
    "name": "NOBARA KUGISAKI",
    "jpName": "釘崎野薔薇 (共鳴り)",
    "anime": "Jujutsu Kaisen",
    "category": "Magic & Sorcery",
    "title": "STRAW DOLL TECHNIQUE SORCERESS",
    "quote": "\"What makes us so special? I am me and I love being myself!\"",
    "image": "assets/images/web/char-nobara.jpg",
    "bio": "A fierce and unyielding jujutsu sorceress from the countryside who channels cursed energy through nails, a hammer, and straw dolls via Resonance and Hairpin to strike directly at her targets’ souls.",
    "stats": {
      "power": 86,
      "speed": 85,
      "cursedEnergy": 89,
      "intelligence": 90,
      "durability": 84
    },
    "clips": [
      {
        "title": "Black Flash against Kechizu & Eso",
        "ep": "Ep 24"
      },
      {
        "title": "Resonance Strike on Mahito Duplicate",
        "ep": "Ep 19"
      }
    ]
  },
  {
    "id": "asta",
    "name": "ASTA",
    "jpName": "アスタ (限界突破・悪魔同化)",
    "anime": "Black Clover",
    "category": "Shonen Legends",
    "title": "BLACK BULLS MAGIC KNIGHT & DEVIL HOST",
    "quote": "\"My magic is never giving up!\"",
    "image": "assets/images/web/char-asta.jpg",
    "bio": "Born with zero magical power in a realm where magic is everything, Asta forged an unbreakable physique. Wielding a five-leaf grimoire imbued with the Anti-Magic devil Liebe, he unlocks Devil Union mode to slice through divine and demonic spells alike.",
    "stats": {
      "power": 97,
      "speed": 95,
      "cursedEnergy": 0,
      "intelligence": 82,
      "durability": 98
    },
    "clips": [
      {
        "title": "Black Meteorite Awakening",
        "ep": "Ep 49"
      },
      {
        "title": "Asta & Yami vs Dante Zogratis",
        "ep": "Ep 166"
      },
      {
        "title": "Devil Union Mode Unleashed",
        "ep": "Ep 170"
      },
      {
        "title": "Spade Kingdom Fortress Blitz",
        "ep": "Ep 171"
      }
    ]
  },
  {
    "id": "yuno",
    "name": "YUNO GRINBERRYALL",
    "jpName": "ユノ・グリンベリオール (王権・風星魔法)",
    "anime": "Black Clover",
    "category": "Shonen Legends",
    "title": "GOLDEN DAWN VICE-CAPTAIN & SPADE PRINCE",
    "quote": "\"I will be the Wizard King. That hasn't changed for a single second.\"",
    "image": "assets/images/web/char-yuno.jpg",
    "bio": "A quiet prodigy blessed with a four-leaf grimoire and the Wind Spirit Sylph. Upon learning of his royal Spade Kingdom heritage, Yuno awakens his second grimoire commanding celestial Star Magic to wage war against the Dark Triad.",
    "stats": {
      "power": 96,
      "speed": 96,
      "cursedEnergy": 98,
      "intelligence": 94,
      "durability": 90
    },
    "clips": [
      {
        "title": "Spirit of Zephyr Blade Creation",
        "ep": "Ep 118"
      },
      {
        "title": "Spirit Dive: Boreas Form vs Zenon",
        "ep": "Ep 167"
      },
      {
        "title": "Awakening of Star Magic Conjunction",
        "ep": "Ep 174"
      }
    ]
  },
  {
    "id": "noelle",
    "name": "NOELLE SILVA",
    "jpName": "ノエル・シルヴァ (海竜・聖域の舞)",
    "anime": "Black Clover",
    "category": "Magic & Sorcery",
    "title": "VALKYRIE DRESS ROYAL KNIGHT",
    "quote": "\"I am royalty! And I will protect everyone!\"",
    "image": "assets/images/web/char-noelle.jpg",
    "bio": "A royal from House Silva who conquered severe mana control trauma with the Black Bulls. Donning the Valkyrie Armor and later attaining Saint Stage with Undine, she confronts the devil Megicula in a breathtaking duel of retribution.",
    "stats": {
      "power": 93,
      "speed": 94,
      "cursedEnergy": 97,
      "intelligence": 91,
      "durability": 91
    },
    "clips": [
      {
        "title": "Sea Dragon's Roar Annihilates Vetto",
        "ep": "Ep 44"
      },
      {
        "title": "Valkyrie Dress First Awakening",
        "ep": "Ep 108"
      },
      {
        "title": "Saint Valkyrie Dress vs Megicula",
        "ep": "Ep 173"
      }
    ]
  },
  {
    "id": "yami",
    "name": "YAMI SUKEHIRO",
    "jpName": "ヤミ・スケヒロ (限界超越・闇魔法)",
    "anime": "Black Clover",
    "category": "Shonen Legends",
    "title": "BLACK BULLS CAPTAIN & MASTER OF DARKNESS",
    "quote": "\"Surpass your limits right here, right now!\"",
    "image": "assets/images/web/char-yami.jpg",
    "bio": "The legendary foreign-born captain of the Black Bulls who coats his katana in Dark Magic to cut through space itself. His Ki-sensing prowess and Dimension Slash Equinox inspire all under his command to surpass their mortal boundaries.",
    "stats": {
      "power": 98,
      "speed": 93,
      "cursedEnergy": 96,
      "intelligence": 92,
      "durability": 96
    },
    "clips": [
      {
        "title": "Dark Magic: Dimension Slash vs Vetto",
        "ep": "Ep 49"
      },
      {
        "title": "Death Thrust Obliterates Dante",
        "ep": "Ep 165"
      },
      {
        "title": "Yami & Asta Combined Limit Break",
        "ep": "Ep 166"
      }
    ]
  },
  {
    "id": "nacht",
    "name": "NACHT FAUST",
    "jpName": "ナハト・ファウスト (影魔法・四大悪魔同化)",
    "anime": "Black Clover",
    "category": "Magic & Sorcery",
    "title": "BLACK BULLS VICE-CAPTAIN & SHADOW DEVIL HOST",
    "quote": "\"I hate people who don't take things seriously.\"",
    "image": "assets/images/web/char-nacht.jpg",
    "bio": "The secretive Vice-Captain of the Black Bulls who spent years infiltrating the Spade Kingdom. Contracted with four mid-ranking devils (Gimodelo, Slitos, Plumede, and Walgner), he switches between specialized Devil Union modes to control the shadow battlefield.",
    "stats": {
      "power": 92,
      "speed": 94,
      "cursedEnergy": 95,
      "intelligence": 98,
      "durability": 90
    },
    "clips": [
      {
        "title": "Infiltrating the Spade Kingdom Citadel",
        "ep": "Ep 168"
      },
      {
        "title": "Demon-Binding Ritual Supervision",
        "ep": "Ep 169"
      },
      {
        "title": "Monument of Atonement Shadow Prison",
        "ep": "Ep 172"
      }
    ]
  },
  {
    "id": "mereoleona",
    "name": "MEREOLEONA VERMILLION",
    "jpName": "メレオレオナ・ヴァーミリオン (無冠無敗の温泉獅子)",
    "anime": "Black Clover",
    "category": "Shonen Legends",
    "title": "UNCROWNED UNDEFEATED LIONESS",
    "quote": "\"Live with your chest puffed out! Fight until you drop!\"",
    "image": "assets/images/web/char-mereoleona.jpg",
    "bio": "The fierce former captain of the Crimson Lion Kings who eschewed royal politics to live in untamed wild zones. Channeling Mana Skin into Mana Zone, she punches through ancient elf sorcery and towering ancient demons with raw fiery brutality.",
    "stats": {
      "power": 99,
      "speed": 97,
      "cursedEnergy": 98,
      "intelligence": 88,
      "durability": 98
    },
    "clips": [
      {
        "title": "5 vs 1 Elf Reincarnation Showdown",
        "ep": "Ep 93"
      },
      {
        "title": "Mana Zone: Calidus Brachium Barrage",
        "ep": "Ep 98"
      },
      {
        "title": "Pummeling the Spade Kingdom Ancient Demon",
        "ep": "Ep 171"
      }
    ]
  },
  {
    "id": "jinwoo",
    "name": "SUNG JINWOO",
    "jpName": "ソン・ジヌ (影の君主・アライズ)",
    "anime": "Solo Leveling",
    "category": "Hunters & Slayers",
    "title": "THE SHADOW MONARCH",
    "quote": "\"Arise.\"",
    "image": "assets/images/web/char-jinwoo.jpg",
    "bio": "Once known as the Weakest Hunter of All Mankind, Sung Jinwoo survived a lethal double dungeon. Selected by the System as the sole Player, he levels infinitely, commands the fallen souls of his foes as shadow soldiers, and ascends to godhood as the Shadow Monarch.",
    "stats": {
      "power": 99,
      "speed": 98,
      "cursedEnergy": 100,
      "intelligence": 95,
      "durability": 97
    },
    "clips": [
      {
        "title": "Commanding Blood-Red Commander Igris",
        "ep": "Ep 12"
      },
      {
        "title": "Execution of the Traitor Strike Squad",
        "ep": "Ep 6"
      },
      {
        "title": "Soloing the Demon Castle Dungeon",
        "ep": "Ep 10"
      }
    ]
  },
  {
    "id": "cha-haein",
    "name": "CHA HAE-IN",
    "jpName": "チャ・ヘイン (舞姫・S級ハンター)",
    "anime": "Solo Leveling",
    "category": "Hunters & Slayers",
    "title": "S-RANK HUNTERS GUILD VICE-MASTER",
    "quote": "\"A hunter’s blade must never tremble before the beast.\"",
    "image": "assets/images/web/char-cha-haein.jpg",
    "bio": "South Korea's only female S-Rank Hunter and sword virtuoso of the Hunters Guild. Possessing an hypersensitive mana olfactory sense, she detects Jinwoo’s distinct soothing scent and cuts down dungeon boss monsters with blinding blade agility.",
    "stats": {
      "power": 91,
      "speed": 96,
      "cursedEnergy": 90,
      "intelligence": 89,
      "durability": 88
    },
    "clips": [
      {
        "title": "Soloing the High Orc Dungeon Gate",
        "ep": "Ep 11"
      },
      {
        "title": "Jeju Island Ant Queen Suppression",
        "ep": "Ep 12"
      }
    ]
  },
  {
    "id": "tanjiro",
    "name": "TANJIRO KAMADO",
    "jpName": "竈門炭治郎 (日の呼吸・ヒノカミ神楽)",
    "anime": "Demon Slayer",
    "category": "Hunters & Slayers",
    "title": "SUN BREATHING SLAYER & KIND BROTHER",
    "quote": "\"No matter how many people you lose, you have no choice but to go on living.\"",
    "image": "assets/images/web/char-tanjiro.jpg",
    "bio": "A compassionate boy who takes up the Nichirin blade after his family is slaughtered by Muzan Kibutsuji and his sister turned into a demon. Tanjiro bridges Water Breathing into the ancestral Sun Breathing (Hinokami Kagura).",
    "stats": {
      "power": 94,
      "speed": 93,
      "cursedEnergy": 91,
      "intelligence": 92,
      "durability": 96
    },
    "clips": [
      {
        "title": "Hinokami Kagura: Dance vs Rui",
        "ep": "Ep 19"
      },
      {
        "title": "Decapitation of Gyutaro in Entertainment District",
        "ep": "Ep 10"
      },
      {
        "title": "Mugen Train Sun Halo Dragon Head Dance",
        "ep": "Ep 7"
      }
    ]
  },
  {
    "id": "nezuko",
    "name": "NEZUKO KAMADO",
    "jpName": "竈門禰豆子 (爆血・太陽を克服した鬼)",
    "anime": "Demon Slayer",
    "category": "Hunters & Slayers",
    "title": "THE DEMON SISTER WHO CONQUERED THE SUN",
    "quote": "\"Humans are to be protected and saved... I will never hurt them.\"",
    "image": "assets/images/web/char-nezuko.jpg",
    "bio": "Turned into a demon by Muzan, Nezuko retains her human conscience and fights alongside the Demon Slayer Corps. Her Blood Demon Art: Pyrokinesis burns exclusively demon flesh and neutralizes lethal toxins.",
    "stats": {
      "power": 92,
      "speed": 94,
      "cursedEnergy": 95,
      "intelligence": 80,
      "durability": 97
    },
    "clips": [
      {
        "title": "Exploding Blood Awakens against Rui",
        "ep": "Ep 19"
      },
      {
        "title": "Full Demon Transformation vs Daki",
        "ep": "Ep 6"
      },
      {
        "title": "Conquering the Sun at Swordsmith Village",
        "ep": "Ep 11"
      }
    ]
  },
  {
    "id": "zenitsu",
    "name": "ZENITSU AGATSUMA",
    "jpName": "我妻善逸 (雷の呼吸・霹靂一閃)",
    "anime": "Demon Slayer",
    "category": "Hunters & Slayers",
    "title": "THUNDER BREATHING LIGHTNING FLASH",
    "quote": "\"If you can only do one thing, hone it to perfection!\"",
    "image": "assets/images/web/char-zenitsu.jpg",
    "bio": "A timid demon slayer with superhuman hearing who collapses from anxiety only to awaken as a thunder-fast warrior while unconscious. He perfected the First Form: Thunderclap and Flash to godlike speeds.",
    "stats": {
      "power": 90,
      "speed": 99,
      "cursedEnergy": 87,
      "intelligence": 76,
      "durability": 85
    },
    "clips": [
      {
        "title": "Thunderclap and Flash: Sixfold on Mt. Natagumo",
        "ep": "Ep 12"
      },
      {
        "title": "God Speed Lightning Strike in Entertainment District",
        "ep": "Ep 10"
      }
    ]
  },
  {
    "id": "inosuke",
    "name": "INOSUKE HASHIBIRA",
    "jpName": "嘴平伊之助 (獣の呼吸・猪突猛進)",
    "anime": "Demon Slayer",
    "category": "Hunters & Slayers",
    "title": "BEAST BREATHING WILD DUAL-WIELDER",
    "quote": "\"Coming through! Coming through! Inosuke the Mountain God!\"",
    "image": "assets/images/web/char-inosuke.jpg",
    "bio": "Raised by wild boars in the mountains, Inosuke created Beast Breathing independently. He wields twin serrated Nichirin swords and possesses dislocated joint flexibility and spatial awareness.",
    "stats": {
      "power": 91,
      "speed": 92,
      "cursedEnergy": 85,
      "intelligence": 75,
      "durability": 94
    },
    "clips": [
      {
        "title": "Spatial Awareness Sense on Mt. Natagumo",
        "ep": "Ep 15"
      },
      {
        "title": "Joint Dislocation Infiltration in Yoshiwara",
        "ep": "Ep 4"
      }
    ]
  },
  {
    "id": "rengoku",
    "name": "KYOJURO RENGOKU",
    "jpName": "煉獄杏寿郎 (炎柱・心を燃やせ)",
    "anime": "Demon Slayer",
    "category": "Shonen Legends",
    "title": "FLAME HASHIRA OF THE DEMON SLAYER CORPS",
    "quote": "\"Set your heart ablaze. Go beyond your limits!\"",
    "image": "assets/images/web/char-rengoku.jpg",
    "bio": "The charismatic Flame Hashira whose indomitable spirit shielded all two hundred passengers aboard the Infinity Train. In his legendary clash with Upper Rank Three Akaza, he embodied the peak of human devotion.",
    "stats": {
      "power": 97,
      "speed": 96,
      "cursedEnergy": 95,
      "intelligence": 92,
      "durability": 98
    },
    "clips": [
      {
        "title": "Ninth Form: Rengoku vs Akaza",
        "ep": "Mugen Train"
      },
      {
        "title": "First Form: Unknowing Fire Train Rush",
        "ep": "Ep 2"
      }
    ]
  },
  {
    "id": "levi",
    "name": "LEVI ACKERMAN",
    "jpName": "リヴァイ・アッカーマン (人類最強の兵士)",
    "anime": "Attack on Titan",
    "category": "Tactical & Mystery",
    "title": "HUMANITY'S STRONGEST SOLDIER",
    "quote": "\"The only thing we’re allowed to do is believe that we won’t regret the choice we made.\"",
    "image": "assets/images/web/char-levi.jpg",
    "bio": "Captain of the Special Operations Squad in the Scout Regiment. A living tempest with Omni-Directional Mobility gear, Levi possesses unmatched tactical lethality, single-handedly dicing through hordes of Titans and bringing the Beast Titan to its knees.",
    "stats": {
      "power": 98,
      "speed": 100,
      "cursedEnergy": 0,
      "intelligence": 96,
      "durability": 95
    },
    "clips": [
      {
        "title": "Levi vs Beast Titan First Decimation",
        "ep": "S3 Ep 17"
      },
      {
        "title": "Underground Escape vs Kenny Ackerman",
        "ep": "S3 Ep 2"
      },
      {
        "title": "Forest of Giant Trees Beast Titan Rematch",
        "ep": "S4 Ep 14"
      }
    ]
  },
  {
    "id": "eren",
    "name": "EREN YEAGER",
    "jpName": "エレン・イェーガー (進撃・始祖の巨人)",
    "anime": "Attack on Titan",
    "category": "Dark Fantasy",
    "title": "ATTACK & FOUNDING TITAN HARBINGER",
    "quote": "\"If you win, you live. If you lose, you die. If you don't fight, you can't win. Fight!\"",
    "image": "assets/images/web/char-eren.jpg",
    "bio": "From an angry youth swearing to exterminate every Titan outside Wall Maria to the terrifying wielder of the Founding, Attack, and War Hammer Titans who initiates the worldwide Rumbling to secure Paradis Island’s freedom.",
    "stats": {
      "power": 100,
      "speed": 92,
      "cursedEnergy": 98,
      "intelligence": 94,
      "durability": 99
    },
    "clips": [
      {
        "title": "Raid on Liberio War Hammer Titan Usurpation",
        "ep": "S4 Ep 7"
      },
      {
        "title": "Initiation of the Worldwide Rumbling",
        "ep": "S4 Ep 21"
      },
      {
        "title": "Eren & Reiner Battle of Shiganshina",
        "ep": "S3 Ep 13"
      }
    ]
  },
  {
    "id": "mikasa",
    "name": "MIKASA ACKERMAN",
    "jpName": "ミカサ・アッカーマン (至高の守護者)",
    "anime": "Attack on Titan",
    "category": "Tactical & Mystery",
    "title": "TOP RECRUIT OF THE 104TH CADET CORPS",
    "quote": "\"This world is cruel, but it is also very beautiful.\"",
    "image": "assets/images/web/char-mikasa.jpg",
    "bio": "An elite Scout soldier possessing awakened Ackerman combat instincts and near-flawless ODM maneuverability. Devoted to protecting Eren, her resolve undergoes the ultimate trial in the battle for humanity's salvation.",
    "stats": {
      "power": 96,
      "speed": 97,
      "cursedEnergy": 0,
      "intelligence": 91,
      "durability": 96
    },
    "clips": [
      {
        "title": "Thunder Spear Assault on the Armored Titan",
        "ep": "S3 Ep 14"
      },
      {
        "title": "Liberio Airspace Blitz",
        "ep": "S4 Ep 6"
      }
    ]
  },
  {
    "id": "frieren",
    "name": "FRIEREN",
    "jpName": "フリーレン (葬送のフリーレン)",
    "anime": "Frieren: Beyond Journey's End",
    "category": "Dark Fantasy",
    "title": "THE MAGE OF THE HERO PARTY",
    "quote": "\"It's only been ten years. But it was fun while it lasted.\"",
    "image": "assets/images/web/char-frieren.jpg",
    "bio": "An elven mage who outlives her mortal companions after defeating the Demon King. Disguising the vast ocean of her mana for over a millennium, she travels to the land of Aureole while collecting esoteric spells and dismantling demon society with cold efficiency.",
    "stats": {
      "power": 98,
      "speed": 91,
      "cursedEnergy": 100,
      "intelligence": 99,
      "durability": 92
    },
    "clips": [
      {
        "title": "\"Aura, kill yourself.\" - Scale of Obedience",
        "ep": "Ep 10"
      },
      {
        "title": "Demon King Citadel Assault Flashback",
        "ep": "Ep 1"
      },
      {
        "title": "Zoltraak Overwrite in First Class Mage Exam",
        "ep": "Ep 26"
      }
    ]
  },
  {
    "id": "fern",
    "name": "FERN",
    "jpName": "フェルン (一級魔法使い・速射の狙撃手)",
    "anime": "Frieren: Beyond Journey's End",
    "category": "Dark Fantasy",
    "title": "FIRST-CLASS MAGE & ZOLTRAAK SNIPER",
    "quote": "\"Ordinary attack magic is enough to pierce any barrier.\"",
    "image": "assets/images/web/char-fern.jpg",
    "bio": "A war orphan raised and trained by Heiter and Frieren. Fern achieved First-Class Mage status at an unprecedented age, possessing superhuman spell-casting cadence and silent mana concealment that blindsides ancient sorcerers.",
    "stats": {
      "power": 92,
      "speed": 95,
      "cursedEnergy": 94,
      "intelligence": 93,
      "durability": 87
    },
    "clips": [
      {
        "title": "Machine-Gun Zoltraak vs Lugner",
        "ep": "Ep 9"
      },
      {
        "title": "First-Class Exam Clone Barrier Shatter",
        "ep": "Ep 25"
      }
    ]
  },
  {
    "id": "stark",
    "name": "STARK",
    "jpName": "シュタルク (アイゼンの弟子・戦士)",
    "anime": "Frieren: Beyond Journey's End",
    "category": "Shonen Legends",
    "title": "WARRIOR DISCIPLE OF EISEN",
    "quote": "\"I was terrified the whole time. But my legs moved on their own.\"",
    "image": "assets/images/web/char-stark.jpg",
    "bio": "A timid young warrior with a scarred past who studied under the dwarf Eisen. Despite trembling with fear before combat, his axe cleaves through the scales of Solar Dragons and demon vanguards with tectonic momentum.",
    "stats": {
      "power": 95,
      "speed": 90,
      "cursedEnergy": 0,
      "intelligence": 82,
      "durability": 97
    },
    "clips": [
      {
        "title": "Soloing the Solar Dragon with Single Strike",
        "ep": "Ep 6"
      },
      {
        "title": "Axe Duel vs Demon Line",
        "ep": "Ep 9"
      }
    ]
  },
  {
    "id": "denji",
    "name": "DENJI",
    "jpName": "デンジ (チェンソーマン)",
    "anime": "Chainsaw Man",
    "category": "Dark Fantasy",
    "title": "CHAINSAW DEVIL HYBRID",
    "quote": "\"If you’re gonna get in our way, then just go ahead and die!\"",
    "image": "assets/images/web/char-denji.jpg",
    "bio": "A destitute youth forced to pay his father's mafia debt who merges with Pochita, the Chainsaw Devil. Pulling the ripcord on his chest, he sprouts motorized chainsaws from his head and arms, tearing through horrific devils with crazed vitality.",
    "stats": {
      "power": 95,
      "speed": 92,
      "cursedEnergy": 94,
      "intelligence": 76,
      "durability": 99
    },
    "clips": [
      {
        "title": "Zombie Devil Dismemberment Rampage",
        "ep": "Ep 1"
      },
      {
        "title": "Eternity Devil Three-Day Saw Marathon",
        "ep": "Ep 7"
      },
      {
        "title": "Denji vs Katana Man Train Climax",
        "ep": "Ep 12"
      }
    ]
  },
  {
    "id": "makima",
    "name": "MAKIMA",
    "jpName": "マキマ (支配の悪魔)",
    "anime": "Chainsaw Man",
    "category": "Tactical & Mystery",
    "title": "LEADER OF PUBLIC SAFETY SPECIAL DIVISION 4",
    "quote": "\"Necessary evils are only made necessary by the state.\"",
    "image": "assets/images/web/char-makima.jpg",
    "bio": "A high-ranking devil hunter who takes Denji as her human pet. Concealing her identity as the terrifying Control Devil, she crushes targets from hundreds of miles away with ritual squashing and exerts absolute mental domination over lesser entities.",
    "stats": {
      "power": 98,
      "speed": 95,
      "cursedEnergy": 99,
      "intelligence": 99,
      "durability": 98
    },
    "clips": [
      {
        "title": "Shrine Remote Splatter Ritual",
        "ep": "Ep 9"
      },
      {
        "title": "Gun Devil Interception Sequence",
        "ep": "Ep 12"
      }
    ]
  },
  {
    "id": "power",
    "name": "POWER",
    "jpName": "パワー (血の魔人・大統領)",
    "anime": "Chainsaw Man",
    "category": "Dark Fantasy",
    "title": "BLOOD FIEND & FUTURE PRESIDENT",
    "quote": "\"Bow before me, human! For I am Power, the Blood Devil!\"",
    "image": "assets/images/web/char-power.jpg",
    "bio": "An eccentric Blood Fiend with horns who loves her cat Meowy, dislikes vegetables, and fights with weapons materialized from her own blood. Beneath her narcissistic bravado lies fierce loyalty to Denji and Aki.",
    "stats": {
      "power": 89,
      "speed": 90,
      "cursedEnergy": 91,
      "intelligence": 70,
      "durability": 90
    },
    "clips": [
      {
        "title": "Blood Hammer Smashing the Sea Cucumber Devil",
        "ep": "Ep 2"
      },
      {
        "title": "Bat Devil Confrontation",
        "ep": "Ep 4"
      }
    ]
  },
  {
    "id": "loid",
    "name": "LOID FORGER (TWILIGHT)",
    "jpName": "ロイド・フォージャー (黄昏・WISEスパイ)",
    "anime": "Spy x Family",
    "category": "Tactical & Mystery",
    "title": "AGENT TWILIGHT OF WESTALIS INTELLIGENCE",
    "quote": "\"A world where children don’t need to cry... that’s what I fight for.\"",
    "image": "assets/images/web/char-loid.jpg",
    "bio": "The undisputed master of espionage in Westalis code-named \"Twilight\". As part of Operation Strix, he constructs a false family identity as psychiatrist Loid Forger while carrying out life-or-death counter-espionage missions.",
    "stats": {
      "power": 89,
      "speed": 95,
      "cursedEnergy": 0,
      "intelligence": 99,
      "durability": 91
    },
    "clips": [
      {
        "title": "Rescuing Anya Castle Park Extravaganza",
        "ep": "Ep 5"
      },
      {
        "title": "Bomb Terrorist Disarmament on Doggy Escort",
        "ep": "Ep 14"
      }
    ]
  },
  {
    "id": "yor",
    "name": "YOR FORGER (THORN PRINCESS)",
    "jpName": "ヨル・フォージャー (いばら姫・暗殺者)",
    "anime": "Spy x Family",
    "category": "Tactical & Mystery",
    "title": "GARDEN'S DEADLIEST ASSASSIN",
    "quote": "\"If it’s to protect my family, I will stain my hands with any blood.\"",
    "image": "assets/images/web/char-yor.jpg",
    "bio": "By day a sweet, mild-mannered clerk at Berlint City Hall; by night the lethal assassin \"Thorn Princess\" working for the shadow syndicate Garden. Possessing strength capable of deflecting speeding cars and kicking henchmen through brick walls.",
    "stats": {
      "power": 98,
      "speed": 97,
      "cursedEnergy": 0,
      "intelligence": 80,
      "durability": 95
    },
    "clips": [
      {
        "title": "Cruise Ship Sniper & Sword Showdown",
        "ep": "S2 Ep 8"
      },
      {
        "title": "Tennis Serve Breaking the Sound Barrier",
        "ep": "Ep 22"
      }
    ]
  },
  {
    "id": "anya",
    "name": "ANYA FORGER",
    "jpName": "アーニャ・フォージャー (被験者007・心を読む少女)",
    "anime": "Spy x Family",
    "category": "Tactical & Mystery",
    "title": "MIND-READING TELEPATH & PEANUT LOVER",
    "quote": "\"Waku waku! Anya wants to save the world!\"",
    "image": "assets/images/web/char-anya.jpg",
    "bio": "An escaped lab subject labeled \"Test Subject 007\" with telepathic ability to read minds. Adopted by Loid, she is the only member of the Forger household who knows both parents’ secret identities.",
    "stats": {
      "power": 30,
      "speed": 45,
      "cursedEnergy": 92,
      "intelligence": 85,
      "durability": 50
    },
    "clips": [
      {
        "title": "Eden Academy Punch vs Damian Desmond",
        "ep": "Ep 6"
      },
      {
        "title": "Swimming Pool Rescue Earning Stella Star",
        "ep": "Ep 11"
      }
    ]
  },
  {
    "id": "okabe",
    "name": "RINTARO OKABE",
    "jpName": "岡部倫太郎 (狂気のマッドサイエンティスト・鳳凰院凶真)",
    "anime": "Steins;Gate",
    "category": "Tactical & Mystery",
    "title": "HOUOUIN KYOUMA & D-MAIL CREATOR",
    "quote": "\"No one knows what the future holds. That’s why its potential is infinite.\"",
    "image": "assets/images/web/char-okabe.jpg",
    "bio": "The self-proclaimed mad scientist of the Future Gadget Laboratory who accidentally invents the PhoneWave, a microwave capable of sending text messages backward in time. Gifted with Reading Steiner, he endures countless heartbreak timelines to reach Steins Gate.",
    "stats": {
      "power": 65,
      "speed": 70,
      "cursedEnergy": 0,
      "intelligence": 98,
      "durability": 85
    },
    "clips": [
      {
        "title": "\"Deceive Your Other Self\" Final Message",
        "ep": "Ep 23"
      },
      {
        "title": "Steins Gate Worldline Convergence",
        "ep": "Ep 24"
      }
    ]
  },
  {
    "id": "kurisu",
    "name": "KURISU MAKISE",
    "jpName": "牧瀬紅莉栖 (天才脳科学者・クリスティーナ)",
    "anime": "Steins;Gate",
    "category": "Tactical & Mystery",
    "title": "VIKTOR CHONDIA GENIUS NEUROSCIENTIST",
    "quote": "\"Time is passing so fast. Right now, I feel like complaining to Einstein.\"",
    "image": "assets/images/web/char-kurisu.jpg",
    "bio": "An 18-year-old neuroscience prodigy whose academic paper on brain memory transfers forms the cornerstone of the Time Leap Machine. Her brilliant intellect and tsundere warmth anchor Okabe during his darkest loops.",
    "stats": {
      "power": 60,
      "speed": 65,
      "cursedEnergy": 0,
      "intelligence": 100,
      "durability": 75
    },
    "clips": [
      {
        "title": "Constructing the Time Leap Headset",
        "ep": "Ep 12"
      },
      {
        "title": "Heartfelt Goodbye on the Lab Rooftop",
        "ep": "Ep 22"
      }
    ]
  },
  {
    "id": "naruto",
    "name": "NARUTO UZUMAKI",
    "jpName": "うずまきナルト (九尾の人柱力・七代目火影)",
    "anime": "Naruto",
    "category": "Shonen Legends",
    "title": "HERO OF THE HIDDEN LEAF & SEVENTH HOKAGE",
    "quote": "\"I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!\"",
    "image": "assets/images/web/char-naruto.jpg",
    "bio": "An ostracized orphan carrying the Nine-Tails Fox within his belly who earned the respect of the shinobi world through pure heart and perseverance. Master of Sage Mode and Kurama Link, he brought peace to the ninja nations.",
    "stats": {
      "power": 99,
      "speed": 98,
      "cursedEnergy": 100,
      "intelligence": 89,
      "durability": 100
    },
    "clips": [
      {
        "title": "Sage Art: Rasenshuriken vs Pain",
        "ep": "Ep 167"
      },
      {
        "title": "Kurama Link Awakening in Fourth Great Ninja War",
        "ep": "Ep 329"
      },
      {
        "title": "Naruto & Sasuke Final Valley Clash",
        "ep": "Ep 476"
      }
    ]
  },
  {
    "id": "sasuke",
    "name": "SASUKE UCHIHA",
    "jpName": "うちはサスケ (写輪眼・輪廻眼の復讐者)",
    "anime": "Naruto",
    "category": "Shonen Legends",
    "title": "THE LAST UCHIHA & SHADOW HOKAGE",
    "quote": "\"I have long since closed my eyes... My only goal is in the darkness.\"",
    "image": "assets/images/web/char-sasuke.jpg",
    "bio": "The lone survivor of the Uchiha clan tragedy who unlocked the Mangekyo Sharingan and Rinnegan in pursuit of justice. Wielding black Chidori and the Susanoo, Sasuke serves as the protector from the outer shadows.",
    "stats": {
      "power": 99,
      "speed": 99,
      "cursedEnergy": 98,
      "intelligence": 96,
      "durability": 95
    },
    "clips": [
      {
        "title": "Kirin Lightning Summoning vs Itachi",
        "ep": "Ep 138"
      },
      {
        "title": "Indra's Arrow vs Naruto at Final Valley",
        "ep": "Ep 477"
      }
    ]
  },
  {
    "id": "kakashi",
    "name": "KAKASHI HATAKE",
    "jpName": "はたけカカシ (写輪眼のカカシ・第六代目火影)",
    "anime": "Naruto",
    "category": "Shonen Legends",
    "title": "THE COPY NINJA OF 1000 JUTSU",
    "quote": "\"Those who break the rules are scum, but those who abandon their friends are worse than scum.\"",
    "image": "assets/images/web/char-kakashi.jpg",
    "bio": "The elite commander of Team 7 and Sixth Hokage. Renowned worldwide for copying over a thousand techniques with his Sharingan and creating the piercing Lightning Blade (Raikiri).",
    "stats": {
      "power": 94,
      "speed": 95,
      "cursedEnergy": 92,
      "intelligence": 98,
      "durability": 91
    },
    "clips": [
      {
        "title": "Kamui Dimensional Warping vs Deidara",
        "ep": "Ep 29"
      },
      {
        "title": "Kakashi vs Obito Kamui Dimension Hand-to-Hand",
        "ep": "Ep 375"
      }
    ]
  },
  {
    "id": "luffy",
    "name": "MONKEY D. LUFFY",
    "jpName": "モンキー・D・ルフィ (太陽の神ニカ・ギア5)",
    "anime": "One Piece",
    "category": "Shonen Legends",
    "title": "STRAW HAT CAPTAIN & EMPEROR OF THE SEA",
    "quote": "\"I’m gonna be King of the Pirates!\"",
    "image": "assets/images/web/char-luffy.jpg",
    "bio": "Captain of the Straw Hat Pirates who ate the Mythical Zoan Human-Human Fruit, Model: Nika. Awakening Gear 5 in the skies of Wano, he fights with cartoon-like boundless freedom to liberate every oppressed nation on the Grand Line.",
    "stats": {
      "power": 100,
      "speed": 98,
      "cursedEnergy": 99,
      "intelligence": 85,
      "durability": 100
    },
    "clips": [
      {
        "title": "Gear 5 Joyboy Drum Awakening vs Kaido",
        "ep": "Ep 1071"
      },
      {
        "title": "Bajrang Gun Giant Fist Sinks Onigashima",
        "ep": "Ep 1076"
      },
      {
        "title": "Red Roc Punch against Kaido",
        "ep": "Ep 1015"
      }
    ]
  },
  {
    "id": "zoro",
    "name": "RORONOA ZORO",
    "jpName": "ロロノア・ゾロ (三刀流・地獄の王)",
    "anime": "One Piece",
    "category": "Shonen Legends",
    "title": "MASTER SWORDSMAN & KING OF HELL",
    "quote": "\"Scars on the back are a swordsman's shame.\"",
    "image": "assets/images/web/char-zoro.jpg",
    "bio": "First mate of the Straw Hat Pirates and master of Three-Sword Style (Santoryu). Channeling Conqueror's Haki through the cursed blade Enma, Zoro vowed never to lose again on his path to surpassing Dracule Mihawk.",
    "stats": {
      "power": 98,
      "speed": 96,
      "cursedEnergy": 97,
      "intelligence": 88,
      "durability": 99
    },
    "clips": [
      {
        "title": "Dead Man's Game Asura Strikes Kaido",
        "ep": "Ep 1027"
      },
      {
        "title": "King of Hell Three-Sword Climax vs King",
        "ep": "Ep 1062"
      },
      {
        "title": "\"Nothing Happened.\" Thriller Bark Sacrifice",
        "ep": "Ep 377"
      }
    ]
  },
  {
    "id": "kirito",
    "name": "KIRITO (KAZUTO KIRIGAYA)",
    "jpName": "キリト / 桐ヶ谷和人 (黒の剣士・二刀流)",
    "anime": "Sword Art Online",
    "category": "Tactical & Mystery",
    "title": "THE BLACK SWORDSMAN OF AINCRAD",
    "quote": "\"Levels are just numbers. In this world, your determination is your true strength.\"",
    "image": "assets/images/web/char-kirito.jpg",
    "bio": "The solo beater who cleared Sword Art Online and freed ten thousand trapped players. Wielding Elucidator and Dark Repulser with the unique Dual Blades skill, Kirito stands at the boundary of reality and full-dive cyberspace.",
    "stats": {
      "power": 94,
      "speed": 98,
      "cursedEnergy": 92,
      "intelligence": 95,
      "durability": 93
    },
    "clips": [
      {
        "title": "Dual Blades Starburst Stream vs The Gleam Eyes",
        "ep": "Ep 9"
      },
      {
        "title": "Final Duel against Heathcliff on 75th Floor",
        "ep": "Ep 14"
      }
    ]
  },
  {
    "id": "deku",
    "name": "IZUKU MIDORIYA (DEKU)",
    "jpName": "緑谷出久 (デク・ワン・フォー・オール継承者)",
    "anime": "My Hero Academia",
    "category": "Shonen Legends",
    "title": "NINTH SUCCESSOR OF ONE FOR ALL",
    "quote": "\"You can become a hero!\"",
    "image": "assets/images/web/char-deku.jpg",
    "bio": "Born Quirkless in a superhuman society, Izuku caught the eye of the Symbol of Peace All Might through self-sacrificing courage. Mastering One For All alongside Blackwhip, Float, and Gearshift, he stands as humanity’s greatest shield.",
    "stats": {
      "power": 98,
      "speed": 97,
      "cursedEnergy": 96,
      "intelligence": 98,
      "durability": 96
    },
    "clips": [
      {
        "title": "1,000,000% Delaware Detroit Smash vs Muscular",
        "ep": "S3 Ep 4"
      },
      {
        "title": "Deku 100% Infinite Full Cowl with Eri",
        "ep": "S4 Ep 13"
      },
      {
        "title": "Vigilante Dark Deku Awakening",
        "ep": "S6 Ep 19"
      }
    ]
  },
  {
    "id": "light",
    "name": "LIGHT YAGAMI (KIRA)",
    "jpName": "夜神月 (キラ・新世界の神)",
    "anime": "Death Note",
    "category": "Tactical & Mystery",
    "title": "GOD OF THE NEW WORLD & MASTER STRATEGIST",
    "quote": "\"I am the God of the new world!\"",
    "image": "assets/images/web/char-light.jpg",
    "bio": "An ace student whose discovery of a Shinigami's Death Note sparks a global crusade to execute criminals and rule as a deity. His mental warfare against detective L stands as the peak of intellectual thriller battles.",
    "stats": {
      "power": 75,
      "speed": 78,
      "cursedEnergy": 95,
      "intelligence": 100,
      "durability": 80
    },
    "clips": [
      {
        "title": "\"I'll take a potato chip... and eat it!\"",
        "ep": "Ep 8"
      },
      {
        "title": "L's Demise at the Hands of Rem",
        "ep": "Ep 25"
      },
      {
        "title": "Yellow Box Warehouse Final Climax",
        "ep": "Ep 37"
      }
    ]
  }
];

function initCharactersPage() {
  const charactersData = CHARACTERS_DATABASE;
  const urlParams = new URLSearchParams(window.location.search);
  const initialId = urlParams.get('id') || 'sukuna';
  let activeChar = charactersData.find(c => c.id === initialId) || charactersData[0];
  let activeFilter = 'all';

  function renderEditorial(c) {
    activeChar = c;
    const nameElem = document.querySelector('#char-hero-name');
    const jpElem = document.querySelector('#char-hero-jp');
    const animeElem = document.querySelector('#char-hero-anime');
    const quoteElem = document.querySelector('#char-hero-quote');
    const bioElem = document.querySelector('#char-hero-bio');
    const imgElem = document.querySelector('#char-hero-img');
    const clipsWrap = document.querySelector('#char-clips-wrap');

    if (nameElem) nameElem.textContent = c.name;
    if (jpElem) jpElem.textContent = c.jpName;
    if (animeElem) animeElem.textContent = `${c.title} • ${c.anime}`;
    if (quoteElem) quoteElem.textContent = c.quote;
    if (bioElem) bioElem.textContent = c.bio;

    const tierElem = document.querySelector('#char-hero-tier');
    if (tierElem) {
      const p = c.stats.power;
      let tier = 'TIER: S SPECIAL GRADE';
      if (p >= 98) tier = 'TIER: SSS+ GODLIKE CALAMITY';
      else if (p >= 95) tier = 'TIER: SS+ CONTINENTAL FORCE';
      else if (p >= 90) tier = 'TIER: S SPECIAL GRADE';
      else tier = 'TIER: A+ MASTER OPERATIVE';
      tierElem.textContent = tier;
    }

    if (imgElem) {
      imgElem.src = c.image;
      imgElem.alt = c.name;
      imgElem.onerror = () => { imgElem.src = `assets/images/characters/${c.id}.svg`; };
    }

    const stats = c.stats;
    const statBars = document.querySelectorAll('[data-char-stat]');
    statBars.forEach(bar => {
      const key = bar.getAttribute('data-char-stat');
      if (stats[key] !== undefined) {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = `${stats[key]}%`;
        }, 50);
        const valElem = bar.closest('.char-stat-row')?.querySelector('.char-stat-val');
        if (valElem) valElem.textContent = stats[key];
      }
    });

    if (clipsWrap && c.clips) {
      clipsWrap.innerHTML = c.clips.map(clip => `
        <div class="char-mini-card" style="min-width: 170px; cursor: pointer;" onclick="SoundFX.playLaser(); showToast('Previewing scene: ${clip.title}', 'info')">
          <div style="background: rgba(168,85,247,0.15); height: 90px; display: flex; align-items: center; justify-content: center; position: relative;">
            <div class="card-play-icon" style="width: 32px; height: 32px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <span class="badge badge-year" style="position: absolute; bottom: 5px; right: 5px; font-size: 0.65rem;">${clip.ep}</span>
          </div>
          <div class="char-mini-info" style="padding: 0.5rem;">
            <div class="char-mini-name" style="font-size: 0.8rem; font-weight: 700;">${clip.title}</div>
            <div class="char-mini-role" style="font-size: 0.7rem; color: var(--accent-purple);">${c.anime}</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Populate Vault Grid with all 40 characters
  const vaultGrid = document.querySelector('#characters-vault-grid');
  const searchInput = document.querySelector('#char-search-input');
  const countBadge = document.querySelector('#char-count-badge');
  const filterTabs = document.querySelectorAll('.char-category-tab');

  function filterAndRenderVault() {
    if (!vaultGrid) return;
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    const filtered = charactersData.filter(c => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.anime.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      const matchesCat = activeFilter === 'all' || 
                         c.category === activeFilter || 
                         (activeFilter === 'Black Clover' && c.anime === 'Black Clover') || 
                         (activeFilter === 'Jujutsu Kaisen' && c.anime === 'Jujutsu Kaisen');
      return matchesSearch && matchesCat;
    });

    if (countBadge) countBadge.textContent = `${filtered.length} of 40 Legends`;

    vaultGrid.innerHTML = filtered.map(c => `
      <div class="char-mini-card ${c.id === activeChar.id ? 'active-char-card' : ''}" data-char-id="${c.id}" style="cursor: pointer;">
        <div style="aspect-ratio: 1; overflow: hidden; border-radius: var(--radius-sm); position: relative;">
          <img class="char-mini-img" src="${c.image}" alt="${c.name}" onerror="this.onerror=null; this.src='assets/images/characters/${c.id}.svg'" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="badge badge-genre" style="position: absolute; bottom: 6px; left: 6px; font-size: 0.65rem; background: rgba(8,8,13,0.85); backdrop-filter: blur(4px);">${c.anime.split(':')[0]}</span>
          <span class="char-power-tier" style="position: absolute; top: 6px; right: 6px; font-size: 0.6rem;">PWR ${c.stats.power}</span>
        </div>
        <div class="char-mini-info" style="padding: 0.6rem 0.4rem;">
          <div class="char-mini-name" style="font-size: 0.85rem; font-weight: 800; color: #FFFFFF;">${c.name}</div>
          <div class="char-mini-role" style="font-size: 0.725rem; color: var(--accent-purple); line-height: 1.3;">${c.title}</div>
        </div>
      </div>
    `).join('');

    // Bind click events on all 40 cards
    vaultGrid.querySelectorAll('.char-mini-card').forEach(card => {
      card.addEventListener('click', () => {
        SoundFX.playPowerUp();
        const id = card.getAttribute('data-char-id');
        const target = charactersData.find(x => x.id === id);
        if (target) {
          renderEditorial(target);
          vaultGrid.querySelectorAll('.char-mini-card').forEach(cd => cd.classList.remove('active-char-card'));
          card.classList.add('active-char-card');
          const spot = document.querySelector('.character-spotlight-editorial');
          if (spot) spot.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterAndRenderVault();
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      SoundFX.playClick();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-category') || 'all';
      filterAndRenderVault();
    });
  });

  // Character Selector Quick Pills
  const charPills = document.querySelectorAll('[data-char-select]');
  charPills.forEach(pill => {
    pill.addEventListener('click', () => {
      SoundFX.playPowerUp();
      charPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const id = pill.getAttribute('data-char-select');
      const c = charactersData.find(x => x.id === id);
      if (c) {
        renderEditorial(c);
        filterAndRenderVault();
      }
    });
  });

  renderEditorial(activeChar);
  filterAndRenderVault();
}

/* ==========================================================================
   12. PAGE: TRENDING (trending.html)
   ========================================================================== */
function initTrendingPage() {
  const listWrap = document.querySelector('#trending-leaderboard-list');
  if (!listWrap) return;

  const sorted = [...ANIME_DATABASE].sort((a, b) => (a.rank || 99) - (b.rank || 99));

  listWrap.innerHTML = sorted.map(a => `
    <div class="sidebar-panel" style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
      <div class="rank-badge ${a.rank === 1 ? 'top-1' : a.rank === 2 ? 'top-2' : a.rank === 3 ? 'top-3' : ''}" style="width: 40px; height: 40px; font-size: 1.15rem;">
        #${a.rank}
      </div>
      <img src="${a.poster}" alt="${a.title}" style="width: 55px; height: 80px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.onerror=null; this.src='assets/images/posters/${a.id}.svg'">
      <div style="flex: 1; min-width: 180px;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
          <a href="anime-details.html?id=${a.id}" style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; color: #FFFFFF;">${a.title}</a>
          <span class="badge badge-featured">${a.trend}</span>
        </div>
        <div style="font-size: 0.775rem; color: var(--text-muted); margin-bottom: 0.35rem;">
          ${a.genres.join(' • ')} | ${a.studio} | ${a.year}
        </div>
        <div style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${a.synopsis}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
        <span class="badge badge-rating" style="font-size: 0.85rem;">★ ${a.rating}</span>
        <div style="display: flex; gap: 0.4rem;">
          <a href="anime-details.html?id=${a.id}" class="btn btn-secondary btn-sm">Details</a>
          <a href="watch.html?id=${a.id}" class="btn btn-primary btn-sm">Watch Hub</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   13. PAGE: NEW RELEASES & SIMULCAST (new-releases.html)
   ========================================================================== */
function initNewReleasesPage() {
  const scheduleWrap = document.querySelector('#simulcast-schedule-grid');
  const dayTabs = document.querySelectorAll('.day-tab');
  const countdownElem = document.querySelector('#simulcast-countdown-timer');

  if (countdownElem) {
    let secondsLeft = 14820;
    setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft < 0) secondsLeft = 86400;
      const h = Math.floor(secondsLeft / 3600);
      const m = Math.floor((secondsLeft % 3600) / 60);
      const s = secondsLeft % 60;
      countdownElem.textContent = `${h < 10 ? '0' : ''}${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    }, 1000);
  }

  function renderDaySchedule(day) {
    if (!scheduleWrap) return;
    const matches = ANIME_DATABASE.filter(a => !day || a.airDay === day || day === 'all');
    scheduleWrap.innerHTML = matches.map(a => `
      <div class="anime-card" data-id="${a.id}">
        <div class="anime-poster-wrap">
        <button class="anime-quick-view-btn" onclick="event.preventDefault(); event.stopPropagation(); openQuickPreview('${a.id}')">👁️ QUICK PREVIEW</button>
          <img class="anime-poster-img" src="${a.poster}" alt="${a.title}" onerror="this.onerror=null; this.src='assets/images/posters/${a.id}.svg'">
          <span class="badge badge-featured" style="position: absolute; top: 6px; left: 6px;">${a.airDay} • ${a.airTime}</span>
          <a href="anime-details.html?id=${a.id}" class="card-play-overlay">
            <div class="card-play-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </a>
        </div>
        <div class="anime-card-body">
          <a href="anime-details.html?id=${a.id}" class="anime-card-title">${a.title}</a>
          <div class="anime-card-meta">
            <span>${a.status}</span>
            <span class="anime-card-rating">★ ${a.rating}</span>
          </div>
        </div>
      </div>
    `).join('');
    bindWatchlistHeartButtons();
  }

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderDaySchedule(tab.getAttribute('data-day'));
    });
  });

  renderDaySchedule('Sunday');
}

/* ==========================================================================
   14. PAGE: SEASONS (seasons.html)
   ========================================================================== */
function initSeasonsPage() {
  const seasonGrid = document.querySelector('#seasons-anime-grid');
  const seasonTabs = document.querySelectorAll('.season-tab');

  function renderSeason(seasonName) {
    if (!seasonGrid) return;
    const items = ANIME_DATABASE.filter(a => a.season && a.season.toLowerCase().includes(seasonName.toLowerCase()));
    const displayList = items.length > 0 ? items : ANIME_DATABASE.slice(0, 8);

    seasonGrid.innerHTML = displayList.map(a => createAnimeCardHTML(a)).join('');
    bindWatchlistHeartButtons();
  }

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      seasonTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSeason(tab.getAttribute('data-season'));
    });
  });

  renderSeason('Fall');
}

/* ==========================================================================
   15. PAGE: MOVIES (movies.html)
   ========================================================================== */
function initMoviesPage() {
  const moviesGrid = document.querySelector('#movies-collection-grid');
  if (!moviesGrid) return;

  const movies = ANIME_DATABASE.filter(a => a.isMovie);

  moviesGrid.innerHTML = movies.map(m => `
    <div class="sidebar-panel" style="display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 1.25rem; align-items: center;">
      <div style="aspect-ratio: 2/3; overflow: hidden; border-radius: var(--radius-sm);">
        <img src="${m.poster}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/images/posters/${m.id}.svg'">
      </div>
      <div>
        <div style="display: flex; gap: 0.4rem; margin-bottom: 0.35rem;">
          <span class="badge badge-featured">THEATRICAL FEATURE</span>
          <span class="badge badge-rating">★ ${m.rating}</span>
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #FFFFFF; margin-bottom: 0.2rem;">${m.title}</h3>
        <div style="font-family: var(--font-jp); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">${m.japaneseTitle}</div>
        <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.85rem;">${m.synopsis}</p>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <a href="${getCrunchyrollUrl(m.title)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Find on Crunchyroll ↗</a>
          <a href="anime-details.html?id=${m.id}" class="btn btn-secondary btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   16. PAGE: ABOUT & FAQ (about.html)
   ========================================================================== */
function initAboutPage() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
      });
    }
  });

  const contactForm = document.querySelector('#about-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for your message! Our anime editorial team will reply shortly.', 'success');
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   17. GLOBAL BOOTSTRAP DISPATCHER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  initAmbientParticles();
  init3DCardTilt();
  initQuickPreviewModal();

  // Attach hover sounds to buttons and cards
  document.querySelectorAll('.btn, .anime-card, .char-mini-card, .genre-tile, .wl-tab').forEach(el => {
    el.addEventListener('mouseenter', () => SoundFX.playHover());
  });


  if (document.querySelector('#home-trending-scroll') || document.querySelector('.hero-card')) {
    initHomePage();
  }
  if (document.querySelector('#explore-anime-grid')) {
    initExplorePage();
  }
  if (document.querySelector('#details-hero-bg') || document.querySelector('#details-title')) {
    initAnimeDetailsPage();
  }
  if (document.querySelector('#watch-player-art') || document.querySelector('#player-center-play')) {
    initWatchPage();
  }
  if (document.querySelector('#watchlist-grid')) {
    initWatchlistPage();
  }
  if (document.querySelector('#char-hero-name') || document.querySelector('[data-char-select]')) {
    initCharactersPage();
  }
  if (document.querySelector('#trending-leaderboard-list')) {
    initTrendingPage();
  }
  if (document.querySelector('#simulcast-schedule-grid')) {
    initNewReleasesPage();
  }
  if (document.querySelector('#seasons-anime-grid')) {
    initSeasonsPage();
  }
  if (document.querySelector('#movies-collection-grid')) {
    initMoviesPage();
  }
  if (document.querySelector('.faq-item') || document.querySelector('#about-contact-form')) {
    initAboutPage();
  }
});


/* 3D Perspective Card Tilt on Mouse Move */
function init3DCardTilt() {
  document.querySelectorAll('.anime-card, .season2-banner-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
