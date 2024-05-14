import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.playersPage]: `${config.UI_URL_PREFIX}/${pages.playersPage}`,
      [pages.playerInfPage]: `${config.UI_URL_PREFIX}/${pages.playerInfPage}`

};

export default result;
