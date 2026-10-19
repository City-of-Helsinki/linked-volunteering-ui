import type { ThirdPartyLicensesConfig } from '@city-of-helsinki/license-notices';

/**
 * Everything about the third-party license notices that is specific to this
 * repository. The generator itself comes from the license-notices package and
 * knows nothing about this project.
 *
 * No license decisions are needed: every bundled package declares a single
 * SPDX license the notices support.
 */
export const thirdPartyLicensesConfig: ThirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/linked-volunteering-ui',

  // Both ship only styles into the build, which the bundler does not count as
  // code: bootstrap through src/config/theme.scss and its precompiled CSS,
  // open-city-design through the Helsinki partials theme.scss imports.
  sassResolvedPackages: ['bootstrap', 'open-city-design'],
};
