import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

/**
 * Ingredients Component
 */
class Ingredients extends React.Component {
    render() {
        return (
            <ListGroup>
                {this.props.list.map(this._createList)}
            </ListGroup>
        );
    }
    _createList(item, i) {
        return (
            <ListGroupItem key={i + 1}>{item}</ListGroupItem>
        );
    }
}

module.exports = Ingredients;