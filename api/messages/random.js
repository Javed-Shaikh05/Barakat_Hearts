module.exports = async (req, res) => {
  try {
    // Return mock message for testing
    const message = {
      id: "test-message-1",
      title: "Subhan Allah ✨",
      content:
        "Allah has blessed me with the most beautiful wife. Your faith and kindness illuminate our home like the light of guidance.",
      category: "morning",
      hearts: 12,
      isSpecial: false,
      createdAt: new Date(),
    };
    res.json(message);
  } catch (error) {
    console.error("Error in /api/messages/random:", error);
    res.status(500).json({
      message: "Failed to get random message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
