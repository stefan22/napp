import questions from './questions.json'

export default {
  getQuestions: () => new Promise(resolve =>
    setTimeout(() => resolve(questions),0)
  )
}
