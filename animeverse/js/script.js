/**
 * ANIMEVERSE — PREMIUM ANIME DISCOVERY & WATCH WEBSITE
 * Shared Master JavaScript
 * Handles Catalog Database, Watchlist (localStorage), Navigation, Search,
 * Dynamic Page Rendering, Video Player Simulator, and Community Integrations.
 */

/* ==========================================================================
   1. ANIME DATABASE
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
    poster: 'assets/images/posters/black-clover.svg',
    banner: 'assets/images/banners/black-clover-banner.svg',
    trailerId: 'pr0f85j3',
    featured: true,
    spotlight: true,
    airDay: 'Tuesday',
    airTime: '18:25 JST',
    characters: [
      { name: 'Asta', jp: 'アスタ', role: 'Main Protagonist', va: 'Gakuto Kajiwara', ability: 'Anti-Magic & Demon-Slayer Swords', image: 'assets/images/characters/asta.svg', bio: 'A loud, energetic orphan who possesses zero magic power but wields immense physical prowess and an Anti-Magic five-leaf grimoire.' },
      { name: 'Yuno Grinberryall', jp: 'ユノ', role: 'Main Rival', va: 'Nobunaga Shimazaki', ability: 'Wind Magic & Sylph Spirit Dive', image: 'assets/images/posters/black-clover.svg', bio: 'A calm prodigy who wields the legendary four-leaf clover grimoire and commands the wind spirit Sylph.' },
      { name: 'Noelle Silva', jp: 'ノエル・シルヴァ', role: 'Main Heroine', va: 'Kana Yūki', ability: 'Water Creation Magic (Valkyrie Armor)', image: 'assets/images/posters/black-clover.svg', bio: 'A royal from House Silva who overcomes severe magic control issues to become one of the Black Bulls’ fiercest fighters.' },
      { name: 'Yami Sukehiro', jp: 'ヤミ・スケヒロ', role: 'Black Bulls Captain', va: 'Junichi Suwabe', ability: 'Dark Magic & Katana Swordsmanship', image: 'assets/images/posters/black-clover.svg', bio: 'The formidable captain of the Black Bulls who constantly tells his squad to "surpass their limits right here, right now."' }
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
    poster: 'assets/images/posters/solo-leveling.svg',
    banner: 'assets/images/hero-solo-leveling.jpg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '00:00 JST',
    characters: [
      { name: 'Sung Jinwoo', jp: 'ソン・ジヌ', role: 'Main Protagonist', va: 'Taito Ban', ability: 'Shadow Monarch (Ruler of the Dead)', image: 'assets/images/characters/jinwoo.svg', bio: 'The weakest hunter who undergoes a mysterious awakening, transforming into the all-powerful Monarch of Shadows.' },
      { name: 'Cha Hae-In', jp: 'チャ・ヘイン', role: 'S-Rank Hunter', va: 'Reina Ueda', ability: 'Master Swordsmanship & Radiant Aura', image: 'assets/images/posters/solo-leveling.svg', bio: 'Vice Guild Master of the Hunters Guild and Korea’s third highest ranked hunter, exceptionally sensitive to mana scent.' }
    ],
    episodesList: [
      { ep: 1, title: 'I’m Used to It', duration: '23:45', airDate: 'Jan 7, 2024', desc: 'E-Rank Hunter Sung Jinwoo joins a low-level raid party inside a D-Rank dungeon, only to discover a hidden passage to a deadly C-Rank lair.' },
      { ep: 2, title: 'If I Had One More Chance', duration: '23:50', airDate: 'Jan 14, 2024', desc: 'Trapped inside the Temple of Cartenon, Jinwoo deciphers the God Statue commandments while teammates perish around him.' },
      { ep: 6, title: 'The Real Hunt Begins', duration: '23:40', airDate: 'Feb 11, 2024', desc: 'Betrayed by Hwang Dongsuk’s strike squad, Jinwoo awakens the ruthless resolve necessary to eliminate hostile hunters.' },
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
    poster: 'assets/images/posters/demon-slayer.svg',
    banner: 'assets/images/banners/demon-slayer-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '23:15 JST',
    characters: [
      { name: 'Tanjiro Kamado', jp: '竈門炭治郎', role: 'Demon Slayer', va: 'Natsuki Hanae', ability: 'Water Breathing & Hinokami Kagura', image: 'assets/images/characters/tanjiro.svg', bio: 'A kind-hearted youth with an acute sense of smell who fights tirelessly to turn his demon sister back into a human.' },
      { name: 'Nezuko Kamado', jp: '竈門禰豆子', role: 'Demon Companion', va: 'Akari Kitō', ability: 'Blood Demon Art: Exploding Blood', image: 'assets/images/posters/demon-slayer.svg', bio: 'Tanjiro’s demon sister who retains her human emotions and protects innocent humans with ferocious strength.' }
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
    poster: 'assets/images/posters/jujutsu-kaisen.svg',
    banner: 'assets/images/character-sukuna.jpg',
    featured: true,
    spotlight: false,
    airDay: 'Thursday',
    airTime: '23:56 JST',
    characters: [
      { name: 'Ryomen Sukuna', jp: '宿儺', role: 'King of Curses', va: 'Junichi Suwabe', ability: 'Dismantle, Cleave & Malevolent Shrine', image: 'assets/images/characters/sukuna.svg', bio: 'The supreme calamity of the Golden Age of Sorcery who reigns over cursed energy with absolute malice and dominance.' },
      { name: 'Satoru Gojo', jp: '五条悟', role: 'Special Grade Sorcerer', va: 'Yuichi Nakamura', ability: 'Limitless & Six Eyes (Infinite Void)', image: 'assets/images/characters/gojo.svg', bio: 'The strongest sorcerer alive whose birth shifted the balance of the world.' }
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
    poster: 'assets/images/posters/attack-on-titan.svg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '24:10 JST',
    characters: [
      { name: 'Eren Yeager', jp: 'エレン・イェーガー', role: 'Attack & Founding Titan', va: 'Yūki Kaji', ability: 'Coordinate & Future Memory Inheritance', image: 'assets/images/characters/levi.svg', bio: 'A relentless soldier whose vow to exterminate all titans leads him down a catastrophic path toward the Rumbling.' },
      { name: 'Levi Ackerman', jp: 'リヴァイ・アッカーマン', role: 'Scout Regiment Captain', va: 'Hiroshi Kamiya', ability: 'Humanity’s Strongest Soldier', image: 'assets/images/characters/levi.svg', bio: 'A tactical prodigy and lethal bladesman capable of dismantling titan hordes in seconds.' }
    ],
    episodesList: [
      { ep: 1, title: 'To You, in 2000 Years', duration: '24:10', airDate: 'Apr 7, 2013', desc: 'After a century of peace, the Colossal and Armored Titans breach the Shiganshina district of Wall Maria.' },
      { ep: 54, title: 'Hero', duration: '23:55', airDate: 'May 26, 2019', desc: 'Armin concocts a desperate gambit against Bertholdt’s Colossal Titan while Levi ambushes the Beast Titan.' }
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
    poster: 'assets/images/posters/frieren.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Friday',
    airTime: '23:00 JST',
    characters: [
      { name: 'Frieren', jp: 'フリーレン', role: 'Elven Mage', va: 'Atsumi Tanezaki', ability: 'Ancient Zoltraak & Mana Suppression', image: 'assets/images/characters/frieren.svg', bio: 'An ageless elven mage who slowly discovers the emotional warmth of human connections.' },
      { name: 'Fern', jp: 'フェルン', role: 'Apprentice Mage', va: 'Kana Ichinose', ability: 'High-Speed Offensive Casting', image: 'assets/images/characters/frieren.svg', bio: 'A disciplined war orphan taken in by priest Heiter and trained into a first-class mage by Frieren.' }
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
    poster: 'assets/images/posters/chainsaw-man.svg',
    banner: 'assets/images/banners/demon-slayer-banner.svg',
    featured: true,
    spotlight: false,
    airDay: 'Tuesday',
    airTime: '24:00 JST',
    characters: [
      { name: 'Denji', jp: 'デンジ', role: 'Chainsaw Hybrid', va: 'Kikunosuke Toya', ability: 'Ripcord Chainsaw Metamorphosis', image: 'assets/images/characters/denji.svg', bio: 'A raw, impulsive teen whose chainsaw blades shred devils in visceral bloodbaths.' }
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
    poster: 'assets/images/posters/spy-x-family.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '23:00 JST',
    characters: [
      { name: 'Loid Forger', jp: 'ロイド・フォージャー', role: 'Spy "Twilight"', va: 'Takuya Eguchi', ability: 'Master of Disguise & Tactics', image: 'assets/images/posters/spy-x-family.svg', bio: 'A Westalian super-spy dedicated to engineering world peace.' },
      { name: 'Anya Forger', jp: 'アーニャ・フォージャー', role: 'Telepathic Daughter', va: 'Atsumi Tanezaki', ability: 'Mind Reading & Peanut Lover', image: 'assets/images/posters/spy-x-family.svg', bio: 'An endearing runaway experiment who knows her parents’ true secret identities.' }
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
    poster: 'assets/images/posters/steins-gate.svg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Wednesday',
    airTime: '02:05 JST',
    characters: [
      { name: 'Rintaro Okabe', jp: '岡部倫太郎', role: 'Mad Scientist Hououin Kyouma', va: 'Mamoru Miyano', ability: 'Reading Steiner (Timeline Memory Retention)', image: 'assets/images/posters/steins-gate.svg', bio: 'The dramatic leader of Future Gadget Laboratory who suffers the trauma of infinite world-line shifts.' }
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
    poster: 'assets/images/posters/naruto.svg',
    banner: 'assets/images/banners/black-clover-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Thursday',
    airTime: '19:30 JST',
    characters: [
      { name: 'Naruto Uzumaki', jp: 'うずまきナルト', role: 'Nine-Tails Jinchuriki', va: 'Junko Takeuchi', ability: 'Rasenshuriken & Sage Mode', image: 'assets/images/posters/naruto.svg', bio: 'The stubborn ninja whose indomitable will and Talk no Jutsu unite the ninja world.' }
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
    poster: 'assets/images/posters/one-piece.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Sunday',
    airTime: '09:30 JST',
    characters: [
      { name: 'Monkey D. Luffy', jp: 'モンキー・D・ルフィ', role: 'Captain of Straw Hats', va: 'Mayumi Tanaka', ability: 'Gear 5 Sun God Nika', image: 'assets/images/posters/one-piece.svg', bio: 'The rubber pirate whose boundless freedom and joyful laughter topples emperors.' }
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
    poster: 'assets/images/posters/sword-art-online.svg',
    banner: 'assets/images/banners/attack-on-titan-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '24:00 JST',
    characters: [
      { name: 'Kirito (Kazuto Kirigaya)', jp: 'キリト', role: 'The Black Swordsman', va: 'Yoshitsugu Matsuoka', ability: 'Dual Blades Starburst Stream', image: 'assets/images/posters/sword-art-online.svg', bio: 'A solo beta tester whose lightning-fast reaction speed unravels Aincrad’s death trap.' }
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
    poster: 'assets/images/posters/my-hero-academia.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    airDay: 'Saturday',
    airTime: '17:30 JST',
    characters: [
      { name: 'Izuku Midoriya (Deku)', jp: '緑谷出久', role: '9th One For All Wielder', va: 'Daiki Yamashita', ability: 'One For All Full Cowl & Gearshift', image: 'assets/images/posters/my-hero-academia.svg', bio: 'The green-haired boy whose analytical heroism inspires heroes and citizens alike.' }
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
    poster: 'assets/images/posters/suzume.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    isMovie: true,
    characters: [
      { name: 'Suzume Iwato', jp: '岩戸鈴芽', role: 'Main Protagonist', va: 'Nanoka Hara', ability: 'Closer of Disasters', image: 'assets/images/posters/suzume.svg', bio: 'A resilient high schooler who ventures across Japan to lock away ancient calamity portals.' }
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
    poster: 'assets/images/posters/your-name.svg',
    banner: 'assets/images/banners/solo-leveling-banner.svg',
    featured: false,
    spotlight: false,
    isMovie: true,
    characters: [
      { name: 'Taki Tachibana', jp: '立花瀧', role: 'Male Lead', va: 'Ryunosuke Kamiki', ability: 'Body Swapping & Architectural Sketching', image: 'assets/images/posters/your-name.svg', bio: 'A sincere Tokyo teenager whose love transcends space and time to save Itomori.' }
    ],
    episodesList: [
      { ep: 1, title: 'Your Name (Theatrical Film)', duration: '106:00', airDate: 'Aug 26, 2016', desc: 'Taki and Mitsuha navigate inexplicable body-swapping and uncover a 3-year temporal rift before Comet Tiamat strikes.' }
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
      badge.style.display = count > 0 ? 'inline-block' : 'none';
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

  // Trigger animation
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

  // Active page highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile drawer toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target) && mobileDrawer.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
      }
    });
  }

  // Header quick search
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
            <img src="${a.poster}" alt="${a.title}" onerror="this.src='assets/images/posters/black-clover.svg'">
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

  // Initialize badges
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
        <img class="anime-poster-img" src="${anime.poster}" alt="${anime.title}" onerror="this.src='assets/images/posters/black-clover.svg'" loading="lazy">
        ${showRank ? `<div class="rank-badge ${rankClass}">${anime.rank}</div>` : ''}
        <button class="btn-card-watchlist ${isSaved ? 'active' : ''}" data-anime-id="${anime.id}" title="${isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}" aria-label="Watchlist">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <a href="anime-details.html?id=${anime.id}" class="card-play-overlay">
          <div class="card-play-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
   6. PAGE: HOME (index.html)
   ========================================================================== */
function initHomePage() {
  // 1. Render Trending Row
  const trendingWrap = document.querySelector('#home-trending-scroll');
  if (trendingWrap) {
    const trendingList = ANIME_DATABASE.slice(0, 8);
    trendingWrap.innerHTML = trendingList.map((a, i) => createAnimeCardHTML(a, { showRank: true })).join('');
    bindWatchlistHeartButtons();

    // Horizontal Scroll Arrows
    const prevBtn = document.querySelector('#btn-trending-prev');
    const nextBtn = document.querySelector('#btn-trending-next');
    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => trendingWrap.scrollBy({ left: -320, behavior: 'smooth' });
      nextBtn.onclick = () => trendingWrap.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }

  // 2. Render Continue Discovering Grid
  const discoverWrap = document.querySelector('#home-discover-grid');
  if (discoverWrap) {
    const discoverList = ANIME_DATABASE.slice(4, 12);
    discoverWrap.innerHTML = discoverList.map(a => createAnimeCardHTML(a)).join('');
    bindWatchlistHeartButtons();
  }

  // 3. Hero Carousel Slides Switcher
  const heroSlides = [
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
  const heroCard = document.querySelector('.hero-card');
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

  // Check URL query params for initial search or genre
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
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const sortBy = sortSelect ? sortSelect.value : 'rating';
    const yearFilter = yearSelect ? yearSelect.value : 'all';

    let filtered = ANIME_DATABASE.filter(anime => {
      // Title match
      const matchQuery = !q || anime.title.toLowerCase().includes(q) || anime.genres.some(g => g.toLowerCase().includes(q));
      // Genre match
      const matchGenre = !activeGenre || activeGenre === 'all' || anime.genres.some(g => g.toLowerCase() === activeGenre.toLowerCase());
      // Year match
      let matchYear = true;
      if (yearFilter === '2024') matchYear = anime.year === 2024;
      else if (yearFilter === '2020s') matchYear = anime.year >= 2020;
      else if (yearFilter === '2010s') matchYear = anime.year >= 2010 && anime.year < 2020;
      else if (yearFilter === 'classic') matchYear = anime.year < 2010;

      return matchQuery && matchGenre && matchYear;
    });

    // Sorting
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
            <div style="font-size: 3rem;">🔍</div>
            <h3 style="font-family: var(--font-display); font-size: 1.4rem;">No Anime Found</h3>
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
  // Default to black-clover as requested in prompt section 7
  const animeId = urlParams.get('id') || 'black-clover';
  const anime = ANIME_DATABASE.find(a => a.id === animeId) || ANIME_DATABASE[0];

  // Set document title
  document.title = `${anime.title} — Anime Information | ANIMEVERSE`;

  // Hero Backdrop & Poster
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
  if (posterImg) posterImg.src = anime.poster;
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

  // Official Crunchyroll search link
  if (crunchyrollBtn) {
    crunchyrollBtn.href = getCrunchyrollUrl(anime.title);
    crunchyrollBtn.target = '_blank';
    crunchyrollBtn.rel = 'noopener noreferrer';
  }

  if (watchHubBtn) {
    watchHubBtn.href = `watch.html?id=${anime.id}`;
  }

  // Watchlist state & toggle
  if (watchlistBtn) {
    function updateWlBtn() {
      const saved = WatchlistStore.has(anime.id);
      watchlistBtn.innerHTML = saved 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> In Watchlist`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Add to Watchlist`;
      watchlistBtn.classList.toggle('btn-primary', !saved);
      watchlistBtn.classList.toggle('btn-secondary', saved);
    }
    updateWlBtn();

    watchlistBtn.onclick = () => {
      WatchlistStore.toggle(anime.id);
      updateWlBtn();
    };
  }

  // Render Characters
  const charGrid = document.querySelector('#details-characters-grid');
  if (charGrid && anime.characters) {
    charGrid.innerHTML = anime.characters.map(c => `
      <div class="char-mini-card">
        <img class="char-mini-img" src="${c.image}" alt="${c.name}" onerror="this.src='assets/images/posters/black-clover.svg'">
        <div class="char-mini-info">
          <div class="char-mini-name">${c.name}</div>
          <div class="char-mini-role">${c.role}</div>
        </div>
      </div>
    `).join('');
  }

  // Render Episodes Guide
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

  // Related Anime row
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

  // Populate title & meta
  const titleElem = document.querySelector('#watch-anime-title');
  const epElem = document.querySelector('#watch-episode-badge');
  const epDescElem = document.querySelector('#watch-episode-desc');
  const backdropArt = document.querySelector('#watch-player-art');
  const crunchyrollBtn = document.querySelector('#watch-btn-crunchyroll');
  const crunchyrollAlertBtn = document.querySelector('#btn-alert-crunchyroll');

  if (titleElem) titleElem.textContent = anime.title;
  if (epElem) epElem.textContent = `Episode ${epNum}`;
  if (backdropArt) backdropArt.src = anime.banner || anime.poster;

  // Selected episode description
  const curEp = anime.episodesList ? anime.episodesList.find(e => e.ep === epNum) || anime.episodesList[0] : null;
  if (epDescElem && curEp) {
    epDescElem.textContent = `${curEp.title}: ${curEp.desc}`;
  }

  // Crunchyroll Official Search Link
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

  // Interactive Video Player Simulator
  const playBtn = document.querySelector('#player-center-play');
  const ctrlPlayBtn = document.querySelector('#ctrl-play-pause');
  const scrubberFill = document.querySelector('#player-scrubber-fill');
  const timeDisplay = document.querySelector('#player-timecode');
  let isPlaying = false;
  let playInterval = null;
  let currentSec = 25;
  const totalSec = 1420; // 23:40

  function formatTime(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (playBtn) playBtn.style.opacity = '0';
      if (ctrlPlayBtn) ctrlPlayBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      showToast(`Previewing "${anime.title}" Episode ${epNum}. To watch full licensed episodes, stream on Crunchyroll.`, 'info');

      playInterval = setInterval(() => {
        currentSec += 1;
        if (currentSec >= totalSec) currentSec = 0;
        if (scrubberFill) scrubberFill.style.width = `${(currentSec / totalSec) * 100}%`;
        if (timeDisplay) timeDisplay.textContent = `${formatTime(currentSec)} / ${formatTime(totalSec)}`;
      }, 1000);
    } else {
      if (playBtn) playBtn.style.opacity = '1';
      if (ctrlPlayBtn) ctrlPlayBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      clearInterval(playInterval);
    }
  }

  if (playBtn) playBtn.onclick = togglePlay;
  if (ctrlPlayBtn) ctrlPlayBtn.onclick = togglePlay;

  // Render Episode Selector List
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

  // Watchlist toggle on Watch Page
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

  // Related anime row
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

  let activeTab = 'all';

  function renderWatchlist() {
    const list = WatchlistStore.getAll();
    if (countDisplay) countDisplay.textContent = `${list.length} Items`;

    let filtered = list;
    if (activeTab !== 'all') {
      filtered = list.filter(item => (item.status || 'Watching').toLowerCase() === activeTab.toLowerCase());
    }

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-watchlist-box" style="grid-column: 1 / -1;">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem;">Your Watchlist is Empty</h3>
          <p style="color: var(--text-secondary); max-width: 460px;">You haven’t saved any anime to your personal collection yet. Browse our catalog and click the heart icon on any series to track it here!</p>
          <a href="explore.html" class="btn btn-primary">Explore Anime Catalog</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="anime-card" data-id="${item.id}">
        <div class="anime-poster-wrap">
          <img class="anime-poster-img" src="${item.poster}" alt="${item.title}" onerror="this.src='assets/images/posters/black-clover.svg'">
          <button class="btn-card-watchlist active" data-wl-remove="${item.id}" title="Remove from Watchlist">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <a href="anime-details.html?id=${item.id}" class="card-play-overlay">
            <div class="card-play-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </a>
        </div>
        <div class="anime-card-body">
          <a href="anime-details.html?id=${item.id}" class="anime-card-title">${item.title}</a>
          <div class="anime-card-meta">
            <span class="badge badge-rating">★ ${item.rating}</span>
            <a href="${getCrunchyrollUrl(item.title)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; color: #F47521; font-weight: 700;">Find on Crunchyroll ↗</a>
          </div>
        </div>
      </div>
    `).join('');

    // Bind remove buttons
    document.querySelectorAll('[data-wl-remove]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-wl-remove');
        WatchlistStore.remove(id);
        renderWatchlist();
      };
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-status');
      renderWatchlist();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your entire watchlist?')) {
        WatchlistStore.clear();
        renderWatchlist();
      }
    });
  }

  renderWatchlist();
}

/* ==========================================================================
   11. PAGE: CHARACTERS (characters.html)
   ========================================================================== */
function initCharactersPage() {
  const charactersData = [
    {
      id: 'sukuna',
      name: 'RYOMEN SUKUNA',
      jpName: '両面宿儺 (ライオメンスクナ)',
      anime: 'Jujutsu Kaisen',
      title: 'KING OF ALL CURSES',
      quote: '"Stand proud. You are strong."',
      image: 'assets/images/characters/sukuna.jpg',
      bio: 'An ancient sorcerer from a thousand years ago who reigns as the supreme calamity in jujutsu history. Sukuna possesses godlike physical strength, lethal slashing techniques (Cleave & Dismantle), and the devastating Domain Expansion: Malevolent Shrine.',
      stats: { power: 99, speed: 96, cursedEnergy: 100, intelligence: 95, durability: 98 },
      clips: [
        { title: 'Malevolent Shrine Domain Expansion', ep: 'Ep 17' },
        { title: 'Sukuna vs Jogo Meteor Showdown', ep: 'Ep 16' },
        { title: '"Know Your Place, Fool."', ep: 'Ep 4' },
        { title: 'Sukuna vs Mahoraga Shibuya Clash', ep: 'Ep 17' }
      ]
    },
    {
      id: 'asta',
      name: 'ASTA',
      jpName: 'アスタ (限界突破)',
      anime: 'Black Clover',
      title: 'BLACK BULLS MAGIC KNIGHT',
      quote: '"My magic is never giving up!"',
      image: 'assets/images/characters/asta.svg',
      bio: 'Born with zero magical power in the Clover Kingdom, Asta forged an iron physique through relentless grit. Wielding a five-leaf grimoire imbued with an Anti-Magic devil, he nullifies any sorcery and fights tirelessly to become the next Wizard King.',
      stats: { power: 94, speed: 92, cursedEnergy: 0, intelligence: 78, durability: 96 },
      clips: [
        { title: 'Black Meteorite Awakening', ep: 'Ep 49' },
        { title: 'Asta & Yami vs Dante', ep: 'Ep 166' },
        { title: 'Devil Union Mode Unleashed', ep: 'Ep 170' }
      ]
    },
    {
      id: 'jinwoo',
      name: 'SUNG JINWOO',
      jpName: 'ソン・ジヌ (影の君主)',
      anime: 'Solo Leveling',
      title: 'THE SHADOW MONARCH',
      quote: '"Arise."',
      image: 'assets/images/characters/jinwoo.svg',
      bio: 'Once mocked as the Weakest Hunter of All Mankind, Sung Jinwoo survived a catastrophic double dungeon. Reborn with the Player system, he commands an infinite legion of fallen shadow soldiers with godlike necromantic dominance.',
      stats: { power: 98, speed: 97, cursedEnergy: 99, intelligence: 92, durability: 95 },
      clips: [
        { title: 'Commanding Blood-Red Commander Igris', ep: 'Ep 12' },
        { title: 'Execution of the Traitor Strike Squad', ep: 'Ep 6' },
        { title: 'Soloing the Demon Castle Dungeon', ep: 'Ep 10' }
      ]
    },
    {
      id: 'gojo',
      name: 'SATORU GOJO',
      jpName: '五条悟 (現代最強の呪術師)',
      anime: 'Jujutsu Kaisen',
      title: 'THE STRONGEST SORCERER',
      quote: '"Throughout Heaven and Earth, I alone am the honored one."',
      image: 'assets/images/characters/gojo.svg',
      bio: 'The head of the Gojo clan and master of the Limitless and Six Eyes. Satoru Gojo manipulates space itself through Infinity and traps foes in the cognitive overload of Infinite Void.',
      stats: { power: 100, speed: 100, cursedEnergy: 98, intelligence: 97, durability: 99 },
      clips: [
        { title: 'Hollow Purple vs Hanami', ep: 'Ep 20' },
        { title: '0.2 Second Infinite Void in Shibuya', ep: 'Ep 9' }
      ]
    }
  ];

  let activeChar = charactersData[0];

  function renderEditorial(c) {
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
    if (imgElem) {
      imgElem.src = c.image;
      imgElem.alt = c.name;
    }

    // Radar / Stats
    const stats = c.stats;
    const statBars = document.querySelectorAll('[data-char-stat]');
    statBars.forEach(bar => {
      const key = bar.getAttribute('data-char-stat');
      if (stats[key] !== undefined) {
        bar.style.width = `${stats[key]}%`;
        const valElem = bar.closest('.char-stat-row').querySelector('.char-stat-val');
        if (valElem) valElem.textContent = stats[key];
      }
    });

    // Popular clips carousel
    if (clipsWrap && c.clips) {
      clipsWrap.innerHTML = c.clips.map(clip => `
        <div class="char-mini-card" style="min-width: 180px; cursor: pointer;" onclick="showToast('Playing scene preview: ${clip.title}', 'info')">
          <div style="background: rgba(168,85,247,0.15); height: 100px; display: flex; align-items: center; justify-content: center; position: relative;">
            <div class="card-play-icon" style="width: 36px; height: 36px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <span class="badge badge-year" style="position: absolute; bottom: 6px; right: 6px;">${clip.ep}</span>
          </div>
          <div class="char-mini-info">
            <div class="char-mini-name">${clip.title}</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Bind selector tabs
  const charSelectors = document.querySelectorAll('[data-char-select]');
  charSelectors.forEach(btn => {
    btn.addEventListener('click', () => {
      charSelectors.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.getAttribute('data-char-select');
      const found = charactersData.find(ch => ch.id === id);
      if (found) {
        activeChar = found;
        renderEditorial(found);
      }
    });
  });

  renderEditorial(activeChar);
}

/* ==========================================================================
   12. PAGE: TRENDING (trending.html)
   ========================================================================== */
function initTrendingPage() {
  const listWrap = document.querySelector('#trending-leaderboard-list');
  if (!listWrap) return;

  const sorted = [...ANIME_DATABASE].sort((a, b) => (a.rank || 99) - (b.rank || 99));

  listWrap.innerHTML = sorted.map(a => `
    <div class="sidebar-panel" style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
      <div class="rank-badge ${a.rank === 1 ? 'top-1' : a.rank === 2 ? 'top-2' : a.rank === 3 ? 'top-3' : ''}" style="width: 44px; height: 44px; font-size: 1.25rem;">
        #${a.rank}
      </div>
      <img src="${a.poster}" alt="${a.title}" style="width: 60px; height: 85px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.src='assets/images/posters/black-clover.svg'">
      <div style="flex: 1; min-width: 200px;">
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.25rem;">
          <a href="anime-details.html?id=${a.id}" style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; color: #FFFFFF;">${a.title}</a>
          <span class="badge badge-featured">${a.trend}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">
          ${a.genres.join(' • ')} | ${a.studio} | ${a.year}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${a.synopsis}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem;">
        <span class="badge badge-rating" style="font-size: 0.9rem;">★ ${a.rating}</span>
        <div style="display: flex; gap: 0.5rem;">
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

  // Live countdown clock
  if (countdownElem) {
    let secondsLeft = 14820; // ~4 hours
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
          <img class="anime-poster-img" src="${a.poster}" alt="${a.title}" onerror="this.src='assets/images/posters/black-clover.svg'">
          <span class="badge badge-featured" style="position: absolute; top: 10px; left: 10px;">${a.airDay} • ${a.airTime}</span>
          <a href="anime-details.html?id=${a.id}" class="card-play-overlay">
            <div class="card-play-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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

  const movies = ANIME_DATABASE.filter(a => a.isMovie || a.genres.includes('Movie') || a.id === 'suzume' || a.id === 'your-name' || a.id === 'demon-slayer');

  moviesGrid.innerHTML = movies.map(m => `
    <div class="sidebar-panel" style="display: grid; grid-template-columns: 180px 1fr; gap: 1.5rem; align-items: center;">
      <div style="aspect-ratio: 2/3; overflow: hidden; border-radius: var(--radius-sm);">
        <img src="${m.poster}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/posters/black-clover.svg'">
      </div>
      <div>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.4rem;">
          <span class="badge badge-featured">THEATRICAL FEATURE</span>
          <span class="badge badge-rating">★ ${m.rating}</span>
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #FFFFFF; margin-bottom: 0.25rem;">${m.title}</h3>
        <div style="font-family: var(--font-jp); font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.6rem;">${m.japaneseTitle}</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">${m.synopsis}</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
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
  // FAQ Accordion
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

  // Contact form submission simulator
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

  // Page-specific initializers by detecting elements
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
