"use client";
import { useState } from "react";
export default function AITutor() {
    const [message, setMessage] = useState("");
const [messages, setMessages] = useState<
  { sender: "user" | "ai"; text: string }[]
>([]);
const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = {
    sender: "user" as const,
    text: message,
  };

  setMessages((prev) => [...prev, userMessage]);

  const currentMessage = message;
  setMessage("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: currentMessage,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Unable to connect to Raphael AI.",
      },
    ]);
  }
};
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <div className="w-72 border-r border-yellow-600/20 bg-zinc-950 p-6">

        <button className="w-full bg-yellow-500 text-black rounded-xl p-3 font-semibold hover:bg-yellow-400">
          + New Chat
        </button>

        <div className="mt-8 space-y-3">

          <div className="bg-zinc-900 rounded-xl p-3 cursor-pointer hover:bg-zinc-800">
            Principles of Flight
          </div>

          <div className="bg-zinc-900 rounded-xl p-3 cursor-pointer hover:bg-zinc-800">
            Meteorology
          </div>

          <div className="bg-zinc-900 rounded-xl p-3 cursor-pointer hover:bg-zinc-800">
            Air Law
          </div>

        </div>

      </div>

      {/* Chat */}

      <div className="flex-1 flex flex-col">

        <div className="border-b border-yellow-600/20 p-6">

          <h1 className="text-3xl font-bold text-yellow-300">
            Raphael AI
          </h1>

          <p className="text-zinc-500 mt-2">
            Your personal SACAA CPL Instructor
          </p>

        </div>

        <div className="flex-1 overflow-auto p-10">

          <div className="max-w-4xl mx-auto space-y-6">
           {messages.map((msg, index) => (
<div
  key={index}
  className={`max-w-xl p-5 rounded-2xl ${
  msg.sender === "user"
    ? "bg-yellow-500 text-black ml-auto"
    : "bg-zinc-900 border border-zinc-800 mr-auto"
}`}
>

<div className="font-bold mb-2">
  {msg.sender === "user" ? "You" : "Raphael AI"}
</div>

<div>
  {msg.text}
</div>

</div>

))}

            {messages.length === 0 && (

<div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

  👋 Welcome to Raphael AI.

  <br /><br />

  Ask me anything about SACAA CPL.

</div>

)}

          </div>

        </div>

        {/* Input */}

        <div className="border-t border-yellow-600/20 p-6">

          <div className="max-w-4xl mx-auto flex gap-4">
            

            <input
  type="text"
  placeholder="Ask Raphael AI anything..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
}}
  className="flex-1 bg-zinc-900 rounded-xl p-4 outline-none border border-zinc-800 focus:border-yellow-500"
/>

            <button
  disabled={!message.trim()}
  onClick={sendMessage}
  className="bg-yellow-500 text-black px-8 rounded-xl font-bold disabled:opacity-50 hover:bg-yellow-400"
>
  Send
</button>

          </div>

        </div>

      </div>

    </div>
  );
}