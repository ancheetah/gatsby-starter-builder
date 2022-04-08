import * as React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import '@builder.io/widgets';
// TODO: enter your public API key
builder.init('59bb518773c14842921abe05d5e2bee3');

const  FourOhFour = ({modelName}) => {
  const [ notFound, setNotFound ] = React.useState(false);
  // modelName is page by default
  return notFound ? (
    <NotFound /> // Your 404 content
  ) : (
    <BuilderComponent
      model= { modelName || "page" } 
      contentLoaded={content => {
        if (!content) {
          setNotFound(true);
        }
      }}
    >
      <div className="loading">No matching page generated, checking Builder.io ...</div>
    </BuilderComponent>
  )
}

const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

export default FourOhFour;