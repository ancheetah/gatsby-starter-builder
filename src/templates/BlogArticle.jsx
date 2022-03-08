import * as React from 'react';
import { graphql } from 'gatsby';
import { BuilderComponent } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';
import '../components/BlogHeader/BlogHeader.builder';

const defaultDescription = 'This is a blog article';

const defaultTitle = 'Blog Article Title';

function BlogArticleTemplate({ data }) {
  const article = data?.allBuilderModels.blogArticlePage[0]?.content;

  return (
    <>
      <Helmet>
        <title>{(article && article.data.title) || defaultTitle}</title>
        <meta
          name="description"
          content={
            (article && article.data.description) || defaultDescription
          }
        />
      </Helmet>

      <BuilderComponent
        renderLink={Link}
        name="blog-article-page"
        content={article}
      />
    </>
  );
}

export default BlogArticleTemplate;

export const blogArticleQuery = graphql`
  query($path: String!) {
    allBuilderModels {
        blogArticlePage(
            target: { urlPath: $path }
            limit: 1
            options: { cachebust: true }
        ) {
            content
        }
    }
  }
`;
