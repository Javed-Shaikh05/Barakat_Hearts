// Static Islamic messages data embedded directly
const islamicMessages = [
  {
    id: "msg-1",
    title: "Subhan Allah ✨",
    content: "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
    category: "morning",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-21T08:00:00Z"),
  },
  {
    id: "msg-2", 
    title: "Dua for My Beloved",
    content: "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
    category: "dua",
    hearts: 15,
    isSpecial: true,
    createdAt: new Date("2024-01-22T09:00:00Z"),
  },
  {
    id: "msg-3",
    title: "Fi Amanillah",
    content: "When we are apart, I place you in Allah's protection. Distance cannot diminish the bond that Allah has created between our hearts.",
    category: "missing",
    hearts: 8,
    isSpecial: false,
    createdAt: new Date("2024-01-23T10:00:00Z"),
  },
  {
    id: "msg-4",
    title: "Alhamdulillahi Rabbil Alameen 💎",
    content: "All praise is due to Allah who blessed me with a wife who is my partner in this life and the next. You complete half of my deen.",
    category: "gratitude",
    hearts: 18,
    isSpecial: true,
    createdAt: new Date("2024-01-24T11:00:00Z"),
  },
  {
    id: "msg-5",
    title: "Barakallahu laki",
    content: "May Allah bless you, my dear wife. You are the coolness of my eyes and the tranquility of my heart, just as the Prophet ﷺ taught us.",
    category: "blessing",
    hearts: 12,
    isSpecial: false,
    createdAt: new Date("2024-01-25T12:00:00Z"),
  },
  {
    id: "msg-6",
    title: "Lailat Saeedah",
    content: "As you sleep tonight, I make dua that Allah grants you peaceful dreams and protection. You are my amanah from Allah.",
    category: "goodnight",
    hearts: 10,
    isSpecial: false,
    createdAt: new Date("2024-01-26T22:00:00Z"),
  },
  {
    id: "msg-7",
    title: "Always in My Dua 💕",
    content: "In every sujood, you are remembered. In every du'a, you are mentioned. May Allah keep us together in Jannah.",
    category: "remembrance",
    hearts: 14,
    isSpecial: false,
    createdAt: new Date("2024-01-27T13:00:00Z"),
  },
  {
    id: "msg-8",
    title: "Our Journey to Jannah",
    content: "Together we walk the path of righteousness. May Allah make our love a means of drawing closer to Him and earning His pleasure.",
    category: "future",
    hearts: 16,
    isSpecial: true,
    createdAt: new Date("2024-01-28T14:00:00Z"),
  },
  {
    id: "msg-9",
    title: "Mashallah Tabarakallah",
    content: "Allah has made you beautiful inside and out. Your taqwa and good character make you more precious than any treasure in this world.",
    category: "appreciation",
    hearts: 13,
    isSpecial: false,
    createdAt: new Date("2024-01-29T15:00:00Z"),
  },
  {
    id: "msg-10",
    title: "Bismillah",
    content: "With the name of Allah, we begin each day together. May He guide our steps and bless our marriage with His divine love.",
    category: "morning",
    hearts: 11,
    isSpecial: false,
    createdAt: new Date("2024-01-30T08:30:00Z"),
  }
];

function getRandomMessage() {
  if (islamicMessages.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * islamicMessages.length);
  return islamicMessages[randomIndex];
}

module.exports = async (req, res) => {
  try {
    const message = getRandomMessage();
    if (!message) {
      return res.status(404).json({ message: "No messages found" });
    }
    
    res.json(message);
  } catch (error) {
    console.error("Error in /api/messages/random:", error);
    res.status(500).json({
      message: "Failed to get random message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
