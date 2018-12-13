'use strict';

System.register(['../model/Order'], function (_export, _context) {
    "use strict";

    var Order, _createClass, OrderDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelOrder) {
            Order = _modelOrder.Order;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('OrderDao', OrderDao = function () {
                function OrderDao(connection) {
                    _classCallCheck(this, OrderDao);

                    this._connection = connection;
                    this._store = 'orders';
                }

                _createClass(OrderDao, [{
                    key: 'add',
                    value: function add(order) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var addRequest = _this._connection.transaction(_this._store, 'readwrite').objectStore(_this._store).add(order);

                            addRequest.onsuccess = function (e) {
                                return resolve('Order added.');
                            };

                            addRequest.onerror = function (e) {
                                return reject('Order cannot be added.');
                            };
                        });
                    }
                }, {
                    key: 'delete',
                    value: function _delete() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var deleteRequest = _this2._connection.transaction(_this2._store, 'readwrite').objectStore(_this2._store).clear();

                            deleteRequest.onsuccess = function (e) {
                                return resolve('Orders removed.');
                            };

                            deleteRequest.onerror = function (e) {
                                return reject('Orders cannot be removed.');
                            };
                        });
                    }
                }, {
                    key: 'load',
                    value: function load() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var loadRequest = _this3._connection.transaction(_this3._store, 'readwrite').objectStore(_this3._store).openCursor();

                            var orders = [];

                            loadRequest.onsuccess = function (e) {

                                var currentLine = e.target.result;

                                if (currentLine) {
                                    var value = currentLine.value;

                                    orders.push(new Order(value._date, value._amount, value._price));
                                    currentLine.continue();
                                } else {
                                    resolve(orders);
                                }
                            };

                            loadRequest.onerror = function (e) {
                                return reject('Orders cannot be loaded.');
                            };
                        });
                    }
                }]);

                return OrderDao;
            }());

            _export('OrderDao', OrderDao);
        }
    };
});
//# sourceMappingURL=OrderDao.js.map