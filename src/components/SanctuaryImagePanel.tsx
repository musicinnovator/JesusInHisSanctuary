import React from 'react';
import { Image, ExternalLink } from 'lucide-react';

interface SanctuaryImagePanelProps {
  passageRef: string;
  title: string;
}

const SanctuaryImagePanel: React.FC<SanctuaryImagePanelProps> = ({ passageRef, title }) => {
  const imageMap: Record<string, { url: string; alt: string; description: string; attribution: string; attributionUrl: string }> = {
    'Exodus 25:10-22': {
      url: 'https://images.pexels.com/photos/8911600/pexels-photo-8911600.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The Ark of the Covenant, a golden chest with two cherubim with outstretched wings facing each other over the mercy seat, rendered in historical artistic style',
      description: 'The Ark of the Covenant, God\'s earthly throne, was overlaid with pure gold inside and out (Exodus 25:11). The mercy seat, where divine justice and mercy meet, was crowned with two cherubim of beaten gold facing each other with outstretched wings. Inside rested the tablets of the Ten Commandments, Aaron\'s budded rod, and a golden pot of manna—symbols of God\'s law, priesthood, and provision (Hebrews 9:4). Here, God promised to meet with Moses and commune from above the mercy seat (Exodus 25:22).',
      attribution: 'Photo by Tima Miroshnichenko',
      attributionUrl: 'https://www.pexels.com/@tima-miroshnichenko'
    },
    'Exodus 25:23-30': {
      url: 'https://images.pexels.com/photos/5967874/pexels-photo-5967874.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The Table of Showbread with twelve loaves of bread arranged in two stacks, overlaid with pure gold, in historical painting style',
      description: 'The Table of Showbread was constructed of acacia wood and overlaid with pure gold (Exodus 25:24). Twelve loaves of unleavened bread, representing the twelve tribes of Israel, were placed in two rows of six upon this table (Leviticus 24:5-6). Fresh bread was set before the Lord every Sabbath as a perpetual covenant, with the old loaves eaten by the priests in the Holy Place. This sacred table symbolized God\'s continual provision and His covenant relationship with His people.',
      attribution: 'Photo by Ron Lach',
      attributionUrl: 'https://www.pexels.com/@ron-lach'
    },
    'Exodus 25:31-40': {
      url: 'https://images.pexels.com/photos/6185649/pexels-photo-6185649.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The seven-branched golden lampstand (menorah) of beaten gold with almond blossom decorations, providing divine light in the Holy Place',
      description: 'The Golden Lampstand (Menorah) was crafted from a single talent of pure beaten gold (Exodus 25:39), featuring a central shaft with six branches extending from its sides. Each branch was adorned with almond blossoms, knops, and flowers—symbols of watchfulness and divine life. The seven lamps provided continual light in the Holy Place, representing the sevenfold Spirit of God (Revelation 4:5) and Christ as the Light of the World. The priests tended these lamps daily with pure olive oil, ensuring they never went out.',
      attribution: 'Photo by cottonbro studio',
      attributionUrl: 'https://www.pexels.com/@cottonbro'
    },
    'Exodus 27:1-8': {
      url: 'https://images.pexels.com/photos/6102080/pexels-photo-6102080.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The Bronze Altar of Burnt Offering with four horns at corners, where daily sacrifices were offered for atonement',
      description: 'The Bronze Altar of Burnt Offering stood at the entrance of the tabernacle courtyard, measuring five cubits square and three cubits high (Exodus 27:1). Constructed of acacia wood overlaid with bronze, it featured four horns at its corners where sacrificial blood was applied. Here, the daily morning and evening sacrifices were offered, consuming sin offerings and burnt offerings by fire. This altar pointed forward to Christ\'s ultimate sacrifice on Calvary, where He became both priest and victim, offering Himself once for all (Hebrews 7:27).',
      attribution: 'Photo by Arina Krasnikova',
      attributionUrl: 'https://www.pexels.com/@arina-krasnikova'
    },
    'Exodus 30:1-10': {
      url: 'https://images.pexels.com/photos/7363682/pexels-photo-7363682.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The golden Altar of Incense with fragrant smoke rising, positioned before the veil separating the Holy from Most Holy Place',
      description: 'The Altar of Incense was a small, sacred altar of acacia wood overlaid with pure gold, standing one cubit square and two cubits high with four golden horns (Exodus 30:2-3). Positioned directly before the veil separating the Holy Place from the Most Holy Place, it stood nearest to God\'s presence. Aaron burned fragrant incense upon it every morning and evening (Exodus 30:7-8), creating a perpetual cloud of sweet-smelling smoke that ascended to God. This altar symbolizes the prayers of the saints rising before God\'s throne (Revelation 8:3-4).',
      attribution: 'Photo by Tara Winstead',
      attributionUrl: 'https://www.pexels.com/@tara-winstead'
    },
    'Exodus 30:17-21': {
      url: 'https://images.pexels.com/photos/6186577/pexels-photo-6186577.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The Bronze Laver, a large basin of bronze for priestly washing and purification before entering the Holy Place',
      description: 'The Bronze Laver was a large basin of bronze positioned between the altar of burnt offering and the entrance to the Holy Place (Exodus 30:18). Constructed from the bronze mirrors donated by the serving women of Israel (Exodus 38:8), it held water for the ceremonial washing of the priests\' hands and feet. Before ministering at the altar or entering the tabernacle, priests were commanded to wash, "that they die not" (Exodus 30:20-21). This laver represents spiritual cleansing through God\'s Word and the washing of regeneration (Titus 3:5, Ephesians 5:26).',
      attribution: 'Photo by Anna Tarazevich',
      attributionUrl: 'https://www.pexels.com/@anna-tarazevich'
    },
    '1 Kings 6:1-38': {
      url: 'https://images.pexels.com/photos/9814653/pexels-photo-9814653.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Solomon\'s magnificent Temple in Jerusalem with its Holy Place and Most Holy Place, overlaid with pure gold and adorned with carved cherubim',
      description: 'Solomon\'s Temple was a magnificent structure built in Jerusalem, taking seven years to complete (1 Kings 6:38). The temple measured sixty cubits long, twenty cubits wide, and thirty cubits high, constructed of hewn stone and cedar from Lebanon. The interior was entirely overlaid with pure gold, with carved cherubim, palm trees, and open flowers adorning the walls. The Most Holy Place, a perfect cube of twenty cubits, housed the Ark of the Covenant beneath the wings of two massive golden cherubim. Two bronze pillars, Jachin and Boaz, stood at the entrance, symbolizing God\'s establishment and strength. This glorious temple served as the center of Israelite worship until its destruction in 586 BC.',
      attribution: 'Photo by Pixabay',
      attributionUrl: 'https://www.pexels.com/@pixabay'
    },
    'Hebrews 9:1-28': {
      url: 'https://images.pexels.com/photos/17836027/pexels-photo-17836027.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'The Heavenly Sanctuary with God\'s throne room, where Christ ministers as our High Priest in the true tabernacle',
      description: 'The Heavenly Sanctuary is "the true tabernacle, which the Lord pitched, and not man" (Hebrews 8:2). Here, Christ serves as our great High Priest, having entered once for all into the Holy Place, not with the blood of goats and calves, but with His own blood, securing eternal redemption (Hebrews 9:12). The book of Revelation gives us glimpses of this celestial temple, with its throne of God surrounded by the seven lamps of fire (Revelation 4:5), the golden altar of incense where the prayers of saints ascend (Revelation 8:3), and the ark of God\'s covenant (Revelation 11:19). While the earthly sanctuary was a shadow and copy, the heavenly is the reality where Christ continually intercedes for His people.',
      attribution: 'Photo by Pixabay',
      attributionUrl: 'https://www.pexels.com/@pixabay'
    }
  };

  const imageData = imageMap[passageRef];

  if (!imageData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
      <div className="bg-sanctuary-gold text-sanctuary-purple p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className="w-5 h-5" />
          <h3 className="font-semibold">Biblical Illustration</h3>
        </div>
        <a
          href="/gallery"
          className="flex items-center space-x-1 text-sm text-sanctuary-purple hover:text-sanctuary-brass transition-colors group"
          title="View Full Gallery"
        >
          <span className="hidden sm:inline">View Gallery</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="p-4">
        <div className="relative rounded-lg overflow-hidden shadow-md mb-4">
          <img
            src={imageData.url}
            alt={imageData.alt}
            className="w-full h-64 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f5f5dc" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%236b4423"%3EImage Loading...%3C/text%3E%3C/svg%3E';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-semibold">{title}</p>
          </div>
        </div>

        <div className="bg-sanctuary-linen rounded-lg p-4 mb-3">
          <p className="text-sm text-sanctuary-purple leading-relaxed">
            {imageData.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-sanctuary-brass px-2">
          <a
            href={imageData.attributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sanctuary-purple transition-colors flex items-center space-x-1"
          >
            <span>{imageData.attribution}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-sanctuary-brass/60">via Pexels</span>
        </div>
      </div>
    </div>
  );
};

export default SanctuaryImagePanel;
