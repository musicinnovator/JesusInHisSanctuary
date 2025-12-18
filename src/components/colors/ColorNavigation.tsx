import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Palette } from 'lucide-react';

interface ColorNavigationProps {
  currentColor: string;
  previousColor?: { name: string; path: string };
  nextColor?: { name: string; path: string };
}

const ColorNavigation: React.FC<ColorNavigationProps> = ({
  currentColor,
  previousColor,
  nextColor
}) => {
  return (
    <div className="bg-white border-t border-sanctuary-silver">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Previous Color */}
          <div className="flex-1">
            {previousColor ? (
              <Link
                to={previousColor.path}
                className="inline-flex items-center space-x-2 text-sanctuary-purple hover:text-sanctuary-blue transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-sanctuary-brass uppercase tracking-wide">Previous</div>
                  <div className="font-semibold">{previousColor.name}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Center Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/colors"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sanctuary-linen text-sanctuary-purple hover:bg-sanctuary-purple hover:text-white transition-all duration-300"
            >
              <Palette className="w-4 h-4" />
              <span className="font-medium">All Colors</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-sanctuary-silver text-sanctuary-brass hover:border-sanctuary-gold hover:text-sanctuary-purple transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
          </div>

          {/* Next Color */}
          <div className="flex-1 flex justify-end">
            {nextColor ? (
              <Link
                to={nextColor.path}
                className="inline-flex items-center space-x-2 text-sanctuary-purple hover:text-sanctuary-blue transition-colors group"
              >
                <div className="text-right">
                  <div className="text-xs text-sanctuary-brass uppercase tracking-wide">Next</div>
                  <div className="font-semibold">{nextColor.name}</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorNavigation;
