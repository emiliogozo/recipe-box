import React from 'react';
import { ButtonToolbar, Button, Panel } from 'react-bootstrap';

import Ingredients from './Ingredients';

class Recipe extends React.Component {
    render() {
        var {ingredients, name, onEdit, onDelete, ...other} = this.props;
        return (
            <Panel header={name} {...other} >
                <h4 className="text-center">Ingredients</h4><hr/>
                <Ingredients list={ingredients} />
                <ButtonToolbar>
                    <Button onClick={() => onEdit(name)} bsStyle='success'>Edit</Button>
                    <Button onClick={() => onDelete(name)} bsStyle='danger'>Delete</Button>
                </ButtonToolbar>
            </Panel>
        );
    }
}

module.exports = Recipe;