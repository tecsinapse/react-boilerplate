import { createBrowserHistory } from 'history';
import { pageview } from 'react-ga';

export const appHistory = createBrowserHistory();
appHistory.listen((location, action) => {
  pageview(location.pathname);
});
