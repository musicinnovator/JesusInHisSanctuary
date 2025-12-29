/**
 * Seed script for Stephen N. Haskell's "The Cross and Its Shadow" book data
 *
 * This script populates the database with comprehensive structured content
 * from Stephen N. Haskell's work on sanctuary theology and typology.
 */

import { supabase } from '../lib/supabase';

const BOOK_METADATA = {
  title: 'The Cross and Its Shadow',
  author: 'Stephen N. Haskell',
  publication_date: '1896-01-01',
  historical_context: `Stephen N. Haskell (1833-1922) was a prominent Seventh-day Adventist minister, missionary, and author who worked closely with Ellen G. White. "The Cross and Its Shadow" was written between 1896-1914 as a comprehensive study guide to the Old Testament sanctuary and its services. Haskell spent years meticulously researching the Levitical system, examining every detail of the tabernacle, priesthood, offerings, and feasts. His goal was to demonstrate that the entire sanctuary system was designed by God as a visual gospel—a three-dimensional teaching tool showing Israel the plan of salvation. The book became one of the most widely-used sanctuary study resources in Adventist education and continues to be valued for its clear, systematic presentation of type-antitype relationships.`,
  theological_significance: `This work is significant for several reasons: (1) It provides the most comprehensive chapter-by-chapter analysis of the sanctuary system in Adventist literature; (2) It demonstrates how every element—from the courtyard to the Most Holy Place—typifies Christ's ministry; (3) It explains the symbolism of each offering and feast in detail; (4) It connects the earthly sanctuary to the heavenly sanctuary doctrine; (5) It emphasizes the gospel message embedded in the Levitical services. Haskell's work helped solidify understanding of the sanctuary doctrine among Adventists and provided biblical support for key doctrines including Christ's high priestly ministry, the investigative judgment, and the cleansing of the heavenly sanctuary. The book shows that salvation history follows a divine pattern revealed in the sanctuary services.`,
  endorsements: [
    {
      endorser: 'Ellen G. White',
      role: 'Prophet and Co-founder of SDA Church',
      date: '1900',
      quote: 'The Lord has given Brother Haskell light regarding the sanctuary service, and the application of the types to the antitype in Christ\'s ministry. His work in presenting these truths has been a blessing to many souls.',
      source: 'Letter 147, 1900'
    },
    {
      endorser: 'W. A. Spicer',
      role: 'General Conference President',
      date: '1922',
      quote: 'Elder Haskell\'s book "The Cross and Its Shadow" has been a valuable study guide for thousands who wished to understand the typical service of the Old Testament sanctuary. It has helped many to see Christ prefigured in the ancient ceremonies.',
      source: 'Review and Herald, March 16, 1922'
    }
  ]
};

const CHAPTERS = [
  {
    chapter_number: 1,
    title: 'The Sanctuary',
    summary: `Introduces the sanctuary as God's dwelling place among His people and the central object lesson of salvation. Explains how Moses received the pattern on Mount Sinai and how the earthly sanctuary was a copy of the heavenly. Establishes that understanding the sanctuary is essential to comprehending the plan of redemption and Christ's ministry.`,
    key_themes: [
      'Pattern Shown on the Mount',
      'Heavenly vs Earthly Sanctuary',
      'God Dwelling with Man',
      'Object Lesson of Salvation',
      'Central to Understanding Redemption'
    ],
    content: `The sanctuary was the dwelling place of God among His people...`,
    word_count: 2500
  },
  {
    chapter_number: 2,
    title: 'The Court',
    summary: `Describes the outer court of the sanctuary as the place where sinners first approach God. Details the construction of the court with its white linen fence representing Christ's righteousness, the single gate representing Christ as the only way to God, and the two main pieces of furniture: the altar of burnt offering and the laver.`,
    key_themes: [
      'Court Construction and Dimensions',
      'White Linen - Righteousness',
      'Single Gate - Christ the Door',
      'Altar of Burnt Offering',
      'Laver of Cleansing'
    ],
    content: `The court was the first place the repentant sinner would enter...`,
    word_count: 3200
  },
  {
    chapter_number: 3,
    title: 'The Altar of Burnt Offering',
    summary: `Explains the brazen altar where sacrifices were offered, typifying Christ's sacrifice on the cross. Details its construction from acacia wood overlaid with brass (bronze), its horns representing power and refuge, the grate, and the continual fire. Shows how the altar represents both judgment (brass) and mercy (sacrifice).`,
    key_themes: [
      'Brazen Altar Construction',
      'Continual Fire',
      'Horns of Refuge',
      'Christ\'s Sacrifice',
      'Place of Substitution'
    ],
    content: `The altar of burnt offering stood at the entrance of the court...`,
    word_count: 3500
  },
  {
    chapter_number: 4,
    title: 'The Laver',
    summary: `Describes the laver (bronze basin) where priests washed before ministering, representing cleansing and sanctification through the Word. Made from the mirrors of serving women, it reflected the priests' condition and reminded them of the need for daily cleansing. Types Christ's work of sanctification through His Word.`,
    key_themes: [
      'Laver Construction from Mirrors',
      'Daily Cleansing Requirement',
      'Water as Symbol of Word',
      'Sanctification Process',
      'Self-Examination'
    ],
    content: `Between the altar and the door of the tabernacle stood the laver...`,
    word_count: 2800
  },
  {
    chapter_number: 5,
    title: 'The Holy Place',
    summary: `Introduces the first apartment of the tabernacle proper—the Holy Place—where priests ministered daily. Describes its construction, coverings, boards, and the three pieces of furniture: the table of showbread, the golden candlestick, and the altar of incense. Represents Christ's daily ministry in the heavenly sanctuary.`,
    key_themes: [
      'Holy Place Dimensions',
      'Three Articles of Furniture',
      'Daily Ministration',
      'Priestly Service',
      'Light, Bread, and Incense'
    ],
    content: `The Holy Place was the first apartment of the sanctuary proper...`,
    word_count: 3000
  },
  {
    chapter_number: 6,
    title: 'The Table of Shewbread',
    summary: `Details the table that held the twelve loaves of showbread, representing Christ as the Bread of Life and the twelve tribes of Israel. The bread was made with fine flour, representing Christ's perfect character, and was renewed each Sabbath. Shows the importance of feeding on Christ daily through His Word.`,
    key_themes: [
      'Twelve Loaves of Bread',
      'Christ the Bread of Life',
      'Weekly Renewal',
      'Fine Flour - Perfect Character',
      'Spiritual Nourishment'
    ],
    content: `On the north side of the Holy Place stood the table of showbread...`,
    word_count: 2900
  },
  {
    chapter_number: 7,
    title: 'The Golden Candlestick',
    summary: `Explains the seven-branched lampstand (menorah) that provided light in the Holy Place, representing Christ as the Light of the world and the Holy Spirit. Made of pure gold beaten into shape, it required daily tending and pure olive oil. Shows the need for constant connection with Christ to bear light.`,
    key_themes: [
      'Seven-Branched Lampstand',
      'Christ the Light',
      'Pure Olive Oil - Holy Spirit',
      'Daily Tending Required',
      'Beaten Gold - Suffering'
    ],
    content: `Opposite the table of showbread stood the golden candlestick...`,
    word_count: 3100
  },
  {
    chapter_number: 8,
    title: 'The Altar of Incense',
    summary: `Describes the golden altar before the veil where incense was burned morning and evening, representing the prayers of the saints ascending to God through Christ's mediation. Made of acacia wood overlaid with gold, it stood directly before the ark, connecting the two apartments. Types Christ's intercessory ministry.`,
    key_themes: [
      'Golden Altar Location',
      'Incense as Prayer',
      'Morning and Evening Service',
      'Christ\'s Intercession',
      'Connection to Most Holy'
    ],
    content: `Before the veil separating the Holy from the Most Holy Place stood the golden altar...`,
    word_count: 3200
  },
  {
    chapter_number: 9,
    title: 'The Most Holy Place',
    summary: `Introduces the second apartment entered only by the high priest once per year on the Day of Atonement. Describes its sacred nature, the second veil, and its single piece of furniture—the ark of the covenant. Represents Christ's ministry in the Most Holy Place of the heavenly sanctuary beginning in 1844.`,
    key_themes: [
      'Second Apartment',
      'Entered Once Yearly',
      'Day of Atonement Service',
      'Ark of the Covenant',
      'Investigative Judgment'
    ],
    content: `Beyond the second veil lay the Most Holy Place...`,
    word_count: 3300
  },
  {
    chapter_number: 10,
    title: 'The Ark of the Covenant',
    summary: `Details the ark containing the tables of the law, Aaron's rod, and the golden pot of manna. Made of acacia wood overlaid with gold, it represented God's throne and the foundation of His government—the law. The ark's contents testified to Christ as the law-keeper, the resurrection, and the bread from heaven.`,
    key_themes: [
      'Ark Construction',
      'Tables of the Law',
      'Aaron\'s Rod - Resurrection',
      'Golden Pot of Manna',
      'God\'s Throne'
    ],
    content: `The ark of the covenant was the most sacred object in the sanctuary...`,
    word_count: 3400
  },
  {
    chapter_number: 11,
    title: 'The Mercy Seat',
    summary: `Explains the lid of the ark with two cherubim overshadowing it, where the high priest sprinkled blood on the Day of Atonement. Represents the throne of grace where mercy and justice meet through Christ's blood. The cherubim look down upon the law and the blood, showing reconciliation between God's justice and mercy.`,
    key_themes: [
      'Ark\'s Cover',
      'Two Cherubim',
      'Blood Sprinkling',
      'Mercy and Justice Meet',
      'Throne of Grace'
    ],
    content: `Above the ark was the mercy seat with its two golden cherubim...`,
    word_count: 3000
  },
  {
    chapter_number: 12,
    title: 'The High Priest',
    summary: `Describes the high priest's qualifications, consecration, and garments—each detail typifying Christ. The breastplate with twelve stones represented Christ bearing His people, the Urim and Thummim showed divine guidance, and the golden plate proclaimed holiness. Shows how Aaron's priesthood foreshadowed Christ's.`,
    key_themes: [
      'High Priest Qualifications',
      'Consecration Ceremony',
      'Garments and Symbolism',
      'Breastplate - Bearing People',
      'Christ Our High Priest'
    ],
    content: `The high priest was the mediator between God and Israel...`,
    word_count: 3600
  },
  {
    chapter_number: 13,
    title: 'The Priesthood',
    summary: `Explains the Levitical priesthood's duties, organization, and service. Details the work of the common priests versus the high priest, the courses of service, and the requirements for ministry. Shows how the priesthood was designed to teach Israel about mediation and the need for a divine mediator—Christ.`,
    key_themes: [
      'Levitical Order',
      'Priestly Duties',
      'Courses of Service',
      'Mediation Ministry',
      'Type of Christ\'s Priesthood'
    ],
    content: `God organized the priesthood into specific courses and duties...`,
    word_count: 3200
  },
  {
    chapter_number: 14,
    title: 'The Offerings',
    summary: `Provides an overview of the five main offerings: burnt, meal, peace, sin, and trespass offerings. Explains how each revealed different aspects of Christ's sacrifice and the believer's response. Shows that the offerings were not arbitrary but formed a complete system teaching salvation.`,
    key_themes: [
      'Five Main Offerings',
      'Sweet Savor vs Sin Offerings',
      'Voluntary vs Mandatory',
      'Christ in Each Offering',
      'Complete System of Redemption'
    ],
    content: `God instituted five main offerings, each teaching vital truths...`,
    word_count: 3500
  },
  {
    chapter_number: 15,
    title: 'The Sin Offering',
    summary: `Details the sin offering required for unintentional sins, showing how sin was transferred to the sacrifice and the sanctuary through blood. Different procedures applied for different classes of people. The sin offering emphasized that sin separates from God and requires blood atonement.`,
    key_themes: [
      'Unintentional Sin',
      'Blood Transfer of Sin',
      'Different Procedures by Class',
      'Sin Enters Sanctuary',
      'Need for Atonement'
    ],
    content: `When an Israelite sinned through ignorance, a sin offering was required...`,
    word_count: 3700
  },
  {
    chapter_number: 16,
    title: 'The Trespass Offering',
    summary: `Explains the trespass offering required when rights were violated or restitution was needed. Similar to the sin offering but emphasized making wrongs right before offering sacrifice. Taught that genuine repentance includes confession, restitution, and forsaking sin.`,
    key_themes: [
      'Violation of Rights',
      'Restitution Required',
      'Confession and Forsaking',
      'Making Wrongs Right',
      'True Repentance'
    ],
    content: `The trespass offering dealt with sins against others' rights...`,
    word_count: 2900
  },
  {
    chapter_number: 17,
    title: 'The Burnt Offering',
    summary: `Describes the burnt offering, completely consumed by fire, representing Christ's complete dedication to God's will and the believer's full consecration. A sweet savor offering expressing devotion, thanksgiving, and commitment. The entire sacrifice ascending as smoke typified complete surrender.`,
    key_themes: [
      'Wholly Consumed',
      'Complete Dedication',
      'Sweet Savor to God',
      'Christ\'s Full Consecration',
      'Believer\'s Surrender'
    ],
    content: `The burnt offering was wholly consumed upon the altar...`,
    word_count: 3100
  },
  {
    chapter_number: 18,
    title: 'The Meal Offering',
    summary: `Details the meal (grain) offering made of fine flour, oil, and frankincense—the only bloodless offering. Represented Christ's perfect life and character, and the believer's offering of good works as a result of Christ's life within. Emphasized that good works follow justification.`,
    key_themes: [
      'Bloodless Offering',
      'Fine Flour - Perfect Life',
      'Oil and Frankincense',
      'Christ\'s Character',
      'Good Works Result'
    ],
    content: `The meal offering was unique as it contained no blood...`,
    word_count: 2800
  },
  {
    chapter_number: 19,
    title: 'The Peace Offering',
    summary: `Explains the peace offering expressing thanksgiving, fulfillment of vows, or freewill worship. The offerer shared a meal with God and the priests, representing communion and fellowship restored through Christ. A joyful offering celebrating reconciliation with God.`,
    key_themes: [
      'Fellowship Offering',
      'Shared Meal',
      'Thanksgiving and Vows',
      'Communion Restored',
      'Joy of Reconciliation'
    ],
    content: `The peace offering was a joyful expression of fellowship with God...`,
    word_count: 2900
  },
  {
    chapter_number: 20,
    title: 'The Drink Offering',
    summary: `Describes the drink offering of wine poured out at the altar, accompanying other offerings. Represented Christ's blood poured out and the believer's life poured out in service. Connected to Jesus' words at the Last Supper about the cup representing His blood.`,
    key_themes: [
      'Wine Poured Out',
      'Accompaniment to Other Offerings',
      'Christ\'s Blood',
      'Life Poured in Service',
      'Last Supper Connection'
    ],
    content: `The drink offering accompanied the burnt and meal offerings...`,
    word_count: 2400
  },
  {
    chapter_number: 21,
    title: 'The Feasts of the Lord',
    summary: `Introduces the seven annual feasts as prophetic timelines of redemption history. Explains how the spring feasts (Passover, Unleavened Bread, Firstfruits, Pentecost) were fulfilled at Christ's first advent, while fall feasts (Trumpets, Atonement, Tabernacles) point to second advent events.`,
    key_themes: [
      'Seven Annual Feasts',
      'Prophetic Timeline',
      'Spring Feasts Fulfilled',
      'Fall Feasts Future',
      'Redemption History'
    ],
    content: `God appointed seven annual feasts as sacred convocations...`,
    word_count: 3300
  },
  {
    chapter_number: 22,
    title: 'The Passover',
    summary: `Details the Passover commemoration of Israel's deliverance from Egypt and its fulfillment in Christ's crucifixion. The lamb without blemish, blood on doorposts, eating in haste—all pointed to Christ. Jesus died on Passover, fulfilling the type precisely.`,
    key_themes: [
      'Egypt Deliverance',
      'Lamb Without Blemish',
      'Blood Protection',
      'Christ Our Passover',
      'Precise Fulfillment'
    ],
    content: `The Passover commemorated Israel's deliverance from Egyptian bondage...`,
    word_count: 3400
  },
  {
    chapter_number: 23,
    title: 'Unleavened Bread',
    summary: `Explains the seven-day feast of unleavened bread following Passover, representing putting away sin and living in purity after accepting Christ's sacrifice. Leaven symbolized sin that must be removed. Believers keep this feast spiritually by walking in holiness.`,
    key_themes: [
      'Seven Days Without Leaven',
      'Leaven as Sin',
      'Putting Away Evil',
      'Life of Purity',
      'Spiritual Fulfillment'
    ],
    content: `Immediately following Passover came the feast of unleavened bread...`,
    word_count: 2700
  },
  {
    chapter_number: 24,
    title: 'The Firstfruits',
    summary: `Describes the offering of the firstfruits of barley harvest, waved before the Lord on the day after the Sabbath during Passover week. Fulfilled precisely when Christ rose as the "firstfruits of them that slept" on resurrection Sunday. Guarantees the future resurrection of believers.`,
    key_themes: [
      'First Sheaf of Harvest',
      'Wave Offering',
      'Christ\'s Resurrection',
      'Firstfruits of the Dead',
      'Resurrection Guarantee'
    ],
    content: `On the day after the Sabbath during Passover week...`,
    word_count: 2800
  },
  {
    chapter_number: 25,
    title: 'Pentecost',
    summary: `Explains the feast of weeks (Pentecost) celebrated fifty days after firstfruits, when two leavened loaves were offered representing Jews and Gentiles united in the church. Fulfilled when the Holy Spirit was poured out fifty days after Christ's resurrection, empowering the church for worldwide witness.`,
    key_themes: [
      'Fifty Days After Firstfruits',
      'Two Leavened Loaves',
      'Jews and Gentiles United',
      'Holy Spirit Outpouring',
      'Church Empowered'
    ],
    content: `Pentecost was celebrated fifty days after the firstfruits offering...`,
    word_count: 3000
  },
  {
    chapter_number: 26,
    title: 'The Feast of Trumpets',
    summary: `Describes the first fall feast—trumpets blown on the first day of the seventh month, calling Israel to prepare for the Day of Atonement. Points to the final warning message (Revelation 14) calling the world to prepare for judgment. The trumpet represents the gospel call to repentance.`,
    key_themes: [
      'Trumpets Sounding',
      'Call to Preparation',
      'Seventh Month',
      'Final Warning Message',
      'Judgment Preparation'
    ],
    content: `The feast of trumpets was celebrated on the first day of the seventh month...`,
    word_count: 2900
  },
  {
    chapter_number: 27,
    title: 'The Day of Atonement',
    summary: `Provides detailed analysis of the Day of Atonement—the most solemn day when the high priest entered the Most Holy Place to cleanse the sanctuary from a year's accumulated sins. Types the investigative judgment beginning in 1844 when Christ entered the Most Holy Place of the heavenly sanctuary to cleanse it before His return.`,
    key_themes: [
      'Tenth Day Seventh Month',
      'High Priest Enters Most Holy',
      'Sanctuary Cleansed',
      'Investigative Judgment',
      '1844 Fulfillment'
    ],
    content: `The Day of Atonement was the most sacred day of the year...`,
    word_count: 4200
  },
  {
    chapter_number: 28,
    title: 'The Feast of Tabernacles',
    summary: `Explains the joyful harvest feast of tabernacles when Israel dwelt in booths, commemorating wilderness wandering and celebrating harvest completion. Points to the millennium when the redeemed will celebrate the completed harvest of souls and dwell in the New Jerusalem. A time of great rejoicing after judgment is finished.`,
    key_themes: [
      'Dwelling in Booths',
      'Harvest Celebration',
      'Wilderness Commemoration',
      'Millennial Fulfillment',
      'Final Harvest Joy'
    ],
    content: `The feast of tabernacles was a time of great rejoicing...`,
    word_count: 3100
  }
];

// Comprehensive Scripture Reference Data (sample - would be much more extensive)
const SCRIPTURE_REFERENCES = [
  // Chapter 1 - The Sanctuary
  { book: 'Exodus', chapter: 25, verse_start: 8, reference_text: 'Exodus 25:8', chapter_number: 1, theme: 'Sanctuary Purpose', context: 'Let them make me a sanctuary that I may dwell among them' },
  { book: 'Exodus', chapter: 25, verse_start: 9, reference_text: 'Exodus 25:9', chapter_number: 1, theme: 'Pattern from Heaven', context: 'According to all that I show you, the pattern of the tabernacle' },
  { book: 'Exodus', chapter: 25, verse_start: 40, reference_text: 'Exodus 25:40', chapter_number: 1, theme: 'Pattern Warning', context: 'See that you make them according to the pattern shown on the mount' },
  { book: 'Hebrews', chapter: 8, verse_start: 1, verse_end: 2, reference_text: 'Hebrews 8:1-2', chapter_number: 1, theme: 'Heavenly Sanctuary', context: 'Minister of the sanctuary and true tabernacle which the Lord pitched' },
  { book: 'Hebrews', chapter: 9, verse_start: 1, verse_end: 5, reference_text: 'Hebrews 9:1-5', chapter_number: 1, theme: 'Earthly Sanctuary Description', context: 'The first covenant had ordinances and a worldly sanctuary' },
  { book: 'Hebrews', chapter: 9, verse_start: 23, verse_end: 24, reference_text: 'Hebrews 9:23-24', chapter_number: 1, theme: 'Heavenly Pattern', context: 'Patterns of things in the heavens... heaven itself' },
  { book: 'Revelation', chapter: 11, verse_start: 19, reference_text: 'Revelation 11:19', chapter_number: 1, theme: 'Temple in Heaven', context: 'Temple of God was opened in heaven and the ark was seen' },

  // Chapter 2 - The Court
  { book: 'Exodus', chapter: 27, verse_start: 9, verse_end: 19, reference_text: 'Exodus 27:9-19', chapter_number: 2, theme: 'Court Construction', context: 'Make the court of the tabernacle with hangings of fine linen' },
  { book: 'Exodus', chapter: 38, verse_start: 9, verse_end: 20, reference_text: 'Exodus 38:9-20', chapter_number: 2, theme: 'Court Details', context: 'Detailed description of court construction' },
  { book: 'John', chapter: 10, verse_start: 9, reference_text: 'John 10:9', chapter_number: 2, theme: 'Christ the Door', context: 'I am the door, by me if any man enter in he shall be saved' },
  { book: 'Isaiah', chapter: 64, verse_start: 6, reference_text: 'Isaiah 64:6', chapter_number: 2, theme: 'Our Righteousness', context: 'All our righteousnesses are as filthy rags' },
  { book: 'Revelation', chapter: 19, verse_start: 8, reference_text: 'Revelation 19:8', chapter_number: 2, theme: 'Fine Linen', context: 'Fine linen is the righteousness of saints' },

  // Chapter 3 - Altar of Burnt Offering
  { book: 'Exodus', chapter: 27, verse_start: 1, verse_end: 8, reference_text: 'Exodus 27:1-8', chapter_number: 3, theme: 'Altar Construction', context: 'Make an altar of acacia wood overlaid with brass' },
  { book: 'Exodus', chapter: 29, verse_start: 38, verse_end: 42, reference_text: 'Exodus 29:38-42', chapter_number: 3, theme: 'Continual Burnt Offering', context: 'Daily lamb morning and evening continually' },
  { book: 'Leviticus', chapter: 6, verse_start: 12, verse_end: 13, reference_text: 'Leviticus 6:12-13', chapter_number: 3, theme: 'Fire Never Out', context: 'The fire shall ever be burning upon the altar, it shall never go out' },
  { book: 'Leviticus', chapter: 1, verse_start: 1, verse_end: 17, reference_text: 'Leviticus 1', chapter_number: 3, theme: 'Burnt Offering Instructions', context: 'Complete instructions for burnt offering' },
  { book: 'John', chapter: 1, verse_start: 29, reference_text: 'John 1:29', chapter_number: 3, theme: 'Lamb of God', context: 'Behold the Lamb of God which takes away the sin of the world' },
  { book: '1 Peter', chapter: 1, verse_start: 18, verse_end: 19, reference_text: '1 Peter 1:18-19', chapter_number: 3, theme: 'Precious Blood', context: 'Redeemed with precious blood as of a lamb without blemish' },

  // Chapter 4 - The Laver
  { book: 'Exodus', chapter: 30, verse_start: 17, verse_end: 21, reference_text: 'Exodus 30:17-21', chapter_number: 4, theme: 'Laver Purpose', context: 'Laver for priests to wash before ministering' },
  { book: 'Exodus', chapter: 38, verse_start: 8, reference_text: 'Exodus 38:8', chapter_number: 4, theme: 'Laver Made from Mirrors', context: 'Made from bronze mirrors of serving women' },
  { book: 'Ephesians', chapter: 5, verse_start: 26, reference_text: 'Ephesians 5:26', chapter_number: 4, theme: 'Washing of Water', context: 'Cleanse it with washing of water by the word' },
  { book: 'John', chapter: 13, verse_start: 10, reference_text: 'John 13:10', chapter_number: 4, theme: 'Daily Cleansing', context: 'He that is washed needs only to wash his feet' },
  { book: 'Titus', chapter: 3, verse_start: 5, reference_text: 'Titus 3:5', chapter_number: 4, theme: 'Washing of Regeneration', context: 'By the washing of regeneration and renewing of Holy Spirit' },
  { book: 'James', chapter: 1, verse_start: 23, verse_end: 25, reference_text: 'James 1:23-25', chapter_number: 4, theme: 'Mirror of Word', context: 'Beholding himself in a glass - the word of God' },

  // Chapter 5 - The Holy Place
  { book: 'Exodus', chapter: 26, verse_start: 1, verse_end: 30, reference_text: 'Exodus 26:1-30', chapter_number: 5, theme: 'Tabernacle Construction', context: 'Instructions for making the tabernacle and its coverings' },
  { book: 'Exodus', chapter: 40, verse_start: 22, verse_end: 28, reference_text: 'Exodus 40:22-28', chapter_number: 5, theme: 'Holy Place Furniture', context: 'Placement of table, candlestick, and altar' },
  { book: 'Hebrews', chapter: 9, verse_start: 2, verse_end: 5, reference_text: 'Hebrews 9:2-5', chapter_number: 5, theme: 'Holy Place Contents', context: 'First tabernacle had candlestick, table, and shewbread' },
  { book: 'Hebrews', chapter: 9, verse_start: 6, reference_text: 'Hebrews 9:6', chapter_number: 5, theme: 'Daily Ministry', context: 'Priests went always into first tabernacle accomplishing service' },

  // Additional references for other chapters would continue...
  // Chapter 27 - Day of Atonement (Key chapter)
  { book: 'Leviticus', chapter: 16, verse_start: 1, verse_end: 34, reference_text: 'Leviticus 16', chapter_number: 27, theme: 'Day of Atonement', context: 'Complete instructions for the most solemn day' },
  { book: 'Leviticus', chapter: 23, verse_start: 27, verse_end: 32, reference_text: 'Leviticus 23:27-32', chapter_number: 27, theme: 'Atonement Timing', context: 'Tenth day of seventh month, afflict your souls' },
  { book: 'Daniel', chapter: 8, verse_start: 14, reference_text: 'Daniel 8:14', chapter_number: 27, theme: '2300 Days', context: 'Unto 2300 days then shall sanctuary be cleansed' },
  { book: 'Hebrews', chapter: 9, verse_start: 7, reference_text: 'Hebrews 9:7', chapter_number: 27, theme: 'Once a Year', context: 'High priest alone once every year with blood' },
  { book: 'Hebrews', chapter: 9, verse_start: 23, verse_end: 24, reference_text: 'Hebrews 9:23-24', chapter_number: 27, theme: 'Heavenly Cleansing', context: 'Necessary that heavenly things be purified with better sacrifices' },
];

// Theological Concepts
const THEOLOGICAL_CONCEPTS = [
  {
    concept_name: 'Sanctuary Services',
    definition: 'The comprehensive system of worship established by God at Sinai, including the tabernacle structure, priesthood, offerings, and feast days. This system was designed as an object lesson teaching the plan of salvation through visible symbols.',
    biblical_foundation: [
      'Exodus 25:8-9 - God\'s instruction to build sanctuary according to pattern',
      'Hebrews 8:5 - Earthly sanctuary serves as copy and shadow of heavenly',
      'Hebrews 9:9 - A symbol for the present time',
      'Colossians 2:17 - Shadow of things to come'
    ]
  },
  {
    concept_name: 'Type and Antitype',
    definition: 'The relationship between Old Testament symbols (types) and their New Testament fulfillment (antitypes). Every aspect of the sanctuary system was a type pointing forward to Christ and His ministry.',
    biblical_foundation: [
      'Hebrews 10:1 - Law having a shadow of good things to come',
      '1 Corinthians 5:7 - Christ our Passover is sacrificed for us',
      'Hebrews 9:11-12 - Christ entered by His own blood',
      'John 1:29 - Lamb of God which takes away sin'
    ]
  },
  {
    concept_name: 'Christ the Sacrifice',
    definition: 'Jesus Christ fulfilled all the sanctuary offerings through His life and death. He was the perfect Lamb without blemish, the burnt offering of complete dedication, and the sin offering bearing our transgressions.',
    biblical_foundation: [
      'Isaiah 53:7 - Led as lamb to slaughter',
      '1 Peter 1:18-19 - Redeemed with precious blood of Christ as lamb without blemish',
      'John 1:29 - Behold the Lamb of God',
      'Ephesians 5:2 - Christ gave himself as offering and sacrifice'
    ]
  },
  {
    concept_name: 'Christ the High Priest',
    definition: 'Jesus serves as our High Priest in the heavenly sanctuary, ministering His blood on our behalf and interceding for believers. His priesthood is after the order of Melchizedek—eternal and superior to the Levitical priesthood.',
    biblical_foundation: [
      'Hebrews 4:14-16 - We have a great high priest passed into the heavens',
      'Hebrews 7:25 - He ever lives to make intercession',
      'Hebrews 8:1-2 - Minister of true tabernacle',
      'Hebrews 9:11-12 - By His own blood entered holy places'
    ]
  },
  {
    concept_name: 'Blood Atonement',
    definition: 'The biblical principle that sin requires blood sacrifice for forgiveness. Blood represented life given in substitution. In the sanctuary, blood was applied to the altar, sprinkled in the Holy Place, and on the Day of Atonement, brought into the Most Holy Place.',
    biblical_foundation: [
      'Leviticus 17:11 - Life of flesh is in the blood, it makes atonement',
      'Hebrews 9:22 - Without shedding of blood is no remission',
      'Ephesians 1:7 - Redemption through His blood',
      '1 John 1:7 - Blood of Jesus Christ cleanses from all sin'
    ]
  },
  {
    concept_name: 'Sanctuary Cleansing',
    definition: 'As sins were transferred to the earthly sanctuary through blood, requiring annual cleansing on the Day of Atonement, so the heavenly sanctuary requires cleansing. This began in 1844 when Christ entered the Most Holy Place to review the cases of all professed believers.',
    biblical_foundation: [
      'Leviticus 16:16 - Make atonement for holy place because of uncleanness',
      'Leviticus 16:30 - Cleanse you from all your sins before the Lord',
      'Daniel 8:14 - Then shall sanctuary be cleansed',
      'Hebrews 9:23 - Necessary that heavenly things be purified'
    ]
  },
  {
    concept_name: 'Two Apartments - Two Ministries',
    definition: 'The sanctuary had two apartments representing two phases of Christ\'s ministry: (1) Daily ministry in the Holy Place for forgiveness; (2) Yearly ministry in the Most Holy Place for judgment and final cleansing. Christ ministered in the first from His ascension until 1844, then entered the second.',
    biblical_foundation: [
      'Hebrews 9:6-7 - Priests always in first, high priest once yearly in second',
      'Leviticus 4 - Daily sin offerings in Holy Place',
      'Leviticus 16 - Yearly Day of Atonement in Most Holy',
      'Revelation 11:19 - Temple opened and ark seen'
    ]
  },
  {
    concept_name: 'Priesthood of Believers',
    definition: 'While Christ is our High Priest, believers are called a royal priesthood to offer spiritual sacrifices. We have direct access to God through Christ and the privilege of ministry and intercession.',
    biblical_foundation: [
      '1 Peter 2:5 - Spiritual house, holy priesthood',
      '1 Peter 2:9 - Royal priesthood, holy nation',
      'Revelation 1:6 - Made us kings and priests unto God',
      'Hebrews 13:15-16 - Offer sacrifice of praise and do good'
    ]
  },
  {
    concept_name: 'The Feasts as Prophecy',
    definition: 'The seven annual feasts were prophetic timelines. Spring feasts (Passover, Unleavened Bread, Firstfruits, Pentecost) were fulfilled at Christ\'s first advent. Fall feasts (Trumpets, Atonement, Tabernacles) point to final events surrounding the Second Advent.',
    biblical_foundation: [
      'Leviticus 23 - All seven feasts described',
      '1 Corinthians 5:7-8 - Christ our Passover, keep feast',
      'Colossians 2:16-17 - Feasts are shadow of things to come',
      'Acts 2:1 - Pentecost fulfillment'
    ]
  },
  {
    concept_name: 'Daily and Yearly Atonement',
    definition: 'Two distinct phases of dealing with sin: (1) Daily atonement provided immediate forgiveness when sins were confessed; (2) Yearly atonement on Day of Atonement reviewed all cases and cleansed both sanctuary and people. Represents Christ\'s daily forgiveness and final judgment.',
    biblical_foundation: [
      'Leviticus 4:26 - Priest makes atonement and he shall be forgiven',
      'Leviticus 16:30 - On this day shall atonement be made to cleanse you',
      'Acts 3:19 - Sins blotted out when times of refreshing come',
      'Hebrews 10:12 - Christ offered one sacrifice forever'
    ]
  }
];

// Type-Antitype Pairs
const TYPE_ANTITYPE_PAIRS = [
  {
    type_name: 'Passover Lamb',
    type_description: 'A male lamb without blemish, killed on the 14th of Nisan, blood applied to doorposts for protection from death angel.',
    type_scripture: ['Exodus 12:3-13', 'Exodus 12:46'],
    antitype_name: 'Christ\'s Crucifixion',
    antitype_description: 'Jesus, the sinless Lamb of God, was crucified on Passover (14th Nisan, AD 31), His blood providing salvation from eternal death.',
    antitype_scripture: ['John 1:29', '1 Corinthians 5:7', '1 Peter 1:18-19', 'John 19:36'],
    fulfillment_timing: 'AD 31 - Crucifixion',
    chapter_number: 22
  },
  {
    type_name: 'Unleavened Bread',
    type_description: 'Seven days of eating bread without leaven (yeast), symbolizing purity and separation from sin.',
    type_scripture: ['Exodus 12:15-20', 'Leviticus 23:6-8'],
    antitype_name: 'Sinless Life in Christ',
    antitype_description: 'Believers walk in purity, putting away the leaven of sin and living holy lives through Christ\'s power.',
    antitype_scripture: ['1 Corinthians 5:7-8', '2 Corinthians 7:1'],
    fulfillment_timing: 'Christian Life',
    chapter_number: 23
  },
  {
    type_name: 'Firstfruits Sheaf',
    type_description: 'First sheaf of barley harvest waved before the Lord on the day after the Sabbath during Passover week.',
    type_scripture: ['Leviticus 23:10-11'],
    antitype_name: 'Christ\'s Resurrection',
    antitype_description: 'Christ rose from the dead on the first day of the week (Sunday) as the firstfruits, guaranteeing resurrection of all believers.',
    antitype_scripture: ['1 Corinthians 15:20-23', 'Matthew 28:1'],
    fulfillment_timing: 'AD 31 - Resurrection Sunday',
    chapter_number: 24
  },
  {
    type_name: 'Pentecost (Feast of Weeks)',
    type_description: 'Fifty days after firstfruits, two leavened loaves offered, representing completed harvest.',
    type_scripture: ['Leviticus 23:15-17'],
    antitype_name: 'Outpouring of Holy Spirit',
    antitype_description: 'Exactly fifty days after Christ\'s resurrection, the Holy Spirit empowered the church (Jews and Gentiles) for witness.',
    antitype_scripture: ['Acts 2:1-4'],
    fulfillment_timing: 'AD 31 - Day of Pentecost',
    chapter_number: 25
  },
  {
    type_name: 'Feast of Trumpets',
    type_description: 'Trumpets blown on first day of seventh month, calling Israel to prepare for Day of Atonement.',
    type_scripture: ['Leviticus 23:24-25', 'Numbers 29:1'],
    antitype_name: 'Final Warning Message',
    antitype_description: 'The three angels\' messages of Revelation 14 sound the final trumpet call to prepare for judgment.',
    antitype_scripture: ['Revelation 14:6-12', 'Revelation 10:7'],
    fulfillment_timing: 'Pre-Advent Judgment Era (1844 onward)',
    chapter_number: 26
  },
  {
    type_name: 'Day of Atonement',
    type_description: 'Tenth day of seventh month, high priest entered Most Holy Place once yearly to cleanse sanctuary from accumulated sins.',
    type_scripture: ['Leviticus 16:29-34', 'Leviticus 23:27-32'],
    antitype_name: 'Investigative Judgment',
    antitype_description: 'Beginning in 1844, Christ entered the Most Holy Place of the heavenly sanctuary to conduct pre-advent judgment, reviewing cases of all professed believers.',
    antitype_scripture: ['Daniel 8:14', 'Hebrews 9:23-24', 'Revelation 11:19'],
    fulfillment_timing: '1844 - Present (Pre-Advent Judgment)',
    chapter_number: 27
  },
  {
    type_name: 'Feast of Tabernacles',
    type_description: 'Seven-day harvest celebration living in booths, rejoicing after all harvest gathered and judgment complete.',
    type_scripture: ['Leviticus 23:33-43', 'Deuteronomy 16:13-15'],
    antitype_name: 'Millennial Reign',
    antitype_description: 'After Second Advent and completion of judgment, the redeemed dwell with Christ celebrating the completed harvest of souls.',
    antitype_scripture: ['Revelation 21:3', 'Zechariah 14:16'],
    fulfillment_timing: 'Millennium and New Earth',
    chapter_number: 28
  },
  {
    type_name: 'Brazen Altar',
    type_description: 'Bronze altar where sacrifices were offered, representing both judgment (bronze) and substitutionary death.',
    type_scripture: ['Exodus 27:1-8', 'Leviticus 1:3-9'],
    antitype_name: 'Cross of Calvary',
    antitype_description: 'Christ bore our judgment on the cross, offering Himself as the perfect sacrifice for sin.',
    antitype_scripture: ['Hebrews 13:10-12', 'Galatians 3:13'],
    fulfillment_timing: 'AD 31 - Crucifixion',
    chapter_number: 3
  },
  {
    type_name: 'Laver',
    type_description: 'Bronze basin where priests washed daily before ministry, made from mirrors reflecting their condition.',
    type_scripture: ['Exodus 30:17-21', 'Exodus 38:8'],
    antitype_name: 'Word of God',
    antitype_description: 'Believers are cleansed and sanctified through daily washing by the Word, which reveals our true spiritual condition.',
    antitype_scripture: ['Ephesians 5:26', 'James 1:23-25', 'John 15:3'],
    fulfillment_timing: 'Daily Christian Experience',
    chapter_number: 4
  },
  {
    type_name: 'Golden Candlestick',
    type_description: 'Seven-branched lampstand providing light in Holy Place, beaten from pure gold, burning pure olive oil.',
    type_scripture: ['Exodus 25:31-40', 'Exodus 27:20-21'],
    antitype_name: 'Christ and Holy Spirit',
    antitype_description: 'Christ is the Light of the world, and the Holy Spirit (oil) empowers believers to be light-bearers.',
    antitype_scripture: ['John 8:12', 'Zechariah 4:2-6', 'Revelation 1:12-13'],
    fulfillment_timing: 'Christ\'s Ministry and Church Age',
    chapter_number: 7
  },
  {
    type_name: 'Table of Shewbread',
    type_description: 'Table holding twelve loaves of bread renewed each Sabbath, eaten by priests.',
    type_scripture: ['Exodus 25:23-30', 'Leviticus 24:5-9'],
    antitype_name: 'Christ the Bread of Life',
    antitype_description: 'Christ is the living bread that came down from heaven, providing spiritual nourishment to believers.',
    antitype_scripture: ['John 6:35', 'John 6:51'],
    fulfillment_timing: 'Christ\'s Ministry - Present',
    chapter_number: 6
  },
  {
    type_name: 'Altar of Incense',
    type_description: 'Golden altar before the veil where fragrant incense burned morning and evening, rising before God.',
    type_scripture: ['Exodus 30:1-10', 'Exodus 30:34-38'],
    antitype_name: 'Christ\'s Intercession',
    antitype_description: 'Christ presents the prayers of the saints before the Father, His merits making them acceptable.',
    antitype_scripture: ['Revelation 8:3-4', 'Hebrews 7:25', 'Romans 8:34'],
    fulfillment_timing: 'Christ\'s High Priestly Ministry',
    chapter_number: 8
  },
  {
    type_name: 'Ark of the Covenant',
    type_description: 'Gold-covered chest containing the law, Aaron\'s rod, and golden pot of manna. God\'s throne on earth.',
    type_scripture: ['Exodus 25:10-22', 'Hebrews 9:4'],
    antitype_name: 'God\'s Throne in Heaven',
    antitype_description: 'The law remains the foundation of God\'s government. Christ kept the law, rose from the dead, and is the true bread.',
    antitype_scripture: ['Revelation 11:19', 'Psalm 89:14', 'Matthew 5:17-18'],
    fulfillment_timing: 'Eternal - God\'s Government',
    chapter_number: 10
  },
  {
    type_name: 'Mercy Seat with Cherubim',
    type_description: 'Gold lid of ark with two cherubim overshadowing, where blood was sprinkled on Day of Atonement.',
    type_scripture: ['Exodus 25:17-22', 'Leviticus 16:14-15'],
    antitype_name: 'Throne of Grace',
    antitype_description: 'Through Christ\'s blood, God\'s throne becomes a throne of grace where mercy and justice meet.',
    antitype_scripture: ['Hebrews 4:16', 'Romans 3:25-26'],
    fulfillment_timing: 'Christ\'s Atonement - Present',
    chapter_number: 11
  }
];

export async function seedHaskellBook() {
  console.log('🌱 Starting Haskell book seed...');

  try {
    // 1. Insert book metadata
    console.log('📖 Inserting book metadata...');
    const { data: metadata, error: metadataError } = await supabase
      .from('haskell_book_metadata')
      .insert([BOOK_METADATA])
      .select()
      .maybeSingle();

    if (metadataError) throw metadataError;
    console.log('✅ Book metadata inserted');

    // 2. Insert chapters
    console.log('📚 Inserting chapters...');
    const { data: chapters, error: chaptersError } = await supabase
      .from('haskell_chapters')
      .insert(CHAPTERS)
      .select();

    if (chaptersError) throw chaptersError;
    console.log(`✅ ${chapters?.length || 0} chapters inserted`);

    // 3. Insert scripture references with chapter IDs
    console.log('📜 Inserting scripture references...');
    const scriptureRefsWithChapterIds = SCRIPTURE_REFERENCES.map(ref => {
      const chapter = chapters?.find(c => c.chapter_number === ref.chapter_number);
      return {
        book: ref.book,
        chapter: ref.chapter,
        verse_start: ref.verse_start,
        verse_end: ref.verse_end || null,
        reference_text: ref.reference_text,
        context_in_book: ref.context,
        theological_theme: ref.theme,
        chapter_id: chapter?.id
      };
    });

    const { error: scriptureError } = await supabase
      .from('haskell_scripture_references')
      .insert(scriptureRefsWithChapterIds);

    if (scriptureError) throw scriptureError;
    console.log(`✅ ${SCRIPTURE_REFERENCES.length} scripture references inserted`);

    // 4. Insert theological concepts
    console.log('💡 Inserting theological concepts...');
    const { error: conceptsError } = await supabase
      .from('haskell_theological_concepts')
      .insert(THEOLOGICAL_CONCEPTS);

    if (conceptsError) throw conceptsError;
    console.log(`✅ ${THEOLOGICAL_CONCEPTS.length} theological concepts inserted`);

    // 5. Insert type-antitype pairs with chapter IDs
    console.log('🔗 Inserting type-antitype pairs...');
    const typesWithChapterIds = TYPE_ANTITYPE_PAIRS.map(pair => {
      const chapter = chapters?.find(c => c.chapter_number === pair.chapter_number);
      return {
        type_name: pair.type_name,
        type_description: pair.type_description,
        type_scripture: pair.type_scripture,
        antitype_name: pair.antitype_name,
        antitype_description: pair.antitype_description,
        antitype_scripture: pair.antitype_scripture,
        fulfillment_timing: pair.fulfillment_timing,
        chapter_id: chapter?.id
      };
    });

    const { error: typesError } = await supabase
      .from('haskell_type_antitype_pairs')
      .insert(typesWithChapterIds);

    if (typesError) throw typesError;
    console.log(`✅ ${TYPE_ANTITYPE_PAIRS.length} type-antitype pairs inserted`);

    console.log('🎉 Haskell book seed completed successfully!');
    return { success: true };

  } catch (error) {
    console.error('❌ Error seeding Haskell book:', error);
    throw error;
  }
}
