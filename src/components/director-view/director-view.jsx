import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './director-view.scss';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <Container className="director-view">
        <Card className="border-0" style={{ color: "white", backgroundColor: "#222831" }}>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Death: </span>
              <span className="value">{director.Death}</span>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
      </Container>
    );
  }
}