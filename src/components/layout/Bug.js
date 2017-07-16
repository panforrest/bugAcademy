import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Bug extends Component {
    constructor(){
        super()
        this.state = {
            solution: {
                text: '',

            }
        }
    }

    componentDidMount(){
        var _this = this 
        APIManager.get('/api/bug?slug='+this.props.slug, null, (err, response) =>{
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log(JSON.stringify(response.results))
            var bugs = response.results
            this.props.bugsReceived(bugs)
            _this.fetchSolutions()
        })

        // _this.fetchSolutions()
    }

    fetchSolutions(){
        console.log('fetchSolutions: ')
        console.log('this.props.bug.id: '+JSON.stringify(this.props.bug.id))

        if (this.props.bug.id == null) {
            return
        }

        APIManager.get('/api/solution?bug='+this.props.bug.id, null, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log(JSON.stringify(response.results))
            var solutions = response.results
            this.props.solutionsReceived(solutions)

        })
    }

    updateSolution(event){
        event.preventDefault()
        console.log('updateSolution: '+event.target.id+' == '+event.target.value)
        var updatedSolution = Object.assign({}, this.state.solution)
        updatedSolution[event.target.id] = event.target.value
        this.setState({
            solution: updatedSolution
        })
    }

    submitSolution(event){
        event.preventDefault()
        if (this.props.currentUser == null) {
            alert('Please log in to add new solution!')
            return
        }


        var solution = Object.assign({}, this.state.solution)
        solution['bug'] = this.props.bug.id
        solution['profile'] = this.props.currentUser.id
        console.log(JSON.stringify(solution))
        APIManager.post('/api/solution', solution, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log(JSON.stringify(response.result))
            var solution = response.result
            this.props.solutionCreated(solution)
        })
    }

    render(){

        var solutionList = this.props.solutions.map((solution, i) => {
            return(
                //<li key={i}>{solution.text}</li>
                <a key={i} className="list-group-item">
                    <h4 className="list-group-item-heading">{solution.text}</h4> 
                    <p className="list-group-item-text">{solution.text}</p>
                </a>
            )
        })

        return(
            <div>

                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                <h3>Add Your Solution</h3>
                                <textarea onChange={this.updateSolution.bind(this)} className="form-control" type='text' id='text' placeholder='Provide Your Solution or Contribute Your Response to or Experience with this bug ' />
                                <br />
                                <button onClick={this.submitSolution.bind(this)}>Submit</button><br />
                                <br />
                                <hr style={{borderTop: '1px solid red #444'}} />                            
                                {solutionList}

                            </div>
                        </div>
                    </div>
                </section>                            


            </div>
        ) 
    }

}

const stateToProps = (state) => {
    var bugsArray = state.bug.list 

    return {
        bug: (bugsArray.length == 0) ? {text: ''} : bugsArray[0],
        currentUser: state.account.currentUser,
        solutions: state.solution.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        bugsReceived: (bugs) => dispatch(actions.bugsReceived(bugs)),
        solutionsReceived: (solutions) => dispatch(actions.solutionsReceived(solutions)),
        solutionCreated: (solution) => dispatch(actions.solutionCreated(solution))
    }
}

export default connect(stateToProps, dispatchToProps)(Bug)