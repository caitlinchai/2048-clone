$(document).ready(function() {

  var game = new Game();

  function updateBoard(){
    for(var i=0; i < 4; i++){
      for(var j=0; j <4; j++){
        var id = "#" + i + j;
        var cl= "num-"+ game.board[i][j];
        $(id).removeClass();
        $(id).addClass(cl)
        $(id).html(game.board[i][j] || "");
      }
    }
  }

  function check(){ 
    if(game.full()){
      game = new Game();
      updateBoard();
    }
  };

  updateBoard();

  Mousetrap.bind('up', function(e){
    e.preventDefault();
    game.move("up");
    updateBoard();
    check();
  })
  
  Mousetrap.bind('down', function(e){
    e.preventDefault();
    game.move("down");
    updateBoard();
    check();
  })
  
  Mousetrap.bind('right', function(e){
    e.preventDefault();
    game.move("right");
    updateBoard();  
    check();
  })

  Mousetrap.bind('left', function(e){
    e.preventDefault();
    game.move("left");
    updateBoard();
    check();
  })

  $("#new-game").on('click', function(){
    game = new Game();
    updateBoard();
  });

});


