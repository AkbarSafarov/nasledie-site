(function(angular) {
    'use strict';
    angular.module('thousand.delimiter', [])
        .filter('thousandDelimiter', function() {
            return function(input, delimetr) {
                if (!input) {
                    return;
                }
                var delimetr = delimetr || ',';
                return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimetr);
            }
        });
    angular.module('angular-toArrayFilter', [])

        .filter('toArray', function () {
            return function (obj, addKey) {
                if (!angular.isObject(obj)) return obj;
                if ( addKey === false ) {
                    return Object.keys(obj).map(function(key) {
                        return obj[key];
                    });
                } else {
                    return Object.keys(obj).map(function (key) {
                        var value = obj[key];
                        return angular.isObject(value) ?
                            Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
                            { $key: key, $value: value };
                    });
                }
            };
        });
})(angular);
