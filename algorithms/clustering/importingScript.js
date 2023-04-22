const pointContainer = document.getElementById('point-container');
const gridContainer = document.querySelector('.grid-container');
const pointContainer1 = document.getElementById('point-container1');
const pointContainer2 = document.getElementById('point-container2');


function addPoint2(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  pointContainer2.appendChild(circle);
}
function addPoint1(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  pointContainer1.appendChild(circle);
}
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
        addPoint1(x, y);
        addPoint2(x, y);
      });
}
clickOnThePlane();

function getXYpoints()
{
  const points = [];
for (let i = 0; i < pointContainer.children.length; i++) {
  const point = pointContainer.children[i];
  const x = parseFloat(point.style.left);
  const y = parseFloat(point.style.top);
  points.push({ x: x, y: y, cluster: null });
}
return points;
}


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
const points = getXYpoints();


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
  while (iterations <100) {
    iterations++;
    assignClusters();
    recalculateCenters();
    displayPoints();
  }
  
}
function pointClear()
{
  pointContainer.innerHTML = '';
  pointContainer1.innerHTML = '';
  pointContainer2.innerHTML = '';
}
function clustP()
{// Получаем координаты всех точек
const points = getXYpoints();

// Функция для вычисления расстояния между двумя точками
function distance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Инициализируем кластеры
const clusters = points.map((point) => ({ points: [point] }));

// Функция для объединения двух кластеров
function mergeClusters(cluster1, cluster2) {
  const mergedPoints = cluster1.points.concat(cluster2.points);
  return { points: mergedPoints };
}

// Функция для вычисления расстояния между двумя кластерами
function clusterDistance(cluster1, cluster2) {
  const centroid1 = getCentroid(cluster1);
  const centroid2 = getCentroid(cluster2);
  return distance(centroid1, centroid2);
}

// Функция для вычисления центроида кластера
function getCentroid(cluster) {
  const numPoints = cluster.points.length;
  const x = cluster.points.reduce((sum, point) => sum + point.x, 0) / numPoints;
  const y = cluster.points.reduce((sum, point) => sum + point.y, 0) / numPoints;
  return { x, y };
}

// Основной цикл кластеризации
const thresholdDistance = 25; // пороговое расстояние для объединения кластеров

while (true) { // повторяем до тех пор, пока не останется один кластер
  const closestClusters = []; // массив для хранения ближайших кластеров

  // Ищем ближайшие кластеры
  for (let i = 0; i < clusters.length; i++) {
    for (let j = i + 1; j < clusters.length; j++) {
      const dist = clusterDistance(clusters[i], clusters[j]);
      if (dist < thresholdDistance) {
        closestClusters.push([clusters[i], clusters[j]]);
      }
    }
  }

  if (closestClusters.length > 0) {
    // Объединяем все ближайшие кластеры в один
    const mergedCluster = closestClusters.reduce((acc, [cluster1, cluster2]) => mergeClusters(cluster1, cluster2), { points: [] });

    // Удаляем объединенные кластеры из списка кластеров
    closestClusters.flat().forEach((cluster) => {
      const index = clusters.indexOf(cluster);
      if (index !== -1) {
        clusters.splice(index, 1);
      }
    });
    // Добавляем новый кластер в список кластеров
    
  } else {
    // Если больше нет ближайших кластеров, останавливаем цикл
    break;
  }
}

for (let i = 0; i < clusters.length; i++) {
  for (let j = 0; j < clusters[i].points.length; j++) {
    clusters[i].points[j].cluster = i;
    console.log(i);
  }
}
for (let i = 0; i < points.length; i++) {
  const point = pointContainer1.children[i];
  const cluster = points[i].cluster;
  point.style.backgroundColor = `hsl(${cluster * 360 / clusters.length}, 100%, 50%)`;
}
// Выводим результаты
console.log(clusters);

console.log(clusters.length);
// Раскрашиваем точки в цвета кластеров
}

