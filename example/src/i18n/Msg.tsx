import React from 'react';
import { FormattedMessage, IntlShape as IIntlShape } from 'react-intl';

import { DictionaryKey } from 'src/i18n';

export type IntlShape = IIntlShape;

export interface MsgProps {
  id: DictionaryKey;
  values?: Record<string, React.ReactNode>;
}

/**
 * Type-safe intl.formatMessage, uses a TypeScript to verify that the key
 * actually exists
 *
 * @example msg(intl, { id: 'examples.flat.example.2', values: { foo: 'bar' }})
 */
export const msg = (intl: IntlShape, { id, values }: MsgProps): string =>
  intl.formatMessage({ id }, values as never);

/**
 * Type-safe FormattedMessage, uses a TypeScript to verify that the key
 * actually exists
 *
 * @example <Msg id="examples.flat.example.2" values={{ foo: 'bar' }} />
 */
export const Msg: React.FC<MsgProps> = ({ id, values }) => (
  <FormattedMessage id={id} values={values} />
);
