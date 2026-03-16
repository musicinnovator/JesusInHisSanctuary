import React from 'react';

interface BadgeImageOverlayProps {
  featureId: string;
  fallbackIcon: React.ReactNode;
  fallbackColor: string;
}

const BadgeImageOverlay: React.FC<BadgeImageOverlayProps> = ({
  featureId,
  fallbackIcon,
  fallbackColor,
}) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-sanctuary-background flex items-center justify-center">
        <div className="text-sanctuary-gold text-center">
          {fallbackIcon}
        </div>
      </div>
    </div>
  );
};

export default BadgeImageOverlay;
