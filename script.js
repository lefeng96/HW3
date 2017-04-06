$(document).ready(function(){
	
//0=free space
//1=wall
//2=challenge
//3=prize
var row1 = [0,0,0,0,1,0,0,0];
var row2 = [1,0,0,0,0,1,0,0];
var row3 = [0,2,0,2,0,2,2,0];
var row4 = [0,1,0,3,1,2,2,2];
var row5 = [0,0,0,0,2,2,1,0];
var row6 = [0,1,2,1,0,0,1,0];
var row7 = [0,1,0,1,0,1,1,0];
var row8 = [2,1,0,1,3,0,0,0];
var gameBoard = [row1,row2,row3,row4,row5,row6,row7,row8];

document.getElementById("event").innerHTML="Oh no, you lost your walking pet rock! Better go find him.";
var monster = {attack:1500,hp:5000,prize:"rock",name:"Paper"};
var player = {attack:4000,hp:8500};
var currentPlayerHp=player.hp;
var prizeCounter=0;
var playerRow=0;
var playerCol=0;
var audio = new Audio('spacefuneral.mp3');
var audio1 = new Audio('alert.mp3');
var audio2 = new Audio('dead.mp3');
var audio3 = new Audio('spacefuneral2.mp3');
var audio4 = new Audio('gg.mp3');
function randomPlayer(){
	while(true){
		var x = Math.floor(Math.random() * (7+1))
		var y = Math.floor(Math.random() * (7+1))
		if (gameBoard[x][y]==0){
			gameBoard[x][y]="S";
			playerRow=x;
			playerCol=y;
			console.log(x+","+y);
			break;
		}
	}
}

function randomGoal(){
	while(true){
		var x = Math.floor(Math.random() * (7+1))
		var y = Math.floor(Math.random() * (7+1))
		if (gameBoard[x][y]==0){
			gameBoard[x][y]="G";
			break;
		}
	}
}


function movement(dir){
	switch(dir){
		case "1":
			if(playerCol-1<0){
				currentPlayerHp=-999999999999999999999999999999999999999999999;
				document.getElementById("event").innerHTML="You fell off the map and died";
				document.body.style.backgroundImage = "url('mat6.jpg')";
				audio.pause();
				audio3.pause();
				audio2.play();
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
			}
			else if(gameBoard[playerRow][playerCol-1]==1 || gameBoard[playerRow][playerCol-1]=="wall"){
				document.getElementById("event").innerHTML="You hit a wall";
				gameBoard[playerRow][playerCol-1]="wall";
			}
			else if(gameBoard[playerRow][playerCol-1]==2){
				//encounter();
				audio.pause();
				audio1.play();
				alert("A rectangular shadow looms upon you");
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				$('#yes').prop('disabled', false);
				$('#no').prop('disabled', false);
				document.getElementById("event").innerHTML="A piece of paper falls down from the sky";
				document.getElementById("prompt").innerHTML="Will you fight?";
				//runChallenge();
				playerCol--;
				gameBoard[playerRow][playerCol]="paper";
			}
			else if(gameBoard[playerRow][playerCol-1]==3){
				prizeCounter++;
				document.getElementById("event").innerHTML="You find a pebble on the ground and decide to pick it up for some reason. You now have " + prizeCounter;
				playerCol--;
				gameBoard[playerRow][playerCol]="pebble";
			}
			else if(gameBoard[playerRow][playerCol-1]=="G"){
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				if(prizeCounter>=2){
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran you save him, you see a <i>meteor that can only be stopped by throwing 2 pebbles at it</i> coming down on you.You panicked and looked around frantically for something to stop it, but then you realized the ridiculously specific and convoluted meteor that seemed like the writer gave up on the game because he was too tired to think of anything at 5 in the morning.So you threw your pebbles and then you and your pet rock lived happily ever after";	
					window.scrollTo(0,document.body.scrollHeight);
					audio3.pause();
					audio4.play();
					document.body.style.backgroundImage = "url('win.jpg')";
					gameBoard[playerRow][playerCol-1]="goal";
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
				else {
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran to save him you were greeted with a bad end because you didn't collect 2 pebbles. Bad End";
					gameBoard[playerRow][playerCol-1]="goal";
					document.body.style.backgroundImage = "url('mat6.jpg')";
					audio.pause();
					audio3.pause();
					audio2.play();
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
			}
			else if(gameBoard[playerRow][playerCol-1]=="pebble" || gameBoard[playerRow][playerCol-1]=="paper" || gameBoard[playerRow][playerCol-1]=="S"){
				playerCol--;
			}
			else {
				document.getElementById("event").innerHTML="Nothing here";
				gameBoard[playerRow][playerCol-1]="S";
				playerCol--;
				gameBoard[playerRow][playerCol]="D";
			}
			var currentPlayer={hp:currentPlayerHp, row:playerRow, col:playerCol, prize:["pebble"]};
			document.getElementById("location").innerHTML="Location: " + "("+currentPlayer.row+","+currentPlayer.col+")";
			makeTable(gameBoard)
			window.scrollTo(0,document.body.scrollHeight);
			break;
		case "2":
			if(playerRow+1>=8){
				currentPlayerHp=-999999999999999999999999999999999999999999999;
				document.getElementById("event").innerHTML="You fell off the map and died";
				document.body.style.backgroundImage = "url('mat6.jpg')";
				audio.pause();
				audio3.pause();
				audio2.play();
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
			}
			else if(gameBoard[playerRow+1][playerCol]==1 || gameBoard[playerRow+1][playerCol]=="wall"){
				document.getElementById("event").innerHTML="You hit a wall";
				gameBoard[playerRow+1][playerCol]="wall";
			}
			else if(gameBoard[playerRow+1][playerCol]==2){
				//encounter();
				audio.pause();
				audio1.play();
				alert("A rectangular shadow looms upon you")
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				$('#yes').prop('disabled', false);
				$('#no').prop('disabled', false);
				document.getElementById("event").innerHTML="A piece of paper falls down from the sky";
				document.getElementById("prompt").innerHTML="Will you fight?";
				//runChallenge();
				playerRow++;
				gameBoard[playerRow][playerCol]="paper";

			}
			else if(gameBoard[playerRow+1][playerCol]==3){
				prizeCounter++;
				document.getElementById("event").innerHTML="You find a pebble on the ground and decide to pick it up for some reason. You now have " + prizeCounter;
				playerRow++;
				gameBoard[playerRow][playerCol]="pebble";
			}
			else if(gameBoard[playerRow+1][playerCol]=="G"){
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				if(prizeCounter>=2){
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran you save him, you see a <i>meteor that can only be stopped by throwing 2 pebbles at it</i> coming down on you.You panicked and looked around frantically for something to stop it, but then you realized the ridiculously specific and convoluted meteor that seemed like the writer gave up on the game because he was too tired to think of anything at 5 in the morning.So you threw your pebbles and then you and your pet rock lived happily ever after";	
					audio3.pause();
					audio4.play();
					document.body.style.backgroundImage = "url('win.jpg')";
					window.scrollTo(0,document.body.scrollHeight);
					gameBoard[playerRow+1][playerCol]="goal";
					//currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
				else {
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran to save him you were greeted with a bad end because you didn't collect 2 pebbles. Bad End";
					gameBoard[playerRow+1][playerCol]="goal";
					document.body.style.backgroundImage = "url('mat6.jpg')";
					audio.pause();
					audio3.pause();
					audio2.play();
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
			}
			else if(gameBoard[playerRow+1][playerCol]=="pebble" || gameBoard[playerRow+1][playerCol]=="paper" || gameBoard[playerRow+1][playerCol]=="S"){
				playerRow++;
			}
			else{
				document.getElementById("event").innerHTML="Nothing here";
				playerRow++;
				gameBoard[playerRow][playerCol]="D";
			}
			var currentPlayer={hp:currentPlayerHp, row:playerRow, col:playerCol, prize:["pebble"]};
			document.getElementById("location").innerHTML="Location: " + "("+currentPlayer.row+","+currentPlayer.col+")";
			makeTable(gameBoard)
			window.scrollTo(0,document.body.scrollHeight);
			break;
		case "3":
			if(playerCol+1>=8){
				currentPlayerHp=-999999999999999999999999999999999999999999999;
				document.getElementById("event").innerHTML="You fell off the map and died";
				document.body.style.backgroundImage = "url('mat6.jpg')";
				audio.pause();
				audio3.pause();
				audio2.play();
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
			}
			else if(gameBoard[playerRow][playerCol+1]==1 || gameBoard[playerRow][playerCol+1]=="wall"){
				document.getElementById("event").innerHTML="You hit a wall";
				gameBoard[playerRow][playerCol+1]="wall";
			}
			else if(gameBoard[playerRow][playerCol+1]==2){
				//encounter();
				audio.pause();
				audio1.play();
				alert("A rectangular shadow looms upon you");
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				$('#yes').prop('disabled', false);
				$('#no').prop('disabled', false);
				document.getElementById("event").innerHTML="A piece of paper falls down from the sky";
				document.getElementById("prompt").innerHTML="Will you fight?";
				//runChallenge();
				playerCol++;
				gameBoard[playerRow][playerCol]="paper";
			}
			else if(gameBoard[playerRow][playerCol+1]==3){
				prizeCounter++;
				document.getElementById("event").innerHTML="You find a pebble on the ground and decide to pick it up for some reason. You now have " + prizeCounter;
				playerCol++;
				gameBoard[playerRow][playerCol]="pebble";
			}
			else if(gameBoard[playerRow][playerCol+1]=="G"){
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				if(prizeCounter>=2){
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran you save him, you see a <i>meteor that can only be stopped by throwing 2 pebbles at it</i> coming down on you.You panicked and looked around frantically for something to stop it, but then you realized the ridiculously specific and convoluted meteor that seemed like the writer gave up on the game because he was too tired to think of anything at 5 in the morning.So you threw your pebbles and then you and your pet rock lived happily ever after";	
					window.scrollTo(0,document.body.scrollHeight);
					audio3.pause();
					audio4.play();
					document.body.style.backgroundImage = "url('win.jpg')";
					gameBoard[playerRow][playerCol+1]="goal";
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
				else {
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran to save him you were greeted with a bad end because you didn't collect 2 pebbles. Bad End";
					gameBoard[playerRow][playerCol+1]="goal";
					document.body.style.backgroundImage = "url('mat6.jpg')";
					audio.pause();
					audio3.pause();
					audio2.play();
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
			}
			else if(gameBoard[playerRow][playerCol+1]=="pebble" || gameBoard[playerRow][playerCol+1]=="paper" || gameBoard[playerRow][playerCol+1]=="S"){
				playerCol++;
			}
			else {
				document.getElementById("event").innerHTML="Nothing here";
				playerCol++;
				gameBoard[playerRow][playerCol]="D";
			}
			var currentPlayer={hp:currentPlayerHp, row:playerRow, col:playerCol, prize:["pebble"]};
			document.getElementById("location").innerHTML="Location: " + "("+currentPlayer.row+","+currentPlayer.col+")";
			makeTable(gameBoard)
			window.scrollTo(0,document.body.scrollHeight);
			break;
		case "4":
			if(playerRow-1<0){
				currentPlayerHp=-999999999999999999999999999999999999999999999;
				document.getElementById("event").innerHTML="You fell off the map and died";
				document.body.style.backgroundImage = "url('mat6.jpg')";
				audio.pause();
				audio3.pause();
				audio2.play();
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
			}
			else if(gameBoard[playerRow-1][playerCol]==1|| gameBoard[playerRow-1][playerCol]=="wall"){
				document.getElementById("event").innerHTML="You hit a wall";
				gameBoard[playerRow-1][playerCol]="wall";
			}
			else if(gameBoard[playerRow-1][playerCol]==2){
				//encounter();
				audio.pause();
				audio1.play();
				alert("A rectangular shadow looms upon you");
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				$('#yes').prop('disabled', false);
				$('#no').prop('disabled', false);
				document.getElementById("event").innerHTML="A piece of paper falls down from the sky";
				document.getElementById("prompt").innerHTML="Will you fight?";
				//runChallenge();
				playerRow--;
				gameBoard[playerRow][playerCol]="paper";
			}
			else if(gameBoard[playerRow-1][playerCol]==3){
				prizeCounter++;
				document.getElementById("event").innerHTML="You find a pebble on the ground and decide to pick it up for some reason. You now have " + prizeCounter;
				playerRow--;
				gameBoard[playerRow][playerCol]="pebble";
			}
			else if(gameBoard[playerRow-1][playerCol]=="G"){
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				if(prizeCounter>=2){
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran you save him, you see a <i>meteor that can only be stopped by throwing 2 pebbles at it</i> coming down on you.You panicked and looked around frantically for something to stop it, but then you realized the ridiculously specific and convoluted meteor that seemed like the writer gave up on the game because he was too tired to think of anything at 5 in the morning.So you threw your pebbles and then you and your pet rock lived happily ever after";	
					audio3.pause();
					audio4.play();
					document.body.style.backgroundImage = "url('win.jpg')";
					window.scrollTo(0,document.body.scrollHeight);
					gameBoard[playerRow-1][playerCol]="goal";
				}
				else {
					document.getElementById("event").innerHTML="The ending is in sight, you see your pet rock crying for help. As you ran to save him you were greeted with a bad end because you didn't collect 2 pebbles. Bad End";
					window.scrollTo(0,document.body.scrollHeight);
					gameBoard[playerRow-1][playerCol]="goal";
					document.body.style.backgroundImage = "url('mat6.jpg')";
					audio.pause();
					audio3.pause();
					audio2.play();
					currentPlayerHp=-999999999999999999999999999999999999999999999;
				}
			}
			else if(gameBoard[playerRow-1][playerCol]=="pebble" || gameBoard[playerRow-1][playerCol]=="paper" || gameBoard[playerRow-1][playerCol]=="S"){
				playerRow--;
			}
			else{ 
				document.getElementById("event").innerHTML="Nothing here";
				playerRow--;
				gameBoard[playerRow][playerCol]="D";
			}
			var currentPlayer={hp:currentPlayerHp, row:playerRow, col:playerCol, prize:["pebble"]};
			document.getElementById("location").innerHTML="Location: " + "("+currentPlayer.row+","+currentPlayer.col+")";
			makeTable(gameBoard)
			window.scrollTo(0,document.body.scrollHeight);
			break;
		case "5": exit();
		default: break;
	}
}

function updateSpace(element){
	 for (var i = 0; i < gameBoard.length; i++) {
		 for (var j = 0; j < gameBoard.length; j++) {
			if (gameBoard[i][j]==element){
				console.log(i + "," +j);
				playerRow=i;
				playerCol=j;
			}
		 }
	 }
 }

 function findGoal(element){
	 for (var i = 0; i < gameBoard.length; i++) {
		 for (var j = 0; j < gameBoard.length; j++) {
			if (gameBoard[i][j]==element){
				console.log(i + "," +j);
				break;
			}
		 }
	 }
 }


function runChallenge(){
	audio.play();
	var ok=1;
	while(ok==1){
		//document.getElementById("event").innerHTML="You got a papercut while messing around a piece of paper, but you pushed through the insignificant yet still irritating amount of pain";
		currentPlayerHp-=monster.attack;
		monster.hp-=player.attack;
		document.getElementById("hp").innerHTML="Your HP: " + currentPlayerHp;
		
		if(currentPlayerHp<=0){
			//var again = prompt("You were killed by a piece of paper. How pathetic. How about another try?");
			audio.pause();
			audio3.pause();
			audio2.play();
			$('#yes').prop('disabled', true);
			$('#no').prop('disabled', true);
			document.body.style.backgroundImage = "url('mat6.jpg')";
			document.getElementById("prompt").innerHTML="You were killed by a piece of paper. How pathetic. How about another try?";
			if(again == "yes"){
				document.getElementById("event").innerHTML="You conveniently revived with full HP";
				currentPlayerHp=player.hp;
			}
			else {
				$('#lbut').prop('disabled', true);
				$('#rbut').prop('disabled', true);
				$('#dbut').prop('disabled', true);
				$('#ubut').prop('disabled', true);
				$('#yes').prop('disabled', true);
				$('#no').prop('disabled', true);
				ok = 0;
			}
		}
		else if(monster.hp<=0){
			monster.hp=5000;
			document.getElementById("event").innerHTML="You win! At first you were proud but then you realized all you did was rip a piece of paper";
			ok = 0;
			var rng = Math.floor(Math.random() * 10) + 1
			if(rng==1){
				prizeCounter++;
				document.getElementById("event1").innerHTML="What's this? For some reason the paper dropped a pebble and you decided to keep it. You now have " + prizeCounter;
			}
			$('#lbut').prop('disabled', false);
			$('#rbut').prop('disabled', false);
			$('#dbut').prop('disabled', false);
			$('#ubut').prop('disabled', false);
			$('#yes').prop('disabled', true);
			$('#no').prop('disabled', true);
		}

		else {
		}
	}
}



function encounter(fight){
	//var fight="";
	//var fight=prompt("Will you fight")
	//fight = document.getElementById("confirm").value

	if(fight=="yes"){
		document.getElementById("event").innerHTML="You chose to fight a harmless piece of paper";
		runChallenge();
	}
	else {
		document.getElementById("event").innerHTML="You ran away from a harmless piece of paper";
		$('#lbut').prop('disabled', false);
		$('#rbut').prop('disabled', false);
		$('#dbut').prop('disabled', false);
		$('#ubut').prop('disabled', false);
		$('#yes').prop('disabled', true);
		$('#no').prop('disabled', true);
	}
}


function makeTable(myArray) {
    var result="";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
			if(myArray[i][j]=="D"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else if(myArray[i][j]== "S"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else if(myArray[i][j]== "wall"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else if(myArray[i][j]== "paper"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else if(myArray[i][j]== "pebble"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else if(myArray[i][j]== "goal"){
				result += "<td>"+myArray[i][j]+"</td>";
			}
			else result += "<td>_</td>";
        }
        result += "</tr>";
    }
    //result += "</table>";
    //document.getElementById("event").innerHTML(result);
	document.getElementById("map").innerHTML = result;
	window.scrollTo(0,document.body.scrollHeight);
}
$('#yes').prop('disabled', true);
$('#no').prop('disabled', true);
randomPlayer();
randomGoal();
findGoal("G");
var currentPlayer={hp:currentPlayerHp, row:playerRow, col:playerCol, prize:["pebble"]};
document.getElementById("location").innerHTML="Location: " + "("+currentPlayer.row+","+currentPlayer.col+")";
makeTable(gameBoard);
$("#lbut").click(function(){
	audio3.play();
	movement("1");
	audio.pause();
});
$("#dbut").click(function(){
	audio3.play();
	movement("2");
	audio.pause();
});
$("#rbut").click(function(){
	audio3.play();
	movement("3");
	audio.pause();
});
$("#ubut").click(function(){
	audio3.play();
	movement("4");
	audio.pause();
});
$("#yes").click(function(){
	encounter("yes");
	audio3.pause();
});
$("#no").click(function(){
	encounter("no");
	audio3.pause();
});
$("#restart").click(function(){
	location.reload();
	$('#lbut').prop('disabled', false);
	$('#rbut').prop('disabled', false);
	$('#dbut').prop('disabled', false);
	$('#ubut').prop('disabled', false);
});

window.scrollTo(0,document.body.scrollHeight);
});