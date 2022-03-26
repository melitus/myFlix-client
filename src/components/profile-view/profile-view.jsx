import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './profile-view.scss';

import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  getUser = (token) => {
    const Username = localStorage.getItem('user');
    axios
      .get(`https://popcorns-and-coke.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://popcorns-and-coke.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });

        localStorage.setItem('user', this.state.Username);
        alert("Profile updated");
        window.open('/profile', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://popcorns-and-coke.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://popcorns-and-coke.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value
    });
  }

  setPassword(value) {
    this.setState({
      Password: value
    });
  }

  setEmail(value) {
    this.setState({
      Email: value
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <Container className="profile-view" align="center">
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form className="update-form" onSubmit={(e) =>
                  this.editUser(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )}>

                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={Password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="full-date"
                      name="Birthday"
                      value={Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button variant="success" type="submit" onClick={this.editUser}>Update User</Button>
                    <Button className="ml-3" variant="secondary" onClick={() => this.onDeleteUser()}>Delete User</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>

            <Row>
              <Col>
                <h4 id="fm_text_color">{Username} Favorite Movies</h4>
              </Col>
            </Row>

            <Card>
              <Card.Body>
                {FavoriteMovies.length === 0 && (
                  <div className="text-center" id="fm_text_color">No Favorite Movies</div>
                )}
                <Row className="favorite-container" md={2}>
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id ===
                        FavoriteMovies.find((fav) => fav === movie._id)
                      ) {
                        return (
                          <Col md={6}>
                            <Card className="favorite-movie card-content" key={movie._id}>
                              <Card.Img
                                className="fav-poster"
                                variant="top"
                                crossOrigin="anonymous"
                                src={movie.ImagePath}
                              />
                              <Card.Body style={{ backgroundColor: "black" }}>
                                <Card.Title className="movie_title">
                                  <Link to={`/movies/${movie._id}`}>
                                    <Button variant="link">{movie.Title}</Button>
                                  </Link>
                                </Card.Title>
                              </Card.Body>
                              <Card.Footer style={{ backgroundColor: "black" }}>
                                <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        <div className="backButton">
          <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      Name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  onBackClick: PropTypes.func.isRequired
};