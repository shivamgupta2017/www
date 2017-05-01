"use strict";
app.factory('Services', function($http, $rootScope, $timeout, $localStorage, $ionicLoading, $q, appConst, $translate) {
<<<<<<< HEAD
=======
  
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    return {
        webServiceCallPost: function(data, action) {
            //alert("data 1st parameter :"+JSON.stringify(data));
            //alert("action 2st parameter :"+JSON.stringify(action));
<<<<<<< HEAD
            var data_send = JSON.stringify(data);
            console.log("data:   "+data_send);
            console.log("action    "+JSON.stringify(action));
            var deferred = $q.defer();

            if(action=="item_review"){
                data = data_send;
//                alert(data);
            }
=======
            console.log("data:   "+JSON.stringify(data));
            console.log("action    "+JSON.stringify(action));
            var deferred = $q.defer();
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                       // 
                return $.ajax({
                    type: "POST",
                    url: appConst.serviceUrl.service + action,
                    crossDomain: true,
                    dataType: "json",
                    data: data,
                    timeout: 2000000,
                    async: true,
                    success: function(response) {
<<<<<<< HEAD
                    //    alert(JSON.stringify(response));
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                        console.log("response \n:"+JSON.stringify(response));
                       // alert("response    "+JSON.stringify(response));
                        deferred.resolve();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
<<<<<<< HEAD
                        //alert("errorrrr");
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                        $ionicLoading.hide();
                       // alert("status   :"+xhr.status);
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
            /*} else {
                window.plugins.toast.showShortBottom($translate.instant("checkNetWorkConnection"));
                $ionicLoading.hide();
                var response1 = [{
                    "data": []
                }, {
                    "response": {
                        "message": $translate.instant("checkNetWorkConnection"),
                        "status": 0
                    }
                }];
                return $http.get('').then(function(response) {
                    return response1;
                });
            }*/
        },
        webServiceCallGoogleGet: function(data, action) {
            var deferred = $q.defer();
          //  if (navigator.connection.type != "none") {
                return $.ajax({
                    type: "GET",
                    url: "https://www.googleapis.com/plus/v1/people/me?access_token=" + action,
                    crossDomain: true,
                    dataType: "json",
                    timeout: 2000000,
                    async: true,
                    success: function(response) {
                        deferred.resolve();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        $ionicLoading.hide();
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
           /* } else {
                window.plugins.toast.showShortBottom($translate.instant("checkNetWorkConnection"));
                $ionicLoading.hide();
                var response1 = [{
                    "data": []
                }, {
                    "response": {
                        "message": $translate.instant("checkNetWorkConnection"),
                        "status": 0
                    }
                }];
                return $http.get('').then(function(response) {
                    return response1;
                });
            }*/
        },
        forgotPasswordService: function(data, action) {
            var deferred = $q.defer();
          //  if (navigator.connection.type != "none") {
                return $.ajax({
                    type: "POST",
                    url: appConst.serviceUrl.service_login + action,
                    crossDomain: true,
                    dataType: "json",
                    data: data,
                    timeout: 20000,
                    async: true,
                    success: function(response) {
                        console.log("response    "+JSON.stringify(response));
                        deferred.resolve();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        $ionicLoading.hide();
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
           /* } else {
                window.plugins.toast.showShortBottom($translate.instant("checkNetWorkConnection"));
                $ionicLoading.hide();
                var response1 = [{
                    "data": []
                }, {
                    "response": {
                        "message": $translate.instant("checkNetWorkConnection"),
                        "status": 0
                    }
                }];
                return $http.get('').then(function(response) {
                    return response1;
                });
            }*/
        },
        webServiceCallGet: function(action) {
            return $http.get(appConst.serviceUrl.service + action).then(function(response) {
                return response;
            });
<<<<<<< HEAD
        },
        pa: function(object,string, isShown) {
		if(isShown){
            		//alert(string+' '+JSON.stringify(object)+' '+string);
		}
        },
        pc: function(object,string, isShown) {
		if(isShown){
            		console.log(string+' '+JSON.stringify(object)+' '+string);
		}
=======
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        }
    }
});

app.service('findItemIndex', function($q) {
    this.findItemIndexInCartList = function(Array, property, action) {
            var result = -1;
            angular.forEach(Array, function(value, index) {
                if (value.item_id == action) {
                    result = index;
                }
            });
            return result;
        },
        this.findAddonIndexInCartList = function(Array, property, action) {
            var defer = $q.defer();
            var result = -1;
            if (Array.length == 0) {
                defer.resolve(-1);
            } else {
                angular.forEach(Array, function(value, key) {
                    if (value.addon_id == action) {
                        result = key;
                    }
                    if(Array.length-1 == key){
                        defer.resolve(result);
                    }
                });

            }
            return defer.promise;
        },
        this.findItemIndexInAddons = function(Array, property, action) {
            var defer = $q.defer();
            var result = -1;
            if (Array.length == 0) {
                defer.resolve(result);
            } else {
                angular.forEach(Array, function(value, index) {
                    if (value.item_id == action) {
                        result = index;
                        defer.resolve(result);
                    } else {
                        defer.resolve(result);
                    }
                });
            }
            return defer.promise;
        }
});
