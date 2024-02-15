//--- Components
// import { EthProvider } from "../contexts/EthContext";
import React from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Demo from "../components/Demo";
import Footer from "../components/Footer";

import {
    SidebarPusher,
    MenuItem,
    Header,
    Icon,
    Menu,
    Sidebar,
    Segment,
    Popup,
} from "semantic-ui-react";

//--- Views
// import Catalog from "../views/Catalog";

function SideBar() {
    return (
        <>
            {/* <h1>This is a sidebar</h1> */}
            

            <Sidebar
                as={Menu}
                icon="labeled"
                animation="push"
                inverted
                vertical
                visible
                width="thin"
            >
                <MenuItem as="a">
                    <Icon name="home" />
                    Dashboard
                </MenuItem>
                <Popup
                    content={
                        <Menu vertical>
                            <MenuItem as="a">
                                <Icon name="file outline" />
                                Catalog Items
                            </MenuItem> 
                            <MenuItem as="a">
                                <Icon name="suitcase" />
                                Categories
                            </MenuItem> 
                            <MenuItem as="a">
                                <Icon name="user outline" />
                                Authors
                            </MenuItem>
                            <MenuItem as="a">
                                <Icon name="user outline" />
                                Publishers
                            </MenuItem>
                            <MenuItem as="a">
                                <Icon name="tag" />
                                Tags
                            </MenuItem>
                        </Menu>
                    }
                    on="click"
                    position="right center"
                    size="large"
                    pinned
                    trigger={
                        <MenuItem as="a">
                            <Icon name="folder" />
                            Catalogs
                        </MenuItem>
                    }
                />

                <Popup
                    content={
                        <Menu vertical>
                            <MenuItem as="a">
                                <Icon name="user outline" />
                                Members
                            </MenuItem> 
                            <MenuItem as="a">
                                <Icon name="file alternate outline" />
                                Circulations
                            </MenuItem> 
                            <MenuItem as="a">
                                <Icon name="calculator" />
                                Fees & Payments
                            </MenuItem>
                        </Menu>
                    }
                    on="click"
                    position="right center"
                    size="large"
                    pinned
                    trigger={
                        <MenuItem as="a">
                            <Icon name="book"/>
                            Circulations
                        </MenuItem>
                    }
                />

                <MenuItem as="a">
                    <Icon name="add user"/>
                    Procurements
                </MenuItem>
            </Sidebar>  
        </>
    );
}

export default SideBar;