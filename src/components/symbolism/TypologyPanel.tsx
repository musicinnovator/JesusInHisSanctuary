import React, { useState } from 'react';
import { GitBranch, Calendar, CircleCheck as CheckCircle, Circle as HelpCircle, ArrowRight, Image as ImageIcon } from 'lucide-react';
import {
  usePropheticFulfillments,
  useTypologyConnections,
} from '../../hooks/useSymbolismAdvanced';
import type { TypeCategory, FulfillmentCertainty } from '../../types/symbolismAdvanced';

interface TypologyPanelProps {
  symbolId: string;
}

export function TypologyPanel({ symbolId }: TypologyPanelProps) {
  const [activeTab, setActiveTab] = useState<'typology' | 'prophecy'>('typology');
  const [selectedCategory, setSelectedCategory] = useState<TypeCategory | ''>('');

  const { connections, loading: connectionsLoading } = useTypologyConnections(symbolId, {
    type_category: selectedCategory || undefined,
  });
  const { fulfillments, loading: fulfillmentsLoading } = usePropheticFulfillments(symbolId);

  const getCategoryIcon = (category: string) => {
    return <GitBranch className="w-5 h-5" />;
  };

  const getCertaintyColor = (certainty?: FulfillmentCertainty) => {
    switch (certainty) {
      case 'certain':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'probable':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'possible':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'debated':
        return 'text-gray-700 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getCertaintyIcon = (certainty?: FulfillmentCertainty) => {
    if (certainty === 'certain') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    return <HelpCircle className="w-5 h-5 text-gray-400" />;
  };

  const loading = activeTab === 'typology' ? connectionsLoading : fulfillmentsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Type & Antitype Analysis</h3>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('typology')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'typology'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Typological Connections
          </button>
          <button
            onClick={() => setActiveTab('prophecy')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'prophecy'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Prophetic Fulfillments
          </button>
        </nav>
      </div>

      {activeTab === 'typology' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              <option value="person">Person</option>
              <option value="event">Event</option>
              <option value="object">Object</option>
              <option value="ritual">Ritual</option>
              <option value="place">Place</option>
              <option value="time">Time</option>
            </select>
          </div>

          <div className="space-y-6">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                    {getCategoryIcon(connection.type_category)}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded mb-2 uppercase">
                      {connection.type_category}
                    </span>
                    <div className="flex items-center gap-4 mb-2">
                      <div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Type</div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {connection.type_name}
                        </h4>
                        <p className="text-sm text-blue-600">{connection.type_reference}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                          Antitype
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {connection.antitype_name}
                        </h4>
                        <p className="text-sm text-amber-600">{connection.antitype_reference}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {connection.correspondence_points && connection.correspondence_points.length > 0 && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-3">
                      Points of Correspondence
                    </h5>
                    <ul className="space-y-2">
                      {connection.correspondence_points.map((point: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900">{point.type_aspect}</div>
                            <div className="text-sm text-gray-600">→ {point.antitype_aspect}</div>
                            {point.explanation && (
                              <p className="text-sm text-gray-700 mt-1">{point.explanation}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {connection.contrasts && connection.contrasts.length > 0 && (
                  <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h5 className="font-semibold text-purple-900 mb-3">Contrasts & Superiority</h5>
                    <ul className="space-y-2">
                      {connection.contrasts.map((contrast: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">{contrast.type_limitation}</div>
                            <div className="font-medium text-gray-900">
                              → {contrast.antitype_superiority}
                            </div>
                            {contrast.explanation && (
                              <p className="text-sm text-gray-700 mt-1">{contrast.explanation}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {connection.progressive_revelation && (
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h5 className="font-semibold text-amber-900 mb-2">Progressive Revelation</h5>
                    <p className="text-sm text-gray-700">{connection.progressive_revelation}</p>
                  </div>
                )}

                {connection.hermeneutical_notes && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Hermeneutical Notes</h5>
                    <p className="text-sm text-gray-700">{connection.hermeneutical_notes}</p>
                  </div>
                )}

                {connection.visual_diagram_url && (
                  <div className="mt-4">
                    <a
                      href={connection.visual_diagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View Visual Diagram
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {connections.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <GitBranch className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No typological connections found for this symbol.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'prophecy' && (
        <div className="space-y-6">
          {fulfillments.map((fulfillment) => (
            <div
              key={fulfillment.id}
              className={`border rounded-lg p-6 ${getCertaintyColor(
                fulfillment.fulfillment_certainty
              )}`}
            >
              <div className="flex items-start gap-4 mb-4">
                {getCertaintyIcon(fulfillment.fulfillment_certainty)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded uppercase">
                      {fulfillment.fulfillment_certainty || 'Unknown'}
                    </span>
                    {fulfillment.fulfillment_date && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {fulfillment.fulfillment_date}
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Prophecy</div>
                      <p className="text-blue-700 font-medium">{fulfillment.prophecy_reference}</p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Fulfillment</div>
                      <p className="text-green-700 font-medium">
                        {fulfillment.fulfillment_reference}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-900 mb-4">{fulfillment.fulfillment_description}</p>

                  {fulfillment.historical_context && (
                    <div className="mb-3">
                      <h5 className="font-semibold text-gray-900 mb-1">Historical Context</h5>
                      <p className="text-sm text-gray-700">{fulfillment.historical_context}</p>
                    </div>
                  )}

                  {fulfillment.theological_significance && (
                    <div className="mb-3">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        Theological Significance
                      </h5>
                      <p className="text-sm text-gray-700">
                        {fulfillment.theological_significance}
                      </p>
                    </div>
                  )}

                  {fulfillment.adventist_interpretation && (
                    <div className="mb-3 p-3 bg-white bg-opacity-50 rounded">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        Adventist Interpretation
                      </h5>
                      <p className="text-sm text-gray-700">
                        {fulfillment.adventist_interpretation}
                      </p>
                    </div>
                  )}

                  {fulfillment.eschatological_implications && (
                    <div className="p-3 bg-white bg-opacity-50 rounded">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        Eschatological Implications
                      </h5>
                      <p className="text-sm text-gray-700">
                        {fulfillment.eschatological_implications}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {fulfillments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No prophetic fulfillments found for this symbol.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
