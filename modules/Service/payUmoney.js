"use strict";
app.factory('payUmoney', function( $http,$rootScope,appConst,$location,$timeout,$localStorage,
$ionicLoading,$q) {
    return {
        doPayment : function(data){
            var q=$q.defer();
            var event_details;
            var ref=0;
                var urlParams = appConst.serviceUrl.payU+"payuMobile/dopayMobile?email="+data.email+
                            "&userId="+data.userId+
                            "&firstname="+data.firstname+
                            "&order_date="+data.order_date+
                            "&order_time="+data.order_time+
                            "&total_cost="+data.total_cost+
                            "&customer_name="+data.customer_name+
                            "&phone="+data.phone+
                            "&house_no="+data.house_no+
                            "&apartment_name="+data.apartment_name+
                            "&other="+data.other+
                            "&address="+data.address+
                            "&landmark="+data.landmark+
                            "&city="+data.city+
                            "&state="+data.state+
                            "&pincode="+data.pincode+
                            "&order_type="+data.order_type+
                            "&payment_type="+data.payment_type+
                            "&no_of_items="+data.no_of_items+
                            "&order_summary="+data.order_summary+
                            "&isAddons="+data.isAddons+
                            "&addons_summary="+data.addons_summary+
                            "&order_by_device_id="+data.order_by_device_id;

                console.log("url     "+JSON.stringify(urlParams));

            var ref = cordova.ThemeableBrowser.open(urlParams, '_blank', {
                 statusbar: {color: '#ffffffff'},toolbar: {height: 44,color: '#f0f0f0ff'},
                 title: {color: '#003264ff',showPageTitle: true,staticText:'PayU Money Payment'},
                 backButton: {wwwImage: 'img/browser/back.png',wwwImagePressed: 'img/browser/back_pressed.png',wwwImageDensity: 3,align: 'left',event: 'backPressed'},
                 closeButton: {wwwImage: 'img/browser/close.png',wwwImagePressed: 'img/browser/close_pressed.png',wwwImageDensity: 3,align: 'right',event: 'closePressed'},
                 backButtonCanClose: true}).addEventListener('backPressed', function(e) {});

            q.resolve(ref);
            return q.promise;
        }
    }
});


