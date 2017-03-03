cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "id": "ionic-plugin-keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "file": "plugins/com.paypal.cordova.mobilesdk/www/cdv-plugin-paypal-mobile-sdk.js",
        "id": "com.paypal.cordova.mobilesdk.PayPalMobile",
        "clobbers": [
            "PayPalMobile"
        ]
    },
    {
        "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
        "id": "cordova-plugin-app-version.AppVersionPlugin",
        "clobbers": [
            "cordova.getAppVersion"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "id": "cordova-plugin-x-toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "id": "cordova-plugin-x-toast.tests"
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "id": "cordova-plugin-globalization.GlobalizationError",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "id": "cordova-plugin-globalization.globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "file": "plugins/cordova-plugin-apprate/www/AppRate.js",
        "id": "cordova-plugin-apprate.AppRate",
        "clobbers": [
            "AppRate"
        ]
    },
    {
        "file": "plugins/cordova-plugin-apprate/www/locales.js",
        "id": "cordova-plugin-apprate.locales",
        "runs": true
    },
    {
        "file": "plugins/com.xmartlabs.cordova.market/www/market.js",
        "id": "com.xmartlabs.cordova.market.Market",
        "clobbers": [
            "cordova.plugins.market"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/stripe.js",
        "id": "com.telerik.stripe.stripe",
        "clobbers": [
            "stripe"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/charges.js",
        "id": "com.telerik.stripe.charges",
        "clobbers": [
            "stripe.charges"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/customers.js",
        "id": "com.telerik.stripe.customers",
        "clobbers": [
            "stripe.customers"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/recipients.js",
        "id": "com.telerik.stripe.recipients",
        "clobbers": [
            "stripe.recipients"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/subscriptions.js",
        "id": "com.telerik.stripe.subscriptions",
        "clobbers": [
            "stripe.subscriptions"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/transfers.js",
        "id": "com.telerik.stripe.transfers",
        "clobbers": [
            "stripe.transfers"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/coupons.js",
        "id": "com.telerik.stripe.coupons",
        "clobbers": [
            "stripe.coupons"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
        "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
        "clobbers": [
            "window.plugins.nativepagetransitions"
        ]
    },
    {
        "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
        "id": "onesignal-cordova-plugin.OneSignal",
        "clobbers": [
            "OneSignal"
        ]
    },
    {
        "file": "plugins/cordova-plugin-themeablebrowser/www/themeablebrowser.js",
        "id": "cordova-plugin-themeablebrowser.themeablebrowser",
        "clobbers": [
            "cordova.ThemeableBrowser"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.3",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-splashscreen": "3.1.0",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-whitelist": "1.2.2",
    "ionic-plugin-keyboard": "2.0.1",
    "com.paypal.cordova.mobilesdk": "3.1.25",
    "cordova-plugin-app-version": "0.1.8",
    "cordova-plugin-x-toast": "2.5.1",
    "cordova-plugin-x-socialsharing": "5.0.12",
    "cordova-plugin-inappbrowser": "1.4.1-dev",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-globalization": "1.0.3",
    "cordova-plugin-apprate": "1.1.7",
    "com.xmartlabs.cordova.market": "1.1",
    "com.telerik.stripe": "1.0.6",
    "cordova-plugin-network-information": "1.2.1",
    "com.telerik.plugins.nativepagetransitions": "0.6.5",
    "onesignal-cordova-plugin": "2.0.6",
    "cordova-plugin-themeablebrowser": "0.2.17"
};
// BOTTOM OF METADATA
});