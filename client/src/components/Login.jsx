import React from "react";
import { Form, Button, FormInput, Header, Image, Grid, GridRow, GridColumn } from "semantic-ui-react";

const LoginForm = () => (

    <Grid columns={2} centered container>
        <GridRow>
            <GridColumn  width={2}>
            </GridColumn>
            <GridColumn textAlign="left">
                <Header as="h2">User Login</Header>
            </GridColumn>
        </GridRow>
        <GridRow centered>
            <GridColumn width={2}>
                <Image src="logo.png" size="small"/>
            </GridColumn>
            <GridColumn>
                <Form>
                    <FormInput icon="user" iconPosition="left" label="Username" placeholder="Username" width={9}/>
                    <FormInput icon="lock" iconPosition="left" label="Password" type="password" width={9}/>
                    <Grid columns={2}>
                        <GridRow>
                            <GridColumn width={5}><Button type="submit">Login</Button></GridColumn>
                            <GridColumn><a href="#">Forgot password?</a></GridColumn>
                        </GridRow>
                    </Grid>    
                </Form>
            </GridColumn>
        </GridRow>
    </Grid>
    
)

export default LoginForm