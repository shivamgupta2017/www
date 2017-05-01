"use strict";
app.controller('dashboardCtrl', function($scope,$cordovaNetwork,$location, $ionicSlideBoxDelegate,$ionicTabsDelegate, $cordovaPush, appConst, $ionicPopup,$state, globalMethods, $translate, $ionicLoading, 
Services, $localStorage, $rootScope, $ionicHistory) {
	

$scope.showPrompt = function() {

    
     $scope.item={};
     
        var promptPopup = $ionicPopup.show({
        template:'<input type="number" min="1" placeholder="enter table no" ng-model="item.number">',
         title: 'Table Number',
         scope: $scope,
         inputPlaceholder: 'Enter your table no',
          buttons : [{
    text: '<b>Asign Table</b>',
    type: 'button-positive',
    onTap: function(e) 
   {
       var pattern = /^\d+$/;
      if (($scope.item.number==undefined)||(!pattern.test($scope.item.number))) 
     {  
    window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
   
        e.preventDefault();                     
     } 
     else {
         return $scope.item;    
          }
            }         
         }]
      });
     promptPopup.then(function(res) {
        $rootScope.table_no=res.number;
        $localStorage.table_no =$rootScope.table_no;
        // $rootScope.value = $localStorage.table_no;
        $rootScope.checkval=true;
});
        };



  /*  $scope.getCategories = function() {
        angular.element(document).ready(function() {
            $rootScope.cartCount = $localStorage.cart_list.length;
            if ($rootScope.categories.length == 0) {
                $ionicLoading.show();
                Services.webServiceCallPost('', appConst.services.get_menu_card).then(function(response) {
                    $ionicLoading.hide();
                    if (response[1].response.status == 1) {
			
                        if (response[0].data.menu.length > 0) {
                            var categoryResponse = [];
                            angular.forEach(response[0].data.menu, function(value, key) {
                                if (value.menu_image_name != '') {
                                    var extraData = {
                                        imageUrl: appConst.serviceUrl.menu_image_url + value.menu_image_name
                                    }
                                } else {
                                    var extraData = {
                                        imageUrl: 'img/screen.png'
                                    };
                                }
                                angular.extend(value, extraData);
                                categoryResponse.push(value);

                            });
                            $rootScope.categories = globalMethods.getDashboardGridView(categoryResponse, 1);
			    //console.log("cat2"+JSON.stringify($rootScope.categories)+"cat2");
                        }
                        if (response[0].data.addons.length > 0) {
                            $rootScope.totalAddons = [];
                            angular.forEach(response[0].data.addons, function(value, key) {
                                var extraData = {
                                    "finalCost": value.price,
                                    "quantity": 1,
                                    imageUrl: appConst.serviceUrl.addon_image_url + value.addon_image
                                };
                                angular.extend(value, extraData);
                   
                                $rootScope.totalAddons.push(value);
                            });
                        }
                        $scope.getSiteSettings();

                    }
                    $rootScope.dashboardHistoryId = $ionicHistory.currentHistoryId();
		    
                });
            }
        });
    }*/
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady(){
        document.addEventListener("backbutton", function(e){
           if($location.path()=="/app/dashboard"){
               e.preventDefault();
               navigator.app.exitApp();
           }
           else {
               navigator.app.backHistory();
           }
        }, false);
    }





    $scope.handleCartListIcon = function(id) {
        if ($localStorage.cart_list.length > 0) {
            $('#' + id).show();
        } else {
            $('#' + id).hide();
        }
    }
    $scope.getSiteSettings = function() {
        var response = JSON.parse(localStorage.getItem('siteSettings'));
        $rootScope.siteSettings = response[0].data.siteDetails[0];
	
        $rootScope.languages = response[0].data.language_types;
        var fromDate = new Date(moment($rootScope.siteSettings.from_time, "HH:mm"));
        var toDate = new Date(moment($rootScope.siteSettings.to_time, "HH:mm"));
        var d1 = new Date();
        var d2 = new Date(fromDate);
        var d3 = new Date(toDate);
        if (globalMethods.checkTimings(d1, d2, d3, $translate.instant("crunchyRestaurantIsCurrentlyClosed"))) {
            var myPopup = $ionicPopup.show({
                templateUrl: 'modules/home/timingsPopup.html',
                title: $translate.instant("restarrentTimings"),
                cssClass: 'timings-popup',
                buttons: [{
                    text: $translate.instant("ok"),
                    type: 'button-assertive'
                }]
            });
        }
    }

     $scope.$on('$ionicView.loaded', function (viewInfo, state) {
	//$scope.getCategories();
        $scope.getItemsList();
    });

    $scope.opensearch=function(){

    $location.path(appConst.path.search);
        $rootScope.cartListBack_button = true;

    }
    $scope.viewCart = function() {
        $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;
    }

    $scope.openItem = function(item) {
        $state.go(appConst.state.items_list,{pos:item});

    }
    $scope.lockSlide = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
    }

    $scope.next = function() {
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(false);
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.previous();
        $ionicSlideBoxDelegate.enableSlide(false);
    };


/*******************************************extra function ***********************************************/
	$scope.getItemsList = function() {
    		$scope.totalAddonsCost = 0;
        	$ionicLoading.show();
        	Services.webServiceCallPost($rootScope.selectedItem, appConst.services.get_items).then(function(response){
            		$ionicLoading.hide();
            		$scope.handleCartListIcon('cart_list_icon2');
           
            		if (response[1].response.status == 1) {



        $rootScope.allitemscategories=response[0].data;
        for(var kl=0 ; kl<$rootScope.allitemscategories.length ; kl++){
                
            for(var lm=0; lm<$rootScope.allitemscategories[kl].items.length; lm++){
                
                 var extraData = {
                                        imageUrl: appConst.serviceUrl.item_image_url + $rootScope.allitemscategories[kl].items[lm].item_image_name,
                                        imageUrlThumb: appConst.serviceUrl.item_image_url_thumb + $rootScope.allitemscategories[kl].items[lm].item_image_name,
                                        size_id: '',
                                        size_name: '',
                                        item_size_id: '',
                                        size_price: '',
                                        avg_rating: $rootScope.allitemscategories[kl].items[lm].rating[0].average_rating,
                                        no_of_users: $rootScope.allitemscategories[kl].items[lm].rating[0].no_of_users,
                                        costAfterSize: $rootScope.allitemscategories[kl].items[lm].item_cost
                                    };  

                     angular.extend($rootScope.allitemscategories[kl].items[lm],extraData); 

            }

            
        }

            }
        });
    }






/********************************************extra function **********************************************/








});




/**************************************************************************************************************************************
*******************************************************  Cart List Items  *************************************************************
***************************************************************************************************************************************/
app.controller('cartListCtrl', function($scope, $location, appConst, globalMethods,$state, $localStorage, $rootScope, $ionicHistory, findItemIndex, Services, $translate) {
	$scope.cost = {
		totalCost: 0
	};
	$scope.noItemsInCart = "";
	$scope.cartListItems = [];
	$rootScope.orderDetails = [];
	$scope.sbookedAddons = [];

	$scope.cartListBack = function() {
		$ionicHistory.goBack();
    	}

	$scope.edit_order = function(val) {
        	if ($localStorage.cart_list.length > 0) {
            		if (val == 'true') {
                		$scope.handleEditDoneIcons('edit', 'done');
                $scope.editOrderVal = true;
            } else {
                $scope.handleEditDoneIcons('done', 'edit');
                $scope.editOrderVal = false;
            }
        } else {
            $scope.handleEditDoneIcons('', 'edit');
            $scope.handleEditDoneIcons('', 'done');
            $scope.editOrderVal = false;
        }
    }
    $scope.getCartList = function() {
        angular.element(document).ready(function() {
            $scope.handleEditDoneIcons('edit', 'done');
            $scope.editOrderVal = true;
            $scope.noItemsInCart = "";
	    Services.pa($localStorage.cart_list,'cartlistfull',1);
		Services.pa($localStorage.bookedAddons,'booke3d',1);
            if ($localStorage.cart_list.length > 0) {
                $scope.cartListItems = [];
		console.log("wheel"+JSON.stringify($localStorage.cart_list)+"wheel");
                angular.forEach($localStorage.cart_list, function(value, key) {
                    var extraData = {
                        "finalCost": value.costAfterSize,
                        "quantity": 1
                    };
                    angular.extend(value, extraData);
                    $scope.cartListItems.push(value);
 			Services.pa(value,'s',0);
                });
                $scope.calculateTotalCost($scope.cartListItems);
            } else {

                $scope.noItemsInCart = $translate.instant("noItemsInYourCart");
            }

 if ($localStorage.bookedAddons.length > 0) {
    	$scope.sbookedAddons = [];
    	angular.forEach($localStorage.bookedAddons, function(value, key) {
       		 var extraData = {
                    
                    "addon_name":value.addon_name,
                     "quantity": parseInt(value.quantity),
                     "finalCost":parseInt(value.finalCost)
                    };
		if(value.size_id==undefined || value.size_id == null || value.size_id== ''){
			extraData.item_size_id=0;
			extraData.size_id=0;
		}
        	angular.extend(value, extraData);

        	$scope.sbookedAddons.push(value);
	
         });

         $scope.calculateTotalCost($scope.cartListItems);
 } else {
               $scope.noItemsInCart = $translate.instant("noItemsInYourCart");
 }
   
        });
	
     
     }




    $scope.removeItem = function(array, id) {

        findItemIndex.findItemIndexInAddons(array, '', id).then(function(index) {
            if (index != -1) {
                array.splice(index, 1);
                $scope.removeItem(array, id);
            }
        });
    }
    $scope.remove_item_from_cart = function(item) {

        var index = findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id);
        if (index != -1) {
            if ($localStorage.bookedAddons.length > 0) {
                $scope.removeItem($localStorage.bookedAddons, item.item_id);
                $scope.sbookedAddons = [];
            //if you face problem regarding above line you may delete it .

            }

            $localStorage.cart_list.splice(index, 1);
            $scope.cartListItems.splice(index, 1);
            $scope.calculateTotalCost($scope.cartListItems);
            $rootScope.cartCount = $scope.cartListItems.length;
            if ($localStorage.cart_list.length == 0) {
                $scope.handleEditDoneIcons('', 'edit');
                $scope.handleEditDoneIcons('', 'done');
                $scope.noItemsInCart = $translate.instant("noItemsInYourCart");
                $scope.editOrderVal = false;
		//$scope.sbookedAddons=[];
                $localStorage.bookedAddons = [];
            }
        }
    }
    $scope.remove_addon_from_cart = function(item) {

        var index=findItemIndex.findAddonIndexInCartList($localStorage.bookedAddons, '', item.addon_id).then(function(index) {
            if (index != -1) {

                

                $localStorage.bookedAddons.splice(index, 1);
                $scope.sbookedAddons.splice(index, 1);
                $scope.calculateTotalCost($scope.cartListItems);
                if ($localStorage.cart_list.length == 0) {
                    $scope.handleEditDoneIcons('', 'edit');
                    $scope.handleEditDoneIcons('', 'done');

                    $scope.noItemsInCart = $translate.instant("noItemsInYourCart");
                    $scope.editOrderVal = false;
                    //mizan
                    $rootScope.bookedAddons = [];
                }
            }
        });

    }
    $scope.subtractQuantity = function(quantity) {
        


        if (parseInt(quantity) > 1) {
            return parseInt(quantity) - 1;
        } else {
            return parseInt(quantity);
        }
    }
    $scope.changeQuantity = function(quantity, unitCost) {
        return parseInt(quantity) * parseInt(unitCost);
    }

    $scope.changeCartAddonQuantity = function(item,quantity, unitCost) {
            angular.forEach($localStorage.bookedAddons,function(value,key){
                if(value.addon_id == item.addon_id){
                    $localStorage.bookedAddons[key].quantity = quantity;
                    $localStorage.bookedAddons[key].finalCost = parseInt(quantity) * parseInt(unitCost);

                }
            });
            return parseInt(quantity) * parseInt(unitCost);

        }


    $scope.calculateTotalCost = function(items, addons, cost) {
        $scope.cost.totalCost = 0;
        angular.forEach(items, function(value, key) {
            $scope.cost.totalCost = parseInt(value.finalCost) + parseInt($scope.cost.totalCost);
        });
        if ($localStorage.bookedAddons.length > 0) {
            angular.forEach($localStorage.bookedAddons, function(value, key) {
                $scope.cost.totalCost = parseInt(value.finalCost) + parseInt($scope.cost.totalCost);
            });
        }
    }
    $scope.addQuantity = function(quantity) {
        return parseInt(quantity) + 1;
    }
    $scope.home = function() {
        $location.path(appConst.path.dashboard);
    };
    $scope.saveAndContinue = function() {
        angular.forEach($scope.cartListItems, function(value, key) {
            var itemDetails = {
                item_id: value.item_id,
                menu_id: value.menu_id,
                item_name: value.item_name,
                item_cost: value.item_cost,
                item_type: value.item_type,
                item_image_name: value.item_image_name,
                item_description: value.item_description,
                status: value.status,
                size_id: value.size_id,
                size_name: value.size_name,
                item_size_id: value.item_size_id,
                size_price: value.size_price,
                finalCost: value.finalCost,
                quantity: value.quantity
            }
	    if(itemDetails.size_id==''){
		itemDetails.size_id=0;
		itemDetails.size_name='Regular';
		itemDetails.item_size_id=0;
	    }
		Services.pa(itemDetails,'service',1  );
            $rootScope.orderDetails.push(itemDetails);
        });


        $rootScope.totalCost = $scope.cost.totalCost;
	$localStorage.totalCost = $scope.cost.totalCost;
	alert('total cost from shivam side:'+$localStorage.totalCost+'total cost from shivam side');
	$state.go(appConst.state.home_delivery,{cost:$scope.cost.totalCost});

      /*  if (globalMethods.checkUserLogin()) {
            $location.path(appConst.path.home_delivery);
        } else {
            $rootScope.loginThrough = "order";
            $location.path(appConst.path.registration);
        }*/
    }
    $scope.handleEditDoneIcons = function(idShow, idHide) {
        if ($localStorage.cart_list.length > 0) {
            $('#' + idShow).show();
            $('#' + idHide).hide();
        } else {
            $('#' + idShow).hide();
            $('#' + idHide).hide();
        }
    }
});



/*********************************************************************************************************************
*****************************************home delivery controller*****************************************************
**********************************************************************************************************************/
app.controller('homeDeliveryCtrl', function($scope, $location,$stateParams, appConst, globalMethods, $ionicPopup, $ionicLoading, Services, $localStorage, $rootScope, $ionicModal, $filter, $translate) {
    $scope.booking = {};
    $scope.address = {};
    $scope.addressCheck = {};
    $rootScope.bookingAddress = {};
    $scope.customer=$localStorage.customerdetails;
    $scope.booking.name=$scope.customer.name;
    $scope.booking.number=$scope.customer.number;
    $scope.booking.email=$scope.customer.email;
    $scope.booking.cost=$stateParams.cost;
   /* $scope.homeDeliveryInit = function() {
        $scope.booking.phone = parseInt($localStorage.userProfile.phone);
        $scope.booking.choice = 'online';
        $scope.addressCheck.choice = '';
	
        $scope.booking.cost = $rootScope.totalCost;
        $scope.booking.location = '';
        $scope.booking.city = '';
        var params = {
            id: $localStorage.userProfile.id,
            email: $localStorage.userProfile.email,
            password: $localStorage.userProfile.password
        };
        $ionicLoading.show();
        Services.webServiceCallPost(params, 'get_user_address').then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                $rootScope.addedAddress = response[0].data;

            }
        });
    }*/
    /*$scope.addAddress = function() {
        var params = {
            user_id: $localStorage.userProfile.id,
            email: $localStorage.userProfile.email,
            password: $localStorage.userProfile.password,
            city: '',
            landmark: '',
            house_no: '',
            apartment_name: '',
            other: ''
        };
        angular.extend(params, $scope.address);
        if (params.city == '') {
            window.plugins.toast.show($translate.instant("selectCity"), 'short', 'bottom');
        } else if (params.landmark == '') {
            window.plugins.toast.show($translate.instant("selectLandmark"), 'short', 'bottom');
        } else {

            $ionicLoading.show();
            Services.webServiceCallPost(params, 'add_user_address').then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 1) {
                    var params = {
                        id: $localStorage.userProfile.id,
                        email: $localStorage.userProfile.email,
                        password: $localStorage.userProfile.password
                    };
                    $ionicLoading.show();
                    Services.webServiceCallPost(params, 'get_user_address').then(function(response) {
                        $ionicLoading.hide();
                        if (response[1].response.status == 1) {
                            $rootScope.addedAddress = response[0].data;
                        }
                    });
                    $location.path('/app/home_delivery');
                }
            });
        }
    }*/

    $scope.selectBookingAddress = function(address) {
        $rootScope.bookingAddress = address;
    }
    $scope.setSaveOrderParams = function() {


        $rootScope.saveOrderParams = {
            email: $localStorage.customerdetails.email,
           // user_id: $localStorage.userProfile.id,
           // order_date: moment($('#delivery_book_date').val(), ["DD-MM-YYYY HH:mm A"]).format("YYYY-MM-DD"),
           // order_time: moment($('#delivery_book_date').val(), ["DD-MM-YYYY hh:mm A"]).format("hh:mm A"),
            order_date:moment().format('YYYY-MM-DD'),
            order_time:moment().format('hh:mm A'),
            total_cost: $stateParams.cost,
            customer_name: $localStorage.customerdetails.name,
            phone: $localStorage.customerdetails.number, 
            table_no:$localStorage.table_no, 
           // house_no: $rootScope.bookingAddress.house_no,//no need but dont delete
            //apartment_name: $rootScope.bookingAddress.apartment_name,//no need but dont delete
           // other: $rootScope.bookingAddress.other,//no need but dont delete
            //address: $rootScope.bookingAddress.house_no + "  " + $rootScope.bookingAddress.apartment_name,
            //landmark: $rootScope.bookingAddress.landmark,
            //city: $rootScope.bookingAddress.city,
            //state: '',
            //pincode: '',
           // order_type: 'home',
            payment_type: $scope.booking.choice,
            payment_gateway:'Cash',
            no_of_items: $rootScope.orderDetails.length,
            order_summary: JSON.stringify($rootScope.orderDetails),
            isAddons: $localStorage.bookedAddons.length > 0 ? 1 : 0,
            addons_summary: JSON.stringify($localStorage.bookedAddons)
            //order_by_device_id: localStorage.getItem("registrationId")
        }

    }


$scope.doPayment = function() {
    $scope.booking.choice = 'cash';
	//var from_date = new Date(moment($rootScope.siteSettings.from_time, "HH:mm"));
        //var to_date = new Date(moment($rootScope.siteSettings.to_time, "HH:mm"));
	
        //var d1 = new Date(moment($('#delivery_book_date').val(), ["DD-MM-YYYY HH:mm A"]).format("YYYY-MM-DD hh:mm A"));
       // var d2 = new Date(from_date);
       // var d3 = new Date(to_date);

      /*  if ($('#delivery_book_date').val() == '') {
        	window.plugins.toast.show($translate.instant("specifyDate"), 'short', 'bottom');
        }*
	else if(globalMethods.checkTimings(d1,d2,d3,$translate.instant("crunchyRestaurantNotAvailableOnSelectedTime"))){
		var myPopup = $ionicPopup.show({
                templateUrl: 'modules/home/timingsPopup.html',
                title: $translate.instant("restaruentTimings"),
                cssClass: 'timings-popup',
                buttons: [{
                    text: $translate.instant("ok"),
                    type: 'button-assertive'
                }]
            });
        } /*else if ($scope.addressCheck.choice == '') {

            window.plugins.toast.show($translate.instant("selectAddress"), 'short', 'bottom');
        }*/if ($scope.booking.choice == 'online') {

            $scope.setSaveOrderParams();
            $location.path(appConst.path.payment);
        } else if ($scope.booking.choice == 'cash') {
           // $scope.addressCheck.choice=106;

            $scope.setSaveOrderParams();

            $scope.transaction_details = {
                transaction_id: '',
                paid_date: '',
                payer_name: '',
                payer_email: '',
                payment_status: '',
                payment_gateway:'Cash'
            };
		 
            $scope.saveOrder();
        }
    }

    $scope.open_cities_modal = function(page) {
        $rootScope.pageType = page;
        $ionicModal.fromTemplateUrl(appConst.page.search_cities_modalHtml, {
            scope: $scope,
            animation: 'slide-in-up',
            preserveScope: true
        }).then(function(modal) {
            $scope.search_cities_model = modal;
            globalMethods.get_locations();
            $scope.search_cities_model.show();
        });
        
    }
    $scope.close_cities_modal = function() {
        $scope.search_cities_model.hide();
    }
    $scope.locality = [];
    $scope.open_location_modal = function(page) {
        $rootScope.pageType = page;
        if ($scope.address.city && $scope.address.city != '') {
            $ionicModal.fromTemplateUrl(appConst.page.search_locations_modalHtml, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.search_location_model = modal;
                $scope.search_location_model.show();
            });
        } else {
            window.plugins.toast.show($translate.instant("selectCity"), 'short', 'bottom');
        }
    }
    $scope.close_location_modal = function() {
        $scope.search_location_model.hide();
    }
    $scope.select_city = function(item) {
        $scope.address.city = item.city_name;
        $rootScope.selectedCityId = item.city_id;
        $scope.close_cities_modal();
    }
    $scope.select_location = function(item) {
        $scope.address.landmark = item.locality;
        $scope.close_location_modal();
    }
    var year = new Date().getFullYear();
    var month = parseInt(new Date().getMonth());
    var date = parseInt(new Date().getDate() + 1);
    var hour = new Date().getHours();
    var minute = parseInt('00');
    var min = new Date(year, month, date, hour, minute);
    $scope.dateMin = $filter('date')(min, 'yyyy-MM-dd');
    var year = new Date().getFullYear();
    var minDate = new Date().getDate();
    var minMonth = new Date().getMonth();
    var date = parseInt('01');
    var time = parseInt('00');
    var mnt = parseInt(new Date().getMinutes());
    var minute = parseInt(mnt);
    var hour = parseInt(new Date().getHours());
    var min = new Date(year, minMonth, minDate, hour, minute);
    var max = new Date(year + 50, date, date, time, time);
    /*$('#delivery_book_date').mobiscroll().datetime({
        theme: 'android-ics',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'dd M yy',
        dateFormat: "dd-mm-yy",
        minDate: min,
        maxDate: max
    });*/
    $scope.saveOrder = function() {
        
	$rootScope.saveOrderParams.address="abc def";
	$rootScope.saveOrderParams.city="indore"
	$rootScope.saveOrderParams.landmark="indore"

        angular.extend($rootScope.saveOrderParams, $scope.transaction_details);
        $ionicLoading.show();
        //Yash
        if($localStorage.order_id==''){
		console.log('order'+JSON.stringify($rootScope.saveOrderParams)+'order');
        Services.webServiceCallPost($rootScope.saveOrderParams, appConst.services.save_order).then(function(response) {
            $ionicLoading.hide();
             //Yash

            $localStorage.order_id = response[0].data.order_id;
		$rootScope.showWidget=$localStorage.order_id;
		//console.log(JSON.stringify(response));
            if (response[1].response.status == 1) {
	
                $localStorage.cart_list = [];
                $localStorage.bookedAddons = [];
                $rootScope.orderDetails = [];
                
                $rootScope.saveOrderParams = {};
                $location.path(appConst.path.payment_status);
                window.plugins.toast.show('Your order has been created Sucessfully', 'short', 'bottom');
            }
        });
         //Yash
    }else{

            $rootScope.saveOrderParams.order_id = $localStorage.order_id;
	
	    console.log('order'+JSON.stringify($rootScope.saveOrderParams)+'order');
            Services.webServiceCallPost($rootScope.saveOrderParams, appConst.services.save_order).then(function(response) {
            $ionicLoading.hide();
            $localStorage.order_id = response[0].data.order_id;
		$rootScope.showWidget=$localStorage.order_id;
        //console.log(JSON.stringify(response));
            if (response[1].response.status == 1) {
                $localStorage.cart_list = [];
                $localStorage.bookedAddons = [];
                $rootScope.orderDetails = [];
                
                $rootScope.saveOrderParams = {};
                $location.path(appConst.path.payment_status);
                window.plugins.toast.show('Your order has been updated', 'short', 'bottom');
        }
    })
        }; //Yash
    }
});


/************************************************************************************************************************************
*****************************************************  Change Language  *************************************************************
************************************************************************************************************************************/
app.controller('changeLanguageCtrl', function($scope, $translate) {
	$scope.language = {
		name: localStorage.getItem('defaultLanguage')
	};

	$scope.setLanguage = function(item) {
		localStorage.setItem('defaultLanguage', item.language_code);
		$translate.use(localStorage.getItem('defaultLanguage'));
	}
});


/*****************************************************************************************************************************************
******************************************************wheel ctrl ***********************************************************************
******************************************************************************************************************************************/
app.controller('wheelCtrl', function($ionicLoading,$location,$ionicSlideBoxDelegate,$localStorage,globalMethods,$scope,Services,appConst,$rootScope,$state,$stateParams,$ionicPopup){ 

	$scope.finishDineIn=function(){
        	if($localStorage.order_id)
        		$location.path(appConst.path.finishDineIn);
    		else{
		   	var alertPopup = $ionicPopup.alert({
     				title: 'Alert !',
      				template: '<h4>Create an order first</h4>'
    			});
   			alertPopup.then(function(res) {
     				 console.log('Thank you for not eating my delicious ice cream cone');
    			});
    			window.plugins.toast.show($translate.instant("create a order first"), 'short', 'bottom');
		}
	};

	$scope.orders=function(){
		if($localStorage.order_id){
		        $location.path(appConst.path.orders);
    		}
    		else{
			var alertPopup = $ionicPopup.alert({
				title: 'Alert !',
      				template: '<h4>Create an order first</h4>'
    			});
   			alertPopup.then(function(res) {
     				 console.log('Thank you for not eating my delicious ice cream cone');
    			});
    			window.plugins.toast.show($translate.instant("create a order first"), 'short', 'bottom');
		}
    	};

	$scope.showPrompt = function() {
		if($localStorage.table_no=='' || $localStorage.table_no==undefined){
			$scope.item={};
			$scope.npad=function(a){
				var input=document.getElementById('npad');
				if(a==12)
					input.value="";
				else if(a==11)
					input.value=input.value.substring(0,input.value.length-1);
				else 
					input.value=parseInt(input.value+a);
				$scope.item.number=input.value;
			}

			var promptPopup = $ionicPopup.show({
        			template:'<input type="number" ng-disabled="true" id="npad" min="1" placeholder="enter table no" ng-model="item.number"> <div style="border:3px solid #444444; background-color:#444444"><div class="tablec" ng-repeat="a in [1,2,3,4,5,6,7,8,9,0,11,12]" ng-click="npad(a)"><i ng-if="a==12">C</i><i ng-if="a==11">Del</i><i ng-if="a<11">{{a}}</i></div></div>',
         			title: 'Table Number',
         			scope: $scope,
         			inputPlaceholder: 'Enter your table no',
          			buttons : [{
    					text: '<b>Asign Table</b>',
    					type: 'button-dark',
    					onTap: function(e){
       						var pattern = /^\d+$/;
      						if (($scope.item.number==undefined)||(!pattern.test($scope.item.number))){  
    							window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
           						e.preventDefault();                     
     						} 
     						else {
         						return $scope.item;    
         			 		}
            				}	         
         			}]
			});

			promptPopup.then(function(res) {
				$rootScope.table_no=res.number;
				$localStorage.table_no =$rootScope.table_no;
				$scope.table_no = $rootScope.table_no;
				$scope.showPrompt1();
				$rootScope.checkval=true;      
        		});
		}
 	};// show Prompt();

	$scope.showPrompt();

	$scope.viewCart = function() {
        	$location.path(appConst.path.cart_list);
        	$rootScope.cartListBack_button = true;
    	}

	$scope.showPrompt1 = function() {
		$scope.userab={
			name:"mizan rehman",
			number:"9424081993",
			email:"mizan@rehman.com"
	};
   
        var promptPopup = $ionicPopup.show({
        	template:'<input type="text" placeholder="Enter Your Name" ng-model="userab.name"><input type="text" placeholder="Mobile Number"  ng-model="userab.number"><input type="text" placeholder="Email Address" ng-model="userab.email" >',
         	title: '<span style="color:#444444">Enter Your Details</span>',
         	scope: $scope,
         	//inputPlaceholder: 'Enter your table no',
          	buttons : [{
    			text: '<b>Submit</b>',
    			type: 'button-dark',
    			onTap: function(e) 
   			{
       				var mobileRegex = /^[\d]{10}$/;
				var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
				var nameRegex = /^[A-Za-z\s]+$/;
				if (($scope.userab.name==undefined)||(!nameRegex.test($scope.userab.name))) 
     				{  

    			window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
           				e.preventDefault();                     
     				}				                 
      				else if (($scope.userab.number==undefined)||(!mobileRegex.test($scope.userab.number))) 
     				{  

    			window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
           				e.preventDefault();                     
     				} 
				else if (($scope.userab.email==undefined)||(!emailRegex.test($scope.userab.email))) 
     				{  

    			window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
           				e.preventDefault();                     
     				}  
     				else {
         				return $scope.userab;    
         			 }
            		}         
         	}]
      	});

	promptPopup.then(function(res) {
        	$localStorage.customerdetails =res;

        	$rootScope.checkval=true;      
        });



}
$scope.getSiteSettings = function() {
        var response = JSON.parse(localStorage.getItem('siteSettings'));
        $rootScope.siteSettings = response[0].data.siteDetails[0];
        $rootScope.languages = response[0].data.language_types;
        var fromDate = new Date(moment($rootScope.siteSettings.from_time, "HH:mm"));
        var toDate = new Date(moment($rootScope.siteSettings.to_time, "HH:mm"));
        var d1 = new Date();
        var d2 = new Date(fromDate);
        var d3 = new Date(toDate);
        if (globalMethods.checkTimings(d1, d2, d3, $translate.instant("crunchyRestaurantIsCurrentlyClosed"))) {
            var myPopup = $ionicPopup.show({
                templateUrl: 'modules/home/timingsPopup.html',
                title: $translate.instant("restarrentTimings"),
                cssClass: 'timings-popup',
                buttons: [{
                    text: $translate.instant("ok"),
                    type: 'button-assertive'
                }]
            });
        }
    }


    $scope.getCategories = function() {
        angular.element(document).ready(function() {
            $rootScope.cartCount = $localStorage.cart_list.length;
            if ($rootScope.categories.length == 0) {
                $ionicLoading.show();
                Services.webServiceCallPost('', appConst.services.get_menu_card).then(function(response) {
                    $ionicLoading.hide();
                    if (response[1].response.status == 1) {
			
                        if (response[0].data.menu.length > 0) {
                            var categoryResponse = [];
                            angular.forEach(response[0].data.menu, function(value, key) {
                                if (value.menu_image_name != '') {
                                    var extraData = {
                                        imageUrl: appConst.serviceUrl.menu_image_url + value.menu_image_name
                                    }
                                } else {
                                    var extraData = {
                                        imageUrl: 'img/screen.png'
                                    };
                                }
                                angular.extend(value, extraData);
                                categoryResponse.push(value);

                            });
		
                            $rootScope.categories = globalMethods.getDashboardGridView(categoryResponse, 1);
			    //console.log("cat2"+JSON.stringify($rootScope.categories)+"cat2");
                        }
                        if (response[0].data.addons.length > 0) {
                            $rootScope.totalAddons = [];
                            angular.forEach(response[0].data.addons, function(value, key) {
                                var extraData = {
                                    "finalCost": value.price,
                                    "quantity": 1,
                                    imageUrl: appConst.serviceUrl.addon_image_url + value.addon_image
                                };
                                angular.extend(value, extraData);
                   
                                $rootScope.totalAddons.push(value);
                            });
                        }
                        $scope.getSiteSettings();

                    }
                    $rootScope.dashboardHistoryId = $ionicHistory.currentHistoryId();
		    
                });
            }
        });
    }

     $scope.$on('$ionicView.loaded', function (viewInfo, state) {
	$scope.getCategories();
    });

  });



/******************************************************************************************************************************************
****************************************************************Finish dine in controller *************************************************
*******************************************************************************************************************************************/
app.controller('DineInctrl', function($scope, $ionicModal,$location, $ionicPopup,appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services){
	
//	$scope.typeTax=1;
var taxResponse = localStorage.getItem('taxSettings');


//console.log('$scope.tax :'+JSON.stringify($scope.tax)+'$scope.tax');
//console.log('shivam bhyankar :'+JSON.stringify($scope.tax[0]));




	$scope.goBack=function(){
		$ionicHistory.goBack(-1);
	}
	$scope.cost = {
	        totalCost: 0,
	        

	};
	$scope.addonstotal=0;
	$scope.viewCart=function(){
		$location.path(appConst.path.cart_list);
        	$rootScope.cartListBack_button = true;
	};

		//dine in function
	$scope.dineInItems=function(){ 
    		$scope.dineInItems=[];
		$scope.finishDine={
    			order_id:$localStorage.order_id
		};
        	$ionicLoading.show();
        	Services.webServiceCallPost($scope.finishDine, appConst.services.get_Current_Orders).then(function(response) {
            		$ionicLoading.hide();
            		$scope.addonslist= response[0].data.addons;
            		if (response[1].response.status == 1) {
                		if (response[0].data.items.length > 0) {
                 			angular.forEach(response[0].data.items, function(value, key) {
						var extraData = {
                                    			"item_name" : value.item_name,
                                    			"item_qty" :value.item_qty,
                                    			"final_cost" :value.final_cost,

                                    		};
                                		angular.extend(value, extraData);
                                		$scope.dineInItems.push(value);
                            		});
		            		angular.forEach(response[0].data.addons, function(value, key) {
                                		$scope.addonstotal=parseFloat($scope.addonstotal)+parseFloat(value.final_cost);
                            		});
							$rootScope.dineInItems=$scope.dineInItems;
            				$scope.calculateTotalCost($scope.dineInItems);
				}
            		}
        	});
	}




	$scope.calculateTotalCost = function(dineInItems) 
	{			

				$scope.total_tax=0;
				$scope.tax=JSON.parse(taxResponse);

				

				$scope.AlongwithTax=[];
	       	 	$scope.cost.totalCost = 0;
	       	 	$scope.finalTax=0;
        		angular.forEach(dineInItems, function(value, key) 
        		{
            		$scope.cost.totalCost = parseInt(value.final_cost) + parseInt($scope.cost.totalCost);

          
            	});

            		
            		angular.forEach($scope.tax,function(value,key)
            		{

            			var extraData={
            				tax_name:value.tax_name,
            				type_tax:value.type_of_tax,
            				rate:value.value,
            				finalTax:''
            				
            			};

	            		if ($rootScope.checktax.status==0) 
	            		{
			 			if (extraData.type_tax==0)
	            			{	
	            				

	            				extraData.finalTax=extraData.rate;



	            			}
	            			  else if(extraData.type_tax==1) 
	            			 {	


	            			 	extraData.finalTax=Math.ceil((parseInt($scope.cost.totalCost+$scope.addonstotal)*parseInt(extraData.rate))/100);
	
		            		 	
	            			 }

	            			 $scope.total_tax=$scope.total_tax+parseInt(extraData.finalTax);
	            		
		            			 $scope.AlongwithTax.push(extraData);

	            			

	            		}


            		});
            		$rootScope.totalCost=$scope.total_tax+$scope.cost.totalCost+$scope.addonstotal;
            		alert('$rootscope.totalcost :'+$rootScope.totalCost);
    }

       

	$scope.openRestaurentLogin=function(page){
		$scope.rest={
        		user_name:"",
        		password:""
    		}
    		var promptPopup = $ionicPopup.show({
            		template:'<input type="text" placeholder="Enter Your login id" required="required" ng-model="rest.user_name"><input type="password" required="required" placeholder="enter your login credential"  ng-model="rest.password">',
            		title: '<span style="color:#444444">Restaurent login for payment</span>',
            		scope: $scope,
            		//inputPlaceholder: 'Enter your table no',
            		buttons : [{
                		text: '<b>Submit</b>',
                		type: 'button-dark',
                		onTap: function(e) {
                			var passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$/;
                			var nameRegex = /^[A-Za-z\s]+$/;

                			if (($scope.rest.user_name==undefined)||(!nameRegex.test($scope.rest.user_name))){  
						//alert('hello :add a proper value 1:');
						window.plugins.toast.show($translate.instant("add a proper value "), 'short', 'bottom');
						e.preventDefault(); 

                    			}                                
					else if (($scope.rest.password==undefined)||(passwordRegex.test($scope.rest.password))) {  
						//alert('hello :add a proper value 2:');
						
						window.plugins.toast.show($translate.instant("add a proper value "), 'short', 'bottom');
                        			e.preventDefault();                     
                    			} 
		                    	else {
                        			return $scope.rest;    
                     			}
                    		}         
            		},{

                		text: $translate.instant("cancel"),
                		type: 'button-dark',
                		onTap: function(e){  
					return false;
                		}
            		}]
		});

    		promptPopup.then(function(res) {
			if(res!=false)
					alert(res);
					$ionicLoading.show();
			Services.webServiceCallPost(res,'employee_login').then(function(response) 
			{
				$ionicLoading.hide();
				console.log('look here :'+JSON.stringify(response)+': look here');
				
				if (response[1].response.status == 1) 
				{
	   		               $scope.pay_status = response[1].response.message;
	            		  	$scope.paymentDoneviaCard();
	            }
	       	});
	        			
	        			$scope.rest={};
	        	}); 

	    	}//open restaurant login function end

	$scope.paymentDoneviaCard=function(){
		$location.path(appConst.path.paymentDoneviaCard);
   	}
});




/***************************************************************************************************************************************
****************************************************payment done via card **************************************************************
****************************************************************************************************************************************/
//when the payment will done then this controller works

app.controller('paymentDoneviaCardctrl',function($scope, $state, $timeout, $ionicModal,$location, appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicPopup,$ionicLoading,Services)
{	

	$scope.dineInItems=[];
	for(var ik=0;ik<$rootScope.dineInItems.length;ik++){
		if(ik==0)
		   $scope.dineInItems.push($rootScope.dineInItems[ik]);
		else{
			var k=1;
			for(var kl=0;kl<$scope.dineInItems.length; kl++){
				if($rootScope.dineInItems[ik].item_id==$scope.dineInItems[kl].item_id)
					k=0;

			}
			if(k)
			$scope.dineInItems.push($rootScope.dineInItems[ik]);
		}
	}
	$rootScope.dineInItems='';
	$scope.items=[];
    	$scope.jmm=[];
	$scope.finalresult=[];
	$scope.parameter={
		order_id: $scope.dineInItems[0].order_id,
	  	user_name: $localStorage.customerdetails.name,
	  	items:[],
	  	comment: null
	}

	for(var k=0; k<$scope.dineInItems.length; k++){
		var extraData={
			item_id:$scope.dineInItems[k].item_id,
		  	rating:0
		}
		$scope.parameter.items.push(extraData);
	}

	 /*$scope.paymentConfirmInit = function() {
	 	alert('hello');
        var history = $ionicHistory.viewHistory().histories[$rootScope.dashboardHistoryId];
        for (var i = history.stack.length - 1; i >= 0; i--) {
            if (history.stack[i].stateName == 'app.dashboard') {
                $ionicHistory.backView(history.stack[i]);
            }
        }
    } */

	$scope.clicktoSend=function(){
		$scope.return='true';
 		$ionicLoading.show();
        	Services.webServiceCallPost($scope.parameter, 'item_review').then(function(response) {
            		$ionicLoading.hide();
            		console.log("mera response :"+JSON.stringify(response));
           		if (response[1].response.status == 1) {
		    		var alertPopup = $ionicPopup.alert({
     					title: 'Thank you',
      					template: 'we appreciate your response <br>.....we hope to have you again'
    				});
   				alertPopup.then(function(res) {
				        $localStorage.order_id = '';
        				$rootScope.table_no = '';
					$rootScope.showWidget=undefined;
        				$rootScope.userab='';
        				$localStorage.table_no = '';
        				$localStorage.userab='';
					$localStorage.customerDetails={};
     				 	//$location.path(appConst.path.dashboard);
					$state.go('app.homeWheel');
    				});
    				window.plugins.toast.show($translate.instant("create a order first"), 'short', 'bottom');
            		}
        	});
	};

	$scope.paymentDoneaknowledge=function(){
		$scope.paymentDoneaknowledge={
    			payment_status:"true",
    			order_id:"270",
    			paid_amount: "100"
		};
		$ionicLoading.show();
		Services.webServiceCallPost($scope.paymentDoneaknowledge, appConst.services.update_order).then(function(response) 
		{
			$ionicLoading.hide();
			console.log("mera response :"+JSON.stringify(response));
			if (response[1].response.status == 1) {
   		               $scope.pay_status = response[1].response.message;
            		}
       		});
		}
});//controller khatm





/******************************************************************************************************************************************
**********************************************************items list controller ***********************************************************
******************************************************************************************************************************************/
app.controller('itemsListCtrl', function($state,$ionicModal,$scope, $stateParams, $ionicSlideBoxDelegate,$ionicPopup,$ionicHistory,$location,appConst, $ionicLoading, globalMethods, Services, $localStorage, $rootScope, findItemIndex, $translate) {
	//$ionicLoading.show();
	$scope.selected_item;
	$scope.newArray=[];
	$scope.position=$stateParams.pos;
	$scope.itemtyp=null;
/*
	setTimeout(function(){
		$ionicSlideBoxDelegate.update();
		//$ionicSlideBoxDelegate.slide($stateParams.pos, 500)	
  	},500);*/

	$scope.myFunction   =function(a){
            if(a==false)
                $scope.itemtyp="Non-Veg";
            else if(a==true)
                $scope.itemtyp="Veg";
            else
                $scope.itemtyp=null;
            
    	}	

	$scope.backa=function(){
		$location.path(appConst.path.dashboard);
        	//$ionicHistory.goBack(-1);
    	}

	$scope.viewCart = function() {
        	$location.path(appConst.path.cart_list);
        	$rootScope.cartListBack_button = true;
    	}

	/*$scope.getItemsList = function() {
		
    		$scope.totalAddonsCost = 0;
        	$ionicLoading.show();
        	Services.webServiceCallPost($rootScope.selectedItem, appConst.services.get_items).then(function(response){

            		$ionicLoading.hide();
            		$scope.handleCartListIcon('cart_list_icon2');
          
            		if (response[1].response.status == 1) {
        			//$scope.allitemscategories=[];

        $scope.allitemscategories=response[0].data;
        for(var kl=0 ; kl<$scope.allitemscategories.length ; kl++){
                
            for(var lm=0; lm<$scope.allitemscategories[kl].items.length; lm++){
                
                 var extraData = {
                                        imageUrl: appConst.serviceUrl.item_image_url + $scope.allitemscategories[kl].items[lm].item_image_name,
                                        imageUrlThumb: appConst.serviceUrl.item_image_url_thumb + $scope.allitemscategories[kl].items[lm].item_image_name,
                                        size_id: '',
                                        size_name: '',
                                        item_size_id: '',
                                        size_price: '',
                                        avg_rating: $scope.allitemscategories[kl].items[lm].rating[0].average_rating,
                                        no_of_users: $scope.allitemscategories[kl].items[lm].rating[0].no_of_users,
                                        costAfterSize: $scope.allitemscategories[kl].items[lm].item_cost
                                    };  

                     angular.extend($scope.allitemscategories[kl].items[lm],extraData); 

            }
       // console.log("mizanll"+JSON.stringify($scope.allitemscategories)+"mizanll");
            
        }*/

/*******************************************************call post e****************************************************/







/*******************************************************call post s****************************************************/
        /*$scope.allitemscategories=[];
        $scope.subMenuItems=[];
        $scope.menuSubItems=[];
                $scope.itemTypes = [];
        var promises = [];//abhilagaya
                if (response[0].data[0].items.length > 0) {
                    angular.forEach(response[0].data[0].items, function(value, key) {
                        if ($localStorage.cart_list.length > 0) {
                            var costAfterSizeValue = 0;
                            globalMethods.getCostAfterSizeValue(value.item_id).then(function(cost) {
                                costAfterSizeValue = cost != 0 ? cost : value.item_cost;


                                if (value.item_image_name != '') {
                                    var extraData = {
                                        imageUrl: appConst.serviceUrl.item_image_url + value.item_image_name,
                                        imageUrlThumb: appConst.serviceUrl.item_image_url_thumb + value.item_image_name,
                                        size_id: '',
                                        size_name: '',
                                        item_size_id: '',
                                        size_price: '',
                                        costAfterSize: costAfterSizeValue
                                    };
                                } else {
                                    var extraData = {
                                        imageUrl: 'img/logo.png',
                                        costAfterSize: value.item_cost
                                    };
                                }//if else close value.item_imagename


                                angular.extend(value, extraData);
                                $scope.subMenuItems.push(value);
                                $scope.menuSubItems.push(value);
                console.log('menusub'+JSON.stringify($scope.menuSubItems)+'menusub');
                            });
            
                        } else {
                            if (value.item_image_name != '') {
                                var extraData = {
                                    imageUrl: appConst.serviceUrl.item_image_url + value.item_image_name,
                                    imageUrlThumb: appConst.serviceUrl.item_image_url_thumb + value.item_image_name,
                                    size_id: '',
                                    size_name: '',
                                    item_size_id: '',
                                    size_price: '',
                                    costAfterSize: value.item_cost
                                };
                            } else {
                                var extraData = {
                                    imageUrl: 'img/logo.png',
                                    costAfterSize: value.item_cost
                                };
                            }
                            angular.extend(value, extraData);
                console.log('menusub'+JSON.stringify($scope.menuSubItems)+'menusub');
                            $scope.subMenuItems.push(value);
                            $scope.menuSubItems.push(value);
                
        
                        }
            
                    });
            var mizan={
                categoryid:response[0].data[0].category_name,
                categoryname: response[0].data[0].category_name,
                subMenuItems:$scope.subMenuItems,
                menuSubItems:$scope.menuSubItems

            };
        $scope.allitemscategories.push(mizan);
            
            
                   console.log("mizanll"+JSON.stringify($scope.allitemscategories)+"mizanll");
                } else {
                    $scope.noItemsAvailable = $translate.instant("no") + " " + $rootScope.selectedItem.menu_name + " " + $translate.instant("availableNow");
                }
*/
/*******************************************************call post****************************************************/
             /* if (response[0].data.item_types.length > 0) {
                    
                    $scope.itemTypes.push({
                        text: "All",
                        value: "All"
                    });
                    angular.forEach(response[0].data.item_types, function(value, key) {
                        var extraData = {
                            text: value.item_type,
                            value: value.item_type  
                            
                        };
                    $scope.itemTypes.push(extraData);                   
 
                    });
                    $scope.data = { clientSide: 'All' };
 
                }*/
           // }
       // });
   // }



    $scope.handleCartListIcon = function(id) {
        if ($localStorage.cart_list.length > 0) {
            $('#' + id).show();
        } else {
            $('#' + id).hide();
        }
    }


    $scope.chooseItemType = function(type) 
    {
        $scope.menuSubItems = $scope.subMenuItems;
 
        if (type == 'Addons') {
            $scope.menuSubItems = [];
            $scope.menuSubItems = $rootScope.totalAddons;
            $scope.data.clientSide = 'Addons';
        } else {

            $scope.data.clientSide =type;
 
            $scope.menuSubItems = $scope.subMenuItems;

        }
    }



  $scope.swipechooseItemType = function($index) {
 
        $scope.menuSubItems = $scope.subMenuItems;
        if ($index == 'Addons') {
            $scope.menuSubItems = [];
            $scope.menuSubItems = $rootScope.totalAddons;
            $scope.data.clientSide = 'Addons';
        } 
        else 
        {
          
            $scope.data.clientSide = $scope.itemTypes[$index].value;        
        }
    }




    $scope.openSelectedItem = function(item) {
           
         $rootScope.review_id = item.item_id;
        $location.path(appConst.path.selected_item);

        angular.element(document).ready(function() {
            var selectedItemScope = angular.element(document.getElementById('selected_item_page')).scope();
            
            selectedItemScope.selected_item = item;
          
             

        });
    };
    $scope.addToCart = function(item) {
        console.log('add to cart items :'+JSON.stringify(item));
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

       

        if (findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) == -1) {
            
            $localStorage.cart_list.push(item);
            $rootScope.cartCount = $localStorage.cart_list.length;
            $scope.handleCartListIcon('cart_list_icon2');
            var selectedItemScope = angular.element(document.getElementById('items_page')).scope();
            selectedItemScope.selected_item=item; 
            
            if(selectedItemScope.selected_item.options.length>0){
              
            $scope.customizeOrder(selectedItemScope.selected_item);   
            //actually what is happening the selected item is showing as undefined so the values are not  going anywhere

            }
              
            else 
            {
                if(selectedItemScope.selected_item.addons.length>0)

                $scope.open_addons_model(selectedItemScope.selected_item);

            }
               
            window.plugins.toast.show($translate.instant("itemAddedToCart"), 'short', 'bottom');
        } else {
            window.plugins.toast.show($translate.instant("alreadyAddedToCart"), 'short', 'bottom');
        }

    }

    $scope.customizeOrder = function(item) {
 
	
	if(findItemIndex.findItemIndexInCartList($localStorage.cart_list,'', item.item_id) != -1){
 
    		$scope.itemSizes = item.options;
       		$scope.data = {};
        	var selectedItemScope = angular.element(document.getElementById('items_page')).scope();
        	$scope.radioCheck = '';
			$scope.ind="";
		console.log('mahishmati'+JSON.stringify(selectedItemScope.selected_item)+'mahishmati');
		$scope.selected_item=selectedItemScope.selected_item;
		console.log('ki jai'+JSON.stringify($scope.selected_item)+'ki jai');

        	angular.forEach($scope.itemSizes, function(value, key) {
            		if (value.price == selectedItemScope.selected_item.costAfterSize) {
                		$scope.radioCheck = value.option_id;
				if(value.option_id=='0')
					$scope.selectedItemSize($scope.itemSizes[key]);
            		}
        	});
        var myPopup = $ionicPopup.show({
            templateUrl: 'modules/home/sizes-popup.html',
            scope: $scope,
            cssClass: 'customizeOrder',
            buttons: [{
                text: $translate.instant("cancel"),
                onTap: function(e){
                	$scope.radioCheck = '';
                	angular.forEach($localStorage.cart_list,function(value,key){
                        	if(selectedItemScope.selected_item.item_id == value.item_id){
                            		$localStorage.cart_list[key].costAfterSize = value.item_cost;
                            		$scope.radioCheck = '';
                            		selectedItemScope.selected_item.costAfterSize = value.item_cost;
                        	}
				
                  	});
                  	myPopup.close();
			
			$scope.open_addons_model(item);
			
                }
            }, {
                text: '<b>' + $translate.instant("done") + '</b>',
                type: 'button-dark',
                onTap: function(e,value) {
			$scope.open_addons_model(item);
                    myPopup.close();
                }
            }] //buttons close
        }); //mypopup close
	}
	else{
		
	}
    }
    $scope.totalAddonsCost = 0;
    $scope.addonsTabInit = function() {;
        
        angular.element(document).ready(function() {
            $scope.totalAddonsCost = 0;
            angular.forEach($localStorage.cart_list, function(value, key) {
                $scope.totalAddonsCost = parseInt(value.finalCost) + parseInt($scope.totalAddonsCost);
            });
        });
    }
    
      $scope.itemSizes = [];


/**** selected item size start *****/
// when we chose the size from customize size item  then this function calls
$scope.selectedItemSize = function(size) {
	//Services.pa(size,'size',1);
	var index = $scope.findIndexInData($localStorage.cart_list,'item_id',size.item_id);
	if(index==-1){  // when cart 
                     $scope.radioCheck = '';
                     window.plugins.toast.show($translate.instant("firstAddItemToCart"), 'short', 'bottom');
         }else{
				
					
                   // var selectedItemScope = angular.element(document.getElementById('items_page')).scope();
                    $scope.selected_item.size_id = size.option_id;
                    $scope.selected_item.size_name = size.option_name;
                    $scope.selected_item.item_size_id = size.item_option_id;
                    $scope.selected_item.size_price = size.price;
                    $scope.selected_item.costAfterSize = size.price;
                    angular.forEach($localStorage.cart_list, function(value, key) {
                        //shivam gupta//
                        if ($scope.selected_item.item_id == value.item_id) {
                            
                            value.costAfterSize = size.price;

                        }
                    });
                    $scope.radioCheck =$scope.selected_item.size_id;
 

			/*** for booked addons item size id and size id **/
       			angular.forEach($localStorage.bookedAddons,function(value,key){
                		
                		if(value.item_id == size.item_id){
		
					$localStorage.bookedAddons[key].item_size_id = size.item_option_id;
					$localStorage.bookedAddons[key].size_id = size.option_id;
                		}
        		});
			/*** for booked addons item size id and size id **/

            }
}
    
     $scope.findIndexInData =function (Array, property, action) {
 
        var result = -1;
        angular.forEach(Array, function(value, index) {
        	if(value[property]==action){
            		result=index;
        	}
        });
        return result;
    }


/************************ customize item end ******************************************* ***/





  


/**** selected item size start *****/
// when we chose the size from customize size item  then this function calls

/**** selected item size end *****/



$scope.done_sizes_model = function() {
 
        $scope.sizes_model.hide();
}


$scope.close_sizes_modal = function() {
 
        $scope.sizes_model.hide();
}


/********* customize size functions end *******************************************************************************/


/***** Addons all function ********************************************************************************************/

$scope.addQuantity = function(quantity) {
 
        return parseInt(quantity) + 1;
}



$scope.subtractQuantity = function(quantity) {
 
        if (parseInt(quantity) > 1) {
            	return parseInt(quantity) - 1;
        } else {
           	return parseInt(quantity);
        }
}






$scope.calculateAddonTotal = function(cost, quantity, operation) {
 
	if (quantity != 0) {
		if (operation == 'add') {
                	//items_list_scope.totalAddonsCost = parseInt(items_list_scope.totalAddonsCost) + parseInt(cost);
		} else if (operation == 'subtract') {
                	//items_list_scope.totalAddonsCost = parseInt(items_list_scope.totalAddonsCost) - parseInt(cost);
            	}
        }
}


$scope.changeAddonQuantity = function(item, quantity, unitCost) {
 
        angular.forEach($localStorage.bookedAddons,function(value,key){
                console.log($localStorage.bookedAddons);
                if(value.addon_id == item.addon_id){
			$localStorage.bookedAddons[key].quantity = parseInt(quantity);
			$localStorage.bookedAddons[key].finalCost = parseInt(quantity) * parseInt(unitCost);
                }
        });
	return parseInt(quantity) * parseInt(unitCost);
}



$scope.selectAddon = function(item, addonCheck, index) {
	//when we select an item
	if (addonCheck) {
		findItemIndex.findAddonIndexInCartList($rootScope.bookedAddonsTEMP, '', item.addon_id).then(function(index) 			{
			if (index == -1) {
                    		$rootScope.bookedAddonsTEMP.push(item);
                	}
           	 });
        } else {
            	findItemIndex.findAddonIndexInCartList($rootScope.bookedAddonsTEMP, '', item.addon_id).then(function(index) 			{
                	if(index != -1) {
                    		$rootScope.bookedAddonsTEMP.splice(index, 1);
                	}
            	});
        }
}



$scope.open_addons_model = function(item) {
	Services.pa($rootScope.bookedAddons,'rootscope.bookedAddons',1);
	Services.pa($localStorage.bookedAddons,'$localStorage.bookedAddons',1);
	Services.pa($rootScope.bookedAddonsTEMP,'$rootScope.bookedAddonsTEMP',1);

	if(findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) != -1){
		$scope.selectedItemId=item.item_id;// addedbyme
        	$ionicModal.fromTemplateUrl('modules/home/addons.html', {
			scope: $scope,
            		animation: 'slide-in-up',
           			// animation: 'fade-in',
            		preserveScope: true
        	}).then(function(modal) {
			$scope.addons_model = modal;
            		if (item.addons.length > 0) {
                		$rootScope.bookedAddons=[];
                		$scope.itemAddons = [];
               			$rootScope.totalAddons = [];
                		angular.forEach(item.addons, function(value, key){ 
				Services.pa(value,'valuekey',0);					
                    		var setInterest = false;
                    		var quantity = 1; 
				if ($localStorage.bookedAddons.length > 0) { //this section upldate the addons
                       			angular.forEach($localStorage.bookedAddons, function(interestValue, interestKey) {
                            			if ((value.addon_id == interestValue.addon_id)&&($scope.selectedItemId==interestValue.item_id)) {
                                			setInterest = true;
                               				quantity = interestValue.quantity;
                            			}
                        		});
                    		}//if bookedAddons.length>0
				var sizes_id = value.sizes_id.split(',');/*mizan*/
				var index1 = $scope.findIndexInData($localStorage.cart_list,'item_id',value.item_id);
 
                    		var extraData = {
                        		finalCost: parseInt(value.price) * parseInt(quantity),
                        		quantity: quantity,
                        		interests: setInterest,
                        		imageUrl: appConst.serviceUrl.addon_image_url + value.addon_image,
					size_id:$localStorage.cart_list[index1].size_id,
					item_size_id:$localStorage.cart_list[index1].item_size_id
                    		};//extraData


                    		angular.extend(value, extraData);	
 
				if(sizes_id.indexOf($localStorage.cart_list[index1].size_id)!=-1  || sizes_id=='0' )
                    			$scope.itemAddons.push(value);
	                       	});//angular.forEach addons
           		}

            		$scope.addons_model.show();
        	});
	}
	else
	{
		
	}
}

$scope.close_addons_model = function() {
        $scope.addons_model.hide();
}

$scope.done_addons_model = function(){
 
      $localStorage.bookedAddons= [];
      if($rootScope.bookedAddonsTEMP.length>0){
          angular.forEach($rootScope.bookedAddonsTEMP,function(value,key){
                $localStorage.bookedAddons.push(value);
          });
		$rootScope.bookedAddonsTEMP=[];//mizan
       }
       $scope.addons_model.hide();
 }
$scope.done_sizes_model = function() {
 
		$('#drag_me').show();
        $scope.sizes_model.hide();
}


$scope.close_sizes_modal = function() {
 
        $scope.sizes_model.hide();
}
    $scope.changeAddonQuantity = function( quantity, unitCost) {
        
        return parseInt(quantity.price) * parseInt(unitCost);
    }
//$scope.getItemsList();

  $scope.$on('$ionicView.enter', function (viewInfo, state) {
	//alert('enter');
	//$ionicLoading.show();
//$ionicLoading.show();

    });
  $scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
	//alert('before enter');
	//$ionicLoading.show();

    });

     $scope.$on('$ionicView.afterEnter', function (viewInfo, state) {
	//alert('after enter');
	//$ionicLoading.hide();

    });

});


/***************************************************************************************************************************
*****************************************  offers controller ***************************************************************
***************************************************************************************************************************/app.controller('offersCtrl', function($scope, $rootScope,findItemIndex,$localStorage,$location, appConst, $ionicLoading, Services, $translate) {
    $scope.bookingCoupons = [];
    $scope.offersInt = function() {
        $ionicLoading.show();
        Services.webServiceCallPost('', appConst.services.get_offers).then(function(response) {
            $ionicLoading.hide();
            var offersScope = angular.element(document.getElementById('offersPage')).scope();
            if (response[1].response.status == 1) {
                offersScope.offers = response[0].data;
            }
        });
    }
    $scope.offerItems = [];
    $scope.offerName = {};

    $scope.offerDetails = function(offer,price) {
        


        $location.path(appConst.path.offerDetails);

        angular.element(document).ready(function() {
            $ionicLoading.show();
            Services.webServiceCallPost(offer, appConst.services.get_offer_details).then(function(response) {
                $ionicLoading.hide();
                var offerDetailsScope = angular.element(document.getElementById('offerDetailsPage')).scope();
               
                offerDetailsScope.offerName.name = offer.offer_name;
               
                if (response[1].response.status == 1) {
               
                    offerDetailsScope.offerItems = [];
               
                    if (response[0].data.products.length > 0) {
               
                        angular.forEach(response[0].data.products, function(value, key) {
               
                            if (!value.menu_image_name && value.menu_image_name != '') {
               
                                var extraData = {
                                    costAfterSize: price,
                                    imageUrlThumb: appConst.serviceUrl.item_image_url + value.item_image_name
                                }
                            } else {
                                var extraData = {
                                    costAfterSize: price,
                                    imageUrlThumb: 'img/logo.png'
                                }
                            }
                            angular.extend(value, extraData);
                            offerDetailsScope.offerItems.push(value);
                        });
                    } else {
                        offerDetailsScope.noItemsAvailable = $translate.instant("noItemsAvailable");
                    }
                }
            });
        });     
    }
//function is over here .....
$scope.addtoCartFromOffer=function(item){

    

    
            $scope.itemadded=false;
       if (findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) == -1) {
                
              

                
               
            $localStorage.cart_list.push(item);
     
            $scope.itemadded=true;

            $rootScope.cartCount = $localStorage.cart_list.length;
           
            //$scope.handleCartListIcon('cart_list_icon2');
            
            window.plugins.toast.show($translate.instant("itemAddedToCart"), 'short', 'bottom');

        } else {
           
            window.plugins.toast.show($translate.instant("alreadyAddedToCart"), 'short', 'bottom');
        }

//shivam gupta


}



$scope.handleCartListIcon = function(id) {          
        if ($localStorage.cart_list.length > 0) {
               
            $('#' + id).show();
        } else {
            $('#' + id).hide();
        }
    }

});

app.controller('orderHistoryCtrl', function($scope, $location, appConst, globalMethods, $ionicLoading, Services, $localStorage, $rootScope, $translate) {
    $rootScope.estimates = [];
    $scope.orders = [];
    $scope.orderHistoryInit = function() {
        if (globalMethods.checkUserLogin()) {
            $ionicLoading.show();
            Services.webServiceCallPost($localStorage.userProfile, appConst.services.order_history).then(function(response) {
                $ionicLoading.hide();
                var orderHistoryScope = angular.element(document.getElementById('orderHistoryPage')).scope();
                if (response[1].response.status == 1) {
                    if (response[0].data.length > 0) {
                        orderHistoryScope.orders = response[0].data;
                    }
                }
            });
        } else {
            $rootScope.loginThrough = 'orderHistory';
            $location.path(appConst.path.registration);
        }
    }
    $scope.orderItems = [];
    $scope.orderAddons = [];
    $scope.openOrderHistoryDetails = function(order) {
        $location.path(appConst.path.ordersHistoryDetails);
        angular.element(document).ready(function() {
            $ionicLoading.show();
            Services.webServiceCallPost(order, appConst.services.order_item_details).then(function(response) {
                $ionicLoading.hide();
                var orderHistoryDetailsScope = angular.element(document.getElementById('orderHistoryDetailsPage')).scope();
                if (response[1].response.status == 1) {
                    orderHistoryDetailsScope.orderItems = [];
                    orderHistoryDetailsScope.orderAddons = [];
                    if (response[0].data.orderProducts.length > 0) {
                        angular.forEach(response[0].data.orderProducts, function(value, key) {
                            //angular.extend(value, extraData);
                            orderHistoryDetailsScope.orderItems.push(value);
                        });

                        if(response[0].data.orderAddons.length >0){
                             angular.forEach(response[0].data.orderAddons, function(value, key) {
                             //   angular.extend(value, extraData);
                                orderHistoryDetailsScope.orderAddons.push(value);
                            });
                        }

                    } else {
                        orderHistoryDetailsScope.noItemsAvailable = $translate.instant("noItemsAvailable");
                    }
                }
            });
        });
    }
    $scope.home = function() {
        $location.path(appConst.path.dashboard);
    };
});


/* ----------------------------------------------------------------------------------------------------------------
-------------------------------------------Payment Controller------------------------------------------------------
------------------------------------------------------------------------------------------------------------------*/
app.controller('paymentCtrl', function($scope, $location, stripe, checkCustomer, appConst, PaypalService, $ionicLoading, Services, $localStorage, $rootScope, $ionicModal, $ionicHistory, $translate, payUmoney) {
    $scope.payment = {};
    $ionicModal.fromTemplateUrl(appConst.page.stripe_modalHtml, {
        scope: $scope,
        animation: 'slide-in-up',
        preserveScope: true
    }).then(function(modal) {
        $scope.payment.amount = $rootScope.totalCost;
        $scope.stripePaymentModal = modal;
    });

    /*$scope.openStripePaymentModal = function()$scope.closeStripePaymentModal = function()*/
    /*$scope.payUPayment = function()$scope.paypalPayment = function() */
    $scope.paymentConfirmInit = function() {
        var history = $ionicHistory.viewHistory().histories[$rootScope.dashboardHistoryId];
        for (var i = history.stack.length - 1; i >= 0; i--) {
            if (history.stack[i].stateName == 'app.dashboard') {
                $ionicHistory.backView(history.stack[i]);
            }
        }
    }
  /*  $scope.stripePayment = function() */
    $scope.saveOrder = function() {
		
        angular.extend($rootScope.saveOrderParams, $scope.transaction_details);
        $ionicLoading.show();
        Services.webServiceCallPost($rootScope.saveOrderParams, appConst.services.save_order).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                $localStorage.cart_list = [];
                $localStorage.bookedAddons = [];
                $rootScope.orderDetails = [];
                $rootScope.saveOrderParams = {};
                $rootScope.cartCount = $localStorage.cart_list.length;
                $location.path(appConst.path.payment_status);
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
            }
        });
    }
    $scope.checkCVC = function(value, max) {
        var string = "" + value;
        if (string.length <= max) {
            $scope.payment.cvc = $scope.payment.cvc;
        } else {
            $scope.payment.cvc = parseInt(string.substring(0, max));
        }
    }
    $scope.checkLength = function(value, max) {
        var string = "" + value;
        if (string.length <= max) {
            $scope.payment.cardNo = $scope.payment.cardNo;
        } else {
            $scope.payment.cardNo = parseInt(string.substring(0, max));
        }
    }
});



/*********************************************************************************************************************
****************************************** selected Item Ctrl ********************************************************
**********************************************************************************************************************/

app.controller('selectedItemCtrl', function($scope,  $ionicHistory,$location, appConst, $localStorage, $ionicPopup, $rootScope, $ionicModal, findItemIndex, Services, $translate){
	$scope.goBack = function() 
	{
      		$ionicHistory.goBack(-1);
	} 

 $scope.getreview=function(){
        $scope.review=[];
        $scope.review_id= {
               item_id: $rootScope.review_id
        };
        Services.webServiceCallPost($scope.review_id, appConst.services.get_item_reviews).then(function(response) {
        if (response[1].response.status == 1) {
                if (response[0].data.length > 0) {
                	 $scope.review=response[0].data;
		}
         }
         
       })
    }
     $scope.$on('$ionicView.loaded', function (viewInfo, state) {
	$scope.getreview();

    });


//$scope.getreview();



/********************* add to cart start*********************************************************************************/
$scope.addToCart = function(item) {
       if (findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) == -1) {
		$localStorage.cart_list.push(item);
		$rootScope.cartCount = $localStorage.cart_list.length;          
		$scope.handleCartListIcon('cart_list_icon2');
		
		if(item.options.length)
			$scope.customizeOrder(item);
		else{
			Services.pa(item.addons,'cartlist',1);
		}
            	window.plugins.toast.show($translate.instant("itemAddedToCart"), 'short', 'bottom');
        } else {
		
            	window.plugins.toast.show($translate.instant("alreadyAddedToCart"), 'short', 'bottom');
        }
 }
/********************* add to cart end ********************************************************************************/






/***** All function of customize size ************************************************************************/
/**********************customize item *************/
$scope.customizeOrder = function(item) {
		
		Services.pa(item,"customize",0);
	if(findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) != -1){
    		$scope.itemSizes = item.options;
       		$scope.data = {};
        	var selectedItemScope = angular.element(document.getElementById('selected_item_page')).scope();
        	$scope.radioCheck = '';
		$scope.ind="";
		console.log('s '+JSON.stringify(selectedItemScope.selected_item)+' s');
        	angular.forEach($scope.itemSizes, function(value, key) {
            		if (value.price == selectedItemScope.selected_item.costAfterSize) {
                		$scope.radioCheck = value.option_id;
				if(value.option_id=='0')
					$scope.selectedItemSize($scope.itemSizes[key]);
            		}
        	});
        var myPopup = $ionicPopup.show({
            templateUrl: 'modules/home/sizes-popup.html',
            scope: $scope,
            cssClass: 'customizeOrder',
            buttons: [{
                text: $translate.instant("cancel"),
                onTap: function(e){
                	$scope.radioCheck = '';
                	angular.forEach($localStorage.cart_list,function(value,key){
                        	if(selectedItemScope.selected_item.item_id == value.item_id){
                            		$localStorage.cart_list[key].costAfterSize = value.item_cost;
                            		$scope.radioCheck = '';
                            		selectedItemScope.selected_item.costAfterSize = value.item_cost;
                        	}
				
                  	});
                  	myPopup.close();
			
			$scope.open_addons_model(item);
			
                }
            }, {
                text: '<b>' + $translate.instant("done") + '</b>',
                type: 'button-dark',
                onTap: function(e,value) {
			$scope.open_addons_model(item);
                    myPopup.close();
                }
            }] //buttons close
        }); //mypopup close
	}
	else{
		
	}
    };//customize close
/************************ customize item end ******************************************* ***/




    $scope.findIndexInData =function (Array, property, action) {
 
        var result = -1;
        angular.forEach(Array, function(value, index) {
        	if(value[property]==action){
            		result=index;
        	}
        });
        return result;
    }

    $scope.itemSizes = [];


/**** selected item size start *****/
// when we chose the size from customize size item  then this function calls
$scope.selectedItemSize = function(size) {
	Services.pa(size,'size',1);
	var index = $scope.findIndexInData($localStorage.cart_list,'item_id',size.item_id);
	if(index==-1){  // when cart 
                     $scope.radioCheck = '';
                     window.plugins.toast.show($translate.instant("firstAddItemToCart"), 'short', 'bottom');
         }else{
	
                    var selectedItemScope = angular.element(document.getElementById('selected_item_page')).scope();
                    selectedItemScope.selected_item.size_id = size.option_id;
                    selectedItemScope.selected_item.size_name = size.option_name;
                    selectedItemScope.selected_item.item_size_id = size.item_option_id;
                    selectedItemScope.selected_item.size_price = size.price;
                    selectedItemScope.selected_item.costAfterSize = size.price;
                    angular.forEach($localStorage.cart_list, function(value, key) {
                        if (selectedItemScope.selected_item.item_id == value.item_id) {
                            value.costAfterSize = size.price;
                        }
                    });
                    $scope.radioCheck = selectedItemScope.selected_item.size_id;


			/*** for booked addons item size id and size id **/
       			angular.forEach($localStorage.bookedAddons,function(value,key){
                		
                		if(value.item_id == size.item_id){
		
					$localStorage.bookedAddons[key].item_size_id = size.item_option_id;
					$localStorage.bookedAddons[key].size_id = size.option_id;
                		}
        		});
			/*** for booked addons item size id and size id **/

            }
}
/**** selected item size end *****/



$scope.done_sizes_model = function() {
 
        $scope.sizes_model.hide();
}


$scope.close_sizes_modal = function() {
 
        $scope.sizes_model.hide();
}


/********* customize size functions end *******************************************************************************/


/***** Addons all function ********************************************************************************************/

$scope.addQuantity = function(quantity) {
 
        return parseInt(quantity) + 1;
}



$scope.subtractQuantity = function(quantity) {
 
        if (parseInt(quantity) > 1) {
            	return parseInt(quantity) - 1;
        } else {
           	return parseInt(quantity);
        }
}






$scope.calculateAddonTotal = function(cost, quantity, operation) {
 
	if (quantity != 0) {
		if (operation == 'add') {
                	//items_list_scope.totalAddonsCost = parseInt(items_list_scope.totalAddonsCost) + parseInt(cost);
		} else if (operation == 'subtract') {
                	//items_list_scope.totalAddonsCost = parseInt(items_list_scope.totalAddonsCost) - parseInt(cost);
            	}
        }
}


$scope.changeAddonQuantity = function(item, quantity, unitCost) {
 
        angular.forEach($localStorage.bookedAddons,function(value,key){
                console.log($localStorage.bookedAddons);
                if(value.addon_id == item.addon_id){
			$localStorage.bookedAddons[key].quantity = parseInt(quantity);
			$localStorage.bookedAddons[key].finalCost = parseInt(quantity) * parseInt(unitCost);
                }
        });
	return parseInt(quantity) * parseInt(unitCost);
}



$scope.selectAddon = function(item, addonCheck, index) {
	//when we select an item
	if (addonCheck) {
		findItemIndex.findAddonIndexInCartList($rootScope.bookedAddonsTEMP, '', item.addon_id).then(function(index) 			{
			if (index == -1) {
                    		$rootScope.bookedAddonsTEMP.push(item);
                	}
           	 });
        } else {
            	findItemIndex.findAddonIndexInCartList($rootScope.bookedAddonsTEMP, '', item.addon_id).then(function(index) 			{
                	if(index != -1) {
                    		$rootScope.bookedAddonsTEMP.splice(index, 1);
                	}
            	});
        }
}



$scope.open_addons_model = function(item) {
	Services.pa($rootScope.bookedAddons,'rootscope.bookedAddons',1);
	Services.pa($localStorage.bookedAddons,'$localStorage.bookedAddons',1);
	Services.pa($rootScope.bookedAddonsTEMP,'$rootScope.bookedAddonsTEMP',1);

	if(findItemIndex.findItemIndexInCartList($localStorage.cart_list, '', item.item_id) != -1){
		$scope.selectedItemId=item.item_id;// addedbyme
        	$ionicModal.fromTemplateUrl('modules/home/addons.html', {
			scope: $scope,
            		animation: 'slide-in-up',
           		// animation: 'fade-in',
            		preserveScope: true
        	}).then(function(modal) {
			$scope.addons_model = modal;
            		if (item.addons.length > 0) {
                		$rootScope.bookedAddons=[];
                		$scope.itemAddons = [];
               			$rootScope.totalAddons = [];
                		angular.forEach(item.addons, function(value, key){ 
				Services.pa(value,'valuekey',0);					
                    		var setInterest = false;
                    		var quantity = 1; 
				if ($localStorage.bookedAddons.length > 0) { //this section upldate the addons
                       			angular.forEach($localStorage.bookedAddons, function(interestValue, interestKey) {
                            			if ((value.addon_id == interestValue.addon_id)&&($scope.selectedItemId==interestValue.item_id)) {
                                			setInterest = true;
                               				quantity = interestValue.quantity;
                            			}
                        		});
                    		}//if bookedAddons.length>0
				var sizes_id = value.sizes_id.split(',');/*mizan*/
				var index1 = $scope.findIndexInData($localStorage.cart_list,'item_id',value.item_id);
 
                    		var extraData = {
                        		finalCost: parseInt(value.price) * parseInt(quantity),
                        		quantity: quantity,
                        		interests: setInterest,
                        		imageUrl: appConst.serviceUrl.addon_image_url + value.addon_image,
					size_id:$localStorage.cart_list[index1].size_id,
					item_size_id:$localStorage.cart_list[index1].item_size_id
                    		};//extraData


                    		angular.extend(value, extraData);	
 
				if(sizes_id.indexOf($localStorage.cart_list[index1].size_id)!=-1  || sizes_id=='0' )
                    			$scope.itemAddons.push(value);
	                       	});//angular.forEach addons
           		}

            		$scope.addons_model.show();
        	});
	}
	else
	{
		
	}
}

$scope.close_addons_model = function() {
        $scope.addons_model.hide();
}

$scope.done_addons_model = function(){
 
      $localStorage.bookedAddons= [];
      if($rootScope.bookedAddonsTEMP.length>0){
          angular.forEach($rootScope.bookedAddonsTEMP,function(value,key){
                $localStorage.bookedAddons.push(value);
          });
		$rootScope.bookedAddonsTEMP=[];//mizan
       }
       $scope.addons_model.hide();
 }
/***************************************  Addons All functions end ********************************************************/


    $scope.viewCart = function() {
        $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;
    }
    
   $scope.handleCartListIcon = function(id) {          
        if ($localStorage.cart_list.length > 0) {
               
            $('#' + id).show();
        } else {
            $('#' + id).hide();
        }
    }


});

app.controller('profileCtrl', function($scope, $location, appConst, globalMethods, $ionicLoading, Services, $localStorage, $rootScope, $ionicModal, $translate) {
    $scope.editProfile = {
        first_name: '',
        last_name: '',
        identity: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    };
    $scope.profile = {};
    $scope.search_cities_model;
    $scope.openEditProfile = function() {
        if (globalMethods.checkUserLogin()) {
            $location.path(appConst.path.editProfile);
            angular.element(document).ready(function() {
                var editProfileScope = angular.element(document.getElementById('editProfilePage')).scope();
                editProfileScope.editProfile.first_name = $localStorage.userProfile.first_name;
                editProfileScope.editProfile.last_name = $localStorage.userProfile.last_name;
                editProfileScope.editProfile.identity = $localStorage.userProfile.email;
                editProfileScope.editProfile.phone = parseInt($localStorage.userProfile.phone);
                editProfileScope.editProfile.address = $localStorage.userProfile.address;
                editProfileScope.editProfile.city = $localStorage.userProfile.city;
                editProfileScope.editProfile.state = $localStorage.userProfile.state;
                editProfileScope.editProfile.pincode = $localStorage.userProfile.pincode;
                editProfileScope.editProfile.landmark = $localStorage.userProfile.landmark;
            });
        } else {
            $location.path(appConst.path.login);
        }
    }
    $scope.userAddressInit = function() {
        if (globalMethods.checkUserLogin()) {
            $scope.profile = $localStorage.userProfile;
            $rootScope.addressPageTitle = $translate.instant("addAddress");
            var params = {
                id: $localStorage.userProfile.id,
                email: $localStorage.userProfile.email,
                password: $localStorage.userProfile.password
            };
            $ionicLoading.show();
            Services.webServiceCallPost(params, 'get_user_address').then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 1) {
                    $rootScope.addedAddress = response[0].data;
                }
            });
        } else {
            $location.path(appConst.path.login);
        }
    }
    $scope.open_cities_modal = function(page) {
        $ionicModal.fromTemplateUrl(appConst.page.search_cities_modalHtml, {
            scope: $scope,
            animation: 'slide-in-up',
            preserveScope: true
        }).then(function(modal) {
            $scope.search_cities_model = modal;
            $scope.search_cities_model.show();
            globalMethods.get_locations();
        });
    }
    $scope.close_cities_modal = function() {
        $scope.search_cities_model.hide();
    }
    $scope.locality = [];
    $scope.open_location_modal = function(page) {
        var addAddress_profile_scope = angular.element(document.getElementById('addAddress_profile_page')).scope();
        if (addAddress_profile_scope.address.city && addAddress_profile_scope.address.city != '') {
            $ionicModal.fromTemplateUrl(appConst.page.search_locations_modalHtml, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.search_location_model = modal;
                $scope.search_location_model.show();
            });
        } else {
            window.plugins.toast.show($translate.instant("selectCity"), 'short', 'bottom');
        }
    }
    $scope.close_location_modal = function() {
        $scope.search_location_model.hide();
    }
    $scope.address = {
        city: '',
        landmark: '',
        house_no: '',
        apartment_name: '',
        other: ''
    };
    $scope.select_city = function(item) {
        var addAddress_profile_scope = angular.element(document.getElementById('addAddress_profile_page')).scope();
        addAddress_profile_scope.address.city = item.city_name;
        $rootScope.selectedCityId = item.city_id;
        $scope.close_cities_modal();
    }
    $scope.select_location = function(item) {
        $scope.address.landmark = item.locality;
        $scope.close_location_modal();

    }
    $scope.addAddress = function() {
        var params = {
            user_id: $localStorage.userProfile.id,
            email: $localStorage.userProfile.email,
            password: $localStorage.userProfile.password,
            city: '',
            landmark: '',
            house_no: '',
            apartment_name: '',
            other: ''
        };
        angular.extend(params, $scope.address);
        if (params.city == '') {
            window.plugins.toast.show($translate.instant("selectCity"), 'short', 'bottom');
        } else if (params.landmark == '') {
            window.plugins.toast.show($translate.instant("selectLandmark"), 'short', 'bottom');
        } else {
            $ionicLoading.show();
            Services.webServiceCallPost(params, 'add_user_address').then(function(response) {
                $ionicLoading.hide();
                if (response[1].response.status == 1) {
                    $location.path('/app/viewProfile');
                }
            });
        }
    }
    $scope.openEditAddress = function(address) {
        if (address != '') {
            $rootScope.addressPageTitle = $translate.instant("editAddress");
        } else {
            $rootScope.addressPageTitle = $translate.instant("addAddress");
        }
        $rootScope.openEditAddress = address;
        $location.path('/app/addAddress_profile');
    }
    $scope.editAddressInit = function() {
        if ($rootScope.openEditAddress != '') {
            $scope.address = $rootScope.openEditAddress;
        } else {
            $scope.address = {};
        }
    }
    $scope.editAddress = function(address) {
        var params = {
            user_id: $localStorage.userProfile.id,
            email: $localStorage.userProfile.email,
            password: $localStorage.userProfile.password,
            ua_id: address.ua_id
        };
        angular.extend(params, $scope.address);
        $ionicLoading.show();
        Services.webServiceCallPost(params, 'edit_user_address').then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                $location.path('/app/viewProfile');
            }
        });
    }
    $scope.deleteAddress = function(address) {
        var params = {
            user_id: $localStorage.userProfile.id,
            email: $localStorage.userProfile.email,
            password: $localStorage.userProfile.password,
            ua_id: address.ua_id
        };
        $ionicLoading.show();
        Services.webServiceCallPost(params, 'delete_user_address').then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                //$location.path('/app/viewProfile');
                $scope.userAddressInit();
            }
        });
    }
    $scope.updateProfile = function() {
        var editProfileScope = angular.element(document.getElementById('editProfilePage')).scope();
        var extraData = {
            id: $localStorage.userProfile.id
        };
        angular.extend(editProfileScope.editProfile, extraData);
        $ionicLoading.show();
        Services.webServiceCallPost(editProfileScope.editProfile, appConst.services.edit_profile).then(function(response) {
            $ionicLoading.hide();
            if (response[1].response.status == 1) {
                $localStorage.userProfile.first_name = editProfileScope.editProfile.first_name;
                $localStorage.userProfile.last_name = editProfileScope.editProfile.last_name;
                $localStorage.userProfile.email = editProfileScope.editProfile.identity;
                $localStorage.userProfile.phone = editProfileScope.editProfile.phone;
                $localStorage.userProfile.address = editProfileScope.editProfile.address;
                $localStorage.userProfile.city = editProfileScope.editProfile.city;
                $localStorage.userProfile.state = editProfileScope.editProfile.state;
                $localStorage.userProfile.pincode = editProfileScope.editProfile.pincode;
                $localStorage.userProfile.landmark = editProfileScope.editProfile.landmark;
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');
            }
        });
    }
});
app.controller('aboutUsCtrl', function($scope, $location, appConst, uiGmapGoogleMapApi, $ionicLoading, Services, $rootScope) {
   
     $scope.home = function() {
        $location.path(appConst.path.dashboard);
    };


     $scope.getcomments=function(){

        $scope.user_comments=[];

        $ionicLoading.show();
        Services.webServiceCallPost('', 'get_all_comments').then(function(response) {
            $ionicLoading.hide();
            //console.log('tu chutiya :'+JSON.stringify(response));
            if (response[1].response.status == 1) {
                
                if (response[0].data.length > 0) {

                    angular.forEach(response[0].data, function(value, key) {
                        

                        if(value.comment!=null){


                        var extraData = {
                            review_id: value.review_id,
                            user_name: value.user_name,
                            order_id: value.order_id,
                            comment: value.comment,
                            description: value.review_date
                         };

                         $scope.user_comments.push(extraData);


                        }
                        

                     });
                      
                       
                }
            }

            
        });

      
        
    };
    $scope.aboutUs = function() {

        $scope.getcomments();

 
        if ($rootScope.appVersion == '') {
            cordova.getAppVersion.getVersionNumber().then(function(version) {
                $rootScope.appVersion = version;
            });
        }
        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = {
                zoom: 18,
                bounds: {},
                center: {
                    latitude: $rootScope.siteSettings.latitude,
                    longitude: $rootScope.siteSettings.longitude
                }
            };
            $scope.markers = [{
                latitude: $rootScope.siteSettings.latitude,
                longitude: $rootScope.siteSettings.longitude,
                title: $rootScope.siteSettings.site_title,
                id: 1
            }];
            $scope.windowCoords = {};
            $scope.onClick = function(marker, eventName, model) {
                $scope.map.center.latitude = model.latitude;
                $scope.map.center.longitude = model.longitude;
                $scope.map.zoom = 18;
                $scope.windowCoords.latitude = model.latitude;
                $scope.windowCoords.longitude = model.longitude;
                $scope.parkName = model.title;
                $scope.show = true;
            };
            $scope.closeClick = function() {
                $scope.show = false;
            };
            $scope.options = {
                scrollwheel: false
            };
            $scope.show = false;
        });
        $scope.pagesInfo();
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
    
});        

app.controller('reports', function($scope,$location,$rootScope,appConst){
           
 $scope.viewCart = function() {
        $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;
    }



            $scope.todos=[
      {
        face : 'imagePath',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : 'imagePath',
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }
    ];
        });
         
            app.controller('raiseconcern', function($ionicSlideBoxDelegate,$localStorage,$scope,Services,appConst,$rootScope,$state,$location,$stateParams){

                $scope.viewCart = function() {
                $location.path(appConst.path.cart_list);
                $rootScope.cartListBack_button = true;
            }
        
        $scope.save_concern = function(value){
            value['table_no'] = $rootScope.table_no;
            Services.webServiceCallPost(value, appConst.services.concern).then(function(response) {      
                window.plugins.toast.show(response[1].response.message, 'short', 'bottom');  
            });
           $state.go('app.dashboard');
            
        };      
      });




            
    app.controller('infotainmentcategaryctrl', function($ionicHistory,$location,$ionicLoading,$ionicSlideBoxDelegate,$localStorage,$scope,Services,appConst,$rootScope,$state,$stateParams){ 
     
      $scope.selected_infotainment;
      $scope.rrr={};
$scope.goBack=function(){
	$ionicHistory.goBack(-1);
}


	setTimeout(function(){
		$ionicSlideBoxDelegate.update();
  	},500);

 $scope.viewCart = function() {
        $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;
    }


      $scope.fetchInfotainment = function() { 

        $scope.infocatname=[];
        $scope.infodata=[];
        

        $ionicLoading.show();
        Services.webServiceCallPost('','fetch_categary').then(function(response)
         {
		
 
                for(var l=0;l<response[0].length;l++){
			for(var m=0;m<response[1].length;m++){
				if(response[0][l].category_id==response[1][m].category){
					if($scope.rrr[response[0][l].category_name]){
					   $scope.rrr[response[0][l].category_name].push(response[1][m]);
					}
					else
						{
 							$scope.rrr[response[0][l].category_name]=[response[1][m]];
						}
					
				}
			console.log('dhoom'+JSON.stringify($scope.rrr)+'dhoom');
			}
			
		}
        $ionicLoading.hide();               
            if(response['parent_categary'].length>0) 
              {   

                        angular.forEach(response['parent_categary'], function(value, key) {
                        var extraData = {
                            category_id: value.category_id,
                            category_name: value.category_name,
                            sub_category: value.sub_category,
                            parent_category: value.parent_category,
                            description: value.description
                         };

                         $scope.infocatname.push(extraData);


                     });  
             }
    		$scope.slider = { slidermodel: $scope.infocatname[0].category_id};
                          
            });

            $ionicLoading.show();
            Services.webServiceCallPost('','fetch_media').then(function(response){
            $ionicLoading.hide();
 

            if(response['media'].length>0){
                angular.forEach(response['media'],function(value,key){
                        var extraData = {
                            media_id: value.media_id,
                            file_name: value.file_name,
                            media_name: value.media_name,
                            img_thumbnail: appConst.serviceUrl.infotainment_url+value.img_thumbnail,
                            category: value.category,
                            description: value.description,
                            img_url: appConst.serviceUrl.infotainment_url+value.file_name,
                            file_ext: value.file_ext
                                   };

                            $scope.infodata.push(extraData);
                                       
                              
                });

            }

            });
        }
//fetch ending point
        $scope.listInfotainment = function($index)
 {
	
      	$scope.slider.slidermodel=$index;

       }

         $scope.selectedInfotainment = function(infodata)
       {
 
 

        $state.go('app.singleInfotainment',{url:infodata.file_name});
        angular.element(document).ready(function() {
            var selectedInfotainmentScope = angular.element(document.getElementById('selectedInfotainment')).scope();
            selectedInfotainmentScope.selected_infotainment = infodata;
        });
       }
        
});

    
    app.controller('infotainment', function($state,$scope,Services,appConst,$rootScope,$stateParams){
        var id = {media_id:$stateParams.mediaId};
        $scope.result={};
        $scope.url = appConst.serviceUrl.infotainment_url;
         Services.webServiceCallPost(id,'fetch_media_by_id').then(function(response) {
            $scope.result = response['media'][0];
           var file_name = result['file_name'];
           $scope.file_name = file_name.split('.');
 
        });
       
       
    }); 
    
    app.controller('singleInfotainmentctrl', function($scope,Services,appConst,$rootScope,$stateParams){
 
  	    $scope.url=$stateParams.url;
		document.getElementById("iframev").src=$scope.url;
        //var id = {media_id:$stateParams.mediaId};

        
        

/*
        $scope.result={};
        $scope.url = appConst.serviceUrl.infotainment_url;
         Services.webServiceCallPost(id,'fetch_media_by_id').then(function(response) {
            $scope.result = response['media'][0];
           var file_name = result['file_name'];
           $scope.file_name = file_name.split('.');
 

        });
*/
    }); 




        app.controller('menuCtrl', function($scope, $ionicModal,$location, appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services) 
            
            {
    $scope.editProfile = {
        first_name: '',
        last_name: '',
        identity: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    }; 
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
    };
    $scope.callhelpline=function(){
        var tel='9993330227';
        
        window.location.href = 'tel:'+ tel;
       


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
    
    
    
      $scope.openEditProfile = function() {
        if (globalMethods.checkUserLogin()) {
            $location.path(appConst.path.editProfile);
            angular.element(document).ready(function() {
                var editProfileScope = angular.element(document.getElementById('editProfilePage')).scope();
                editProfileScope.editProfile.first_name = $localStorage.userProfile.first_name;
                editProfileScope.editProfile.last_name = $localStorage.userProfile.last_name;
                editProfileScope.editProfile.identity = $localStorage.userProfile.email;
                editProfileScope.editProfile.phone = parseInt($localStorage.userProfile.phone);
                editProfileScope.editProfile.address = $localStorage.userProfile.address;
                editProfileScope.editProfile.city = $localStorage.userProfile.city;
                editProfileScope.editProfile.state = $localStorage.userProfile.state;
                editProfileScope.editProfile.pincode = $localStorage.userProfile.pincode;
                editProfileScope.editProfile.landmark = $localStorage.userProfile.landmark;
            });
        } else {
            $location.path(appConst.path.login);
        }
    }
   $scope.openViewProfile = function() {
           if (globalMethods.checkUserLogin()) {
               $location.path('/app/viewProfile');
           } else {
               $location.path(appConst.path.registration);
           }
       }

    $scope.editProfileInit = function() {
        if (globalMethods.checkUserLogin()) {
            $location.path(appConst.path.editProfile);
            angular.element(document).ready(function() {
                var editProfileScope = angular.element(document.getElementById('editProfilePage')).scope();
                editProfileScope.editProfile.first_name = $localStorage.userProfile.first_name;
                editProfileScope.editProfile.last_name = $localStorage.userProfile.last_name;
                editProfileScope.editProfile.identity = $localStorage.userProfile.email;
                editProfileScope.editProfile.phone = parseInt($localStorage.userProfile.phone);
                editProfileScope.editProfile.address = $localStorage.userProfile.address;
                editProfileScope.editProfile.city = $localStorage.userProfile.city;
                editProfileScope.editProfile.state = $localStorage.userProfile.state;
                editProfileScope.editProfile.pincode = $localStorage.userProfile.pincode;
                editProfileScope.editProfile.landmark = $localStorage.userProfile.landmark;
            });
        } else {
            $location.path(appConst.path.login);
        }
    }
    $scope.setLogin = function(){
        if($rootScope){
            $rootScope.loginThrough = '';
        }

    }
    $scope.settings = function() {
        $location.path(appConst.path.changeLanguage);
        angular.element(document).ready(function() {
            var changeLanguageScope = angular.element(document.getElementById('changeLanguage')).scope();
            changeLanguageScope.language.name = localStorage.getItemsList('defaultLanguage');

        });
    }
    $scope.shareToFriends = function() {
        window.plugins.socialsharing.share($translate.instant("crunchy"), $translate.instant("crunchyAppForRestaurant"), '', 'url Here');
    }
    $scope.setCartListBack_button = function() {
        //1950

        $rootScope.cartListBack_button = true;
        $location.path(appConst.path.cart_list);
 
        


    }
    $scope.openPlaystore = function() {
        cordova.getAppVersion.getPackageName().then(function(name) {
            cordova.plugins.market.open(name, {
                success: function() {},
                failure: function() {}
            });
        });
    }
    $scope.logout = function() {
        localStorage.setItem('pageName', '');
        $localStorage.cart_list = [];
        delete $localStorage.userProfile;
        $rootScope = undefined;
        window.plugins.toast.show($translate.instant("signoutSuccessfully"), 'short', 'bottom');
    };
    $scope.checkUserLogin = function() {
        return globalMethods.checkUserLogin();
    }  
});
app.controller('searchCtrl', function($scope, $ionicModal,$location, appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services) 
            {
                var count=0;
        $scope.result=[];

/**shivam*/

        
		 $rootScope.cartListBack_button = true;

                $scope.openSelectedItem = function(item) {
                
                
              
                $location.path(appConst.path.selected_item);

                angular.element(document).ready(function() {
                var selectedItemScope = angular.element(document.getElementById('selected_item_page')).scope();
                selectedItemScope.selected_item = item;
          
             

        });
    };
            $scope.goBack = function() 
            {
                    $ionicHistory.goBack();
            }
/**shivam*/
            $scope.querysubmit = function(query)
            {
                $scope.result=[];

                if(query!='')            
                $scope.searchinput=
                {
                    item_name: query
                };
                
                $ionicLoading.show();       
                Services.webServiceCallPost($scope.searchinput,'search').then(function(response) { 
                $ionicLoading.hide();
                console.log('search result :'+JSON.stringify(response));
                if(response[1].response.status==1)
                {

                    if(response[0].data.length>0)
                    {   $scope.m=[];
                       

                        angular.forEach(response[0].data,function(value, key){
                               
                                //$scope.data=response[0].data;
                                
                                for(var i=0;i<value.items.length;i++){
 
                                   //console.log('me gadha :'+JSON.stringify(value.items[i])+'me gadha\n');

                                if(value.items.length){
                                    var k=value.items[i];

                                                var extraData = {
                                    imageUrl: appConst.serviceUrl.item_image_url + value.items[i].item_image_name,
                                    imageUrlThumb: appConst.serviceUrl.item_image_url_thumb + value.items[i].item_image_name,
                                    size_id: '',
                                    size_name: '',
                                    item_size_id: '',
                                    size_price: '',
                                    costAfterSize: value.items[i].item_cost
                                };
                                
                                angular.extend(k,extraData);
                                $scope.result.push(k);

                                }
                            


                               }

                                
                                });

                          

                        if($scope.result.length<1);
                        {
                          
                            window.plugins.toast.show($translate.instant("search item not available"), 'short', 'bottom');
                        }


                        console.log('$scope.result :'+JSON.stringify($scope.result));
                        }
                       


                    
                }

                });  


            }

            






            });

app.controller('ordersCtrl', function($scope,$state, $ionicModal,$location, $ionicPopup,appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services)
{

$scope.cost = 
	{
        totalCost: 0
    };
$scope.addonstotal=0;




$scope.goBack=function(){
	$ionicHistory.goBack(-1);
}

$scope.viewCart=function()
{     $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;

};

$scope.calculateTotalCost = function(dineInItems) {
        $scope.cost.totalCost = 0;
        angular.forEach(dineInItems, function(value, key) {
            $scope.cost.totalCost = parseInt(value.final_cost) + parseInt($scope.cost.totalCost);
        });
        }

$scope.openItem = function() {     
      /*	$rootScope.selectedItem = item;
        $location.path(appConst.path.items_list+'/1');*/
	
         $state.go(appConst.state.items_list,{pos:1});
        
    }

    $scope.dineInItems=function(){ 


            $scope.dineInItems=[];
        	$scope.finishDine={
            //Yash
        order_id:$localStorage.order_id
};
//shivam gupta bewafa hai 

        $ionicLoading.show();
        Services.webServiceCallPost($scope.finishDine, appConst.services.get_Current_Orders).then(function(response)
         {
         $ionicLoading.hide();
            $scope.addonslist= response[0].data.addons;

            if (response[1].response.status == 1) {

                if (response[0].data.items.length > 0) {
                   
		

                angular.forEach(response[0].data.items, function(value, key) {
                                var extraData = {
                                    "item_name" : value.item_name,
                                    "item_qty" :value.item_qty,
                                    "final_cost" :value.final_cost,

                                     };
                                angular.extend(value, extraData);
                                $scope.dineInItems.push(value);


                               
                            
                            });
		            angular.forEach(response[0].data.addons, function(value, key) {
                                	$scope.addonstotal=parseFloat($scope.addonstotal)+parseFloat(value.final_cost);
                            });
$rootScope.dineInItems=$scope.dineInItems;
            $scope.calculateTotalCost($scope.dineInItems);

                    }
            }

        });



}


$scope.calculateTotalCost = function(dineInItems) {

        
        $scope.cost.totalCost = 0;
        angular.forEach(dineInItems, function(value, key) {
            $scope.cost.totalCost = parseInt(value.final_cost) + parseInt($scope.cost.totalCost);
        });
        }


$scope.openRestaurentLogin=function(page){
$scope.rest={
        name:"admin",
        password:"Shivam#1995"
    }
    var promptPopup = $ionicPopup.show({
            template:'<input type="text" placeholder="Enter Your login id" required="required" ng-model="rest.name"><input type="password" required="required" placeholder="enter your login credential"  ng-model="rest.password">',
            title: '<span style="color:#444444">Restaurent login for payment</span>',
            scope: $scope,
            //inputPlaceholder: 'Enter your table no',
            buttons : [{
                text: '<b>Submit</b>',
                type: 'button-dark',
                onTap: function(e) 
            {
                var passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{5,50}$/;
                var nameRegex = /^[A-Za-z\s]+$/;
                if (($scope.rest.name==undefined)||(!nameRegex.test($scope.rest.name))) 
                    {  

                window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');

                        e.preventDefault();                     
                    }                                
                    else if (($scope.rest.password==undefined)||(passwordRegex.test($scope.rest.password))) 
                    {  

                  window.plugins.toast.show($translate.instant("add a proper value"), 'short', 'bottom');
                        e.preventDefault();                     
                    } 
                
                    else {
                        return $scope.rest;    
                     }
                    }         
            },{

                text: $translate.instant("cancel"),
                type: 'button-dark',
                onTap: function(e){                        
                  promptPopup.close();
                }


            }]
        });

    promptPopup.then(function(res) {

       // $rootScope.finalcostAfterPayment=res;
        console.log('data :'+JSON.stringify(res));
        //payment has been done ..
        $scope.paymentDoneviaCard();
        }); 
    }
}); //Yash
app.controller('chatctrl', function($scope,$timeout,$interval, $ionicScrollDelegate,$ionicModal,$location, appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services)  {
$rootScope.get_admin_settings=function()
		{	
			$ionicLoading.show();
			Services.webServiceCallPost('', 'get_site_settings').then(function(response)
			{
            				$ionicLoading.hide();
            				$scope.reply=(response[0].data.module_setting[0]);
					$rootScope.checktax=(response[0].data.module_setting[2]);
					$rootScope.status=$scope.reply.status;
       			});
				

		}
	$scope.initTableNo=function(){
        $scope.table = {
            table_no:$localStorage.table_no 
        };
	$scope.receivedMsg=[];

	$scope.response=[];
	$scope.data={};
}


	$rootScope.showw=true;
	$scope.openchatBox = function(item) {
        	$ionicModal.fromTemplateUrl('modules/home/chatmodal.html', {
            		scope: $scope,
            		animation: 'slide-in-up',
           		// animation: 'fade-in',
            		preserveScope: true
        	}).then(function(modal) {            
            		$scope.chatmodel=modal;
            		$scope.chatmodel.show();
            		$scope.flag='true';
            		$scope.getChat();
	    		$('#drag_me').hide();
			$rootScope.showw=false;
        	});  
	}

        $scope.close_addons_model = function() {
        	$scope.chatmodel.hide();
        	$scope.flag='false';
	   	$('#drag_me').show();
		$rootScope.showw=true;
        }


 	$scope.getChat=function(){    
		var Oldlength=0;  
		var refreshIntervalId = $interval(function(){ 
		$scope.messages=[];
		if ($scope.flag=='true'){
             		Services.webServiceCallPost(JSON.stringify($scope.table), 'get_chat').then(function(response){
            			if(response[1].response.status){
					if(Oldlength!=response[0].data.length){
						Services.pa(response[0].data,'dekhlo',0);
                				if(response[0].data.length>0){
							$scope.receivedMsg=response[0].data;
							Oldlength=response[0].data.length; 
			var objDiv = document.getElementById("chattt");
			objDiv.scrollTop = objDiv.scrollHeight;         
                				}
					}
            			}
        		});

		}
            	}, 500);      
       };


      $scope.sendMessage = function() {
        	if (($scope.data.message!=null) && ($scope.data.message!=undefined) && ($scope.data.message!="")){          
        		var d = new Date();
        		d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        		$scope.filteredMessage={
        			user_name :$localStorage.customerdetails.name,
        			table_no: $localStorage.table_no,//alternate ? '12345' : '54321',
        			message: $scope.data.message
        
        		};
			Services.webServiceCallPost(JSON.stringify($scope.filteredMessage), 'save_message').then(function(response){
            			$ionicLoading.hide();
            			if(response[1].response.status){
				$scope.data.message="";
       		         window.plugins.toast.show($translate.instant(response[1].response.message), 'short', 'bottom');

            			}	
           
       			});
        	}
        
      };



 




/*     

       



        //////////////////////shivam 

                 
        $scope.hideTime = true;


        var alternate,isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

       

         
         

          

       
         $scope.inputUp = function() {
         if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function() {
        $ionicScrollDelegate.scrollBottom(true);
        }, 300);

          };


           $scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };

   $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

*/

            });




app.controller('reviewsCtrl', function($scope, $ionicModal,$location, $ionicPopup,appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services){
    $scope.review=[];
    $scope.review_id =
                {
                    item_id: $rootScope.review_id
                };
                $scope.item = $rootScope.review_item;
     Services.webServiceCallPost($scope.review_id, appConst.services.get_item_reviews).then(function(response) {
         if (response[1].response.status == 1) {

                if (response[0].data.length > 0) {
                  
                angular.forEach(response[0].data, function(value, key) {
                     for(var i=0;i<value.length;i++){
                                var extraData = {
                                    "userName" : value[i].user_name,
                                    "review_date" :value[i].review_date,
                                    "comment" :value[i].comment,
                                    "rating" :value[i].rating,
                                     };
                               
                                angular.extend(value, extraData);
                                $scope.review.push(value);  
}
                            });
          
                    }
            }else{ $scope.message2 = 'No Review Found';}
         
     })
     $scope.viewCart=function()
{     $location.path(appConst.path.cart_list);
        $rootScope.cartListBack_button = true;

};
  $scope.goBack=function()
{    
    $ionicHistory.goBack();

};
    }); 
app.controller('myWidgetCtrl', function($scope, $ionicModal,$location, $ionicPopup,appConst, globalMethods, $localStorage, $rootScope, $translate,$ionicHistory,$ionicLoading,Services){
	
		$scope.finish=function(){
			$location.path(appConst.path.finishDineIn);
		}
		
		$scope.info=function(){
			$location.path('/app/infotainmentcategary');
		}


		$scope.status=function(){
			$location.path(appConst.path.dashboard);
		}


});

