import React from "react";
import Header from "./components/page/Header";
import ListLocalBook from "./components/page/ListLocalBook";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
