"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow">
        <div className="h-[400px] overflow-y-auto mb-4 space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                m.role === "user" ? "bg-blue-600 self-end" : "bg-gray-700"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-1 p-2 rounded-l bg-gray-900 border border-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-green-600 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}