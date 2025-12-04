import React from "react";

export default function App() {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-start py-12 px-4">
			<header className="mb-8 text-center">
				<h1 className="text-4xl font-bold text-primary mb-2">Keyword Translator</h1>
				<p className="text-lg text-gray-700 max-w-xl mx-auto">
					Instantly translate a list of keywords into your selected language. Paste your comma-separated keywords below and get each translated individually.
				</p>
			</header>
			<main className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
				{/* Translation box placeholder */}
				<div className="flex flex-col gap-4">
					<label htmlFor="keywords" className="font-semibold text-gray-800">Enter keywords (comma separated):</label>
					<textarea id="keywords" className="border border-gray-300 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. apple, banana, orange" />
				</div>
				<div className="flex flex-row gap-4 items-center">
					<label htmlFor="language" className="font-semibold text-gray-800">Translate to:</label>
					<select id="language" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary">
						<option value="es">Spanish</option>
						<option value="fr">French</option>
						<option value="de">German</option>
						<option value="zh">Chinese</option>
						<option value="hi">Hindi</option>
						{/* Add more languages as needed */}
					</select>
					<button className="ml-auto bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition">Translate</button>
				</div>
				{/* Results placeholder */}
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[60px] text-gray-700">
					{/* Translated keywords will appear here */}
				</div>
			</main>
		</div>
	);
}
