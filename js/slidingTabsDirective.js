<<<<<<< HEAD
var slidingTabsDirective = angular.module("ionic").directive('ionSlideTabs', ['$timeout', '$compile', '$interval', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicGesture', '$ionicPopup', function ($timeout, $compile, $interval, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture, $ionicPopup) {
    return {
        require: "^ionSlideBox",
        restrict: 'A',
        link: function (scope, element, attrs, parent) {
=======
var slidingTabsDirective = angular.module("ionic").directive('ionSlideTabs', ['$timeout', '$compile', '$interval', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicGesture', function($timeout, $compile, $interval, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture) {
    return {
        require: "^ionSlideBox",
        restrict: 'A',
        link: function(scope, element, attrs, parent) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318

            var ionicSlideBoxDelegate;
            var ionicScrollDelegate;
            var ionicScrollDelegateID;

            var slideTabs;
            var indicator;

            var slider;
            var tabsBar;

            var options = {
                "slideTabsScrollable": true
            }


            var init = function () {

<<<<<<< HEAD
                if (angular.isDefined(attrs.slideTabsScrollable) && attrs.slideTabsScrollable === "false") {
=======
                if(angular.isDefined( attrs.slideTabsScrollable ) && attrs.slideTabsScrollable === "false" ) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    options.slideTabsScrollable = false;
                }

                var tabItems = '<li ng-repeat="(key, value) in tabs" ng-click="onTabTabbed($event, {{key}})" class="slider-slide-tab" ng-bind-html="value"></li>';

                if(options.slideTabsScrollable) {
<<<<<<< HEAD
                    ionicScrollDelegateID = "ion-slide-tabs-handle-" + Math.floor((Math.random() * 10000) + 1);
                 //alert(ionicScrollDelegateID);
                  tabsBar = angular.element('<ion-scroll has-bouncing="false" overflow-scroll="false" delegate-handle="' + ionicScrollDelegateID + '" class="slidingTabs" direction="x" ><ul>' + tabItems + '</ul> <div class="tab-indicator-wrapper"><div class="tab-indicator"></div></div> </ion-scroll>');
=======

                    ionicScrollDelegateID = "ion-slide-tabs-handle-" + Math.floor((Math.random() * 10000) + 1);
					//alert(ionicScrollDelegateID);
                  tabsBar = angular.element('<ion-scroll has-bouncing ="false" overflow-scroll="false" delegate-handle="' + ionicScrollDelegateID + '" class="slidingTabs" direction="x" ><ul>' + tabItems + '</ul> <div class="tab-indicator-wrapper"><div class="tab-indicator"></div></div> </ion-scroll>');
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                }
                else {

                    tabsBar = angular.element('<div class="slidingTabs"><ul>' + tabItems + '</ul> <div class="tab-indicator-wrapper"><div class="tab-indicator"></div></div> </div>');

                }


                slider = angular.element(element);

                var compiled = $compile(tabsBar);
                slider.parent().prepend(tabsBar);
                compiled(scope);

<<<<<<< HEAD

=======
                //get Tabs DOM Elements
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                indicator = angular.element(tabsBar[0].querySelector(".tab-indicator"));

                //get the slideBoxHandle
                var slideHandle = slider.attr('delegate-handle');
                var scrollHandle = tabsBar.attr('delegate-handle');

                ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
                if (slideHandle) {
                    ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(slideHandle);
                }


<<<<<<< HEAD
                if (options.slideTabsScrollable) {
=======
                if(options.slideTabsScrollable) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318

                    ionicScrollDelegate = $ionicScrollDelegate;
                    if (scrollHandle) {
                        ionicScrollDelegate = ionicScrollDelegate.$getByHandle(scrollHandle);
                    }

                }


                addEvents();
                setTabBarWidth();
                slideToCurrentPosition();
            };

<<<<<<< HEAD
            var addEvents = function () {

                ionic.onGesture("dragleft", scope.onSlideMove, slider[0]);
                ionic.onGesture("dragright", scope.onSlideMove, slider[0]);
                ionic.onGesture("release", scope.onSlideChange, slider[0]);

            }

            var setTabBarWidth = function () {

                if (!angular.isDefined(slideTabs) || slideTabs.length == 0) {
=======
            var addEvents = function() {

                ionic.onGesture("dragleft", scope.onSlideMove ,slider[0]);
                ionic.onGesture("dragright", scope.onSlideMove ,slider[0]);
                ionic.onGesture("release", scope.onSlideChange ,slider[0]);

            }

            var setTabBarWidth = function() {

                if( !angular.isDefined(slideTabs) || slideTabs.length == 0 ) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    return false;
                }

                tabsList = tabsBar.find("ul");
                var tabsWidth = 0;

<<<<<<< HEAD
                angular.forEach(slideTabs, function (currentElement, index) {
=======
                angular.forEach(slideTabs, function (currentElement,index) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318

                    var currentLi = angular.element(currentElement);
                    tabsWidth += currentLi[0].offsetWidth;
                });

<<<<<<< HEAD
                if (options.slideTabsScrollable) {
=======
                if(options.slideTabsScrollable) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318

                    angular.element(tabsBar[0].querySelector(".scroll")).css("width", tabsWidth + 1 + "px");

                }
                else {

<<<<<<< HEAD
                    slideTabs.css("width", tabsList[0].offsetWidth / slideTabs.length + "px");
=======
                    slideTabs.css("width",tabsList[0].offsetWidth / slideTabs.length + "px");
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                }

                slideToCurrentPosition();

            };

<<<<<<< HEAD
            var addTabTouchAnimation = function (event, currentElement) {

                var ink = angular.element(currentElement[0].querySelector(".ink"));

                if (!angular.isDefined(ink) || ink.length == 0) {
=======
            var addTabTouchAnimation = function(event,currentElement) {

                var ink = angular.element(currentElement[0].querySelector(".ink"));

                if( !angular.isDefined(ink) || ink.length == 0 ) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    ink = angular.element("<span class='ink'></span>");
                    currentElement.prepend(ink);
                }


                ink.removeClass("animate");

<<<<<<< HEAD
                if (!ink.offsetHeight && !ink.offsetWidth) {
=======
                if(!ink.offsetHeight && !ink.offsetWidth)
                {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318

                    d = Math.max(currentElement[0].offsetWidth, currentElement[0].offsetHeight);
                    ink.css("height", d + "px");
                    ink.css("width", d + "px");
                }

                x = event.offsetX - ink[0].offsetWidth / 2;
                y = event.offsetY - ink[0].offsetHeight / 2;


<<<<<<< HEAD
                ink.css("top", y + 'px');
                ink.css("left", x + 'px');
                ink.addClass("animate");
            }

            var slideToCurrentPosition = function () {

                if (!angular.isDefined(slideTabs) || slideTabs.length == 0) {
=======
                ink.css("top", y +'px');
                ink.css("left", x +'px');
                ink.addClass("animate");
            }

            var slideToCurrentPosition = function() {

                if( !angular.isDefined(slideTabs) || slideTabs.length == 0 ) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    return false;
                }

                var targetSlideIndex = ionicSlideBoxDelegate.currentIndex();

                var targetTab = angular.element(slideTabs[targetSlideIndex]);
                var targetLeftOffset = targetTab.prop("offsetLeft");
                var targetWidth = targetTab[0].offsetWidth;



                indicator.css({
                    "-webkit-transition-duration": "300ms",
<<<<<<< HEAD
                    "-webkit-transform": "translate(" + targetLeftOffset + "px,0px)",
                    "width": targetWidth + "px",
		    "background-color":"#fff",
		    "height":"6px",
 		    "margin-top":"-4px",
		    "border-radius":"3px",
		    "border-top":"1px solid white",
 		   // "border-bottom":"1px solid black",
            	    "-webkit-box-shadow": "0px 3px 5px -1px rgba(0,0,0,0.61)",
		    "-moz-box-shadow": "0px 3px 5px -1px rgba(0,0,0,0.61)",
		    "box-shadow": "0px 5px 3px -1px rgba(0,0,0,0.61)"
=======
                    "-webkit-transform":"translate(" + targetLeftOffset + "px,0px)",
                    "width": targetWidth + "px"
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                });

                if (options.slideTabsScrollable && ionicScrollDelegate) {
                    var scrollOffset = 40;
<<<<<<< HEAD
                    ionicScrollDelegate.scrollTo(targetLeftOffset - scrollOffset, 0, true);
=======
                    ionicScrollDelegate.scrollTo(targetLeftOffset - scrollOffset,0,true);
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                }

                slideTabs.removeClass("tab-active");
                targetTab.addClass("tab-active");

            }


            var setIndicatorPosition = function (currentSlideIndex, targetSlideIndex, position, slideDirection) {
<<<<<<< HEAD
			//console.log(currentSlideIndex);
		
=======

>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                var targetTab = angular.element(slideTabs[targetSlideIndex]);

                var currentTab = angular.element(slideTabs[currentSlideIndex]);
                var targetLeftOffset = targetTab.prop("offsetLeft");

                var currentLeftOffset = currentTab.prop("offsetLeft");
                var offsetLeftDiff = Math.abs(targetLeftOffset - currentLeftOffset);


<<<<<<< HEAD
                if (currentSlideIndex == 0 && targetSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "right" ||
                    targetSlideIndex == 0 && currentSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "left") {
=======
                if( currentSlideIndex == 0 && targetSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "right" ||
                    targetSlideIndex == 0 && currentSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "left" ) {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    return;
                }

                var targetWidth = targetTab[0].offsetWidth;
                var currentWidth = currentTab[0].offsetWidth;
                var widthDiff = targetWidth - currentWidth;

                var indicatorPos = 0;
                var indicatorWidth = 0;

                if (currentSlideIndex > targetSlideIndex) {

                    indicatorPos = targetLeftOffset - (offsetLeftDiff * (position - 1));
                    indicatorWidth = targetWidth - ((widthDiff * (1 - position)));

                }
                else if (targetSlideIndex > currentSlideIndex) {

                    indicatorPos = targetLeftOffset + (offsetLeftDiff * (position - 1));
                    indicatorWidth = targetWidth + ((widthDiff * (position - 1)));

                }

<<<<<<< HEAD


                indicator.css({
                    "-webkit-transition-duration": "0ms",
                    "-webkit-transform": "translate(" + indicatorPos + "px,0px)",
=======
				
				
                indicator.css({
                    "-webkit-transition-duration":"0ms",
                    "-webkit-transform":"translate(" + indicatorPos + "px,0px)",
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    "width": indicatorWidth + "px"
                });


                if (options.slideTabsScrollable && ionicScrollDelegate) {
                    var scrollOffset = 40;
<<<<<<< HEAD
                    ionicScrollDelegate.scrollTo(indicatorPos - scrollOffset, 0, false);
=======
                    ionicScrollDelegate.scrollTo(indicatorPos - scrollOffset,0,false);
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                }

            }

<<<<<<< HEAD
            scope.onTabTabbed = function (event, index) {
                addTabTouchAnimation(event, angular.element(event.currentTarget));
=======
            scope.onTabTabbed = function(event, index) {
                addTabTouchAnimation(event, angular.element(event.currentTarget) );
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                ionicSlideBoxDelegate.slide(index);
                slideToCurrentPosition();
            }

            scope.tabs = [];

            scope.addTabContent = function ($content) {

                scope.tabs.push($content);
                scope.$apply();

<<<<<<< HEAD
                $timeout(function () {
=======
                $timeout(function() {
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    slideTabs = angular.element(tabsBar[0].querySelector("ul").querySelectorAll(".slider-slide-tab"));
                    slideToCurrentPosition();
                    setTabBarWidth()
                })

            }

            scope.onSlideChange = function (slideIndex) {
                slideToCurrentPosition();
            };

            scope.onSlideMove = function () {
                var scrollDiv = slider[0].getElementsByClassName("slider-slide");

                var currentSlideIndex = ionicSlideBoxDelegate.currentIndex();
                var currentSlide = angular.element(scrollDiv[currentSlideIndex]);
                var currentSlideLeftOffset = currentSlide.css('-webkit-transform').replace(/[^0-9\-.,]/g, '').split(',')[0];

                var targetSlideIndex = (currentSlideIndex + 1) % scrollDiv.length;
                if (currentSlideLeftOffset > slider.prop("offsetLeft")) {
                    targetSlideIndex = currentSlideIndex - 1;
                    if (targetSlideIndex < 0) {
                        targetSlideIndex = scrollDiv.length - 1;
                    }
                }
                var targetSlide = angular.element(scrollDiv[targetSlideIndex]);

                var position = currentSlideLeftOffset / slider[0].offsetWidth;
<<<<<<< HEAD
                var slideDirection = position > 0 ? "right" : "left";
=======
                var slideDirection = position > 0 ? "right":"left";
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                position = Math.abs(position);

                setIndicatorPosition(currentSlideIndex, targetSlideIndex, position, slideDirection);
            };

            init();
        },
<<<<<<< HEAD
        controller: ['$scope', function ($scope) {
            this.addTab = function ($content) {
                $timeout(function () {
                    if ($scope.addTabContent) {
                        $scope.addTabContent($content);


=======
        controller: ['$scope',function($scope) {
            this.addTab = function($content) {
                $timeout(function() {
                    if($scope.addTabContent) {
                        $scope.addTabContent($content);
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
                    }
                });
            }
        }]
    };
}]);

<<<<<<< HEAD
slidingTabsDirective.directive('ionSlideTabLabel', ['$ionicPopup', '$timeout', function ($ionicPopup, $timeout) {
    return {
        require: "^ionSlideTabs",
        link: function ($scope, $element, $attrs, $parent) {
            
            /*	var myPopup = $ionicPopup.show({
                    title: 'Loading Data',
                    //subTitle: '...',
                    template: '<center><ion-spinner></ion-spinner></center>',
                });
            */

            $parent.addTab($attrs.ionSlideTabLabel);

			/*
            $timeout(function() {
                    myPopup.close();
                },200);
            */
=======
slidingTabsDirective.directive('ionSlideTabLabel', [ function() {
    return {
        require: "^ionSlideTabs",
        link: function ($scope, $element, $attrs, $parent) {
            $parent.addTab($attrs.ionSlideTabLabel);
>>>>>>> 01719dc743fd3d8b4a31f253faf9ae11f681f318
        }
    }
}]);
