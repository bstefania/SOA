import React from 'react';
import axios from 'axios';
import AuthHeader from 'federation_demo_auth/AuthHeader';
import { Card, Row, Col, Button } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import socketClient from 'socket.io-client';
import io from 'socket.io-client'

const API_URL = 'http://localhost:3000/';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: null, userId: props.userId, pageLoaded: false};
    this.socket = io("http://localhost:3000")
  }

  getRecipes() {
    var url = API_URL + 'recipes';
    var params = {};
    if (this.state.userId) {
      params = {
        userId: this.state.userId
      };
    }
    return axios
      .get(
        url,
        {
          params: params
        },
        {
          headers: {
            Authorization: `Bearer ${AuthHeader()}`
          }
        }
      )
      .then((response) => {
        this.setState({ recipes: response.data, pageLoaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getRecipes();

    this.socket.on("new_recipe", (data) => {
      console.log(` data ${data}`);
      this.getRecipes();
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  _renderRecipes(recipe, index) {
    return (
      <Col key={recipe.id} className="recipe-col">
        <Card bg="light" border="dark">
          <Card.Img
            variant="top"
            src={'http://localhost:3000/images/' + recipe.imageName}
          />
          <Card.Body>
            <Row>
              <Col>
                <Card.Title className="recipe-name">{recipe.name}</Card.Title>
              </Col>
              <Col sm={3}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </Col>
            </Row>
            <Card.Text className="recipe-short-description">
              {recipe.description}
            </Card.Text>
            <Button variant="outline-dark" className="recipe-button" href={"/recipes/" + recipe.id}>Go to recipe</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  render() {
    const { recipes, userId } = this.state;
    console.log("recipes")
    console.log(recipes)
    return (
      <div className="recipes-container">
        {!userId && (
          <div className="p-2 text-center bg-light recipes-header">
            <h1>Recipes</h1>
          </div>
        )}
        <Row xs={1} md={4} className="g-4 recipes">
          {recipes ? recipes.map(this._renderRecipes) : 'no data to display'}
        </Row>
      </div>
    );
  }
}
