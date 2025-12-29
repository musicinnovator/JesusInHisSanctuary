import { supabase } from '../lib/supabase';

interface ScriptureReference {
  reference: string;
  book_name: string;
  chapter_verse: string;
  context_in_book: string;
  footnote_number: number;
  quote_text?: string;
  testament: 'Old' | 'New';
  category: string;
}

// Sample scripture references from key chapters
// This demonstrates the structure - full implementation would include all 1,114+ references
const sampleScriptures: { [chapterNumber: number]: ScriptureReference[] } = {
  1: [
    {
      reference: 'Exodus 25:8',
      book_name: 'Exodus',
      chapter_verse: '25:8',
      context_in_book: 'God\'s command to build the sanctuary - "Let them make me a sanctuary; that I may dwell among them"',
      footnote_number: 1,
      quote_text: 'And let them make me a sanctuary; that I may dwell among them.',
      testament: 'Old',
      category: 'Foundation - Divine Command'
    },
    {
      reference: 'Exodus 25:9',
      book_name: 'Exodus',
      chapter_verse: '25:9',
      context_in_book: 'The sanctuary to be built according to the heavenly pattern',
      footnote_number: 2,
      quote_text: 'According to all that I shew thee, after the pattern of the tabernacle.',
      testament: 'Old',
      category: 'Pattern - Heavenly Original'
    },
    {
      reference: 'Exodus 25:40',
      book_name: 'Exodus',
      chapter_verse: '25:40',
      context_in_book: 'Emphasis on following the exact pattern shown on the mount',
      footnote_number: 3,
      quote_text: 'And look that thou make them after their pattern, which was shewed thee in the mount.',
      testament: 'Old',
      category: 'Pattern - Divine Precision'
    },
    {
      reference: 'Hebrews 8:5',
      book_name: 'Hebrews',
      chapter_verse: '8:5',
      context_in_book: 'New Testament confirmation that earthly sanctuary was copy of heavenly',
      footnote_number: 4,
      quote_text: 'Who serve unto the example and shadow of heavenly things.',
      testament: 'New',
      category: 'Fulfillment - Heavenly Reality'
    },
    {
      reference: 'Hebrews 9:23-24',
      book_name: 'Hebrews',
      chapter_verse: '9:23-24',
      context_in_book: 'Earthly sanctuary a pattern of heavenly things; Christ entered the true sanctuary',
      footnote_number: 5,
      quote_text: 'The patterns of things in the heavens... but into heaven itself.',
      testament: 'New',
      category: 'Fulfillment - Christ in Heavenly Sanctuary'
    }
  ],
  8: [
    {
      reference: 'Exodus 25:10-22',
      book_name: 'Exodus',
      chapter_verse: '25:10-22',
      context_in_book: 'Detailed instructions for building the ark of the covenant',
      footnote_number: 15,
      testament: 'Old',
      category: 'Construction - Ark Specifications'
    },
    {
      reference: 'Deuteronomy 10:1-5',
      book_name: 'Deuteronomy',
      chapter_verse: '10:1-5',
      context_in_book: 'The tables of the law placed inside the ark',
      footnote_number: 16,
      quote_text: 'And I will write on the tables the words that were in the first tables which thou brakest, and thou shalt put them in the ark.',
      testament: 'Old',
      category: 'Content - Law in the Ark'
    },
    {
      reference: 'Hebrews 9:4',
      book_name: 'Hebrews',
      chapter_verse: '9:4',
      context_in_book: 'Description of ark contents in New Testament',
      footnote_number: 17,
      quote_text: 'Which had... the ark of the covenant... wherein was... the tables of the covenant.',
      testament: 'New',
      category: 'Confirmation - New Testament Reference'
    },
    {
      reference: 'Revelation 11:19',
      book_name: 'Revelation',
      chapter_verse: '11:19',
      context_in_book: 'Vision of the ark in God\'s temple in heaven',
      footnote_number: 18,
      quote_text: 'And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament.',
      testament: 'New',
      category: 'Prophetic - Heavenly Ark Revealed'
    }
  ],
  11: [
    {
      reference: 'Hebrews 4:14-16',
      book_name: 'Hebrews',
      chapter_verse: '4:14-16',
      context_in_book: 'Jesus as our great High Priest who passed into the heavens',
      footnote_number: 25,
      quote_text: 'Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son of God.',
      testament: 'New',
      category: 'Christ\'s Priesthood - High Priest'
    },
    {
      reference: 'Hebrews 5:5-10',
      book_name: 'Hebrews',
      chapter_verse: '5:5-10',
      context_in_book: 'Christ appointed by God as High Priest after the order of Melchizedek',
      footnote_number: 26,
      quote_text: 'Thou art a priest for ever after the order of Melchisedec.',
      testament: 'New',
      category: 'Christ\'s Priesthood - Melchizedek Order'
    },
    {
      reference: 'Hebrews 7:26-28',
      book_name: 'Hebrews',
      chapter_verse: '7:26-28',
      context_in_book: 'Christ\'s superiority over Aaronic priests',
      footnote_number: 27,
      quote_text: 'For such an high priest became us, who is holy, harmless, undefiled, separate from sinners.',
      testament: 'New',
      category: 'Christ\'s Priesthood - Perfect Priest'
    },
    {
      reference: 'Hebrews 8:1-2',
      book_name: 'Hebrews',
      chapter_verse: '8:1-2',
      context_in_book: 'Christ ministers in the true heavenly sanctuary',
      footnote_number: 28,
      quote_text: 'We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle.',
      testament: 'New',
      category: 'Christ\'s Priesthood - Heavenly Ministry'
    }
  ],
  23: [
    {
      reference: 'Exodus 12:1-28',
      book_name: 'Exodus',
      chapter_verse: '12:1-28',
      context_in_book: 'Complete instructions for the Passover lamb and deliverance from Egypt',
      footnote_number: 85,
      testament: 'Old',
      category: 'Passover - Institution'
    },
    {
      reference: 'John 1:29',
      book_name: 'John',
      chapter_verse: '1:29',
      context_in_book: 'John the Baptist identifies Jesus as the Lamb of God',
      footnote_number: 86,
      quote_text: 'Behold the Lamb of God, which taketh away the sin of the world.',
      testament: 'New',
      category: 'Passover - Christ the Lamb'
    },
    {
      reference: '1 Corinthians 5:7',
      book_name: '1 Corinthians',
      chapter_verse: '5:7',
      context_in_book: 'Paul explicitly identifies Christ as our Passover',
      footnote_number: 87,
      quote_text: 'For even Christ our passover is sacrificed for us.',
      testament: 'New',
      category: 'Passover - Fulfillment in Christ'
    },
    {
      reference: '1 Peter 1:19',
      book_name: '1 Peter',
      chapter_verse: '1:19',
      context_in_book: 'Christ as the lamb without blemish and without spot',
      footnote_number: 88,
      quote_text: 'But with the precious blood of Christ, as of a lamb without blemish and without spot.',
      testament: 'New',
      category: 'Passover - Perfect Sacrifice'
    }
  ],
  28: [
    {
      reference: 'Leviticus 16:1-34',
      book_name: 'Leviticus',
      chapter_verse: '16:1-34',
      context_in_book: 'Complete instructions for the Day of Atonement ceremony',
      footnote_number: 120,
      testament: 'Old',
      category: 'Day of Atonement - Ceremony'
    },
    {
      reference: 'Leviticus 23:27-32',
      book_name: 'Leviticus',
      chapter_verse: '23:27-32',
      context_in_book: 'Day of Atonement as a special Sabbath of affliction',
      footnote_number: 121,
      testament: 'Old',
      category: 'Day of Atonement - Observance'
    },
    {
      reference: 'Daniel 8:14',
      book_name: 'Daniel',
      chapter_verse: '8:14',
      context_in_book: 'The 2300-day prophecy pointing to cleansing of the sanctuary',
      footnote_number: 122,
      quote_text: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
      testament: 'Old',
      category: 'Day of Atonement - Prophetic Fulfillment'
    },
    {
      reference: 'Hebrews 9:23-24',
      book_name: 'Hebrews',
      chapter_verse: '9:23-24',
      context_in_book: 'Heavenly sanctuary cleansed with better sacrifices',
      footnote_number: 123,
      quote_text: 'It was therefore necessary that the patterns of things in the heavens should be purified with these; but the heavenly things themselves with better sacrifices.',
      testament: 'New',
      category: 'Day of Atonement - Heavenly Antitype'
    }
  ],
  39: [
    {
      reference: 'Daniel 8:13-14',
      book_name: 'Daniel',
      chapter_verse: '8:13-14',
      context_in_book: 'The 2300-day prophecy - cornerstone of Adventist sanctuary doctrine',
      footnote_number: 200,
      quote_text: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
      testament: 'Old',
      category: 'Prophecy - 2300 Days'
    },
    {
      reference: 'Daniel 9:24-27',
      book_name: 'Daniel',
      chapter_verse: '9:24-27',
      context_in_book: 'The 70-week prophecy providing the starting point for 2300 days',
      footnote_number: 201,
      quote_text: 'Seventy weeks are determined upon thy people.',
      testament: 'Old',
      category: 'Prophecy - 70 Weeks'
    },
    {
      reference: 'Ezra 7:7-26',
      book_name: 'Ezra',
      chapter_verse: '7:7-26',
      context_in_book: 'Decree of Artaxerxes in 457 BC - starting point of prophecy',
      footnote_number: 202,
      testament: 'Old',
      category: 'Prophecy - Starting Date'
    },
    {
      reference: 'Hebrews 9:23',
      book_name: 'Hebrews',
      chapter_verse: '9:23',
      context_in_book: 'Heavenly sanctuary needs cleansing',
      footnote_number: 203,
      quote_text: 'The patterns of things in the heavens should be purified.',
      testament: 'New',
      category: 'Prophecy - Heavenly Cleansing'
    }
  ],
  44: [
    {
      reference: 'Daniel 7:9-10',
      book_name: 'Daniel',
      chapter_verse: '7:9-10',
      context_in_book: 'Vision of the judgment scene in heaven',
      footnote_number: 250,
      quote_text: 'The Ancient of days did sit... the judgment was set, and the books were opened.',
      testament: 'Old',
      category: 'Judgment - Heavenly Scene'
    },
    {
      reference: 'Daniel 8:14',
      book_name: 'Daniel',
      chapter_verse: '8:14',
      context_in_book: 'Time prophecy pointing to beginning of Most Holy Place ministry',
      footnote_number: 251,
      quote_text: 'Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
      testament: 'Old',
      category: 'Judgment - Time Prophecy'
    },
    {
      reference: 'Revelation 11:19',
      book_name: 'Revelation',
      chapter_verse: '11:19',
      context_in_book: 'Temple in heaven opened revealing the ark',
      footnote_number: 252,
      quote_text: 'And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament.',
      testament: 'New',
      category: 'Judgment - Most Holy Place Opened'
    },
    {
      reference: 'Hebrews 9:23',
      book_name: 'Hebrews',
      chapter_verse: '9:23',
      context_in_book: 'Heavenly sanctuary being cleansed',
      footnote_number: 253,
      testament: 'New',
      category: 'Judgment - Cleansing Work'
    }
  ],
  50: [
    {
      reference: 'Revelation 21:1-5',
      book_name: 'Revelation',
      chapter_verse: '21:1-5',
      context_in_book: 'Vision of new heaven and new earth - ultimate fulfillment',
      footnote_number: 300,
      quote_text: 'And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away.',
      testament: 'New',
      category: 'Restoration - New Earth'
    },
    {
      reference: 'Revelation 21:3',
      book_name: 'Revelation',
      chapter_verse: '21:3',
      context_in_book: 'God dwelling with humanity forever - sanctuary promise fulfilled',
      footnote_number: 301,
      quote_text: 'Behold, the tabernacle of God is with men, and he will dwell with them.',
      testament: 'New',
      category: 'Restoration - God\'s Presence'
    },
    {
      reference: '2 Peter 3:13',
      book_name: '2 Peter',
      chapter_verse: '3:13',
      context_in_book: 'Promise of new heavens and earth where righteousness dwells',
      footnote_number: 302,
      quote_text: 'Nevertheless we, according to his promise, look for new heavens and a new earth, wherein dwelleth righteousness.',
      testament: 'New',
      category: 'Restoration - Righteousness Forever'
    },
    {
      reference: 'Isaiah 65:17',
      book_name: 'Isaiah',
      chapter_verse: '65:17',
      context_in_book: 'Old Testament promise of new creation',
      footnote_number: 303,
      quote_text: 'For, behold, I create new heavens and a new earth: and the former shall not be remembered.',
      testament: 'Old',
      category: 'Restoration - Prophetic Promise'
    }
  ]
};

export async function seedCrossShadowScriptures() {
  try {
    console.log('Starting to seed scripture references...');

    // Get the book
    const { data: book, error: bookError } = await supabase
      .from('cross_shadow_book')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (bookError) throw bookError;
    if (!book) {
      console.error('Book not found. Please run seedCrossShadowBook first.');
      return;
    }

    // Get all chapters
    const { data: chapters, error: chaptersError } = await supabase
      .from('cross_shadow_chapters')
      .select('id, chapter_number')
      .eq('book_id', book.id);

    if (chaptersError) throw chaptersError;
    if (!chapters || chapters.length === 0) {
      console.error('No chapters found. Please run seedCrossShadowBook first.');
      return;
    }

    // Create chapter lookup
    const chapterLookup: { [key: number]: string } = {};
    chapters.forEach(ch => {
      chapterLookup[ch.chapter_number] = ch.id;
    });

    // Insert scriptures for each chapter
    let totalInserted = 0;
    for (const [chapterNum, scriptures] of Object.entries(sampleScriptures)) {
      const chapterNumber = parseInt(chapterNum);
      const chapterId = chapterLookup[chapterNumber];

      if (!chapterId) {
        console.warn(`Chapter ${chapterNumber} not found, skipping...`);
        continue;
      }

      const scripturesToInsert = scriptures.map(scripture => ({
        book_id: book.id,
        chapter_id: chapterId,
        reference: scripture.reference,
        book_name: scripture.book_name,
        chapter_verse: scripture.chapter_verse,
        context_in_book: scripture.context_in_book,
        footnote_number: scripture.footnote_number,
        quote_text: scripture.quote_text,
        testament: scripture.testament,
        category: scripture.category
      }));

      const { error: insertError } = await supabase
        .from('cross_shadow_scriptures')
        .insert(scripturesToInsert);

      if (insertError) {
        console.error(`Error inserting scriptures for chapter ${chapterNumber}:`, insertError);
      } else {
        totalInserted += scripturesToInsert.length;
        console.log(`Inserted ${scripturesToInsert.length} scriptures for chapter ${chapterNumber}`);
      }
    }

    // Update book scripture count
    const { error: updateError } = await supabase
      .from('cross_shadow_book')
      .update({ total_scriptures: totalInserted })
      .eq('id', book.id);

    if (updateError) {
      console.error('Error updating scripture count:', updateError);
    }

    console.log(`✅ Successfully seeded ${totalInserted} scripture references!`);
    console.log('Note: This is a sample set. Full implementation would include all 1,114+ references.');

  } catch (error) {
    console.error('Error seeding scriptures:', error);
  }
}
