import { supabase } from '../lib/supabase';

async function seedSymbolismAdvancedPhases() {
  console.log('Starting advanced symbolism phases seeding...');

  try {
    // First, get existing symbol IDs
    const { data: symbols, error: symbolsError } = await supabase
      .from('symbolism_symbols')
      .select('id, name')
      .limit(10);

    if (symbolsError) throw symbolsError;

    if (!symbols || symbols.length === 0) {
      console.log('No symbols found. Please run base symbolism seeding first.');
      return;
    }

    console.log(`Found ${symbols.length} symbols to enhance with advanced features.`);

    // Get a few symbol IDs to work with
    const arkSymbol = symbols.find(s => s.name.toLowerCase().includes('ark'));
    const altarSymbol = symbols.find(s => s.name.toLowerCase().includes('altar'));
    const goldSymbol = symbols.find(s => s.name.toLowerCase().includes('gold'));

    const symbolId1 = arkSymbol?.id || symbols[0].id;
    const symbolId2 = altarSymbol?.id || symbols[1].id;
    const symbolId3 = goldSymbol?.id || symbols[2].id;

    // ========================================================================
    // PHASE 3: Library Resources
    // ========================================================================

    console.log('Seeding library resources...');

    const libraryResources = [
      {
        symbol_id: symbolId1,
        resource_type: 'book',
        title: 'The Sanctuary Service',
        author: 'M.L. Andreasen',
        publication_year: 1937,
        publisher: 'Review and Herald',
        description: 'A comprehensive study of the sanctuary and its services as revealed in the Old Testament.',
        relevance_score: 10,
        language: 'en',
        tags: ['sanctuary', 'classic', 'adventist'],
      },
      {
        symbol_id: symbolId1,
        resource_type: 'video',
        title: 'Ark of the Covenant: Symbol of God\'s Presence',
        author: 'Amazing Facts',
        publication_year: 2020,
        description: 'Documentary exploring the significance of the Ark in biblical history.',
        relevance_score: 8,
        url: 'https://example.com/ark-video',
        language: 'en',
        tags: ['documentary', 'ark', 'presence'],
      },
      {
        symbol_id: symbolId2,
        resource_type: 'article',
        title: 'The Altar of Sacrifice: A Type of Calvary',
        author: 'Ellen G. White',
        publication_year: 1890,
        description: 'Biblical exposition on the altar and its significance in salvation history.',
        relevance_score: 9,
        language: 'en',
        tags: ['altar', 'sacrifice', 'typology'],
      },
      {
        symbol_id: symbolId3,
        resource_type: 'book',
        title: 'Symbolism of the Sanctuary',
        author: 'Stephen Haskell',
        publication_year: 1914,
        publisher: 'Southern Publishing Association',
        description: 'In-depth study of sanctuary symbolism and prophetic fulfillment.',
        relevance_score: 9,
        page_count: 456,
        language: 'en',
        tags: ['symbolism', 'prophecy', 'pioneer'],
      },
    ];

    const { data: insertedResources, error: resourcesError } = await supabase
      .from('symbolism_library_resources')
      .insert(libraryResources)
      .select();

    if (resourcesError) throw resourcesError;
    console.log(`✓ Inserted ${insertedResources.length} library resources`);

    // Book references
    if (insertedResources && insertedResources.length > 0) {
      const bookReferences = [
        {
          library_resource_id: insertedResources[0].id,
          symbol_id: symbolId1,
          chapter_number: 5,
          chapter_title: 'The Ark of the Covenant',
          page_start: 89,
          page_end: 102,
          quote_text: 'The ark represented the presence of God among His people, a symbol of His covenant with them.',
          significance: 'Establishes the ark as the central symbol of divine presence in the sanctuary.',
        },
      ];

      const { error: refsError } = await supabase
        .from('symbolism_book_references')
        .insert(bookReferences);

      if (refsError) throw refsError;
      console.log(`✓ Inserted ${bookReferences.length} book references`);
    }

    // ========================================================================
    // PHASE 4: Type/Antitype Expansion
    // ========================================================================

    console.log('Seeding typology connections...');

    const typologyConnections = [
      {
        symbol_id: symbolId1,
        type_category: 'object',
        type_name: 'Ark of the Covenant',
        type_reference: 'Exodus 25:10-22',
        antitype_name: 'Christ\'s Mediatorial Ministry',
        antitype_reference: 'Hebrews 9:11-12',
        correspondence_points: [
          {
            type_aspect: 'Contained the Law',
            antitype_aspect: 'Christ fulfilled the Law',
            explanation: 'The ark contained the Ten Commandments; Christ perfectly kept and fulfilled God\'s law.',
          },
          {
            type_aspect: 'Mercy Seat covered the Law',
            antitype_aspect: 'Christ\'s mercy covers our sins',
            explanation: 'As the mercy seat covered the law, Christ\'s sacrifice covers our transgressions of the law.',
          },
        ],
        contrasts: [
          {
            type_limitation: 'Limited to earthly sanctuary',
            antitype_superiority: 'Ministers in heavenly sanctuary',
            explanation: 'The earthly ark was confined to one location; Christ ministers in the true sanctuary in heaven.',
          },
        ],
        progressive_revelation: 'The ark progressively revealed God\'s plan for redemption, finding its ultimate fulfillment in Christ\'s high priestly ministry.',
        hermeneutical_notes: 'This typology demonstrates the principle of progressive revelation and the superiority of the new covenant.',
      },
      {
        symbol_id: symbolId2,
        type_category: 'ritual',
        type_name: 'Daily Sacrifices',
        type_reference: 'Exodus 29:38-42',
        antitype_name: 'Christ\'s Continual Intercession',
        antitype_reference: 'Hebrews 7:25',
        correspondence_points: [
          {
            type_aspect: 'Morning and evening sacrifice',
            antitype_aspect: 'Continual intercession',
            explanation: 'The daily sacrifices pointed to Christ\'s ongoing mediation for believers.',
          },
        ],
        progressive_revelation: 'The daily sacrifices revealed God\'s constant provision for sin, fulfilled in Christ\'s perpetual intercession.',
      },
    ];

    const { error: typologyError } = await supabase
      .from('symbolism_typology_connections')
      .insert(typologyConnections);

    if (typologyError) throw typologyError;
    console.log(`✓ Inserted ${typologyConnections.length} typology connections`);

    // Prophetic fulfillments
    console.log('Seeding prophetic fulfillments...');

    const propheticFulfillments = [
      {
        symbol_id: symbolId1,
        prophecy_reference: 'Psalm 132:7-8',
        fulfillment_reference: 'Hebrews 9:24',
        fulfillment_date: 'AD 31',
        fulfillment_description: 'Christ entered the heavenly sanctuary as our High Priest',
        prophetic_principle: 'Type meets antitype in Christ\'s ascension ministry',
        historical_context: 'Following His resurrection, Christ ascended to begin His high priestly ministry in the heavenly sanctuary.',
        theological_significance: 'Establishes the reality of Christ\'s ongoing mediatorial work',
        adventist_interpretation: 'This fulfillment began Christ\'s ministry in the holy place of the heavenly sanctuary, with a transition to the most holy place in 1844.',
        fulfillment_certainty: 'certain',
        eschatological_implications: 'Points to the ultimate cleansing of the sanctuary and the completion of Christ\'s mediatorial work.',
      },
      {
        symbol_id: symbolId2,
        prophecy_reference: 'Isaiah 53:7',
        fulfillment_reference: 'John 1:29',
        fulfillment_date: 'AD 27-31',
        fulfillment_description: 'Christ as the Lamb of God who takes away the sin of the world',
        prophetic_principle: 'Substitutionary sacrifice',
        historical_context: 'Jesus\' baptism and ministry, culminating in His crucifixion',
        theological_significance: 'Establishes Christ as the ultimate sacrifice for sin',
        adventist_interpretation: 'The daily sacrifices pointed to Christ\'s once-for-all sacrifice on Calvary.',
        fulfillment_certainty: 'certain',
      },
    ];

    const { error: fulfillmentError } = await supabase
      .from('symbolism_prophetic_fulfillments')
      .insert(propheticFulfillments);

    if (fulfillmentError) throw fulfillmentError;
    console.log(`✓ Inserted ${propheticFulfillments.length} prophetic fulfillments`);

    // ========================================================================
    // PHASE 5: Linguistic Deep Dive
    // ========================================================================

    console.log('Seeding word studies...');

    const wordStudies = [
      {
        symbol_id: symbolId1,
        original_word: 'אֲרוֹן',
        language: 'hebrew',
        transliteration: 'aron',
        strongs_number: 'H727',
        pronunciation_ipa: 'ʔäˈrōn',
        root_word: 'ארה',
        part_of_speech: 'noun',
        word_frequency: 203,
        first_occurrence: 'Genesis 50:26',
        last_occurrence: '2 Chronicles 35:3',
        total_occurrences: 203,
        testament: 'OT',
      },
      {
        symbol_id: symbolId2,
        original_word: 'מִזְבֵּחַ',
        language: 'hebrew',
        transliteration: 'mizbeach',
        strongs_number: 'H4196',
        pronunciation_ipa: 'mizˈbēaḥ',
        root_word: 'זבח',
        part_of_speech: 'noun',
        word_frequency: 403,
        first_occurrence: 'Genesis 8:20',
        last_occurrence: 'Malachi 2:13',
        total_occurrences: 403,
        testament: 'OT',
      },
      {
        symbol_id: symbolId3,
        original_word: 'זָהָב',
        language: 'hebrew',
        transliteration: 'zahav',
        strongs_number: 'H2091',
        pronunciation_ipa: 'zäˈhäv',
        part_of_speech: 'noun',
        word_frequency: 385,
        first_occurrence: 'Genesis 2:11',
        total_occurrences: 385,
        testament: 'OT',
      },
    ];

    const { data: insertedWords, error: wordsError } = await supabase
      .from('symbolism_word_studies')
      .insert(wordStudies)
      .select();

    if (wordsError) throw wordsError;
    console.log(`✓ Inserted ${insertedWords.length} word studies`);

    // Etymology
    if (insertedWords && insertedWords.length > 0) {
      const etymologies = [
        {
          word_study_id: insertedWords[0].id,
          etymological_origin: 'From the root ארה (arah), meaning "to gather" or "to pluck"',
          cognate_languages: [
            { language: 'Aramaic', word: 'ארונא', transliteration: 'arona', meaning: 'chest, box' },
            { language: 'Arabic', word: 'عرين', transliteration: 'arin', meaning: 'den, lair' },
          ],
          historical_development: 'The word originally referred to any chest or box, but became specifically associated with the sacred ark of the covenant.',
          cultural_context: 'In ancient Near Eastern culture, sacred objects were often kept in ornate boxes or chests.',
          meaning_evolution: 'Evolved from a general term for container to a specific designation for the most sacred object in Israel\'s worship.',
        },
        {
          word_study_id: insertedWords[1].id,
          etymological_origin: 'From זבח (zabach), meaning "to slaughter" or "to sacrifice"',
          cognate_languages: [
            { language: 'Aramaic', word: 'מדבחא', transliteration: 'madbecha', meaning: 'altar' },
            { language: 'Arabic', word: 'مذبح', transliteration: 'mathbah', meaning: 'slaughter place' },
          ],
          historical_development: 'Derived from the verb "to sacrifice," emphasizing the altar\'s primary function.',
          cultural_context: 'Altars were central to ancient Near Eastern worship and covenant-making ceremonies.',
        },
      ];

      const { error: etymologyError } = await supabase
        .from('symbolism_etymology')
        .insert(etymologies);

      if (etymologyError) throw etymologyError;
      console.log(`✓ Inserted ${etymologies.length} etymologies`);

      // Semantic ranges
      const semanticRanges = [
        {
          word_study_id: insertedWords[0].id,
          meaning_category: 'Container/Chest',
          definition: 'A box or chest used for storing valuable items',
          usage_context: 'General usage for any chest or box',
          example_verses: ['Genesis 50:26', 'Exodus 25:10'],
          frequency_in_context: 20,
          theological_significance: 'Represents containment and preservation of sacred objects',
        },
        {
          word_study_id: insertedWords[0].id,
          meaning_category: 'Covenant Symbol',
          definition: 'The specific chest containing the tablets of the covenant',
          usage_context: 'Sacred/religious context',
          example_verses: ['Exodus 25:22', 'Deuteronomy 10:8', '1 Samuel 4:3'],
          frequency_in_context: 183,
          theological_significance: 'Primary symbol of God\'s presence and covenant with Israel',
          translation_notes: 'Often translated as "Ark of the Covenant" or "Ark of the Testimony"',
        },
      ];

      const { error: rangesError } = await supabase
        .from('symbolism_semantic_ranges')
        .insert(semanticRanges);

      if (rangesError) throw rangesError;
      console.log(`✓ Inserted ${semanticRanges.length} semantic ranges`);
    }

    // ========================================================================
    // PHASE 7: 3D Models (metadata only - actual models would be uploaded)
    // ========================================================================

    console.log('Seeding 3D model metadata...');

    const models3D = [
      {
        symbol_id: symbolId1,
        model_name: 'Ark of the Covenant - High Detail',
        model_url: '/models/ark-of-covenant.glb',
        model_format: 'glb',
        thumbnail_url: '/models/thumbnails/ark-thumb.jpg',
        poly_count: 45000,
        texture_resolution: '4K',
        file_size_mb: 12.5,
        scale_factor: 1.0,
        initial_camera_position: {
          x: 0,
          y: 1.5,
          z: 3,
          targetX: 0,
          targetY: 0.5,
          targetZ: 0,
        },
        lighting_preset: 'sanctuary',
        pbr_materials: true,
        animation_available: true,
        vr_compatible: true,
        mobile_optimized: false,
        load_priority: 1,
      },
      {
        symbol_id: symbolId2,
        model_name: 'Altar of Burnt Offering',
        model_url: '/models/altar-burnt-offering.glb',
        model_format: 'glb',
        thumbnail_url: '/models/thumbnails/altar-thumb.jpg',
        poly_count: 28000,
        texture_resolution: '2K',
        file_size_mb: 8.2,
        pbr_materials: true,
        mobile_optimized: true,
        load_priority: 2,
      },
    ];

    const { data: inserted3D, error: models3DError } = await supabase
      .from('symbolism_3d_models')
      .insert(models3D)
      .select();

    if (models3DError) throw models3DError;
    console.log(`✓ Inserted ${inserted3D.length} 3D model metadata entries`);

    // 3D Hotspots
    if (inserted3D && inserted3D.length > 0) {
      const hotspots3D = [
        {
          model_id: inserted3D[0].id,
          hotspot_name: 'Mercy Seat',
          position_x: 0,
          position_y: 1.2,
          position_z: 0,
          hotspot_type: 'info',
          title: 'The Mercy Seat',
          description: 'The golden lid where God\'s presence dwelt between the cherubim',
          scripture_reference: 'Exodus 25:17-22',
          popup_content: 'This was the place where the high priest sprinkled blood on the Day of Atonement.',
        },
        {
          model_id: inserted3D[0].id,
          hotspot_name: 'Cherubim',
          position_x: 0.5,
          position_y: 1.3,
          position_z: 0,
          hotspot_type: 'symbol',
          title: 'Golden Cherubim',
          description: 'Angelic beings guarding the mercy seat',
          scripture_reference: 'Exodus 25:18-20',
        },
      ];

      const { error: hotspotsError } = await supabase
        .from('symbolism_3d_hotspots')
        .insert(hotspots3D);

      if (hotspotsError) throw hotspotsError;
      console.log(`✓ Inserted ${hotspots3D.length} 3D hotspots`);

      // 3D Animations
      const animations3D = [
        {
          model_id: inserted3D[0].id,
          animation_name: 'Ark Construction Sequence',
          animation_type: 'construction',
          duration_seconds: 45,
          keyframes: [
            { time: 0, camera_position: { x: 2, y: 2, z: 2, targetX: 0, targetY: 0, targetZ: 0 } },
            { time: 15, camera_position: { x: -2, y: 2, z: 2, targetX: 0, targetY: 0, targetZ: 0 } },
          ],
          narration_text: 'Watch as the Ark of the Covenant is constructed according to God\'s specifications given to Moses.',
          auto_play: false,
        },
      ];

      const { error: animationsError } = await supabase
        .from('symbolism_3d_animations')
        .insert(animations3D);

      if (animationsError) throw animationsError;
      console.log(`✓ Inserted ${animations3D.length} 3D animations`);
    }

    // ========================================================================
    // PHASE 8: Learning Features
    // ========================================================================

    console.log('Seeding learning paths...');

    const learningPaths = [
      {
        path_name: 'Introduction to Sanctuary Symbolism',
        path_description: 'A beginner-friendly journey through the basic symbols of the sanctuary',
        difficulty_level: 'beginner',
        estimated_duration_minutes: 45,
        path_order: 1,
        prerequisites: [],
        learning_objectives: [
          'Understand the basic layout of the sanctuary',
          'Identify major furnishings and their symbolic meanings',
          'Recognize the typological significance of sanctuary elements',
        ],
        symbol_sequence: [symbolId1, symbolId2, symbolId3],
        is_published: true,
      },
      {
        path_name: 'Type and Antitype: Sanctuary in Prophecy',
        path_description: 'Advanced study of how sanctuary symbols find fulfillment in Christ',
        difficulty_level: 'advanced',
        estimated_duration_minutes: 90,
        path_order: 2,
        prerequisites: ['Introduction to Sanctuary Symbolism'],
        learning_objectives: [
          'Master typological interpretation methods',
          'Understand progressive revelation in sanctuary typology',
          'Apply sanctuary symbolism to prophetic interpretation',
        ],
        symbol_sequence: [symbolId1, symbolId2],
        is_published: true,
      },
    ];

    const { error: pathsError } = await supabase
      .from('symbolism_learning_paths')
      .insert(learningPaths);

    if (pathsError) throw pathsError;
    console.log(`✓ Inserted ${learningPaths.length} learning paths`);

    // Quizzes
    console.log('Seeding quizzes...');

    const quizzes = [
      {
        symbol_id: symbolId1,
        question_text: 'What did the Ark of the Covenant contain?',
        question_type: 'multiple_choice',
        correct_answer: 'The Ten Commandments, Aaron\'s rod, and a pot of manna',
        wrong_answers: [
          'Only the Ten Commandments',
          'Gold and precious stones',
          'Scrolls of the Torah',
        ],
        explanation: 'According to Hebrews 9:4, the ark contained the golden pot of manna, Aaron\'s rod that budded, and the tablets of the covenant.',
        difficulty: 'medium',
        scripture_reference: 'Hebrews 9:4',
        points: 10,
      },
      {
        symbol_id: symbolId1,
        question_text: 'The mercy seat on the ark pointed to Christ\'s role as our mediator.',
        question_type: 'true_false',
        correct_answer: 'True',
        wrong_answers: ['False'],
        explanation: 'The mercy seat represented God\'s throne of grace, fulfilled in Christ\'s mediatorial ministry.',
        difficulty: 'easy',
        scripture_reference: 'Hebrews 4:16',
        points: 5,
      },
      {
        symbol_id: symbolId2,
        question_text: 'The altar of burnt offering symbolized what aspect of Christ\'s ministry?',
        question_type: 'multiple_choice',
        correct_answer: 'His sacrificial death on the cross',
        wrong_answers: [
          'His high priestly intercession',
          'His second coming',
          'His teaching ministry',
        ],
        explanation: 'The altar where sacrifices were offered pointed to Christ\'s ultimate sacrifice on Calvary.',
        difficulty: 'easy',
        scripture_reference: 'Hebrews 13:10-12',
        points: 10,
      },
    ];

    const { error: quizzesError } = await supabase
      .from('symbolism_quizzes')
      .insert(quizzes);

    if (quizzesError) throw quizzesError;
    console.log(`✓ Inserted ${quizzes.length} quizzes`);

    console.log('\n✅ Advanced symbolism phases seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- Library Resources: Created books, articles, videos with references');
    console.log('- Typology: Established type/antitype connections and prophetic fulfillments');
    console.log('- Linguistics: Added Hebrew word studies with etymology and semantic ranges');
    console.log('- 3D Integration: Created model metadata with hotspots and animations');
    console.log('- Learning: Built learning paths and interactive quizzes');

  } catch (error) {
    console.error('Error seeding advanced symbolism phases:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedSymbolismAdvancedPhases()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedSymbolismAdvancedPhases };
