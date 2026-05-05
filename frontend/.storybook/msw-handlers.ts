import { http, HttpResponse } from 'msw';

const mockArticles = {
  query: {
    pages: {
      '12345': {
        title: 'Albert Einstein',
        varianttitles: { en: 'Albert Einstein' },
        extract:
          'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time. He is best known for developing the theory of relativity.',
        pageid: 12345,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921.jpg/800px-Einstein_1921.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Albert_Einstein',
      },
      '67890': {
        title: 'Marie Curie',
        varianttitles: { en: 'Marie Curie' },
        extract:
          'Marie Salomea Skłodowska-Curie was a Polish and naturalised-French physicist and chemist who conducted pioneering research on radioactivity.',
        pageid: 67890,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Marie_Curie',
      },
      '11111': {
        title: 'Ada Lovelace',
        varianttitles: { en: 'Ada Lovelace' },
        extract:
          'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer.',
        pageid: 11111,
        thumbnail: {
          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace.jpg',
          width: 800,
          height: 600,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Ada_Lovelace',
      },
    },
  },
};

export const mswHandlers = {
  wikipedia: [
    http.get('https://*.wikipedia.org/w/api.php', () =>
      HttpResponse.json(mockArticles)
    ),
  ],
};
