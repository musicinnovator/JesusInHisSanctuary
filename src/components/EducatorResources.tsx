import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Download, FileText, Video, Users, Presentation, BookOpen, Calendar } from 'lucide-react';
import DonationBanner from './DonationBanner';

const EducatorResources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'lesson-plans', name: 'Lesson Plans' },
    { id: 'activities', name: 'Classroom Activities' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'printables', name: 'Printables' },
    { id: 'videos', name: 'Video Resources' }
  ];

  const ageGroups = [
    { id: 'all', name: 'All Ages' },
    { id: 'children', name: 'Children (6-12)' },
    { id: 'youth', name: 'Youth (13-17)' },
    { id: 'adult', name: 'Adult (18+)' },
    { id: 'mixed', name: 'Mixed Ages' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Sanctuary Colors Interactive Lesson',
      category: 'lesson-plans',
      ageGroup: 'children',
      duration: '45 minutes',
      description: 'Hands-on lesson exploring the eight sacred colors and their biblical meanings',
      materials: ['Colored paper', 'Markers', 'Bible', 'Activity sheets'],
      objectives: ['Identify the 8 sanctuary colors', 'Understand symbolic meanings', 'Connect colors to Bible stories'],
      downloads: ['Lesson Plan PDF', 'Activity Sheets', 'Color Cards'],
      sabbathSchoolQuarter: 'Q2 2024 - Sanctuary Studies'
    },
    {
      id: 2,
      title: 'Build a Tabernacle Model',
      category: 'activities',
      ageGroup: 'youth',
      duration: '90 minutes',
      description: 'Group activity to construct a scale model of the wilderness tabernacle',
      materials: ['Cardboard', 'Gold paint', 'Fabric scraps', 'Measuring tools'],
      objectives: ['Learn tabernacle dimensions', 'Understand construction details', 'Work collaboratively'],
      downloads: ['Building Instructions', 'Template Patterns', 'Material List'],
      sabbathSchoolQuarter: 'Q1 2024 - Old Testament Sanctuaries'
    },
    {
      id: 3,
      title: 'Investigative Judgment PowerPoint',
      category: 'presentations',
      ageGroup: 'adult',
      duration: '60 minutes',
      description: 'Comprehensive presentation on the doctrine of investigative judgment',
      materials: ['Projector', 'Computer', 'Handouts'],
      objectives: ['Explain Daniel 8:14', 'Clarify common misconceptions', 'Show biblical foundation'],
      downloads: ['PowerPoint File', 'Speaker Notes', 'Handout PDF'],
      sabbathSchoolQuarter: 'Q3 2024 - Prophetic Studies'
    },
    {
      id: 4,
      title: 'Aaron\'s Ministry Role Play',
      category: 'activities',
      ageGroup: 'mixed',
      duration: '30 minutes',
      description: 'Interactive drama depicting the Day of Atonement service',
      materials: ['Costumes', 'Props', 'Script'],
      objectives: ['Visualize sanctuary service', 'Understand priestly duties', 'Connect to Jesus\' ministry'],
      downloads: ['Script PDF', 'Costume Guide', 'Props List'],
      sabbathSchoolQuarter: 'Q4 2024 - Types and Antitypes'
    },
    {
      id: 5,
      title: 'Sanctuary Furnishings Worksheets',
      category: 'printables',
      ageGroup: 'children',
      duration: '20 minutes',
      description: 'Coloring and activity sheets for each piece of sanctuary furniture',
      materials: ['Printed worksheets', 'Crayons', 'Pencils'],
      objectives: ['Identify furnishings', 'Learn their purposes', 'Practice fine motor skills'],
      downloads: ['Worksheet Pack', 'Answer Key', 'Coloring Pages'],
      sabbathSchoolQuarter: 'Q2 2024 - Sanctuary Studies'
    },
    {
      id: 6,
      title: 'Heavenly Sanctuary Video Series',
      category: 'videos',
      ageGroup: 'adult',
      duration: '25 minutes each',
      description: '5-part video series exploring the heavenly sanctuary concept',
      materials: ['Video player', 'Discussion guides'],
      objectives: ['Understand Hebrews 8-9', 'Visualize heavenly reality', 'Apply to personal faith'],
      downloads: ['Video Links', 'Discussion Guide', 'Transcript'],
      sabbathSchoolQuarter: 'Q1 2025 - Hebrews Study'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const ageMatch = selectedAgeGroup === 'all' || resource.ageGroup === selectedAgeGroup || resource.ageGroup === 'mixed';
    return categoryMatch && ageMatch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'lesson-plans': return <BookOpen className="w-5 h-5" />;
      case 'activities': return <Users className="w-5 h-5" />;
      case 'presentations': return <Presentation className="w-5 h-5" />;
      case 'printables': return <FileText className="w-5 h-5" />;
      case 'videos': return <Video className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-sanctuary-linen">
      <DonationBanner />
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-sanctuary-gold hover:text-sanctuary-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-12 h-12 text-sanctuary-gold" />
            <div>
              <h1 className="text-4xl font-bold">Educator Resources</h1>
              <p className="text-teal-100 text-lg">Teaching tools and lesson plans for ministry leaders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sanctuary-gold/30 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Resource Type</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-teal-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Age Group</h3>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedAgeGroup(group.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedAgeGroup === group.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-sanctuary-linen text-sanctuary-purple hover:bg-teal-100'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-lg border border-sanctuary-silver overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(resource.category)}
                  <div>
                    <h3 className="text-lg font-bold">{resource.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-teal-100">
                      <span>{resource.ageGroup}</span>
                      <span>•</span>
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sanctuary-brass mb-4 leading-relaxed">{resource.description}</p>

                {/* Learning Objectives */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Learning Objectives:</h4>
                  <ul className="space-y-1">
                    {resource.objectives.map((objective, index) => (
                      <li key={index} className="text-sanctuary-brass text-sm flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials Needed */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-2">Materials Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.materials.map((material, index) => (
                      <span key={index} className="bg-sanctuary-linen text-sanctuary-purple px-2 py-1 rounded text-xs">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sabbath School Quarter */}
                <div className="mb-4 p-3 bg-sanctuary-linen rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-sanctuary-purple">Aligns with:</span>
                  </div>
                  <p className="text-sm text-sanctuary-brass mt-1">{resource.sabbathSchoolQuarter}</p>
                </div>

                {/* Downloads */}
                <div className="border-t border-sanctuary-silver pt-4">
                  <h4 className="font-semibold text-sanctuary-purple mb-3">Available Downloads:</h4>
                  <div className="space-y-2">
                    {resource.downloads.map((download, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-2 w-full text-left p-2 bg-sanctuary-linen hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4 text-teal-600" />
                        <span className="text-sanctuary-purple text-sm font-medium">{download}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Licensing Guidelines */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30 mb-8">
          <h2 className="text-2xl font-bold text-sanctuary-purple mb-6">Licensing Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Permitted Uses</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Non-commercial religious education</li>
                <li>• Church and ministry use</li>
                <li>• Personal study and preparation</li>
                <li>• Small group Bible studies</li>
                <li>• Sabbath School classes</li>
                <li>• Youth programs and camps</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Restrictions</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Commercial sale or distribution</li>
                <li>• Modification without attribution</li>
                <li>• Use in non-religious contexts</li>
                <li>• Redistribution for profit</li>
                <li>• Removal of copyright notices</li>
                <li>• Use in competing platforms</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-sanctuary-linen rounded-lg">
            <h4 className="font-semibold text-sanctuary-purple mb-2">Attribution Requirements</h4>
            <p className="text-sanctuary-brass text-sm">
              When using these resources, please include: "Educational materials provided by Sanctuary Intra Comparative Studies Website - 
              sanctuarystudies.org. Used with permission for non-commercial religious education."
            </p>
          </div>
        </div>

        {/* Teaching Tips */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-sanctuary-gold/30">
          <h2 className="text-2xl font-bold text-sanctuary-purple mb-6">Teaching Tips & Best Practices</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Engagement Strategies</h3>
              <ul className="space-y-2 text-sanctuary-brass text-sm">
                <li>• Use visual aids and hands-on activities</li>
                <li>• Encourage questions and discussion</li>
                <li>• Connect to personal experiences</li>
                <li>• Vary teaching methods for different learning styles</li>
                <li>• Include interactive elements</li>
              </ul>
            </div>

            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Age-Appropriate Adaptations</h3>
              <ul className="space-y-2 text-sanctuary-brass text-sm">
                <li>• Simplify language for younger audiences</li>
                <li>• Use stories and illustrations</li>
                <li>• Provide hands-on activities for children</li>
                <li>• Encourage deeper discussion with adults</li>
                <li>• Adjust timing based on attention spans</li>
              </ul>
            </div>

            <div className="bg-sanctuary-linen rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sanctuary-purple mb-4">Assessment Ideas</h3>
              <ul className="space-y-2 text-sanctuary-brass text-sm">
                <li>• Use review games and quizzes</li>
                <li>• Ask for verbal summaries</li>
                <li>• Create group presentations</li>
                <li>• Assign reflection journals</li>
                <li>• Encourage peer teaching</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Request Additional Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorResources;