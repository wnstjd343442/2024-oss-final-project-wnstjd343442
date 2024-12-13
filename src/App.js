import React from "react";
import Header from "./components/page/Header";
import ListLocalBook from "./components/page/ListLocalBook";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <div className="bg-green-700 text-white py-2">
          <h1 className="text-center text-xl font-bold tracking-wide">
            한동문고
          </h1>
        </div>
        <Header />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ListLocalBook />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 한동문고. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
