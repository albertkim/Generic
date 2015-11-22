var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var HttpBearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

var authenticationConfiguration = require('../../config/authentication');
var bcrypt = require('bcrypt');
var User = require('../models/User');
var AuthToken = require('../models/AuthToken');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, 
  (email, password, done) => {
    new User({ email: email })
    .fetch()
    .then(user => {
      if (!user) {
        done(null, false, { message: 'Incorrect email.' });
      } else if (bcrypt.compareSync(password, user.get('password'))) {
        done(null, user);
      } else {
        done(null, false, { message: 'Incorrect password.' });
      }
    })
    .catch(error => {
      done(error);
    });
  }
));

passport.use(new HttpBearerStrategy(
  (token, done) => {
    new AuthToken({ token: token })
    .fetch({ withRelated: ['user'] })
    .then(authToken => {
      if (!authToken) {
        done(null, false);
      } else {
        done(null, authToken.related('user'));
      }
    })
    .catch(error => {
      done(error);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: authenticationConfiguration.facebook.clientId,
    clientSecret: authenticationConfiguration.facebook.clientSecret,
    callbackURL: '',
    enableProof: false
  }, (accessToken, refreshToken, profile, done) => {
    new User({ email: profile.email, facebookId: profile.id })
    .save()
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
    });
  }
));

passport.use(new GoogleStrategy({
    consumerKey: authenticationConfiguration.google.consumerKey,
    consumerSecret: authenticationConfiguration.google.consumerSecret,
    callbackURL: ''
  }, (token, tokenSecret, profile, done) => {
    new User({ email: profile.email, googleId: profile.id })
    .save()
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
    });
  }
));

module.exports = passport;