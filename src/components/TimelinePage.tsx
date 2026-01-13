import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Clock, Play, Pause, SkipForward, SkipBack, Book, GraduationCap, Trophy } from 'lucide-react';
import { QuestionModal } from './timeline-learning/QuestionModal';
import { ProgressDashboard } from './timeline-learning/ProgressDashboard';
import { useTimelineLearning } from '../hooks/useTimelineLearning';

type TimelineStep = {
  step: number;
  aaron: string;
  jesus: string;
  aaronRef?: string;
  jesusRef?: string;
  description?: string;
};

const TimelinePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // New state for learning system (additive - does not modify existing functionality)
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [selectedStepForQuestions, setSelectedStepForQuestions] = useState<number | null>(null);
  const [questionMode, setQuestionMode] = useState<'study' | 'challenge'>('study');
  const { userId, getStepProgress } = useTimelineLearning(currentStep);

  const timelineSteps: TimelineStep[] = [
    // Step 0
    {
      step: 0,
      aaron: "Aaron comes through the gate to work in the morning",
      jesus: "Jesus is born into this world of sinful human flesh",
      aaronRef: "Leviticus 16:3 - Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering.",
      jesusRef: "Matthew 1:21 - And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.; Luke 1:35 - And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God. ; John 1:14 - And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
      description: "Entrance into the work of Salvation: Aaron begins daily service in the Tabernacle; Christ enters humanity through Mary and the Holy Spirit."
    },
    // Step 1
    {
      step: 1,
      aaron: "Washes body & puts on common priest’s clothes",
      jesus: "Baptism (by John at the river Jordan)",
      aaronRef: "Leviticus 16:4 - He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on.\nExodus 30:18-21 - Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. For Aaron and his sons shall wash their hands and their feet thereat: When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "Matthew 3:13-17 - Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness. Then he suffered him. And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.; Mark 1:9-11; Luke 3:21-22",
      description: "Consecration and preparation for ministry."
    },
    // Step 2
    {
      step: 2,
      aaron: "Kills bull for himself & his household",
      jesus: "Crucifixion as a bull for Himself & co-laborers",
      aaronRef: "Leviticus 16:6, 11 - And Aaron shall offer his bullock of the sin offering, which is for himself, and make an atonement for himself, and for his house... And Aaron shall bring the bullock of the sin offering, which is for himself, and shall make an atonement for himself, and for his house, and shall kill the bullock of the sin offering which is for himself.",
      jesusRef: "Hebrews 7:27 - Who needeth not daily, as those high priests, to offer up sacrifice, first for his own sins, and then for the people's: for this he did once, when he offered up himself. ; 2 Corinthians 5:21 - For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
      description: "Atonement provision: Aaron needs covering; Christ provides the ultimate sacrifice."
    },
    // Step 3
    {
      step: 3,
      aaron: "Washes hands & feet",
      jesus: "Resurrection (removes traces of sin)",
      aaronRef: "Exodus 30:18-21 - Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. For Aaron and his sons shall wash their hands and their feet thereat: When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "Matthew 28:5-6 - And the angel answered and said unto the women, Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said. Come, see the place where the Lord lay. ; Romans 6:9-10 - Knowing that Christ being raised from the dead dieth no more; death hath no more dominion over him. For in that he died, he died unto sin once: but in that he liveth, he liveth unto God. ; 1 Corinthians 15:20-22 - But now is Christ risen from the dead, and become the firstfruits of them that slept. For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive.",
      description: "Purity emphasized; Christ’s resurrection demonstrates victory over sin and death."
    },
    // Step 4
    {
      step: 4,
      aaron: "Picks up incense & censer",
      jesus: "Passed through with His own merits",
      aaronRef: "Leviticus 16:12-13 - And he shall take a censer full of burning coals of fire from off the altar before the LORD, and his hands full of sweet incense beaten small, and bring it within the vail: And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not.",
      jesusRef: "Hebrews 9:11-12 - But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building; Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; Hebrews 4:14-16 - Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession. For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.",
      description: "Intercession initiates: Aaron’s incense typifies Christ’s merits."
    },
    // Step 5
    {
      step: 5,
      aaron: "Aaron as common priest puts blood of bullock on ark: acceptance by God; puts censer on Mercy Seat",
      jesus: "Jesus presents His blood; acceptance by God",
      aaronRef: "Leviticus 16:14 - And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times.",
      jesusRef: "Hebrews 9:12 - Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; Hebrews 10:12-14 - But this man, after he had offered one sacrifice for sins for ever, sat down on the right hand of God; From henceforth expecting till his enemies be made his footstool. For by one offering he hath perfected for ever them that are sanctified.",
      description: "Acceptance before God on the basis of blood."
    },
    // Step 6
    {
      step: 6,
      aaron: "Meets with co-laborers (fellow priests) and returns to altar of sacrifice (the Outer Court = World); kills lamb for the people",
      jesus: "Meets with co-laborers; 40 days spent on Earth as a Lamb for the people",
      aaronRef: "Leviticus 16:18 - And he shall go out unto the altar that is before the LORD, and make an atonement for it; and shall take of the blood of the bullock, and of the blood of the goat, and put it upon the horns of the altar round about.",
      jesusRef: "Acts 1:3 - To whom also he shewed himself alive after his passion by many infallible proofs, being seen of them forty days, and speaking of the things pertaining to the kingdom of God. ; Luke 24:36-43 - And as they thus spake, Jesus himself stood in the midst of them, and saith unto them, Peace be unto you. But they were terrified and affrighted, and supposed that they had seen a spirit. And he said unto them, Why are ye troubled? and why do thoughts arise in your hearts? Behold my hands and my feet, that it is I myself: handle me, and see; for a spirit hath not flesh and bones, as ye see me have.",
      description: "Ministry with disciples before His Ascension."
    },
    // Step 7
    {
      step: 7,
      aaron: "Washes hands & feet (each time there is a sacrifice is made)",
      jesus: "He possesed the same body that He had before taking on humanity. Divine stature restored to 16ft.",
      aaronRef: "Exodus 30:18-21  Ex:30:18: Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. 19 For Aaron and his sons shall wash their hands and their feet thereat : 20 When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: 21: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.  ",
      jesusRef: "Hebrews 2:5-19; I Corinthians 15:35-53",
      description: "Renewed purity in type; assertion of restored divine stature as He had in Heaven."
    },
    // Step 8
    {
      step: 8,
      aaron: "Dresses as High Priest",
      jesus: "Inauguration as High Priest",
      aaronRef: "Leviticus 16:4, 23-24 - He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on... And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Hebrews 4:14 - Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession. ; Hebrews 8:1-2 - Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.",
      description: "High-priestly investiture and inauguration."
    },
    // Step 9
    {
      step: 9,
      aaron: "Pours oil into lamp",
      jesus: "Pentecost",
      aaronRef: "Exodus 27:20-21 - And thou shalt command the children of Israel, that they bring thee pure oil olive beaten for the light, to cause the lamp to burn always. In the tabernacle of the congregation without the vail, which is before the testimony, Aaron and his sons shall order it from evening to morning before the LORD: it shall be a statute for ever unto their generations on the behalf of the children of Israel.",
      jesusRef: "Acts 2:1-4 - And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance. ; John 16:7 - Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you.",
      description: "Light and Spirit poured out upon the people."
    },
    // Step 10
    {
      step: 10,
      aaron: "Puts incense on altar",
      jesus: "Christ on first throne; pleads His merits for the people",
      aaronRef: "Exodus 30:7-10 - And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it. And when Aaron lighteth the lamps at even, he shall burn incense upon it, a perpetual incense before the LORD throughout your generations. Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon. And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD.",
      jesusRef: "Hebrews 7:25 - Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them. ; Revelation 8:3-4 - And another angel came and stood at the altar, having a golden censer; and there was given unto him much incense, that he should offer it with the prayers of all saints upon the golden altar which was before the throne. And the smoke of the incense, which came with the prayers of the saints, ascended up before God out of the angel's hand.",
      description: "Active intercession on behalf of the people."
    },

    // Yearly Service section
    // Step 11
    {
      step: 11,
      aaron: "Blowing of the trumpet (~10 days before Day of Atonement)",
      jesus: "First Angel’s Message preached (1833)",
      aaronRef: "Leviticus 23:24-27 - Speak unto the children of Israel, saying, In the seventh month, in the first day of the month, shall ye have a sabbath, a memorial of blowing of trumpets, an holy convocation. Ye shall do no servile work therein: but ye shall offer an offering made by fire unto the LORD. And the LORD spake unto Moses, saying, Also on the tenth day of this seventh month there shall be a day of atonement: it shall be an holy convocation unto you; and ye shall afflict your souls, and offer an offering made by fire unto the LORD.",
      jesusRef: "Revelation 14:6-7 - And I saw another angel fly in the midst of heaven, having the everlasting gospel to preach unto them that dwell on the earth, and to every nation, and kindred, and tongue, and people, Saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters. (historic application 1830s)",
      description: "Announcement and warning preceding the atonement."
    },
    // Step 12
    {
      step: 12,
      aaron: "Common priests leave the court; Aaron casts lots & kills the Lord’s goat for the people",
      jesus: "Ends work of 24 elders & 4 beasts; Jesus shows He died as a goat for the people",
      aaronRef: "Leviticus 16:7-10, 15 - And he shall take the two goats, and present them before the LORD at the door of the tabernacle of the congregation. And Aaron shall cast lots upon the two goats; one lot for the LORD, and the other lot for the scapegoat. And Aaron shall bring the goat upon which the LORD'S lot fell, and offer him for a sin offering. But the goat, on which the lot fell to be the scapegoat, shall be presented alive before the LORD, to make an atonement with him, and to let him go for a scapegoat into the wilderness... Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat.",
      jesusRef: "Hebrews 9:26-28 - For then must he often have suffered since the foundation of the world: but now once in the end of the world hath he appeared to put away sin by the sacrifice of himself. And as it is appointed unto men once to die, but after this the judgment: So Christ was once offered to bear the sins of many; and unto them that look for him shall he appear the second time without sin unto salvation.",
      description: "Selection and offering for the people; antitype emphasizes Christ’s substitution."
    },
    // Step 13
    {
      step: 13,
      aaron: "High Priest goes into the Most Holy Place",
      jesus: "Christ goes into the Most Holy Place in Heaven (1844)",
      aaronRef: "Leviticus 16:15-16 - Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat: And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness.",
      jesusRef: "Hebrews 9:23-24 - It was therefore necessary that the patterns of things in the heavens should be purified with these; but the heavenly things themselves with better sacrifices than these. For Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us. (historic application 1844)",
      description: "Entrance into the climactic phase of atonement."
    },
    // Step 14
    {
      step: 14,
      aaron: "(continued from above)",
      jesus: "Jesus stands before the Law showing the Sabbath to those in 1844",
      aaronRef: "Leviticus 16:16 - And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness.",
      jesusRef: "Revelation 11:19 - And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail. (interpreted); Exodus 20:8-11 - Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates: For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it.",
      description: "Law-centered focus in the Most Holy Place (interpretive emphasis)."
    },
    // Step 15
    {
      step: 15,
      aaron: "(continued from above)",
      jesus: "Christ sits with God as Judge; Investigative Judgment",
      aaronRef: "Leviticus 16:17 - And there shall be no man in the tabernacle of the congregation when he goeth in to make an atonement in the holy place, until he come out, and have made an atonement for himself, and for his household, and for all the congregation of Israel.",
      jesusRef: "Daniel 7:9-10 - I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire. A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened. ; Revelation 20:12 - And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works. (investigative judgment interpreted)",
      description: "Judicial phase emphasizing review and verdict."
    },
    // Step 16
    {
      step: 16,
      aaron: "High Priest stands before God and the Law; sprinkles blood on the Mercy Seat and before the Law",
      jesus: "Pleads His blood; second death removed & God’s people sealed; blots out sins from “the book”",
      aaronRef: "Leviticus 16:14-15 - And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times. Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat.",
      jesusRef: "Hebrews 10:17 - And their sins and iniquities will I remember no more. ; Revelation 3:5 - He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life, but I will confess his name before my Father, and before his angels. ; Acts 3:19 - Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord.",
      description: "Atonement finalized for the faithful; sins removed from the record (interpretive)."
    },
    // Step 17
    {
      step: 17,
      aaron: "Stops at altar of incense; cleans Holy Place by blood",
      jesus: "Throws down censer; cleans Holy Place; Close of Probation",
      aaronRef: "Leviticus 16:16-19 - And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness. And there shall be no man in the tabernacle of the congregation when he goeth in to make an atonement in the holy place, until he come out, and have made an atonement for himself, and for his household, and for all the congregation of Israel. And he shall go out unto the altar that is before the LORD, and make an atonement for it; and shall take of the blood of the bullock, and of the blood of the goat, and put it upon the horns of the altar round about. And he shall sprinkle of the blood upon it with his finger seven times, and cleanse it, and hallow it from the uncleanness of the children of Israel.",
      jesusRef: "Revelation 8:5 - And the angel took the censer, and filled it with fire of the altar, and cast it into the earth: and there were voices, and thunderings, and lightnings, and an earthquake. ; Revelation 22:11 - He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still.",
      description: "Cleansing completed; intercession concludes."
    },
    // Step 18
    {
      step: 18,
      aaron: "Puts sins on scapegoat",
      jesus: "Puts sins on Satan",
      aaronRef: "Leviticus 16:20-22 - And when he hath made an end of reconciling the holy place, and the tabernacle of the congregation, and the altar, he shall bring the live goat: And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness: And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.",
      jesusRef: "Revelation 20:1-3 - And I saw an angel come down from heaven, having the key of the bottomless pit and a great chain in his hand. And he laid hold on the dragon, that old serpent, which is the Devil, and Satan, and bound him a thousand years, And cast him into the bottomless pit, and shut him up, and set a seal upon him, that he should deceive the nations no more, till the thousand years should be fulfilled: and after that he must be loosed a little season. (antitypical confinement interpreted)",
      description: "Transfer of sin responsibility to the ultimate originator."
    },
    // Step 19
    {
      step: 19,
      aaron: "Removes High Priest robes",
      jesus: "Removes High Priest robe",
      aaronRef: "Leviticus 16:23-24 - And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Isaiah 63:1-3 - Who is this that cometh from Edom, with dyed garments from Bozrah? this that is glorious in his apparel, travelling in the greatness of his strength? I that speak in righteousness, mighty to save. Wherefore art thou red in thine apparel, and thy garments like him that treadeth in the winefat? I have trodden the winepress alone; and of the people there was none with me: for I will tread them in mine anger, and trample them in my fury; and their blood shall be sprinkled upon my garments, and I will stain all my raiment.",
      description: "Transition from intercessory attire signifying phase change."
    },
    // Step 20
    {
      step: 20,
      aaron: "Leaves Sanctuary; comes out in white (linen)",
      jesus: "Leaves Sanctuary; Plagues fall; comes out in white",
      aaronRef: "Leviticus 16:23-24 - And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Revelation 15:1, 6-8 - And I saw another sign in heaven, great and marvellous, seven angels having the seven last plagues; for in them is filled up the wrath of God... And the seven angels came out of the temple, having the seven plagues, clothed in pure and white linen, and having their breasts girded with golden girdles. And one of the four beasts gave unto the seven angels seven golden vials full of the wrath of God, who liveth for ever and ever. And the temple was filled with smoke from the glory of God, and from his power; and no man was able to enter into the temple, till the seven plagues of the seven angels were fulfilled. ; Revelation 16:1 - And I heard a great voice out of the temple saying to the seven angels, Go your ways, and pour out the vials of the wrath of God upon the earth.",
      description: "Emergence signals completed mediation; judgments proceed."
    },
    // Step 21
    {
      step: 21,
      aaron: "Washes body – “baptism”",
      jesus: "Jacob’s Time of Trouble; Plagues; the cup of baptism",
      aaronRef: "Leviticus 16:24, 26, 28 - And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people... And he that let go the goat for the scapegoat shall wash his clothes, and bathe his flesh in water, and afterward come into the camp... And he that burneth them shall wash his clothes, and bathe his flesh in water, and afterward he shall come into the camp.",
      jesusRef: "Jeremiah 30:7 - Alas! for that day is great, so that none is like it: it is even the time of Jacob's trouble; but he shall be saved out of it. ; Daniel 12:1 - And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book.",
      description: "Final purification motif; God’s people endure final crisis."
    },
    // Step 22
    {
      step: 22,
      aaron: "Puts two rams on the fire",
      jesus: "Second coming of Christ",
      aaronRef: "Leviticus 16:24 - And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Matthew 24:30-31 - And then shall appear the sign of the Son of man in heaven: and then shall all the tribes of the earth mourn, and they shall see the Son of man coming in the clouds of heaven with power and great glory. And he shall send his angels with a great sound of a trumpet, and they shall gather together his elect from the four winds, from one end of heaven to the other. ; 1 Thessalonians 4:16-17 - For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
      description: "Culminating offering in type; visible return in antitype."
    },
    // Step 23
    {
      step: 23,
      aaron: "Puts fat on the fire",
      jesus: "End of sinners in fire (lake of fire)",
      aaronRef: "Leviticus 16:25 - And the fat of the sin offering shall he burn upon the altar.",
      jesusRef: "Revelation 20:14-15 - And death and hell were cast into the lake of fire. This is the second death. And whosoever was not found written in the book of life was cast into the lake of fire.",
      description: "Final judgment on sin."
    },
    // Step 24
    {
      step: 24,
      aaron: "Bodies of bull and goat burned outside of the camp",
      jesus: "Second fire; New Earth; All traces of sin gone!",
      aaronRef: "Leviticus 16:27 - And the bullock for the sin offering, and the goat for the sin offering, whose blood was brought in to make atonement in the holy place, shall one carry forth without the camp; and they shall burn in the fire their skins, and their flesh, and their dung.",
      jesusRef: "Revelation 21:1, 4-5 - And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea... And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away. And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful. ; Revelation 22:3-5 - And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him: And they shall see his face; and his name shall be in their foreheads. And there shall be no night there; and they need no candle, neither light of the sun; for the Lord God giveth them light: and they shall reign for ever and ever. ; Nahum 1:9 - What do ye imagine against the LORD? he will make an utter end: affliction shall not rise up the second time.",
      description: "Total removal of sin; restoration of all things."
    }
  ];

  // Simple autoplay for demo (optional). You can remove this if undesired.
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= timelineSteps.length - 1) return 0; // loop back to 0
        return prev + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [isPlaying, timelineSteps.length]);

  const nextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, timelineSteps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  // New handler functions for learning system (additive)
  const handleOpenQuestions = (stepId: number, mode: 'study' | 'challenge') => {
    setSelectedStepForQuestions(stepId);
    setQuestionMode(mode);
    setShowQuestionModal(true);
  };

  const handleCloseQuestions = () => {
    setShowQuestionModal(false);
    setSelectedStepForQuestions(null);
  };

  const currentStepData = timelineSteps[currentStep];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-silver to-gray-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            {/* New: My Progress Button (additive) */}
            <button
              onClick={() => setShowProgressDashboard(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-sanctuary-gold text-sanctuary-purple rounded-lg hover:bg-sanctuary-gold-dark transition-colors font-semibold"
            >
              <Trophy className="w-5 h-5" />
              <span>My Progress</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Aaron & Jesus Ministry Timeline</h1>
              <p className="text-gray-100 text-lg">Animated comparison of earthly type and heavenly antitype</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-sanctuary-purple">Timeline Navigation</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sanctuary-brass">Step {currentStepData?.step} of {timelineSteps.length - 1}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === timelineSteps.length - 1}
                  className="p-2 bg-sanctuary-silver text-sanctuary-purple rounded-lg hover:bg-sanctuary-silver-dark transition-colors disabled:opacity-50"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-sanctuary-linen rounded-full h-2 mb-4">
            <div
              className="bg-sanctuary-purple h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep) / (timelineSteps.length - 1)) * 100}%`
              }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex flex-wrap gap-2">
            {timelineSteps.map((s, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  currentStep === index
                    ? 'bg-sanctuary-purple text-white'
                    : currentStep > index
                    ? 'bg-sanctuary-gold text-sanctuary-purple'
                    : 'bg-sanctuary-silver text-sanctuary-purple'
                }`}
                title={`Step ${s.step}`}
              >
                {s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Main Timeline Display */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Aaron's Ministry (Type) */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-brass overflow-hidden">
            <div className="bg-sanctuary-brass text-white p-4">
              <h3 className="text-xl font-bold">Aaron's Earthly Ministry (Type)</h3>
              <p className="text-amber-100">Daily and Day of Atonement Service</p>
            </div>

            <div className="p-6">
              <div className="h-64 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-brass/30">
                <div className="text-center text-sanctuary-brass">
                  <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-brass/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-10 h-10 text-sanctuary-brass" />
                  </div>
                  <p className="text-lg font-medium">Step {currentStepData?.step} Animation</p>
                  <p className="text-sm">Aaron's Ministry Visualization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Aaron's Action</h4>
                  <p className="text-sanctuary-brass">{currentStepData?.aaron}</p>
                </div>

                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2 flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Scripture Reference</span>
                  </h4>
                  <p className="text-sanctuary-blue font-medium">{currentStepData?.aaronRef || '—'}</p>
                </div>

                {/* New: Test Your Knowledge Button (additive) */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleOpenQuestions(currentStepData?.step || 0, 'study')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-sanctuary-purple text-white rounded-lg hover:bg-sanctuary-purple-dark transition-all hover:shadow-lg group"
                  >
                    <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Test Your Knowledge</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Jesus' Ministry (Antitype) */}
          <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold overflow-hidden">
            <div className="bg-sanctuary-gold text-sanctuary-purple p-4">
              <h3 className="text-xl font-bold">Jesus' Heavenly Ministry (Antitype)</h3>
              <p className="text-yellow-800">Eternal Salvation Work</p>
            </div>

            <div className="p-6">
              <div className="h-64 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-gold/30">
                <div className="text-center text-sanctuary-gold-dark">
                  <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-gold/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-10 h-10 text-sanctuary-gold-dark" />
                  </div>
                  <p className="text-lg font-medium">Step {currentStepData?.step} Animation</p>
                  <p className="text-sm">Jesus' Ministry Visualization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Jesus' Fulfillment</h4>
                  <p className="text-sanctuary-brass">{currentStepData?.jesus}</p>
                </div>

                <div className="bg-sanctuary-linen rounded-lg p-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2 flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Scripture Reference</span>
                  </h4>
                  <p className="text-sanctuary-blue font-medium">{currentStepData?.jesusRef || '—'}</p>
                </div>

                {/* New: Test Your Knowledge Button (additive) */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleOpenQuestions(currentStepData?.step || 0, 'study')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-sanctuary-gold text-sanctuary-purple rounded-lg hover:bg-sanctuary-gold-dark transition-all hover:shadow-lg group"
                  >
                    <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Test Your Knowledge</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theological Connection */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Theological Connection</h3>
          <div className="bg-gradient-to-r from-sanctuary-linen to-white rounded-lg p-6 border border-sanctuary-silver">
            <p className="text-sanctuary-brass leading-relaxed text-lg">
              {currentStepData?.description}
            </p>
          </div>
        </div>

        {/* Complete Timeline Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-6">Complete 25-Step Timeline (including Step 0)</h3>
          <div className="text-center text-sanctuary-brass mb-4">
            <p>This timeline presents steps 0–24, aligning Aaron’s typical services with Jesus’ antitypical ministry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelineSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  currentStep === index
                    ? 'bg-sanctuary-purple text-white'
                    : 'bg-sanctuary-linen hover:bg-sanctuary-purple/10 text-sanctuary-purple'
                }`}
              >
                <div className="font-semibold mb-1">Step {step.step}</div>
                <div className="text-sm opacity-90">{step.aaron}</div>
                <div className="text-xs mt-1 opacity-75">↓</div>
                <div className="text-sm opacity-90">{step.jesus}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New: Interactive Learning System Modals (additive - does not affect existing functionality) */}
      {selectedStepForQuestions !== null && (
        <QuestionModal
          stepId={selectedStepForQuestions}
          stepTitle={`Step ${selectedStepForQuestions}: ${timelineSteps.find(s => s.step === selectedStepForQuestions)?.aaron || 'Timeline Study'}`}
          isOpen={showQuestionModal}
          onClose={handleCloseQuestions}
          mode={questionMode}
        />
      )}

      <ProgressDashboard
        isOpen={showProgressDashboard}
        onClose={() => setShowProgressDashboard(false)}
        userId={userId}
      />
    </div>
  );
};

export default TimelinePage;