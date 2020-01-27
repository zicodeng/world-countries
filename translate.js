import translate from 'translate';
import fs from 'fs';

import { WORLD_COUNTRIES } from './index.js';

(async () => {
  translate.engine = 'yandex';
  translate.key = process.env.TRANSLATE_KEY;

  const result = await Promise.all(
    WORLD_COUNTRIES.map(async country => {
      country.translation = await translate(country.name, 'chinese');
      return country;
    }),
  );

  fs.writeFileSync('./tmp.js', JSON.stringify(result));
})();
