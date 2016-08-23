import React from 'react';
import { Button, Panel, Accordion } from 'react-bootstrap';

import RecipeStore from '../stores/RecipeStore';

import Recipe from './Recipe';
import RecipeModal from './RecipeModal';

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
                    <Button bsStyle='primary' bsSize='large' onClick={() => this._modifyRecipe() }>Add Recipe</Button>
                    <RecipeModal
                        showModal={this.state.showModal}
                        onHide={() => this._closeModal() }
                        type={this.state.modalType}
                        editKey={this.state.editKey} />
                </Panel>
            </div>
        );
    }
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
    _openModal() {
        this.setState({
            showModal: true
        });
    }
    _closeModal() {
        this.setState({
            showModal: false
        });
        if (this.state.newData) {
            this.setState({
                recipe: RecipeStore.getRecipe(),
                newData: false
            });
        }
    }
    _modifyRecipe(editKey = -1) {
        this._openModal();
        var type = editKey === -1 ? 'add' : 'edit';
        this.setState({
            modalType: type,
            editKey: editKey,
            newData: true
        });
    }
    _deleteRecipe(delKey = -1) {
        RecipeStore.deleteRecipe(delKey);
        this.setState({
            newData: true
        });
    }
}

module.exports = RecipeList;