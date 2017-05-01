"use strict";
app.controller('authenticationCtrl', function($scope, appConst, randomString, $location, $sce, $translate, socialLogin, checkCustomer, $ionicModal, stripe, $cordovaOauth, $ionicHistory, $rootScope, $timeout, $ionicPopup, Services, $localStorage, $ionicLoading) {
    $scope.registration = {};
    $scope.showEmail = function() {
        $scope.actInactEmail = "active";
        $scope.actInactSms = "";
        $scope.emailTab = true;
        $scope.smsTab = false;
    }
    $scope.showSms = function() {
        $scope.actInactSms = "active";
        $scope.actInactEmail = "";
        $scope.emailTab = false;
        $scope.smsTab = true;
    }
    $scope.signUp = function() {
        
     var str = randomString(5);
     $rootScope.rdmString = str;
        var registrationScope = angular.element(document.getElementById('registrationPage')).scope();
        var extraData = {
            platform: ionic.Platform.platform(),
            device_id: localStorage.getItem("registrationId"),
            registered_by: 'mobile',
            password: '12345',
            otp_string: str
        };
        angular.extend(registrationScope.registration, extraData);
        $ionicLoading.show();
        Services.forgotPasswordService(registrationScope.registration, appConst.services.signup).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 2) {       // SMS
                 $localStorage.registrationOtp = registrationScope.registration.otp_string;
                 $localStorage.registrationEmail = response[0].data.email;
                 $location.path('/otpForm');
            }else if (response[1].response.status == 1) {      // Email
                  var loginScope = angular.element(document.getElementById('loginPage')).scope();
                  loginScope.login.email = registrationScope.registration.identity;
                  loginScope.login.password = registrationScope.registration.password;
                  window.plugins.toast.showLongBottom(response[1].response.message);
                  $location.path(appConst.path.login);
            }else {
                window.plugins.toast.showLongBottom(response[1].response.message);
            }
        });
        $scope.signIn();$scope.signIn();
    }
    $scope.Otp = { code: '', retrievedCode: '' };
        $scope.submitOTP = function() {
           if ($scope.Otp.code == $localStorage.registrationOtp) {
                var params = {
                    email: $localStorage.registrationEmail,
                }

                if($rootScope.loginThrough === 'newPassword'){
                    $location.path("/resetPassword");
                }else{
                $ionicLoading.show();
                Services.forgotPasswordService(params, 'account_activate').then(function(response) {
                    $ionicLoading.hide();
                    if (response[1].response.status == 1) {
                        delete $localStorage.registrationOtp;
                        delete $localStorage.registrationEmail;
                        if (response[0].data[0].id != "") {
                            $localStorage.userProfile = {};
                            angular.extend($localStorage.userProfile, response[0].data[0]);
                            $rootScope.loginThrough = 'dashboard';
                            $scope.stripeAuth();
                            $scope.loginRedirect();
                        } else {
                            window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                        }
                    } else {
                        window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                    }
                });
                }
            } else {
                window.plugins.toast.show($translate.instant("OTPCodeDoesNotMatchPleaseCheckOnce"), 'short', 'bottom');
            }
        }
        $scope.goBackHistory = function(){
            $ionicHistory.goBack();
        }
    $scope.openRegistrationPage = function() {
        $location.path(appConst.path.registration);
    }
    $scope.login = {};
    $scope.signIn = function() {
var registrationScope = angular.element(document.getElementById('registrationPage')).scope();
        var extraData = {
            platform: ionic.Platform.platform(),
            device_id: localStorage.getItem("registrationId"),
            registered_by: 'mobile',
            password: '12345',
        };
         angular.extend(registrationScope.registration, extraData);
        var loginScope = angular.element(document.getElementById('registrationPage')).scope();
        $ionicLoading.show();
        Services.forgotPasswordService(registrationScope.registration, appConst.services.login).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                if (response[0].data[0].id != "") {
                    $localStorage.userProfile = {};
                    angular.extend($localStorage.userProfile, response[0].data[0]);
                    $rootScope.loginThrough = 'dashboard';
                    $scope.loginRedirect();
                   // $scope.stripeAuth();

                } else {
                    window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                }
            } else {
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
            }
        });
    }
    $scope.loginRedirect = function() {
        if ($rootScope.loginThrough === 'order') {
            $location.path(appConst.path.home_delivery);
        } else if ($rootScope.loginThrough === 'orderHistory') {
            $location.path(appConst.path.orders_history);
        } else if($rootScope.loginThrough === 'newPassword'){
            $location.path("/resetPassword");
        }else if($rootScope.loginThrough === 'dashboard'){
            $location.path(appConst.path.dashboard);
        }
    }
    $scope.stripeAuth = function() {
        stripe.customersList().then(function(data) {
            var index = checkCustomer.isCustomerExist(data.data, $localStorage.userProfile.email);
            if (index != -1) {
                $localStorage.stripeAccountDetails = {
                    id: data.data[index].id,
                    object: data.data[index].object,
                    email: data.data[index].email,
                    sourcesUrl: data.data[index].sources.url,
                    subscriptionsUrl: data.data[index].subscriptions.url
                }
                $scope.loginRedirect();
            } else {
                stripe.createStripeCustomer($localStorage.userProfile).then(function(data) {
                    $localStorage.stripeAccountDetails = {
                        id: data.id,
                        object: data.object,
                        email: data.email,
                        sourcesUrl: data.sources.url,
                        subscriptionsUrl: data.subscriptions.url
                    }
                    $scope.loginRedirect();
                    window.plugins.toast.showShortBottom($translate.instant("loginSuccess"));
                });
            }
        });
    }
    $ionicModal.fromTemplateUrl('modules/home/terms_conditions_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        preserveScope: true
    }).then(function(modal) {
        $scope.terms_conditions_modal = modal;
    });

    $scope.openTermsConditions = function() {
        $scope.pagesInfo();
        $scope.terms_conditions_modal.show();
    }
    $scope.pagesInfo = function() {
       
        $ionicLoading.show();
        Services.webServiceCallPost('', appConst.services.pages).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                if (response[0].data.length > 0) {
                    $rootScope.pages = response[0].data;
                }
            }
        });
    }
    $scope.closeTermsConditions = function() {
        $scope.terms_conditions_modal.hide();
    }
    $scope.home = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $location.path(appConst.path.dashboard);
    };
    $scope.doRegistration = function(data) {
        $scope.params = {
            first_name: '',
            last_name: '',
            identity: '',
            phone: '',
            password: '',
            confirmPassword: '',
            terms: true,
            platform: ionic.Platform.platform(),
            device_id: localStorage.getItem("registrationId"),
            registered_by: ''
        };
        if (data) {
            if ($rootScope.loginThrough == 'google') {
                var res = data.displayName.split(" ");
                $scope.params.first_name = res[0];
                $scope.params.last_name = res[1];
                $scope.params.identity = data.emails[0].value;
                $scope.params.registered_by = $rootScope.loginThrough;
            } else {
                $scope.params.first_name = data.first_name;
                $scope.params.last_name = data.last_name;
                $scope.params.identity = data.email;
                $scope.params.registered_by = $rootScope.loginThrough;
            }
        };
        $ionicLoading.show();
        Services.forgotPasswordService($scope.params, appConst.services.signup).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                if (response[0].data[0].id != "") {
                    $localStorage.userProfile = {};
                    angular.extend($localStorage.userProfile, response[0].data[0]);
                    $scope.stripeAuth();
                    $location.path(appConst.path.dashboard);
                    window.plugins.toast.show(response[1].response.message, 'long', 'bottom');
                } else {
                    window.plugins.toast.show(response[1].response.message, 'long', 'bottom');
                }
            } else {
                window.plugins.toast.show(response[1].response.message, 'long', 'bottom');
            }
        });
    }
    $scope.facebookLogin = function() {
        socialLogin.facebook(localStorage.getItem('facebookApiKey')).then(function(response) {
            if (response.id) {
                $localStorage.socialLogindata = response;
                $rootScope.loginThrough = 'facebook';
                $ionicLoading.hide();
                $scope.doRegistration(response);
            } else if (response.error) {
                $ionicLoading.hide();
                window.plugins.toast.show(response.error.message, 'short', 'bottom');
            }
        });
    };
    $scope.googleLogin = function() {
        socialLogin.google(localStorage.getItem('googleApiKey')).then(function(response) {
            if (response.id) {
                $localStorage.socialLogindata = response;
                $rootScope.loginThrough = 'google';
                $ionicLoading.hide();
                $scope.doRegistration(response);
            } else if (response.error) {
                $ionicLoading.hide();
                window.plugins.toast.show(response.error.message, 'short', 'bottom');
            }
        });
    };
    $scope.password = {};
    $scope.changePassword = function() {
        var changePasswordScope = angular.element(document.getElementById('changePasswordPage')).scope();
        if (changePasswordScope.password.new_password != changePasswordScope.password.confirmNewPassword) {
            window.plugins.toast.show($translate.instant("passwordNotMatch"));
        } else {
            angular.extend(changePasswordScope.password, $localStorage.userProfile);
            $ionicLoading.show();
            Services.webServiceCallPost(changePasswordScope.password, appConst.services.change_password).then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 1) {
                    localStorage.setItem('pageName', '');
                    $rootScope = undefined;
                    delete $localStorage.userProfile;
                    $location.path(appConst.path.login);
                    window.plugins.toast.show(response[1].response.message, 'short', 'bottom');

                } else {
                    window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                }
            });
        }
    };
    $scope.forgotPasswordEmail = function() {
        $ionicLoading.show();
        var forgotPasswordScope = angular.element(document.getElementById('forgotPasswordPage')).scope();
        Services.forgotPasswordService($scope.forgotPassword, appConst.services.forgot_password).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                $location.path(appConst.path.login);
            } else {
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
            }
        });
    }
    $scope.forgotPasswordSMS = function() {
            var str = randomString(5);
            $localStorage.registrationOtp = str;
            var params = { phone: $scope.forgotPassword.phone, otp_string: str };
            Services.forgotPasswordService(params, 'forgot_password_sms').then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 1) {
                   $rootScope.loginThrough = "newPassword";
                   $localStorage.userProfile = {};
                   angular.extend($localStorage.userProfile, response[0].data);
                   $location.path('/otpForm');
                   window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                } else {
                    window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
                }
            });
        }
        $scope.resetPassword = {};
        $scope.resetPwd = function(){
            var registrationScope = angular.element(document.getElementById('resetPasswordPage')).scope();
            var params = {
                new_password: $scope.resetPassword.newPassword,
                new_confirm: $scope.resetPassword.confirmNewPassword,
                id: $localStorage.userProfile.id
            };
            $ionicLoading.show();
            Services.forgotPasswordService(params, 'reset_password').then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 2) {       // SMS
                     $localStorage.registrationOtp = registrationScope.registration.otp_string;
                     $localStorage.registrationEmail = response[0].data.email;
                     $location.path('/otpForm');
                }else if (response[1].response.status == 1) {      // Email
                      var loginScope = angular.element(document.getElementById('loginPage')).scope();
                      loginScope.login.email = registrationScope.registration.identity;
                      loginScope.login.password = registrationScope.registration.password;
                      window.plugins.toast.showLongBottom(response[1].response.message);
                      $location.path(appConst.path.login);
                }else {
                    window.plugins.toast.showLongBottom(response[1].response.message);
                }
            });
        }
});