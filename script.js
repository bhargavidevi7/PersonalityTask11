const options = [
  { label: "Strongly Disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly Agree", value: 2 }
];

const questions = [
  { text: "You enjoy vibrant social events with lots of people.", type: "E" },
  { text: "You often prefer staying in rather than going out.", type: "I" },
  { text: "You focus on the present more than the future.", type: "S" },
  { text: "You are more interested in abstract ideas than facts.", type: "N" },
  { text: "You value logical reasoning over emotions.", type: "T" },
  { text: "You make decisions based on how it affects people.", type: "F" },
  { text: "You like to have a plan rather than being spontaneous.", type: "J" },
  { text: "You prefer flexibility to strict schedules.", type: "P" }
];

const form = document.getElementById("quizForm");

questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <p><strong>${i + 1}.</strong> ${q.text}</p>
    <select name="q${i}" required>
      <option value="">-- Select an answer --</option>
      ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
    </select>
  `;
  form.appendChild(div);
});

const personalityProfiles = {
  INTJ: {
    strengths: "Strategic, independent, analytical",
    weaknesses: "Overly critical, perfectionist",
    careers: "Scientist, Engineer, Architect, Analyst",
    growth: "Work on emotional expression and flexibility."
  },
  ENFP: {
    strengths: "Creative, sociable, enthusiastic",
    weaknesses: "Easily distracted, overthinker",
    careers: "Journalist, Teacher, Designer, Psychologist",
    growth: "Develop consistency and organization."
  },
  ISTJ: {
    strengths: "Responsible, dependable, detail-oriented",
    weaknesses: "Rigid, too focused on rules",
    careers: "Accountant, Police Officer, Judge",
    growth: "Be more open to new ideas and changes."
  },
  ESFP: {
    strengths: "Energetic, friendly, fun-loving",
    weaknesses: "Impulsive, easily bored",
    careers: "Performer, Sales Rep, Event Planner",
    growth: "Work on long-term focus and listening."
  }
};

function calculateResult() {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  questions.forEach((q, i) => {
    const val = parseInt(document.querySelector(`[name="q${i}"]`).value);
    scores[q.type] += val;
  });

  const resultType =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  function percent(trait) {
    const pos = Math.max(0, scores[trait]);
    const neg = Math.abs(scores[getOpposite(trait)]);
    const total = pos + neg || 1;
    return Math.round((pos / total) * 100);
  }

  function getOpposite(trait) {
    return { E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J" }[trait];
  }

  showResult(resultType, percent);
}

function showResult(type, percentFn) {
  const data = personalityProfiles[type] || {
    strengths: "Unique and adaptable",
    weaknesses: "Needs clarity or balance",
    careers: "Various fields depending on strength",
    growth: "Focus on understanding self and structure"
  };

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";

  resultDiv.innerHTML = `
    <div class="result-title">Your Personality Type: <b>${type}</b></div>
    <div class="result-section">
      <h4>🔢 Trait Percentages:</h4>
      <p class="trait-percent">Introvert: ${percentFn("I")}% | Extrovert: ${percentFn("E")}%</p>
      <p class="trait-percent">Sensing: ${percentFn("S")}% | Intuition: ${percentFn("N")}%</p>
      <p class="trait-percent">Thinking: ${percentFn("T")}% | Feeling: ${percentFn("F")}%</p>
      <p class="trait-percent">Judging: ${percentFn("J")}% | Perceiving: ${percentFn("P")}%</p>
    </div>
    <div class="result-section">
      <h4>💪 Strengths:</h4>
      <p>${data.strengths}</p>
    </div>
    <div class="result-section">
      <h4>⚠️ Weaknesses:</h4>
      <p>${data.weaknesses}</p>
    </div>
    <div class="result-section">
      <h4>💼 Suitable Careers:</h4>
      <p>${data.careers}</p>
    </div>
    <div class="result-section">
      <h4>📈 Growth Tips:</h4>
      <p>${data.growth}</p>
    </div>
  `;
  resultDiv.scrollIntoView({ behavior: "smooth" });
}
