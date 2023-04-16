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
//Допиши BRINCH алгоритм кластеризации. Координаты получи из функции getXYpoints(). Раскрась точки для каждого кластера в разные цвета, зная const point = pointContainer2.children[i];

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

function euclideanDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function cMeansClustering() {
const kInput = document.getElementById("numClusters");
const k = parseInt(kInput.value);
  // Получить координаты точек
  const points = getXYpoints();
  // Инициализация k кластеров с начальными центроидами
  const clusters = [];
  for (let i = 0; i < k; i++) {
    const centroid = {
      x: Math.random()*500, // случайное значение для координаты x
      y: Math.random()*500 // случайное значение для координаты y
    };
    clusters.push({
      centroid: centroid,
      points: []
    });
  }
  
  // Повторять до сходимости
  let converged = false;
  while (!converged) {
    // Назначить точки к ближайшим кластерам
    for (let i = 0; i < points.length; i++) {
      let minDist = Infinity;
      let closestCluster = null;
      for (let j = 0; j < clusters.length; j++) {
        const dist = euclideanDistance(points[i], clusters[j].centroid);
        if (dist < minDist) {
          minDist = dist;
          closestCluster = clusters[j];
        }
      }
      closestCluster.points.push(points[i]);
    }
    
    // Обновить центроиды кластеров
    converged==true;
    for (let i = 0; i < clusters.length; i++) {
      const sumX = clusters[i].points.reduce((acc, p) => acc + p.x, 0);
      const sumY = clusters[i].points.reduce((acc, p) => acc + p.y, 0);
      const newCentroid = {
        x: sumX / clusters[i].points.length,
        y: sumY / clusters[i].points.length
      };
      if (newCentroid.x !== clusters[i].centroid.x || newCentroid.y !== clusters[i].centroid.y) {
       converged = false;
     }
      clusters[i].centroid = newCentroid;
      clusters[i].points = [];
    }
  }
  document.write(clusters);
  return clusters;
  
}

function dbscan(eps, minPts) {
   
  // get points from point container
  const points = getXYpoints();

  let clusterId = 0;
  // loop through each point
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    // if the point has already been assigned to a cluster, skip it
    if (point.cluster !== null) {
      continue;
    }
    // find all points within eps distance of the current point
    const neighbors = findNeighbors(point, eps, points);
    // if the number of neighbors is less than minPts, mark the point as noise
    if (neighbors.length < minPts) {
      point.cluster = -1;
      continue;
    }
    // otherwise, expand the cluster starting with the current point
    clusterId++;
    expandCluster(point, neighbors, clusterId, eps, minPts, points);
  }
  // update the point colors on the screen
  displayPoints1();
}

function findNeighbors(point, eps, points) {
  const neighbors = [];
  // loop through each point and check if it's within eps distance of the current point
  for (let i = 0; i < points.length; i++) {
    const other = points[i];
    if (point === other) {
      continue;
    }
    const distance = euclideanDistance(point, other);
    if (distance < eps) {
      neighbors.push(other);
    }
  }
  return neighbors;
}

function expandCluster(point, neighbors, clusterId, eps, minPts, points) {
  // assign the current point to the cluster
  point.cluster = clusterId;
  // loop through each neighbor
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    // if the neighbor has already been assigned to a cluster, skip it
    if (neighbor.cluster !== null) {
      continue;
    }
    // find all neighbors within eps distance of the neighbor
    const neighborNeighbors = findNeighbors(neighbor, eps, points);
    // if the number of neighbors is greater than or equal to minPts, add them to the current cluster
    if (neighborNeighbors.length >= minPts) {
      neighbors = neighbors.concat(neighborNeighbors);
    }
    // assign the neighbor to the current cluster
    neighbor.cluster = clusterId;
  }
}
function displayPoints1() {
  const kInput = document.getElementById("numClusters");
  const k = parseInt(kInput.value);
  const points = getXYpoints();
  for (let i = 0; i < points.length; i++) {
    const point = pointContainer2.children[i];
    const cluster = points[i].cluster;
    point.style.backgroundColor = `hsl(${cluster * 360 / k}, 100%, 50%)`;
  }
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class Cluster {
  constructor(point) {
    this.points = [point];
    this.centroid = point;
    this.color = getRandomColor();
    this.index = point.index;
  }

  mergeWith(other) {
    const mergedPoints = this.points.concat(other.points);
    const centroid = Point.calculateCentroid(mergedPoints);
    const newCluster = new Cluster(mergedPoints[0]);
    newCluster.points = mergedPoints;
    newCluster.centroid = centroid;
    newCluster.color = getRandomColor();
    return newCluster;
  }
}
function brinchClustering() {
  const kInput = document.getElementById("numClusters");
  const k = parseInt(kInput.value);
  const points = getXYpoints();

  // Получить контейнер точек
 

  // Получить количество точек
  const numPoints = points.length;

  // Создать массив кластеров
  const clusters = [];
  for (let i = 0; i < k; i++) {
    clusters.push(new Cluster(points[i]));
  }

  // Найти расстояние между всеми парами точек
  const distances = [];
  for (let i = 0; i < numPoints; i++) {
    const row = [];
    for (let j = 0; j < numPoints; j++) {
      row.push(points[i].distanceTo(points[j]));
    }
    distances.push(row);
  }

  // Найти ближайшие точки и объединить их в кластеры
  while (clusters.length > k) {
    let minDistance = Infinity;
    let closestClusters = [];
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        if (distances[clusters[i].index][clusters[j].index] < minDistance) {
          minDistance = distances[clusters[i].index][clusters[j].index];
          closestClusters = [i, j];
        }
      }
    }
    const newCluster = clusters[closestClusters[0]].mergeWith(clusters[closestClusters[1]]);
    clusters.splice(closestClusters[1], 1);
    clusters.splice(closestClusters[0], 1);
    clusters.push(newCluster);
  }

  // Раскрасить точки в соответствии с кластерами
  for (let i = 0; i < numPoints; i++) {
    let closestCluster = clusters[0];
    let minDistance = Infinity;
    for (let j = 0; j < clusters.length; j++) {
      const distance = points[i].distanceTo(clusters[j].centroid);
      if (distance < minDistance) {
        closestCluster = clusters[j];
        minDistance = distance;
      }
    }
    const point = pointContainer.children[i];
    point.style.backgroundColor = closestCluster.color;
  }
}
function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Алгоритм BRINCH для кластеризации
function brinch(points, threshold) {
  let clusters = [];
  let noise = [];

  // Разделение всех точек на отдельные кластеры
  for (let i = 0; i < points.length; i++) {
    clusters.push([points[i]]);
  }

  // Объединение кластеров, пока расстояние между ними не станет больше порогового значения
  while (clusters.length > 1) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let minCluster1 = null;
    let minCluster2 = null;

    // Находим два ближайших кластера
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        let distanceBetweenClusters = Number.MAX_SAFE_INTEGER;
        for (let k = 0; k < clusters[i].length; k++) {
          for (let l = 0; l < clusters[j].length; l++) {
            let distanceBetweenPoints = distance(clusters[i][k], clusters[j][l]);
            if (distanceBetweenPoints < distanceBetweenClusters) {
              distanceBetweenClusters = distanceBetweenPoints;
            }
          }
        }

        if (distanceBetweenClusters < minDistance) {
          minDistance = distanceBetweenClusters;
          minCluster1 = i;
          minCluster2 = j;
        }
      }
    }

    // Объединяем два ближайших кластера в один
    let newCluster = clusters[minCluster1].concat(clusters[minCluster2]);
    clusters.splice(Math.max(minCluster1, minCluster2), 1);
    clusters.splice(Math.min(minCluster1, minCluster2), 1);
    clusters.push(newCluster);
  }

  // Разделение точек на кластеры и шум
  for (let i = 0; i < clusters.length; i++) {
    for (let j = 0; j < clusters[i].length; j++) {
      clusters[i][j].cluster = i;
    }
  }

  for (let i = 0; i < points.length; i++) {
    if (points[i].cluster === null) {
      noise.push(points[i]);
    }
  }

  return { clusters: clusters, noise: noise };
}

// Раскраска точек в разные цвета для каждого кластера
function colorPoints(clusters) {
  const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
  for (let i = 0; i < clusters.length; i++) {
    const color = colors[i % colors.length];
    for (let j = 0; j < clusters[i].length; j++) {
      const point = pointContainer2.children[clusters[i][j]];
      point.style.backgroundColor = color;
      }
      }
      }

function run(){
  // Получение координат точек
const points = getXYpoints();

// Кластеризация точек с помощью алгоритма BRINCH
const threshold = 100; // Пороговое расстояние между кластерами
const result = brinch(points, threshold);
console.log(result.clusters.length);
// Раскраска точек в разные цвета для каждого кластера
colorPoints(result.clusters);
}