export enum HOST {
  TEST = 'test',
  UAT = 'uat',
  PRE = 'pre',
  PROD = 'prod'
}
export const globals = {
  mock: HOST.TEST,
  host: {
    test: 'https://test-hm.health.ikang.com/hmapi',
    uat: 'https://uat-hm.health.ikang.com/hmapi',
    pre: 'https://hm.health.ikang.com/hmapi',
    prod: 'https://hm.health.ikang.com/hmapi'
  },
  cookieExpires: 1
}
