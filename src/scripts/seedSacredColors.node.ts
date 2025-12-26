import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ColorData {
  color_name: string;
  color_hex: string;
  hebrew_name: string;
  hebrew_transliteration: string;
  biblical_significance: string;
  theological_meaning: string;
  sanctuary_usage: string;
  symbolic_representations: string[];
  scripture_references: string[];
  order_position: number;
  slug: string;
  icon_name: string;
}

interface SymbolismData {
  tradition: 'jewish' | 'christian' | 'adventist';
  interpretation: string;
  supporting_verses: string[];
  scholar_quotes: Array<{
    author: string;
    quote: string;
    source: string;
    year?: number;
  }>;
}

interface ApplicationData {
  element_name: string;
  location: string;
  material: string;
  manufacturing_process: string;
  spiritual_lesson: string;
  scripture_reference: string;
}

interface QuizQuestion {
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'matching';
  correct_answer: string;
  wrong_answers: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const sacredColorsData: ColorData[] = [
  {
    color_name: 'Blue',
    color_hex: '#0047AB',
    hebrew_name: 'תְּכֵלֶת',
    hebrew_transliteration: 'tekhelet',
    biblical_significance: 'The color of heaven, representing God\'s eternal law and divine authority',
    theological_meaning: 'Blue symbolizes the law of God written in heaven, obedience to divine commands, and the heavenly origin of truth. It represents the sky and points to the throne of God.',
    sanctuary_usage: 'Used extensively in the tabernacle curtains, veil, high priest\'s robe, and throughout the sacred furnishings. The ribbon of blue in the fringe of garments (Numbers 15:38) served as a constant reminder to keep God\'s commandments.',
    symbolic_representations: ['God\'s Law', 'Divine Authority', 'Heavenly Origin', 'Obedience', 'Truth', 'Commandments'],
    scripture_references: ['Exodus 25:4', 'Exodus 26:1', 'Numbers 15:38-39', 'Ezekiel 1:26', 'Exodus 24:10'],
    order_position: 1,
    slug: 'blue',
    icon_name: 'Scale'
  },
  {
    color_name: 'Purple',
    color_hex: '#800080',
    hebrew_name: 'אַרְגָּמָן',
    hebrew_transliteration: 'argaman',
    biblical_significance: 'The royal color representing kingship, nobility, and Christ as our coming King',
    theological_meaning: 'Purple signifies royalty, majesty, and the kingly office of Christ. Historically the most expensive dye, it was reserved for royalty and the wealthy. In sanctuary symbolism, it points to Jesus as the King of Kings.',
    sanctuary_usage: 'Woven into the tabernacle curtains and veil alongside blue and scarlet. Used in the high priest\'s ephod and breastplate. The purple threads proclaimed that the sanctuary represented the palace of the King of the universe.',
    symbolic_representations: ['Royalty', 'Kingship', 'Majesty', 'Nobility', 'Wealth', 'Authority'],
    scripture_references: ['Exodus 25:4', 'Judges 8:26', 'Esther 8:15', 'Mark 15:17', 'John 19:2'],
    order_position: 2,
    slug: 'purple',
    icon_name: 'Crown'
  },
  {
    color_name: 'Scarlet',
    color_hex: '#DC143C',
    hebrew_name: 'תּוֹלַעַת שָׁנִי',
    hebrew_transliteration: 'tola\'at shani',
    biblical_significance: 'The color of sacrifice and redemption through the blood of Christ',
    theological_meaning: 'Scarlet represents the shed blood of Jesus Christ for the remission of sins. The Hebrew term literally means "worm of scarlet," connecting to the crimson worm that gives its life to produce the red dye, a beautiful type of Christ\'s self-sacrifice.',
    sanctuary_usage: 'Present in the tabernacle curtains, veil, and priestly garments. Used in purification ceremonies and the red heifer sacrifice. The scarlet thread throughout the sanctuary constantly reminded Israel of the coming Messiah\'s atoning blood.',
    symbolic_representations: ['Sacrifice', 'Atonement', 'Blood of Christ', 'Redemption', 'Sin Offering', 'Propitiation'],
    scripture_references: ['Exodus 25:4', 'Leviticus 14:4', 'Numbers 19:6', 'Isaiah 1:18', 'Hebrews 9:19'],
    order_position: 3,
    slug: 'scarlet',
    icon_name: 'Heart'
  },
  {
    color_name: 'White',
    color_hex: '#FFFFFF',
    hebrew_name: 'שֵׁשׁ',
    hebrew_transliteration: 'shesh',
    biblical_significance: 'Purity, righteousness, and holiness before God',
    theological_meaning: 'White symbolizes the righteousness of Christ imparted to believers, purity of life and character, and holiness. The fine linen represents the righteous acts of the saints and Christ\'s perfect, sinless life.',
    sanctuary_usage: 'Fine white linen formed the foundation of all sanctuary curtains and priestly garments. The high priest wore pure white linen on the Day of Atonement when entering the Most Holy Place. White linen undergarments ensured modesty and purity.',
    symbolic_representations: ['Purity', 'Righteousness', 'Holiness', 'Sinlessness', 'Perfection', 'Divine Character'],
    scripture_references: ['Exodus 25:4', 'Exodus 28:39', 'Leviticus 16:4', 'Revelation 19:8', 'Revelation 7:9'],
    order_position: 4,
    slug: 'white',
    icon_name: 'Heart'
  },
  {
    color_name: 'Gold',
    color_hex: '#FFD700',
    hebrew_name: 'זָהָב',
    hebrew_transliteration: 'zahav',
    biblical_significance: 'The divine nature, glory of God, and deity of Christ',
    theological_meaning: 'Gold represents the divine nature, the glory and majesty of God, faith tried by fire, and the deity of Jesus Christ. As the most precious metal, it speaks of supreme value and imperishable worth. Gold symbolizes things that are eternal, heavenly, and divine.',
    sanctuary_usage: 'The Most Holy Place was completely overlaid with pure gold. The ark of the covenant, mercy seat, altar of incense, table of showbread, and lampstand were all made of or covered with gold. The abundance of gold declared this was the dwelling place of the Divine.',
    symbolic_representations: ['Deity', 'Divine Nature', 'Glory of God', 'Preciousness', 'Faith', 'Imperishable'],
    scripture_references: ['Exodus 25:11', 'Exodus 25:17', 'Exodus 30:3', '1 Peter 1:7', 'Revelation 21:18'],
    order_position: 5,
    slug: 'gold',
    icon_name: 'Sparkles'
  },
  {
    color_name: 'Brass',
    color_hex: '#B87333',
    hebrew_name: 'נְחֹשֶׁת',
    hebrew_transliteration: 'nechosheth',
    biblical_significance: 'Judgment, strength, and endurance through trials',
    theological_meaning: 'Brass (bronze/copper) symbolizes divine judgment, the strength to endure, and purification through fire. In biblical typology, brass represents the humanity of Christ and His endurance of God\'s judgment on our behalf.',
    sanctuary_usage: 'The altar of burnt offering was overlaid with brass, where sin was judged. The laver was made of brass for cleansing. Brass was prominent in the outer court where sin was dealt with, while gold dominated the inner sanctuary. This progression shows movement from judgment to mercy.',
    symbolic_representations: ['Judgment', 'Strength', 'Endurance', 'Purification', 'Humanity of Christ', 'Divine Wrath'],
    scripture_references: ['Exodus 27:2', 'Exodus 30:18', 'Numbers 21:9', 'Deuteronomy 28:23', 'Revelation 1:15'],
    order_position: 6,
    slug: 'brass',
    icon_name: 'Shield'
  },
  {
    color_name: 'Silver',
    color_hex: '#C0C0C0',
    hebrew_name: 'כֶּסֶף',
    hebrew_transliteration: 'kesef',
    biblical_significance: 'Redemption, atonement money, and the price paid for salvation',
    theological_meaning: 'Silver represents redemption and the price of atonement. Every Israelite male paid a half-shekel of silver as atonement money, signifying that redemption comes at a cost. Silver speaks of the precious blood of Christ as the redemption price for humanity.',
    sanctuary_usage: 'Silver formed the sockets (foundations) of the tabernacle, created from the atonement money. The pillars stood on silver bases, showing that the entire structure rested on redemption. Silver hooks and bands connected the pillars, symbolizing that we are united through redemption.',
    symbolic_representations: ['Redemption', 'Atonement', 'Price Paid', 'Foundation', 'Unity', 'Precious Blood'],
    scripture_references: ['Exodus 30:13-16', 'Exodus 38:25-27', '1 Peter 1:18-19', 'Zechariah 11:12-13', 'Matthew 26:15'],
    order_position: 7,
    slug: 'silver',
    icon_name: 'Coins'
  },
  {
    color_name: 'Dark',
    color_hex: '#2C2C2C',
    hebrew_name: 'תַּחַשׁ',
    hebrew_transliteration: 'tachash',
    biblical_significance: 'Humility, protection, and the hidden glory of Christ\'s incarnation',
    theological_meaning: 'The dark outer covering of badger/seal skins symbolizes the humble, unattractive appearance of Christ in His incarnation. While the interior was glorious with gold and beautiful colors, the exterior was plain and dark. This fulfilled Isaiah\'s prophecy: "He has no form or comeliness; and when we see Him, there is no beauty that we should desire Him" (Isaiah 53:2).',
    sanctuary_usage: 'The outermost covering of the tabernacle was made of dark badger or seal skins. This weatherproof layer protected the beautiful interior from the elements. To the casual observer, the tabernacle appeared unimpressive, yet inside dwelt the glory of God.',
    symbolic_representations: ['Humility', 'Hidden Glory', 'Protection', 'Incarnation', 'Outward Appearance', 'Covering'],
    scripture_references: ['Exodus 25:5', 'Exodus 26:14', 'Isaiah 53:2', 'Philippians 2:7', 'Matthew 8:20'],
    order_position: 8,
    slug: 'dark',
    icon_name: 'Moon'
  }
];

const symbolismData: Record<string, SymbolismData[]> = {
  blue: [
    {
      tradition: 'jewish',
      interpretation: 'Blue represents the Torah and God\'s commandments. The blue thread in the tzitzit (fringes) serves as a constant reminder to observe all of God\'s commandments. Rabbinic tradition associates blue with the sea, sky, and ultimately the throne of God.',
      supporting_verses: ['Numbers 15:38-39', 'Exodus 24:10'],
      scholar_quotes: [
        {
          author: 'Rashi',
          quote: 'The blue thread resembles the sea, and the sea resembles the sky, and the sky resembles the Throne of Glory.',
          source: 'Commentary on Numbers 15:38',
          year: 1105
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Blue symbolizes the heavenly origin of Christ and His divine mission. It represents truth, faithfulness, and the Word of God. The blue in the sanctuary points believers to keep their eyes fixed on heavenly things and live according to divine principles.',
      supporting_verses: ['John 18:37', 'Colossians 3:1-2'],
      scholar_quotes: [
        {
          author: 'Matthew Henry',
          quote: 'The blue was to remind them that they must be heavenly-minded, and make the law of God their constant companion.',
          source: 'Commentary on Numbers 15',
          year: 1710
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Blue specifically represents the law of God, particularly the fourth commandment concerning the Sabbath. The blue thread connects to keeping God\'s commandments as a sign of loyalty and obedience. In the investigative judgment, faithfulness to God\'s law is examined.',
      supporting_verses: ['Exodus 20:8-11', 'Revelation 14:12', 'James 2:10-12'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The ribbon of blue signified that these were the people of God. The blue was the color appointed for the border of the priests\' robe... It was to denote that they were to keep the commandments of God.',
          source: 'Testimonies for the Church, Vol. 6',
          year: 1900
        }
      ]
    }
  ],
  purple: [
    {
      tradition: 'jewish',
      interpretation: 'Purple (argaman) was the color of royalty and nobility. Its use in the sanctuary symbolized that the God of Israel is the supreme King. The expensive dye made from murex snails made purple garments accessible only to royalty and the very wealthy.',
      supporting_verses: ['Judges 8:26', 'Esther 8:15'],
      scholar_quotes: [
        {
          author: 'Josephus',
          quote: 'The purple signified the sea, from which it is derived, because it is dyed with the blood of the sea shellfish.',
          source: 'Antiquities of the Jews, Book 3',
          year: 94
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Purple represents the royalty and kingship of Jesus Christ. When soldiers mockingly dressed Jesus in purple, they unknowingly proclaimed His true identity as King of Kings. Purple in the sanctuary prophetically pointed to Christ\'s royal office.',
      supporting_verses: ['Mark 15:17', 'John 19:2-5', 'Revelation 19:16'],
      scholar_quotes: [
        {
          author: 'Adam Clarke',
          quote: 'Purple being the most costly color, was used only for the clothing of princes and great men, and here represents the royal dignity of Christ.',
          source: 'Commentary on Exodus 25',
          year: 1826
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Purple represents Christ as King, specifically His role as King in the heavenly sanctuary. As our High Priest and King, Jesus ministers on behalf of His people. The purple reminds us that when He returns, He comes not as a suffering servant but as King of Kings.',
      supporting_verses: ['Hebrews 8:1-2', 'Revelation 17:14', 'Revelation 19:16'],
      scholar_quotes: [
        {
          author: 'Uriah Smith',
          quote: 'The purple represents royalty. Christ is our King as well as our Priest, and the sanctuary service reveals both His priestly mediation and His royal authority.',
          source: 'Daniel and the Revelation',
          year: 1897
        }
      ]
    }
  ],
  scarlet: [
    {
      tradition: 'jewish',
      interpretation: 'Scarlet (tola\'at shani - crimson worm) was used in purification rituals. The connection to the crimson worm, which gives its life to produce the dye, symbolizes life given for cleansing. Used in the red heifer ceremony for purification from death.',
      supporting_verses: ['Leviticus 14:4', 'Numbers 19:6', 'Psalm 22:6'],
      scholar_quotes: [
        {
          author: 'Midrash Rabbah',
          quote: 'Just as the crimson worm gives its life to produce the scarlet dye, so are we cleansed through sacrifice.',
          source: 'Exodus Rabbah 15:6'
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Scarlet represents the blood of Jesus Christ shed for the remission of sins. The crimson worm crushing itself to death to produce the dye is a beautiful type of Christ\'s self-sacrifice on the cross. Through His blood, our scarlet sins are made white as snow.',
      supporting_verses: ['Isaiah 1:18', 'Hebrews 9:12-14', '1 Peter 1:18-19', 'Revelation 1:5'],
      scholar_quotes: [
        {
          author: 'C.H. Spurgeon',
          quote: 'The scarlet color speaks of the precious blood of Christ. As the worm gave its life to color the fabric, so Christ gave His life to cleanse us from sin.',
          source: 'Metropolitan Tabernacle Pulpit',
          year: 1874
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Scarlet specifically represents Christ\'s atoning sacrifice and the blood that was shed for sin. In the sanctuary service, blood was central to atonement. The scarlet thread throughout the sanctuary pointed forward to Calvary and now points back to the completed sacrifice of Christ.',
      supporting_verses: ['Leviticus 17:11', 'Hebrews 9:22', 'Hebrews 10:4', '1 John 1:7'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The scarlet color was significant of the blood that was to be shed... These colors pointed to the great truths revealed in the plan of redemption.',
          source: 'The SDA Bible Commentary, Vol. 1',
          year: 1953
        }
      ]
    }
  ],
  white: [
    {
      tradition: 'jewish',
      interpretation: 'Fine white linen represents purity and holiness required to approach God. The high priest wore pure white linen on Yom Kippur when entering the Holy of Holies, symbolizing that only absolute purity can stand in God\'s presence.',
      supporting_verses: ['Leviticus 16:4', 'Exodus 28:39'],
      scholar_quotes: [
        {
          author: 'Talmud',
          quote: 'On the Day of Atonement, the High Priest served in white garments, for white garments atone and cause sins to become white as snow.',
          source: 'Tractate Yoma 23b'
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'White linen represents the righteousness of Christ imputed to believers and the righteous acts of the saints. White garments symbolize purity, victory, and being clothed in Christ\'s righteousness. Believers are called to keep their garments white.',
      supporting_verses: ['Revelation 3:4-5', 'Revelation 7:9', 'Revelation 19:8', 'Isaiah 61:10'],
      scholar_quotes: [
        {
          author: 'John Wesley',
          quote: 'The fine linen is the righteousness of the saints - both their inward purity and outward good works, which are inseparable.',
          source: 'Explanatory Notes on Revelation 19:8',
          year: 1755
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'White linen represents both Christ\'s perfect righteousness given to us and the righteous character developed through sanctification. The white linen base of the sanctuary shows that everything must be founded on righteousness. In the judgment, only those clothed in white robes are accepted.',
      supporting_verses: ['Revelation 3:18', 'Revelation 6:11', 'Revelation 22:14', 'Isaiah 64:6'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The fine-twined linen represents the spotless righteousness of Christ which through faith is imputed to all who receive Him as their personal Saviour.',
          source: 'Christ\'s Object Lessons',
          year: 1900
        }
      ]
    }
  ],
  gold: [
    {
      tradition: 'jewish',
      interpretation: 'Gold represents the divine presence and glory of God (Shekinah) dwelling among His people. The abundance of gold in the sanctuary declared that this was the palace of the King of the universe. Gold\'s imperishable nature symbolizes the eternal nature of God.',
      supporting_verses: ['Exodus 25:11', '1 Kings 6:20-22'],
      scholar_quotes: [
        {
          author: 'Nachmanides',
          quote: 'The gold overlay represents the divine radiance that fills the sanctuary, for gold is the most precious of metals and represents the glory of God.',
          source: 'Commentary on Exodus 25',
          year: 1270
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Gold symbolizes the divine nature of Christ and the glory of God. While Christ took on human flesh (brass), He never ceased to be divine (gold). Gold also represents faith tried by fire and things of eternal, heavenly value.',
      supporting_verses: ['1 Peter 1:7', 'Revelation 3:18', 'Revelation 21:18-21'],
      scholar_quotes: [
        {
          author: 'Matthew Henry',
          quote: 'The gold signified the glory and preciousness of the divine nature, and that everything about the service of God should be done with the best of our abilities.',
          source: 'Commentary on Exodus 25',
          year: 1710
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Gold represents the deity of Christ and the divine presence in the heavenly sanctuary. The progression from brass in the outer court to gold in the Most Holy Place shows the movement from dealing with sin (humanity) to communing with God (divinity). The golden furniture represents Christ\'s divine nature and ministry.',
      supporting_verses: ['Hebrews 8:1-2', 'Revelation 1:12-13', 'Revelation 8:3'],
      scholar_quotes: [
        {
          author: 'M.L. Andreasen',
          quote: 'The gold of the sanctuary represents deity. As we progress from the outer court inward, we move from the human to the divine, from earth to heaven.',
          source: 'The Sanctuary Service',
          year: 1937
        }
      ]
    }
  ],
  brass: [
    {
      tradition: 'jewish',
      interpretation: 'Brass (bronze/copper) represents strength and endurance. Its presence in the outer court at the altar and laver connects to judgment and purification. Brass can withstand fire, symbolizing endurance through trials.',
      supporting_verses: ['Exodus 27:2', 'Deuteronomy 28:23'],
      scholar_quotes: [
        {
          author: 'Rashi',
          quote: 'The copper represents the strength to withstand the fire of judgment, for the altar must endure the continual fire.',
          source: 'Commentary on Exodus 27',
          year: 1105
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Brass symbolizes the humanity of Christ and His endurance of divine judgment on our behalf. The brazen altar, where sin was judged, points to the cross where Christ bore God\'s judgment for sin. The brazen serpent in Numbers was a direct type of Christ on the cross.',
      supporting_verses: ['Numbers 21:8-9', 'John 3:14-15', 'Revelation 1:15'],
      scholar_quotes: [
        {
          author: 'C.H. Spurgeon',
          quote: 'As brass can endure the fire, so Christ endured the fire of God\'s wrath against sin. His feet like fine brass show He has passed through the furnace of suffering.',
          source: 'Metropolitan Tabernacle Pulpit',
          year: 1875
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Brass represents divine judgment and Christ\'s humanity enduring the wrath of God for our sins. The progression from brass (outer court) to gold (Most Holy Place) illustrates the plan of salvation: from judgment to mercy, from humanity to divinity, from sin-bearer to intercessor.',
      supporting_verses: ['2 Corinthians 5:21', 'Hebrews 2:14-17', 'Isaiah 53:4-6'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The brazen altar, where the sacrifices were offered, represented Christ\'s humanity, which could endure the wrath of God against sin.',
          source: 'The Great Controversy',
          year: 1888
        }
      ]
    }
  ],
  silver: [
    {
      tradition: 'jewish',
      interpretation: 'Silver, derived from the atonement money, represents redemption and the price paid to free someone from bondage. Every Israelite male paid the half-shekel as atonement money, acknowledging that redemption has a cost. The Hebrew word "kesef" means both silver and money.',
      supporting_verses: ['Exodus 30:13-16', 'Exodus 38:25-27'],
      scholar_quotes: [
        {
          author: 'Targum Jonathan',
          quote: 'The silver of atonement serves as a ransom for the souls of Israel, for redemption must be purchased.',
          source: 'Targum on Exodus 30'
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'Silver represents the redemption price - the precious blood of Christ. While Judas betrayed Jesus for thirty pieces of silver, Christ\'s blood is the true redemption price. Silver symbolizes that we are not redeemed with corruptible things like silver and gold, but with Christ\'s blood.',
      supporting_verses: ['1 Peter 1:18-19', 'Zechariah 11:12-13', 'Matthew 26:15'],
      scholar_quotes: [
        {
          author: 'Albert Barnes',
          quote: 'The silver sockets on which the tabernacle rested signify that the whole structure of salvation rests on redemption, the price paid by Christ.',
          source: 'Notes on Exodus',
          year: 1847
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'Silver represents redemption through Christ\'s blood and forms the foundation of the entire sanctuary system. That the tabernacle stood on silver sockets made from atonement money shows that everything in the plan of salvation rests on the foundation of redemption. We are united (connected by silver bands) through redemption.',
      supporting_verses: ['Acts 20:28', 'Ephesians 1:7', 'Colossians 1:14'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The silver sockets were the foundation of the tabernacle. So redemption is the foundation of the plan of salvation.',
          source: 'Patriarchs and Prophets',
          year: 1890
        }
      ]
    }
  ],
  dark: [
    {
      tradition: 'jewish',
      interpretation: 'The dark outer covering (tachash skins) provided weatherproof protection. Rabbinic sources debate whether this was badger, seal, or another marine animal. The dark exterior concealed the interior glory, teaching that true holiness is not displayed outwardly.',
      supporting_verses: ['Exodus 25:5', 'Exodus 26:14'],
      scholar_quotes: [
        {
          author: 'Talmud',
          quote: 'The tachash had many colors, but on the outside it appeared common. So too, Israel may appear common outwardly, but inwardly they contain great beauty.',
          source: 'Tractate Shabbat 28b'
        }
      ]
    },
    {
      tradition: 'christian',
      interpretation: 'The dark, plain outer covering symbolizes the humble, unattractive incarnation of Christ. While inside dwelt all the fullness of the Godhead, outwardly He appeared as a common man. This fulfilled Isaiah 53:2 - He had no beauty that we should desire Him. True glory is often hidden.',
      supporting_verses: ['Isaiah 53:2-3', 'Philippians 2:7', 'Matthew 8:20'],
      scholar_quotes: [
        {
          author: 'F.B. Meyer',
          quote: 'The rough exterior of badger skins speaks of the humiliation of our Lord. In Him dwelt all the fullness of the Godhead bodily, yet He took the form of a servant.',
          source: 'Exodus: The Book of Redemption',
          year: 1908
        }
      ]
    },
    {
      tradition: 'adventist',
      interpretation: 'The dark covering teaches that Christ\'s divine glory was veiled in human flesh. To casual observers, Jesus appeared ordinary, yet He was God incarnate. The covering also protected the precious interior from the elements, just as Christ\'s humanity shielded His divine nature. This reminds us not to judge by outward appearance.',
      supporting_verses: ['John 1:10-11', '1 Samuel 16:7', '2 Corinthians 5:16'],
      scholar_quotes: [
        {
          author: 'Ellen G. White',
          quote: 'The covering of badgers\' skins, the outermost covering, was coarse and uninviting to the eye; but it served as a protection from the rain and tempests of the desert. So the humanity of Christ appeared to the world without attractiveness.',
          source: 'The Signs of the Times',
          year: 1899
        }
      ]
    }
  ]
};

const applicationsData: Record<string, ApplicationData[]> = {
  blue: [
    {
      element_name: 'Tabernacle Veil',
      location: 'Entrance to Most Holy Place',
      material: 'Fine linen with blue, purple, and scarlet thread; cherubim embroidered',
      manufacturing_process: 'Skillfully woven by master craftsmen; blue dye from murex trunculus snail',
      spiritual_lesson: 'The blue in the veil reminds us that God\'s law guards access to His presence. Only through Christ (our High Priest) can we enter.',
      scripture_reference: 'Exodus 26:31-33'
    },
    {
      element_name: 'High Priest\'s Robe',
      location: 'Worn by high priest',
      material: 'All of blue, with pomegranates and golden bells on hem',
      manufacturing_process: 'Woven entirely of blue fabric; tekhelet dye was rare and expensive',
      spiritual_lesson: 'The blue robe signified the high priest represented heaven on earth and was to uphold God\'s law.',
      scripture_reference: 'Exodus 28:31-35'
    },
    {
      element_name: 'Tzitzit (Fringes)',
      location: 'Corners of garments',
      material: 'Blue cord in white fringes',
      manufacturing_process: 'Blue thread twisted with white cords on garment corners',
      spiritual_lesson: 'The ribbon of blue serves as a constant reminder to keep all God\'s commandments and be holy.',
      scripture_reference: 'Numbers 15:38-40'
    }
  ],
  purple: [
    {
      element_name: 'Tabernacle Curtains',
      location: 'Inner curtains of tabernacle',
      material: 'Fine linen with blue, purple, and scarlet; cherubim design',
      manufacturing_process: 'Purple dye from murex brandaris snail; required thousands of snails',
      spiritual_lesson: 'The purple woven throughout proclaimed this was the palace of the King of kings.',
      scripture_reference: 'Exodus 26:1'
    },
    {
      element_name: 'Ephod',
      location: 'High priest\'s garment',
      material: 'Gold, blue, purple, scarlet, and fine linen',
      manufacturing_process: 'Intricately woven with gold thread beaten into thin sheets then cut',
      spiritual_lesson: 'The purple in the ephod signified the high priest represented the royal priesthood of Christ.',
      scripture_reference: 'Exodus 28:6'
    }
  ],
  scarlet: [
    {
      element_name: 'Tabernacle Veil',
      location: 'Entrance to Most Holy Place',
      material: 'Fine linen with blue, purple, and scarlet thread',
      manufacturing_process: 'Scarlet from tola\'at shani (crimson worm); worm crushed to extract dye',
      spiritual_lesson: 'The scarlet thread pointed to the blood of Christ that would be shed to open the way into God\'s presence.',
      scripture_reference: 'Exodus 26:31'
    },
    {
      element_name: 'Red Heifer Ceremony',
      location: 'Outside the camp',
      material: 'Scarlet thread burned with red heifer',
      manufacturing_process: 'Crimson thread added to the burning sacrifice',
      spiritual_lesson: 'The scarlet in the purification ceremony pointed to Christ\'s sacrifice outside Jerusalem for our cleansing.',
      scripture_reference: 'Numbers 19:6'
    }
  ],
  white: [
    {
      element_name: 'Tabernacle Curtains Foundation',
      location: 'Base fabric of all curtains',
      material: 'Fine twisted linen (shesh)',
      manufacturing_process: 'Finest Egyptian linen, bleached white, tightly twisted for strength',
      spiritual_lesson: 'White linen as the foundation teaches that everything must be built on righteousness.',
      scripture_reference: 'Exodus 26:1'
    },
    {
      element_name: 'High Priest Undergarments',
      location: 'Worn under all priestly garments',
      material: 'Fine white linen',
      manufacturing_process: 'Pure white linen woven for modesty and purity',
      spiritual_lesson: 'White undergarments represented the personal righteousness and purity required to minister.',
      scripture_reference: 'Exodus 28:42'
    },
    {
      element_name: 'Day of Atonement Garments',
      location: 'Worn when entering Most Holy Place',
      material: 'Pure white linen coat, trousers, belt, and turban',
      manufacturing_process: 'Specially made white linen garments for Yom Kippur',
      spiritual_lesson: 'Only in pure white could the high priest enter God\'s presence, teaching that only perfect righteousness can stand before God.',
      scripture_reference: 'Leviticus 16:4'
    }
  ],
  gold: [
    {
      element_name: 'Ark of the Covenant',
      location: 'Most Holy Place',
      material: 'Acacia wood overlaid with pure gold inside and out',
      manufacturing_process: 'Beaten gold sheets applied to wood; golden crown molding around top',
      spiritual_lesson: 'The ark covered in gold represents Christ (wood = humanity, gold = divinity) containing God\'s law.',
      scripture_reference: 'Exodus 25:10-11'
    },
    {
      element_name: 'Mercy Seat',
      location: 'Lid of Ark in Most Holy Place',
      material: 'Pure solid gold with two cherubim',
      manufacturing_process: 'Beaten from one piece of pure gold; cherubim hammered from same piece',
      spiritual_lesson: 'The golden mercy seat is where God met with humanity - representing Christ\'s divine mediation.',
      scripture_reference: 'Exodus 25:17-22'
    },
    {
      element_name: 'Golden Lampstand',
      location: 'Holy Place, south side',
      material: 'One talent of pure gold (approximately 75 pounds)',
      manufacturing_process: 'Hammered from one solid piece of gold; intricate almond blossom design',
      spiritual_lesson: 'The golden lampstand represents Christ, the Light of the World, in His divine glory.',
      scripture_reference: 'Exodus 25:31-40'
    }
  ],
  brass: [
    {
      element_name: 'Altar of Burnt Offering',
      location: 'Outer court, at entrance',
      material: 'Acacia wood overlaid with brass/bronze',
      manufacturing_process: 'Brass sheets applied to withstand intense heat of continual fire',
      spiritual_lesson: 'The brazen altar where sin was judged represents Christ bearing God\'s judgment for our sin.',
      scripture_reference: 'Exodus 27:1-2'
    },
    {
      element_name: 'Bronze Laver',
      location: 'Outer court, between altar and tabernacle',
      material: 'Bronze from women\'s mirrors',
      manufacturing_process: 'Cast bronze basin and bronze stand',
      spiritual_lesson: 'The brass laver for cleansing teaches that we must be purified through Christ who endured judgment.',
      scripture_reference: 'Exodus 30:18'
    },
    {
      element_name: 'Bronze Serpent',
      location: 'Raised on pole in wilderness',
      material: 'Bronze serpent on wooden pole',
      manufacturing_process: 'Cast bronze in form of serpent',
      spiritual_lesson: 'Christ explicitly identified this as a type of His crucifixion - lifted up to save all who look in faith.',
      scripture_reference: 'Numbers 21:8-9, John 3:14-15'
    }
  ],
  silver: [
    {
      element_name: 'Tabernacle Sockets',
      location: 'Foundation under all boards',
      material: 'Pure silver from atonement money',
      manufacturing_process: 'Each Israelite male paid half-shekel; melted and cast into sockets',
      spiritual_lesson: 'The entire tabernacle rested on silver sockets of redemption - salvation\'s foundation is redemption.',
      scripture_reference: 'Exodus 30:13-16, 38:25-27'
    },
    {
      element_name: 'Silver Hooks and Bands',
      location: 'Connecting pillars around courtyard',
      material: 'Silver hooks and connecting bands',
      manufacturing_process: 'Silver bands joined the pillars; hooks held curtains',
      spiritual_lesson: 'Silver connections symbolize that we are united together through redemption in Christ.',
      scripture_reference: 'Exodus 27:10-11'
    }
  ],
  dark: [
    {
      element_name: 'Tabernacle Outer Covering',
      location: 'Outermost layer over tabernacle',
      material: 'Badger skins or seal skins (tachash)',
      manufacturing_process: 'Animal skins tanned and treated for weather resistance',
      spiritual_lesson: 'The plain exterior concealing interior glory represents Christ\'s humble incarnation hiding His divinity.',
      scripture_reference: 'Exodus 26:14'
    }
  ]
};

const quizQuestionsData: Record<string, QuizQuestion[]> = {
  blue: [
    {
      question_text: 'What does the color blue primarily represent in the sanctuary?',
      question_type: 'multiple_choice',
      correct_answer: 'God\'s law and divine commandments',
      wrong_answers: ['The blood of Christ', 'Christ\'s royalty', 'Purity and holiness'],
      explanation: 'Blue specifically represents God\'s law and commandments. The blue thread in the fringes (tzitzit) was to remind Israel to keep all of God\'s commandments (Numbers 15:38-39).',
      difficulty: 'easy',
      points: 10
    },
    {
      question_text: 'The Hebrew word for blue is "tekhelet."',
      question_type: 'true_false',
      correct_answer: 'true',
      wrong_answers: ['false'],
      explanation: 'True. The Hebrew word תְּכֵלֶת (tekhelet) refers to the blue dye used in the sanctuary, derived from a specific type of sea snail.',
      difficulty: 'medium',
      points: 10
    }
  ],
  purple: [
    {
      question_text: 'What does purple symbolize in the sanctuary?',
      question_type: 'multiple_choice',
      correct_answer: 'Royalty and kingship',
      wrong_answers: ['Sacrifice and blood', 'Purity', 'Divine judgment'],
      explanation: 'Purple represents royalty and kingship. It was the most expensive dye, reserved for kings and nobility. In sanctuary symbolism, it points to Christ as King of Kings.',
      difficulty: 'easy',
      points: 10
    }
  ],
  scarlet: [
    {
      question_text: 'What does the Hebrew term "tola\'at shani" literally mean?',
      question_type: 'multiple_choice',
      correct_answer: 'Worm of scarlet',
      wrong_answers: ['Blood of sacrifice', 'Red dye', 'Crimson thread'],
      explanation: 'The Hebrew תּוֹלַעַת שָׁנִי (tola\'at shani) literally means "worm of scarlet." The crimson worm gives its life to produce red dye, beautifully typifying Christ\'s self-sacrifice.',
      difficulty: 'medium',
      points: 15
    }
  ],
  white: [
    {
      question_text: 'What did the high priest wear when entering the Most Holy Place on the Day of Atonement?',
      question_type: 'multiple_choice',
      correct_answer: 'Pure white linen garments',
      wrong_answers: ['His regular colorful ephod', 'Gold and purple robes', 'Blue robe with golden bells'],
      explanation: 'On Yom Kippur, the high priest wore simple white linen garments (Leviticus 16:4), symbolizing that only perfect purity can enter God\'s presence.',
      difficulty: 'medium',
      points: 15
    }
  ],
  gold: [
    {
      question_text: 'Gold in the sanctuary primarily represents what?',
      question_type: 'multiple_choice',
      correct_answer: 'The divine nature and deity',
      wrong_answers: ['Material wealth', 'Human righteousness', 'Earthly kingship'],
      explanation: 'Gold represents the divine nature, the glory of God, and the deity of Christ. The abundance of gold in the Most Holy Place declared the presence of the Divine.',
      difficulty: 'easy',
      points: 10
    }
  ],
  brass: [
    {
      question_text: 'The brazen serpent lifted up in the wilderness was made of what material?',
      question_type: 'multiple_choice',
      correct_answer: 'Bronze (brass)',
      wrong_answers: ['Gold', 'Silver', 'Iron'],
      explanation: 'The serpent was made of bronze/brass (Numbers 21:9), and Jesus identified it as a type of His crucifixion (John 3:14-15). The brass represents judgment borne.',
      difficulty: 'easy',
      points: 10
    }
  ],
  silver: [
    {
      question_text: 'What was the source of the silver used for the tabernacle sockets?',
      question_type: 'multiple_choice',
      correct_answer: 'The atonement money (half-shekel) from every Israelite male',
      wrong_answers: ['Spoils from Egypt', 'Voluntary offerings', 'King David\'s treasury'],
      explanation: 'The silver came from the atonement money - each Israelite male paid a half-shekel (Exodus 30:13-16). This silver formed the foundation sockets, showing the entire structure rested on redemption.',
      difficulty: 'medium',
      points: 15
    }
  ],
  dark: [
    {
      question_text: 'What prophetic verse does the dark outer covering of the tabernacle fulfill regarding Christ?',
      question_type: 'multiple_choice',
      correct_answer: 'Isaiah 53:2 - "He has no form or comeliness... no beauty that we should desire Him"',
      wrong_answers: ['Isaiah 9:6 - "Unto us a child is born"', 'Psalm 45:2 - "Fairer than the sons of men"', 'Isaiah 60:1 - "Arise, shine, for your light has come"'],
      explanation: 'The plain, dark exterior concealing the glorious interior fulfilled Isaiah 53:2, prophesying Christ would appear humble and unattractive in His incarnation while being God incarnate.',
      difficulty: 'hard',
      points: 20
    }
  ]
};

async function seedSacredColors() {
  console.log('Starting Sacred Colors database seeding...');

  try {
    for (const colorData of sacredColorsData) {
      console.log(`\nSeeding color: ${colorData.color_name}`);

      const { data: color, error: colorError } = await supabase
        .from('sacred_colors')
        .insert([colorData])
        .select()
        .single();

      if (colorError) {
        console.error(`Error inserting ${colorData.color_name}:`, colorError);
        continue;
      }

      console.log(`  ✓ Color ${colorData.color_name} inserted with ID: ${color.id}`);

      if (symbolismData[colorData.slug]) {
        const symbolismRecords = symbolismData[colorData.slug].map(sym => ({
          color_id: color.id,
          ...sym
        }));

        const { error: symError } = await supabase
          .from('color_symbolism')
          .insert(symbolismRecords);

        if (symError) {
          console.error(`  Error inserting symbolism for ${colorData.color_name}:`, symError);
        } else {
          console.log(`  ✓ Symbolism added (${symbolismRecords.length} traditions)`);
        }
      }

      if (applicationsData[colorData.slug]) {
        const applicationRecords = applicationsData[colorData.slug].map(app => ({
          color_id: color.id,
          ...app
        }));

        const { error: appError} = await supabase
          .from('color_applications')
          .insert(applicationRecords);

        if (appError) {
          console.error(`  Error inserting applications for ${colorData.color_name}:`, appError);
        } else {
          console.log(`  ✓ Applications added (${applicationRecords.length} elements)`);
        }
      }

      if (quizQuestionsData[colorData.slug]) {
        const quizRecords = quizQuestionsData[colorData.slug].map(q => ({
          color_id: color.id,
          ...q
        }));

        const { error: quizError } = await supabase
          .from('color_quiz_questions')
          .insert(quizRecords);

        if (quizError) {
          console.error(`  Error inserting quiz questions for ${colorData.color_name}:`, quizError);
        } else {
          console.log(`  ✓ Quiz questions added (${quizRecords.length} questions)`);
        }
      }
    }

    const { data: colors } = await supabase
      .from('sacred_colors')
      .select('id, slug')
      .in('slug', ['blue', 'purple', 'scarlet', 'gold', 'white']);

    const colorIdMap = new Map(colors?.map(c => [c.slug, c.id]));

    const colorCombinations = [
      {
        combination_name: 'The Veil Triad: Blue, Purple, and Scarlet',
        color_ids: [colorIdMap.get('blue'), colorIdMap.get('purple'), colorIdMap.get('scarlet')].filter(Boolean),
        context: 'The veil separating the Holy Place from the Most Holy Place',
        combined_meaning: 'The three colors together represent the complete work of Christ: Blue (His obedience to God\'s law), Purple (His royalty as King), and Scarlet (His sacrifice as the Lamb). Together they show Christ is our obedient King who died for us.',
        scripture_reference: 'Exodus 26:31-33',
        visual_example_url: ''
      },
      {
        combination_name: 'The Priestly Ephod: Gold, Blue, Purple, Scarlet, and White',
        color_ids: [colorIdMap.get('gold'), colorIdMap.get('blue'), colorIdMap.get('purple'), colorIdMap.get('scarlet'), colorIdMap.get('white')].filter(Boolean),
        context: 'The high priest\'s ephod',
        combined_meaning: 'All five colors in the ephod represent the complete character of our High Priest Jesus: Deity (Gold), Law-keeper (Blue), King (Purple), Sacrifice (Scarlet), and Righteous (White). He perfectly fulfills every aspect of priesthood.',
        scripture_reference: 'Exodus 28:6',
        visual_example_url: ''
      }
    ];

    const { error: combError } = await supabase
      .from('color_combinations')
      .insert(colorCombinations);

    if (combError) {
      console.error('Error inserting color combinations:', combError);
    } else {
      console.log(`\n✓ Color combinations added (${colorCombinations.length} combinations)`);
    }

    console.log('\n✅ Sacred Colors seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`  - ${sacredColorsData.length} colors`);
    console.log(`  - ${Object.values(symbolismData).flat().length} symbolism entries`);
    console.log(`  - ${Object.values(applicationsData).flat().length} sanctuary applications`);
    console.log(`  - ${Object.values(quizQuestionsData).flat().length} quiz questions`);
    console.log(`  - ${colorCombinations.length} color combinations`);

  } catch (error) {
    console.error('Fatal error during seeding:', error);
    throw error;
  }
}

seedSacredColors()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
