// const mapContainer = document.querySelector('.map');
// const foodContainer = document.getElementById('food')
// function getFood(){
//   mapContainer.addEventListener('click', (event) => {
//     const x = event.pageX - event.currentTarget.offsetLeft;
//     const y = event.pageY - event.currentTarget.offsetTop;
//     const nutrition = parseInt(prompt("Введите значение питательности",1));
//     const food = document.createElement('div');
//     food.classList.add('food');
//     food.style.left = `${x}px`;
//     food.style.top = `${y}px`;
//     food.dataset.nutrition = nutrition;
//     foodContainer.appendChild(food);
// });
// }
// function m(){
// // Генерируем карту
// //const mapElement = document.getElementById('map');
// const antCount = 100;
// const foodSources = [
//   { x: 100, y: 100, nutrition: 5 },
//   { x: 200, y: 200, nutrition: 3 },
//   { x: 300, y: 300, nutrition: 2 }
// ];

// foodSources.forEach((source, index) => {
//   const foodElement = document.createElement('div');
//   foodElement.classList.add('food');
//   foodElement.dataset.nutrition = source.nutrition;
//   foodElement.style.top = `${source.y}px`;
//   foodElement.style.left = `${source.x}px`;
//   mapContainer.appendChild(foodElement);
// });

// // Создаем муравьев
// const ants = [];
// for (let i = 0; i < antCount; i++) {
//   const antElement = document.createElement('div');
//   antElement.classList.add('ant');
//   antElement.dataset.food = 0;
//   antElement.dataset.path = [];
//   ants.push({
//     element: antElement,
//     x: Math.floor(Math.random() * mapContainer.offsetWidth),
//     y: Math.floor(Math.random() * mapContainer.offsetHeight)
//   });
//   mapContainer.appendChild(antElement);
// }

// // Обновляем путь каждого муравья
// ants.forEach((ant) => {
//     // Если муравей достиг цели, то выбираем новую
//     if (ant.element.dataset.food === '1') {
//       ant.element.dataset.food = '0';
//       ant.element.dataset.path = '';
//       ant.x = Math.floor(Math.random() * mapContainer.offsetWidth);
//       ant.y = Math.floor(Math.random() * mapContainer.offsetHeight);
//     }

//     // Ищем ближайший источник еды
//     let nearestFood = null;
//     let nearestDistance = Infinity;
//     foodSources.forEach((source) => {
//       const distance = Math.sqrt((source.x - ant.x) ** 2 + (source.y - ant.y) ** 2);
//       if (distance < nearestDistance) {
//         nearestFood = source;
//         nearestDistance = distance;
//       }
//     });

//     // Добавляем текущий путь в список посещенных муравьем точек
//     const currentPath = ant.element.dataset.path.split(',').map((point) => point.split('-'));
//     currentPath.push([ant.x, ant.y]);
//     ant.element.dataset.path = currentPath.join(',');

//     // Если муравей достиг источника еды, то обновляем его нагрузку и феромонный след
//     if (nearestDistance < 15) {
//       const foodElement = mapElement.querySelector(`[data-nutrition="${nearestFood.nutrition}"]`);
//       if (foodElement) {
//         ant.element.dataset.food = '1';
//         ant.element.dataset.path = '';
//         const foodValue = Number(foodElement.dataset.nutrition);
//         const antLoad = Number(ant.element.dataset.load) + foodValue;
//         ant.element.dataset.load = antLoad;
//         foodElement.dataset.nutrition = foodValue + 1;
//       }
//     }

//     // Перемещаем муравья в направлении источника еды
//     const dx = nearestFood.x - ant.x;
//     const dy = nearestFood.y - ant.y;
//     const distance = Math.sqrt(dx ** 2 + dy ** 2);
//     const direction = [dx / distance, dy / distance];
//     ant.x += direction[0];
//     ant.y += direction[1];

//     // Обновляем позицию муравья на карте
//     ant.element.style.top = `${ant.y}px`;
//     ant.element.style.left = `${ant.x}px`;
//   });

//   // Обновляем феромонный след на карте
//   //const foodElements = mapElement.querySelectorAll('.food');
//   const foodElements = document.getElementById('food');
//   foodElements.forEach((foodElement) => {
//     const nutrition = Number(foodElement.dataset.nutrition);
//     const antsOnFood = ants.filter((ant) => ant.element.dataset.food === '1' && ant.x >= foodElement.offsetLeft && ant.x <= foodElement.offsetLeft + foodElement.offsetWidth && ant.y >= foodElement.offsetTop && ant.y <= foodElement.offsetTop + foodElement.offsetHeight).length;
//     const pheromoneLevel = Math.min(nutrition, antsOnFood);
//     foodElement.style.backgroundColor = `rgba(255, 0, 0, ${pheromoneLevel / 10})`;
//   });
// }
// Находим элементы на странице
const addFoodBtn = document.getElementById("addFood");
const colonyFoodBtn = document.getElementById("colonyFood");
const mapDiv = document.querySelector(".map");

// Создаем переменные для хранения данных о еде и колонии
let foodArray = [];
let colony = null;

// Функция для добавления еды на карту
function addFood() {
  // Создаем новый элемент еды
  const foodDiv = document.createElement("div");
  foodDiv.classList.add("food");
  
  // Задаем питательность еды, запрашивая значение у пользователя
  const foodValue = parseInt(prompt("Введите значение питательности еды:"));
  if (!isNaN(foodValue)) {
    foodDiv.dataset.foodValue = foodValue;
    foodArray.push(foodDiv);
    
    // Добавляем элемент еды на карту
    mapDiv.appendChild(foodDiv);
  }
}

// Функция для добавления колонии на карту
function addColony() {
  // Создаем новый элемент колонии
  const colonyDiv = document.createElement("div");
  colonyDiv.classList.add("colony");
  
  // Задаем количество муравьев в колонии, запрашивая значение у пользователя
  const antCount = parseInt(prompt("Введите количество муравьев в колонии:"));
  if (!isNaN(antCount)) {
    colonyDiv.dataset.antCount = antCount;
    colony = colonyDiv;
    
    // Добавляем элемент колонии на карту
    mapDiv.appendChild(colonyDiv);
  }
}

// Функция для перемещения колонии на карту
function moveColony() {
  // Задаем новую позицию колонии, запрашивая значение у пользователя
  const newPosition = prompt("Введите новую позицию для колонии (например, '100px 200px'):");
  if (newPosition) {
    colony.style.left = newPosition.split(" ")[0];
    colony.style.top = newPosition.split(" ")[1];
  }
}

// Добавляем обработчики событий на кнопки
addFoodBtn.addEventListener("click", addFood);
colonyFoodBtn.addEventListener("click", addColony);
colonyFoodBtn.addEventListener("dblclick", moveColony);