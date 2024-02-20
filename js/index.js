let UrlBase="https://opentdb.com/api.php?amount=10";

const form= document.querySelector(".form-api");

const selectedOptions= document.querySelectorAll(".form-control");

form.addEventListener("submit", (a)=>{

    a.preventDefault();

    if(selectedOptions[0].value !== "any"){

      UrlBase += `&category=${selectedOptions[0].value}`;    

    }

    if(selectedOptions[1].value !== "any"){

    UrlBase += `&difficulty=${selectedOptions[1].value}`;

    }

    if(selectedOptions[2].value !== "any"){

    UrlBase += `&type=${selectedOptions[2].value}`; 
    
    }

    sessionStorage.setItem('callUrlApi', UrlBase);

    window.location.href="../../Trivia_APP/TuTriviaPersonalizada.html";
})
