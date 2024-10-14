(async () => {
  const app = document.createElement('div');
  app.id = 'side-table-of-contents';
  document.body.append(app);

  const src = chrome.runtime.getURL('/index.js');
  await import(src);
})();
