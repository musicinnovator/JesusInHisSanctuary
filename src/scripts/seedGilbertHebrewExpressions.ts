import { supabase } from '../lib/supabase';

interface HebrewExpression {
  expression: string;
  transliteration: string;
  meaning: string;
  category: string;
  subcategory?: string;
  theological_significance?: string;
  usage_examples?: string[];
  scripture_references?: string[];
  letter_group: string;
  related_expressions?: string[];
}

const hebrewExpressions: HebrewExpression[] = [
  // A
  {
    expression: 'Adar',
    transliteration: 'Adar',
    meaning: 'Twelfth Bible month',
    category: 'Calendar & Time',
    subcategory: 'Months',
    letter_group: 'A',
    theological_significance: 'Month of Purim, celebrating deliverance',
    scripture_references: ['Esther 3:7', 'Esther 9:1']
  },
  {
    expression: 'Ad ereb boker alpayim ushlosh meoth',
    transliteration: 'Ad ereb boker alpayim ushlosh meoth',
    meaning: 'Unto evening and morning, two thousand and three hundred',
    category: 'Prophecy',
    subcategory: 'Daniel\'s Prophecies',
    letter_group: 'A',
    theological_significance: 'Critical prophetic period pointing to sanctuary cleansing in 1844',
    scripture_references: ['Daniel 8:14'],
    related_expressions: ['Qodesh', 'Nitsdak']
  },
  {
    expression: 'Ad ki yabo Shiloh',
    transliteration: 'Ad ki yabo Shiloh',
    meaning: 'Till Shiloh come',
    category: 'Messianic Prophecy',
    subcategory: 'Names of Messiah',
    letter_group: 'A',
    theological_significance: 'Messianic prophecy pointing to Christ as the peaceful ruler',
    scripture_references: ['Genesis 49:10']
  },
  {
    expression: 'Almah',
    transliteration: 'Almah',
    meaning: 'A virgin, not a young married woman',
    category: 'Messianic Prophecy',
    subcategory: 'Virgin Birth',
    letter_group: 'A',
    theological_significance: 'Prophetic term affirming virgin birth of Messiah',
    scripture_references: ['Isaiah 7:14', 'Matthew 1:23']
  },
  {
    expression: 'Am haraisim',
    transliteration: 'Am haraisim (Biblical form, Am haaratsoth)',
    meaning: 'Men of the earth, or lands, illiterate',
    category: 'Social Terms',
    subcategory: 'People Groups',
    letter_group: 'A'
  },
  {
    expression: 'Ammah',
    transliteration: 'Ammah',
    meaning: 'Cubit',
    category: 'Measurements',
    subcategory: 'Length',
    letter_group: 'A',
    theological_significance: 'Divine measurement used in sanctuary construction',
    scripture_references: ['Exodus 25:10', 'Exodus 27:1']
  },
  {
    expression: 'Azazel',
    transliteration: 'Azazel',
    meaning: 'Scapegoat',
    category: 'Sacrificial System',
    subcategory: 'Day of Atonement',
    letter_group: 'A',
    theological_significance: 'Represents removal of sin and ultimate destruction of Satan',
    scripture_references: ['Leviticus 16:8', 'Leviticus 16:10', 'Leviticus 16:26'],
    related_expressions: ['Yom Kippur', 'Kaphar']
  },

  // B
  {
    expression: 'Bar mitsvah',
    transliteration: 'Bar mitsvah',
    meaning: 'Son of the commandment',
    category: 'Religious Practice',
    subcategory: 'Life Cycle',
    letter_group: 'B',
    theological_significance: 'Coming of age and responsibility for Torah observance'
  },
  {
    expression: 'Baruch sheputrani',
    transliteration: 'Baruch sheputrani',
    meaning: 'I am blessed now, I have no further responsibility',
    category: 'Religious Practice',
    subcategory: 'Blessings',
    letter_group: 'B'
  },
  {
    expression: 'Baruch haba',
    transliteration: 'Baruch haba',
    meaning: 'Thou blessed one, come in',
    category: 'Religious Practice',
    subcategory: 'Greetings',
    letter_group: 'B',
    theological_significance: 'Messianic greeting used at Christ\'s triumphal entry',
    scripture_references: ['Psalm 118:26', 'Matthew 21:9']
  },
  {
    expression: 'Bath qol',
    transliteration: 'Bath qol',
    meaning: 'Daughter of voice, substitute for gift of prophecy',
    category: 'Prophecy',
    subcategory: 'Divine Communication',
    letter_group: 'B',
    theological_significance: 'Heavenly voice after cessation of biblical prophecy'
  },
  {
    expression: 'Bayith',
    transliteration: 'Bayith',
    meaning: 'House',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'B',
    theological_significance: 'Term used for temple as God\'s house',
    scripture_references: ['1 Kings 6:1', '1 Chronicles 28:2']
  },
  {
    expression: 'Ben echad',
    transliteration: 'Ben echad',
    meaning: 'One son',
    category: 'Family Terms',
    subcategory: 'Relationships',
    letter_group: 'B'
  },
  {
    expression: 'Beni attah Ani Hayyom yelidtika',
    transliteration: 'Beni attah Ani Hayyom yelidtika',
    meaning: 'Thou art My Son, this day have I begotten Thee',
    category: 'Messianic Prophecy',
    subcategory: 'Divine Sonship',
    letter_group: 'B',
    theological_significance: 'Messianic psalm quoted at Christ\'s baptism and resurrection',
    scripture_references: ['Psalm 2:7', 'Acts 13:33', 'Hebrews 1:5', 'Hebrews 5:5']
  },
  {
    expression: 'Ben yachid',
    transliteration: 'Ben yachid',
    meaning: 'An only son',
    category: 'Family Terms',
    subcategory: 'Relationships',
    letter_group: 'B',
    theological_significance: 'Points to Christ as God\'s only begotten Son',
    scripture_references: ['John 3:16'],
    related_expressions: ['Yachid']
  },

  // C
  {
    expression: 'Chasid',
    transliteration: 'Chasid',
    meaning: 'Holy',
    category: 'Attributes of God',
    subcategory: 'Holiness',
    letter_group: 'C',
    theological_significance: 'Describes God\'s holy character and His faithful ones'
  },
  {
    expression: 'Chattath',
    transliteration: 'Chattath',
    meaning: 'Sin offering',
    category: 'Sacrificial System',
    subcategory: 'Offerings',
    letter_group: 'C',
    theological_significance: 'Sacrifice for unintentional sin, type of Christ\'s atonement',
    scripture_references: ['Leviticus 4:1-35', 'Hebrews 13:11'],
    related_expressions: ['Kaphar', 'Chattawth']
  },
  {
    expression: 'Chattawth',
    transliteration: 'Chattawth',
    meaning: 'Sins or sin offerings',
    category: 'Sacrificial System',
    subcategory: 'Offerings',
    letter_group: 'C',
    theological_significance: 'Plural form - multiple sins requiring atonement',
    related_expressions: ['Chattath', 'Kaphar']
  },

  // E
  {
    expression: 'Ebed melek',
    transliteration: 'Ebed melek',
    meaning: 'Servant of the king',
    category: 'Titles',
    subcategory: 'Service',
    letter_group: 'E',
    theological_significance: 'Ethiopian eunuch who rescued Jeremiah',
    scripture_references: ['Jeremiah 38:7']
  },
  {
    expression: 'Echad',
    transliteration: 'Echad',
    meaning: 'One, meaning unity',
    category: 'Theology',
    subcategory: 'Divine Unity',
    letter_group: 'E',
    theological_significance: 'Describes God\'s oneness and unity of purpose in Godhead',
    scripture_references: ['Deuteronomy 6:4', 'Genesis 2:24'],
    related_expressions: ['Yachid']
  },
  {
    expression: 'El',
    transliteration: 'El',
    meaning: 'Singular form of the word "God"',
    category: 'Names of God',
    subcategory: 'Divine Names',
    letter_group: 'E',
    theological_significance: 'Fundamental name denoting power and might of God',
    related_expressions: ['Elohim']
  },
  {
    expression: 'Elohim',
    transliteration: 'Elohim',
    meaning: 'Plural form of the word "God" in Genesis 1',
    category: 'Names of God',
    subcategory: 'Divine Names',
    letter_group: 'E',
    theological_significance: 'Plural form suggesting plurality within Godhead',
    scripture_references: ['Genesis 1:1', 'Genesis 1:26'],
    related_expressions: ['El', 'Echad']
  },
  {
    expression: 'Eth-pene paroketh',
    transliteration: 'Eth-pene paroketh',
    meaning: 'Face of veil',
    category: 'Sanctuary',
    subcategory: 'Furnishings',
    letter_group: 'E',
    theological_significance: 'Veil separating Holy from Most Holy Place',
    scripture_references: ['Exodus 26:33', 'Hebrews 10:20'],
    related_expressions: ['Paroketh', 'Qodesh haqqodashim']
  },

  // G
  {
    expression: 'Goral echad la-Yehovah',
    transliteration: 'Goral echad la-Yehovah',
    meaning: 'The Lord\'s lot',
    category: 'Sacrificial System',
    subcategory: 'Day of Atonement',
    letter_group: 'G',
    theological_significance: 'Lot for the Lord\'s goat on Day of Atonement',
    scripture_references: ['Leviticus 16:8-9'],
    related_expressions: ['Azazel', 'Yom Kippur']
  },

  // H
  {
    expression: 'Haalmah',
    transliteration: 'Haalmah',
    meaning: 'The virgin',
    category: 'Messianic Prophecy',
    subcategory: 'Virgin Birth',
    letter_group: 'H',
    theological_significance: 'The specific virgin who would bear Immanuel',
    scripture_references: ['Isaiah 7:14'],
    related_expressions: ['Almah']
  },
  {
    expression: 'Hu yeshupheka rosh',
    transliteration: 'Hu yeshupheka rosh',
    meaning: 'He will crush thy head',
    category: 'Messianic Prophecy',
    subcategory: 'Victory Over Satan',
    letter_group: 'H',
    theological_significance: 'First gospel promise of Messiah\'s victory over Satan',
    scripture_references: ['Genesis 3:15']
  },

  // K
  {
    expression: 'Kaphar',
    transliteration: 'Kaphar',
    meaning: 'To cover, to make atonement',
    category: 'Sacrificial System',
    subcategory: 'Atonement',
    letter_group: 'K',
    theological_significance: 'Central concept of covering sin through sacrifice',
    scripture_references: ['Leviticus 16:30', 'Hebrews 9:22'],
    related_expressions: ['Kapporeth', 'Chattath', 'Yom Kippur']
  },
  {
    expression: 'Kapporeth',
    transliteration: 'Kapporeth',
    meaning: 'A cover',
    category: 'Sanctuary',
    subcategory: 'Furnishings',
    letter_group: 'K',
    theological_significance: 'Mercy seat on ark, place of atonement and God\'s presence',
    scripture_references: ['Exodus 25:17-22', 'Hebrews 9:5'],
    related_expressions: ['Kaphar', 'Qodesh haqqodashim']
  },
  {
    expression: 'Kapharoth',
    transliteration: 'Kapharoth',
    meaning: 'Sacrifices (literally, atonements)',
    category: 'Sacrificial System',
    subcategory: 'Atonement',
    letter_group: 'K',
    theological_significance: 'Multiple atonement sacrifices',
    related_expressions: ['Kaphar']
  },
  {
    expression: 'Karath',
    transliteration: 'Karath',
    meaning: 'To cut, to cut round',
    category: 'Covenant',
    subcategory: 'Making Covenant',
    letter_group: 'K',
    theological_significance: 'Cutting covenant, foundational to circumcision and covenant-making',
    scripture_references: ['Genesis 15:18', 'Genesis 17:10']
  },
  {
    expression: 'Ken',
    transliteration: 'Ken',
    meaning: 'Foot of laver',
    category: 'Sanctuary',
    subcategory: 'Furnishings',
    letter_group: 'K',
    theological_significance: 'Base of laver for priestly cleansing',
    scripture_references: ['Exodus 30:18']
  },
  {
    expression: 'Kethubim',
    transliteration: 'Kethubim',
    meaning: 'Writings or Scriptures',
    category: 'Scripture',
    subcategory: 'Canon',
    letter_group: 'K',
    theological_significance: 'Third division of Hebrew Bible (Torah, Prophets, Writings)'
  },
  {
    expression: 'Kodesh',
    transliteration: 'Kodesh',
    meaning: 'Holy place, also sanctuary',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'K',
    theological_significance: 'First apartment of sanctuary, place of daily ministry',
    scripture_references: ['Exodus 26:33', 'Hebrews 9:2'],
    related_expressions: ['Qodesh', 'Qodesh haqqodashim']
  },
  {
    expression: 'Kohen',
    transliteration: 'Kohen',
    meaning: 'Priest',
    category: 'Priesthood',
    subcategory: 'Ministry',
    letter_group: 'K',
    theological_significance: 'Mediator between God and man, type of Christ',
    scripture_references: ['Exodus 28:1', 'Hebrews 4:14'],
    related_expressions: ['Kaphar']
  },

  // L
  {
    expression: 'Lebasar echad',
    transliteration: 'Lebasar echad',
    meaning: 'For one flesh',
    category: 'Marriage',
    subcategory: 'Union',
    letter_group: 'L',
    theological_significance: 'Divine design for marriage unity',
    scripture_references: ['Genesis 2:24'],
    related_expressions: ['Echad']
  },
  {
    expression: 'Lehashib welibnoth',
    transliteration: 'Lehashib welibnoth',
    meaning: 'Fully to restore and build again',
    category: 'Prophecy',
    subcategory: 'Restoration',
    letter_group: 'L',
    theological_significance: 'Prophetic decree to restore Jerusalem',
    scripture_references: ['Daniel 9:25']
  },
  {
    expression: 'Lekalle happesha',
    transliteration: 'Lekalle happesha',
    meaning: 'To fill up the transgression',
    category: 'Prophecy',
    subcategory: 'Daniel\'s 70 Weeks',
    letter_group: 'L',
    theological_significance: 'Completing the measure of sin',
    scripture_references: ['Daniel 9:24']
  },
  {
    expression: 'Lekalle happesha ulechathem chattawth, wekapper avon',
    transliteration: 'Lekalle happesha ulechathem chattawth, wekapper avon',
    meaning: 'To seal up sin offerings, and to forgive sins',
    category: 'Prophecy',
    subcategory: 'Messianic Mission',
    letter_group: 'L',
    theological_significance: 'Christ\'s work to seal transgression and make atonement',
    scripture_references: ['Daniel 9:24'],
    related_expressions: ['Kaphar', 'Chattawth']
  },
  {
    expression: 'Liphene',
    transliteration: 'Liphene',
    meaning: 'Face or presence',
    category: 'Sanctuary',
    subcategory: 'Divine Presence',
    letter_group: 'L',
    theological_significance: 'Before the face/presence of God',
    scripture_references: ['Exodus 33:14', 'Leviticus 16:2']
  },

  // M
  {
    expression: 'Man hu',
    transliteration: 'Man hu',
    meaning: 'Manna',
    category: 'Wilderness Experience',
    subcategory: 'Provision',
    letter_group: 'M',
    theological_significance: 'Bread from heaven, type of Christ',
    scripture_references: ['Exodus 16:15', 'John 6:31-35']
  },
  {
    expression: 'Maqom echad',
    transliteration: 'Maqom echad',
    meaning: 'One place',
    category: 'Creation',
    subcategory: 'Waters',
    letter_group: 'M',
    theological_significance: 'Gathering of waters on creation day',
    scripture_references: ['Genesis 1:9'],
    related_expressions: ['Echad']
  },
  {
    expression: 'Mashach',
    transliteration: 'Mashach',
    meaning: 'To anoint',
    category: 'Priesthood',
    subcategory: 'Consecration',
    letter_group: 'M',
    theological_significance: 'Anointing for service, root of "Messiah"',
    scripture_references: ['Exodus 29:7', 'Daniel 9:24-26']
  },
  {
    expression: 'Mem',
    transliteration: 'Mem',
    meaning: 'Hebrew letter',
    category: 'Language',
    subcategory: 'Alphabet',
    letter_group: 'M'
  },
  {
    expression: 'Mena',
    transliteration: 'Mena',
    meaning: 'Numberer',
    category: 'Prophecy',
    subcategory: 'Interpretation',
    letter_group: 'M',
    theological_significance: 'God has numbered thy kingdom',
    scripture_references: ['Daniel 5:25-26'],
    related_expressions: ['Palmoni']
  },
  {
    expression: 'Miqdash',
    transliteration: 'Miqdash',
    meaning: 'Sanctuary',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'M',
    theological_significance: 'Holy place, dwelling place of God',
    scripture_references: ['Exodus 25:8', 'Hebrews 8:2'],
    related_expressions: ['Qodesh', 'Mishkan']
  },
  {
    expression: 'Miqqets yamin',
    transliteration: 'Miqqets yamin',
    meaning: 'End of days',
    category: 'Prophecy',
    subcategory: 'Eschatology',
    letter_group: 'M',
    theological_significance: 'End times, latter days',
    scripture_references: ['Genesis 4:3', 'Daniel 12:13']
  },
  {
    expression: 'Mishkan',
    transliteration: 'Mishkan',
    meaning: 'Tabernacle',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'M',
    theological_significance: 'Portable dwelling place of God in wilderness',
    scripture_references: ['Exodus 25:9', 'Hebrews 8:5'],
    related_expressions: ['Miqdash', 'Ohel moed']
  },
  {
    expression: 'Mishkan ha-eduth',
    transliteration: 'Mishkan ha-eduth',
    meaning: 'Tabernacle of the witness',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'M',
    theological_significance: 'Tabernacle containing testimony (Ten Commandments)',
    scripture_references: ['Exodus 38:21', 'Numbers 1:50'],
    related_expressions: ['Mishkan']
  },
  {
    expression: 'Mitsvoth gedoloth',
    transliteration: 'Mitsvoth gedoloth',
    meaning: 'Greater commandments',
    category: 'Law',
    subcategory: 'Commandments',
    letter_group: 'M',
    theological_significance: 'Weightier matters of the law',
    scripture_references: ['Matthew 23:23']
  },
  {
    expression: 'Mitsvoth ketannoth',
    transliteration: 'Mitsvoth ketannoth',
    meaning: 'Lesser or little commandments',
    category: 'Law',
    subcategory: 'Commandments',
    letter_group: 'M',
    theological_significance: 'Smaller details of law, still important',
    scripture_references: ['Matthew 5:19']
  },
  {
    expression: 'Moshia',
    transliteration: 'Moshia',
    meaning: 'Saviour',
    category: 'Messianic Prophecy',
    subcategory: 'Titles of Messiah',
    letter_group: 'M',
    theological_significance: 'One who saves, delivers',
    related_expressions: ['Yasha']
  },

  // N
  {
    expression: 'Nasi',
    transliteration: 'Nasi',
    meaning: 'Prince',
    category: 'Leadership',
    subcategory: 'Titles',
    letter_group: 'N',
    theological_significance: 'Leader, prince, applied to Messiah',
    scripture_references: ['Daniel 9:25', 'Ezekiel 34:24'],
    related_expressions: ['Sar']
  },
  {
    expression: 'Nechosheth',
    transliteration: 'Nechosheth',
    meaning: 'Brass',
    category: 'Materials',
    subcategory: 'Metals',
    letter_group: 'N',
    theological_significance: 'Bronze/brass for outer court furnishings, symbol of judgment',
    scripture_references: ['Exodus 27:2', 'Numbers 21:9']
  },
  {
    expression: 'Nechtak',
    transliteration: 'Nechtak',
    meaning: 'To cut off, to cut quickly',
    category: 'Prophecy',
    subcategory: 'Messiah Cut Off',
    letter_group: 'N',
    theological_significance: 'Messiah cut off in death',
    scripture_references: ['Daniel 9:26'],
    related_expressions: ['Nichrath', 'Karath']
  },
  {
    expression: 'Nichrath',
    transliteration: 'Nichrath',
    meaning: 'Was cut off',
    category: 'Prophecy',
    subcategory: 'Messiah Cut Off',
    letter_group: 'N',
    theological_significance: 'Messiah\'s death prophesied',
    scripture_references: ['Daniel 9:26', 'Isaiah 53:8'],
    related_expressions: ['Nechtak']
  },
  {
    expression: 'Nitsdak',
    transliteration: 'Nitsdak',
    meaning: 'To be made right, to be righted',
    category: 'Sanctuary',
    subcategory: 'Cleansing',
    letter_group: 'N',
    theological_significance: 'Sanctuary shall be cleansed/vindicated',
    scripture_references: ['Daniel 8:14'],
    related_expressions: ['Qodesh']
  },

  // O
  {
    expression: 'Ohel',
    transliteration: 'Ohel',
    meaning: 'Tent',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'O',
    theological_significance: 'Tent structure of tabernacle',
    scripture_references: ['Exodus 26:1'],
    related_expressions: ['Mishkan', 'Ohel moed']
  },
  {
    expression: 'Ohel moed',
    transliteration: 'Ohel moed',
    meaning: 'Tabernacle or tent of the congregation',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'O',
    theological_significance: 'Tent of meeting where God met with His people',
    scripture_references: ['Exodus 27:21', 'Numbers 1:1'],
    related_expressions: ['Mishkan', 'Ohel']
  },
  {
    expression: 'Oklah',
    transliteration: 'Oklah',
    meaning: 'Diet',
    category: 'Religious Practice',
    subcategory: 'Food Laws',
    letter_group: 'O'
  },
  {
    expression: 'Omer',
    transliteration: 'Omer',
    meaning: 'Period between Passover and Pentecost',
    category: 'Calendar & Time',
    subcategory: 'Feast Periods',
    letter_group: 'O',
    theological_significance: 'Counting of the omer for 50 days',
    scripture_references: ['Leviticus 23:15-16']
  },

  // P
  {
    expression: 'Palmoni',
    transliteration: 'Palmoni',
    meaning: 'Wonderful Numberer',
    category: 'Prophecy',
    subcategory: 'Divine Names',
    letter_group: 'P',
    theological_significance: 'Title of divine being who explains prophecy to Daniel',
    scripture_references: ['Daniel 8:13'],
    related_expressions: ['Pele', 'Mena']
  },
  {
    expression: 'Paroketh',
    transliteration: 'Paroketh',
    meaning: 'Veil',
    category: 'Sanctuary',
    subcategory: 'Furnishings',
    letter_group: 'P',
    theological_significance: 'Veil separating holy from most holy, rent at Christ\'s death',
    scripture_references: ['Exodus 26:31', 'Matthew 27:51', 'Hebrews 10:20'],
    related_expressions: ['Eth-pene paroketh']
  },
  {
    expression: 'Pele',
    transliteration: 'Pele',
    meaning: 'Wonderful',
    category: 'Attributes of God',
    subcategory: 'Divine Names',
    letter_group: 'P',
    theological_significance: 'Wonderful, part of Messiah\'s name',
    scripture_references: ['Isaiah 9:6'],
    related_expressions: ['Palmoni']
  },
  {
    expression: 'Pur',
    transliteration: 'Pur',
    meaning: 'Lot',
    category: 'Historical Events',
    subcategory: 'Casting Lots',
    letter_group: 'P',
    theological_significance: 'Lot cast by Haman',
    scripture_references: ['Esther 3:7'],
    related_expressions: ['Purim']
  },
  {
    expression: 'Purim',
    transliteration: 'Purim',
    meaning: 'Feast of Jews',
    category: 'Calendar & Time',
    subcategory: 'Feasts',
    letter_group: 'P',
    theological_significance: 'Feast celebrating deliverance from Haman',
    scripture_references: ['Esther 9:26'],
    related_expressions: ['Pur', 'Adar']
  },

  // Q
  {
    expression: 'Qach-na eth-binka eth-yechidka',
    transliteration: 'Qach-na eth-binka eth-yechidka',
    meaning: 'Take now thy son, thine only son',
    category: 'Sacrificial System',
    subcategory: 'Type of Christ',
    letter_group: 'Q',
    theological_significance: 'Abraham offering Isaac, type of Father offering Son',
    scripture_references: ['Genesis 22:2'],
    related_expressions: ['Ben yachid', 'Yachid']
  },
  {
    expression: 'Qodesh',
    transliteration: 'Qodesh',
    meaning: 'Holy (place)',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'Q',
    theological_significance: 'Holy place, first apartment',
    scripture_references: ['Exodus 26:33'],
    related_expressions: ['Kodesh', 'Qodesh haqqodashim']
  },
  {
    expression: 'Qodesh haqqodashim',
    transliteration: 'Qodesh haqqodashim',
    meaning: 'Holy of holies, refers to things, not persons',
    category: 'Sanctuary',
    subcategory: 'Structure',
    letter_group: 'Q',
    theological_significance: 'Most Holy Place, innermost sanctuary chamber',
    scripture_references: ['Exodus 26:34', 'Hebrews 9:3'],
    related_expressions: ['Qodesh', 'Kapporeth']
  },

  // R
  {
    expression: 'Rosh hashanah',
    transliteration: 'Rosh hashanah',
    meaning: 'Beginning of year',
    category: 'Calendar & Time',
    subcategory: 'New Year',
    letter_group: 'R',
    theological_significance: 'Jewish New Year, day of judgment preparation',
    scripture_references: ['Leviticus 23:24']
  },

  // S
  {
    expression: 'Sar',
    transliteration: 'Sar',
    meaning: 'Prince',
    category: 'Leadership',
    subcategory: 'Titles',
    letter_group: 'S',
    theological_significance: 'Prince, ruler, applied to Messiah',
    scripture_references: ['Daniel 8:11', 'Daniel 10:13'],
    related_expressions: ['Nasi']
  },
  {
    expression: 'Shabbath Shabbathon',
    transliteration: 'Shabbath Shabbathon',
    meaning: 'Sabbath of Sabbaths',
    category: 'Calendar & Time',
    subcategory: 'Sabbaths',
    letter_group: 'S',
    theological_significance: 'Most solemn Sabbath, Day of Atonement',
    scripture_references: ['Leviticus 16:31', 'Leviticus 23:32']
  },
  {
    expression: 'Shabuim shibim',
    transliteration: 'Shabuim shibim',
    meaning: 'Seventy times the period of seven years. Among Orthodox Jews these terms are spoken of as seventy shmitoth',
    category: 'Prophecy',
    subcategory: 'Daniel\'s 70 Weeks',
    letter_group: 'S',
    theological_significance: 'Seventy weeks prophecy pointing to Messiah',
    scripture_references: ['Daniel 9:24'],
    related_expressions: ['Shmitah', 'Shmitoth']
  },
  {
    expression: 'Shaken',
    transliteration: 'Shaken',
    meaning: 'Neighbor',
    category: 'Social Terms',
    subcategory: 'Relationships',
    letter_group: 'S'
  },
  {
    expression: 'Shekinah',
    transliteration: 'Shekinah',
    meaning: 'God\'s glory',
    category: 'Sanctuary',
    subcategory: 'Divine Presence',
    letter_group: 'S',
    theological_significance: 'Visible manifestation of God\'s presence',
    scripture_references: ['Exodus 40:34-35', '1 Kings 8:10-11']
  },
  {
    expression: 'Shema',
    transliteration: 'Shema',
    meaning: 'A Jewish prayer',
    category: 'Religious Practice',
    subcategory: 'Prayers',
    letter_group: 'S',
    theological_significance: 'Central declaration of Jewish faith',
    scripture_references: ['Deuteronomy 6:4']
  },
  {
    expression: 'Shmitah',
    transliteration: 'Shmitah',
    meaning: 'A period of seven years',
    category: 'Calendar & Time',
    subcategory: 'Prophetic Periods',
    letter_group: 'S',
    theological_significance: 'Seven-year cycle, sabbatical year',
    scripture_references: ['Leviticus 25:1-7'],
    related_expressions: ['Shmitoth', 'Shabuim shibim']
  },
  {
    expression: 'Shmitoth',
    transliteration: 'Shmitoth',
    meaning: 'A period of seven years. Shmitah is singular; Shmitoth, plural',
    category: 'Calendar & Time',
    subcategory: 'Prophetic Periods',
    letter_group: 'S',
    theological_significance: 'Multiple seven-year periods',
    related_expressions: ['Shmitah', 'Shabuim shibim']
  },
  {
    expression: 'Sophrim',
    transliteration: 'Sophrim',
    meaning: 'Scribes',
    category: 'Religious Leadership',
    subcategory: 'Roles',
    letter_group: 'S',
    theological_significance: 'Copiers and interpreters of Torah'
  },

  // T
  {
    expression: 'Tamid',
    transliteration: 'Tamid',
    meaning: 'Daily or continual',
    category: 'Sacrificial System',
    subcategory: 'Daily Service',
    letter_group: 'T',
    theological_significance: 'Daily continual sacrifice morning and evening',
    scripture_references: ['Exodus 29:38-42', 'Daniel 8:11', 'Hebrews 7:25']
  },
  {
    expression: 'Tob meod',
    transliteration: 'Tob meod',
    meaning: 'Very good',
    category: 'Creation',
    subcategory: 'Divine Evaluation',
    letter_group: 'T',
    theological_significance: 'God\'s assessment of completed creation',
    scripture_references: ['Genesis 1:31']
  },
  {
    expression: 'Tsadak',
    transliteration: 'Tsadak',
    meaning: 'To be just, to justify, Niph (passive), to be purified',
    category: 'Sanctuary',
    subcategory: 'Cleansing',
    letter_group: 'T',
    theological_significance: 'Justification and cleansing of sanctuary',
    scripture_references: ['Daniel 8:14'],
    related_expressions: ['Nitsdak']
  },

  // W
  {
    expression: 'Wayehi ereb wayehi boqer yom echad',
    transliteration: 'Wayehi ereb wayehi boqer yom echad',
    meaning: 'And there was evening, and there was morning, one day',
    category: 'Creation',
    subcategory: 'Creation Days',
    letter_group: 'W',
    theological_significance: 'Pattern of creation days',
    scripture_references: ['Genesis 1:5'],
    related_expressions: ['Echad']
  },
  {
    expression: 'Waeshmaah echad qadosh medabber wayyomer echad qadosh lappalmoni hamdabber',
    transliteration: 'Waeshmaah echad qadosh medabber wayyomer echad qadosh lappalmoni hamdabber',
    meaning: 'I heard one Holy, one who was the speaker; and a holy one said to (Palmoni) who was the speaker',
    category: 'Prophecy',
    subcategory: 'Divine Communication',
    letter_group: 'W',
    theological_significance: 'Daniel\'s vision of heavenly beings discussing prophecy',
    scripture_references: ['Daniel 8:13'],
    related_expressions: ['Palmoni']
  },
  {
    expression: 'Wayyashilum',
    transliteration: 'Wayyashilum',
    meaning: 'And they solicited',
    category: 'Historical Events',
    subcategory: 'Actions',
    letter_group: 'W'
  },
  {
    expression: 'Wayehi miqqets yamim',
    transliteration: 'Wayehi miqqets yamim',
    meaning: 'And it came to pass at end of days',
    category: 'Prophecy',
    subcategory: 'Time Phrases',
    letter_group: 'W',
    theological_significance: 'Phrase marking prophetic fulfillment',
    scripture_references: ['Genesis 4:3'],
    related_expressions: ['Miqqets yamin']
  },
  {
    expression: 'Wayyomer Elohim naase Adam betsalmenu kidemuthenu',
    transliteration: 'Wayyomer Elohim naase Adam betsalmenu kidemuthenu',
    meaning: 'And God said, Let us make man in our image, after our likeness',
    category: 'Creation',
    subcategory: 'Creation of Man',
    letter_group: 'W',
    theological_significance: 'Plurality in Godhead at creation of humanity',
    scripture_references: ['Genesis 1:26'],
    related_expressions: ['Elohim']
  },
  {
    expression: 'We-Adar',
    transliteration: 'We-Adar',
    meaning: 'Month Adar repeated',
    category: 'Calendar & Time',
    subcategory: 'Months',
    letter_group: 'W',
    theological_significance: 'Second Adar in leap year',
    related_expressions: ['Adar']
  },
  {
    expression: 'Wegoral echad la-Azazel',
    transliteration: 'Wegoral echad la-Azazel',
    meaning: 'And lot to Azazel',
    category: 'Sacrificial System',
    subcategory: 'Day of Atonement',
    letter_group: 'W',
    theological_significance: 'Lot for scapegoat on Day of Atonement',
    scripture_references: ['Leviticus 16:8'],
    related_expressions: ['Azazel', 'Goral echad la-Yehovah']
  },
  {
    expression: 'Wekillah mikapper eth-haqqodesh',
    transliteration: 'Wekillah mikapper eth-haqqodesh',
    meaning: 'And when He hath made an end of reconciling the holy place',
    category: 'Sanctuary',
    subcategory: 'Cleansing',
    letter_group: 'W',
    theological_significance: 'Completion of sanctuary cleansing on Day of Atonement',
    scripture_references: ['Leviticus 16:20'],
    related_expressions: ['Kaphar', 'Qodesh', 'Yom Kippur']
  },
  {
    expression: 'Welo yiqhoth ammim',
    transliteration: 'Welo yiqhoth ammim',
    meaning: 'To Him shall the people gather',
    category: 'Messianic Prophecy',
    subcategory: 'Gathering of Nations',
    letter_group: 'W',
    theological_significance: 'Messianic prophecy of gathering nations to Shiloh',
    scripture_references: ['Genesis 49:10'],
    related_expressions: ['Ad ki yabo Shiloh']
  },
  {
    expression: 'Wesaphdu alaw kemisped al-hayyachid, wehamer alaw kethamer alhabekor',
    transliteration: 'Wesaphdu alaw kemisped al-hayyachid, wehamer alaw kethamer alhabekor',
    meaning: 'And they shall mourn for him, as one mourneth for his only son, and shall be in bitterness for him, as one is in bitterness for his first-born',
    category: 'Messianic Prophecy',
    subcategory: 'Crucifixion',
    letter_group: 'W',
    theological_significance: 'Prophecy of mourning for pierced Messiah',
    scripture_references: ['Zechariah 12:10'],
    related_expressions: ['Yachid', 'Ben yachid']
  },

  // Y
  {
    expression: 'Yachid',
    transliteration: 'Yachid',
    meaning: 'One, individuality',
    category: 'Theology',
    subcategory: 'Divine Unity',
    letter_group: 'Y',
    theological_significance: 'Only, unique, emphasizing singularity',
    related_expressions: ['Echad', 'Ben yachid']
  },
  {
    expression: 'Yamim',
    transliteration: 'Yamim',
    meaning: 'Days',
    category: 'Calendar & Time',
    subcategory: 'Time Units',
    letter_group: 'Y',
    theological_significance: 'Days, prophetic periods',
    related_expressions: ['Miqqets yamin']
  },
  {
    expression: 'Yasha',
    transliteration: 'Yasha',
    meaning: 'Saviour',
    category: 'Messianic Prophecy',
    subcategory: 'Titles of Messiah',
    letter_group: 'Y',
    theological_significance: 'To save, deliver; root of "Jesus"',
    related_expressions: ['Moshia']
  },
  {
    expression: 'Yashar',
    transliteration: 'Yashar',
    meaning: 'Upright',
    category: 'Attributes',
    subcategory: 'Character',
    letter_group: 'Y',
    theological_significance: 'Righteous, upright in conduct'
  },
  {
    expression: 'Yom haddin',
    transliteration: 'Yom haddin',
    meaning: 'Day of judgment',
    category: 'Eschatology',
    subcategory: 'Judgment',
    letter_group: 'Y',
    theological_significance: 'Day of divine judgment',
    related_expressions: ['Yom Kippur']
  },
  {
    expression: 'Yom Kippur',
    transliteration: 'Yom Kippur',
    meaning: 'Day of Atonement',
    category: 'Calendar & Time',
    subcategory: 'Feasts',
    letter_group: 'Y',
    theological_significance: 'Most solemn day, annual judgment and cleansing',
    scripture_references: ['Leviticus 16:1-34', 'Leviticus 23:27-32'],
    related_expressions: ['Kaphar', 'Azazel', 'Shabbath Shabbathon']
  },
  {
    expression: 'Yom le-yom',
    transliteration: 'Yom le-yom',
    meaning: 'Day unto day',
    category: 'Prophecy',
    subcategory: 'Prophetic Principle',
    letter_group: 'Y',
    theological_significance: 'Day-for-year principle in prophecy',
    scripture_references: ['Numbers 14:34', 'Ezekiel 4:6']
  }
];

export async function seedGilbertHebrewExpressions() {
  console.log('Starting Hebrew expressions seed...');

  try {
    // Insert all Hebrew expressions
    const { data, error } = await supabase
      .from('gilbert_hebrew_expressions')
      .insert(hebrewExpressions)
      .select();

    if (error) {
      console.error('Error seeding Hebrew expressions:', error);
      throw error;
    }

    console.log(`Successfully seeded ${data?.length} Hebrew expressions`);
    console.log('Hebrew expressions by category:');

    // Count by category
    const categoryCounts = hebrewExpressions.reduce((acc, expr) => {
      acc[expr.category] = (acc[expr.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} expressions`);
    });

    return data;
  } catch (error) {
    console.error('Failed to seed Hebrew expressions:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  seedGilbertHebrewExpressions()
    .then(() => {
      console.log('Seed completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
