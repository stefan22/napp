import React, {Component} from 'react'
import MockedAPI from '../MockedApi'
import List from './ReusableList'


import TextField from './TextField'
import SelectField from './SelectField'
import CheckField from './CheckField'


class QuestionsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchFormData = this.fetchFormData.bind(this)

  }

  componentDidMount() {
    this.fetchFormData()
  }

  fetchFormData = async () => {
    await MockedAPI.getQuestions()
      .then(res => this.setState({questions: res.questions}))
  }

  handleOnBlur(e) {
    const { name } = e.target
    if (name === 'title') {
      this.setState({ titleError: this.state.title.length < 10 })
    }
  }

  handleChange(e) {
    const {type,name,checked,value} = e.target
    if(type === 'text' || type === 'email') {
      this.setState({
        [name]: value,
      })
    } else if(type === 'select-one') {
      this.setState({
        [name]: value,
      })
    }
    else if(type === 'checkbox') {
      this.setState({
        [name]: checked,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render () {

    const {questions,value} = this.state


    return (
      <form onSubmit={this.handleSubmit}>

        {
          !!questions &&

          <>

            <List
              item={TextField}
              items={questions}
              onChange={this.handleChange}
              value={value}
            />

           <List
             item={SelectField}
             items={questions}
             onChange={this.handleChange}
             value={value}
           />

           <List
             item={CheckField}
             items={questions}
             onChange={this.handleChange}
             value={value}
           />

          </>

        }

        <button
          name={'Submit'}
        > buton
        </button>


      </form>
    )

  }


}

export default QuestionsForm
