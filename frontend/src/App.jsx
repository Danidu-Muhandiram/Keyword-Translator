import React, { useState, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("si");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");

  const languages = [
    { code: "af", name: "Afrikaans", flag: "🇿🇦" },
    { code: "sq", name: "Albanian", flag: "🇦🇱" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hy", name: "Armenian", flag: "🇦🇲" },
    { code: "az", name: "Azerbaijani", flag: "🇦🇿" },
    { code: "eu", name: "Basque", flag: "🇪🇸" },
    { code: "be", name: "Belarusian", flag: "🇧🇾" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "bs", name: "Bosnian", flag: "🇧🇦" },
    { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
    { code: "ca", name: "Catalan", flag: "🇪🇸" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "hr", name: "Croatian", flag: "🇭🇷" },
    { code: "cs", name: "Czech", flag: "🇨🇿" },
    { code: "da", name: "Danish", flag: "🇩🇰" },
    { code: "nl", name: "Dutch", flag: "🇳🇱" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "et", name: "Estonian", flag: "🇪🇪" },
    { code: "fi", name: "Finnish", flag: "🇫🇮" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "gl", name: "Galician", flag: "🇪🇸" },
    { code: "ka", name: "Georgian", flag: "🇬🇪" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "el", name: "Greek", flag: "🇬🇷" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "ht", name: "Haitian Creole", flag: "🇭🇹" },
    { code: "he", name: "Hebrew", flag: "🇮🇱" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "hu", name: "Hungarian", flag: "🇭🇺" },
    { code: "is", name: "Icelandic", flag: "🇮🇸" },
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "ga", name: "Irish", flag: "🇮🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "kk", name: "Kazakh", flag: "🇰🇿" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ky", name: "Kyrgyz", flag: "🇰🇬" },
    { code: "lo", name: "Lao", flag: "🇱🇦" },
    { code: "lv", name: "Latvian", flag: "🇱🇻" },
    { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
    { code: "mk", name: "Macedonian", flag: "🇲🇰" },
    { code: "ms", name: "Malay", flag: "🇲🇾" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "mt", name: "Maltese", flag: "🇲🇹" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "mn", name: "Mongolian", flag: "🇲🇳" },
    { code: "ne", name: "Nepali", flag: "🇳🇵" },
    { code: "no", name: "Norwegian", flag: "🇳🇴" },
    { code: "fa", name: "Persian", flag: "🇮🇷" },
    { code: "pl", name: "Polish", flag: "🇵🇱" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "ro", name: "Romanian", flag: "🇷🇴" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "sr", name: "Serbian", flag: "🇷🇸" },
    { code: "si", name: "Sinhala", flag: "🇱🇰" },
    { code: "sk", name: "Slovak", flag: "🇸🇰" },
    { code: "sl", name: "Slovenian", flag: "🇸🇮" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "sw", name: "Swahili", flag: "🇰🇪" },
    { code: "sv", name: "Swedish", flag: "🇸🇪" },
    { code: "tl", name: "Tagalog", flag: "🇵🇭" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "th", name: "Thai", flag: "🇹🇭" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" },
    { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
    { code: "ur", name: "Urdu", flag: "🇵🇰" },
    { code: "uz", name: "Uzbek", flag: "🇺🇿" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "cy", name: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
    { code: "yi", name: "Yiddish", flag: "✡️" },
    { code: "zu", name: "Zulu", flag: "🇿🇦" }
  ];

  const filteredLanguages = languageSearch
    ? languages.filter(lang => 
        lang.name.toLowerCase().includes(languageSearch.toLowerCase())
      )
    : languages;

  const selectedLang = languages.find(l => l.code === selectedLanguage) || languages[0];

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchOpen && !e.target.closest('.language-dropdown')) {
        setSearchOpen(false);
        setLanguageSearch("");
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Translate keywords whenever keywords or language changes
  useEffect(() => {
    if (keywords.length === 0) {
      setTranslations([]);
      return;
    }

    const translateKeywords = async () => {
      setIsTranslating(true);
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
        const response = await fetch(`${apiUrl}/api/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keywords,
            targetLanguage: selectedLanguage
          })
        });

        const data = await response.json();
        if (data.success) {
          setTranslations(data.translations);
        }
      } catch (error) {
        console.error('Translation error:', error);
        setTranslations(keywords.map(() => 'Translation unavailable'));
      } finally {
        setIsTranslating(false);
      }
    };

    translateKeywords();
  }, [keywords, selectedLanguage]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Check if user pressed comma or Enter
    if (value.includes(',')) {
      const newKeywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
      if (newKeywords.length > 0) {
        setKeywords([...keywords, ...newKeywords]);
        setInputValue('');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
    setTranslations(translations.filter((_, index) => index !== indexToRemove));
    setHoveredIndex(null);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-4 mt-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Keyword Translator
            </span>
          </h1>
          <p className="text-base text-gray-600">
            Translate keywords instantly • Fast and accurate
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between h-10">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Enter Keywords
                </h3>
                <div className="flex items-center gap-2">
                  {keywords.length > 0 && (
                    <button
                      onClick={() => setKeywords([])}
                      className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                    >
                      Clear All
                    </button>
                  )}
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {keywords.length} keywords
                  </span>
                </div>
              </div>
              <div className="w-full h-80 p-4 bg-gradient-to-br from-gray-50 to-green-50/20 border-2 border-gray-200 rounded-2xl focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-300 shadow-inner overflow-y-auto">
                {/* Keywords Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 cursor-pointer ${
                        hoveredIndex === index
                          ? 'bg-green-200 border-2 border-green-500 text-gray-800 scale-105 shadow-md'
                          : 'bg-green-50 border border-green-300 text-gray-700 hover:border-green-400 hover:bg-green-100'
                      }`}
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => removeKeyword(index)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-100 transition-all"
                        title="Remove"
                      >
                        <svg className="w-2.5 h-2.5 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                {/* Input field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-0 focus:outline-none text-gray-700 text-sm placeholder-gray-400"
                  placeholder={keywords.length === 0 ? "Type keywords and press comma or Enter..." : "Add more..."}
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Press comma (,) or Enter after each keyword
              </p>
            </div>

            {/* Right Column - Output */}
            <div className="space-y-3">
              <div className="flex items-center justify-between h-10">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Translated Keywords
                </h3>
                
                {/* Searchable Language Dropdown */}
                <div className="relative language-dropdown">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="pl-4 pr-3 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:ring-4 focus:ring-green-200 focus:outline-none flex items-center gap-2"
                  >
                    <span>{selectedLang.flag}</span>
                    <span>{selectedLang.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {searchOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                      {/* Search box */}
                      <div className="p-3 border-b sticky top-0 bg-white">
                        <input
                          type="text"
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          placeholder="Search languages..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          autoFocus
                        />
                      </div>
                      
                      {/* Language list */}
                      <div className="overflow-y-auto max-h-72">
                        {filteredLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLanguage(lang.code);
                              setSearchOpen(false);
                              setLanguageSearch("");
                            }}
                            className={`w-full px-4 py-2.5 text-left hover:bg-green-50 transition-colors flex items-center gap-2 ${
                              selectedLanguage === lang.code ? 'bg-green-100 font-semibold' : ''
                            }`}
                          >
                            <span>{lang.flag}</span>
                            <span className="text-gray-800">{lang.name}</span>
                          </button>
                        ))}
                        {filteredLanguages.length === 0 && (
                          <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            No languages found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-80 bg-gradient-to-br from-gray-50 to-emerald-50/30 border-2 border-dashed border-gray-300 rounded-2xl p-4 shadow-inner overflow-y-auto">
                {keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {translations.map((translation, index) => (
                      <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 cursor-pointer ${
                          hoveredIndex === index
                            ? 'bg-blue-200 border-2 border-blue-500 text-gray-800 scale-105 shadow-md'
                            : 'bg-blue-50 border border-blue-300 text-gray-700'
                        }`}
                      >
                        <span>{isTranslating && index >= translations.length - 1 ? '...' : translation}</span>
                        <button
                          onClick={() => removeKeyword(index)}
                          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-100 transition-all"
                          title="Remove"
                        >
                          <svg className="w-2.5 h-2.5 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
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
                )}
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
              Simple & Fast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}