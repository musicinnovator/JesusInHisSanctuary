import 'dotenv/config';
import { supabase } from '../lib/supabase';

interface TheologicalConceptData {
  concept_name: string;
  definition: string;
  biblical_foundation: string[];
  chapter_references?: string[];
  related_concepts?: string[];
}

const theologicalConcepts: TheologicalConceptData[] = [
  {
    concept_name: "Christ's High Priestly Ministry",
    definition: "Christ's ongoing work as High Priest in the heavenly sanctuary, interceding for believers and applying His atoning sacrifice. Central to Crosier's argument that Christ ministers in heaven, not on earth, fulfilling the Aaronic priesthood.",
    biblical_foundation: ["Hebrews 8:1-2", "Hebrews 9:24", "Hebrews 7:25"],
    related_concepts: ["Heavenly Sanctuary", "Two-Phase Ministry", "Aaronic Priesthood"]
  },
  {
    concept_name: "Forgiveness of Sins",
    definition: "The removal of sin's guilt through faith in Christ's sacrifice, granted during the daily ministry. Part of the daily atonement phase where sins are forgiven but not yet blotted out.",
    biblical_foundation: ["1 John 1:9", "Acts 3:19", "Ephesians 1:7"],
    related_concepts: ["Daily Atonement", "Blotting Out of Sins"]
  },
  {
    concept_name: "Blotting Out of Sins",
    definition: "The final removal of the record of sins from the books of heaven during the investigative judgment. Distinguished from forgiveness; occurs during the yearly atonement phase in the Most Holy Place.",
    biblical_foundation: ["Acts 3:19", "Colossians 2:14", "Revelation 3:5"],
    related_concepts: ["Yearly Atonement", "Investigative Judgment", "Forgiveness of Sins"]
  },
  {
    concept_name: "Cleansing of the Sanctuary",
    definition: "The removal of sin's record from the heavenly sanctuary, fulfilling the Day of Atonement typology. The central event of the 2300 days prophecy, beginning in 1844.",
    biblical_foundation: ["Daniel 8:14", "Leviticus 16:30", "Hebrews 9:23"],
    related_concepts: ["Investigative Judgment", "2300 Day Prophecy", "Yearly Atonement"]
  },
  {
    concept_name: "October 22, 1844",
    definition: "The date marking the end of the 2300 days and the beginning of Christ's ministry in the Most Holy Place. The pivotal date when Christ entered the second phase of His heavenly ministry.",
    biblical_foundation: ["Daniel 8:14", "Leviticus 16"],
    related_concepts: ["2300 Day Prophecy", "Great Disappointment", "Two-Phase Ministry"]
  },
  {
    concept_name: "Earthly Sanctuary",
    definition: "The tabernacle and temples built by Israel as copies and shadows of the heavenly sanctuary. A type pointing to the heavenly reality where Christ ministers.",
    biblical_foundation: ["Exodus 25:8-9", "Hebrews 8:5", "Hebrews 9:1"],
    related_concepts: ["Heavenly Sanctuary", "Old Covenant", "Aaronic Priesthood"]
  },
  {
    concept_name: "Aaronic Priesthood",
    definition: "The Levitical priesthood established under Aaron, serving as a type of Christ's priesthood. The earthly pattern that prefigured Christ's superior heavenly priesthood.",
    biblical_foundation: ["Exodus 28:1", "Hebrews 5:4", "Hebrews 7:11"],
    related_concepts: ["Christ's High Priestly Ministry", "Earthly Sanctuary", "Day of Atonement (Type)"]
  },
  {
    concept_name: "Christ's Sacrifice",
    definition: "The once-for-all offering of Christ's life and blood for the redemption of humanity. The foundation of both justification and the heavenly ministry.",
    biblical_foundation: ["Hebrews 9:12", "Hebrews 10:10", "1 Peter 1:18-19"],
    related_concepts: ["Justification", "Christ's High Priestly Ministry", "Daily Atonement"]
  },
  {
    concept_name: "Day of Atonement (Type)",
    definition: "The annual Jewish ceremony of cleansing the sanctuary and removing sins, pointing to the investigative judgment. The antitype fulfilled by Christ's ministry in the Most Holy Place beginning in 1844.",
    biblical_foundation: ["Leviticus 16", "Leviticus 23:27-32"],
    related_concepts: ["Investigative Judgment", "Yearly Atonement", "Scapegoat"]
  },
  {
    concept_name: "Satan's Final Judgment",
    definition: "The ultimate fate of Satan, bearing responsibility for sin after the millennium. Represented by the scapegoat's removal to the wilderness.",
    biblical_foundation: ["Revelation 20:10", "Ezekiel 28:18-19"],
    related_concepts: ["Scapegoat as Satan", "Final Judgment", "Close of Probation"]
  },
  {
    concept_name: "70 Weeks Prophecy",
    definition: "The prophecy of Daniel 9:24-27 outlining 490 years from the decree to restore Jerusalem to the Messiah. The first portion of the 2300 days, establishing 457 BC as the starting point.",
    biblical_foundation: ["Daniel 9:24-27"],
    related_concepts: ["2300 Day Prophecy", "Decree of Artaxerxes (457 BC)", "Year-Day Principle"]
  },
  {
    concept_name: "Decree of Artaxerxes (457 BC)",
    definition: "The decree to restore and rebuild Jerusalem, marking the start of both the 70 weeks and 2300 days. The historical anchor for calculating the prophetic timeline.",
    biblical_foundation: ["Ezra 7:11-26", "Daniel 9:25"],
    related_concepts: ["70 Weeks Prophecy", "2300 Day Prophecy"]
  },
  {
    concept_name: "Year-Day Principle",
    definition: "The prophetic interpretation principle where one day equals one literal year. Essential for understanding the 2300 days as 2300 years.",
    biblical_foundation: ["Numbers 14:34", "Ezekiel 4:6"],
    related_concepts: ["2300 Day Prophecy", "70 Weeks Prophecy"]
  },
  {
    concept_name: "Justification",
    definition: "The act of God declaring a sinner righteous through faith in Christ. The result of Christ's sacrifice applied through His high priestly ministry.",
    biblical_foundation: ["Romans 3:24", "Romans 5:1", "Galatians 2:16"],
    related_concepts: ["Christ's Sacrifice", "Sanctification", "Forgiveness of Sins"]
  },
  {
    concept_name: "Sanctification",
    definition: "The ongoing process of being made holy through the work of the Holy Spirit. Connected to the daily atonement and Christ's ongoing intercession.",
    biblical_foundation: ["1 Thessalonians 5:23", "Hebrews 13:12", "2 Thessalonians 2:13"],
    related_concepts: ["Daily Atonement", "Justification", "Cleansing of God's People"]
  },
  {
    concept_name: "Final Judgment",
    definition: "The ultimate judgment of all humanity at the end of the millennium. Follows the investigative judgment and confirms its decisions.",
    biblical_foundation: ["Revelation 20:11-15", "Matthew 25:31-46", "2 Corinthians 5:10"],
    related_concepts: ["Investigative Judgment", "Second Coming", "Books of Heaven"]
  },
  {
    concept_name: "Cleansing of God's People",
    definition: "The purification of believers in preparation for Christ's return. Parallel to the cleansing of the sanctuary, preparing a people for heaven.",
    biblical_foundation: ["Malachi 3:2-3", "1 John 3:3", "Revelation 14:5"],
    related_concepts: ["Cleansing of the Sanctuary", "Sanctification", "Close of Probation"]
  },
  {
    concept_name: "Ark of the Covenant",
    definition: "The sacred chest containing the Ten Commandments, symbolizing God's throne and covenant. Central to the Most Holy Place ministry and the investigative judgment.",
    biblical_foundation: ["Exodus 25:10-22", "Hebrews 9:4", "Revelation 11:19"],
    related_concepts: ["Ten Commandments", "Mercy Seat", "Investigative Judgment"]
  },
  {
    concept_name: "Ten Commandments",
    definition: "God's moral law written on stone tablets, the standard of judgment. The law before which all are judged in the investigative judgment.",
    biblical_foundation: ["Exodus 20:1-17", "Deuteronomy 5:6-21", "James 2:10-12"],
    related_concepts: ["Ark of the Covenant", "Investigative Judgment", "Books of Heaven"]
  },
  {
    concept_name: "Mercy Seat",
    definition: "The golden cover of the ark where God's presence dwelt, representing propitiation. The place where justice and mercy meet, typifying Christ's atoning work.",
    biblical_foundation: ["Exodus 25:17-22", "Leviticus 16:14-15", "Romans 3:25"],
    related_concepts: ["Ark of the Covenant", "Christ's Propitiation", "Yearly Atonement"]
  },
  {
    concept_name: "Christ's Propitiation",
    definition: "Christ's sacrifice that satisfies divine justice and turns away God's wrath. Symbolized by the mercy seat and applied in the heavenly sanctuary.",
    biblical_foundation: ["Romans 3:25", "1 John 2:2", "1 John 4:10"],
    related_concepts: ["Mercy Seat", "Christ's Sacrifice", "Christ's High Priestly Ministry"]
  },
  {
    concept_name: "Great Disappointment",
    definition: "The experience of Millerite believers when Christ did not return on October 22, 1844. Led to the discovery of the sanctuary truth and Christ's true ministry.",
    biblical_foundation: ["Habakkuk 2:3", "Revelation 10:10"],
    related_concepts: ["October 22, 1844", "Sanctuary Truth Discovery", "2300 Day Prophecy"]
  },
  {
    concept_name: "Sanctuary Truth Discovery",
    definition: "The post-1844 understanding that Christ entered the Most Holy Place, not returned to earth. The foundational insight of Crosier's article and early Adventism.",
    biblical_foundation: ["Hebrews 9:24", "Daniel 8:14"],
    related_concepts: ["Great Disappointment", "Heavenly Sanctuary", "Two-Phase Ministry"]
  },
  {
    concept_name: "Old Covenant",
    definition: "The covenant made at Sinai based on Israel's promise to obey, associated with the earthly sanctuary. Contrasted with the new covenant and the heavenly ministry.",
    biblical_foundation: ["Exodus 19:5-8", "2 Corinthians 3:14", "Hebrews 8:13"],
    related_concepts: ["Earthly Sanctuary", "New Covenant", "Aaronic Priesthood"]
  },
  {
    concept_name: "New Covenant",
    definition: "The covenant of grace established through Christ's blood, associated with the heavenly sanctuary. The better covenant mediated by Christ in the heavenly sanctuary.",
    biblical_foundation: ["Jeremiah 31:31-34", "Hebrews 8:6-13", "Luke 22:20"],
    related_concepts: ["Old Covenant", "Heavenly Sanctuary", "Christ's High Priestly Ministry"]
  },
  {
    concept_name: "Books of Heaven",
    definition: "The records kept in heaven of every person's life, deeds, and decisions. The records reviewed during the investigative judgment.",
    biblical_foundation: ["Daniel 7:10", "Revelation 20:12", "Malachi 3:16"],
    related_concepts: ["Investigative Judgment", "Recording of Sins", "Final Judgment"]
  },
  {
    concept_name: "Recording of Sins",
    definition: "The documentation of sins in the heavenly records, transferred there through confession. Sins are transferred to the sanctuary through the daily ministry.",
    biblical_foundation: ["Ecclesiastes 12:14", "Matthew 12:36-37", "Revelation 20:12"],
    related_concepts: ["Books of Heaven", "Cleansing of the Sanctuary", "Daily Atonement"]
  },
  {
    concept_name: "Close of Probation",
    definition: "The end of humanity's opportunity to accept salvation, when investigative judgment concludes. Marks the completion of Christ's intercessory ministry.",
    biblical_foundation: ["Revelation 22:11", "Daniel 12:1", "Matthew 25:10"],
    related_concepts: ["Investigative Judgment", "Second Coming", "Scapegoat as Satan"]
  },
  {
    concept_name: "Second Coming",
    definition: "Christ's literal, visible return to earth to gather His people and execute judgment. Follows the completion of the heavenly sanctuary ministry.",
    biblical_foundation: ["Acts 1:11", "Matthew 24:30", "Revelation 1:7"],
    related_concepts: ["Close of Probation", "Final Judgment", "Cleansing of the Sanctuary"]
  },
  {
    concept_name: "Final Atonement",
    definition: "The complete and final reconciliation accomplished through Christ's ministry. Completed in the Most Holy Place ministry, culminating at the close of probation.",
    biblical_foundation: ["Hebrews 9:26", "Colossians 1:20", "Romans 5:11"],
    related_concepts: ["Yearly Atonement", "Blotting Out of Sins", "Close of Probation"]
  }
];

export async function seedTheologicalConcepts() {
  try {
    console.log('Starting theological concepts seeding...');
    console.log(`Will seed ${theologicalConcepts.length} concepts`);

    const { data: existingConcepts, error: fetchError } = await supabase
      .from('crosier_theological_concepts')
      .select('concept_name');

    if (fetchError) {
      console.error('Error fetching existing concepts:', fetchError);
      throw fetchError;
    }

    const existingNames = new Set(existingConcepts?.map(c => c.concept_name) || []);
    console.log(`Found ${existingNames.size} existing concepts`);

    const conceptsToInsert = theologicalConcepts.filter(
      concept => !existingNames.has(concept.concept_name)
    );

    if (conceptsToInsert.length === 0) {
      console.log('✅ All theological concepts already exist!');
      return { success: true, inserted: 0, skipped: theologicalConcepts.length };
    }

    console.log(`Will insert ${conceptsToInsert.length} new concepts`);
    console.log(`Skipping ${theologicalConcepts.length - conceptsToInsert.length} existing concepts`);

    const batchSize = 20;
    let totalInserted = 0;

    for (let i = 0; i < conceptsToInsert.length; i += batchSize) {
      const batch = conceptsToInsert.slice(i, i + batchSize);

      // Remove related_concepts field as it requires UUIDs that don't exist yet
      // Relationships will be created via the crosier_concept_relationships table
      const batchForInsert = batch.map(({ related_concepts, ...concept }) => concept);

      const { data, error: insertError } = await supabase
        .from('crosier_theological_concepts')
        .insert(batchForInsert)
        .select();

      if (insertError) {
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, insertError);
        throw insertError;
      }

      totalInserted += batch.length;
      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} concepts)`);
    }

    console.log(`\n✅ Successfully seeded ${totalInserted} new theological concepts`);
    console.log(`📊 Total concepts in database: ${existingNames.size + totalInserted}`);

    return {
      success: true,
      inserted: totalInserted,
      skipped: theologicalConcepts.length - conceptsToInsert.length,
      total: existingNames.size + totalInserted
    };

  } catch (error) {
    console.error('❌ Error seeding theological concepts:', error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedTheologicalConcepts()
    .then((result) => {
      console.log('\n🎉 Seeding completed!');
      console.log(`   Inserted: ${result.inserted}`);
      console.log(`   Skipped: ${result.skipped}`);
      console.log(`   Total: ${result.total}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Seeding failed:', error.message);
      process.exit(1);
    });
}
