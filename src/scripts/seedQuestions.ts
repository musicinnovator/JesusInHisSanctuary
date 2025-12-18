import { supabase } from '../lib/supabase';
import { timelineQuestions } from '../data/timelineQuestions';

/**
 * Seeds the timeline questions into the Supabase database
 * Run this script once to populate the questions table
 */
export async function seedQuestions() {
  console.log('Starting question seeding...');
  console.log(`Total questions to seed: ${timelineQuestions.length}`);

  try {
    // Clear existing questions (optional - remove if you want to preserve data)
    const { error: deleteError } = await supabase
      .from('timeline_questions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.warn('Warning during deletion:', deleteError);
    }

    // Insert questions in batches
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < timelineQuestions.length; i += batchSize) {
      const batch = timelineQuestions.slice(i, i + batchSize);

      const questionsToInsert = batch.map(q => ({
        step_id: q.stepId,
        question_id: q.questionId,
        type: q.type,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options || null,
        correct_answer: Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer],
        explanation: q.explanation,
        scripture_references: q.scriptureReferences || [],
        hint: q.hint || null,
        order_position: q.orderPosition
      }));

      const { error } = await supabase
        .from('timeline_questions')
        .insert(questionsToInsert);

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`✓ Inserted batch ${i / batchSize + 1} (${batch.length} questions)`);
      }
    }

    console.log('\n=== Seeding Complete ===');
    console.log(`Successfully inserted: ${successCount} questions`);
    console.log(`Errors: ${errorCount} questions`);

    // Verify the data
    const { count, error: countError } = await supabase
      .from('timeline_questions')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`Total questions in database: ${count}`);
    }

    return { success: successCount, errors: errorCount };
  } catch (error) {
    console.error('Fatal error during seeding:', error);
    throw error;
  }
}

// Run the seeding if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedQuestions()
    .then(() => {
      console.log('Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding script failed:', error);
      process.exit(1);
    });
}
