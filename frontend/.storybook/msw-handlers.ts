import { http, HttpResponse } from 'msw';

const wikiResponse = {
  query: {
    pages: {
      '12345': {
        title: 'Solar System',
        varianttitles: { en: 'Solar System' },
        extract: 'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.',
        pageid: 12345,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_sys8.jpg/800px-Solar_sys8.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Solar_System',
      },
      '67890': {
        title: 'Ada Lovelace',
        varianttitles: { en: 'Ada Lovelace' },
        extract: 'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine.',
        pageid: 67890,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg',
          width: 800,
          height: 1000,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      },
    },
  },
};

export const mswHandlers = {
  wiki: [
    http.get('https://en.wikipedia.org/w/api.php', () =>
      HttpResponse.json(wikiResponse)
    ),
  ],
};
