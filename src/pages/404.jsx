import * as React from 'react';
import { builder } from '@builder.io/react';
import '@builder.io/widgets';
import LandingPageTemplate from '../templates/LandingPage';
import TestPageTemplate from '../templates/TestPage';

// TODO: enter your public API key
builder.init('59bb518773c14842921abe05d5e2bee3');

const Dev404 = () => {
  const [notFound, setNotFound] = React.useState(false);
  const currentModel = builder.editingModel;
  
  return notFound ? (
    <NotFound /> // Your 404 content
  ) : (
    currentModel === 'test-page' ? 
    <TestPageTemplate setNotFound={setNotFound}/> 
    : <LandingPageTemplate  setNotFound={setNotFound}/>
  );
};

const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

export default Dev404;