import React, { useState } from 'react';
import { Clock, Calendar, Globe } from 'lucide-react';
import { useTimelineEvents, type TimelineEvent } from '../hooks/useCrosierEnhancements';

type TimelineType = 'historical' | 'contemporary' | 'biblical';

export function TimelineView() {
  const [selectedType, setSelectedType] = useState<TimelineType>('historical');
  const { events, loading, error } = useTimelineEvents(selectedType);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Timeline</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const timelineInfo = {
    historical: {
      title: 'Historical Timeline',
      description: '1844 Millerite Movement to SDA Formation',
      icon: <Calendar className="text-blue-500" />,
      color: 'blue'
    },
    contemporary: {
      title: 'Contemporary Timeline',
      description: 'Crosier\'s Era with World Events',
      icon: <Globe className="text-green-500" />,
      color: 'green'
    },
    biblical: {
      title: 'Biblical Timeline',
      description: 'Sanctuary History from Moses to 1844',
      icon: <Clock className="text-purple-500" />,
      color: 'purple'
    }
  };

  const info = timelineInfo[selectedType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            {info.icon}
            Timelines
          </h1>

          {/* Timeline Type Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(timelineInfo) as TimelineType[]).map((type) => {
              const typeInfo = timelineInfo[type];
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedEvent(null);
                  }}
                  className={`p-4 rounded-xl transition-all ${
                    isSelected
                      ? `bg-${typeInfo.color}-500 text-white shadow-lg`
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  style={isSelected ? {
                    backgroundColor: typeInfo.color === 'blue' ? '#3b82f6' : typeInfo.color === 'green' ? '#10b981' : '#8b5cf6',
                    color: 'white'
                  } : {}}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {typeInfo.icon}
                    <span className="font-bold">{typeInfo.title}</span>
                  </div>
                  <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    {typeInfo.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{info.title}</h2>

              {/* Timeline Events */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600"></div>

                {/* Events */}
                <div className="space-y-8">
                  {events.map((event, idx) => (
                    <TimelineEventCard
                      key={event.id}
                      event={event}
                      isSelected={selectedEvent?.id === event.id}
                      onClick={() => setSelectedEvent(event)}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Panel */}
          <div className="lg:col-span-1">
            {selectedEvent ? (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-amber-600">{selectedEvent.event_title}</h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Year */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={20} />
                    <span className="font-bold">
                      {selectedEvent.event_year < 0 ? `${Math.abs(selectedEvent.event_year)} BC` : `AD ${selectedEvent.event_year}`}
                    </span>
                  </div>

                  {/* Description */}
                  {selectedEvent.event_description && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-bold text-gray-700 uppercase mb-2">Description</div>
                      <p className="text-gray-800">{selectedEvent.event_description}</p>
                    </div>
                  )}

                  {/* Significance */}
                  {selectedEvent.significance && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                      <div className="text-sm font-bold text-amber-700 uppercase mb-2">Significance</div>
                      <p className="text-gray-800">{selectedEvent.significance}</p>
                    </div>
                  )}

                  {/* Related Scriptures */}
                  {selectedEvent.related_scriptures.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm font-bold text-blue-700 uppercase mb-2">Related Scriptures</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.related_scriptures.map((ref, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-blue-200 px-3 py-1 rounded-full text-sm text-gray-700"
                          >
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related People */}
                  {selectedEvent.related_people.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm font-bold text-green-700 uppercase mb-2">Key Figures</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.related_people.map((person, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-green-200 px-3 py-1 rounded-full text-sm text-gray-700"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center sticky top-6">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select an Event</h3>
                <p className="text-gray-600">Click any timeline event to view full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Event Card
function TimelineEventCard({
  event,
  isSelected,
  onClick,
  index
}: {
  event: TimelineEvent;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const yearDisplay = event.event_year < 0
    ? `${Math.abs(event.event_year)} BC`
    : `AD ${event.event_year}`;

  return (
    <button
      onClick={onClick}
      className={`relative pl-20 pr-6 py-4 text-left w-full transition-all ${
        isSelected ? 'bg-amber-50 rounded-lg' : 'hover:bg-gray-50 rounded-lg'
      }`}
    >
      {/* Year Badge */}
      <div className={`absolute left-0 top-4 w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
        isSelected ? 'bg-amber-500 text-white shadow-lg scale-110' : 'bg-white border-4 border-amber-400 text-gray-700 shadow'
      }`}>
        {yearDisplay.split(' ').map((part, i) => (
          <div key={i} className="text-center leading-tight">
            {part}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="ml-4">
        <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-amber-600' : 'text-gray-800'}`}>
          {event.event_title}
        </h3>
        {event.event_description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {event.event_description}
          </p>
        )}
        {event.related_people.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {event.related_people.slice(0, 3).map((person, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {person}
              </span>
            ))}
            {event.related_people.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{event.related_people.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
