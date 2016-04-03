(() => {
  'use strict';

  const AppConstants = require('../constants/AppConstants'),
    BaseActions  = require('./BaseActions');

  module.exports = {
    login: (user) => {
      BaseActions.post('/users/login', user, AppConstants.USER_LOGIN);
    },

    logout: (data, token) => {
      BaseActions.post('/users/logout', data, AppConstants.USER_LOGOUT, token);
    },

    signup: (user) => {
      BaseActions.post('/users', user, AppConstants.USER_SIGNUP);
    },

    update: (userID, user, token) => {
      BaseActions.put(`/users/${userID}`, user, AppConstants.UPDATE_USER, token);
    },

    getSession: (token) => {
      BaseActions.get('/users/session', AppConstants.USER_SESSION, token);
    },

    fetchAllUsers: (token) => {
      BaseActions.get('/users', AppConstants.GET_USERS, token);
    }
  };
})();