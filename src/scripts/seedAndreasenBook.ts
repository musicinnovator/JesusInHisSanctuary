import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedAndreasenBook() {
  console.log('Starting Andreasen book seeding...');

  try {
    const { data: chapters, error: chaptersError } = await supabase
      .from('andreasen_chapters')
      .insert([
        {
          chapter_number: 0,
          title: 'Preface',
          summary: 'Introduction to the study of the sanctuary, emphasizing the importance of understanding the sanctuary service as God\'s revelation of His plan of salvation. Andreasen outlines his methodology for studying the sanctuary through typology and the fulfillment of types in Christ\'s ministry.',
          word_count: 800,
          key_themes: ['Sanctuary Study Methodology', 'Type and Antitype', 'Plan of Salvation'],
          main_scripture_references: ['Exodus 25:8-9', 'Hebrews 8:1-5', 'Hebrews 9:23-24'],
          theological_focus: 'The sanctuary as the central organizing principle of biblical theology',
          practical_application: 'Approach Bible study with the sanctuary framework to understand God\'s redemptive plan',
          memorable_quote: 'The sanctuary reveals God\'s plan of salvation in ways nothing else can',
          chapter_order: 0
        },
        {
          chapter_number: 1,
          title: 'The Sacrificial System',
          summary: 'Comprehensive introduction to the five main offerings of the Levitical system: burnt, meal, peace, sin, and trespass offerings. Each offering reveals different aspects of Christ\'s atoning work and the believer\'s relationship with God. The chapter establishes the foundational principle that blood is essential for atonement.',
          word_count: 3500,
          key_themes: ['Five Offerings', 'Substitutionary Atonement', 'Blood Atonement', 'Voluntary Sacrifice'],
          main_scripture_references: ['Leviticus 1-7', 'Hebrews 9:22', 'John 1:29', 'Romans 12:1'],
          theological_focus: 'The sacrificial system as a type of Christ\'s complete atoning work',
          practical_application: 'Complete surrender to God as a living sacrifice',
          memorable_quote: 'Without the shedding of blood there is no remission of sin',
          chapter_order: 1
        },
        {
          chapter_number: 2,
          title: 'God\'s Sanctuaries on Earth',
          summary: 'Examination of the three earthly sanctuaries: the wilderness tabernacle, Solomon\'s temple, and Herod\'s temple. Each structure demonstrates progressive revelation while maintaining the essential elements of the sanctuary pattern. The chapter emphasizes that all earthly sanctuaries point to the heavenly reality.',
          word_count: 4200,
          key_themes: ['Three Sanctuaries', 'Divine Architecture', 'Progressive Revelation', 'Sanctuary Pattern'],
          main_scripture_references: ['Exodus 25:8-9, 40', '1 Kings 6', 'Haggai 2:9', 'Hebrews 8:5'],
          theological_focus: 'The earthly sanctuary as a copy of the heavenly pattern',
          practical_application: 'God desires to dwell with His people in every generation',
          memorable_quote: 'See that thou make all things according to the pattern',
          chapter_order: 2
        },
        {
          chapter_number: 3,
          title: 'The Priesthood',
          summary: 'Detailed study of the Aaronic priesthood, including qualifications, consecration, garments, and duties. The chapter draws extensive parallels between the earthly priesthood and Christ\'s superior high priesthood, emphasizing His mediatorial role and intercession for believers.',
          word_count: 3800,
          key_themes: ['Aaronic Priesthood', 'Christ as High Priest', 'Mediation', 'Priestly Garments', 'Consecration'],
          main_scripture_references: ['Exodus 28-29', 'Leviticus 8', 'Hebrews 4:14-16', 'Hebrews 7:23-28'],
          theological_focus: 'Christ\'s superior priesthood after the order of Melchizedek',
          practical_application: 'Believers have direct access to God through Christ our High Priest',
          memorable_quote: 'We have such a high priest, who is seated at the right hand of the throne of the Majesty in heaven',
          chapter_order: 3
        },
        {
          chapter_number: 4,
          title: 'The Burnt Offering',
          summary: 'The burnt offering represents total consecration and complete surrender to God. As the only offering completely consumed on the altar, it symbolizes Christ\'s complete obedience and the believer\'s full dedication. The voluntary nature of the offering emphasizes willing service.',
          word_count: 3200,
          key_themes: ['Complete Consecration', 'Total Surrender', 'Voluntary Offering', 'Christ\'s Obedience'],
          main_scripture_references: ['Leviticus 1', 'Ephesians 5:2', 'Romans 12:1', 'Philippians 2:8'],
          theological_focus: 'Christ\'s perfect obedience as the true burnt offering',
          practical_application: 'Present your body as a living sacrifice, wholly acceptable to God',
          memorable_quote: 'Christ gave himself for us, an offering and a sacrifice to God',
          chapter_order: 4
        },
        {
          chapter_number: 5,
          title: 'The Meat (Meal) Offering',
          summary: 'The meal offering, a bloodless offering of fine flour, oil, and frankincense, represents Christ\'s perfect life and character. It accompanies other offerings, symbolizing that Christ\'s righteous life qualifies His death to be efficacious for sinners. The ingredients teach lessons about purity, the Holy Spirit, and prayer.',
          word_count: 2800,
          key_themes: ['Bloodless Offering', 'Perfect Life', 'Character Development', 'Christ\'s Humanity'],
          main_scripture_references: ['Leviticus 2', 'John 6:35', 'Matthew 5:48'],
          theological_focus: 'Christ\'s sinless life as the bread of life',
          practical_application: 'Christians must develop Christlike character through dependence on the Holy Spirit',
          memorable_quote: 'I am the bread of life: he that cometh to me shall never hunger',
          chapter_order: 5
        },
        {
          chapter_number: 6,
          title: 'The Peace Offering',
          summary: 'The peace offering celebrates restored fellowship and communion with God. Unique among offerings, it includes a shared meal between God, priest, and offerer, symbolizing unity and thanksgiving. This offering represents the peace Christ accomplished through His blood.',
          word_count: 3000,
          key_themes: ['Fellowship', 'Communion', 'Peace with God', 'Thanksgiving'],
          main_scripture_references: ['Leviticus 3', 'Leviticus 7:11-34', 'Ephesians 2:14', 'Colossians 1:20'],
          theological_focus: 'Christ our peace, breaking down walls of separation',
          practical_application: 'Believers enjoy fellowship with God through Christ',
          memorable_quote: 'He is our peace, who hath made both one',
          chapter_order: 6
        },
        {
          chapter_number: 7,
          title: 'The Sin Offering',
          summary: 'Comprehensive examination of the sin offering for unintentional sins, with different requirements based on the offerer\'s position. Critical discussion of blood manipulation and sin transfer to the sanctuary. This chapter establishes the foundation for understanding sanctuary cleansing.',
          word_count: 4500,
          key_themes: ['Sin Offering', 'Unintentional Sin', 'Sin Transfer', 'Sanctuary Defilement', 'Blood Manipulation'],
          main_scripture_references: ['Leviticus 4', '2 Corinthians 5:21', 'Hebrews 13:11-12', 'Isaiah 53:10'],
          theological_focus: 'Christ made sin for us, bearing our sins to the sanctuary',
          practical_application: 'Confession and faith transfer sin to Christ our substitute',
          memorable_quote: 'The Lord hath laid on him the iniquity of us all',
          chapter_order: 7
        },
        {
          chapter_number: 8,
          title: 'The Trespass Offering',
          summary: 'The trespass offering addresses sins requiring restitution, whether against God or neighbor. The 20% penalty principle emphasizes the seriousness of sin and the need for full restoration. This offering teaches that forgiveness includes making wrongs right.',
          word_count: 2600,
          key_themes: ['Restitution', 'Trespass Against God and Man', '20% Penalty', 'Confession'],
          main_scripture_references: ['Leviticus 5:14-6:7', 'Numbers 5:5-8', 'Luke 19:8'],
          theological_focus: 'Sin requires both divine forgiveness and human restitution',
          practical_application: 'True repentance includes making restitution where possible',
          memorable_quote: 'If any man sin and commit a trespass, he shall confess and make restitution',
          chapter_order: 8
        },
        {
          chapter_number: 9,
          title: 'The Day of Atonement',
          summary: 'The most theologically significant chapter, presenting the Day of Atonement as the culmination of the ceremonial year. Detailed examination of the two-goat ritual, high priest\'s ministry in the Most Holy Place, and the cleansing of the sanctuary from accumulated sins. Prophetic application to Christ\'s final ministry and the investigative judgment.',
          word_count: 5500,
          key_themes: ['Day of Atonement', 'Sanctuary Cleansing', 'Two Goats', 'Investigative Judgment', 'Blotting Out Sin', '2300 Days', 'Most Holy Place'],
          main_scripture_references: ['Leviticus 16', 'Daniel 8:14', 'Hebrews 9:23-28', 'Revelation 14:6-7'],
          theological_focus: 'The investigative judgment and final cleansing of the heavenly sanctuary',
          practical_application: 'Believers must be ready for the close of probation',
          memorable_quote: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed',
          chapter_order: 9
        },
        {
          chapter_number: 10,
          title: 'The Scapegoat',
          summary: 'Controversial examination of the scapegoat (Azazel), arguing that it represents Satan bearing the final responsibility for sin. The chapter distinguishes between Christ bearing sin for atonement and Satan bearing sin for punishment. Extensive biblical and theological argumentation for this distinctive Adventist teaching.',
          word_count: 4800,
          key_themes: ['Scapegoat', 'Azazel', 'Satan\'s Role', 'Final Sin-Bearer', 'Ultimate Responsibility'],
          main_scripture_references: ['Leviticus 16:8-10, 20-22', 'Revelation 20:1-3, 10', 'Ezekiel 28:18-19'],
          theological_focus: 'Satan as the originator of sin bears final responsibility',
          practical_application: 'Sin will be completely eradicated from the universe',
          memorable_quote: 'The scapegoat shall bear upon him all their iniquities unto a land not inhabited',
          chapter_order: 10
        },
        {
          chapter_number: 11,
          title: 'The Two Goats',
          summary: 'Further theological development of the two-goat typology, clarifying the distinction between the Lord\'s goat (Christ) and the scapegoat (Satan). Addresses objections and alternative interpretations, defending the position that two separate beings are represented.',
          word_count: 3500,
          key_themes: ['Two Goats', 'Christ and Satan', 'Complete vs Final Atonement', 'Theological Controversy'],
          main_scripture_references: ['Leviticus 16', 'Isaiah 53:6', 'John 1:29', 'Revelation 20:10'],
          theological_focus: 'The two-phase aspect of dealing with sin',
          practical_application: 'God\'s justice requires both redemption and judgment',
          memorable_quote: 'One lot for the Lord, and the other lot for the scapegoat',
          chapter_order: 11
        },
        {
          chapter_number: 12,
          title: 'The Feasts',
          summary: 'Comprehensive overview of the annual feast cycle: Passover, Unleavened Bread, Firstfruits, Pentecost, Trumpets, Day of Atonement, and Tabernacles. Each feast has prophetic significance pointing to Christ\'s first and second advent. The spring feasts find fulfillment in Christ\'s first coming; fall feasts await complete fulfillment.',
          word_count: 4000,
          key_themes: ['Seven Feasts', 'Prophetic Timeline', 'Spring Fulfillment', 'Fall Awaiting', 'Ceremonial Calendar'],
          main_scripture_references: ['Leviticus 23', '1 Corinthians 5:7', 'Colossians 2:16-17'],
          theological_focus: 'The feasts as prophetic timeline of redemptive history',
          practical_application: 'The ceremonial law pointed to Christ and instructs believers today',
          memorable_quote: 'These are a shadow of things to come; but the body is of Christ',
          chapter_order: 12
        },
        {
          chapter_number: 13,
          title: 'Passover',
          summary: 'Detailed study of the Passover feast, from its institution in Egypt through its fulfillment in Christ. The lamb, blood on doorposts, and deliverance from Egypt all typify Christ\'s sacrifice and believers\' redemption. The chapter emphasizes Christ as the Lamb of God.',
          word_count: 3200,
          key_themes: ['Passover', 'Lamb of God', 'Blood Protection', 'Deliverance', 'Exodus Typology'],
          main_scripture_references: ['Exodus 12', 'John 1:29', '1 Corinthians 5:7', '1 Peter 1:18-19'],
          theological_focus: 'Christ our Passover sacrificed for us',
          practical_application: 'Believers are delivered from bondage to sin through Christ\'s blood',
          memorable_quote: 'Behold the Lamb of God, which taketh away the sin of the world',
          chapter_order: 13
        },
        {
          chapter_number: 14,
          title: 'Pentecost and Trumpets',
          summary: 'Examination of Pentecost as the harvest feast and its fulfillment in the outpouring of the Holy Spirit. Brief treatment of the Feast of Trumpets as a warning message and call to preparation. Both feasts have eschatological implications.',
          word_count: 2900,
          key_themes: ['Pentecost', 'Holy Spirit', 'Harvest', 'Trumpets', 'Warning Message'],
          main_scripture_references: ['Leviticus 23:15-25', 'Acts 2', 'Joel 2:28-32', 'Revelation 14:6-12'],
          theological_focus: 'The Holy Spirit empowering the church for mission',
          practical_application: 'Believers need Holy Spirit power for witness and preparation',
          memorable_quote: 'Ye shall receive power, after that the Holy Ghost is come upon you',
          chapter_order: 14
        },
        {
          chapter_number: 15,
          title: 'The Sanctuary in Heaven',
          summary: 'Establishes the reality of the heavenly sanctuary where Christ ministers as High Priest. The chapter refutes symbolic interpretations, arguing for a literal heavenly structure based on Hebrews. Christ\'s ministry in the heavenly sanctuary is central to salvation.',
          word_count: 4500,
          key_themes: ['Heavenly Sanctuary', 'True Tabernacle', 'Christ\'s Ministry', 'Two Apartments', 'Literal vs Symbolic'],
          main_scripture_references: ['Hebrews 8:1-5', 'Hebrews 9:11-14, 23-24', 'Revelation 11:19', 'Revelation 4-5'],
          theological_focus: 'Christ ministers in the true tabernacle not made with hands',
          practical_application: 'Christians can confidently approach God through Christ\'s heavenly ministry',
          memorable_quote: 'We have such a high priest, who is set on the right hand of the throne of the Majesty in the heavens',
          chapter_order: 15
        },
        {
          chapter_number: 16,
          title: 'Prayer',
          summary: 'The altar of incense represents prayer ascending to God, mingled with Christ\'s intercession. The chapter explores the relationship between the believer\'s prayers and Christ\'s priestly ministry. Prayer is essential for maintaining connection with the sanctuary.',
          word_count: 3400,
          key_themes: ['Altar of Incense', 'Prayer', 'Intercession', 'Christ\'s Mediation'],
          main_scripture_references: ['Exodus 30:1-10', 'Revelation 8:3-4', 'Hebrews 4:14-16', 'Luke 1:9-10'],
          theological_focus: 'Prayer ascending with Christ\'s intercession',
          practical_application: 'Believers should pray continually, knowing Christ presents their prayers',
          memorable_quote: 'The smoke of the incense, with the prayers of the saints, ascended before God',
          chapter_order: 16
        },
        {
          chapter_number: 17,
          title: 'The Law',
          summary: 'The Ten Commandments in the ark of the covenant form the foundation of God\'s government and the basis of judgment. The chapter distinguishes between the perpetual moral law and the fulfilled ceremonial law. God\'s law is unchangeable and binding.',
          word_count: 4200,
          key_themes: ['Ten Commandments', 'Moral Law', 'Law in Ark', 'Foundation of Judgment', 'Perpetuity'],
          main_scripture_references: ['Exodus 25:16, 21', 'Ecclesiastes 12:13-14', 'James 2:10-12', 'Romans 3:31'],
          theological_focus: 'God\'s law as the unchanging standard of righteousness',
          practical_application: 'Christians are called to keep God\'s commandments through Christ\'s power',
          memorable_quote: 'Fear God, and keep his commandments: for this is the whole duty of man',
          chapter_order: 17
        },
        {
          chapter_number: 18,
          title: 'The Sabbath',
          summary: 'The Sabbath commandment in the ark connects creation, redemption, and sanctification. The chapter establishes the Sabbath as a sign of God\'s creative and redemptive power, linking it to sanctuary theology. The Sabbath will be central in the final conflict.',
          word_count: 3800,
          key_themes: ['Sabbath', 'Creation Memorial', 'Sign', 'Sanctuary Connection', 'Seal of God'],
          main_scripture_references: ['Exodus 20:8-11', 'Ezekiel 20:12, 20', 'Hebrews 4:9', 'Isaiah 66:22-23'],
          theological_focus: 'The Sabbath as perpetual sign between God and His people',
          practical_application: 'Sabbath observance demonstrates loyalty to God as Creator and Redeemer',
          memorable_quote: 'The Sabbath is a sign between me and you, that ye may know that I am the LORD',
          chapter_order: 18
        },
        {
          chapter_number: 19,
          title: 'The Last Conflict',
          summary: 'Eschatological focus on the final controversy over worship, centered on God\'s law and the Sabbath. The three angels\' messages call people to worship the Creator. The seal of God and mark of the beast represent opposing loyalties.',
          word_count: 4000,
          key_themes: ['Final Conflict', 'Seal of God', 'Mark of Beast', 'Three Angels Messages', 'Worship Crisis'],
          main_scripture_references: ['Revelation 13:15-17', 'Revelation 14:6-12', 'Revelation 7:2-3', 'Daniel 7:25'],
          theological_focus: 'The final test of loyalty will center on worship and God\'s law',
          practical_application: 'Believers must choose now to follow God fully',
          memorable_quote: 'Here is the patience of the saints: here are they that keep the commandments of God',
          chapter_order: 19
        },
        {
          chapter_number: 20,
          title: 'The Last Generation',
          summary: 'Controversial presentation of last generation theology: the final generation will vindicate God\'s character by demonstrating that obedience is possible through Christ. The 144,000 represent this group who live without a mediator after probation closes, proving Satan\'s accusations false.',
          word_count: 5000,
          key_themes: ['Last Generation', 'Character Perfection', 'Vindication', '144,000', 'Without Mediator', 'Satan\'s Defeat'],
          main_scripture_references: ['Revelation 14:1-5', 'Revelation 3:21', 'Malachi 3:1-3', 'Philippians 2:15'],
          theological_focus: 'The last generation vindicates God\'s character before the universe',
          practical_application: 'Christians today should develop character in preparation',
          memorable_quote: 'These are they which follow the Lamb whithersoever he goeth',
          chapter_order: 20
        },
        {
          chapter_number: 21,
          title: 'The Judgment',
          summary: 'Comprehensive treatment of the investigative judgment beginning in 1844. The chapter establishes biblical foundation for pre-advent judgment, explaining the cleansing of the sanctuary, examination of books, and blotting out of sins. Central to Adventist understanding of sanctuary doctrine.',
          word_count: 5200,
          key_themes: ['Investigative Judgment', '1844', '2300 Days', 'Books of Heaven', 'Pre-Advent Judgment', 'Blotting Out Sins'],
          main_scripture_references: ['Daniel 7:9-10', 'Daniel 8:14', 'Revelation 14:6-7', '1 Peter 4:17', 'Acts 3:19'],
          theological_focus: 'Judgment must begin at the house of God before Christ returns',
          practical_application: 'Lives are being examined now; preparation is urgent',
          memorable_quote: 'The hour of his judgment is come',
          chapter_order: 21
        },
        {
          chapter_number: 22,
          title: 'Conclusion',
          summary: 'Summary of the sanctuary doctrine and call to personal application. The sanctuary reveals God\'s character, His plan for dealing with sin, and His desire for relationship with humanity. Christians should study the sanctuary to understand salvation more fully.',
          word_count: 2000,
          key_themes: ['Summary', 'Practical Application', 'Call to Study', 'Hope in Christ'],
          main_scripture_references: ['Hebrews 10:19-22', 'Revelation 21:3'],
          theological_focus: 'The sanctuary culminates in God dwelling eternally with His people',
          practical_application: 'Let us draw near with confidence to the throne of grace',
          memorable_quote: 'Behold, the tabernacle of God is with men, and he will dwell with them',
          chapter_order: 22
        }
      ])
      .select();

    if (chaptersError) throw chaptersError;
    console.log(`Seeded ${chapters?.length} chapters`);

    const chapterMap = new Map(chapters?.map(c => [c.chapter_number, c.id]));

    const { data: scriptures, error: scripturesError } = await supabase
      .from('andreasen_scriptures')
      .insert([
        {
          reference: 'Exodus 25:8',
          book: 'Exodus',
          chapter: 25,
          verse_start: 8,
          text_kjv: 'And let them make me a sanctuary; that I may dwell among them.',
          context_in_book: 'God\'s command to build the sanctuary, establishing His desire to dwell with His people',
          theme_tags: ['Sanctuary Foundation', 'God\'s Presence', 'Divine Command'],
          theological_significance: 'The sanctuary reveals God\'s plan to dwell with humanity',
          related_chapter_ids: [chapterMap.get(0)!, chapterMap.get(2)!],
          citation_count: 5,
          primary_usage: true
        },
        {
          reference: 'Leviticus 16',
          book: 'Leviticus',
          chapter: 16,
          text_kjv: 'Day of Atonement chapter',
          context_in_book: 'Complete description of the Day of Atonement ceremony and sanctuary cleansing',
          theme_tags: ['Day of Atonement', 'Sanctuary Cleansing', 'Two Goats', 'High Priest Ministry'],
          theological_significance: 'Foundation for understanding investigative judgment and final atonement',
          related_chapter_ids: [chapterMap.get(9)!, chapterMap.get(10)!, chapterMap.get(11)!],
          citation_count: 15,
          primary_usage: true
        },
        {
          reference: 'Daniel 8:14',
          book: 'Daniel',
          chapter: 8,
          verse_start: 14,
          text_kjv: 'And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
          context_in_book: 'Prophetic timeframe for the cleansing of the sanctuary, interpreted as 1844',
          theme_tags: ['2300 Days', 'Sanctuary Cleansing', 'Prophecy', '1844', 'Investigative Judgment'],
          theological_significance: 'Key prophetic text establishing the time of investigative judgment',
          related_chapter_ids: [chapterMap.get(9)!, chapterMap.get(21)!],
          citation_count: 10,
          primary_usage: true
        },
        {
          reference: 'Hebrews 8:1-2',
          book: 'Hebrews',
          chapter: 8,
          verse_start: 1,
          verse_end: 2,
          text_kjv: 'Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.',
          context_in_book: 'Establishes the reality of the heavenly sanctuary and Christ\'s high priestly ministry',
          theme_tags: ['Heavenly Sanctuary', 'Christ as High Priest', 'True Tabernacle'],
          theological_significance: 'Foundational text for the reality of the heavenly sanctuary',
          related_chapter_ids: [chapterMap.get(3)!, chapterMap.get(15)!],
          citation_count: 8,
          primary_usage: true
        },
        {
          reference: 'Hebrews 9:22',
          book: 'Hebrews',
          chapter: 9,
          verse_start: 22,
          text_kjv: 'And almost all things are by the law purged with blood; and without shedding of blood is no remission.',
          context_in_book: 'Establishes the necessity of blood for atonement in the sacrificial system',
          theme_tags: ['Blood Atonement', 'Sacrifice', 'Remission of Sin'],
          theological_significance: 'Central principle of atonement theology',
          related_chapter_ids: [chapterMap.get(1)!, chapterMap.get(7)!],
          citation_count: 6,
          primary_usage: true
        },
        {
          reference: 'Revelation 14:6-7',
          book: 'Revelation',
          chapter: 14,
          verse_start: 6,
          verse_end: 7,
          text_kjv: 'And I saw another angel fly in the midst of heaven, having the everlasting gospel to preach unto them that dwell on the earth... saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come',
          context_in_book: 'First angel\'s message proclaiming the hour of judgment',
          theme_tags: ['Judgment Hour', 'Three Angels', 'End Time Message'],
          theological_significance: 'Proclamation of investigative judgment beginning',
          related_chapter_ids: [chapterMap.get(19)!, chapterMap.get(21)!],
          citation_count: 7,
          primary_usage: true
        },
        {
          reference: 'Revelation 14:1-5',
          book: 'Revelation',
          chapter: 14,
          verse_start: 1,
          verse_end: 5,
          text_kjv: '144,000 description',
          context_in_book: 'Description of the 144,000 who follow the Lamb and have their Father\'s name in foreheads',
          theme_tags: ['144,000', 'Last Generation', 'Character Perfection', 'Vindication'],
          theological_significance: 'The final generation that vindicates God\'s character',
          related_chapter_ids: [chapterMap.get(20)!],
          citation_count: 5,
          primary_usage: true
        }
      ])
      .select();

    if (scripturesError) throw scripturesError;
    console.log(`Seeded ${scriptures?.length} key scriptures`);

    const { data: concepts, error: conceptsError } = await supabase
      .from('andreasen_theological_concepts')
      .insert([
        {
          name: 'Investigative Judgment',
          category: 'Eschatology',
          definition: 'A pre-advent judgment beginning in 1844 when Christ entered the Most Holy Place of the heavenly sanctuary to review the cases of all who have professed faith in God. This judgment determines who will be saved and vindicates God\'s character before the universe.',
          biblical_foundation: ['Daniel 7:9-10', 'Daniel 8:14', 'Revelation 14:6-7', '1 Peter 4:17', 'Acts 3:19'],
          chapter_references: [chapterMap.get(9)!, chapterMap.get(21)!],
          related_scriptures: ['Daniel 8:14', 'Revelation 14:6-7'],
          significance: 'Central to Adventist understanding of end-time events and Christ\'s high priestly ministry',
          adventist_distinctive: true,
          controversy_level: 'high'
        },
        {
          name: 'Sanctuary Cleansing',
          category: 'Soteriology',
          definition: 'The removal of sin records from the heavenly sanctuary, typified by the Day of Atonement ceremony. Through the year, confessed sins were transferred to the sanctuary via blood; on the Day of Atonement, these sins were removed, cleansing the sanctuary.',
          biblical_foundation: ['Leviticus 16', 'Daniel 8:14', 'Hebrews 9:23'],
          chapter_references: [chapterMap.get(9)!, chapterMap.get(21)!],
          related_scriptures: ['Daniel 8:14', 'Leviticus 16'],
          significance: 'Explains the work of Christ in the heavenly sanctuary and the blotting out of sins',
          adventist_distinctive: true,
          controversy_level: 'high'
        },
        {
          name: 'Two-Phase Atonement',
          category: 'Soteriology',
          definition: 'The concept that atonement has two phases: the daily ministry (continual forgiveness and intercession) and the yearly ministry (final judgment and sin eradication). Both phases are necessary for complete redemption.',
          biblical_foundation: ['Leviticus 16', 'Hebrews 9:1-28'],
          chapter_references: [chapterMap.get(9)!, chapterMap.get(15)!],
          related_scriptures: ['Leviticus 16', 'Hebrews 9:23'],
          significance: 'Distinguishes between ongoing forgiveness and final disposition of sin',
          adventist_distinctive: true,
          controversy_level: 'medium'
        },
        {
          name: 'Last Generation Theology',
          category: 'Eschatology',
          definition: 'The teaching that the final generation of believers will vindicate God\'s character by demonstrating that obedience to God\'s law is possible through Christ\'s power. They will live without a mediator after probation closes, proving Satan\'s accusations false.',
          biblical_foundation: ['Revelation 14:1-5', 'Revelation 3:21', 'Malachi 3:1-3', 'Philippians 2:15'],
          chapter_references: [chapterMap.get(20)!],
          related_scriptures: ['Revelation 14:1-5'],
          significance: 'Emphasizes character development and the cosmic controversy',
          adventist_distinctive: true,
          controversy_level: 'high'
        },
        {
          name: 'Scapegoat Theology',
          category: 'Soteriology',
          definition: 'The interpretation that the scapegoat (Azazel) represents Satan, not Christ. While Christ bears sin for atonement, Satan ultimately bears responsibility for originating sin. This occurs after the sanctuary is cleansed.',
          biblical_foundation: ['Leviticus 16:8-10, 20-22', 'Revelation 20:10', 'Ezekiel 28:18-19'],
          chapter_references: [chapterMap.get(10)!, chapterMap.get(11)!],
          related_scriptures: ['Leviticus 16:8-10'],
          significance: 'Explains the complete eradication of sin from the universe',
          adventist_distinctive: true,
          controversy_level: 'high'
        },
        {
          name: 'Substitutionary Atonement',
          category: 'Soteriology',
          definition: 'The doctrine that Christ died as a substitute for sinners, bearing the penalty of sin in their place. The sacrificial system illustrated this principle through the death of the innocent victim.',
          biblical_foundation: ['Leviticus 1-7', 'Isaiah 53', '2 Corinthians 5:21', 'Hebrews 9:22'],
          chapter_references: [chapterMap.get(1)!, chapterMap.get(4)!, chapterMap.get(7)!],
          related_scriptures: ['Hebrews 9:22'],
          significance: 'Foundation of Christian soteriology',
          adventist_distinctive: false,
          controversy_level: 'low'
        },
        {
          name: 'Typology',
          category: 'Hermeneutics',
          definition: 'The interpretive method that sees Old Testament persons, events, and institutions as types pointing forward to their fulfillment (antitypes) in Christ and the gospel. The sanctuary service is the supreme example of biblical typology.',
          biblical_foundation: ['Hebrews 8:5', 'Hebrews 9:23-24', 'Colossians 2:16-17', '1 Corinthians 10:11'],
          chapter_references: [chapterMap.get(0)!, chapterMap.get(1)!, chapterMap.get(15)!],
          related_scriptures: ['Hebrews 8:1-2'],
          significance: 'Essential hermeneutical key for understanding sanctuary doctrine',
          adventist_distinctive: false,
          controversy_level: 'low'
        },
        {
          name: 'Heavenly Sanctuary Reality',
          category: 'Theology Proper',
          definition: 'The teaching that the heavenly sanctuary is a literal reality where Christ ministers as High Priest, not merely a symbolic concept. The earthly sanctuary was patterned after this heavenly reality.',
          biblical_foundation: ['Hebrews 8:1-5', 'Hebrews 9:11-12, 23-24', 'Revelation 11:19', 'Revelation 4-5'],
          chapter_references: [chapterMap.get(15)!],
          related_scriptures: ['Hebrews 8:1-2'],
          significance: 'Establishes the ongoing reality of Christ\'s high priestly ministry',
          adventist_distinctive: true,
          controversy_level: 'medium'
        }
      ])
      .select();

    if (conceptsError) throw conceptsError;
    console.log(`Seeded ${concepts?.length} theological concepts`);

    const conceptMap = new Map(concepts?.map(c => [c.name, c.id]));

    const { data: relationships, error: relationshipsError } = await supabase
      .from('andreasen_concept_relationships')
      .insert([
        {
          concept_a_id: conceptMap.get('Investigative Judgment')!,
          concept_b_id: conceptMap.get('Sanctuary Cleansing')!,
          relationship_type: 'related',
          description: 'Investigative judgment occurs during the sanctuary cleansing',
          strength: 'strong'
        },
        {
          concept_a_id: conceptMap.get('Two-Phase Atonement')!,
          concept_b_id: conceptMap.get('Sanctuary Cleansing')!,
          relationship_type: 'builds_upon',
          description: 'Sanctuary cleansing is the second phase of atonement',
          strength: 'strong'
        },
        {
          concept_a_id: conceptMap.get('Last Generation Theology')!,
          concept_b_id: conceptMap.get('Investigative Judgment')!,
          relationship_type: 'related',
          description: 'Last generation lives during and after investigative judgment',
          strength: 'medium'
        },
        {
          concept_a_id: conceptMap.get('Scapegoat Theology')!,
          concept_b_id: conceptMap.get('Sanctuary Cleansing')!,
          relationship_type: 'related',
          description: 'Scapegoat ceremony occurs after sanctuary cleansing',
          strength: 'strong'
        },
        {
          concept_a_id: conceptMap.get('Typology')!,
          concept_b_id: conceptMap.get('Substitutionary Atonement')!,
          relationship_type: 'prerequisite',
          description: 'Typological method reveals substitutionary atonement in sanctuary',
          strength: 'strong'
        },
        {
          concept_a_id: conceptMap.get('Heavenly Sanctuary Reality')!,
          concept_b_id: conceptMap.get('Investigative Judgment')!,
          relationship_type: 'prerequisite',
          description: 'Investigative judgment occurs in the heavenly sanctuary',
          strength: 'strong'
        }
      ])
      .select();

    if (relationshipsError) throw relationshipsError;
    console.log(`Seeded ${relationships?.length} concept relationships`);

    const { data: illustrations, error: illustrationsError } = await supabase
      .from('andreasen_illustrations')
      .insert([
        {
          title: 'Sanctuary Floor Plan',
          type: 'diagram',
          description: 'Three-section layout of the sanctuary: outer court, holy place, and most holy place with furniture placement',
          chapter_id: chapterMap.get(2)!,
          caption: 'The earthly sanctuary pattern',
          theological_purpose: 'Illustrate the three-stage progression in God\'s plan of salvation',
          display_order: 1
        },
        {
          title: 'Five Offerings Table',
          type: 'chart',
          description: 'Comparative table showing the five Levitical offerings with their purposes, rituals, and Christ fulfillment',
          chapter_id: chapterMap.get(1)!,
          caption: 'The five offerings and their significance',
          theological_purpose: 'Systematize the offerings and their typological meanings',
          display_order: 2
        },
        {
          title: 'Day of Atonement Ceremony Flow',
          type: 'flowchart',
          description: 'Step-by-step process of the Day of Atonement ritual with two goats',
          chapter_id: chapterMap.get(9)!,
          caption: 'The annual Day of Atonement ceremony',
          theological_purpose: 'Clarify the complex Day of Atonement ritual and its prophetic significance',
          display_order: 3
        },
        {
          title: '2300 Days Prophecy Timeline',
          type: 'timeline',
          description: 'Prophetic timeline from 457 BC to 1844 AD showing the 2300 day/year prophecy',
          chapter_id: chapterMap.get(21)!,
          caption: 'The prophetic timeline to 1844',
          theological_purpose: 'Demonstrate the prophetic calculation of sanctuary cleansing',
          display_order: 4
        },
        {
          title: 'Two Goats Comparison',
          type: 'diagram',
          description: 'Side-by-side comparison of the Lord\'s goat (Christ) and scapegoat (Satan)',
          chapter_id: chapterMap.get(11)!,
          caption: 'The two goats of Leviticus 16',
          theological_purpose: 'Clarify the distinction between Christ and Satan in sin-bearing',
          display_order: 5
        },
        {
          title: 'Annual Feast Calendar',
          type: 'timeline',
          description: 'Calendar showing seven annual feasts with spring and fall groupings',
          chapter_id: chapterMap.get(12)!,
          caption: 'The annual ceremonial calendar',
          theological_purpose: 'Show prophetic fulfillment pattern in feast cycle',
          display_order: 6
        }
      ])
      .select();

    if (illustrationsError) throw illustrationsError;
    console.log(`Seeded ${illustrations?.length} illustrations`);

    const { data: timeline, error: timelineError } = await supabase
      .from('andreasen_timeline_events')
      .insert([
        {
          event_name: 'Exodus from Egypt',
          date_or_year: '1446 BC',
          category: 'historical',
          description: 'Israel delivered from Egypt and receives sanctuary instructions at Sinai',
          scripture_references: ['Exodus 12', 'Exodus 25-40'],
          prophetic_significance: 'Type of spiritual deliverance through Christ',
          chapter_references: [chapterMap.get(2)!, chapterMap.get(13)!],
          timeline_position: 1,
          is_past: true
        },
        {
          event_name: 'Solomon\'s Temple Built',
          date_or_year: '966 BC',
          category: 'historical',
          description: 'Solomon builds permanent temple in Jerusalem',
          scripture_references: ['1 Kings 6'],
          chapter_references: [chapterMap.get(2)!],
          timeline_position: 2,
          is_past: true
        },
        {
          event_name: 'Christ\'s First Advent',
          date_or_year: '4 BC - 31 AD',
          category: 'typological',
          description: 'Christ fulfills spring feast prophecies: Passover (crucifixion), Firstfruits (resurrection), Pentecost (Holy Spirit)',
          scripture_references: ['John 1:29', '1 Corinthians 15:20', 'Acts 2'],
          prophetic_significance: 'Fulfillment of all sacrificial types',
          chapter_references: [chapterMap.get(13)!, chapterMap.get(14)!],
          timeline_position: 3,
          is_past: true
        },
        {
          event_name: 'Cleansing of Heavenly Sanctuary Begins',
          date_or_year: '1844',
          category: 'prophetic',
          description: 'End of 2300 day prophecy; Christ enters Most Holy Place to begin investigative judgment',
          scripture_references: ['Daniel 8:14', 'Revelation 14:6-7'],
          prophetic_significance: 'Beginning of final phase of atonement and judgment',
          chapter_references: [chapterMap.get(9)!, chapterMap.get(21)!],
          timeline_position: 4,
          is_past: true
        },
        {
          event_name: 'Investigative Judgment',
          date_or_year: '1844 - Present',
          category: 'eschatological',
          description: 'Christ reviews cases of all professed believers in preparation for His return',
          scripture_references: ['Daniel 7:9-10', 'Revelation 14:6-7'],
          prophetic_significance: 'Current phase of salvation history',
          chapter_references: [chapterMap.get(21)!],
          timeline_position: 5,
          is_past: false,
          is_present: true,
          is_future: false
        },
        {
          event_name: 'Close of Probation',
          date_or_year: 'Future',
          category: 'eschatological',
          description: 'End of intercessory ministry; investigative judgment concludes',
          scripture_references: ['Revelation 22:11-12', 'Revelation 15:8'],
          prophetic_significance: 'Determines eternal destinies',
          chapter_references: [chapterMap.get(20)!, chapterMap.get(21)!],
          timeline_position: 6,
          is_past: false,
          is_present: false,
          is_future: true
        },
        {
          event_name: 'Second Coming',
          date_or_year: 'Future',
          category: 'eschatological',
          description: 'Christ returns to gather His people and execute judgment on the wicked',
          scripture_references: ['1 Thessalonians 4:16-17', 'Revelation 19:11-16'],
          prophetic_significance: 'Culmination of sanctuary ministry',
          chapter_references: [chapterMap.get(19)!, chapterMap.get(20)!],
          timeline_position: 7,
          is_past: false,
          is_present: false,
          is_future: true
        },
        {
          event_name: 'Millennium',
          date_or_year: 'Future - 1000 years',
          category: 'eschatological',
          description: 'Saints reign with Christ in heaven; Satan bound on earth',
          scripture_references: ['Revelation 20:1-6'],
          chapter_references: [chapterMap.get(10)!],
          timeline_position: 8,
          is_past: false,
          is_present: false,
          is_future: true
        },
        {
          event_name: 'Final Judgment and Sin Eradication',
          date_or_year: 'Future - After Millennium',
          category: 'eschatological',
          description: 'Executive judgment on the wicked; Satan bears final responsibility (scapegoat fulfillment); sin permanently destroyed',
          scripture_references: ['Revelation 20:7-15', 'Malachi 4:1'],
          prophetic_significance: 'Complete fulfillment of Day of Atonement',
          chapter_references: [chapterMap.get(10)!, chapterMap.get(11)!],
          timeline_position: 9,
          is_past: false,
          is_present: false,
          is_future: true
        },
        {
          event_name: 'New Earth',
          date_or_year: 'Eternity',
          category: 'eschatological',
          description: 'God dwells with His people forever; sanctuary fulfilled',
          scripture_references: ['Revelation 21:1-4', 'Revelation 21:22'],
          prophetic_significance: 'Ultimate fulfillment of sanctuary purpose',
          chapter_references: [chapterMap.get(22)!],
          timeline_position: 10,
          is_past: false,
          is_present: false,
          is_future: true
        }
      ])
      .select();

    if (timelineError) throw timelineError;
    console.log(`Seeded ${timeline?.length} timeline events`);

    const { data: questions, error: questionsError } = await supabase
      .from('andreasen_study_questions')
      .insert([
        {
          chapter_id: chapterMap.get(1)!,
          question_text: 'What do the five offerings reveal about different aspects of Christ\'s atoning work?',
          question_type: 'analysis',
          scripture_references: ['Leviticus 1-7'],
          difficulty_level: 'medium',
          discussion_prompt: true,
          question_order: 1
        },
        {
          chapter_id: chapterMap.get(9)!,
          question_text: 'How does the Day of Atonement ceremony illustrate the investigative judgment?',
          question_type: 'synthesis',
          scripture_references: ['Leviticus 16', 'Daniel 8:14'],
          difficulty_level: 'hard',
          discussion_prompt: true,
          question_order: 1
        },
        {
          chapter_id: chapterMap.get(10)!,
          question_text: 'What is the difference between Christ bearing sin and Satan bearing sin?',
          question_type: 'analysis',
          scripture_references: ['Leviticus 16:8-22', 'Revelation 20:10'],
          difficulty_level: 'hard',
          discussion_prompt: true,
          question_order: 1
        },
        {
          chapter_id: chapterMap.get(15)!,
          question_text: 'What evidence does Hebrews provide for a literal heavenly sanctuary?',
          question_type: 'analysis',
          scripture_references: ['Hebrews 8:1-5', 'Hebrews 9:23-24'],
          difficulty_level: 'medium',
          discussion_prompt: false,
          question_order: 1
        },
        {
          chapter_id: chapterMap.get(20)!,
          question_text: 'How does last generation theology relate to the cosmic controversy?',
          question_type: 'synthesis',
          scripture_references: ['Revelation 14:1-5', 'Revelation 3:21'],
          difficulty_level: 'hard',
          discussion_prompt: true,
          question_order: 1
        },
        {
          chapter_id: chapterMap.get(21)!,
          question_text: 'Why must judgment begin at the house of God before Christ returns?',
          question_type: 'reflection',
          scripture_references: ['1 Peter 4:17', 'Daniel 7:9-10'],
          difficulty_level: 'medium',
          discussion_prompt: true,
          question_order: 1
        }
      ])
      .select();

    if (questionsError) throw questionsError;
    console.log(`Seeded ${questions?.length} study questions`);

    console.log('Andreasen book seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding Andreasen book:', error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedAndreasenBook()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export default seedAndreasenBook;
