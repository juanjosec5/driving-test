import questionsJson from "./questions.js";

const form = document.querySelector('#test')
const btn = document.querySelector('button')
const result = document.querySelector('.result')

const generateResult = () => {
  let points = 0;

  const checkedAnswers = Array.from(document.querySelectorAll(':checked'));

  for (const checkedAnswer of checkedAnswers) {
    const index = checkedAnswer.parentElement.parentElement.dataset.questionId;
    const correctAnswer = questionsJson[index].answer;
    const userAnswer = checkedAnswer.value

    if (userAnswer === correctAnswer) {
      points++;
    }
  }

  if (checkedAnswers.length === questionsJson.length) {
    const percentage = (points * questionsJson.length) / 100;
    result.innerHTML = `points: ${points} / ${questionsJson.length} >> ${percentage}%`
  } else {
    result.innerHTML = `FALTAN PREGUNTAS POR RESPONDER, REVISE BIEN`
  }  
}

btn.addEventListener('click', generateResult)

const generateHTMLQuestion = (question, index) => {
  const title = `<h3>${question.question}</h3>`
  let options = ''

  for (const option of Object.entries(question.options)) {
    options += `
    <label> 
      <input type="radio" name="${question.question}" value="${option[1]}">
    ${option[0]}. ${option[1]}
    </label>
    `
  }

  return `<div class="question" data-question-id="${index}">${title + options}`
}

for (const index in questionsJson) {
  const question = questionsJson[index];
  const html = generateHTMLQuestion(question, index);
  form.innerHTML += html;
}