import { supabase } from '../lib/supabase';

interface BookData {
  title: string;
  author: string;
  year_published: number;
  overview_analysis: string;
  key_themes: string[];
}

interface SectionData {
  section_number: number;
  section_title: string;
  section_overview: string;
  key_themes: string[];
  chapter_range: string;
}

interface ChapterData {
  chapter_number: number;
  section_number: number;
  chapter_title: string;
  chapter_overview: string;
  content_full: string;
  key_points: string[];
  scripture_references: string[];
}

const bookData: BookData = {
  title: 'The Cross and Its Shadow',
  author: 'Stephen N. Haskell',
  year_published: 1914,
  overview_analysis: `"The Cross and Its Shadow" by Stephen N. Haskell is a comprehensive theological work that explores the typological relationship between the Old Testament sanctuary service and the New Testament ministry of Jesus Christ.

This masterful study demonstrates how every aspect of the ancient Hebrew sanctuary—its structure, furnishings, priesthood, offerings, and ceremonial system—served as a divine object lesson pointing forward to Christ's redemptive work.

The book is organized into nine major sections covering:
1. The Sanctuary itself as a type of Christ's dwelling among humanity
2. The Levitical Priesthood as a shadow of Christ's high priestly ministry
3. The various Offerings and their typological significance
4. The Sacred Feasts as prophetic timelines and spiritual commemorations
5. The Twelve Tribes and their symbolic representation
6. The Law and its relationship to grace
7. The prophetic timeline of Daniel and its fulfillment
8. The Ministry of Christ in the heavenly sanctuary
9. The final judgment and restoration

Haskell's work is distinguished by its meticulous attention to biblical detail, drawing from over 1,100 scripture references to establish each typological connection. The book demonstrates the perfect harmony between Old and New Testament revelation, showing how Christ is the fulfillment of every ceremony, symbol, and prophetic type given to ancient Israel.

This work serves as an essential resource for understanding Seventh-day Adventist sanctuary theology, the investigative judgment doctrine, and the comprehensive nature of Christ's atoning work—past, present, and future.`,
  key_themes: [
    'Typology: Old Testament types meeting New Testament antitypes',
    'Sanctuary doctrine and its heavenly fulfillment',
    'Christ as the central focus of all sanctuary symbolism',
    'The priesthood of Christ and His mediatorial ministry',
    'The sacrificial system as a revelation of the plan of salvation',
    'The prophetic significance of the feasts and ceremonies',
    'The investigative judgment and cleansing of the sanctuary',
    'The relationship between law and grace',
    'The eternal covenant and God\'s redemptive plan',
    'The second coming and final restoration'
  ]
};

const sectionsData: SectionData[] = [
  {
    section_number: 1,
    section_title: 'The Sanctuary',
    section_overview: 'This foundational section establishes the sanctuary as God\'s dwelling place among His people and explores its structure, furnishings, and typological significance. It demonstrates how every element of the earthly sanctuary pointed forward to Christ and His redemptive work.',
    key_themes: [
      'The sanctuary as God\'s dwelling place',
      'Typological significance of sanctuary structure',
      'The heavenly sanctuary as the true tabernacle',
      'Christ as the fulfillment of sanctuary symbolism'
    ],
    chapter_range: 'Chapters 1-10'
  },
  {
    section_number: 2,
    section_title: 'The Priesthood',
    section_overview: 'Examines the Levitical priesthood as a type of Christ\'s high priestly ministry, including the consecration, garments, duties, and qualifications of the priests. Shows how Christ perfectly fulfills all that was shadowed in the Aaronic priesthood.',
    key_themes: [
      'The high priest as a type of Christ',
      'Priestly consecration and qualifications',
      'The priestly garments and their symbolism',
      'Christ\'s superior priesthood after the order of Melchizedek'
    ],
    chapter_range: 'Chapters 11-15'
  },
  {
    section_number: 3,
    section_title: 'The Offerings',
    section_overview: 'Details the five primary offerings (burnt, meat, peace, sin, and trespass) and their specific typological meanings. Each offering reveals a different aspect of Christ\'s atoning sacrifice and the believer\'s relationship with God.',
    key_themes: [
      'The burnt offering: complete consecration',
      'The meat offering: Christ\'s perfect humanity',
      'The peace offering: reconciliation with God',
      'The sin and trespass offerings: atonement for sin',
      'Christ as the complete fulfillment of all offerings'
    ],
    chapter_range: 'Chapters 16-22'
  },
  {
    section_number: 4,
    section_title: 'The Feasts',
    section_overview: 'Explores the seven annual feasts of Israel as prophetic timelines and commemorations of God\'s redemptive acts. Shows how these feasts find their ultimate fulfillment in Christ\'s first and second advents.',
    key_themes: [
      'Passover and the crucifixion',
      'Unleavened Bread and sanctification',
      'First Fruits and resurrection',
      'Pentecost and the outpouring of the Holy Spirit',
      'Day of Atonement and the investigative judgment',
      'Feast of Tabernacles and the final harvest'
    ],
    chapter_range: 'Chapters 23-29'
  },
  {
    section_number: 5,
    section_title: 'The Tribes',
    section_overview: 'Studies the twelve tribes of Israel, their arrangement around the sanctuary, and their symbolic significance. Each tribe represents unique characteristics of God\'s people and aspects of spiritual Israel.',
    key_themes: [
      'Organization of the camp of Israel',
      'Symbolic meaning of each tribe',
      'The prophetic blessings of Jacob',
      'Application to spiritual Israel'
    ],
    chapter_range: 'Chapters 30-33'
  },
  {
    section_number: 6,
    section_title: 'The Law and the Covenant',
    section_overview: 'Examines the relationship between law and grace, the nature of the Old and New Covenants, and the role of the Ten Commandments in God\'s eternal plan. Demonstrates the harmony between law-keeping and salvation by grace.',
    key_themes: [
      'The perpetuity of God\'s law',
      'The Old and New Covenants compared',
      'The Sabbath as a sign of sanctification',
      'Grace as the power to keep God\'s law'
    ],
    chapter_range: 'Chapters 34-38'
  },
  {
    section_number: 7,
    section_title: 'Prophetic Timelines',
    section_overview: 'Interprets the prophetic periods of Daniel, particularly the 2300-day prophecy and its relationship to the sanctuary. Establishes the theological foundation for 1844 and the beginning of the investigative judgment.',
    key_themes: [
      'The 2300-day prophecy of Daniel 8:14',
      'The cleansing of the sanctuary',
      'The beginning of the investigative judgment',
      'Prophetic fulfillment in history'
    ],
    chapter_range: 'Chapters 39-42'
  },
  {
    section_number: 8,
    section_title: 'Christ\'s Heavenly Ministry',
    section_overview: 'Describes Christ\'s work as High Priest in the heavenly sanctuary, including His daily and yearly ministry. Shows how the earthly sanctuary services typified Christ\'s ongoing work of mediation and judgment.',
    key_themes: [
      'Christ\'s ministry in the Holy Place',
      'Christ\'s ministry in the Most Holy Place',
      'The investigative judgment',
      'The blotting out of sins'
    ],
    chapter_range: 'Chapters 43-46'
  },
  {
    section_number: 9,
    section_title: 'The Final Consummation',
    section_overview: 'Explores the completion of Christ\'s mediatorial work, the close of probation, the second coming, and the final eradication of sin. Shows how all sanctuary types find their ultimate fulfillment in the new heaven and new earth.',
    key_themes: [
      'The close of probation',
      'The second coming of Christ',
      'The millennium and executive judgment',
      'The new earth as the ultimate sanctuary'
    ],
    chapter_range: 'Chapters 47-50'
  }
];

const chaptersData: ChapterData[] = [
  // Section 1: The Sanctuary
  {
    chapter_number: 1,
    section_number: 1,
    chapter_title: 'The Sanctuary',
    chapter_overview: 'Introduces the sanctuary as God\'s ordained dwelling place among His people. Establishes the foundational principle that the earthly sanctuary was built according to the heavenly pattern shown to Moses.',
    content_full: '',
    key_points: [
      'God desired to dwell among His people (Exodus 25:8)',
      'The sanctuary was built according to the heavenly pattern',
      'Every detail was divinely specified and significant',
      'The sanctuary revealed God\'s character and plan of redemption'
    ],
    scripture_references: ['Exodus 25:8', 'Exodus 25:9', 'Exodus 25:40', 'Hebrews 8:5', 'Hebrews 9:23-24']
  },
  {
    chapter_number: 2,
    section_number: 1,
    chapter_title: 'The Court',
    chapter_overview: 'Describes the outer court of the sanctuary, its dimensions, and the significance of its linen curtains. The court represents the first step in approaching God.',
    content_full: '',
    key_points: [
      'The court was 100 cubits by 50 cubits',
      'White linen curtains symbolized righteousness',
      'One entrance represents Christ as the only way',
      'The court was accessible to all Israel'
    ],
    scripture_references: ['Exodus 27:9-19', 'John 10:9', 'John 14:6', 'Revelation 19:8']
  },
  {
    chapter_number: 3,
    section_number: 1,
    chapter_title: 'The Altar of Burnt Offering',
    chapter_overview: 'Examines the brazen altar where sacrifices were offered. This altar typified the cross of Christ where the great sacrifice for sin was made.',
    content_full: '',
    key_points: [
      'Made of acacia wood overlaid with brass/bronze',
      'The horns symbolized power and refuge',
      'Fire burned continually, never going out',
      'All sacrifices were offered on this altar'
    ],
    scripture_references: ['Exodus 27:1-8', 'Leviticus 6:12-13', 'Hebrews 13:10-12', '1 Peter 2:24']
  },
  {
    chapter_number: 4,
    section_number: 1,
    chapter_title: 'The Laver',
    chapter_overview: 'Studies the brass laver used for ceremonial washing. Represents cleansing and sanctification through the Word of God.',
    content_full: '',
    key_points: [
      'Made from brass mirrors of serving women',
      'Placed between altar and sanctuary door',
      'Used for washing hands and feet',
      'Symbolizes sanctification and daily cleansing'
    ],
    scripture_references: ['Exodus 30:17-21', 'Exodus 38:8', 'John 13:10', 'Ephesians 5:26', 'Titus 3:5']
  },
  {
    chapter_number: 5,
    section_number: 1,
    chapter_title: 'The Candlestick',
    chapter_overview: 'Describes the golden lampstand in the Holy Place. This seven-branched candlestick typified Christ as the Light of the world and the church as light bearers.',
    content_full: '',
    key_points: [
      'Made of pure gold, one talent in weight',
      'Seven lamps represent complete illumination',
      'Fed with pure olive oil',
      'Tended daily by the priests'
    ],
    scripture_references: ['Exodus 25:31-40', 'Zechariah 4:2-6', 'John 8:12', 'Revelation 1:12-20']
  },
  {
    chapter_number: 6,
    section_number: 1,
    chapter_title: 'The Table of Shewbread',
    chapter_overview: 'Examines the table holding twelve loaves of bread representing God\'s provision. Christ is the Bread of Life who sustains His people.',
    content_full: '',
    key_points: [
      'Twelve loaves representing twelve tribes',
      'Fresh bread placed every Sabbath',
      'Made of fine flour and frankincense',
      'Only priests could eat the old bread'
    ],
    scripture_references: ['Exodus 25:23-30', 'Leviticus 24:5-9', 'John 6:35', 'John 6:51']
  },
  {
    chapter_number: 7,
    section_number: 1,
    chapter_title: 'The Altar of Incense',
    chapter_overview: 'Studies the golden altar where incense was burned, representing the prayers of the saints mingled with Christ\'s merits.',
    content_full: '',
    key_points: [
      'Made of acacia wood overlaid with gold',
      'Incense burned morning and evening',
      'Positioned before the veil',
      'Represents intercession and prayer'
    ],
    scripture_references: ['Exodus 30:1-10', 'Psalm 141:2', 'Luke 1:9-10', 'Revelation 8:3-4']
  },
  {
    chapter_number: 8,
    section_number: 1,
    chapter_title: 'The Ark of the Covenant',
    chapter_overview: 'Describes the most sacred article in the sanctuary containing the Ten Commandments. The ark represents God\'s throne and the foundation of His government.',
    content_full: '',
    key_points: [
      'Contained the tables of the law',
      'Overlaid with pure gold inside and out',
      'The mercy seat formed its cover',
      'God\'s presence dwelt above the ark'
    ],
    scripture_references: ['Exodus 25:10-22', 'Deuteronomy 10:1-5', 'Hebrews 9:4', 'Revelation 11:19']
  },
  {
    chapter_number: 9,
    section_number: 1,
    chapter_title: 'The Veil',
    chapter_overview: 'Examines the veil separating the Holy from the Most Holy Place. Its rending at Christ\'s death symbolized direct access to God through Christ.',
    content_full: '',
    key_points: [
      'Made of blue, purple, scarlet, and fine linen',
      'Embroidered with cherubim',
      'Separated Holy from Most Holy',
      'Torn from top to bottom at the crucifixion'
    ],
    scripture_references: ['Exodus 26:31-35', 'Matthew 27:51', 'Hebrews 10:19-20']
  },
  {
    chapter_number: 10,
    section_number: 1,
    chapter_title: 'The Most Holy Place',
    chapter_overview: 'Explores the Most Holy Place where God\'s immediate presence dwelt. Entered only once a year by the high priest on the Day of Atonement.',
    content_full: '',
    key_points: [
      'Perfect cube: 10 x 10 x 10 cubits',
      'Contained only the ark of the covenant',
      'God\'s glory dwelt above the mercy seat',
      'Entered only on the Day of Atonement'
    ],
    scripture_references: ['Exodus 26:33-34', 'Leviticus 16:2', 'Hebrews 9:3-7', 'Revelation 21:16']
  },

  // Section 2: The Priesthood
  {
    chapter_number: 11,
    section_number: 2,
    chapter_title: 'Christ the High Priest',
    chapter_overview: 'Establishes Christ as our great High Priest who perfectly fulfills all that was typified in the Aaronic priesthood.',
    content_full: '',
    key_points: [
      'Christ is both priest and sacrifice',
      'Appointed by God, not self-appointed',
      'After the order of Melchizedek, not Aaron',
      'Ministers in the true heavenly sanctuary'
    ],
    scripture_references: ['Hebrews 4:14-16', 'Hebrews 5:5-10', 'Hebrews 7:26-28', 'Hebrews 8:1-2']
  },
  {
    chapter_number: 12,
    section_number: 2,
    chapter_title: 'The Consecration of the Priests',
    chapter_overview: 'Details the seven-day consecration ceremony for priests, typifying Christ\'s preparation for His priestly ministry.',
    content_full: '',
    key_points: [
      'Seven-day consecration period',
      'Washing, anointing, and clothing',
      'Sacrifices offered for the priests',
      'Blood applied to ear, thumb, and toe'
    ],
    scripture_references: ['Exodus 29:1-37', 'Leviticus 8:1-36', 'Hebrews 7:28']
  },
  {
    chapter_number: 13,
    section_number: 2,
    chapter_title: 'The Garments of the High Priest',
    chapter_overview: 'Examines each piece of the high priest\'s garments and their symbolic significance, all pointing to Christ.',
    content_full: '',
    key_points: [
      'Garments for glory and beauty',
      'Eight pieces in total',
      'Each piece held spiritual significance',
      'Represented Christ\'s character and ministry'
    ],
    scripture_references: ['Exodus 28:1-43', 'Exodus 39:1-31', 'Isaiah 61:10', 'Revelation 1:13']
  },
  {
    chapter_number: 14,
    section_number: 2,
    chapter_title: 'The Daily Ministry',
    chapter_overview: 'Describes the daily priestly duties in the Holy Place, typifying Christ\'s continual intercession for His people.',
    content_full: '',
    key_points: [
      'Morning and evening services',
      'Trimming lamps and burning incense',
      'Offering sacrifices for individual sins',
      'Continual ministry on behalf of Israel'
    ],
    scripture_references: ['Exodus 30:7-8', 'Leviticus 6:8-13', 'Hebrews 7:25', 'Romans 8:34']
  },
  {
    chapter_number: 15,
    section_number: 2,
    chapter_title: 'The Yearly Ministry',
    chapter_overview: 'Studies the Day of Atonement service in the Most Holy Place, typifying Christ\'s final work of judgment and cleansing.',
    content_full: '',
    key_points: [
      'Performed once a year on the tenth day of the seventh month',
      'High priest entered the Most Holy Place',
      'Cleansing of the sanctuary',
      'The scapegoat ceremony'
    ],
    scripture_references: ['Leviticus 16:1-34', 'Leviticus 23:27-32', 'Hebrews 9:7-12', 'Daniel 8:14']
  },

  // Section 3: The Offerings (Chapters 16-22)
  {
    chapter_number: 16,
    section_number: 3,
    chapter_title: 'The Burnt Offering',
    chapter_overview: 'Explores the burnt offering as a type of Christ\'s complete consecration to the Father\'s will and His total devotion to humanity\'s salvation.',
    content_full: '',
    key_points: ['Voluntary offering', 'Completely consumed by fire', 'Sweet aroma to the Lord', 'Represents complete consecration'],
    scripture_references: ['Leviticus 1:1-17', 'Ephesians 5:2', 'Philippians 2:8', 'Hebrews 10:7']
  },
  {
    chapter_number: 17,
    section_number: 3,
    chapter_title: 'The Meat Offering',
    chapter_overview: 'Studies the meat (grain) offering, which typifies Christ\'s perfect humanity and the fruits of a consecrated life.',
    content_full: '',
    key_points: ['Made of fine flour', 'Mixed with oil and frankincense', 'No leaven or honey', 'Represents Christ\'s sinless life'],
    scripture_references: ['Leviticus 2:1-16', 'John 6:51', 'John 6:35', '1 John 3:5']
  },
  {
    chapter_number: 18,
    section_number: 3,
    chapter_title: 'The Peace Offering',
    chapter_overview: 'Examines the peace offering as a type of reconciliation between God and humanity through Christ.',
    content_full: '',
    key_points: ['Voluntary thanksgiving offering', 'Shared meal between God and worshiper', 'Represents fellowship and peace', 'Type of Christ our peace'],
    scripture_references: ['Leviticus 3:1-17', 'Leviticus 7:11-21', 'Ephesians 2:14', 'Colossians 1:20']
  },
  {
    chapter_number: 19,
    section_number: 3,
    chapter_title: 'The Sin Offering',
    chapter_overview: 'Details the sin offering for unintentional sins, typifying Christ\'s sacrifice for the guilt and pollution of sin.',
    content_full: '',
    key_points: ['For unintentional sins', 'Blood applied to altar', 'Priest ate part in Holy Place', 'Christ bore our sins'],
    scripture_references: ['Leviticus 4:1-35', 'Isaiah 53:10', '2 Corinthians 5:21', '1 Peter 2:24']
  },
  {
    chapter_number: 20,
    section_number: 3,
    chapter_title: 'The Trespass Offering',
    chapter_overview: 'Studies the trespass offering for specific offenses requiring restitution, showing Christ\'s satisfaction of divine justice.',
    content_full: '',
    key_points: ['For specific violations', 'Required restitution plus 20%', 'Emphasis on making amends', 'Christ paid our debt'],
    scripture_references: ['Leviticus 5:14-6:7', 'Isaiah 53:10', 'Matthew 5:23-24', 'Colossians 2:14']
  },
  {
    chapter_number: 21,
    section_number: 3,
    chapter_title: 'The Wave Sheaf and the Wave Loaves',
    chapter_overview: 'Explores these special offerings connected to the spring feasts, typifying Christ\'s resurrection and the gathering of His people.',
    content_full: '',
    key_points: ['Wave sheaf at First Fruits', 'Wave loaves at Pentecost', 'Represents Christ and the church', 'First fruits of the harvest'],
    scripture_references: ['Leviticus 23:10-17', '1 Corinthians 15:20', '1 Corinthians 15:23', 'James 1:18']
  },
  {
    chapter_number: 22,
    section_number: 3,
    chapter_title: 'The Drink Offering',
    chapter_overview: 'Studies the drink offering poured out with other sacrifices, typifying Christ\'s life poured out for humanity.',
    content_full: '',
    key_points: ['Poured out at the altar base', 'Accompanied other offerings', 'Wine as a symbol of joy', 'Christ\'s life poured out'],
    scripture_references: ['Exodus 29:40', 'Numbers 15:5-10', 'Philippians 2:17', '2 Timothy 4:6']
  },

  // Section 4: The Feasts (Chapters 23-29)
  {
    chapter_number: 23,
    section_number: 4,
    chapter_title: 'The Passover',
    chapter_overview: 'Examines Israel\'s deliverance from Egypt and its fulfillment in Christ, the Lamb of God who takes away the sin of the world.',
    content_full: '',
    key_points: ['Lamb without blemish', 'Blood on doorposts', 'Deliverance from death', 'Christ our Passover'],
    scripture_references: ['Exodus 12:1-28', 'John 1:29', '1 Corinthians 5:7', '1 Peter 1:19']
  },
  {
    chapter_number: 24,
    section_number: 4,
    chapter_title: 'The Feast of Unleavened Bread',
    chapter_overview: 'Studies the seven-day feast following Passover, representing the putting away of sin and living a life of purity.',
    content_full: '',
    key_points: ['Seven days without leaven', 'Leaven represents sin', 'Time of purification', 'Walking in newness of life'],
    scripture_references: ['Exodus 12:15-20', 'Leviticus 23:6-8', '1 Corinthians 5:7-8', 'Galatians 5:9']
  },
  {
    chapter_number: 25,
    section_number: 4,
    chapter_title: 'The Feast of First Fruits',
    chapter_overview: 'Explores the offering of the first sheaf of barley harvest, fulfilled in Christ\'s resurrection as the first fruits from the dead.',
    content_full: '',
    key_points: ['First sheaf waved before the Lord', 'Celebrated during Unleavened Bread', 'Type of Christ\'s resurrection', 'Promise of full harvest'],
    scripture_references: ['Leviticus 23:9-14', '1 Corinthians 15:20', '1 Corinthians 15:23', 'Romans 8:23']
  },
  {
    chapter_number: 26,
    section_number: 4,
    chapter_title: 'The Feast of Pentecost',
    chapter_overview: 'Details the wheat harvest feast fulfilled in the outpouring of the Holy Spirit fifty days after Christ\'s resurrection.',
    content_full: '',
    key_points: ['Fifty days after First Fruits', 'Two leavened loaves waved', 'Celebration of wheat harvest', 'Fulfilled at Pentecost'],
    scripture_references: ['Leviticus 23:15-22', 'Acts 2:1-4', 'Acts 2:16-21', 'Joel 2:28-32']
  },
  {
    chapter_number: 27,
    section_number: 4,
    chapter_title: 'The Feast of Trumpets',
    chapter_overview: 'Studies the trumpet blast announcing the beginning of the seventh month and pointing to the final warning before judgment.',
    content_full: '',
    key_points: ['First day of seventh month', 'Trumpet blast', 'Call to repentance', 'Warning before judgment'],
    scripture_references: ['Leviticus 23:23-25', 'Numbers 29:1-6', 'Matthew 24:31', '1 Thessalonians 4:16']
  },
  {
    chapter_number: 28,
    section_number: 4,
    chapter_title: 'The Day of Atonement',
    chapter_overview: 'Comprehensive study of the most solemn day in Israel\'s calendar, typifying the investigative judgment and final cleansing from sin.',
    content_full: '',
    key_points: ['Tenth day of seventh month', 'High priest entered Most Holy Place', 'Two goats: Lord\'s and scapegoat', 'Cleansing of sanctuary'],
    scripture_references: ['Leviticus 16:1-34', 'Leviticus 23:27-32', 'Daniel 8:14', 'Hebrews 9:23-24']
  },
  {
    chapter_number: 29,
    section_number: 4,
    chapter_title: 'The Feast of Tabernacles',
    chapter_overview: 'Explores the joyful harvest festival commemorating God\'s provision and pointing to the final ingathering of the redeemed.',
    content_full: '',
    key_points: ['Fifteenth day of seventh month', 'Seven days of celebration', 'Dwelling in booths', 'Rejoicing in final harvest'],
    scripture_references: ['Leviticus 23:33-43', 'Nehemiah 8:14-17', 'Zechariah 14:16', 'Revelation 21:3']
  },

  // Section 5: The Tribes (Chapters 30-33)
  {
    chapter_number: 30,
    section_number: 5,
    chapter_title: 'The Camp of Israel',
    chapter_overview: 'Describes the divinely ordered arrangement of Israel\'s tribes around the sanctuary, revealing God\'s order and organization.',
    content_full: '',
    key_points: ['Twelve tribes organized by divisions', 'Sanctuary at the center', 'Each tribe had specific position', 'Perfect divine order'],
    scripture_references: ['Numbers 1:1-54', 'Numbers 2:1-34', '1 Corinthians 14:40']
  },
  {
    chapter_number: 31,
    section_number: 5,
    chapter_title: 'The Eastern Division',
    chapter_overview: 'Studies Judah, Issachar, and Zebulun who camped on the east side, including their prophetic significance.',
    content_full: '',
    key_points: ['Judah: praise and kingship', 'Issachar: reward and service', 'Zebulun: dwelling and commerce', 'East represented sunrise and Christ'],
    scripture_references: ['Genesis 49:8-15', 'Numbers 2:3-9', 'Matthew 2:2', 'Revelation 5:5']
  },
  {
    chapter_number: 32,
    section_number: 5,
    chapter_title: 'The Southern, Western, and Northern Divisions',
    chapter_overview: 'Examines the remaining nine tribes, their positions, and spiritual lessons from their characteristics.',
    content_full: '',
    key_points: ['South: Reuben, Simeon, Gad', 'West: Ephraim, Manasseh, Benjamin', 'North: Dan, Asher, Naphtali', 'Each tribe\'s unique blessing'],
    scripture_references: ['Numbers 2:10-31', 'Genesis 49:16-27', 'Deuteronomy 33:1-29']
  },
  {
    chapter_number: 33,
    section_number: 5,
    chapter_title: 'The Levites',
    chapter_overview: 'Details the tribe of Levi\'s special calling to serve the sanctuary and their typological significance.',
    content_full: '',
    key_points: ['Set apart for God\'s service', 'Three clans: Gershon, Kohath, Merari', 'Each had specific duties', 'Type of Christian ministry'],
    scripture_references: ['Numbers 3:1-51', 'Numbers 4:1-49', '1 Peter 2:9', 'Revelation 1:6']
  },

  // Section 6: The Law and Covenant (Chapters 34-38)
  {
    chapter_number: 34,
    section_number: 6,
    chapter_title: 'The Law of God',
    chapter_overview: 'Establishes the perpetual nature of God\'s Ten Commandments as the foundation of His government.',
    content_full: '',
    key_points: ['Written by God\'s finger', 'Placed in the ark', 'Perfect and unchangeable', 'Standard of judgment'],
    scripture_references: ['Exodus 20:1-17', 'Exodus 31:18', 'Psalm 19:7', 'James 2:10-12']
  },
  {
    chapter_number: 35,
    section_number: 6,
    chapter_title: 'The Two Covenants',
    chapter_overview: 'Contrasts the Old and New Covenants, showing how both point to salvation through faith in Christ.',
    content_full: '',
    key_points: ['Old Covenant: Israel\'s promise to obey', 'New Covenant: God\'s promise to empower', 'Both require faith', 'Grace enables obedience'],
    scripture_references: ['Exodus 19:5-8', 'Jeremiah 31:31-34', 'Hebrews 8:6-13', 'Hebrews 10:16']
  },
  {
    chapter_number: 36,
    section_number: 6,
    chapter_title: 'The Sabbath',
    chapter_overview: 'Explores the seventh-day Sabbath as a memorial of creation and sign of sanctification.',
    content_full: '',
    key_points: ['Memorial of creation', 'Sign of sanctification', 'Day of rest and worship', 'Seal of God\'s law'],
    scripture_references: ['Genesis 2:1-3', 'Exodus 20:8-11', 'Ezekiel 20:12', 'Hebrews 4:9']
  },
  {
    chapter_number: 37,
    section_number: 6,
    chapter_title: 'Salvation by Grace',
    chapter_overview: 'Clarifies the relationship between law and grace, showing that salvation has always been by faith.',
    content_full: '',
    key_points: ['Saved by grace through faith', 'Law reveals sin', 'Grace empowers obedience', 'Faith works by love'],
    scripture_references: ['Ephesians 2:8-10', 'Romans 3:20', 'Titus 2:11-14', 'Galatians 5:6']
  },
  {
    chapter_number: 38,
    section_number: 6,
    chapter_title: 'The Sanctuary and the Law',
    chapter_overview: 'Shows how the sanctuary service taught obedience to God\'s law through the power of Christ\'s grace.',
    content_full: '',
    key_points: ['Law in the ark', 'Blood sprinkled on mercy seat', 'Grace and law harmonize', 'Mercy and justice meet'],
    scripture_references: ['Exodus 25:16', 'Romans 3:25', 'Psalm 85:10', 'Hebrews 4:16']
  },

  // Section 7: Prophetic Timelines (Chapters 39-42)
  {
    chapter_number: 39,
    section_number: 7,
    chapter_title: 'The 2300 Days',
    chapter_overview: 'Interprets Daniel\'s 2300-day prophecy and its connection to the cleansing of the heavenly sanctuary.',
    content_full: '',
    key_points: ['2300 prophetic days = 2300 years', 'Begins 457 BC', 'Ends in 1844 AD', 'Sanctuary to be cleansed'],
    scripture_references: ['Daniel 8:13-14', 'Daniel 9:24-27', 'Ezra 7:7-26', 'Hebrews 9:23']
  },
  {
    chapter_number: 40,
    section_number: 7,
    chapter_title: 'The Seventy Weeks',
    chapter_overview: 'Studies the 70-week prophecy that pinpoints the time of Messiah\'s first advent.',
    content_full: '',
    key_points: ['70 weeks = 490 years', 'Cut off from 2300 days', 'Messiah appears and dies', 'Gospel to the Gentiles'],
    scripture_references: ['Daniel 9:24-27', 'Luke 3:1', 'Luke 3:21-22', 'Acts 13:46']
  },
  {
    chapter_number: 41,
    section_number: 7,
    chapter_title: 'The Great Prophetic Chain',
    chapter_overview: 'Connects Daniel 2, 7, 8, and 9 into one harmonious prophetic timeline pointing to the judgment.',
    content_full: '',
    key_points: ['Four parallel prophecies', 'Same kingdoms, different symbols', 'All point to judgment', 'God\'s kingdom established'],
    scripture_references: ['Daniel 2:31-45', 'Daniel 7:1-28', 'Daniel 8:1-27', 'Daniel 9:24-27']
  },
  {
    chapter_number: 42,
    section_number: 7,
    chapter_title: 'The 1844 Movement',
    chapter_overview: 'Describes the Millerite movement and the great disappointment that led to understanding the heavenly sanctuary.',
    content_full: '',
    key_points: ['William Miller\'s calculations', 'Worldwide expectation', 'Disappointment on October 22, 1844', 'Discovery of sanctuary truth'],
    scripture_references: ['Revelation 10:1-11', 'Habakkuk 2:3', 'Hebrews 10:37']
  },

  // Section 8: Christ's Heavenly Ministry (Chapters 43-46)
  {
    chapter_number: 43,
    section_number: 8,
    chapter_title: 'Christ\'s Ministry in the Holy Place',
    chapter_overview: 'Describes Christ\'s daily ministry of intercession in the first apartment of the heavenly sanctuary.',
    content_full: '',
    key_points: ['Daily intercession', 'Application of His blood', 'Presenting our prayers', 'Continued from AD 31 to 1844'],
    scripture_references: ['Hebrews 7:25', 'Hebrews 9:24', 'Romans 8:34', '1 John 2:1']
  },
  {
    chapter_number: 44,
    section_number: 8,
    chapter_title: 'Christ\'s Ministry in the Most Holy Place',
    chapter_overview: 'Explores Christ\'s final work in the Most Holy Place beginning in 1844, the investigative judgment.',
    content_full: '',
    key_points: ['Began in 1844', 'Investigative judgment', 'Examination of records', 'Cleansing the sanctuary'],
    scripture_references: ['Daniel 7:9-10', 'Daniel 8:14', 'Revelation 11:19', 'Hebrews 9:23']
  },
  {
    chapter_number: 45,
    section_number: 8,
    chapter_title: 'The Investigative Judgment',
    chapter_overview: 'Details the pre-advent judgment where cases are examined before Christ\'s return.',
    content_full: '',
    key_points: ['Judgment of professed believers', 'Books of record examined', 'Names retained or blotted out', 'Before second coming'],
    scripture_references: ['Daniel 7:9-14', 'Revelation 20:12', 'Malachi 3:16', 'Revelation 3:5']
  },
  {
    chapter_number: 46,
    section_number: 8,
    chapter_title: 'The Blotting Out of Sins',
    chapter_overview: 'Explains the final removal of confessed and forsaken sins from the sanctuary records.',
    content_full: '',
    key_points: ['Sins confessed are blotted out', 'Records cleansed', 'Final atonement completed', 'Saints made perfect'],
    scripture_references: ['Acts 3:19', 'Hebrews 9:23', 'Revelation 21:27', 'Jude 1:24']
  },

  // Section 9: Final Consummation (Chapters 47-50)
  {
    chapter_number: 47,
    section_number: 9,
    chapter_title: 'The Close of Probation',
    chapter_overview: 'Describes the solemn moment when Christ\'s intercession ceases and every case is decided.',
    content_full: '',
    key_points: ['Intercession ends', 'Cases all decided', 'Seven last plagues', 'No more mercy'],
    scripture_references: ['Revelation 22:11', 'Revelation 15:5-8', 'Revelation 16:1-21', 'Daniel 12:1']
  },
  {
    chapter_number: 48,
    section_number: 9,
    chapter_title: 'The Second Coming',
    chapter_overview: 'Portrays Christ\'s glorious return to gather His faithful people and execute judgment on the wicked.',
    content_full: '',
    key_points: ['Visible, literal return', 'Every eye shall see Him', 'Saints caught up', 'Wicked destroyed'],
    scripture_references: ['Matthew 24:30', 'Acts 1:11', '1 Thessalonians 4:16-17', 'Revelation 1:7']
  },
  {
    chapter_number: 49,
    section_number: 9,
    chapter_title: 'The Millennium',
    chapter_overview: 'Explains the thousand years between the two resurrections when the earth lies desolate and Satan is bound.',
    content_full: '',
    key_points: ['Saints reign in heaven', 'Earth desolate', 'Wicked dead reviewed', 'Executive judgment'],
    scripture_references: ['Revelation 20:1-6', '1 Corinthians 6:2-3', 'Jeremiah 4:23-27']
  },
  {
    chapter_number: 50,
    section_number: 9,
    chapter_title: 'The Earth Made New',
    chapter_overview: 'Describes the final eradication of sin and the establishment of God\'s eternal kingdom on the purified earth.',
    content_full: '',
    key_points: ['New heaven and new earth', 'New Jerusalem descends', 'God dwells with humanity', 'Sin forever destroyed'],
    scripture_references: ['Revelation 21:1-5', 'Revelation 21:3', '2 Peter 3:13', 'Isaiah 65:17']
  }
];

export async function seedCrossShadowBook() {
  try {
    console.log('Starting to seed "The Cross and Its Shadow" book...');

    // Insert the book metadata
    const { data: book, error: bookError } = await supabase
      .from('cross_shadow_book')
      .insert([{
        title: bookData.title,
        author: bookData.author,
        year_published: bookData.year_published,
        overview_analysis: bookData.overview_analysis,
        key_themes: bookData.key_themes,
        total_chapters: bookData.total_chapters,
        total_sections: bookData.total_sections
      }])
      .select()
      .single();

    if (bookError) {
      console.error('Error inserting book:', bookError);
      return;
    }

    console.log('Book metadata inserted:', book.id);

    // Insert sections
    const sectionsToInsert = sectionsData.map(section => ({
      book_id: book.id,
      ...section
    }));

    const { data: sections, error: sectionsError } = await supabase
      .from('cross_shadow_sections')
      .insert(sectionsToInsert)
      .select();

    if (sectionsError) {
      console.error('Error inserting sections:', sectionsError);
      return;
    }

    console.log(`Inserted ${sections.length} sections`);

    // Create section lookup by section_number
    const sectionLookup: { [key: number]: any } = {};
    sections.forEach(section => {
      sectionLookup[section.section_number] = section;
    });

    // Insert chapters
    const chaptersToInsert = chaptersData.map(chapter => ({
      book_id: book.id,
      section_id: sectionLookup[chapter.section_number].id,
      chapter_number: chapter.chapter_number,
      chapter_title: chapter.chapter_title,
      chapter_overview: chapter.chapter_overview,
      content_full: chapter.content_full,
      key_points: chapter.key_points,
      scripture_references: chapter.scripture_references
    }));

    const { data: chapters, error: chaptersError } = await supabase
      .from('cross_shadow_chapters')
      .insert(chaptersToInsert)
      .select();

    if (chaptersError) {
      console.error('Error inserting chapters:', chaptersError);
      return;
    }

    console.log(`Inserted ${chapters.length} chapters`);

    console.log('✅ Successfully seeded "The Cross and Its Shadow" book!');
    console.log(`   - Book ID: ${book.id}`);
    console.log(`   - Sections: ${sections.length}`);
    console.log(`   - Chapters: ${chapters.length}`);

  } catch (error) {
    console.error('Error seeding book:', error);
  }
}
