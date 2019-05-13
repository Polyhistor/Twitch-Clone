import React from 'react'
import {connect} from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    // loading Google API on load
    componentDidMount() {
        // load the API call
        window.gapi.load('client:auth2', ()=>{
            // initializing the client
            window.gapi.client.init({
                // setting our google ID
                clientId: '373814302015-im2k9grglutk1rlh743q5ria6pikoa5s.apps.googleusercontent.com',
                // choose what scope we need - in this case we just need the email
                scope: 'email'
            }).then(() => {
                // once we got the promis and everything is loaded, we load them to internal variables
                this.auth = window.gapi.auth2.getAuthInstance()
                // checking out if the user has signed in or not
                this.onAuthChange(this.auth.isSignedIn.get())
                // adding an event listener on isSigend method
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }
    
    onAuthChange = isSignedIn => {
        // updating state via action creators
        if (isSignedIn === true) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon">
                        Sign out
                    </i>
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick}className="ui red google button">
                    <i className="google icon">
                        Sign in with google
                    </i>
                </button>
            )
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

// bringing state from the redux and connecting it to the state object
const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, // mapping state to props
        {signIn, signOut})  // mapping dispatch to props
        (GoogleAuth)