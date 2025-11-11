import React from 'react';
import { Image } from 'lucide-react';

interface SanctuaryImagePanelProps {
  passageRef: string;
  title: string;
}

const SanctuaryImagePanel: React.FC<SanctuaryImagePanelProps> = ({ passageRef, title }) => {
  const imageMap: Record<string, { url: string; alt: string; description: string }> = {
    'Exodus 25:10-22': {
      url: 'https://images.pexels.com/photos/8111859/pexels-photo-8111859.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Ark of the Covenant - Biblical Illustration',
      description: 'The Ark of the Covenant with its golden covering, mercy seat, and cherubim stretching their wings over the sacred ark containing the Ten Commandments.'
    },
    'Exodus 25:23-30': {
      url: 'https://images.pexels.com/photos/6646304/pexels-photo-6646304.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Table of Showbread - Biblical Illustration',
      description: 'The Table of Showbread overlaid with pure gold, displaying the twelve loaves representing the twelve tribes of Israel, always before the Lord.'
    },
    'Exodus 25:31-40': {
      url: 'https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Golden Lampstand (Menorah) - Biblical Illustration',
      description: 'The seven-branched golden lampstand (menorah) of pure beaten gold, with its almond-shaped bowls, knops, and flowers, providing light in the Holy Place.'
    },
    'Exodus 27:1-8': {
      url: 'https://images.pexels.com/photos/8111870/pexels-photo-8111870.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bronze Altar of Burnt Offering - Biblical Illustration',
      description: 'The Bronze Altar where daily sacrifices were offered, with four horns at the corners and overlaid with brass, representing the substitutionary atonement.'
    },
    'Exodus 30:1-10': {
      url: 'https://images.pexels.com/photos/6646928/pexels-photo-6646928.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Altar of Incense - Biblical Illustration',
      description: 'The golden Altar of Incense placed before the veil, where sweet incense burned perpetually, symbolizing the prayers of the saints ascending to God.'
    },
    'Exodus 30:17-21': {
      url: 'https://images.pexels.com/photos/8111872/pexels-photo-8111872.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Bronze Laver - Biblical Illustration',
      description: 'The Bronze Laver positioned between the tabernacle and altar, where priests washed their hands and feet, representing spiritual cleansing and purification.'
    },
    '1 Kings 6:1-38': {
      url: 'https://images.pexels.com/photos/8111877/pexels-photo-8111877.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Solomon\'s Temple - Biblical Illustration',
      description: 'The magnificent temple built by King Solomon, with its Holy Place and Most Holy Place, overlaid with pure gold and adorned with carved cherubim and palm trees.'
    },
    'Hebrews 9:1-28': {
      url: 'https://images.pexels.com/photos/8111856/pexels-photo-8111856.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Heavenly Sanctuary - Biblical Illustration',
      description: 'The Heavenly Sanctuary where Christ ministers as our High Priest, the true tabernacle which the Lord pitched, not man, fulfilling all earthly sanctuary types.'
    }
  };

  const imageData = imageMap[passageRef];

  if (!imageData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-sanctuary-gold/30 overflow-hidden">
      <div className="bg-sanctuary-gold text-sanctuary-purple p-4 flex items-center space-x-2">
        <Image className="w-5 h-5" />
        <h3 className="font-semibold">Biblical Illustration</h3>
      </div>

      <div className="p-4">
        <div className="relative rounded-lg overflow-hidden shadow-md mb-4">
          <img
            src={imageData.url}
            alt={imageData.alt}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-semibold">{title}</p>
          </div>
        </div>

        <div className="bg-sanctuary-linen rounded-lg p-4">
          <p className="text-sm text-sanctuary-purple leading-relaxed">
            {imageData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SanctuaryImagePanel;
