import React from 'react';
import { Calendar, MapPin, Crown, Church } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: '457 BC',
      title: 'Artaxerxes\' Decree',
      description: 'Commission to restore and rebuild Jerusalem took place in the Fall.',
      icon: <Crown className="w-5 h-5" />,
      color: 'bg-sanctuary-blue'
    },
    {
      year: '27 AD',
      title: 'Messiah\'s Baptism',
      description: 'Jesus\' Baptism was His becoming anointed as the Messiah',
      icon: <Church className="w-5 h-5" />,
      color: 'bg-sanctuary-gold'
    },
    {
      year: '31 AD',
      title: 'Crucifixion',
      description: 'Messiah cut off in the midst of the week',
      icon: <Church className="w-5 h-5" />,
      color: 'bg-sanctuary-scarlet'
    },
    {
      year: '34 AD',
      title: 'End of 70 Weeks',
      description: 'Stoning of Stephen, Gospel to Gentiles',
      icon: <MapPin className="w-5 h-5" />,
      color: 'bg-sanctuary-brass'
    },
    {
      year: '1844 AD',
      title: 'Sanctuary Cleansed',
      description: 'End of 2300 days, investigative judgment begins',
      icon: <Church className="w-5 h-5" />,
      color: 'bg-sanctuary-purple'
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-sanctuary-linen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sanctuary-purple mb-4">Prophetic Timeline</h2>
          <p className="text-xl text-sanctuary-brass max-w-3xl mx-auto">
            Tracing the 2300-day prophecy from the decree to restore Jerusalem 
            to the cleansing of the sanctuary
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-sanctuary-brass"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                {/* Timeline dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${event.color} rounded-full border-4 border-white z-10`}></div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-md border border-sanctuary-silver hover:shadow-lg transition-shadow duration-300">
                    <div className={`flex items-center space-x-3 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${event.color} text-white p-2 rounded-full ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        {event.icon}
                      </div>
                      <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                        <h3 className="text-2xl font-bold text-sanctuary-purple">{event.year}</h3>
                        <h4 className="text-lg font-semibold text-sanctuary-blue">{event.title}</h4>
                      </div>
                    </div>
                    <p className="text-sanctuary-brass leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-md border border-sanctuary-gold">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-8 h-8 text-sanctuary-blue" />
            <h3 className="text-2xl font-bold text-sanctuary-purple">Calculation Summary</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg border border-sanctuary-blue">
              <h4 className="font-semibold text-sanctuary-blue mb-2">Total Period</h4>
              <p className="text-3xl font-bold text-sanctuary-purple">2300</p>
              <p className="text-sanctuary-brass">Prophetic Days</p>
            </div>
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg border border-sanctuary-gold">
              <h4 className="font-semibold text-sanctuary-gold-dark mb-2">Actual Years</h4>
              <p className="text-3xl font-bold text-sanctuary-purple">2300</p>
              <p className="text-sanctuary-brass">Exclusive span: 457 BC unto 1844 AD</p>
            </div>
            <div className="text-center p-4 bg-sanctuary-linen rounded-lg border border-sanctuary-scarlet">
              <h4 className="font-semibold text-sanctuary-scarlet mb-2">Fulfillment</h4>
              <p className="text-3xl font-bold text-sanctuary-purple">1844</p>
              <p className="text-sanctuary-brass">October 22nd</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;