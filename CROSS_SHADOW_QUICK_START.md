# The Cross and Its Shadow - Quick Start Guide

## For Users

### Accessing the Book

1. Navigate to your application homepage
2. Click on "The Cross and Its Shadow" navigation card
3. You'll be taken to `/cross-shadow`

### Using the Interface

#### Five Main Views

**1. Overview**
- See book summary and key themes
- View statistics (sections, chapters, scriptures)
- Get oriented to the book's scope

**2. Sections**
- Browse all 9 major sections
- Read section overviews
- See chapter ranges
- Explore key themes per section

**3. Chapters**
- View all 50 chapters
- Switch between grid and list layouts
- Search by chapter title or content
- Filter by section
- Click any chapter to explore (future: full chapter view)

**4. Scriptures**
- Browse scripture references by Bible book
- Filter by:
  - All Testaments / Old Testament / New Testament
  - Category (Prophecy, Fulfillment, etc.)
- Search across references, context, and quotes
- See footnote numbers
- View chapter context for each reference

**5. Concepts**
- Explore theological concepts
- Filter by type:
  - Type (Old Testament shadows)
  - Antitype (New Testament fulfillments)
  - Doctrine (Adventist teachings)
  - Symbol (Sacred objects and their meanings)
  - Prophecy (Prophetic timelines)
  - Teaching (Spiritual lessons)
- Click any concept to see:
  - Full description
  - Typological relationships (Type → Antitype)
  - Scripture foundation
  - Related chapters
  - Connections to other concepts

### Tips for Study

**Exploring Typology**:
1. Start with a Type (e.g., "Passover")
2. Click to see its details
3. Look for the "fulfills" relationship
4. Follow to the Antitype (e.g., "Christ's Atoning Sacrifice")
5. Compare Old Testament type with New Testament fulfillment

**Scripture Study**:
1. Use the Scripture view to see all references
2. Filter by testament to focus study
3. Search for specific topics or verses
4. Read the context to understand usage in the book

**Chapter Navigation**:
1. Use the search bar to find chapters by topic
2. Filter by section to explore themes
3. Switch between grid (visual) and list (detailed) views

## For Developers

### Database Setup

1. **Run Migrations**:
   ```bash
   # Migrations already created in supabase/migrations/
   # They will auto-run if using Supabase
   ```

2. **Seed the Database**:
   ```typescript
   // Option A: Run complete seeding (recommended)
   import { seedCrossShadowComplete } from './src/scripts/seedCrossShadowComplete';
   await seedCrossShadowComplete();

   // Option B: Run individual scripts
   import { seedCrossShadowBook } from './src/scripts/seedCrossShadowBook';
   import { seedCrossShadowScriptures } from './src/scripts/seedCrossShadowScriptures';
   import { seedCrossShadowConcepts } from './src/scripts/seedCrossShadowConcepts';

   await seedCrossShadowBook();
   await seedCrossShadowScriptures();
   await seedCrossShadowConcepts();
   ```

### Database Schema

**Tables**:
- `cross_shadow_book` - Book metadata
- `cross_shadow_sections` - 9 major sections
- `cross_shadow_chapters` - 50 chapters
- `cross_shadow_scriptures` - Scripture references
- `cross_shadow_concepts` - Theological concepts
- `cross_shadow_concept_relationships` - Typological connections
- `cross_shadow_illustrations` - Charts and diagrams (future)
- `cross_shadow_highlights` - Key points (future)

### Adding Content

#### Adding Scripture References

```typescript
const scripture = {
  reference: 'Exodus 25:8',
  book_name: 'Exodus',
  chapter_verse: '25:8',
  context_in_book: 'God commanding sanctuary to be built',
  footnote_number: 1,
  quote_text: 'Let them make me a sanctuary; that I may dwell among them.',
  testament: 'Old',
  category: 'Foundation - Divine Command'
};

// Insert via Supabase
await supabase
  .from('cross_shadow_scriptures')
  .insert([{ ...scripture, book_id, chapter_id }]);
```

#### Adding Theological Concepts

```typescript
const concept = {
  concept_name: 'Burnt Offering',
  concept_type: 'type',
  description: 'Voluntary offering completely consumed by fire...',
  scripture_foundation: ['Leviticus 1:3-9', 'Leviticus 6:8-13'],
  related_chapters: [3, 16],
  old_testament_type: 'Animal completely burned on altar',
  new_testament_antitype: 'Christ\'s complete consecration',
  significance: 'Typified Christ\'s total devotion...'
};

// Insert via Supabase
await supabase
  .from('cross_shadow_concepts')
  .insert([{ ...concept, book_id }]);
```

#### Adding Concept Relationships

```typescript
const relationship = {
  concept_from_id: 'uuid-of-passover',
  concept_to_id: 'uuid-of-christ-sacrifice',
  relationship_type: 'fulfills',
  description: 'Christ is our Passover Lamb whose blood delivers us from death'
};

await supabase
  .from('cross_shadow_concept_relationships')
  .insert([relationship]);
```

### Custom Hooks

**useCrossShadowBook()**:
```typescript
const {
  book,           // Book metadata
  sections,       // Array of 9 sections
  chapters,       // Array of 50 chapters
  scriptures,     // All scripture references
  concepts,       // All theological concepts
  illustrations,  // Future: charts and diagrams
  highlights,     // Future: key points
  loading,        // Loading state
  error,          // Error message if any
  refetch         // Function to reload data
} = useCrossShadowBook();
```

**useCrossShadowChapter(chapterId)**:
```typescript
const {
  chapter,        // Single chapter details
  scriptures,     // Scriptures for this chapter
  highlights,     // Highlights for this chapter
  loading,
  error,
  refetch
} = useCrossShadowChapter(chapterId);
```

**useCrossShadowConcepts()**:
```typescript
const {
  concepts,       // All concepts
  relationships,  // All concept relationships
  loading,
  error,
  refetch
} = useCrossShadowConcepts();
```

### Component Architecture

```
CrossShadowBookViewer (Main container)
├── Header with stats
├── Tab Navigation (5 views)
└── Content Area:
    ├── Overview View (inline)
    ├── Sections View (inline)
    ├── Chapters View (inline with search/filter)
    ├── CrossShadowScripturesView (imported component)
    └── CrossShadowConceptsView (imported component)
```

### Styling

**Color System**:
- Amber/Orange: Book theme, Old Testament types
- Purple/Pink: New Testament antitypes, concepts
- Blue: Scriptures, general accents
- Green: Related content, highlights

**Responsive Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Adding New Features

**To Add a New View**:
1. Create new component in `/src/components/`
2. Import in `CrossShadowBookViewer.tsx`
3. Add to tab navigation
4. Add to view mode switch statement
5. Create corresponding hook if needed

**To Add New Data Types**:
1. Add to database schema (migration)
2. Create TypeScript interfaces
3. Add to hooks (`useCrossShadowBook.ts`)
4. Create seeding script
5. Build UI component

## Common Tasks

### Testing the System

1. **Verify Database Connection**:
   ```typescript
   import { supabase } from './src/lib/supabase';
   const { data, error } = await supabase.from('cross_shadow_book').select('*');
   console.log(data ? 'Connected!' : 'Error:', error);
   ```

2. **Check Seeded Data**:
   - Navigate to `/cross-shadow`
   - Switch to each view
   - Verify content appears
   - Test search and filters

3. **Inspect Database**:
   ```typescript
   // Check chapter count
   const { count } = await supabase
     .from('cross_shadow_chapters')
     .select('*', { count: 'exact', head: true });
   console.log('Chapters:', count); // Should be 50

   // Check scripture count
   const { count: scriptureCount } = await supabase
     .from('cross_shadow_scriptures')
     .select('*', { count: 'exact', head: true });
   console.log('Scriptures:', scriptureCount); // Sample: 40+

   // Check concept count
   const { count: conceptCount } = await supabase
     .from('cross_shadow_concepts')
     .select('*', { count: 'exact', head: true });
   console.log('Concepts:', conceptCount); // Should be 20
   ```

### Troubleshooting

**"No data showing"**:
1. Check database connection
2. Verify migrations ran
3. Run seeding scripts
4. Check browser console for errors

**"Build fails"**:
1. Run `npm install` to ensure dependencies
2. Check TypeScript errors: `npm run build`
3. Verify all imports are correct

**"Styles not working"**:
1. Ensure TailwindCSS is configured
2. Check for conflicting class names
3. Verify gradient colors are in config

## Support

For issues or questions:
1. Check `CROSS_SHADOW_IMPLEMENTATION_SUMMARY.md` for architecture
2. Review `CROSS_SHADOW_PHASE_2_COMPLETE.md` for features
3. Inspect component source code (well-commented)
4. Check database schema in migrations

## Resources

**Key Files**:
- `/src/components/CrossShadowBookViewer.tsx` - Main component
- `/src/hooks/useCrossShadowBook.ts` - Data hooks
- `/src/scripts/seedCrossShadowComplete.ts` - Seeding script
- `/supabase/migrations/*` - Database schema

**Documentation**:
- `README.md` - Project overview
- `CROSS_SHADOW_IMPLEMENTATION_SUMMARY.md` - Architecture details
- `CROSS_SHADOW_PHASE_2_COMPLETE.md` - Feature documentation

---

**Last Updated**: December 29, 2024
**Version**: Phase 2 Complete
**Status**: Production Ready
