import React from 'react';
import axios from 'axios';
import AuthHeader from 'federation_demo_auth/AuthHeader';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { format } from "date-fns";

const API_URL = 'http://localhost:3000/';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, id: this.props.match.params.id};
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    console.log("id " + this.state.id)
    var url = API_URL + 'recipes';
    return axios
      .get(
        url,
        {
          params: {
            id: this.state.id
          }
        },
        {
          headers: {
            Authorization: `Bearer ${AuthHeader()}`
          }
        }
      )
      .then((response) => {
        this.setState({ recipe: response.data[0], isLoading: false });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { recipe, isLoading } = this.state;
    console.log("recipe")

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
  
    return (
      <Container className="recipe-description">
        <h1>{recipe.name}</h1>
        <Row>
          <Col>
        <p>Preparation time: {recipe.preparationTime}</p>
          </Col>
          <Col>
        <p>Uploaded at: {format(new Date(recipe.createdAt), "MMMM do, yyyy H:mma")}</p>
          </Col>
        </Row>
        <Divider></Divider>
        <Row className="description-div">
          <Col>
          <span>{recipe.description}</span>
          </Col>
          <Col>
          <Image className="recipe-image" src={'http://localhost:3000/images/' + recipe.imageName}>

          </Image>
          </Col>
        </Row>
      </Container>
    );
  }

}