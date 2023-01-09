import * as React from 'react';
import { graphql } from 'gatsby';
import { BuilderComponent } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';

const defaultDescription = 'Edit this in your entry for a better SEO';

const defaultTitle = 'Builder: Drag and Drop Page Building for Any Site';

function TestPageTemplate({ data }) {
  const models = data?.allBuilderModels;
  const testPage = models?.testPage[0]?.content;

  return (
    <>
        <Helmet>
            <title>{(testPage && testPage.data.title) || defaultTitle}</title>
            <meta
            name="description"
            content={
                (testPage && testPage.data.description) || defaultDescription
            }
            />
        </Helmet>

        <h1>Using Test Page Template</h1>

        <BuilderComponent
            renderLink={Link}
            name="test-page"
            content={testPage}
        />
        
    </>
  );
}

export default TestPageTemplate;

export const testPageQuery = graphql`
  query($path: String!) {
    allBuilderModels {
      testPage(
        target: { urlPath: $path }
        limit: 1,
        options: {cachebust: true},
      ) {
        content
      }
    }
  }
`;
