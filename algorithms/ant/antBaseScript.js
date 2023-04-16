let points = []; // Массив точек
let ways = []; // Путь муравья
let lines = []; // Соединительные линии
let desPath = []; // Идеальный путь
let clickLock = true; // Блокировка кликов
let actionsPoint = false; // Флаг для действий с точками (создание / удаление)
let colorPoint = "#ff1f08"; // Цвет точек
let alfa = 2; // Вес феромона
let beta = 4; // Вес расстояния
let indexI = 0; // Индекс точки
let bestPath = Infinity; // Начальный путь

function setup() {
    clickLock = true;
    const canvasPoint = createCanvas(600, 600); // Создание холста
    canvasPoint.parent("canvasP"); // Родительский элемент холста
    
}

function Bubble(x, y) { // Создание класса Bubble (точки)
    this.x = x;
    this.y = y;

    this.displayPoint = function() { // Отображение точек
        fill(colorPoint);
        stroke("#00000")
        strokeWeight(1);
        ellipse(this.x, this.y, 20, 20);
    }

    this.deletePoint = function() { // Удаление точки
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d <= 20;
    }
}

function Paths(permutation, lengthPath) { // Создание класса Paths (пути)
    this.permutation = permutation.slice(0); // Копирование массива
    this.lengthPath = lengthPath;
}

function LinePath(x1, y1, x2, y2, colorLine, proximity, pheromone) { // Создание класса LinePath (соединительные линии)
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.colorLine = colorLine;
    this.proximity = proximity;
    this.pheromone = pheromone;
    this.probability = 0;

    this.displayLine = function() { // Отображение соединительных линий
        strokeWeight(this.pheromone * 2);
        line(this.x1, this.y1, this.x2, this.y2);
        stroke(this.colorLine);
    }
}

function DesiredPath(x1, y1, x2, y2) { // Создание класса DesiredPath (идеальный путь)
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.displayPath = function() { // Отображение идеального пути
        stroke("#000000")
        strokeWeight(2);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

document.getElementById("canvasP").onclick = function () {
  if (clickLock && actionsPoint && (ways.length === 0)) {
      // создание точки и линий, если разрешено создание точек и нет сохраненных маршрутов
      let p = new Bubble(mouseX, mouseY);
      points.push(p);

      let l = [];
      if (points.length > 1)
      {
          for (let i = 0; i < points.length - 1; i++)
          {
              // расчет близости точек и добавление линий между ними
              let proximity = 200/dist(points[i].x, points[i].y, points[points.length - 1].x, points[points.length - 1].y);
              let save = new LinePath(points[i].x, points[i].y, points[points.length - 1].x, points[points.length - 1].y, "#fcff", proximity, 0.2);
              l.push(save);
              save = new LinePath(points[points.length - 1].x, points[points.length - 1].y, points[i].x, points[i].y, "#fcff", proximity, 0.2);
              lines[i].push(save);
          }
      }
      let save = new LinePath(points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].x,
          points[points.length - 1].y, "#fcff", 0, 0);
      l.push(save);
      lines.push(l);
  }

  if (clickLock && !actionsPoint && (ways.length === 0)) {
      // удаление точек и линий, если разрешено удаление точек и нет сохраненных маршрутов
      for (let i = 0; i < points.length; i++)
      {
          if(points[i].deletePoint())
          {
              points.splice(i,1);
              lines[i].splice(0);
              lines.splice(i, 1);

              for (let j = 0; j < lines.length; j++)
              {
                  lines[j].splice(i, 1);
              }
          }
      }
  }
}

function clickCreatePoints()
{
  // изменение флага, позволяющего создание точек
  actionsPoint = true;
}

function clickDeletePoints()
{
  // изменение флага, позволяющего удаление точек
  actionsPoint = false;
}

function clearGraphic()
{
  // очистка всех массивов точек, линий и маршрутов
  points.splice(0);
  lines.splice(0);
  ways.splice(0);
  desPath.splice(0);
  clickLock = true;
}

function sumAll(index)
{
  let summa = 0;

  for (let i = 0; i < lines[index].length; i++)
  {
      if (index !== i)
      {
          // суммирование значений для расчета вероятности передвижения муравьев
          summa += Math.pow(lines[index][i].pheromone, alfa) * Math.pow(lines[index][i].proximity, beta);
      }
  }

  return summa;
}

// Функция probabilityCalculation вычисляет вероятность прохождения ребер муравьиной колонией
// на основе феромонов и расстояний между вершинами. alfa и beta - коэффициенты влияния феромонов и расстояний соответственно.
function probabilityCalculation()
{
    for (let i = 0; i < lines.length; i++)
    {
        let summa = sumAll(i);

        for (let j = 0; j < lines[i].length; j++)
        {
            if (i !== j)
            {
                lines[i][j].probability = Math.pow(lines[i][j].pheromone, alfa) * Math.pow(lines[i][j].proximity, beta)/summa;
            }
        }
    }
}
// Функция probabilityCalculation вычисляет вероятность прохождения ребер муравьиной колонией
// на основе феромонов и расстояний между вершинами. alfa и beta - коэффициенты влияния феромонов и расстояний соответственно.
function bodyAnts()
{
    if (ways.length === 0)
    {
        probabilityCalculation();
        clickLock = false;
    }
}

function draw() {
    fill("#9ee8b2");
    rect(0, 0, 600, 600);
    frameRate(50);
// Функция createPath вычисляет следующую вершину в пути на основе вероятностей прохождения ребер.
// Аргумент indexStart - индекс начальной вершины пути. Аргумент w - массив вершин, которые уже находятся в пути.
    function createPath(indexStart, w)
    {
        let end = 1;

        for (let i = 0; i < lines[0].length; i++)
        {
            if (w.includes(i))
            {
                end -= lines[indexStart][i].probability;
            }
        }

        let nextPoint = random(0, end);
        let summa = 0;
        for (let j = 0; j < lines[0].length; j++)
        {
            if (!w.includes(j))
            {
                summa += lines[indexStart][j].probability;

                if (summa >= nextPoint)
                {
                    return j;
                }
            }
        }
    }
// Функция createPathLength вычисляет длину пути по последовательности вершин.
// Аргумент pointSequence - массив индексов вершин в порядке следования в пути.
    function createPathLength(pointSequence)
    {
        let lengthPath = 0;

        for (let i = 0; i < pointSequence.length - 1; i++)
        {
            lengthPath += dist(points[pointSequence[i]].x, points[pointSequence[i]].y,
                points[pointSequence[i + 1]].x, points[pointSequence[i + 1]].y);
        }

        lengthPath += dist(points[pointSequence[pointSequence.length - 1]].x, points[pointSequence[pointSequence.length - 1]].y,
            points[pointSequence[0]].x, points[pointSequence[0]].y);

        return lengthPath;
    }
//Функция pheromoneUpdate() обновляет уровень феромонов на каждом ребре графа на основе качества решений, сгенерированных муравьями.
//В первом цикле итерируются все ребра графа, и уровень феромонов на каждом ребре уменьшается на 36%.
//Во втором цикле итерируются все решения (ways), и для каждого решения вычисляется дополнительный уровень феромонов на каждом ребре.
//Дополнительный уровень феромонов вычисляется путем умножения длины перестановки решения на 50 и деления на длину пути решения.
//Затем этот дополнительный уровень феромонов распределяется на каждое ребро, которое входит в перестановку решения.
    function pheromoneUpdate()
    {
        for (let i = 0; i < lines.length; i++)
        {
            for (let j = 0; j < lines[i].length; j++)
            {
                lines[i][j].pheromone = lines[i][j].pheromone * 0.64;
            }
        }

        for (let i = 0; i < ways.length; i++)
        {
            let pheromoneAdditional = ways[i].permutation.length * 50 / ways[i].lengthPath;

            for (let j = 0; j < ways[i].permutation.length - 1; j++)
            {
                lines[ways[i].permutation[j]][ways[i].permutation[j + 1]].pheromone += pheromoneAdditional;
                lines[ways[i].permutation[j + 1]][ways[i].permutation[j]].pheromone += pheromoneAdditional;
            }

            lines[ways[i].permutation[0]][ways[i].permutation[ways[i].permutation.length - 1]].pheromone += pheromoneAdditional;
            lines[ways[i].permutation[ways[i].permutation.length - 1]][ways[i].permutation[0]].pheromone += pheromoneAdditional;
        }
    }

    function printPath()
    {
        for (let i = 0; i < ways[0].permutation.length - 1; i++)
        {
            let l = new DesiredPath(points[ways[0].permutation[i]].x, points[ways[0].permutation[i]].y,
                points[ways[0].permutation[i+1]].x, points[ways[0].permutation[i+1]].y);
            desPath.push(l);
        }
        let l = new DesiredPath(points[ways[0].permutation[ways[0].permutation.length - 1]].x, points[ways[0].permutation[ways[0].permutation.length - 1]].y,
            points[ways[0].permutation[0]].x, points[ways[0].permutation[0]].y);
        desPath.push(l);
    }

    if (!clickLock)
    {
        let generationsNumber = parseInt(document.getElementById('iterationNum').value);

        if (indexI < generationsNumber) {
            ways = [];

            for (let i = 0; i < lines.length; i++) {
                let indexStart = i;
                let w = [];
                w.push(i);

                for (let j = 0; j < lines[i].length - 1; j++) {
                    let indexEnd = createPath(indexStart, w);
                    w.push(indexEnd);
                    indexStart = indexEnd;
                }

                let lengthPath = createPathLength(w);
                let wayI = new Paths(w, lengthPath);
                ways.push(wayI);
            }

            ways.sort((a, b) => (a.lengthPath - b.lengthPath));

            if (ways[0].lengthPath < bestPath)
            {
                desPath.splice(0);
                printPath();
                bestPath = ways[0].lengthPath;
            }
            pheromoneUpdate();
            indexI++;
        }
        else
        {
            clickLock = true;
            indexI = 0;
            bestPath = Infinity;
        }
    }

    for (let i = 0; i < lines.length; i++)
    {
        for (let j = 0; j < lines[i].length; j++)
        {
            lines[i][j].displayLine();
        }
    }

    for (let i = 0; i < desPath.length; i++)
    {
        desPath[i].displayPath();
    }

    for (let i = 0; i < points.length; i++)
    {
        points[i].displayPoint();
    }
}