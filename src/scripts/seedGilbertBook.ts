import { supabase } from '../lib/supabase';

const gilbertBookData = {
  metadata: {
    title: "Messiah in His Sanctuary",
    author: "F.C. Gilbert",
    subtitle: "A Biblical Study of the Sanctuary and Its Services",
    description: "A comprehensive exploration of the Old Testament sanctuary, its services, and their prophetic significance in understanding Christ's ministry and the plan of salvation."
  },
  chapters: [
    {
      chapter_number: 0,
      title: "Introduction",
      summary: "An overview of the sanctuary study series and its importance in understanding God's plan of salvation.",
      content: `The sanctuary and its services constituted the very heart of Israel's worship. No part of the Jewish economy was more significant than this. The study of the sanctuary reveals God's plan of salvation and provides a foundation for understanding biblical prophecy. This series of studies aims to explore the sanctuary doctrine in depth, examining its historical context, symbolic meaning, and prophetic significance.`,
      key_themes: ["Introduction to Sanctuary", "Overview", "Biblical Foundation"],
      scripture_references: ["Exodus 25:8", "Hebrews 8:1-5"],
      word_count: 120
    },
    {
      chapter_number: 1,
      title: "The Origin of the Sanctuary",
      summary: "Examines the divine origin and purpose of the sanctuary system given to Moses on Mount Sinai.",
      content: `The sanctuary was not a human invention, but a divine revelation. When Moses was on Mount Sinai, God showed him the pattern of the heavenly sanctuary and commanded him to build an earthly copy. Exodus 25:8-9 records: "And let them make me a sanctuary; that I may dwell among them. According to all that I shew thee, after the pattern of the tabernacle, and the pattern of all the instruments thereof, even so shall ye make it."

The sanctuary served multiple purposes: it was a dwelling place for God among His people, a place of worship and sacrifice, and a visual representation of the plan of salvation. Through its services, the Israelites learned about sin, the need for atonement, and God's provision for redemption.

The materials used in construction were voluntary offerings from the people - gold, silver, brass, fine linens, and precious stones. This demonstrated that worship and service to God must come from willing hearts. The construction followed precise divine specifications, showing that God's plan of salvation is exact and purposeful.`,
      key_themes: ["Divine Origin", "Pattern from Heaven", "Purpose of Sanctuary", "Voluntary Offerings"],
      scripture_references: ["Exodus 25:8-9", "Exodus 25:1-7", "Hebrews 8:5", "Exodus 35:4-29"],
      word_count: 185
    },
    {
      chapter_number: 2,
      title: "The Court and Its Furniture",
      summary: "Describes the outer court, the altar of burnt offering, and the laver, explaining their symbolic significance.",
      content: `The sanctuary consisted of two main areas: the outer court and the tabernacle building itself. The court was an enclosed space measuring 100 cubits long and 50 cubits wide, surrounded by white linen curtains suspended from pillars.

Within this court stood two important articles: the altar of burnt offering and the laver. The altar of burnt offering was the first object encountered upon entering the court. Made of acacia wood overlaid with brass, it measured 5 cubits square and 3 cubits high. This was where sacrificial animals were offered, representing the death of Christ as our substitute. The fire on this altar was never to go out, symbolizing the continual need for atonement.

The laver stood between the altar and the tabernacle door. Made entirely of brass from the mirrors of the women of Israel, it contained water for the priests to wash their hands and feet before ministering. This represented the cleansing power of God's Word and the necessity of purity in service.

These articles taught profound spiritual lessons: the altar showed that there is no approach to God except through sacrifice, and the laver demonstrated that cleansing is essential before entering God's presence.`,
      key_themes: ["Outer Court", "Altar of Burnt Offering", "Laver", "Sacrificial System", "Cleansing"],
      scripture_references: ["Exodus 27:1-8", "Exodus 30:17-21", "Leviticus 1:1-9", "John 1:29", "Ephesians 5:26"],
      word_count: 215
    },
    {
      chapter_number: 3,
      title: "The Holy Place",
      summary: "Explores the first apartment of the sanctuary containing the candlestick, table of showbread, and altar of incense.",
      content: `The tabernacle building itself was divided into two apartments: the Holy Place and the Most Holy Place. The Holy Place, the first and larger apartment, contained three articles of furniture: the golden candlestick, the table of showbread, and the altar of incense.

The golden candlestick (menorah) stood on the south side. Made of pure gold weighing one talent, it had seven branches with lamps that burned continually, providing light for the priests' ministry. The pure olive oil used represented the Holy Spirit, and the light symbolized Christ as the Light of the world.

On the north side stood the table of showbread, overlaid with pure gold. Twelve loaves of bread, representing the twelve tribes of Israel, were placed on this table each Sabbath. This bread symbolized Christ as the Bread of Life, sustaining His people.

Before the veil leading to the Most Holy Place stood the altar of incense, made of acacia wood overlaid with gold. Here the priest burned sweet incense morning and evening, representing the prayers of God's people ascending to heaven. This pointed to Christ's intercessory ministry.

These three articles represented the Christian's experience: light (truth), bread (spiritual nourishment), and incense (prayer and intercession).`,
      key_themes: ["Holy Place", "Golden Candlestick", "Table of Showbread", "Altar of Incense", "Light and Truth", "Prayer"],
      scripture_references: ["Exodus 25:31-40", "Exodus 25:23-30", "Exodus 30:1-10", "John 8:12", "John 6:35", "Revelation 8:3-4"],
      word_count: 235
    },
    {
      chapter_number: 4,
      title: "The Most Holy Place",
      summary: "Details the inner sanctuary containing the ark of the covenant and the mercy seat, representing God's throne.",
      content: `Beyond the veil separating it from the Holy Place was the Most Holy Place, a perfect cube measuring 10 cubits on each side. This sacred chamber contained only one article of furniture: the ark of the covenant.

The ark was a chest made of acacia wood overlaid with pure gold, measuring 2.5 cubits long, 1.5 cubits wide, and 1.5 cubits high. Within the ark were three items: the two tables of stone containing the Ten Commandments, Aaron's rod that budded, and a golden pot of manna. These represented God's law, His chosen priesthood, and His provision.

Above the ark was the mercy seat, a solid plate of pure gold, and at each end stood a cherub with wings outstretched, overshadowing the mercy seat. This was where God's presence dwelt, between the cherubim. Once a year, on the Day of Atonement, the high priest entered this sacred place to sprinkle blood on the mercy seat for the sins of the nation.

The Most Holy Place represented God's throne room in heaven. The ark contained God's law, showing that His government is based on righteousness and justice. The mercy seat above the law demonstrated that mercy and grace are available to those who approach God through the appointed means of atonement.

The veil that separated the two apartments was torn from top to bottom when Christ died, symbolizing that His death opened the way for all to approach God's throne of grace.`,
      key_themes: ["Most Holy Place", "Ark of the Covenant", "Mercy Seat", "Ten Commandments", "Day of Atonement", "God's Throne"],
      scripture_references: ["Exodus 25:10-22", "Hebrews 9:3-5", "Leviticus 16:1-34", "Matthew 27:51", "Hebrews 4:16"],
      word_count: 280
    },
    {
      chapter_number: 5,
      title: "The Priesthood",
      summary: "Examines the Levitical priesthood, their qualifications, consecration, and ministry in the sanctuary.",
      content: `God appointed the tribe of Levi to serve in the sanctuary, with Aaron and his descendants serving as priests. The priests were mediators between God and the people, offering sacrifices and performing the sacred services.

The high priest held a unique position. Only he could enter the Most Holy Place on the Day of Atonement. His garments were specially designed, including a breastplate with twelve stones representing the tribes of Israel, an ephod, a robe, and a golden plate on his forehead inscribed "Holiness to the Lord."

The consecration of priests was a solemn ceremony lasting seven days, involving washing, anointing with oil, and the offering of sacrifices. This represented the spiritual preparation necessary for those who would minister in holy things.

The priests' daily work included offering morning and evening sacrifices, trimming the lamps, burning incense, and assisting worshipers with their offerings. They also taught the people God's law and served as judges in difficult cases.

The Levitical priesthood pointed forward to Christ, our great High Priest, who offered Himself as the perfect sacrifice and now ministers in the heavenly sanctuary. Unlike the earthly priests who were mortal and sinful, Christ is eternal and sinless, able to save completely those who come to God through Him.`,
      key_themes: ["Priesthood", "High Priest", "Consecration", "Priestly Garments", "Mediation", "Christ Our High Priest"],
      scripture_references: ["Exodus 28:1-43", "Leviticus 8:1-36", "Hebrews 5:1-10", "Hebrews 7:23-28", "Hebrews 9:11-12"],
      word_count: 245
    },
    {
      chapter_number: 6,
      title: "The Sacrificial System",
      summary: "Details the various types of sacrifices and offerings, explaining their purpose and prophetic meaning.",
      content: `The sacrificial system was central to sanctuary worship. Leviticus chapters 1-7 describe five main types of offerings: the burnt offering, the meal offering, the peace offering, the sin offering, and the trespass offering.

The burnt offering was completely consumed on the altar, representing total consecration to God. The meal offering, consisting of fine flour, oil, and frankincense, symbolized dedication of one's substance and service to God. The peace offering was a voluntary expression of thanksgiving and fellowship with God.

The sin offering and trespass offering dealt specifically with atonement for sin. The sin offering addressed sins of ignorance and ceremonial uncleanness, while the trespass offering involved restitution for specific wrongs. Both required the shedding of blood, emphasizing that "without shedding of blood is no remission."

The ritual for sin offerings varied based on the offerer's status. When the high priest or the congregation sinned, a bullock was required. A ruler brought a male goat, while a common person offered a female goat or lamb. The poor could bring two turtledoves or even fine flour.

All these sacrifices pointed to Christ, "the Lamb of God, which taketh away the sin of the world." His death on Calvary was the reality to which all the Old Testament sacrifices pointed. The ceremonial system was a shadow; Christ is the substance.`,
      key_themes: ["Sacrificial System", "Types of Offerings", "Burnt Offering", "Sin Offering", "Atonement", "Blood", "Christ the Sacrifice"],
      scripture_references: ["Leviticus 1-7", "Hebrews 10:1-10", "John 1:29", "Hebrews 9:22", "1 Peter 1:18-19"],
      word_count: 260
    },
    {
      chapter_number: 7,
      title: "The Daily Ministry",
      summary: "Describes the regular daily services performed by the priests in the sanctuary.",
      content: `The daily ministry in the sanctuary consisted of regular, continual services that occurred every day throughout the year. This is sometimes called the "continual" or "daily" ministry.

Each morning and evening, the priest offered a lamb as a burnt offering on the altar in the court. This represented the continual atonement needed for sin and pointed to Christ's ongoing intercessory work. The fire on the altar was never allowed to go out, symbolizing God's perpetual provision for salvation.

At the same time as the morning and evening sacrifices, the priest entered the Holy Place to trim and refill the lamps of the golden candlestick, ensuring they burned continually. This service represented the need for constant spiritual light and truth.

The priest also burned sweet incense on the golden altar before the veil. As the fragrant smoke ascended, it symbolized the prayers of God's people rising to heaven. This service was particularly sacred and was performed while the people prayed outside.

Throughout the day, individuals brought their personal offerings for sin or thanksgiving. The priest would lay his hand on the animal's head, confessing the person's sin, then slay it. The blood was taken into the Holy Place and sprinkled before the veil or applied to the horns of the altar of incense. This transferred the sin from the individual to the sanctuary, where it accumulated until the annual Day of Atonement.

These daily services taught that approach to God must be continual, that cleansing is an ongoing need, and that Christ's ministry for His people never ceases.`,
      key_themes: ["Daily Ministry", "Morning and Evening Sacrifice", "Continual Burnt Offering", "Incense", "Transfer of Sin"],
      scripture_references: ["Exodus 29:38-46", "Leviticus 4:1-35", "Numbers 28:1-8", "Hebrews 7:25", "Revelation 8:3-4"],
      word_count: 295
    },
    {
      chapter_number: 8,
      title: "The Day of Atonement",
      summary: "Explores the annual Day of Atonement service, the cleansing of the sanctuary, and its prophetic significance.",
      content: `The Day of Atonement, occurring on the tenth day of the seventh month, was the most solemn day in the Jewish religious calendar. This was the only day when the high priest entered the Most Holy Place of the sanctuary.

The ceremony began with the high priest taking two goats. One was chosen by lot as "the Lord's goat" and the other as "the scapegoat" or "Azazel." The Lord's goat was slain as a sin offering, and its blood was taken into the Most Holy Place and sprinkled on the mercy seat and before it seven times. This made atonement for the Most Holy Place, cleansing it from the sins that had accumulated there throughout the year through the daily services.

The high priest then cleansed the Holy Place and the altar in the court in the same manner. This process removed all the sins that had been transferred to the sanctuary during the year's daily services. After this cleansing was complete, the high priest took the live goat (the scapegoat), laid both hands on its head, and confessed over it all the sins of Israel. The goat was then led away into the wilderness, symbolically carrying away the sins of the people.

The people were required to "afflict their souls" on this day - to fast, pray, and examine their hearts. Any person who did not humble themselves was to be "cut off from among his people." This was a day of judgment, when individual destinies were decided based on their relationship with God.

The Day of Atonement pointed forward to the investigative judgment in heaven, when Christ, our High Priest, would cleanse the heavenly sanctuary and determine who would be saved. This work began in 1844, as prophesied in Daniel 8:14, and continues until just before Christ's second coming.`,
      key_themes: ["Day of Atonement", "Cleansing of Sanctuary", "Two Goats", "Scapegoat", "Judgment", "Daniel 8:14", "Investigative Judgment"],
      scripture_references: ["Leviticus 16:1-34", "Leviticus 23:26-32", "Daniel 8:14", "Hebrews 9:23-28", "Revelation 14:6-7"],
      word_count: 340
    },
    {
      chapter_number: 9,
      title: "The Prophecy of Daniel 8:14",
      summary: "Interprets the 2300-day prophecy of Daniel and its connection to the cleansing of the sanctuary.",
      content: `Daniel 8:14 contains one of the most important time prophecies in the Bible: "Unto two thousand and three hundred days; then shall the sanctuary be cleansed." Understanding this prophecy is crucial for comprehending Christ's current ministry.

In Bible prophecy, a day represents a year (Numbers 14:34, Ezekiel 4:6). Therefore, the 2300 days represent 2300 literal years. The starting point for this period is established in Daniel 9:24-27, which speaks of 70 weeks (490 years) determined upon Daniel's people. Both time periods begin with the commandment to restore and build Jerusalem, issued by Artaxerxes in 457 B.C.

Counting 2300 years from 457 B.C. brings us to 1844 A.D. The question arises: What sanctuary was to be cleansed at that time? Many Bible students in the early 1800s thought it referred to the earth being cleansed by fire at Christ's second coming. However, the earthly sanctuary had been destroyed in 70 A.D., and there is no earthly sanctuary today.

The book of Hebrews reveals that there is a sanctuary in heaven, the true tabernacle "which the Lord pitched, and not man." This heavenly sanctuary needs cleansing, not from physical impurity, but from the record of sins that have been transferred there through Christ's mediatorial work. Just as the earthly sanctuary was cleansed annually on the Day of Atonement, so the heavenly sanctuary must be cleansed.

In 1844, Christ began the final phase of His high priestly ministry, entering the Most Holy Place of the heavenly sanctuary to begin the work of investigative judgment and cleansing. This work determines who among the dead and living are worthy of eternal life.`,
      key_themes: ["Daniel 8:14", "2300 Days", "Prophecy", "1844", "Cleansing of Heavenly Sanctuary", "Investigative Judgment"],
      scripture_references: ["Daniel 8:14", "Daniel 9:24-27", "Numbers 14:34", "Ezekiel 4:6", "Hebrews 8:1-5", "Hebrews 9:23-24"],
      word_count: 340
    },
    {
      chapter_number: 10,
      title: "The Heavenly Sanctuary",
      summary: "Establishes the existence and importance of the sanctuary in heaven where Christ ministers as our High Priest.",
      content: `The book of Hebrews makes clear that there is a literal sanctuary in heaven. Hebrews 8:1-2 states: "We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man."

The earthly sanctuary was merely a copy, a shadow of the heavenly reality. When God told Moses to build the sanctuary according to the pattern shown him on the mount, that pattern was the heavenly sanctuary itself. Everything in the earthly sanctuary—the furniture, the services, the priesthood—pointed to corresponding realities in heaven.

John the Revelator was given visions of the heavenly sanctuary. In Revelation 4 and 5, he describes the throne room of God, with the Father seated on the throne surrounded by twenty-four elders and four living creatures. In Revelation 11:19, John sees "the temple of God was opened in heaven, and there was seen in his temple the ark of his testament." This confirms that the ark of the covenant, containing God's law, is in the heavenly sanctuary.

Just as the earthly sanctuary had two apartments, so does the heavenly. After His ascension, Christ began His ministry in the Holy Place of the heavenly sanctuary, corresponding to the daily ministry of the earthly priests. In 1844, He entered the Most Holy Place to begin the final work of judgment and cleansing, corresponding to the Day of Atonement service.

Understanding Christ's ministry in the heavenly sanctuary is essential for comprehending the plan of salvation and the events leading to His second coming. His work there is as real and literal as was the work of the earthly priests, but infinitely more effective because He ministers His own perfect blood.`,
      key_themes: ["Heavenly Sanctuary", "Christ's Ministry", "Pattern", "John's Vision", "Two Apartments", "Throne of God"],
      scripture_references: ["Hebrews 8:1-5", "Hebrews 9:23-24", "Revelation 4-5", "Revelation 11:19", "Exodus 25:40"],
      word_count: 330
    },
    {
      chapter_number: 11,
      title: "The Two Covenants",
      summary: "Distinguishes between the old and new covenants and their relationship to the sanctuary services.",
      content: `Understanding the two covenants is crucial for properly comprehending the sanctuary and its services. The old covenant, established at Mount Sinai, was based on the people's promise to obey God's law in their own strength. The new covenant, on the other hand, is God's promise to write His law in the hearts of believers through the power of the Holy Spirit.

The old covenant is recorded in Exodus 24, where the people declared, "All that the Lord hath spoken will we do." This covenant was ratified with the blood of animals. However, the people repeatedly broke this covenant through disobedience, demonstrating the impossibility of achieving righteousness through human effort alone.

The new covenant was promised in Jeremiah 31:31-34: "I will put my law in their inward parts, and write it in their hearts; and will be their God, and they shall be my people." This covenant is ratified by the blood of Christ and is based not on human promises but on God's power to transform the heart.

The sanctuary services illustrated both covenants. The constant repetition of sacrifices under the old covenant showed that they could never fully remove sin or change the heart. But these same services pointed forward to Christ's perfect sacrifice and His ministry in the heavenly sanctuary, through which the new covenant promises are fulfilled.

Hebrews 8:6 declares that Christ "is the mediator of a better covenant, which was established upon better promises." Under the new covenant, believers have direct access to God through Christ, the law is written on their hearts by the Holy Spirit, and they have assurance of complete forgiveness and transformation.`,
      key_themes: ["Two Covenants", "Old Covenant", "New Covenant", "Heart Change", "Law Written Within", "Better Promises"],
      scripture_references: ["Exodus 24:3-8", "Jeremiah 31:31-34", "Hebrews 8:6-13", "Hebrews 10:16", "2 Corinthians 3:3-6"],
      word_count: 310
    },
    {
      chapter_number: 12,
      title: "The Investigative Judgment",
      summary: "Explains the pre-advent judgment work of Christ in the heavenly sanctuary beginning in 1844.",
      content: `The investigative judgment is the final phase of Christ's atoning work in the heavenly sanctuary. This work began in 1844 when Christ entered the Most Holy Place to examine the records of all who have professed faith in Him, determining who is worthy of eternal life.

Daniel 7:9-10 describes this judgment scene: "The judgment was set, and the books were opened." This judgment takes place before Christ's return, hence it is called the "pre-advent judgment." The books contain the record of every person's life—their words, actions, and choices.

The investigative judgment begins with those who died in faith, extending back to Adam, and continues chronologically through all who have lived. It concludes with the examination of the living who profess to follow Christ. For each person, the question is determined: Has this person truly accepted Christ's sacrifice? Has their faith produced genuine obedience and transformation? Are they covered by Christ's righteousness?

This judgment is not arbitrary. Christ, our Advocate, presents His blood in behalf of all who have truly believed in Him. Satan, the accuser, brings charges against believers. But those who have genuinely repented and continue in faith, trusting in Christ's merits, are vindicated. Their names remain in the Book of Life, and their sins are blotted out.

When this investigative work is complete, Christ will remove His priestly garments and come as King of kings to gather His people. Revelation 22:11-12 describes this transition: "He that is unjust, let him be unjust still...And, behold, I come quickly; and my reward is with me."

The investigative judgment emphasizes the importance of daily connection with Christ, continual confession of sin, and faithful obedience. Our eternal destiny is being decided now in the courts of heaven.`,
      key_themes: ["Investigative Judgment", "Pre-Advent Judgment", "Books Opened", "1844", "Examination of Records", "Christ Our Advocate"],
      scripture_references: ["Daniel 7:9-14", "Revelation 14:6-7", "Revelation 22:11-12", "Malachi 3:16", "Revelation 20:12"],
      word_count: 345
    },
    {
      chapter_number: 13,
      title: "The Blotting Out of Sins",
      summary: "Discusses the final removal of sin from the universe and the vindication of God's character.",
      content: `The cleansing of the sanctuary includes not only the judgment of believers but also the final blotting out of their sins. Acts 3:19 speaks of this: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord."

During the daily ministry throughout the year, sins were confessed and transferred to the sanctuary through the blood of the sacrifice. These sins accumulated in the sanctuary, represented by the blood sprinkled before the veil and on the horns of the altar of incense. On the Day of Atonement, these sins were removed from the sanctuary and ultimately placed on the scapegoat, which was led away into the wilderness.

Similarly, throughout the Christian age, confessed sins have been transferred to the heavenly sanctuary through Christ's mediation. In the investigative judgment, the sins of the truly repentant are separated from them permanently. This is the blotting out of sins—their complete and final removal from the record.

The scapegoat represents Satan, the originator of sin. After Christ completes His work of judgment and cleansing the sanctuary, the responsibility for sin will be placed on Satan. He will bear the ultimate punishment for his rebellion and for leading others into sin. This does not mean Satan atones for sin—only Christ's blood provides atonement. But Satan will bear his full responsibility for the existence of sin.

The blotting out of sins vindicates God's character, demonstrating His justice and mercy. It shows that God has dealt fairly with every person and that sin has been completely eradicated from His universe. When this work is complete, God can restore righteousness throughout creation.`,
      key_themes: ["Blotting Out of Sins", "Final Removal", "Scapegoat", "Satan's Responsibility", "Vindication", "Final Atonement"],
      scripture_references: ["Acts 3:19", "Leviticus 16:20-22", "Revelation 20:10", "Ezekiel 28:18-19"],
      word_count: 310
    },
    {
      chapter_number: 14,
      title: "The Three Angels' Messages",
      summary: "Connects the sanctuary truth with the prophetic messages of Revelation 14 for the last days.",
      content: `Revelation 14:6-12 presents three angels with messages for the world in the last days. These messages are directly connected to the sanctuary and the judgment.

The first angel flies in the midst of heaven, proclaiming "the everlasting gospel" and announcing, "Fear God, and give glory to him; for the hour of his judgment is come." This message directs attention to Christ's work in the heavenly sanctuary and the investigative judgment that began in 1844. It calls people to worship God as Creator.

The second angel announces, "Babylon is fallen, is fallen, that great city, because she made all nations drink of the wine of the wrath of her fornication." Babylon represents false religious systems that have departed from biblical truth and mixed paganism with Christianity. This message calls God's people to separate from error.

The third angel warns against receiving the mark of the beast and worshiping his image. It emphasizes the importance of keeping God's commandments and maintaining faith in Jesus. This message is particularly relevant in the context of the sanctuary, as it highlights God's law contained in the ark in the Most Holy Place.

Following these three messages, Revelation 14:14-16 describes Christ coming on a white cloud to reap the harvest of the earth. This shows the connection between the sanctuary messages and the second coming of Christ.

The three angels' messages constitute the final warning to the world before probation closes and Christ returns. They call people to understand the sanctuary truth, to worship God according to His Word, and to prepare for the judgment. Those who accept these messages are described in verse 12: "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus."`,
      key_themes: ["Three Angels Messages", "Judgment Hour", "Babylon Fallen", "Mark of Beast", "Gods Commandments", "Final Warning"],
      scripture_references: ["Revelation 14:6-12", "Revelation 14:14-20", "Daniel 8:14"],
      word_count: 330
    },
    {
      chapter_number: 15,
      title: "The Close of Probation",
      summary: "Describes the solemn moment when Christ finishes His work in the sanctuary and probation closes.",
      content: `The close of probation is the most solemn event in the plan of salvation, short of the second coming itself. It marks the moment when Christ completes His work as High Priest in the heavenly sanctuary, when the last case in the investigative judgment has been decided, and when every person's eternal destiny is fixed.

Revelation 22:11-12 describes this transition: "He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still. And, behold, I come quickly; and my reward is with me, to give every man according as his work shall be."

When probation closes, Christ's intercession as High Priest ceases. No more prayers are heard, no more sins are pardoned, no more names are written in or blotted from the Book of Life. The great mediator removes His priestly garments and prepares to come as King of kings and Lord of lords.

The world will not immediately recognize that probation has closed. Life will appear to continue as normal. But a dramatic change will have occurred in heaven—Christ will no longer plead His blood for sinners. This is represented in the sanctuary service when the high priest completed his work on the Day of Atonement and came out to bless the waiting people.

Between the close of probation and the second coming, there will be a brief period called "the time of trouble such as never was." During this time, God's people must stand without an intercessor, their characters fully developed and sealed. This emphasizes the urgency of preparing now, while Christ still ministers in the sanctuary.

The message is clear: prepare now. Surrender fully to Christ. Allow Him to cleanse your life and write His law in your heart. The door of mercy will not always remain open.`,
      key_themes: ["Close of Probation", "End of Intercession", "Fixed Destiny", "Time of Trouble", "Preparation", "Urgency"],
      scripture_references: ["Revelation 22:11-12", "Daniel 12:1", "Revelation 15:8", "Amos 8:11-12"],
      word_count: 340
    },
    {
      chapter_number: 16,
      title: "The Second Coming of Christ",
      summary: "Describes Christ's return in glory after completing His sanctuary ministry and the reward of the faithful.",
      content: `After Christ completes His work in the heavenly sanctuary, He lays aside His priestly garments and comes to earth as King of kings and Lord of lords. His second coming is the climax of the plan of salvation and the hope of all believers.

The Bible describes Christ's return in vivid terms. Matthew 24:30-31 declares: "And then shall appear the sign of the Son of man in heaven: and then shall all the tribes of the earth mourn, and they shall see the Son of man coming in the clouds of heaven with power and great glory. And he shall send his angels with a great sound of a trumpet, and they shall gather together his elect from the four winds, from one end of heaven to the other."

This coming will be visible, audible, and glorious—nothing like the secret rapture theories. Every eye will see Him. The righteous dead will be resurrected, and together with the living righteous, they will be caught up to meet the Lord in the air. The wicked will be destroyed by the brightness of His coming.

Christ comes to reward His faithful people, those whose names remained in the Book of Life through the investigative judgment. He takes them to heaven, to the mansions He has prepared, where they will reign with Him for a thousand years.

The second coming marks the end of sin's reign on earth. It vindicates God's character and His people. It demonstrates that God has always been just, merciful, and loving. The sanctuary truth helps us understand the timing and nature of Christ's return—it will occur shortly after the completion of the judgment work in the heavenly sanctuary.

Jesus Himself promised, "I will come again, and receive you unto myself; that where I am, there ye may be also." This is the blessed hope that has sustained God's people through all ages.`,
      key_themes: ["Second Coming", "Visible Return", "Resurrection", "Reward", "Blessed Hope", "Vindication"],
      scripture_references: ["Matthew 24:30-31", "1 Thessalonians 4:16-17", "Revelation 19:11-16", "John 14:1-3", "Titus 2:13"],
      word_count: 320
    },
    {
      chapter_number: 17,
      title: "The Millennium",
      summary: "Explains the thousand-year period between Christ's return and the final judgment, and its relationship to the sanctuary.",
      content: `Revelation 20 describes a thousand-year period following Christ's second coming, commonly called the millennium. Understanding this period is essential for comprehending the complete plan of salvation as illustrated in the sanctuary.

When Christ returns, the righteous are taken to heaven while the wicked are destroyed. Satan and his angels are left on the desolate earth, bound by a chain of circumstances—having no one to tempt or deceive. The earth is in chaos, "without form and void," similar to its condition before creation.

During the millennium, the saints reign with Christ in heaven, participating in a work of judgment. Revelation 20:4 states: "And I saw thrones, and they sat upon them, and judgment was given unto them." The saints examine the records of the wicked, reviewing the justice of God's decisions. They also judge fallen angels. This corresponds to the examination of records in the sanctuary service.

Paul refers to this work in 1 Corinthians 6:2-3: "Do ye not know that the saints shall judge the world?...Know ye not that we shall judge angels?" This isn't determining salvation—that was decided in the pre-advent investigative judgment. Rather, it's a time for the redeemed to understand God's dealings and see that He was just and merciful in every case.

At the end of the thousand years, the Holy City, New Jerusalem, descends from heaven with Christ and the saints. The wicked dead are resurrected to face their final judgment. Satan is loosed to deceive them one last time, leading them to attempt to take the city by force.

The millennium demonstrates God's transparency and His desire for all created beings to understand His character and judgments. It provides answers to questions the redeemed may have and prepares them for eternal life in a sinless universe.`,
      key_themes: ["Millennium", "Thousand Years", "Judgment by Saints", "Satan Bound", "Review of Records", "New Jerusalem"],
      scripture_references: ["Revelation 20:1-6", "1 Corinthians 6:2-3", "Jeremiah 4:23-26", "Revelation 21:2"],
      word_count: 340
    },
    {
      chapter_number: 18,
      title: "The Executive Judgment",
      summary: "Describes the final judgment and destruction of the wicked, and the complete eradication of sin from the universe.",
      content: `After the millennium, the final act in the great controversy between Christ and Satan takes place. This is called the executive judgment, when the sentences determined in the investigative judgment are carried out.

At the close of the thousand years, Christ and the Holy City descend to the Mount of Olives, which becomes a great plain. The wicked dead are resurrected to face their judgment. Satan deceives them, convincing them that they can capture the city if they unite their forces. They surround the city in preparation for attack.

Then the great white throne judgment occurs, described in Revelation 20:11-15. The books are opened, including the Book of Life. Every person who ever lived sees the complete record of their life displayed. They witness how God called them, how Christ died for them, and how they chose to reject salvation. Even the wicked must acknowledge that God was just and merciful.

Satan and all his followers are shown to be guilty beyond any defense. They recognize that they brought their doom upon themselves. Then fire comes down from God out of heaven and devours them. Malachi 4:1 describes this: "For, behold, the day cometh, that shall burn as an oven; and all the proud, yea, and all that do wickedly, shall be stubble."

This fire cleanses the earth, purifying it from every trace of sin. The wicked are completely destroyed—not to burn eternally, but to be consumed entirely. Malachi 4:3 says they become "ashes under the soles of your feet." This is the "second death," from which there is no resurrection.

The destruction of the wicked vindicates God's character before the entire universe. It demonstrates that God gave every person every possible opportunity for salvation, but He respects their choice to reject Him. Sin and sinners are eternally eradicated, never to rise again.`,
      key_themes: ["Executive Judgment", "Destruction of Wicked", "White Throne Judgment", "Second Death", "Fire from Heaven", "End of Sin"],
      scripture_references: ["Revelation 20:7-15", "Malachi 4:1-3", "2 Peter 3:10-13", "Nahum 1:9"],
      word_count: 355
    },
    {
      chapter_number: 19,
      title: "The New Earth and Eternal Kingdom",
      summary: "Describes the restoration of earth to its Eden perfection and the eternal dwelling of God with His people.",
      content: `After sin and sinners are destroyed, God creates a new heaven and a new earth. This is the ultimate fulfillment of the sanctuary symbolism—God dwelling with His people in perfect harmony forever.

Revelation 21:1-3 declares: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away...And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God."

The earth is restored to its original Eden beauty and perfection, without any trace of sin's curse. There will be no more death, sorrow, crying, or pain. The former things will have passed away. The New Jerusalem becomes the capital of the new earth, and God's throne is established there.

Isaiah 65:17-25 describes the blessings of the new earth: people will build houses and inhabit them, plant vineyards and eat their fruit, and the wolf and lamb will feed together. The redeemed will have perfect health, meaningful work, and unending joy.

The sanctuary in heaven will no longer be needed for intercession or judgment, but God's throne remains as the center of worship throughout the universe. The redeemed will serve Him day and night, not from obligation but from love and gratitude.

Every Sabbath and every new moon, all flesh will come to worship before God. The tree of life, which stood in the Garden of Eden and now stands in the heavenly paradise, will yield its fruit, and its leaves will be for the healing of the nations.

The great controversy is ended. Sin is destroyed forever. God's character is vindicated. Love, joy, and peace reign supreme throughout a universe that will never again be marred by rebellion. This is the glorious culmination of God's plan, foreshadowed in every aspect of the sanctuary and its services—God dwelling with His people forever.`,
      key_themes: ["New Earth", "Restoration", "Eternal Kingdom", "No More Sin", "God Dwells with Humanity", "Tree of Life", "Perfect Harmony"],
      scripture_references: ["Revelation 21:1-5", "Revelation 22:1-5", "Isaiah 65:17-25", "Isaiah 66:22-23", "2 Peter 3:13"],
      word_count: 375
    },
    {
      chapter_number: 20,
      title: "The Angel Gabriel Visits The Prophet Daniel",
      summary: "Explores Gabriel's visitation to Daniel and the revelation of prophetic timelines concerning the Messiah.",
      content: `The prophet Daniel received some of the most important prophetic revelations in Scripture through the angel Gabriel. These visions are crucial for understanding the sanctuary truth and the timing of the Messiah's ministry.

In Daniel 8, Daniel received a vision of a ram, a goat, and a little horn. He saw the 2300 days and heard the declaration that the sanctuary would be cleansed. However, Daniel did not understand the vision. Gabriel was sent to make Daniel understand, but Daniel became sick and faint before the explanation was complete.

Later, in Daniel 9, while Daniel was praying and confessing sin, Gabriel appeared again. Gabriel said, "I am now come forth to give thee skill and understanding...therefore understand the matter, and consider the vision." Gabriel had returned to complete the explanation of the vision.

Gabriel's message to Daniel included the prophecy of the seventy weeks, which provided the starting point for understanding the 2300-day prophecy. This connection between the seventy weeks and the 2300 days is essential for understanding when the Messiah would appear and when the cleansing of the sanctuary would begin.

The angel's visits to Daniel demonstrate God's desire to reveal His plans to His people. God does not leave His children in darkness concerning the great events that will affect His church and the world. Through Daniel, God revealed the timeline of the Messiah's first coming and the beginning of His final work in the heavenly sanctuary.

Gabriel's role as God's messenger to Daniel foreshadows his later role in announcing the birth of John the Baptist and Jesus Christ. The same angel who revealed the time of Messiah's coming to Daniel would announce His birth to Mary.`,
      key_themes: ["Gabriel", "Daniel", "Prophetic Vision", "2300 Days", "Divine Revelation", "Understanding Prophecy"],
      scripture_references: ["Daniel 8:15-27", "Daniel 9:20-23", "Luke 1:19", "Luke 1:26"],
      word_count: 305
    },
    {
      chapter_number: 21,
      title: "Daniel Studies The Scriptures To Understand The 2300 Days",
      summary: "Describes Daniel's earnest study of Scripture and prayer to understand the prophetic timelines.",
      content: `Daniel 9 opens with a remarkable scene: the prophet Daniel studying the book of Jeremiah. Daniel was seeking to understand the timing of events related to God's people and the sanctuary.

Daniel 9:2 states: "In the first year of his reign I Daniel understood by books, the number of the years, whereof the word of the LORD came to Jeremiah the prophet, that he would accomplish seventy years in the desolations of Jerusalem." Daniel was studying Jeremiah's prophecy of the seventy years of captivity.

As Daniel studied, he realized that the seventy years were nearly complete. This led him to earnest prayer and fasting, confessing the sins of Israel and pleading for God's mercy and the restoration of Jerusalem and the sanctuary.

Daniel's prayer in verses 4-19 is one of the most heartfelt in Scripture. He acknowledged Israel's sin and rebellion. He recognized that God was righteous in allowing the exile. He appealed to God's mercy and asked that God's name would not be dishonored by the desolation of Jerusalem and the sanctuary.

Daniel's study and prayer demonstrate the proper approach to understanding prophecy. He did not rely on human wisdom or speculation. He searched the Scriptures, he prayed earnestly, and he humbled himself before God. His prayer was not selfish—it focused on God's glory and the welfare of God's people.

While Daniel was still praying, Gabriel appeared with the answer. God heard Daniel's prayer and sent immediate instruction. This shows that when we earnestly seek to understand God's Word with pure motives, God will enlighten our understanding.

The combination of Scripture study, prayer, and divine revelation is the model for understanding prophetic truth. God desires His people to understand His plans, and He will reveal them to those who seek with sincere hearts.`,
      key_themes: ["Scripture Study", "Prayer", "Jeremiah's Prophecy", "Seventy Years", "Seeking Understanding", "Divine Response"],
      scripture_references: ["Daniel 9:1-19", "Jeremiah 25:11-12", "Jeremiah 29:10", "James 1:5"],
      word_count: 340
    },
    {
      chapter_number: 22,
      title: "The Seventy Weeks Explained To Daniel By The Angel Gabriel",
      summary: "Examines Gabriel's explanation of the seventy weeks prophecy and its connection to the Messiah.",
      content: `Gabriel's explanation in Daniel 9:24-27 provides one of the clearest prophecies in Scripture concerning the time of the Messiah's appearance and work. This prophecy is foundational for understanding both the first and second comings of Christ.

Gabriel declared: "Seventy weeks are determined upon thy people and upon thy holy city." The word "determined" literally means "cut off" or "appointed." These seventy weeks were cut off from the longer 2300-day prophecy for the Jewish people to accomplish specific purposes.

The purposes included: finishing transgression, making an end of sins, making reconciliation for iniquity, bringing in everlasting righteousness, sealing up vision and prophecy, and anointing the Most Holy. These purposes point directly to the work of the Messiah.

The starting point for both the seventy weeks and the 2300 days was "the going forth of the commandment to restore and to build Jerusalem." This occurred in 457 BC when Artaxerxes issued his decree allowing the Jews to return and rebuild Jerusalem with full governmental authority.

Using the prophetic principle of a day representing a year, the seventy weeks equal 490 years. Gabriel divided this period into three parts: seven weeks (49 years), sixty-two weeks (434 years), and one week (7 years).

The prophecy states that "Messiah the Prince" would come after sixty-nine weeks (483 years). Counting from 457 BC, this brings us to AD 27, the exact year Jesus was baptized and began His public ministry. Jesus came right on time, exactly when the prophecy predicted.

The final week of the seventy weeks is especially significant. Gabriel said that "in the midst of the week he shall cause the sacrifice and the oblation to cease." This points to Christ's crucifixion in AD 31, exactly three and a half years into the final week, when His death made the temple sacrifices meaningless.

The seventy weeks prophecy proves that Jesus is the Messiah and provides the starting point for understanding the 2300-day prophecy. When the seventy weeks ended in AD 34 with the stoning of Stephen and the gospel going to the Gentiles, 1810 years remained of the 2300 years, bringing us to 1844 and the beginning of the investigative judgment.`,
      key_themes: ["Seventy Weeks", "490 Years", "Messiah Prince", "457 BC", "AD 27", "AD 31", "Prophetic Timeline"],
      scripture_references: ["Daniel 9:24-27", "Ezra 7:11-26", "Luke 3:21-22", "Galatians 3:17"],
      word_count: 415
    },
    {
      chapter_number: 23,
      title: "The Great Advent Movement",
      summary: "Chronicles the rise of the Advent movement in the early 1800s and the proclamation of the judgment hour message.",
      content: `In the early nineteenth century, a worldwide movement arose proclaiming that the return of Christ was imminent. This was not a coincidence but a fulfillment of prophecy—the proclamation of the first angel's message of Revelation 14:6-7.

William Miller, a Baptist farmer and Bible student from New York, began intensive study of the prophecies in 1816. After years of careful examination, Miller concluded that the 2300-day prophecy of Daniel 8:14 would end around 1843-1844, and he believed this would mark the second coming of Christ.

Miller was reluctant to share his conclusions publicly, but after nine years of study and much prayer, he began to preach in 1831. His message spread rapidly. By the early 1840s, thousands of ministers across many denominations were preaching the advent message. The movement spread to Europe, Asia, and other parts of the world.

The Millerite movement emphasized several biblical truths: the literal, personal, visible return of Christ; the importance of prophetic study; the nearness of Christ's coming; and the need for preparation. The movement led to widespread revival, confession of sin, and missionary zeal.

The message was primarily the first angel's message: "Fear God, and give glory to him; for the hour of his judgment is come." Though the Adventists did not yet understand that the judgment was investigative rather than executive, they correctly proclaimed that the prophetic time had come for God's judgment.

As 1844 approached, expectation intensified. Many believers made preparations to meet their Lord. They settled accounts, made confessions, and sought to be right with God and their fellow men. The Advent movement became known for its emphasis on holy living and urgent evangelism.

Though the Adventists experienced disappointment when Christ did not return as they expected, the movement itself was a fulfillment of prophecy and laid the foundation for a correct understanding of the sanctuary truth and Christ's final work before His return.`,
      key_themes: ["Advent Movement", "William Miller", "Prophecy Study", "1844", "First Angels Message", "Judgment Hour"],
      scripture_references: ["Revelation 14:6-7", "Daniel 8:14", "Matthew 25:1-13", "2 Timothy 4:8"],
      word_count: 365
    },
    {
      chapter_number: 24,
      title: "The Great Disappointment",
      summary: "Describes the events of October 22, 1844, and the disappointment experienced by the Advent believers.",
      content: `October 22, 1844, is one of the most significant dates in Christian history. On that day, thousands of believers expected Jesus Christ to return. When the day ended without Christ's appearing, they experienced what came to be called the Great Disappointment.

The weeks leading up to October 22 were filled with intense spiritual activity. Based on the work of Samuel Snow and others who recalculated the time prophecies, Advent believers concluded that the 2300 days would end on the tenth day of the seventh month of the Jewish sacred year, corresponding to October 22, 1844.

The believers prepared earnestly. Many settled their business affairs, made restitution where necessary, and spent time in prayer and Bible study. Some faced ridicule and persecution, but their faith remained strong. They were convinced that Christ would come on that day.

When October 22 arrived, believers gathered in churches, homes, and meeting halls. They sang hymns, prayed, and waited expectantly for the appearing of their Lord. Some climbed hills to watch for the first sign of His coming. Others spent the day in worship and prayer.

As the sun set on October 22 and darkness fell, the realization grew that Christ had not returned. The disappointment was crushing. Hiram Edson later wrote: "Our fondest hopes and expectations were blasted, and such a spirit of weeping came over us as I never experienced before...We wept, and wept, till the day dawn."

In the days that followed, many believers abandoned their faith entirely. Others continued to set new dates, refusing to accept that they had been mistaken. Still others returned to their former churches, concluding that the whole advent movement had been a delusion.

However, a faithful remnant refused to give up their faith in the prophetic interpretation. They believed that God had led in the movement and that their error must have been in the understanding of the event to occur, not in the time. This group would soon discover the truth about the sanctuary and understand what really began on October 22, 1844.`,
      key_themes: ["Great Disappointment", "October 22 1844", "Unfulfilled Expectation", "Testing of Faith", "Prophetic Event", "Remnant"],
      scripture_references: ["Matthew 25:5", "Hebrews 10:35-37", "Habakkuk 2:3", "Psalm 30:5"],
      word_count: 385
    },
    {
      chapter_number: 25,
      title: "Light From The Sanctuary",
      summary: "Explains how Adventist believers discovered the truth about the heavenly sanctuary and Christ's ministry.",
      content: `The morning after the Great Disappointment, Hiram Edson had an experience that would change the course of Adventist history. While walking through a cornfield with a friend, Edson received a clear understanding that Christ had not come to earth on October 22, 1844, but had instead moved from the Holy Place to the Most Holy Place of the heavenly sanctuary.

This insight led to intensive study of the sanctuary by Edson, O.R.L. Crosier, and others. They discovered that the cleansing of the sanctuary in Daniel 8:14 did not refer to the earth being cleansed by fire at Christ's coming, but to the cleansing of the heavenly sanctuary by Christ's ministry in the Most Holy Place.

The parallel between the earthly and heavenly sanctuaries became clear. Just as the earthly high priest entered the Most Holy Place once a year on the Day of Atonement to cleanse the sanctuary, so Christ entered the Most Holy Place of the heavenly sanctuary in 1844 to begin the final phase of His atoning work—the investigative judgment.

This understanding explained why Christ had not returned in 1844. The Adventists had been right about the time, but mistaken about the event. The 2300 days ended exactly when they expected, but instead of Christ coming to earth, He moved from one apartment of the heavenly sanctuary to another to begin a new phase of ministry.

O.R.L. Crosier published a detailed study on the sanctuary in the Day-Star Extra in February 1846. This article provided a biblical foundation for the sanctuary doctrine and helped many disappointed Adventists understand what had occurred.

The sanctuary truth became the theological foundation of the Seventh-day Adventist Church. It explained the disappointment, confirmed the validity of the prophetic interpretation, and revealed Christ's present ministry. It showed that we are living in the antitypical Day of Atonement, the time of investigative judgment, when Christ is examining the records in heaven.

This discovery gave the Advent movement new purpose and direction. Rather than abandoning their faith or continuing to set new dates, believers understood that they had a message to proclaim: the hour of God's judgment had come, and Christ was performing His final work before returning to earth.`,
      key_themes: ["Sanctuary Truth", "Hiram Edson", "Most Holy Place", "1844 Discovery", "Cleansing Sanctuary", "Understanding Disappointment"],
      scripture_references: ["Daniel 8:14", "Hebrews 8:1-2", "Leviticus 16:1-34", "Revelation 11:19"],
      word_count: 410
    },
    {
      chapter_number: 26,
      title: "The Perpetuity of the Law",
      summary: "Establishes the continuing validity of God's law and the Sabbath commandment.",
      content: `Central to the sanctuary truth is the recognition of God's law as the foundation of His government and the standard in the judgment. The ark of the covenant in the Most Holy Place contained the Ten Commandments, emphasizing their eternal importance.

Many Christians believe that Christ's death abolished the law, but Scripture teaches otherwise. Jesus declared in Matthew 5:17-18: "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil. For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from the law, till all be fulfilled."

Paul affirmed in Romans 3:31: "Do we then make void the law through faith? God forbid: yea, we establish the law." And in Romans 7:12: "Wherefore the law is holy, and the commandment holy, and just, and good."

The confusion arises from misunderstanding the difference between the moral law and the ceremonial law. The ceremonial law, with its sacrifices and ritual regulations, pointed forward to Christ and was fulfilled at the cross. But the moral law—the Ten Commandments—reflects God's character and remains the eternal standard of right and wrong.

The seventh-day Sabbath is part of the moral law, being one of the Ten Commandments. The Sabbath was instituted at creation before sin entered the world, and Jesus said it was made for man—for all humanity, not just Jews. The Bible nowhere authorizes changing the Sabbath from the seventh day to the first day of the week.

The sanctuary illustrates the relationship between the law and the gospel. The ark containing the law was covered by the mercy seat where the blood was sprinkled. This shows that while the law condemns us, the blood of Christ provides mercy and forgiveness. Yet the law itself remains as the standard.

In the investigative judgment, the law is the standard by which lives are measured. Those who have accepted Christ are covered by His righteousness and receive mercy. But this does not abolish the law—it magnifies the grace that saves us despite our failure to keep it perfectly.

Understanding the perpetuity of God's law is essential for understanding the sanctuary message and the final conflict described in Revelation between those who keep God's commandments and those who follow human traditions.`,
      key_themes: ["Ten Commandments", "Moral Law", "Sabbath", "Perpetuity", "Law in Judgment", "Ark of Covenant"],
      scripture_references: ["Exodus 20:1-17", "Matthew 5:17-19", "Romans 7:7-12", "James 2:10-12", "Ecclesiastes 12:13-14"],
      word_count: 415
    },
    {
      chapter_number: 27,
      title: "The Sabbath and The Sanctuary",
      summary: "Explores the connection between the Sabbath commandment and the sanctuary truth.",
      content: `The discovery of the sanctuary truth led many early Adventists to recognize the importance of the seventh-day Sabbath. This was not coincidental—the sanctuary and the Sabbath are intimately connected in Scripture and theology.

In Revelation 11:19, when the temple of God in heaven is opened, the ark of His testament is seen. The ark contained the Ten Commandments, including the Sabbath commandment. This vision shows that God's law, including the Sabbath, is central to the final conflict before Christ returns.

The Sabbath commandment is unique among the Ten Commandments in several ways. It is the longest commandment, the only one that begins with "Remember," and the only one that identifies God as Creator. Exodus 20:8-11 connects the Sabbath directly to creation: "For in six days the LORD made heaven and earth...and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it."

The Sabbath is a sign between God and His people. Exodus 31:13 states: "Verily my sabbaths ye shall keep: for it is a sign between me and you throughout your generations; that ye may know that I am the LORD that doth sanctify you." The Sabbath identifies the true God and acknowledges Him as Creator and Redeemer.

Just as the sanctuary truth was obscured through centuries of apostasy, so was the Sabbath changed from the seventh day to the first day. This change was not made by divine authority but by human tradition. The Catholic Church openly acknowledges making this change and claims it as evidence of the church's authority to alter God's law.

The first angel's message calls for worshiping God as Creator: "Worship him that made heaven, and earth, and the sea, and the fountains of waters." This is language taken directly from the Sabbath commandment, showing that the Sabbath is part of the final message to the world.

As Christ ministers in the Most Holy Place of the heavenly sanctuary, the ark containing God's law is revealed. This calls attention to all ten commandments, including the Sabbath. Those who understand the sanctuary message will recognize their obligation to keep all of God's commandments, including the seventh-day Sabbath.

The Sabbath and the sanctuary together provide a complete understanding of God's plan for the final generation. They reveal God as Creator, Redeemer, and Judge, and call His people to obedience based on love and gratitude.`,
      key_themes: ["Sabbath", "Seventh Day", "Creation", "Sign of God", "Ark Revealed", "Worship Creator"],
      scripture_references: ["Exodus 20:8-11", "Revelation 11:19", "Exodus 31:13-17", "Isaiah 58:13-14", "Revelation 14:7"],
      word_count: 445
    },
    {
      chapter_number: 28,
      title: "The Mark of the Beast",
      summary: "Examines the mark of the beast in relation to worship and the law of God.",
      content: `Revelation 13 and 14 present a final conflict between two groups: those who worship God according to His commandments and those who receive the mark of the beast. Understanding this mark is crucial in light of the sanctuary message.

Revelation 13:16-17 states: "And he causeth all, both small and great, rich and poor, free and bond, to receive a mark in their right hand, or in their foreheads: And that no man might buy or sell, save he that had the mark, or the name of the beast, or the number of his name."

The mark of the beast is not a literal physical mark but a symbol of allegiance. The forehead represents the mind and conscious choice, while the hand represents actions. The mark signifies submission to the beast's authority even when it contradicts God's commands.

The beast of Revelation 13 represents a religious-political power that claims authority to change God's law. History identifies this power as the papal system, which openly claims to have changed the Sabbath from Saturday to Sunday.

The Catholic Church's own writings acknowledge this change. They point to Sunday observance as evidence of the Church's authority to modify divine law. One Catholic source states: "The Church is above the Bible, and this transference of Sabbath observance is proof of that fact."

Sunday observance, when enforced by law and understood to be in opposition to God's Sabbath, becomes the mark of the beast. It represents submission to human authority over divine authority. The issue is not about which day one currently observes, but about choosing between God's command and human tradition when both are clearly understood.

Revelation 14:9-12 gives a solemn warning against receiving the mark: "If any man worship the beast and his image, and receive his mark in his forehead, or in his hand, the same shall drink of the wine of the wrath of God." This shows the seriousness of the issue.

The third angel's message is followed by a description of God's faithful people: "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus" (Revelation 14:12). The commandments of God include the Sabbath, which becomes the identifying mark of God's people in contrast to the mark of the beast.

The final conflict will center on worship—whether we will worship God according to His Word or submit to human traditions. The sanctuary truth, revealing God's law in the ark, prepares us to understand this issue and stand firm for God's truth.`,
      key_themes: ["Mark of Beast", "Sunday Law", "Papal Authority", "Sabbath vs Sunday", "Worship Issue", "Final Conflict"],
      scripture_references: ["Revelation 13:16-17", "Revelation 14:9-12", "Daniel 7:25", "Revelation 13:1-10"],
      word_count: 450
    },
    {
      chapter_number: 29,
      title: "The Seal of God",
      summary: "Describes the seal of God as the sign of His authority and the identifying mark of His people.",
      content: `In contrast to the mark of the beast, Revelation presents the seal of God. This seal identifies those who belong to God and who will be protected during the final judgments.

Revelation 7:2-3 states: "And I saw another angel ascending from the east, having the seal of the living God: and he cried with a loud voice to the four angels...saying, Hurt not the earth, neither the sea, nor the trees, till we have sealed the servants of our God in their foreheads."

In ancient times, a seal contained three elements: the name of the ruler, his title or office, and the territory of his jurisdiction. God's seal contains these same elements and is found within His law.

The Sabbath commandment uniquely contains all three elements of a seal. It identifies God by name: "the LORD thy God." It gives His title: the Creator (one who makes). And it specifies His jurisdiction: "heaven and earth, the sea, and all that in them is."

Ezekiel 20:12 explicitly calls the Sabbath a sign: "Moreover also I gave them my sabbaths, to be a sign between me and them, that they might know that I am the LORD that sanctify them." And verse 20: "And hallow my sabbaths; and they shall be a sign between me and you, that ye may know that I am the LORD your God."

The seal of God is placed in the forehead, representing the mind and character. Those who receive God's seal have His law written in their hearts and minds. They keep His commandments from love, not from compulsion. Their characters reflect His character.

The sealing takes place during the investigative judgment, as Christ examines the records in the heavenly sanctuary. Only those whose names remain in the Book of Life after the judgment receive the seal. This emphasizes the importance of maintaining a living connection with Christ during this time.

The seal of God also represents the Holy Spirit's work in transforming the believer. Ephesians 4:30 speaks of being "sealed unto the day of redemption" by the Holy Spirit. The Spirit writes God's law in the heart and develops Christ's character in the life.

Those who receive the seal of God will be able to stand during the time of trouble without a mediator. Their characters will be established in righteousness, their faith will be firm, and they will remain loyal to God despite persecution, economic pressure, or threat of death.

The sanctuary message reveals both the seal of God and the mark of the beast. It calls us to choose whom we will serve and to allow God to seal us for eternity by transforming our characters and establishing us in His truth.`,
      key_themes: ["Seal of God", "Sabbath Seal", "Character Development", "144000", "Protection", "Holy Spirit"],
      scripture_references: ["Revelation 7:1-4", "Ezekiel 20:12-20", "Exodus 31:13-17", "Ephesians 4:30", "Revelation 14:1"],
      word_count: 475
    },
    {
      chapter_number: 30,
      title: "Christ's Ministry in Two Apartments",
      summary: "Compares Christ's ministry in the Holy Place and Most Holy Place of the heavenly sanctuary.",
      content: `Christ's ministry in the heavenly sanctuary corresponds to the twofold ministry of the earthly high priest. Understanding these two phases is essential for comprehending the plan of salvation.

When Christ ascended to heaven after His resurrection, He entered the Holy Place of the heavenly sanctuary. This began His ministry of intercession and mediation. Just as the priests in the earthly sanctuary performed daily ministry in the Holy Place, offering incense and maintaining the lamps, so Christ began His daily ministry of presenting His merits on behalf of repentant sinners.

During this phase, which lasted from His ascension in AD 31 to 1844, Christ's ministry included several aspects. He intercedes for believers, applying the benefits of His sacrifice to those who confess their sins. He distributes spiritual gifts through the Holy Spirit. He guides and empowers the church for its mission. He records the deeds of all people in the books of heaven.

In 1844, at the end of the 2300 days, Christ moved from the Holy Place to the Most Holy Place, just as the earthly high priest did once a year on the Day of Atonement. This inaugurated a new phase of His ministry—the investigative judgment and cleansing of the sanctuary.

In the Most Holy Place, Christ's work focuses on judgment rather than general intercession. He examines the records of those who have professed faith in Him, determines who will receive eternal life, and removes the record of their sins from the sanctuary. This is the blotting out of sins and the cleansing of the sanctuary.

The change in Christ's ministry from the Holy Place to the Most Holy Place parallels the change in emphasis in the Christian's experience. During the daily ministry, the focus is on confession and forgiveness. During the judgment ministry, the focus shifts to final preparation, character development, and complete victory over sin.

This does not mean Christ no longer intercedes for believers or that no one can be saved after 1844. Rather, it means that the final phase of His work has begun, and the day of final decision approaches. The judgment work will eventually be complete, probation will close, and Christ will lay aside His priestly robes to return as King.

Understanding Christ's two-phase ministry helps us comprehend where we are in history and what God is doing now. We live in the antitypical Day of Atonement, when the final decisions are being made. This should inspire us to diligence in preparing for Christ's return and earnestness in sharing the sanctuary message with others.`,
      key_themes: ["Two Apartments", "Holy Place Ministry", "Most Holy Place Ministry", "Phase Change 1844", "Intercession", "Judgment Work"],
      scripture_references: ["Hebrews 9:23-28", "Hebrews 4:14-16", "Leviticus 16:1-34", "Revelation 11:19"],
      word_count: 455
    },
    {
      chapter_number: 31,
      title: "The Importance of Character Development",
      summary: "Emphasizes the necessity of character transformation in light of the sanctuary truth and coming judgment.",
      content: `The sanctuary truth reveals that we are living in the antitypical Day of Atonement, a time of judgment and final preparation. This understanding should profoundly affect how we live and our approach to character development.

On the Day of Atonement in ancient Israel, the people were commanded to afflict their souls and cease from work. Any person who did not afflict his soul was to be cut off from the people. This wasn't merely an outward ritual but represented genuine heart examination, confession of sin, and reformation of life.

Similarly, as we live in the antitypical Day of Atonement, we are called to afflict our souls—to engage in deep self-examination, to confess all known sin, and to allow God to purify our hearts and transform our characters. This is not legalistic works-righteousness but rather cooperation with the Holy Spirit's sanctifying work.

The investigative judgment reveals that character development is essential. While we are saved by grace through faith in Christ's merits alone, genuine faith produces transformation. James 2:26 declares: "Faith without works is dead." Those whose names remain in the Book of Life are those whose faith has produced obedience and character transformation.

Character development involves several key elements. First, daily connection with Christ through prayer, Bible study, and surrender. Second, confession and forsaking of all known sin. Third, victory over besetting sins through Christ's power. Fourth, development of Christian virtues like love, patience, kindness, and self-control. Fifth, faithful obedience to all of God's commandments.

The sanctuary service illustrates the process. The daily sacrifice represents acceptance of Christ and forgiveness of sins. But the Day of Atonement represents completion of the process—the final cleansing, the blotting out of sins, the sealing of character. God's people must allow Him to complete His work in their lives.

This emphasis on character development does not mean we save ourselves or that we can become perfect by our own effort. Christ is both our righteousness and our sanctification. But true faith in Him leads to cooperation with His transforming work. We trust His merits while allowing Him to change our hearts.

The close of probation will reveal who has allowed this work to be completed. Those who have maintained a living connection with Christ and have allowed Him to develop His character in them will stand without a mediator during the time of trouble. Their characters will be settled into the truth, and they will remain faithful despite all opposition.

The sanctuary message is thus not merely theological truth but a call to spiritual preparation. Understanding what Christ is doing in heaven should motivate us to cooperate with what He wants to do in our hearts. The judgment is taking place now—the time for preparation is today.`,
      key_themes: ["Character Development", "Sanctification", "Afflict Soul", "Preparation", "Judgment Readiness", "Cooperation with Spirit"],
      scripture_references: ["Leviticus 23:27-29", "2 Corinthians 7:1", "Philippians 2:12-13", "Hebrews 12:14", "1 Peter 1:15-16"],
      word_count: 505
    },
    {
      chapter_number: 32,
      title: "The Daily and the Abomination of Desolation",
      summary: "Examines the prophetic terms 'the daily' and 'abomination of desolation' in relation to true and false worship.",
      content: `Daniel's prophecies contain mysterious references to "the daily" and "the abomination of desolation." Understanding these terms is important for comprehending the great controversy and the sanctuary truth.

In Daniel 8:11-13, we read about a power that takes away "the daily" and casts down the sanctuary. Daniel 11:31 speaks of taking away "the daily sacrifice" and setting up "the abomination that maketh desolate." These terms have both historical and spiritual applications.

Historically, "the daily" referred to the continual ministry in the sanctuary—the daily sacrifices, the morning and evening offerings, the burning of incense, and the trimming of lamps. This daily ministry represented the continual availability of forgiveness and intercession for God's people.

Spiritually, "the daily" represents the true worship of God through Christ's mediation. It symbolizes Christ's continual ministry in the heavenly sanctuary, applying the benefits of His sacrifice to believers. The daily represents the direct access believers have to God through Christ as the only Mediator.

"The abomination of desolation" represents false systems of worship that attempt to replace Christ's mediation with human priests and traditions. It refers to systems that obscure the simplicity of the gospel and place human authority between God and man.

In the early Christian church, the simplicity of the gospel—salvation through faith in Christ alone, with Christ as the only Mediator—was gradually obscured. Human traditions replaced biblical truth. The priesthood was formalized, with priests claiming the power to forgive sins. The mass was instituted as a repeated sacrifice. Saints and Mary were elevated as mediators. The simple gospel was buried under layers of ceremony and tradition.

This taking away of "the daily"—the simple truth of Christ's mediation—and the establishment of "the abomination of desolation"—a false system of worship—represents the great apostasy predicted in Scripture. The little horn of Daniel 7 and 8, representing the papal power, accomplished this work over centuries.

The Protestant Reformation began to restore the truth of Christ's sole mediation and the simplicity of salvation by faith. However, the Reformation was incomplete. The sanctuary truth, recovered in the 1840s, provides a complete understanding of Christ's mediatorial work and exposes all false systems of worship.

Understanding "the daily" and "the abomination of desolation" helps us appreciate the importance of the sanctuary truth. It shows the contrast between true worship—coming directly to God through Christ's mediation in the heavenly sanctuary—and false worship—trusting in human mediators and traditions.

The third angel's message warns against receiving the mark of the beast and calls people back to true worship of God. This includes rejecting false systems of mediation and returning to the biblical truth of Christ's exclusive role as our High Priest and Mediator.`,
      key_themes: ["The Daily", "Abomination of Desolation", "True vs False Worship", "Christs Mediation", "Apostasy", "Restoration of Truth"],
      scripture_references: ["Daniel 8:11-13", "Daniel 11:31", "Daniel 12:11", "Matthew 24:15", "2 Thessalonians 2:3-4"],
      word_count: 495
    },
    {
      chapter_number: 33,
      title: "The Remnant and Their Mission",
      summary: "Identifies the remnant church and their mission to proclaim the sanctuary truth and the three angels' messages.",
      content: `Revelation 12:17 describes a remnant people who appear at the end of time: "And the dragon was wroth with the woman, and went to make war with the remnant of her seed, which keep the commandments of God, and have the testimony of Jesus Christ."

This remnant church is identified by two characteristics: they keep the commandments of God (all ten, including the Sabbath) and they have the testimony of Jesus Christ (which Revelation 19:10 identifies as "the spirit of prophecy").

The remnant emerges after a period of persecution and apostasy. Revelation 12 describes the pure church (the woman) being driven into the wilderness for 1260 years, representing the period of papal dominance from AD 538 to 1798. After this period, the remnant appears, called to restore biblical truth and prepare the world for Christ's return.

Historically, the Seventh-day Adventist Church emerged in the 1840s following the Great Disappointment, discovering the sanctuary truth and the Sabbath. This church fits the prophetic description: keeping all of God's commandments including the Sabbath, and having the spirit of prophecy manifested in the ministry of Ellen G. White.

The remnant's mission is clearly defined in Revelation 14:6-12—to proclaim the three angels' messages to the world. This includes announcing the judgment hour, calling people out of Babylon (false religious systems), and warning against receiving the mark of the beast.

The first angel's message calls for worship of God as Creator and announces that the hour of His judgment has come. This message is grounded in the sanctuary truth, proclaiming Christ's final work in the Most Holy Place.

The second angel's message announces Babylon's fall and calls God's people to separate from false religious systems that have compromised biblical truth with human tradition.

The third angel's message warns against receiving the mark of the beast and emphasizes keeping God's commandments and maintaining faith in Jesus. This message highlights the Sabbath as the seal of God in opposition to Sunday as the mark of the beast.

The remnant church is not simply one denomination among many but a prophetic movement raised up by God to fulfill a specific mission in earth's final hours. Their message is urgent: probation is closing, judgment is taking place, Christ is coming soon, and all must prepare by accepting the everlasting gospel and obeying God's commandments.

The remnant's mission requires sacrifice and dedication. They face opposition from the dragon (Satan), religious systems (Babylon), and eventually governmental powers (the beast). But they remain faithful, trusting in God's protection and power.

Individual Christians in various churches may be part of God's spiritual remnant, but the remnant church as an organized body has the responsibility to proclaim the complete message. Every believer who understands the sanctuary truth becomes part of this movement and shares in the mission.`,
      key_themes: ["Remnant Church", "Commandment Keepers", "Spirit of Prophecy", "Three Angels Messages", "Final Mission", "Prophetic Identity"],
      scripture_references: ["Revelation 12:17", "Revelation 14:6-12", "Revelation 19:10", "Daniel 7:25-27"],
      word_count: 520
    },
    {
      chapter_number: 34,
      title: "Ellen White and the Spirit of Prophecy",
      summary: "Examines the biblical gift of prophecy and its manifestation in the ministry of Ellen G. White.",
      content: `One of the identifying marks of the remnant church is that they have "the testimony of Jesus Christ," which Revelation 19:10 identifies as "the spirit of prophecy." This gift was manifested in the Seventh-day Adventist Church through the ministry of Ellen G. White.

The Bible teaches that the gift of prophecy would be present in the church, especially in the last days. Joel 2:28-29 prophesies: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy." This prophecy has special application to the time before Christ's return.

1 Corinthians 12:28 lists prophets among the gifts Christ gave to His church. Ephesians 4:11-13 indicates these gifts continue until the church reaches unity of faith and maturity—not yet achieved. The gift of prophecy is therefore still needed and available.

Ellen G. White (1827-1915) received her first vision in December 1844, shortly after the Great Disappointment. Over the next seventy years, she received approximately 2,000 visions and prophetic dreams. Her writings fill more than 100,000 pages, covering theology, health, education, family life, and prophecy.

The biblical tests of a prophet help validate her ministry. First, her teachings harmonize completely with Scripture and exalt Christ. Second, her prophecies have been fulfilled. Third, she bore good fruit in her life and ministry. Fourth, she acknowledged Jesus Christ as coming in the flesh. Fifth, her counsel led people to obey God's law rather than violate it.

Ellen White's role was not to replace Scripture but to exalt it, clarify it, and apply it. She consistently pointed people to the Bible as the only standard of faith and practice. Her writings are a "lesser light to lead men and women to the greater light," as she herself described them.

Her writings provided crucial guidance in understanding the sanctuary truth. Following the Great Disappointment, she received visions confirming that God had led in the Advent movement and showing Christ's ministry in the heavenly sanctuary. These visions encouraged the disappointed believers to continue studying and helped direct them to the truth.

Ellen White also wrote extensively on practical Christian living, health reform, education, and evangelism. Her books like "The Great Controversy," "The Desire of Ages," and "Steps to Christ" have blessed millions of readers worldwide and led many to Christ.

Opposition to the spirit of prophecy often comes from misunderstanding its role. Ellen White's writings are not an addition to the biblical canon or a replacement for Scripture. They are a manifestation of the prophetic gift that guides, instructs, and applies biblical truth to modern circumstances.

Accepting the testimony of Jesus through the spirit of prophecy is not optional for those who understand the remnant's identity. Revelation makes it clear that the remnant "have the testimony of Jesus Christ." Rejecting this gift means rejecting one of the identifying marks of the remnant church.`,
      key_themes: ["Spirit of Prophecy", "Ellen White", "Biblical Gift", "Tests of Prophet", "Guidance", "Remnant Identity"],
      scripture_references: ["Revelation 12:17", "Revelation 19:10", "Joel 2:28-32", "1 Corinthians 12:28", "Ephesians 4:11-14"],
      word_count: 530
    },
    {
      chapter_number: 35,
      title: "Health Reform and the Sanctuary Message",
      summary: "Connects health reform principles with the sanctuary truth and the call to glorify God in our bodies.",
      content: `The sanctuary truth encompasses more than theological doctrine—it includes the whole person, body as well as soul. Understanding this connection helps us appreciate the importance of health reform in the remnant message.

1 Corinthians 3:16-17 declares: "Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you? If any man defile the temple of God, him shall God destroy; for the temple of God is holy, which temple ye are." This connects our physical bodies with the sanctuary concept.

Again in 1 Corinthians 6:19-20: "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's."

These texts reveal that our bodies are temples of God, and we have a sacred responsibility to care for them properly. Just as the earthly sanctuary had specific standards of purity and cleanliness, so should the temple of our bodies be maintained in purity and health.

The first angel's message calls for giving glory to God: "Fear God, and give glory to him." Romans 12:1 shows how we give glory to God: "Present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." Our lifestyle choices either glorify God or dishonor Him.

Health reform is not an arbitrary set of rules but based on natural laws that God established for human wellbeing. These principles include:

- Proper nutrition: eating a balanced diet of wholesome foods, avoiding harmful substances
- Clean water: adequate hydration for bodily functions
- Fresh air: proper ventilation and time outdoors
- Exercise: regular physical activity
- Rest: adequate sleep and Sabbath rest
- Sunlight: moderate exposure for vitamin D and mood
- Temperance: moderation in helpful things, abstinence from harmful things
- Trust in God: spiritual peace and freedom from anxiety

The Bible provides dietary guidelines in Leviticus 11 and Deuteronomy 14, distinguishing between clean and unclean meats. These weren't arbitrary but based on health principles. Many Adventists go further, adopting a plant-based diet following Eden's original diet (Genesis 1:29) and God's ideal after the flood (Genesis 9:3 with health considerations).

Health reform also includes avoiding harmful substances. The body is the temple of the Holy Spirit, and willfully damaging it through tobacco, alcohol, recreational drugs, or other harmful substances is sin. 1 Corinthians 10:31 applies: "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God."

The connection between health and spirituality is profound. Poor health can hinder spiritual perception, reduce capacity for service, and shorten life. Good health enhances mental clarity, emotional stability, and spiritual receptivity. Those preparing for Christ's return should maintain their physical temples in the best possible condition.

Health reform is thus an essential part of the sanctuary message. As we understand that our bodies are temples of God, we recognize our responsibility to care for them according to His principles, glorifying Him in all aspects of life.`,
      key_themes: ["Health Reform", "Body as Temple", "Glorifying God", "Natural Laws", "Temperance", "Diet", "Holistic Message"],
      scripture_references: ["1 Corinthians 3:16-17", "1 Corinthians 6:19-20", "1 Corinthians 10:31", "Romans 12:1-2", "Leviticus 11:1-47"],
      word_count: 570
    },
    {
      chapter_number: 36,
      title: "Christian Education and the Sanctuary",
      summary: "Explores the importance of Christian education grounded in biblical truth and the sanctuary message.",
      content: `The sanctuary truth has profound implications for education. As the remnant church prepares a people for Christ's return, education must be grounded in biblical principles rather than worldly philosophies.

Proverbs 22:6 instructs: "Train up a child in the way he should go: and when he is old, he will not depart from it." This training includes not only moral instruction but also education in all areas of life, always from a biblical worldview centered on the sanctuary truth.

The purpose of Christian education differs from secular education. While secular education focuses on preparing students for careers and material success, Christian education focuses on developing character, understanding truth, and preparing for eternity. The sanctuary message provides the framework for this education.

True education recognizes God as Creator. It teaches science from the perspective of intelligent design rather than evolution. It presents history as the unfolding of the great controversy between Christ and Satan. It approaches literature and arts through the lens of biblical values. It grounds mathematics and logic in the orderliness of God's creation.

The sanctuary truth teaches important educational principles. First, there is absolute truth revealed in Scripture and exemplified in the sanctuary. Second, Christ is the center of all truth—every subject, properly taught, reveals Him. Third, life has eternal significance—decisions made now affect our standing in the judgment. Fourth, character development is more important than academic achievement.

Christian schools should teach the three angels' messages, the Sabbath truth, health reform, and all biblical doctrines. Students should understand the great controversy, the plan of salvation, and their role in God's final work. They should be equipped not just for earthly careers but for service in God's cause.

Ellen White wrote extensively on education, emphasizing practical skills alongside academic learning. Students should learn agriculture, crafts, and domestic skills, not just intellectual subjects. Manual labor dignifies rather than degrades, and practical skills provide self-sufficiency and opportunities for evangelism.

Parents bear primary responsibility for their children's education. Deuteronomy 6:6-7 commands: "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up."

Christian schools should partner with parents, not replace them. The home is the first school, and parents the first teachers. Church schools and academies should reinforce and expand what is taught at home, always in harmony with biblical principles.

Higher education should prepare youth for ministry, medical missionary work, teaching, and other forms of service. Colleges and universities should maintain standards of biblical truth rather than compromising with worldly philosophies. Teachers should be committed believers who exemplify the truths they teach.

The end time calls for educated, dedicated workers who understand the sanctuary message and can communicate it effectively. Education grounded in biblical truth, centered on Christ, and informed by the sanctuary message will prepare a generation to finish God's work on earth.`,
      key_themes: ["Christian Education", "Biblical Worldview", "Character Development", "Practical Skills", "Parent Responsibility", "Truth-Centered"],
      scripture_references: ["Proverbs 22:6", "Deuteronomy 6:4-9", "Psalm 111:10", "2 Timothy 3:14-17"],
      word_count: 555
    },
    {
      chapter_number: 37,
      title: "Evangelism and the Sanctuary Message",
      summary: "Examines methods and motivations for sharing the sanctuary truth and the three angels' messages with the world.",
      content: `The sanctuary truth is not meant to be kept within the church but proclaimed to the world. Understanding Christ's final work in the heavenly sanctuary creates urgency for evangelism and provides clear content for our message.

Jesus' commission in Matthew 28:19-20 applies with special force to those who understand we are living in the judgment hour: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you."

Revelation 14:6 describes the first angel having "the everlasting gospel to preach unto them that dwell on the earth, and to every nation, and kindred, and tongue, and people." This shows the universal scope of the remnant's mission—every person must hear the sanctuary message before Christ returns.

The content of our evangelistic message is clear: the everlasting gospel (salvation through Christ alone), the judgment hour (Christ's ministry in the Most Holy Place), worship of God as Creator (including Sabbath observance), separation from Babylon (false religious systems), and avoidance of the mark of the beast (forced Sunday observance).

Methods of evangelism should be varied and adapted to different contexts. Public evangelism through preaching campaigns remains effective in many areas. Small group Bible studies allow for personal interaction and questions. Literature distribution spreads the message widely. Medical missionary work opens doors and demonstrates Christ's love. Christian education prepares young people to be missionaries. Digital media reaches global audiences.

Jesus' method is the model: "Christ's method alone will give true success in reaching the people. The Saviour mingled with men as one who desired their good. He showed His sympathy for them, ministered to their needs, and won their confidence. Then He bade them, 'Follow Me.'"

Personal testimony is powerful in evangelism. Sharing how the sanctuary truth has transformed our lives and given us hope attracts others to investigate further. Our changed lives become living testimonies to the power of the gospel.

Prayer must undergird all evangelistic efforts. Acts 4:31 describes how prayer empowered the early church: "And when they had prayed, the place was shaken where they were assembled together; and they were all filled with the Holy Ghost, and they spake the word of God with boldness."

The Holy Spirit's work is essential in evangelism. We plant and water, but God gives the increase. The Spirit convicts of sin, reveals truth, and transforms hearts. Our role is to faithfully present truth and trust the Spirit to work.

Motivation for evangelism comes from several sources. Love for Christ compels us to share His truth. Love for lost souls motivates us to warn them of coming judgment. Understanding the shortness of time creates urgency. Gratitude for salvation inspires us to give others the same opportunity.

The harvest principle applies: some sow seed, others water, others reap. Not everyone will see immediate results, but all faithful work contributes to the final harvest. We should not be discouraged by apparent lack of response but continue faithfully sharing truth.

The remnant church has a solemn responsibility. God has entrusted us with the most important message ever given to the world—the final warning before probation closes. We must proclaim it faithfully, urgently, and lovingly, knowing that soon Christ will finish His work in the sanctuary and return to gather His people.`,
      key_themes: ["Evangelism", "Great Commission", "Three Angels Messages", "Methods", "Holy Spirit", "Urgency", "Faithful Witness"],
      scripture_references: ["Matthew 28:18-20", "Revelation 14:6-12", "Acts 1:8", "2 Timothy 4:2", "Mark 16:15"],
      word_count: 620
    },
    {
      chapter_number: 38,
      title: "The Loud Cry",
      summary: "Describes the final, powerful proclamation of the three angels' messages before probation closes.",
      content: `Revelation 18:1-4 describes a final, powerful proclamation of God's message to the world: "And after these things I saw another angel come down from heaven, having great power; and the earth was lightened with his glory. And he cried mightily with a strong voice, saying, Babylon the great is fallen, is fallen...And I heard another voice from heaven, saying, Come out of her, my people."

This angel, coming after the three angels of Revelation 14, represents the final proclamation of the same messages with increased power and urgency. This is called "the loud cry"—the culmination of the remnant church's evangelistic work.

The loud cry will be characterized by several features. First, it will be accompanied by an outpouring of the Holy Spirit similar to Pentecost. Joel 2:28-29 prophesies this latter rain: "I will pour out my spirit upon all flesh." This spiritual power will enable believers to proclaim truth with unprecedented effectiveness.

Second, the loud cry will be marked by clear contrast between truth and error. Babylon's fall will be evident to all. The mark of the beast and the seal of God will be clearly defined. The Sabbath-Sunday issue will come to the forefront. No one will be able to remain neutral—all must choose sides.

Third, miracles and spiritual gifts will accompany the message. As in the early church, signs and wonders will confirm the truth. However, Satan will also perform false miracles to deceive, making discernment essential. The test will always be conformity to God's Word.

Fourth, persecution will intensify. As the message gains power and many respond, opposition will increase. Laws will be passed restricting religious liberty, culminating in a death decree against Sabbath keepers. This persecution will actually help spread the message as believers remain faithful despite threats.

Fifth, many honest souls will come out of fallen churches. Multitudes who have been held in Babylon by tradition or ignorance will recognize truth when it's proclaimed with power and clarity. Revelation 18:4 calls them: "Come out of her, my people, that ye be not partakers of her sins."

Sixth, the message will go rapidly to the whole world. Modern technology enables instantaneous global communication. When the Holy Spirit empowers the message, it will spread like wildfire. Every nation, kindred, tongue, and people will hear.

Seventh, the work will be finished quickly. The loud cry represents the final harvest before Christ returns. Once fully empowered by the Spirit, the remnant will complete their mission in a short time. Jesus promised in Matthew 24:14: "This gospel of the kingdom shall be preached in all the world for a witness unto all nations; and then shall the end come."

Preparation for participating in the loud cry requires several things. Full surrender to Christ and victory over known sin. Understanding of the sanctuary message and three angels' messages. Reception of the latter rain by having empty vessels ready. Willingness to sacrifice comfort, reputation, or even life for truth's sake. Unity among believers in doctrine and love.

The loud cry is not the work of ordained ministers alone but of the entire church empowered by the Spirit. Laypeople will proclaim truth with power. Young people will carry the message. Even children will witness to God's truth. Everyone who has received light has responsibility to share it.

The loud cry will mark the climax of the great controversy. It will be the final call of mercy to a world about to face God's judgments. It will gather in the final harvest of souls. And it will prepare God's people for the time of trouble and Christ's return.`,
      key_themes: ["Loud Cry", "Latter Rain", "Final Proclamation", "Holy Spirit Power", "Harvest", "Rapid Completion", "Universal Message"],
      scripture_references: ["Revelation 18:1-5", "Joel 2:28-32", "Matthew 24:14", "Acts 2:1-21", "Habakkuk 2:14"],
      word_count: 650
    },
    {
      chapter_number: 39,
      title: "The Time of Trouble",
      summary: "Describes the final period of tribulation after probation closes and before Christ's return.",
      content: `Daniel 12:1 prophesies: "And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book."

The time of trouble is the brief period between the close of probation and the second coming of Christ. This is the most severe trial God's people will ever face, yet also the time of their ultimate deliverance.

The time of trouble begins when Christ finishes His work in the Most Holy Place and declares, "He that is unjust, let him be unjust still...and he that is righteous, let him be righteous still" (Revelation 22:11). At this point, every case has been decided. Christ removes His priestly garments and prepares to return as King.

During this time, God's people must live without an intercessor in the heavenly sanctuary. Their characters must be fully developed and sealed before probation closes, as there is no further opportunity for character change. This emphasizes the importance of thorough preparation now.

The time of trouble includes several aspects. First, the seven last plagues begin to fall on those who have received the mark of the beast. These plagues, described in Revelation 16, are God's judgments on the unrepentant world. They include terrible suffering but fall primarily on the wicked.

Second, a death decree is issued against Sabbath keepers. Revelation 13:15 prophesies that the image of the beast "should cause that as many as would not worship the image of the beast should be killed." God's people will face the choice of martyrdom or denying their faith.

Third, God's people flee to desolate places for protection. They hide in mountains, caves, and wilderness areas, trusting God to preserve them as He preserved Elijah. God provides for their physical needs miraculously—their bread and water will be sure.

Fourth, Satan and wicked people attempt to destroy God's people. They surround the hiding places, determined to exterminate those who reject the mark of the beast. It appears that the righteous will be destroyed.

Fifth, God's people experience a time of Jacob's trouble—deep anguish and prayer as they wrestle with God for deliverance. Like Jacob, they confess their sins and plead God's promises. They are not condemned but struggle with doubt and fear.

Sixth, God intervenes supernaturally to protect His people. As enemies close in, God sends deliverance. The tables are turned—the wicked begin to fight among themselves. Confusion seizes them. God's people are miraculously preserved.

Seventh, the wicked experience the full terror of the plagues without the restraining mercy of God. They recognize their doom and the justice of God's judgments. Many try to attack God's people, blaming them for the calamities, but God protects His own.

Throughout the time of trouble, God's people maintain their faith and loyalty. They refuse to compromise even when facing death. Their trust in God never wavers, though they experience severe trials. They have learned to live by faith, and this sustains them when all human support is removed.

The time of trouble ends with Christ's return. Just as it appears that God's people will be destroyed, the heavens open and Christ appears with all His holy angels. The wicked are destroyed by the brightness of His coming, and the righteous are delivered and taken to heaven.

Understanding the time of trouble should not fill us with fear but with determination to prepare. Those who maintain a daily connection with Christ, who overcome sin now, who develop strong faith through present trials, will be prepared to stand in that final test. The sanctuary message shows us what we must do now to be ready then.`,
      key_themes: ["Time of Trouble", "Seven Last Plagues", "Death Decree", "No Mediator", "Jacob's Trouble", "Divine Protection", "Final Test"],
      scripture_references: ["Daniel 12:1", "Revelation 16:1-21", "Revelation 22:11-12", "Jeremiah 30:5-7", "Psalm 91:1-16"],
      word_count: 705
    },
    {
      chapter_number: 40,
      title: "Our High Calling",
      summary: "Concludes with an appeal to embrace the sanctuary truth and fulfill our calling as part of God's remnant people.",
      content: `The sanctuary truth is not merely an interesting theological doctrine—it is the foundation of our faith, the explanation of our existence as a people, and the motivation for our mission. Understanding what Christ is doing in heaven should transform what we do on earth.

We have been given a high and holy calling. God has chosen us, not because we are better than others, but to be His witnesses in the final generation. He has revealed to us truths that the world desperately needs to hear. He has entrusted us with the solemn responsibility of proclaiming the three angels' messages.

Our calling includes several elements. First, to understand and embrace the sanctuary truth personally. We must study it, believe it, and allow it to transform our lives. We must experience the reality of Christ's ministry in our own hearts.

Second, to proclaim this truth to others. We are called to be witnesses, sharing what we know with everyone we meet. The judgment is taking place now, Christ is coming soon, and people need to prepare. We cannot keep this message to ourselves.

Third, to live lives that exemplify the truth we proclaim. Our characters must reflect Christ. Our choices must honor God. Our priorities must demonstrate that we truly believe Christ is coming soon. We must be living testimonies to the power of the gospel.

Fourth, to remain faithful despite opposition. We will face ridicule, persecution, and eventually the death decree. But we must stand firm, trusting that God will preserve us and that our eternal reward far outweighs any temporary suffering.

Fifth, to maintain unity as God's people. Satan seeks to divide the remnant through disagreement, criticism, and controversy. We must love one another, bear with one another's weaknesses, and work together to accomplish our mission.

The sanctuary service illustrates our high calling. Just as the priests ministered in the earthly sanctuary, we are called to be a "royal priesthood" (1 Peter 2:9), ministering truth to the world. Just as the sanctuary was holy, separate from the world, so we must be holy and separate while still engaging with the world to save souls.

The Day of Atonement imagery is particularly powerful. We live in the antitypical Day of Atonement. Christ is in the Most Holy Place performing His final work. The judgment is taking place. Soon He will emerge and probation will close. Our response must be to "afflict our souls"—to engage in deep heart searching, confession, reformation, and preparation.

The promises associated with our calling are glorious. We will be sealed with the seal of the living God. We will stand without a mediator during the time of trouble. We will see Christ coming in the clouds of heaven. We will be caught up to meet Him in the air. We will reign with Him during the millennium. We will inherit the new earth and live forever in God's presence.

But these promises come with requirements. We must be faithful. We must overcome. We must endure to the end. We must maintain our connection with Christ and allow Him to complete His work in us. We must cooperate with the Holy Spirit's sanctifying power.

The sanctuary truth reveals that time is short. Christ's work in the Most Holy Place is almost finished. The judgment is almost complete. Soon He will lay aside His priestly robes, the door of mercy will close, and He will return to earth. Every day that passes is one day closer to that moment.

The question for each of us is: Will I fulfill my calling? Will I embrace the sanctuary truth and allow it to transform my life? Will I proclaim it faithfully to others? Will I prepare myself and help others prepare for Christ's return? Will I be found faithful when He appears?

God is calling you today. He has revealed to you precious truth about His work in the heavenly sanctuary. He has shown you where we are in the stream of time. He has given you the opportunity to be part of His remnant people and share in completing His work on earth.

The sanctuary doors are still open. Christ is still interceding. The door of mercy still stands ajar. But soon—very soon—that door will close. Now is the time to respond. Now is the time to surrender fully to Christ. Now is the time to prepare for the final events. Now is the time to embrace your high calling as one of God's remnant people.

May the sanctuary truth become more than doctrine to you. May it become the motivation for daily living, the foundation of your hope, and the passion of your life. And may you, with all of God's faithful people, soon see Him face to face and worship before His throne forever.`,
      key_themes: ["High Calling", "Personal Responsibility", "Faithful Witness", "Preparation", "Final Appeal", "Eternal Reward", "Urgency"],
      scripture_references: ["1 Peter 2:9-10", "Hebrews 10:23-25", "Revelation 3:10-11", "2 Timothy 4:7-8", "Philippians 3:13-14"],
      word_count: 820
    }
  ],
  key_concepts: [
    {
      concept_name: "Sanctuary",
      definition: "The earthly tabernacle built by Moses and its heavenly counterpart where Christ ministers as our High Priest."
    },
    {
      concept_name: "Atonement",
      definition: "The reconciliation between God and humanity through the sacrifice of Christ, symbolized by the sanctuary sacrifices."
    },
    {
      concept_name: "Day of Atonement",
      definition: "The annual day of judgment and cleansing of the sanctuary, pointing to the investigative judgment beginning in 1844."
    },
    {
      concept_name: "Investigative Judgment",
      definition: "The pre-advent judgment work of Christ in the heavenly sanctuary, determining who is worthy of eternal life."
    },
    {
      concept_name: "2300 Days",
      definition: "The prophetic time period in Daniel 8:14, representing 2300 years from 457 BC to 1844 AD."
    },
    {
      concept_name: "Cleansing of Sanctuary",
      definition: "The removal of the record of confessed sins from the sanctuary, both earthly and heavenly."
    },
    {
      concept_name: "Priesthood",
      definition: "The mediatorial ministry of priests in the earthly sanctuary, pointing to Christ's ministry as our High Priest."
    },
    {
      concept_name: "Sacrifice",
      definition: "The system of animal offerings that pointed forward to Christ's death as the ultimate sacrifice for sin."
    },
    {
      concept_name: "Most Holy Place",
      definition: "The inner chamber of the sanctuary containing the ark of the covenant, representing God's throne room."
    },
    {
      concept_name: "Three Angels Messages",
      definition: "The final warning messages of Revelation 14, proclaiming the judgment hour and calling people to worship God."
    }
  ]
};

export async function seedGilbertBook() {
  try {
    console.log('Starting Gilbert book seed...');

    // Insert chapters
    for (const chapter of gilbertBookData.chapters) {
      const { data: chapterData, error: chapterError } = await supabase
        .from('gilbert_chapters')
        .insert([chapter])
        .select()
        .single();

      if (chapterError) {
        console.error(`Error inserting chapter ${chapter.chapter_number}:`, chapterError);
        continue;
      }

      console.log(`✓ Inserted chapter ${chapter.chapter_number}: ${chapter.title}`);
    }

    // Insert key concepts
    for (const concept of gilbertBookData.key_concepts) {
      const { error: conceptError } = await supabase
        .from('gilbert_key_concepts')
        .insert([concept]);

      if (conceptError) {
        console.error(`Error inserting concept ${concept.concept_name}:`, conceptError);
      } else {
        console.log(`✓ Inserted concept: ${concept.concept_name}`);
      }
    }

    console.log('Gilbert book seed completed successfully!');
  } catch (error) {
    console.error('Error seeding Gilbert book:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedGilbertBook().then(() => {
    console.log('Seed completed');
    process.exit(0);
  }).catch(error => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
}
