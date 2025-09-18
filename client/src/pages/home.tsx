import { useState } from "react";
import FloatingHearts from "@/components/floating-hearts";
import Header from "@/components/header";
import MainMessageCard from "@/components/main-message-card";
import GameificationSection from "@/components/gamification-section";
import BottomNavigation from "@/components/bottom-navigation";
import SurpriseModal from "@/components/surprise-modal";
import IslamicCounter from "@/components/islamic-counter";
import IslamicWelcomePopup from "@/components/islamic-welcome-popup";

export default function Home() {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <IslamicCounter />;
      case "messages":
        return <MainMessageCard onSurpriseUnlock={() => setShowSurpriseModal(true)} />;
      case "stats":
        return <GameificationSection />;
      case "love":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-emerald-800 mb-6">
                🤲 Beautiful Duas 🤲
              </h2>
              <div className="grid gap-6 md:gap-8">
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">📿</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Morning Dhikr</h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Quran 2:201</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🌙</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Evening Dhikr</h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "O Allah, help me to remember You, to thank You, and to worship You in the best way."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Hadith</p>
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
      <title>Barakah Hearts - Beautiful Duas and Blessings</title>
      <meta name="description" content="Beautiful Islamic messages, duas, and blessed moments. Count every barakah-filled day with Islamic wisdom and divine guidance." />
      
      <FloatingHearts />
      <IslamicWelcomePopup />
      
      <Header />
      
      {renderTabContent()}
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <SurpriseModal 
        isOpen={showSurpriseModal} 
        onClose={() => setShowSurpriseModal(false)} 
      />
      
      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
}
