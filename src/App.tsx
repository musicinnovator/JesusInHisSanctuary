import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ColorsPage from './components/ColorsPage';
import SanctuaryViewer from './components/SanctuaryViewer';
import ComparePage from './components/ComparePage';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sanctuary-linen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="/explorer" element={<SanctuaryViewer />} />
          <Route path="/compare" element={<ComparePage />} />
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