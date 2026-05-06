import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  "12345": {
    pageid: 12345,
    title: "Aurora Borealis",
    varianttitles: { en: "Aurora Borealis", ar: "Aurora Borealis", bn: "Aurora Borealis", de: "Aurora Borealis", es: "Aurora Borealis", fr: "Aurora Borealis", ja: "Aurora Borealis", ko: "Aurora Borealis", pt: "Aurora Borealis", ru: "Aurora Borealis", "zh-cn": "Aurora Borealis", "zh-tw": "Aurora Borealis", "gan-hans": "Aurora Borealis", "gan-hant": "Aurora Borealis", "wuu-hans": "Aurora Borealis", "wuu-hant": "Aurora Borealis", "yue-hant": "Aurora Borealis", "zh-hk": "Aurora Borealis", "zh-mo": "Aurora Borealis", "zh-my": "Aurora Borealis", "zh-sg": "Aurora Borealis", ca: "Aurora Borealis", cs: "Aurora Borealis", el: "Aurora Borealis", eo: "Aurora Borealis", eu: "Aurora Borealis", fa: "Aurora Borealis", fi: "Aurora Borealis", he: "Aurora Borealis", hi: "Aurora Borealis", hr: "Aurora Borealis", hu: "Aurora Borealis", id: "Aurora Borealis", it: "Aurora Borealis", ks: "Aurora Borealis", ml: "Aurora Borealis", nl: "Aurora Borealis", pl: "Aurora Borealis", ro: "Aurora Borealis", sk: "Aurora Borealis", sr: "Aurora Borealis", sv: "Aurora Borealis", te: "Aurora Borealis", th: "Aurora Borealis", tr: "Aurora Borealis", uk: "Aurora Borealis", ur: "Aurora Borealis", vi: "Aurora Borealis" },
    extract: "An aurora borealis, also known as the northern lights, is a natural light display predominantly seen in high-latitude regions around the Arctic. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg",
      width: 800,
      height: 531,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Aurora_Borealis",
  },
  "67890": {
    pageid: 67890,
    title: "Great Wall of China",
    varianttitles: { en: "Great Wall of China", ar: "Great Wall of China", bn: "Great Wall of China", de: "Great Wall of China", es: "Great Wall of China", fr: "Great Wall of China", ja: "Great Wall of China", ko: "Great Wall of China", pt: "Great Wall of China", ru: "Great Wall of China", "zh-cn": "Great Wall of China", "zh-tw": "Great Wall of China", "gan-hans": "Great Wall of China", "gan-hant": "Great Wall of China", "wuu-hans": "Great Wall of China", "wuu-hant": "Great Wall of China", "yue-hant": "Great Wall of China", "zh-hk": "Great Wall of China", "zh-mo": "Great Wall of China", "zh-my": "Great Wall of China", "zh-sg": "Great Wall of China", ca: "Great Wall of China", cs: "Great Wall of China", el: "Great Wall of China", eo: "Great Wall of China", eu: "Great Wall of China", fa: "Great Wall of China", fi: "Great Wall of China", he: "Great Wall of China", hi: "Great Wall of China", hr: "Great Wall of China", hu: "Great Wall of China", id: "Great Wall of China", it: "Great Wall of China", ks: "Great Wall of China", ml: "Great Wall of China", nl: "Great Wall of China", pl: "Great Wall of China", ro: "Great Wall of China", sk: "Great Wall of China", sr: "Great Wall of China", sv: "Great Wall of China", te: "Great Wall of China", th: "Great Wall of China", tr: "Great Wall of China", uk: "Great Wall of China", ur: "Great Wall of China", vi: "Great Wall of China" },
    extract: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states. The best-known sections were built by the Ming dynasty. The wall spans over 13,000 miles and is one of the most impressive architectural feats in history.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
      width: 800,
      height: 533,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
  },
  "11111": {
    pageid: 11111,
    title: "Deep Ocean Exploration",
    varianttitles: { en: "Deep Ocean Exploration", ar: "Deep Ocean Exploration", bn: "Deep Ocean Exploration", de: "Deep Ocean Exploration", es: "Deep Ocean Exploration", fr: "Deep Ocean Exploration", ja: "Deep Ocean Exploration", ko: "Deep Ocean Exploration", pt: "Deep Ocean Exploration", ru: "Deep Ocean Exploration", "zh-cn": "Deep Ocean Exploration", "zh-tw": "Deep Ocean Exploration", "gan-hans": "Deep Ocean Exploration", "gan-hant": "Deep Ocean Exploration", "wuu-hans": "Deep Ocean Exploration", "wuu-hant": "Deep Ocean Exploration", "yue-hant": "Deep Ocean Exploration", "zh-hk": "Deep Ocean Exploration", "zh-mo": "Deep Ocean Exploration", "zh-my": "Deep Ocean Exploration", "zh-sg": "Deep Ocean Exploration", ca: "Deep Ocean Exploration", cs: "Deep Ocean Exploration", el: "Deep Ocean Exploration", eo: "Deep Ocean Exploration", eu: "Deep Ocean Exploration", fa: "Deep Ocean Exploration", fi: "Deep Ocean Exploration", he: "Deep Ocean Exploration", hi: "Deep Ocean Exploration", hr: "Deep Ocean Exploration", hu: "Deep Ocean Exploration", id: "Deep Ocean Exploration", it: "Deep Ocean Exploration", ks: "Deep Ocean Exploration", ml: "Deep Ocean Exploration", nl: "Deep Ocean Exploration", pl: "Deep Ocean Exploration", ro: "Deep Ocean Exploration", sk: "Deep Ocean Exploration", sr: "Deep Ocean Exploration", sv: "Deep Ocean Exploration", te: "Deep Ocean Exploration", th: "Deep Ocean Exploration", tr: "Deep Ocean Exploration", uk: "Deep Ocean Exploration", ur: "Deep Ocean Exploration", vi: "Deep Ocean Exploration" },
    extract: "Deep ocean exploration involves investigating the deepest parts of the ocean using submersible vehicles, remotely operated vehicles, and autonomous underwater vehicles. The ocean floor contains unique ecosystems, hydrothermal vents, and geological formations that scientists continue to study.",
    thumbnail: {
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deep_sea_exploration.jpg/800px-Deep_sea_exploration.jpg",
      width: 800,
      height: 600,
    },
    canonicalurl: "https://en.wikipedia.org/wiki/Deep_Ocean_Exploration",
  },
};

const wikiApiHandler = http.get(
  'https://*.wikipedia.org/w/api.php',
  () => {
    return HttpResponse.json({
      query: {
        pages: mockWikiPages,
      },
    });
  }
);

export const mswHandlers = [wikiApiHandler];
