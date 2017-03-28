"use strict";

app.filter('ItemsFilter', function() {    
    return function(array, val) {
       
        var resultantArray = [];
        
        if (val == 'All') {
            
            resultantArray = array;
            
            //alert('resultantArray :'+JSON.stringify(resultantArray));
        } else if (val != 'All') {
            angular.forEach(array, function(value, key) {
                if (value.item_type == val) {
                    resultantArray.push(value);
                }
            });
        }
        
        return resultantArray;
               

    };
});


app.filter('Infotainmentfilter', function() {

    
    
    return function(array, val) {
        

        var resultantArray = [];

            
        
            angular.forEach(array, function(value, key) {
               
                
                if (value.media_id == val) {
                    
                    resultantArray.push(value);
                }
                
            });
        
        
        return resultantArray;
    };
});

app.filter('getLocalities', function() {
    return function(array, val) {
        var resultantArray = [];
        angular.forEach(array, function(value, key) {
            if (value.city_id == val) {
                resultantArray.push(value);
            }
        });
        return resultantArray;
    };
});
app.filter('trustAsHtml', ['$sce', function($sce) {

    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);

app.filter('trusted', ['$sce', function($sce) {
  
      return function(url) {
          
            alert('h');
            alert('g:'+url);
        
          return $sce.trustAsResourceUrl(url);
    };
}]);
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});
app.filter('trustUrl', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});
app.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
