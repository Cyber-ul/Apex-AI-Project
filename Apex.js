// ==========================================================
// *** NEW: SELF-HOSTED SENTIMENT DATA (The Fix!) ***
// ==========================================================

const AFINN = {
    "a+": 1, "abandon": -2, "abandoned": -2, "abandons": -2, "abducted": -2, "abduction": -2, "abductions": -2, "abhor": -3, "abhors": -3, "abilities": 2, "ability": 2, "aboard": 1, "absentee": -1, "absentees": -1, "absolve": 2, "absolves": 2, "absolved": 2, "absolving": 2, "abuse": -3, "abused": -3, "abuses": -3, "abuseing": -3, "abusive": -3, 
};

// ==========================================================
// 1. KNOWLEDGE BASE & FUZZY MATCHING SETUP
// NOTE: Ensure you have linked the Fuse.js CDN in your index.html!
// ==========================================================

// Define the AI's robust knowledge base, categorized by intent.
const AI_KNOWLEDGE = [
    // === CHAT INTENTS (Greeting & Friendly chat) ===
    { 
        question: "hello hi hey good morning", 
        keywords: "hello hi hey greeting good morning good afternoon what's up wassup",
        answer: "Hello! I am Apex, the Universal Empathy AI. I can analyze your writing or help solve a problem. How can I assist you today?"
    },
    {
        question: "konnichiwa ogenki desu ka? ohayou ohayou gozaimasu ohayo ",
        keywords: "konnichiwa ogenki desu ka? ohayo ohayou",
        answer: "Konnichiwa! genki desu😉(Hello! I am fine)."
    },
    {
        question: "yoo what is popping yooo yoooo yooooo yoooooo yoooooooo yoooooooooooo yooooooooooooo whazup",
        keywords: "yoo wassup what is popping yooo",
        answer: "I am feeling great and enthusiastic. How can I help you?"
    },
    {
        question: "Okay I want a friendly chat talk to me as if you are talking to someone face to face friendly chat friends ",
        keywords: "friendly chat friends let's talk like in real life support me",
        answer: "Sure that sounds great. Hit me up anytime😊."
    },
    {
        question: "i am fine i am good feeling great",
        keywords: "i am fine good what's popping great feeling good",
        answer: "How can i help you today, ask me anything like a physics question"
    },
    { 
        question: "how are you how is it going", 
        keywords: "how are you how is it going feeling status",
        answer: "As an AI, I am running perfectly! My systems are nominal and ready to assist you. How are you today?"
    },
    {
        question: " i feel sad sad angry in a bad mood i am in a bad mood i feel angry i feel betrayed",
        keywords: "bad mood very sad i feel like crushing someone",
        answer: "I am very sorry to hear that😔, is there anything I can help you with?😊",
    },
    {
        question: "i am doing well great am fine good feeling good very great",
        keywords: "good feeling well enthusiastic well great i guess",
        answer: "That is great to hear. How can I help you today, do you want to talk, share a problem, or just ride with the tide?😎",
    },

    // === CHAT INTENTS (Social & Help support) ===
    {
        question: "I am terribly disappointed with the proposal. I feel like my time was wasted, and i need an answer right now. I think this project should be canceled immediately",
        keywords: "I am terribly dissapointed dissapointed",
        answer: "A **critical/Negative tone** is detected. **Focus:** Rephrase your criticism to focus on solutions, not just problems. Score: **100**. **Observation:** Your text contains many 'I' and 'MY' statements**. **Action:** Apex suggests shifting the focus to the external situation or the other party."
    },
    {
        question: "We appreciate your effort on the report. The data confirms that the next step requires their input to ensure our project goals are met by deadline.",
        keywords: "we appreciate your effort",
        answer: "The tone is **strongly Positive**. **Focus:** Excellent for praise, but ensure your enthusiasm matches the context. Score:+ **100**. **Observation:** Excellent! Your language is highly mindful, balancing your perspective with external facts and others."
    },
    {
        question: "The budget is tight, so maybe we should try to reduce the scope. In my opinion this might be the final plan but it is a start.",
        keywords: "the budget is tight try to reduce the scope",
        answer: "The tone is **Neutral/Balanced**. **Focus:** Good for facts, but could be clearer if high emotion is required. Score **${mindfulnessScore}/100**. **Observation:** Your perspective is balanced. Good work!"
    },
    {
        question: "can you help me with help assistance",
        keywords: "help assist assistance support can you do what can you do for me",
        answer: "Of course! I specialize in two things: **Analyzing your writing** for empathy and clarity, and solving **intermediate academic problems** in math, physics, and chemistry."
    },

    // === NEW: SOCIAL & EMOTIONAL INTENTS ===
    {
        question: "how do you know when a boy loves a girl",
        keywords: "boy loves girl know when someone likes me signs of love crush feelings relationship",
        answer: "💖 Love is complex, but some common signs include: **listening actively** (not just waiting to speak), **making time** for you, and showing genuine interest in your feelings and goals. Look for consistency, not grand gestures."
    },
    {
        question: "how to be more confident",
        keywords: "confident confidence how to be more brave social skills self esteem",
        answer: "💪 To build confidence, start small: Practice **good posture**, make **eye contact** when speaking, and challenge negative thoughts. Confidence is a skill you develop, not a trait you're born with!"
    },
    {
        question: "how to deal with stress",
        keywords: "stress anxious anxiety worried dealing with burnout pressure",
        answer: "🧘 To handle stress, try the **4-7-8 breathing technique** (breathe in for 4, hold for 7, out for 8), get a short walk outside, or talk to a friend. Remember, taking breaks boosts productivity."
    },

    // === APEX SELF-REFERENCE INTENTS (Know Thy Bot) ===
    {
        question: "who are you what is apex identity",
        keywords: "who are you what is apex identity creator purpose",
        answer: "I am Apex 2.0, the Universal Empathy AI. I was built to combine emotional intelligence coaching with raw problem-solving power for your innovation program."
    },
    {
        question: "what is the unique feature of apex",
        keywords: "unique feature special score difference mindfullness",
        answer: "My most unique feature is the **Mindfulness Score**! It goes beyond sentiment to check *who* you focus on in your writing—a true measure of perspective-taking."
    },

    // === ACADEMIC INTENTS (Physics, Math, Chem) ===
    {
        question: "2+2 what is 2+2 2+2 is what 2 + 2",
        keywords: "2+2 what is 2+2 2+2 is what 2 + 2",
        answer: "The answer to this mathematical problem is 4. 2 + 2 = 4."
    },
    {
        question: "What is chemistry chemistry define chemistry what do you understand by chemistry",
        keywords: "What is chemistry chemistry define chemistry what do you understand by chemistry",
        answer: "Chemistry is the pure science which studies the property nature, and composition of matter."
    },
    {
        question: "what is matter define matter what do you understand by matter",
        keywords: "what is matter define matter what do you understand by matter",
        answer: "Matter is any substance that has mass and can occupy space. Also matter is divided into three parts they are: Solid, liquid and gas."
    },
    { 
        question: "formula for speed velocity calculate distance time", 
        keywords: "speed velocity formula calculate distance time",
        answer: "🧠 Problem Solved: The formula for speed is **Speed = Distance / Time**. You can also ask me for the formula for acceleration or density!"
    },
    { 
        question: "what is a quadratic equation define quadratic equation", 
        keywords: "quadratic equation definition form standard form ax^2+bx+c",
        answer: "🧠 Problem Solved: A **Quadratic Equation** is any expression that can be written in the standard form: **ax^2 + bx + c = 0**. The crucial condition is that **a ≠ 0** (otherwise, it would be a linear equation!)."
    },
    { 
        question: "quadratic formula what is the quadratic formula", 
        keywords: "quadratic formula solve for x equation algebra math",
        answer: "🧠 Problem Solved: The **Quadratic Formula** is: **x = [ -b ± sqrt(b² - 4ac) ] / 2a**. This is the method for solving for x when the equation is in the form ax² + bx + c = 0."
    },
    { 
        question: "what is density define density", 
        keywords: "density definition what is it mass volume",
        answer: "🧠 Problem Solved: **Density** is defined as mass divided by volume (Mass/Volume). The standard unit is kg/m³."
    },
];

// FUSE.JS CONFIGURATION for robust, typo-forgiving searching
const fuseOptions = {
    keys: ['question', 'keywords'], 
    threshold: 0.4, // Forgiving threshold for typos
    shouldSort: true 
};

// Initialize Fuse.js (It uses the AI_KNOWLEDGE array)
const fuse = new Fuse(AI_KNOWLEDGE, fuseOptions);


// ==========================================================
// 2. CHAT AI & PROBLEM SOLVER LOGIC
// ==========================================================

// Function to handle the Enter key for the chat input (linked in index.html)
function handleChat(event) {
    if (event.key === 'Enter') {
        processChatInput();
    }
}

function appendMessage(text, className) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('p');
    messageElement.className = className;
    messageElement.innerText = text;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
}

function generateProblemSolverResponse(text) {
    const userText = text.toLowerCase().trim();

    // 1. FUZZY MATCHING SEARCH (Handles typos and rephrasing)
    const results = fuse.search(userText);
    
    if (results.length > 0) {
        // Return the answer from the closest matched Intent
        const bestMatch = results[0].item;
        return bestMatch.answer;
    } 
    
    // 2. CONVERSATIONAL FALLBACKS (Makes the chat feel smarter)
    
    // Fallback 1: If the user asks a complex or unknown factual question
    if (userText.startsWith('what is') || userText.startsWith('who is') || userText.startsWith('how does')) {
        return "That's a fascinating question! I'm still compiling that data. For now, try asking me a focused question about **Physics**, **Math**, or my **Mindfulness Score** feature!";
    }
    
    // Fallback 2: General social responses
    if (userText.includes('thank you') || userText.includes('thanks') || userText.includes('tnx') || userText.includes('arigatou gozaimasu')) {
        return "You're very welcome! I'm happy to assist you, if you need help I am always here😊.";
    }
    // Default Fallback
    return "I am still learning the nuances of that topic, but I'm learning! You can always try the **Empathy Coach** on the left, or ask a question about the core **academic formulas**."
}


function processChatInput() {
    const chatInput = document.getElementById('chat-input');
    const userText = chatInput.value.trim();
    if (userText === '') return;

    // Display user message
    appendMessage(userText, 'user-message');
    chatInput.value = '';

    // Generate AI response
    const aiResponse = generateProblemSolverResponse(userText);
    setTimeout(() => {
        appendMessage(aiResponse, 'ai-message');
    }, 500); // Simulate AI 'thinking' time
}


// ==========================================================
// 3. EMPATHY COACH LOGIC
// ==========================================================

// Calculates the unique "Mindfulness Score" (Focus on Others vs. Self)
function calculateMindfulness(text) {
    const lowerText = text.toLowerCase();
    
    // Count 'Self-Reference' words (I, my, me)
    const selfWords = (lowerText.match(/\bi\b|\bmy\b|\bme\b|\bmyself\b/g) || []).length;
    
    // Count 'External/Other' words (you, they, our, the)
    const otherWords = (lowerText.match(/\bthey\b|\byou\b|\bhe\b|\bshe\b|\bwe\b|\btheir\b|\byour\b|\bour\b|\bthe\b/g) || []).length;
    
    const totalWords = lowerText.split(/\s+/).length;
    
    if (totalWords < 10) return 50; 
    
    // Ratio calculation centered around 50
    const mindfulnessRatio = (otherWords - selfWords) / totalWords;
    return Math.round(Math.max(0, Math.min(100, (mindfulnessRatio + 0.5) * 100)));
}


function generateFeedback(resonanceScore, mindfulnessScore) {
    let feedback = '';

    // 1. Emotional Resonance
    feedback += '<h3>1. Emotional Resonance Report:</h3>';
    if (resonanceScore > 4) {
        feedback += '<p class="positive">The tone is **strongly Positive**. **Focus:** Excellent for praise, but ensure your enthusiasm matches the context.</p>';
    } else if (resonanceScore < -4) {
        feedback += '<p class="negative">A **critical/Negative tone** is detected. **Focus:** Rephrase your criticism to focus on solutions, not just problems.</p>';
    } else {
        feedback += '<p class="neutral">The tone is **Neutral/Balanced**. **Focus:** Good for facts, but could be clearer if high emotion is required.</p>';
    }
    
    // 2. Mindfulness Score (THE UNIQUE FEATURE)
    feedback += '<h3>2. 💡 Mindfulness & Perspective Score:</h3>';
    if (mindfulnessScore > 70) {
        feedback += `<p class="positive">Score **${mindfulnessScore}/100**. **Observation:** Excellent! Your language is highly mindful, balancing your perspective with external facts and others.</p>`;
    } else if (mindfulnessScore < 30) {
        feedback += `<p class="negative">Score **${mindfulnessScore}/100**. **Observation:** Your text contains many **"I" and "my" statements**. **Action:** Apex suggests shifting the focus to the external situation or the other party.</p>`;
    } else {
        feedback += `<p class="neutral">Score **${mindfulnessScore}/100**. **Observation:** Your perspective is balanced. Good work!</p>`;
    }

    // 3. Clarity of Intent (Simulated Subjectivity)
    const textLower = document.getElementById('text-input').value.toLowerCase();
    const subjectiveWords = ['i think', 'i feel', 'maybe', 'possibly', 'believe', 'in my opinion', 'kinda'];
    let subjectiveWordCount = 0;
    subjectiveWords.forEach(word => {
        if (textLower.includes(word)) { subjectiveWordCount++; }
    });
    const simulatedClarity = Math.max(0, 5 - subjectiveWordCount) / 5;
    const clarityScore = simulatedClarity.toFixed(3);

    feedback += '<h3>3. Clarity of Intent Report:</h3>';
    if (clarityScore > 0.6) {
        feedback += `<p class="positive">Clarity Score **${clarityScore}**. **Observation:** Highly Objective/Clear. Your message is unambiguous.</p>`;
    } else {
        feedback += `<p class="neutral">Clarity Score **${clarityScore}**. **Observation:** Contains subjective elements. **Action:** Apex recommends using more facts and fewer opinion phrases to boost clarity.</p>`;
    }
    
    return { feedback, clarityScore };
}


function runApexAnalysis() {
    const text = document.getElementById('text-input').value;
    const resultsArea = document.getElementById('results-area');

    if (text.length === 0) {
        alert("Please enter text for Apex to analyze.");
        return;
    }

    // --- Core Calculations ---
    const analyzer = new Sentiment();
    const result = analyzer.analyze(text);
    const resonanceScore = result.score;
    const mindfulnessScore = calculateMindfulness(text);
    
    // --- Generate Feedback & Clarity Score ---
    const { feedback, clarityScore } = generateFeedback(resonanceScore, mindfulnessScore);

    // --- Display Outputs ---
    document.getElementById('resonance-output').innerHTML = 
        `<div class="score-label">Emotional Resonance Score</div><span>${resonanceScore}</span> (Sentiment)`;
        
    document.getElementById('clarity-output').innerHTML = 
        `<div class="score-label">Clarity of Intent Score</div><span>${clarityScore}</span> (0.0=Subjective, 1.0=Objective)`;

    // Display the SECRET FEATURE Score
    document.getElementById('unique-feature-output').innerHTML = 
        `<div class="score-label">Mindfulness Score</div><span>${mindfulnessScore}/100</span> (Perspective Focus)`;
        
    document.getElementById('feedback-output').innerHTML = feedback;
    
    // Make the results visible
    resultsArea.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialization check
    console.log("Apex 2.0 JavaScript Loaded successfully.");
});