//Variables
let board = [];
let maxBoardPos = 12;
const displayBoard = document.getElementById("board");
const reloadBtn = document.getElementById("repete");
let boardRow = Math.floor(Math.random() * maxBoardPos);
let boardColumn = Math.floor(Math.random() * maxBoardPos);

const moveLeft = -1, moveRight = +1, moveUp = -12, moveDown = +12;

reloadBtn.addEventListener("click", () => {
  joinAPI(boardRow, boardColumn);
});

function joinAPI(boardRow, boardColumn){
  const url = `https://europe-west1-ca-2023-dev.cloudfunctions.net/battleshipsApi/fire/${boardRow}/${boardColumn}`;
  const token = 'WpE0OqN3cWNxp6Dx9sXVc9lLOLr1.qqIFsavgVJYagP5MMmHdJWX62Z1ZZ3S5ZfSN8g97CeWvv69DKXUC6JHLSj5uVzWmy2gs2roQAv0T3yQ5Ji3m7arCiJJzNf6bpuo1wxRXEXSWXZcnfmRES7vXHPgMVc44CGmNLSK1TbcT0fLtOmZEDeGoKkrGeSJaoek53BUku2bgbw4ZYl0mrWxlw99BYt8NWUefySLq9Fe5Q6by5WzP3T5bPdKT1l6QAZ2ot7GduoN4iFJgOlAWvN12v14JC3YR';

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the API response data
      console.log(data);
      createBoard(data);

      function createBoard(data){
        board = [];
        displayBoard.innerHTML = "";
        for(let i = 0; i < 144; i++){
          //console.log(data["grid"][i] + " ");
          board.push(data["grid"][i]);
          console.log(board[i]);

          const node = document.createElement("span");
          node.setAttribute('id', 'pos');
          const textnode = document.createTextNode(board[i]);
          node.appendChild(textnode);
          displayBoard.appendChild(node);

        }
      }
      checkBoats();

      function checkBoats(){
        let fires = 0;
        board.forEach(element => {
          if(element == "X"){
            fires++;
          }
        });
        if(fires == 0){
          boardRow = Math.floor(Math.random() * maxBoardPos);
          boardColumn = Math.floor(Math.random() * maxBoardPos);
          console.log("Ziadny zasah!");

          setTimeout(() => {
            joinAPI(boardRow, boardColumn);
          }, "500");
          
        }
        else{
          let posOfBoat = board.indexOf("X");
          console.log("Pozicia lode: " + posOfBoat);
        }
      }

    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
}
