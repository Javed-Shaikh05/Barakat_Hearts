import { useState } from "react";
import FloatingHearts from "@/components/floating-hearts";
import Header from "@/components/header";
import MainMessageCard from "@/components/main-message-card";
import GameificationSection from "@/components/gamification-section";
import RecentMessages from "@/components/recent-messages";
import BottomNavigation from "@/components/bottom-navigation";
import SurpriseModal from "@/components/surprise-modal";
import CreateMessageModal from "@/components/create-message-modal";

export default function Home() {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen gradient-bg relative">
      <title>Love Letters - Romantic Messages</title>
      <meta name="description" content="Surprise your loved one with beautiful romantic messages and love quotes. Features daily streaks, heart collection, and special unlocks." />
      
      <FloatingHearts />
      
      <Header />
      
      <MainMessageCard onSurpriseUnlock={() => setShowSurpriseModal(true)} />
      
      <GameificationSection />
      
      <RecentMessages />
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onCreateMessage={() => setShowCreateModal(true)}
      />
      
      <SurpriseModal 
        isOpen={showSurpriseModal} 
        onClose={() => setShowSurpriseModal(false)} 
      />
      
      <CreateMessageModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      
      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
}
