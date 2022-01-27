import React, { Component, form } from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Recipes from './Recipes'
import AuthHeader from 'federation_demo_auth/AuthHeader';
const API_URL = 'http://localhost:3000/';

class MyRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: undefined, success: false, showAddRecipe: false, userId: JSON.parse(sessionStorage.getItem('user'))['userId']};
  }
  render() {
    const { success, showAddRecipe } = this.state;
    return (
      <>
        <div className="p-2 text-center bg-light">
          <h1>My recipes</h1>
        </div>
        <div className="my-recipes">
          {!showAddRecipe && (
          <Button className="add-new-recipe-button" variant="dark" onClick={this.showHideDivNewRecipe}>
            Add new recipe
          </Button>
          )}
          {showAddRecipe && (
          <Button className="add-new-recipe-button" variant="dark" onClick={this.showHideDivNewRecipe}>
            Done
          </Button>
          )}
          <div className={'collapsible' + (showAddRecipe? ' active': '')}>
            <Container className="add-recipe-container">
              <form className="recipe-form" onSubmit={this.uploadRecipe}>
                <Form.Group controlId="form.Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Recipe name" />
                </Form.Group>
                <Form.Group controlId="form.PreparationTime">
                  <Form.Label>Cook time</Form.Label>
                  <Form.Control
                    name="preparationTime"
                    type="text"
                    placeholder="HH:MM" />
                </Form.Group>
                <Form.Group controlId="form.Textarea">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="description" as="textarea" rows={5} />
                </Form.Group>
                <Form.Group controlId="form.Image">
                  <Form.Label>Image</Form.Label>
                  <div>
                    <input
                      type="file"
                      name="file"
                      onChange={this.handleFileUpload} />
                    {success && <p>Upload success!</p>}
                  </div>
                </Form.Group>
                <Button type="submit" className="recipe-upload" variant="dark">
                  Upload
                </Button>
              </form>
            </Container>
          </div>
          <Recipes userId={this.state.userId}/>
        </div>
      </>
    );
  }

  showHideDivNewRecipe = () => {
    console.log(this.state.showAddRecipe);
    this.setState({ showAddRecipe: !this.state.showAddRecipe });
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    this.setState({ file });
  };

  uploadRecipe = (event) => {
    event.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append('file', this.state.file, {
      type: 'multipart/form-data'
    });
    axios
      .post(API_URL + 'upload-image', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${AuthHeader()}`
        }
      })
      .then((resp) => {
        const filename = resp.data;
        console.log(filename);
        const data = {
          name: event.target.name.value,
          description: event.target.description.value,
          preparationTime: event.target.preparationTime.value,
          imageName: filename,
          userId: JSON.parse(sessionStorage.getItem('user'))['userId']
        };
        axios
          .post(API_URL + 'recipes', data, {
            headers: {
              Authorization: `Bearer ${AuthHeader()}`
            }
          })
          .then(() => this.setState({ success: true }))
          .catch(() => this.setState({ success: false }));
      });

    console.log(this.state.success);
  };
}
export default MyRecipes;
