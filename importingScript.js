const pointContainer = document.getElementById('point-container');
const gridContainer = document.querySelector('.grid-container');

function addPoint(x, y) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    pointContainer.appendChild(circle);
  }
function clickOnThePlane(){
    gridContainer.addEventListener('click', (event) => {
        const x = event.pageX - event.currentTarget.offsetLeft;
        const y = event.pageY - event.currentTarget.offsetTop;
      
        addPoint(x, y);
      });
}
clickOnThePlane();

function runKMeans(){
    const kInput = document.getElementById("numClusters");
    const k = parseInt(kInput.value);   
//k = parseInt(document.getElementById("numClusters").value);
// Инициализация центров кластеров
let centers = [];
for (let i = 0; i < k; i++) {
  centers.push({ x: Math.random() * 500, y: Math.random() * 500 });
}

// Получение координат всех точек из контейнера
const points = [];
for (let i = 0; i < pointContainer.children.length; i++) {
  const point = pointContainer.children[i];
  const x = parseFloat(point.style.left);
  const y = parseFloat(point.style.top);
  points.push({ x: x, y: y, cluster: null });
}

// Функция для определения расстояния между двумя точками
function distance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Функция для нахождения ближайшего центра кластера для каждой точки
function assignClusters() {
  for (let i = 0; i < points.length; i++) {
    let minDistance = Number.MAX_VALUE;
    let cluster = null;
    for (let j = 0; j < centers.length; j++) {
      const d = distance(points[i], centers[j]);
      if (d < minDistance) {
        minDistance = d;
        cluster = j;
      }
    }
    points[i].cluster = cluster;
  }
}

function recalculateCenters() {
    const sums = Array.from({ length: k }, () => ({ x: 0, y: 0 }));
    const counts = new Array(k).fill(0);
  
    for (let i = 0; i < points.length; i++) {
      const { x, y, cluster } = points[i];
      sums[cluster].x += x;
      sums[cluster].y += y;
      counts[cluster]++;
    }
  
    for (let i = 0; i < k; i++) {
      const { x, y } = sums[i];
      const count = Math.max(counts[i], 1);
      centers[i].x = x / count;
      centers[i].y = y / count;
    }
  }



// Функция для отображения точек с разными цветами в соответствии с их кластером
function displayPoints() {
    for (let i = 0; i < points.length; i++) {
      const point = pointContainer.children[i];
      const cluster = points[i].cluster;
      point.style.backgroundColor = `hsl(${cluster * 360 / k}, 100%, 50%)`;
    }
  }
  
  // Запускаем k-средних алгоритм до тех пор, пока расположение центров кластеров не перестанет изменяться
  let iterations = 0;
  while (iterations < 100) {
    iterations++;
    assignClusters();
    recalculateCenters();
    displayPoints();
  }
}
function pointClear()
{
    pointContainer.innerHTML = '';

  // Restart the k-means algorithm
  runKMeans();
}
// специаьно для Бездарей
