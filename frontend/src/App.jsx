import React, { useState } from "react";

export default function App() {
  const [keywords, setKeywords] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Keyword Translator
            </span>
          </h1>
          <p className="text-base text-gray-600">
            Translate keywords instantly • AI-powered precision
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Source Keywords
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  Comma separated
                </span>
              </div>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full h-80 p-5 bg-gradient-to-br from-gray-50 to-green-50/20 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none text-gray-700 text-base placeholder-gray-400 font-medium shadow-inner"
                placeholder="apple, banana, orange, computer, phone, table, chair, book, pen, water..."
              />
            </div>

            {/* Right Column - Output */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Translated Keywords
                </h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-1.5 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:ring-4 focus:ring-green-200 focus:outline-none"
                >
                  <option value="es">🇪🇸 Spanish</option>
                  <option value="fr">🇫🇷 French</option>
                  <option value="de">🇩🇪 German</option>
                  <option value="zh">🇨🇳 Chinese</option>
                  <option value="hi">🇮🇳 Hindi</option>
                  <option value="ja">🇯🇵 Japanese</option>
                  <option value="ar">🇸🇦 Arabic</option>
                  <option value="pt">🇧🇷 Portuguese</option>
                  <option value="ru">🇷🇺 Russian</option>
                  <option value="it">🇮🇹 Italian</option>
                  <option value="ko">🇰🇷 Korean</option>
                  <option value="nl">🇳🇱 Dutch</option>
                  <option value="tr">🇹🇷 Turkish</option>
                  <option value="pl">🇵🇱 Polish</option>
                </select>
              </div>
              <div className="h-80 bg-gradient-to-br from-gray-50 to-emerald-50/30 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold mb-1">Enter keywords to see translations</p>
                  <p className="text-sm text-gray-400">Translations appear here automatically</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-6 pt-5 border-t border-gray-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 font-medium">100+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-gray-600 font-medium">Instant Results</span>
              </div>
            </div>
            <div className="text-gray-400 font-medium">
              Powered by AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}