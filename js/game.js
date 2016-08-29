function Game(string){
  this.boardstring = string || boardstring();
  this.board = toRows(this.boardstring);
  this.score = 0;
  function boardstring(){
    return _.shuffle("0000000000000022");
  }

  function toRows(boardstring){
    var boardRows = [];
    for(i=0, j=4; j < 17; i+=4){
      var row = boardstring.slice(i, j);
      row = _.toArray(row).map(Number);
      boardRows.push(row);
      j+=4;
    };
    return boardRows;
  }
}

Game.prototype.move=function(direction){
  var rows = this.board;

  if(direction==="right"){
    for(i=0; i<4; i++){ 
      var row = rows[i];
      for(m = 3; m >= 0; m--){ 
        if(row[m]!= 0){
          for(j=m-1; j>=0; j--){ 
            if(row[m]===row[j]){ 
              row[m] = row[m] + row[j];
              this.score += row[m];
              row[j] = 0;
              break;
            }else if(row[j] != 0){
              break;
            }
          }
        }
      }
      var m = 3;
      var j = 2;
        while (j>=0) {
        if(row[m] != 0){
          m--;
          j--;
        }else if(row[m]===0 && row[j]!=0){
          row[m] = row[j];
          row[j] = 0;
          m--;
          j--;
        }else if(row[m]===0 && row[j]===0){
          j--;
        }
      }
    }
    var idx = _.shuffle([0,1,2,3]);
    var rand = _.random(1,2)*2;
    for(var r=0; r<4; r++){
      if(rows[(idx[r])][0] === 0){
        rows[(idx[r])][0] = rand;
        break;
      }
    }
  }else if(direction==="left"){
      for(i=0; i<4; i++){ 
        var row = rows[i];
        for(m = 0; m <= 3; m++){ 
          if(row[m]!= 0){
            for(j=m+1; j<=3; j++){ 
              if(row[m]===row[j]){ 
                row[m] = row[m] + row[j];
                this.score += row[m];
                row[j] = 0;
                break;
              }else if(row[j] != 0){
                break;
              }
            }
          }
        }
        var m = 0;
        var j = 1;
          while (j<=3) {
          if(row[m] != 0){
            m++;
            j++;
          }else if(row[m]===0 && row[j]!=0){
            row[m] = row[j];
            row[j] = 0;
            m++;
            j++;
          }else if(row[m]===0 && row[j]===0){
            j++;
          }
        }
      }
      var idx = _.shuffle([0,1,2,3]);
      var rand = _.random(1,2)*2;
      for(var r=0; r<4; r++){
        if(rows[(idx[r])][3] === 0){
          rows[(idx[r])][3] = rand;
          break;
        }
      }

    }else if(direction==="up"){
      var columns = _.zip(rows[0], rows[1], rows[2], rows[3]);
      for(i=0; i<4; i++){ 
        var column = columns[i];
        for(m = 0; m <= 3; m++){ 
          if(column[m]!= 0){
            for(j=m+1; j<=3; j++){ 
              if(column[m]===column[j]){ 
                column[m] = column[m] + column[j];
                this.score += column[m];
                column[j] = 0;
                break;
              }else if(column[j] != 0){
                break;
              }
            }
          }
        }
        var m = 0;
        var j = 1;
          while (j<=3) {
          if(column[m] != 0){
            m++;
            j++;
          }else if(column[m]===0 && column[j]!=0){
            column[m] = column[j];
            column[j] = 0;
            m++;
            j++;
          }else if(column[m]===0 && column[j]===0){
            j++;
          }
        }
      }
      rows = _.unzip(columns);
      var idx = _.shuffle([0,1,2,3]);
      var rand = _.random(1,2)*2;
      for(var r=0; r<4; r++){
        if(rows[3][(idx[r])] === 0){
          rows[3][(idx[r])] = rand;
          break;
        }
      }
    
    }else if(direction==="down"){
      var columns = _.zip(rows[0], rows[1], rows[2], rows[3]);
      for(i=0; i<4; i++){ 
        var column = columns[i];
        for(m = 3; m >= 0; m--){ 
          if(column[m]!= 0){
            for(j=m-1; j>=0; j--){ 
              if(column[m]===column[j]){ 
                column[m] = column[m] + column[j];
                this.score += column[m];
                column[j] = 0;
                break;
              }else if(column[j] != 0){
                break;
              }
            }
          }
        }
        var m = 3;
        var j = 2;
          while (j>=0) {
          if(column[m] != 0){
            m--;
            j--;
          }else if(column[m]===0 && column[j]!=0){
            column[m] = column[j];
            column[j] = 0;
            m--;
            j--;
          }else if(column[m]===0 && column[j]===0){
            j--;
          }
        }
      }
      rows = _.unzip(columns);
      var idx = _.shuffle([0,1,2,3]);
      var rand = _.random(1,2)*2;
      for(var r=0; r<4; r++){
        if(rows[0][(idx[r])] === 0){
          rows[0][(idx[r])] = rand;
          break;
        }
      }
    }
    return this.board = rows;
}


Game.prototype.full = function(){
  for( var r=0; r<4; r++ ){
    for( var b=0; b<4; b++){
      if(this.board[r][b] === 0){
        return;
      }
    }
  }

  for (var row=0; row<4; row++){
    for( var m=0; m<3; m++){
      if(this.board[row][m] === this.board[row][m+1]){
        return;
      } else if(this.board[m][row] === this.board[m+1][row]){
        return;
      }
    }
  }
  return confirm("Game Over! Play again?");
}
