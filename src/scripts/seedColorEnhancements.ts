import { supabase } from '../lib/supabase';

async function seedColorEnhancements() {
  console.log('🎨 Starting Sacred Colors enhancement seeding...\n');

  try {
    // First, get the Blue color ID
    const { data: blueColor, error: colorError } = await supabase
      .from('sacred_colors')
      .select('id')
      .eq('slug', 'blue')
      .maybeSingle();

    if (colorError) throw colorError;
    if (!blueColor) {
      console.log('⚠️  Blue color not found. Creating it first...');

      const { data: newColor, error: insertError } = await supabase
        .from('sacred_colors')
        .insert({
          color_name: 'Blue',
          slug: 'blue',
          color_hex: '#2563EB',
          hebrew_name: 'תְּכֵלֶת',
          hebrew_transliteration: 'tekhelet',
          short_description: "Represents God's eternal law and heavenly origin",
          icon_name: 'Scale',
          primary_meaning: 'God\'s Law',
          secondary_meanings: ['Heaven', 'Divine Authority', 'Commandments'],
          order_index: 1
        })
        .select()
        .single();

      if (insertError) throw insertError;
      console.log('✓ Created Blue color entry\n');
    }

    const colorId = blueColor?.id || newColor?.id;

    // ========================================================================
    // Symbolic Meanings for Blue
    // ========================================================================

    console.log('📖 Seeding symbolic meanings for Blue...');

    const meanings = [
      {
        color_id: colorId,
        meaning_title: "God's Law and Commandments",
        short_description: "Blue represents the eternal, unchanging law of God that serves as the foundation of His government",
        detailed_explanation: `The color blue throughout the sanctuary points to God's holy law. Just as the sapphire stone beneath God's throne represents His law, so the blue threads in the sanctuary fabrics constantly reminded Israel that God's commandments were to be at the center of their worship and daily life.

The Israelites were commanded to put a blue ribbon on the borders of their garments (Numbers 15:38-39) specifically to remember God's commandments. This wasn't merely decorative - it was a divine memory aid, a visual reminder that every action should align with God's law.`,
        sda_theological_perspective: `Seventh-day Adventists understand that God's law, particularly the Ten Commandments, remains the unchanging standard of righteousness. The blue in the sanctuary points forward to Christ, who came not to abolish the law but to fulfill it (Matthew 5:17-18).

The Sabbath commandment, the fourth of the ten, is particularly highlighted in the blue ribbon, as it is the sign of sanctification and God's creative power. The blue serves as a constant reminder that God's law is still binding on His people today.`,
        eg_white_quote: "The law of God is the transcript of His character. It is the embodiment of the great principles of love. Hence it is the basis of His government in heaven and earth. If our hearts are renewed in the likeness of God, if the divine love is implanted in the soul, will not the law of God be carried out in the life?",
        eg_white_reference: "Christ's Object Lessons, p. 305",
        related_sanctuary_concept: "The Ark of the Covenant contained the stone tablets with God's law written by His own finger. The cherubim above the ark, fashioned with blue, purple, and scarlet threads, looked down upon the law, symbolizing heaven's interest in God's righteous standard.",
        practical_application: `For believers today, the symbolism of blue calls us to:

1. Remember God's commandments daily, making them central to our decision-making
2. Recognize that obedience flows from love, not legalism
3. Keep the Sabbath holy as a sign of our covenant relationship with God
4. Study God's law to understand His character better
5. Allow the Holy Spirit to write God's law on our hearts (Hebrews 8:10)`,
        order_index: 1,
        tags: ['law', 'commandments', 'obedience', 'sabbath', 'covenant']
      },
      {
        color_id: colorId,
        meaning_title: "Heavenly Origin and Divine Authority",
        short_description: "Blue points to the heavenly realm and God's divine authority over all creation",
        detailed_explanation: `When we look up at the sky on a clear day, we see blue. When astronauts look down at earth from space, they see a blue planet. Blue connects heaven and earth, symbolizing that God's authority spans from His throne in heaven to His people on earth.

The sapphire stone beneath God's throne (Exodus 24:10) and the sea of glass before His throne (Revelation 4:6, 15:2) both appear blue, emphasizing that God's government originates in heaven and extends to all creation. This color reminded Israel that their worship wasn't merely earthly tradition but participation in heavenly realities.`,
        sda_theological_perspective: `The sanctuary service was a copy and shadow of heavenly things (Hebrews 8:5). The blue throughout the earthly sanctuary constantly pointed Israel's attention upward to the reality of God's heavenly temple where Christ now ministers as our High Priest.

This has profound implications for our understanding of the investigative judgment, which began in 1844 when Christ entered the Most Holy Place of the heavenly sanctuary. The blue reminds us that heaven's court is in session and that we are to live with an awareness of eternal realities.`,
        eg_white_quote: "The subject of the sanctuary was the key which unlocked the mystery of the disappointment of 1844. It opened to view a complete system of truth, connected and harmonious, showing that God's hand had directed the great advent movement.",
        eg_white_reference: "The Great Controversy, p. 423",
        related_sanctuary_concept: "Every piece of furniture in the Holy Place and Most Holy Place was covered with blue cloth when the Israelites transported the tabernacle (Numbers 4:6-12). This signified that these sacred objects belonged to the heavenly realm and must be treated with reverence.",
        practical_application: `The heavenly significance of blue encourages us to:

1. Live with an eternal perspective, setting our minds on things above (Colossians 3:1-2)
2. Recognize that our citizenship is in heaven (Philippians 3:20)
3. Submit to God's divine authority in all areas of life
4. Participate in worship with reverence, knowing we're joining the heavenly chorus
5. Prepare for Christ's return and the final judgment`,
        order_index: 2,
        tags: ['heaven', 'authority', 'sanctuary', 'judgment', 'eternal']
      },
      {
        color_id: colorId,
        meaning_title: "The Sapphire Foundation",
        short_description: "The sapphire stone represents the immovable, crystal-clear foundation of God's throne and government",
        detailed_explanation: `Scripture consistently describes God's throne as resting upon a foundation of sapphire - a blue, transparent stone. This imagery appears in Exodus 24:10, Ezekiel 1:26, and Ezekiel 10:1. The sapphire foundation is described as having the appearance of "the body of heaven in his clearness" - perfectly transparent and radiantly blue.

This foundation isn't arbitrary decoration. It represents God's law, the unchanging basis of His throne and government. Just as a building's foundation determines its stability, God's law (the sapphire foundation) ensures the eternal stability of His kingdom. Everything God does flows from this foundation of perfect justice, love, and righteousness.`,
        sda_theological_perspective: `The Great Controversy theme - the cosmic conflict between good and evil - centers on God's law. Satan's rebellion began with questioning God's law and authority. He claimed God's law was arbitrary and impossible to keep.

The sapphire foundation refutes Satan's accusations. It demonstrates that God's law is:
- Eternal (like precious stone, it doesn't change)
- Transparent (perfectly clear and understandable)
- Beautiful (radiantly attractive, not burdensome)
- Foundational (essential to the stability of the universe)

Christ's life perfectly revealed this foundation, showing that God's law is both just and loving.`,
        eg_white_quote: "The law of God, from its very nature, is unchangeable. It is a revelation of the will and the character of its Author. God is love, and His law is love. Its two great principles are love to God and love to man.",
        eg_white_reference: "The Great Controversy, p. 467",
        related_sanctuary_concept: "The two tablets of stone in the Ark were made of sapphire according to Jewish tradition, directly connecting the earthly law to its heavenly origin. The mercy seat above these tablets showed how God's mercy meets His justice.",
        practical_application: `Understanding the sapphire foundation helps us:

1. Trust God's government as perfectly just and loving
2. Defend God's law against accusations that it's arbitrary or harsh
3. Build our lives on the solid foundation of God's Word
4. Appreciate the beauty and wisdom of God's commandments
5. Look forward to eternity where righteousness reigns supreme`,
        order_index: 3,
        tags: ['sapphire', 'foundation', 'throne', 'stability', 'righteousness']
      }
    ];

    const { data: insertedMeanings, error: meaningsError } = await supabase
      .from('color_symbolic_meanings')
      .insert(meanings)
      .select();

    if (meaningsError) throw meaningsError;
    console.log(`✓ Inserted ${insertedMeanings.length} symbolic meanings\n`);

    // ========================================================================
    // Scripture Texts for Blue
    // ========================================================================

    console.log('📜 Seeding scripture texts for Blue...');

    const scriptures = [
      {
        color_id: colorId,
        book: 'Exodus',
        chapter: 24,
        verse_start: 9,
        verse_end: 10,
        translation: 'KJV',
        text_content: 'Then went up Moses, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel: And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone, and as it were the body of heaven in his clearness.',
        context_before: 'And Moses wrote all the words of the LORD, and rose up early in the morning, and builded an altar under the hill, and twelve pillars, according to the twelve tribes of Israel.',
        context_after: 'And upon the nobles of the children of Israel he laid not his hand: also they saw God, and did eat and drink.',
        key_phrases: ['sapphire stone', 'body of heaven', 'clearness'],
        theological_notes: 'This is one of the most significant visions of God in the Old Testament. The sapphire foundation beneath God\'s feet represents His law as the basis of His throne. The "body of heaven in his clearness" emphasizes the transparent, pure nature of God\'s law - nothing hidden, nothing arbitrary.',
        cross_references: ['Ezekiel 1:26', 'Ezekiel 10:1', 'Revelation 4:6'],
        is_primary_reference: true
      },
      {
        color_id: colorId,
        book: 'Numbers',
        chapter: 15,
        verse_start: 38,
        verse_end: 40,
        translation: 'KJV',
        text_content: 'Speak unto the children of Israel, and bid them that they make them fringes in the borders of their garments throughout their generations, and that they put upon the fringe of the borders a ribband of blue: And it shall be unto you for a fringe, that ye may look upon it, and remember all the commandments of the LORD, and do them; and that ye seek not after your own heart and your own eyes, after which ye use to go a whoring: That ye may remember, and do all my commandments, and be holy unto your God.',
        key_phrases: ['ribband of blue', 'remember all the commandments', 'be holy'],
        theological_notes: 'God explicitly commanded the blue ribbon as a memory aid for His commandments. The Hebrew word for "remember" (zakar) implies more than mental recall - it means to act upon what you remember. The blue was meant to prompt obedience, not just knowledge.',
        cross_references: ['Deuteronomy 22:12', 'Matthew 23:5'],
        is_primary_reference: true
      },
      {
        color_id: colorId,
        book: 'Ezekiel',
        chapter: 1,
        verse_start: 26,
        verse_end: 26,
        translation: 'KJV',
        text_content: 'And above the firmament that was over their heads was the likeness of a throne, as the appearance of a sapphire stone: and upon the likeness of the throne was the likeness as the appearance of a man above upon it.',
        key_phrases: ['throne', 'sapphire stone', 'appearance of a man'],
        theological_notes: 'Ezekiel\'s vision of God\'s throne parallels Moses\' vision, again emphasizing the sapphire (blue) foundation. The "man" on the throne prefigures Christ, who would take human form while maintaining His divine authority founded on God\'s law.',
        cross_references: ['Exodus 24:10', 'Daniel 7:9-10', 'Revelation 4:2-3'],
        is_primary_reference: true
      },
      {
        color_id: colorId,
        book: 'Revelation',
        chapter: 4,
        verse_start: 6,
        verse_end: 6,
        translation: 'KJV',
        text_content: 'And before the throne there was a sea of glass like unto crystal: and in the midst of the throne, and round about the throne, were four beasts full of eyes before and behind.',
        key_phrases: ['sea of glass', 'crystal', 'throne'],
        theological_notes: 'John sees the same blue, crystalline surface that Moses saw. This "sea of glass" represents the foundational law of God that supports His throne in heaven. The transparency indicates the perfect clarity and justice of God\'s government.',
        cross_references: ['Exodus 24:10', 'Revelation 15:2'],
        is_primary_reference: true
      },
      {
        color_id: colorId,
        book: 'Exodus',
        chapter: 25,
        verse_start: 4,
        verse_end: 4,
        translation: 'KJV',
        text_content: 'And blue, and purple, and scarlet, and fine linen, and goats\' hair,',
        context_before: 'And this is the offering which ye shall take of them; gold, and silver, and brass,',
        context_after: 'And rams\' skins dyed red, and badgers\' skins, and shittim wood,',
        key_phrases: ['blue', 'purple', 'scarlet'],
        theological_notes: 'Blue is listed first among the sacred colors, indicating its primary importance. These colors would be woven throughout the sanctuary, with blue appearing most prominently, reminding Israel constantly of God\'s law.',
        cross_references: ['Exodus 26:1', 'Exodus 28:5-6'],
        is_primary_reference: false
      }
    ];

    const { data: insertedScriptures, error: scripturesError } = await supabase
      .from('color_scripture_texts')
      .insert(scriptures)
      .select();

    if (scripturesError) throw scripturesError;
    console.log(`✓ Inserted ${insertedScriptures.length} scripture texts\n`);

    console.log('✅ Color enhancements seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`- Symbolic Meanings: ${insertedMeanings.length}`);
    console.log(`- Scripture Texts: ${insertedScriptures.length}`);
    console.log('\nYou can now view the enhanced Blue color page at /colors/blue');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

seedColorEnhancements()
  .then(() => {
    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  });

export { seedColorEnhancements };
