import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Play, Pause, SkipForward, SkipBack, Book } from 'lucide-react';

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

  const timelineSteps: TimelineStep[] = [
    // Step 0
    {
      step: 0,
      aaron: "Aaron comes through the gate to work in the morning",
      jesus: "Jesus is born into this world of sinful human flesh",
      aaronRef: "{Leviticus 16:3} - Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering.",
      jesusRef: "Matthew 1:21 - And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.; Luke 1:35 - And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God. ; {John 1:14} - And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
      description: "Entrance into the work of Salvation: Aaron begins daily service in the Tabernacle; Christ enters humanity through Mary and the Holy Spirit."
    },
    // Step 1
    {
      step: 1,
      aaron: "Washes body & puts on common priest’s clothes",
      jesus: "Baptism (by John at the river Jordan)",
      aaronRef: "{Leviticus 16:4} - He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on.\n{Exodus 30:18-21} - Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. For Aaron and his sons shall wash their hands and their feet thereat: When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Matthew 3:13-17} - Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness. Then he suffered him. And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.; Mark 1:9-11; Luke 3:21-22",
      description: "Consecration and preparation for ministry."
    },
    // Step 2
    {
      step: 2,
      aaron: "Kills bull for himself & his household",
      jesus: "Crucifixion as a bull for Himself & co-laborers",
      aaronRef: "{Leviticus 16:6, 11} (6) And Aaron shall offer his bullock of the sin offering, which is for himself, and make an atonement for himself, and for his house. (11) And Aaron shall bring the bullock of the sin offering, which is for himself, and shall make an atonement for himself, and for his house, and shall kill the bullock of the sin offering which is for himself: ",
      jesusRef: "{Hebrews 7:27} Who needeth not daily, as those high priests, to offer up sacrifice, first for his own sins, and then for the people's: for this he did once, when he offered up himself.; {2 Corinthians 5:21}  - For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
      description: "Atonement provision: Aaron needs covering; Christ provides the ultimate sacrifice."
    },
    // Step 3
    {
      step: 3,
      aaron: "Washes hands & feet",
      jesus: "Resurrection (removes traces of sin)",
      aaronRef: "{Exodus 30:18-21} Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein.(19) For Aaron and his sons shall wash their hands and their feet thereat: (20) When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: (21) So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Matthew 28} (see entire chapter); {Romans 6:9-10} Knowing that Christ being raised from the dead dieth no more; death hath no more dominion over him (10) For in that he died, he died unto sin once: but in that he liveth, he liveth unto God.;  {1 Corinthians 15} (see entire chapter)",
      description: "Purity emphasized; Christ’s resurrection demonstrates victory over sin and death."
    },
    // Step 4
    {
      step: 4,
      aaron: "Picks up incense & censer",
      jesus: "Passed through with His own merits",
      aaronRef: "{Leviticus 16:12-13}  And he shall take a censer full of burning coals of fire from off the altar before the LORD, and his hands full of sweet incense beaten small, and bring it within the vail:(13) And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not: ",
      jesusRef: "{Hebrews 9:11-12} But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building; (12) Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; {Hebrews 4:14-16}  Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession. (15) For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. (16) Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.",
      description: "Intercession initiates: Aaron’s incense typifies Christ’s merits."
    },
    // Step 5
    {
      step: 5,
      aaron: "Aaron as common priest puts blood of bullock on ark: acceptance by God; puts censer on Mercy Seat",
      jesus: "Jesus presents His blood; acceptance by God",
      aaronRef: "{Leviticus 16:14} And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times. ",
      jesusRef: "{Hebrews 9:12}  Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; {Hebrews 10:12-14} But this man, after he had offered one sacrifice for sins for ever, sat down on the right hand of God; (13) From henceforth expecting till his enemies be made his footstool. (14) For by one offering he hath perfected for ever them that are sanctified.",
      description: "Acceptance before God on the basis of blood."
    },
    // Step 6
    {
      step: 6,
      aaron: "Meets with co-laborers (fellow priests) and returns to altar of sacrifice (the Outer Court = World); kills lamb for the people: inspects the lamb",
      jesus: "Meets with co-laborers; 40 days spent on Earth as a Lamb for the people",
      aaronRef: "{Leviticus 1:3} If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD.",
      jesusRef: "{Acts 1:3} To whom also he shewed himself alive after his passion by many infallible proofs, being seen of them forty days, and speaking of the things pertaining to the kingdom of God:; {Luke 24}(see entire chapter)",
      description: "Ministry with disciples before His Ascension."
    },
    // Step 7
    {
      step: 7,
      aaron: "Washes hands & feet",
      jesus: "He possesed the same body that He had before taking on humanity. Divine stature restored to 16ft.",
      aaronRef: "{Exodus 30:18-21}  Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. (19)For Aaron and his sons shall wash their hands and their feet thereat: (20) When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: (21) So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Hebrews 2:5-19} But we see Jesus, who was made a little lower than the angels for the suffering of death, crowned with glory and honour; that he by the grace of God should taste death for every man...; {I Corinthians 15:35-53} So also is the resurrection of the dead. It is sown in corruption; it is raised in incorruption: (43) It is sown in dishonour; it is raised in glory: it is sown in weakness; it is raised in power:...",
      description: "Renewed purity in type; assertion of restored divine stature as He had in Heaven."
    },
    // Step 8
    {
      step: 8,
      aaron: "Dresses as High Priest",
      jesus: "Inauguration as High Priest",
      aaronRef: "{Leviticus 16:4, 23-24} (4)) He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on. (23-24) And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there:(24) And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "{Hebrews 4:14} Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession.; {Hebrews 8:1-2} Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; (2) A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.",
      description: "High-priestly investiture and inauguration."
    },
    // Step 9
    {
      step: 9,
      aaron: "Pours oil into lamp",
      jesus: "Pentecost",
      aaronRef: "{Exodus 27:20-21}  And thou shalt command the children of Israel, that they bring thee pure oil olive beaten for the light, to cause the lamp to burn always. (21) In the tabernacle of the congregation without the vail, which is before the testimony, Aaron and his sons shall order it from evening to morning before the LORD: it shall be a statute for ever unto their generations on the behalf of the children of Israel.",
      jesusRef: "{Acts 2} (see entire chapter); {John 16:7} Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you. ",
      description: "Light and Spirit poured out upon the people."
    },
    // Step 10
    {
      step: 10,
      aaron: "Puts incense on altar",
      jesus: "Christ on first throne; pleads His merits for the people",
      aaronRef: "{Exodus 30:7-10}  And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it. (8)  And when Aaron lighteth the lamps at even, he shall burn incense upon it, a perpetual incense before the LORD throughout your generations. (9) Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon. (10) And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD.",
      jesusRef: "{Hebrews 7:25} Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.; {Revelation 8:3-4}  And another angel came and stood at the altar, having a golden censer; and there was given unto him much incense, that he should offer it with the prayers of all saints upon the golden altar which was before the throne. (4) And the smoke of the incense, which came with the prayers of the saints, ascended up before God out of the angel's hand. ",
      description: "Active intercession on behalf of the people."
    },

    // Yearly Service section
    // Step 11
    {
      step: 11,
      aaron: "Blowing of the trumpet (~10 days before Day of Atonement)",
      jesus: "First Angel’s Message preached (1833)",
      aaronRef: "Leviticus 23:24-27",
      jesusRef: "Revelation 14:6-7 (historic application 1830s)",
      description: "Announcement and warning preceding the atonement."
    },
    // Step 12
    {
      step: 12,
      aaron: "Common priests leave the court; Aaron casts lots & kills the Lord’s goat for the people",
      jesus: "Ends work of 24 elders & 4 beasts; Jesus shows He died as a goat for the people",
      aaronRef: "Leviticus 16:7-10, 15",
      jesusRef: "Hebrews 9:26-28",
      description: "Selection and offering for the people; antitype emphasizes Christ’s substitution."
    },
    // Step 13
    {
      step: 13,
      aaron: "High Priest goes into the Most Holy Place",
      jesus: "Christ goes into the Most Holy Place in Heaven (1844)",
      aaronRef: "Leviticus 16:15-16",
      jesusRef: "Hebrews 9:23-24 (historic application 1844)",
      description: "Entrance into the climactic phase of atonement."
    },
    // Step 14
    {
      step: 14,
      aaron: "(continued from above)",
      jesus: "Jesus stands before the Law showing the Sabbath to those in 1844",
      aaronRef: "",
      jesusRef: "Revelation 11:19 (interpreted); Exodus 20:8-11",
      description: "Law-centered focus in the Most Holy Place (interpretive emphasis)."
    },
    // Step 15
    {
      step: 15,
      aaron: "(continued from above)",
      jesus: "Christ sits with God as Judge; Investigative Judgment",
      aaronRef: "",
      jesusRef: "Daniel 7:9-10; Revelation 20:12 (investigative judgment interpreted)",
      description: "Judicial phase emphasizing review and verdict."
    },
    // Step 16
    {
      step: 16,
      aaron: "High Priest stands before God and the Law; sprinkles blood on the Mercy Seat and before the Law",
      jesus: "Pleads His blood; second death removed & God’s people sealed; blots out sins from “the book”",
      aaronRef: "Leviticus 16:14-15",
      jesusRef: "Hebrews 10:17; Revelation 3:5; Acts 3:19",
      description: "Atonement finalized for the faithful; sins removed from the record (interpretive)."
    },
    // Step 17
    {
      step: 17,
      aaron: "Stops at altar of incense; cleans Holy Place by blood",
      jesus: "Throws down censer; cleans Holy Place; Close of Probation",
      aaronRef: "Leviticus 16:16-19",
      jesusRef: "Revelation 8:5; Revelation 22:11",
      description: "Cleansing completed; intercession concludes."
    },
    // Step 18
    {
      step: 18,
      aaron: "Puts sins on scapegoat",
      jesus: "Puts sins on Satan",
      aaronRef: "Leviticus 16:20-22",
      jesusRef: "Revelation 20:1-3 (antitypical confinement interpreted)",
      description: "Transfer of sin responsibility to the ultimate originator."
    },
    // Step 19
    {
      step: 19,
      aaron: "Removes High Priest robes",
      jesus: "Removes High Priest robe",
      aaronRef: "Leviticus 16:23-24",
      jesusRef: "",
      description: "Transition from intercessory attire signifying phase change."
    },
    // Step 20
    {
      step: 20,
      aaron: "Leaves Sanctuary; comes out in white (linen)",
      jesus: "Leaves Sanctuary; Plagues fall; comes out in white",
      aaronRef: "Leviticus 16:23-24",
      jesusRef: "Revelation 15–16",
      description: "Emergence signals completed mediation; judgments proceed."
    },
    // Step 21
    {
      step: 21,
      aaron: "Washes body – “baptism”",
      jesus: "Jacob’s Time of Trouble; Plagues; the cup of baptism",
      aaronRef: "Leviticus 16:24, 26, 28",
      jesusRef: "Jeremiah 30:7; Daniel 12:1",
      description: "Final purification motif; God’s people endure final crisis."
    },
    // Step 22
    {
      step: 22,
      aaron: "Puts two rams on the fire",
      jesus: "Second coming of Christ",
      aaronRef: "Leviticus 16:24",
      jesusRef: "Matthew 24:30-31; 1 Thessalonians 4:16-17",
      description: "Culminating offering in type; visible return in antitype."
    },
    // Step 23
    {
      step: 23,
      aaron: "Puts fat on the fire",
      jesus: "End of sinners in fire (lake of fire)",
      aaronRef: "Leviticus 16:25",
      jesusRef: "Revelation 20:14-15",
      description: "Final judgment on sin."
    },
    // Step 24
    {
      step: 24,
      aaron: "Bodies of bull and goat burned outside of the camp",
      jesus: "Second fire; New Earth; All traces of sin gone!",
      aaronRef: "Leviticus 16:27",
      jesusRef: "Revelation 21–22; Nahum 1:9",
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

  const currentStepData = timelineSteps[currentStep];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      {/* Header */}
      <div className="bg-gradient-to-r from-sanctuary-silver to-gray-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
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
    </div>
  );
};

export default TimelinePage;
