/**
 * Seed script for Crosier's "The Sanctuary" book data
 *
 * This script populates the database with comprehensive structured content
 * from O.R.L. Crosier's 1846 work on sanctuary theology.
 */

import { supabase } from '../lib/supabase';

const BOOK_METADATA = {
  title: 'The Sanctuary: The Center of Christ\'s Work',
  author: 'O.R.L. Crosier',
  publication_date: '1846-02-07',
  historical_context: `This document emerged from the Great Disappointment of 1844, when Adventists expected Christ's return based on the 2300-day prophecy of Daniel 8:14. When this did not occur, Hiram Edson received a vision while praying in a cornfield on October 23, 1844. He realized that the "cleansing of the sanctuary" referred not to earth, but to the heavenly sanctuary. Edson and Crosier studied this revelation intensively, and Crosier authored this groundbreaking exposition. Originally published as "The Law of Moses" in the Day-Star Extra on February 7, 1846, it laid the theological foundation for Seventh-day Adventist sanctuary doctrine.`,
  theological_significance: `This work represents the first comprehensive biblical exposition of the heavenly sanctuary doctrine that became foundational to Seventh-day Adventist theology. It established: (1) The existence of a literal sanctuary in heaven; (2) Christ's two-phase ministry (Holy Place and Most Holy Place); (3) The distinction between forgiveness of sins (daily atonement) and blotting out of sins (yearly atonement); (4) The interpretation of Daniel 8:14's 2300 days as ending in 1844; (5) The beginning of the investigative judgment. Ellen G. White endorsed this work, stating in 1847: "The Lord showed me in vision, more than one year ago, that Brother Crosier had the true light, on the cleansing of the Sanctuary."`,
  endorsements: [
    {
      endorser: 'Ellen G. White',
      role: 'Prophet and Co-founder of SDA Church',
      date: '1847-04-21',
      quote: 'I believe the Sanctuary, to be cleansed at the end of the 2300 days, in the New Jerusalem Temple, of which Christ is a minister. The Lord showed me in vision, more than one year ago, that Brother Crosier had the true light, on the cleansing of the Sanctuary, etc; and that it was his will, that Brother Crosier should write out the view which he gave us in the Day-Star Extra, February 7, 1846. I feel fully authorized by the Lord, to recommend that Extra, to every saint.',
      source: 'A Word to the Little Flock, p. 12'
    },
    {
      endorser: 'Arthur L. White',
      role: 'Ellen G. White Estate Secretary',
      date: '1981',
      quote: 'The vision, as published on March 14, gave unique confirmation to the conclusions of the Edson and Crosier Bible study. The investigation supporting these conclusions had taken place at the Hiram Edson home in western New York state over a period of a number of months. The existence of this Bible study was unknown to Ellen Harmon when she was given the vision in Exeter in mid-February, 1845.',
      source: 'The Ellen G. White Biography: Vol. 1, pp. 107-108'
    }
  ]
};

const CHAPTERS = [
  {
    chapter_number: 1,
    title: 'The Law of Moses',
    summary: `Establishes that the Mosaic Law (first covenant) was a simplified model and shadow of the greater system of redemption fulfilled in Christ. Crosier argues that the Law's significance extends beyond the first advent, with both vernal (spring) and autumnal (fall) types pointing to different phases of Christ's work. The vernal types were fulfilled at Christ's first coming, while the autumnal types await fulfillment in connection with the Second Advent and the millennial age.`,
    key_themes: [
      'Two Covenants (Mosaic vs New)',
      'Law as Shadow of Gospel',
      'Vernal Types (fulfilled at First Advent)',
      'Autumnal Types (future fulfillment)',
      'Sanctuary as Central to Typology'
    ],
    content: `Full chapter text here...` // Abbreviated for this example
  },
  {
    chapter_number: 2,
    title: 'Legal Types and Antitypes',
    summary: `Examines the four vernal feasts and their New Testament fulfillment: (1) Passover - Christ's crucifixion; (2) Unleavened Bread - Christian walk of sincerity and truth; (3) First Fruits - Christ's resurrection; (4) Feast of Weeks (Pentecost) - outpouring of the Holy Spirit. Crosier demonstrates that these types were fulfilled precisely at their appointed times during the Gospel Dispensation, establishing a pattern for understanding the future fulfillment of autumnal types.`,
    key_themes: [
      'Passover and Crucifixion',
      'First Fruits and Resurrection',
      'Pentecost and Holy Spirit',
      'Pattern of Precise Fulfillment',
      'Gospel Dispensation Span'
    ]
  },
  {
    chapter_number: 3,
    title: 'The Sanctuary',
    summary: `Defines the sanctuary biblically as the heavenly temple, not earth or Palestine. Crosier systematically refutes the idea that earth is the sanctuary by appealing to Paul's teaching in Hebrews 8-9. He establishes that the sanctuary of the new covenant is in heaven where Christ ministers, and that it has two apartments (Holy and Most Holy) just like the earthly pattern. The sanctuary was "cast down" metaphorically by Rome's pollution of Christ's heavenly ministry through false teachings.`,
    key_themes: [
      'New Testament Definition of Sanctuary',
      'Heaven, Not Earth',
      'Two Apartments in Heaven',
      'New Jerusalem Connection',
      'Rome's Pollution of Sanctuary Truth'
    ]
  },
  {
    chapter_number: 4,
    title: 'The Priesthood of Christ',
    summary: `Explores Christ's dual priesthood: after the order of Melchizedek (eternal, superior) and fulfilling the Aaronic/Levitical priesthood (typical, temporal). Details the two-phase ministry: (1) Daily ministration in the Holy Place for forgiveness of sins; (2) Yearly ministration in the Most Holy for cleansing the sanctuary and blotting out sins. Establishes that atonement means reconciliation, cleansing, purification accomplished through blood.`,
    key_themes: [
      'Melchizedek vs Levitical Priesthood',
      'Daily Atonement (Forgiveness)',
      'Yearly Atonement (Blotting Out)',
      'Two-Apartment Ministry',
      'Blood as Means of Atonement'
    ]
  },
  {
    chapter_number: 5,
    title: 'The Antitype',
    summary: `Proves that Christ's heavenly ministry parallels the earthly sanctuary services, with the Gospel Dispensation fulfilling the daily ministration and a future period fulfilling the yearly Day of Atonement. Demonstrates that the cleansing of the sanctuary could not have occurred at the cross or during the early Gospel period, but awaits the end of the 2300 days. Addresses the necessity of cleansing even heavenly things through Christ's blood.`,
    key_themes: [
      'Two Holy Places in Heaven',
      'Daily Ministry Throughout Gospel Age',
      'Yearly Ministry After 2300 Days',
      'Atonement Not Finished at Cross',
      'Cleansing of Heavenly Things'
    ]
  },
  {
    chapter_number: 6,
    title: 'The Age to Come',
    summary: `Describes the "world to come" or "age to come" as the millennial period following the Second Advent—a time of restitution, refreshing, and redemption of the purchased possession. This age fulfills the autumnal types, particularly the Day of Atonement and Jubilee. During this period, the sanctuary is cleansed, sins are blotted out, and Satan is bound. The saints inherit their promised possessions and reign with Christ.`,
    key_themes: [
      'Millennial Age/Dispensation of Fullness',
      'Times of Refreshing and Restitution',
      'Blotting Out of Sins',
      'Sanctuary Cleansing Timing',
      'Redemption of Purchased Possession'
    ]
  },
  {
    chapter_number: 7,
    title: 'The Scape-Goat',
    summary: `Argues that the scapegoat (Azazel) represents Satan, not Christ. After the sanctuary is cleansed, the sins are placed upon the scapegoat and it is sent into the wilderness—symbolizing Satan receiving back the sins he instigated and being confined during the millennium. Crosier provides six reasons why the scapegoat cannot represent Christ, including timing (after sanctuary cleansing), direction (away from people), and the name Azazel (meaning "strong one who revolted").`,
    key_themes: [
      'Scapegoat = Satan, Not Christ',
      'Azazel Meaning and Etymology',
      'Final Disposition of Sin',
      'Timing After Sanctuary Cleansing',
      'Binding of Satan'
    ]
  },
  {
    chapter_number: 8,
    title: 'The Transition',
    summary: `Describes the transitional period between dispensations, showing that the Gospel Dispensation and the Age to Come overlap briefly—just as the Mosaic and Gospel dispensations overlapped for seven years. The seventh trumpet announces this transition when "the kingdoms of this world are become the kingdoms of our Lord." This crisis period includes the cleansing of the sanctuary, the marriage in heaven, and the final events before Christ's visible return.`,
    key_themes: [
      'Dispensational Overlap',
      'Seventh Trumpet Timing',
      'Mystery of God Finished',
      'Marriage in Heaven',
      'Crisis Period Characteristics'
    ]
  }
];

// Comprehensive Scripture Reference Data
const SCRIPTURE_REFERENCES = [
  // Chapter 1 references
  { book: 'Malachi', chapter: 4, verse_start: 4, verse_end: 5, reference_text: 'Malachi 4:4-5', chapter_number: 1, theme: 'Law of Moses', context: 'Opening text commanding to remember the law in connection with the great and dreadful day of the Lord' },
  { book: 'Luke', chapter: 24, verse_start: 27, reference_text: 'Luke 24:27', chapter_number: 1, theme: 'Law as Teaching Tool', context: 'Christ taught from Moses and prophets concerning Himself' },
  { book: 'Hebrews', chapter: 9, verse_start: 11, reference_text: 'Hebrews 9:11', chapter_number: 1, theme: 'Good Things to Come', context: 'Law had shadow of good things to come' },
  { book: 'Hebrews', chapter: 10, verse_start: 1, reference_text: 'Hebrews 10:1', chapter_number: 1, theme: 'Shadow vs Substance', context: 'Law having shadow of good things to come' },
  { book: 'Hebrews', chapter: 8, verse_start: 7, verse_end: 9, reference_text: 'Hebrews 8:7-9', chapter_number: 1, theme: 'Two Covenants', context: 'First covenant vs second covenant, quoting Jeremiah 31:31-32' },
  { book: 'Jeremiah', chapter: 31, verse_start: 31, verse_end: 32, reference_text: 'Jeremiah 31:31-32', chapter_number: 1, theme: 'New Covenant Promise', context: 'Not according to covenant made when led out of Egypt' },
  { book: '1 Kings', chapter: 8, verse_start: 9, reference_text: '1 Kings 8:9', chapter_number: 1, theme: 'Ark Contents', context: 'Only two tables of stone in ark from Horeb covenant' },
  { book: 'Galatians', chapter: 3, verse_start: 15, verse_end: 19, reference_text: 'Galatians 3:15-19', chapter_number: 1, theme: 'Abrahamic Covenant Priority', context: 'Law 430 years after promise cannot disannul it' },

  // Chapter 2 references
  { book: 'Leviticus', chapter: 23, verse_start: 5, reference_text: 'Leviticus 23:5', chapter_number: 2, theme: 'Passover Date', context: '14th day of first month' },
  { book: '1 Corinthians', chapter: 5, verse_start: 7, reference_text: '1 Corinthians 5:7', chapter_number: 2, theme: 'Christ Our Passover', context: 'Christ our Passover is sacrificed for us' },
  { book: '1 Corinthians', chapter: 15, verse_start: 20, verse_end: 23, reference_text: '1 Corinthians 15:20-23', chapter_number: 2, theme: 'Christ Firstfruits', context: 'Christ risen as firstfruits of them that slept' },
  { book: 'Acts', chapter: 2, verse_start: 1, reference_text: 'Acts 2:1', chapter_number: 2, theme: 'Pentecost Fulfillment', context: 'When day of Pentecost was fully come' },

  // Chapter 3 references - Sanctuary definition
  { book: 'Hebrews', chapter: 9, verse_start: 1, verse_end: 5, reference_text: 'Hebrews 9:1-5', chapter_number: 3, theme: 'Worldly Sanctuary Description', context: 'First covenant had worldly sanctuary with two apartments' },
  { book: 'Exodus', chapter: 25, verse_start: 8, reference_text: 'Exodus 25:8', chapter_number: 3, theme: 'Sanctuary Purpose', context: 'Let them make me a sanctuary that I may dwell among them' },
  { book: 'Hebrews', chapter: 8, verse_start: 1, verse_end: 2, reference_text: 'Hebrews 8:1-2', chapter_number: 3, theme: 'Heavenly Sanctuary', context: 'Christ minister of sanctuary and true tabernacle which Lord pitched' },
  { book: 'Hebrews', chapter: 8, verse_start: 5, reference_text: 'Hebrews 8:5', chapter_number: 3, theme: 'Pattern Shown on Mount', context: 'See that you make all things according to pattern' },
  { book: 'Daniel', chapter: 8, verse_start: 14, reference_text: 'Daniel 8:14', chapter_number: 3, theme: '2300 Days', context: 'Unto 2300 days then shall sanctuary be cleansed' },
  { book: 'Hebrews', chapter: 11, verse_start: 10, reference_text: 'Hebrews 11:10', chapter_number: 3, theme: 'City Built by God', context: 'City which has foundations whose builder and maker is God' },
  { book: 'Hebrews', chapter: 12, verse_start: 22, reference_text: 'Hebrews 12:22', chapter_number: 3, theme: 'Heavenly Jerusalem', context: 'You are come unto heavenly Jerusalem' },
  { book: 'Revelation', chapter: 21, verse_start: 2, reference_text: 'Revelation 21:2', chapter_number: 3, theme: 'New Jerusalem Descending', context: 'Holy city New Jerusalem coming down from God' },

  // Chapter 4 references - Priesthood
  { book: 'Hebrews', chapter: 5, verse_start: 4, verse_end: 5, reference_text: 'Hebrews 5:4-5', chapter_number: 4, theme: 'Called of God', context: 'Christ called to be high priest as was Aaron' },
  { book: 'Hebrews', chapter: 7, verse_start: 23, verse_end: 24, reference_text: 'Hebrews 7:23-24', chapter_number: 4, theme: 'Unchangeable Priesthood', context: 'Many priests vs Christ who continues ever' },
  { book: 'Hebrews', chapter: 9, verse_start: 6, verse_end: 7, reference_text: 'Hebrews 9:6-7', chapter_number: 4, theme: 'Daily vs Yearly Ministry', context: 'Priests always in first tabernacle, high priest once a year in second' },
  { book: 'Leviticus', chapter: 4, verse_start: 1, verse_end: 35, reference_text: 'Leviticus 4', chapter_number: 4, theme: 'Sin Offering', context: 'Instructions for individual atonement and forgiveness' },
  { book: 'Leviticus', chapter: 16, verse_start: 1, verse_end: 34, reference_text: 'Leviticus 16', chapter_number: 4, theme: 'Day of Atonement', context: 'Yearly cleansing of sanctuary and people on tenth day of seventh month' },
  { book: 'Exodus', chapter: 30, verse_start: 10, reference_text: 'Exodus 30:10', chapter_number: 4, theme: 'Altar Cleansing', context: 'Aaron shall make atonement once a year with blood' },

  // Chapter 5 references - Antitype
  { book: 'Hebrews', chapter: 9, verse_start: 11, verse_end: 12, reference_text: 'Hebrews 9:11-12', chapter_number: 5, theme: 'Christ Entered Holy Places', context: 'By greater tabernacle and His own blood entered holy places' },
  { book: 'Hebrews', chapter: 9, verse_start: 23, verse_end: 24, reference_text: 'Hebrews 9:23-24', chapter_number: 5, theme: 'Heavenly Things Purified', context: 'Necessary to purify heavenly things with better sacrifices' },
  { book: 'Hebrews', chapter: 8, verse_start: 4, reference_text: 'Hebrews 8:4', chapter_number: 5, theme: 'Not Priest on Earth', context: 'If He were on earth He should not be a priest' },
  { book: 'Acts', chapter: 3, verse_start: 19, reference_text: 'Acts 3:19', chapter_number: 5, theme: 'Sins Blotted Out', context: 'Repent and be converted that sins may be blotted out when times of refreshing come' },
  { book: 'Acts', chapter: 2, verse_start: 38, reference_text: 'Acts 2:38', chapter_number: 5, theme: 'Remission of Sins', context: 'Repent and be baptized for remission of sins' },

  // Chapter 6 references - Age to Come
  { book: 'Luke', chapter: 20, verse_start: 34, verse_end: 35, reference_text: 'Luke 20:34-35', chapter_number: 6, theme: 'That World', context: 'Those accounted worthy to obtain that world and resurrection' },
  { book: '2 Peter', chapter: 3, verse_start: 7, verse_end: 13, reference_text: '2 Peter 3:7-13', chapter_number: 6, theme: 'Day of Judgment', context: 'Day of the Lord, heavens pass away, new heavens and earth' },
  { book: 'Acts', chapter: 3, verse_start: 21, reference_text: 'Acts 3:21', chapter_number: 6, theme: 'Times of Restitution', context: 'Heaven must receive Him until times of restitution' },
  { book: 'Ephesians', chapter: 1, verse_start: 10, verse_end: 14, reference_text: 'Ephesians 1:10-14', chapter_number: 6, theme: 'Dispensation of Fullness', context: 'Gather together all things in Christ' },
  { book: 'Isaiah', chapter: 40, verse_start: 1, verse_end: 2, reference_text: 'Isaiah 40:1-2', chapter_number: 6, theme: 'Jerusalem\'s Iniquity Pardoned', context: 'Comfort my people, her warfare accomplished, iniquity pardoned' },
  { book: 'Ezekiel', chapter: 36, verse_start: 24, verse_end: 25, reference_text: 'Ezekiel 36:24-25', chapter_number: 6, theme: 'Cleansing Water', context: 'Gather from countries, sprinkle clean water, you shall be clean' },
  { book: 'Colossians', chapter: 1, verse_start: 19, verse_end: 20, reference_text: 'Colossians 1:19-20', chapter_number: 6, theme: 'Reconcile All Things', context: 'Reconcile things in heaven and things on earth through blood of cross' },

  // Chapter 7 references - Scapegoat
  { book: 'Leviticus', chapter: 16, verse_start: 20, verse_end: 22, reference_text: 'Leviticus 16:20-22', chapter_number: 7, theme: 'Scapegoat Ritual', context: 'After cleansing sanctuary, lay hands on live goat, confess iniquities, send away' },
  { book: 'Hebrews', chapter: 9, verse_start: 28, reference_text: 'Hebrews 9:28', chapter_number: 7, theme: 'Second Coming Without Sin', context: 'Appear second time without sin unto salvation' },
  { book: 'Revelation', chapter: 20, verse_start: 1, verse_end: 3, reference_text: 'Revelation 20:1-3', chapter_number: 7, theme: 'Satan Bound', context: 'Angel bound Satan 1000 years, cast into bottomless pit' },

  // Chapter 8 references - Transition
  { book: 'Revelation', chapter: 11, verse_start: 15, verse_end: 17, reference_text: 'Revelation 11:15-17', chapter_number: 8, theme: 'Seventh Trumpet', context: 'Kingdoms of world become kingdoms of our Lord, He reigns' },
  { book: 'Revelation', chapter: 10, verse_start: 6, verse_end: 7, reference_text: 'Revelation 10:6-7', chapter_number: 8, theme: 'Time No Longer', context: 'In days of seventh angel mystery of God finished' },
  { book: 'Daniel', chapter: 9, verse_start: 27, reference_text: 'Daniel 9:27', chapter_number: 8, theme: '70 Weeks', context: 'Confirm covenant one week' },
  { book: '1 Corinthians', chapter: 15, verse_start: 51, verse_end: 54, reference_text: '1 Corinthians 15:51-54', chapter_number: 8, theme: 'Mystery of Change', context: 'We shall all be changed at last trump' }
];

// Theological Concepts Mapping
const THEOLOGICAL_CONCEPTS = [
  {
    concept_name: 'Heavenly Sanctuary',
    definition: 'The literal temple in heaven where Christ ministers as High Priest, consisting of two apartments (Holy and Most Holy) corresponding to the earthly tabernacle pattern shown to Moses.',
    biblical_foundation: [
      'Hebrews 8:1-2 - Christ minister of sanctuary and true tabernacle',
      'Hebrews 9:11-12 - Greater and more perfect tabernacle not made with hands',
      'Hebrews 9:23-24 - Heavenly things themselves, heaven itself',
      'Revelation 11:19 - Temple of God opened in heaven, ark seen'
    ]
  },
  {
    concept_name: 'Two-Phase Ministry',
    definition: 'Christ\'s high priestly work divided into two distinct phases: (1) Daily ministry in the Holy Place throughout the Gospel age for forgiveness of sins; (2) Yearly ministry in the Most Holy Place beginning in 1844 for cleansing the sanctuary and blotting out sins.',
    biblical_foundation: [
      'Hebrews 9:6-7 - Priests always in first, high priest once yearly in second',
      'Leviticus 4 - Daily individual atonement in Holy Place',
      'Leviticus 16 - Yearly national atonement in Most Holy',
      'Daniel 8:14 - 2300 days then sanctuary cleansed'
    ]
  },
  {
    concept_name: 'Daily Atonement',
    definition: 'The continuous priestly ministry in the Holy Place where individual sins were forgiven through the blood of the sin offering. Represents Christ\'s ongoing intercession for believers throughout the Gospel Dispensation.',
    biblical_foundation: [
      'Leviticus 4:27-35 - Sin offering for individual forgiveness',
      'Hebrews 9:6 - Priests accomplishing service of God always',
      'Acts 2:38 - Repent for remission of sins',
      'Romans 5:11 - By whom we have now received atonement'
    ]
  },
  {
    concept_name: 'Yearly Atonement',
    definition: 'The annual Day of Atonement service on the tenth day of the seventh month when the high priest entered the Most Holy Place to cleanse the sanctuary from the accumulated sins of the year and blot out the people\'s iniquities.',
    biblical_foundation: [
      'Leviticus 16:29-34 - Tenth day seventh month, cleanse from all sins',
      'Leviticus 16:16 - Cleanse sanctuary from uncleanness of Israel',
      'Leviticus 16:30 - Atonement to cleanse you before the Lord',
      'Acts 3:19 - Sins blotted out when times of refreshing come'
    ]
  },
  {
    concept_name: '2300 Day Prophecy',
    definition: 'The prophetic period of Daniel 8:14 extending 2300 literal years from 457 BC to 1844 AD, at which time the cleansing of the heavenly sanctuary would begin—the antitypical Day of Atonement.',
    biblical_foundation: [
      'Daniel 8:14 - Unto 2300 days then sanctuary cleansed',
      'Daniel 8:26 - Vision of evening and morning is true',
      'Daniel 9:24-27 - 70 weeks determined, starting point established'
    ]
  },
  {
    concept_name: 'Investigative Judgment',
    definition: 'The pre-advent judgment work that began in 1844 when Christ entered the Most Holy Place of the heavenly sanctuary to review the cases of all who have professed faith, determining who will receive eternal life.',
    biblical_foundation: [
      'Daniel 7:9-10 - Judgment was set, books were opened',
      'Revelation 14:7 - Hour of His judgment is come',
      'Revelation 11:18 - Time of dead to be judged',
      'Leviticus 16:16-19 - Cleansing sanctuary from Israel\'s uncleanness'
    ]
  },
  {
    concept_name: 'Forgiveness vs Blotting Out',
    definition: 'Two distinct phases of dealing with sin: (1) Forgiveness occurs during daily ministry when sins are transferred to the sanctuary; (2) Blotting out occurs during yearly ministry when sins are removed from the sanctuary after judgment.',
    biblical_foundation: [
      'Acts 2:38 - Repent for remission (forgiveness) of sins',
      'Acts 3:19 - Sins may be blotted out when times of refreshing come',
      'Leviticus 4:26 - Priest makes atonement and he shall be forgiven',
      'Leviticus 16:30 - Cleanse you from all your sins before the Lord'
    ]
  },
  {
    concept_name: 'Scapegoat as Satan',
    definition: 'The live goat (Azazel) that received the confessed sins after the sanctuary was cleansed represents Satan, who will ultimately bear responsibility for the sins he instigated. Not a sin offering, but a final disposition of guilt.',
    biblical_foundation: [
      'Leviticus 16:20-22 - Live goat receives iniquities, sent to wilderness',
      'Leviticus 16:8 - One lot for Lord, one for Azazel (scapegoat)',
      'Revelation 20:1-3 - Satan bound and cast into abyss',
      'Ezekiel 28:18 - Bring forth fire, devour thee'
    ]
  },
  {
    concept_name: 'Type and Antitype',
    definition: 'The relationship between Old Testament shadows (types) and their New Testament realities (antitypes). Earthly sanctuary services were types of Christ\'s heavenly ministry.',
    biblical_foundation: [
      'Hebrews 8:5 - Serve unto example and shadow of heavenly things',
      'Hebrews 10:1 - Law having shadow of good things to come',
      'Colossians 2:17 - Shadow of things to come, body is of Christ',
      '1 Corinthians 5:7 - Christ our Passover sacrificed for us'
    ]
  },
  {
    concept_name: 'Dispensational Transition',
    definition: 'The overlapping period when one dispensation ends and another begins, characterized by parallel features of both. The Gospel Dispensation and Age to Come overlap just as Mosaic and Gospel dispensations overlapped.',
    biblical_foundation: [
      'Daniel 9:27 - Confirm covenant with many for one week',
      'Hebrews 9:8-10 - While first tabernacle standing, until reformation',
      'Revelation 10:6-7 - In days of seventh angel, mystery finished',
      'Galatians 4:24 - These are two covenants'
    ]
  }
];

// Type-Antitype Pairs
const TYPE_ANTITYPE_PAIRS = [
  {
    type_name: 'Passover Lamb',
    type_description: 'A lamb without blemish, killed on the 14th day of the first month, whose blood was applied to doorposts to save firstborn from death.',
    type_scripture: ['Exodus 12:3-13', 'Leviticus 23:5'],
    antitype_name: 'Christ\'s Crucifixion',
    antitype_description: 'Jesus, the Lamb of God without sin, was crucified on Passover (14th Nisan), whose blood saves believers from eternal death.',
    antitype_scripture: ['1 Corinthians 5:7', 'John 1:29', '1 Peter 1:19'],
    fulfillment_timing: 'AD 31 - First Advent',
    chapter_number: 2
  },
  {
    type_name: 'Feast of Unleavened Bread',
    type_description: 'Seven days eating bread without leaven (yeast), symbolizing putting away sin and malice.',
    type_scripture: ['Leviticus 23:6-8', 'Exodus 12:15-20'],
    antitype_name: 'Christian Walk in Truth',
    antitype_description: 'Believers keep the feast of life by putting away malice and wickedness, walking in sincerity and truth throughout the Gospel age.',
    antitype_scripture: ['1 Corinthians 5:7-8'],
    fulfillment_timing: 'AD 31 onward - Gospel Dispensation',
    chapter_number: 2
  },
  {
    type_name: 'Firstfruits Sheaf',
    type_description: 'The first ripe grain waved before the Lord on the 16th day (day after Sabbath), representing the first of the harvest.',
    type_scripture: ['Leviticus 23:10-11'],
    antitype_name: 'Christ\'s Resurrection',
    antitype_description: 'Christ rose on the third day as the firstfruits of the resurrection, guaranteeing the future harvest of all believers.',
    antitype_scripture: ['1 Corinthians 15:20-23', 'Acts 26:23'],
    fulfillment_timing: 'AD 31 - Third day after crucifixion',
    chapter_number: 2
  },
  {
    type_name: 'Feast of Weeks (Pentecost)',
    type_description: 'Celebrated 50 days after Firstfruits, two leavened loaves waved before the Lord, representing full harvest.',
    type_scripture: ['Leviticus 23:15-17'],
    antitype_name: 'Outpouring of Holy Spirit',
    antitype_description: 'The Holy Spirit was poured out 50 days after Christ\'s resurrection, empowering the church for witness.',
    antitype_scripture: ['Acts 2:1-4'],
    fulfillment_timing: 'AD 31 - Day of Pentecost',
    chapter_number: 2
  },
  {
    type_name: 'Daily Sin Offering',
    type_description: 'Individual brought animal sacrifice to priest who sprinkled blood in Holy Place for forgiveness.',
    type_scripture: ['Leviticus 4:27-35', 'Numbers 28:3-8'],
    antitype_name: 'Christ\'s Intercession in Holy Place',
    antitype_description: 'Christ ministers His blood in the Holy Place of the heavenly sanctuary, providing forgiveness to repentant believers.',
    antitype_scripture: ['Hebrews 9:6', 'Romans 5:11', '1 John 2:1'],
    fulfillment_timing: 'AD 31-1844 - Gospel Dispensation',
    chapter_number: 4
  },
  {
    type_name: 'Day of Atonement',
    type_description: 'High priest entered Most Holy Place once yearly to cleanse sanctuary and people from all sins.',
    type_scripture: ['Leviticus 16:29-34'],
    antitype_name: 'Cleansing of Heavenly Sanctuary',
    antitype_description: 'Christ entered the Most Holy Place of heavenly sanctuary to cleanse it and review cases of professed believers.',
    antitype_scripture: ['Daniel 8:14', 'Hebrews 9:23-24'],
    fulfillment_timing: '1844 onward - Pre-Advent Judgment',
    chapter_number: 5
  },
  {
    type_name: 'Scapegoat (Azazel)',
    type_description: 'Live goat received confessed sins after sanctuary cleansed, sent to wilderness to bear iniquities away.',
    type_scripture: ['Leviticus 16:20-22'],
    antitype_name: 'Satan Bearing Final Responsibility',
    antitype_description: 'After judgment, Satan receives ultimate responsibility for sin, bound 1000 years, then destroyed.',
    antitype_scripture: ['Revelation 20:1-3, 10'],
    fulfillment_timing: 'Second Advent - Millennium',
    chapter_number: 7
  },
  {
    type_name: 'Year of Jubilee',
    type_description: 'Every 50th year, liberty proclaimed, slaves freed, property returned, debts forgiven.',
    type_scripture: ['Leviticus 25:8-13'],
    antitype_name: 'Millennial Rest and Restoration',
    antitype_description: 'The 1000-year Sabbath when saints are freed from sin\'s bondage and inherit promised possessions.',
    antitype_scripture: ['Isaiah 61:1-4', 'Luke 4:18-19', 'Revelation 20:4-6'],
    fulfillment_timing: 'Millennium - Age to Come',
    chapter_number: 6
  },
  {
    type_name: 'Feast of Tabernacles',
    type_description: 'Seven-day feast of ingathering and rejoicing after harvest, dwelling in booths.',
    type_scripture: ['Leviticus 23:33-43', 'Deuteronomy 16:13-15'],
    antitype_name: 'Millennial Reign with Christ',
    antitype_description: 'The gathering of the elect and joyful reign with Christ after the harvest of earth is complete.',
    antitype_scripture: ['Matthew 24:30-31', 'Revelation 20:4'],
    fulfillment_timing: 'Second Advent through Millennium',
    chapter_number: 6
  }
];

export async function seedCrosierBook() {
  console.log('🌱 Starting Crosier book seed...');

  try {
    // 1. Insert book metadata
    console.log('📖 Inserting book metadata...');
    const { data: metadata, error: metadataError } = await supabase
      .from('crosier_book_metadata')
      .insert([BOOK_METADATA])
      .select()
      .single();

    if (metadataError) throw metadataError;
    console.log('✅ Book metadata inserted');

    // 2. Insert chapters
    console.log('📚 Inserting chapters...');
    const { data: chapters, error: chaptersError } = await supabase
      .from('crosier_chapters')
      .insert(CHAPTERS)
      .select();

    if (chaptersError) throw chaptersError;
    console.log(`✅ ${chapters.length} chapters inserted`);

    // 3. Insert scripture references with chapter IDs
    console.log('📜 Inserting scripture references...');
    const scriptureRefsWithChapterIds = SCRIPTURE_REFERENCES.map(ref => {
      const chapter = chapters.find(c => c.chapter_number === ref.chapter_number);
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
      .from('crosier_scripture_references')
      .insert(scriptureRefsWithChapterIds);

    if (scriptureError) throw scriptureError;
    console.log(`✅ ${SCRIPTURE_REFERENCES.length} scripture references inserted`);

    // 4. Insert theological concepts
    console.log('💡 Inserting theological concepts...');
    const { error: conceptsError } = await supabase
      .from('crosier_theological_concepts')
      .insert(THEOLOGICAL_CONCEPTS);

    if (conceptsError) throw conceptsError;
    console.log(`✅ ${THEOLOGICAL_CONCEPTS.length} theological concepts inserted`);

    // 5. Insert type-antitype pairs with chapter IDs
    console.log('🔗 Inserting type-antitype pairs...');
    const typesWithChapterIds = TYPE_ANTITYPE_PAIRS.map(pair => {
      const chapter = chapters.find(c => c.chapter_number === pair.chapter_number);
      return {
        ...pair,
        chapter_id: chapter?.id
      };
    });

    const { error: typesError } = await supabase
      .from('crosier_type_antitype_pairs')
      .insert(typesWithChapterIds);

    if (typesError) throw typesError;
    console.log(`✅ ${TYPE_ANTITYPE_PAIRS.length} type-antitype pairs inserted`);

    console.log('🎉 Crosier book seed completed successfully!');
    return { success: true };

  } catch (error) {
    console.error('❌ Error seeding Crosier book:', error);
    throw error;
  }
}
