const callUrlApi= sessionStorage.getItem("callUrlApi");
console.log(callUrlApi)
const formulario= document.querySelector('#formulario');
const body=document.querySelector('body');



const functionsTriviaApp={};

functionsTriviaApp.getTrivia= (url)=>{

  return fetch(url)
  .then((data)=>data.json())
  .then(response=>response.results)
  .then(responseApi=> responseApi.map(organizarData))
  .then(resolve=>resolve)
  }

  functionsTriviaApp.createBoxTrivia=(data,index)=>{
    return `<fieldset class="d-flex flex-wrap flex-column rounded-4 shadow p-3 mb-5 bg-body">
  <legend class="fw-bold" id="textQuestion">${index+1}. ${data.question}</legend>
        ${data.answers.map((answer) => `<div class="d-flex justify-content-left align-items-center">
        <input type="radio" id="${answer}${index}" name="answerOfQuestion${index}" value="${answer}" class="form-check-input me-3" required="">
        <label for="${answer}${index}" id="textAnswer">${answer}</label></div>`).join('')}
            </fieldset>`
  }


const answers_correct=[];


class Trivia {
  question;
  answers;
  correct_answer;
}

function organizarData (data){
  const trivia= new Trivia();
  trivia.question=data.question
  trivia.answers= data.incorrect_answers
  trivia.correct_answer= data.correct_answer

  trivia.answers.unshift(trivia.correct_answer)
  trivia.answers.sort(() => Math.random() - 0.5);
  answers_correct.push(trivia.correct_answer)
  return trivia
}

function loadTriviaItems(url) {
  showSpinner();
  functionsTriviaApp.getTrivia(url).then((items = []) => {
      const newHtml = items.map((item, index) => functionsTriviaApp.createBoxTrivia(item, index)).join('')
      const convertNodeElementDom = document.createRange().createContextualFragment(newHtml);
      formulario.prepend(convertNodeElementDom);
      hideSpinner()
  })
}   

loadTriviaItems(callUrlApi)

functionsTriviaApp.loadScore=(event)=>{

  event.preventDefault();

  let valoresInput= document.querySelectorAll('.form-check-input');
// Crear una lista para almacenar los valores seleccionados
let valoresSeleccionados = [];

// Recorrer la lista de elementos radio
for (let i = 0; i < valoresInput.length; i++) {
    if (valoresInput[i].checked) {

      valoresSeleccionados.push(valoresInput[i].value)
    }

}

console.log(valoresSeleccionados)

const informationScore={
  score:0
};


for(let i=0;i < answers_correct.length;i++){

  if(answers_correct[i] === valoresSeleccionados[i]){

    informationScore.score+=100

    console.log("hola")
  }
}

console.log(informationScore.score)



if(informationScore.score<=300){
  informationScore.text = "Tu puntuación es Mala :( "
  informationScore.image = "../../Trivia_APP/images/Bronze Medal.png"
}

else if(informationScore.score>=300 && informationScore.score<=500){
    informationScore.text = "Tu puntuación es regular :/ "
    informationScore.image = "../../Trivia_APP/images/Silver Trophy.png"
}

else if(informationScore.score>=600 && informationScore.score<=800){
    informationScore.text = "Tu puntuación es Buena :) "
    informationScore.image = "../../Trivia_APP/images/Gold Trophy.png"
}

else if(informationScore.score>=900 && informationScore.puntuacion<=1000){
  informationScore.text = "Tu puntuación es Nivel DIOS :D"
  informationScore.image = "../../Trivia_APP/images/Diamond Trophy.png"
}

const idea1= createModal(informationScore);

  const convertN= document.createRange().createContextualFragment(idea1);
      body.prepend(convertN);
      let myModalPokemon = document.querySelector('#staticBackdrop');
      let modalBootstrap = new bootstrap.Modal(myModalPokemon);
      modalBootstrap.show();

      myModalPokemon.addEventListener('hidden.bs.modal', () => {
      myModalPokemon.remove();
      window.location.href="../../Trivia_APP/index.html";
    });
}


formulario.addEventListener('submit',functionsTriviaApp.loadScore)

function createModal(data){
  return `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body d-flex flex-column align-items-center">
        <p class="modal-title my-3 fs-2 fst-italic fw-bolder" id="staticBackdropLabel">TU PUNTUACIÓN</p>
        <img src="${data.image}" id="image-trofeo" alt="logo">
        <p class="my-3 fs-1 fw-bold">${data.score} Puntos</p>
        <p class="my-2 fs-3 fst-italic">${data.text}</p>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button type="button" id="btn-trivia" data-bs-dismiss="modal">Try Again</button>
      </div>
    </div>
  </div>
</div>`
}

function showSpinner() {
  document.querySelector('#spinner').style.display = 'block';
}

function hideSpinner() {
  document.querySelector('#spinner').style.display = 'none';
}