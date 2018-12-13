'use strict';

System.register(['../model/Order', '../model/OrderList', '../view/OrderListView.js', '../service/OrderService', '../model/Message', '../view/MessageView', '../helper/DateHelper', '../helper/DataBind'], function (_export, _context) {
    "use strict";

    var Order, OrderList, OrderListView, OrderService, Message, MessageView, DateHelper, DataBind, _createClass, OrderController, controller;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function orderController() {
        return controller;
    }

    _export('orderController', orderController);

    return {
        setters: [function (_modelOrder) {
            Order = _modelOrder.Order;
        }, function (_modelOrderList) {
            OrderList = _modelOrderList.OrderList;
        }, function (_viewOrderListViewJs) {
            OrderListView = _viewOrderListViewJs.OrderListView;
        }, function (_serviceOrderService) {
            OrderService = _serviceOrderService.OrderService;
        }, function (_modelMessage) {
            Message = _modelMessage.Message;
        }, function (_viewMessageView) {
            MessageView = _viewMessageView.MessageView;
        }, function (_helperDateHelper) {
            DateHelper = _helperDateHelper.DateHelper;
        }, function (_helperDataBind) {
            DataBind = _helperDataBind.DataBind;
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

            OrderController = function () {
                function OrderController() {
                    _classCallCheck(this, OrderController);

                    var $ = document.querySelector.bind(document);

                    this._controlsDate = $('#order-date');
                    this._controlsAmount = $('#order-amount');
                    this._controlsPrice = $('#order-price');

                    this._orderList = new DataBind(new OrderList(), new OrderListView($('#orderListView')), 'add', 'delete', 'inverse', 'arrange');

                    this._message = new DataBind(new Message(), new MessageView($('#messageView')), 'text');

                    this._service = new OrderService();

                    this._init();
                }

                _createClass(OrderController, [{
                    key: 'add',
                    value: function add(event) {
                        var _this = this;

                        event.preventDefault();

                        this._service.add(this._createOrder()).then(function (message) {
                            _this._orderList.add(_this._createOrder());
                            _this._message.text = message;
                            _this._clearForm();
                        }).catch(function (error) {
                            return _this._message.text = error;
                        });
                    }
                }, {
                    key: 'import',
                    value: function _import() {
                        var _this2 = this;

                        this._service.import(this._orderList.list).then(function (orders) {
                            orders.forEach(function (order) {
                                return _this2._orderList.add(order);
                            });
                            _this2._message.text = 'Orders imported.';
                            _this2._clearForm();
                        }).catch(function (error) {
                            return _this2._message.text = error;
                        });
                    }
                }, {
                    key: 'delete',
                    value: function _delete() {
                        var _this3 = this;

                        this._service.delete().then(function (message) {
                            _this3._orderList.delete();
                            _this3._message.text = message;
                            _this3._clearForm();
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });
                    }
                }, {
                    key: 'arrange',
                    value: function arrange(column) {

                        this._currentColumn == column ? this._orderList.inverse() : this._orderList.arrange(function (a, b) {
                            return a[column] - b[column];
                        });

                        this._currentColumn = column;
                    }
                }, {
                    key: '_init',
                    value: function _init() {
                        var _this4 = this;

                        this._service.load().then(function (orders) {
                            return orders.forEach(function (order) {
                                return _this4._orderList.add(order);
                            });
                        }).catch(function (error) {
                            return _this4._message.text = error;
                        });
                    }
                }, {
                    key: '_createOrder',
                    value: function _createOrder() {

                        var date = DateHelper.dateFromText(this._controlsDate.value);
                        var amount = parseInt(this._controlsAmount.value);
                        var price = parseFloat(this._controlsPrice.value);

                        return new Order(date, amount, price);
                    }
                }, {
                    key: '_clearForm',
                    value: function _clearForm() {

                        this._controlsDate.value = '';
                        this._controlsAmount.value = 1;
                        this._controlsPrice.value = 0;

                        this._controlsDate.focus();
                    }
                }]);

                return OrderController;
            }();

            controller = new OrderController();
        }
    };
});
//# sourceMappingURL=OrderController.js.map