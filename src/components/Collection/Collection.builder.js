import { Builder } from '@builder.io/react';
import { Collection } from './Collection';

Builder.registerComponent(Collection, {
  name: 'Collection',
  // Optionally give a custom icon (image url - ideally a black on transparent bg svg or png)
  image:
    'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fd6d3bc814ffd47b182ec8345cc5438c0',
  inputs: [
    {
      name: 'location',
      type: 'string'
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'footerHeader',
      type: 'string',
      defaultValue: 'Not finding what you’re looking for?'
    },
    {
      name: 'footerSubheader',
      type: 'string',
      defaultValue: 'Visit us in-store to see our full selection.'
    },
    // {
    //   name: 'products',
    //   type: 'reference',
    //   model: 'collection-data'
    // },
    {
      name: 'links',
      type: 'list',
      subFields: [
        {
          name: 'link',
          type: 'reference',
          model: 'links'
        }
      ]
    }
  ]
});
