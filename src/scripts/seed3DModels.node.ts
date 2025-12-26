import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Found' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ModelData {
  name: string;
  title: string;
  description: string;
  time_period: string;
  biblical_references: string[];
  dimensions_cubits: { length?: number; width?: number; height?: number };
  scale_factor: number;
  default_camera_position: { x: number; y: number; z: number };
  default_camera_target: { x: number; y: number; z: number };
  featured: boolean;
  order_position: number;
}

interface HotspotData {
  hotspot_name: string;
  title: string;
  description: string;
  position_x: number;
  position_y: number;
  position_z: number;
  category: 'furniture' | 'structure' | 'location' | 'detail';
  scripture_references: string[];
  symbolism_summary: string;
  icon_type: string;
  color_hex: string;
}

interface TourData {
  tour_name: string;
  description: string;
  total_duration_seconds: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
}

interface TourStopData {
  stop_number: number;
  hotspot_id: string | null;
  camera_position: { x: number; y: number; z: number };
  camera_target: { x: number; y: number; z: number };
  narration_text: string;
  duration_seconds: number;
  scripture_overlay: string | null;
}

interface MeasurementData {
  element_name: string;
  length_cubits: number | null;
  width_cubits: number | null;
  height_cubits: number | null;
  material: string | null;
  color_scheme: string[];
  weight_talents: number | null;
  biblical_reference: string | null;
}

const sanctuaryModels: ModelData[] = [
  {
    name: 'tabernacle',
    title: 'Wilderness Tabernacle',
    description: 'The portable sanctuary built by Moses according to the pattern shown on Mount Sinai. A dwelling place for God among His people during their wilderness journey.',
    time_period: '1445-1400 BC (Exodus Period)',
    biblical_references: ['Exodus 25-27', 'Exodus 35-40', 'Hebrews 8:5', 'Hebrews 9:1-10'],
    dimensions_cubits: { length: 30, width: 10, height: 10 },
    scale_factor: 1.0,
    default_camera_position: { x: 25, y: 15, z: 25 },
    default_camera_target: { x: 15, y: 5, z: 5 },
    featured: true,
    order_position: 1
  },
  {
    name: 'solomon',
    title: "Solomon's Temple",
    description: 'The magnificent permanent temple built by King Solomon in Jerusalem. Twice the dimensions of the tabernacle, adorned with gold, precious stones, and intricate carvings.',
    time_period: '960-586 BC (First Temple Period)',
    biblical_references: ['1 Kings 6-8', '2 Chronicles 3-7', 'Psalm 132:13-14'],
    dimensions_cubits: { length: 60, width: 20, height: 30 },
    scale_factor: 2.0,
    default_camera_position: { x: 50, y: 30, z: 50 },
    default_camera_target: { x: 30, y: 15, z: 10 },
    featured: true,
    order_position: 2
  },
  {
    name: 'herod',
    title: "Herod's Temple",
    description: 'The restored and expanded temple complex where Jesus taught. Built over decades by Herod the Great, combining Jewish tradition with Greco-Roman architecture.',
    time_period: '20 BC - 70 AD (Second Temple Period)',
    biblical_references: ['John 2:13-22', 'Mark 13:1-2', 'Matthew 24:1-2', 'Luke 19:45-48'],
    dimensions_cubits: { length: 100, width: 50, height: 50 },
    scale_factor: 3.0,
    default_camera_position: { x: 80, y: 50, z: 80 },
    default_camera_target: { x: 50, y: 25, z: 25 },
    featured: true,
    order_position: 3
  },
  {
    name: 'heavenly',
    title: 'Heavenly Sanctuary',
    description: 'The true sanctuary in heaven where Christ ministers as our High Priest. The reality of which all earthly sanctuaries were but shadows and types.',
    time_period: 'Eternal (Revelation Vision)',
    biblical_references: ['Hebrews 8:1-2', 'Hebrews 9:11-14', 'Revelation 4-5', 'Revelation 11:19', 'Daniel 7:9-14'],
    dimensions_cubits: { length: 1000, width: 500, height: 500 },
    scale_factor: 10.0,
    default_camera_position: { x: 800, y: 400, z: 800 },
    default_camera_target: { x: 500, y: 250, z: 250 },
    featured: true,
    order_position: 4
  }
];

const tabernacleHotspots: HotspotData[] = [
  {
    hotspot_name: 'ark_of_covenant',
    title: 'Ark of the Covenant',
    description: 'The most holy object in the sanctuary, representing God\'s throne on earth. Contained the Ten Commandments, Aaron\'s rod, and a pot of manna.',
    position_x: 15,
    position_y: 5,
    position_z: 2,
    category: 'furniture',
    scripture_references: ['Exodus 25:10-22', 'Hebrews 9:4', 'Revelation 11:19'],
    symbolism_summary: 'Represents God\'s presence, His law, and Christ as the meeting place between God and humanity',
    icon_type: 'crown',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'altar_of_incense',
    title: 'Altar of Incense',
    description: 'The golden altar before the veil where fragrant incense was burned morning and evening, representing the prayers of God\'s people.',
    position_x: 15,
    position_y: 5,
    position_z: 7,
    category: 'furniture',
    scripture_references: ['Exodus 30:1-10', 'Luke 1:9-10', 'Revelation 8:3-4'],
    symbolism_summary: 'Represents prayer and intercession of Christ for His people',
    icon_type: 'flame',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'table_of_showbread',
    title: 'Table of Showbread',
    description: 'The golden table holding twelve loaves of bread, one for each tribe of Israel, renewed every Sabbath.',
    position_x: 17,
    position_y: 4,
    position_z: 8,
    category: 'furniture',
    scripture_references: ['Exodus 25:23-30', 'Leviticus 24:5-9', 'John 6:35'],
    symbolism_summary: 'Represents Christ as the Bread of Life and spiritual nourishment',
    icon_type: 'bread',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'golden_lampstand',
    title: 'Golden Lampstand (Menorah)',
    description: 'The seven-branched lampstand of pure gold that provided light in the Holy Place, tended daily by the priests.',
    position_x: 13,
    position_y: 4,
    position_z: 8,
    category: 'furniture',
    scripture_references: ['Exodus 25:31-40', 'Zechariah 4:2-6', 'Revelation 1:12-20'],
    symbolism_summary: 'Represents Christ as the Light of the World and the Holy Spirit',
    icon_type: 'candle',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'altar_of_burnt_offering',
    title: 'Altar of Burnt Offering',
    description: 'The bronze altar in the courtyard where animal sacrifices were offered for the forgiveness of sins.',
    position_x: 15,
    position_y: 2,
    position_z: 20,
    category: 'furniture',
    scripture_references: ['Exodus 27:1-8', 'Leviticus 1:3-9', 'Hebrews 13:10-12'],
    symbolism_summary: 'Represents Christ\'s sacrifice on the cross for our sins',
    icon_type: 'fire',
    color_hex: '#CD7F32'
  },
  {
    hotspot_name: 'laver',
    title: 'Bronze Laver',
    description: 'The bronze basin for ceremonial washing, where priests cleansed themselves before ministering.',
    position_x: 15,
    position_y: 2,
    position_z: 15,
    category: 'furniture',
    scripture_references: ['Exodus 30:17-21', 'Titus 3:5', 'Ephesians 5:26'],
    symbolism_summary: 'Represents baptism, sanctification, and cleansing through God\'s Word',
    icon_type: 'droplet',
    color_hex: '#CD7F32'
  },
  {
    hotspot_name: 'veil',
    title: 'The Veil',
    description: 'The beautifully embroidered curtain separating the Holy Place from the Most Holy Place, torn at Christ\'s death.',
    position_x: 15,
    position_y: 5,
    position_z: 5,
    category: 'structure',
    scripture_references: ['Exodus 26:31-33', 'Matthew 27:51', 'Hebrews 10:19-20'],
    symbolism_summary: 'Represents Christ\'s flesh and the barrier of sin removed by His death',
    icon_type: 'divide',
    color_hex: '#9370DB'
  },
  {
    hotspot_name: 'courtyard_gate',
    title: 'Courtyard Gate',
    description: 'The single entrance to the sanctuary, facing east, embroidered with blue, purple, and scarlet.',
    position_x: 15,
    position_y: 3,
    position_z: 30,
    category: 'structure',
    scripture_references: ['Exodus 27:16', 'John 10:9', 'John 14:6'],
    symbolism_summary: 'Represents Christ as the only way to God',
    icon_type: 'door-open',
    color_hex: '#4169E1'
  }
];

const tabernacleIntroTour: TourData = {
  tour_name: 'Introduction to the Tabernacle',
  description: 'A beginner-friendly journey through the wilderness sanctuary, exploring each piece of furniture and its spiritual significance.',
  total_duration_seconds: 600,
  difficulty_level: 'beginner',
  featured: true
};

const tabernacleIntroStops: TourStopData[] = [
  {
    stop_number: 1,
    hotspot_id: 'courtyard_gate',
    camera_position: { x: 15, y: 5, z: 35 },
    camera_target: { x: 15, y: 3, z: 30 },
    narration_text: 'Welcome to the wilderness tabernacle. We begin at the courtyard gate, the only entrance to God\'s dwelling place. Jesus said, "I am the door; if anyone enters through Me, he will be saved."',
    duration_seconds: 60,
    scripture_overlay: 'John 10:9'
  },
  {
    stop_number: 2,
    hotspot_id: 'altar_of_burnt_offering',
    camera_position: { x: 15, y: 8, z: 25 },
    camera_target: { x: 15, y: 2, z: 20 },
    narration_text: 'The altar of burnt offering was the first thing encountered after entering. Here, sacrificial lambs died in place of the sinner, pointing forward to Christ, the Lamb of God.',
    duration_seconds: 75,
    scripture_overlay: 'John 1:29'
  },
  {
    stop_number: 3,
    hotspot_id: 'laver',
    camera_position: { x: 15, y: 6, z: 18 },
    camera_target: { x: 15, y: 2, z: 15 },
    narration_text: 'After sacrifice came cleansing at the bronze laver. The priests washed here before entering God\'s presence, symbolizing the sanctification that follows justification.',
    duration_seconds: 60,
    scripture_overlay: 'Titus 3:5'
  },
  {
    stop_number: 4,
    hotspot_id: 'golden_lampstand',
    camera_position: { x: 10, y: 5, z: 10 },
    camera_target: { x: 13, y: 4, z: 8 },
    narration_text: 'Inside the Holy Place, the golden lampstand provided light. Jesus proclaimed, "I am the light of the world," illuminating our path and revealing truth.',
    duration_seconds: 70,
    scripture_overlay: 'John 8:12'
  },
  {
    stop_number: 5,
    hotspot_id: 'table_of_showbread',
    camera_position: { x: 20, y: 5, z: 10 },
    camera_target: { x: 17, y: 4, z: 8 },
    narration_text: 'The table of showbread held twelve loaves, representing God\'s provision for His people. Jesus declared, "I am the bread of life," providing spiritual sustenance.',
    duration_seconds: 70,
    scripture_overlay: 'John 6:35'
  },
  {
    stop_number: 6,
    hotspot_id: 'altar_of_incense',
    camera_position: { x: 15, y: 7, z: 9 },
    camera_target: { x: 15, y: 5, z: 7 },
    narration_text: 'The altar of incense stood before the veil, where fragrant smoke ascended morning and evening. This represents the prayers of God\'s people, made effective through Christ\'s intercession.',
    duration_seconds: 80,
    scripture_overlay: 'Revelation 8:3-4'
  },
  {
    stop_number: 7,
    hotspot_id: 'veil',
    camera_position: { x: 15, y: 6, z: 8 },
    camera_target: { x: 15, y: 5, z: 5 },
    narration_text: 'The magnificent veil separated the Holy Place from the Most Holy. Embroidered with cherubim, it symbolized the barrier between God and sinful humanity—a barrier torn when Jesus died.',
    duration_seconds: 85,
    scripture_overlay: 'Matthew 27:51'
  },
  {
    stop_number: 8,
    hotspot_id: 'ark_of_covenant',
    camera_position: { x: 15, y: 8, z: 5 },
    camera_target: { x: 15, y: 5, z: 2 },
    narration_text: 'In the Most Holy Place dwelt the ark of the covenant, God\'s throne on earth. Above it, the mercy seat—where the high priest sprinkled blood once a year. Here, justice and mercy meet in Christ.',
    duration_seconds: 100,
    scripture_overlay: 'Hebrews 9:11-12'
  }
];

const tabernacleSymbolismTour: TourData = {
  tour_name: 'Symbolism and Types',
  description: 'An advanced exploration of the deeper spiritual meanings and prophetic types found in the sanctuary service.',
  total_duration_seconds: 900,
  difficulty_level: 'advanced',
  featured: true
};

const tabernacleSymbolismStops: TourStopData[] = [
  {
    stop_number: 1,
    hotspot_id: 'altar_of_burnt_offering',
    camera_position: { x: 20, y: 10, z: 23 },
    camera_target: { x: 15, y: 2, z: 20 },
    narration_text: 'The altar of burnt offering reveals Christ\'s substitutionary atonement. The innocent lamb died in place of the guilty sinner, foreshadowing Calvary where the Lamb of God was slain for the sins of the world.',
    duration_seconds: 120,
    scripture_overlay: '1 Peter 1:18-19'
  },
  {
    stop_number: 2,
    hotspot_id: 'ark_of_covenant',
    camera_position: { x: 15, y: 10, z: 5 },
    camera_target: { x: 15, y: 5, z: 2 },
    narration_text: 'The ark contained God\'s law, revealing His character of love. The mercy seat above it demonstrated that mercy triumphs over judgment when blood is applied—Christ\'s blood satisfies both justice and mercy.',
    duration_seconds: 130,
    scripture_overlay: 'Romans 3:25-26'
  },
  {
    stop_number: 3,
    hotspot_id: 'altar_of_incense',
    camera_position: { x: 12, y: 7, z: 7 },
    camera_target: { x: 15, y: 5, z: 7 },
    narration_text: 'The altar of incense teaches us about Christ\'s continual intercession. Our prayers, mixed with His merits, ascend as a sweet fragrance to the Father. Without Christ\'s mediation, our prayers would be ineffective.',
    duration_seconds: 110,
    scripture_overlay: 'Hebrews 7:25'
  },
  {
    stop_number: 4,
    hotspot_id: 'veil',
    camera_position: { x: 15, y: 6, z: 7 },
    camera_target: { x: 15, y: 5, z: 5 },
    narration_text: 'The torn veil at Christ\'s death opened a new and living way into God\'s presence. No longer do we need an earthly priest—we have direct access to the Father through Jesus, our great High Priest.',
    duration_seconds: 120,
    scripture_overlay: 'Hebrews 10:19-22'
  }
];

const solomonHotspots: HotspotData[] = [
  {
    hotspot_name: 'holy_of_holies',
    title: 'Holy of Holies',
    description: 'The innermost sanctuary, a perfect cube overlaid with pure gold, housing the ark of the covenant beneath the wings of two massive cherubim.',
    position_x: 30,
    position_y: 15,
    position_z: 10,
    category: 'location',
    scripture_references: ['1 Kings 6:16-20', '2 Chronicles 3:8-13'],
    symbolism_summary: 'Represents the very presence of God and the throne room of heaven',
    icon_type: 'crown',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'two_pillars',
    title: 'Jachin and Boaz',
    description: 'Two magnificent bronze pillars standing at the temple entrance. Jachin means "He establishes" and Boaz means "In Him is strength."',
    position_x: 30,
    position_y: 10,
    position_z: 55,
    category: 'structure',
    scripture_references: ['1 Kings 7:15-22', '2 Chronicles 3:15-17'],
    symbolism_summary: 'Represents God\'s establishment of His kingdom and the strength found in Him',
    icon_type: 'columns',
    color_hex: '#CD7F32'
  },
  {
    hotspot_name: 'molten_sea',
    title: 'The Molten Sea',
    description: 'A massive bronze basin holding thousands of gallons of water, resting on twelve bronze oxen, used for priestly purification.',
    position_x: 25,
    position_y: 3,
    position_z: 45,
    category: 'furniture',
    scripture_references: ['1 Kings 7:23-26', '2 Chronicles 4:2-5'],
    symbolism_summary: 'Represents complete cleansing and the abundance of God\'s grace',
    icon_type: 'waves',
    color_hex: '#4682B4'
  }
];

const herodHotspots: HotspotData[] = [
  {
    hotspot_name: 'temple_mount',
    title: 'Temple Mount Platform',
    description: 'The massive platform built by Herod, one of the greatest architectural achievements of the ancient world, supporting the temple complex.',
    position_x: 50,
    position_y: 10,
    position_z: 50,
    category: 'structure',
    scripture_references: ['Mark 13:1', 'John 2:20'],
    symbolism_summary: 'Represents human effort to create a place for God\'s dwelling',
    icon_type: 'building',
    color_hex: '#D2B48C'
  },
  {
    hotspot_name: 'court_of_gentiles',
    title: 'Court of the Gentiles',
    description: 'The outer court where non-Jews could come to worship, which Jesus cleansed of merchants and money changers.',
    position_x: 50,
    position_y: 5,
    position_z: 70,
    category: 'location',
    scripture_references: ['Matthew 21:12-13', 'Mark 11:15-17', 'John 2:14-16'],
    symbolism_summary: 'Represents God\'s desire for all nations to know Him and worship in His house',
    icon_type: 'globe',
    color_hex: '#8B4513'
  }
];

const heavenlyHotspots: HotspotData[] = [
  {
    hotspot_name: 'throne_of_god',
    title: 'The Throne of God',
    description: 'The glorious throne of the Ancient of Days, surrounded by a rainbow, from which proceeds lightnings, thunderings, and voices.',
    position_x: 500,
    position_y: 250,
    position_z: 100,
    category: 'location',
    scripture_references: ['Revelation 4:2-6', 'Daniel 7:9-10', 'Ezekiel 1:26-28'],
    symbolism_summary: 'The center of the universe, the seat of God\'s sovereignty and judgment',
    icon_type: 'crown',
    color_hex: '#FFD700'
  },
  {
    hotspot_name: 'seven_lamps',
    title: 'Seven Lamps of Fire',
    description: 'Seven lamps of fire burning before the throne, which are the seven Spirits of God, representing the fullness of the Holy Spirit.',
    position_x: 500,
    position_y: 240,
    position_z: 200,
    category: 'furniture',
    scripture_references: ['Revelation 4:5', 'Zechariah 4:2-6'],
    symbolism_summary: 'Represents the omnipresent work of the Holy Spirit throughout the earth',
    icon_type: 'flame',
    color_hex: '#FF4500'
  },
  {
    hotspot_name: 'crystal_sea',
    title: 'Sea of Glass',
    description: 'A vast sea of crystal glass before the throne, where the redeemed will stand with harps of God.',
    position_x: 500,
    position_y: 200,
    position_z: 400,
    category: 'location',
    scripture_references: ['Revelation 4:6', 'Revelation 15:2-4'],
    symbolism_summary: 'Represents the purity and peace of heaven, and the victory of the redeemed',
    icon_type: 'sparkles',
    color_hex: '#E0FFFF'
  },
  {
    hotspot_name: 'altar_golden',
    title: 'Golden Altar',
    description: 'The golden altar before the throne where an angel offers incense with the prayers of all the saints.',
    position_x: 500,
    position_y: 245,
    position_z: 180,
    category: 'furniture',
    scripture_references: ['Revelation 8:3-5', 'Revelation 9:13'],
    symbolism_summary: 'Represents Christ\'s intercession and the prayers of God\'s people ascending to heaven',
    icon_type: 'flame',
    color_hex: '#DAA520'
  },
  {
    hotspot_name: 'ark_heavenly',
    title: 'Ark of the Testament',
    description: 'The ark of God\'s testament seen in the heavenly temple, containing the eternal, unchanging law of God.',
    position_x: 500,
    position_y: 250,
    position_z: 50,
    category: 'furniture',
    scripture_references: ['Revelation 11:19', 'Hebrews 9:4'],
    symbolism_summary: 'Represents God\'s eternal law as the foundation of His throne and government',
    icon_type: 'book',
    color_hex: '#FFD700'
  }
];

const tabernacleМeasurements: MeasurementData[] = [
  {
    element_name: 'Ark of the Covenant',
    length_cubits: 2.5,
    width_cubits: 1.5,
    height_cubits: 1.5,
    material: 'Acacia wood overlaid with pure gold',
    color_scheme: ['gold'],
    weight_talents: null,
    biblical_reference: 'Exodus 25:10-11'
  },
  {
    element_name: 'Mercy Seat',
    length_cubits: 2.5,
    width_cubits: 1.5,
    height_cubits: null,
    material: 'Pure gold',
    color_scheme: ['gold'],
    weight_talents: null,
    biblical_reference: 'Exodus 25:17'
  },
  {
    element_name: 'Table of Showbread',
    length_cubits: 2,
    width_cubits: 1,
    height_cubits: 1.5,
    material: 'Acacia wood overlaid with pure gold',
    color_scheme: ['gold'],
    weight_talents: null,
    biblical_reference: 'Exodus 25:23-24'
  },
  {
    element_name: 'Altar of Incense',
    length_cubits: 1,
    width_cubits: 1,
    height_cubits: 2,
    material: 'Acacia wood overlaid with pure gold',
    color_scheme: ['gold'],
    weight_talents: null,
    biblical_reference: 'Exodus 30:1-3'
  },
  {
    element_name: 'Altar of Burnt Offering',
    length_cubits: 5,
    width_cubits: 5,
    height_cubits: 3,
    material: 'Acacia wood overlaid with bronze',
    color_scheme: ['brass'],
    weight_talents: null,
    biblical_reference: 'Exodus 27:1-2'
  },
  {
    element_name: 'Bronze Laver',
    length_cubits: null,
    width_cubits: null,
    height_cubits: null,
    material: 'Bronze from mirrors of serving women',
    color_scheme: ['brass'],
    weight_talents: null,
    biblical_reference: 'Exodus 30:18'
  },
  {
    element_name: 'Tabernacle Structure - Most Holy Place',
    length_cubits: 10,
    width_cubits: 10,
    height_cubits: 10,
    material: 'Gold-overlaid acacia boards, richly embroidered curtains',
    color_scheme: ['gold', 'blue', 'purple', 'red', 'white'],
    weight_talents: null,
    biblical_reference: 'Exodus 26:15-30'
  },
  {
    element_name: 'Tabernacle Structure - Holy Place',
    length_cubits: 20,
    width_cubits: 10,
    height_cubits: 10,
    material: 'Gold-overlaid acacia boards, richly embroidered curtains',
    color_scheme: ['gold', 'blue', 'purple', 'red', 'white'],
    weight_talents: null,
    biblical_reference: 'Exodus 26:15-30'
  },
  {
    element_name: 'Courtyard',
    length_cubits: 100,
    width_cubits: 50,
    height_cubits: 5,
    material: 'Fine linen curtains on bronze pillars',
    color_scheme: ['white', 'brass'],
    weight_talents: null,
    biblical_reference: 'Exodus 27:9-18'
  }
];

async function seedModelsAndHotspots() {
  console.log('🏗️  Starting 3D Sanctuary Models Seeding...\n');

  try {
    for (const modelData of sanctuaryModels) {
      console.log(`📦 Processing ${modelData.title}...`);

      const { data: existingModel } = await supabase
        .from('sanctuary_3d_models')
        .select('id')
        .eq('name', modelData.name)
        .maybeSingle();

      let modelId: string;

      if (existingModel) {
        console.log(`   ℹ️  Model "${modelData.name}" already exists, updating...`);
        const { data: updatedModel, error: updateError } = await supabase
          .from('sanctuary_3d_models')
          .update({
            ...modelData,
            model_file_url: `/data/models/${modelData.name}.json`,
            thumbnail_url: `/images/sanctuaries/${modelData.name}-thumb.jpg`
          })
          .eq('id', existingModel.id)
          .select()
          .single();

        if (updateError) throw updateError;
        modelId = updatedModel.id;
        console.log(`   ✅ Updated model: ${modelData.name}`);
      } else {
        const { data: newModel, error: insertError } = await supabase
          .from('sanctuary_3d_models')
          .insert({
            ...modelData,
            model_file_url: `/data/models/${modelData.name}.json`,
            thumbnail_url: `/images/sanctuaries/${modelData.name}-thumb.jpg`
          })
          .select()
          .single();

        if (insertError) throw insertError;
        modelId = newModel.id;
        console.log(`   ✅ Created model: ${modelData.name}`);
      }

      let hotspots: HotspotData[] = [];
      if (modelData.name === 'tabernacle') hotspots = tabernacleHotspots;
      else if (modelData.name === 'solomon') hotspots = solomonHotspots;
      else if (modelData.name === 'herod') hotspots = herodHotspots;
      else if (modelData.name === 'heavenly') hotspots = heavenlyHotspots;

      if (hotspots.length > 0) {
        console.log(`   📍 Seeding ${hotspots.length} hotspots...`);

        for (const hotspot of hotspots) {
          const { data: existingHotspot } = await supabase
            .from('model_hotspots')
            .select('id')
            .eq('model_id', modelId)
            .eq('hotspot_name', hotspot.hotspot_name)
            .maybeSingle();

          if (existingHotspot) {
            const { error: updateError } = await supabase
              .from('model_hotspots')
              .update({ ...hotspot, model_id: modelId })
              .eq('id', existingHotspot.id);

            if (updateError) throw updateError;
          } else {
            const { error: insertError } = await supabase
              .from('model_hotspots')
              .insert({ ...hotspot, model_id: modelId });

            if (insertError) throw insertError;
          }
        }
        console.log(`   ✅ Seeded ${hotspots.length} hotspots`);
      }

      if (modelData.name === 'tabernacle') {
        console.log(`   📚 Seeding measurements...`);
        for (const measurement of tabernacleМeasurements) {
          const { data: existingMeasurement } = await supabase
            .from('element_measurements')
            .select('id')
            .eq('model_id', modelId)
            .eq('element_name', measurement.element_name)
            .maybeSingle();

          if (existingMeasurement) {
            const { error: updateError } = await supabase
              .from('element_measurements')
              .update({ ...measurement, model_id: modelId })
              .eq('id', existingMeasurement.id);

            if (updateError) throw updateError;
          } else {
            const { error: insertError } = await supabase
              .from('element_measurements')
              .insert({ ...measurement, model_id: modelId });

            if (insertError) throw insertError;
          }
        }
        console.log(`   ✅ Seeded ${tabernacleМeasurements.length} measurements`);
      }

      console.log(`✅ Completed ${modelData.title}\n`);
    }

    console.log('🎯 Creating Guided Tours...\n');

    const { data: tabernacleModel } = await supabase
      .from('sanctuary_3d_models')
      .select('id')
      .eq('name', 'tabernacle')
      .single();

    if (tabernacleModel) {
      const tours = [
        { tourData: tabernacleIntroTour, stops: tabernacleIntroStops },
        { tourData: tabernacleSymbolismTour, stops: tabernacleSymbolismStops }
      ];

      for (const { tourData, stops } of tours) {
        console.log(`   🗺️  Creating tour: ${tourData.tour_name}...`);

        const { data: existingTour } = await supabase
          .from('guided_tours')
          .select('id')
          .eq('model_id', tabernacleModel.id)
          .eq('tour_name', tourData.tour_name)
          .maybeSingle();

        let tourId: string;

        if (existingTour) {
          const { data: updatedTour, error: updateError } = await supabase
            .from('guided_tours')
            .update({ ...tourData, model_id: tabernacleModel.id })
            .eq('id', existingTour.id)
            .select()
            .single();

          if (updateError) throw updateError;
          tourId = updatedTour.id;

          const { error: deleteError } = await supabase
            .from('tour_stops')
            .delete()
            .eq('tour_id', tourId);

          if (deleteError) throw deleteError;
        } else {
          const { data: newTour, error: insertError } = await supabase
            .from('guided_tours')
            .insert({ ...tourData, model_id: tabernacleModel.id })
            .select()
            .single();

          if (insertError) throw insertError;
          tourId = newTour.id;
        }

        console.log(`   📍 Adding ${stops.length} tour stops...`);

        const { data: hotspots } = await supabase
          .from('model_hotspots')
          .select('id, hotspot_name')
          .eq('model_id', tabernacleModel.id);

        const hotspotMap = new Map(hotspots?.map(h => [h.hotspot_name, h.id]) || []);

        for (const stop of stops) {
          const hotspotId = stop.hotspot_id ? hotspotMap.get(stop.hotspot_id) : null;

          const { error: insertError } = await supabase
            .from('tour_stops')
            .insert({
              tour_id: tourId,
              stop_number: stop.stop_number,
              hotspot_id: hotspotId || null,
              camera_position: stop.camera_position,
              camera_target: stop.camera_target,
              narration_text: stop.narration_text,
              duration_seconds: stop.duration_seconds,
              scripture_overlay: stop.scripture_overlay
            });

          if (insertError) throw insertError;
        }

        console.log(`   ✅ Created tour: ${tourData.tour_name}\n`);
      }
    }

    console.log('🎉 All 3D sanctuary models, hotspots, and tours seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Models: ${sanctuaryModels.length}`);
    console.log(`   - Total Hotspots: ${tabernacleHotspots.length + solomonHotspots.length + herodHotspots.length + heavenlyHotspots.length}`);
    console.log(`   - Measurements: ${tabernacleМeasurements.length}`);
    console.log(`   - Guided Tours: 2`);
    console.log(`   - Tour Stops: ${tabernacleIntroStops.length + tabernacleSymbolismStops.length}\n`);

  } catch (error) {
    console.error('❌ Error seeding 3D models:', error);
    throw error;
  }
}

seedModelsAndHotspots()
  .then(() => {
    console.log('✅ Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
