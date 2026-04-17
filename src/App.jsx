import React, { useState } from "react";
import AuthPage from "./components/pages/AuthPage";
import Dashboard from "./components/pages/Dashboard";
import LinksPage from "./components/pages/LinksPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import SettingsPage from "./components/pages/SettingsPage";
import Sidebar from "./components/layout/Sidebar";
import { MOCK_USER } from "./components/data/mockData";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [analyticLink, setAnalyticLink] = useState(null);

  const navigateTo = (p, link) => {
    if (p === "analytics" && link) setAnalyticLink(link);
    setPage(p);
  };

  if (!isAuth) return <AuthPage onAuth={() => setIsAuth(true)} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={navigateTo} />;
      case "links":
        return (
          <LinksPage onAnalytics={(link) => navigateTo("analytics", link)} />
        );
      case "analytics":
        return <AnalyticsPage link={analyticLink} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-primary">
      <Sidebar
        page={page}
        setPage={setPage}
        user={MOCK_USER}
        onLogout={() => setIsAuth(false)}
      />
      {renderPage()}
    </div>
  );
}
