var _ = require("underscore");

function Game(string){
  this.boardstring = string || boardstring();

  this.board = toRows(this.boardstring);

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
  if(direction==="right"){
    var rows = this.board;
    for( i=0; i<4; i++ ){ 
      var row = rows[i];
      var m = 3;
      var j = 2;
      while (j >= 0){
        if(row[m]!= 0){
          if( row[m] === row[j] ){ 
            row[m] = row[m] + row[j];
            row[j] = 0;
            break;
          } else if( row[j] != 0 ){
            break;
          }
          j--;
        }
        m--;
      }
      var m = 3;
      var j = 2;
        while (j>=0) {
        if(row[m] != 0){
          m--;
          j--;
        }else if( row[m] === 0 && row[j]!= 0 ){
          row[m] = row[j];
          row[j] = 0;
          m--;
          j--;
        }else if(row[m]===0 && row[j]===0){
          j--;
        }
      }
    }
    return rows;
  } else if(direction==="left"){
      var rows = this.board;
      for(i=0; i<4; i++){ 
        var row = rows[i];
        for(m = 0; m <= 3; m++){ 
          if(row[m]!= 0){
            for(j=m+1; j<=3; j++){ 
              if(row[m]===row[j]){ 
                row[m] = row[m] + row[j];
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
      return rows;
    }else if(direction==="up"){
      var rows = this.board;
      var columns = _.zip(rows[0], rows[1], rows[2], rows[3]);
      for(i=0; i<4; i++){ 
        var column = columns[i];
        for(m = 0; m <= 3; m++){ 
          if(column[m]!= 0){
            for(j=m+1; j<=3; j++){ 
              if(column[m]===column[j]){ 
                column[m] = column[m] + column[j];
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
      return (_.unzip(columns));
    }else if(direction==="down"){
      var rows = this.board;
      var columns = _.zip(rows[0], rows[1], rows[2], rows[3]);
      console.log(columns)
      for(i=0; i<4; i++){ 
        var column = columns[i];
        for(m = 3; m >= 0; m--){ 
          if(column[m]!= 0){
            for(j=m-1; j>=0; j--){ 
              if(column[m]===column[j]){ 
                column[m] = column[m] + column[j];
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
      return (_.unzip(columns));
    }

}


var test = new Game("2244000000002222");
console.log(test.board);
console.log(test.move("right"));
console.log(test.move("right"));



