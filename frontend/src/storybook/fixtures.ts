import type { WikiArticle } from '../components/WikiCard';
import type { ArticleProps } from '../types/ArticleProps';

export const featureArticle = {
  title: 'Exploring the Coral Triangle',
  content:
    'The Coral Triangle is a marine area located in the western Pacific Ocean known for extraordinary biodiversity and vibrant reef systems.',
  image:
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
} satisfies ArticleProps;

export const articleListItems = [
  featureArticle,
  {
    title: 'Night Markets of Taipei',
    content:
      'Taipei night markets are famous for street food, dense crowds, and an atmosphere that blends tradition with modern city life.',
    image:
      'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Alpine Rail Journeys',
    content:
      'Mountain rail lines combine engineering feats with panoramic views, linking remote towns and scenic valleys.',
  },
] satisfies ArticleProps[];

export const sampleWikiArticle = {
  title: 'Coral Triangle',
  displaytitle: 'Coral Triangle',
  extract:
    'The Coral Triangle is a marine area located in the western Pacific Ocean that contains exceptional biodiversity and important habitats.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Coral_Triangle',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
} satisfies WikiArticle;

export const secondWikiArticle = {
  title: 'Night market',
  displaytitle: 'Night market',
  extract:
    'A night market is a street market that generally operates from late afternoon into the night and is especially common in East Asia.',
  pageid: 202,
  url: 'https://en.wikipedia.org/wiki/Night_market',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    width: 1200,
    height: 800,
  },
} satisfies WikiArticle;

export const likedWikiArticles = [
  sampleWikiArticle,
  secondWikiArticle,
] satisfies WikiArticle[];

export function createWikiApiResponse(
  articles: WikiArticle[],
  language = 'en',
) {
  return {
    query: {
      pages: Object.fromEntries(
        articles.map((article) => [
          article.pageid,
          {
            title: article.title,
            pageid: article.pageid,
            canonicalurl: article.url,
            extract: article.extract,
            thumbnail: article.thumbnail,
            varianttitles: {
              [language]: article.displaytitle,
            },
          },
        ]),
      ),
    },
  };
}
