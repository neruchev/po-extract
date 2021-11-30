import React from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { defaultLocale, locales } from 'src/i18n';

export const IntlProvider: React.FC = ({ children }) => {
  const locale = defaultLocale; // Use automatic language detection

  return (
    <Provider
      key={locale}
      locale={locale}
      messages={locales[locale].dictionary}
      defaultLocale={defaultLocale}
      textComponent={React.Fragment}
    >
      {children}
    </Provider>
  );
};
