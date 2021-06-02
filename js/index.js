let grid_size = 100
let grid = Array(grid_size);
let d_grid;
var canvas;
var ctx;
let width = 40*grid_size
let height = 40*grid_size
let cell_size = 40
window.onload = function() {
    canvas = document.getElementById("myCanvas");
    canvas.width = width;
    canvas.height =height;
    ctx =  canvas.getContext('2d');

    for (let i = 0; i < grid.length; i++){
        grid[i] = Array(grid_size);
    }
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid.length; j++){
            grid[i][j] = Math.floor(Math.random()* (1 - 0 + 1) + 0);
        }
    }
    d_grid = grid
    //draw()
    setInterval(()=>{
        ctx.clearRect(0,0, width, height)
        draw()
       calculateGrid()
        
    }, 500)

}
draw = () => {
    let x = 0;
    let y = 0;
    for(i = 0; i < cell_size*grid_size; i += cell_size){
        for(j = 0; j < cell_size*grid_size; j += cell_size){
            if(grid[x][y] == 0){
                ctx.fillStyle = "#ffffff";
            }else{
                ctx.fillStyle = "#ed0707"
            }
            ctx.fillRect(i, j, cell_size, cell_size)
            x+=1;
        }
        x=0;
        y+=1;
    }

    for(let i = 0; i <= width; i+=cell_size){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    for(let i = 0; i <= height; i+=cell_size){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }
}
calculateGrid =()=>{
    for (i = 0; i<grid.length; i++){
        for (j = 0; j<grid.length; j++){
            let neighboors = getNeighboors(j, i);
            if(neighboors < 2){
                d_grid[j][i] = 0;
            }
            else if(neighboors > 3){
                d_grid[j][i] = 0;
            }else if(grid[j][i]==0){
                if(neighboors == 3){
                    d_grid[j][i] = 1;
                }
            }
            else{
                d_grid[j][i] = d_grid[j][i];
            }
        }
    }
    return d_grid
}
getNeighboors = (x, y) => {
    let sum = 0
    if((x > 0 && y > 0)&&(x < grid.length-1 && y < grid.length-1)){
        sum += grid[x-1][y-1]
        sum += grid[x][y-1]
        sum += grid[x+1][y-1]
        sum += grid[x-1][y]
        sum += grid[x+1][y]
        sum += grid[x-1][y+1]
        sum += grid[x][y+1]
        sum += grid[x+1][y+1]
    }
    return sum
}
