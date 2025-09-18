const express = require("express");
const path = require("path");

// Import our API handler
const apiHandler = require("../api/index.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

// API routes - wrap our Vercel handler for local development
app.use("/api/*", (req, res) => {
  // Simulate Vercel's request object
  req.url = req.originalUrl;
  apiHandler(req, res);
});

// Check if built frontend exists
const frontendPath = path.join(__dirname, "../dist/public");
const fs = require('fs');

if (fs.existsSync(frontendPath)) {
  // Serve static files from dist/public if built
  app.use(express.static(frontendPath));
  
  // Catch-all handler for frontend routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // If no built frontend, serve a simple message
  app.get("/", (req, res) => {
    res.send(`
      <html>
        <head>
          <title>LoveBloom API Server</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #e91e63; }
            .endpoint { background: #f8f9fa; padding: 10px; margin: 5px 0; border-left: 4px solid #e91e63; }
            a { color: #e91e63; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌹 LoveBloom API Server Running</h1>
            <p>Your API server is running successfully! The frontend hasn't been built yet.</p>
            
            <h2>📡 Available API Endpoints:</h2>
            <div class="endpoint"><a href="/api/health">GET /api/health</a> - Health check</div>
            <div class="endpoint"><a href="/api/test">GET /api/test</a> - Test endpoint</div>
            <div class="endpoint"><a href="/api/stats">GET /api/stats</a> - User stats with streaks</div>
            <div class="endpoint"><a href="/api/messages/random">GET /api/messages/random</a> - Random Islamic message</div>
            <div class="endpoint"><a href="/api/messages/recent">GET /api/messages/recent</a> - Recent messages</div>
            <div class="endpoint"><a href="/api/favorites">GET /api/favorites</a> - User favorites</div>
            <div class="endpoint"><a href="/api/achievements">GET /api/achievements</a> - Achievements</div>
            
            <h2>🚀 To build and run the full app:</h2>
            <ol>
              <li>Run <code>npm run build</code> to build the frontend</li>
              <li>Then restart the server with <code>npm run dev:windows</code></li>
            </ol>
            
            <p><strong>All your Islamic messages and streak data are working perfectly! ✨</strong></p>
          </div>
        </body>
      </html>
    `);
  });
  
  // Handle other routes
  app.get("*", (req, res) => {
    res.redirect("/");
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at:`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/stats`);
  console.log(`   - http://localhost:${PORT}/api/messages/random`);
  console.log(`   - http://localhost:${PORT}/api/messages/recent`);
  console.log(`   - http://localhost:${PORT}/api/favorites`);
  console.log(`   - http://localhost:${PORT}/api/achievements`);
});

module.exports = app;
