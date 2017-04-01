"use strict";
angular.module('declarations', []).constant('appConst', {
    'serviceUrl': {
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
        "changePasswordHtml": "modules/authentication/changePassword.html",
        "changeLanguageHtml": "modules/home/changeLanguage.html",
        "viewProfileHtml": "modules/home/viewProfile.html",
        "selected_itemHtml": "modules/home/selected_item.html",
        "editProfileHtml": "modules/home/editProfile.html",
        "dashboardHtml": "modules/home/dashboard.html",
        "items_listHtml": "modules/home/items_list.html",
        "cart_listHtml": "modules/home/cart_list.html",
        "searchHtml":"modules/home/search.html",
        "orders_tionHtml": "modules/authentication/registration.html",
        "forgotPasswordHtml": "modules/authentication/forgotPassword.html",
        "resetPahistoryHtml": "modules/home/orders_history.html",
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
        "stripe_modalHtml": "modules/home/stripe_modal.html"
    },
    'ctrl': {
        "dashboard": "dashboardCtrl",
        "authentication": "authenticationCtrl",

    },
    'state': {
        "app": "app",
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
        "payment": "app.payment"
    },
    'url': {
        "app": "/app",
        "singleInfotainment": "/singleInfotainment",
        "login": "/login",
        "registration": "/registration",
        "forgetPassword": "/forgetPassword",
        "resetPassword": "/resetPassword",
        "changePassword": "/changePassword",
        "changeLanguage": "/changeLanguage",
        "viewProfile": "/viewProfile",
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
        "payment": "/payment"
    },
    'path': {
        "login": "/app/login",
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
        "search": "/app/search",
        "singleInfotainment": "/app/singleInfotainment",
        "payment": "/app/payment",
        "payment_status": "/payment_status",
        "offerDetails": "/app/offerDetails",
        "ordersHistoryDetails": "/app/ordersHistoryDetails",
        "support": "/app/support"
    },
    'services': {
        "edit_profile": "edit_profile",
        "search": "search",
        "get_menu_card": "get_menu_card",
        "get_items": "get_items",
        "save_order": "save_order",
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
