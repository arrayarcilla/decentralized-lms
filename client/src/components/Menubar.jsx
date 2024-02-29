//--- Important Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//--- Other Imports
import {
    MenuItem,
    Menu,
} from 'semantic-ui-react';

export default class MenuBar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <>
                
                <Menu inverted widths='8' size='large'>
                    <MenuItem
                        as={Link} to='/home'
                        link
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        as={Link} to='/member_catalog'
                        link
                        name='catalog'
                        active={activeItem === 'catalog'}
                        onClick={this.handleItemClick}
                    >
                        Catalog
                    </MenuItem>
                    <MenuItem
                        as={Link} to='/search'
                        link
                        name='search-catalog'
                        active={activeItem === 'search-catalog'}
                        onClick={this.handleItemClick}
                    >
                        Search Catalog
                    </MenuItem>
                    <MenuItem
                        as={Link} to='/database'
                        link
                        name='database-a-z'
                        active={activeItem === 'database-a-z'}
                        onClick={this.handleItemClick}
                    >
                        Database A-Z
                    </MenuItem>
                    <MenuItem
                        as={Link} to='/my_account'
                        link
                        name='my-account'
                        active={activeItem === 'my-account'}
                        onClick={this.handleItemClick}
                    >
                        My Account
                    </MenuItem>
                    <MenuItem
                        as={Link} to='/contact'
                        link
                        name='ask-librarian'
                        active={activeItem === 'ask-librarian'}
                        onClick={this.handleItemClick}
                    >
                        Contact Us
                    </MenuItem>
                    <div className='menu-content'></div>
                </Menu>
                
            </>
        )
    }
}


