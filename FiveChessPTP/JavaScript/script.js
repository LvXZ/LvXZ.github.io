

//首先获取canvas,通过id="chess"获取
var chess = document.getElementById('chess');
//获取chess的上下文
var context = chess.getContext('2d');
//获取重新开始按钮
var new_button = document.getElementById('NGbutton');
//true表示黑棋白棋，false表示----全局变量
var who = true;
//二维数组记录棋盘着子情况
var chessBoard = [];

//游戏开始函数
var NewGameBegin = function() {

    //初始化----二维数组记录棋盘着子
    for(var i=0; i<15; i++) {
        chessBoard[i] = [];
        for(var j=0; j<15; j++) {
            //0表示没有落子,1表示黑子，2表示白子
            chessBoard[i][j] = 0;    
        }
    }

    //添加水印
    var image = new Image();    
    image.src = "Images/godo.png"; //水印路径
    //加载图片过程
    image.onload = function() {
        context.drawImage(image , 0, 0, 450, 450);      
        //context添加图片，设置水印大小
        //注意图片将划线全覆盖
        DrawChessLine();//划线函数调用，避免图片覆盖
    }
}


//通过context进行横竖划线
var DrawChessLine = function() {
    context.strokeStyle = "#BFBFBF";//使划线颜色改变为#BFBFBF

	for (var i=0; i<15; i++) {      //要划横竖15条线
		context.moveTo(15+i*30,15); //横线从坐标(15+i*30,15)开始
		context.lineTo(15+i*30,435);//在坐标(15+i*30,435)结束
		context.stroke();           //使其划线显示--划边
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}
}

//落棋函数
var OneStep = function( i, j, who_me){//ij着棋坐标，who谁着棋
    //划圆
    context.beginPath();//开始路径
    context.arc( 15+i*30, 15+j*30, 13, 0, 2*Math.PI);
    //扇形函数--圆形坐标100,100--半径20--扇形起始弧度0,终止弧度2PI
    context.closePath();//结束路径

    //使棋子具有渐变颜色效果--中间灰色带白
    var place = context.createRadialGradient(15+i*30-2,15+j*30-2, 13,15+i*30-2,15+j*30-2, 1);
    //返回渐变局域的对象 
    //局域为对应两个同心圆--外、内圆圆形半圆径--渐变圆心偏移-2

    if(who_me){//黑棋
		place.addColorStop(0, "#0A0A0A");   //外圆渐变局域的颜色--灰
		place.addColorStop(1, "#636766");   //内圆渐变局域的颜色--白灰
    }
    else{//白棋
        place.addColorStop(0, "#D1D1D1");   //外圆渐变局域的颜色--白
		place.addColorStop(1, "#F9F9F9");   //内圆渐变局域的颜色--白灰
    }
   
    context.fillStyle = place;  //填充局域变色--对规定局域对象进行填充变色
    context.fill();             //使其画圆填充显示--填充
}

NewGameBegin();

//棋盘点击函数
chess.onclick = function(e){
	var x = e.offsetX;//获取点击的坐标
    var y = e.offsetY;

    //计算坐标索引
    var i = Math.floor(x/30);//向下取整
    var j = Math.floor(y/30);

    if(chessBoard[i][j] == 0){
        OneStep( i, j, who);
        if(who){
        	chessBoard[i][j] = 1;//黑棋
        }
        else{
        	chessBoard[i][j] = 2;//白棋
        }
        who = !who;              //互换下棋手
    }
}

//重新开始按钮响应函数
new_button.onclick = function(){
    var a = confirm("是否重新开始");
    if (a) {
        who = true;
        NewGameBegin();   
    }
}


