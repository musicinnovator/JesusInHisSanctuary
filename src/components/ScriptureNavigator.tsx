import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Search, Eye, Link2, Languages } from 'lucide-react';
import DonationBanner from './DonationBanner';

const ScriptureNavigator = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('KJV');
  const [selectedPassage, setSelectedPassage] = useState('');
  const [highlightedElement, setHighlightedElement] = useState('');

  const translations = ['KJV', 'NIV', 'ESV', 'NASB', 'NKJV'];
  
  const sanctuaryPassages = [
    { ref: 'Exodus 25:10-22', title: 'The Ark of the Covenant', element: 'ark' },
    { ref: 'Exodus 25:23-30', title: 'Table of Showbread', element: 'table' },
    { ref: 'Exodus 25:31-40', title: 'Golden Lampstand', element: 'lampstand' },
    { ref: 'Exodus 27:1-8', title: 'Bronze Altar', element: 'altar' },
    { ref: 'Exodus 30:1-10', title: 'Altar of Incense', element: 'incense-altar' },
    { ref: 'Exodus 30:17-21', title: 'Bronze Laver', element: 'laver' },
    { ref: '1 Kings 6:1-38', title: 'Solomon\'s Temple', element: 'temple' },
    { ref: 'Hebrews 9:1-28', title: 'Heavenly Sanctuary', element: 'heavenly' }
  ];

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-sanctuary-gold text-sanctuary-purple py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-sanctuary-brass hover:text-sanctuary-purple transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpen className="w-12 h-12 text-sanctuary-brass" />
            <div>
              <h1 className="text-4xl font-bold">Scripture Navigator</h1>
              <p className="text-sanctuary-brass text-lg">Linking Biblical Texts to 3D Sanctuary Models</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scripture Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Translation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Languages className="w-5 h-5" />
                <span>Bible Translation</span>
              </h3>
              <select
                value={selectedTranslation}
                onChange={(e) => setSelectedTranslation(e.target.value)}
                className="w-full p-3 border border-sanctuary-silver rounded-lg focus:ring-2 focus:ring-sanctuary-gold"
              >
                {translations.map((translation) => (
                  <option key={translation} value={translation}>{translation}</option>
                ))}
              </select>
            </div>

            {/* Passage Selector */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Select Passage</span>
              </h3>
              <div className="space-y-2">
                {sanctuaryPassages.map((passage) => (
                  <button
                    key={passage.ref}
                    onClick={() => {
                      setSelectedPassage(passage.ref);
                      setHighlightedElement(passage.element);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPassage === passage.ref
                        ? 'bg-sanctuary-gold text-sanctuary-purple'
                        : 'bg-sanctuary-linen hover:bg-sanctuary-gold/20 text-sanctuary-purple'
                    }`}
                  >
                    <div className="font-medium">{passage.ref}</div>
                    <div className="text-sm opacity-80">{passage.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scripture Text */}
            {selectedPassage && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">{selectedPassage} ({selectedTranslation})</h3>
                <div className="bg-sanctuary-linen rounded-lg p-4">
                  {selectedPassage === 'Exodus 25:10-22' && (
                    <div className="space-y-3 text-sanctuary-purple">
                      <p><strong>10</strong> And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof.</p>
                      <p><strong>11</strong> And thou shalt overlay it with pure gold, within and without shalt thou overlay it, and shalt make upon it a crown of gold round about.</p>
                      <p><strong>12</strong>And thou shalt cast four rings of gold for it, and put them in the four corners thereof; and two rings shall be in the one side of it, and two rings in the other side of it.</p>
                      <p><strong>13</strong>And thou shalt make staves of shittim wood, and overlay them with gold.</p>
                      <p><strong>14</strong>And thou shalt put the staves into the rings by the sides of the ark, that the ark may be borne with them.</p>
                      <p><strong>15</strong>The staves shall be in the rings of the ark: they shall not be taken from it.</p>
                      <p><strong>16</strong>And thou shalt put into the ark the testimony which I shall give thee.</p>
                      <p><strong>17</strong> And thou shalt make a mercy seat of pure gold: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof.</p>
                      <p><strong>18</strong>And thou shalt make two cherubims of gold, of beaten work shalt thou make them, in the two ends of the mercy seat.</p>
                      <p><strong>19</strong>And make one cherub on the one end, and the other cherub on the other end: even of the mercy seat shall ye make the cherubims on the two ends thereof.</p>
                      <p><strong>20</strong>And the cherubims shall stretch forth their wings on high, covering the mercy seat with their wings, and their faces shall look one to another; toward the mercy seat shall the faces of the cherubims be.</p>
                      <p><strong>21</strong>And thou shalt put the mercy seat above upon the ark; and in the ark thou shalt put the testimony that I shall give thee.</p>
                      <p><strong>22</strong> And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel.</p>
                    </div>
                  )}
                  {selectedPassage === 'Exodus 25:23-30' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>23</strong>Thou shalt also make a table of shittim wood: two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof.</p>
                        <p><strong>24</strong>And thou shalt overlay it with pure gold, and make thereto a crown of gold round about.</p>
                        <p><strong>25</strong>And thou shalt make unto it a border of an hand breadth round about, and thou shalt make a golden crown to the border thereof round about.</p>
                        <p><strong>26</strong>And thou shalt make for it four rings of gold, and put the rings in the four corners that are on the four feet thereof. </p>
                        <p><strong>27</strong>Over against the border shall the rings be for places of the staves to bear the table. </p>
                        <p><strong>28</strong>And thou shalt make the staves of shittim wood, and overlay them with gold, that the table may be borne with them.</p>
                        <p><strong>29</strong>And thou shalt make the dishes thereof, and spoons thereof, and covers thereof, and bowls thereof, to cover withal: of pure gold shalt thou make them.</p>
                        <p><strong>30</strong>And thou shalt set upon the table shewbread before me alway.</p>
                      </div>
                  )}
                  {selectedPassage === 'Exodus 25:31-40' && (
                    <div className="space-y-3 text-sanctuary-purple">
                      <p><strong>31</strong> And thou shalt make a candlestick of pure gold: of beaten work shall the candlestick be made: his shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same.</p>
                      <p><strong>32</strong> And six branches shall come out of the sides of it; three branches of the candlestick out of the one side, and three branches of the candlestick out of the other side:</p>
                      <p><strong>33</strong>Three bowls made like unto almonds, with a knop and a flower in one branch; and three bowls made like almonds in the other branch, with a knop and a flower: so in the six branches that come out of the candlestick.</p>
                      <p><strong>34</strong>And in the candlestick shall be four bowls made like unto almonds, with their knops and their flowers.</p>
                      <p><strong>35</strong>And there shall be a knop under two branches of the same, and a knop under two branches of the same, and a knop under two branches of the same, according to the six branches that proceed out of the candlestick.</p>
                      <p><strong>36</strong>Their knops and their branches shall be of the same: all it shall be one beaten work of pure gold.</p>
                      <p><strong>37</strong> And thou shalt make the seven lamps thereof: and they shall light the lamps thereof, that they may give light over against it.</p>
                      <p><strong>38</strong>And the tongs thereof, and the snuffdishes thereof, shall be of pure gold.</p>
                      <p><strong>39</strong>Of a talent of pure gold shall he make it, with all these vessels.</p>
                      <p><strong>40</strong>And look that thou make them after their pattern, which was shewed thee in the mount.
                      </p>
                    </div>
                  )}
                  {selectedPassage === 'Exodus 27:1-8' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>1</strong> And thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits.</p>
                        <p><strong>2</strong>And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same: and thou shalt overlay it with brass.</p>
                        <p><strong>3</strong>And thou shalt make his pans to receive his ashes, and his shovels, and his basons, and his fleshhooks, and his firepans: all the vessels thereof thou shalt make of brass.</p>
                        <p><strong>4</strong>And thou shalt make for it a grate of network of brass; and upon the net shalt thou make four brasen rings in the four corners thereof.</p>
                        <p><strong>5</strong>And thou shalt put it under the compass of the altar beneath, that the net may be even to the midst of the altar.</p>
                        <p><strong>6</strong>And thou shalt make staves for the altar, staves of shittim wood, and overlay them with brass.</p>
                        <p><strong>7</strong>And the staves shall be put into the rings, and the staves shall be upon the two sides of the altar, to bear it.</p>
                        <p><strong>8</strong>Hollow with boards shalt thou make it: as it was shewed thee in the mount, so shall they make it. </p>
                      </div>
                  )}
                  {selectedPassage === 'Exodus 30:1-10' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>1</strong>And thou shalt make an altar to burn incense upon: of shittim wood shalt thou make it.</p>
                        <p><strong>2</strong>A cubit shall be the length thereof, and a cubit the breadth thereof; foursquare shall it be: and two cubits shall be the height thereof: the horns thereof shall be of the same.</p>
                        <p><strong>3</strong>And thou shalt overlay it with pure gold, the top thereof, and the sides thereof round about, and the horns thereof; and thou shalt make unto it a crown of gold round about.</p>
                        <p><strong>4</strong>And two golden rings shalt thou make to it under the crown of it, by the two corners thereof, upon the two sides of it shalt thou make it; and they shall be for places for the staves to bear it withal.</p>
                        <p><strong>5</strong>And thou shalt make the staves of shittim wood, and overlay them with gold.</p>
                        <p><strong>6</strong>And thou shalt put it before the vail that is by the ark of the testimony, before the mercy seat that is over the testimony, where I will meet with thee. </p>
                        <p><strong>7</strong>And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it.</p>
                        <p><strong>8</strong>And when Aaron lighteth the lamps at even, he shall burn incense upon it, a perpetual incense before the LORD throughout your generations. </p>
                        <p><strong>9</strong>Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon. </p>
                        <p><strong>10</strong>And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD.</p>
                      </div>
                  )}
                  {selectedPassage === 'Exodus 30:17-21' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>17</strong>And the LORD spake unto Moses, saying,</p>
                        <p><strong>18</strong>Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein.</p>
                        <p><strong>19</strong>For Aaron and his sons shall wash their hands and their feet thereat:</p>
                        <p><strong>20</strong>When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD:</p>
                        <p><strong>21</strong>So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.</p>
                      </div>
                  )}
                  {selectedPassage === '1 Kings 6:1-38' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>1-38</strong>1Ki:6:1: And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.
                          1Ki:6:2: And the house which king Solomon built for the LORD, the length thereof was threescore cubits, and the breadth thereof twenty cubits, and the height thereof thirty cubits.
                          1Ki:6:3: And the porch before the temple of the house, twenty cubits was the length thereof, according to the breadth of the house; and ten cubits was the breadth thereof before the house.
                          1Ki:6:4: And for the house he made windows of narrow lights.
                          1Ki:6:5: And against the wall of the house he built chambers round about, against the walls of the house round about, both of the temple and of the oracle: and he made chambers round about:
                          1Ki:6:6: The nethermost chamber was five cubits broad, and the middle was six cubits broad, and the third was seven cubits broad: for without in the wall of the house he made narrowed rests round about, that the beams should not be fastened in the walls of the house.
                          1Ki:6:7: And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor axe nor any tool of iron heard in the house, while it was in building.
                          1Ki:6:8: The door for the middle chamber was in the right side of the house: and they went up with winding stairs into the middle chamber, and out of the middle into the third.
                          1Ki:6:9: So he built the house, and finished it; and covered the house with beams and boards of cedar.
                          1Ki:6:10: And then he built chambers against all the house, five cubits high: and they rested on the house with timber of cedar.
                          1Ki:6:11: And the word of the LORD came to Solomon, saying,
                          1Ki:6:12: Concerning this house which thou art in building, if thou wilt walk in my statutes, and execute my judgments, and keep all my commandments to walk in them; then will I perform my word with thee, which I spake unto David thy father:
                          1Ki:6:13: And I will dwell among the children of Israel, and will not forsake my people Israel.
                          1Ki:6:14: So Solomon built the house, and finished it.
                          1Ki:6:15: And he built the walls of the house within with boards of cedar, both the floor of the house, and the walls of the cieling: and he covered them on the inside with wood, and covered the floor of the house with planks of fir.
                          1Ki:6:16: And he built twenty cubits on the sides of the house, both the floor and the walls with boards of cedar: he even built them for it within, even for the oracle, even for the most holy place.
                          1Ki:6:17: And the house, that is, the temple before it, was forty cubits long.
                          1Ki:6:18: And the cedar of the house within was carved with knops and open flowers: all was cedar; there was no stone seen.
                          1Ki:6:19: And the oracle he prepared in the house within, to set there the ark of the covenant of the LORD.
                          1Ki:6:20: And the oracle in the forepart was twenty cubits in length, and twenty cubits in breadth, and twenty cubits in the height thereof: and he overlaid it with pure gold; and so covered the altar which was of cedar.
                          1Ki:6:21: So Solomon overlaid the house within with pure gold: and he made a partition by the chains of gold before the oracle; and he overlaid it with gold.
                          1Ki:6:22: And the whole house he overlaid with gold, until he had finished all the house: also the whole altar that was by the oracle he overlaid with gold.
                          1Ki:6:23: And within the oracle he made two cherubims of olive tree, each ten cubits high.
                          1Ki:6:24: And five cubits was the one wing of the cherub, and five cubits the other wing of the cherub: from the uttermost part of the one wing unto the uttermost part of the other were ten cubits.
                          1Ki:6:25: And the other cherub was ten cubits: both the cherubims were of one measure and one size.
                          1Ki:6:26: The height of the one cherub was ten cubits, and so was it of the other cherub.
                          1Ki:6:27: And he set the cherubims within the inner house: and they stretched forth the wings of the cherubims, so that the wing of the one touched the one wall, and the wing of the other cherub touched the other wall; and their wings touched one another in the midst of the house.
                          1Ki:6:28: And he overlaid the cherubims with gold.
                          1Ki:6:29: And he carved all the walls of the house round about with carved figures of cherubims and palm trees and open flowers, within and without.
                          1Ki:6:30: And the floor of the house he overlaid with gold, within and without.
                          1Ki:6:31: And for the entering of the oracle he made doors of olive tree: the lintel and side posts were a fifth part of the wall.
                          1Ki:6:32: The two doors also were of olive tree; and he carved upon them carvings of cherubims and palm trees and open flowers, and overlaid them with gold, and spread gold upon the cherubims, and upon the palm trees.
                          1Ki:6:33: So also made he for the door of the temple posts of olive tree, a fourth part of the wall.
                          1Ki:6:34: And the two doors were of fir tree: the two leaves of the one door were folding, and the two leaves of the other door were folding.
                          1Ki:6:35: And he carved thereon cherubims and palm trees and open flowers: and covered them with gold fitted upon the carved work.
                          1Ki:6:36: And he built the inner court with three rows of hewed stone, and a row of cedar beams.
                          1Ki:6:37: In the fourth year was the foundation of the house of the LORD laid, in the month Zif:
                          1Ki:6:38: And in the eleventh year, in the month Bul, which is the eighth month, was the house finished throughout all the parts thereof, and according to all the fashion of it.  So was he seven years in building it.</p>
                      </div>
                  )}
                  {selectedPassage === 'Hebrews 9:1-28' && (
                      <div className="space-y-3 text-sanctuary-purple">
                        <p><strong>1-38</strong>Heb:9:1: Then verily the first covenant had also ordinances of divine service, and a worldly sanctuary.
                          Heb:9:2: For there was a tabernacle made; the first, wherein was the candlestick, and the table, and the shewbread; which is called the sanctuary.
                          Heb:9:3: And after the second veil, the tabernacle which is called the Holiest of all;
                          Heb:9:4: Which had the golden censer, and the ark of the covenant overlaid round about with gold, wherein was the golden pot that had manna, and Aaron's rod that budded, and the tables of the covenant;
                          Heb:9:5: And over it the cherubims of glory shadowing the mercyseat; of which we cannot now speak particularly.
                          Heb:9:6: Now when these things were thus ordained, the priests went always into the first tabernacle, accomplishing the service of God.
                          Heb:9:7: But into the second went the high priest alone once every year, not without blood, which he offered for himself, and for the errors of the people:
                          Heb:9:8: The Holy Ghost this signifying, that the way into the holiest of all was not yet made manifest, while as the first tabernacle was yet standing:
                          Heb:9:9: Which was a figure for the time then present, in which were offered both gifts and sacrifices, that could not make him that did the service perfect, as pertaining to the conscience;
                          Heb:9:10: Which stood only in meats and drinks, and divers washings, and carnal ordinances, imposed on them until the time of reformation.
                          Heb:9:11: But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building;
                          Heb:9:12: Neither by the blood of goats and calves, but by his own blood he entered in once into the holy place, having obtained eternal redemption for us.
                          Heb:9:13: For if the blood of bulls and of goats, and the ashes of an heifer sprinkling the unclean, sanctifieth to the purifying of the flesh:
                          Heb:9:14: How much more shall the blood of Christ, who through the eternal Spirit offered himself without spot to God, purge your conscience from dead works to serve the living God?
                          Heb:9:15: And for this cause he is the mediator of the new testament, that by means of death, for the redemption of the transgressions that were under the first testament, they which are called might receive the promise of eternal inheritance.
                          Heb:9:16: For where a testament is, there must also of necessity be the death of the testator.
                          Heb:9:17: For a testament is of force after men are dead: otherwise it is of no strength at all while the testator liveth.
                          Heb:9:18: Whereupon neither the first testament was dedicated without blood.
                          Heb:9:19: For when Moses had spoken every precept to all the people according to the law, he took the blood of calves and of goats, with water, and scarlet wool, and hyssop, and sprinkled both the book, and all the people,
                          Heb:9:20: Saying, This is the blood of the testament which God hath enjoined unto you.
                          Heb:9:21: Moreover he sprinkled with blood both the tabernacle, and all the vessels of the ministry.
                          Heb:9:22: And almost all things are by the law purged with blood; and without shedding of blood is no remission.
                          Heb:9:23: It was therefore necessary that the patterns of things in the heavens should be purified with these; but the heavenly things themselves with better sacrifices than these.
                          Heb:9:24: For Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us:
                          Heb:9:25: Nor yet that he should offer himself often, as the high priest entereth into the holy place every year with blood of others;
                          Heb:9:26: For then must he often have suffered since the foundation of the world: but now once in the end of the world hath he appeared to put away sin by the sacrifice of himself.
                          Heb:9:27: And as it is appointed unto men once to die, but after this the judgment:
                          Heb:9:28: So Christ was once offered to bear the sins of many; and unto them that look for him shall he appear the second time without sin unto salvation.</p>

                      </div>
                  )}



                  {!selectedPassage.startsWith('Exodus 25') && (
                    <p className="text-sanctuary-purple italic">Scripture text will appear here when you select a passage...</p>
                  )}
                </div>

                {/* Cross References */}
                <div className="mt-4 pt-4 border-t border-sanctuary-silver">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Cross References</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Hebrews 9:4</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">Revelation 11:19</span>
                    <span className="text-xs bg-sanctuary-blue text-white px-2 py-1 rounded">1 Kings 8:9</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
              <div className="bg-sanctuary-purple text-white p-4 flex items-center justify-between">
                <h3 className="font-semibold">Interactive Sanctuary Model</h3>
                <div className="flex items-center space-x-2">
                  <Link2 className="w-5 h-5" />
                  <span className="text-sm">Scripture-Linked Elements</span>
                </div>
              </div>

              <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-sanctuary-linen to-sanctuary-linen-dark flex items-center justify-center">
                {/* Model Placeholder */}
                <div className="text-center text-sanctuary-brass">
                  <Eye className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-xl">3D Sanctuary Model</p>
                  <p className="text-base">Click scripture passages to highlight elements</p>
                  {highlightedElement && (
                    <div className="mt-4 p-3 bg-sanctuary-gold/20 rounded-lg">
                      <p className="text-sanctuary-purple font-medium">
                        Highlighting: {sanctuaryPassages.find(p => p.element === highlightedElement)?.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interactive Hotspots */}
                {highlightedElement === 'ark' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-sanctuary-gold rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Ark of the Covenant
                    </div>
                  </div>
                )}

                {highlightedElement === 'lampstand' && (
                  <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-sanctuary-gold rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-sanctuary-purple text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Golden Lampstand
                    </div>
                  </div>
                )}
              </div>

              {/* Model Controls */}
              <div className="bg-sanctuary-linen p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link className="px-3 py-2 bg-sanctuary-blue text-white rounded-lg text-sm hover:bg-sanctuary-blue-dark transition-colors">
                    Reset View
                  </Link>
                  <Link className="px-3 py-2 bg-sanctuary-gold text-sanctuary-purple rounded-lg text-sm hover:bg-sanctuary-gold-dark transition-colors">
                    Full Screen
                  </Link>
                </div>
                <div className="text-sm text-sanctuary-brass">
                  Use mouse to rotate • Scroll to zoom • Click elements for details
                </div>
              </div>
            </div>

            {/* Word Study Panel */}
            {selectedPassage && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30">
                <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Hebrew/Greek Word Study</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-purple mb-2">Key Hebrew Words</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sanctuary-blue">אָרוֹן (aron)</span>
                        <p className="text-sm text-sanctuary-brass">Ark, chest, coffin - Strong's H727</p>
                      </div>
                      <div>
                        <span className="font-medium text-sanctuary-blue">כַּפֹּרֶת (kapporet)</span>
                        <p className="text-sm text-sanctuary-brass">Mercy seat, atonement cover - Strong's H3727</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-sanctuary-linen rounded-lg p-4">
                    <h4 className="font-semibold text-sanctuary-purple mb-2">Theological Significance</h4>
                    <p className="text-sm text-sanctuary-brass">
                      The ark represents God's throne on earth, where His presence dwells among His people. 
                      The mercy seat symbolizes the place where divine justice and mercy meet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptureNavigator;