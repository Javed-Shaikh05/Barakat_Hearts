import { useState } from "react";
import FloatingHearts from "@/components/floating-hearts";
import Header from "@/components/header";
import MainMessageCard from "@/components/main-message-card";
import GameificationSection from "@/components/gamification-section";
import RecentMessages from "@/components/recent-messages";
import BottomNavigation from "@/components/bottom-navigation";
import SurpriseModal from "@/components/surprise-modal";
import CreateMessageModal from "@/components/create-message-modal";
import IslamicCounter from "@/components/islamic-counter";
import IslamicWelcomePopup from "@/components/islamic-welcome-popup";

export default function Home() {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <IslamicCounter />;
      case "messages":
        return (
          <>
            <MainMessageCard onSurpriseUnlock={() => setShowSurpriseModal(true)} />
            <RecentMessages />
          </>
        );
      case "stats":
        return <GameificationSection />;
      case "love":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-islamic-grey mb-6">
                💕 Our Love in Islam 💕
              </h2>
              <div className="grid gap-6 md:gap-8">
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🤲</div>
                  <h3 className="text-xl font-semibold text-islamic-grey mb-3">Daily Duas</h3>
                  <p className="text-islamic-grey opacity-75">
                    "And among His signs is that He created for you mates from among yourselves, 
                    that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
                  </p>
                  <p className="text-islamic-teal text-sm mt-2">- Quran 30:21</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🌙</div>
                  <h3 className="text-xl font-semibold text-islamic-grey mb-3">Islamic Love</h3>
                  <p className="text-islamic-grey opacity-75">
                    "The best of you are those who are best to their wives."
                  </p>
                  <p className="text-islamic-teal text-sm mt-2">- Prophet Muhammad ﷺ</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <IslamicCounter />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative">
      <title>Islamic Messages - Beautiful Duas and Love</title>
      <meta name="description" content="Beautiful Islamic messages, duas, and loving words. Count every blessed moment together with Islamic wisdom and guidance." />
      
      <FloatingHearts />
      <IslamicWelcomePopup />
      
      <Header />
      
      {renderTabContent()}
      
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
