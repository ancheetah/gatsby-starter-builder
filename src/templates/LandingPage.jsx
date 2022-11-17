import * as React from 'react';
import { graphql } from 'gatsby';
import { BuilderComponent, BuilderContent } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';

const defaultDescription = 'Edit this in your entry for a better SEO';

const defaultTitle = 'Builder: Drag and Drop Page Building for Any Site';

function LandingPageTemplate({ data }) {
  const models = data?.allBuilderModels;
  const landingPage = models.landingPage[0]?.content;

  return (
    <>
      <Helmet>
        <title>{(landingPage && landingPage.data.title) || defaultTitle}</title>
        <meta
          name="description"
          content={
            (landingPage && landingPage.data.description) || defaultDescription
          }
        />
      </Helmet>
      {/** name of the model is landing page, change it if you decided to build*/}
      <BuilderContent content={landingPage} model="landing-page">
        {(data) => {
          console.log("my data: ", data, "my content: ", landingPage);
          return(
            <>
              <h1>Using Landing Page Template</h1>
              <BuilderComponent
                renderLink={Link}
                name="landing-page"
                content={landingPage}
              />
            </>
          );
        }}
      </BuilderContent>
    </>
  );
}

export default LandingPageTemplate;

export const landingPageQuery = graphql`
  query($path: String!) {
    allBuilderModels {
      landingPage(
        target: { urlPath: $path }
        limit: 1,
        options: {cachebust: false},
      ) {
        content
      }
    }
  }
`;
