import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Player from "./components/Player";
import Zone from "./components/Zone";

export default function App() {
  // States
  const [journals, setJournals] = useState([]);
  const [journalText, setJournalText] = useState("");
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [timer, setTimer] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [currentZone, setCurrentZone] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [popup, setPopup] = useState(null);

  // Popup instructions
  useEffect(() => {
    setPopup("Controls: ⬆️⬇️ Arrow Keys / Scroll | 🖱️ Click to teleport | 🎮 Reach edges to switch");
    setTimeout(() => setPopup(null), 4000);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Achievements unlock
  useEffect(() => {
    if (journals.length >= 3) {
      setAchievements((a) => [...new Set([...a, "Consistency Badge"])]);
    }
    if (posts.length >= 3) {
      setAchievements((a) => [...new Set([...a, "Leader Badge"])]);
    }
  }, [journals, posts]);

  const movePlayer = (newPos) => {
    setPlayerPos(newPos);
    checkZoneTransition(newPos);
  };

  const checkZoneTransition = (pos) => {
    if (pos.y > window.innerHeight - 50) {
      if (currentZone < zones.length - 1) {
        setCurrentZone((z) => z + 1);
        setPlayerPos({ x: 100, y: 50 });
      } else {
        setPopup("🚫 No more content below!");
        setTimeout(() => setPopup(null), 2000);
        setPlayerPos({ x: 100, y: window.innerHeight - 100 });
      }
    }
    if (pos.y < 20) {
      if (currentZone > 0) {
        setCurrentZone((z) => z - 1);
        setPlayerPos({ x: 100, y: window.innerHeight - 100 });
      } else {
        setPopup("🚫 No more content above!");
        setTimeout(() => setPopup(null), 2000);
        setPlayerPos({ x: 100, y: 50 });
      }
    }
  };

  // Zones with modern UI + animations
    // Zones with modern UI + animations
  const zones = [
    {
      title: "📚 Journals",
      color: "bg-gradient-to-b from-indigo-500 to-purple-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/30 hover:scale-[1.02] transition">
            <h2 className="text-2xl font-bold text-white">Write a Journal</h2>
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Start writing your thoughts..."
              className="w-full mt-4 p-4 rounded-xl bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={4}
            />
            <button
              onClick={() => {
                if (journalText.trim() !== "") {
                  setJournals([...journals, { id: Date.now(), text: journalText }]);
                  setJournalText("");
                }
              }}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Save Journal
            </button>
          </div>
          <div className="space-y-3">
            {journals.map((j) => (
              <motion.div
                key={j.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/5 rounded-xl p-3 text-white shadow"
              >
                {j.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "🏙️ Community",
      color: "bg-gradient-to-b from-green-500 to-emerald-700",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/30 hover:scale-[1.02] transition">
            <h2 className="text-2xl font-bold text-white">Community Feed</h2>
            <input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full mt-4 p-4 rounded-xl bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => {
                if (postText.trim() !== "") {
                  setPosts([{ id: Date.now(), text: postText }, ...posts]);
                  setPostText("");
                }
              }}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Post
            </button>
          </div>
          <div className="space-y-3">
            {posts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 rounded-xl p-3 text-white shadow"
              >
                👩‍🎓 {p.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "🎓 Study Room",
      color: "bg-gradient-to-b from-purple-500 to-pink-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/30 hover:scale-[1.02] transition"
        >
          <h2 className="text-2xl font-bold text-white">Group Study</h2>
          <p className="text-sm text-gray-200 mt-2">Collaborate with peers in real-time sessions.</p>
          <button
            onClick={() => setTimer(25 * 60)}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Start Focus Timer
          </button>
          {timer !== null && (
            <motion.p
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-white mt-4 text-lg font-semibold"
            >
              ⏳ {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </motion.p>
          )}
        </motion.div>
      ),
    },
    {
      title: "🏆 Achievements",
      color: "bg-gradient-to-b from-yellow-400 to-orange-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/30 text-center hover:scale-[1.05] transition"
            >
              <h2 className="text-xl font-bold text-white">{ach}</h2>
              <p className="text-sm text-gray-200 mt-2">Unlocked by your activity 🎉</p>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
  ];

  // Render
  return (
    <div className={`h-screen flex flex-col items-center justify-center ${zones[currentZone].color} relative`}>
      <Zone title={zones[currentZone].title} content={zones[currentZone].content} />
      <Player playerPos={playerPos} setPlayerPos={movePlayer} />

      {popup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade"
        >
          {popup}
        </motion.div>
      )}
    </div>
  );
}