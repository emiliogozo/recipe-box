import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import RecipeHelper from '../utils/RecipeHelper';
import RecipeStore from '../stores/RecipeStore';

/** 
 * Recipe Modal
 */
class RecipeModal extends React.Component {
    render() {
        var recipe = RecipeStore.getRecipe(this.props.editKey);
        return (
            <Modal show={this.props.showModal} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.type === 'add' ? 'Add Recipe' : 'Edit Recipe'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId='recipeName'>
                            <ControlLabel>Recipe</ControlLabel>
                            <FormControl type='text' placeholder='Recipe Name' defaultValue={recipe.name} />
                        </FormGroup>
                        <FormGroup controlId='recipeIngredients'>
                            <ControlLabel>Ingredients</ControlLabel>
                            <FormControl 
                                componentClass='textarea' 
                                placeholder='Enter Ingredients,Separated,By,Commas'
                                defaultValue={RecipeHelper.arrayToCsv(recipe.ingredients)} />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this._addRecipe()} bsStyle='primary'>{this.props.type === 'add' ? 'Add Recipe' : 'Edit Recipe'}</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    /**
     * Handles adding/editing recipe to the Data stores
     */ 
    _addRecipe() {
        var recipe = {};
        recipe.name = document.getElementById('recipeName').value;
        recipe.ingredients = RecipeHelper.csvToArray(document.getElementById('recipeIngredients').value);
        RecipeStore.addRecipe(recipe, this.props.editKey);
        this.props.onHide();
    }
}

module.exports = RecipeModal;