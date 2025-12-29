import 'dotenv/config';
import { supabase } from '../lib/supabase';

interface ConceptRelationshipData {
  concept_from: string;
  concept_to: string;
  relationship_type: 'depends_on' | 'contrasts_with' | 'fulfills' | 'precedes' | 'supports' | 'exemplifies';
  strength: number;
  description: string;
}

const conceptRelationships: ConceptRelationshipData[] = [
  // Core Sanctuary Doctrine Relationships
  {
    concept_from: 'Heavenly Sanctuary',
    concept_to: 'Christ\'s High Priestly Ministry',
    relationship_type: 'depends_on',
    strength: 10,
    description: 'The heavenly sanctuary is the location where Christ performs His high priestly ministry. Without the heavenly sanctuary, Christ would have no place to minister.'
  },
  {
    concept_from: 'Christ\'s High Priestly Ministry',
    concept_to: 'Two-Phase Ministry',
    relationship_type: 'depends_on',
    strength: 9,
    description: 'Christ\'s high priestly work consists of two distinct phases: daily ministry in the Holy Place and yearly ministry in the Most Holy Place.'
  },
  {
    concept_from: 'Two-Phase Ministry',
    concept_to: 'Daily Atonement',
    relationship_type: 'supports',
    strength: 9,
    description: 'The first phase of Christ\'s ministry corresponds to the daily atonement services of the earthly sanctuary.'
  },
  {
    concept_from: 'Two-Phase Ministry',
    concept_to: 'Yearly Atonement',
    relationship_type: 'supports',
    strength: 9,
    description: 'The second phase of Christ\'s ministry corresponds to the yearly Day of Atonement service.'
  },
  {
    concept_from: 'Daily Atonement',
    concept_to: 'Forgiveness of Sins',
    relationship_type: 'supports',
    strength: 8,
    description: 'Through the daily ministry, Christ applies His sacrifice to forgive repentant sinners and intercedes for believers.'
  },
  {
    concept_from: 'Yearly Atonement',
    concept_to: 'Blotting Out of Sins',
    relationship_type: 'supports',
    strength: 10,
    description: 'The Day of Atonement ministry accomplishes the final blotting out and complete removal of confessed sins from the sanctuary records.'
  },
  {
    concept_from: 'Yearly Atonement',
    concept_to: 'Investigative Judgment',
    relationship_type: 'supports',
    strength: 10,
    description: 'The antitypical Day of Atonement involves examining the books to determine who has genuinely accepted Christ\'s atonement.'
  },
  {
    concept_from: 'Investigative Judgment',
    concept_to: 'Cleansing of the Sanctuary',
    relationship_type: 'depends_on',
    strength: 10,
    description: 'The investigative judgment is the process by which the heavenly sanctuary is cleansed from the record of sins.'
  },
  {
    concept_from: 'Cleansing of the Sanctuary',
    concept_to: '2300 Day Prophecy',
    relationship_type: 'fulfills',
    strength: 10,
    description: 'Daniel 8:14 prophesies that after 2300 days (years), the sanctuary will be cleansed. This was fulfilled in 1844.'
  },
  {
    concept_from: '2300 Day Prophecy',
    concept_to: 'October 22, 1844',
    relationship_type: 'fulfills',
    strength: 10,
    description: 'The 2300 prophetic days ended on October 22, 1844, when Christ began the cleansing of the heavenly sanctuary.'
  },

  // Type-Antitype Relationships
  {
    concept_from: 'Earthly Sanctuary',
    concept_to: 'Heavenly Sanctuary',
    relationship_type: 'exemplifies',
    strength: 10,
    description: 'The earthly sanctuary was a type or shadow of the true heavenly sanctuary. Every element pointed to the reality in heaven.'
  },
  {
    concept_from: 'Aaronic Priesthood',
    concept_to: 'Christ\'s High Priestly Ministry',
    relationship_type: 'exemplifies',
    strength: 10,
    description: 'The Aaronic priests were types of Christ, the true High Priest. Their work foreshadowed Christ\'s heavenly ministry.'
  },
  {
    concept_from: 'Day of Atonement (Type)',
    concept_to: 'Investigative Judgment',
    relationship_type: 'exemplifies',
    strength: 10,
    description: 'The earthly Day of Atonement ceremony was a type of the investigative judgment that began in 1844.'
  },
  {
    concept_from: 'Scapegoat as Satan',
    concept_to: 'Satan\'s Final Judgment',
    relationship_type: 'exemplifies',
    strength: 8,
    description: 'The scapegoat that bore sins into the wilderness typifies Satan bearing the ultimate responsibility for sin.'
  },

  // Prophetic Interpretation Relationships
  {
    concept_from: '2300 Day Prophecy',
    concept_to: '70 Weeks Prophecy',
    relationship_type: 'depends_on',
    strength: 9,
    description: 'The 70 weeks of Daniel 9 are "cut off" from the 2300 days, sharing the same starting point (457 BC) and validating the prophetic interpretation.'
  },
  {
    concept_from: '70 Weeks Prophecy',
    concept_to: 'Decree of Artaxerxes (457 BC)',
    relationship_type: 'depends_on',
    strength: 10,
    description: 'The 70 weeks begin with the decree to restore Jerusalem in 457 BC, establishing the starting point for both prophecies.'
  },
  {
    concept_from: 'Year-Day Principle',
    concept_to: '2300 Day Prophecy',
    relationship_type: 'supports',
    strength: 10,
    description: 'The year-day principle (one prophetic day = one literal year) is essential for understanding the 2300 days as 2300 years.'
  },
  {
    concept_from: 'Year-Day Principle',
    concept_to: '70 Weeks Prophecy',
    relationship_type: 'supports',
    strength: 10,
    description: 'The year-day principle interprets the 70 weeks as 490 years, leading precisely to Christ\'s ministry and crucifixion.'
  },

  // Soteriological (Salvation) Relationships
  {
    concept_from: 'Christ\'s Sacrifice',
    concept_to: 'Justification',
    relationship_type: 'supports',
    strength: 10,
    description: 'Christ\'s death on the cross provides justification - the legal declaration that believers are righteous through faith.'
  },
  {
    concept_from: 'Daily Atonement',
    concept_to: 'Sanctification',
    relationship_type: 'supports',
    strength: 9,
    description: 'Christ\'s daily ministry applies His sacrifice, enabling believers to grow in holiness through the Holy Spirit.'
  },
  {
    concept_from: 'Forgiveness of Sins',
    concept_to: 'Blotting Out of Sins',
    relationship_type: 'precedes',
    strength: 9,
    description: 'Sins must first be forgiven through the daily ministry before they can be permanently blotted out in the final judgment.'
  },
  {
    concept_from: 'Investigative Judgment',
    concept_to: 'Final Judgment',
    relationship_type: 'precedes',
    strength: 10,
    description: 'The investigative judgment (pre-advent judgment of believers) precedes the final executive judgment of all humanity.'
  },
  {
    concept_from: 'Cleansing of the Sanctuary',
    concept_to: 'Cleansing of God\'s People',
    relationship_type: 'supports',
    strength: 9,
    description: 'As the sanctuary is cleansed, God\'s people must also be cleansed and ready for Christ\'s return.'
  },

  // Most Holy Place Elements
  {
    concept_from: 'Ark of the Covenant',
    concept_to: 'Ten Commandments',
    relationship_type: 'depends_on',
    strength: 8,
    description: 'The ark contained the Ten Commandments, representing God\'s unchanging law as the standard of judgment.'
  },
  {
    concept_from: 'Mercy Seat',
    concept_to: 'Christ\'s Propitiation',
    relationship_type: 'exemplifies',
    strength: 9,
    description: 'The mercy seat where blood was sprinkled typifies Christ as our propitiation, where justice and mercy meet.'
  },
  {
    concept_from: 'Ten Commandments',
    concept_to: 'Investigative Judgment',
    relationship_type: 'supports',
    strength: 9,
    description: 'God\'s law is the standard by which all are judged in the investigative judgment.'
  },

  // Historical Fulfillment
  {
    concept_from: 'October 22, 1844',
    concept_to: 'Great Disappointment',
    relationship_type: 'supports',
    strength: 8,
    description: 'When Christ didn\'t return visibly on October 22, 1844, believers experienced the Great Disappointment, leading to the discovery of the sanctuary truth.'
  },
  {
    concept_from: 'Great Disappointment',
    concept_to: 'Sanctuary Truth Discovery',
    relationship_type: 'precedes',
    strength: 9,
    description: 'The disappointment forced believers to restudy the prophecies, leading to Hiram Edson\'s vision and Crosier\'s sanctuary explanation.'
  },
  {
    concept_from: 'Sanctuary Truth Discovery',
    concept_to: 'Heavenly Sanctuary',
    relationship_type: 'supports',
    strength: 10,
    description: 'The discovery after 1844 revealed that the sanctuary to be cleansed was the heavenly sanctuary, not the earth.'
  },

  // Covenantal Relationships
  {
    concept_from: 'Old Covenant',
    concept_to: 'Earthly Sanctuary',
    relationship_type: 'depends_on',
    strength: 9,
    description: 'The Old Covenant was administered through the earthly sanctuary services and Levitical priesthood.'
  },
  {
    concept_from: 'New Covenant',
    concept_to: 'Heavenly Sanctuary',
    relationship_type: 'depends_on',
    strength: 10,
    description: 'The New Covenant is administered through Christ\'s ministry in the heavenly sanctuary.'
  },
  {
    concept_from: 'Old Covenant',
    concept_to: 'New Covenant',
    relationship_type: 'precedes',
    strength: 10,
    description: 'The Old Covenant and earthly sanctuary were shadows that preceded and pointed to the New Covenant reality.'
  },

  // Books and Records
  {
    concept_from: 'Books of Heaven',
    concept_to: 'Investigative Judgment',
    relationship_type: 'depends_on',
    strength: 10,
    description: 'The investigative judgment involves examining the books of heaven to determine each person\'s destiny.'
  },
  {
    concept_from: 'Recording of Sins',
    concept_to: 'Cleansing of the Sanctuary',
    relationship_type: 'depends_on',
    strength: 9,
    description: 'As sins are confessed and forgiven, they are recorded in the sanctuary. The cleansing removes these records for those who remain faithful.'
  },

  // Eschatological (End Times) Relationships
  {
    concept_from: 'Investigative Judgment',
    concept_to: 'Close of Probation',
    relationship_type: 'precedes',
    strength: 10,
    description: 'The investigative judgment will conclude with the close of probation, when everyone\'s destiny is forever fixed.'
  },
  {
    concept_from: 'Close of Probation',
    concept_to: 'Second Coming',
    relationship_type: 'precedes',
    strength: 10,
    description: 'After the investigative judgment is complete and probation closes, Christ will return to execute the verdict.'
  },
  {
    concept_from: 'Blotting Out of Sins',
    concept_to: 'Final Atonement',
    relationship_type: 'supports',
    strength: 10,
    description: 'The blotting out of sins represents the final, complete atonement for God\'s faithful people.'
  },
  {
    concept_from: 'Scapegoat as Satan',
    concept_to: 'Close of Probation',
    relationship_type: 'precedes',
    strength: 8,
    description: 'After the sanctuary is cleansed and probation closes, Satan (the antitypical scapegoat) will bear the final responsibility for sin.'
  }
];

export async function seedConceptRelationships() {
  try {
    console.log('Starting concept relationships seeding...');

    // First, fetch all existing concepts to map names to IDs
    const { data: concepts, error: conceptsError } = await supabase
      .from('crosier_theological_concepts')
      .select('id, concept_name');

    if (conceptsError) {
      console.error('Error fetching concepts:', conceptsError);
      throw conceptsError;
    }

    console.log(`Found ${concepts?.length || 0} existing theological concepts`);

    // Create a map of concept names to IDs
    const conceptMap = new Map(
      concepts?.map(c => [c.concept_name.trim().toLowerCase(), c.id]) || []
    );

    const relationshipsToInsert = [];

    for (const rel of conceptRelationships) {
      const fromId = conceptMap.get(rel.concept_from.trim().toLowerCase());
      const toId = conceptMap.get(rel.concept_to.trim().toLowerCase());

      if (fromId && toId) {
        relationshipsToInsert.push({
          concept_from_id: fromId,
          concept_to_id: toId,
          relationship_type: rel.relationship_type,
          strength: rel.strength,
          description: rel.description
        });
      } else {
        console.warn(`Could not find concept IDs for: ${rel.concept_from} -> ${rel.concept_to}`);
      }
    }

    console.log(`Prepared ${relationshipsToInsert.length} relationships to insert`);

    // Insert relationships in batches
    const batchSize = 10;
    for (let i = 0; i < relationshipsToInsert.length; i += batchSize) {
      const batch = relationshipsToInsert.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('crosier_concept_relationships')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        throw insertError;
      }

      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(relationshipsToInsert.length / batchSize)}`);
    }

    console.log(`✅ Successfully seeded ${relationshipsToInsert.length} concept relationships`);
    return { success: true, count: relationshipsToInsert.length };
  } catch (error) {
    console.error('❌ Error seeding concept relationships:', error);
    return { success: false, error };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedConceptRelationships().then(result => {
    console.log('Seeding complete:', result);
    process.exit(result.success ? 0 : 1);
  });
}
