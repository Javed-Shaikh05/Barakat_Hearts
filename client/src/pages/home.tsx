import { useState, useEffect } from "react";
import FloatingHearts from "@/components/floating-hearts";
import Header from "@/components/header";
import MainMessageCard from "@/components/main-message-card";
import GameificationSection from "@/components/gamification-section";
import BottomNavigation from "@/components/bottom-navigation";
import SurpriseModal from "@/components/surprise-modal";
import IslamicCounter from "@/components/islamic-counter";
import IslamicWelcomePopup from "@/components/islamic-welcome-popup";
import MarriageInvitation from "@/components/marriage-invitation";
import PartyPoppers from "@/components/party-poppers";

export default function Home() {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showInvitationCard, setShowInvitationCard] = useState(false);
  const [showPartyPoppers, setShowPartyPoppers] = useState(false);

  useEffect(() => {
    document.title = "Barakat Hearts - Beautiful Duas and Blessings";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Beautiful Islamic messages, duas, and blessed moments. Count every barakat-filled day with Islamic wisdom and divine guidance."
      );
    }
  }, []);

  const handleWelcomePopupClose = () => {
    setShowWelcomePopup(false);
    // Show invitation card after popup closes
    setTimeout(() => {
      setShowInvitationCard(true);
      setShowPartyPoppers(true);
    }, 500);
  };

  const handlePartyPoppersComplete = () => {
    setShowPartyPoppers(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Marriage Invitation Card - Only show after popup closes */}
            {showInvitationCard && (
              <div className="max-w-4xl mx-auto px-4">
                <MarriageInvitation
                  brideName="Sana"
                  groomName="Javed"
                  weddingDate="2025-10-07T10:00:00Z"
                />
              </div>
            )}

            {/* Islamic Counter */}
            <IslamicCounter />
          </div>
        );
      case "messages":
        return (
          <MainMessageCard
            onSurpriseUnlock={() => setShowSurpriseModal(true)}
          />
        );
      case "stats":
        return <GameificationSection />;
      case "duas":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-emerald-800 mb-6">
                🤲 Beautiful Duas 🤲
              </h2>
              <div className="grid gap-6 md:gap-8">
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">📿</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Morning Dhikr
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ
                    حَسَنَةً وَقِنَا عَذَابَ النَّارِ"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "Our Lord, give us good in this world and good in the next
                    world, and save us from the punishment of the Fire."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Quran 2:201</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🌙</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Evening Dhikr
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ
                    عِبَادَتِكَ"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "O Allah, help me to remember You, to thank You, and to
                    worship You in the best way."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Hadith</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "love":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-emerald-800 mb-6">
                💕 Islamic Love & Marriage 💕
              </h2>
              <div className="grid gap-6 md:gap-8">
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">💍</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Blessed Union
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
                    أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم
                    مَّوَدَّةً وَرَحْمَةً"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "And among His signs is that He created for you mates from
                    among yourselves, that you may dwell in tranquility with
                    them, and He has put love and mercy between your hearts."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Quran 30:21</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🌹</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Best to Your Family
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ
                    لِأَهْلِي"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "The best of you are those who are best to their family, and
                    I am the best of you to my family."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">
                    - Prophet Muhammad ﷺ (Ibn Majah)
                  </p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">🤲</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Dua for Righteous Spouse
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا
                    قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "Our Lord, grant us from among our wives and offspring
                    comfort to our eyes and make us an example for the
                    righteous."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">- Quran 25:74</p>
                </div>
                <div className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-2xl mb-4">❤️</div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    Perfect in Faith
                  </h3>
                  <p className="text-emerald-700 opacity-90 leading-relaxed">
                    "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا
                    وَخِيَارُكُمْ خِيَارُكُمْ لِنِسَائِهِمْ"
                  </p>
                  <p className="text-emerald-600 text-sm mt-3 italic">
                    "The most perfect of believers in faith are those with the
                    best character, and the best of you are those who are best
                    to their wives."
                  </p>
                  <p className="text-emerald-500 text-sm mt-2">
                    - Prophet Muhammad ﷺ (Tirmidhi)
                  </p>
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
      <FloatingHearts />
      {showWelcomePopup && (
        <IslamicWelcomePopup onClose={handleWelcomePopupClose} />
      )}
      {showPartyPoppers && (
        <PartyPoppers
          isVisible={showPartyPoppers}
          onComplete={handlePartyPoppersComplete}
        />
      )}

      <Header />

      {renderTabContent()}

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <SurpriseModal
        isOpen={showSurpriseModal}
        onClose={() => setShowSurpriseModal(false)}
      />

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
}
