export const environment = {
  production: false,

  returnParameters() {
    if (location.hostname.indexOf('apg-treasury-dev.lfg') != -1) {
      return this.SERVICE_URL_DEV;
    }
    if (location.hostname.indexOf('apg-treasury-test.lfg') != -1) {
      return this.SERVICE_URL_TEST;
    }
    if (location.hostname.indexOf('apg-treasury.lfg') != -1) {
      return this.SERVICE_URL_PROD;
    }
    if (location.hostname.indexOf('localhost') != -1) {
      return this.SERVICE_URL_LOCAL;
    }
    return this.SERVICE_URL_LOCAL;
  },

  SERVICE_URL_LOCAL: {
    environment: 'LCL',
    apiBaseURL: 'http://localhost:3001/api',
    msalClientId: 'a9c141af-2869-4828-bb17-ca685441db6e',
    msalTenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    redirectUri: 'http://localhost:4200/msal'
  },

  SERVICE_URL_DEV: {
    environment: 'DEV',
    apiBaseURL: 'http://localhost:3000',
    msalClientId: 'a9c141af-2869-4828-bb17-ca685441db6e',
    msalTenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    redirectUri: 'http://localhost:4200'
  },

  SERVICE_URL_TEST: {
    environment: 'TST',
    apiBaseURL: 'http://localhost:3000',
    msalClientId: 'a9c141af-2869-4828-bb17-ca685441db6e',
    msalTenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    redirectUri: 'http://localhost:4200'
  },

  SERVICE_URL_PROD: {
    environment: 'PRD',
    apiBaseURL: 'http://localhost:3000',
    msalClientId: 'a9c141af-2869-4828-bb17-ca685441db6e',
    msalTenantId: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    redirectUri: 'http://localhost:4200'
  },
};


