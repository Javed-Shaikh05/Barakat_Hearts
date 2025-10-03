// Unused imports removed as stats and title were removed

export default function Header() {
  return (
    <header className="relative z-10 p-4 md:p-6" data-testid="header">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* Title and icon removed as requested */}
          </div>

          <div className="flex items-center space-x-4">
            {/* Stats removed as requested */}
          </div>
        </div>
      </div>
    </header>
  );
}
