xively.factory('OrdersService', ['$firebaseObject', 'FIREBASE_URI_ORDERS', function ($firebaseObject, FIREBASE_URI_ORDERS) {
    var ref = new Firebase(FIREBASE_URI_ORDERS);
    var activeOrders = $firebaseObject(ref);
    var getOrders = function () {
        return activeOrders;
    };
    var addOrder = function (neworder) {
        // desarrollar
        
        // FIREBASE_URI_ORDERS/email
        
    };
    return {
        getOrders: getOrders,
        addOrder: addOrder
    };
}]);