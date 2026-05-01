import { useState, useEffect, useMemo } from "react";

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
  { suit: "Wands", element: "Fire", theme: "Passion, creativity, ambition", color: "#c8691a", symbol: "🔥" },
  { suit: "Cups", element: "Water", theme: "Emotions, relationships, intuition", color: "#2a6ea6", symbol: "🌊" },
  { suit: "Swords", element: "Air", theme: "Intellect, conflict, truth", color: "#7a8fa0", symbol: "💨" },
  { suit: "Pentacles", element: "Earth", theme: "Material, work, finances", color: "#3a7a3a", symbol: "🌿" },
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

const ALL_MINOR_ARCANA = MINOR_SUITS.flatMap(suit =>
  MINOR_NUMBERS.map(n => ({
    id: `${suit.suit}-${n.num}`,
    name: `${n.num} of ${suit.suit}`,
    suit: suit.suit,
    element: suit.element,
    theme: suit.theme,
    color: suit.color,
    symbol: suit.symbol,
    num: n.num,
    upright: n.upright,
    reversed: n.reversed,
    type: "minor",
  }))
);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const G = {
  bg: "linear-gradient(160deg, #080810 0%, #0d0619 55%, #080e1a 100%)",
  surface: "rgba(200,168,75,0.04)",
  surfaceHover: "rgba(200,168,75,0.08)",
  surfaceActive: "rgba(200,168,75,0.12)",
  border: "rgba(200,168,75,0.14)",
  borderHover: "rgba(200,168,75,0.28)",
  borderAccent: "rgba(200,168,75,0.5)",
  text: "#d8ccbc",
  textMuted: "#635870",
  textDim: "#3a3040",
  gold: "#c8a84b",
  goldBright: "#e0c070",
  goldDim: "#6a5828",
  crimson: "#8b1c1c",
  crimsonLight: "#c05050",
  heading: "'Cinzel', 'Palatino Linotype', 'Book Antiqua', serif",
  body: "'Crimson Text', 'Georgia', 'Times New Roman', serif",
};

function Ornament() {
  return (
    <div style={{ textAlign: "center", color: G.goldDim, fontSize: "0.65rem", letterSpacing: "0.5em", margin: "4px 0", userSelect: "none" }}>
      ✦ ─── ✦
    </div>
  );
}

function CardDetail({ card, onBack }) {
  const isMajor = card.type !== "minor";
  return (
    <div>
      <button onClick={onBack}
        style={{ background: "transparent", border: `1px solid ${G.border}`, color: G.textMuted, padding: "7px 16px", borderRadius: "2px", cursor: "pointer", marginBottom: "24px", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.color = G.gold; e.currentTarget.style.borderColor = G.borderAccent; }}
        onMouseLeave={e => { e.currentTarget.style.color = G.textMuted; e.currentTarget.style.borderColor = G.border; }}>
        ← Return
      </button>
      <div style={{ background: G.surface, borderRadius: "4px", padding: "32px", border: `1px solid ${card.color}35`, boxShadow: `0 0 60px ${card.color}08, inset 0 0 80px rgba(0,0,0,0.3)` }}>
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center", minWidth: "90px" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "12px", filter: "drop-shadow(0 0 12px rgba(200,168,75,0.25))" }}>{card.symbol}</div>
            {isMajor
              ? <div style={{ fontSize: "0.6rem", fontFamily: G.heading, color: G.gold, letterSpacing: "0.18em" }}>{card.number}</div>
              : <div style={{ fontSize: "0.58rem", fontFamily: G.heading, color: card.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{card.suit}</div>
            }
          </div>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <h2 style={{ margin: "0 0 8px", fontFamily: G.heading, fontSize: "1.45rem", fontWeight: 700, color: G.goldBright, letterSpacing: "0.06em" }}>{card.name}</h2>
            <div style={{ display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`, borderRadius: "2px", padding: "2px 10px", fontSize: "0.7rem", fontFamily: G.heading, letterSpacing: "0.07em", color: G.textMuted }}>
                {card.element}
              </span>
              {isMajor
                ? <span style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`, borderRadius: "2px", padding: "2px 10px", fontSize: "0.7rem", fontFamily: G.heading, letterSpacing: "0.07em", color: G.textMuted }}>{card.planet}</span>
                : <span style={{ background: `${card.color}10`, border: `1px solid ${card.color}30`, borderRadius: "2px", padding: "2px 10px", fontSize: "0.7rem", fontFamily: G.heading, letterSpacing: "0.07em", color: card.color }}>{card.theme}</span>
              }
            </div>
            {isMajor && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
                {card.keywords.map(k => (
                  <span key={k} style={{ background: `${card.color}14`, color: card.color, borderRadius: "2px", padding: "3px 12px", fontSize: "0.72rem", fontFamily: G.heading, letterSpacing: "0.05em", border: `1px solid ${card.color}28` }}>{k}</span>
                ))}
              </div>
            )}
            <Ornament />
            <div style={{ margin: "18px 0" }}>
              <div style={{ fontSize: "0.58rem", fontFamily: G.heading, textTransform: "uppercase", letterSpacing: "0.18em", color: G.gold, marginBottom: "9px" }}>✦ Upright</div>
              <p style={{ margin: 0, color: G.text, lineHeight: 1.8, fontSize: "1rem", fontFamily: G.body }}>{card.upright}</p>
            </div>
            <Ornament />
            <div style={{ marginTop: "18px" }}>
              <div style={{ fontSize: "0.58rem", fontFamily: G.heading, textTransform: "uppercase", letterSpacing: "0.18em", color: G.crimsonLight, marginBottom: "9px" }}>✦ Reversed</div>
              <p style={{ margin: 0, color: "#a09090", lineHeight: 1.8, fontSize: "1rem", fontFamily: G.body }}>{card.reversed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyCard({ card, flipped, onFlip }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: G.textMuted, marginBottom: "28px", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Draw thy card — sit with its counsel
      </p>
      <div onClick={onFlip} style={{ cursor: "pointer", display: "inline-block", marginBottom: "28px" }}>
        <div style={{
          background: flipped ? `linear-gradient(145deg, ${card.color}14, rgba(200,168,75,0.05))` : "linear-gradient(145deg, #100820, #0a1020)",
          borderRadius: "6px", padding: "44px 56px",
          border: flipped ? `1px solid ${card.color}45` : `1px solid ${G.border}`,
          transition: "all 0.5s", minWidth: "210px",
          boxShadow: flipped ? `0 0 60px ${card.color}20, 0 0 120px ${card.color}08` : `0 0 40px rgba(0,0,0,0.8), inset 0 0 50px rgba(200,168,75,0.02)`,
        }}>
          {flipped ? (
            <>
              <div style={{ fontSize: "4.5rem", marginBottom: "14px", filter: `drop-shadow(0 0 18px ${card.color}50)` }}>{card.symbol}</div>
              <div style={{ fontSize: "0.62rem", fontFamily: G.heading, color: G.gold, letterSpacing: "0.22em", marginBottom: "8px" }}>{card.number}</div>
              <h2 style={{ margin: 0, fontFamily: G.heading, color: G.goldBright, fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.08em" }}>{card.name}</h2>
            </>
          ) : (
            <>
              <div style={{ fontSize: "2.5rem", marginBottom: "10px", color: G.goldDim }}>✦</div>
              <div style={{ fontFamily: G.heading, color: G.textDim, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Reveal</div>
            </>
          )}
        </div>
      </div>
      {flipped && (
        <div style={{ background: G.surface, borderRadius: "4px", padding: "26px", border: `1px solid ${card.color}28`, textAlign: "left", maxWidth: "520px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
            {card.keywords.map(k => (
              <span key={k} style={{ background: `${card.color}14`, color: card.color, borderRadius: "2px", padding: "3px 12px", fontSize: "0.72rem", fontFamily: G.heading, letterSpacing: "0.05em" }}>{k}</span>
            ))}
          </div>
          <p style={{ color: G.text, lineHeight: 1.8, fontSize: "1rem", fontFamily: G.body, margin: "0 0 12px" }}>
            <strong style={{ color: G.gold, fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Upright · </strong>
            {card.upright}
          </p>
          <p style={{ color: "#908090", lineHeight: 1.8, fontSize: "0.92rem", fontFamily: G.body, margin: "0 0 18px" }}>
            <strong style={{ color: G.crimsonLight, fontFamily: G.heading, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Reversed · </strong>
            {card.reversed}
          </p>
          <Ornament />
          <p style={{ margin: "14px 0 0", color: G.textMuted, fontSize: "0.88rem", fontFamily: G.body, fontStyle: "italic" }}>
            Journal: How does <em>{card.keywords[0]}</em> manifest in your life today?
          </p>
        </div>
      )}
    </div>
  );
}

function MajorQuiz({ card, options, result, score, remaining, onAnswer, onNext }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "0.6rem", fontFamily: G.heading, letterSpacing: "0.12em", color: G.textMuted, textTransform: "uppercase" }}>
        <span>Score: {score.correct}/{score.total}</span>
        <span>{remaining} remaining in cycle</span>
      </div>
      <p style={{ color: G.textMuted, marginBottom: "18px", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Which card bears this meaning?
      </p>
      <div style={{ background: G.surface, borderRadius: "4px", padding: "28px", marginBottom: "22px", border: `1px solid ${G.border}`, boxShadow: "inset 0 0 50px rgba(0,0,0,0.3)" }}>
        <p style={{ color: G.text, lineHeight: 1.8, margin: "0 0 18px", fontSize: "1.05rem", fontFamily: G.body, fontStyle: "italic" }}>"{card.upright}"</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          {card.keywords.map(k => (
            <span key={k} style={{ background: "rgba(200,168,75,0.07)", borderRadius: "2px", padding: "2px 12px", fontSize: "0.68rem", fontFamily: G.heading, letterSpacing: "0.07em", color: G.goldDim }}>{k}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
        {options.map(opt => {
          let bg = G.surface, border = G.border, color = G.text;
          if (result) {
            if (opt.id === card.id) { bg = "rgba(50,110,50,0.2)"; border = "#4a8a4a"; color = "#90c890"; }
          }
          return (
            <button key={opt.id} onClick={() => !result && onAnswer(opt)}
              style={{ padding: "13px 12px", borderRadius: "3px", border: `1px solid ${border}`, cursor: result ? "default" : "pointer", background: bg, color, fontFamily: G.heading, fontSize: "0.72rem", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={e => { if (!result) { e.currentTarget.style.borderColor = G.borderAccent; e.currentTarget.style.background = G.surfaceHover; } }}
              onMouseLeave={e => { if (!result) { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.background = G.surface; } }}>
              <span style={{ fontSize: "1.3rem" }}>{opt.symbol}</span>
              <span>{opt.name}</span>
            </button>
          );
        })}
      </div>
      {result && (
        <div>
          <div style={{ marginBottom: "18px", fontFamily: G.heading, fontSize: "0.82rem", letterSpacing: "0.07em", color: result === "correct" ? "#80c880" : G.crimsonLight }}>
            {result === "correct" ? "✦ Correct" : `✦ The answer was ${card.name}`}
          </div>
          <button onClick={onNext}
            style={{ background: G.surfaceActive, border: `1px solid ${G.borderAccent}`, color: G.gold, padding: "10px 32px", borderRadius: "2px", cursor: "pointer", fontFamily: G.heading, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Next Card →
          </button>
        </div>
      )}
    </div>
  );
}

function MinorQuiz({ card, options, result, score, remaining, onAnswer, onNext }) {
  const suit = MINOR_SUITS.find(s => s.suit === card.suit);
  const correctNum = options.find(o => o.num === card.num);
  return (
    <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "0.6rem", fontFamily: G.heading, letterSpacing: "0.12em", color: G.textMuted, textTransform: "uppercase" }}>
        <span>Score: {score.correct}/{score.total}</span>
        <span>{remaining} remaining in cycle</span>
      </div>
      <p style={{ color: G.textMuted, marginBottom: "18px", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        What is this card's upright meaning?
      </p>
      <div style={{ background: G.surface, borderRadius: "4px", padding: "28px", marginBottom: "22px", border: `1px solid ${suit.color}35`, boxShadow: "inset 0 0 50px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{suit.symbol}</div>
        <h3 style={{ margin: "0 0 8px", fontFamily: G.heading, fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.08em", color: suit.color }}>{card.name}</h3>
        <div style={{ fontSize: "0.65rem", fontFamily: G.heading, letterSpacing: "0.1em", color: G.textMuted, textTransform: "uppercase" }}>
          {suit.element} · {suit.theme}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "20px" }}>
        {options.map(opt => {
          let bg = G.surface, border = G.border, color = G.text;
          if (result) {
            if (opt.num === card.num) { bg = "rgba(50,110,50,0.2)"; border = "#4a8a4a"; color = "#90c890"; }
          }
          return (
            <button key={opt.num} onClick={() => !result && onAnswer(opt)}
              style={{ padding: "13px 18px", borderRadius: "3px", border: `1px solid ${border}`, cursor: result ? "default" : "pointer", background: bg, color, fontFamily: G.body, fontSize: "0.95rem", textAlign: "left", transition: "all 0.15s", lineHeight: 1.5, display: "flex", gap: "12px", alignItems: "baseline" }}
              onMouseEnter={e => { if (!result) { e.currentTarget.style.borderColor = G.borderAccent; e.currentTarget.style.background = G.surfaceHover; } }}
              onMouseLeave={e => { if (!result) { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.background = G.surface; } }}>
              <span style={{ fontFamily: G.heading, fontSize: "0.6rem", letterSpacing: "0.1em", color: result ? "inherit" : G.goldDim, textTransform: "uppercase", flexShrink: 0, minWidth: "44px" }}>{opt.num}</span>
              <span>{opt.upright}</span>
            </button>
          );
        })}
      </div>
      {result && (
        <div>
          <div style={{ marginBottom: "18px", fontFamily: G.heading, fontSize: "0.82rem", letterSpacing: "0.07em", color: result === "correct" ? "#80c880" : G.crimsonLight }}>
            {result === "correct" ? "✦ Correct" : `✦ The ${card.num} means: ${correctNum?.upright}`}
          </div>
          <button onClick={onNext}
            style={{ background: G.surfaceActive, border: `1px solid ${G.borderAccent}`, color: G.gold, padding: "10px 32px", borderRadius: "2px", cursor: "pointer", fontFamily: G.heading, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Next Card →
          </button>
        </div>
      )}
    </div>
  );
}

export default function TarotGuide() {
  const [tab, setTab] = useState("browse");
  const [selectedCard, setSelectedCard] = useState(null);
  const [elementFilter, setElementFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [majorQueue, setMajorQueue] = useState([]);
  const [majorCard, setMajorCard] = useState(null);
  const [majorOptions, setMajorOptions] = useState([]);
  const [majorResult, setMajorResult] = useState(null);
  const [majorScore, setMajorScore] = useState({ correct: 0, total: 0 });

  const [minorQueue, setMinorQueue] = useState([]);
  const [minorCard, setMinorCard] = useState(null);
  const [minorOptions, setMinorOptions] = useState([]);
  const [minorResult, setMinorResult] = useState(null);
  const [minorScore, setMinorScore] = useState({ correct: 0, total: 0 });

  const [quizMode, setQuizMode] = useState("major");
  const [cardFlipped, setCardFlipped] = useState(false);
  const [dailyCard, setDailyCard] = useState(null);
  const [studiedCards, setStudiedCards] = useState(new Set());

  useEffect(() => {
    const idx = Math.floor(Date.now() / 86400000) % MAJOR_ARCANA.length;
    setDailyCard(MAJOR_ARCANA[idx]);
  }, []);

  const startMajorQuiz = (overrideQueue) => {
    const q = overrideQueue ?? majorQueue;
    const pool = q.length > 0 ? q : shuffle(MAJOR_ARCANA);
    const [card, ...rest] = pool;
    setMajorQueue(rest);
    setMajorCard(card);
    setMajorResult(null);
    setCardFlipped(false);
    const others = shuffle(MAJOR_ARCANA.filter(c => c.id !== card.id)).slice(0, 3);
    setMajorOptions(shuffle([...others, card]));
  };

  const checkMajor = (chosen) => {
    const correct = chosen.id === majorCard.id;
    setMajorResult(correct ? "correct" : "wrong");
    setMajorScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (correct) setStudiedCards(s => new Set([...s, majorCard.id]));
  };

  const startMinorQuiz = (overrideQueue) => {
    const q = overrideQueue ?? minorQueue;
    const pool = q.length > 0 ? q : shuffle(ALL_MINOR_ARCANA);
    const [card, ...rest] = pool;
    setMinorQueue(rest);
    setMinorCard(card);
    setMinorResult(null);
    const correct = MINOR_NUMBERS.find(n => n.num === card.num);
    const others = shuffle(MINOR_NUMBERS.filter(n => n.num !== card.num)).slice(0, 3);
    setMinorOptions(shuffle([correct, ...others]));
  };

  const checkMinor = (chosen) => {
    const correct = chosen.num === minorCard.num;
    setMinorResult(correct ? "correct" : "wrong");
    setMinorScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
  };

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    const major = MAJOR_ARCANA
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.keywords.some(k => k.toLowerCase().includes(q)) ||
        c.upright.toLowerCase().includes(q) ||
        c.element.toLowerCase().includes(q)
      )
      .map(c => ({ ...c, type: "major" }));
    const minor = ALL_MINOR_ARCANA.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.suit.toLowerCase().includes(q) ||
      c.element.toLowerCase().includes(q) ||
      c.num.toLowerCase().includes(q) ||
      c.upright.toLowerCase().includes(q)
    );
    return [...major, ...minor].slice(0, 24);
  }, [search]);

  const browsedCards = useMemo(() =>
    elementFilter === "all" ? MAJOR_ARCANA : MAJOR_ARCANA.filter(c => c.element === elementFilter),
    [elementFilter]
  );

  const handleTabChange = (t) => {
    setTab(t);
    if (t === "quiz") {
      if (quizMode === "major" && !majorCard) startMajorQuiz([]);
      if (quizMode === "minor" && !minorCard) startMinorQuiz([]);
    }
  };

  return (
    <div style={{ fontFamily: G.body, background: G.bg, minHeight: "100vh", color: G.text, fontSize: "1rem", lineHeight: 1.6 }}>

      <header style={{ borderBottom: `1px solid ${G.border}`, padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: G.heading, fontSize: "1.3rem", fontWeight: 700, letterSpacing: "0.16em", color: G.gold, textTransform: "uppercase" }}>
            ✦ Arcana Codex
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.6rem", fontFamily: G.heading, color: G.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {studiedCards.size} of {MAJOR_ARCANA.length} major arcana studied
          </p>
        </div>
        <div style={{ fontSize: "0.58rem", fontFamily: G.heading, letterSpacing: "0.1em", color: G.goldDim, textAlign: "right", textTransform: "uppercase", lineHeight: 1.8 }}>
          <div>Major {majorScore.correct}/{majorScore.total}</div>
          <div>Minor {minorScore.correct}/{minorScore.total}</div>
        </div>
      </header>

      <nav style={{ display: "flex", padding: "0 32px", borderBottom: `1px solid ${G.border}`, background: "rgba(0,0,0,0.25)" }}>
        {[
          { id: "browse", label: "Browse" },
          { id: "daily", label: "Daily" },
          { id: "quiz", label: "Quiz" },
          { id: "suits", label: "Minor Arcana" },
        ].map(t => (
          <button key={t.id} onClick={() => handleTabChange(t.id)}
            style={{ padding: "13px 20px", border: "none", cursor: "pointer", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, background: "transparent", transition: "color 0.2s",
              color: tab === t.id ? G.gold : G.textMuted,
              borderBottom: tab === t.id ? `2px solid ${G.gold}` : "2px solid transparent",
              marginBottom: "-1px" }}>
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: "28px 32px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>

        {/* ── BROWSE ── */}
        {tab === "browse" && (
          <div>
            <div style={{ marginBottom: "22px", position: "relative" }}>
              <input value={search}
                onChange={e => { setSearch(e.target.value); setSelectedCard(null); }}
                placeholder="Search by name, keyword, suit, or element…"
                style={{ width: "100%", padding: "11px 40px 11px 42px", background: G.surface, border: `1px solid ${G.border}`, borderRadius: "3px", color: G.text, fontFamily: G.body, fontSize: "1rem", outline: "none", caretColor: G.gold, transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = G.borderAccent}
                onBlur={e => e.target.style.borderColor = G.border}
              />
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: G.goldDim, fontSize: "1.1rem", pointerEvents: "none" }}>⚲</span>
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: G.textMuted, cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0 }}>✕</button>
              )}
            </div>

            {selectedCard ? (
              <CardDetail card={selectedCard} onBack={() => setSelectedCard(null)} />
            ) : searchResults ? (
              searchResults.length === 0 ? (
                <p style={{ color: G.textMuted, fontStyle: "italic", textAlign: "center", padding: "48px 0", fontFamily: G.body }}>No cards found for "{search}"</p>
              ) : (
                <div>
                  <p style={{ color: G.textMuted, fontSize: "0.6rem", fontFamily: G.heading, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px" }}>
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {searchResults.map(card => (
                      <div key={card.id} onClick={() => setSelectedCard(card)}
                        style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: "3px", padding: "12px 18px", cursor: "pointer", display: "flex", gap: "14px", alignItems: "center", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = G.surfaceHover; e.currentTarget.style.borderColor = G.borderHover; }}
                        onMouseLeave={e => { e.currentTarget.style.background = G.surface; e.currentTarget.style.borderColor = G.border; }}>
                        <span style={{ fontSize: "1.5rem", minWidth: "30px", textAlign: "center" }}>{card.symbol}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: G.heading, fontSize: "0.78rem", letterSpacing: "0.07em", color: card.type === "minor" ? card.color : G.gold }}>{card.name}</div>
                          <div style={{ fontSize: "0.83rem", color: G.textMuted, marginTop: "2px", fontFamily: G.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {card.type === "minor" ? `${card.suit} · ${card.element}` : card.element} — {card.upright.split(",")[0]}
                          </div>
                        </div>
                        <span style={{ fontSize: "0.55rem", fontFamily: G.heading, letterSpacing: "0.12em", color: G.textDim, textTransform: "uppercase", flexShrink: 0 }}>{card.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                  {[["all", "All"], ["Fire", "🔥 Fire"], ["Water", "💧 Water"], ["Air", "💨 Air"], ["Earth", "🌱 Earth"]].map(([val, label]) => (
                    <button key={val} onClick={() => setElementFilter(val)}
                      style={{ padding: "5px 16px", borderRadius: "2px", border: `1px solid ${elementFilter === val ? G.borderAccent : G.border}`, cursor: "pointer", fontFamily: G.heading, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", background: elementFilter === val ? G.surfaceActive : "transparent", color: elementFilter === val ? G.gold : G.textMuted, transition: "all 0.15s" }}>
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))", gap: "10px" }}>
                  {browsedCards.map(card => (
                    <div key={card.id}
                      onClick={() => { setSelectedCard(card); setStudiedCards(s => new Set([...s, card.id])); }}
                      style={{ background: G.surface, borderRadius: "3px", padding: "18px 10px 14px", cursor: "pointer", textAlign: "center", border: `1px solid ${studiedCards.has(card.id) ? card.color + "40" : G.border}`, boxShadow: studiedCards.has(card.id) ? `0 0 18px ${card.color}14` : "none", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = G.borderAccent; e.currentTarget.style.background = G.surfaceHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = studiedCards.has(card.id) ? card.color + "40" : G.border; e.currentTarget.style.background = G.surface; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{card.symbol}</div>
                      <div style={{ fontSize: "0.52rem", fontFamily: G.heading, letterSpacing: "0.16em", color: G.goldDim, marginBottom: "5px" }}>{card.number}</div>
                      <div style={{ fontSize: "0.72rem", fontFamily: G.heading, letterSpacing: "0.04em", color: studiedCards.has(card.id) ? G.gold : G.text }}>{card.name}</div>
                      {studiedCards.has(card.id) && <div style={{ fontSize: "0.48rem", color: G.goldDim, marginTop: "6px", letterSpacing: "0.14em", fontFamily: G.heading, textTransform: "uppercase" }}>Studied</div>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── DAILY ── */}
        {tab === "daily" && dailyCard && (
          <DailyCard card={dailyCard} flipped={cardFlipped} onFlip={() => setCardFlipped(f => !f)} />
        )}

        {/* ── QUIZ ── */}
        {tab === "quiz" && (
          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "32px", justifyContent: "center" }}>
              {[["major", "Major Arcana"], ["minor", "Minor Arcana"]].map(([mode, label]) => (
                <button key={mode}
                  onClick={() => {
                    setQuizMode(mode);
                    if (mode === "major" && !majorCard) startMajorQuiz([]);
                    if (mode === "minor" && !minorCard) startMinorQuiz([]);
                  }}
                  style={{ padding: "8px 26px", border: `1px solid ${quizMode === mode ? G.borderAccent : G.border}`, borderRadius: "2px", cursor: "pointer", fontFamily: G.heading, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, background: quizMode === mode ? G.surfaceActive : "transparent", color: quizMode === mode ? G.gold : G.textMuted, transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>
            {quizMode === "major" && majorCard && (
              <MajorQuiz card={majorCard} options={majorOptions} result={majorResult} score={majorScore} remaining={majorQueue.length} onAnswer={checkMajor} onNext={() => startMajorQuiz(undefined)} />
            )}
            {quizMode === "minor" && minorCard && (
              <MinorQuiz card={minorCard} options={minorOptions} result={minorResult} score={minorScore} remaining={minorQueue.length} onAnswer={checkMinor} onNext={() => startMinorQuiz(undefined)} />
            )}
          </div>
        )}

        {/* ── MINOR ARCANA REFERENCE ── */}
        {tab === "suits" && (
          <div>
            <p style={{ color: G.textMuted, marginBottom: "28px", fontFamily: G.body, fontSize: "1rem", fontStyle: "italic" }}>
              56 cards across four suits — each suit governs a domain of mortal experience.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", marginBottom: "36px" }}>
              {MINOR_SUITS.map(s => (
                <div key={s.suit} style={{ background: G.surface, borderRadius: "4px", padding: "22px", border: `1px solid ${s.color}30`, boxShadow: `0 0 24px ${s.color}06` }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{s.symbol}</div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: G.heading, color: s.color, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.suit}</h3>
                  <div style={{ fontSize: "0.6rem", fontFamily: G.heading, color: G.goldDim, marginBottom: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.element}</div>
                  <p style={{ margin: 0, color: G.textMuted, fontSize: "0.9rem", fontFamily: G.body, fontStyle: "italic" }}>{s.theme}</p>
                </div>
              ))}
            </div>
            <Ornament />
            <h3 style={{ fontFamily: G.heading, color: G.gold, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", margin: "28px 0 16px" }}>
              Number Meanings — Universal Across All Suits
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {MINOR_NUMBERS.map(n => (
                <div key={n.num} style={{ background: G.surface, borderRadius: "3px", padding: "13px 18px", border: `1px solid ${G.border}`, display: "flex", gap: "18px", alignItems: "flex-start" }}>
                  <div style={{ minWidth: "62px", fontFamily: G.heading, fontWeight: 700, color: G.gold, fontSize: "0.78rem", letterSpacing: "0.07em", paddingTop: "1px" }}>{n.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: G.text, fontSize: "0.9rem", fontFamily: G.body, marginBottom: "3px" }}>↑ {n.upright}</div>
                    <div style={{ color: G.textMuted, fontSize: "0.83rem", fontFamily: G.body, fontStyle: "italic" }}>↓ {n.reversed}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
