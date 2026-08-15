export const ARTICLE_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type ArticleStatus = (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS];
