# Quick Start Guide: Timeline Learning System

## For End Users

### How to Use the Learning System

1. **Navigate to the Timeline Page**
   - Click "Timeline" from the main navigation
   - You'll see the Aaron & Jesus Ministry Timeline

2. **Start Learning**
   - Click any "Test Your Knowledge" button on a timeline step
   - Choose between Study Mode (learning) or Challenge Mode (testing)
   - Answer questions one at a time
   - Get immediate feedback in Study Mode

3. **Track Your Progress**
   - Click "My Progress" button in the top-right header
   - View your statistics, achievements, and completed steps
   - See your accuracy and study streak

4. **Earn Achievements**
   - Answer questions correctly to unlock badges
   - Complete all questions for a step to earn Step Master badges
   - Study consecutively to build your streak

## For Administrators

### Quick Setup (5 minutes)

1. **Verify Database**
   ```bash
   # Database should already be set up via migration
   # Check Supabase dashboard for these tables:
   - timeline_questions
   - user_progress
   - user_achievements
   - study_sessions
   - user_stats
   ```

2. **Test the System**
   - Visit the Timeline page
   - Click "Test Your Knowledge" on Step 0
   - Answer a question
   - Click "My Progress" to see stats

3. **Verify Data Storage**
   - Check Supabase tables for new rows
   - Confirm user_progress records are created
   - Verify stats are updating

### Adding More Questions

**Current Status**: Steps 0-5 have 7-8 complete questions each

**To Add Questions for Steps 6-24**:

1. Open `src/data/timelineQuestions.ts`
2. Follow the pattern from Steps 0-5:
   ```typescript
   {
     stepId: 6,  // Your step number
     questionId: 'step6_qa1',
     type: 'multiple-choice',
     difficulty: 'medium',
     question: 'Your question here?',
     options: ['Answer 1', 'Answer 2', 'Answer 3'],
     correctAnswer: 'Answer 1',
     explanation: 'Why this answer is correct...',
     scriptureReferences: [
       { book: 'Leviticus', chapter: 16, verses: '18' }
     ],
     hint: 'Optional hint',
     orderPosition: 1
   }
   ```

3. Add 7-10 questions per step
4. Mix question types: multiple-choice, fill-blank, true-false
5. Vary difficulty: easy, medium, hard
6. Include scripture references for each question

**Reminder**: You mentioned wanting to rotate questions later - this structure makes that easy!

### Customization

**Change Colors**:
- Edit `tailwind.config.js`
- Modify sanctuary-* color classes

**Modify Achievements**:
- Edit `src/hooks/useTimelineLearning.ts`
- Update `checkAchievements()` function

**Adjust Question Display**:
- Edit components in `src/components/timeline-learning/`

## Features at a Glance

✅ **Interactive Questions**: Multiple formats, instant feedback
✅ **Progress Tracking**: Automatic saving, persistent across sessions
✅ **Achievements**: Gamified learning with unlockable badges
✅ **Study Modes**: Learning (Study) and Testing (Challenge)
✅ **Mobile Responsive**: Works on all devices
✅ **Offline Capable**: Questions load from local data
✅ **Privacy Friendly**: Anonymous user tracking
✅ **Production Ready**: Built to scale

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State**: React Hooks
- **Icons**: Lucide React

## Support

**Question Data**: `src/data/timelineQuestions.ts`
**User Progress Hook**: `src/hooks/useTimelineLearning.ts`
**Main Modal**: `src/components/timeline-learning/QuestionModal.tsx`
**Progress Dashboard**: `src/components/timeline-learning/ProgressDashboard.tsx`

For detailed documentation, see `TIMELINE_LEARNING_SYSTEM.md`

---

**Status**: ✅ Ready for Use
**Build Status**: ✅ Passing
**Database**: ✅ Configured
