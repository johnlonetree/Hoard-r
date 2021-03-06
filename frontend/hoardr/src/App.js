import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage/homepage";
import Login from "./components/Login/login.js";
import Profile from "./components/Profile/profile.js";
import System from "./components/System/system.js";
import Generation from "./components/Generation/Generation";
import Genre from "./components/Genre/Genre";
import Index from "./components/VideoGame/VideoGame.js";
import Subgenre from "./components/Subgenre/Subgenre";
import Registration from "./components/Registration/Registration";
import Update from "./components/Update/Update";
import UserVideoGame from "./components/UserVideoGame/UserVideoGame";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const urlUsers = `http://localhost:3000/users/`;
const urlReviews = `http://localhost:3000/reviews/`;
const urlVideoGames = `http://localhost:3000/video_games/`;
const urlUserVideoGames = `http://localhost:3000/user_video_games/`;
const urlSystems = `http://localhost:3000/systems/`;
const urlGenerations = `http://localhost:3000/generations/`;
const urlGenres = `http://localhost:3000/genres/`;
const urlSubgenres = `http://localhost:3000/subgenres/`;
const urlLogout = `http://localhost:3000/logout`;

class App extends Component {
  state = {
    users: [],
    reviews: [],
    videoGames: [],
    systems: [],
    generations: [],
    genres: [],
    subgenres: [],
    userVideoGames: [],
    currentUser: null,
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((user) => this.setState({ currentUser: user }));
    }
    Promise.all([
      fetch(urlUsers),
      fetch(urlReviews),
      fetch(urlVideoGames),
      fetch(urlSystems),
      fetch(urlGenerations),
      fetch(urlGenres),
      fetch(urlSubgenres),
      fetch(urlUserVideoGames)
    ])
      .then(([res1, res2, res3, res4, res5, res6, res7, res8]) =>
        Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
          res5.json(),
          res6.json(),
          res7.json(),
          res8.json()
        ])
      )
      .then(
        ([
          users,
          reviews,
          videoGames,
          systems,
          generations,
          genres,
          subgenres,
          userVideoGames
        ]) =>
          this.setState({
            users: users,
            reviews: reviews,
            videoGames: videoGames,
            systems: systems,
            generations: generations,
            genres: genres,
            subgenres: subgenres,
            userVideoGames: userVideoGames
          })
      );
  }

  handleLogout = () => {
    fetch(urlLogout, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          return this.setState({ errorMessage: response.message });
        }
        localStorage.clear();
        localStorage.removeItem("token");
        this.setCurrentUser(null);
        return <Redirect to="/login" />;
      });
  };

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
  };

  addUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  editUser = (editedUser) => {
    let userEdit = this.state.users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      } else {
        return user;
      }
    });
    this.setState({ users: userEdit });
  };

  addReview = (newReview) => {
    this.setState({ reviews: [...this.state.reviews, newReview] });
  };

  removeReview = (delReview) => {
    this.setState({
      reviews: this.state.reviews.filter(
        (review) => review.id !== delReview.id
      ),
    });
  };

  editReview = (editedReview) => {
    let newReviews = this.state.reviews.map((review) => {
      if (review.id === editedReview.id) {
        return editedReview;
      } else {
        return review;
      }
    });
    this.setState({ reviews: newReviews });
  };

  removeUser = (delUser) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== delUser.id),
    });
  };

  handleDeleteReview = () => {
    const { reviews } = this.state
    let review;

    reviews.map((oneReview) => review = oneReview)

    fetch(`http://localhost:3000/reviews/${review.id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(() => {
        this.removeReview(review)
        alert("Message successfully removed")
    })
  }

  addUserGame = (newUserGame) =>{
    this.setState({userVideoGames: [...this.state.userVideoGames, newUserGame] })
  }

  removeUserGame = (delUserGame) => {
    this.setState({
      userVideoGames: this.state.userVideoGames.filter((userVideoGame) => userVideoGame.id !== delUserGame.id)
    })
  }

  render() {

    if(this.state.videoGames.length === 0) return null

    const {
      addUser,
      addReview,
      removeReview,
      editReview,
      editUser,
      removeUser,
      handleLogout,
      handleDeleteReview,
      addUserGame,
      removeUserGame
    } = this;

    const { 
      reviews, 
      videoGames, 
      currentUser, 
      userVideoGames,
      genres,
      systems,
      generations,
      subgenres
    } = this.state;

    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Hoard-r</Navbar.Brand>
              <Nav className="me-auto">
                <NavDropdown title="Video Games" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/video_games">
                    Video Games
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/genre">Genres</NavDropdown.Item>
                  {/* <NavDropdown.Item href="/subgenre">
                    Subgenres
                  </NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="System" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/generation">
                    Generation
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/system">System</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex" id="search-bar">
                <FormControl
                  type="search"
                  placeholder="Search Video Games"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav>
                <NavDropdown
                  title="User Menu"
                  id="input-group-dropdown-2"
                  align="end"
                >
                  {currentUser && (
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  )}
                  {/* {currentUser && (
                    <NavDropdown.Item href="/user_video_game">My Games</NavDropdown.Item>
                  )} */}
                  {currentUser ? (
                    <NavDropdown.Item href="/update">
                      Update User
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/registration">
                      Register
                    </NavDropdown.Item>
                  )}
                  <span onClick={this.handleLogout}>
                    {currentUser ? (
                      <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    )}
                  </span>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>

          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/video_games">
                <Index
                  currentUser={currentUser}
                  reviews={reviews}
                  addReview={addReview}
                  editReview={editReview}
                  removeReview={removeReview}
                  videoGames={videoGames}
                  handleDeleteReview={handleDeleteReview}
                  addUserGame={addUserGame}
                />
            </Route>
            <Route exact path="/system">
                <System systems={systems}/>
            </Route>
            <Route exact path="/generation">
                <Generation generations={generations} />
            </Route>
            <Route exact path="/genre">
                <Genre genres={genres} />
            </Route>
            <Route exact path="/subgenre">
                <Subgenre subgenres={subgenres} />
            </Route>
            <Route exact path="/profile">
              <Profile
                user={currentUser}
                reviews={reviews}
                removeUser={removeUser}
                userVideoGames={userVideoGames}
                videoGames={videoGames}
                addReview={addReview}
                editReview={editReview}
                handleDeleteReview={handleDeleteReview}
                removeReview={removeReview}
                logout={handleLogout}
                removeUserGame={removeUserGame}
              />
            </Route>
            <Route exact path="/user_video_game">
                <UserVideoGame 
                  user={currentUser}
                />
            </Route>
            {currentUser ? (
              <Route exact path="/update">
                <Update editUser={editUser} user={currentUser} />
              </Route>
            ) : (
              <Route exact path="/registration">
                <Registration
                  addUser={addUser}
                  setCurrentUser={this.setCurrentUser}
                />
              </Route>
            )}
            <Route exact path="/login">
              <Login setCurrentUser={this.setCurrentUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
