import { supabase } from '../lib/supabase';

interface DiagramData {
  diagram_type: 'sanctuary_comparison' | 'type_antitype' | 'ministry_phases' | 'prophecy_timeline';
  title: string;
  description: string;
  display_order: number;
  viewbox: string;
  elements: DiagramElementData[];
}

interface DiagramElementData {
  element_type: 'box' | 'arrow' | 'label' | 'icon' | 'image' | 'line';
  element_data: Record<string, any>;
  position: { x: number; y: number; width: number; height: number };
  related_scripture_ref?: string;
  interactive: boolean;
  style: Record<string, any>;
  display_order: number;
}

const diagrams: DiagramData[] = [
  // Diagram 1: Sanctuary Comparison
  {
    diagram_type: 'sanctuary_comparison',
    title: 'Earthly vs Heavenly Sanctuary Comparison',
    description: 'Side-by-side comparison showing how the earthly sanctuary structure typifies the heavenly sanctuary where Christ ministers.',
    display_order: 1,
    viewbox: '0 0 1400 900',
    elements: [
      // Title
      {
        element_type: 'label',
        element_data: { text: 'EARTHLY SANCTUARY (Type)', fontSize: 28, fontWeight: 'bold' },
        position: { x: 150, y: 50, width: 400, height: 40 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 1
      },
      {
        element_type: 'label',
        element_data: { text: 'HEAVENLY SANCTUARY (Antitype)', fontSize: 28, fontWeight: 'bold' },
        position: { x: 850, y: 50, width: 400, height: 40 },
        interactive: false,
        style: { fill: '#742a2a', textAlign: 'center' },
        display_order: 2
      },

      // Earthly Most Holy Place
      {
        element_type: 'box',
        element_data: { label: 'Most Holy Place', sublabel: 'Holy of Holies' },
        position: { x: 150, y: 150, width: 400, height: 200 },
        related_scripture_ref: 'Exodus 26:33-34',
        interactive: true,
        style: { fill: '#edf2f7', stroke: '#2c5282', strokeWidth: 3, borderRadius: 8 },
        display_order: 3
      },
      {
        element_type: 'label',
        element_data: { text: '• Ark of the Covenant', fontSize: 16 },
        position: { x: 180, y: 190, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 25:10-22',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 4
      },
      {
        element_type: 'label',
        element_data: { text: '• Mercy Seat', fontSize: 16 },
        position: { x: 180, y: 220, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 25:17',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 5
      },
      {
        element_type: 'label',
        element_data: { text: '• Ten Commandments', fontSize: 16 },
        position: { x: 180, y: 250, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 25:16',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 6
      },
      {
        element_type: 'label',
        element_data: { text: '• Entered once yearly', fontSize: 14, fontStyle: 'italic' },
        position: { x: 180, y: 290, width: 340, height: 25 },
        related_scripture_ref: 'Leviticus 16:2',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 7
      },

      // Earthly Holy Place
      {
        element_type: 'box',
        element_data: { label: 'Holy Place', sublabel: 'First Apartment' },
        position: { x: 150, y: 400, width: 400, height: 250 },
        related_scripture_ref: 'Exodus 26:31-33',
        interactive: true,
        style: { fill: '#f7fafc', stroke: '#2c5282', strokeWidth: 3, borderRadius: 8 },
        display_order: 8
      },
      {
        element_type: 'label',
        element_data: { text: '• Table of Showbread', fontSize: 16 },
        position: { x: 180, y: 450, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 25:23-30',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 9
      },
      {
        element_type: 'label',
        element_data: { text: '• Golden Candlestick', fontSize: 16 },
        position: { x: 180, y: 480, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 25:31-40',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 10
      },
      {
        element_type: 'label',
        element_data: { text: '• Altar of Incense', fontSize: 16 },
        position: { x: 180, y: 510, width: 340, height: 25 },
        related_scripture_ref: 'Exodus 30:1-10',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 11
      },
      {
        element_type: 'label',
        element_data: { text: '• Daily ministry', fontSize: 14, fontStyle: 'italic' },
        position: { x: 180, y: 560, width: 340, height: 25 },
        related_scripture_ref: 'Hebrews 9:6',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 12
      },

      // Heavenly Most Holy Place
      {
        element_type: 'box',
        element_data: { label: 'Most Holy Place', sublabel: 'Throne Room of God' },
        position: { x: 850, y: 150, width: 400, height: 200 },
        related_scripture_ref: 'Hebrews 9:24',
        interactive: true,
        style: { fill: '#fff5f5', stroke: '#742a2a', strokeWidth: 3, borderRadius: 8 },
        display_order: 13
      },
      {
        element_type: 'label',
        element_data: { text: '• Throne of God', fontSize: 16 },
        position: { x: 880, y: 190, width: 340, height: 25 },
        related_scripture_ref: 'Revelation 4:2',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 14
      },
      {
        element_type: 'label',
        element_data: { text: '• Ark with Law of God', fontSize: 16 },
        position: { x: 880, y: 220, width: 340, height: 25 },
        related_scripture_ref: 'Revelation 11:19',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 15
      },
      {
        element_type: 'label',
        element_data: { text: '• Books of Judgment', fontSize: 16 },
        position: { x: 880, y: 250, width: 340, height: 25 },
        related_scripture_ref: 'Daniel 7:10',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 16
      },
      {
        element_type: 'label',
        element_data: { text: '• Christ entered 1844', fontSize: 14, fontStyle: 'italic' },
        position: { x: 880, y: 290, width: 340, height: 25 },
        related_scripture_ref: 'Daniel 8:14',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 17
      },

      // Heavenly Holy Place
      {
        element_type: 'box',
        element_data: { label: 'Holy Place', sublabel: 'First Apartment' },
        position: { x: 850, y: 400, width: 400, height: 250 },
        related_scripture_ref: 'Hebrews 9:11-12',
        interactive: true,
        style: { fill: '#fffaf0', stroke: '#742a2a', strokeWidth: 3, borderRadius: 8 },
        display_order: 18
      },
      {
        element_type: 'label',
        element_data: { text: '• Ministry of Intercession', fontSize: 16 },
        position: { x: 880, y: 450, width: 340, height: 25 },
        related_scripture_ref: 'Hebrews 7:25',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 19
      },
      {
        element_type: 'label',
        element_data: { text: '• Application of Blood', fontSize: 16 },
        position: { x: 880, y: 480, width: 340, height: 25 },
        related_scripture_ref: 'Hebrews 9:12',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 20
      },
      {
        element_type: 'label',
        element_data: { text: '• Forgiveness of Sins', fontSize: 16 },
        position: { x: 880, y: 510, width: 340, height: 25 },
        related_scripture_ref: '1 John 1:9',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 21
      },
      {
        element_type: 'label',
        element_data: { text: '• AD 31-1844', fontSize: 14, fontStyle: 'italic' },
        position: { x: 880, y: 560, width: 340, height: 25 },
        related_scripture_ref: 'Acts 1:9',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 22
      },

      // Connecting arrows
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: 'TYPE', strokeDasharray: '10 5' },
        position: { x: 570, y: 250, width: 260, height: 10 },
        interactive: false,
        style: { stroke: '#4a5568', strokeWidth: 2 },
        display_order: 23
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'left', label: 'ANTITYPE', strokeDasharray: '10 5' },
        position: { x: 830, y: 270, width: 260, height: 10 },
        interactive: false,
        style: { stroke: '#4a5568', strokeWidth: 2 },
        display_order: 24
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: 'SHADOW', strokeDasharray: '10 5' },
        position: { x: 570, y: 525, width: 260, height: 10 },
        interactive: false,
        style: { stroke: '#4a5568', strokeWidth: 2 },
        display_order: 25
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'left', label: 'REALITY', strokeDasharray: '10 5' },
        position: { x: 830, y: 545, width: 260, height: 10 },
        interactive: false,
        style: { stroke: '#4a5568', strokeWidth: 2 },
        display_order: 26
      },

      // Scripture references
      {
        element_type: 'label',
        element_data: { text: 'Scripture: Exodus 25-40, Leviticus 16', fontSize: 14 },
        position: { x: 150, y: 700, width: 400, height: 30 },
        related_scripture_ref: 'Exodus 25:8',
        interactive: true,
        style: { fill: '#718096', textAlign: 'center' },
        display_order: 27
      },
      {
        element_type: 'label',
        element_data: { text: 'Scripture: Hebrews 8-9, Revelation 4-5, 11:19', fontSize: 14 },
        position: { x: 850, y: 700, width: 400, height: 30 },
        related_scripture_ref: 'Hebrews 8:1-2',
        interactive: true,
        style: { fill: '#718096', textAlign: 'center' },
        display_order: 28
      }
    ]
  },

  // Diagram 2: Type-Antitype Timeline
  {
    diagram_type: 'type_antitype',
    title: 'From Type to Antitype: Prophetic Fulfillment',
    description: 'Visual flow showing how Old Testament sanctuary types found their fulfillment in Christ\'s work.',
    display_order: 2,
    viewbox: '0 0 1400 700',
    elements: [
      // Title
      {
        element_type: 'label',
        element_data: { text: 'FROM TYPE TO ANTITYPE: PROPHETIC FULFILLMENT', fontSize: 32, fontWeight: 'bold' },
        position: { x: 100, y: 30, width: 1200, height: 50 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 1
      },

      // Passover Lamb
      {
        element_type: 'box',
        element_data: { label: 'Passover Lamb', sublabel: '(Exodus 12)' },
        position: { x: 100, y: 120, width: 300, height: 100 },
        related_scripture_ref: 'Exodus 12:3-13',
        interactive: true,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 8 },
        display_order: 2
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: '~1500 years' },
        position: { x: 420, y: 165, width: 280, height: 10 },
        interactive: false,
        style: { stroke: '#319795', strokeWidth: 3 },
        display_order: 3
      },
      {
        element_type: 'box',
        element_data: { label: 'Christ Crucified', sublabel: '(1 Cor 5:7, AD 31)' },
        position: { x: 720, y: 120, width: 300, height: 100 },
        related_scripture_ref: '1 Corinthians 5:7',
        interactive: true,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 8 },
        display_order: 4
      },

      // Firstfruits
      {
        element_type: 'box',
        element_data: { label: 'Firstfruits Offering', sublabel: '(Leviticus 23:10)' },
        position: { x: 100, y: 260, width: 300, height: 100 },
        related_scripture_ref: 'Leviticus 23:10-11',
        interactive: true,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 8 },
        display_order: 5
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: '~1500 years' },
        position: { x: 420, y: 305, width: 280, height: 10 },
        interactive: false,
        style: { stroke: '#319795', strokeWidth: 3 },
        display_order: 6
      },
      {
        element_type: 'box',
        element_data: { label: 'Christ\'s Resurrection', sublabel: '(1 Cor 15:20, AD 31)' },
        position: { x: 720, y: 260, width: 300, height: 100 },
        related_scripture_ref: '1 Corinthians 15:20',
        interactive: true,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 8 },
        display_order: 7
      },

      // Day of Atonement
      {
        element_type: 'box',
        element_data: { label: 'Day of Atonement', sublabel: '(Leviticus 16)' },
        position: { x: 100, y: 400, width: 300, height: 100 },
        related_scripture_ref: 'Leviticus 16:29-30',
        interactive: true,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 8 },
        display_order: 8
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: '~3300 years' },
        position: { x: 420, y: 445, width: 280, height: 10 },
        interactive: false,
        style: { stroke: '#319795', strokeWidth: 3 },
        display_order: 9
      },
      {
        element_type: 'box',
        element_data: { label: 'Investigative Judgment', sublabel: '(Dan 8:14, AD 1844)' },
        position: { x: 720, y: 400, width: 300, height: 100 },
        related_scripture_ref: 'Daniel 8:14',
        interactive: true,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 8 },
        display_order: 10
      },

      // Scapegoat
      {
        element_type: 'box',
        element_data: { label: 'Scapegoat', sublabel: '(Leviticus 16:20-22)' },
        position: { x: 100, y: 540, width: 300, height: 100 },
        related_scripture_ref: 'Leviticus 16:20-22',
        interactive: true,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 8 },
        display_order: 11
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'right', label: 'Future' },
        position: { x: 420, y: 585, width: 280, height: 10 },
        interactive: false,
        style: { stroke: '#319795', strokeWidth: 3 },
        display_order: 12
      },
      {
        element_type: 'box',
        element_data: { label: 'Satan\'s Final Judgment', sublabel: '(Rev 20:1-3, Second Advent)' },
        position: { x: 720, y: 540, width: 300, height: 100 },
        related_scripture_ref: 'Revelation 20:1-3',
        interactive: true,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 8 },
        display_order: 13
      },

      // Legend
      {
        element_type: 'box',
        element_data: { label: 'TYPE (Shadow)' },
        position: { x: 1100, y: 200, width: 180, height: 50 },
        interactive: false,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 4 },
        display_order: 14
      },
      {
        element_type: 'box',
        element_data: { label: 'ANTITYPE (Reality)' },
        position: { x: 1100, y: 270, width: 180, height: 50 },
        interactive: false,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 4 },
        display_order: 15
      }
    ]
  },

  // Diagram 3: Ministry Phases
  {
    diagram_type: 'ministry_phases',
    title: 'Christ\'s Two-Phase Heavenly Ministry',
    description: 'Timeline showing Christ\'s work in the Holy Place (AD 31-1844) and Most Holy Place (1844-Second Coming).',
    display_order: 3,
    viewbox: '0 0 1400 600',
    elements: [
      // Title
      {
        element_type: 'label',
        element_data: { text: 'CHRIST\'S HEAVENLY PRIESTLY WORK', fontSize: 32, fontWeight: 'bold' },
        position: { x: 300, y: 30, width: 800, height: 50 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 1
      },

      // Timeline bar
      {
        element_type: 'line',
        element_data: { x1: 200, y1: 120, x2: 1200, y2: 120, strokeWidth: 4 },
        position: { x: 200, y: 118, width: 1000, height: 4 },
        interactive: false,
        style: { stroke: '#4a5568' },
        display_order: 2
      },

      // AD 31 marker
      {
        element_type: 'label',
        element_data: { text: 'AD 31', fontSize: 24, fontWeight: 'bold' },
        position: { x: 180, y: 80, width: 60, height: 30 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 3
      },

      // 1844 marker
      {
        element_type: 'label',
        element_data: { text: '1844', fontSize: 24, fontWeight: 'bold' },
        position: { x: 670, y: 80, width: 60, height: 30 },
        interactive: false,
        style: { fill: '#c53030', textAlign: 'center' },
        display_order: 4
      },

      // Future marker
      {
        element_type: 'label',
        element_data: { text: 'Future', fontSize: 24, fontWeight: 'bold' },
        position: { x: 1150, y: 80, width: 100, height: 30 },
        interactive: false,
        style: { fill: '#22543d', textAlign: 'center' },
        display_order: 5
      },

      // Phase 1 box
      {
        element_type: 'box',
        element_data: { label: 'PHASE 1: HOLY PLACE MINISTRY' },
        position: { x: 220, y: 160, width: 460, height: 350 },
        related_scripture_ref: 'Hebrews 9:6',
        interactive: true,
        style: { fill: '#ebf8ff', stroke: '#2c5282', strokeWidth: 3, borderRadius: 8 },
        display_order: 6
      },
      {
        element_type: 'label',
        element_data: { text: 'DAILY MINISTRY', fontSize: 24, fontWeight: 'bold' },
        position: { x: 250, y: 190, width: 400, height: 35 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 7
      },
      {
        element_type: 'label',
        element_data: { text: '• Forgiveness of sins', fontSize: 18 },
        position: { x: 260, y: 250, width: 380, height: 30 },
        related_scripture_ref: '1 John 1:9',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 8
      },
      {
        element_type: 'label',
        element_data: { text: '• Intercession for believers', fontSize: 18 },
        position: { x: 260, y: 285, width: 380, height: 30 },
        related_scripture_ref: 'Hebrews 7:25',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 9
      },
      {
        element_type: 'label',
        element_data: { text: '• Application of Christ\'s blood', fontSize: 18 },
        position: { x: 260, y: 320, width: 380, height: 30 },
        related_scripture_ref: 'Hebrews 9:12',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 10
      },
      {
        element_type: 'label',
        element_data: { text: 'Antitype: Daily sacrifice (Lev 4)', fontSize: 16, fontStyle: 'italic' },
        position: { x: 260, y: 380, width: 380, height: 30 },
        related_scripture_ref: 'Leviticus 4:27-31',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 11
      },
      {
        element_type: 'label',
        element_data: { text: 'Duration: AD 31 - 1844 (1813 years)', fontSize: 16, fontStyle: 'italic' },
        position: { x: 260, y: 450, width: 380, height: 30 },
        interactive: false,
        style: { fill: '#718096' },
        display_order: 12
      },

      // Phase 2 box
      {
        element_type: 'box',
        element_data: { label: 'PHASE 2: MOST HOLY PLACE MINISTRY' },
        position: { x: 720, y: 160, width: 460, height: 350 },
        related_scripture_ref: 'Hebrews 9:7',
        interactive: true,
        style: { fill: '#fff5f5', stroke: '#c53030', strokeWidth: 3, borderRadius: 8 },
        display_order: 13
      },
      {
        element_type: 'label',
        element_data: { text: 'YEARLY MINISTRY', fontSize: 24, fontWeight: 'bold' },
        position: { x: 750, y: 190, width: 400, height: 35 },
        interactive: false,
        style: { fill: '#c53030', textAlign: 'center' },
        display_order: 14
      },
      {
        element_type: 'label',
        element_data: { text: '• Blotting out of sins', fontSize: 18 },
        position: { x: 760, y: 250, width: 380, height: 30 },
        related_scripture_ref: 'Acts 3:19',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 15
      },
      {
        element_type: 'label',
        element_data: { text: '• Investigative judgment', fontSize: 18 },
        position: { x: 760, y: 285, width: 380, height: 30 },
        related_scripture_ref: 'Daniel 7:9-10',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 16
      },
      {
        element_type: 'label',
        element_data: { text: '• Cleansing of sanctuary', fontSize: 18 },
        position: { x: 760, y: 320, width: 380, height: 30 },
        related_scripture_ref: 'Daniel 8:14',
        interactive: true,
        style: { fill: '#2d3748' },
        display_order: 17
      },
      {
        element_type: 'label',
        element_data: { text: 'Antitype: Day of Atonement (Lev 16)', fontSize: 16, fontStyle: 'italic' },
        position: { x: 760, y: 380, width: 380, height: 30 },
        related_scripture_ref: 'Leviticus 16:30',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 18
      },
      {
        element_type: 'label',
        element_data: { text: 'Duration: 1844 - Second Coming', fontSize: 16, fontStyle: 'italic' },
        position: { x: 760, y: 450, width: 380, height: 30 },
        interactive: false,
        style: { fill: '#718096' },
        display_order: 19
      },

      // References
      {
        element_type: 'label',
        element_data: { text: 'References: Hebrews 9:6-7, Daniel 8:14, Acts 3:19, Leviticus 16', fontSize: 14 },
        position: { x: 300, y: 540, width: 800, height: 30 },
        related_scripture_ref: 'Hebrews 9:6-7',
        interactive: true,
        style: { fill: '#718096', textAlign: 'center' },
        display_order: 20
      }
    ]
  },

  // Diagram 4: 2300 Days Prophecy
  {
    diagram_type: 'prophecy_timeline',
    title: '2300 Day Prophecy Timeline',
    description: 'Visual representation of Daniel 8:14 showing the 2300 prophetic days from 457 BC to AD 1844.',
    display_order: 4,
    viewbox: '0 0 1400 700',
    elements: [
      // Title
      {
        element_type: 'label',
        element_data: { text: '2300 DAY PROPHECY TIMELINE (Daniel 8:14)', fontSize: 32, fontWeight: 'bold' },
        position: { x: 200, y: 30, width: 1000, height: 50 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 1
      },

      // Main timeline
      {
        element_type: 'line',
        element_data: { x1: 200, y1: 200, x2: 1200, y2: 200, strokeWidth: 6 },
        position: { x: 200, y: 197, width: 1000, height: 6 },
        interactive: false,
        style: { stroke: '#2c5282' },
        display_order: 2
      },

      // 457 BC marker
      {
        element_type: 'label',
        element_data: { text: '457 BC', fontSize: 28, fontWeight: 'bold' },
        position: { x: 150, y: 140, width: 100, height: 40 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 3
      },
      {
        element_type: 'box',
        element_data: { label: 'Decree to Restore Jerusalem', sublabel: '(Daniel 9:25)' },
        position: { x: 100, y: 240, width: 200, height: 100 },
        related_scripture_ref: 'Daniel 9:25',
        interactive: true,
        style: { fill: '#e6fffa', stroke: '#319795', strokeWidth: 2, borderRadius: 8 },
        display_order: 4
      },

      // 70 weeks section
      {
        element_type: 'box',
        element_data: { label: '70 WEEKS (490 years)', sublabel: 'Dan 9:24-27' },
        position: { x: 320, y: 120, width: 240, height: 60 },
        related_scripture_ref: 'Daniel 9:24-27',
        interactive: true,
        style: { fill: '#fef5e7', stroke: '#d69e2e', strokeWidth: 2, borderRadius: 8 },
        display_order: 5
      },
      {
        element_type: 'arrow',
        element_data: { direction: 'down' },
        position: { x: 440, y: 185, width: 2, height: 30 },
        interactive: false,
        style: { stroke: '#d69e2e', strokeWidth: 2 },
        display_order: 6
      },

      // AD 27 marker
      {
        element_type: 'label',
        element_data: { text: 'AD 27', fontSize: 20 },
        position: { x: 400, y: 250, width: 80, height: 30 },
        related_scripture_ref: 'Luke 3:1',
        interactive: true,
        style: { fill: '#2d3748', textAlign: 'center' },
        display_order: 7
      },
      {
        element_type: 'label',
        element_data: { text: 'Messiah Baptized', fontSize: 16 },
        position: { x: 360, y: 280, width: 160, height: 25 },
        interactive: false,
        style: { fill: '#718096', textAlign: 'center' },
        display_order: 8
      },

      // AD 31 marker
      {
        element_type: 'label',
        element_data: { text: 'AD 31', fontSize: 20 },
        position: { x: 540, y: 250, width: 80, height: 30 },
        related_scripture_ref: 'Daniel 9:27',
        interactive: true,
        style: { fill: '#c53030', textAlign: 'center' },
        display_order: 9
      },
      {
        element_type: 'label',
        element_data: { text: 'Messiah Cut Off', fontSize: 16 },
        position: { x: 500, y: 280, width: 160, height: 25 },
        interactive: false,
        style: { fill: '#718096', textAlign: 'center' },
        display_order: 10
      },

      // 1844 marker
      {
        element_type: 'label',
        element_data: { text: '1844 AD', fontSize: 28, fontWeight: 'bold' },
        position: { x: 1150, y: 140, width: 100, height: 40 },
        interactive: false,
        style: { fill: '#c53030', textAlign: 'center' },
        display_order: 11
      },
      {
        element_type: 'box',
        element_data: { label: 'Cleansing of Sanctuary Begins', sublabel: '(Dan 8:14)' },
        position: { x: 1100, y: 240, width: 200, height: 100 },
        related_scripture_ref: 'Daniel 8:14',
        interactive: true,
        style: { fill: '#fed7d7', stroke: '#c53030', strokeWidth: 2, borderRadius: 8 },
        display_order: 12
      },

      // 2300 years label
      {
        element_type: 'label',
        element_data: { text: '2300 PROPHETIC DAYS = 2300 LITERAL YEARS', fontSize: 24, fontWeight: 'bold' },
        position: { x: 400, y: 420, width: 600, height: 40 },
        interactive: false,
        style: { fill: '#2c5282', textAlign: 'center' },
        display_order: 13
      },

      // Explanation boxes
      {
        element_type: 'box',
        element_data: { label: 'Year-Day Principle' },
        position: { x: 200, y: 500, width: 280, height: 150 },
        related_scripture_ref: 'Numbers 14:34',
        interactive: true,
        style: { fill: '#f7fafc', stroke: '#4a5568', strokeWidth: 2, borderRadius: 8 },
        display_order: 14
      },
      {
        element_type: 'label',
        element_data: { text: 'One prophetic day = One literal year', fontSize: 16 },
        position: { x: 220, y: 530, width: 240, height: 25 },
        interactive: false,
        style: { fill: '#2d3748' },
        display_order: 15
      },
      {
        element_type: 'label',
        element_data: { text: 'Numbers 14:34', fontSize: 14 },
        position: { x: 220, y: 560, width: 240, height: 20 },
        related_scripture_ref: 'Numbers 14:34',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 16
      },
      {
        element_type: 'label',
        element_data: { text: 'Ezekiel 4:6', fontSize: 14 },
        position: { x: 220, y: 585, width: 240, height: 20 },
        related_scripture_ref: 'Ezekiel 4:6',
        interactive: true,
        style: { fill: '#718096' },
        display_order: 17
      },

      {
        element_type: 'box',
        element_data: { label: 'Starting Point' },
        position: { x: 560, y: 500, width: 280, height: 150 },
        related_scripture_ref: 'Ezra 7:11-26',
        interactive: true,
        style: { fill: '#f7fafc', stroke: '#4a5568', strokeWidth: 2, borderRadius: 8 },
        display_order: 18
      },
      {
        element_type: 'label',
        element_data: { text: '457 BC - Artaxerxes\' decree', fontSize: 16 },
        position: { x: 580, y: 530, width: 240, height: 25 },
        interactive: false,
        style: { fill: '#2d3748' },
        display_order: 19
      },
      {
        element_type: 'label',
        element_data: { text: 'to restore Jerusalem', fontSize: 14 },
        position: { x: 580, y: 560, width: 240, height: 20 },
        interactive: false,
        style: { fill: '#718096' },
        display_order: 20
      },

      {
        element_type: 'box',
        element_data: { label: 'Endpoint' },
        position: { x: 920, y: 500, width: 280, height: 150 },
        related_scripture_ref: 'Leviticus 16:30',
        interactive: true,
        style: { fill: '#f7fafc', stroke: '#4a5568', strokeWidth: 2, borderRadius: 8 },
        display_order: 21
      },
      {
        element_type: 'label',
        element_data: { text: 'October 22, 1844', fontSize: 16 },
        position: { x: 940, y: 530, width: 240, height: 25 },
        interactive: false,
        style: { fill: '#2d3748' },
        display_order: 22
      },
      {
        element_type: 'label',
        element_data: { text: 'Day of Atonement begins', fontSize: 14 },
        position: { x: 940, y: 560, width: 240, height: 20 },
        interactive: false,
        style: { fill: '#718096' },
        display_order: 23
      }
    ]
  }
];

export async function seedDiagrams() {
  try {
    console.log('Starting diagrams seeding...');

    for (const diagram of diagrams) {
      // Insert diagram
      const { data: insertedDiagram, error: diagramError } = await supabase
        .from('crosier_diagrams')
        .insert({
          diagram_type: diagram.diagram_type,
          title: diagram.title,
          description: diagram.description,
          display_order: diagram.display_order,
          viewbox: diagram.viewbox
        })
        .select()
        .single();

      if (diagramError) {
        console.error(`Error inserting diagram ${diagram.title}:`, diagramError);
        throw diagramError;
      }

      console.log(`✅ Inserted diagram: ${diagram.title}`);

      // Insert diagram elements
      const elementsToInsert = diagram.elements.map(element => ({
        diagram_id: insertedDiagram.id,
        element_type: element.element_type,
        element_data: element.element_data,
        position: element.position,
        related_scripture_ref: element.related_scripture_ref || null,
        related_chapter_id: null,
        interactive: element.interactive,
        style: element.style,
        display_order: element.display_order
      }));

      // Insert elements in batches
      const batchSize = 10;
      for (let i = 0; i < elementsToInsert.length; i += batchSize) {
        const batch = elementsToInsert.slice(i, i + batchSize);
        const { error: elementsError } = await supabase
          .from('crosier_diagram_elements')
          .insert(batch);

        if (elementsError) {
          console.error(`Error inserting elements for ${diagram.title}:`, elementsError);
          throw elementsError;
        }

        console.log(`  Inserted elements batch ${i / batchSize + 1}`);
      }

      console.log(`✅ Completed ${diagram.title} with ${elementsToInsert.length} elements`);
    }

    console.log(`✅ Successfully seeded all ${diagrams.length} diagrams`);
    return { success: true, count: diagrams.length };
  } catch (error) {
    console.error('❌ Error seeding diagrams:', error);
    return { success: false, error };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDiagrams().then(result => {
    console.log('Seeding complete:', result);
    process.exit(result.success ? 0 : 1);
  });
}
