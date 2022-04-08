exports.onCreatePage = ({ page, actions }, options) => {
    const { deletePage, createPage } = actions;
    if (page.path === '/dev-404-page/') {
        deletePage(page);
        createPage({
          ...page,
          component: path.resolve('./pages/404.jsx'),
        });
      }
  }