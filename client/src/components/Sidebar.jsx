//--- Important Imports
// import { EthProvider } from "../contexts/EthContext";
import React from "react";
import { Link } from 'react-router-dom';

//--- Component Imports
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Demo from "../components/Demo";
import Footer from "../components/Footer";

//--- Other Imports
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



function SideBar() {
    return (
        <>
					<Sidebar
							as={Menu}
							icon="labeled"
							animation="push"
							inverted
							vertical
							visible
							width="thin"
					>
						<Link to='/'>
							<MenuItem as="a">
								<Icon name="home" />
								Dashboard
							</MenuItem>
						</Link>
						<Popup
							content={
								<Menu vertical>
									<Link to='/catalog'>
										<MenuItem as="a">
											<Icon name="file outline" />
											Catalog Items
										</MenuItem>	
									</Link> 
									<Link to='/categories'>
										<MenuItem as="a">
											<Icon name="suitcase" />
											Categories
										</MenuItem> 
									</Link>
									<Link to='/authors'>
										<MenuItem as="a">
											<Icon name="user outline" />
											Authors
										</MenuItem>
									</Link>
									<Link to='/publishers'>
										<MenuItem as="a">
											<Icon name="user outline" />
											Publishers
										</MenuItem>
									</Link>
									<Link to='/tags'>
										<MenuItem as="a">
											<Icon name="tag" />
											Tags
										</MenuItem>
									</Link>
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
									<Link to="/Member">
										<MenuItem as="a">
											<Icon name="user outline" />
											Members
										</MenuItem> 
									</Link>
									<Link to='/circulation'>
										<MenuItem as="a">
											<Icon name="file alternate outline" />
											Circulations
										</MenuItem>	
									</Link> 
									<Link to='/fees-and-payments'>
										<MenuItem as="a">
											<Icon name="calculator" />
											Fees & Payments
										</MenuItem>
									</Link>
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