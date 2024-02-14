import React from "react";
import { Form, Button, FormInput, Header, Message, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";

const RegisterForm = () => (

    <Grid container columns={1}>
        <GridRow centered>
            <GridColumn textAlign="left" width={8}>
                <Header as="h1">Register Account</Header>
            </GridColumn>
        </GridRow>
        <Divider />
        <GridRow centered>
            <GridColumn textAlign="left" width={8}>
            <p>Creating your account at SandL is completely FREE. You can easily become a member with just a few simple clicks.</p>
            </GridColumn>
        </GridRow>
        <Divider />
        
        <GridRow centered>
            <GridColumn textAlign="left" width={8}>
                <Form>
                    <GridRow>
                        <Message>
                            <FormInput label="Name" type="name" />
                            <p class="form-description">Please enter your full name, e.g. John Doe</p>
                        </Message>
                    </GridRow>
                    <br />
                    <GridRow>
                        <Message>
                            <FormInput label="Email" type="email" />
                            <p class="form-description">Please provide your email address, e.g. john@example.com</p>
                        </Message>
                    </GridRow>
                    <br />
                    <GridRow>
                        <Message>
                            <FormInput label="Password" type="password" />
                            <p class="form-description">Please enter your password</p>
                        </Message>
                    </GridRow>
                    <br />
                    <GridRow>
                        <Message>
                            <FormInput label="Confirm Password" type="password" />
                            <p class="form-description">Please enter the password again</p>
                        </Message>
                    </GridRow>
                    <br />
                    <GridRow>
                        <Message>
                            <p class="form-description">Guide to connect to Metamask goes here</p>
                        </Message> 
                    </GridRow>
                    <br />
                    <GridRow>
                        <Button type="submit">Create Account</Button>
                    </GridRow>
                    <br />
                    <GridRow>
                        <a href="#">Cancel</a>
                    </GridRow>
                </Form>
            </GridColumn>
        </GridRow>
    </Grid>
    
)

export default RegisterForm