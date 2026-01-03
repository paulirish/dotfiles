const connect = () => {
  const es = new EventSource('http://localhost:50523/events');

  es.onmessage = async (e) => {
    if (e.data === 'reload') {
      console.log('Reloading extension...');
      const tabs = await chrome.tabs.query({ url: `chrome-extension://${chrome.runtime.id}/*` });
      for (const tab of tabs) {
        // try {
          await chrome.tabs.reload(tab.id);
        // } catch (e) {}
      }
      chrome.runtime.reload();
    }
  };

  es.onerror = () => {
    es.close();
    setTimeout(connect, 5000);
  };
};

chrome.management.getSelf((self) => {
  if (self.installType === 'development') connect();
});
