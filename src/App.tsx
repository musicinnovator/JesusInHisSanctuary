import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ColorsPage from './components/ColorsPage';
import SanctuaryViewer from './components/SanctuaryViewer';
import EnhancedSanctuaryViewer from './components/EnhancedSanctuaryViewer';
import ComparePage from './components/ComparePage';
import EnhancedCompareView from './components/EnhancedCompareView';
import ScriptureNavigator from './components/ScriptureNavigator';
import SymbolismPage from './components/SymbolismPage';
import TimelinePage from './components/TimelinePage';
import HeavenlyPortal from './components/HeavenlyPortal';
import JudgmentModule from './components/JudgmentModule';
import DigitalLibrary from './components/DigitalLibrary';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sanctuary-linen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/colors/blue" element={<BluePage />} />
          <Route path="/colors/dark" element={<DarkPage />} />
          <Route path="/colors/red" element={<RedPage />} />
          <Route path="/colors/white" element={<WhitePage />} />
          <Route path="/colors/purple" element={<PurplePage />} />
          <Route path="/colors/brass" element={<BrassPage />} />
          <Route path="/colors/gold" element={<GoldPage />} />
          <Route path="/colors/silver" element={<SilverPage />} />
          <Route path="/explorer" element={<EnhancedSanctuaryViewer />} />
          <Route path="/explorer-classic" element={<SanctuaryViewer />} />
          <Route path="/compare" element={<EnhancedCompareView />} />
          <Route path="/compare-classic" element={<ComparePage />} />
          <Route path="/scripture" element={<ScriptureNavigator />} />
          <Route path="/symbolism" element={<SymbolismPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/heavenly" element={<HeavenlyPortal />} />
          <Route path="/judgment" element={<JudgmentModule />} />
          <Route path="/library" element={<DigitalLibrary />} />
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