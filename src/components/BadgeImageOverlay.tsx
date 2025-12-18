import React from 'react';
import {
  ExplorerIllustration,
  CompareIllustration,
  ScriptureIllustration,
  SymbolismIllustration,
  TimelineIllustration,
  HeavenlyIllustration,
  JudgmentIllustration,
  LibraryIllustration,
  ForumsIllustration,
  ProfilesIllustration,
  MythsIllustration,
  EducatorsIllustration,
  MediaIllustration,
  BibleIllustration,
  ColorsIllustration,
} from './badge-illustrations';

interface BadgeImageOverlayProps {
  featureId: string;
  fallbackIcon: React.ReactNode;
  fallbackColor: string;
}

const illustrationMap: Record<string, React.ComponentType<{ className?: string }>> = {
  explorer: ExplorerIllustration,
  compare: CompareIllustration,
  scripture: ScriptureIllustration,
  symbolism: SymbolismIllustration,
  timeline: TimelineIllustration,
  heavenly: HeavenlyIllustration,
  judgment: JudgmentIllustration,
  library: LibraryIllustration,
  forums: ForumsIllustration,
  profiles: ProfilesIllustration,
  myths: MythsIllustration,
  educators: EducatorsIllustration,
  media: MediaIllustration,
  bible: BibleIllustration,
  colors: ColorsIllustration,
};

const BadgeImageOverlay: React.FC<BadgeImageOverlayProps> = ({
  featureId,
  fallbackIcon,
  fallbackColor,
}) => {
  const IllustrationComponent = illustrationMap[featureId];

  return (
    <div className="relative w-full h-full">
      {IllustrationComponent ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <IllustrationComponent className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} flex items-center justify-center`}>
          <div className="text-white/80 text-center">
            {fallbackIcon}
            <div className="mt-2 text-sm font-medium">Preview</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeImageOverlay;
