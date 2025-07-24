import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import HomeDashboard from "pages/home-dashboard";
import AdaptiveQuiz from "pages/adaptive-quiz";
import DoubtSolver from "pages/doubt-solver";
import AiChatTutor from "pages/ai-chat-tutor";
import StudyPlanGenerator from "pages/study-plan-generator";
import ParentDashboard from "pages/parent-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/adaptive-quiz" element={<AdaptiveQuiz />} />
        <Route path="/doubt-solver" element={<DoubtSolver />} />
        <Route path="/ai-chat-tutor" element={<AiChatTutor />} />
        <Route path="/study-plan-generator" element={<StudyPlanGenerator />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;