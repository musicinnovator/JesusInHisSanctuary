# Quick Start: Phase 4 - Enhanced Scripture Navigator

## 🚀 What Was Built

Complete foundation for the Enhanced Scripture Navigator with database integration, comprehensive seeding, and production-ready infrastructure.

---

## ⚡ Quick Actions

### 1. Seed the Database (Required First Step)

```bash
# Run the master seeding script
npx tsx src/scripts/seedAllScriptureData.ts
```

This will populate:
- 24 scripture passages with full biblical text
- 20 Hebrew/Greek word studies
- 35+ cross-reference relationships

**Expected output:**
```
🚀 MASTER SCRIPTURE SEEDING SCRIPT
📖 STEP 1/3: Seeding Scripture Passages...
   ✓ Inserted: Exodus 25:10-22 - The Ark of the Covenant
   ✓ Inserted: Exodus 25:23-30 - The Table of Showbread
   ...
✅ Scripture Passages Complete

📚 STEP 2/3: Seeding Hebrew/Greek Words...
   ✓ Inserted: aron (H727) - אָרוֹן
   ...
✅ Hebrew/Greek Words Complete

🔗 STEP 3/3: Seeding Scripture Cross-References...
   ✓ Inserted: Exodus 25:10-22 → Hebrews 9:1-28 (fulfillment)
   ...
✅ Cross-References Complete

✅ ALL SCRIPTURE SEEDING COMPLETED SUCCESSFULLY!
⏱️  Total time: X seconds
```

### 2. Verify Data in Supabase

Check your Supabase dashboard:
- `scripture_passages` should have 24 rows
- `hebrew_greek_words` should have 20 rows
- `scripture_cross_references` should have 35+ rows

### 3. Use in Your Components

```typescript
import { useScripturePassages, useScripturePassage } from './hooks/useScripture';

function MyComponent() {
  // Get all tabernacle passages
  const { passages, loading } = useScripturePassages({
    model_id: 'tabernacle'
  });

  // Get specific passage
  const { passage } = useScripturePassage('Exodus 25:10-22');

  return (
    <div>
      {passages.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 What's Included

### Scripture Passages (24 total)

**Tabernacle (11 passages):**
- Exodus 25:10-22 - Ark of the Covenant
- Exodus 25:23-30 - Table of Showbread
- Exodus 25:31-40 - Golden Lampstand
- Exodus 26:1-37 - Tabernacle Structure
- Exodus 27:1-8 - Altar of Burnt Offering
- Exodus 27:9-19 - The Courtyard
- Exodus 28:1-43 - High Priest's Garments
- Exodus 29:38-46 - Daily Offerings
- Exodus 30:1-10 - Altar of Incense
- Exodus 30:17-21 - Bronze Laver
- Leviticus 16:1-34 - Day of Atonement

**Solomon's Temple (4 passages):**
- 1 Kings 6:1-38 - Temple Construction
- 1 Kings 7:15-51 - Temple Furnishings
- 1 Kings 8:1-66 - Temple Dedication
- 2 Chronicles 3:1-17 - Construction Details

**Herod's Temple (2 passages):**
- John 2:13-22 - Jesus Cleanses Temple
- Matthew 24:1-2 - Temple Destruction

**Heavenly Sanctuary (7 passages):**
- Hebrews 8:1-6 - Christ in Heavenly Sanctuary
- Hebrews 9:1-28 - Earthly/Heavenly Comparison
- Revelation 4:1-11 - Throne Room Vision
- Revelation 5:1-14 - The Lamb and Scroll
- Revelation 8:1-5 - Golden Altar in Heaven
- Revelation 11:19 - Ark in Heavenly Temple
- Daniel 7:9-14 - Judgment Scene
- Daniel 8:14 - 2300 Day Prophecy

### Hebrew Words (10 total)
- אָרוֹן (aron) - Ark
- כַּפֹּרֶת (kapporet) - Mercy seat
- מְנוֹרָה (menorah) - Lampstand
- מִזְבֵּחַ (mizbeach) - Altar
- שֻׁלְחָן (shulchan) - Table
- קְטֹרֶת (qetoret) - Incense
- כִּיּוֹר (kiyor) - Laver
- פָּרֹכֶת (paroketh) - Veil
- כֹּהֵן (kohen) - Priest
- כִּפֻּר (kippur) - Atonement

### Greek Words (10 total)
- ἱλαστήριον (hilasterion) - Mercy seat/Propitiation
- ἅγια (hagia) - Holy place
- σκηνή (skene) - Tabernacle
- ἀρχιερεύς (archiereus) - High priest
- θυσιαστήριον (thusiasterion) - Altar
- καταπέτασμα (katapetasma) - Veil
- λυχνία (luchnia) - Lampstand
- θυμίαμα (thumiama) - Incense
- καθαρίζω (katharizo) - To cleanse
- διαθήκη (diatheke) - Covenant

---

## 🎯 Available Hooks

### Basic Data Fetching
```typescript
// Get all passages with optional filtering
useScripturePassages(filters?: {
  book?: string;
  translation?: string;
  sanctuaryElement?: string;
  passageType?: 'direct' | 'typological' | 'prophetic' | 'historical';
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
})

// Get single passage
useScripturePassage(reference: string, translation?: string)

// Get passage with all related data
usePassageWithRelations(passageId: string)
```

### Cross-References
```typescript
// Get cross-references for a passage
useCrossReferences(passageId: string)

// Get 3D link data for passage
useScripture3DLink(passageReference: string)
```

### Word Studies
```typescript
// Get Hebrew/Greek words
useHebrewGreekWords(language: 'hebrew' | 'greek' | 'both')
```

### Search
```typescript
// Search passages by text
useScriptureSearch(searchQuery: string)
```

### Analytics
```typescript
// Track passage view
await trackPassageView(passageId: string)
```

---

## 🔍 Example Queries

### Get All Featured Passages
```typescript
const { passages } = useScripturePassages({ featured: true });
```

### Get Tabernacle Passages
```typescript
const { passages } = useScripturePassages({
  model_id: 'tabernacle'
});
```

### Get Advanced Difficulty Passages
```typescript
const { passages } = useScripturePassages({
  difficultyLevel: 'advanced'
});
```

### Get Typological Passages
```typescript
const { passages } = useScripturePassages({
  passageType: 'typological'
});
```

### Search for "mercy seat"
```typescript
const { results } = useScriptureSearch('mercy seat');
```

---

## 📁 File Locations

### Types
- `src/types/scripture.ts` - All TypeScript interfaces

### Hooks
- `src/hooks/useScripture.ts` - All data fetching hooks

### Seeding Scripts
- `src/scripts/seedScripturePassages.ts` - Scripture passages
- `src/scripts/seedHebrewGreekWords.ts` - Language studies
- `src/scripts/seedScriptureCrossReferences.ts` - Cross-references
- `src/scripts/seedAllScriptureData.ts` - Master script

### Existing Components (ready to enhance)
- `src/components/EnhancedScriptureNavigator.tsx` - Main component
- `src/components/ScriptureNavigator.tsx` - Original component

---

## ⚠️ Important Notes

1. **Run seeding script first** - The database hooks will return empty arrays until you seed data

2. **Supabase environment** - Ensure your `.env` file has:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Service role needed for seeding** - The seeding scripts need service role access

4. **Idempotent operations** - Safe to re-run seeding scripts (they check for existing data)

5. **No breaking changes** - All existing functionality remains intact

---

## 🎓 Timeline Questions

**Confirmed Complete:** All 25 steps (0-24) have full question sets
- 200+ questions total
- Multiple choice, fill-blank, true/false types
- Complete Story of Salvation coverage

No action needed for Timeline questions!

---

## 🚧 Next Steps (Future)

1. **Integrate hooks into UI** - Connect database to EnhancedScriptureNavigator
2. **Add 3D camera animations** - Smooth transitions to hotspots
3. **Build cross-reference panel** - Visual navigation between passages
4. **Add Hebrew/Greek tooltips** - Interactive word studies
5. **Implement translation switcher** - KJV, NIV, ESV, etc.
6. **Add more passages** - Expand to 44 as planned

---

## 🐛 Troubleshooting

### "Cannot find module" errors
Run: `npm install`

### Seeding script fails
- Check Supabase connection in `.env`
- Verify database tables exist (should be created from migration)
- Check service role permissions

### Empty data returned
- Make sure you ran the seeding script first
- Check Supabase dashboard to verify data exists
- Check browser console for errors

### TypeScript errors
Run: `npm run build` to verify all types are correct

---

## ✅ Verification Checklist

- [ ] Seeding script runs successfully
- [ ] Data visible in Supabase dashboard
- [ ] Hooks return data in test component
- [ ] No console errors
- [ ] Build passes: `npm run build`
- [ ] Existing functionality still works

---

**Ready to Use!** Start with seeding, then integrate the hooks into your components.

For detailed implementation information, see `PHASE_4_SCRIPTURE_NAVIGATOR_IMPLEMENTATION.md`
