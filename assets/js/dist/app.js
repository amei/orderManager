'use strict';

System.register(['./controller/OrderController'], function (_export, _context) {
  "use strict";

  var orderController, controller, $;
  return {
    setters: [function (_controllerOrderController) {
      orderController = _controllerOrderController.orderController;
    }],
    execute: function () {
      controller = orderController();
      $ = document.querySelector.bind(document);


      $('#app__controls').onsubmit = controller.add.bind(controller);
      $('#control-delete').onclick = controller.delete.bind(controller);
      $('#control-import').onclick = controller.import.bind(controller);
    }
  };
});
//# sourceMappingURL=app.js.map