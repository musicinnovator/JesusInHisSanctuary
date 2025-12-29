import React, { useState } from 'react';
import { Layout, ChevronRight } from 'lucide-react';
import { useDiagrams, type Diagram, type DiagramElement } from '../hooks/useCrosierEnhancements';

export function DiagramsView() {
  const { diagrams, loading, error } = useDiagrams();
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
  const [selectedElement, setSelectedElement] = useState<DiagramElement | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Diagrams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Diagrams</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const currentDiagram = selectedDiagram || diagrams[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Layout className="text-green-500" />
            Interactive Diagrams
          </h1>
          <p className="text-gray-600">
            Visual representations of sanctuary theology from Crosier's work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Diagram Selector */}
          <div className="lg:col-span-1 space-y-3">
            {diagrams.map((diagram) => {
              const isSelected = currentDiagram?.id === diagram.id;
              return (
                <button
                  key={diagram.id}
                  onClick={() => {
                    setSelectedDiagram(diagram);
                    setSelectedElement(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-bold mb-1">{diagram.title}</div>
                  <div className={`text-sm ${isSelected ? 'text-green-100' : 'text-gray-500'}`}>
                    {diagram.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Diagram Display */}
          <div className="lg:col-span-3">
            {currentDiagram && (
              <DiagramRenderer
                diagram={currentDiagram}
                selectedElement={selectedElement}
                onElementClick={setSelectedElement}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Diagram Renderer
function DiagramRenderer({
  diagram,
  selectedElement,
  onElementClick
}: {
  diagram: Diagram;
  selectedElement: DiagramElement | null;
  onElementClick: (element: DiagramElement | null) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Diagram Canvas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{diagram.title}</h2>
        <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ minHeight: '600px' }}>
          <svg
            viewBox={diagram.viewbox}
            className="w-full"
            style={{ minHeight: '600px' }}
          >
            {diagram.elements?.map((element) => (
              <DiagramElementRenderer
                key={element.id}
                element={element}
                isSelected={selectedElement?.id === element.id}
                onClick={() => element.interactive ? onElementClick(element) : null}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Element Details */}
      {selectedElement && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-green-600">
              {selectedElement.element_data.label || 'Element Details'}
            </h3>
            <button
              onClick={() => onElementClick(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          {selectedElement.element_data.sublabel && (
            <p className="text-gray-600 mb-3">{selectedElement.element_data.sublabel}</p>
          )}
          {selectedElement.related_scripture_ref && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="text-sm font-bold text-blue-700 uppercase mb-1">Scripture Reference</div>
              <div className="text-gray-800 font-medium">{selectedElement.related_scripture_ref}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Element Renderer
function DiagramElementRenderer({
  element,
  isSelected,
  onClick
}: {
  element: DiagramElement;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { x, y, width, height } = element.position;
  const style = element.style;

  if (element.element_type === 'box') {
    return (
      <g
        onClick={onClick}
        className={element.interactive ? 'cursor-pointer' : ''}
        opacity={isSelected ? 1 : 0.9}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={style.fill || '#ffffff'}
          stroke={isSelected ? '#10b981' : (style.stroke || '#000000')}
          strokeWidth={isSelected ? 4 : (style.strokeWidth || 1)}
          rx={style.borderRadius || 0}
        />
        {element.element_data.label && (
          <text
            x={x + width / 2}
            y={y + 30}
            textAnchor="middle"
            fill="#000000"
            fontSize={element.element_data.fontSize || 20}
            fontWeight={element.element_data.fontWeight || 'bold'}
          >
            {element.element_data.label}
          </text>
        )}
        {element.element_data.sublabel && (
          <text
            x={x + width / 2}
            y={y + 55}
            textAnchor="middle"
            fill="#666666"
            fontSize={14}
          >
            {element.element_data.sublabel}
          </text>
        )}
      </g>
    );
  }

  if (element.element_type === 'label') {
    return (
      <text
        x={x}
        y={y + 20}
        fill={style.fill || '#000000'}
        fontSize={element.element_data.fontSize || 16}
        fontWeight={element.element_data.fontWeight}
        fontStyle={element.element_data.fontStyle}
        onClick={element.interactive ? onClick : undefined}
        className={element.interactive ? 'cursor-pointer' : ''}
      >
        {element.element_data.text}
      </text>
    );
  }

  if (element.element_type === 'arrow') {
    const direction = element.element_data.direction || 'right';
    const strokeDasharray = element.element_data.strokeDasharray;

    return (
      <g>
        <line
          x1={x}
          y1={y + height / 2}
          x2={x + width}
          y2={y + height / 2}
          stroke={style.stroke || '#000000'}
          strokeWidth={style.strokeWidth || 2}
          strokeDasharray={strokeDasharray}
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill={style.stroke || '#000000'} />
          </marker>
        </defs>
        {element.element_data.label && (
          <text
            x={x + width / 2}
            y={y - 5}
            textAnchor="middle"
            fill="#666666"
            fontSize={12}
          >
            {element.element_data.label}
          </text>
        )}
      </g>
    );
  }

  if (element.element_type === 'line') {
    return (
      <line
        x1={element.element_data.x1}
        y1={element.element_data.y1}
        x2={element.element_data.x2}
        y2={element.element_data.y2}
        stroke={style.stroke || '#000000'}
        strokeWidth={element.element_data.strokeWidth || 2}
      />
    );
  }

  return null;
}
