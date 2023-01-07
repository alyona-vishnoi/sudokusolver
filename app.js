const url = 'https://solve-sudoku.p.rapidapi.com/';
const puzzleBoard = document.getElementById("puzzle")
const solveButton = document.getElementById("solve-button")
const squares = 81
let submission = []
const solutionDisplay = document.getElementById("solution")

//creating puzzle squares using a for loop
for (let i=0; i< squares; i++){
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type','number');
    inputElement.setAttribute('min',1)
    inputElement.setAttribute('max',9)
    if (
        ((i%9 ==0 || i%9 ==1 ||i%9 ==2) && i<21) ||
        ((i%9 ==6 || i%9 ==7 ||i%9 ==8) && i<27) ||
        ((i%9 ==3 || i%9 ==4 ||i%9 ==5) && (i>27 && i<53)) ||
        ((i%9 ==0 || i%9 ==1 ||i%9 ==2) && i>53) ||
        ((i%9 ==6 || i%9 ==7 ||i%9 ==8) && i>53)
    ){
        inputElement.classList.add('odd-section')
    }
    puzzleBoard.appendChild(inputElement)
}

const joinValues = ()=>{
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log(submission)
}

const populateValues= (isSolvable, solution)=>{
   const inputs = document.querySelectorAll('input')
   if (isSolvable && solution){
    inputs.forEach((input, i) => {
        input.value = solution[i]
    })
    solutionDisplay.innerHTML = 'This is the solution grid :)'
   } else {
    solutionDisplay.innerHTML = 'This is not solvable :('
   }
}
const solve = ()=>{
    joinValues();
    const data= {numbers: submission.join('')};
    console.log('data',data);
    //when you click solve instead of going directly to the api, 
    //it's going to visit localhost 8000 and  its going to trigger app.post in server.js
    //and the request to the api will be done in the backend
    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify(data)
    })  .then(response => response.json())
        .then(data => {
            console.log(data)
            populateValues(data.solvable, data.solution)
            submission = []
        })
        .catch((error)=> {
            console.error('Error:', error)
        })
        //we have hidden our api key on the server
}
solveButton.addEventListener('click', solve);


//little bit about package.json, server.js and .env 
//express is for the rooting that we will be doin
//dotenv allows us to use the information from the env package(rapidapikey)
//cors is something we will use in order to audit a cors error message
//axios is the package we installed in the front end to make our post requests, get requests and so on