import { supabase } from '../lib/supabase';

interface TypeAntitypeLink {
  category: string;
  ot_type_name: string;
  ot_type_description: string;
  ot_scripture_refs: string[];
  nt_antitype_name: string;
  nt_antitype_description: string;
  nt_scripture_refs: string[];
  connection_explanation: string;
  gilbert_commentary: string;
  significance_level: number;
}

const typeAntitypeLinks: TypeAntitypeLink[] = [
  // SANCTUARY FURNITURE
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Brazen Altar',
    ot_type_description: 'Bronze altar in outer court where sacrifices were offered and blood shed',
    ot_scripture_refs: ['Exodus 27:1-8', 'Exodus 38:1-7', 'Leviticus 1:1-9'],
    nt_antitype_name: 'The Cross of Christ',
    nt_antitype_description: 'Where Christ offered Himself as the ultimate sacrifice',
    nt_scripture_refs: ['Hebrews 13:10-13', '1 Peter 2:24', 'Colossians 1:20'],
    connection_explanation: 'The brazen altar, where animal sacrifices were offered, pointed forward to Calvary where Christ, the Lamb of God, shed His blood for the sins of the world. Just as the altar was the first step in approaching God, the cross is the entry point to salvation.',
    gilbert_commentary: 'Gilbert emphasizes that the brazen altar represents Christ\'s substitutionary atonement. The bronze material signifies divine judgment borne by Christ. Every sacrifice pointed to the one perfect sacrifice.',
    significance_level: 10
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Bronze Laver',
    ot_type_description: 'Basin of water for priestly washing between altar and sanctuary',
    ot_scripture_refs: ['Exodus 30:17-21', 'Exodus 38:8'],
    nt_antitype_name: 'Word of God and Holy Spirit',
    nt_antitype_description: 'Cleansing power of God\'s Word and Spirit for sanctification',
    nt_scripture_refs: ['Ephesians 5:26', 'Titus 3:5', 'John 15:3', 'John 17:17'],
    connection_explanation: 'The laver\'s water for cleansing represents the sanctifying work of God\'s Word and Spirit. Just as priests had to wash before service, believers must be cleansed daily by Scripture and the Holy Spirit\'s power.',
    gilbert_commentary: 'The laver teaches the necessity of daily cleansing. It represents regeneration and ongoing sanctification. The Word washes us from the defilement of sin.',
    significance_level: 9
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Table of Showbread',
    ot_type_description: 'Gold table with twelve loaves representing God\'s provision',
    ot_scripture_refs: ['Exodus 25:23-30', 'Leviticus 24:5-9'],
    nt_antitype_name: 'Christ, Bread of Life',
    nt_antitype_description: 'Jesus as spiritual sustenance and provision',
    nt_scripture_refs: ['John 6:35', 'John 6:48-51', 'Matthew 4:4'],
    connection_explanation: 'The showbread, continually before God, represents Christ as the living bread. Just as the bread sustained physical life, Christ sustains spiritual life. He is our daily provision.',
    gilbert_commentary: 'Gilbert notes the twelve loaves represent the twelve tribes, showing God\'s provision for all His people. Christ feeds all who come to Him. The table was pure gold, signifying His divine nature.',
    significance_level: 9
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Golden Lampstand (Menorah)',
    ot_type_description: 'Seven-branched golden candlestick providing light in Holy Place',
    ot_scripture_refs: ['Exodus 25:31-40', 'Exodus 27:20-21'],
    nt_antitype_name: 'Christ, Light of the World',
    nt_antitype_description: 'Jesus as illuminator and Holy Spirit as guide',
    nt_scripture_refs: ['John 8:12', 'John 1:4-9', 'Revelation 1:20'],
    connection_explanation: 'The lampstand\'s pure olive oil burned continually, giving light. Christ is the Light of the world, and the Holy Spirit enlightens our understanding. The seven branches represent the fullness of the Spirit.',
    gilbert_commentary: 'The menorah reveals Christ as our only source of spiritual light. Made of one piece of pure gold, it shows His unity and divinity. Believers are to reflect His light.',
    significance_level: 10
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Altar of Incense',
    ot_type_description: 'Small golden altar before veil where incense was burned',
    ot_scripture_refs: ['Exodus 30:1-10', 'Exodus 30:34-38'],
    nt_antitype_name: 'Christ\'s Intercession',
    nt_antitype_description: 'Christ\'s continual intercession for believers',
    nt_scripture_refs: ['Hebrews 7:25', 'Romans 8:34', 'Revelation 8:3-4'],
    connection_explanation: 'The sweet incense rising to God represents Christ\'s intercession and our prayers offered through Him. The incense was perpetual, as is Christ\'s ministry on our behalf.',
    gilbert_commentary: 'Gilbert emphasizes this altar\'s proximity to the Most Holy Place, showing Christ\'s direct access to the Father. Our prayers, mingled with His merits, are acceptable to God.',
    significance_level: 10
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Ark of the Covenant',
    ot_type_description: 'Gold-covered chest containing Ten Commandments, God\'s throne',
    ot_scripture_refs: ['Exodus 25:10-22', 'Exodus 40:20-21'],
    nt_antitype_name: 'Christ, Embodiment of God\'s Law',
    nt_antitype_description: 'Jesus who perfectly fulfilled and embodies God\'s law',
    nt_scripture_refs: ['Matthew 5:17', 'Romans 10:4', 'Hebrews 9:4'],
    connection_explanation: 'The ark contained God\'s law written on stone; Christ has God\'s law written in His heart. He is the perfect keeper and fulfiller of the law. The ark was the meeting place between God and man, as is Christ.',
    gilbert_commentary: 'The ark represents Christ\'s divine-human nature. The gold signifies divinity, the wood humanity. Christ is both our lawgiver and law-keeper, both judge and advocate.',
    significance_level: 10
  },
  {
    category: 'Sanctuary Furniture',
    ot_type_name: 'Mercy Seat (Kapporeth)',
    ot_type_description: 'Gold cover on ark where blood was sprinkled, God\'s throne of grace',
    ot_scripture_refs: ['Exodus 25:17-22', 'Leviticus 16:14-15'],
    nt_antitype_name: 'Christ Our Propitiation',
    nt_antitype_description: 'Jesus as the place where mercy and justice meet',
    nt_scripture_refs: ['Romans 3:25', '1 John 2:2', 'Hebrews 9:5'],
    connection_explanation: 'The mercy seat, sprinkled with blood, was where God met with man. Christ is our mercy seat - through His blood, God\'s justice is satisfied and mercy flows to us. Here law and grace embrace.',
    gilbert_commentary: 'Gilbert beautifully describes the mercy seat as the meeting place of divine justice and mercy. The cherubim look down on the blood-sprinkled cover, representing how heaven looks on Christ\'s sacrifice with satisfaction.',
    significance_level: 10
  },

  // SACRIFICES AND OFFERINGS
  {
    category: 'Sacrifices',
    ot_type_name: 'Burnt Offering (Olah)',
    ot_type_description: 'Completely consumed sacrifice expressing total dedication',
    ot_scripture_refs: ['Leviticus 1:1-17', 'Leviticus 6:8-13'],
    nt_antitype_name: 'Christ\'s Complete Devotion',
    nt_antitype_description: 'Christ\'s total consecration and perfect obedience to Father',
    nt_scripture_refs: ['Ephesians 5:2', 'Philippians 2:8', 'Hebrews 9:14'],
    connection_explanation: 'The burnt offering, entirely consumed, represents Christ\'s complete self-dedication to God\'s will. Nothing was held back. His life was a continuous "living sacrifice" culminating in Calvary.',
    gilbert_commentary: 'This offering speaks of Christ\'s perfect life of consecration. Every moment was offered to God. His death was the climax of a life wholly devoted to the Father\'s purpose.',
    significance_level: 9
  },
  {
    category: 'Sacrifices',
    ot_type_name: 'Sin Offering (Chattath)',
    ot_type_description: 'Sacrifice for unintentional sins, blood sprinkled in sanctuary',
    ot_scripture_refs: ['Leviticus 4:1-35', 'Leviticus 6:24-30'],
    nt_antitype_name: 'Christ Bearing Our Sins',
    nt_antitype_description: 'Jesus taking our sins upon Himself',
    nt_scripture_refs: ['2 Corinthians 5:21', '1 Peter 2:24', 'Isaiah 53:10'],
    connection_explanation: 'The sin offering shows Christ becoming sin for us. The blood taken into the sanctuary pictures how our sins were transferred to the heavenly sanctuary, requiring Christ\'s ministry there.',
    gilbert_commentary: 'Gilbert explains how the sin offering reveals both Christ\'s death and His priestly ministry. The blood in the sanctuary shows the ongoing need for His mediation.',
    significance_level: 10
  },
  {
    category: 'Sacrifices',
    ot_type_name: 'Trespass Offering (Asham)',
    ot_type_description: 'Offering for specific sins requiring restitution',
    ot_scripture_refs: ['Leviticus 5:14-6:7', 'Leviticus 7:1-7'],
    nt_antitype_name: 'Christ\'s Satisfaction for Sin',
    nt_antitype_description: 'Jesus making full restitution for our guilt',
    nt_scripture_refs: ['Isaiah 53:10', '1 Peter 3:18', 'Romans 5:10'],
    connection_explanation: 'The trespass offering required full restitution plus twenty percent. Christ made complete satisfaction for sin, going beyond what was required, providing abundant grace.',
    gilbert_commentary: 'This offering teaches that Christ\'s atonement fully satisfies divine justice. The added twenty percent shows grace exceeding our debt.',
    significance_level: 8
  },
  {
    category: 'Sacrifices',
    ot_type_name: 'Peace Offering (Shelamim)',
    ot_type_description: 'Voluntary offering of thanksgiving and fellowship',
    ot_scripture_refs: ['Leviticus 3:1-17', 'Leviticus 7:11-21'],
    nt_antitype_name: 'Christ Our Peace',
    nt_antitype_description: 'Jesus restoring peace between God and humanity',
    nt_scripture_refs: ['Ephesians 2:14', 'Colossians 1:20', 'Romans 5:1'],
    connection_explanation: 'The peace offering, shared between God, priest, and worshiper, represents the restored fellowship made possible through Christ. He is our peace, reconciling us to God.',
    gilbert_commentary: 'Gilbert emphasizes the communal aspect - God, priest, and worshiper all partaking. Through Christ, we have fellowship with God and each other.',
    significance_level: 8
  },
  {
    category: 'Sacrifices',
    ot_type_name: 'Passover Lamb',
    ot_type_description: 'Unblemished lamb sacrificed for household protection',
    ot_scripture_refs: ['Exodus 12:1-13', 'Exodus 12:21-28'],
    nt_antitype_name: 'Christ, Lamb of God',
    nt_antitype_description: 'Jesus as the perfect Passover sacrifice',
    nt_scripture_refs: ['1 Corinthians 5:7', 'John 1:29', '1 Peter 1:19'],
    connection_explanation: 'The Passover lamb, without blemish, slain at evening, its blood applied for protection - every detail points to Christ. He was sacrificed at Passover time, fulfilling this ancient type.',
    gilbert_commentary: 'Gilbert details how Christ fulfilled Passover perfectly: examined four days (His ministry), without blemish (sinless), killed at evening (3 PM), bones unbroken (John 19:36). The applied blood saves.',
    significance_level: 10
  },
  {
    category: 'Sacrifices',
    ot_type_name: 'Day of Atonement Scapegoat (Azazel)',
    ot_type_description: 'Live goat bearing sins into wilderness',
    ot_scripture_refs: ['Leviticus 16:20-22', 'Leviticus 16:8-10'],
    nt_antitype_name: 'Satan\'s Final Punishment',
    nt_antitype_description: 'Ultimate removal of sin and destruction of sin\'s author',
    nt_scripture_refs: ['Revelation 20:10', 'Revelation 20:1-3'],
    connection_explanation: 'The scapegoat, bearing sins into the wilderness, represents the final eradication of sin and Satan\'s ultimate punishment. Sin is not just forgiven but removed from God\'s presence forever.',
    gilbert_commentary: 'Gilbert clarifies that the scapegoat is not Christ but represents Satan, who ultimately bears responsibility for sin. After judgment, sin is placed on its originator.',
    significance_level: 9
  },

  // PRIESTHOOD
  {
    category: 'Priesthood',
    ot_type_name: 'High Priest (Kohen Gadol)',
    ot_type_description: 'Chief mediator between God and Israel, entered Most Holy Place',
    ot_scripture_refs: ['Exodus 28:1-43', 'Leviticus 16:1-34', 'Hebrews 5:1-4'],
    nt_antitype_name: 'Christ Our High Priest',
    nt_antitype_description: 'Jesus as our great High Priest in heavenly sanctuary',
    nt_scripture_refs: ['Hebrews 4:14-16', 'Hebrews 7:24-26', 'Hebrews 9:11-12'],
    connection_explanation: 'The high priest\'s ministry of mediation, intercession, and annual atonement all pointed to Christ\'s superior priesthood. He entered the true Most Holy Place with His own blood.',
    gilbert_commentary: 'Gilbert extensively shows how every aspect of the high priest\'s garments, consecration, and ministry finds fulfillment in Christ. The Urim and Thummim represent Christ\'s perfect wisdom.',
    significance_level: 10
  },
  {
    category: 'Priesthood',
    ot_type_name: 'Aaronic Priesthood',
    ot_type_description: 'Levitical priests offering daily sacrifices and ministry',
    ot_scripture_refs: ['Exodus 28:1', 'Numbers 18:1-7', 'Hebrews 7:11-12'],
    nt_antitype_name: 'Christ\'s Melchizedek Priesthood',
    nt_antitype_description: 'Jesus as eternal priest after order of Melchizedek',
    nt_scripture_refs: ['Hebrews 5:6-10', 'Hebrews 7:1-28', 'Psalm 110:4'],
    connection_explanation: 'The Aaronic priesthood, though legitimate, was temporary and imperfect. Christ\'s priesthood, after Melchizedek\'s order, is eternal, perfect, and needs no successor.',
    gilbert_commentary: 'The Levitical priesthood showed the need for mediation but pointed beyond itself to the perfect High Priest. Christ combines priesthood and kingship like Melchizedek.',
    significance_level: 9
  },
  {
    category: 'Priesthood',
    ot_type_name: 'Priestly Garments',
    ot_type_description: 'Elaborate vestments of high priest for glory and beauty',
    ot_scripture_refs: ['Exodus 28:2-43', 'Exodus 39:1-31'],
    nt_antitype_name: 'Christ\'s Righteousness and Glory',
    nt_antitype_description: 'Jesus clothed in divine glory and perfect righteousness',
    nt_scripture_refs: ['Revelation 1:13', 'Philippians 2:6-7', 'Isaiah 61:10'],
    connection_explanation: 'Every piece of the high priest\'s garments - breastplate, ephod, robe, mitre - symbolizes aspects of Christ\'s character, ministry, and glory. He wears the names of His people on His heart.',
    gilbert_commentary: 'Gilbert details how the gold, blue, purple, and scarlet represent Christ\'s divinity, heavenly origin, royalty, and sacrifice. The breastplate shows He bears His people on His heart.',
    significance_level: 8
  },
  {
    category: 'Priesthood',
    ot_type_name: 'Priestly Consecration',
    ot_type_description: 'Seven-day ceremony setting apart priests for service',
    ot_scripture_refs: ['Exodus 29:1-37', 'Leviticus 8:1-36'],
    nt_antitype_name: 'Christ\'s Inauguration',
    ot_antitype_description: 'Jesus set apart and anointed for His ministry',
    nt_scripture_refs: ['Luke 3:21-22', 'Acts 10:38', 'Hebrews 5:5'],
    connection_explanation: 'The elaborate consecration ceremony, with washing, anointing, and offerings, finds its fulfillment in Christ\'s baptism, anointing, and setting apart for His redemptive mission.',
    gilbert_commentary: 'The consecration\'s washing represents Christ\'s sinlessness, the anointing His reception of the Spirit, the sacrifices His substitutionary work.',
    significance_level: 7
  },

  // FESTIVALS
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Passover',
    ot_type_description: 'Commemoration of deliverance from Egypt',
    ot_scripture_refs: ['Exodus 12:1-28', 'Leviticus 23:5'],
    nt_antitype_name: 'Christ\'s Crucifixion',
    nt_antitype_description: 'Jesus dying as our Passover at exact prophetic time',
    nt_scripture_refs: ['1 Corinthians 5:7', 'John 19:14', 'Luke 22:15-20'],
    connection_explanation: 'Passover commemorated deliverance from physical bondage. Christ, our Passover, delivers from spiritual bondage. He died on Passover, fulfilling 1,500 years of types.',
    gilbert_commentary: 'Gilbert emphasizes the precise prophetic timing - Christ died on the 14th of Nisan, the exact day Passover lambs were slain. Every detail harmonizes.',
    significance_level: 10
  },
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Unleavened Bread',
    ot_type_description: 'Seven days eating bread without leaven',
    ot_scripture_refs: ['Exodus 12:15-20', 'Leviticus 23:6-8'],
    nt_antitype_name: 'Christ\'s Sinless Life',
    nt_antitype_description: 'Jesus as the unleavened bread, pure and sinless',
    nt_scripture_refs: ['1 Corinthians 5:7-8', '2 Corinthians 5:21', '1 Peter 2:22'],
    connection_explanation: 'Leaven represents sin. Unleavened bread represents Christ\'s sinlessness. Believers are to put away the leaven of sin and live in purity.',
    gilbert_commentary: 'This feast immediately following Passover shows that justification (Passover) must be followed by sanctification (unleavened bread). Christ is both.',
    significance_level: 8
  },
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Firstfruits',
    ot_type_description: 'Offering of first harvest sheaf',
    ot_scripture_refs: ['Leviticus 23:9-14'],
    nt_antitype_name: 'Christ\'s Resurrection',
    nt_antitype_description: 'Jesus rising as firstfruits of resurrection',
    nt_scripture_refs: ['1 Corinthians 15:20-23', 'Colossians 1:18'],
    connection_explanation: 'The firstfruits sheaf was waved on the day after Sabbath during Passover week - the exact day Christ rose. He is the firstfruits, guaranteeing our resurrection.',
    gilbert_commentary: 'Gilbert notes the perfect fulfillment: Christ rose on the very day the firstfruits were waved. His resurrection is the guarantee and pattern of ours.',
    significance_level: 9
  },
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Pentecost (Weeks)',
    ot_type_description: 'Harvest festival fifty days after Firstfruits',
    ot_scripture_refs: ['Leviticus 23:15-22', 'Deuteronomy 16:9-12'],
    nt_antitype_name: 'Outpouring of Holy Spirit',
    nt_antitype_description: 'Coming of Holy Spirit on the Church',
    nt_scripture_refs: ['Acts 2:1-4', 'Acts 2:16-21'],
    connection_explanation: 'Pentecost marked the wheat harvest. On this feast, the Holy Spirit was poured out, marking the harvest of souls beginning. Three thousand were gathered that day.',
    gilbert_commentary: 'The fifty days from Firstfruits to Pentecost were fulfilled exactly. The two wave loaves with leaven represent Jewish and Gentile believers, still containing sin but accepted in Christ.',
    significance_level: 9
  },
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Trumpets',
    ot_type_description: 'Day of trumpet blowing, beginning of judgment preparation',
    ot_scripture_refs: ['Leviticus 23:23-25', 'Numbers 29:1-6'],
    nt_antitype_name: 'Pre-Advent Judgment',
    nt_antitype_description: 'Investigative judgment beginning in heaven',
    nt_scripture_refs: ['Revelation 11:15', 'Daniel 7:9-10', '1 Thessalonians 4:16'],
    connection_explanation: 'Trumpets announced the beginning of the judgment season. In 1844, the heavenly trumpets sounded as Christ entered the Most Holy Place to begin final judgment.',
    gilbert_commentary: 'Gilbert identifies this with the pre-advent judgment. The trumpets awaken God\'s people to prepare for the Day of Atonement (judgment) that follows.',
    significance_level: 10
  },
  {
    category: 'Festivals',
    ot_type_name: 'Day of Atonement (Yom Kippur)',
    ot_type_description: 'Annual cleansing of sanctuary and judgment of Israel',
    ot_scripture_refs: ['Leviticus 16:1-34', 'Leviticus 23:27-32'],
    nt_antitype_name: 'Final Judgment and Cleansing',
    nt_antitype_description: 'Christ\'s ministry in Most Holy Place, investigative judgment',
    nt_scripture_refs: ['Daniel 8:14', 'Hebrews 9:23-28', 'Revelation 11:19'],
    connection_explanation: 'The Day of Atonement, when the high priest entered the Most Holy Place, types Christ entering the heavenly Most Holy in 1844. This is the antitypical day of judgment.',
    gilbert_commentary: 'Gilbert emphasizes this is THE key to understanding Hebrews and Revelation. Christ\'s ministry moved from Holy to Most Holy, beginning the final phase before His return.',
    significance_level: 10
  },
  {
    category: 'Festivals',
    ot_type_name: 'Feast of Tabernacles (Booths)',
    ot_type_description: 'Seven-day harvest celebration living in temporary shelters',
    ot_scripture_refs: ['Leviticus 23:33-43', 'Deuteronomy 16:13-15'],
    nt_antitype_name: 'Eternal Dwelling with God',
    nt_antitype_description: 'Final ingathering and eternal tabernacling in new earth',
    nt_scripture_refs: ['Revelation 21:3', 'John 1:14', 'Revelation 7:9-15'],
    connection_explanation: 'Tabernacles celebrated the completed harvest and looked forward to God dwelling with His people. This points to the eternal harvest and God tabernacling with redeemed humanity.',
    gilbert_commentary: 'This feast looks to the final fulfillment when God\'s dwelling is with men forever. The harvest is complete, the journey over, the rest attained.',
    significance_level: 9
  },

  // MATERIALS AND COLORS
  {
    category: 'Materials',
    ot_type_name: 'Gold',
    ot_type_description: 'Pure gold used throughout sanctuary furnishings',
    ot_scripture_refs: ['Exodus 25:11', 'Exodus 25:24', 'Exodus 25:31'],
    nt_antitype_name: 'Christ\'s Divinity',
    nt_antitype_description: 'Jesus\' divine nature and character',
    nt_scripture_refs: ['Colossians 2:9', 'Hebrews 1:3', 'John 1:1'],
    connection_explanation: 'Gold, the most precious metal, always represents divinity in Scripture. Christ is the true gold, possessing the fullness of the Godhead bodily.',
    gilbert_commentary: 'Gilbert notes that wherever gold appears in the sanctuary, it speaks of Christ\'s divine nature. The purity of the gold represents His absolute holiness.',
    significance_level: 8
  },
  {
    category: 'Materials',
    ot_type_name: 'Acacia Wood (Shittim)',
    ot_type_description: 'Incorruptible wood overlaid with gold',
    ot_scripture_refs: ['Exodus 25:10', 'Exodus 27:1'],
    nt_antitype_name: 'Christ\'s Humanity',
    nt_antitype_description: 'Jesus\' human nature, incorruptible and pure',
    nt_scripture_refs: ['Philippians 2:7', 'Hebrews 2:14', 'Psalm 16:10'],
    connection_explanation: 'Acacia wood, resistant to decay, overlaid with gold, perfectly represents Christ\'s divine-human nature. The wood speaks of humanity, the gold of divinity.',
    gilbert_commentary: 'The shittim wood never rotted or corrupted - Christ saw no corruption. Gold-covered wood shows the union of divine and human in one Person.',
    significance_level: 8
  },
  {
    category: 'Materials',
    ot_type_name: 'Bronze (Brass)',
    ot_type_description: 'Metal used in outer court for judgment',
    ot_scripture_refs: ['Exodus 27:2', 'Numbers 21:9'],
    nt_antitype_name: 'Divine Judgment',
    nt_antitype_description: 'Christ bearing divine judgment for sin',
    nt_scripture_refs: ['Revelation 1:15', 'Isaiah 53:4-5', 'Romans 8:3'],
    connection_explanation: 'Bronze in the outer court represents judgment. Christ bore the judgment fire of God\'s wrath against sin. His feet like brass (Revelation 1:15) show He has walked through judgment.',
    gilbert_commentary: 'Bronze always appears where sin is dealt with - the altar, the laver, the serpent. Christ bore the heat of God\'s judgment that we might go free.',
    significance_level: 8
  },
  {
    category: 'Materials',
    ot_type_name: 'Blue Color',
    ot_type_description: 'Color of heaven used in sanctuary curtains',
    ot_scripture_refs: ['Exodus 25:4', 'Exodus 26:1', 'Numbers 15:38'],
    nt_antitype_name: 'Christ\'s Heavenly Origin',
    nt_antitype_description: 'Jesus coming from heaven, His celestial nature',
    nt_scripture_refs: ['John 3:13', 'John 6:38', 'John 8:23'],
    connection_explanation: 'Blue, the color of sky and heaven, represents Christ\'s heavenly origin and character. He came from above to reveal the Father.',
    gilbert_commentary: 'The blue thread in every sanctuary fabric reminded Israel that their High Priest came from heaven and would return there.',
    significance_level: 7
  },
  {
    category: 'Materials',
    ot_type_name: 'Purple Color',
    ot_type_description: 'Royal color of kings',
    ot_scripture_refs: ['Exodus 25:4', 'Exodus 26:1'],
    nt_antitype_name: 'Christ\'s Royalty',
    nt_antitype_description: 'Jesus as King of Kings',
    nt_scripture_refs: ['Revelation 19:16', 'John 18:37', 'Revelation 17:14'],
    connection_explanation: 'Purple, the color of royalty, was expensive and rare. Christ is the King of Kings, born to reign. Even at His crucifixion, they mockingly acknowledged His kingship.',
    gilbert_commentary: 'Purple in the sanctuary proclaimed that the coming Messiah would be a King. Christ is both Priest and King.',
    significance_level: 7
  },
  {
    category: 'Materials',
    ot_type_name: 'Scarlet Color',
    ot_type_description: 'Red color representing sacrifice and blood',
    ot_scripture_refs: ['Exodus 25:4', 'Leviticus 14:4', 'Isaiah 1:18'],
    nt_antitype_name: 'Christ\'s Sacrifice',
    nt_antitype_description: 'Jesus\' blood shed for sin',
    nt_scripture_refs: ['Hebrews 9:12', '1 Peter 1:19', 'Revelation 1:5'],
    connection_explanation: 'Scarlet, the color of blood, reminds us constantly that without shedding of blood there is no remission. Christ\'s blood is the price of redemption.',
    gilbert_commentary: 'Every scarlet thread in the sanctuary pointed to Calvary. The color proclaimed that the Messiah would die, pouring out His blood.',
    significance_level: 9
  }
];

export async function seedGilbertTypeAntitype() {
  console.log('Starting Type/Antitype connections seed...');

  try {
    const { data, error } = await supabase
      .from('gilbert_type_antitype_links')
      .insert(typeAntitypeLinks)
      .select();

    if (error) {
      console.error('Error seeding Type/Antitype connections:', error);
      throw error;
    }

    console.log(`Successfully seeded ${data?.length} Type/Antitype connections`);
    console.log('Connections by category:');

    const categoryCounts = typeAntitypeLinks.reduce((acc, link) => {
      acc[link.category] = (acc[link.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} connections`);
    });

    return data;
  } catch (error) {
    console.error('Failed to seed Type/Antitype connections:', error);
    throw error;
  }
}

if (require.main === module) {
  seedGilbertTypeAntitype()
    .then(() => {
      console.log('Seed completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
