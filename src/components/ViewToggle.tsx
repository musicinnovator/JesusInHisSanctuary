import React from 'react';
import { Grid, Layers } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'compact';
  onViewChange: (mode: 'grid' | 'compact') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-sanctuary-silver p-4 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sanctuary-blue rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sanctuary-purple">Navigation View</h3>
            <p className="text-sm text-sanctuary-brass">Choose your preferred layout</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-sanctuary-linen rounded-lg p-1">
          <button
            onClick={() => onViewChange('grid')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-white text-sanctuary-purple shadow-md'
                : 'text-sanctuary-brass hover:text-sanctuary-purple'
            }`}
            aria-label="Grid View"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid View</span>
          </button>

          <button
            onClick={() => onViewChange('compact')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              viewMode === 'compact'
                ? 'bg-white text-sanctuary-purple shadow-md'
                : 'text-sanctuary-brass hover:text-sanctuary-purple'
            }`}
            aria-label="Compact View"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Compact View</span>
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-sanctuary-brass">
        {viewMode === 'grid' ? (
          <p>Viewing all features in a grid layout. Switch to Compact View for a single-card navigation hub.</p>
        ) : (
          <p>Viewing compact navigation hub. All features accessible from a single card.</p>
        )}
      </div>
    </div>
  );
};

export default ViewToggle;
