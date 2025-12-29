import { seedCrossShadowBook } from './seedCrossShadowBook';
import { seedCrossShadowScriptures } from './seedCrossShadowScriptures';
import { seedCrossShadowConcepts } from './seedCrossShadowConcepts';

/**
 * Master seeding script for "The Cross and Its Shadow" database
 *
 * This script runs all seeding operations in the correct order:
 * 1. Book metadata, sections, and chapters
 * 2. Scripture references
 * 3. Theological concepts and relationships
 *
 * Usage:
 * - Import this file in your application
 * - Call seedCrossShadowComplete() from an admin interface or during initial setup
 * - Ensure you have proper database permissions
 */
export async function seedCrossShadowComplete() {
  console.log('='.repeat(60));
  console.log('CROSS AND SHADOW - COMPLETE DATABASE SEEDING');
  console.log('='.repeat(60));
  console.log('');

  try {
    // Phase 1: Book Structure
    console.log('📖 PHASE 1: Seeding Book Structure...');
    console.log('-'.repeat(60));
    await seedCrossShadowBook();
    console.log('');

    // Phase 2: Scripture References
    console.log('📜 PHASE 2: Seeding Scripture References...');
    console.log('-'.repeat(60));
    await seedCrossShadowScriptures();
    console.log('');

    // Phase 3: Theological Concepts
    console.log('💡 PHASE 3: Seeding Theological Concepts...');
    console.log('-'.repeat(60));
    await seedCrossShadowConcepts();
    console.log('');

    // Summary
    console.log('='.repeat(60));
    console.log('✅ SEEDING COMPLETE!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Database successfully populated with:');
    console.log('  ✓ Book metadata and overview');
    console.log('  ✓ 9 major sections');
    console.log('  ✓ 50 detailed chapters');
    console.log('  ✓ Sample scripture references');
    console.log('  ✓ Theological concepts');
    console.log('  ✓ Typological relationships');
    console.log('');
    console.log('Navigate to /cross-shadow to explore the book!');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('='.repeat(60));
    console.error('❌ SEEDING FAILED');
    console.error('='.repeat(60));
    console.error('Error:', error);
    console.error('');
    console.error('Please check:');
    console.error('  1. Database connection is working');
    console.error('  2. Required tables exist (run migrations first)');
    console.error('  3. You have proper permissions');
    console.error('');
    throw error;
  }
}

// Allow running directly from command line
if (require.main === module) {
  seedCrossShadowComplete()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
