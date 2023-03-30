pathWidth = 10       //Width of the Maze Path
wall = 2             //Width of the Walls between Paths
outerWall = 2        //Width of the Outer most wall
width = 10           //Number paths fitted horisontally
height = 10         //Number paths fitted vertically
delay = 1            //Delay between algorithm cycles
x = width/2|0        //Horisontal starting position
y = height/2|0       //Vertical starting position
seed = Math.random()*100000|0//Seed for random numbers
wallColor = '#d24'   //Color of the walls
pathColor = '#222a33'//Color of the path

randomGen = function(seed){
	if(seed===undefined)var seed=performance.now()
	return function(){
    seed = (seed * 9301 + 49297) % 233280
		return seed/233280
	}
}

init = function(){
    offset = pathWidth/2+outerWall
    map = []
    maze = document.getElementById('maze')
    maze.innerHTML = ''
    for(var i=0;i<height;i++){
      var row = document.createElement('tr')
      map[i] = []
      for(var j=0;j<width;j++){
        var cell = document.createElement('td')
        cell.className = 'cell'
        row.appendChild(cell)
        map[i][j] = false
      }
      maze.appendChild(row)
    }
    random = randomGen(seed)
    map[y][x] = true
    route = [[x,y]]
  }
init()

inputWidth = document.getElementById('size')
inputHeight = document.getElementById('size')
inputPathWidth = document.getElementById('pathwidth')
inputWallWidth = document.getElementById('wallwidth')
inputOuterWidth = document.getElementById('outerwidth')
inputPathColor = document.getElementById('pathcolor')
inputWallColor = document.getElementById('wallcolor')
inputSeed = document.getElementById('seed')
buttonRandomSeed = document.getElementById('randomseed')

settings = {
  display: function(){
    inputWidth.value = width
    inputHeight.value = height
    inputPathWidth.value = pathWidth
    inputWallWidth.value = wall
    inputOuterWidth.value = outerWall
    inputPathColor.value = pathColor
    inputWallColor.value = wallColor
    inputSeed.value = seed
  },
  check: function(){
    if(inputWidth.value != width||
       inputHeight.value != height||
       inputPathWidth.value != pathWidth||
       inputWallWidth.value != wall||
       inputOuterWidth.value != outerWall||
       inputPathColor.value != pathColor||
       inputWallColor.value != wallColor||
       inputSeed.value != seed){
      settings.update()
    }
  },
  update: function(){
    clearTimeout(timer)
    width = parseFloat(inputWidth.value)
    height = parseFloat(inputHeight.value)
    pathWidth = parseFloat(inputPathWidth.value)
    wall = parseFloat(inputWallWidth.value)
    outerWall = parseFloat(inputOuterWidth.value)
    pathColor = inputPathColor.value
    wallColor = inputWallColor.value
    seed = parseFloat(inputSeed.value)
    x = width/2|0
    y = height/2|0
    init()
    loop()
  }
}

buttonRandomSeed.addEventListener('click',function(){
  inputSeed.value = Math.random()*100000|0
})

loop = function(){
    x = route[route.length-1][0]|0
    y = route[route.length-1][1]|0
    
    var directions = [[1,0],[-1,0],[0,1],[0,-1]],
        alternatives = []
    
    for(var i=0;i<directions.length;i++){
      if(map[(directions[i][1]+y)*2]!=undefined&&
         map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
        alternatives.push(directions[i])
      }
    }
    
    if(alternatives.length===0){
      route.pop()
      if(route.length>0){
        var lastCell = document.getElementById(`${x}-${y}`)
        lastCell.classList.remove("visited")
        ctx.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
                   route[route.length-1][1]*(pathWidth+wall)+offset)
        timer = setTimeout(loop,delay)
      }
      return;
    }
    direction = alternatives[random()*alternatives.length|0]
    route.push([direction[0]+x,direction[1]+y])
    var nextX = direction[0] + x;
    var nextY = direction[1] + y;
    var nextCell = document.getElementById(`${nextX}-${nextY}`);
    nextCell.classList.add("visited");
    ctx.lineTo(nextX*(pathWidth+wall)+offset,
               nextY*(pathWidth+wall)+offset)
    map[(direction[1]+y)*2][(direction[0]+x)*2] = true
    map[direction[1]+y*2][direction[0]+x*2] = true
    ctx.stroke()
    timer = setTimeout(loop,delay)
  }