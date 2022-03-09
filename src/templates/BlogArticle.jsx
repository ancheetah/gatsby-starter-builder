import React from 'react';
import { graphql } from 'gatsby';
import { BuilderComponent, Builder, Image } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';

const defaultDescription = 'This is a blog article';
const defaultTitle = 'Blog Article Title';

function BlogArticleTemplate({ data }) {
  const blogData = data?.allBuilderModels.blogArticlePage[0];
  const article = blogData?.content;
  const blogFields = blogData?.data;
  
  const BlogHeader = props => {
    return (
      <div>
        <h2>{blogFields.title}</h2>
        <p>By {blogFields.author}</p>
        <Image image={props.image} />
      </div>
    );
  };
  
  Builder.registerComponent(BlogHeader, {
    name: 'Blog Header',
    inputs: [
      {
        name: 'image',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
        required: true,
        defaultValue:
          'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F52dcecf48f9c48cc8ddd8f81fec63236'
      },
    ]
  });

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
            data {
              title
              author
            }
        }
    }
  }
`;
