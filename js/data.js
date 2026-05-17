// ============================================
// 💾 DATA.JS - БАЗА ДАНИХ МОНЕТ ТА СТАТЕЙ
// ============================================

// ============================================
// 🪙 ПОЧАТКОВІ МОНЕТИ (15 штук)
// ============================================

const initialCoins = [
    // Україна
    {
        id: "ukr_1",
        country: "Ukraine",
        countryCode: "UA",
        name: { uk: "1 гривня 'Державний грифон'", en: "1 Hryvnia 'State Griffin'" },
        year: 2022,
        denomination: "1 гривня",
        metal: "нейзильбер",
        metalType: "silver",
        weight: 12.8,
        diameter: 31,
        mintage: 50000,
        rarity: 5,
        priceUSD: 15,
        priceUAH: 550,
        image: "assets/images/ukraine-gryphon.jpg",
        history: {
            uk: "Пам'ятна монета присвячена символу української геральдики — грифону. Викарбувана на честь 30-річчя незалежності України. Грифон є оберегом та символом влади.",
            en: "Commemorative coin dedicated to the symbol of Ukrainian heraldry - the griffin. Minted for the 30th anniversary of Ukraine's independence. The griffin is a talisman and symbol of power."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    {
        id: "ukr_2",
        country: "Ukraine",
        countryCode: "UA",
        name: { uk: "10 гривень 'Козак Мамай'", en: "10 Hryvnias 'Kozak Mamai'" },
        year: 2020,
        denomination: "10 гривень",
        metal: "срібло 925",
        metalType: "silver",
        weight: 31.1,
        diameter: 38.6,
        mintage: 2500,
        rarity: 8,
        priceUSD: 120,
        priceUAH: 4400,
        image: "assets/images/ukraine-kozak.jpg",
        history: {
            uk: "Монета присвячена українському народному герою — козаку Мамаю. Символ волі та козацької доби.",
            en: "The coin is dedicated to the Ukrainian folk hero - Kozak Mamai. A symbol of freedom and the Cossack era."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    {
        id: "ukr_3",
        country: "Ukraine",
        countryCode: "UA",
        name: { uk: "5 гривень 'Бандерівська листівка'", en: "5 Hryvnias 'Bandera Postcard'" },
        year: 2024,
        denomination: "5 гривень",
        metal: "нейзильбер",
        metalType: "silver",
        weight: 16.54,
        diameter: 35,
        mintage: 50000,
        rarity: 6,
        priceUSD: 25,
        priceUAH: 920,
        image: "assets/images/ukraine-bandera.jpg",
        history: {
            uk: "Пам'ятна монета до 115-річчя від дня народження Степана Бандери.",
            en: "Commemorative coin for the 115th anniversary of Stepan Bandera's birth."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-02-10"
    },
    {
        id: "ukr_4",
        country: "Ukraine",
        countryCode: "UA",
        name: { uk: "20 гривень 'Київська Русь'", en: "20 Hryvnias 'Kyivan Rus'" },
        year: 2018,
        denomination: "20 гривень",
        metal: "золото 999",
        metalType: "gold",
        weight: 3.11,
        diameter: 16,
        mintage: 3000,
        rarity: 9,
        priceUSD: 350,
        priceUAH: 12800,
        image: "assets/images/ukraine-rus.jpg",
        history: {
            uk: "Монета присвячена історії Київської Русі — першій державі східних слов'ян.",
            en: "The coin is dedicated to the history of Kyivan Rus - the first state of the Eastern Slavs."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    {
        id: "ukr_5",
        country: "Ukraine",
        countryCode: "UA",
        name: { uk: "2 гривні 'Чорнобиль. Відродження'", en: "2 Hryvnias 'Chernobyl. Rebirth'" },
        year: 2021,
        denomination: "2 гривні",
        metal: "нейзильбер",
        metalType: "silver",
        weight: 12.8,
        diameter: 31,
        mintage: 40000,
        rarity: 5,
        priceUSD: 12,
        priceUAH: 440,
        image: "assets/images/ukraine-chornobyl.jpg",
        history: {
            uk: "Пам'ятна монета до 35-х роковин аварії на Чорнобильській АЕС.",
            en: "Commemorative coin for the 35th anniversary of the Chernobyl nuclear accident."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-03-01"
    },
    // США
    {
        id: "us_1",
        country: "USA",
        countryCode: "US",
        name: { uk: "Morgan Dollar 1884", en: "Morgan Dollar 1884" },
        year: 1884,
        denomination: "1 долар",
        metal: "срібло 900",
        metalType: "silver",
        weight: 26.73,
        diameter: 38.1,
        mintage: 14100000,
        rarity: 3,
        priceUSD: 45,
        priceUAH: 1650,
        image: "assets/images/morgan-dollar.jpg",
        history: {
            uk: "Одна з найвідоміших срібних монет США. Дизайн створений Джорджом Морганом.",
            en: "One of the most famous US silver coins. Design created by George Morgan."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    {
        id: "us_2",
        country: "USA",
        countryCode: "US",
        name: { uk: "Peace Dollar 1923", en: "Peace Dollar 1923" },
        year: 1923,
        denomination: "1 долар",
        metal: "срібло 900",
        metalType: "silver",
        weight: 26.73,
        diameter: 38.1,
        mintage: 30100000,
        rarity: 2,
        priceUSD: 38,
        priceUAH: 1390,
        image: "assets/images/peace-dollar.jpg",
        history: {
            uk: "Монета викарбувана на честь завершення Першої світової війни.",
            en: "Coin minted to commemorate the end of World War I."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-20"
    },
    {
        id: "us_3",
        country: "USA",
        countryCode: "US",
        name: { uk: "American Gold Eagle 2023", en: "American Gold Eagle 2023" },
        year: 2023,
        denomination: "50 доларів",
        metal: "золото 916",
        metalType: "gold",
        weight: 31.1,
        diameter: 32.7,
        mintage: 500000,
        rarity: 4,
        priceUSD: 2100,
        priceUAH: 77000,
        image: "assets/images/gold-eagle.jpg",
        history: {
            uk: "Офіційна золота інвестиційна монета США.",
            en: "Official US gold investment coin."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-02-15"
    },
    // Велика Британія
    {
        id: "uk_1",
        country: "United Kingdom",
        countryCode: "GB",
        name: { uk: "Gold Sovereign 1911", en: "Gold Sovereign 1911" },
        year: 1911,
        denomination: "1 соверен",
        metal: "золото 917",
        metalType: "gold",
        weight: 7.98,
        diameter: 22.05,
        mintage: 20000,
        rarity: 8,
        priceUSD: 480,
        priceUAH: 17600,
        image: "assets/images/sovereign.jpg",
        history: {
            uk: "Класична золота монета Британської імперії з портретом короля Георга V.",
            en: "Classic British Empire gold coin with portrait of King George V."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    {
        id: "uk_2",
        country: "United Kingdom",
        countryCode: "GB",
        name: { uk: "Britannia 2022", en: "Britannia 2022" },
        year: 2022,
        denomination: "1 фунт",
        metal: "срібло 999",
        metalType: "silver",
        weight: 31.1,
        diameter: 38.6,
        mintage: 150000,
        rarity: 3,
        priceUSD: 42,
        priceUAH: 1540,
        image: "assets/images/britannia.jpg",
        history: {
            uk: "Сучасна інвестиційна монета із зображенням Британії.",
            en: "Modern investment coin featuring Britannia."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-03-10"
    },
    // Німеччина
    {
        id: "ger_1",
        country: "Germany",
        countryCode: "DE",
        name: { uk: "20 марок 'Золота прусська' 1913", en: "20 Marks 'Gold Prussian' 1913" },
        year: 1913,
        denomination: "20 марок",
        metal: "золото 900",
        metalType: "gold",
        weight: 7.96,
        diameter: 22.5,
        mintage: 15000,
        rarity: 9,
        priceUSD: 550,
        priceUAH: 20150,
        image: "assets/images/german-mark.jpg",
        history: {
            uk: "Прусська золота монета часів кайзера Вільгельма II.",
            en: "Prussian gold coin from the time of Kaiser Wilhelm II."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-25"
    },
    {
        id: "ger_2",
        country: "Germany",
        countryCode: "DE",
        name: { uk: "5 марок 'Гете' 1999", en: "5 Marks 'Goethe' 1999" },
        year: 1999,
        denomination: "5 марок",
        metal: "мідно-нікелевий сплав",
        metalType: "bronze",
        weight: 10,
        diameter: 29,
        mintage: 8000000,
        rarity: 2,
        priceUSD: 5,
        priceUAH: 185,
        image: "assets/images/goethe.jpg",
        history: {
            uk: "Пам'ятна монета до 250-річчя Йоганна Вольфганга Гете.",
            en: "Commemorative coin for the 250th anniversary of Johann Wolfgang Goethe."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-02-20"
    },
    // Китай
    {
        id: "chn_1",
        country: "China",
        countryCode: "CN",
        name: { uk: "1 юань 'Панда' 2020", en: "1 Yuan 'Panda' 2020" },
        year: 2020,
        denomination: "1 юань",
        metal: "срібло 999",
        metalType: "silver",
        weight: 30,
        diameter: 40,
        mintage: 1000000,
        rarity: 2,
        priceUSD: 28,
        priceUAH: 1025,
        image: "assets/images/panda.jpg",
        history: {
            uk: "Популярна китайська інвестиційна монета з пандою.",
            en: "Popular Chinese investment coin featuring a panda."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    // Греція
    {
        id: "gre_1",
        country: "Greece",
        countryCode: "GR",
        name: { uk: "Давня драхма 'Сова' 450 до н.е.", en: "Ancient Drachm 'Owl' 450 BC" },
        year: -450,
        denomination: "драхма",
        metal: "срібло",
        metalType: "silver",
        weight: 4.3,
        diameter: 17,
        mintage: 100000,
        rarity: 10,
        priceUSD: 1200,
        priceUAH: 44000,
        image: "assets/images/athens-owl.jpg",
        history: {
            uk: "Знаменита афінська монета із зображенням сови — символу мудрості.",
            en: "Famous Athenian coin featuring an owl - symbol of wisdom."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    },
    // Рим
    {
        id: "rom_1",
        country: "Rome",
        countryCode: "IT",
        name: { uk: "Денарій Юлія Цезаря 44 до н.е.", en: "Denarius of Julius Caesar 44 BC" },
        year: -44,
        denomination: "денарій",
        metal: "срібло",
        metalType: "silver",
        weight: 3.9,
        diameter: 19,
        mintage: 50000,
        rarity: 10,
        priceUSD: 3500,
        priceUAH: 128000,
        image: "assets/images/caesar-denarius.jpg",
        history: {
            uk: "Рідкісний денарій з портретом Юлія Цезаря, викарбуваний перед його вбивством.",
            en: "Rare denarius with portrait of Julius Caesar, minted before his assassination."
        },
        status: "approved",
        addedBy: "system",
        dateAdded: "2024-01-15"
    }
];

// ============================================
// 📰 СТАТТІ ДЛЯ БЛОГУ
// ============================================

const initialArticles = [
    {
        id: "art_1",
        title: { uk: "Як оцінювати стан монет: Повний гайд для початківців", en: "How to Grade Coins: A Beginner's Complete Guide" },
        excerpt: { uk: "Дізнайтеся основи оцінки монет та що означають ці цифри на шкалі.", en: "Learn the basics of coin grading and what those numbers really mean." },
        content: { uk: "Повний текст статті про грейдування монет...", en: "Full article text about coin grading..." },
        image: "assets/images/blog-grade.jpg",
        date: "2024-05-15",
        readTime: 5,
        tags: ["grading", "beginners", "guide"]
    },
    {
        id: "art_2",
        title: { uk: "Ринкові тренди срібних монет 2024", en: "2024 Silver Morgan Dollar Values & Market Trends" },
        excerpt: { uk: "Подивіться, як працює ринок і на що звертати увагу.", en: "See how the market is performing and what to look for." },
        content: { uk: "Повний текст статті про ринкові тренди...", en: "Full article text about market trends..." },
        image: "assets/images/blog-values.jpg",
        date: "2024-05-30",
        readTime: 6,
        tags: ["values", "market", "silver"]
    },
    {
        id: "art_3",
        title: { uk: "Топ 10 найдорожчих монет з помилками", en: "Top 10 Most Valuable Error Coins" },
        excerpt: { uk: "Від помилок карбування до дефектів — ці монети коштують набагато більше.", en: "From mint errors to misprints, these coins are worth a lot more." },
        content: { uk: "Повний текст статті про монети з помилками...", en: "Full article text about error coins..." },
        image: "assets/images/blog-errors.jpg",
        date: "2024-05-08",
        readTime: 7,
        tags: ["errors", "valuable", "top10"]
    },
    {
        id: "art_4",
        title: { uk: "Історія давньогрецьких монет", en: "The History of Ancient Greek Coins" },
        excerpt: { uk: "Досліджуйте багату історію та неймовірний дизайн давньогрецьких монет.", en: "Explore the rich history and stunning designs of ancient Greek coinage." },
        content: { uk: "Повний текст статті про давньогрецькі монети...", en: "Full article text about ancient Greek coins..." },
        image: "assets/images/blog-ancient.jpg",
        date: "2024-05-05",
        readTime: 4,
        tags: ["ancient", "history", "greece"]
    },
    {
        id: "art_5",
        title: { uk: "Як доглядати за колекцією монет", en: "How to Care for Your Coin Collection" },
        excerpt: { uk: "Поради з очищення, зберігання та захисту ваших монет.", en: "Tips for cleaning, storing, and protecting your coins." },
        content: { uk: "Повний текст статті про догляд...", en: "Full article text about care..." },
        image: "assets/images/blog-care.jpg",
        date: "2024-06-01",
        readTime: 6,
        tags: ["care", "storage", "maintenance"]
    },
    {
        id: "art_6",
        title: { uk: "Українські пам'ятні монети: повний огляд", en: "Ukrainian Commemorative Coins: Complete Overview" },
        excerpt: { uk: "Огляд найцікавіших українських монет від 1996 до сьогодні.", en: "Overview of the most interesting Ukrainian coins from 1996 to today." },
        content: { uk: "Повний текст статті про українські монети...", en: "Full article text about Ukrainian coins..." },
        image: "assets/images/blog-ukraine.jpg",
        date: "2024-06-10",
        readTime: 8,
        tags: ["ukraine", "commemorative", "guide"]
    }
];

// ============================================
// 🗄️ РОБОТА З LOCALSTORAGE
// ============================================

function loadCoins() {
    const stored = localStorage.getItem('coins');
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem('coins', JSON.stringify(initialCoins));
        return [...initialCoins];
    }
}

function saveCoins(coins) {
    localStorage.setItem('coins', JSON.stringify(coins));
}

function loadArticles() {
    const stored = localStorage.getItem('articles');
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem('articles', JSON.stringify(initialArticles));
        return [...initialArticles];
    }
}

function addCoin(coin) {
    const coins = loadCoins();
    const newCoin = {
        ...coin,
        id: Date.now().toString(),
        status: 'pending',
        dateAdded: new Date().toISOString().split('T')[0]
    };
    coins.push(newCoin);
    saveCoins(coins);
    return newCoin;
}

function approveCoin(coinId) {
    const coins = loadCoins();
    const index = coins.findIndex(c => c.id === coinId);
    if (index !== -1) {
        coins[index].status = 'approved';
        saveCoins(coins);
        return true;
    }
    return false;
}

function rejectCoin(coinId) {
    const coins = loadCoins();
    const filtered = coins.filter(c => c.id !== coinId);
    saveCoins(filtered);
    return true;
}

function updateCoin(coinId, updates) {
    const coins = loadCoins();
    const index = coins.findIndex(c => c.id === coinId);
    if (index !== -1) {
        coins[index] = { ...coins[index], ...updates };
        saveCoins(coins);
        return true;
    }
    return false;
}

function deleteCoin(coinId) {
    const coins = loadCoins();
    const filtered = coins.filter(c => c.id !== coinId);
    saveCoins(filtered);
    return true;
}

function addToUserCollection(userId, coinId) {
    const collections = JSON.parse(localStorage.getItem('collections') || '{}');
    if (!collections[userId]) collections[userId] = [];
    if (!collections[userId].includes(coinId)) {
        collections[userId].push(coinId);
        localStorage.setItem('collections', JSON.stringify(collections));
    }
}

function removeFromUserCollection(userId, coinId) {
    const collections = JSON.parse(localStorage.getItem('collections') || '{}');
    if (collections[userId]) {
        collections[userId] = collections[userId].filter(id => id !== coinId);
        localStorage.setItem('collections', JSON.stringify(collections));
    }
}

function getUserCollection(userId) {
    const collections = JSON.parse(localStorage.getItem('collections') || '{}');
    return collections[userId] || [];
}

function addToWishlist(userId, coinId) {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    if (!wishlists[userId]) wishlists[userId] = [];
    if (!wishlists[userId].includes(coinId)) {
        wishlists[userId].push(coinId);
        localStorage.setItem('wishlists', JSON.stringify(wishlists));
    }
}

function removeFromWishlist(userId, coinId) {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    if (wishlists[userId]) {
        wishlists[userId] = wishlists[userId].filter(id => id !== coinId);
        localStorage.setItem('wishlists', JSON.stringify(wishlists));
    }
}

function getUserWishlist(userId) {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '{}');
    return wishlists[userId] || [];
}

// Глобальний експорт
window.initialCoins = initialCoins;
window.initialArticles = initialArticles;
window.loadCoins = loadCoins;
window.saveCoins = saveCoins;
window.loadArticles = loadArticles;
window.addCoin = addCoin;
window.approveCoin = approveCoin;
window.rejectCoin = rejectCoin;
window.updateCoin = updateCoin;
window.deleteCoin = deleteCoin;
window.addToUserCollection = addToUserCollection;
window.removeFromUserCollection = removeFromUserCollection;
window.getUserCollection = getUserCollection;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.getUserWishlist = getUserWishlist;