import * as React from 'react';
import { builder } from '@builder.io/react';
import LandingPageTemplate from '../templates/LandingPage';
import TestPageTemplate from '../templates/TestPage';

const Dev404 = () => {
  const currentModel = builder.editingModel;

  if (currentModel === 'test-page') {
    return <TestPageTemplate/> 
  }
  if (currentModel === 'landing-page') {
    return <LandingPageTemplate/>
  }
 
  return <NotFound/>
  
};

const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

export default Dev404;