module.exports = async (req, res) => {
  try {
    // Return mock messages for testing
    const messages = [
      {
        id: "test-message-1",
        title: "Subhan Allah ✨",
        content:
          "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
        category: "morning",
        hearts: 12,
        isSpecial: false,
        createdAt: new Date(),
      },
      {
        id: "test-message-2",
        title: "Dua for My Beloved",
        content:
          "May Allah grant you happiness in both worlds and make you among the righteous. Your smile is a reflection of Allah's countless blessings upon us.",
        category: "dua",
        hearts: 15,
        isSpecial: true,
        createdAt: new Date(),
      },
    ];
    res.json(messages);
  } catch (error) {
    console.error("Error in /api/messages/recent:", error);
    res.status(500).json({
      message: "Failed to get recent messages",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
