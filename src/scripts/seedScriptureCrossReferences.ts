import { supabase } from '../lib/supabase';

interface CrossReferenceLink {
  primary_reference: string;
  related_reference: string;
  relationship_type: 'parallel' | 'fulfillment' | 'contrast' | 'elaboration';
  explanation: string;
}

const crossReferenceLinks: CrossReferenceLink[] = [
  // Ark of the Covenant Cross-References
  {
    primary_reference: 'Exodus 25:10-22',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The earthly Ark was a pattern of the heavenly reality where Christ ministers as High Priest.'
  },
  {
    primary_reference: 'Exodus 25:10-22',
    related_reference: 'Revelation 11:19',
    relationship_type: 'fulfillment',
    explanation: 'John sees the Ark of God\'s testament in the heavenly temple, revealing the opening of the Most Holy Place in 1844.'
  },
  {
    primary_reference: 'Exodus 25:10-22',
    related_reference: 'Leviticus 16:1-34',
    relationship_type: 'elaboration',
    explanation: 'The Day of Atonement service centered on the Ark and mercy seat in the Most Holy Place.'
  },

  // Golden Lampstand Cross-References
  {
    primary_reference: 'Exodus 25:31-40',
    related_reference: 'Revelation 4:1-11',
    relationship_type: 'parallel',
    explanation: 'The seven lamps of fire before God\'s throne correspond to the seven-branched lampstand in the earthly sanctuary.'
  },
  {
    primary_reference: 'Exodus 25:31-40',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The lampstand in the earthly sanctuary was a copy and shadow of the heavenly reality.'
  },

  // Table of Showbread Cross-References
  {
    primary_reference: 'Exodus 25:23-30',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The Table of Showbread represented God\'s continual provision, fulfilled in Christ as the Bread of Life.'
  },

  // Altar of Burnt Offering Cross-References
  {
    primary_reference: 'Exodus 27:1-8',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The bronze altar where sacrifices were offered foreshadowed Christ\'s ultimate sacrifice on the cross.'
  },
  {
    primary_reference: 'Exodus 27:1-8',
    related_reference: 'John 2:13-22',
    relationship_type: 'fulfillment',
    explanation: 'Christ spoke of His body as the temple, connecting the sanctuary sacrifices to His own sacrifice.'
  },

  // Altar of Incense Cross-References
  {
    primary_reference: 'Exodus 30:1-10',
    related_reference: 'Revelation 8:1-5',
    relationship_type: 'parallel',
    explanation: 'The golden altar in heaven where the prayers of the saints are offered, like the incense altar on earth.'
  },
  {
    primary_reference: 'Exodus 30:1-10',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The incense altar represented prayer and intercession, fulfilled in Christ\'s heavenly intercession.'
  },

  // Bronze Laver Cross-References
  {
    primary_reference: 'Exodus 30:17-21',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The laver for cleansing pointed to the spiritual cleansing available through Christ.'
  },

  // Day of Atonement Cross-References
  {
    primary_reference: 'Leviticus 16:1-34',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'The Day of Atonement ritual was a shadow of Christ\'s ministry in the heavenly sanctuary.'
  },
  {
    primary_reference: 'Leviticus 16:1-34',
    related_reference: 'Daniel 8:14',
    relationship_type: 'fulfillment',
    explanation: 'The cleansing of the earthly sanctuary on the Day of Atonement prefigured the cleansing of the heavenly sanctuary beginning in 1844.'
  },
  {
    primary_reference: 'Leviticus 16:1-34',
    related_reference: 'Daniel 7:9-14',
    relationship_type: 'fulfillment',
    explanation: 'The judgment scene in Daniel corresponds to the Day of Atonement investigative judgment in the heavenly sanctuary.'
  },

  // Solomon's Temple Cross-References
  {
    primary_reference: '1 Kings 6:1-38',
    related_reference: 'Exodus 25:10-22',
    relationship_type: 'elaboration',
    explanation: 'Solomon\'s temple was built following the same pattern as the tabernacle, but as a permanent structure.'
  },
  {
    primary_reference: '1 Kings 6:1-38',
    related_reference: 'John 2:13-22',
    relationship_type: 'contrast',
    explanation: 'Jesus contrasted the earthly temple with His body, the true temple that would be raised in three days.'
  },

  // Temple Destruction Cross-References
  {
    primary_reference: 'Matthew 24:1-2',
    related_reference: '1 Kings 6:1-38',
    relationship_type: 'contrast',
    explanation: 'Jesus prophesied the destruction of the magnificent temple Solomon built, fulfilled in 70 AD.'
  },

  // Heavenly Sanctuary Cross-References
  {
    primary_reference: 'Hebrews 8:1-6',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'elaboration',
    explanation: 'Both passages explain Christ\'s ministry in the true, heavenly sanctuary.'
  },
  {
    primary_reference: 'Hebrews 8:1-6',
    related_reference: 'Exodus 25:10-22',
    relationship_type: 'fulfillment',
    explanation: 'The heavenly sanctuary where Christ ministers is the reality of which the earthly sanctuary was a copy.'
  },
  {
    primary_reference: 'Hebrews 9:1-28',
    related_reference: 'Leviticus 16:1-34',
    relationship_type: 'fulfillment',
    explanation: 'Christ fulfilled the Day of Atonement by entering the heavenly Most Holy Place with His own blood.'
  },

  // Throne Room Vision Cross-References
  {
    primary_reference: 'Revelation 4:1-11',
    related_reference: 'Revelation 5:1-14',
    relationship_type: 'elaboration',
    explanation: 'Both visions show the heavenly throne room and worship before God, with chapter 5 revealing Christ\'s worthiness.'
  },
  {
    primary_reference: 'Revelation 4:1-11',
    related_reference: 'Daniel 7:9-14',
    relationship_type: 'parallel',
    explanation: 'Both Daniel and John see visions of God\'s throne and the judgment scene in heaven.'
  },
  {
    primary_reference: 'Revelation 4:1-11',
    related_reference: 'Exodus 25:31-40',
    relationship_type: 'fulfillment',
    explanation: 'The seven lamps of fire before the throne correspond to the seven-branched lampstand in the earthly sanctuary.'
  },

  // Lamb and Scroll Cross-References
  {
    primary_reference: 'Revelation 5:1-14',
    related_reference: 'Exodus 25:10-22',
    relationship_type: 'fulfillment',
    explanation: 'Christ, the Lamb, is worthy to approach God\'s throne, fulfilling the role of the mercy seat where blood was sprinkled.'
  },
  {
    primary_reference: 'Revelation 5:1-14',
    related_reference: 'Daniel 7:9-14',
    relationship_type: 'parallel',
    explanation: 'The Son of Man coming to the Ancient of Days parallels the Lamb approaching the throne.'
  },

  // Golden Altar in Heaven Cross-References
  {
    primary_reference: 'Revelation 8:1-5',
    related_reference: 'Exodus 30:1-10',
    relationship_type: 'fulfillment',
    explanation: 'The golden altar in heaven where prayers ascend fulfills the altar of incense in the earthly sanctuary.'
  },

  // Ark in Heavenly Temple Cross-References
  {
    primary_reference: 'Revelation 11:19',
    related_reference: 'Exodus 25:10-22',
    relationship_type: 'fulfillment',
    explanation: 'The Ark seen in heaven is the reality of which the earthly Ark was a pattern.'
  },
  {
    primary_reference: 'Revelation 11:19',
    related_reference: 'Daniel 8:14',
    relationship_type: 'fulfillment',
    explanation: 'The opening of the heavenly temple revealing the Ark marks the beginning of the judgment and cleansing of the sanctuary.'
  },
  {
    primary_reference: 'Revelation 11:19',
    related_reference: 'Daniel 7:9-14',
    relationship_type: 'parallel',
    explanation: 'Both passages describe the opening of the heavenly Most Holy Place for the judgment.'
  },

  // Judgment Scene Cross-References
  {
    primary_reference: 'Daniel 7:9-14',
    related_reference: 'Daniel 8:14',
    relationship_type: 'elaboration',
    explanation: 'The 2300-day prophecy marks the time when the judgment scene in Daniel 7 begins.'
  },
  {
    primary_reference: 'Daniel 7:9-14',
    related_reference: 'Leviticus 16:1-34',
    relationship_type: 'fulfillment',
    explanation: 'The judgment scene is the heavenly fulfillment of the Day of Atonement investigative work.'
  },
  {
    primary_reference: 'Daniel 7:9-14',
    related_reference: 'Revelation 4:1-11',
    relationship_type: 'parallel',
    explanation: 'Both visions show the throne of God and the judgment/worship scene in heaven.'
  },

  // 2300 Day Prophecy Cross-References
  {
    primary_reference: 'Daniel 8:14',
    related_reference: 'Leviticus 16:1-34',
    relationship_type: 'fulfillment',
    explanation: 'The cleansing of the sanctuary in 1844 fulfills the Day of Atonement pattern on a cosmic scale.'
  },
  {
    primary_reference: 'Daniel 8:14',
    related_reference: 'Hebrews 9:1-28',
    relationship_type: 'fulfillment',
    explanation: 'Christ entered the heavenly Most Holy Place in 1844 to cleanse the sanctuary and begin the final phase of His priestly ministry.'
  },
  {
    primary_reference: 'Daniel 8:14',
    related_reference: 'Revelation 11:19',
    relationship_type: 'parallel',
    explanation: 'The opening of the heavenly temple showing the Ark corresponds to the commencement of the sanctuary cleansing in 1844.'
  }
];

export async function seedScriptureCrossReferences() {
  try {
    console.log('🌱 Starting Scripture Cross-References Seeding...\n');

    let insertedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const link of crossReferenceLinks) {
      try {
        // Get primary passage ID
        const { data: primaryPassage } = await supabase
          .from('scripture_passages')
          .select('id')
          .eq('reference', link.primary_reference)
          .maybeSingle();

        if (!primaryPassage) {
          console.log(`   ⚠ Primary passage "${link.primary_reference}" not found, skipping...`);
          skippedCount++;
          continue;
        }

        // Get related passage ID
        const { data: relatedPassage } = await supabase
          .from('scripture_passages')
          .select('id')
          .eq('reference', link.related_reference)
          .maybeSingle();

        if (!relatedPassage) {
          console.log(`   ⚠ Related passage "${link.related_reference}" not found, skipping...`);
          skippedCount++;
          continue;
        }

        // Check if cross-reference already exists
        const { data: existing } = await supabase
          .from('scripture_cross_references')
          .select('id')
          .eq('primary_passage_id', primaryPassage.id)
          .eq('related_passage_id', relatedPassage.id)
          .maybeSingle();

        if (existing) {
          console.log(`   ✓ Cross-reference already exists: ${link.primary_reference} → ${link.related_reference}`);
          skippedCount++;
          continue;
        }

        // Insert cross-reference
        const { error: insertError } = await supabase
          .from('scripture_cross_references')
          .insert([{
            primary_passage_id: primaryPassage.id,
            related_passage_id: relatedPassage.id,
            relationship_type: link.relationship_type,
            explanation: link.explanation
          }]);

        if (insertError) {
          console.error(`   ✗ Error inserting cross-reference:`, insertError.message);
          errorCount++;
        } else {
          console.log(`   ✓ Inserted: ${link.primary_reference} → ${link.related_reference} (${link.relationship_type})`);
          insertedCount++;
        }
      } catch (err) {
        console.error(`   ✗ Error processing cross-reference:`, err);
        errorCount++;
      }
    }

    console.log('\n✅ Scripture Cross-References Seeding Complete!');
    console.log(`📊 Total links processed: ${crossReferenceLinks.length}`);
    console.log(`   ✓ Inserted: ${insertedCount}`);
    console.log(`   ⚠ Skipped: ${skippedCount}`);
    console.log(`   ✗ Errors: ${errorCount}`);
  } catch (error) {
    console.error('❌ Fatal error during cross-reference seeding:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedScriptureCrossReferences()
    .then(() => {
      console.log('\n🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed:', error);
      process.exit(1);
    });
}
