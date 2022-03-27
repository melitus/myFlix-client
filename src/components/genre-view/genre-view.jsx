import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './genre-view.scss';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Container className="genre-view">
        <Card className="border-0" style={{ color: "white", backgroundColor: "#222831" }}>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>
              <span className="value">{genre.Description}</span>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
      </Container>
    );
  }
}