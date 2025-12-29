import { seedScripturePassages } from './seedScripturePassages';
import { seedHebrewGreekWords } from './seedHebrewGreekWords';
import { seedScriptureCrossReferences } from './seedScriptureCrossReferences';

/**
 * Master seeding script for all scripture-related data
 *
 * This script runs all scripture seeding operations in the correct order:
 * 1. Scripture passages (required first as cross-references depend on these)
 * 2. Hebrew/Greek words (independent)
 * 3. Cross-references (depends on passages existing)
 */
async function seedAllScriptureData() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 MASTER SCRIPTURE SEEDING SCRIPT');
  console.log('═══════════════════════════════════════════════════════════\n');

  const startTime = Date.now();
  let totalErrors = 0;

  try {
    // Step 1: Seed Scripture Passages
    console.log('📖 STEP 1/3: Seeding Scripture Passages...\n');
    try {
      await seedScripturePassages();
      console.log('\n✅ Scripture Passages Complete\n');
    } catch (error) {
      console.error('\n❌ Scripture Passages Failed:', error);
      totalErrors++;
    }

    console.log('───────────────────────────────────────────────────────────\n');

    // Step 2: Seed Hebrew/Greek Words
    console.log('📚 STEP 2/3: Seeding Hebrew/Greek Words...\n');
    try {
      await seedHebrewGreekWords();
      console.log('\n✅ Hebrew/Greek Words Complete\n');
    } catch (error) {
      console.error('\n❌ Hebrew/Greek Words Failed:', error);
      totalErrors++;
    }

    console.log('───────────────────────────────────────────────────────────\n');

    // Step 3: Seed Cross-References
    console.log('🔗 STEP 3/3: Seeding Scripture Cross-References...\n');
    try {
      await seedScriptureCrossReferences();
      console.log('\n✅ Cross-References Complete\n');
    } catch (error) {
      console.error('\n❌ Cross-References Failed:', error);
      totalErrors++;
    }

    console.log('═══════════════════════════════════════════════════════════');

    // Final Summary
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    if (totalErrors === 0) {
      console.log('✅ ALL SCRIPTURE SEEDING COMPLETED SUCCESSFULLY!');
      console.log(`⏱️  Total time: ${duration} seconds`);
      console.log('═══════════════════════════════════════════════════════════\n');
      return true;
    } else {
      console.log(`⚠️  SEEDING COMPLETED WITH ${totalErrors} ERROR(S)`);
      console.log(`⏱️  Total time: ${duration} seconds`);
      console.log('═══════════════════════════════════════════════════════════\n');
      return false;
    }
  } catch (error) {
    console.error('💥 FATAL ERROR IN MASTER SEEDING SCRIPT:', error);
    console.log('═══════════════════════════════════════════════════════════\n');
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAllScriptureData()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('\n💥 Seeding failed catastrophically:', error);
      process.exit(1);
    });
}

export { seedAllScriptureData };
