import React, { Component } from 'react';
import api from '../modules/API/API'
import { Route, Switch, Redirect } from 'react-router-dom'
import Events from "./events/Events"
import ToDo from './toDo/ToDo'
import Chat from './chat/Chat'
import News from './news/News'
import Landing from './start/Landing'
import Welcome from './welcome/Welcome'
import Friends from './friends/Friend'

class App extends Component {

  state = {
    currentUser: 1,
    friendsArray: [],
    allUsers: [],
    relationships: []
  }

  componentDidMount() {
    this.findFriends(this.state.currentUser)
  }

  getUsers = () => {
    let newState = {}
    return api.getData("users")
      .then(users => newState.allUsers = users)
      .then(() => this.setState(newState))
  }

  getRelationships = () => {
    let newState = {}
    return api.getData("relationships")
      .then(relationships => newState.relationships = relationships)
      .then(() => this.setState(newState))
  }

  findRelationships = (currentUserId) => {
    return this.getUsers().then(() => this.getRelationships())
      .then(() => {
        return this.state.relationships.filter((relationship) => relationship.userId === currentUserId)
      })
  }

  findFriends = (currentUserId) => {
    return this.findRelationships(currentUserId)
      .then((rels) => {
        let friendsArray = []
        rels.forEach((rel) => {
          friendsArray.push(this.state.allUsers.find(user => user.id === rel.friendId))
        })
        this.setState({ friendsArray: friendsArray })
      })
  }

  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to="/welcome" />
          }
          return <Redirect to="/login" />
        }} />

        <Route exact path="/welcome" render={props => {
          if (this.isAuthenticated()) {
            return <Welcome {...props} />
          }
          return <Redirect to="/login" />
        }} />

        <Route exact path="/login" render={props => {
          if (this.isAuthenticated()) {
            return <Redirect to="/welcome" />
          }
          return <Landing />
        }} />

        <Route exact path="/chat" render={(props) => {
          if (this.isAuthenticated()) {
            return <Chat currentUser={this.state.currentUser} />
          }
          return <Redirect to="/login" />
        }} />
        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
            return <Events {...props} />
          }
          return <Redirect to="/login" />
        }} />
        <Route exact path="/todo" render={(props) => {
          if (this.isAuthenticated()) {
            return <ToDo currentUser={this.state.currentUser} />
          }
          return <Redirect to="/login" />
        }} />
        <Route exact path="/news" render={(props) => {
          if (this.isAuthenticated()) {
            return <News currentUser={this.state.currentUser} />
          }
          return <Redirect to="/login" />
        }} />
        <Route exact path="/friends" render={(props) => {
          return <Friends friendsArray={this.state.friendsArray} />
        }} />
      </Switch>
    )
  }
}

export default App;