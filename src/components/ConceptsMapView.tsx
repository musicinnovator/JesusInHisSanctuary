import React, { useState, useEffect, useRef } from 'react';
import { Network, Search, Info } from 'lucide-react';
import { useConceptRelationships } from '../hooks/useCrosierEnhancements';

export function ConceptsMapView() {
  const { relationships, concepts, loading, error } = useConceptRelationships();
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple force-directed graph rendering
  useEffect(() => {
    if (!canvasRef.current || concepts.length === 0 || relationships.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create nodes with positions
    const nodes = concepts.map((concept, idx) => ({
      ...concept,
      x: canvas.width / 2 + Math.cos(idx * 2 * Math.PI / concepts.length) * 200,
      y: canvas.height / 2 + Math.sin(idx * 2 * Math.PI / concepts.length) * 200,
      vx: 0,
      vy: 0,
      radius: 30 + (relationships.filter(r =>
        r.concept_from_id === concept.id || r.concept_to_id === concept.id
      ).length * 5)
    }));

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw edges
      relationships.forEach(rel => {
        const fromNode = nodes.find(n => n.id === rel.concept_from_id);
        const toNode = nodes.find(n => n.id === rel.concept_to_id);

        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = `rgba(100, 116, 139, ${rel.strength / 15})`;
          ctx.lineWidth = rel.strength / 5;
          ctx.stroke();

          // Arrow head
          const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
          const arrowX = toNode.x - Math.cos(angle) * toNode.radius;
          const arrowY = toNode.y - Math.sin(angle) * toNode.radius;
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle - Math.PI / 6),
            arrowY - 10 * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle + Math.PI / 6),
            arrowY - 10 * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = `rgba(100, 116, 139, ${rel.strength / 15})`;
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isSelected = selectedConcept?.id === node.id;
        const matchesSearch = searchQuery === '' ||
          node.concept_name.toLowerCase().includes(searchQuery.toLowerCase());

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#3b82f6' : matchesSearch ? '#8b5cf6' : '#cbd5e1';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#1e40af' : '#64748b';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();

        // Draw text
        ctx.fillStyle = '#ffffff';
        ctx.font = isSelected ? 'bold 12px sans-serif' : '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = node.concept_name;
        const maxWidth = node.radius * 1.8;
        ctx.fillText(text, node.x, node.y, maxWidth);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle clicks
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedNode = nodes.find(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) < node.radius;
      });

      if (clickedNode) {
        setSelectedConcept(clickedNode);
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleClick);
    };
  }, [concepts, relationships, selectedConcept, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Concept Network...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Concepts</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const relatedRelationships = selectedConcept
    ? relationships.filter(r =>
        r.concept_from_id === selectedConcept.id || r.concept_to_id === selectedConcept.id
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Network className="text-purple-500" />
            Theological Concepts Network
          </h1>
          <p className="text-gray-600 mb-4">
            Interactive visualization of doctrinal relationships in Crosier's sanctuary theology
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas - 2/3 width */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Concept Network</h2>
              <div className="text-sm text-gray-500">
                Click nodes to explore relationships
              </div>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-[600px] border-2 border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                <span>Matched Search</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                <span>Other</span>
              </div>
            </div>
          </div>

          {/* Details Panel - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            {selectedConcept ? (
              <>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-purple-600 mb-3">
                    {selectedConcept.concept_name}
                  </h2>
                  {selectedConcept.definition && (
                    <p className="text-gray-700 mb-4">{selectedConcept.definition}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Info size={16} />
                    <span>{relatedRelationships.length} relationships</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 max-h-[500px] overflow-y-auto">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Relationships</h3>
                  <div className="space-y-3">
                    {relatedRelationships.map((rel, idx) => {
                      const isFrom = rel.concept_from_id === selectedConcept.id;
                      const otherConcept = isFrom ? rel.to_concept : rel.from_concept;

                      return (
                        <div
                          key={idx}
                          className="border-l-4 border-purple-500 pl-4 py-2"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-800">{otherConcept?.concept_name}</span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {rel.relationship_type}
                            </span>
                          </div>
                          {rel.description && (
                            <p className="text-sm text-gray-600">{rel.description}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Network className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Concept</h3>
                <p className="text-gray-600">Click any node in the network to explore its relationships</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
