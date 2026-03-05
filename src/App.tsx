import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmbodiedAIPage from './pages/EmbodiedAIPage';
import WorldModelPage from './pages/WorldModelPage';
import InfraPage from './pages/InfraPage';
import OpenSourceModelsPage from './pages/OpenSourceModelsPage';
import LearningPathsPage from './pages/LearningPathsPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/embodied" element={<EmbodiedAIPage />} />
        <Route path="/worldmodel" element={<WorldModelPage />} />
        <Route path="/infra" element={<InfraPage />} />
        <Route path="/open-models" element={<OpenSourceModelsPage />} />
        <Route path="/learning-paths" element={<LearningPathsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
