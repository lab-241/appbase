var translations = {
  en : {
    TITLE: 'APP BASE'
  },
  fr : {
    TITLE: 'APP BASE'
  }
};

angular
.module('appbase.conf')
.config(function ($translateProvider) {
  $translateProvider.translations('en', translations.en);
  $translateProvider.translations('fr', translations.fr);
  $translateProvider.preferredLanguage('en');

  //-- http://angular-translate.github.io/docs/#/guide/19_security
  $translateProvider.useSanitizeValueStrategy('escape');
});
