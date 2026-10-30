  "use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_TEXT =
  "বাংলা আমার মাতৃভাষা। আমরা বাংলায় কথা বলি, বাংলায় গান গাই এবং বাংলায় স্বপ্ন দেখি। প্রতিদিন কিছুক্ষণ অনুশীলন করলে টাইপিং গতি ও নির্ভুলতা দুটোই বাড়ে। ধৈর্য ধরে নিয়মিত চর্চা করুন, সফলতা আসবেই।";

const ENGLISH_JAPAN_VISIT_TEXT = `Bangladesh is a country in South Asia. It is home to many people, rivers, farms, and busy cities. In October 2026, Prime Minister Tarique Rahman made a visit to Japan. The recent visit was an important moment for Bangladesh and Japan. It gave leaders and business people a chance to meet, share ideas, and talk about the future.

Japan is an island country in East Asia. It is known for its careful planning, modern trains, strong schools, and advanced technology. Bangladesh is known for its hard-working people, rich culture, and growing economy. The two countries have different histories and ways of life, but they can still learn from one another. Friendly ties can bring new chances for people in both countries.

During the visit, leaders from Bangladesh and Japan held talks. They discussed ways to build a stronger relationship. Business leaders also met at an economic forum. They talked about trade, investment, jobs, and useful technology. These discussions do not mean that every plan is ready or every promise has been made. They are a first step toward learning what both sides need and how they may work together.

Bangladesh wants to improve roads, ports, power, education, and public services. Japanese companies have experience in many of these areas. If the two countries make good plans, new projects may help people and businesses. Investment can support factories, create jobs, and help workers learn new skills. Projects should be fair, safe, and helpful for local communities.

Education and training can also connect the two countries. Young people in Bangladesh can learn about science, engineering, computers, and business. Japanese experts and Bangladeshi workers can share knowledge. Students can learn about each other's language and culture. This kind of exchange can build trust. It can also help young people prepare for work in a changing world.

The visit was not only about trade and money. It was also about respect and friendship. Bangladesh and Japan have worked together for many years. People from both countries can enjoy each other's food, music, art, and traditions. When leaders meet, they can support these links and encourage more people to visit, study, and work together.

After a visit, the most important work happens at home. Officials must follow up on the ideas from the meetings. They need to study plans, share information, and agree on clear steps. Businesses must decide whether a project is useful and affordable. People should be able to understand how new projects may affect their lives. Good cooperation takes time, patience, and honest communication.

Tarique Rahman's visit to Japan showed the value of meeting face to face. It created space for discussion and gave both sides a chance to consider future cooperation. The results will depend on the work that follows. If Bangladesh and Japan keep talking and make practical plans, their partnership may grow stronger. Such a partnership can support jobs, learning, and development. Most of all, it can bring people closer and help both countries build a better future together.`;

const PRESETS = [
  ["যুক্তবর্ণ ১ – ক্ষ, ক্ত", "শিক্ষক ছাত্রছাত্রীদের সুশিক্ষা দেন। অক্ষর চিনে নিলে বাক্য লেখা সহজ হয়। বক্তা মঞ্চে দাঁড়িয়ে স্পষ্ট ভাষায় বক্তব্য রাখলেন। রক্ত, মুক্ত, শক্ত, ভক্ত ও যুক্ত শব্দগুলো মনোযোগ দিয়ে টাইপ করো। পক্ষী আকাশে উড়ে যায়, আর লক্ষ্য ঠিক রাখলে সফলতা আসে।"],
  ["যুক্তবর্ণ ২ – স্ত, স্থ, স্ব, স্ম", "স্বাস্থ্য ভালো রাখতে প্রতিদিন সকালে হাঁটা উচিত। স্মৃতিশক্তি বাড়াতে সুস্থ থাকা দরকার। স্টেশনে গিয়ে দেখি ট্রেন স্থগিত হয়েছে। স্পষ্ট করে বললে সমস্যার সমাধান হয়। ব্যস্ত রাস্তায় সাবধানে হাঁটা বুদ্ধিমানের কাজ।"],
  ["যুক্তবর্ণ ৩ – ন্ধ, ন্দ, ঙ্গ, ম্প", "সন্ধ্যায় আকাশে চন্দ্র উঠলে চারদিক আনন্দে ভরে যায়। বন্ধু আর বান্ধবীরা মিলে পঞ্চম শ্রেণির অনুষ্ঠানে গল্প বলল। সম্পর্কের সম্বন্ধে সুন্দর কথা বললে অন্তরে শান্তি আসে। বাংলার সঙ্গে আমাদের নাড়ির সম্পর্ক। সম্পাদক সম্মান পেয়ে খুশি হলেন।"],
  ["যুক্তবর্ণ ৪ – ত্র, প্র, ব্র, দ্র", "প্রকৃতির রূপ দেখে মন ভরে যায়। ব্রিটিশ আমলে বহু বীর স্বাধীনতার জন্য সংগ্রাম করেছেন। ছাত্ররা শ্রদ্ধার সঙ্গে প্রণাম জানাল। ক্রমে ক্রমে দ্রুত উন্নতি হচ্ছে। মিত্র, পুত্র, ক্ষেত্র ও পবিত্র শব্দ টাইপ করো। সমুদ্রের তীরে শ্রান্ত পথিক বিশ্রাম নিল।"],
  ["ড়, য়, ঢ় অনুশীলন", "বড় মেয়ে পড়ার টেবিলে বসে গাড়ির ছবি আঁকছে। আষাঢ় মাসের বৃষ্টিতে রাস্তা কাদায় ভরে গেছে। দায়িত্ব নিয়ে কাজ করলে সবাই ভরসা করে। ময়দানে দৌড় প্রতিযোগিতা শুরু হয়েছে। বাড়ির পাশে বড় একটি গাছ আছে, তার ডালে ময়না পাখি বসে।"],
  ["মিশ্র অনুচ্ছেদ (লম্বা)", "বাংলাদেশ একটি সুন্দর দেশ। এখানে নদী, মাঠ, গাছপালা আর পাখির কলকাকলি প্রকৃতিকে সজীব রাখে। আমাদের মুক্তিযুদ্ধের ইতিহাস গৌরবের। ১৯৭১ সালে লক্ষ লক্ষ মানুষ স্বাধীনতার জন্য আত্মত্যাগ করেছেন। শিক্ষা, বিজ্ঞান ও প্রযুক্তির উন্নতিতে আমরা এগিয়ে চলেছি। সত্য ও ন্যায়ের পথে চললে সমাজে শান্তি ও সমৃদ্ধি আসে। পরিশ্রম, ধৈর্য আর অধ্যবসায় থাকলে উজ্জ্বল ভবিষ্যৎ গড়া সম্ভব। তাই প্রতিদিন নিয়ম করে টাইপিং অনুশীলন করো, দেখবে গতি ও নির্ভুলতা দুটোই বাড়ছে।"],
  ["সংবাদ ধাঁচ – অর্থনীতি", "ঢাকা, ২৯ অক্টোবর: দেশের অর্থনীতিতে নতুন সম্ভাবনার কথা বলছেন বিশ্লেষকেরা। তাঁদের মতে, রপ্তানি আয় বৃদ্ধি ও বিদেশি বিনিয়োগ আকর্ষণে নীতিগত সংস্কার জরুরি। বাজারে নিত্যপ্রয়োজনীয় পণ্যের দাম নিয়ে ভোক্তাদের উদ্বেগ কমেনি। অর্থ মন্ত্রণালয়ের এক কর্মকর্তা জানিয়েছেন, মূল্যস্ফীতি নিয়ন্ত্রণে বিভিন্ন পদক্ষেপ নেওয়া হচ্ছে। ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের ঋণ সুবিধা সহজ করার ওপরও গুরুত্ব দিচ্ছেন নীতিনির্ধারকেরা।"],
  ["সংবাদ ধাঁচ – খেলা", "ঢাকা, ২৯ অক্টোবর: জাতীয় স্টেডিয়ামে রোমাঞ্চকর ম্যাচে শেষ ওভারে জয় তুলে নিয়েছে স্বাগতিক দল। টস জিতে ব্যাটিং বেছে নিয়ে প্রথমে ইনিংস গড়ার চেষ্টা করেন ওপেনাররা। মাঝের ওভারগুলোতে স্পিনারদের দাপটে রানের গতি কিছুটা কমে যায়। শেষ দিকে অধিনায়কের দায়িত্বশীল ব্যাটিংয়ে প্রত্যাশিত সংগ্রহ পায় দল। গ্যালারিতে হাজারো দর্শকের উচ্ছ্বাস ছিল চোখে পড়ার মতো।"],
  ["সংবাদ ধাঁচ – শিক্ষা", "শিক্ষা মন্ত্রণালয় জানিয়েছে, আগামী মাসে অনুষ্ঠেয় পরীক্ষার প্রস্তুতি প্রায় সম্পন্ন হয়েছে। পরীক্ষার্থীদের প্রবেশপত্র সংশ্লিষ্ট বিদ্যালয় থেকে সংগ্রহ করতে বলা হয়েছে। কেন্দ্র সচিব ও পরিদর্শকদের জন্য বিশেষ নির্দেশনা জারি করা হয়েছে। শিক্ষাবিদদের মতে, মুখস্থনির্ভর পদ্ধতি থেকে বেরিয়ে সৃজনশীল চিন্তার বিকাশে গুরুত্ব দেওয়া প্রয়োজন।"],
  ["সংবাদ ধাঁচ – আবহাওয়া", "আবহাওয়া অধিদপ্তর জানিয়েছে, বঙ্গোপসাগরে সৃষ্ট লঘুচাপের প্রভাবে দেশের উপকূলীয় অঞ্চলে বৃষ্টি হতে পারে। সমুদ্রবন্দরগুলোকে সতর্ক সংকেত দেখাতে বলা হয়েছে। মৎস্যজীবীদের গভীর সাগরে যেতে নিষেধ করা হয়েছে। দুর্যোগ ব্যবস্থাপনা কর্তৃপক্ষ আশ্রয়কেন্দ্রগুলো প্রস্তুত রাখার নির্দেশ দিয়েছে।"],
  ["সংবাদ ধাঁচ – প্রযুক্তি", "তথ্যপ্রযুক্তি খাতে দক্ষ জনশক্তি তৈরির লক্ষ্যে নতুন প্রশিক্ষণ কর্মসূচি চালু হচ্ছে। কৃত্রিম বুদ্ধিমত্তা, সাইবার নিরাপত্তা ও সফটওয়্যার উন্নয়নে তরুণদের আগ্রহ বাড়ছে। উদ্যোক্তারা বলছেন, স্টার্টআপ সংস্কৃতি গড়ে তুলতে সহজ শর্তে মূলধন ও পর্যাপ্ত অবকাঠামো প্রয়োজন। অনলাইনে লেনদেন বাড়ার সঙ্গে সঙ্গে ডিজিটাল নিরাপত্তার গুরুত্বও বেড়েছে।"],
  ["সম্পাদকীয় ধাঁচ – সড়ক নিরাপত্তা", "সড়ক দুর্ঘটনা রোধে কঠোর আইন প্রয়োগের বিকল্প নেই। প্রতিদিনই সংবাদপত্রের পাতায় দুর্ঘটনার খবর ছাপা হচ্ছে, অথচ প্রতিকারের উদ্যোগ নেহাতই সীমিত। চালকদের প্রশিক্ষণ, যানবাহনের ফিটনেস পরীক্ষা এবং পথচারীদের সচেতনতা বৃদ্ধির ওপর জোর দিতে হবে। রাষ্ট্র ও সমাজ উভয়কেই দায়িত্ব নিতে হবে, নইলে প্রাণহানির এই মিছিল থামবে না।"],
  ["English - Tarique Rahman's Japan Visit (500 words)", ENGLISH_JAPAN_VISIT_TEXT, false],
  ["যুক্তবর্ণ অনুশীলন – সব সাধারণ যুক্তবর্ণ", "ক্ক ক্ট ক্ত ক্ত্র ক্ন ক্ব ক্ম ক্য ক্র ক্ল ক্ষ ক্ষ্ণ ক্ষ্ম ক্ষ্য ক্ষ্ব। গ্ধ গ্ন গ্ম গ্য গ্র গ্ল ঘ্ন ঙ্ক ঙ্খ ঙ্গ ঙ্ঘ ঙ্ম। চ্চ চ্ছ চ্ঞ ঞ্চ ঞ্ছ ঞ্জ ঞ্ঝ জ্জ জ্ঝ জ্ঞ। ট্ট ট্র ড্ড ড্র ণ্ট ণ্ঠ ণ্ড ণ্ঢ ণ্ণ ণ্ব ণ্ম। ত্ত ত্থ ত্ন ত্ব ত্ম ত্য ত্র থ্ব দ্গ দ্ঘ দ্দ দ্ধ দ্ভ দ্ম দ্য দ্র দ্ব। ন্ট ন্ঠ ন্ড ন্ত ন্থ ন্দ ন্ধ ন্ন ন্ব ন্ম ন্য প্ট প্ত প্ন প্প প্স প্য প্র প্ল। ফ্ট ফ্র ব্জ ব্দ ব্ধ ব্ব ব্য ব্র ব্ল ভ্র ম্ন ম্প ম্ফ ম্ব ম্ভ ম্ম ম্য ম্র ম্ল। ল্ক ল্গ ল্ট ল্ড ল্প ল্ফ ল্ব ল্ম ল্ল শ্চ শ্ছ শ্ন শ্ব শ্ম শ্য শ্র শ্ল। ষ্ক ষ্ট ষ্ঠ ষ্ণ ষ্প ষ্ফ ষ্ম স্ক স্খ স্ট স্ত স্থ স্ন স্প স্ফ স্ব স্ম স্য স্র স্ল। হ্ণ হ্ন হ্ম হ্য হ্র হ্ল হ্ব। প্রতিটি যুক্তবর্ণ মনোযোগ দিয়ে পড়ে ও টাইপ করে অনুশীলন করুন।"],
];

const FONT_FAMILIES = {
  mj: "'SutonnyMJ', 'SutonnyOMJ', 'Nirmala UI', sans-serif",
  nir: "'Nirmala UI', 'Noto Sans Bengali', 'Kalpurush', sans-serif",
  tnr: "'Times New Roman', Times, 'Noto Serif Bengali', 'Nirmala UI', serif",
};

const segment = (value) => {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(value), (item) => item.segment);
  }
  return Array.from(value);
};
const normalizedText = (value) => value.replace(/\s+/g, " ").trim().normalize("NFC");
const countWords = (value) => value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
const BIJOY_CONSONANT_KEYS = {
  "ক": "j", "খ": "J", "গ": "o", "ঘ": "O", "ঙ": "q",
  "চ": "y", "ছ": "Y", "জ": "u", "ঝ": "U", "ঞ": "I",
  "ট": "t", "ঠ": "T", "ড": "e", "ঢ": "E", "ণ": "B",
  "ত": "k", "থ": "K", "দ": "l", "ধ": "L", "ন": "b",
  "প": "r", "ফ": "R", "ব": "h", "ভ": "H", "ম": "m",
  "য": "w", "র": "v", "ল": "V", "শ": "M", "ষ": "N",
  "স": "n", "হ": "i", "ড়": "p", "ঢ়": "P", "য়": "W", "ৎ": "\\",
};
const CONJUNCT_PATTERN = /[\u0995-\u09B9\u09CE\u09DC-\u09DF](?:\u09CD[\u200C\u200D]?[\u0995-\u09B9\u09CE\u09DC-\u09DF])+/g;
const getBijoySequence = (conjunct) => {
  const consonants = conjunct.replace(/[\u09CD\u200C\u200D]/g, "").split("");
  if (consonants.length < 2) return null;

  const startsWithReph = consonants[0] === "র";
  const cluster = startsWithReph ? consonants.slice(1) : consonants;
  let sequence = BIJOY_CONSONANT_KEYS[cluster[0]];
  if (!sequence) return null;

  for (let index = 1; index < cluster.length; index++) {
    const consonant = cluster[index];
    if (consonant === "র") sequence += "z";
    else if (consonant === "য") sequence += "Z";
    else {
      const key = BIJOY_CONSONANT_KEYS[consonant];
      if (!key) return null;
      sequence += `g${key}`;
    }
  }
  if (startsWithReph) sequence += "A";
  return sequence;
};
const getConjuncts = (text) => {
  const conjuncts = new Map();
  for (const match of text.normalize("NFC").matchAll(CONJUNCT_PATTERN)) {
    const conjunct = match[0];
    conjuncts.set(conjunct, (conjuncts.get(conjunct) ?? 0) + 1);
  }
  return Array.from(conjuncts, ([text, count]) => ({
    text,
    count,
    sequence: getBijoySequence(text),
    parts: text.split(/[\u09CD\u200C\u200D]/).filter(Boolean),
  }));
};
const formatTime = (ms) => {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};

function expandPreset(text) {
  const sentences = text.split("।").map((part) => part.trim()).filter(Boolean).map((part) => `${part}।`);
  const output = [];
  let length = 0;
  let round = 0;
  const target = 6000;
  const shuffle = (items, seed) => {
    const array = [...items];
    let currentSeed = seed;
    for (let i = array.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
      const j = currentSeed % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  while (length < target) {
    const order = round === 0 ? sentences : shuffle(sentences, round * 7919 + sentences.length);
    for (const sentence of order) {
      output.push(sentence);
      length += Array.from(sentence).length + 1;
      if (length >= target) break;
    }
    round++;
  }
  return output.join(" ");
}

export default function Home() {
  const [font, setFont] = useState("nir");
  const [fontSize, setFontSize] = useState("20");
  const [duration, setDuration] = useState("1");
  const [customMinutes, setCustomMinutes] = useState("2");
  const [preset, setPreset] = useState("");
  const [sourceText, setSourceText] = useState(DEFAULT_TEXT);
  const [typedText, setTypedText] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [totalMs, setTotalMs] = useState(60000);
  const [now, setNow] = useState(0);
  const [resultTitle, setResultTitle] = useState("");
  const [showColorFeedback, setShowColorFeedback] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const inputRef = useRef(null);
  const modalCloseRef = useRef(null);
  const startRef = useRef(null);
  const timerRef = useRef(null);
  const target = useMemo(() => segment(normalizedText(sourceText)), [sourceText]);
  const typed = useMemo(() => segment(typedText.normalize("NFC")), [typedText]);
  const conjuncts = useMemo(() => getConjuncts(sourceText), [sourceText]);
  const wordErrors = useMemo(() => {
    const expectedWords = normalizedText(sourceText).split(" ").filter(Boolean);
    const typedWords = typedText.normalize("NFC").trim().split(/\s+/).filter(Boolean);
    const errors = [];
    const costs = Array.from({ length: expectedWords.length + 1 }, () => Array(typedWords.length + 1).fill(0));
    const actions = Array.from({ length: expectedWords.length + 1 }, () => Array(typedWords.length + 1).fill(""));

    for (let expectedIndex = expectedWords.length; expectedIndex >= 0; expectedIndex--) {
      for (let typedIndex = typedWords.length; typedIndex >= 0; typedIndex--) {
        if (typedIndex === typedWords.length) continue;
        if (expectedIndex === expectedWords.length) {
          costs[expectedIndex][typedIndex] = typedWords.length - typedIndex;
          actions[expectedIndex][typedIndex] = "extra";
          continue;
        }

        const expected = expectedWords[expectedIndex];
        const actual = typedWords[typedIndex];
        if (expected === actual) {
          costs[expectedIndex][typedIndex] = costs[expectedIndex + 1][typedIndex + 1];
          actions[expectedIndex][typedIndex] = "match";
          continue;
        }

        const choices = [
          { action: "missing", cost: 1 + costs[expectedIndex + 1][typedIndex] },
          { action: "incorrect", cost: 1 + costs[expectedIndex + 1][typedIndex + 1] },
          { action: "extra", cost: 1 + costs[expectedIndex][typedIndex + 1] },
        ];
        const best = choices.reduce((current, choice) => choice.cost < current.cost ? choice : current);
        costs[expectedIndex][typedIndex] = best.cost;
        actions[expectedIndex][typedIndex] = best.action;
      }
    }

    let expectedIndex = 0;
    let typedIndex = 0;
    while (typedIndex < typedWords.length) {
      const action = actions[expectedIndex][typedIndex];
      if (action === "match") {
        expectedIndex++;
        typedIndex++;
      } else if (action === "missing") {
        errors.push({ number: expectedIndex + 1, expected: expectedWords[expectedIndex], actual: "", type: "missing" });
        expectedIndex++;
      } else if (action === "extra") {
        errors.push({ number: expectedIndex + 1, expected: "", actual: typedWords[typedIndex], type: "extra" });
        typedIndex++;
      } else {
        const expected = expectedWords[expectedIndex];
        const actual = typedWords[typedIndex];
        errors.push({
          number: expectedIndex + 1,
          expected,
          actual,
          type: expected.toLowerCase() === actual.toLowerCase() ? "case" : "incorrect",
        });
        expectedIndex++;
        typedIndex++;
      }
    }
    return errors;
  }, [sourceText, typedText]);
  const spaceErrors = useMemo(() => {
    const expectedSpaces = normalizedText(sourceText).match(/\s+/g) || [];
    const typedSpaces = typedText.normalize("NFC").match(/\s+/g) || [];
    const typedWords = typedText.normalize("NFC").trim().split(/\s+/).filter(Boolean);
    const relevantExpectedSpaces = expectedSpaces.slice(0, Math.max(typedWords.length - 1, typedSpaces.length));
    const errors = [];
    for (let index = 0; index < Math.max(relevantExpectedSpaces.length, typedSpaces.length); index++) {
      const expected = relevantExpectedSpaces[index] || "";
      const actual = typedSpaces[index] || "";
      if (expected !== actual) errors.push({ number: index + 1, expected, actual });
    }
    return errors;
  }, [sourceText, typedText]);
  const totalErrors = wordErrors.length + spaceErrors.length;

  const selectedMinutes = () => {
    const value = duration === "custom" ? Number.parseFloat(customMinutes) : Number.parseFloat(duration);
    return Number.isFinite(value) && value > 0 ? value : 1;
  };

  const stats = useMemo(() => {
    let correctChars = 0;
    let wrongChars = 0;
    const last = typed.length - 1;
    const pending = typed.length > 0 && last < target.length && typed[last] !== target[last] && target[last].startsWith(typed[last]) && !finished;
    for (let i = 0; i < typed.length; i++) {
      if (pending && i === last) continue;
      if (i < target.length && typed[i] === target[i]) correctChars += Array.from(target[i]).length;
      else wrongChars++;
    }
    const committed = typed.length - (pending ? 1 : 0);
    const accuracy = committed > 0 ? Math.max(0, ((committed - wrongChars) / committed) * 100) : 100;
    const words = countWords(typedText);
    const elapsed = started && startedAt !== null ? Math.min(now - startedAt, totalMs) : 0;
    // Requested rule: WPM is actual whitespace-separated words typed per elapsed minute.
    const wpm = elapsed > 0 ? Math.round(words / (Math.max(elapsed, 1000) / 60000)) : 0;
    return { correctChars, wrongChars, accuracy, words, pending, elapsed, wpm };
  }, [typed, typedText, target, finished, started, startedAt, now, totalMs]);

  const reset = useCallback((nextSource = sourceText) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    startRef.current = null;
    setSourceText(nextSource);
    setTypedText("");
    setStarted(false);
    setFinished(false);
    setStartedAt(null);
    setNow(0);
    setTotalMs((duration === "custom" ? Number.parseFloat(customMinutes) : Number.parseFloat(duration)) > 0
      ? (duration === "custom" ? Number.parseFloat(customMinutes) : Number.parseFloat(duration)) * 60000
      : 60000);
    setResultTitle("");
    setShowResultModal(false);
  }, [sourceText, duration, customMinutes]);

  const finish = useCallback((title) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setFinished(true);
    setResultTitle(title);
    setShowResultModal(true);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!showResultModal) return;
    modalCloseRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowResultModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResultModal]);

  useEffect(() => {
    if (!started || finished || startedAt === null) return;
    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setNow(performance.now());
      if (elapsed >= totalMs) finish("Time’s up");
    }, 200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, finished, startedAt, totalMs, finish]);

  useEffect(() => {
    if (!finished && target.length > 0 && typed.length >= target.length && !stats.pending) finish("Completed");
  }, [typed.length, target.length, stats.pending, finished, finish]);

  const handleTyping = (event) => {
    if (finished) return;
    const value = event.target.value;
    setTypedText(value);
    if (!started) {
      const start = performance.now();
      startRef.current = start;
      setStartedAt(start);
      setNow(start);
      setStarted(true);
    } else {
      setNow(performance.now());
    }
  };

  const referenceContent = target.map((character, index) => {
    let className = "";
    if (showColorFeedback && index < typed.length) {
      if (typed[index] === character) className = "ok";
      else if (stats.pending && index === typed.length - 1) className = "cur";
      else className = "bad";
    } else if (showColorFeedback && index === typed.length && !stats.pending && !finished) className = "cur";
    return <span className={className} key={`${index}-${character}`}>{character}</span>;
  });

  const changeDuration = (value) => {
    setDuration(value);
    const parsed = value === "custom" ? Number.parseFloat(customMinutes) : Number.parseFloat(value);
    setTotalMs((Number.isFinite(parsed) && parsed > 0 ? parsed : 1) * 60000);
    setTypedText("");
    setStarted(false);
    setFinished(false);
    setStartedAt(null);
    setNow(0);
    setResultTitle("");
    setShowResultModal(false);
  };

  const fontStyle = { fontFamily: FONT_FAMILIES[font], fontSize: `${fontSize}px` };
  const remaining = started && startedAt !== null ? Math.max(0, totalMs - Math.min(now - startedAt, totalMs)) : totalMs;

  return (
    <main data-theme="light">
      <div className="app-header">
        <header className="titlebar">Bangla Typing Practice – Word</header>
        <section className="ribbon" aria-label="Practice settings">
        <div className="group"><div className="row">
          <select value={font} onChange={(e) => setFont(e.target.value)} aria-label="Font">
            <option value="mj">SutonnyMJ</option><option value="nir">Nirmala UI</option><option value="tnr">Times New Roman</option>
          </select>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} aria-label="Font size">
            {["14", "16", "20", "24", "28"].map((size) => <option key={size}>{size}</option>)}
          </select>
        </div><small>Font</small></div>
        <div className="group"><div className="row">
          <select value={duration} onChange={(e) => changeDuration(e.target.value)} aria-label="Duration">
            <option value="1">1 min</option><option value="3">3 min</option><option value="5">5 min</option><option value="10">10 min</option><option value="15">15 min</option><option value="custom">Custom</option>
          </select>
          {duration === "custom" && <input type="number" min="0.5" step="0.5" value={customMinutes} onChange={(e) => { setCustomMinutes(e.target.value); reset(); }} aria-label="Custom minutes" />}
        </div><small>Timer</small></div>
        <div className="group"><div className="row">
          <select value={preset} onChange={(e) => {
            setPreset(e.target.value);
            if (e.target.value !== "") {
              const [, text, shouldExpand = true] = PRESETS[Number(e.target.value)];
              reset(shouldExpand ? expandPreset(text) : text);
            }
          }} aria-label="Practice text" className="preset-select">
            <option value="">Custom (type or paste)</option>
            {PRESETS.map(([label], index) => <option value={String(index)} key={label}>{label}</option>)}
          </select>
        </div><small>Text</small></div>
        <div className="group"><div className="row">
          <label className="switch-label">
            <input
              type="checkbox"
              role="switch"
              checked={showColorFeedback}
              onChange={(e) => setShowColorFeedback(e.target.checked)}
              aria-label="Show live color feedback"
            />
            <span className="switch-track" aria-hidden="true"><span /></span>
            <span>Color feedback</span>
          </label>
        </div><small>Typing feedback</small></div>
        <div className="group"><div className="row"><button className="primary" onClick={() => { reset(); inputRef.current?.focus(); }}>Restart</button></div><small>Practice</small></div>
        {finished && !showResultModal && <div className="group last-result-group">
          <div className="row"><button type="button" onClick={() => setShowResultModal(true)}>Last result</button></div>
          <small>Results</small>
        </div>}
        </section>
      </div>

      <div className="practice-layout">
        <section className="setup">
          <label htmlFor="src">Custom text (type or paste the text you want to practise)</label>
          <textarea id="src" spellCheck="false" value={sourceText} onChange={(e) => { setPreset(""); reset(e.target.value); }} />
          {font === "mj" && <p className="note">SutonnyMJ is a legacy Bijoy font: it must be installed on your computer, and the text must be Bijoy-encoded, otherwise it may look broken.</p>}
          <div className="conjunct-guide">
            <h2>যুক্তবর্ণের Bijoy key</h2>
            <p className="note">Capital letter লিখতে Shift ব্যবহার করুন।</p>
            {conjuncts.length > 0 ? (
              <ul>
                {conjuncts.map(({ text, count, sequence, parts }) => (
                  <li key={text}>
                    <strong>{text}</strong>
                    <span>{parts.join("্ + ")} · {count} বার</span>
                    {sequence
                      ? <code>{sequence}</code>
                      : <span className="note">এই যুক্তবর্ণের key sequence পাওয়া যায়নি</span>}
                  </li>
                ))}
              </ul>
            ) : <p className="note">Custom text-এ কোনো যুক্তবর্ণ নেই।</p>}
          </div>
        </section>

        <section className="work">
          <div className="tag">Text to copy</div>
          <div className="page"><div className="reference" style={fontStyle}>{referenceContent}</div></div>
          <div className="tag">Type here (timer starts on your first key)</div>
          <textarea
            ref={inputRef}
            className="typed"
            style={fontStyle}
            value={typedText}
            onChange={handleTyping}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Typing area"
            disabled={finished}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
          {finished && <section className="result">
            <h2>{resultTitle}</h2>
            <div className="grid">
              <div><b>{stats.wpm}</b><span>WPM</span></div>
              <div><b>{Math.round(stats.accuracy)}%</b><span>Accuracy</span></div>
              <div><b>{stats.wrongChars}</b><span>Wrong characters</span></div>
              <div><b>{stats.words}</b><span>Words typed</span></div>
              <div><b>{formatTime(stats.elapsed)}</b><span>Time used</span></div>
            </div>
            <p className="error-count">Total errors: {totalErrors} (words: {wordErrors.length}, spaces: {spaceErrors.length})</p>
          </section>}
        </section>
      </div>

      {showResultModal && <div className="modal-backdrop">
        <section className="result-modal" role="dialog" aria-modal="true" aria-labelledby="result-modal-title">
          <div className="modal-heading">
            <h2 id="result-modal-title">{resultTitle}</h2>
            <button ref={modalCloseRef} type="button" onClick={() => setShowResultModal(false)} aria-label="Close results">×</button>
          </div>
          <div className="grid">
            <div><b>{stats.wpm}</b><span>WPM</span></div>
            <div><b>{Math.round(stats.accuracy)}%</b><span>Accuracy</span></div>
            <div><b>{stats.wrongChars}</b><span>Wrong characters</span></div>
            <div><b>{stats.words}</b><span>Words typed</span></div>
            <div><b>{formatTime(stats.elapsed)}</b><span>Time used</span></div>
          </div>
          <h3 className="error-heading">Word errors: {wordErrors.length}</h3>
          {wordErrors.length > 0 ? (
            <ol className="error-list">
              {wordErrors.map(({ number, expected, actual, type }) => (
                <li key={`${number}-${type}`}>
                  <strong>Word {number}:</strong>{" "}
                  {type === "missing"
                    ? <>Missing — expected “{expected}”</>
                    : type === "extra"
                      ? <>Extra word — typed “{actual}”</>
                      : type === "case"
                        ? <>Capitalization error — typed “{actual}”, expected “{expected}”</>
                      : <>Typed “{actual}”, expected “{expected}”</>}
                </li>
              ))}
            </ol>
          ) : <p className="note">No word errors. Great job!</p>}
          <h3 className="error-heading">Space errors: {spaceErrors.length}</h3>
          {spaceErrors.length > 0 ? (
            <ol className="error-list">
              {spaceErrors.map(({ number, expected, actual }) => (
                <li key={`space-${number}`}>
                  <strong>Space {number}:</strong>{" "}
                  {actual
                    ? <>Typed {JSON.stringify(actual)}, expected {expected ? JSON.stringify(expected) : "no space"}</>
                    : <>Missing a space; expected {JSON.stringify(expected)}</>}
                </li>
              ))}
            </ol>
          ) : <p className="note">No space errors. Great job!</p>}
          <p className="error-count">Total errors: {totalErrors}</p>
        </section>
      </div>}

      <footer className="status">
        <span>Page 1 of 1</span><span>Words: {stats.words}</span><span>Time: {formatTime(remaining)}</span><span>WPM: {stats.wpm}</span><span>Accuracy: {Math.round(stats.accuracy)}%</span>
      </footer>
    </main>
  );
}
