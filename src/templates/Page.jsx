import * as React from 'react';
import { graphql } from 'gatsby';
import { Builder, BuilderComponent } from '@builder.io/react';
import { Helmet } from 'react-helmet';
import Link from '../components/Link/Link';
import {FourOhFour} from '../pages/404';
const defaultDescription = 'Edit this in your entry for a better SEO';

const defaultTitle = 'Builder: Drag and Drop Page Building for Any Site';

function PageTemplate({ data }) {
  const models = data?.allBuilderModels;
  const landingPage = models.page[0]?.content;

  if (!Builder.isEditing && !Builder.isPreviewing && !landingPage) {
    return (
      <div>
        <h1>Page</h1>
        <FourOhFour modelName="page"/>
      </div>
    );
  }
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
      <h1>Page Model</h1>
      <BuilderComponent
        renderLink={Link}
        name="page"
        content={landingPage}
      />
    </>
  );
}

export default PageTemplate;

export const pageQuery = graphql`
  query($path: String!) {
    allBuilderModels {
      page(
        target: { urlPath: $path }
        limit: 1
        options: { cachebust: true }
      ) {
        content
      }
    }
  }
`;
