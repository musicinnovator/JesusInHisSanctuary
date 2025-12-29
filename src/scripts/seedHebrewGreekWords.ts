import { supabase } from '../lib/supabase';

interface HebrewGreekWordData {
  original_word: string;
  transliteration: string;
  strongs_number: string;
  language: 'hebrew' | 'greek';
  definition: string;
  literal_meaning: string;
  theological_significance: string;
  sanctuary_significance: string;
  usage_count: number;
  example_verses: string[];
}

const hebrewGreekWords: HebrewGreekWordData[] = [
  // ==================== HEBREW WORDS ====================
  {
    original_word: 'אָרוֹן',
    transliteration: 'aron',
    strongs_number: 'H727',
    language: 'hebrew',
    definition: 'Ark, chest, coffin - a container or box',
    literal_meaning: 'A chest or box, specifically referring to the Ark of the Covenant',
    theological_significance: 'Represents God\'s throne on earth, the meeting place between God and humanity, containing the law of God',
    sanctuary_significance: 'The most sacred object in the Most Holy Place, symbolizing God\'s presence and His covenant with His people',
    usage_count: 202,
    example_verses: ['Exodus 25:10', 'Exodus 25:22', 'Numbers 10:35', 'Joshua 3:3']
  },
  {
    original_word: 'כַּפֹּרֶת',
    transliteration: 'kapporet',
    strongs_number: 'H3727',
    language: 'hebrew',
    definition: 'Mercy seat, atonement cover - the golden lid of the Ark',
    literal_meaning: 'Cover, lid; from the root "kaphar" meaning to cover or atone',
    theological_significance: 'The place where God\'s justice and mercy meet; where atonement is made through blood',
    sanctuary_significance: 'Located on top of the Ark, between the cherubim, where God met with the High Priest and gave His glory',
    usage_count: 27,
    example_verses: ['Exodus 25:17', 'Exodus 25:22', 'Leviticus 16:2', 'Leviticus 16:14']
  },
  {
    original_word: 'מְנוֹרָה',
    transliteration: 'menorah',
    strongs_number: 'H4501',
    language: 'hebrew',
    definition: 'Lampstand, candlestick - a seven-branched golden lamp',
    literal_meaning: 'Lamp, light-holder',
    theological_significance: 'Represents the light of God, His Word, and the Holy Spirit illuminating the way',
    sanctuary_significance: 'Stood in the Holy Place, providing light for the priestly service, symbolizing Christ as the Light of the World',
    usage_count: 40,
    example_verses: ['Exodus 25:31', 'Exodus 37:17', 'Numbers 8:2', 'Zechariah 4:2']
  },
  {
    original_word: 'מִזְבֵּחַ',
    transliteration: 'mizbeach',
    strongs_number: 'H4196',
    language: 'hebrew',
    definition: 'Altar - a place of sacrifice',
    literal_meaning: 'Place of slaughter or sacrifice',
    theological_significance: 'Represents the place where sin is dealt with through sacrifice, pointing to Christ\'s ultimate sacrifice',
    sanctuary_significance: 'Both the Altar of Burnt Offering (courtyard) and Altar of Incense (Holy Place) were central to worship and atonement',
    usage_count: 403,
    example_verses: ['Exodus 27:1', 'Exodus 30:1', 'Leviticus 1:5', 'Genesis 8:20']
  },
  {
    original_word: 'שֻׁלְחָן',
    transliteration: 'shulchan',
    strongs_number: 'H7979',
    language: 'hebrew',
    definition: 'Table - specifically the Table of Showbread',
    literal_meaning: 'Table, specifically for eating',
    theological_significance: 'Represents God\'s provision, fellowship with God, and Christ as the Bread of Life',
    sanctuary_significance: 'Held twelve loaves representing the twelve tribes, showing God\'s continuous provision for His people',
    usage_count: 71,
    example_verses: ['Exodus 25:23', 'Exodus 25:30', 'Leviticus 24:6', '1 Kings 7:48']
  },
  {
    original_word: 'קְטֹרֶת',
    transliteration: 'qetoret',
    strongs_number: 'H7004',
    language: 'hebrew',
    definition: 'Incense - fragrant smoke offering',
    literal_meaning: 'Smoke, fragrance, perfume',
    theological_significance: 'Represents the prayers of the saints ascending to God through Christ\'s intercession',
    sanctuary_significance: 'Burned on the Golden Altar of Incense morning and evening, symbolizing continual prayer and Christ\'s mediation',
    usage_count: 60,
    example_verses: ['Exodus 30:7', 'Exodus 30:8', 'Leviticus 16:12', 'Psalm 141:2']
  },
  {
    original_word: 'כִּיּוֹר',
    transliteration: 'kiyor',
    strongs_number: 'H3595',
    language: 'hebrew',
    definition: 'Laver, basin - a bronze washing vessel',
    literal_meaning: 'Pot, basin, laver for washing',
    theological_significance: 'Represents cleansing from sin, sanctification, and regeneration',
    sanctuary_significance: 'Placed between the altar and the tabernacle for priests to wash, symbolizing spiritual cleansing needed to serve God',
    usage_count: 23,
    example_verses: ['Exodus 30:18', 'Exodus 30:28', 'Exodus 40:7', '1 Kings 7:38']
  },
  {
    original_word: 'פָּרֹכֶת',
    transliteration: 'paroketh',
    strongs_number: 'H6532',
    language: 'hebrew',
    definition: 'Veil, curtain - separating the Holy from the Most Holy Place',
    literal_meaning: 'Separating curtain or screen',
    theological_significance: 'Represents the barrier between humanity and God\'s presence, torn at Christ\'s death providing direct access to God',
    sanctuary_significance: 'Separated the Holy Place from the Most Holy Place, protecting the people from God\'s consuming holiness',
    usage_count: 25,
    example_verses: ['Exodus 26:31', 'Exodus 26:33', 'Leviticus 16:2', 'Matthew 27:51']
  },
  {
    original_word: 'כֹּהֵן',
    transliteration: 'kohen',
    strongs_number: 'H3548',
    language: 'hebrew',
    definition: 'Priest - one who serves as mediator between God and people',
    literal_meaning: 'Priest, minister',
    theological_significance: 'Represents Christ as our High Priest, mediating between God and humanity',
    sanctuary_significance: 'The priesthood performed all sanctuary services, foreshadowing Christ\'s heavenly priesthood',
    usage_count: 750,
    example_verses: ['Exodus 28:1', 'Leviticus 16:32', 'Hebrews 4:14', 'Hebrews 7:26']
  },
  {
    original_word: 'כִּפֻּר',
    transliteration: 'kippur',
    strongs_number: 'H3725',
    language: 'hebrew',
    definition: 'Atonement, covering - reconciliation with God',
    literal_meaning: 'Covering, atonement, expiation',
    theological_significance: 'The central concept of covering sin through sacrificial blood, ultimately fulfilled in Christ',
    sanctuary_significance: 'The Day of Atonement (Yom Kippur) was the most sacred day, when the High Priest entered the Most Holy Place',
    usage_count: 8,
    example_verses: ['Leviticus 23:27', 'Leviticus 25:9', 'Numbers 5:8', 'Numbers 29:11']
  },

  // ==================== GREEK WORDS ====================
  {
    original_word: 'ἱλαστήριον',
    transliteration: 'hilasterion',
    strongs_number: 'G2435',
    language: 'greek',
    definition: 'Mercy seat, propitiation - place of atonement',
    literal_meaning: 'Place of propitiation, atoning sacrifice',
    theological_significance: 'Refers to Christ as our propitiation, satisfying God\'s justice through His sacrifice',
    sanctuary_significance: 'The Greek word for the mercy seat, directly connecting to the Ark of the Covenant and Christ\'s atoning work',
    usage_count: 2,
    example_verses: ['Romans 3:25', 'Hebrews 9:5']
  },
  {
    original_word: 'ἅγια',
    transliteration: 'hagia',
    strongs_number: 'G39',
    language: 'greek',
    definition: 'Holy place, sanctuary - sacred space',
    literal_meaning: 'Holy things, holy place',
    theological_significance: 'Refers to both the earthly and heavenly sanctuaries where God dwells',
    sanctuary_significance: 'Used in Hebrews to describe both compartments of the sanctuary and the heavenly sanctuary where Christ ministers',
    usage_count: 10,
    example_verses: ['Hebrews 9:2', 'Hebrews 9:12', 'Hebrews 9:24', 'Hebrews 9:25']
  },
  {
    original_word: 'σκηνή',
    transliteration: 'skene',
    strongs_number: 'G4633',
    language: 'greek',
    definition: 'Tabernacle, tent - dwelling place',
    literal_meaning: 'Tent, tabernacle, dwelling',
    theological_significance: 'Represents God dwelling with His people; "The Word became flesh and tabernacled among us"',
    sanctuary_significance: 'The Greek term for the tabernacle, emphasizing its temporary and portable nature, fulfilled in Christ who dwelt among us',
    usage_count: 20,
    example_verses: ['Hebrews 8:2', 'Hebrews 9:11', 'Revelation 15:5', 'John 1:14']
  },
  {
    original_word: 'ἀρχιερεύς',
    transliteration: 'archiereus',
    strongs_number: 'G749',
    language: 'greek',
    definition: 'High priest - chief priest',
    literal_meaning: 'Chief priest, high priest',
    theological_significance: 'Christ is our High Priest who entered heaven itself to appear before God on our behalf',
    sanctuary_significance: 'The high priest entered the Most Holy Place once a year; Christ entered the heavenly Most Holy Place with His own blood',
    usage_count: 122,
    example_verses: ['Hebrews 2:17', 'Hebrews 4:14', 'Hebrews 7:26', 'Hebrews 9:11']
  },
  {
    original_word: 'θυσιαστήριον',
    transliteration: 'thusiasterion',
    strongs_number: 'G2379',
    language: 'greek',
    definition: 'Altar - place of sacrifice',
    literal_meaning: 'Sacrificial altar',
    theological_significance: 'Represents the place of sacrifice, pointing to Christ\'s sacrifice on the cross',
    sanctuary_significance: 'Used in Hebrews and Revelation to describe both earthly altars and the heavenly altar before God\'s throne',
    usage_count: 23,
    example_verses: ['Hebrews 13:10', 'Revelation 8:3', 'Revelation 9:13', 'Revelation 11:1']
  },
  {
    original_word: 'καταπέτασμα',
    transliteration: 'katapetasma',
    strongs_number: 'G2665',
    language: 'greek',
    definition: 'Veil, curtain - the separating curtain',
    literal_meaning: 'Curtain, veil',
    theological_significance: 'Represents Christ\'s flesh; when torn at His death, it opened the way into God\'s presence',
    sanctuary_significance: 'The veil separating the Holy Place from the Most Holy Place, torn from top to bottom at Christ\'s death',
    usage_count: 6,
    example_verses: ['Matthew 27:51', 'Hebrews 6:19', 'Hebrews 9:3', 'Hebrews 10:20']
  },
  {
    original_word: 'λυχνία',
    transliteration: 'luchnia',
    strongs_number: 'G3087',
    language: 'greek',
    definition: 'Lampstand, candlestick',
    literal_meaning: 'Lampstand, light bearer',
    theological_significance: 'Represents Christ as the Light of the World and the church bearing His light',
    sanctuary_significance: 'The seven-branched golden lampstand providing light in the Holy Place',
    usage_count: 12,
    example_verses: ['Hebrews 9:2', 'Revelation 1:12', 'Revelation 1:20', 'Revelation 2:5']
  },
  {
    original_word: 'θυμίαμα',
    transliteration: 'thumiama',
    strongs_number: 'G2368',
    language: 'greek',
    definition: 'Incense - fragrant offering',
    literal_meaning: 'Incense, fragrant smoke',
    theological_significance: 'Represents the prayers of the saints offered to God through Christ\'s intercession',
    sanctuary_significance: 'The incense burned on the golden altar, symbolizing prayer ascending to heaven',
    usage_count: 6,
    example_verses: ['Luke 1:10', 'Revelation 5:8', 'Revelation 8:3', 'Revelation 8:4']
  },
  {
    original_word: 'καθαρίζω',
    transliteration: 'katharizo',
    strongs_number: 'G2511',
    language: 'greek',
    definition: 'To cleanse, purify - make clean',
    literal_meaning: 'To cleanse, purify, make clean',
    theological_significance: 'Represents the cleansing from sin through Christ\'s blood and the work of the Holy Spirit',
    sanctuary_significance: 'Related to the cleansing of the sanctuary (Daniel 8:14) and personal spiritual cleansing',
    usage_count: 31,
    example_verses: ['Hebrews 9:22', 'Hebrews 9:23', 'Hebrews 10:2', '1 John 1:7']
  },
  {
    original_word: 'διαθήκη',
    transliteration: 'diatheke',
    strongs_number: 'G1242',
    language: 'greek',
    definition: 'Covenant, testament - binding agreement',
    literal_meaning: 'Covenant, will, testament',
    theological_significance: 'Christ is the mediator of a new and better covenant, established on better promises',
    sanctuary_significance: 'The tablets of the covenant were kept in the Ark; Christ\'s blood ratified the new covenant',
    usage_count: 33,
    example_verses: ['Hebrews 8:6', 'Hebrews 9:15', 'Hebrews 12:24', 'Luke 22:20']
  }
];

export async function seedHebrewGreekWords() {
  try {
    console.log('🌱 Starting Hebrew/Greek Words Seeding...\n');

    for (const word of hebrewGreekWords) {
      try {
        // Check if word already exists
        const { data: existing } = await supabase
          .from('hebrew_greek_words')
          .select('id')
          .eq('strongs_number', word.strongs_number)
          .maybeSingle();

        if (existing) {
          console.log(`   ✓ ${word.transliteration} (${word.strongs_number}) already exists, skipping...`);
          continue;
        }

        // Insert new word
        const { error: insertError } = await supabase
          .from('hebrew_greek_words')
          .insert([word]);

        if (insertError) {
          console.error(`   ✗ Error inserting ${word.transliteration}:`, insertError.message);
        } else {
          console.log(`   ✓ Inserted: ${word.transliteration} (${word.strongs_number}) - ${word.original_word}`);
        }
      } catch (err) {
        console.error(`   ✗ Error processing ${word.transliteration}:`, err);
      }
    }

    console.log('\n✅ Hebrew/Greek Words Seeding Complete!');
    console.log(`📊 Total words processed: ${hebrewGreekWords.length}`);
    console.log(`   - Hebrew words: ${hebrewGreekWords.filter(w => w.language === 'hebrew').length}`);
    console.log(`   - Greek words: ${hebrewGreekWords.filter(w => w.language === 'greek').length}`);
  } catch (error) {
    console.error('❌ Fatal error during word seeding:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedHebrewGreekWords()
    .then(() => {
      console.log('\n🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}
