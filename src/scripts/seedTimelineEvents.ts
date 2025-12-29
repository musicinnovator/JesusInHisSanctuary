import { supabase } from '../lib/supabase';

interface TimelineEventData {
  timeline_type: 'historical' | 'contemporary' | 'biblical';
  event_year: number;
  event_date?: string;
  event_title: string;
  event_description: string;
  significance: string;
  related_scriptures?: string[];
  related_people?: string[];
  display_order: number;
}

const timelineEvents: TimelineEventData[] = [
  // BIBLICAL TIMELINE - Sanctuary through history
  {
    timeline_type: 'biblical',
    event_year: -1450,
    event_date: '1450-01-01',
    event_title: 'Wilderness Tabernacle Built',
    event_description: 'God commands Moses to build the tabernacle according to the heavenly pattern shown on Mount Sinai. The sanctuary becomes the center of Israelite worship.',
    significance: 'Establishes the sanctuary system as a type of Christ\'s heavenly ministry. Every element points forward to the Messiah\'s sacrificial and priestly work.',
    related_scriptures: ['Exodus 25:8-9', 'Exodus 25:40', 'Exodus 40:34-38', 'Hebrews 8:5'],
    related_people: ['Moses', 'Aaron', 'Bezaleel'],
    display_order: 1
  },
  {
    timeline_type: 'biblical',
    event_year: -1450,
    event_date: '1450-07-10',
    event_title: 'First Day of Atonement',
    event_description: 'The first Day of Atonement ceremony is conducted, with the high priest entering the Most Holy Place to make atonement for Israel\'s sins.',
    significance: 'The Day of Atonement becomes the most solemn day of the year, foreshadowing the final judgment and cleansing of sin. This ceremony is the type of Christ\'s work beginning in 1844.',
    related_scriptures: ['Leviticus 16:29-34', 'Leviticus 23:27-32', 'Hebrews 9:7'],
    related_people: ['Aaron'],
    display_order: 2
  },
  {
    timeline_type: 'biblical',
    event_year: -970,
    event_date: '970-01-01',
    event_title: 'Solomon\'s Temple Dedicated',
    event_description: 'King Solomon completes the magnificent temple in Jerusalem, replacing the portable tabernacle. God\'s glory fills the temple.',
    significance: 'The temple becomes the permanent dwelling place of God\'s presence among His people. Its structure and services continue the typology of Christ\'s work.',
    related_scriptures: ['1 Kings 6:1', '1 Kings 8:10-11', '2 Chronicles 5:13-14', '2 Chronicles 7:1-3'],
    related_people: ['Solomon', 'David'],
    display_order: 3
  },
  {
    timeline_type: 'biblical',
    event_year: -586,
    event_date: '586-08-01',
    event_title: 'Temple Destroyed by Babylon',
    event_description: 'Nebuchadnezzar\'s army destroys Solomon\'s temple, and the people are taken into Babylonian captivity.',
    significance: 'The destruction fulfills prophecy but does not end God\'s plan. The sanctuary system will be restored, continuing until its fulfillment in Christ.',
    related_scriptures: ['2 Kings 25:8-9', '2 Chronicles 36:17-19', 'Jeremiah 52:12-13'],
    related_people: ['Nebuchadnezzar', 'Zedekiah'],
    display_order: 4
  },
  {
    timeline_type: 'biblical',
    event_year: -516,
    event_date: '516-03-12',
    event_title: 'Second Temple Completed',
    event_description: 'Under Zerubbabel\'s leadership, the returning exiles complete the rebuilding of the temple, though less glorious than Solomon\'s.',
    significance: 'The restoration of the temple allows the sanctuary services to resume, maintaining the typology pointing to Christ until His first advent.',
    related_scriptures: ['Ezra 6:14-15', 'Haggai 2:3', 'Haggai 2:9', 'Zechariah 4:9'],
    related_people: ['Zerubbabel', 'Joshua', 'Haggai', 'Zechariah'],
    display_order: 5
  },
  {
    timeline_type: 'biblical',
    event_year: -457,
    event_date: '457-01-01',
    event_title: 'Decree to Restore Jerusalem',
    event_description: 'Persian King Artaxerxes issues the decree to restore and rebuild Jerusalem, marking the beginning of the 2300-day prophecy.',
    significance: 'This decree starts the prophetic clock of Daniel 9:25 and Daniel 8:14. The 2300 years will end in 1844 AD.',
    related_scriptures: ['Daniel 9:25', 'Ezra 7:11-26', 'Daniel 8:14'],
    related_people: ['Artaxerxes', 'Ezra'],
    display_order: 6
  },
  {
    timeline_type: 'biblical',
    event_year: -4,
    event_date: '0004-12-25',
    event_title: 'Birth of Christ',
    event_description: 'The Son of God is born in Bethlehem, becoming the reality of all sanctuary types and shadows.',
    significance: 'The true Lamb of God enters the world. Every sacrifice in the sanctuary pointed to this moment.',
    related_scriptures: ['Luke 2:7-11', 'John 1:29', 'Galatians 4:4'],
    related_people: ['Jesus Christ', 'Mary', 'Joseph'],
    display_order: 7
  },
  {
    timeline_type: 'biblical',
    event_year: 27,
    event_date: '0027-10-01',
    event_title: 'Christ\'s Baptism and Anointing',
    event_description: 'Jesus is baptized by John and anointed by the Holy Spirit, marking the beginning of His public ministry at age 30, just as priests began their service at 30.',
    significance: 'Fulfills the "unto Messiah the Prince" prophecy of Daniel 9:25 (69 weeks from 457 BC = AD 27). Christ is anointed as priest and king.',
    related_scriptures: ['Luke 3:21-22', 'Daniel 9:25', 'Acts 10:38', 'Numbers 4:3'],
    related_people: ['Jesus Christ', 'John the Baptist'],
    display_order: 8
  },
  {
    timeline_type: 'biblical',
    event_year: 31,
    event_date: '0031-04-14',
    event_title: 'Christ\'s Crucifixion',
    event_description: 'Christ dies on Passover, becoming the true Passover Lamb. The veil of the temple is torn from top to bottom, signifying the end of the earthly sanctuary system.',
    significance: 'Fulfills all the sacrificial types. The earthly sanctuary services no longer have meaning - Christ has offered the ultimate sacrifice. The 70 weeks prophecy is fulfilled.',
    related_scriptures: ['Matthew 27:50-51', '1 Corinthians 5:7', 'Hebrews 9:12', 'Daniel 9:27'],
    related_people: ['Jesus Christ', 'Pontius Pilate'],
    display_order: 9
  },
  {
    timeline_type: 'biblical',
    event_year: 31,
    event_date: '0031-05-25',
    event_title: 'Christ\'s Ascension to Heaven',
    event_description: 'Forty days after His resurrection, Christ ascends to heaven and enters the heavenly sanctuary to begin His high priestly ministry.',
    significance: 'Christ begins His work as High Priest in the Holy Place of the heavenly sanctuary. This starts the "daily" phase of His ministry - applying His sacrifice and interceding for believers.',
    related_scriptures: ['Acts 1:9-11', 'Hebrews 8:1-2', 'Hebrews 9:24', 'Luke 24:50-51'],
    related_people: ['Jesus Christ', 'The Apostles'],
    display_order: 10
  },
  {
    timeline_type: 'biblical',
    event_year: 70,
    event_date: '0070-08-10',
    event_title: 'Destruction of Jerusalem Temple',
    event_description: 'The Roman army under Titus destroys the temple in Jerusalem, ending all possibility of continuing the earthly sanctuary services.',
    significance: 'The complete fulfillment of Christ\'s prophecy in Matthew 24. The earthly type has served its purpose - all eyes must now look to the heavenly reality.',
    related_scriptures: ['Matthew 24:1-2', 'Luke 21:20-24', 'Daniel 9:26'],
    related_people: ['Titus', 'Josephus'],
    display_order: 11
  },
  {
    timeline_type: 'biblical',
    event_year: 1844,
    event_date: '1844-10-22',
    event_title: 'Cleansing of the Sanctuary Begins',
    event_description: 'At the end of the 2300-day prophecy, Christ moves from the Holy Place to the Most Holy Place of the heavenly sanctuary, beginning the antitypical Day of Atonement.',
    significance: 'The investigative judgment begins. Christ starts the final phase of His priestly work - examining the books, cleansing the sanctuary, and determining who will receive eternal life. This is the antitype of the Day of Atonement.',
    related_scriptures: ['Daniel 8:14', 'Leviticus 16:30', 'Revelation 11:19', 'Hebrews 9:23'],
    related_people: ['Jesus Christ'],
    display_order: 12
  },

  // HISTORICAL TIMELINE - 1844 Movement and early Adventism
  {
    timeline_type: 'historical',
    event_year: 1831,
    event_date: '1831-08-01',
    event_title: 'William Miller Begins Public Preaching',
    event_description: 'After years of studying Bible prophecy, Baptist minister William Miller begins publicly preaching that Christ will return around 1843-1844.',
    significance: 'Launches the Millerite movement, awakening thousands to study prophecy and prepare for Christ\'s return. This movement would lead to the Great Disappointment and eventually the Seventh-day Adventist Church.',
    related_scriptures: ['Daniel 8:14', 'Matthew 25:6', 'Revelation 14:7'],
    related_people: ['William Miller'],
    display_order: 1
  },
  {
    timeline_type: 'historical',
    event_year: 1840,
    event_date: '1840-08-11',
    event_title: 'Ottoman Empire Prophecy Fulfilled',
    event_description: 'Josiah Litch\'s precise prediction of the Ottoman Empire\'s fall on August 11, 1840, dramatically confirms the year-day principle and boosts confidence in prophetic interpretation.',
    significance: 'This fulfilled prophecy convinces many that the prophetic method is correct, leading thousands to accept Miller\'s message about 1844.',
    related_scriptures: ['Revelation 9:15'],
    related_people: ['Josiah Litch', 'William Miller'],
    display_order: 2
  },
  {
    timeline_type: 'historical',
    event_year: 1844,
    event_date: '1844-03-21',
    event_title: 'First Date Passes',
    event_description: 'March 21, 1844 (the Jewish year 1843) passes without Christ\'s return, causing the "First Disappointment" among Millerites.',
    significance: 'Though discouraging, believers reexamine their calculations and discover October 22, 1844 as the correct date for the end of the 2300 days.',
    related_scriptures: ['Daniel 8:14', 'Habakkuk 2:3'],
    related_people: ['William Miller', 'Samuel Snow'],
    display_order: 3
  },
  {
    timeline_type: 'historical',
    event_year: 1844,
    event_date: '1844-08-15',
    event_title: 'Midnight Cry Movement Begins',
    event_description: 'Samuel Snow preaches the "Midnight Cry" message at the Exeter camp meeting, proclaiming October 22, 1844 as the true date of Christ\'s return.',
    significance: 'Ignites intense revival and expectation. Thousands prepare for Christ\'s imminent return, selling property and settling accounts.',
    related_scriptures: ['Matthew 25:6', 'Daniel 8:14', 'Leviticus 23:27'],
    related_people: ['Samuel Snow', 'Joshua Himes'],
    display_order: 4
  },
  {
    timeline_type: 'historical',
    event_year: 1844,
    event_date: '1844-10-22',
    event_title: 'The Great Disappointment',
    event_description: 'October 22, 1844 passes without Christ\'s visible return. Believers experience crushing disappointment. Many abandon their faith, while others search for understanding.',
    significance: 'The Great Disappointment becomes the defining moment that forces believers to reexamine their understanding. This crisis leads to the discovery of the heavenly sanctuary truth.',
    related_scriptures: ['Habakkuk 2:3', 'Revelation 10:10', 'Daniel 8:14'],
    related_people: ['William Miller', 'Hiram Edson', 'O.R.L. Crosier'],
    display_order: 5
  },
  {
    timeline_type: 'historical',
    event_year: 1844,
    event_date: '1844-10-23',
    event_title: 'Hiram Edson\'s Vision',
    event_description: 'The morning after the Great Disappointment, Hiram Edson has a vision while crossing a cornfield: he sees Christ entering the Most Holy Place of the heavenly sanctuary.',
    significance: 'This vision provides the key to understanding what happened on October 22. Christ didn\'t come to earth - He entered a new phase of ministry in heaven, beginning the antitypical Day of Atonement.',
    related_scriptures: ['Daniel 8:14', 'Hebrews 9:24', 'Leviticus 16:30'],
    related_people: ['Hiram Edson', 'O.R.L. Crosier', 'F.B. Hahn'],
    display_order: 6
  },
  {
    timeline_type: 'historical',
    event_year: 1846,
    event_date: '1846-02-07',
    event_title: 'Crosier\'s Article Published',
    event_description: 'O.R.L. Crosier publishes "The Law of Moses" in the Day-Star Extra, providing the first comprehensive explanation of the sanctuary doctrine and what happened on October 22, 1844.',
    significance: 'This article becomes the theological foundation for the Seventh-day Adventist understanding of the sanctuary. It explains Christ\'s two-phase ministry and the investigative judgment.',
    related_scriptures: ['Daniel 8:14', 'Hebrews 8:1-2', 'Hebrews 9:23-24', 'Leviticus 16:30'],
    related_people: ['O.R.L. Crosier', 'Hiram Edson', 'Enoch Jacobs'],
    display_order: 7
  },
  {
    timeline_type: 'historical',
    event_year: 1846,
    event_date: '1846-04-21',
    event_title: 'Ellen White Endorses Sanctuary View',
    event_description: 'Ellen White receives a vision confirming the sanctuary truth and endorses Crosier\'s article, calling it "clear and scriptural light."',
    significance: 'The prophetic endorsement validates the sanctuary doctrine and unifies believers around this understanding. This becomes a pillar of Adventist theology.',
    related_scriptures: ['Revelation 11:19', 'Daniel 8:14', 'Hebrews 8:1-2'],
    related_people: ['Ellen G. White', 'O.R.L. Crosier', 'James White'],
    display_order: 8
  },
  {
    timeline_type: 'historical',
    event_year: 1848,
    event_date: '1848-04-20',
    event_title: 'Sabbath Conferences Begin',
    event_description: 'A series of Sabbath conferences brings together believers who accept the sanctuary truth, the seventh-day Sabbath, and Ellen White\'s prophetic gift.',
    significance: 'These conferences unify the scattered believers and establish the doctrinal foundation that will become the Seventh-day Adventist Church.',
    related_scriptures: ['Exodus 20:8-11', 'Revelation 14:6-12', 'Daniel 8:14'],
    related_people: ['James White', 'Ellen White', 'Joseph Bates', 'Hiram Edson'],
    display_order: 9
  },
  {
    timeline_type: 'historical',
    event_year: 1850,
    event_date: '1850-07-01',
    event_title: 'Present Truth Magazine Launched',
    event_description: 'James White begins publishing Present Truth magazine to spread the sanctuary truth and other distinctive doctrines.',
    significance: 'Establishes a publishing ministry that will become a powerful tool for spreading Adventist beliefs worldwide.',
    related_scriptures: ['2 Peter 1:12', 'Revelation 14:6-7'],
    related_people: ['James White', 'Ellen White'],
    display_order: 10
  },
  {
    timeline_type: 'historical',
    event_year: 1863,
    event_date: '1863-05-21',
    event_title: 'Seventh-day Adventist Church Organized',
    event_description: 'Believers formally organize the Seventh-day Adventist Church at a General Conference session in Battle Creek, Michigan.',
    significance: 'The sanctuary truth, born from the 1844 disappointment, has matured into a worldwide church with a clear identity and mission.',
    related_scriptures: ['Revelation 14:6-12', 'Daniel 8:14', 'Exodus 20:8-11'],
    related_people: ['James White', 'Ellen White', 'John Byington', 'J.N. Andrews'],
    display_order: 11
  },

  // CONTEMPORARY TIMELINE - Crosier's era with world context
  {
    timeline_type: 'contemporary',
    event_year: 1789,
    event_date: '1789-07-14',
    event_title: 'French Revolution Begins',
    event_description: 'The storming of the Bastille marks the beginning of the French Revolution, ushering in an era of political upheaval and questioning of religious authority.',
    significance: 'Creates intellectual climate of religious skepticism and prophetic interest. Many see these events as fulfilling biblical prophecy about the end times.',
    related_scriptures: ['Revelation 11:7-13', 'Daniel 7:25'],
    related_people: [],
    display_order: 1
  },
  {
    timeline_type: 'contemporary',
    event_year: 1798,
    event_date: '1798-02-10',
    event_title: 'Pope Pius VI Taken Captive',
    event_description: 'French General Berthier takes Pope Pius VI captive, fulfilling the 1260-year prophecy and triggering intense interest in Bible prophecy worldwide.',
    significance: 'Adventists see this as the "deadly wound" to papal power (Revelation 13:3) and the end of the 1260 years. Sparks worldwide prophetic awakening.',
    related_scriptures: ['Revelation 13:3', 'Revelation 13:10', 'Daniel 7:25'],
    related_people: ['Pope Pius VI', 'Napoleon Bonaparte'],
    display_order: 2
  },
  {
    timeline_type: 'contemporary',
    event_year: 1804,
    event_date: '1804-12-02',
    event_title: 'Napoleon Crowns Himself Emperor',
    event_description: 'Napoleon Bonaparte crowns himself Emperor of France, beginning a period of European wars and imperial expansion.',
    significance: 'European political turmoil heightens interest in Bible prophecy and end-time events across the Christian world.',
    related_scriptures: ['Daniel 11:40-45'],
    related_people: ['Napoleon Bonaparte'],
    display_order: 3
  },
  {
    timeline_type: 'contemporary',
    event_year: 1815,
    event_date: '1815-06-18',
    event_title: 'Battle of Waterloo',
    event_description: 'Napoleon is defeated at Waterloo, ending his empire and ushering in a new era of European stability.',
    significance: 'Political changes continue to fuel apocalyptic expectations and prophetic study worldwide.',
    related_scriptures: ['Daniel 11:45'],
    related_people: ['Napoleon Bonaparte', 'Duke of Wellington'],
    display_order: 4
  },
  {
    timeline_type: 'contemporary',
    event_year: 1821,
    event_date: '1821-03-25',
    event_title: 'Greek War of Independence',
    event_description: 'Greece begins its war for independence from the Ottoman Empire, part of the declining power of the Turks.',
    significance: 'The weakening of the Ottoman Empire is seen as fulfillment of Revelation 9, encouraging prophetic interpreters.',
    related_scriptures: ['Revelation 9:13-15'],
    related_people: [],
    display_order: 5
  },
  {
    timeline_type: 'contemporary',
    event_year: 1830,
    event_date: '1830-07-05',
    event_title: 'French July Revolution',
    event_description: 'Another revolution in France brings Louis-Philippe to power, continuing European political instability.',
    significance: 'Ongoing European upheaval maintains high interest in prophetic interpretation and end-time expectations.',
    related_scriptures: ['Matthew 24:6-7'],
    related_people: [],
    display_order: 6
  },
  {
    timeline_type: 'contemporary',
    event_year: 1833,
    event_date: '1833-11-13',
    event_title: 'Great Meteor Shower',
    event_description: 'The most spectacular meteor shower in recorded history (Leonid meteor storm) is visible across North America, with up to 100,000 meteors per hour.',
    significance: 'Seen as fulfillment of Matthew 24:29 and Revelation 6:13 ("stars shall fall from heaven"), greatly intensifying belief that Christ\'s return is imminent.',
    related_scriptures: ['Matthew 24:29', 'Revelation 6:13', 'Joel 2:30-31'],
    related_people: [],
    display_order: 7
  },
  {
    timeline_type: 'contemporary',
    event_year: 1837,
    event_date: '1837-03-17',
    event_title: 'Economic Panic of 1837',
    event_description: 'A major financial crisis hits the United States and Europe, causing widespread bank failures and unemployment.',
    significance: 'Economic instability adds to apocalyptic expectations and makes many receptive to Miller\'s message.',
    related_scriptures: ['James 5:1-3', 'Luke 21:25-26'],
    related_people: [],
    display_order: 8
  },
  {
    timeline_type: 'contemporary',
    event_year: 1839,
    event_date: '1839-01-01',
    event_title: 'British-Afghan War Begins',
    event_description: 'The First Anglo-Afghan War begins, part of the "Great Game" between Britain and Russia for control of Central Asia.',
    significance: 'International conflicts contribute to sense of prophetic fulfillment and approaching end times.',
    related_scriptures: ['Matthew 24:6'],
    related_people: [],
    display_order: 9
  },
  {
    timeline_type: 'contemporary',
    event_year: 1840,
    event_date: '1840-08-11',
    event_title: 'Ottoman Power Diminished',
    event_description: 'The Ottoman Empire signs the Convention of London, placing it under protection of European powers - effectively ending its independent authority.',
    significance: 'Josiah Litch had predicted this exact date for Ottoman decline based on Revelation 9. The precise fulfillment dramatically validates prophetic interpretation.',
    related_scriptures: ['Revelation 9:15'],
    related_people: ['Josiah Litch'],
    display_order: 10
  },
  {
    timeline_type: 'contemporary',
    event_year: 1842,
    event_date: '1842-06-21',
    event_title: 'First Afghan War Ends',
    event_description: 'The disastrous British retreat from Afghanistan ends the First Anglo-Afghan War.',
    significance: 'Global conflicts and instability maintain heightened apocalyptic expectations.',
    related_scriptures: ['Matthew 24:6-7'],
    related_people: [],
    display_order: 11
  },
  {
    timeline_type: 'contemporary',
    event_year: 1845,
    event_date: '1845-09-01',
    event_title: 'Irish Potato Famine Begins',
    event_description: 'The Great Famine begins in Ireland, eventually killing over one million people and causing mass emigration.',
    significance: 'Devastating natural disaster seen as evidence of prophesied end-time troubles and tribulations.',
    related_scriptures: ['Luke 21:11', 'Matthew 24:7'],
    related_people: [],
    display_order: 12
  },
  {
    timeline_type: 'contemporary',
    event_year: 1848,
    event_date: '1848-02-22',
    event_title: 'Revolutions of 1848 Sweep Europe',
    event_description: 'Revolutionary movements erupt across Europe in France, Germany, Italy, and Austria, challenging monarchies and demanding democratic reforms.',
    significance: 'Massive political upheaval maintains prophetic interest and sense that the world is approaching its climax.',
    related_scriptures: ['Daniel 2:44', 'Matthew 24:6-7'],
    related_people: [],
    display_order: 13
  },
  {
    timeline_type: 'contemporary',
    event_year: 1853,
    event_date: '1853-10-04',
    event_title: 'Crimean War Begins',
    event_description: 'Major European powers go to war over the declining Ottoman Empire, with Russia fighting against an alliance of Britain, France, and the Ottomans.',
    significance: 'Continued conflict involving the Ottoman Empire maintains interest in prophetic interpretations of Revelation 9.',
    related_scriptures: ['Revelation 9:13-21', 'Matthew 24:6'],
    related_people: [],
    display_order: 14
  },
  {
    timeline_type: 'contemporary',
    event_year: 1859,
    event_date: '1859-09-01',
    event_title: 'Great Solar Storm',
    event_description: 'The Carrington Event - the most intense geomagnetic storm in recorded history - produces aurora visible near the equator.',
    significance: 'Spectacular celestial phenomena continue to be interpreted as signs of Christ\'s imminent return.',
    related_scriptures: ['Luke 21:25', 'Joel 2:30-31'],
    related_people: [],
    display_order: 15
  }
];

export async function seedTimelineEvents() {
  try {
    console.log('Starting timeline events seeding...');

    const eventsToInsert = timelineEvents.map(event => ({
      timeline_type: event.timeline_type,
      event_year: event.event_year,
      event_date: event.event_date ? new Date(event.event_date).toISOString().split('T')[0] : null,
      event_title: event.event_title,
      event_description: event.event_description,
      significance: event.significance,
      related_scriptures: event.related_scriptures || [],
      related_people: event.related_people || [],
      related_concepts: [],
      image_url: null,
      display_order: event.display_order
    }));

    // Insert timeline events in batches
    const batchSize = 10;
    for (let i = 0; i < eventsToInsert.length; i += batchSize) {
      const batch = eventsToInsert.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('crosier_timeline_events')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        throw insertError;
      }

      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(eventsToInsert.length / batchSize)}`);
    }

    console.log(`✅ Successfully seeded ${eventsToInsert.length} timeline events`);
    return { success: true, count: eventsToInsert.length };
  } catch (error) {
    console.error('❌ Error seeding timeline events:', error);
    return { success: false, error };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTimelineEvents().then(result => {
    console.log('Seeding complete:', result);
    process.exit(result.success ? 0 : 1);
  });
}
