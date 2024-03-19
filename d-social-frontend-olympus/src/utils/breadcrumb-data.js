const breadcrumbData = {
  page: '',
  breadcrumb: [],
};

export function dynamicBreadcrumb(path) {
  const pathList = path.split('/');
  let href = '/';
  breadcrumbData.breadcrumb = [];
  breadcrumbData.page = pathList[pathList.length - 1];
  pathList.forEach(function (eachPath) {
    if (eachPath !== '') {
      href += `${eachPath}/`;
      breadcrumbData.breadcrumb.push({
        title: eachPath,
        url: href,
        active: eachPath === pathList[pathList.length - 1] ? true : false,
      });
    }
  });

  console.log('_________________________Debug', breadcrumbData);

  return breadcrumbData;
}
