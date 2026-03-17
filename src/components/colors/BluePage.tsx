import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import DonationBanner from '../DonationBanner';
import ColorNavigation from './ColorNavigation';
import SymbolicMeaningAccordion from './SymbolicMeaningAccordion';
import ScriptureViewer from './ScriptureViewer';
import { useColorEnhancements } from '../../hooks/useColorEnhancements';
import { supabase } from '../../lib/supabase';

const BluePage = () => {
  const [colorId, setColorId] = useState<string | undefined>();
  const { meanings, scriptures, loading } = useColorEnhancements(colorId);
  const [selectedScripture, setSelectedScripture] = useState<any>(null);

  useEffect(() => {
    async function fetchColorId() {
      const { data } = await supabase
        .from('sacred_colors')
        .select('id')
        .eq('slug', 'blue')
        .maybeSingle();
      if (data) setColorId(data.id);
    }
    fetchColorId();
  }, []);
  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Blue - God's Law</h1>
              <p className="text-blue-100 text-lg">The Foundation of Divine Government</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden">
          <div className="p-8">
            {/* Scripture References */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-sanctuary-purple mb-6">Biblical References</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Exodus 24:9-10 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Then went up Moses, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel:
                    And they saw the God of Israel: and there was under his feet as it were a paved work
                    of a sapphire stone, and as it were the body of heaven in his clearness."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Revelation 4:6 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And before the throne there was a sea of glass like unto crystal: and in the midst
                    of the throne, and round about the throne, were four beasts full of eyes before and behind."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Revelation 15:2 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And I saw as it were a sea of glass mingled with fire: and them that had gotten
                    the victory over the beast, and over his image, and over his mark, and over the
                    number of his name, stand on the sea of glass, having the harps of God."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Numbers 15:38-41 (KJV)</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Speak unto the children of Israel, and bid them that they make them fringes in the
                    borders of their garments throughout their generations, and that they put upon the
                    fringe of the borders a ribband of blue..."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Ezekiel 1:26 (KJV)</h3>
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
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Spiritual Significance of Blue</h2>

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
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Blue = God's Law</h3>
                  <p className="text-blue-700 font-medium text-lg">
                    The color blue throughout the sanctuary represents the eternal, unchanging law of God
                    that serves as the foundation of His government and the standard of righteousness.
                  </p>
                </div>
              </div>
            </div>

            {/* NEW: Symbolic Meanings - Expandable Accordions */}
            {meanings.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Symbolic Representations</h2>
                <p className="text-gray-700 mb-4">
                  Click on each meaning below to explore detailed SDA theological perspectives, Ellen G. White insights, and practical applications.
                </p>
                <SymbolicMeaningAccordion
                  meanings={meanings}
                  colorName="Blue"
                  accentColor="#2563EB"
                />
              </div>
            )}

            {/* NEW: Interactive Scripture References */}
            {scriptures.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Interactive Scripture References</h2>
                <p className="text-gray-700 mb-4">
                  Click any scripture reference to view the full text with multiple translations, context, and theological notes.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {scriptures.map(scripture => (
                    <button
                      key={scripture.id}
                      onClick={() => setSelectedScripture(scripture)}
                      className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-left"
                    >
                      <h3 className="font-bold text-blue-800 mb-2">
                        {scripture.book} {scripture.chapter}:{scripture.verse_start}
                        {scripture.verse_end && `-${scripture.verse_end}`}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {scripture.text_content}
                      </p>
                      <span className="text-xs text-blue-600 font-medium mt-2 inline-block">
                        Click to read more →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* The Divine Commands to Remember */}
            <div className="mt-8 bg-blue-50 rounded-lg p-8 border-2 border-blue-300">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">The Divine Commands to Remember</h2>
              <div className="space-y-4 text-blue-700 leading-relaxed">
                <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                  <p className="text-lg font-semibold mb-2">1. Remember the Sabbath day</p>
                  <p className="text-lg font-semibold">2. That ye may remember to keep My Commandments</p>
                </div>
                <p className="text-lg mt-4">
                  <strong>Note:</strong> Men had to "make" the blue that God was referring to in the Bible. As far as the Heavenly,
                  Divine version of this same color, we look at the stone that God wrote the Commandments on.
                </p>
              </div>
            </div>

            {/* The Sapphire Stone: Heaven's Blueprint */}
            <div className="mt-8 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 border-2 border-blue-400">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">The Sapphire Stone: Heaven's Blueprint</h2>
              <div className="space-y-4 text-blue-700 leading-relaxed">
                <p className="text-lg">
                  Sapphire has the color of blue. The sapphire stone has the color of the "body of heaven in his clearness"
                  (Exodus 24:10). In other words, the clear blue sky is the color of sapphire.
                </p>
              </div>
            </div>

            {/* The Foundation of God's Throne */}
            <div className="mt-8 bg-white rounded-lg p-8 border-2 border-blue-500">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">The Foundation of God's Throne</h2>
              <p className="text-lg text-blue-700 mb-6">
                In describing the foundation of God's throne, Scripture consistently reveals the sapphire stone (blue color):
              </p>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-800 mb-3">Exodus 24:10</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone,
                    and as it were the body of heaven in his clearness."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-800 mb-3">Isaiah 54:11</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "O thou afflicted, tossed with tempest, and not comforted, behold, I will lay thy stones with fair colours,
                    and lay thy foundations with sapphires."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-800 mb-3">Ezekiel 1:26</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "And above the firmament that was over their heads was the likeness of a throne, as the appearance of a
                    sapphire stone: and upon the likeness of the throne was the likeness as the appearance of a man above upon it."
                  </blockquote>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-800 mb-3">Ezekiel 10:1</h3>
                  <blockquote className="text-blue-700 italic leading-relaxed">
                    "Then I looked, and, behold, in the firmament that was above the head of the cherubims there appeared over
                    them as it were a sapphire stone, as the appearance of the likeness of a throne."
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Satan's War Against God's Law */}
            <div className="mt-8 bg-gradient-to-r from-red-50 via-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-500">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Satan's War Against God's Law</h2>
              <p className="text-lg text-blue-700 mb-6">
                This is why the Law has been Satan's special point of hatred and contention: he was once a covering Cherub,
                one who covered (protected) the Law of God (God's Character):
              </p>
              <div className="bg-white rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-blue-800 mb-4">Ezekiel 28:13-15</h3>
                <blockquote className="text-blue-700 italic leading-relaxed space-y-3">
                  <p>
                    "Thou hast been in Eden the garden of God; every precious stone was thy covering, the sardius, topaz,
                    and the diamond, the beryl, the onyx, and the jasper, the sapphire, the emerald, and the carbuncle,
                    and gold: the workmanship of thy tabrets and of thy pipes was prepared in thee in the day that thou wast created."
                  </p>
                  <p>
                    "Thou art the anointed cherub that covereth; and I have set thee so: thou wast upon the holy mountain of God;
                    thou hast walked up and down in the midst of the stones of fire."
                  </p>
                  <p>
                    "Thou wast perfect in thy ways from the day that thou wast created, till iniquity was found in thee."
                  </p>
                </blockquote>
                <div className="mt-4 bg-blue-50 rounded p-4">
                  <p className="text-blue-700">
                    <strong>Note:</strong> We can see what Satan (then Lucifer) was covering by the cherubs that Moses was told
                    to make to go above the Ark (the 10 Commandments written with the finger of God).
                  </p>
                </div>
              </div>
            </div>

            {/* Blue Throughout the Tabernacle */}
            <div className="mt-8 bg-blue-50 rounded-lg p-8 border-2 border-blue-400">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Blue Throughout the Tabernacle</h2>
              <p className="text-lg text-blue-700 mb-6 font-semibold">Exodus contains 34 references to blue:</p>

              <div className="space-y-3">
                {[
                  { ref: "Ex 25:4", text: "And blue, and purple, and scarlet, and fine linen, and goats' hair," },
                  { ref: "Ex 26:1", text: "Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them." },
                  { ref: "Ex 26:4", text: "And thou shalt make loops of blue upon the edge of the one curtain from the selvedge in the coupling; and likewise shalt thou make in the uttermost edge of another curtain, in the coupling of the second." },
                  { ref: "Ex 26:31", text: "And thou shalt make a vail of blue, and purple, and scarlet, and fine twined linen of cunning work: with cherubims shall it be made:" },
                  { ref: "Ex 26:36", text: "And thou shalt make an hanging for the door of the tent, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework." },
                  { ref: "Ex 27:16", text: "And for the gate of the court shall be an hanging of twenty cubits, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework: and their pillars shall be four, and their sockets four." },
                  { ref: "Ex 28:5", text: "And they shall take gold, and blue, and purple, and scarlet, and fine linen." },
                  { ref: "Ex 28:6", text: "And they shall make the ephod of gold, of blue, and of purple, of scarlet, and fine twined linen, with cunning work." },
                  { ref: "Ex 28:8", text: "And the curious girdle of the ephod, which is upon it, shall be of the same, according to the work thereof; even of gold, of blue, and purple, and scarlet, and fine twined linen." },
                  { ref: "Ex 28:15", text: "And thou shalt make the breastplate of judgment with cunning work; after the work of the ephod thou shalt make it; of gold, of blue, and of purple, and of scarlet, and of fine twined linen, shalt thou make it." },
                  { ref: "Ex 28:28", text: "And they shall bind the breastplate by the rings thereof unto the rings of the ephod with a lace of blue, that it may be above the curious girdle of the ephod, and that the breastplate be not loosed from the ephod." },
                  { ref: "Ex 28:31", text: "And thou shalt make the robe of the ephod all of blue." },
                  { ref: "Ex 28:33", text: "And beneath upon the hem of it thou shalt make pomegranates of blue, and of purple, and of scarlet, round about the hem thereof; and bells of gold between them round about:" },
                  { ref: "Ex 28:37", text: "And thou shalt put it on a blue lace, that it may be upon the mitre; upon the forefront of the mitre it shall be." },
                  { ref: "Ex 35:6", text: "And blue, and purple, and scarlet, and fine linen, and goats' hair," },
                  { ref: "Ex 35:23", text: "And every man, with whom was found blue, and purple, and scarlet, and fine linen, and goats' hair, and red skins of rams, and badgers' skins, brought them." },
                  { ref: "Ex 35:25", text: "And all the women that were wise hearted did spin with their hands, and brought that which they had spun, both of blue, and of purple, and of scarlet, and of fine linen." },
                  { ref: "Ex 35:35", text: "Them hath he filled with wisdom of heart, to work all manner of work, of the engraver, and of the cunning workman, and of the embroiderer, in blue, and in purple, in scarlet, and in fine linen, and of the weaver, even of them that do any work, and of those that devise cunning work." },
                  { ref: "Ex 36:8", text: "And every wise hearted man among them that wrought the work of the tabernacle made ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work made he them." },
                  { ref: "Ex 36:11", text: "And he made loops of blue on the edge of one curtain from the selvedge in the coupling: likewise he made in the uttermost side of another curtain, in the coupling of the second." },
                  { ref: "Ex 36:35", text: "And he made a vail of blue, and purple, and scarlet, and fine twined linen: with cherubims made he it of cunning work." },
                  { ref: "Ex 36:37", text: "And he made an hanging for the tabernacle door of blue, and purple, and scarlet, and fine twined linen, of needlework;" },
                  { ref: "Ex 38:18", text: "And the hanging for the gate of the court was needlework, of blue, and purple, and scarlet, and fine twined linen: and twenty cubits was the length, and the height in the breadth was five cubits, answerable to the hangings of the court." },
                  { ref: "Ex 38:23", text: "And with him was Aholiab, son of Ahisamach, of the tribe of Dan, an engraver, and a cunning workman, and an embroiderer in blue, and in purple, and in scarlet, and fine linen." },
                  { ref: "Ex 39:1", text: "And of the blue, and purple, and scarlet, they made cloths of service, to do service in the holy place, and made the holy garments for Aaron; as the LORD commanded Moses." },
                  { ref: "Ex 39:2", text: "And he made the ephod of gold, blue, and purple, and scarlet, and fine twined linen." },
                  { ref: "Ex 39:3", text: "And they did beat the gold into thin plates, and cut it into wires, to work it in the blue, and in the purple, and in the scarlet, and in the fine linen, with cunning work." },
                  { ref: "Ex 39:5", text: "And the curious girdle of his ephod, that was upon it, was of the same, according to the work thereof; of gold, blue, and purple, and scarlet, and fine twined linen; as the LORD commanded Moses." },
                  { ref: "Ex 39:8", text: "And he made the breastplate of cunning work, like the work of the ephod; of gold, blue, and purple, and scarlet, and fine twined linen." },
                  { ref: "Ex 39:21", text: "And they did bind the breastplate by his rings unto the rings of the ephod with a lace of blue, that it might be above the curious girdle of the ephod, and that the breastplate might not be loosed from the ephod; as the LORD commanded Moses." },
                  { ref: "Ex 39:22", text: "And he made the robe of the ephod of woven work, all of blue." },
                  { ref: "Ex 39:24", text: "And they made upon the hems of the robe pomegranates of blue, and purple, and scarlet, and twined linen." },
                  { ref: "Ex 39:29", text: "And a girdle of fine twined linen, and blue, and purple, and scarlet, of needlework; as the LORD commanded Moses." },
                  { ref: "Ex 39:31", text: "And they tied unto it a lace of blue, to fasten it on high upon the mitre; as the LORD commanded Moses." }
                ].map((verse, idx) => (
                  <div key={idx} className="bg-white rounded p-4 border-l-2 border-blue-400 hover:bg-blue-50 transition-colors">
                    <p className="text-sm">
                      <span className="font-bold text-blue-800">{verse.ref}:</span>{' '}
                      <span className="text-blue-700">{verse.text}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blue in Transportation and Service */}
            <div className="mt-8 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-lg p-8 border-2 border-blue-400">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Blue in Transportation and Service</h2>
              <p className="text-lg text-blue-700 mb-6 font-semibold">Numbers contains 6 references to blue:</p>

              <div className="space-y-4">
                {[
                  { ref: "Nu 4:6", text: "And shall put thereon the covering of badgers' skins, and shall spread over it a cloth wholly of blue, and shall put in the staves thereof." },
                  { ref: "Nu 4:7", text: "And upon the table of shewbread they shall spread a cloth of blue, and put thereon the dishes, and the spoons, and the bowls, and covers to cover withal: and the continual bread shall be thereon:" },
                  { ref: "Nu 4:9", text: "And they shall take a cloth of blue, and cover the candlestick of the light, and his lamps, and his tongs, and his snuffdishes, and all the oil vessels thereof, wherewith they minister unto it:" },
                  { ref: "Nu 4:11", text: "And upon the golden altar they shall spread a cloth of blue, and cover it with a covering of badgers' skins, and shall put to the staves thereof:" },
                  { ref: "Nu 4:12", text: "And they shall take all the instruments of ministry, wherewith they minister in the sanctuary, and put them in a cloth of blue, and cover them with a covering of badgers' skins, and shall put them on a bar:" }
                ].map((verse, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                    <p className="text-sm">
                      <span className="font-bold text-blue-800">{verse.ref}:</span>{' '}
                      <span className="text-blue-700">{verse.text}</span>
                    </p>
                  </div>
                ))}

                <div className="bg-blue-600 text-white rounded-lg p-6 border-2 border-blue-700">
                  <h3 className="font-bold text-xl mb-3">Numbers 15:38 - The Blue Ribband</h3>
                  <blockquote className="italic leading-relaxed">
                    "Speak unto the children of Israel, and bid them that they make them fringes in the borders of their
                    garments throughout their generations, and that they put upon the fringe of the borders a ribband of blue:"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Blue in Solomon's Temple */}
            <div className="mt-8 bg-white rounded-lg p-8 border-2 border-blue-500">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Blue in Solomon's Temple</h2>
              <p className="text-lg text-blue-700 mb-6 font-semibold">2 Chronicles contains 3 references to blue:</p>

              <div className="space-y-4">
                {[
                  { ref: "2 Chr 2:7", text: "Send me now therefore a man cunning to work in gold, and in silver, and in brass, and in iron, and in purple, and crimson, and blue, and that can skill to grave with the cunning men that are with me in Judah and in Jerusalem, whom David my father did provide." },
                  { ref: "2 Chr 2:14", text: "The son of a woman of the daughters of Dan, and his father was a man of Tyre, skilful to work in gold, and in silver, in brass, in iron, in stone, and in timber, in purple, in blue, and in fine linen, and in crimson; also to grave any manner of graving, and to find out every device which shall be put to him, with thy cunning men, and with the cunning men of my lord David thy father." },
                  { ref: "2 Chr 3:14", text: "And he made the vail of blue, and purple, and crimson, and fine linen, and wrought cherubims thereon." }
                ].map((verse, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                    <p className="text-sm">
                      <span className="font-bold text-blue-800">{verse.ref}:</span>{' '}
                      <span className="text-blue-700">{verse.text}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blue in Royal Settings */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border-2 border-blue-400">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Blue in Royal Settings</h2>
              <p className="text-lg text-blue-700 mb-6 font-semibold">Esther contains 2 references to blue:</p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-800 mb-3">Esther 1:6</h3>
                  <blockquote className="text-blue-700 leading-relaxed">
                    "Where were white, green, and blue, hangings, fastened with cords of fine linen and purple to silver
                    rings and pillars of marble: the beds were of gold and silver, upon a pavement of red, and blue, and
                    white, and black, marble."
                  </blockquote>
                </div>

                <div className="bg-blue-100 rounded-lg p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-800 mb-3">Esther 8:15</h3>
                  <blockquote className="text-blue-700 leading-relaxed mb-4">
                    "And Mordecai went out from the presence of the king in royal apparel of blue and white, and with a
                    great crown of gold, and with a garment of fine linen and purple: and the city of Shushan rejoiced and was glad."
                  </blockquote>
                  <div className="bg-blue-200 rounded p-4 mt-4">
                    <p className="text-blue-800">
                      <strong>Note:</strong> He had on the colours of the sanctuary and its services. Hopefully, the people
                      knew the significance of the colours he was wearing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Cleansing Power of Remembering God's Law */}
            <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-8 border-2 border-blue-800">
              <h2 className="text-3xl font-bold mb-6">The Cleansing Power of Remembering God's Law</h2>
              <p className="text-lg mb-6 font-semibold">Proverbs contains 1 reference to blue:</p>

              <div className="bg-blue-800 rounded-lg p-6 border-2 border-blue-900">
                <h3 className="font-bold text-xl mb-3">Proverbs 20:30</h3>
                <blockquote className="italic leading-relaxed text-blue-100 mb-4">
                  "The blueness of a wound cleanseth away evil: so do stripes the inward parts of the belly."
                </blockquote>
                <div className="bg-blue-900 rounded p-5 mt-4">
                  <p className="text-blue-100 leading-relaxed">
                    <strong>Note:</strong> There is a connection between a wound's cleansing and its color (blueish tint) and
                    when a person is being cleansed from sin by remembering God's Holy Law. The more of God\'s Law is remembered,
                    the more the person is cleansed from sin. The more that sin is removed out of the person's life (cleansed).
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 rounded-lg p-8 border-4 border-blue-600">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Summary: The Pervasive Presence of Blue</h2>
              <div className="space-y-4 text-blue-700 leading-relaxed">
                <p className="text-lg">
                  Throughout Scripture, the color blue represents God's eternal, unchanging Law - the foundation of His throne
                  and government. From the sapphire stone beneath God's feet to the blue ribbands on Israelite garments, blue
                  serves as a constant reminder to remember and obey God's commandments.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-400 text-center">
                    <p className="font-bold text-2xl text-blue-800">34</p>
                    <p className="text-blue-600">References in Exodus</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-400 text-center">
                    <p className="font-bold text-2xl text-blue-800">6</p>
                    <p className="text-blue-600">References in Numbers</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-400 text-center">
                    <p className="font-bold text-2xl text-blue-800">46</p>
                    <p className="text-blue-600">Total Biblical References</p>
                  </div>
                </div>
                <p className="text-lg mt-6 font-semibold text-blue-800 text-center bg-white rounded-lg p-4 border-2 border-blue-500">
                  Blue permeates the sanctuary, the priestly garments, and the worship of Israel - a divine thread weaving
                  through all of Scripture, calling God's people to remember His Law and walk in obedience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ColorNavigation
        currentColor="Blue"
        nextColor={{ name: "Dark", path: "/colors/dark" }}
      />

      {/* Scripture Viewer Modal */}
      {selectedScripture && (
        <ScriptureViewer
          scripture={selectedScripture}
          onClose={() => setSelectedScripture(null)}
          accentColor="#2563EB"
        />
      )}
    </div>
  );
};

export default BluePage;
