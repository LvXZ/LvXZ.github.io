
//首先获取canvas,通过id="chess"获取
var chess = document.getElementById('chess');
//获取chess的上下文
var context = chess.getContext('2d');
//获取重新开始按钮
var new_button = document.getElementById('NGbutton');
//true表示黑棋白棋，false表示----全局变量
var me;
//二维数组记录棋盘着子情况
var chessBoard = [];
//赢法数组
var wins = [];
//多少种赢法
var count;
//赢法统计数组
var myWin = [];
var computerWin = [];
//标志游戏结束
var over;


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
    var image = new Image(); //利用图片重覆盖，进行游戏的重新开始   
    image.src = "Images/love.jpg"; //水印路径
    //加载图片过程
    image.onload = function() {
        context.drawImage(image , 0, 0, 450, 450);      
        //context添加图片，设置水印大小
        //注意图片将划线全覆盖
        DrawChessLine();//划线函数调用，避免图片覆盖
        LoadGame();   //计算胜利的摆放种类个数
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

//计算胜利的摆放种类个数函数
var LoadGame = function(){
	
	over =false;
	me = true;

	/*初始化赢法数据*/
	for (var i = 0; i < 15; i++) {
		wins[i] = [];
		for (var j = 0; j < 15; j++) {
			wins[i][j] = [];
		}
	}

	/*计算有多少种赢法*/
	count = 0;

	for (var i = 0; i < 15; i++) { //横线五子
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}

	for (var i = 0; i < 11; i++) { //竖线五子
		for (var j = 0; j < 15; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i+k][j][count] = true;
			}
			count++;
		}
	}

	for (var i = 0; i < 11; i++) { //斜线(\)五子
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}

	for (var i = 14; i >= 4; i--) { //斜线(/)五子
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i-k][j+k][count] = true;				
			}
			count++;
		}
	}
	/*初始化每一种赢法*/
	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}
}

//落棋函数
var OneStep = function( i, j, who_me){//ij着棋坐标，who谁着棋
    //划圆
    context.beginPath();//开始路径
    context.arc( 15+i*30, 15+j*30, 13, 0, 2*Math.PI);
    //扇形函数--圆形坐标100,100--半径20--扇形起始弧度0,终止弧度2PI
   
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
    context.closePath();//结束路径
};

//游戏结束函数
var gameOver = function(me){

	over = true;
	var a;
	if (me) {
		a = confirm("你赢了,是否重新开始--赢了电脑又如何,保持低调！");
	}else{
		a = confirm("电脑赢了,是否重新开始--菜的奈,竟然输给电脑！");
	}
	if (a) {  NewGameBegin();  }
}

//电脑根据得分优先级落子函数
var computerAI = function(){
	
	var myScore = [];
	var computerScore = [];
	/*保存最大的分数和相应坐标*/
	var max = 0;
	var u = 0,v = 0;

	/*棋盘每个点得分归零*/
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if(chessBoard[i][j] == 0){//此处可以落子

				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						switch(myWin[k]){//人得分
							case 1 : myScore[i][j] += 200;break;
							case 2 : myScore[i][j] += 500;break;
							case 3 : myScore[i][j] += 2000;break;
							case 4 : myScore[i][j] += 10000;break;
						}
						switch(computerWin[k]){//计算机得分
								case 1 : computerScore[i][j] += 220;break;
								case 2 : computerScore[i][j] += 520;break;
								case 3 : computerScore[i][j] += 2200;break;
								case 4 : computerScore[i][j] += 20000;break;
						}
					}
				}

				if (myScore[i][j] > max) {//根据得分进行优先级考虑//保存当前最高分的落子点
					max = myScore[i][j];
					u = i;
					v = j;
				}else if (myScore[i][j] == max) {
					if (computerScore[i][j] > computerScore[u][v]) {						
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if (computerScore[i][j] == max) {
					if (myScore[i][j] > myScore[u][v]) {						
						u = i;
						v = j;
					}
				}
			}
		}
	}

  
	OneStep(u,v,me);
	chessBoard[u][v] = 2;
	

	for (var k = 0; k < count; k++) {
		if (wins[u][v][k]) {
			computerWin[k]++;
			myWin[k] = 6;
			if (computerWin[k] == 5) { gameOver(me); }
		}
	}
	if (!over) {me = !me;}

}

window.onload = function(){
	NewGameBegin();
};

//棋盘点击函数
chess.onclick = function(e) {

	if (over || !me) return;//非我方或者如果已结束，停止

	var x = e.offsetX;//获取点击的坐标
    var y = e.offsetY;

    //计算坐标索引
    var i = Math.floor(x/30);//向下取整
    var j = Math.floor(y/30);

	if (chessBoard[i][j] != 0)  return;
    //console.log("--b--");
	OneStep(i,j,true);
	chessBoard[i][j] = 1;
		
	for (var k = 0; k < count; k++) {
		if (wins[i][j][k]) {
			myWin[k]++;
			computerWin[k] = 6;
			if (myWin[k] == 5) { gameOver(me); }
		}
	}

	if (!over) {
		me = !me; //互换下棋手
		computerAI();
	}

}

//重新开始按钮响应函数
new_button.onclick = function(){
    var a = confirm("是否重新开始--玩不过电脑了吧,竟然想重来,low!");
    if (a) {  NewGameBegin();  }
}
