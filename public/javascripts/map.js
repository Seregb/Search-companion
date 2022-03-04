ymaps.ready(init);


async function init() {
  const path = window.location.pathname;
  console.log(path);
  const responce = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
  const data = await responce.json();
  var multiRoute = new ymaps.multiRouter.MultiRoute({
    // Описание опорных точек мультимаршрута.
    referencePoints: [
      data.from,
      data.to
    ],
    // Параметры маршрутизации.
    params: {
      // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
      results: 1
    }
  }, {
    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    boundsAutoApply: true
  });

  // Создаем кнопки для управления мультимаршрутом.
  var trafficButton = new ymaps.control.Button({
    data: { content: "Учитывать пробки" },
    options: { selectOnClick: true }
  }),
    viaPointButton = new ymaps.control.Button({
      data: { content: "Добавить транзитную точку" },
      options: { selectOnClick: true }
    });

  // Объявляем обработчики для кнопок.
  // trafficButton.events.add('select', function () {
  //   /**
  //    * Задаем параметры маршрутизации для модели мультимаршрута.
  //    * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setParams
  //    */
  //   multiRoute.model.setParams({ avoidTrafficJams: true }, true);
  // });

  trafficButton.events.add('deselect', function () {
    multiRoute.model.setParams({ avoidTrafficJams: false }, true);
  });

  viaPointButton.events.add('select', function () {
    var referencePoints = multiRoute.model.getReferencePoints();
    referencePoints.splice(1, 0, "ул. Орджоникидзе, 11, стр. 10, Москва");
    /**
     * Добавляем транзитную точку в модель мультимаршрута.
     * Обратите внимание, что транзитные точки могут находится только
     * между двумя путевыми точками, т.е. не могут быть крайними точками маршрута.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setReferencePoints
     */
    multiRoute.model.setReferencePoints(referencePoints, [1]);
  });

  viaPointButton.events.add('deselect', function () {
    var referencePoints = multiRoute.model.getReferencePoints();
    referencePoints.splice(1, 1);
    multiRoute.model.setReferencePoints(referencePoints, []);
  });

  // Создаем карту с добавленными на нее кнопками.
  var myMap = new ymaps.Map('map', {
    center: [55.750625, 37.626],
    zoom: 7,
    controls: [trafficButton, viaPointButton]
  }, {
    buttonMaxWidth: 300
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}
