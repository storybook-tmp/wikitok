import { http, HttpResponse } from 'msw';

const placeholderImage =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function makeWikiPage(id: number, title: string, extract: string) {
  return {
    pageid: id,
    title,
    varianttitles: { en: title },
    extract,
    thumbnail: {
      source: placeholderImage,
      width: 800,
      height: 600,
    },
    canonicalurl: `https://en.wikipedia.org/wiki/${title.replace(/ /g, '_')}`,
  };
}

export const mswHandlers = [
  http.get('https://en.wikipedia.org/w/api.php', () =>
    HttpResponse.json({
      query: {
        pages: {
          '12345': makeWikiPage(
            12345,
            'Eiffel Tower',
            'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. Named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889.'
          ),
          '12346': makeWikiPage(
            12346,
            'Great Wall of China',
            'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states and empires.'
          ),
          '12347': makeWikiPage(
            12347,
            'Colosseum',
            'The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum.'
          ),
        },
      },
    })
  ),
];
