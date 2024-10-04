import { defineFeature, loadFeature } from 'jest-cucumber';

import { FeatureAppFilter } from '../types/FeatureAppFilter';
import { ArrayTail } from 'type-fest';

export function testRegistrationFeature(
  appFilter: FeatureAppFilter,
  ...rest: ArrayTail<Parameters<typeof defineFeature>>
) {
  defineFeature(
    loadFeature('registration.feature', {
      loadRelativePath: true,
      // tagFilter: appFilter,
    }),
    ...rest
  );
}

type AlreadyCreatedAccount = {
  email: string;
};

export type AlreadyCreatedAccountTable = AlreadyCreatedAccount[];
