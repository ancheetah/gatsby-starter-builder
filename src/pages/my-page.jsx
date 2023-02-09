import { BuilderComponent } from '@builder.io/react'
import React from 'react'
import { graphql } from 'gatsby'

const MyPage = ({data}) => {
    // const myContent = data.allBuilderModels.figure[0].content;
    // console.log(myContent);
    return <div><BuilderComponent model="figure"/></div>
    
}

export default MyPage

export const query = graphql`
  query {
    allBuilderModels {
      figure(limit: 1, options: { cachebust: true }) {
        content
      }
    }
  }
`
