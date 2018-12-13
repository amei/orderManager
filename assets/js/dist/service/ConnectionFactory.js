'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, dbName, version, stores, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            dbName = 'orderbook';
            version = 2;
            stores = ['orders'];
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('This class cannot be instantiated.');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {

                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(dbName, version);

                            openRequest.onsuccess = function (e) {

                                if (!connection) {
                                    connection = e.target.result;
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Just ConnectionFactory can close a connection.');
                                    };
                                }

                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {
                                return reject(e.target.error.name);
                            };

                            openRequest.onupgradeneeded = function (e) {
                                return ConnectionFactory._createStores(e.target.result);
                            };
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {

                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {

                        stores.forEach(function (store) {

                            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map