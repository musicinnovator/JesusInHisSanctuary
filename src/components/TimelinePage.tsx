import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Play, Pause, SkipForward, SkipBack, Book, Image } from 'lucide-react';

type TimelineStep = {
  step: number;
  aaron: string;
  jesus: string;
  aaronRef?: string;
  jesusRef?: string;
  description?: string;
  aaronGif?: string;
  jesusGif?: string;
  aaronGifAlt?: string;
  jesusGifAlt?: string;
};

const TimelinePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGifs, setShowGifs] = useState(true);

  const timelineSteps: TimelineStep[] = [
    // Step 0
    {
      step: 0,
      aaron: "Aaron comes through the gate to work in the morning",
      jesus: "Jesus is born into this world of sinful human flesh",
      aaronRef: "{Leviticus 16:3} - Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering.",
      jesusRef: "Matthew 1:21 - And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.; Luke 1:35 - And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God. ; {John 1:14} - And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
      description: "Entrance into the work of Salvation: Aaron begins daily service in the Tabernacle; Christ enters humanity through Mary and the Holy Spirit.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/c5d5e4c4-7f24-41b2-aaa7-a7db3b37fe1f_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9jNWQ1ZTRjNC03ZjI0LTQxYjItYWFhNy1hN2RiM2IzN2ZlMWZfMC5wbmciLCJpYXQiOjE3NTg5MjIyNjksImV4cCI6MjA3NDI4MjI2OX0.fXssZ0ERWjbI5AJDUlonGMBCZqUlfJITmBAnr8L1EOc",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/b25a476e-2e04-4faf-966e-dd9ef521ed34_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9iMjVhNDc2ZS0yZTA0LTRmYWYtOTY2ZS1kZDllZjUyMWVkMzRfMC5wbmciLCJpYXQiOjE3NTg5MjIxNDksImV4cCI6MjA3NDI4MjE0OX0.Di6xY6UMgse_kHcgfBKp77WJNiEeE3lZPtvbjYXbfEA",
      aaronGifAlt: "Aaron entering the sanctuary gate in the morning",
      jesusGifAlt: "Christ's incarnation - entering humanity"
    },
    // Step 1
    {
      step: 1,
      aaron: "Washes body & puts on common priest's clothes",
      jesus: "Baptism (by John at the river Jordan)",
      aaronRef: "{Leviticus 16:4} - He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on.\n{Exodus 30:18-21} - Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. For Aaron and his sons shall wash their hands and their feet thereat: When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Matthew 3:13-17} - Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him. But John forbad him, saying, I have need to be baptized of thee, and comest thou to me? And Jesus answering said unto him, Suffer it to be so now: for thus it becometh us to fulfil all righteousness. Then he suffered him. And Jesus, when he was baptized, went up straightway out of the water: and, lo, the heavens were opened unto him, and he saw the Spirit of God descending like a dove, and lighting upon him: And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.; Mark 1:9-11; Luke 3:21-22",
      description: "Consecration and preparation for ministry.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/159ca2d8-2a50-4b57-a272-19b177c58c40_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy8xNTljYTJkOC0yYTUwLTRiNTctYTI3Mi0xOWIxNzdjNThjNDBfMC5wbmciLCJpYXQiOjE3NTg5MjMxNjEsImV4cCI6MjA3NDI4MzE2MX0.QdiEVhykVfu8i-S_0a9rIVBesUbqfOZ4ciJnRDEx5as",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/49357ba2-9195-4340-a50a-186e833ab2d1_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy80OTM1N2JhMi05MTk1LTQzNDAtYTUwYS0xODZlODMzYWIyZDFfMC5wbmciLCJpYXQiOjE3NTg5MjM2OTQsImV4cCI6MjA3NDI4MzY5NH0.WqamjV3ldn_JYaT4exo4sQRSbNS7wDVH9W7Je4cSqc8",
      aaronGifAlt: "Aaron washing at the bronze laver and putting on priestly garments",
      jesusGifAlt: "Jesus being baptized by John in the Jordan River"
    },
    // Step 2
    {
      step: 2,
      aaron: "Kills bull for himself & his household",
      jesus: "Crucifixion as a bull for Himself & co-laborers",
      aaronRef: "{Leviticus 16:6, 11} (6) And Aaron shall offer his bullock of the sin offering, which is for himself, and make an atonement for himself, and for his house. (11) And Aaron shall bring the bullock of the sin offering, which is for himself, and shall make an atonement for himself, and for his house, and shall kill the bullock of the sin offering which is for himself: ",
      jesusRef: "{Hebrews 7:27} Who needeth not daily, as those high priests, to offer up sacrifice, first for his own sins, and then for the people's: for this he did once, when he offered up himself.; {2 Corinthians 5:21}  - For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
      description: "Atonement provision: Aaron needs covering; Christ provides the ultimate sacrifice.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/58d3bcbd-7daa-4e2c-8505-9fda0d66418f_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy81OGQzYmNiZC03ZGFhLTRlMmMtODUwNS05ZmRhMGQ2NjQxOGZfMC5wbmciLCJpYXQiOjE3NTg5MjM5MDIsImV4cCI6MjA3NDI4MzkwMn0.iv3bpN4TBj5xaWDOQaEqzekGtTMPGKZ5uQW9yGizjXQ",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/0602170.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy8wNjAyMTcwLmpwZyIsImlhdCI6MTc1ODkyNDAxOCwiZXhwIjoyMDc0Mjg0MDE4fQ.KQ7A9uu0FN7bdaUk2GrBj-Wo6s74TUc_iO1NVmrjhuc",
      aaronGifAlt: "Aaron sacrificing the bull at the bronze altar",
      jesusGifAlt: "Christ's crucifixion - the ultimate sacrifice"
    },
    // Step 3
    {
      step: 3,
      aaron: "Washes hands & feet",
      jesus: "Resurrection (removes traces of sin)",
      aaronRef: "{Exodus 30:18-21} Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein.(19) For Aaron and his sons shall wash their hands and their feet thereat: (20) When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: (21) So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Matthew 28} (see entire chapter); {Romans 6:9-10} Knowing that Christ being raised from the dead dieth no more; death hath no more dominion over him (10) For in that he died, he died unto sin once: but in that he liveth, he liveth unto God.;  {1 Corinthians 15} (see entire chapter)",
      description: "Purity emphasized; Christ's resurrection demonstrates victory over sin and death.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/d2ff6872-a50b-403f-ba3a-eac5f2a14cc2_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9kMmZmNjg3Mi1hNTBiLTQwM2YtYmEzYS1lYWM1ZjJhMTRjYzJfMC5wbmciLCJpYXQiOjE3NTg5MjQxMTUsImV4cCI6MjA3NDI4NDExNX0.0JxnS6f8hFYKmj2BorZw8esRFTFRkZsAvYNA0pV5jM0",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/c683ec04-77cd-4381-928b-7f17c8d29218_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9jNjgzZWMwNC03N2NkLTQzODEtOTI4Yi03ZjE3YzhkMjkyMThfMC5wbmciLCJpYXQiOjE3NTg5MjQ1NTMsImV4cCI6MjA3NDI4NDU1M30.R6DaFGj7kWQ0vS490wxXHg8_XP9LHpsZHuo1WV6TfIk",
      aaronGifAlt: "Aaron washing hands and feet at the laver for purification",
      jesusGifAlt: "Christ's resurrection - victory over sin and death"
    },
    // Step 4
    {
      step: 4,
      aaron: "Picks up incense & censer",
      jesus: "Passed through with His own merits",
      aaronRef: "{Leviticus 16:12-13}  And he shall take a censer full of burning coals of fire from off the altar before the LORD, and his hands full of sweet incense beaten small, and bring it within the vail:(13) And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not: ",
      jesusRef: "{Hebrews 9:11-12} But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building; (12) Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; {Hebrews 4:14-16}  Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession. (15) For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. (16) Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need. {John 20:17} - Jesus saith unto her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God. ",
      description: "Intercession initiates: Aaron's incense typifies Christ's merits.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/1984db32-561b-4161-bb35-a2338ea06da8_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy8xOTg0ZGIzMi01NjFiLTQxNjEtYmIzNS1hMjMzOGVhMDZkYThfMC5wbmciLCJpYXQiOjE3NTg5MjU0NTIsImV4cCI6MjA3NDI4NTQ1Mn0.a22BOVEuqGVSMfnF8N62FjUxGmuJFmYmn7AxpkHVcEM",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/454f5949-97aa-4271-bc44-8935965050c6_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy80NTRmNTk0OS05N2FhLTQyNzEtYmM0NC04OTM1OTY1MDUwYzZfMC5wbmciLCJpYXQiOjE3NTg5MjU5MjQsImV4cCI6MjA3NDI4NTkyNH0.nWtOQWTqVmwZucN4z3XeENVnyC1fbU2AL7OHFiQKKLc",
      aaronGifAlt: "Aaron taking incense and censer from the altar",
      jesusGifAlt: "Christ ascending to heaven with His own merits"
    },
    // Step 5
    {
      step: 5,
      aaron: "Aaron as common priest puts blood of bullock on ark: acceptance by God; puts censer on Mercy Seat",
      jesus: "Jesus presents His merits and His blood; He receives acceptance by God before returning to earth",
      aaronRef: "{Leviticus 16:13-14} - And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not: {14} And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times. ",
      jesusRef: "{Hebrews 9:12}  Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us. ; {Hebrews 10:12-14} But this man, after he had offered one sacrifice for sins for ever, sat down on the right hand of God; (13) From henceforth expecting till his enemies be made his footstool. (14) For by one offering he hath perfected for ever them that are sanctified.",
      description: "Acceptance before God on the basis of blood.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/4b6ee013-cff3-4239-8922-a284da7b494b_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy80YjZlZTAxMy1jZmYzLTQyMzktODkyMi1hMjg0ZGE3YjQ5NGJfMC5wbmciLCJpYXQiOjE3NTg5MjYzOTIsImV4cCI6MjA3NDI4NjM5Mn0.nMv2r_Xk9w0Zu28vns2xd2wMSyIKxqwHrbTBpdvCp4U",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/0611244.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy8wNjExMjQ0LmpwZyIsImlhdCI6MTc1ODkyNjg0NSwiZXhwIjoyMDc0Mjg2ODQ1fQ.bFG1nJZZ3dlPp5afhud5XLNt6Y1JP9d_LfVUnR_2oU0",
      aaronGifAlt: "Aaron sprinkling blood on the mercy seat seven times",
      jesusGifAlt: "Christ presenting His blood before the Father's throne"
    },
    // Step 6
    {
      step: 6,
      aaron: "Meets with co-laborers (fellow priests) and returns to altar of sacrifice (the Outer Court = World); kills lamb for the people(not for himself this time): inspects the lamb first(must meet the requirements of God)",
      jesus: "Meets with co-laborers (His disciples(Peter,James, John, Mattheew, Mark, etc..)); 40 days spent on Earth as the Risen Lamb for the people",
      aaronRef: "{Leviticus 1:3} If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD.",
      jesusRef: "{Acts 1:3} To whom also he shewed himself alive after his passion by many infallible proofs, being seen of them forty days, and speaking of the things pertaining to the kingdom of God:; {Luke 24}(see entire chapter)",
      description: "Ministry with disciples before His Ascension.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/b0db36d7-edc8-427f-ae83-7dbbdc759f98_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9iMGRiMzZkNy1lZGM4LTQyN2YtYWU4My03ZGJiZGM3NTlmOThfMC5wbmciLCJpYXQiOjE3NTg5MjgwMDMsImV4cCI6MjA3NDI4ODAwM30.P7zq9joeDYfh3T-0-ZBV8h6J_OVjY3_W5pR6PrMDtdU",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/a388ac21-d889-4362-8c1b-823e154b88d5_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9hMzg4YWMyMS1kODg5LTQzNjItOGMxYi04MjNlMTU0Yjg4ZDVfMC5wbmciLCJpYXQiOjE3NTg5Mjc2NjYsImV4cCI6MjA3NDI4NzY2Nn0.ugfP6EpyonB88C5O7lfPjH_UX-sdU-13fD5lc_gmpIc",
      aaronGifAlt: "Aaron meeting with fellow priests and inspecting the sacrificial lamb",
      jesusGifAlt: "Jesus appearing to His disciples for 40 days after resurrection"
    },
    // Step 7
    {
      step: 7,
      aaron: "Washes hands & feet",
      jesus: "He possesed the same body that He had before taking on humanity. Divine stature restored to 16ft.",
      aaronRef: "{Exodus 30:18-21}  Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein. (19)For Aaron and his sons shall wash their hands and their feet thereat: (20) When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: (21) So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.",
      jesusRef: "{Hebrews 2:5-19} But we see Jesus, who was made a little lower than the angels for the suffering of death, crowned with glory and honour; that he by the grace of God should taste death for every man...; {I Corinthians 15:35-53} So also is the resurrection of the dead. It is sown in corruption; it is raised in incorruption: (43) It is sown in dishonour; it is raised in glory: it is sown in weakness; it is raised in power:... {Ac:1:9-11} And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight. 10 And while they looked stedfastly toward heaven as he went up, behold, two men stood by them in white apparel; 11 Which also said, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.",
      description: "Renewed purity in type; assertion of restored divine stature as He had in Heaven. ",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/d2ff6872-a50b-403f-ba3a-eac5f2a14cc2_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9kMmZmNjg3Mi1hNTBiLTQwM2YtYmEzYS1lYWM1ZjJhMTRjYzJfMC5wbmciLCJpYXQiOjE3NTg5MjgyMTYsImV4cCI6MjA3NDI4ODIxNn0.YIkBDGF3kmvjfOK7L-KNQlH4b7PUJ90PyRD08w3Gdjg",
      jesusGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/f82b9494-4ad2-4b59-8b00-e4d82c4e5075_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy9mODJiOTQ5NC00YWQyLTRiNTktOGIwMC1lNGQ4MmM0ZTUwNzVfMC5wbmciLCJpYXQiOjE3NTg5Mjg1NTksImV4cCI6MjA3NDI4ODU1OX0.J95A0CbR3sbrfY4CgjD705E3n2J4Rpfvj1YoelTvH1s",
      aaronGifAlt: "Aaron washing hands and feet again for renewed purity",
      jesusGifAlt: "Christ's divine stature restored - glorified body"
    },
    // Step 8
    {
      step: 8,
      aaron: "Dresses as High Priest",
      jesus: "Inauguration as High Priest",
      aaronRef: "{Leviticus 16:4, 23-24} (4)) He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh, and shall be girded with a linen girdle, and with the linen mitre shall he be attired: these are holy garments; therefore shall he wash his flesh in water, and so put them on. (23-24) And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there:(24) And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "{Hebrews 4:14} Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God, let us hold fast our profession.; {Hebrews 8:1-2} Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; (2) A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.",
      description: "High-priestly investiture and inauguration.",
      aaronGif: "https://zxvbmmdkhpqiaqdjxepr.supabase.co/storage/v1/object/sign/Pictures/357ef51b-4913-44ab-a14a-331d45fe1811_0.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZTAxYzgwNi1hZWVlLTRiZjItODhiMS03M2MzZDYwNWVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQaWN0dXJlcy8zNTdlZjUxYi00OTEzLTQ0YWItYTE0YS0zMzFkNDVmZTE4MTFfMC5wbmciLCJpYXQiOjE3NTg5MjkyMDUsImV4cCI6MjA3NDI4OTIwNX0.SOPpv4unhtlT1jHaDzxQ8x4CMRVm2a7JeivuRMR3Pf0",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron putting on the elaborate high priestly garments",
      jesusGifAlt: "Christ's inauguration as High Priest in heaven"
    },
    // Step 9
    {
      step: 9,
      aaron: "Pours oil into lamp",
      jesus: "Pentecost",
      aaronRef: "{Exodus 27:20-21}  And thou shalt command the children of Israel, that they bring thee pure oil olive beaten for the light, to cause the lamp to burn always. (21) In the tabernacle of the congregation without the vail, which is before the testimony, Aaron and his sons shall order it from evening to morning before the LORD: it shall be a statute for ever unto their generations on the behalf of the children of Israel.",
      jesusRef: "{Acts 2} (see entire chapter); {John 16:7} Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you. ",
      description: "Light and Spirit poured out upon the people.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron pouring oil into the golden lampstand",
      jesusGifAlt: "The Holy Spirit descending at Pentecost"
    },
    // Step 10
    {
      step: 10,
      aaron: "Puts incense on altar",
      jesus: "Christ on first throne; pleads His merits for the people",
      aaronRef: "{Exodus 30:7-10}  And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it. (8)  And when Aaron lighteth the lamps at even, he shall burn incense upon it, a perpetual incense before the LORD throughout your generations. (9) Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon. (10) And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD.",
      jesusRef: "{Hebrews 7:25} Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.; {Revelation 8:3-4}  And another angel came and stood at the altar, having a golden censer; and there was given unto him much incense, that he should offer it with the prayers of all saints upon the golden altar which was before the throne. (4) And the smoke of the incense, which came with the prayers of the saints, ascended up before God out of the angel's hand. ",
      description: "Active intercession on behalf of the people.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron burning incense on the golden altar",
      jesusGifAlt: "Christ interceding at the heavenly altar with golden censer"
    },

    // Yearly Service section
    // Step 11
    {
      step: 11,
      aaron: "Blowing of the trumpet (~10 days before Day of Atonement)",
      jesus: "First Angel's Message preached (1833)",
      aaronRef: "Leviticus 23:24-27 - Le:23:24: Speak unto the children of Israel, saying, In the seventh month, in the first day of the month, shall ye have a sabbath, a memorial of blowing of trumpets, an holy convocation. 25 Ye shall do no servile work therein: but ye shall offer an offering made by fire unto the LORD. 26 And the LORD spake unto Moses, saying, 27 Also on the tenth day of this seventh month there shall be a day of atonement: it shall be an holy convocation unto you; and ye shall afflict your souls, and offer an offering made by fire unto the LORD.",
      jesusRef: "Revelation 14:6-7 (historic application 1830s) - Re:14:6: And I saw another angel fly in the midst of heaven, having the everlasting gospel to preach unto them that dwell on the earth, and to every nation, and kindred, and tongue, and people, 7 Saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters.",
      description: "Announcement and warning preceding the atonement.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Trumpet being blown to announce the Day of Atonement",
      jesusGifAlt: "Angel flying with the everlasting gospel message"
    },
    // Step 12
    {
      step: 12,
      aaron: "Common priests leave the court; Aaron casts lots & kills the Lord's goat for the people",
      jesus: "Ends work of 24 elders & 4 beasts; Jesus shows He died as a goat for the people",
      aaronRef: "Leviticus 16:7-10, 15 - Le:16:7: And he shall take the two goats, and present them before the LORD at the door of the tabernacle of the congregation. 8 And Aaron shall cast lots upon the two goats; one lot for the LORD, and the other lot for the scapegoat. 9 And Aaron shall bring the goat upon which the LORD's lot fell, and offer him for a sin offering. 10 But the goat, on which the lot fell to be the scapegoat, shall be presented alive before the LORD, to make an atonement with him, and to let him go for a scapegoat into the wilderness.",
      jesusRef: "Hebrews 9:26-28 - Heb:9:26: For then must he often have suffered since the foundation of the world: but now once in the end of the world hath he appeared to put away sin by the sacrifice of himself. 27: And as it is appointed unto men once to die, but after this the judgment: 28: So Christ was once offered to bear the sins of many; and unto them that look for him shall he appear the second time without sin unto salvation.",
      description: "Selection and offering for the people; antitype emphasizes Christ's substitution.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron casting lots between two goats and sacrificing the Lord's goat",
      jesusGifAlt: "Christ's substitutionary sacrifice for the people"
    },
    // Step 13
    {
      step: 13,
      aaron: "High Priest goes into the Most Holy Place",
      jesus: "Christ goes into the Most Holy Place in Heaven (1844)",
      aaronRef: "Leviticus 16:15-16 - Le:16:15: Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat: 16: And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness.",
      jesusRef: "Hebrews 9:23-24 (historic application 1844) - Heb:9:23: It was therefore necessary that the patterns of things in the heavens should be purified with these; but the heavenly things themselves with better sacrifices than these. 24: For Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us:",
      description: "Entrance into the climactic phase of atonement.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron entering through the veil into the Most Holy Place",
      jesusGifAlt: "Christ entering the Most Holy Place of the heavenly sanctuary in 1844"
    },
    // Step 14
    {
      step: 14,
      aaron: "continued from from step 13",
      jesus: "Jesus stands before the Law showing the Sabbath to those in 1844",
      aaronRef: "",
      jesusRef: "Revelation 11:19  - And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.; {Exodus 20:8-11} - Ex:20:8: Remember the sabbath day, to keep it holy. 9 Six days shalt thou labour, and do all thy work: 10: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates: 11: For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it. ",
      description: "Law-centered focus in the Most Holy Place (interpretive emphasis).",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron standing before the ark containing God's law",
      jesusGifAlt: "Christ revealing the Sabbath commandment to His people"
    },
    // Step 15
    {
      step: 15,
      aaron: "(continued from above)",
      jesus: "Christ sits with God as Judge; Investigative Judgment",
      aaronRef: "",
      jesusRef: "Daniel 7:9-10 - Da:7:9: I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire. 10: A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened.; Revelation 20:12 - And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works.",
      description: "Judicial phase emphasizing review and verdict.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron conducting the Day of Atonement judgment ritual",
      jesusGifAlt: "Christ seated in judgment with the Ancient of Days"
    },
    // Step 16
    {
      step: 16,
      aaron: "High Priest stands before God and the Law; sprinkles blood on the Mercy Seat and before the Law",
      jesus: "Pleads His blood; second death removed & God's people sealed; blots out sins from \"the book\"",
      aaronRef: "Leviticus 16:14-15 - Le:16:14: And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times. 15: Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock, and sprinkle it upon the mercy seat, and before the mercy seat:",
      jesusRef: "Hebrews 10:17 - Heb:10:17: And their sins and iniquities will I remember no more.; Revelation 3:5 - Re:3:5: He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life, but I will confess his name before my Father, and before his angels.; Acts 3:19 - Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;",
      description: "Atonement finalized for the faithful; sins removed from the record (interpretive).",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron sprinkling blood before the law in the ark",
      jesusGifAlt: "Christ's blood pleading for the faithful - sins blotted out"
    },
    // Step 17
    {
      step: 17,
      aaron: "Stops at altar of incense; cleans Holy Place by blood",
      jesus: "Throws down censer; cleans Holy Place; Close of Probation",
      aaronRef: "Leviticus 16:16-19 - Le:16:16: And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins: and so shall he do for the tabernacle of the congregation, that remaineth among them in the midst of their uncleanness. 17: And there shall be no man in the tabernacle of the congregation when he goeth in to make an atonement in the holy place, until he come out, and have made an atonement for himself, and for his household, and for all the congregation of Israel. 18: And he shall go out unto the altar that is before the LORD, and make an atonement for it; and shall take of the blood of the bullock, and of the blood of the goat, and put it upon the horns of the altar round about. 19: And he shall sprinkle of the blood upon it with his finger seven times, and cleanse it, and hallow it from the uncleanness of the children of Israel.",
      jesusRef: "Revelation 8:5 -: And the angel took the censer, and filled it with fire of the altar, and cast it into the earth: and there were voices, and thunderings, and lightnings, and an earthquake.; Revelation 22:11 - : He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still.",
      description: "Cleansing completed; intercession concludes.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron cleansing the Holy Place with blood",
      jesusGifAlt: "Christ throwing down the censer - end of intercession"
    },
    // Step 18
    {
      step: 18,
      aaron: "Puts sins on scapegoat",
      jesus: "Puts sins on Satan",
      aaronRef: "Leviticus 16:20-22 - Le:16:20: And when he hath made an end of reconciling the holy place, and the tabernacle of the congregation, and the altar, he shall bring the live goat: 21: And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness: 22: And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.",
      jesusRef: "Revelation 20:1-3 - Re:20:1: And I saw an angel come down from heaven, having the key of the bottomless pit and a great chain in his hand. 2: And he laid hold on the dragon, that old serpent, which is the Devil, and Satan, and bound him a thousand years, 3: And cast him into the bottomless pit, and shut him up, and set a seal upon him, that he should deceive the nations no more, till the thousand years should be fulfilled: and after that he must be loosed a little season.",
      description: "Transfer of sin responsibility to the ultimate originator.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron laying hands on the scapegoat to transfer sins",
      jesusGifAlt: "Satan bound and confined - ultimate responsibility for sin"
    },
    // Step 19
    {
      step: 19,
      aaron: "Removes High Priest robes",
      jesus: "Removes High Priest robe",
      aaronRef: "Leviticus 16:23-24 - Le:16:23: And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: 24: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "",
      description: "Transition from intercessory attire signifying phase change.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron removing the high priestly garments",
      jesusGifAlt: "Christ removing His high priestly robe"
    },
    // Step 20
    {
      step: 20,
      aaron: "Leaves Sanctuary; comes out in white (linen)",
      jesus: "Leaves Sanctuary; Plagues fall; comes out in white",
      aaronRef: "Leviticus 16:23-24 - And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there: 24: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Revelation 15–16",
      description: "Emergence signals completed mediation; judgments proceed.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron emerging from the sanctuary in white linen",
      jesusGifAlt: "Christ leaving the sanctuary as the seven last plagues begin"
    },
    // Step 21
    {
      step: 21,
      aaron: "Washes body – \"baptism\"",
      jesus: "Jacob's Time of Trouble; Plagues; the cup of baptism",
      aaronRef: "Leviticus 16:24, 26, 28 - Le:16:24: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people. 25: And the fat of the sin offering shall he burn upon the altar. 26: And he that let go the goat for the scapegoat shall wash his clothes, and bathe his flesh in water, and afterward come into the camp. 27: And the bullock for the sin offering, and the goat for the sin offering, whose blood was brought in to make atonement in the holy place, shall one carry forth without the camp; and they shall burn in the fire their skins, and their flesh, and their dung. 28: And he that burneth them shall wash his clothes, and bathe his flesh in water, and afterward he shall come into the camp.",
      jesusRef: "Jeremiah 30:7 - Jer:30:7: Alas!  for that day is great, so that none is like it: it is even the time of Jacob's trouble; but he shall be saved out of it.; Daniel 12:1 - Da:12:1: And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book.",
      description: "Final purification motif; God's people endure final crisis.",
      aaronGif: "https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron washing his entire body - final purification",
      jesusGifAlt: "God's people enduring the time of trouble"
    },
    // Step 22
    {
      step: 22,
      aaron: "Puts two rams on the fire",
      jesus: "Second coming of Christ",
      aaronRef: "Leviticus 16:24 - Le:16:24: And he shall wash his flesh with water in the holy place, and put on his garments, and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.",
      jesusRef: "Matthew 24:30-31 - M't:24:30: And then shall appear the sign of the Son of man in heaven: and then shall all the tribes of the earth mourn, and they shall see the Son of man coming in the clouds of heaven with power and great glory. 31: And he shall send his angels with a great sound of a trumpet, and they shall gather together his elect from the four winds, from one end of heaven to the other.; 1 Thessalonians 4:16-17 - 1Th:4:16: For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first: 17: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
      description: "Culminating offering in type; visible return in antitype.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron placing the two rams on the altar fire",
      jesusGifAlt: "Christ's glorious Second Coming in the clouds"
    },
    // Step 23
    {
      step: 23,
      aaron: "Puts fat on the fire",
      jesus: "End of sinners in fire (lake of fire)",
      aaronRef: "Leviticus 16:25 -Le:16:25: And the fat of the sin offering shall he burn upon the altar.",
      jesusRef: "Revelation 20:14-15 Re:20:14: And death and hell were cast into the lake of fire. This is the second death. 15: And whosoever was not found written in the book of life was cast into the lake of fire.",
      description: "Final judgment on sin.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Aaron placing fat portions on the altar fire",
      jesusGifAlt: "Final judgment - lake of fire consuming sin"
    },
    // Step 24
    {
      step: 24,
      aaron: "Bodies of bull and goat burned outside of the camp",
      jesus: "Second fire; New Earth; All traces of sin gone!",
      aaronRef: "Leviticus 16:27 - Le:16:27: And the bullock for the sin offering, and the goat for the sin offering, whose blood was brought in to make atonement in the holy place, shall one carry forth without the camp; and they shall burn in the fire their skins, and their flesh, and their dung.",
      jesusRef: "Revelation 21–22 (the whole chapter); Nahum 1:9",
      description: "Total removal of sin; restoration of all things.",
      aaronGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      jesusGif: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      aaronGifAlt: "Burning the sacrificial remains outside the camp",
      jesusGifAlt: "New Earth - all traces of sin completely removed"
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
    }, 4000); // Increased to 4 seconds to allow time to view GIFs
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
                  onClick={() => setShowGifs(!showGifs)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showGifs ? 'bg-sanctuary-gold text-sanctuary-purple' : 'bg-sanctuary-silver text-sanctuary-purple'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>{showGifs ? 'Hide' : 'Show'} Animations</span>
                </button>
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
              {/* Animated GIF Display */}
              {showGifs && currentStepData?.aaronGif ? (
                <div className="h-64 mb-4 rounded-lg overflow-hidden border-2 border-sanctuary-brass/30">
                  <img 
                    src={currentStepData.aaronGif}
                    alt={currentStepData.aaronGifAlt}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'sepia(20%) saturate(120%) hue-rotate(15deg) brightness(110%)'
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {currentStepData.aaronGifAlt}
                  </div>
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-brass/30">
                  <div className="text-center text-sanctuary-brass">
                    <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-brass/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-10 h-10 text-sanctuary-brass" />
                    </div>
                    <p className="text-lg font-medium">Step {currentStepData?.step} Animation</p>
                    <p className="text-sm">Aaron's Ministry Visualization</p>
                  </div>
                </div>
              )}

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
                  <p className="text-sanctuary-blue font-medium text-sm leading-relaxed">
                    {currentStepData?.aaronRef || '—'}
                  </p>
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
              {/* Animated GIF Display */}
              {showGifs && currentStepData?.jesusGif ? (
                <div className="h-64 mb-4 rounded-lg overflow-hidden border-2 border-sanctuary-gold/30 relative">
                  <img 
                    src={currentStepData.jesusGif}
                    alt={currentStepData.jesusGifAlt}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'sepia(10%) saturate(130%) hue-rotate(25deg) brightness(115%)'
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {currentStepData.jesusGifAlt}
                  </div>
                  {/* Heavenly glow effect for Jesus' ministry */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-sanctuary-gold/10 pointer-events-none"></div>
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg mb-4 flex items-center justify-center border-2 border-sanctuary-gold/30">
                  <div className="text-center text-sanctuary-gold-dark">
                    <div className="w-20 h-20 mx-auto mb-3 bg-sanctuary-gold/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-10 h-10 text-sanctuary-gold-dark" />
                    </div>
                    <p className="text-lg font-medium">Step {currentStepData?.step} Animation</p>
                    <p className="text-sm">Jesus' Ministry Visualization</p>
                  </div>
                </div>
              )}

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
                  <p className="text-sanctuary-blue font-medium text-sm leading-relaxed">
                    {currentStepData?.jesusRef || '—'}
                  </p>
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

        {/* Biblical Context Panel */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-6">Biblical Context & Symbolism</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border border-sanctuary-brass/30">
              <h4 className="font-semibold text-sanctuary-brass mb-3 flex items-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Levitical Service (Type)</span>
              </h4>
              <p className="text-sanctuary-purple text-sm leading-relaxed mb-3">
                The earthly sanctuary service established by God through Moses provided a visual 
                representation of the plan of salvation. Each action Aaron performed pointed 
                forward to Christ's ministry.
              </p>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-sanctuary-brass">
                  <strong>Key Books:</strong> Exodus 25-40, Leviticus 1-16, Numbers 3-4
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border border-sanctuary-gold/30">
              <h4 className="font-semibold text-sanctuary-gold-dark mb-3 flex items-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Christ's Ministry (Antitype)</span>
              </h4>
              <p className="text-sanctuary-purple text-sm leading-relaxed mb-3">
                Jesus fulfills every aspect of the sanctuary service in His earthly life, 
                death, resurrection, and heavenly ministry. The book of Hebrews extensively 
                explains these connections.
              </p>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-sanctuary-brass">
                  <strong>Key Books:</strong> Hebrews 7-10, Revelation 4-5, 8, 11, 14-22
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Legend */}
        {showGifs && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
            <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Animation Guide</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-semibold text-sanctuary-brass mb-3">Aaron's Service Animations</h4>
                <ul className="space-y-2 text-sm text-sanctuary-purple">
                  <li>• Visual representations of Levitical rituals</li>
                  <li>• Based on Exodus and Leviticus descriptions</li>
                  <li>• Shows the earthly sanctuary service</li>
                  <li>• Emphasizes the typological significance</li>
                </ul>
              </div>
              <div className="bg-sanctuary-linen rounded-lg p-4">
                <h4 className="font-semibold text-sanctuary-gold-dark mb-3">Jesus' Ministry Animations</h4>
                <ul className="space-y-2 text-sm text-sanctuary-purple">
                  <li>• Depicts the antitypical fulfillment</li>
                  <li>• Based on Hebrews and Revelation</li>
                  <li>• Shows the heavenly reality</li>
                  <li>• Emphasizes the eternal significance</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-sanctuary-blue/10 to-sanctuary-purple/10 rounded-lg border border-sanctuary-blue/20">
              <p className="text-sanctuary-purple text-sm">
                <strong>Note:</strong> These animations are artistic representations based on biblical descriptions. 
                They are designed to help visualize the sanctuary service and its prophetic fulfillment in Christ's ministry.
              </p>
            </div>
          </div>
        )}

        {/* Complete Timeline Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-6">Complete 25-Step Timeline (including Step 0)</h3>
          <div className="text-center text-sanctuary-brass mb-4">
            <p>This timeline presents steps 0–24, aligning Aaron's typical services with Jesus' antitypical ministry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelineSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`p-4 rounded-lg text-left transition-colors relative overflow-hidden ${
                  currentStep === index
                    ? 'bg-sanctuary-purple text-white'
                    : 'bg-sanctuary-linen hover:bg-sanctuary-purple/10 text-sanctuary-purple'
                }`}
              >
                {/* Mini preview of GIF when available */}
                {showGifs && step.aaronGif && currentStep === index && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded overflow-hidden border border-white/30">
                    <img 
                      src={step.aaronGif} 
                      alt="Preview"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                )}
                
                <div className="font-semibold mb-1">Step {step.step}</div>
                <div className="text-sm opacity-90 line-clamp-2">{step.aaron}</div>
                <div className="text-xs mt-1 opacity-75">↓</div>
                <div className="text-sm opacity-90 line-clamp-2">{step.jesus}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Educational Notes */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
          <h3 className="text-xl font-bold text-sanctuary-purple mb-4">Educational Notes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-sanctuary-linen rounded-lg p-4">
              <h4 className="font-semibold text-sanctuary-purple mb-3">Daily Service (Steps 0-10)</h4>
              <p className="text-sanctuary-brass text-sm leading-relaxed">
                Represents Christ's earthly ministry, death, resurrection, and ongoing intercession 
                in the Holy Place of the heavenly sanctuary from 31 AD to 1844 AD.
              </p>
            </div>
            <div className="bg-sanctuary-linen rounded-lg p-4">
              <h4 className="font-semibold text-sanctuary-purple mb-3">Yearly Service (Steps 11-18)</h4>
              <p className="text-sanctuary-brass text-sm leading-relaxed">
                Represents the Day of Atonement service and its fulfillment in the investigative 
                judgment beginning in 1844, culminating in the close of probation.
              </p>
            </div>
            <div className="bg-sanctuary-linen rounded-lg p-4">
              <h4 className="font-semibold text-sanctuary-purple mb-3">Final Events (Steps 19-24)</h4>
              <p className="text-sanctuary-brass text-sm leading-relaxed">
                Represents the final phase including the Second Coming, millennium, 
                executive judgment, and the creation of the New Earth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;