"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Loader2, Play, Code2, Check, FileText, Settings2 } from "lucide-react";

export default function Home() {
  const [requirement, setRequirement] = useState("");
  const [framework, setFramework] = useState("pytest");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    console.log("Generate button clicked");
    if (!requirement.trim()) {
      console.log("Requirement is empty, skipping");
      return;
    }

    setLoading(true);
    setError("");
    setCode("");
    
    try {
      console.log("Fetching from backend...", { requirement, framework });
      const response = await fetch("http://localhost:8000/generate-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirement, framework }),
      });

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to generate tests (Status: ${response.status}).`);
      }

      const data = await response.json();
      console.log("Successfully received code");
      setCode(data.code);
    } catch (err: any) {
      console.error("Error in handleGenerate:", err);
      setError(err.message || "An unexpected error occurred. Is the backend running at localhost:8000?");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">InspectML</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="text-slate-900">Test Generator</span>
            <Link href="/docs" className="hover:text-slate-900 transition-colors">Documentation</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Controls */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <h2>Requirements</h2>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Describe your feature or user story in plain English. Include edge cases for better coverage.
                </p>
                <textarea
                  placeholder="e.g., User logs in with email and password. Invalid credentials show error."
                  className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none resize-none transition-all placeholder:text-slate-400"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Settings2 className="w-4 h-4 text-indigo-600" />
                  <h2>Configuration</h2>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Framework</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                  >
                    <option value="pytest">Pytest (Python)</option>
                    <option value="playwright_py">Playwright (Python)</option>
                    <option value="playwright_js">Playwright (JavaScript)</option>
                    <option value="selenium_py">Selenium (Python)</option>
                    <option value="selenium_js">Selenium (JavaScript)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !requirement.trim()}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Suite...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Generate Tests
                  </>
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-red-600 text-xs font-medium leading-relaxed">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content: Output */}
        <div className="xl:col-span-8 flex flex-col min-h-[600px]">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">
                  {framework}_test_suite.{framework === 'pytest' ? 'py' : 'js'}
                </span>
              </div>
              {code && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              )}
            </div>
            
            <div className="flex-1 p-0 overflow-auto custom-scrollbar bg-[#0F172A]">
              {loading ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-400 space-y-6 p-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <Code2 className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-white">Synthesizing Test Suite</p>
                    <p className="text-sm">Applying {framework} best practices and edge cases...</p>
                  </div>
                </div>
              ) : code ? (
                <div className="p-6 lg:p-8">
                  <pre className="text-indigo-300 font-mono text-sm leading-relaxed whitespace-pre">
                    {code}
                  </pre>
                </div>
              ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-500 text-center p-12 bg-white">
                  <div className="bg-slate-50 p-6 rounded-full mb-6">
                    <Code2 className="w-12 h-12 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to generate</h3>
                  <p className="max-w-xs text-sm leading-relaxed">
                    Once you've entered your requirements, click the button to see your test code here.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between px-2 text-[10px] text-slate-400 uppercase tracking-tighter font-bold">
            <div className="flex gap-4">
              <span>Status: {loading ? 'Processing' : 'Idle'}</span>
              <span>Backend: Connected</span>
            </div>
            <span>v1.0.0-MVP</span>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 5px;
          border: 2px solid #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </main>
  );
}
