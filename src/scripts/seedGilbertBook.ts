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
