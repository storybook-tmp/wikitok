import { http, HttpResponse } from 'msw';

const mockPages = {
  '1001': {
    pageid: 1001,
    title: 'Aurora Borealis',
    varianttitles: { en: 'Aurora Borealis' },
    extract:
      'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions. Auroras display dynamic patterns of brilliant lights that appear as curtains, rays, spirals, or dynamic flickers covering the entire sky.',
    thumbnail: {
      source:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23065'/%3E%3Cstop offset='1' stop-color='%23113'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3C/svg%3E",
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_(astronomy)',
  },
  '1002': {
    pageid: 1002,
    title: 'Deep Sea Exploration',
    varianttitles: { en: 'Deep Sea Exploration' },
    extract:
      'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed, for scientific or commercial purposes. It involves descending below the photic zone of the ocean to observe and study the organisms and environment of the deep sea.',
    thumbnail: {
      source:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23126'/%3E%3Cstop offset='1' stop-color='%23013'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3C/svg%3E",
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Deep-sea_exploration',
  },
  '1003': {
    pageid: 1003,
    title: 'Fibonacci Sequence',
    varianttitles: { en: 'Fibonacci Sequence' },
    extract:
      'In mathematics, the Fibonacci sequence is a sequence in which each number is the sum of the two preceding ones. Numbers that are part of the Fibonacci sequence are known as Fibonacci numbers. The sequence commonly starts from 0 and 1.',
    thumbnail: {
      source:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23654' width='800' height='600'/%3E%3C/svg%3E",
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Fibonacci_sequence',
  },
  '1004': {
    pageid: 1004,
    title: 'Mount Everest',
    varianttitles: { en: 'Mount Everest' },
    extract:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China-Nepal border runs across its summit point. Its elevation of 8,848.86 m was most recently established in 2020 by the Chinese and Nepali authorities.",
    thumbnail: {
      source:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2389c' /%3E%3Cstop offset='1' stop-color='%23456' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='600'/%3E%3C/svg%3E",
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Mount_Everest',
  },
  '1005': {
    pageid: 1005,
    title: 'Jazz Music',
    varianttitles: { en: 'Jazz Music' },
    extract:
      'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, in the late 19th and early 20th centuries, with its roots in blues, ragtime, European harmony and African rhythmic rituals. Since the 1920s Jazz Age, it has been recognized as a major form of musical expression.',
    thumbnail: {
      source:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23534' width='800' height='600'/%3E%3C/svg%3E",
      width: 800,
      height: 600,
    },
    canonicalurl: 'https://en.wikipedia.org/wiki/Jazz',
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get(/https:\/\/.*\.wikipedia\.org\/w\/api\.php/, () => {
      return HttpResponse.json({
        query: {
          pages: mockPages,
        },
      });
    }),
  ],
};
