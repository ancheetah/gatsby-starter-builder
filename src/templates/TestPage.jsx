import * as React from 'react';
import { graphql } from 'gatsby';
import { BuilderComponent, BuilderContent, useIsPreviewing } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';

const defaultDescription = 'Edit this in your entry for a better SEO';

const defaultTitle = 'Builder: Drag and Drop Page Building for Any Site';

function TestPageTemplate({ data, setNotFound }) {
  const models = data?.allBuilderModels;
  const testPage = models?.testPage[0]?.content;
  const isPreviewing = useIsPreviewing();

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
      {/** name of the model is test page, change it if you decided to build*/}
      <BuilderContent content={testPage} model="test-page">
        {(data) => {
          console.log("my data: ", data, "my content: ", testPage);
          return(
            <>
              <h1>Using Test Page Template</h1>
              { 
              testPage ? 
                <BuilderComponent
                    renderLink={Link}
                    name="test-page"
                    content={testPage}
                />
              :
                <BuilderComponent
                  renderLink={Link}
                  name="test-page"
                  contentLoaded={(content) => {
                    if (!content && !isPreviewing) {
                      setNotFound(true);
                    }
                  }}
                >
                <div className="loading">
                    No matching page generated, checking Builder.io ...
                </div>
                </BuilderComponent>
            }
            </>
          );
        }}
      </BuilderContent>
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
