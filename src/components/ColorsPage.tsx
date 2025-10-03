import React from 'react';
import { Palette, Book, ArrowLeft } from 'lucide-react';
import DonationBanner from './DonationBanner';

const ColorsPage = () => {
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-sanctuary-purple-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Sanctuary Explorer</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Palette className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Colors of the Wilderness Sanctuary</h1>
              <p className="text-sanctuary-linen text-lg">Exploring the eight sacred colors and their spiritual significance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-12">
          <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">The Eight Sacred Colors</h2>
          <p className="text-lg text-sanctuary-brass leading-relaxed mb-6">
            In the book of Exodus, God revealed eight distinct colors for the wilderness sanctuary, 
            each carrying profound spiritual significance and pointing to heavenly realities. 
            These colors were not merely decorative but served as divine symbols teaching 
            eternal truths about God's character and His plan of salvation.
          </p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Blue</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-900 rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Dark</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Red</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">White</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Purple</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sanctuary-brass rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Brass</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sanctuary-gold rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Gold</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sanctuary-silver rounded-lg mx-auto mb-2 border-2 border-sanctuary-silver"></div>
              <span className="text-sm font-medium text-sanctuary-purple">Silver</span>
            </div>
          </div>
        </div>

        {/* Blue Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Blue - God's Law</h2>
                <p className="text-blue-100 text-lg">The Foundation of Divine Government</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Exodus 24:9-10 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Then went up Moses, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel: 
                    And they saw the God of Israel: and there was under his feet as it were a paved work 
                    of a sapphire stone, and as it were the body of heaven in his clearness."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Revelation 4:6 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And before the throne there was a sea of glass like unto crystal: and in the midst 
                    of the throne, and round about the throne, were four beasts full of eyes before and behind."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Revelation 15:2 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And I saw as it were a sea of glass mingled with fire: and them that had gotten 
                    the victory over the beast, and over his image, and over his mark, and over the 
                    number of his name, stand on the sea of glass, having the harps of God."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Revelation 21:9 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And there came unto me one of the seven angels which had the seven vials full of 
                    the seven last plagues, and talked with me, saying, Come hither, I will shew thee 
                    the bride, the Lamb's wife."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Numbers 15:38-41 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Speak unto the children of Israel, and bid them that they make them fringes in the 
                    borders of their garments throughout their generations, and that they put upon the 
                    fringe of the borders a ribband of blue: And it shall be unto you for a fringe, that 
                    ye may look upon it, and remember all the commandments of the LORD, and do them; and 
                    that ye seek not after your own heart and your own eyes, after which ye use to go a 
                    whoring: That ye may remember, and do all my commandments, and be holy unto your God. 
                    I am the LORD your God, which brought you out of the land of Egypt, to be your God: 
                    I am the LORD your God."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Ecclesiastes 9:8 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Let thy garments be always white; and let thy head lack no ointment."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">Ezekiel 1:26 (KJV)</h4>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And above the firmament that was over their heads was the likeness of a throne, 
                    as the appearance of a sapphire stone: and upon the likeness of the throne was 
                    the likeness as the appearance of a man above upon it."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Spiritual Significance of Blue</h3>
              
              <div className="space-y-6 text-blue-700 leading-relaxed">
                <p className="text-lg">
                  While in vision on the Isle of Patmos, John the Revelator saw the same smooth blue surface 
                  as did Moses, Aaron, Nadab, and Abihu. The Law is the foundation of God's government.
                </p>

                <p className="text-lg">
                  In the earthly sanctuary the tables of stone in the ark of the covenant were made of 
                  sapphire stone to represent God's Law in Heaven.
                </p>

                <p className="text-lg">
                  Children of Israel had white garments with blue borders. This shows that the garment 
                  of Christ's righteousness and the emblem of the law are bound together. One cannot be 
                  removed without losing the other.
                </p>

                <p className="text-lg">
                  From outer space, blue is the color of the earth. The oceans, lakes and rivers are 
                  blue when we look down. The sky and the heavens are blue on a clear day when we look up.
                </p>

                <p className="text-lg">
                  The representation of God's throne supported by the sapphire foundation shows that 
                  His throne is based upon His law.
                </p>

                <p className="text-lg">
                  They had blue cuffs around their wrists and blue hems around their feet showing that 
                  God's law should govern the works of their hands and keep them walking (living) in His law.
                </p>

                <div className="bg-blue-100 rounded-lg p-6 mt-8 border-l-4 border-blue-600">
                  <h4 className="text-xl font-bold text-blue-800 mb-3">Blue = God's Law</h4>
                  <p className="text-blue-700 font-medium">
                    The color blue throughout the sanctuary represents the eternal, unchanging law of God 
                    that serves as the foundation of His government and the standard of righteousness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-900 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Dark - Humanity</h2>
                <p className="text-gray-100 text-lg">The Veiling of Divine Glory</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Isaiah 53:2 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "For he shall grow up before him as a tender plant, and as a root out of a dry ground: 
                    he hath no form nor comeliness; and when we shall see him, there is no beauty that we should desire him."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Isaiah 60:2 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "For, behold, the darkness shall cover the earth, and gross darkness the people: 
                    but the LORD shall arise upon thee, and his glory shall be seen upon thee."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">1 John 1:5 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "This then is the message which we have heard of him, and declare unto you, 
                    that God is light, and in him is no darkness at all."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Exodus 25:8 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "And let them make me a sanctuary; that I may dwell among them."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Spiritual Significance of Dark</h3>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  There was no beauty in Christ's appearance. He wasn't given any appearance that drew men to Him. 
                  His outward form was that of a normal man.
                </p>

                <p className="text-lg">
                  A promise about Jesus is here given, Isaiah 60:2: "For, behold, the darkness shall cover the earth, 
                  and gross darkness the people: but the LORD shall arise upon thee, and his glory shall be seen upon thee."
                </p>

                <p className="text-lg">
                  His covering of humanity veiled the brightness of His Righteousness that we might endure the 
                  Presence of the Pure God among men.
                </p>

                <p className="text-lg">
                  In order for God's command to Israel to "make Me a Sanctuary that I may dwell among them (Exodus 25:8)", 
                  Jesus, our Sanctuary, had to have on humanity.
                </p>

                <p className="text-lg">
                  For him to be "one with us", that is, "Emmanuel", He had to take on the darkness of human flesh. 
                  Why? The Bible says in 1 John 1:5, "that God is light, and in him is no darkness at all."
                </p>

                <p className="text-lg">
                  In order for us (Humanity) to endure the Brightness of His Glory when He came earth, 
                  He had to be covered in Humanity (Dark).
                </p>

                <p className="text-lg">
                  This color was the color of badger's skin that covered the outside of the Tabernacle 
                  (the Holy Place and Most Holy Place Compartments). The Dark color is what the people saw 
                  when they would look at the Tabernacle itself.
                </p>

                <p className="text-lg">
                  Even the Glory of the Shekinah would have been destruction to them without the covering.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-800">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Dark = Humanity</h4>
                  <p className="text-gray-700 font-medium">
                    The color dark throughout the sanctuary represents humanity - the veiling of divine glory 
                    so that mortal beings could endure the presence of the pure God among them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Red (Scarlet) Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-600 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Red (Scarlet) - Messiah's Blood</h2>
                <p className="text-red-100 text-lg">The Sacrifice of the Innocent Victim</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <h4 className="font-bold text-red-800 mb-3">Isaiah 1:16-18 (KJV)</h4>
                  <blockquote className="text-red-700 italic leading-relaxed">
                    "Wash you, make you clean; put away the evil of your doings from before mine eyes; cease to do evil; 
                    Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow. 
                    Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; 
                    though they be red like crimson, they shall be as wool."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Spiritual Significance of Red (Scarlet)</h3>
              
              <div className="space-y-6 text-red-700 leading-relaxed">
                <p className="text-lg">
                  Red (scarlet) was always seen throughout the sanctuary, especially when the sacrifices were being conducted. 
                  The color scarlet represents the blood of the victim, shed for the sinner.
                </p>

                <p className="text-lg">
                  When the person sees red, it symbolized the fact that sin causes the death of an innocent victim who did no sin. 
                  The red symbolized the fact that Someone who did no sin, would have to die.
                </p>

                <p className="text-lg">
                  Real blood (the color is red) would have be shed by the Innocent Victim. Even though the blood was the color of scarlet, 
                  it would cleanse the sinner thoroughly from his sins.
                </p>

                <p className="text-lg">
                  The red blood would cleanse the sin so much they would be as white as snow. How can the color red become white? 
                  The Bible says, "Wash you make you clean; put away the evil of your doings... though your sins be as scarlet, 
                  they shall be as white as snow; though they be red like crimson, they shall be as wool" (Isaiah 1:16,17).
                </p>

                <p className="text-lg">
                  There is a worm called the "scarlet worm" and it is where we get the term "scarlet" from. 
                  The scarlet worm's eggs contain the red dye. This dye was leeched and used.
                </p>

                <div className="bg-red-100 rounded-lg p-6 mt-8 border-l-4 border-red-600">
                  <h4 className="text-xl font-bold text-red-800 mb-3">Red (Scarlet) = Messiah's Blood</h4>
                  <p className="text-red-700 font-medium">
                    The color red (scarlet) throughout the sanctuary represents the blood of the innocent victim - 
                    the Messiah's sacrifice that cleanses sin and transforms scarlet sins to be white as snow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* White Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-8 border-b border-gray-300">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-400 shadow-lg">
                <Book className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">White - Christ's Righteousness</h2>
                <p className="text-gray-600 text-lg">The Garment of Salvation</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Revelation 19:7-8 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come, 
                    and his wife hath made herself ready. And to her was granted that she should be arrayed in 
                    fine linen, clean and white: for the fine linen is the righteousness of saints."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Isaiah 64:6 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "But we are all as an unclean thing, and all our righteousnesses are as filthy rags; 
                    and we all do fade as a leaf; and our iniquities, like the wind, have taken us away."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Spiritual Significance of White</h3>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Our right doings (righteousnesses) are as "filthy rags" (Isaiah 64:6). The white in the sanctuary 
                  is implied when we see the word "linen" in the Bible, especially when it comes to the sanctuary and its services.
                </p>

                <p className="text-lg">
                  The fine linen represents the righteousness of saints - not their own righteousness, but Christ's 
                  righteousness imputed to them. This has significance for eternity as well.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-600">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">White = Christ's Righteousness</h4>
                  <p className="text-gray-700 font-medium">
                    The color white throughout the sanctuary represents Christ's righteousness - the pure, 
                    clean garment of salvation that covers the believer's filthy rags of self-righteousness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purple Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-purple-600 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Purple - Royalty</h2>
                <p className="text-purple-100 text-lg">The Royal Law of Liberty</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">Luke 16:19 (KJV)</h4>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "There was a certain rich man, which was clothed in purple and fine linen, 
                    and fared sumptuously every day:"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">John 19:2 (KJV)</h4>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "And the soldiers platted a crown of thorns, and put it on his head, 
                    and they put on him a purple robe;"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">James 2:8 (KJV)</h4>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "If ye fulfil the royal law according to the scripture, Thou shalt love thy neighbour as thyself, ye do well:"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">Romans 6:16 (KJV)</h4>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "Know ye not, that to whom ye yield yourselves servants to obey, his servants ye are to whom ye obey; 
                    whether of sin unto death, or of obedience unto righteousness?"
                  </blockquote>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">1 John 1:7 (KJV)</h4>
                  <blockquote className="text-purple-700 italic leading-relaxed">
                    "But if we walk in the light, as he is in the light, we have fellowship one with another, 
                    and the blood of Jesus Christ his Son cleanseth us from all sin."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">Spiritual Significance of Purple</h3>
              
              <div className="space-y-6 text-purple-700 leading-relaxed">
                <p className="text-lg">
                  The color "purple" is the combination of two colors already mentioned above - blue and red.
                </p>

                <p className="text-lg">
                  When the Bible mentions anything about the concept of "royalty", we can think of the color purple 
                  which is a combination of service ("to whom ye obey, ye serve" - Romans 6:16) and sacrifice 
                  ("the blood of Christ cleanseth us from all sin" - 1 John 1:7).
                </p>

                <p className="text-lg">
                  Therefore, when we see the text found in James 2:8, we understand that the "Royal Law of Liberty" 
                  is the Law that man broke in Eden, and this law was enunciated on Mt. Sinai.
                </p>

                <p className="text-lg">
                  This Law, broken by man, is esteemed by God as a law that is blue (His Character) and that is red (His Sacrifice).
                </p>

                <div className="bg-purple-100 rounded-lg p-6 mt-8 border-l-4 border-purple-600">
                  <h4 className="text-xl font-bold text-purple-800 mb-3">Purple = Royalty</h4>
                  <p className="text-purple-700 font-medium">
                    The color purple throughout the sanctuary represents royalty - the combination of God's law (blue) 
                    and Christ's sacrifice (red), forming the Royal Law of Liberty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brass Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-brass overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-sanctuary-brass to-amber-700 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-sanctuary-brass rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Brass - Earthly</h2>
                <p className="text-amber-100 text-lg">Things Done on Earth</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h4 className="font-bold text-amber-800 mb-3">Exodus 27:2 (KJV)</h4>
                  <blockquote className="text-amber-700 italic leading-relaxed">
                    "And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same: 
                    and thou shalt overlay it with brass."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-amber-800 mb-6">Spiritual Significance of Brass</h3>
              
              <div className="space-y-6 text-amber-700 leading-relaxed">
                <p className="text-lg">
                  The color (metallic color) represents things that are done on the earth. The sacrifice of Messiah 
                  was to take place on earth.
                </p>

                <p className="text-lg">
                  This is why only the outer court furniture (the altar of sacrifice, the laver and its foot, 
                  the utensils, etc) were all made or covered with brass.
                </p>

                <p className="text-lg">
                  Speaking of the altar of sacrifice: Exodus 27:2 says it was to be overlayed with brass.
                </p>

                <div className="bg-amber-100 rounded-lg p-6 mt-8 border-l-4 border-amber-600">
                  <h4 className="text-xl font-bold text-amber-800 mb-3">Brass = Earthly</h4>
                  <p className="text-amber-700 font-medium">
                    The color brass throughout the sanctuary represents earthly things - the work and sacrifice 
                    that must be accomplished on earth for humanity's salvation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-gold overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-sanctuary-gold to-yellow-600 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-sanctuary-gold rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Gold - Heavenly or Deity</h2>
                <p className="text-yellow-100 text-lg">The Divine Nature</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-3">Revelation 21:18 (KJV)</h4>
                  <blockquote className="text-yellow-700 italic leading-relaxed">
                    "And the building of the wall of it was of jasper: and the city was pure gold, like unto clear glass."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-8 border border-yellow-200">
              <h3 className="text-2xl font-bold text-yellow-800 mb-6">Spiritual Significance of Gold</h3>
              
              <div className="space-y-6 text-yellow-700 leading-relaxed">
                <p className="text-lg">
                  Everything described about heaven is made of pure gold. See Revelation 21:18.
                </p>

                <div className="bg-yellow-100 rounded-lg p-6 mt-8 border-l-4 border-yellow-600">
                  <h4 className="text-xl font-bold text-yellow-800 mb-3">Gold = Heavenly or Deity</h4>
                  <p className="text-yellow-700 font-medium">
                    The color gold throughout the sanctuary represents heavenly things and deity - 
                    the divine nature and celestial origin of God's dwelling place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Silver Color Study */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-sanctuary-silver overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-sanctuary-silver to-gray-500 text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-sanctuary-silver rounded-full flex items-center justify-center border-4 border-white">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Silver - The Holy Spirit's Work</h2>
                <p className="text-gray-100 text-lg">The Comforter's Ministry</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-sanctuary-purple mb-6">Biblical References</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Revelation 3:12 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out: 
                    and I will write upon him the name of my God, and the name of the city of my God, which is new Jerusalem, 
                    which cometh down out of heaven from my God: and I will write upon him my new name."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Exodus 27:9-11 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "And thou shalt make the court of the tabernacle: for the south side southward there shall be hangings 
                    for the court of fine twined linen of an hundred cubits long for one side: And the twenty pillars thereof 
                    and their twenty sockets shall be of brass; the hooks of the pillars and their fillets shall be of silver. 
                    And likewise for the north side in length there shall be hangings of an hundred cubits long, and his twenty 
                    pillars and their twenty sockets of brass; the hooks of the pillars and their fillets of silver."
                  </blockquote>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 md:col-span-2">
                  <h4 className="font-bold text-gray-800 mb-3">John 16:7-14 (KJV)</h4>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, 
                    the Comforter will not come unto you; but if I depart, I will send him unto you. And when he is come, 
                    he will reprove the world of sin, and of righteousness, and of judgment: Of sin, because they believe not on me; 
                    Of righteousness, because I go to my Father, and ye see me no more; Of judgment, because the prince of this world is judged. 
                    I have yet many things to say unto you, but ye cannot bear them now. Howbeit when he, the Spirit of truth, is come, 
                    he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: 
                    and he will shew you things to come. He shall glorify me: for he shall receive of mine, and shall shew it unto you."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Spiritual Significance of Silver</h3>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  The Holy Spirit's Work is seen where there is silver in the Tabernacle service. The work of the Holy Spirit 
                  is all throughout the Bible, but is clearly given by the words of Jesus found in John 16:7-14.
                </p>

                <p className="text-lg">
                  The Holy Spirit will reprove the world of sin, righteousness, and judgment. He will guide into all truth 
                  and show things to come, always glorifying Christ.
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-8 border-l-4 border-gray-600">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Silver = The Holy Spirit's Work</h4>
                  <p className="text-gray-700 font-medium">
                    The color silver throughout the sanctuary represents the Holy Spirit's work - 
                    the Comforter's ministry of conviction, guidance, and glorifying Christ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;