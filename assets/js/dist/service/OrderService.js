'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/OrderDao', '../model/Order'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, OrderDao, Order, _createClass, OrderService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoOrderDao) {
            OrderDao = _daoOrderDao.OrderDao;
        }, function (_modelOrder) {
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

            _export('OrderService', OrderService = function () {
                function OrderService() {
                    _classCallCheck(this, OrderService);

                    this._http = new HttpService();
                }

                _createClass(OrderService, [{
                    key: 'add',
                    value: function add(order) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new OrderDao(connection);
                        }).then(function (dao) {
                            return dao.add(order);
                        }).then(function () {
                            return 'Order added.';
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Order cannot be added.');
                        });
                    }
                }, {
                    key: 'delete',
                    value: function _delete() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new OrderDao(connection);
                        }).then(function (dao) {
                            return dao.delete();
                        }).then(function () {
                            return 'Orders deleted.';
                        }).catch(function (error) {
                            throw new Error('Order cannot be deleted.');
                        });
                    }
                }, {
                    key: 'load',
                    value: function load() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new OrderDao(connection);
                        }).then(function (dao) {
                            return dao.load();
                        }).catch(function (error) {
                            throw new Error('Orders cannot be loaded.');
                        });
                    }
                }, {
                    key: 'import',
                    value: function _import(currentOrders) {

                        return this.getAllOrders().then(function (orders) {
                            return orders.filter(function (order) {
                                return !currentOrders.some(function (current) {
                                    return order.equals(current);
                                });
                            });
                        }).catch(function (error) {
                            throw new Error('Orders cannot be imported.');
                        });
                    }
                }, {
                    key: 'getAllOrders',
                    value: function getAllOrders() {

                        return Promise.all([this.getWeekOrders(), this.getLastWeekOrders(), this.getOrdersFromTwoWeeksAgo()]).then(function (response) {
                            return response.reduce(function (acc, current) {
                                return acc.concat(current);
                            }, []);
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: 'getWeekOrders',
                    value: function getWeekOrders() {

                        return this._http.get('/orders/week').then(function (orders) {
                            return orders.map(function (order) {
                                return new Order(new Date(order.date), order.amount, order.price);
                            });
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: 'getLastWeekOrders',
                    value: function getLastWeekOrders() {

                        return this._http.get('/orders/last-week').then(function (orders) {
                            return orders.map(function (order) {
                                return new Order(new Date(order.date), order.amount, order.price);
                            });
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: 'getOrdersFromTwoWeeksAgo',
                    value: function getOrdersFromTwoWeeksAgo() {

                        return this._http.get('/orders/two-weeks-ago').then(function (orders) {
                            return orders.map(function (order) {
                                return new Order(new Date(order.date), order.amount, order.price);
                            });
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }]);

                return OrderService;
            }());

            _export('OrderService', OrderService);
        }
    };
});
//# sourceMappingURL=OrderService.js.map