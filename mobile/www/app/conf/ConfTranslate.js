var translations = {
  en : {
    TITLE: 'APP BASE',
    AUTH_REQUIRED: 'Authentication required',
    CANCEL:'Cancel',
    SAVE:'Save',
    CLOSE: 'Close',
    ERROR_OCCURS_OP: 'An error occurs during operation',

    //LEFT MENU
    HOME: 'Home',
    LOGOUT: 'Logout',
    FAVORITES: 'Favorites',
    ABOUT: 'About',

    // LOGIN
    LOGIN_VIEW_TITLE: 'Login',
    LOGIN: 'Login',
    LOGIN_SUCCES : 'Login success',
    REGISTER_SUCCESS : 'Register success',
    EMAIL:'Email',
    PASSWORD:'Password',
    CREATE_ACCOUNT:'Create an account',
    LOGIN_FAILED:'Login failed',
    CHECK_CREDENTIALS:'Please check your credentials!',

    // REGISTER
    REGISTER_VIEW_TITLE: 'Register',
    USERNAME:'Username',
    SUBSCRIBE_NEWSLETTER:'Subscribe to newsletter',
    REGISTER:'Register',
    ALREADY_HAVE_ACCOUNT: 'Compte existant',
    REGISTER_FAILED: 'Register failed!',
    REGISTERING_ERROR: 'Error occurs during registering process',

    // RESET
    FORGOTTEN_PASSWORD: 'Forgotten password',
    RESET_PASSWORD_VIEW_TITLE: 'Reset Password',
    RESET_PASSWORD: 'Reset Password',
    RESET_FAILED: 'Reset error',
    RESET_ERROR: 'An error occured on password reset. Please try again.',

    // SHOP LIST
    SHOP_LIST_VIEW_TITLE: 'Shops',
    NO_RESULT:'No result',
    NO_FAVIRITE_SHOP: 'No favorite shop',

    // SHOP DETAIL
    SHOP_DETAIL_VIEW_TITLE: 'Shop',
    LAST_REVIEWS: 'Last reviews',
    NO_REVIEWS: 'No review yet ...',
    ADD_FIRST_REVIEW: 'Be the first to review',
    ENTER_REVIEW: 'Enter your review',
    REMAIN_RESPECTFUL: 'Please remain respectful',
    RATING_REQUIRED: 'Rating required',
    REVIEW_ADDED_SUCCESSFULLY: 'Review Added Successfully',
    REVIEW_COMMENTS_PLACEHOLDER: 'Write your comments ...',
    MORE_REVIEWS: 'More reviews',
    REVIEWS: 'Reviews',

    // SHOP FAVORITES
    SHOP_FAVORITE_VIEW_TITLE: 'Favorites',
    SHOP_FAVORITE_ADDED: 'Favorite shop successfully added',
    SHOP_FAVORITE_REMOVED: 'Favorite shop successfully removed'
  },
  fr : {
    TITLE: 'APP BASE',
    AUTH_REQUIRED: 'Connexion requise',
    CANCEL:'Annuler',
    SAVE:'Enregistrer',
    CLOSE: 'Fermer',

    // Erros
    ERROR_OCCURS_OP: 'Une erreur s\'est produite pendant l\'opération',

    //LEFT MENU
    HOME: 'Accueil',
    LOGOUT: 'Déconnexion',
    FAVORITES: 'Favoris',
    ABOUT: 'A propos',

    // LOGIN
    LOGIN_VIEW_TITLE: 'Login',
    LOGIN: 'Login',
    LOGIN_SUCCES: 'Connexion réussie',
    REGISTER_SUCCESS : 'Enregistrement réussit',
    EMAIL:'Email',
    PASSWORD:'Password',
    CREATE_ACCOUNT:'Créer un compte',
    LOGIN_FAILED:'Identifiants incorrectes',
    CHECK_CREDENTIALS:'Vérifiez vos identifiants',

    // REGISTER
    REGISTER_VIEW_TITLE: 'Créer un compte',
    USERNAME:'Identifiant',
    SUBSCRIBE_NEWSLETTER:'Inscription à la newsletter',
    REGISTER: 'Enregistrer',
    ALREADY_HAVE_ACCOUNT: 'Déjà inscrit',
    REGISTER_FAILED: 'Inscription en erreur',
    REGISTERING_ERROR: 'Une erreur est survenue durant l\' inscription',

    // RESET
    FORGOTTEN_PASSWORD: 'Mot de passe oublié',
    RESET_PASSWORD_VIEW_TITLE: 'Réinitialisation de mot de passe',
    RESET_PASSWORD: 'Réinitialiser',
    RESET_FAILED: 'Réinitialisation en erreur',
    RESET_ERROR: 'Une erreur est survenue durant la réinitialiation du mot de passe. Merci de réessayer ultérieurement.',

    //SHOP LIST
    SHOP_LIST_VIEW_TITLE: 'Liste des enseignes',
    NO_RESULT:'Aucun résultat',
    NO_FAVIRITE_SHOP: 'Aucune enseigne favorite',

    // SHOP DETAIL
    SHOP_DETAIL_VIEW_TITLE: 'Enseigne',
    LAST_REVIEWS: 'Derniers avis',
    NO_REVIEWS: 'Aucun avis pour l\'instant ...',
    ADD_FIRST_REVIEW:'Soyez le premier à donner votre avis',
    ENTER_REVIEW: 'Donnez votre avis',
    REMAIN_RESPECTFUL: 'Merci de rester courtois',
    RATING_REQUIRED: 'Renseignez une note',
    REVIEW_ADDED_SUCCESSFULLY: 'Avis rajouté avec succès',
    REVIEW_COMMENTS_PLACEHOLDER: 'Saisissez vos commentaires ...',
    MORE_REVIEWS: 'Avis supplémentaires',
    REVIEWS: 'Avis',

    // SHOP FAVORITE
    SHOP_FAVORITE_VIEW_TITLE: 'Enseignes favorites',
    SHOP_FAVORITE_ADDED: 'Enseigne favorite ajoutée avec succès',
    SHOP_FAVORITE_REMOVED: 'Enseigne supprimée avec succès'
  }
};

angular
.module('appbase.conf')
.config(function ($translateProvider) {
  $translateProvider.translations('en', translations.en);
  $translateProvider.translations('fr', translations.fr);
  $translateProvider.preferredLanguage('fr');

  //-- http://angular-translate.github.io/docs/#/guide/19_security
  $translateProvider.useSanitizeValueStrategy('escape');
});
