import { supabase } from '../lib/supabase';

interface ConceptData {
  concept_name: string;
  concept_type: 'type' | 'antitype' | 'doctrine' | 'symbol' | 'prophecy' | 'teaching';
  description: string;
  scripture_foundation: string[];
  related_chapters: number[];
  old_testament_type?: string;
  new_testament_antitype?: string;
  significance: string;
}

interface RelationshipData {
  from_concept: string;
  to_concept: string;
  relationship_type: 'fulfills' | 'parallels' | 'contrasts' | 'illuminates' | 'prefigures' | 'completes';
  description: string;
}

// Core typological concepts from "The Cross and Its Shadow"
const concepts: ConceptData[] = [
  // Sanctuary Types
  {
    concept_name: 'Wilderness Tabernacle',
    concept_type: 'type',
    description: 'The portable sanctuary built by Moses according to the heavenly pattern. Every element was a shadow of Christ and His redemptive work.',
    scripture_foundation: ['Exodus 25:8-9', 'Exodus 25:40', 'Hebrews 8:5'],
    related_chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    old_testament_type: 'Earthly tabernacle made with hands',
    new_testament_antitype: 'Heavenly sanctuary where Christ ministers',
    significance: 'Demonstrated God\'s desire to dwell among His people and revealed the plan of salvation through symbols'
  },
  {
    concept_name: 'Heavenly Sanctuary',
    concept_type: 'antitype',
    description: 'The true tabernacle in heaven where Christ serves as High Priest, of which the earthly sanctuary was only a copy and shadow.',
    scripture_foundation: ['Hebrews 8:1-2', 'Hebrews 9:11-12', 'Revelation 11:19'],
    related_chapters: [1, 43, 44, 45, 46],
    significance: 'The reality of which the earthly was a shadow. Christ ministers here on behalf of believers.'
  },

  // Priesthood Types
  {
    concept_name: 'Aaronic Priesthood',
    concept_type: 'type',
    description: 'The Levitical priesthood established under Aaron, serving as mediators between God and Israel through sacrifices and intercession.',
    scripture_foundation: ['Exodus 28:1', 'Hebrews 5:1-4', 'Hebrews 7:11-12'],
    related_chapters: [11, 12, 13, 14, 15],
    old_testament_type: 'Human priests offering animal sacrifices',
    new_testament_antitype: 'Christ our High Priest offering Himself',
    significance: 'Pointed forward to Christ\'s superior priesthood and His perfect sacrifice'
  },
  {
    concept_name: 'Christ the High Priest',
    concept_type: 'antitype',
    description: 'Jesus Christ serves as our eternal High Priest after the order of Melchizedek, offering His own blood and interceding for believers.',
    scripture_foundation: ['Hebrews 4:14-16', 'Hebrews 7:26-28', 'Hebrews 8:1-2'],
    related_chapters: [11, 43, 44],
    significance: 'Fulfills all that was typified in the Aaronic priesthood. Perfect, eternal, and effective.'
  },

  // Offering Types
  {
    concept_name: 'Burnt Offering',
    concept_type: 'type',
    description: 'A voluntary offering completely consumed by fire, representing total consecration and devotion to God.',
    scripture_foundation: ['Leviticus 1:3-9', 'Leviticus 6:8-13'],
    related_chapters: [3, 16],
    old_testament_type: 'Animal completely burned on altar',
    new_testament_antitype: 'Christ\'s complete consecration to the Father\'s will',
    significance: 'Typified Christ\'s total devotion and the believer\'s call to full surrender'
  },
  {
    concept_name: 'Sin Offering',
    concept_type: 'type',
    description: 'Offering for unintentional sins, where blood was applied to the altar and the priest ate part of the offering.',
    scripture_foundation: ['Leviticus 4:1-35', 'Leviticus 6:24-30'],
    related_chapters: [19],
    old_testament_type: 'Animal sacrifice for sin with blood application',
    new_testament_antitype: 'Christ bearing our sins on the cross',
    significance: 'Demonstrated the seriousness of sin and the necessity of blood atonement'
  },
  {
    concept_name: 'Christ\'s Atoning Sacrifice',
    concept_type: 'antitype',
    description: 'Jesus Christ\'s death on the cross as the perfect, once-for-all sacrifice for sin, fulfilling all the offerings.',
    scripture_foundation: ['Hebrews 9:26', 'Hebrews 10:10-14', '1 Peter 2:24'],
    related_chapters: [3, 16, 17, 18, 19, 20],
    significance: 'The reality to which all sacrifices pointed. Complete, perfect, and eternally effective.'
  },

  // Feast Types
  {
    concept_name: 'Passover',
    concept_type: 'type',
    description: 'Annual feast commemorating Israel\'s deliverance from Egypt through the blood of a lamb without blemish.',
    scripture_foundation: ['Exodus 12:1-28', 'Leviticus 23:5'],
    related_chapters: [23],
    old_testament_type: 'Lamb\'s blood protecting from death',
    new_testament_antitype: 'Christ our Passover sacrificed for us',
    significance: 'Prefigured Christ\'s death as the Lamb of God who takes away sin'
  },
  {
    concept_name: 'Day of Atonement',
    concept_type: 'type',
    description: 'The most solemn day when the high priest entered the Most Holy Place to cleanse the sanctuary and make atonement for Israel.',
    scripture_foundation: ['Leviticus 16:1-34', 'Leviticus 23:27-32'],
    related_chapters: [15, 28],
    old_testament_type: 'Yearly cleansing of earthly sanctuary',
    new_testament_antitype: 'Investigative judgment and cleansing of heavenly sanctuary',
    significance: 'Typified Christ\'s final work of judgment beginning in 1844'
  },
  {
    concept_name: 'Feast of Tabernacles',
    concept_type: 'type',
    description: 'Joyful harvest festival celebrating God\'s provision and dwelling with His people.',
    scripture_foundation: ['Leviticus 23:33-43', 'Nehemiah 8:14-17'],
    related_chapters: [29],
    old_testament_type: 'Dwelling in booths, celebrating harvest',
    new_testament_antitype: 'Final ingathering of the redeemed and eternal dwelling with God',
    significance: 'Points to the second coming and the gathering of God\'s people'
  },

  // Prophetic/Doctrinal Concepts
  {
    concept_name: '2300 Day Prophecy',
    concept_type: 'prophecy',
    description: 'Daniel\'s prophecy of 2300 days (years) until the sanctuary would be cleansed, pointing to 1844 and the beginning of investigative judgment.',
    scripture_foundation: ['Daniel 8:14', 'Daniel 9:24-27'],
    related_chapters: [39, 40, 41, 42],
    significance: 'Cornerstone of Adventist sanctuary doctrine, revealing the time of Christ\'s final ministry'
  },
  {
    concept_name: 'Investigative Judgment',
    concept_type: 'doctrine',
    description: 'The pre-advent judgment beginning in 1844 when Christ entered the Most Holy Place to examine the cases of professed believers.',
    scripture_foundation: ['Daniel 7:9-10', 'Daniel 8:14', 'Revelation 14:6-7'],
    related_chapters: [28, 44, 45],
    significance: 'Christ\'s final work before the close of probation, determining who is ready for His return'
  },
  {
    concept_name: 'Sanctuary Cleansing',
    concept_type: 'doctrine',
    description: 'The work of removing sin from the sanctuary records, typified by the Day of Atonement and fulfilled in Christ\'s final ministry.',
    scripture_foundation: ['Leviticus 16:16-19', 'Daniel 8:14', 'Hebrews 9:23'],
    related_chapters: [28, 39, 44, 46],
    significance: 'The completion of the atonement through the blotting out of confessed sins'
  },

  // Symbols
  {
    concept_name: 'The Ark of the Covenant',
    concept_type: 'symbol',
    description: 'The most sacred article in the sanctuary, containing the Ten Commandments and representing God\'s throne and government.',
    scripture_foundation: ['Exodus 25:10-22', 'Hebrews 9:4', 'Revelation 11:19'],
    related_chapters: [8],
    significance: 'Reveals that God\'s law is the foundation of His government and central to salvation'
  },
  {
    concept_name: 'The Mercy Seat',
    concept_type: 'symbol',
    description: 'The golden cover of the ark where God\'s presence dwelt and where blood was sprinkled on the Day of Atonement.',
    scripture_foundation: ['Exodus 25:17-22', 'Leviticus 16:14-15', 'Romans 3:25'],
    related_chapters: [8, 28],
    significance: 'Where law and grace meet - God\'s justice satisfied by Christ\'s blood'
  },
  {
    concept_name: 'The Scapegoat',
    concept_type: 'symbol',
    description: 'On the Day of Atonement, one goat was sacrificed and another sent into the wilderness bearing Israel\'s sins.',
    scripture_foundation: ['Leviticus 16:7-10', 'Leviticus 16:20-22'],
    related_chapters: [28],
    significance: 'Represents the final removal of sin from the universe and Satan bearing his responsibility'
  },

  // Teachings
  {
    concept_name: 'Salvation by Grace Through Faith',
    concept_type: 'teaching',
    description: 'The sanctuary service taught that salvation comes not by works but through faith in God\'s provision, ultimately fulfilled in Christ.',
    scripture_foundation: ['Ephesians 2:8-9', 'Romans 3:24-25', 'Hebrews 11:4'],
    related_chapters: [37, 38],
    significance: 'The central message of the sanctuary - we are saved by grace alone through faith in Christ'
  },
  {
    concept_name: 'The Law and the Gospel',
    concept_type: 'teaching',
    description: 'The sanctuary reveals the harmony between God\'s unchanging law and His saving grace through Christ.',
    scripture_foundation: ['Psalm 85:10', 'Romans 3:31', 'Hebrews 4:16'],
    related_chapters: [34, 35, 38],
    significance: 'Law and grace work together - the law reveals sin, grace provides the remedy'
  },
  {
    concept_name: 'Christ\'s Continual Intercession',
    concept_type: 'teaching',
    description: 'Just as the priests ministered daily in the earthly sanctuary, Christ continually intercedes for believers in the heavenly sanctuary.',
    scripture_foundation: ['Hebrews 7:25', 'Romans 8:34', '1 John 2:1'],
    related_chapters: [14, 43],
    significance: 'Believers have constant access to God through Christ\'s ongoing ministry'
  }
];

// Relationships between concepts showing typological connections
const relationships: RelationshipData[] = [
  {
    from_concept: 'Wilderness Tabernacle',
    to_concept: 'Heavenly Sanctuary',
    relationship_type: 'prefigures',
    description: 'The earthly tabernacle was built according to the pattern of the heavenly, serving as a shadow of the true sanctuary'
  },
  {
    from_concept: 'Aaronic Priesthood',
    to_concept: 'Christ the High Priest',
    relationship_type: 'fulfills',
    description: 'The Levitical priests were types of Christ, who fulfills all their ministry in a perfect and eternal way'
  },
  {
    from_concept: 'Burnt Offering',
    to_concept: 'Christ\'s Atoning Sacrifice',
    relationship_type: 'fulfills',
    description: 'The burnt offering typified Christ\'s complete consecration and total sacrifice for humanity'
  },
  {
    from_concept: 'Sin Offering',
    to_concept: 'Christ\'s Atoning Sacrifice',
    relationship_type: 'fulfills',
    description: 'The sin offering prefigured Christ bearing our sins and making atonement through His blood'
  },
  {
    from_concept: 'Passover',
    to_concept: 'Christ\'s Atoning Sacrifice',
    relationship_type: 'fulfills',
    description: 'Christ is our Passover Lamb whose blood delivers us from death'
  },
  {
    from_concept: 'Day of Atonement',
    to_concept: 'Investigative Judgment',
    relationship_type: 'fulfills',
    description: 'The Day of Atonement typified the investigative judgment and final cleansing of the sanctuary'
  },
  {
    from_concept: 'Day of Atonement',
    to_concept: 'Sanctuary Cleansing',
    relationship_type: 'prefigures',
    description: 'The yearly cleansing of the earthly sanctuary pointed to the final cleansing of the heavenly sanctuary'
  },
  {
    from_concept: '2300 Day Prophecy',
    to_concept: 'Investigative Judgment',
    relationship_type: 'illuminates',
    description: 'The prophecy reveals when the investigative judgment would begin in 1844'
  },
  {
    from_concept: 'Investigative Judgment',
    to_concept: 'Sanctuary Cleansing',
    relationship_type: 'completes',
    description: 'The judgment leads to the cleansing and removal of all confessed sins from the sanctuary records'
  },
  {
    from_concept: 'The Ark of the Covenant',
    to_concept: 'The Law and the Gospel',
    relationship_type: 'illuminates',
    description: 'The ark containing the law with the mercy seat above reveals the harmony of law and grace'
  },
  {
    from_concept: 'The Mercy Seat',
    to_concept: 'Salvation by Grace Through Faith',
    relationship_type: 'illuminates',
    description: 'The mercy seat where blood was applied teaches salvation through Christ\'s sacrifice received by faith'
  },
  {
    from_concept: 'Feast of Tabernacles',
    to_concept: 'Heavenly Sanctuary',
    relationship_type: 'prefigures',
    description: 'Points to the final fulfillment when God will dwell with His people eternally in the new earth'
  },
  {
    from_concept: 'Aaronic Priesthood',
    to_concept: 'Christ\'s Continual Intercession',
    relationship_type: 'prefigures',
    description: 'The daily ministry of the priests typified Christ\'s ongoing intercession for believers'
  },
  {
    from_concept: 'Christ the High Priest',
    to_concept: 'Salvation by Grace Through Faith',
    relationship_type: 'illuminates',
    description: 'Christ\'s priestly ministry makes salvation available as a gift received by faith'
  },
  {
    from_concept: 'The Scapegoat',
    to_concept: 'Sanctuary Cleansing',
    relationship_type: 'illuminates',
    description: 'Represents the final removal of sin from the universe after the judgment'
  }
];

export async function seedCrossShadowConcepts() {
  try {
    console.log('Starting to seed theological concepts...');

    // Get the book
    const { data: book, error: bookError } = await supabase
      .from('cross_shadow_book')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (bookError) throw bookError;
    if (!book) {
      console.error('Book not found. Please run seedCrossShadowBook first.');
      return;
    }

    // Insert concepts
    const conceptsToInsert = concepts.map(concept => ({
      book_id: book.id,
      concept_name: concept.concept_name,
      concept_type: concept.concept_type,
      description: concept.description,
      scripture_foundation: concept.scripture_foundation,
      related_chapters: concept.related_chapters,
      old_testament_type: concept.old_testament_type,
      new_testament_antitype: concept.new_testament_antitype,
      significance: concept.significance
    }));

    const { data: insertedConcepts, error: conceptsError } = await supabase
      .from('cross_shadow_concepts')
      .insert(conceptsToInsert)
      .select();

    if (conceptsError) {
      console.error('Error inserting concepts:', conceptsError);
      return;
    }

    console.log(`Inserted ${insertedConcepts.length} theological concepts`);

    // Create concept name lookup
    const conceptLookup: { [name: string]: string } = {};
    insertedConcepts.forEach(concept => {
      conceptLookup[concept.concept_name] = concept.id;
    });

    // Insert relationships
    const relationshipsToInsert = relationships
      .map(rel => {
        const fromId = conceptLookup[rel.from_concept];
        const toId = conceptLookup[rel.to_concept];

        if (!fromId || !toId) {
          console.warn(`Skipping relationship: ${rel.from_concept} -> ${rel.to_concept} (concept not found)`);
          return null;
        }

        return {
          concept_from_id: fromId,
          concept_to_id: toId,
          relationship_type: rel.relationship_type,
          description: rel.description
        };
      })
      .filter(rel => rel !== null);

    const { error: relationshipsError } = await supabase
      .from('cross_shadow_concept_relationships')
      .insert(relationshipsToInsert);

    if (relationshipsError) {
      console.error('Error inserting relationships:', relationshipsError);
      return;
    }

    console.log(`Inserted ${relationshipsToInsert.length} concept relationships`);
    console.log('✅ Successfully seeded theological concepts and relationships!');

  } catch (error) {
    console.error('Error seeding concepts:', error);
  }
}
