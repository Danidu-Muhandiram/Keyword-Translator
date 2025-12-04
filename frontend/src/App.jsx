import React, { useState, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate keywords whenever keywords or language changes
  useEffect(() => {
    if (keywords.length === 0) {
      setTranslations([]);
      return;
    }

    const translateKeywords = async () => {
      setIsTranslating(true);
      try {
        const response = await fetch('http://localhost:3000/api/translate', {
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
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="pl-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:ring-4 focus:ring-green-200 focus:outline-none appearance-none"
                  style={{ 
                    paddingRight: '2.5rem',
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"), linear-gradient(to right, rgb(34 197 94), rgb(5 150 105))`,
                    backgroundPosition: 'right 0.75rem center, center',
                    backgroundSize: '1.25em 1.25em, cover',
                    backgroundRepeat: 'no-repeat, no-repeat'
                  }}
                >
                  <option value="af" className="bg-white text-gray-800 py-2">🇿🇦 Afrikaans</option>
                  <option value="sq" className="bg-white text-gray-800 py-2">🇦🇱 Albanian</option>
                  <option value="ar" className="bg-white text-gray-800 py-2">🇸🇦 Arabic</option>
                  <option value="hy" className="bg-white text-gray-800 py-2">🇦🇲 Armenian</option>
                  <option value="az" className="bg-white text-gray-800 py-2">🇦🇿 Azerbaijani</option>
                  <option value="eu" className="bg-white text-gray-800 py-2">🇪🇸 Basque</option>
                  <option value="be" className="bg-white text-gray-800 py-2">🇧🇾 Belarusian</option>
                  <option value="bn" className="bg-white text-gray-800 py-2">🇧🇩 Bengali</option>
                  <option value="bs" className="bg-white text-gray-800 py-2">🇧🇦 Bosnian</option>
                  <option value="bg" className="bg-white text-gray-800 py-2">🇧🇬 Bulgarian</option>
                  <option value="ca" className="bg-white text-gray-800 py-2">🇪🇸 Catalan</option>
                  <option value="zh" className="bg-white text-gray-800 py-2">🇨🇳 Chinese</option>
                  <option value="hr" className="bg-white text-gray-800 py-2">🇭🇷 Croatian</option>
                  <option value="cs" className="bg-white text-gray-800 py-2">🇨🇿 Czech</option>
                  <option value="da" className="bg-white text-gray-800 py-2">🇩🇰 Danish</option>
                  <option value="nl" className="bg-white text-gray-800 py-2">🇳🇱 Dutch</option>
                  <option value="en" className="bg-white text-gray-800 py-2">🇬🇧 English</option>
                  <option value="et" className="bg-white text-gray-800 py-2">🇪🇪 Estonian</option>
                  <option value="fi" className="bg-white text-gray-800 py-2">🇫🇮 Finnish</option>
                  <option value="fr" className="bg-white text-gray-800 py-2">🇫🇷 French</option>
                  <option value="gl" className="bg-white text-gray-800 py-2">🇪🇸 Galician</option>
                  <option value="ka" className="bg-white text-gray-800 py-2">🇬🇪 Georgian</option>
                  <option value="de" className="bg-white text-gray-800 py-2">🇩🇪 German</option>
                  <option value="el" className="bg-white text-gray-800 py-2">🇬🇷 Greek</option>
                  <option value="gu" className="bg-white text-gray-800 py-2">🇮🇳 Gujarati</option>
                  <option value="ht" className="bg-white text-gray-800 py-2">🇭🇹 Haitian Creole</option>
                  <option value="he" className="bg-white text-gray-800 py-2">🇮🇱 Hebrew</option>
                  <option value="hi" className="bg-white text-gray-800 py-2">🇮🇳 Hindi</option>
                  <option value="hu" className="bg-white text-gray-800 py-2">🇭🇺 Hungarian</option>
                  <option value="is" className="bg-white text-gray-800 py-2">🇮🇸 Icelandic</option>
                  <option value="id" className="bg-white text-gray-800 py-2">🇮🇩 Indonesian</option>
                  <option value="ga" className="bg-white text-gray-800 py-2">🇮🇪 Irish</option>
                  <option value="it" className="bg-white text-gray-800 py-2">🇮🇹 Italian</option>
                  <option value="ja" className="bg-white text-gray-800 py-2">🇯🇵 Japanese</option>
                  <option value="kn" className="bg-white text-gray-800 py-2">🇮🇳 Kannada</option>
                  <option value="kk" className="bg-white text-gray-800 py-2">🇰🇿 Kazakh</option>
                  <option value="ko" className="bg-white text-gray-800 py-2">🇰🇷 Korean</option>
                  <option value="ky" className="bg-white text-gray-800 py-2">🇰🇬 Kyrgyz</option>
                  <option value="lo" className="bg-white text-gray-800 py-2">🇱🇦 Lao</option>
                  <option value="lv" className="bg-white text-gray-800 py-2">🇱🇻 Latvian</option>
                  <option value="lt" className="bg-white text-gray-800 py-2">🇱🇹 Lithuanian</option>
                  <option value="mk" className="bg-white text-gray-800 py-2">🇲🇰 Macedonian</option>
                  <option value="ms" className="bg-white text-gray-800 py-2">🇲🇾 Malay</option>
                  <option value="ml" className="bg-white text-gray-800 py-2">🇮🇳 Malayalam</option>
                  <option value="mt" className="bg-white text-gray-800 py-2">🇲🇹 Maltese</option>
                  <option value="mr" className="bg-white text-gray-800 py-2">🇮🇳 Marathi</option>
                  <option value="mn" className="bg-white text-gray-800 py-2">🇲🇳 Mongolian</option>
                  <option value="ne" className="bg-white text-gray-800 py-2">🇳🇵 Nepali</option>
                  <option value="no" className="bg-white text-gray-800 py-2">🇳🇴 Norwegian</option>
                  <option value="fa" className="bg-white text-gray-800 py-2">🇮🇷 Persian</option>
                  <option value="pl" className="bg-white text-gray-800 py-2">🇵🇱 Polish</option>
                  <option value="pt" className="bg-white text-gray-800 py-2">🇧🇷 Portuguese</option>
                  <option value="pa" className="bg-white text-gray-800 py-2">🇮🇳 Punjabi</option>
                  <option value="ro" className="bg-white text-gray-800 py-2">🇷🇴 Romanian</option>
                  <option value="ru" className="bg-white text-gray-800 py-2">🇷🇺 Russian</option>
                  <option value="sr" className="bg-white text-gray-800 py-2">🇷🇸 Serbian</option>
                  <option value="si" className="bg-white text-gray-800 py-2">🇱🇰 Sinhala</option>
                  <option value="sk" className="bg-white text-gray-800 py-2">🇸🇰 Slovak</option>
                  <option value="sl" className="bg-white text-gray-800 py-2">🇸🇮 Slovenian</option>
                  <option value="es" className="bg-white text-gray-800 py-2">🇪🇸 Spanish</option>
                  <option value="sw" className="bg-white text-gray-800 py-2">🇰🇪 Swahili</option>
                  <option value="sv" className="bg-white text-gray-800 py-2">🇸🇪 Swedish</option>
                  <option value="tl" className="bg-white text-gray-800 py-2">🇵🇭 Tagalog</option>
                  <option value="ta" className="bg-white text-gray-800 py-2">🇮🇳 Tamil</option>
                  <option value="te" className="bg-white text-gray-800 py-2">🇮🇳 Telugu</option>
                  <option value="th" className="bg-white text-gray-800 py-2">🇹🇭 Thai</option>
                  <option value="tr" className="bg-white text-gray-800 py-2">🇹🇷 Turkish</option>
                  <option value="uk" className="bg-white text-gray-800 py-2">🇺🇦 Ukrainian</option>
                  <option value="ur" className="bg-white text-gray-800 py-2">🇵🇰 Urdu</option>
                  <option value="uz" className="bg-white text-gray-800 py-2">🇺🇿 Uzbek</option>
                  <option value="vi" className="bg-white text-gray-800 py-2">🇻🇳 Vietnamese</option>
                  <option value="cy" className="bg-white text-gray-800 py-2">🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh</option>
                  <option value="yi" className="bg-white text-gray-800 py-2">✡️ Yiddish</option>
                  <option value="zu" className="bg-white text-gray-800 py-2">🇿🇦 Zulu</option>
                </select>
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