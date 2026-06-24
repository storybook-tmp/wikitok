import type { ArticleProps } from '../types/ArticleProps';
import type { WikiArticle } from '../components/WikiCard';

export const sampleArticle: ArticleProps = {
  id: 'aurora-forest',
  title: 'Aurora Forest',
  content:
    'Aurora Forest is a fictional reserve used for testing article layouts and typography in isolated UI states.',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
};

export const sampleArticles: ArticleProps[] = [
  sampleArticle,
  {
    id: 'lunar-lake',
    title: 'Lunar Lake',
    content:
      'Lunar Lake is known for reflective waters, winding boardwalks, and a surprisingly rich collection of migratory birds.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'copper-canyon',
    title: 'Copper Canyon',
    content:
      'Copper Canyon attracts hikers with layered red stone, sharp ridgelines, and long panoramic overlooks.',
  },
];

export const sampleWikiArticle: WikiArticle = {
  title: 'Northern Lights',
  displaytitle: 'Northern Lights',
  extract:
    'The northern lights are luminous atmospheric displays caused by charged particles interacting with the Earth’s magnetic field.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
};

export const sampleWikiArticles: WikiArticle[] = [
  sampleWikiArticle,
  {
    title: 'Great Barrier Reef',
    displaytitle: 'Great Barrier Reef',
    extract:
      'The Great Barrier Reef is the world’s largest coral reef system and supports a wide range of marine life.',
    pageid: 202,
    url: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef',
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
  },
  {
    title: 'Atacama Desert',
    displaytitle: 'Atacama Desert',
    extract:
      'The Atacama Desert is one of the driest places on Earth and is often used for astronomical observation.',
    pageid: 303,
    url: 'https://en.wikipedia.org/wiki/Atacama_Desert',
    thumbnail: {
      source:
        'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      width: 1200,
      height: 800,
    },
  },
];

export function createWikipediaResponse(articles: WikiArticle[]) {
  return {
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          article.pageid,
          {
            title: article.title,
            varianttitles: {
              en: article.displaytitle,
            },
            extract: article.extract,
            pageid: article.pageid,
            thumbnail: article.thumbnail,
            canonicalurl: article.url,
          },
        ]),
      ),
    },
  };
}
