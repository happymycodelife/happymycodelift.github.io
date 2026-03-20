
let recipes=[]
let quiz=[]
let current=0
let score=0
let wrong=[]

fetch("recipes.json")
.then(r=>r.json())
.then(data=>{
recipes=data
startQuiz()
})

function randomRecipe(){
return recipes[Math.floor(Math.random()*recipes.length)]
}

function generateQuestion(){

let r=randomRecipe()
if(!r.variants.length) return generateQuestion()

let v=r.variants[Math.floor(Math.random()*r.variants.length)]
let ing=[...v.ingredients]

let blank=Math.floor(Math.random()*ing.length)
let answer=ing[blank]

ing[blank]="(      )"

return {
menu:r.name,
note:r.note,
temp:v.temp,
question:ing.join(" + "),
answer:answer
}
}

function startQuiz(){

for(let i=0;i<20;i++){
quiz.push(generateQuestion())
}

showQuestion()
}

function showQuestion(){

if(current>=quiz.length){
showResult()
return
}

let q=quiz[current]

document.getElementById("question").innerHTML=
`문제 ${current+1}.<br><br>
${q.menu} <span class="purple">${q.note||""}</span><br>
${q.temp} ${q.question}`

document.getElementById("answer").value=""
}

function submitAnswer(){

let user=document.getElementById("answer").value.trim()
let q=quiz[current]

if(user && q.answer.includes(user)){
score++
}else{
wrong.push(q)
}

current++
showQuestion()
}

function showResult(){

let html=`<h2>결과</h2>
<p>${score} / 20 정답</p>`

if(wrong.length){
html+="<h3>틀린 문제</h3>"
wrong.forEach(w=>{
html+=`<p>${w.menu} ${w.temp}<br>정답: ${w.answer}</p>`
})
}

document.getElementById("quizBox").style.display="none"
document.getElementById("result").style.display="block"
document.getElementById("result").innerHTML=html
}
