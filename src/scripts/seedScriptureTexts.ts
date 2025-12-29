import { supabase } from '../lib/supabase';

interface ScriptureTextData {
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  kjv_text: string;
  usage_context: string;
  theme: string;
  cross_references: string[];
}

const scriptureTexts: ScriptureTextData[] = [
  // Hebrews - Heavenly Sanctuary
  {
    book: 'Hebrews',
    chapter: 8,
    verse_start: 1,
    verse_end: 2,
    kjv_text: 'Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.',
    usage_context: 'Crosier establishes that Christ ministers in the heavenly sanctuary, not an earthly one. This is foundational to understanding the true location of Christ\'s priestly work.',
    theme: 'Heavenly Sanctuary',
    cross_references: ['Hebrews 9:11-12', 'Hebrews 9:24', 'Revelation 11:19']
  },
  {
    book: 'Hebrews',
    chapter: 9,
    verse_start: 11,
    verse_end: 12,
    kjv_text: 'But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building; Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us.',
    usage_context: 'Crosier uses this verse to prove Christ entered the heavenly sanctuary with His own blood, fulfilling the type of the earthly high priest entering the Most Holy Place.',
    theme: 'Christ\'s Sacrifice',
    cross_references: ['Hebrews 8:1-2', 'Hebrews 10:19-20', 'Leviticus 16:15']
  },
  {
    book: 'Hebrews',
    chapter: 9,
    verse_start: 23,
    verse_end: 24,
    kjv_text: 'It was therefore necessary that the patterns of things in the heavens should be purified with these; but the heavenly things themselves with better sacrifices than these. For Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us.',
    usage_context: 'Critical verse showing that the heavenly sanctuary requires cleansing, parallel to the earthly Day of Atonement. Crosier uses this to establish the investigative judgment doctrine.',
    theme: 'Cleansing of Sanctuary',
    cross_references: ['Leviticus 16:30', 'Daniel 8:14', 'Hebrews 8:5']
  },
  {
    book: 'Hebrews',
    chapter: 10,
    verse_start: 19,
    verse_end: 20,
    kjv_text: 'Having therefore, brethren, boldness to enter into the holiest by the blood of Jesus, By a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh;',
    usage_context: 'Demonstrates believers\' access to God through Christ\'s sacrifice, entering "the holiest" - the Most Holy Place of the heavenly sanctuary.',
    theme: 'Access to God',
    cross_references: ['Hebrews 6:19-20', 'Hebrews 9:12', 'Matthew 27:51']
  },

  // Daniel - 2300 Days Prophecy
  {
    book: 'Daniel',
    chapter: 8,
    verse_start: 14,
    kjv_text: 'And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
    usage_context: 'The central prophetic text of Crosier\'s work. He argues this refers to 2300 literal years ending in 1844, when Christ began the cleansing of the heavenly sanctuary.',
    theme: '2300 Days Prophecy',
    cross_references: ['Daniel 9:24-27', 'Leviticus 16:30', 'Hebrews 9:23']
  },
  {
    book: 'Daniel',
    chapter: 9,
    verse_start: 24,
    verse_end: 27,
    kjv_text: 'Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to make an end of sins, and to make reconciliation for iniquity, and to bring in everlasting righteousness, and to seal up the vision and prophecy, and to anoint the most Holy. Know therefore and understand, that from the going forth of the commandment to restore and to build Jerusalem unto the Messiah the Prince shall be seven weeks, and threescore and two weeks: the street shall be built again, and the wall, even in troublous times. And after threescore and two weeks shall Messiah be cut off, but not for himself: and the people of the prince that shall come shall destroy the city and the sanctuary; and the end thereof shall be with a flood, and unto the end of the war desolations are determined. And he shall confirm the covenant with many for one week: and in the midst of the week he shall cause the sacrifice and the oblation to cease, and for the overspreading of abominations he shall make it desolate, even until the consummation, and that determined shall be poured upon the desolate.',
    usage_context: 'Crosier connects the 70 weeks to the 2300 days, establishing 457 BC as the starting point. This proves the prophetic year-day principle and validates 1844 as the endpoint.',
    theme: '70 Weeks Prophecy',
    cross_references: ['Daniel 8:14', 'Ezra 7:11-26', 'Luke 3:1']
  },

  // Leviticus - Day of Atonement Type
  {
    book: 'Leviticus',
    chapter: 16,
    verse_start: 29,
    verse_end: 30,
    kjv_text: 'And this shall be a statute for ever unto you: that in the seventh month, on the tenth day of the month, ye shall afflict your souls, and do no work at all, whether it be one of your own country, or a stranger that sojourneth among you: For on that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD.',
    usage_context: 'The Day of Atonement ritual is the type of Christ\'s work beginning in 1844. Crosier shows this yearly cleansing foreshadows the final judgment.',
    theme: 'Day of Atonement',
    cross_references: ['Leviticus 23:27-32', 'Hebrews 9:7', 'Daniel 8:14']
  },
  {
    book: 'Leviticus',
    chapter: 16,
    verse_start: 15,
    verse_end: 16,
    kjv_text: 'Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat: And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness.',
    usage_context: 'Shows that even the holy place required cleansing from accumulated sins. Crosier parallels this to Christ\'s work of cleansing the heavenly sanctuary.',
    theme: 'Sanctuary Cleansing',
    cross_references: ['Hebrews 9:23', 'Leviticus 4:6-7', 'Revelation 11:19']
  },
  {
    book: 'Leviticus',
    chapter: 16,
    verse_start: 20,
    verse_end: 22,
    kjv_text: 'And when he hath made an end of reconciling the holy place, and the tabernacle of the congregation, and the altar, he shall bring the live goat: And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness: And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.',
    usage_context: 'The scapegoat represents Satan\'s final judgment. After cleansing is complete, sins are symbolically placed on him. Crosier uses this to show the complete eradication of sin.',
    theme: 'Scapegoat',
    cross_references: ['Revelation 20:1-3', 'Leviticus 16:8-10', 'Ezekiel 28:16-19']
  },

  // Leviticus - Daily Service
  {
    book: 'Leviticus',
    chapter: 4,
    verse_start: 27,
    verse_end: 31,
    kjv_text: 'And if any one of the common people sin through ignorance, while he doeth somewhat against any of the commandments of the LORD concerning things which ought not to be done, and be guilty; Or if his sin, which he hath sinned, come to his knowledge: then he shall bring his offering, a kid of the goats, a female without blemish, for his sin which he hath sinned. And he shall lay his hand upon the head of the sin offering, and slay the sin offering in the place of the burnt offering. And the priest shall take of the blood thereof with his finger, and put it upon the horns of the altar of burnt offering, and shall pour out all the blood thereof at the bottom of the altar. And he shall take away all the fat thereof, as the fat is taken away from off the sacrifice of peace offerings; and the priest shall burn it upon the altar for a sweet savour unto the LORD; and the priest shall make an atonement for him, and it shall be forgiven him.',
    usage_context: 'Describes the daily sin offering where blood was brought into the Holy Place. Crosier shows this represents Christ\'s daily ministry of forgiveness since His ascension.',
    theme: 'Daily Atonement',
    cross_references: ['Hebrews 7:25', 'Hebrews 9:6-7', '1 John 1:9']
  },

  // Exodus - Sanctuary Structure
  {
    book: 'Exodus',
    chapter: 25,
    verse_start: 8,
    verse_end: 9,
    kjv_text: 'And let them make me a sanctuary; that I may dwell among them. According to all that I shew thee, after the pattern of the tabernacle, and the pattern of all the instruments thereof, even so shall ye make it.',
    usage_context: 'God commands the building of the earthly sanctuary according to a heavenly pattern. Crosier uses this to establish the reality of the heavenly sanctuary.',
    theme: 'Sanctuary Pattern',
    cross_references: ['Hebrews 8:5', 'Exodus 26:30', 'Acts 7:44']
  },
  {
    book: 'Exodus',
    chapter: 25,
    verse_start: 21,
    verse_end: 22,
    kjv_text: 'And thou shalt put the mercy seat above upon the ark; and in the ark thou shalt put the testimony that I shall give thee. And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel.',
    usage_context: 'The mercy seat is where God\'s presence dwelt and where blood was sprinkled on the Day of Atonement. Crosier connects this to God\'s throne and the ark in heaven.',
    theme: 'Mercy Seat',
    cross_references: ['Leviticus 16:14-15', 'Hebrews 9:5', 'Revelation 11:19']
  },

  // Revelation - Heavenly Sanctuary Scenes
  {
    book: 'Revelation',
    chapter: 11,
    verse_start: 19,
    kjv_text: 'And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.',
    usage_context: 'John sees the ark of the covenant in heaven, proving the reality of the heavenly sanctuary. Crosier uses this to validate his entire theological framework.',
    theme: 'Heavenly Ark',
    cross_references: ['Revelation 15:5', 'Hebrews 9:24', 'Exodus 25:21']
  },
  {
    book: 'Revelation',
    chapter: 4,
    verse_start: 1,
    verse_end: 2,
    kjv_text: 'After this I looked, and, behold, a door was opened in heaven: and the first voice which I heard was as it were of a trumpet talking with me; which said, Come up hither, and I will shew thee things which must be hereafter. And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne.',
    usage_context: 'John\'s vision of the heavenly throne room corresponds to the Most Holy Place. Crosier sees this as evidence of Christ\'s ministry location.',
    theme: 'Heavenly Throne',
    cross_references: ['Revelation 5:1-6', 'Hebrews 8:1', 'Daniel 7:9-10']
  },
  {
    book: 'Revelation',
    chapter: 5,
    verse_start: 8,
    verse_end: 9,
    kjv_text: 'And when he had taken the book, the four beasts and four and twenty elders fell down before the Lamb, having every one of them harps, and golden vials full of odours, which are the prayers of saints. And they sung a new song, saying, Thou art worthy to take the book, and to open the seals thereof: for thou wast slain, and hast redeemed us to God by thy blood out of every kindred, and tongue, and people, and nation;',
    usage_context: 'The Lamb (Christ) is worthy to open the judgment books. Crosier connects this to the investigative judgment beginning in 1844.',
    theme: 'Judgment Books',
    cross_references: ['Daniel 7:10', 'Revelation 20:12', 'Daniel 12:1']
  },

  // Acts - Christ\'s Ascension and Ministry
  {
    book: 'Acts',
    chapter: 1,
    verse_start: 9,
    verse_end: 11,
    kjv_text: 'And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight. And while they looked stedfastly toward heaven as he went up, behold, two men stood by them in white apparel; Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.',
    usage_context: 'Christ\'s ascension marks the beginning of His heavenly ministry. Crosier establishes this as the start of the "daily" phase of His priestly work.',
    theme: 'Christ\'s Ascension',
    cross_references: ['Hebrews 9:24', 'Luke 24:50-51', 'Hebrews 4:14']
  },
  {
    book: 'Acts',
    chapter: 3,
    verse_start: 19,
    verse_end: 21,
    kjv_text: 'Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord; And he shall send Jesus Christ, which before was preached unto you: Whom the heaven must receive until the times of restitution of all things, which God hath spoken by the mouth of all his holy prophets since the world began.',
    usage_context: 'The "blotting out" of sins corresponds to the Day of Atonement cleansing. Crosier uses this to explain the final phase of Christ\'s work before His return.',
    theme: 'Blotting Out of Sins',
    cross_references: ['Leviticus 16:30', 'Revelation 3:5', 'Daniel 8:14']
  },

  // Romans - Justification and Atonement
  {
    book: 'Romans',
    chapter: 3,
    verse_start: 24,
    verse_end: 25,
    kjv_text: 'Being justified freely by his grace through the redemption that is in Christ Jesus: Whom God hath set forth to be a propitiation through faith in his blood, to declare his righteousness for the remission of sins that are past, through the forbearance of God;',
    usage_context: 'Christ is the mercy seat (propitiation = hilasterion, same word as mercy seat). Crosier shows Christ fulfills the symbolism of the ark\'s mercy seat.',
    theme: 'Propitiation',
    cross_references: ['1 John 2:2', 'Hebrews 9:5', 'Exodus 25:17']
  },

  // 1 John - Continued Ministry
  {
    book: '1 John',
    chapter: 1,
    verse_start: 9,
    kjv_text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.',
    usage_context: 'Demonstrates Christ\'s ongoing ministry of forgiveness, corresponding to the daily service in the Holy Place.',
    theme: 'Ongoing Forgiveness',
    cross_references: ['Hebrews 7:25', 'Leviticus 4:31', '1 John 2:1']
  },
  {
    book: '1 John',
    chapter: 2,
    verse_start: 1,
    verse_end: 2,
    kjv_text: 'My little children, these things write I unto you, that ye sin not. And if any man sin, we have an advocate with the Father, Jesus Christ the righteous: And he is the propitiation for our sins: and not for ours only, but also for the sins of the whole world.',
    usage_context: 'Christ as advocate parallels the high priest\'s intercessory work. Crosier emphasizes Christ\'s continuous mediation for believers.',
    theme: 'Christ Our Advocate',
    cross_references: ['Hebrews 7:25', 'Romans 8:34', 'Hebrews 9:24']
  },

  // Additional Key Verses
  {
    book: 'Hebrews',
    chapter: 7,
    verse_start: 25,
    kjv_text: 'Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.',
    usage_context: 'Christ\'s continuous intercession in the heavenly sanctuary ensures complete salvation. Crosier uses this to show the ongoing nature of His priestly ministry.',
    theme: 'Continuous Intercession',
    cross_references: ['Romans 8:34', '1 John 2:1', 'Hebrews 9:24']
  },
  {
    book: 'Daniel',
    chapter: 7,
    verse_start: 9,
    verse_end: 10,
    kjv_text: 'I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire. A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened.',
    usage_context: 'Daniel\'s vision of the judgment scene parallels the Day of Atonement. Crosier connects this to 1844 and the opening of the Most Holy Place.',
    theme: 'Investigative Judgment',
    cross_references: ['Daniel 8:14', 'Revelation 20:12', 'Leviticus 16:30']
  },
  {
    book: 'Matthew',
    chapter: 27,
    verse_start: 51,
    kjv_text: 'And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent;',
    usage_context: 'The tearing of the veil at Christ\'s death symbolizes the end of the earthly sanctuary system and the opening of access to the heavenly sanctuary.',
    theme: 'Veil Torn',
    cross_references: ['Hebrews 10:19-20', 'Hebrews 6:19', 'Mark 15:38']
  }
];

export async function seedScriptureTexts() {
  try {
    console.log('Starting scripture texts seeding...');

    // First, get existing scripture references to link to
    const { data: existingRefs, error: refsError } = await supabase
      .from('crosier_scripture_references')
      .select('id, reference_text, book, chapter, verse_start, verse_end');

    if (refsError) {
      console.error('Error fetching existing references:', refsError);
      throw refsError;
    }

    console.log(`Found ${existingRefs?.length || 0} existing scripture references`);

    const textsToInsert = [];

    for (const text of scriptureTexts) {
      // Try to find matching reference by book, chapter, and verse
      const matchingRef = existingRefs?.find(ref =>
        ref.book === text.book &&
        ref.chapter === text.chapter &&
        ref.verse_start === text.verse_start &&
        (ref.verse_end === text.verse_end || (!ref.verse_end && !text.verse_end))
      );

      textsToInsert.push({
        reference_id: matchingRef?.id || null,
        kjv_text: text.kjv_text,
        book: text.book,
        chapter: text.chapter,
        verse_start: text.verse_start,
        verse_end: text.verse_end || null,
        usage_context: text.usage_context,
        theme: text.theme,
        cross_references: text.cross_references
      });
    }

    // Insert scripture texts in batches
    const batchSize = 10;
    for (let i = 0; i < textsToInsert.length; i += batchSize) {
      const batch = textsToInsert.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('crosier_scripture_texts')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        throw insertError;
      }

      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(textsToInsert.length / batchSize)}`);
    }

    console.log(`✅ Successfully seeded ${textsToInsert.length} scripture texts`);
    return { success: true, count: textsToInsert.length };
  } catch (error) {
    console.error('❌ Error seeding scripture texts:', error);
    return { success: false, error };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedScriptureTexts().then(result => {
    console.log('Seeding complete:', result);
    process.exit(result.success ? 0 : 1);
  });
}
