import { http, HttpResponse } from 'msw';

const mockWikiPages = {
  '101': {
    pageid: 101,
    title: 'Solar System',
    extract:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Solar_System',
    varianttitles: { en: 'Solar System' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Planets2013.svg/800px-Planets2013.svg.png',
      width: 800,
      height: 600,
    },
  },
  '102': {
    pageid: 102,
    title: 'Great Wall of China',
    extract:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
    varianttitles: { en: 'Great Wall of China' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
      width: 800,
      height: 533,
    },
  },
  '103': {
    pageid: 103,
    title: 'Ada Lovelace',
    extract:
      'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine.',
    canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
    varianttitles: { en: 'Ada Lovelace' },
    thumbnail: {
      source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg',
      width: 800,
      height: 1000,
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://*.wikipedia.org/w/api.php', () => {
      return HttpResponse.json({
        query: {
          pages: mockWikiPages,
        },
      });
    }),
  ],
};
