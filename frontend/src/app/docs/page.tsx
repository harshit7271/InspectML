import Link from "next/link";
import { ChevronLeft, Book, Code2, Rocket, HelpCircle } from "lucide-react";

export default function Docs() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">InspectML <span className="text-slate-400 font-medium">Docs</span></h1>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600">
            <Rocket className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Quick Start Guide</h2>
          </div>
          <p className="text-slate-600 leading-relaxed italic">
            Get your first automated test suite running in less than 60 seconds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { step: "1", title: "Input", desc: "Paste your user stories or feature requirements in plain English." },
              { step: "2", title: "Configure", desc: "Select between Pytest (Python) or Playwright (JS) output." },
              { step: "3", title: "Deploy", desc: "Generate, copy, and paste the code directly into your project." }
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-4xl font-black text-slate-100 block">{item.step}</span>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <Code2 className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Supported Frameworks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Pytest (Python)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Modular Python tests with fixtures and parameterization.
              </p>
              <pre className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-[10px] overflow-auto">
                pip install pytest requests
              </pre>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Playwright (Python)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Fast, reliable E2E tests for modern web apps in Python.
              </p>
              <pre className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-[10px] overflow-auto">
                pip install playwright pytest-playwright
              </pre>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Playwright (JS)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Standard Playwright JS/TS tests with async/await.
              </p>
              <pre className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-[10px] overflow-auto">
                npm install @playwright/test
              </pre>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Selenium (Python)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Industry-standard browser automation in Python.
              </p>
              <pre className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-[10px] overflow-auto">
                pip install selenium webdriver-manager
              </pre>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Selenium (JS)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Robust browser automation using Selenium WebDriver for JS.
              </p>
              <pre className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-[10px] overflow-auto">
                npm install selenium-webdriver
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <Book className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Best Practices</h2>
          </div>
          <ul className="space-y-4">
            {[
              "Be specific about actors (e.g., 'Admin', 'Guest').",
              "Mention expected error messages for negative cases.",
              "Include data constraints (e.g., 'password must be 8 characters').",
              "Define clear success criteria for positive flows."
            ].map((text, i) => (
              <li key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="bg-indigo-50 text-indigo-600 p-1 rounded-md">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
