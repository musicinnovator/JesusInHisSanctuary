/**
 * Master seed script for Crosier Book Enhancements
 *
 * Seeds all data for the four new features:
 * 1. Scripture texts with KJV full text
 * 2. Timeline events (Historical, Contemporary, Biblical)
 * 3. Concept relationships
 * 4. Diagrams with interactive elements
 *
 * Run with: npx tsx src/scripts/seedAllEnhancements.ts
 */

import { seedScriptureTexts } from './seedScriptureTexts';
import { seedTimelineEvents } from './seedTimelineEvents';
import { seedConceptRelationships } from './seedConceptRelationships';
import { seedDiagrams } from './seedDiagrams';

async function seedAllEnhancements() {
  console.log('🌱 Starting comprehensive seeding of Crosier Book enhancements...\n');

  try {
    // Step 1: Seed Scripture Texts
    console.log('📖 [1/4] Seeding Scripture Texts...');
    const scripturesResult = await seedScriptureTexts();
    if (!scripturesResult.success) {
      throw new Error('Failed to seed scripture texts');
    }
    console.log(`✅ Scripture texts seeded: ${scripturesResult.count} texts\n`);

    // Step 2: Seed Timeline Events
    console.log('⏰ [2/4] Seeding Timeline Events...');
    const timelinesResult = await seedTimelineEvents();
    if (!timelinesResult.success) {
      throw new Error('Failed to seed timeline events');
    }
    console.log(`✅ Timeline events seeded: ${timelinesResult.count} events\n`);

    // Step 3: Seed Concept Relationships
    console.log('🔗 [3/4] Seeding Concept Relationships...');
    const conceptsResult = await seedConceptRelationships();
    if (!conceptsResult.success) {
      throw new Error('Failed to seed concept relationships');
    }
    console.log(`✅ Concept relationships seeded: ${conceptsResult.count} relationships\n`);

    // Step 4: Seed Diagrams
    console.log('📊 [4/4] Seeding Diagrams...');
    const diagramsResult = await seedDiagrams();
    if (!diagramsResult.success) {
      throw new Error('Failed to seed diagrams');
    }
    console.log(`✅ Diagrams seeded: ${diagramsResult.count} diagrams\n`);

    // Summary
    console.log('═'.repeat(70));
    console.log('🎉 ALL SEEDING COMPLETED SUCCESSFULLY!');
    console.log('═'.repeat(70));
    console.log('\n📊 Summary:');
    console.log(`   • Scripture Texts: ${scripturesResult.count}`);
    console.log(`   • Timeline Events: ${timelinesResult.count}`);
    console.log(`   • Concept Relationships: ${conceptsResult.count}`);
    console.log(`   • Diagrams: ${diagramsResult.count}`);
    console.log('\n✨ The Crosier Book Viewer is now fully enhanced!');
    console.log('\n🚀 Navigate to the app and explore:');
    console.log('   → Scriptures tab: Browse KJV texts with context');
    console.log('   → Theological Concepts: Interactive concept network');
    console.log('   → Diagrams: Visual theology illustrations');
    console.log('   → Timeline: Three historical timelines\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ SEEDING FAILED:', error);
    console.error('\nPlease check the error above and ensure:');
    console.error('  1. Database migrations have been run');
    console.error('  2. Database connection is working');
    console.error('  3. All prerequisite data exists (chapters, concepts, etc.)\n');
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAllEnhancements();
}

export { seedAllEnhancements };
