import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProfessionalHomePage from './components/ProfessionalHomePage';
import ColorsPage from './components/ColorsPage';
import SacredColorsLanding from './components/SacredColorsLanding';
import ProfessionalColorOverview from './components/colors/ProfessionalColorOverview';
import ColorDetailPage from './components/ColorDetailPage';
import SanctuaryViewer from './components/SanctuaryViewer';
import EnhancedSanctuaryViewer from './components/EnhancedSanctuaryViewer';
import ComparePage from './components/ComparePage';
import EnhancedCompareView from './components/EnhancedCompareView';
import ScriptureNavigator from './components/ScriptureNavigator';
import SymbolismPage from './components/SymbolismPage';
import SymbolismExplorer from './components/SymbolismExplorer';
import TimelinePage from './components/TimelinePage';
import HeavenlyPortal from './components/HeavenlyPortal';
import JudgmentModule from './components/JudgmentModule';
import DigitalLibrary from './components/DigitalLibrary';
import { CrosierBookViewer } from './components/CrosierBookViewer';
import { CrossShadowBookViewer } from './components/CrossShadowBookViewer';
import { HaskellBookViewer } from './components/HaskellBookViewer';
import AndreasenBookViewer from './components/AndreasenBookViewer';
import { GilbertBookViewer } from './components/GilbertBookViewer';
import ForumsPage from './components/ForumsPage';
import ProfilesPage from './components/ProfilesPage';
import MythsPage from './components/MythsPage';
import EducatorResources from './components/EducatorResources';
import MediaPage from './components/MediaPage';
import BiblePage from './components/BiblePage';
import BluePage from './components/colors/BluePage';
import DarkPage from './components/colors/DarkPage';
import RedPage from './components/colors/RedPage';
import WhitePage from './components/colors/WhitePage';
import PurplePage from './components/colors/PurplePage';
import BrassPage from './components/colors/BrassPage';
import GoldPage from './components/colors/GoldPage';
import SilverPage from './components/colors/SilverPage';
import { ThreeDExplorerLanding } from './components/3DExplorerLanding';
import { Enhanced3DSanctuaryViewer } from './components/Enhanced3DSanctuaryViewer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sanctuary-linen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/professional" element={<ProfessionalHomePage />} />
          <Route path="/colors" element={<SacredColorsLanding />} />
          <Route path="/colors-professional" element={<ProfessionalColorOverview />} />
          <Route path="/colors/:slug" element={<ColorDetailPage />} />
          <Route path="/colors-classic" element={<ColorsPage />} />
          <Route path="/colors-classic/blue" element={<BluePage />} />
          <Route path="/colors-classic/dark" element={<DarkPage />} />
          <Route path="/colors-classic/red" element={<RedPage />} />
          <Route path="/colors-classic/white" element={<WhitePage />} />
          <Route path="/colors-classic/purple" element={<PurplePage />} />
          <Route path="/colors-classic/brass" element={<BrassPage />} />
          <Route path="/colors-classic/gold" element={<GoldPage />} />
          <Route path="/colors-classic/silver" element={<SilverPage />} />
          <Route path="/explorer" element={<ThreeDExplorerLanding />} />
          <Route path="/explorer/:modelName" element={<Enhanced3DSanctuaryViewer />} />
          <Route path="/explorer-classic" element={<SanctuaryViewer />} />
          <Route path="/compare" element={<EnhancedCompareView />} />
          <Route path="/compare-classic" element={<ComparePage />} />
          <Route path="/scripture" element={<ScriptureNavigator />} />
          <Route path="/symbolism" element={<SymbolismExplorer />} />
          <Route path="/symbolism-classic" element={<SymbolismPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/heavenly" element={<HeavenlyPortal />} />
          <Route path="/judgment" element={<JudgmentModule />} />
          <Route path="/library" element={<DigitalLibrary />} />
          <Route path="/library/crosier-sanctuary" element={<CrosierBookViewer />} />
          <Route path="/library/haskell-cross-shadow" element={<HaskellBookViewer />} />
          <Route path="/library/andreasen-sanctuary" element={<AndreasenBookViewer />} />
          <Route path="/library/gilbert-messiah" element={<GilbertBookViewer />} />
          <Route path="/cross-shadow" element={<CrossShadowBookViewer />} />
          <Route path="/forums" element={<ForumsPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/myths" element={<MythsPage />} />
          <Route path="/educators" element={<EducatorResources />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/bible" element={<BiblePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;