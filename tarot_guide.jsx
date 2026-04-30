import { useState, useEffect } from "react";

const MAJOR_ARCANA = [
  { id: 0, name: "The Fool", number: "0", suit: "Major Arcana", keywords: ["beginnings", "innocence", "adventure", "spontaneity"], upright: "New beginnings, optimism, trust in life. A leap of faith into the unknown. Embracing the journey without fear of the future.", reversed: "Recklessness, taken advantage of, inconsideration. Naivety leading to poor decisions.", symbol: "🃏", color: "#6C63FF", element: "Air", planet: "Uranus" },
  { id: 1, name: "The Magician", number: "I", suit: "Major Arcana", keywords: ["willpower", "manifestation", "skill", "resourcefulness"], upright: "Manifestation, resourcefulness, power. You have all the tools you need. A time of focused will and decisive action.", reversed: "Manipulation, poor planning, untapped talents. Misuse of skill or deception.", symbol: "✨", color: "#FFD700", element: "Air", planet: "Mercury" },
  { id: 2, name: "The High Priestess", number: "II", suit: "Major Arcana", keywords: ["intuition", "mystery", "inner knowledge", "subconscious"], upright: "Intuition, higher powers, mystery. Trust your inner voice. Hidden knowledge and deeper truths await.", reversed: "Repressed intuition, hidden agendas, disconnectedness. Ignoring inner wisdom.", symbol: "🌙", color: "#4A90D9", element: "Water", planet: "Moon" },
  { id: 3, name: "The Empress", number: "III", suit: "Major Arcana", keywords: ["fertility", "abundance", "nature", "nurturing"], upright: "Femininity, beauty, nature, abundance. A time of growth, creativity, and nurturing. Fertility in ideas and projects.", reversed: "Creative block, dependence on others, smothering. Neglecting self-care.", symbol: "🌿", color: "#4CAF50", element: "Earth", planet: "Venus" },
  { id: 4, name: "The Emperor", number: "IV", suit: "Major Arcana", keywords: ["authority", "structure", "control", "fatherhood"], upright: "Authority, establishment, structure. Strong foundations and leadership. Taking charge with confidence.", reversed: "Domination, rigidity, coldness. Abuse of authority or lack of discipline.", symbol: "👑", color: "#E53935", element: "Fire", planet: "Aries" },
  { id: 5, name: "The Hierophant", number: "V", suit: "Major Arcana", keywords: ["tradition", "conformity", "morality", "ethics"], upright: "Tradition, conformity, morality. Seeking spiritual guidance through established institutions. Wisdom through convention.", reversed: "Rebellion, subversiveness, challenging tradition. Breaking free from norms.", symbol: "⛪", color: "#8D6E63", element: "Earth", planet: "Taurus" },
  { id: 6, name: "The Lovers", number: "VI", suit: "Major Arcana", keywords: ["love", "harmony", "relationships", "choices"], upright: "Love, harmony, relationships, values. A significant choice aligned with your highest values. Deep connection.", reversed: "Self-love deficit, disharmony, imbalance. Poor decisions or misaligned values.", symbol: "💕", color: "#E91E63", element: "Air", planet: "Gemini" },
  { id: 7, name: "The Chariot", number: "VII", suit: "Major Arcana", keywords: ["control", "willpower", "victory", "determination"], upright: "Control, willpower, success, determination. Overcoming obstacles through discipline. Victory through focus.", reversed: "Lack of control, opposition, scattered energy. Being pulled in different directions.", symbol: "⚔️", color: "#1E88E5", element: "Water", planet: "Cancer" },
  { id: 8, name: "Strength", number: "VIII", suit: "Major Arcana", keywords: ["courage", "patience", "inner strength", "compassion"], upright: "Courage, bravery, compassion, inner strength. Taming wild forces through gentleness. Quiet power and resolve.", reversed: "Self-doubt, weakness, insecurity. Raw emotions overcoming rational thought.", symbol: "🦁", color: "#FF9800", element: "Fire", planet: "Leo" },
  { id: 9, name: "The Hermit", number: "IX", suit: "Major Arcana", keywords: ["solitude", "guidance", "soul searching", "introspection"], upright: "Soul searching, introspection, inner guidance. A period of solitude and reflection. Shining a light for others.", reversed: "Isolation, loneliness, withdrawal. Cutting yourself off from needed help.", symbol: "🔦", color: "#607D8B", element: "Earth", planet: "Virgo" },
  { id: 10, name: "Wheel of Fortune", number: "X", suit: "Major Arcana", keywords: ["change", "cycles", "luck", "destiny"], upright: "Good luck, karma, life cycles. A turning point. What goes around comes around. Destiny at work.", reversed: "Bad luck, resistance to change, breaking cycles. External forces creating obstacles.", symbol: "☸️", color: "#9C27B0", element: "Fire", planet: "Jupiter" },
  { id: 11, name: "Justice", number: "XI", suit: "Major Arcana", keywords: ["fairness", "truth", "cause and effect", "law"], upright: "Justice, fairness, truth, cause and effect. Accountability and legal matters. Karmic consequences playing out.", reversed: "Unfairness, lack of accountability, dishonesty. Avoiding responsibility.", symbol: "⚖️", color: "#2196F3", element: "Air", planet: "Libra" },
  { id: 12, name: "The Hanged Man", number: "XII", suit: "Major Arcana", keywords: ["surrender", "letting go", "new perspective", "pause"], upright: "Pause, surrender, letting go. Seeing things from a new perspective. Sacrifice now for future gain.", reversed: "Delays, resistance, stalling. Indecision and inability to let go.", symbol: "🙃", color: "#26C6DA", element: "Water", planet: "Neptune" },
  { id: 13, name: "Death", number: "XIII", suit: "Major Arcana", keywords: ["endings", "change", "transformation", "transition"], upright: "Endings, change, transformation, transition. One door closes, another opens. Natural cycles of life.", reversed: "Resistance to change, stagnation, decay. Fear of transformation.", symbol: "🦋", color: "#37474F", element: "Water", planet: "Scorpio" },
  { id: 14, name: "Temperance", number: "XIV", suit: "Major Arcana", keywords: ["balance", "moderation", "patience", "purpose"], upright: "Balance, moderation, patience, purpose. Finding the middle path. Alchemy and healing through moderation.", reversed: "Imbalance, excess, lack of long-term vision. Extremes and disharmony.", symbol: "⚗️", color: "#66BB6A", element: "Fire", planet: "Sagittarius" },
  { id: 15, name: "The Devil", number: "XV", suit: "Major Arcana", keywords: ["bondage", "materialism", "shadow self", "addiction"], upright: "Bondage, addiction, materialism, shadow self. Feeling trapped by external forces. Confronting your darker side.", reversed: "Releasing limiting beliefs, exploring dark thoughts safely. Breaking free from chains.", symbol: "😈", color: "#C62828", element: "Earth", planet: "Capricorn" },
  { id: 16, name: "The Tower", number: "XVI", suit: "Major Arcana", keywords: ["disaster", "upheaval", "sudden change", "revelation"], upright: "Sudden change, upheaval, chaos, revelation. Structures crumbling to make way for truth. Necessary destruction.", reversed: "Avoidance of disaster, fear of change, delaying the inevitable.", symbol: "⚡", color: "#FF6F00", element: "Fire", planet: "Mars" },
  { id: 17, name: "The Star", number: "XVII", suit: "Major Arcana", keywords: ["hope", "faith", "renewal", "spirituality"], upright: "Hope, faith, rejuvenation, spirituality. After the storm comes calm. A guiding light and renewed optimism.", reversed: "Lack of faith, despair, disconnection. Feeling hopeless and uninspired.", symbol: "⭐", color: "#5C6BC0", element: "Air", planet: "Aquarius" },
  { id: 18, name: "The Moon", number: "XVIII", suit: "Major Arcana", keywords: ["illusion", "fear", "unconscious", "dreams"], upright: "Illusion, fear, the unconscious. Things are not as they seem. Pay attention to your dreams and intuition.", reversed: "Release of fear, repressed emotions, confusion clearing. Emerging from the fog.", symbol: "🌕", color: "#7986CB", element: "Water", planet: "Pisces" },
  { id: 19, name: "The Sun", number: "XIX", suit: "Major Arcana", keywords: ["positivity", "fun", "warmth", "success"], upright: "Positivity, fun, warmth, success. Joy and vitality. Things are going wonderfully. Radiant confidence.", reversed: "Temporary depression, lack of success, inner child issues. Clouded optimism.", symbol: "☀️", color: "#FDD835", element: "Fire", planet: "Sun" },
  { id: 20, name: "Judgement", number: "XX", suit: "Major Arcana", keywords: ["reflection", "reckoning", "awakening", "absolution"], upright: "Reflection, reckoning, awakening. A significant life review. Answering a higher calling. Spiritual rebirth.", reversed: "Self-doubt, refusal of self-examination. Ignoring the call to grow.", symbol: "📯", color: "#EF5350", element: "Fire", planet: "Pluto" },
  { id: 21, name: "The World", number: "XXI", suit: "Major Arcana", keywords: ["completion", "integration", "accomplishment", "travel"], upright: "Completion, integration, accomplishment. A cycle complete. Wholeness and the achievement of long-term goals.", reversed: "Shortcuts, delays, lack of closure. Seeking external validation.", symbol: "🌍", color: "#00897B", element: "Earth", planet: "Saturn" },
];

const MINOR_SUITS = [
  { suit: "Wands", element: "Fire", theme: "Passion, creativity, ambition", color: "#FF6F00", symbol: "🔥" },
  { suit: "Cups", element: "Water", theme: "Emotions, relationships, intuition", color: "#1565C0", symbol: "💧" },
  { suit: "Swords", element: "Air", theme: "Intellect, conflict, truth", color: "#546E7A", symbol: "💨" },
  { suit: "Pentacles", element: "Earth", theme: "Material, work, finances", color: "#2E7D32", symbol: "🌱" },
];

const MINOR_NUMBERS = [
  { num: "Ace", upright: "New beginnings, raw energy, seed of potential", reversed: "Delays, missed opportunities, blocked energy" },
  { num: "Two", upright: "Balance, partnership, duality, choices", reversed: "Imbalance, disconnection, blocked decisions" },
  { num: "Three", upright: "Growth, creativity, collaboration, initial success", reversed: "Delays in growth, lack of teamwork, obstacles" },
  { num: "Four", upright: "Stability, foundation, consolidation, rest", reversed: "Instability, stagnation, need for change" },
  { num: "Five", upright: "Conflict, challenge, change, loss", reversed: "Resolution, moving past conflict, recovery" },
  { num: "Six", upright: "Harmony, balance, solutions, nostalgia", reversed: "Unresolved issues, inequality, stuck in the past" },
  { num: "Seven", upright: "Reflection, assessment, strategy, perseverance", reversed: "Confusion, lack of direction, giving up" },
  { num: "Eight", upright: "Movement, action, mastery, power", reversed: "Stagnation, restriction, misuse of power" },
  { num: "Nine", upright: "Near completion, fulfillment, fruition", reversed: "Obstacles near the end, anxiety, unfulfillment" },
  { num: "Ten", upright: "Completion, endings, fulfillment, legacy", reversed: "Burden, failing to complete, unable to let go" },
  { num: "Page", upright: "Curiosity, enthusiasm, new ideas, messages", reversed: "Immaturity, lack of direction, scattered energy" },
  { num: "Knight", upright: "Action, adventure, drive, passion", reversed: "Impatience, recklessness, delays in action" },
  { num: "Queen", upright: "Nurturing, authority, maturity, mastery", reversed: "Overbearing, insecurity, misuse of power" },
  { num: "King", upright: "Leadership, mastery, authority, expertise", reversed: "Tyranny, manipulation, poor leadership" },
];

const QUIZ_POOL = MAJOR_ARCANA.slice(0, 10);

export default function TarotGuide() {
  const [tab, setTab] = useState("browse");
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState("all");
  const [quizCard, setQuizCard] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [dailyCard, setDailyCard] = useState(null);
  const [studiedCards, setStudiedCards] = useState(new Set());

  useEffect(() => {
    const idx = Math.floor((Date.now() / 86400000)) % MAJOR_ARCANA.length;
    setDailyCard(MAJOR_ARCANA[idx]);
  }, []);

  const startQuiz = () => {
    const card = QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
    setQuizCard(card);
    setQuizAnswer("");
    setQuizResult(null);
    setCardFlipped(false);
    // Generate 4 options
    const others = QUIZ_POOL.filter(c => c.id !== card.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...others, card].sort(() => Math.random() - 0.5);
    setQuizOptions(opts);
  };

  const checkQuiz = (chosen) => {
    const correct = chosen.id === quizCard.id;
    setQuizResult(correct ? "correct" : "wrong");
    setQuizAnswer(chosen.name);
    setQuizScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (correct) setStudiedCards(s => new Set([...s, quizCard.id]));
  };

  const cards = filter === "all" ? MAJOR_ARCANA : MAJOR_ARCANA.filter(c => c.element === filter);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 50%, #0d1a2e 100%)", minHeight: "100vh", color: "#e8e0f0", padding: "0" }}>
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", background: "linear-gradient(90deg, #c9b8ff, #ffb8e0, #b8e0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>✦ Tarot Study Guide</h1>
          <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "#9e8fb0" }}>{studiedCards.size} / {MAJOR_ARCANA.length} cards studied</p>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#b09cc0", background: "rgba(255,255,255,0.06)", borderRadius: "20px", padding: "6px 14px" }}>
          Quiz: {quizScore.correct}/{quizScore.total} ✓
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", padding: "12px 24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {["browse", "daily", "quiz", "suits"].map(t => (
          <button key={t} onClick={() => { setTab(t); if (t === "quiz" && !quizCard) startQuiz(); }}
            style={{ padding: "8px 18px", borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500, textTransform: "capitalize", transition: "all 0.2s",
              background: tab === t ? "rgba(180,140,255,0.2)" : "transparent",
              color: tab === t ? "#c9b8ff" : "#8070a0",
              borderBottom: tab === t ? "2px solid #c9b8ff" : "2px solid transparent" }}>
            {t === "browse" ? "📚 Browse" : t === "daily" ? "🌟 Daily Card" : t === "quiz" ? "🧠 Quiz" : "🔮 Minor Arcana"}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>

        {/* BROWSE TAB */}
        {tab === "browse" && (
          <div>
            {!selectedCard ? (
              <>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                  {["all", "Fire", "Water", "Air", "Earth"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      style={{ padding: "6px 16px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: "0.8rem",
                        background: filter === f ? "rgba(180,140,255,0.25)" : "rgba(255,255,255,0.05)",
                        color: filter === f ? "#c9b8ff" : "#9080b0" }}>
                      {f === "all" ? "All Cards" : f === "Fire" ? "🔥 Fire" : f === "Water" ? "💧 Water" : f === "Air" ? "💨 Air" : "🌱 Earth"}
                    </button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
                  {cards.map(card => (
                    <div key={card.id} onClick={() => { setSelectedCard(card); setStudiedCards(s => new Set([...s, card.id])); }}
                      style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "16px 12px", cursor: "pointer", textAlign: "center",
                        border: `1px solid ${studiedCards.has(card.id) ? card.color + "60" : "rgba(255,255,255,0.08)"}`,
                        transition: "all 0.2s", boxShadow: studiedCards.has(card.id) ? `0 0 12px ${card.color}30` : "none" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                      <div style={{ fontSize: "2rem", marginBottom: "6px" }}>{card.symbol}</div>
                      <div style={{ fontSize: "0.65rem", color: "#7060a0", marginBottom: "4px" }}>{card.number}</div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#d0c0e8" }}>{card.name}</div>
                      {studiedCards.has(card.id) && <div style={{ fontSize: "0.6rem", color: card.color, marginTop: "4px" }}>✓ studied</div>}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button onClick={() => setSelectedCard(null)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#c0b0e0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", marginBottom: "20px", fontSize: "0.85rem" }}>
                  ← Back to cards
                </button>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "28px", border: `1px solid ${selectedCard.color}40` }}>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    <div style={{ textAlign: "center", minWidth: "120px" }}>
                      <div style={{ fontSize: "4rem", marginBottom: "8px" }}>{selectedCard.symbol}</div>
                      <div style={{ fontSize: "0.7rem", color: selectedCard.color, letterSpacing: "2px", textTransform: "uppercase" }}>{selectedCard.number}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: "240px" }}>
                      <h2 style={{ margin: "0 0 4px", fontSize: "1.6rem", color: "#e8d8ff" }}>{selectedCard.name}</h2>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(255,255,255,0.08)", borderRadius: "4px", padding: "2px 10px", fontSize: "0.75rem", color: "#a090c0" }}>⚗ {selectedCard.element}</span>
                        <span style={{ background: "rgba(255,255,255,0.08)", borderRadius: "4px", padding: "2px 10px", fontSize: "0.75rem", color: "#a090c0" }}>☿ {selectedCard.planet}</span>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                        {selectedCard.keywords.map(k => (
                          <span key={k} style={{ background: `${selectedCard.color}25`, color: selectedCard.color, borderRadius: "20px", padding: "3px 12px", fontSize: "0.75rem", border: `1px solid ${selectedCard.color}40` }}>{k}</span>
                        ))}
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#7060a0", marginBottom: "6px" }}>⬆ Upright</div>
                        <p style={{ margin: 0, color: "#c8b8e8", lineHeight: 1.6, fontSize: "0.9rem" }}>{selectedCard.upright}</p>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#7060a0", marginBottom: "6px" }}>⬇ Reversed</div>
                        <p style={{ margin: 0, color: "#c8b8e8", lineHeight: 1.6, fontSize: "0.9rem" }}>{selectedCard.reversed}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DAILY CARD */}
        {tab === "daily" && dailyCard && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#9080b0", marginBottom: "24px", fontSize: "0.9rem" }}>Your card for today — draw it in, sit with its energy ✦</p>
            <div onClick={() => setCardFlipped(!cardFlipped)} style={{ cursor: "pointer", display: "inline-block", marginBottom: "24px" }}>
              <div style={{ background: cardFlipped ? `linear-gradient(135deg, ${dailyCard.color}30, rgba(255,255,255,0.05))` : "linear-gradient(135deg, #2a1a4e, #1a2a4e)",
                borderRadius: "20px", padding: "40px 50px", border: `2px solid ${cardFlipped ? dailyCard.color : "#4a3a6e"}`,
                transition: "all 0.4s", boxShadow: cardFlipped ? `0 0 40px ${dailyCard.color}40` : "0 0 20px rgba(0,0,0,0.5)", minWidth: "200px" }}>
                {cardFlipped ? (
                  <>
                    <div style={{ fontSize: "5rem", marginBottom: "12px" }}>{dailyCard.symbol}</div>
                    <div style={{ fontSize: "0.8rem", color: dailyCard.color, letterSpacing: "3px" }}>{dailyCard.number}</div>
                    <h2 style={{ margin: "8px 0", color: "#e8d8ff", fontSize: "1.4rem" }}>{dailyCard.name}</h2>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "3rem", marginBottom: "8px" }}>✦</div>
                    <div style={{ color: "#6050a0", fontSize: "0.85rem" }}>Tap to reveal</div>
                  </>
                )}
              </div>
            </div>
            {cardFlipped && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "24px", border: `1px solid ${dailyCard.color}30`, textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {dailyCard.keywords.map(k => (
                    <span key={k} style={{ background: `${dailyCard.color}25`, color: dailyCard.color, borderRadius: "20px", padding: "3px 12px", fontSize: "0.75rem" }}>{k}</span>
                  ))}
                </div>
                <p style={{ color: "#c8b8e8", lineHeight: 1.7, fontSize: "0.9rem", margin: "0 0 12px" }}><strong style={{ color: dailyCard.color }}>Upright:</strong> {dailyCard.upright}</p>
                <p style={{ color: "#9880b0", lineHeight: 1.7, fontSize: "0.85rem", margin: 0 }}><strong>Reversed:</strong> {dailyCard.reversed}</p>
                <div style={{ marginTop: "16px", padding: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                  <p style={{ margin: 0, color: "#8070a0", fontSize: "0.8rem", fontStyle: "italic" }}>💭 Journal prompt: How does {dailyCard.keywords[0]} show up in your life today?</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {tab === "quiz" && quizCard && (
          <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ marginBottom: "8px", color: "#7060a0", fontSize: "0.85rem" }}>Score: {quizScore.correct}/{quizScore.total}</div>
            <h3 style={{ color: "#9080b0", marginBottom: "24px", fontWeight: 400, fontSize: "0.95rem" }}>Which card matches this description?</h3>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "28px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ color: "#d0c0e8", lineHeight: 1.7, margin: 0, fontSize: "0.95rem" }}><em>"{quizCard.upright}"</em></p>
              <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                {quizCard.keywords.map(k => <span key={k} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "3px 12px", fontSize: "0.75rem", color: "#9080b0" }}>{k}</span>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              {quizOptions.map(opt => {
                let bg = "rgba(255,255,255,0.06)";
                let border = "rgba(255,255,255,0.12)";
                let color = "#c0b0e0";
                if (quizResult) {
                  if (opt.id === quizCard.id) { bg = "rgba(100,200,100,0.15)"; border = "#4CAF50"; color = "#90E090"; }
                  else if (opt.name === quizAnswer && opt.id !== quizCard.id) { bg = "rgba(200,80,80,0.15)"; border = "#E53935"; color = "#E07070"; }
                }
                return (
                  <button key={opt.id} onClick={() => !quizResult && checkQuiz(opt)}
                    style={{ padding: "14px", borderRadius: "10px", border: `1px solid ${border}`, cursor: quizResult ? "default" : "pointer",
                      background: bg, color, fontSize: "0.9rem", fontWeight: 500, transition: "all 0.2s", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{opt.symbol}</span> {opt.name}
                  </button>
                );
              })}
            </div>
            {quizResult && (
              <div>
                <div style={{ marginBottom: "16px", fontSize: "1.1rem", color: quizResult === "correct" ? "#90E090" : "#E07070" }}>
                  {quizResult === "correct" ? "✓ Correct!" : `✗ It was ${quizCard.name}`}
                </div>
                <button onClick={startQuiz} style={{ background: "rgba(180,140,255,0.2)", border: "1px solid rgba(180,140,255,0.4)", color: "#c9b8ff", padding: "10px 28px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
                  Next Card →
                </button>
              </div>
            )}
          </div>
        )}

        {/* MINOR ARCANA TAB */}
        {tab === "suits" && (
          <div>
            <p style={{ color: "#8070a0", marginBottom: "24px", fontSize: "0.9rem" }}>The Minor Arcana has 56 cards across 4 suits. Each suit governs a domain of life.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              {MINOR_SUITS.map(s => (
                <div key={s.suit} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "20px", border: `1px solid ${s.color}40` }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{s.symbol}</div>
                  <h3 style={{ margin: "0 0 4px", color: s.color, fontSize: "1.1rem" }}>{s.suit}</h3>
                  <div style={{ fontSize: "0.75rem", color: "#7060a0", marginBottom: "8px" }}>Element: {s.element}</div>
                  <p style={{ margin: 0, color: "#a090c0", fontSize: "0.8rem" }}>{s.theme}</p>
                </div>
              ))}
            </div>
            <h3 style={{ color: "#c0b0e0", marginBottom: "16px" }}>Number Meanings (apply across all suits)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {MINOR_NUMBERS.map(n => (
                <div key={n.num} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px 18px", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ minWidth: "60px", fontWeight: 700, color: "#b090e0", fontSize: "0.9rem" }}>{n.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#c0b8d0", fontSize: "0.85rem", marginBottom: "4px" }}>↑ {n.upright}</div>
                    <div style={{ color: "#7060a0", fontSize: "0.8rem" }}>↓ {n.reversed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
