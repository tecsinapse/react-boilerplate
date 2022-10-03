import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga4';

export const appHistory = createBrowserHistory();
appHistory.listen((location, action) => {
  ReactGA.send({ hitType: 'pageview', path: location.pathname });
});
