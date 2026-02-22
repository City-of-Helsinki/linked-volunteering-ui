# Changelog

## [0.7.2](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.7.1...linked-volunteering-ui-v0.7.2) (2026-02-22)


### Dependencies

* Upgrade @playwright/test to 1.58.2 Refs: RATY-299 ([dd67d43](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/dd67d437e3f0eeb442645c672ce1dd3f80943215))
* Upgrade react-router to 6.30.3 Refs: RATY-299 ([d9428e0](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d9428e01bff4ac720276d6f9e039d1a176c236d8))

## [0.7.1](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.7.0...linked-volunteering-ui-v0.7.1) (2026-01-29)


### Dependencies

* Bump @babel/runtime from 7.24.5 to 7.28.6 ([#281](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/281)) ([23de027](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/23de0276494fc981f4813afd8a041202f6dec522))
* Bump diff from 4.0.2 to 4.0.4 ([#283](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/283)) ([166f692](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/166f69200d8af5e964bbd9536570baea9b475e37))
* Bump lodash from 4.17.21 to 4.17.23 ([#285](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/285)) ([015032d](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/015032d263c638ecb264fcda08a39e7e32535863))
* Bump lodash-es from 4.17.21 to 4.17.23 ([#284](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/284)) ([31a4ff7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/31a4ff716ae5cf8fac29d396d3b1c331c0fb8bb2))

## [0.7.0](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.6.1...linked-volunteering-ui-v0.7.0) (2026-01-23)


### Features

* Add print button for modify event page ([#264](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/264)) ([7324827](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/73248277fb7ad48dae4a4ef857f5744c69db61da))
* Add restraint on max length of event ([e757721](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/e757721f899308c66976a0010e90e4b5fdd5e0e8))
* Add toggle for past events ([b679f17](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b679f176d1bf7f6853c7fc34c0990f6b6ad5ba89))
* Add toggle to show and hide past events ([01b8bf9](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/01b8bf9f5780d5d68317908e5c84e96c3c0ddea0))
* Force a scrollbar to be present ([#265](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/265)) ([978e09a](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/978e09aaf56106a516f075fbea1fb68fc1218d70))
* Migrate to maptiles and support sv map localization ([dd1a026](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/dd1a0264b50007c521672599dec86b42bf953392))
* Pins for existing events ([#272](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/272)) ([6682b24](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/6682b24fe72337e47009529856d27f08ff0edbe7))
* Ps 217 earliest booking date ([#260](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/260)) ([59f42b3](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/59f42b3cfca2341f167fd3d506b5c6a17d8ab5e3))
* Ps 218 starting date max ([#268](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/268)) ([d3e7cf9](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d3e7cf99d1026ab29d4cfcee90192aeea912eb80))
* Ps 225 area to admin list ([#262](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/262)) ([d3db68b](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d3db68b5c7ca15aa3174386a0ace0a1b0049e782))
* Ps-217 earliest booking date ([#260](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/260)) ([53127e7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/53127e7889b849a74bb7cda945acbb6e619f4539))
* Ps-218 starting max date cap to max 6 months ([1cbbaa7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/1cbbaa7d734d3daab6052464d73f40273dc76f05))
* Remove reset button from EventPage ([#267](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/267)) ([cbc8197](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/cbc81971ce89033b5a044391101bd8b4436a343d))
* **ui:** Implement auto-loading for event admin panel ([165b407](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/165b40733d182631796627db0e58fe8812ed8461))
* **ui:** Streamline address selection ([33e99fa](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/33e99faa34dd18788060bc5db2d9144000566c3a))
* Yarn install hardening RATY-280 ([e9cbc96](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/e9cbc96f2491230a158afd72847222ae9ad0256f))


### Bug Fixes

* Fix autosuggest component typescript compilation error ([1c95ab8](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/1c95ab8888fd8cc1a9263cb40e58ba5cf6b85cdd))
* Modify max delta for start_date to 3 months ([5dcda9b](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/5dcda9bd50dd5e5af2c610e288003f0d731874c4))


### Dependencies

* Bump glob from 10.4.5 to 10.5.0 ([c9593b7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/c9593b7384b959c4633c2a81baee3dc8912dc7c9))
* Bump js-yaml from 4.1.0 to 4.1.1 ([f7f6701](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/f7f6701cd0a610f5c4752e4feb96bd455f71d7c1))
* Bump react-router from 6.23.0 to 6.30.2 ([da7a37c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/da7a37ccd41be7e7354f1be40b68d4b4a1e9f7d8))
* Bump vite from 6.3.6 to 6.4.1 ([97061bb](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/97061bb9326c4f9424d74fce76a90e98e4a0eeab))
* Upgrade eslint to 9.39.1 ([75f9471](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/75f94712ef4b0582ded7c8f7974d12fa77ada556))
* Upgrade vite-plugin-svgr to 4.5.0 ([be1713c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/be1713cebf2e5e2fc2ad90ee0d398c08cee6b89b))
* Upgrade vitest to 4.0.15 ([a684476](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/a684476f147142f57782b5fad7725326fb9f0180))
* Uprade commitlint to 20.2.0 ([007f3b4](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/007f3b4d651846846eae581aee178d530918d7ac))

## [0.6.1](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.6.0...linked-volunteering-ui-v0.6.1) (2025-10-08)


### Bug Fixes

* Stricter yarn configs ([7e971be](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/7e971be5f3611e3a2b7c67c8c305fe2cb712aa89))

## [0.6.0](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.5.2...linked-volunteering-ui-v0.6.0) (2025-09-11)


### Features

* Updated accessibility statement PS-209 ([#255](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/255)) ([1ab079c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/1ab079c677224bb63221a1910de899ddffe0f57a))


### Dependencies

* Bump @eslint/plugin-kit from 0.3.2 to 0.3.4 ([1d06cb6](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/1d06cb6b437c1a0746168c6c371a043d6a56c7d5))
* Bump vite from 6.3.4 to 6.3.6 ([6707b58](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/6707b58300868e62cca31c4e65243d03eef6f42c))
* Eslint to 9.35.0 ([37ae841](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/37ae8412283de0b26e1ca2a3998fc928f08fe5e0))

## [0.5.2](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.5.1...linked-volunteering-ui-v0.5.2) (2025-08-08)


### Bug Fixes

* Upgrade jsdom PS-186 ([6513b75](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/6513b75e720e6048addc5234cf32e3605f93306f))


### Dependencies

* Upgrade eslint to 9.29.0 PS-186 ([b798dd9](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b798dd99b9056eb8bc66107a040e0c25fc5fcbd8))

## [0.5.1](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.5.0...linked-volunteering-ui-v0.5.1) (2025-05-30)


### Bug Fixes

* AutoSuggest input missing key PS-189 ([aad30d0](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/aad30d04f5d0a53bb3baed18aa702f80cc694526))


### Dependencies

* Fix @babel/core incompability PS-189 ([02be1c1](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/02be1c1c4e9fbdfd8bdd29c65b8dac270a6b1294))
* Remove react-is PS-189 ([ad94765](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/ad94765b1312d492c4ece6ab63ad9f4222d16e28))
* Remove unnecessary packages PS-189 ([9531c1e](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/9531c1e1535749d79781b4976dd2491439defb48))
* Replace react-helmet with react-helmet-async PS-189 ([7d55846](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/7d55846bd05d2bc2540469a52bcf284305dcc357))
* Upgrade @testing-library/react to 15.0.7 ([5a218c7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/5a218c7bd5bfa7b5c70ebf889fb7020997a18498))
* Upgrade react to 18.2.0, testing library to 13.4.0 PS-189 ([4f49c0a](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/4f49c0aee0a7d8f96e936dd378f110c137caf0e0))
* Upgrade react-intl PS-189 ([73d0a64](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/73d0a648b477be2dc101258307b977fb3d8e1ff4))
* Upgrade react-redux PS-189 ([df21c2c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/df21c2ca403069697d9213c4589fe26720d448d4))
* Upgrade styled-components PS-189 ([3c8e4e1](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/3c8e4e13a5531b5372b45d1e5ef3ab6000a4a936))

## [0.5.0](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.10...linked-volunteering-ui-v0.5.0) (2025-05-05)


### Features

* Upgrade to node v22 ([#241](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/241)) ([2c81114](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/2c81114f4c11e219d7eb9fc17993f5fa4c4f2f21))


### Dependencies

* Bump vite from 6.2.5 to 6.2.6 ([#238](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/238)) ([7d3b558](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/7d3b55875d2c91d19ef11657122a4d762b96485e))
* Bump vite from 6.3.3 to 6.3.4 ([#242](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/242)) ([eff6922](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/eff6922afd8cd93f45ec113ab237c1d9fbae03ee))

## [0.4.10](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.9...linked-volunteering-ui-v0.4.10) (2025-04-10)


### Bug Fixes

* Event ordering resetting on each loaded event slice ([#236](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/236)) ([70ad76c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/70ad76c6cb7cfb3655d42a392960a92441c2f773))

## [0.4.9](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.8...linked-volunteering-ui-v0.4.9) (2025-04-10)


### Bug Fixes

* Sorting according to the selected ordering ([#235](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/235)) ([de5f361](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/de5f36176357d86c344038648fc2810bdc8417d6))


### Dependencies

* Bump vite from 6.2.3 to 6.2.4 ([#232](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/232)) ([a361eb2](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/a361eb2a1f657450f7357de44dafa2d7233e5d39))
* Bump vite from 6.2.4 to 6.2.5 ([#234](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/234)) ([de60b7a](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/de60b7aa388530ce7db3f101d249b19538800263))

## [0.4.8](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.7...linked-volunteering-ui-v0.4.8) (2025-03-27)


### Bug Fixes

* Neighborhood field selector and styles PS-188 ([7cb1923](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/7cb19238da7acc917853b3f129884c4ff733cca4))
* SubmittedEvent event undefined PS-188 ([d3cf926](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d3cf926febda325aadefa4f63c3e4f9ff18e3205))

## [0.4.7](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.6...linked-volunteering-ui-v0.4.7) (2025-03-27)


### Dependencies

* Replace CRA with Vite PS-186 ([b624fa0](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b624fa062713cf51ecf71b388d1023dbf4e60358))

## [0.4.6](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.5...linked-volunteering-ui-v0.4.6) (2025-03-25)


### Dependencies

* Bump @babel/helpers from 7.24.5 to 7.26.10 ([d19c36b](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d19c36b705ddafdd36874920291a5f0a047ded4c))


### Miscellaneous Chores

* Remove axios ([9b37756](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/9b37756e25e0032ca05cecdff246f2756ec9af58))

## [0.4.5](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.4...linked-volunteering-ui-v0.4.5) (2025-03-24)


### Bug Fixes

* Manage link for contactors ([#222](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/222)) PS-185 ([57de5aa](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/57de5aaaa7140605ea39476026201c750e817d98))

## [0.4.4](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.3...linked-volunteering-ui-v0.4.4) (2025-03-10)


### Bug Fixes

* Fix next page button ([ca8860f](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/ca8860fb47424c0d20199f8ee6a7afec8ff4a6e1))

## [0.4.3](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.2...linked-volunteering-ui-v0.4.3) (2025-02-26)


### Bug Fixes

* Routing when user has logged out ([#216](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/216)) ([6128a69](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/6128a69aa8e86aee7acca791ae9c1700df7cb3d7))

## [0.4.2](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.1...linked-volunteering-ui-v0.4.2) (2025-01-21)


### Bug Fixes

* Allowed user actions fixes PS-174 ([9c74001](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/9c74001c2bf469c2f0c617748285f818f76df866))

## [0.4.1](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.4.0...linked-volunteering-ui-v0.4.1) (2025-01-13)


### Dependencies

* Bump axios from 0.19.2 to 0.28.0 ([#209](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/209)) ([ec07eb6](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/ec07eb6ab77c2a8e34813a8e4ae57236009f0a42))
* Bump braces from 3.0.2 to 3.0.3 ([#199](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/199)) ([d3d5eac](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/d3d5eaca1c62317b926fc872a9cb8407ba84789e))
* Bump http-proxy-middleware from 2.0.6 to 2.0.7 ([#204](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/204)) ([43d6483](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/43d648340fd3e5263aea78cb1e21e51281906c4f))
* Bump micromatch from 4.0.5 to 4.0.8 ([#195](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/195)) ([c1fbb0c](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/c1fbb0c77bc29541a7e97d011bae7810636d857d))
* Bump nanoid from 3.3.7 to 3.3.8 ([#211](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/211)) ([61d67d7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/61d67d7c81b3bd2ab66ffc37b4c01a5bdd370dd3))
* Bump rollup from 2.79.1 to 2.79.2 ([#201](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/201)) ([185fe96](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/185fe96340aa2d64de230bb2954b48b79a0bec90))
* Bump webpack from 5.91.0 to 5.97.1 ([#213](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/213)) ([1d402bd](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/1d402bd4777dc11b46f3dd379621b878d2cb75be))

## [0.4.0](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.3.0...linked-volunteering-ui-v0.4.0) (2025-01-06)


### Features

* Block reject event if is_official false PS-161 ([b405133](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b405133432caccbb618247eeb3c999bd77f885b3))
* Hds login PS-157 ([b3d8ae0](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b3d8ae019147f85713dcecd0606fcb6fafad3c12))


### Dependencies

* Upgrade hds to 4.0.0 PS-157 ([b1dd104](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/b1dd104d2c407ab823371d1556c5f8a3f0c549bf))

## [0.3.0](https://github.com/City-of-Helsinki/linked-volunteering-ui/compare/linked-volunteering-ui-v0.2.7...linked-volunteering-ui-v0.3.0) (2024-05-28)


### Features

* Allow zero litter bags and pickers ([2d972d7](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/2d972d70f24047d1809f1951147fc1e4881f2580))
* Do PUIS-79 ([#187](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/187)) ([15911e0](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/15911e08732c99ab684385c27904abc5a3719716))
* Use address search from our backend instead of Digitransit API ([95e8d89](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/95e8d89b47fb78077961800270afc9b5658f8c27))


### Bug Fixes

* Fixed broken links ([#188](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/188)) ([63fd7fc](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/63fd7fce954aa315f75ae9f50cf4f2e5ec45324a))
* Fixed some broken stuff that was hindering testing ([0d4aa11](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/0d4aa11970bee5e964d357e4c636c7c2554292bf))
* Missed one spot where there were broken links ([#191](https://github.com/City-of-Helsinki/linked-volunteering-ui/issues/191)) ([01a33f2](https://github.com/City-of-Helsinki/linked-volunteering-ui/commit/01a33f2f75bd35027aa58e2d7b96327dd1e7dddb))
