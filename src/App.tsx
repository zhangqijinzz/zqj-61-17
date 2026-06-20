import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/Layout";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Theater from "@/pages/Theater";
import TheaterPlay from "@/pages/TheaterPlay";
import TheaterReview from "@/pages/TheaterReview";
import Skills from "@/pages/Skills";
import SkillDetail from "@/pages/SkillDetail";
import Badges from "@/pages/Badges";
import Contract from "@/pages/Contract";
import MiniGame from "@/pages/MiniGame";
import TreeHole from "@/pages/TreeHole";
import TreeHolePost from "@/pages/TreeHolePost";

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route element={<LayoutWrapper />}>
          <Route path="/home" element={<Home />} />
          <Route path="/theater" element={<Theater />} />
          <Route path="/theater/:scenarioId" element={<TheaterPlay />} />
          <Route path="/theater/:scenarioId/review" element={<TheaterReview />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skills/badges" element={<Badges />} />
          <Route path="/skills/:skillId" element={<SkillDetail />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contract/mini-game/:gameId" element={<MiniGame />} />
          <Route path="/tree-hole" element={<TreeHole />} />
          <Route path="/tree-hole/:postId" element={<TreeHolePost />} />
        </Route>
      </Routes>
    </Router>
  );
}
