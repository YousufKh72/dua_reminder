// src/data/duas.js
// LOCAL MOCK DATASET — used during development only.
// In production, data is fetched from Supabase via duaService.js
// Shape must exactly match the Supabase `duas` table schema.

export const duas = [
    {
        id: "mock-01",
        title_english: "Before Eating",
        arabic: "بِسْمِ اللهِ",
        transliteration: "Bismillah",
        meanings: {
            english: "In the name of Allah.",
            bangla: "আল্লাহর নামে।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ said: 'Whoever does not mention the name of Allah before eating, Shaytan shares his food with him.' (Abu Dawud 3766). If one forgets, they should say the extended form upon remembering.",
        instructions: "Recite before beginning any meal or drink. If you forget to say it at the start, say: 'بِسْمِ اللهِ أَوَّلَهُ وَآخِرَهُ' (Bismillahi awwalahu wa-akhirahu — In the name of Allah at its beginning and its end).",
        tags: ["before-eating", "general"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-02",
        title_english: "After Eating",
        arabic: "الْحَمْدُ للهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
        meanings: {
            english: "All praise is due to Allah who fed me this and provided it for me without any strength or power on my part.",
            bangla: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাকে এটি খাইয়েছেন এবং আমার কোনো শক্তি বা ক্ষমতা ছাড়াই এটি দান করেছেন।"
        },
        audio_file_url: null,
        story: "Reported by Abu Dawud and Ibn Majah. Whoever says this dua after eating, his past sins will be forgiven.",
        instructions: "Recite immediately after completing a meal.",
        tags: ["after-eating", "general"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-03",
        title_english: "Before Sleeping",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        meanings: {
            english: "In Your name, O Allah, I die and I live.",
            bangla: "হে আল্লাহ! আপনার নামেই আমি মরি এবং বাঁচি।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ would say this dua every night before sleeping. (Bukhari 6324). Sleep is a minor death — by saying this we acknowledge that our life and death are in Allah's hands.",
        instructions: "Say while lying down to sleep, before closing your eyes. It is also recommended to sleep on your right side and to do wudu before sleep.",
        tags: ["sleep", "evening"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-04",
        title_english: "Upon Waking",
        arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
        meanings: {
            english: "All praise is due to Allah who gave us life after causing us to die, and to Him is the resurrection.",
            bangla: "সমস্ত প্রশংসা আল্লাহর, যিনি আমাদের মৃত্যুর পর পুনরায় জীবিত করেছেন এবং তাঁর কাছেই পুনরুত্থান।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ would say this immediately upon waking. (Bukhari 6312). It reminds us that every morning is a gift — a new chance after the minor death of sleep.",
        instructions: "The first words to say when you open your eyes in the morning. Sit up slightly and say this before getting out of bed.",
        tags: ["morning", "waking"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-05",
        title_english: "Entering the Home",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا",
        transliteration: "Allahumma inni as'aluka khayral mawliji wa khayral makhraji, bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
        meanings: {
            english: "O Allah, I ask You for the best of entering and the best of leaving. In the name of Allah we enter, and in the name of Allah we leave, and upon Allah our Lord we rely.",
            bangla: "হে আল্লাহ! আমি আপনার কাছে উত্তম প্রবেশ এবং উত্তম প্রস্থান চাই। আল্লাহর নামে আমরা প্রবেশ করি, আল্লাহর নামে আমরা বের হই, এবং আমাদের রব আল্লাহর উপর আমরা ভরসা করি।"
        },
        audio_file_url: null,
        story: "Reported by Abu Dawud. Saying this dua upon entering the home drives away Shaytan and brings blessings into the household.",
        instructions: "Say upon entering your home. Make salaam to your family after. The Prophet ﷺ would greet his household when entering.",
        tags: ["entering-home", "general"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-06",
        title_english: "Leaving the Home",
        arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
        meanings: {
            english: "In the name of Allah, I place my trust in Allah, and there is no might or power except with Allah.",
            bangla: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করলাম, এবং আল্লাহ ছাড়া কোনো শক্তি ও ক্ষমতা নেই।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ said: 'Whoever says this when leaving his home, it will be said to him: You are guided, protected, and kept safe, and the shaytan will keep away from him.' (Abu Dawud 5095)",
        instructions: "Say every time you step out of your home. You will be protected throughout your journey.",
        tags: ["leaving-home", "general", "travel"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-07",
        title_english: "Dua for Anxiety & Distress",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ",
        transliteration: "Allahumma inni 'abduk, ibnu 'abdik, ibnu amatik, nasiyati biyadik, madin fiyya hukmuk, 'adlun fiyya qada'uk",
        meanings: {
            english: "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand. Your command over me is forever executed and Your decree over me is just.",
            bangla: "হে আল্লাহ! আমি আপনার বান্দা, আপনার বান্দার পুত্র, আপনার বাঁদীর পুত্র। আমার ললাট আপনার হাতে। আমার উপর আপনার আদেশ চিরকাল কার্যকর এবং আমার ব্যাপারে আপনার ফয়সালা ন্যায়সঙ্গত।"
        },
        audio_file_url: null,
        story: "This is part of a longer dua known as 'Dua of distress' (du'a al-karb). The Prophet ﷺ said: 'There is no one who is afflicted with grief and says this, but Allah will take away his grief and replace it with joy.' (Ahmad 3712)",
        instructions: "Recite when feeling overwhelmed, anxious, or distressed. It is recommended to recite it multiple times with sincerity and full conviction in Allah's mercy.",
        tags: ["anxiety", "distress", "general"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-08",
        title_english: "Sayyidul Istighfar (Master of Forgiveness)",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi, faghfir li, fa-innahu la yaghfirudh-dhunuba illa ant",
        meanings: {
            english: "O Allah, You are my Lord. There is none worthy of worship but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge with You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for verily none forgives sins except You.",
            bangla: "হে আল্লাহ! আপনি আমার রব। আপনি ছাড়া কোনো ইলাহ নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা। আমি আমার সাধ্যমতো আপনার সাথে প্রতিশ্রুতি ও অঙ্গীকারে আবদ্ধ। আমি আমার কৃতকর্মের অনিষ্ট থেকে আপনার আশ্রয় চাই। আমি আপনার নেয়ামতের কথা স্বীকার করি এবং আমার গুনাহের কথাও স্বীকার করি। সুতরাং আমাকে মাফ করুন, কারণ আপনি ছাড়া কেউ গুনাহ মাফ করতে পারে না।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ said: 'Whoever says this with conviction in the morning and then dies that day before evening, will be among the people of Paradise. And whoever says it in the evening with conviction and then dies that night before morning, will be among the people of Paradise.' (Bukhari 6306)",
        instructions: "Recite once every morning and once every evening with full sincerity and understanding of its meaning.",
        tags: ["forgiveness", "morning", "evening"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-09",
        title_english: "After the Adhan (Call to Prayer)",
        arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
        transliteration: "Allahumma rabba hadhihid-da'watit-tammah, was-salatil-qa'imah, ati Muhammadanil-wasilata wal-fadilah, wab'ath-hu maqaman mahmudanil-ladhi wa'adtah",
        meanings: {
            english: "O Allah, Lord of this perfect call and the prayer to be offered, grant Muhammad the privilege of intercession and also the eminence, and resurrect him to the praised position that You have promised him.",
            bangla: "হে আল্লাহ! এই পরিপূর্ণ আহবান ও প্রতিষ্ঠিত নামাযের রব! মুহাম্মদ (ﷺ)-কে সুপারিশের মর্যাদা ও শ্রেষ্ঠত্ব দান করুন এবং তাঁকে সেই প্রশংসিত স্থানে পুনরুত্থিত করুন যার প্রতিশ্রুতি আপনি তাঁকে দিয়েছেন।"
        },
        audio_file_url: null,
        story: "The Prophet ﷺ said: 'Whoever says this after hearing the adhan, my intercession will be permitted for him on the Day of Resurrection.' (Bukhari 614)",
        instructions: "Recite after the muadhdhin finishes the adhan. First repeat the words of the adhan (except for 'Hayya 'alas-salah' and 'Hayya 'alal-falah', for which you say 'La hawla wa la quwwata illa billah').",
        tags: ["after-adhan", "after-fajr", "after-dhuhr", "after-asr", "after-maghrib", "after-isha"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    },
    {
        id: "mock-10",
        title_english: "Morning Remembrance",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        transliteration: "Subhanallahi wa bihamdih",
        meanings: {
            english: "Glory is to Allah and praise is to Him.",
            bangla: "আল্লাহ পবিত্র এবং সমস্ত প্রশংসা তাঁর।"
        },
        audio_file_url: null,
        story: "The Prophet \u066e said: Whoever says SubhanAllahi wa bihamdih one hundred times in the morning and evening will have his sins forgiven even if they are like the foam of the sea. (Bukhari 6405 / Muslim 2692)",
        instructions: "Recite 100 times every morning and evening. You may use a tasbih (prayer beads) to keep count. This is one of the most rewarding and lightweight forms of dhikr.",
        tags: ["morning", "evening", "dhikr", "general"],
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z"
    }
];

export const tags = [
    "all",
    "morning",
    "evening",
    "general",
    "sleep",
    "waking",
    "before-eating",
    "after-eating",
    "entering-home",
    "leaving-home",
    "travel",
    "anxiety",
    "distress",
    "forgiveness",
    "dhikr",
    "after-adhan",
    "after-fajr",
    "after-dhuhr",
    "after-asr",
    "after-maghrib",
    "after-isha"
];
