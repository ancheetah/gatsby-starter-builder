import React, { useState, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { BuilderComponent, builder } from '@builder.io/react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../components/Link/Link';
import '../builder-settings';
import theme from '../theme';

const useStyles = makeStyles(them => ({
  root: {
    padding: `0 ${theme.spacing(1)}`
  },
  announcementBar: {},
  header: {},
  footer: {},
  content: {}
}));

const query = graphql`
  query {
    allBuilderModels {
      header(limit: 1) {
        content
      }
      footer(limit: 1) {
        content
      }
    }
  }
`;

function PageLayout({ children }) {
  const classes = useStyles();
  const [announcement, setAnnouncement] = useState()

  useEffect(() => {
    (async function fetchContent() {
      const announcementContent = await builder
        .get('announcement-bar', {
          cacheSeconds: 120
        })
        .toPromise()
      setAnnouncement(announcementContent)
    })()
  }, [])

  return (
    <StaticQuery query={query}>
      {data => {
        const models = data.allBuilderModels;
        const header = models.header[0].content;
        const footer = models.footer[0].content;
        return (
          <div className={classes.root}>
            <div className={classes.announcementBar}>
              <BuilderComponent
                renderLink={Link}
                name="announcement-bar"
                content={announcement}
              />
            </div>
            <div className={classes.header}>
              <BuilderComponent
                renderLink={Link}
                name="header"
                content={header}
              />
            </div>
            <div className={classes.content}>{children}</div>
            <div className={classes.footer}>
              <BuilderComponent
                renderLink={Link}
                name="footer"
                content={footer}
              />
            </div>
          </div>
        );
      }}
    </StaticQuery>
  );
}

export default PageLayout;
