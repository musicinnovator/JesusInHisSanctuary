import { supabase } from '../lib/supabase';

interface ScripturePassageData {
  reference: string;
  book: string;
  chapter_start: number;
  verse_start: number;
  chapter_end?: number;
  verse_end?: number;
  translation: string;
  title: string;
  full_text: string;
  summary: string;
  sanctuary_element?: string;
  model_id?: string;
  element_component_id?: string;
  passage_type: 'direct' | 'typological' | 'prophetic' | 'historical';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
}

const scripturePassages: ScripturePassageData[] = [
  // ==================== TABERNACLE PASSAGES ====================
  {
    reference: 'Exodus 25:10-22',
    book: 'Exodus',
    chapter_start: 25,
    verse_start: 10,
    chapter_end: 25,
    verse_end: 22,
    translation: 'KJV',
    title: 'The Ark of the Covenant',
    full_text: `And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof. And thou shalt overlay it with pure gold, within and without shalt thou overlay it, and shalt make upon it a crown of gold round about. And thou shalt cast four rings of gold for it, and put them in the four corners thereof; and two rings shall be in the one side of it, and two rings in the other side of it. And thou shalt make staves of shittim wood, and overlay them with gold. And thou shalt put the staves into the rings by the sides of the ark, that the ark may be borne with them. The staves shall be in the rings of the ark: they shall not be taken from it. And thou shalt put into the ark the testimony which I shall give thee. And thou shalt make a mercy seat of pure gold: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof. And thou shalt make two cherubims of gold, of beaten work shalt thou make them, in the two ends of the mercy seat. And make one cherub on the one end, and the other cherub on the other end: even of the mercy seat shall ye make the cherubims on the two ends thereof. And the cherubims shall stretch forth their wings on high, covering the mercy seat with their wings, and their faces shall look one to another; toward the mercy seat shall the faces of the cherubims be. And thou shalt put the mercy seat above upon the ark; and in the ark thou shalt put the testimony that I shall give thee. And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel.`,
    summary: 'God gives Moses detailed instructions for constructing the Ark of the Covenant, the most sacred object in the Tabernacle, which would contain the tablets of the Ten Commandments and serve as God\'s throne on earth.',
    sanctuary_element: 'ark',
    model_id: 'tabernacle',
    element_component_id: 'ark',
    passage_type: 'direct',
    difficulty_level: 'beginner',
    featured: true
  },
  {
    reference: 'Exodus 25:23-30',
    book: 'Exodus',
    chapter_start: 25,
    verse_start: 23,
    chapter_end: 25,
    verse_end: 30,
    translation: 'KJV',
    title: 'The Table of Showbread',
    full_text: `Thou shalt also make a table of shittim wood: two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof. And thou shalt overlay it with pure gold, and make thereto a crown of gold round about. And thou shalt make unto it a border of an hand breadth round about, and thou shalt make a golden crown to the border thereof round about. And thou shalt make for it four rings of gold, and put the rings in the four corners that are on the four feet thereof. Over against the border shall the rings be for places of the staves to bear the table. And thou shalt make the staves of shittim wood, and overlay them with gold, that the table may be borne with them. And thou shalt make the dishes thereof, and spoons thereof, and covers thereof, and bowls thereof, to cover withal: of pure gold shalt thou make them. And thou shalt set upon the table shewbread before me alway.`,
    summary: 'Instructions for the Table of Showbread, which held twelve loaves of bread representing the twelve tribes of Israel and God\'s provision for His people.',
    sanctuary_element: 'table_showbread',
    model_id: 'tabernacle',
    element_component_id: 'table_showbread',
    passage_type: 'direct',
    difficulty_level: 'beginner',
    featured: true
  },
  {
    reference: 'Exodus 25:31-40',
    book: 'Exodus',
    chapter_start: 25,
    verse_start: 31,
    chapter_end: 25,
    verse_end: 40,
    translation: 'KJV',
    title: 'The Golden Lampstand',
    full_text: `And thou shalt make a candlestick of pure gold: of beaten work shall the candlestick be made: his shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same. And six branches shall come out of the sides of it; three branches of the candlestick out of the one side, and three branches of the candlestick out of the other side: Three bowls made like unto almonds, with a knop and a flower in one branch; and three bowls made like almonds in the other branch, with a knop and a flower: so in the six branches that come out of the candlestick. And in the candlesticks shall be four bowls made like unto almonds, with their knops and their flowers. And there shall be a knop under two branches of the same, and a knop under two branches of the same, and a knop under two branches of the same, according to the six branches that proceed out of the candlestick. Their knops and their branches shall be of the same: all it shall be one beaten work of pure gold. And thou shalt make the seven lamps thereof: and they shall light the lamps thereof, that they may give light over against it. And the tongs thereof, and the snuffdishes thereof, shall be of pure gold. Of a talent of pure gold shall he make it, with all these vessels. And look that thou make them after their pattern, which was shewed thee in the mount.`,
    summary: 'Detailed instructions for the seven-branched Golden Lampstand (menorah), symbolizing God as the Light of the world and providing illumination in the Holy Place.',
    sanctuary_element: 'lampstand',
    model_id: 'tabernacle',
    element_component_id: 'lampstand',
    passage_type: 'direct',
    difficulty_level: 'intermediate',
    featured: true
  },
  {
    reference: 'Exodus 26:1-37',
    book: 'Exodus',
    chapter_start: 26,
    verse_start: 1,
    chapter_end: 26,
    verse_end: 37,
    translation: 'KJV',
    title: 'The Tabernacle Structure',
    full_text: `Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them. The length of one curtain shall be eight and twenty cubits, and the breadth of one curtain four cubits: and every one of the curtains shall have one measure. The five curtains shall be coupled together one to another; and other five curtains shall be coupled one to another. And thou shalt make loops of blue upon the edge of the one curtain from the selvedge in the coupling; and likewise shalt thou make in the uttermost edge of another curtain, in the coupling of the second. Fifty loops shalt thou make in the one curtain, and fifty loops shalt thou make in the edge of the curtain that is in the coupling of the second; that the loops may take hold one of another. And thou shalt make fifty taches of gold, and couple the curtains together with the taches: and it shall be one tabernacle.`,
    summary: 'Comprehensive instructions for constructing the Tabernacle structure, including the curtains, coverings, boards, and framework that formed God\'s dwelling place among His people.',
    sanctuary_element: 'curtains',
    model_id: 'tabernacle',
    element_component_id: 'curtains',
    passage_type: 'direct',
    difficulty_level: 'advanced',
    featured: false
  },
  {
    reference: 'Exodus 27:1-8',
    book: 'Exodus',
    chapter_start: 27,
    verse_start: 1,
    chapter_end: 27,
    verse_end: 8,
    translation: 'KJV',
    title: 'The Altar of Burnt Offering',
    full_text: `And thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits. And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same: and thou shalt overlay it with brass. And thou shalt make his pans to receive his ashes, and his shovels, and his basons, and his fleshhooks, and his firepans: all the vessels thereof thou shalt make of brass. And thou shalt make for it a grate of network of brass; and upon the net shalt thou make four brasen rings in the four corners thereof. And thou shalt put it under the compass of the altar beneath, that the net may be even to the midst of the altar. And thou shalt make staves for the altar, staves of shittim wood, and overlay them with brass. And the staves shall be put into the rings, and the staves shall be upon the two sides of the altar, to bear it. Hollow with boards shalt thou make it: as it was shewed thee in the mount, so shall they make it.`,
    summary: 'Instructions for the Bronze Altar in the courtyard where burnt offerings and sacrifices were made, pointing to Christ\'s ultimate sacrifice on the cross.',
    sanctuary_element: 'altar_burnt',
    model_id: 'tabernacle',
    element_component_id: 'altar_burnt',
    passage_type: 'direct',
    difficulty_level: 'beginner',
    featured: true
  },
  {
    reference: 'Exodus 27:9-19',
    book: 'Exodus',
    chapter_start: 27,
    verse_start: 9,
    chapter_end: 27,
    verse_end: 19,
    translation: 'KJV',
    title: 'The Courtyard',
    full_text: `And thou shalt make the court of the tabernacle: for the south side southward there shall be hangings for the court of fine twined linen of an hundred cubits long for one side: And the twenty pillars thereof and their twenty sockets shall be of brass; the hooks of the pillars and their fillets shall be of silver. And likewise for the north side in length there shall be hangings of an hundred cubits long, and his twenty pillars and their twenty sockets of brass; the hooks of the pillars and their fillets of silver. And for the breadth of the court on the west side shall be hangings of fifty cubits: their pillars ten, and their sockets ten. And the breadth of the court on the east side eastward shall be fifty cubits. The hangings of one side of the gate shall be fifteen cubits: their pillars three, and their sockets three. And on the other side shall be hangings fifteen cubits: their pillars three, and their sockets three. And for the gate of the court shall be an hanging of twenty cubits, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework: and their pillars shall be four, and their sockets four. All the pillars round about the court shall be filleted with silver; their hooks shall be of silver, and their sockets of brass. The length of the court shall be an hundred cubits, and the breadth fifty every where, and the height five cubits of fine twined linen, and their sockets of brass. All the vessels of the tabernacle in all the service thereof, and all the pins thereof, and all the pins of the court, shall be of brass.`,
    summary: 'Specifications for the courtyard that surrounded the Tabernacle, establishing a sacred boundary between the holy and the common, accessible to all Israelites.',
    sanctuary_element: 'courtyard',
    model_id: 'tabernacle',
    element_component_id: 'courtyard',
    passage_type: 'direct',
    difficulty_level: 'intermediate',
    featured: false
  },
  {
    reference: 'Exodus 28:1-43',
    book: 'Exodus',
    chapter_start: 28,
    verse_start: 1,
    chapter_end: 28,
    verse_end: 43,
    translation: 'KJV',
    title: 'The High Priest\'s Garments',
    full_text: `And take thou unto thee Aaron thy brother, and his sons with him, from among the children of Israel, that he may minister unto me in the priest's office, even Aaron, Nadab and Abihu, Eleazar and Ithamar, Aaron's sons. And thou shalt make holy garments for Aaron thy brother for glory and for beauty. And thou shalt speak unto all that are wise hearted, whom I have filled with the spirit of wisdom, that they may make Aaron's garments to consecrate him, that he may minister unto me in the priest's office. And these are the garments which they shall make; a breastplate, and an ephod, and a robe, and a broidered coat, a mitre, and a girdle: and they shall make holy garments for Aaron thy brother, and his sons, that he may minister unto me in the priest's office.`,
    summary: 'Detailed description of the sacred garments worn by the High Priest, each element rich with symbolism pointing to Christ\'s priestly ministry.',
    sanctuary_element: 'priesthood',
    model_id: 'tabernacle',
    element_component_id: 'priesthood',
    passage_type: 'direct',
    difficulty_level: 'advanced',
    featured: false
  },
  {
    reference: 'Exodus 29:38-46',
    book: 'Exodus',
    chapter_start: 29,
    verse_start: 38,
    chapter_end: 29,
    verse_end: 46,
    translation: 'KJV',
    title: 'The Daily Offerings',
    full_text: `Now this is that which thou shalt offer upon the altar; two lambs of the first year day by day continually. The one lamb thou shalt offer in the morning; and the other lamb thou shalt offer at even: And with the one lamb a tenth deal of flour mingled with the fourth part of an hin of beaten oil; and the fourth part of an hin of wine for a drink offering. And the other lamb thou shalt offer at even, and shalt do thereto according to the meat offering of the morning, and according to the drink offering thereof, for a sweet savour, an offering made by fire unto the LORD. This shall be a continual burnt offering throughout your generations at the door of the tabernacle of the congregation before the LORD: where I will meet you, to speak there unto thee. And there I will meet with the children of Israel, and the tabernacle shall be sanctified by my glory. And I will sanctify the tabernacle of the congregation, and the altar: I will sanctify also both Aaron and his sons, to minister to me in the priest's office. And I will dwell among the children of Israel, and will be their God. And they shall know that I am the LORD their God, that brought them forth out of the land of Egypt, that I may dwell among them: I am the LORD their God.`,
    summary: 'The continual daily offerings that maintained fellowship between God and His people, morning and evening, pointing to Christ\'s constant intercession.',
    sanctuary_element: 'altar_burnt',
    model_id: 'tabernacle',
    element_component_id: 'altar_burnt',
    passage_type: 'direct',
    difficulty_level: 'intermediate',
    featured: false
  },
  {
    reference: 'Exodus 30:1-10',
    book: 'Exodus',
    chapter_start: 30,
    verse_start: 1,
    chapter_end: 30,
    verse_end: 10,
    translation: 'KJV',
    title: 'The Altar of Incense',
    full_text: `And thou shalt make an altar to burn incense upon: of shittim wood shalt thou make it. A cubit shall be the length thereof, and a cubit the breadth thereof; foursquare shall it be: and two cubits shall be the height thereof: the horns thereof shall be of the same. And thou shalt overlay it with pure gold, the top thereof, and the sides thereof round about, and the horns thereof; and thou shalt make unto it a crown of gold round about. And two golden rings shalt thou make to it under the crown of it, by the two corners thereof, upon the two sides of it shalt thou make it; and they shall be for places for the staves to bear it withal. And thou shalt make the staves of shittim wood, and overlay them with gold. And thou shalt put it before the vail that is by the ark of the testimony, before the mercy seat that is over the testimony, where I will meet with thee. And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it. And when Aaron lighteth the lamps at even, he shall burn incense upon it, a perpetual incense before the LORD throughout your generations. Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon. And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD.`,
    summary: 'The Golden Altar of Incense before the veil, representing the prayers of God\'s people ascending to heaven through Christ\'s intercession.',
    sanctuary_element: 'incense_altar',
    model_id: 'tabernacle',
    element_component_id: 'incense_altar',
    passage_type: 'direct',
    difficulty_level: 'intermediate',
    featured: true
  },
  {
    reference: 'Exodus 30:17-21',
    book: 'Exodus',
    chapter_start: 30,
    verse_start: 17,
    chapter_end: 30,
    verse_end: 21,
    translation: 'KJV',
    title: 'The Bronze Laver',
    full_text: `And the LORD spake unto Moses, saying, Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. For Aaron and his sons shall wash their hands and their feet thereat: When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.`,
    summary: 'The Bronze Laver for ceremonial washing, symbolizing the cleansing and sanctification needed to approach God.',
    sanctuary_element: 'laver',
    model_id: 'tabernacle',
    element_component_id: 'laver',
    passage_type: 'direct',
    difficulty_level: 'beginner',
    featured: false
  },
  {
    reference: 'Leviticus 16:1-34',
    book: 'Leviticus',
    chapter_start: 16,
    verse_start: 1,
    chapter_end: 16,
    verse_end: 34,
    translation: 'KJV',
    title: 'The Day of Atonement',
    full_text: `And the LORD spake unto Moses after the death of the two sons of Aaron, when they offered before the LORD, and died; And the LORD said unto Moses, Speak unto Aaron thy brother, that he come not at all times into the holy place within the vail before the mercy seat, which is upon the ark; that he die not: for I will appear in the cloud upon the mercy seat. Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering.`,
    summary: 'The most sacred day of the year when the High Priest entered the Most Holy Place to make atonement for the sins of Israel, prefiguring Christ\'s heavenly ministry and the investigative judgment.',
    sanctuary_element: 'ark',
    model_id: 'tabernacle',
    element_component_id: 'ark',
    passage_type: 'typological',
    difficulty_level: 'advanced',
    featured: true
  },

  // ==================== SOLOMON'S TEMPLE PASSAGES ====================
  {
    reference: '1 Kings 6:1-38',
    book: '1 Kings',
    chapter_start: 6,
    verse_start: 1,
    chapter_end: 6,
    verse_end: 38,
    translation: 'KJV',
    title: 'Solomon\'s Temple Construction',
    full_text: `And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD. And the house which king Solomon built for the LORD, the length thereof was threescore cubits, and the breadth thereof twenty cubits, and the height thereof thirty cubits.`,
    summary: 'The magnificent temple built by King Solomon in Jerusalem, a permanent structure replacing the portable Tabernacle and becoming the center of Israelite worship.',
    sanctuary_element: 'temple_structure',
    model_id: 'solomon',
    element_component_id: 'temple_structure',
    passage_type: 'historical',
    difficulty_level: 'intermediate',
    featured: true
  },
  {
    reference: '1 Kings 7:15-51',
    book: '1 Kings',
    chapter_start: 7,
    verse_start: 15,
    chapter_end: 7,
    verse_end: 51,
    translation: 'KJV',
    title: 'Temple Furnishings and Pillars',
    full_text: `For he cast two pillars of brass, of eighteen cubits high apiece: and a line of twelve cubits did compass either of them about. And he made two chapiters of molten brass, to set upon the tops of the pillars: the height of the one chapiter was five cubits, and the height of the other chapiter was five cubits: And nets of checker work, and wreaths of chain work, for the chapiters which were upon the top of the pillars; seven for the one chapiter, and seven for the other chapiter. And he made the pillars, and two rows round about upon the one network, to cover the chapiters that were upon the top, with pomegranates: and so did he for the other chapiter. And the chapiters that were upon the top of the pillars were of lily work in the porch, four cubits. And the chapiters upon the two pillars had pomegranates also above, over against the belly which was by the network: and the pomegranates were two hundred in rows round about upon the other chapiter. And he set up the pillars in the porch of the temple: and he set up the right pillar, and called the name thereof Jachin: and he set up the left pillar, and called the name thereof Boaz.`,
    summary: 'The two great bronze pillars Jachin and Boaz, and the elaborate furnishings of Solomon\'s Temple, each element rich with symbolism.',
    sanctuary_element: 'jachin_boaz',
    model_id: 'solomon',
    element_component_id: 'jachin_boaz',
    passage_type: 'historical',
    difficulty_level: 'intermediate',
    featured: false
  },
  {
    reference: '1 Kings 8:1-66',
    book: '1 Kings',
    chapter_start: 8,
    verse_start: 1,
    chapter_end: 8,
    verse_end: 66,
    translation: 'KJV',
    title: 'The Temple Dedication',
    full_text: `Then Solomon assembled the elders of Israel, and all the heads of the tribes, the chief of the fathers of the children of Israel, unto king Solomon in Jerusalem, that they might bring up the ark of the covenant of the LORD out of the city of David, which is Zion. And all the men of Israel assembled themselves unto king Solomon at the feast in the month Ethanim, which is the seventh month.`,
    summary: 'Solomon\'s magnificent dedication prayer and ceremony as the glory of God filled the temple, establishing it as the dwelling place of God among His people.',
    sanctuary_element: 'ark',
    model_id: 'solomon',
    element_component_id: 'ark',
    passage_type: 'historical',
    difficulty_level: 'intermediate',
    featured: false
  },
  {
    reference: '2 Chronicles 3:1-17',
    book: '2 Chronicles',
    chapter_start: 3,
    verse_start: 1,
    chapter_end: 3,
    verse_end: 17,
    translation: 'KJV',
    title: 'Temple Construction Details',
    full_text: `Then Solomon began to build the house of the LORD at Jerusalem in mount Moriah, where the Lord appeared unto David his father, in the place that David had prepared in the threshingfloor of Ornan the Jebusite. And he began to build in the second day of the second month, in the fourth year of his reign.`,
    summary: 'Detailed architectural specifications and construction details of Solomon\'s Temple, built on Mount Moriah where Abraham offered Isaac.',
    sanctuary_element: 'temple_structure',
    model_id: 'solomon',
    element_component_id: 'temple_structure',
    passage_type: 'historical',
    difficulty_level: 'advanced',
    featured: false
  },

  // ==================== HEROD'S TEMPLE PASSAGES ====================
  {
    reference: 'John 2:13-22',
    book: 'John',
    chapter_start: 2,
    verse_start: 13,
    chapter_end: 2,
    verse_end: 22,
    translation: 'KJV',
    title: 'Jesus Cleanses the Temple',
    full_text: `And the Jews' passover was at hand, and Jesus went up to Jerusalem. And found in the temple those that sold oxen and sheep and doves, and the changers of money sitting: And when he had made a scourge of small cords, he drove them all out of the temple, and the sheep, and the oxen; and poured out the changers' money, and overthrew the tables; And said unto them that sold doves, Take these things hence; make not my Father's house an house of merchandise. And his disciples remembered that it was written, The zeal of thine house hath eaten me up. Then answered the Jews and said unto him, What sign shewest thou unto us, seeing that thou doest these things? Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days? But he spake of the temple of his body. When therefore he was risen from the dead, his disciples remembered that he had said this unto them; and they believed the scripture, and the word which Jesus had said.`,
    summary: 'Jesus purifies the temple and prophetically speaks of His death and resurrection, shifting focus from the earthly temple to His body as the true temple.',
    sanctuary_element: 'temple_courts',
    model_id: 'herod',
    element_component_id: 'temple_courts',
    passage_type: 'typological',
    difficulty_level: 'intermediate',
    featured: true
  },
  {
    reference: 'Matthew 24:1-2',
    book: 'Matthew',
    chapter_start: 24,
    verse_start: 1,
    chapter_end: 24,
    verse_end: 2,
    translation: 'KJV',
    title: 'Prophecy of Temple Destruction',
    full_text: `And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you, There shall not be left here one stone upon another, that shall not be thrown down.`,
    summary: 'Jesus prophesies the complete destruction of Herod\'s Temple, fulfilled in 70 AD when the Romans destroyed Jerusalem.',
    sanctuary_element: 'temple_structure',
    model_id: 'herod',
    element_component_id: 'temple_structure',
    passage_type: 'prophetic',
    difficulty_level: 'intermediate',
    featured: false
  },

  // ==================== HEAVENLY SANCTUARY PASSAGES ====================
  {
    reference: 'Hebrews 8:1-6',
    book: 'Hebrews',
    chapter_start: 8,
    verse_start: 1,
    chapter_end: 8,
    verse_end: 6,
    translation: 'KJV',
    title: 'Christ in the Heavenly Sanctuary',
    full_text: `Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man. For every high priest is ordained to offer gifts and sacrifices: wherefore it is of necessity that this man have somewhat also to offer. For if he were on earth, he should not be a priest, seeing that there are priests that offer gifts according to the law: Who serve unto the example and shadow of heavenly things, as Moses was admonished of God when he was about to make the tabernacle: for, See, saith he, that thou make all things according to the pattern shewed to thee in the mount. But now hath he obtained a more excellent ministry, by how much also he is the mediator of a better covenant, which was established upon better promises.`,
    summary: 'Christ serves as High Priest in the true heavenly sanctuary, of which the earthly sanctuary was only a copy and shadow.',
    sanctuary_element: 'throne',
    model_id: 'heavenly',
    element_component_id: 'throne',
    passage_type: 'typological',
    difficulty_level: 'advanced',
    featured: true
  },
  {
    reference: 'Hebrews 9:1-28',
    book: 'Hebrews',
    chapter_start: 9,
    verse_start: 1,
    chapter_end: 9,
    verse_end: 28,
    translation: 'KJV',
    title: 'Earthly and Heavenly Sanctuaries Compared',
    full_text: `Then verily the first covenant had also ordinances of divine service, and a worldly sanctuary. For there was a tabernacle made; the first, wherein was the candlestick, and the table, and the shewbread; which is called the sanctuary. And after the second veil, the tabernacle which is called the Holiest of all; Which had the golden censer, and the ark of the covenant overlaid round about with gold, wherein was the golden pot that had manna, and Aaron's rod that budded, and the tables of the covenant; And over it the cherubims of glory shadowing the mercyseat; of which we cannot now speak particularly. Now when these things were thus ordained, the priests went always into the first tabernacle, accomplishing the service of God. But into the second went the high priest alone once every year, not without blood, which he offered for himself, and for the errors of the people.`,
    summary: 'Comprehensive comparison between the earthly and heavenly sanctuaries, explaining Christ\'s superior ministry and the fulfillment of the sanctuary types.',
    sanctuary_element: 'throne',
    model_id: 'heavenly',
    element_component_id: 'throne',
    passage_type: 'typological',
    difficulty_level: 'advanced',
    featured: true
  },
  {
    reference: 'Revelation 4:1-11',
    book: 'Revelation',
    chapter_start: 4,
    verse_start: 1,
    chapter_end: 4,
    verse_end: 11,
    translation: 'KJV',
    title: 'The Throne Room Vision',
    full_text: `After this I looked, and, behold, a door was opened in heaven: and the first voice which I heard was as it were of a trumpet talking with me; which said, Come up hither, and I will shew thee things which must be hereafter. And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne. And he that sat was to look upon like a jasper and a sardine stone: and there was a rainbow round about the throne, in sight like unto an emerald. And round about the throne were four and twenty seats: and upon the seats I saw four and twenty elders sitting, clothed in white raiment; and they had on their heads crowns of gold. And out of the throne proceeded lightnings and thunderings and voices: and there were seven lamps of fire burning before the throne, which are the seven Spirits of God. And before the throne there was a sea of glass like unto crystal: and in the midst of the throne, and round about the throne, were four beasts full of eyes before and behind. And the first beast was like a lion, and the second beast like a calf, and the third beast had a face as a man, and the fourth beast was like a flying eagle. And the four beasts had each of them six wings about him; and they were full of eyes within: and they rest not day and night, saying, Holy, holy, holy, LORD God Almighty, which was, and is, and is to come. And when those beasts give glory and honour and thanks to him that sat on the throne, who liveth for ever and ever, The four and twenty elders fall down before him that sat on the throne, and worship him that liveth for ever and ever, and cast their crowns before the throne, saying, Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things, and for thy pleasure they are and were created.`,
    summary: 'John\'s magnificent vision of the heavenly throne room, revealing the worship and majesty surrounding God\'s presence in the heavenly sanctuary.',
    sanctuary_element: 'throne',
    model_id: 'heavenly',
    element_component_id: 'throne',
    passage_type: 'prophetic',
    difficulty_level: 'advanced',
    featured: true
  },
  {
    reference: 'Revelation 5:1-14',
    book: 'Revelation',
    chapter_start: 5,
    verse_start: 1,
    chapter_end: 5,
    verse_end: 14,
    translation: 'KJV',
    title: 'The Lamb and the Scroll',
    full_text: `And I saw in the right hand of him that sat on the throne a book written within and on the backside, sealed with seven seals. And I saw a strong angel proclaiming with a loud voice, Who is worthy to open the book, and to loose the seals thereof? And no man in heaven, nor in earth, neither under the earth, was able to open the book, neither to look thereon. And I wept much, because no man was found worthy to open and to read the book, neither to look thereon. And one of the elders saith unto me, Weep not: behold, the Lion of the tribe of Juda, the Root of David, hath prevailed to open the book, and to loose the seven seals thereof. And I beheld, and, lo, in the midst of the throne and of the four beasts, and in the midst of the elders, stood a Lamb as it had been slain, having seven horns and seven eyes, which are the seven Spirits of God sent forth into all the earth. And he came and took the book out of the right hand of him that sat upon the throne.`,
    summary: 'Christ, the Lamb of God, is revealed as the only one worthy to open the sealed scroll, demonstrating His role as Mediator in the heavenly sanctuary.',
    sanctuary_element: 'throne',
    model_id: 'heavenly',
    element_component_id: 'throne',
    passage_type: 'prophetic',
    difficulty_level: 'advanced',
    featured: false
  },
  {
    reference: 'Revelation 8:1-5',
    book: 'Revelation',
    chapter_start: 8,
    verse_start: 1,
    chapter_end: 8,
    verse_end: 5,
    translation: 'KJV',
    title: 'The Golden Altar in Heaven',
    full_text: `And when he had opened the seventh seal, there was silence in heaven about the space of half an hour. And I saw the seven angels which stood before God; and to them were given seven trumpets. And another angel came and stood at the altar, having a golden censer; and there was given unto him much incense, that he should offer it with the prayers of all saints upon the golden altar which was before the throne. And the smoke of the incense, which came with the prayers of the saints, ascended up before God out of the angel's hand. And the angel took the censer, and filled it with fire of the altar, and cast it into the earth: and there were voices, and thunderings, and lightnings, and an earthquake.`,
    summary: 'The golden altar of incense in the heavenly sanctuary, where the prayers of the saints are offered before God\'s throne.',
    sanctuary_element: 'altar',
    model_id: 'heavenly',
    element_component_id: 'altar',
    passage_type: 'prophetic',
    difficulty_level: 'intermediate',
    featured: false
  },
  {
    reference: 'Revelation 11:19',
    book: 'Revelation',
    chapter_start: 11,
    verse_start: 19,
    chapter_end: 11,
    verse_end: 19,
    translation: 'KJV',
    title: 'The Ark in the Heavenly Temple',
    full_text: `And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.`,
    summary: 'The Most Holy Place is opened in heaven, revealing the ark of God\'s testament, signifying the commencement of the investigative judgment.',
    sanctuary_element: 'ark',
    model_id: 'heavenly',
    element_component_id: 'ark',
    passage_type: 'prophetic',
    difficulty_level: 'advanced',
    featured: true
  },
  {
    reference: 'Daniel 7:9-14',
    book: 'Daniel',
    chapter_start: 7,
    verse_start: 9,
    chapter_end: 7,
    verse_end: 14,
    translation: 'KJV',
    title: 'The Judgment Scene',
    full_text: `I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire. A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened. I beheld then because of the voice of the great words which the horn spake: I beheld even till the beast was slain, and his body destroyed, and given to the burning flame. As concerning the rest of the beasts, they had their dominion taken away: yet their lives were prolonged for a season and time. I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him. And there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him: his dominion is an everlasting dominion, which shall not pass away, and his kingdom that which shall not be destroyed.`,
    summary: 'Daniel\'s prophetic vision of the judgment scene in heaven, beginning in 1844, when Christ entered the Most Holy Place to begin the investigative judgment.',
    sanctuary_element: 'throne',
    model_id: 'heavenly',
    element_component_id: 'throne',
    passage_type: 'prophetic',
    difficulty_level: 'advanced',
    featured: true
  },
  {
    reference: 'Daniel 8:14',
    book: 'Daniel',
    chapter_start: 8,
    verse_start: 14,
    chapter_end: 8,
    verse_end: 14,
    translation: 'KJV',
    title: 'The 2300 Day Prophecy',
    full_text: `And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.`,
    summary: 'The pivotal prophecy of the 2300 days (years), culminating in 1844 when Christ entered the Most Holy Place of the heavenly sanctuary to begin the final phase of His high priestly ministry.',
    sanctuary_element: 'ark',
    model_id: 'heavenly',
    element_component_id: 'ark',
    passage_type: 'prophetic',
    difficulty_level: 'advanced',
    featured: true
  }
];

export async function seedScripturePassages() {
  try {
    console.log('🌱 Starting Scripture Passages Seeding...\n');

    for (const passage of scripturePassages) {
      try {
        // Check if passage already exists
        const { data: existing } = await supabase
          .from('scripture_passages')
          .select('id')
          .eq('reference', passage.reference)
          .eq('translation', passage.translation)
          .maybeSingle();

        if (existing) {
          console.log(`   ✓ ${passage.reference} already exists, skipping...`);
          continue;
        }

        // Insert new passage
        const { error: insertError } = await supabase
          .from('scripture_passages')
          .insert([passage]);

        if (insertError) {
          console.error(`   ✗ Error inserting ${passage.reference}:`, insertError.message);
        } else {
          console.log(`   ✓ Inserted: ${passage.reference} - ${passage.title}`);
        }
      } catch (err) {
        console.error(`   ✗ Error processing ${passage.reference}:`, err);
      }
    }

    console.log('\n✅ Scripture Passages Seeding Complete!');
    console.log(`📊 Total passages processed: ${scripturePassages.length}`);
  } catch (error) {
    console.error('❌ Fatal error during scripture seeding:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedScripturePassages()
    .then(() => {
      console.log('\n🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}
