const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
            ]
    },
    {
        question:"Which city is the capital of India?",
        answers:[
            {text:"Dehli",correct:true},
            {text:"Mumbai",correct:false},
            {text:"Bhopal",correct:false},
            {text:"Patna",correct:false}
            ]
    },
    {
        question:"who is the first President of India?",
        answers:[
            {text:"Narendra Modi",correct:false},
            {text:"Indira Gandhi",correct:false},
            {text:"Pandit Javaharlal Nehru",correct:true},
            {text:"Amit Shah",correct:false}
            ]
    },
    {
        question:"Which city is known as dimondcity in India?",
        answers:[
            {text:"Rajsthan",correct:false},
            {text:"Jaipur",correct:false},
            {text:"Utttar Pradesh",correct:false},
            {text:"Surat",correct:true}
            ]
    }
];

const questionElement=document.querySelector("#question");
const answerBtns=document.querySelector(".answer-button");
const nextButton=document.querySelector("#nextBtn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
     currentQuestionIndex=0;
     score=0;
     nextButton.innerHTML="Next";
     showQuestion();

}

function showQuestion(){

    resetState();

    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
 
    currentQuestion.answers.forEach(answer=>{
        let button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
 
    nextButton.style.display="none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtns.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();

    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{

        startQuiz();
    }
});

startQuiz();
