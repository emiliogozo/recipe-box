import React from 'react';

import RecipeList from './RecipeList';

/**
 * Main Component
 */
class Main extends React.Component {
    render() {
        return (
            <div>
                <RecipeList />
            </div>
        );
    }
}

module.exports = Main;