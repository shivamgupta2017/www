"use strict";
angular.module('declarations', []).constant('appConst', {
    'serviceUrl': {
<<<<<<< HEAD
        "service": 'http://krazytable.com/Files/service/',
        "service_login" : "http://krazytable.com/Files/service_login/",
        "item_image_url" : 'http://krazytable.com/Files/uploads/item_images/',
        "menu_image_url" : 'http://krazytable.com/Files/uploads/menu_images/thumbs/',
        "infotainment_url" : 'http://krazytable.com/Files/uploads/media/',
        "addon_image_url" : 'http://krazytable.com/Files/uploads/addon_images/thumbs/',
        "gallery_image_url" : 'http://krazytable.com/Files/uploads/gallery_images/thumbs/',
        "item_image_url_thumb" : 'http://krazytable.com/Files/uploads/item_images/thumbs/',
        "payU":'http://krazytable.com/Files/',
        "payUsuccess":'http://krazytable.com/Files/payuMobile/success',
        "payUfailure":'http://krazytable.com/Files/payuMobile/payFailure',
    },
    'page': {
        "paymentDoneviaCardHtml": "modules/home/paymentDoneviaCard.html",
        "finishDineInHtml":"modules/home/finishDineIn.html",
        "menuHtml": "modules/home/menu.html",
        "loginHtml": "modules/authentication/login.html",
        "registrationHtml": "modules/authentication/registration.html",
        "forgotPasswordHtml": "modules/authentication/forgotPassword.html",
        "resetPasswordHtml": "modules/authentication/resetPassword.html",
=======
        "service": 'http://192.168.1.113/Files/service/',
        "service_login": "http://192.168.1.113/Files/service_login/",
        "item_image_url": 'http://192.168.1.113/Files/uploads/item_images/',
        "menu_image_url": 'http://192.168.1.113/Files/uploads/menu_images/thumbs/',
        "infotainment_url": 'http://192.168.1.113/Files/uploads/media/',
        "addon_image_url": 'http://192.168.1.113/Files/uploads/addon_images/thumbs/',
        "gallery_image_url": 'http://192.168.1.113/Files/uploads/gallery_images/thumbs/',
        "item_image_url_thumb": 'http://192.168.1.113/Files/uploads/item_images/thumbs/',
        "payU":'http://192.168.1.113/Files/',
        "payUsuccess":'http://192.168.1.113/Files/payuMobile/success',
        "payUfailure":'http://192.168.1.113/Files/payuMobile/payFailure',
    },
    'page': {
        "menuHtml": "modules/home/menu.html",

        "loginHtml": "modules/authentication/login.html",
        "registrasswordHtml": "modules/authentication/resetPassword.html",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "changePasswordHtml": "modules/authentication/changePassword.html",
        "changeLanguageHtml": "modules/home/changeLanguage.html",
        "viewProfileHtml": "modules/home/viewProfile.html",
        "selected_itemHtml": "modules/home/selected_item.html",
        "editProfileHtml": "modules/home/editProfile.html",
        "dashboardHtml": "modules/home/dashboard.html",
        "items_listHtml": "modules/home/items_list.html",
        "cart_listHtml": "modules/home/cart_list.html",
        "searchHtml":"modules/home/search.html",
<<<<<<< HEAD
        "orders_historyHtml": "modules/home/orders_history.html",
=======
        "orders_tionHtml": "modules/authentication/registration.html",
        "forgotPasswordHtml": "modules/authentication/forgotPassword.html",
        "resetPahistoryHtml": "modules/home/orders_history.html",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "orderHistoryDetailsHtml": "modules/home/orderHistoryDetails.html",
        "about_usHtml": "modules/home/about_us.html",
        "termsConditionsHtml": "modules/home/termsConditions.html",
        "payment_statusHtml": "modules/home/payment_status.html",
        "offersHtml": "modules/home/offers.html",
        "offerDetailsHtml": "modules/home/offerDetails.html",
        "home_deliveryHtml": "modules/home/home_delivery.html",
        "singleInfotainmentHtml": "modules/home/singleInfotainment.html",
        "paymentHtml": "modules/home/payment.html",
        "search_cities_modalHtml": "modules/home/search_cities_modal.html",
        "search_locations_modalHtml": "modules/home/search_locations_modal.html",
<<<<<<< HEAD
        "stripe_modalHtml": "modules/home/stripe_modal.html",
         "ordersHtml": "modules/home/orders.html",
        "reviewHtml": "modules/home/reviews.html"
=======
        "stripe_modalHtml": "modules/home/stripe_modal.html"
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
    },
    'ctrl': {
        "dashboard": "dashboardCtrl",
        "authentication": "authenticationCtrl",

    },
    'state': {
<<<<<<< HEAD
        "paymentDoneviaCard":"app.paymentDoneviaCard",
        "app": "app",
        "finishDineIn": "app.finishDineIn",
=======
        "app": "app",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "login": "app.login",
        "registration": "registration",
        "forgetPassword": "forgetPassword",
        "singleInfotainment": "app.singleInfotainment",
        "resetPassword": "resetPassword",
        "changePassword": "app.changePassword",
        "changeLanguage": "app.changeLanguage",
        "viewProfile": "app.viewProfile",
        "selected_item": "app.selected_item",
        "editProfile": "app.editProfile",
        "dashboard": "app.dashboard",
        "items_list": "app.items_list",
        "cart_list": "app.cart_list",
        "search": "app.search",
        "orders_history": "app.orders_history",
        "ordersHistoryDetails": "app.ordersHistoryDetails",
        "about_us": "app.about_us",
        "termsConditions": "termsConditions",
        "payment_status": "payment_status",
        "offers": "app.offers",
        "offerDetails": "app.offerDetails",
        "home_delivery": "app.home_delivery",
<<<<<<< HEAD
        "payment": "app.payment",
         "orders": "app.orders",
         "show_reviews": "app.show_reviews"
    },
    'url': {

        "app": "/app",
        "paymentDoneviaCard":"/paymentDoneviaCard",
=======
        "payment": "app.payment"
    },
    'url': {
        "app": "/app",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "singleInfotainment": "/singleInfotainment",
        "login": "/login",
        "registration": "/registration",
        "forgetPassword": "/forgetPassword",
        "resetPassword": "/resetPassword",
        "changePassword": "/changePassword",
        "changeLanguage": "/changeLanguage",
        "viewProfile": "/viewProfile",
<<<<<<< HEAD
        "finishDineIn":"/finishDineIn",
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "selected_item": "/selected_item",
        "editProfile": "/editProfile",
        "dashboard": "/dashboard",
        "items_list": "/items_list",
        "cart_list": "/cart_list",
        "search": "/search",
        "orders_history": "/orders_history",
        "ordersHistoryDetails": "/ordersHistoryDetails",
        "about_us": "/about_us",
        "termsConditions": "/termsConditions",
        "payment_status": "/payment_status",
        "offers": "/offers",
        "offerDetails": "/offerDetails",
        "home_delivery": "/home_delivery",
<<<<<<< HEAD
        "payment": "/payment",
        "orders": "/orders",
        "show_reviews": "/show_reviews"
    },
    'path': {
        "login": "/app/login",
        "paymentDoneviaCard" :"/app/paymentDoneviaCard",
=======
        "payment": "/payment"
    },
    'path': {
        "login": "/app/login",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "registration": "/registration",
        "home_delivery": "/app/home_delivery",
        "orders_history": "/app/orders_history",
        "dashboard": "/app/dashboard",
        "termsConditions": "/termsConditions",
        "editProfile": "/app/editProfile",
        "items_list": "/app/items_list",
        "selected_item": "/app/selected_item",
        "changeLanguage": "/app/changeLanguage",
        "cart_list": "/app/cart_list",
<<<<<<< HEAD
        "finishDineIn":"/app/finishDineIn",
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "search": "/app/search",
        "singleInfotainment": "/app/singleInfotainment",
        "payment": "/app/payment",
        "payment_status": "/payment_status",
        "offerDetails": "/app/offerDetails",
        "ordersHistoryDetails": "/app/ordersHistoryDetails",
<<<<<<< HEAD
        "support": "/app/support",
         "orders": "/app/orders",
         "show_reviews": "/app/show_reviews"
    },
    'services': {
        "update_order":"update_order",
=======
        "support": "/app/support"
    },
    'services': {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "edit_profile": "edit_profile",
        "search": "search",
        "get_menu_card": "get_menu_card",
        "get_items": "get_items",
        "save_order": "save_order",
<<<<<<< HEAD
        "get_Current_Orders": "get_current_orders",
        "get_item_reviews": "get_item_reviews",
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        "get_offers": "get_offers",
        "get_offer_details": "get_offer_details",
        "order_history": "order_history",
        "order_item_details": "order_item_details",
        "pages": "pages",
        "send_feedback": "send_feedback",
        "change_password": "change_password",
        "signup": "signup",
        "login": "login",
        "forgot_password": "forgot_password"
    }
});
