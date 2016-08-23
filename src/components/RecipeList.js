import React from 'react';
import { Button, Panel, Accordion } from 'react-bootstrap';

import RecipeStore from '../stores/RecipeStore';

import Recipe from './Recipe';
import RecipeModal from './RecipeModal';

/**
 * Recipe List Component
 */
class RecipeList extends React.Component {
    constructor() {
        super();
        this.state = {
            recipe: [],
            showModal: false,
            modalType: '',
            newData: false
        };
    }
    componentDidMount() {
        // get recipe data
        this.setState({
            recipe: RecipeStore.getRecipe()
        });
    }
    render() {
        return (
            <div className='container'>
                <Panel header='Recipe Book'>
                    <Accordion bsStyle='success'>
                        { this.state.recipe.map((item, i) => this._createPanel(item, i)) }
                    </Accordion>
                    <Button bsStyle='primary' bsSize='large' 
                        onClick={() => this._modifyRecipe() }>
                        Add Recipe
                    </Button>
                    <RecipeModal
                        showModal={this.state.showModal}
                        onHide={() => this._closeModal() }
                        type={this.state.modalType}
                        editKey={this.state.editKey} />
                </Panel>
            </div>
        );
    }
    /**
     * Populate the Recipe Panel
     */
    _createPanel(item, i) {
        return (
            <Recipe
                name={item.name}
                ingredients={item.ingredients}
                eventKey={i + 1}
                key={i + 1}
                onEdit={() => this._modifyRecipe(i) }
                onDelete={() => this._deleteRecipe(i) } />
        );
    }
    /**
     * open the modal
     */
    _openModal() {
        this.setState({
            showModal: true
        });
    }
    /**
     * close the modal
     * reload the data if necessary
     */
    _closeModal() {
        this.setState({
            showModal: false
        });
        // fetch the new data
        if (this.state.newData) {
            this.setState({
                recipe: RecipeStore.getRecipe(),
                newData: false
            });
        }
    }
    /**
     * opens the modal to
     * add or edit a recipe
     */
    _modifyRecipe(editKey = -1) {
        this._openModal();
        var type = editKey === -1 ? 'add' : 'edit';
        this.setState({
            modalType: type,
            editKey: editKey,
            newData: true
        });
    }
    /**
     * Delete a recipe
     */
    _deleteRecipe(delKey = -1) {
        RecipeStore.deleteRecipe(delKey);
        this.setState({
            recipe: RecipeStore.getRecipe()
        });
    }
}

module.exports = RecipeList;