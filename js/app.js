"use strict";
var app = angular.module('starter', ['ionic','ionic.rating', 'ngStorage', 'ngAnimate', 'declarations', 'socialLogins', 'ngCordovaOauth', 'uiGmapgoogle-maps', 'pascalprecht.translate','angularRandomString','ngCordova'], function($httpProvider) {
    var param = function(obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName= name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    innerObj = {};
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});
app.run(function($ionicPlatform, $rootScope, $translate,$cordovaPush) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            if (ionic.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#ee2e2e");
            } else {
                StatusBar.styleDefault();
            }
        }
        if (localStorage.getItem('defaultLanguage')) {
            $translate.use(localStorage.getItem('defaultLanguage'));
        }

       document.addEventListener('deviceready', function () {
           window.plugins.OneSignal
               .startInit("da39217b-0184-4b26-8ef2-e5704cda9eb1", "707332932771")         // if IOS, Google_App_ID  not required
               .handleNotificationReceived(function(data) {})
               .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
               .endInit();
           window.plugins.OneSignal.enableSound(true);
           window.plugins.OneSignal.enableNotificationsWhenActive(true) ;
           window.plugins.OneSignal.getIds(function(ids) {
               localStorage.setItem("registrationId",ids.userId);
           });
       }, false);
    });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, appConst, $translateProvider) {
    $ionicConfigProvider.backButton.text('').previousTitleText(false);
    $ionicConfigProvider.views.transition('android');
    $ionicConfigProvider.tabs.position('top');
    $translateProvider.translations('en', {
         "changePassword": "Change Password",
           "menu": "Menu",
           "login": "Login",
           "confirmNewPassword": "1",
           "forgotPassword": "Forgot Password",
           "emailAddress": "Email Address",
           "send": "Send",
           "dontWorryJustFillInYourEmailAndWeWillHelpYouResetYourPassword": "Don't worry ! Just fill in your email and we will help you reset your password",
           "enterEmail": "Enter Email",
           "password": "Password",
           "signIn": "Sign in",
           "or": "OR",
           "newUser": "New User?",
           "signUpHere": "Sign Up Here",
           "signUp": "Sign Up",
           "iAccept": "I Accept",
           "register": "Register",
           "firstName": "First Name",
           "lastName": "Last Name",
           "email": "Email",
           "phoneNumber": "Phone Number",
           "termsAndConditions": "Terms and Conditions",
           "resetPassword": "Reset Password",
           "confirmPassword": "Confirm Password",
           "submit": "Submit",
           "aboutUs": "About Us",
           "version": "Version",
           "address": "Address",
           "cartList": "Cart List",
           "cost": "Cost",
           "addItems": "Add Items",
           "totalCost": "Total Cost ",
           "order": "Order",
           "changeLanguage": "Change Language",
           "selectLanguage": "Select Language",
           "english": "English",
           "chinese": "Chinese",
           "byYourMoodOrPreference": "By Your Mood Or Preference",
           "editProfile": "Edit Profile",
           "city": "City",
           "state": "State",
           "pincode": "Pincode",
           "landmark": "Land Mark",
           "update": "Update",
           "placeOrder": "Place Order",
           "mobileNumber": "Mobile Number",
           "location": "Location",
           "flatNoHouseNo": "House number / name",
           "apartmentLocalityName": "Appartment/Locality Name",
           "addressOtherOptional": "Address other(optional)",
           "selectDate": "Select Date",
           "date": "Date",
           "time": "Time",
           "selectTitle": "Select Title",
           "onlinePayment": "Online Payment",
           "cashOnDeliver": "Cash On Deliver",
           "proceed": "Proceed",
           "allTimeFavourites": "All Time Favourites",
           "welcome": "Welcome",
           "offers": "Offers",
           "orderHistory": "Order History",
           "shareToFriends": "Share To Friends",
           "rateUsOnThePlaystore": "Rate Us On The Play Store",
           "signOut": "Sign Out",
           "offersAvailable": "Offers Available",
           "validFrom": "Valid From",
           "validTo": "Valid To",
           "noOfPersons": "No Of Persons",
           "noOfProducts": "No Of Products",
           "discount": "Discount",
           "orderItems": "Order Items",
           "yourOrders": "Your Orders",
           "currentPassword": "Current Password",
           "noOfItems": "No Of Items",
           "noOrdersFound": "No Orders Found",
           "paymentStatus": "Payment Status",
           "yourPaymentStatusIs": "Your Payment Status Is",
           "successful": "Successful",
           "yourPaymentOfAmount": "Your Payment Of Amount",
           "hasBeenSuccessfullyProcessed": "Has Been Successfully Processed",
           "selectCity": "Select City",
           "search": "Search",
           "selectLocation": "Select Location",
           "description": "Description",
           "viewCart": "View Cart",
           "terms": "Terms",
           "myAccount": "My Account",
           "timedOutError": "Timed Out Error",
           "checkNetworkConnection": "Check Network Connection",
           "validatingUser": "Validating User...",
           "passwordNotMatch": "Password Not Match",
           "signoutSuccessfully": "Sign out successfully",
           "specifyDate": "Specify Date",
           "specifyTime": "Specify Time",
           "incorrectLogin": "Incorrect Login",
           "no": "No",
           "availableNow": "Available Now",
           "alreadyAddedToCart": "Already Added To Cart",
           "emailAlreadyUsedOrInvalidUnableToCreateAccount": "Email Already Used Or Invalid UnableToCreateAccount",
           "noItemsInYourCart": "No Items In Your Cart",
           "guest": "Guest",
           "user": "User",
           "payment": "Payment",
           "peterSrinivas": "Peter Srinivas",
           "newPassword": "New Password",
           "orderedOn": "Ordered on",
           "offerItems": "Offer Items",
           "noItemsAvailable": "No items available",
           "makePayment": "Make Payment",
           "paymentMethod": "Payment Method",
           "facebookApi": "Facebook Api",
           "googleApi": "Google Api",
           "paymenttype": "Payment Type",
           "stripe": "Stripe",
           "cardNumber": "Card Number",
           "expirationDate": "Expiration Date",
           "month": "Month",
           "year": "Year",
           "cvc": "CVC",
           "proceedToPay": "Proceed To Pay",
           "all": "All",
           "veg": "Veg",
           "non-veg": "Non-Veg",
           "other": "Other",
           "passwordsuccessfullychanged": "Password Successfully Changed",
           "registrationcompletedsuccessfullyactivationmailsent": "Registration Completed Successfully Activation Mail Sent",
           "accountisinactive": "Account is inactive",
           "itemAddedToCart": "Item Added to Cart",
           "quantity": "Quantity",
           "registrationCompletedSuccessfullyPasswordSentToEmail": "Registration Completed Successfully Password Sent To Email",
           "save": " Save",
           "itemAddons": "Item Addons",
           "noAddonsAvailable": "No Addons Available",
           "itemSizes": "Item Sizes",
           "customizeYourItem": "Customize Your Item",
           "noItemSizesAvailable": "No Item Sizes Available",
           "contactInformation": "Contact Information",
           "addNew": "Add New",
           "savedAddresses": "Saved Addresses",
           "openingHours": "Opening Hours",
           "closingHours": "Closing Hours",
           "sizes": "Sizes",
           "addons": "Addons",
           "deleted": "Deleted",
           "selectMinimumOneItemThenOnlyAddonsWillApply": "Select Minimum One Item Then Only Addons Will Apply",
           "items": "Items",
           "addAddress": "Add Address",
           "editAddress": "Edit Address",
           "crunchyRestaurantNotAvailableOnSelectedTime": "Crunchy Restaurant Not Available On Selected Time",
           "selectAddress": "Select Address",
           "invalidCard": "Invalid Card",
           "cancel": "Cancel",
           "done": "Done",
           "crunchy": "Crunchy",
           "crunchyAppForRestaurant": "Crunchy App For Restaurant",
           "restaruentTimings": "Restaruant Timings",
           "ok": "Ok",
           "debitedThroughCrunchyAccount": "Debited Through Crunchy Account",
           "crunchyAccount": "Crunchy Account",
           "myProfile": "My Profile",
           "addNewAddress": "Add New Address",
           "crunchyRestaurantIsCurrentlyClosed": "Crunchy Restaurant Is Currently Closed",
           "selectLandmark": "Select Landmark",
           "streetname": "Street Name",
           "registrationCompletedSuccessfullyOtpSentToMobile": "Registration completed successfully.",
           "smsnotificationtemplateisnotactivepleasecontactadmin": "SMS notification templae is not active please contact the admin",
           "smsnotificationisnotenablepleasecontactadmin": "SMS notification is not enable please contact the admin.",
           "mobileNoDoesNotExists": "Mobile number doesn't exists.",
           "forgotPasswordEmailNotFound": "Forgot password email not found",
           "rateRestaurant": "Rate restaurant",
           "notNow": "Not now",
           "later": "Later",
           "open": "Open",
           "closed": "Closed",
           "rateUs": "Rate us",
           "openingTime": "Opening time",
           "closingTime": "Closing time",
           "deliveryFee": "Delivery fee",
           "deliveryTime": "Delivery time",
           "rating": "Rating",
           "restaurantIsClosedNow": "Restaurant is closed now",
           "areYouSureYoudLikeToChangeRestaurantsYourCurrentsOrderWillBeLost": "Are you sure you'd like to change restaurants? Your currents order will be lost.",
           "noAddressAdded": "No address added",
           "myPoints": "My Points",
           "currentBalancePoints": "Current Balance Points",
           "spendOn": "Spend on",
           "points": "Points",
           "orderCost": "Order Cost",
           "rate": "Rate",
           "deliveryCost": "Delivery Cost",
           "lessPoints": "Less Points",
           "remainingCost": "Remaining Cost",
           "home": "Home",
           "free": "Free"
    });
    $.ajax({
        type: "POST",
        url: appConst.serviceUrl.service + 'get_site_settings',
        crossDomain: true,
        dataType: "json",
        data: '',
        timeout: 2000000,
        async: true,
        success: function(response) {
            if (response[1].response.status == 1) {
                var translations = {};
                localStorage.setItem('googleApiKey', response[0].data.siteDetails[0].google_api);
                localStorage.setItem('facebookApiKey', response[0].data.siteDetails[0].facebook_api);
                localStorage.setItem('siteSettings', JSON.stringify(response));
                var response = JSON.parse(localStorage.getItem('siteSettings'));
                angular.forEach(response[0].data.language_types, function(value, key) {
                    translations = value.language_strings;
                    $translateProvider.translations(value.language_code, translations);
                    if (!localStorage.getItem('defaultLanguage')) {
                        if (response[0].data.siteDetails[0].language_id === value.id) {
                            localStorage.setItem('defaultLanguage', value.language_code);
                        }
                    }
                });
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if (xhr.status == 0) {
                window.plugins.toast.showShortBottom($translate.instant("timedOutError"));
            } else if (xhr.status == 404) {
                window.plugins.toast.showShortBottom($translate.instant("timedOutError"));
            } else {
                window.plugins.toast.showShortBottom($translate.instant("timedOutError"));
            }
        },
        beforeSend: function() {},
        complete: function() {}
    });

    $stateProvider
        .state(appConst.state.app, {
            url: appConst.url.app,
            abstract: true,
            templateUrl: appConst.page.menuHtml,
            controller: 'menuCtrl'
        })

        .state(appConst.state.login, {
            url: appConst.url.login,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.loginHtml,
                    controller: appConst.ctrl.authentication
                }
            }
        })
        .state(appConst.state.registration, {
            url: appConst.url.registration,
            views: {
                '': {
                    templateUrl: appConst.page.registrationHtml,
                    controller: appConst.ctrl.authentication
                }
            }
        })
        .state('otpForm', {
            url: '/otpForm',
            views: {
                '': {
                    templateUrl: 'modules/authentication/otpForm.html',
                    controller: appConst.ctrl.authentication
                }
            }
        })
    .state(appConst.state.forgetPassword, {
            url: appConst.url.forgetPassword,
            views: {
                '': {
                    templateUrl: appConst.page.forgotPasswordHtml,
                    controller: appConst.ctrl.authentication
                }
            }
        })
        .state(appConst.state.resetPassword, {
            url: appConst.url.resetPassword,
            views: {
                '': {
                    templateUrl: appConst.page.resetPasswordHtml,
                    controller: appConst.ctrl.authentication
                }
            }
        })
        .state(appConst.state.changePassword, {
            url: appConst.url.changePassword,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.changePasswordHtml,
                    controller: appConst.ctrl.authentication
                }
            }
        })
        .state(appConst.state.changeLanguage, {
            url: appConst.url.changeLanguage,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.changeLanguageHtml,
                    controller: 'changeLanguageCtrl'
                }
            }
        })
        .state(appConst.state.viewProfile, {
            url: appConst.url.viewProfile,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.viewProfileHtml,
                    controller: 'profileCtrl'
                }
            }
        })
        .state(appConst.state.selected_item, {
            url: appConst.url.selected_item,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.selected_itemHtml,
                    controller: 'selectedItemCtrl'
                }
            }
        })
        .state(appConst.state.editProfile, {
            url: appConst.url.editProfile,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.editProfileHtml,
                    controller: 'profileCtrl'
                }
            }
        })

        .state(appConst.state.dashboard, {
            url: appConst.url.dashboard,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.dashboardHtml,
                    controller: appConst.ctrl.dashboard
                }
            }
        })

        .state(appConst.state.items_list, {
            url: appConst.url.items_list,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.items_listHtml,
                    controller: 'itemsListCtrl'
                }
            }
        })

    .state(appConst.state.cart_list, {    
            url: appConst.url.cart_list,  
            views: {
                'menuContent': {
                    templateUrl: appConst.page.cart_listHtml,//url of the html file
                    controller: 'cartListCtrl'//url of the controller file
                }
            }
        })


    .state(appConst.state.search, {   //:app.search
            url: appConst.url.search,//:/search 
            views: {
                'menuContent': {
                    templateUrl: appConst.page.searchHtml,    //modules/home/search.html
                    controller: 'searchCtrl'
                }
            }
        })



        .state(appConst.state.orders_history, {
            url: appConst.url.orders_history,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.orders_historyHtml,
                    controller: 'orderHistoryCtrl'
                }
            }
        })
        .state(appConst.state.ordersHistoryDetails, {
            url: appConst.url.ordersHistoryDetails,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.orderHistoryDetailsHtml,
                    controller: 'orderHistoryCtrl'
                }
            }
        })
        .state(appConst.state.about_us, {
            url: appConst.url.about_us,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.about_usHtml,
                    controller: 'aboutUsCtrl'
                }
            }
        })
        .state(appConst.state.termsConditions, {
            url: appConst.url.termsConditions,
            templateUrl: appConst.page.termsConditionsHtml,
            controller: ''
        })
        .state(appConst.state.payment_status, {
            url: appConst.url.payment_status,
            templateUrl: appConst.page.payment_statusHtml,
            controller: 'paymentCtrl'

        })
        .state(appConst.state.offers, {
            url: appConst.url.offers,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.offersHtml,
                    controller: 'offersCtrl'
                }
            }
        })
        .state(appConst.state.offerDetails, {
            url: appConst.url.offerDetails,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.offerDetailsHtml,
                    controller: 'offersCtrl'
                }
            }
        })
        .state(appConst.state.home_delivery, {
            url: appConst.url.home_delivery,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.home_deliveryHtml,
                    controller: 'homeDeliveryCtrl'
                }
            }
        })
        .state(appConst.state.payment, {
            url: appConst.url.payment,
            views: {
                'menuContent': {
                    templateUrl: appConst.page.paymentHtml,
                    controller: 'paymentCtrl'
                }
            }
        })
        .state('app.addAddress', {
            url: '/addAddress',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/addAddress.html',
                    controller: 'homeDeliveryCtrl'
                }
            }
        })
        .state('app.addAddress_profile', {
            url: '/addAddress_profile',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/addAddress_profile.html',
                    controller: 'profileCtrl'
                }
            }
        })
        .state('app.raiseconcern', {
            url: '/raiseconcern',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/raiseconcern.html',
                    controller: 'raiseconcern'
                }
            }
        })
        .state('app.reviews', {
            url: '/reviews',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/reviews.html',
                    controller: 'reviews'
                }
            }
        })
        .state('app.reports', {
            url: '/reports',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/reports.html',
                    controller: 'reports'
                }
            }
        })
        .state('app.ratings', {
            url: '/ratings',
            views: {
                'menuContent': {
                    templateUrl: 'modules/home/ratings.html',
                    controller: 'ratings'
                }
            }
        })
        .state('app.review', {
    url: '/review/:id/:user',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/review.html',
        controller: 'review'
      }
    }
  })
      .state('app.infotainment', {
    url: '/infotainment/',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/infotainment.html',
        controller: 'infotainment'
      }
    }
  })
      .state('app.infotainmentcategary', {
    url: '/infotainmentcategary',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/infotainmentcategary.html',
        controller: 'infotainmentcategary'
      }
    }
  })
      .state('app.singleInfotainment', {
    url: '/singleInfotainment/:mediaId',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/singleInfotainment.html',
        controller: 'singleInfotainment'
      }
    }
  });
    $urlRouterProvider.otherwise('/app/dashboard');
});