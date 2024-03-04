//--- Important Imports
import React from 'react';
import { Link } from 'react-router-dom';

//--- Other Imports
import { 
    Segment, 
    Grid, GridRow, GridColumn, 
    Header,
    Form, FormGroup, FormInput, FormSelect, FormButton,
	Divider,
    Icon,
    Image,
    Button, 
	} from 'semantic-ui-react';

function AdminCatalogSearch() {
    const searchOptions = [
		{ text: 'Default', value: 'default' },
		{ text: 'Id', value: 'id' },
		{ text: 'Title', value: 'title' },
		{ text: 'Accession No.', value: 'acc-no' },
		{ text: 'Call No.', value: 'call-no' },
		{ text: 'ISBN', value: 'isbn' },
		{ text: 'Author', value: 'author' },
		{ text: 'Publisher', value: 'publisher' },
		{ text: 'Category', value: 'category' },
		{ text: 'Tags', value: 'tags' },
	]

    return (
        <>
            <Grid columns={2} stackable relaxed='very' equal>

                <GridRow only='computer tablet'>
                    <GridColumn width={8}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={8}>
                        <Segment floated='right'>
                            <Form>
                                <FormGroup>
                                    <FormSelect options={ searchOptions } placeholder='Default'/>
                                    <FormInput />
                                    <FormButton content='Search' />
                                </FormGroup>
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>
                <GridRow only='mobile'>
                    <GridColumn width={3}><Header as='h1' content='Catalog Items' /></GridColumn>
                    <GridColumn width={13}>
                        <Segment floated='left'>
                            <Form>
                                <FormSelect options={ searchOptions } placeholder='Default'/>
                                <FormInput />
                                <FormButton content='Search' />
                            </Form>
                        </Segment>
                    </GridColumn>
                </GridRow>

                <Divider />

                <GridRow only='computer'>
                    <GridColumn width={0}/>
                    <GridColumn width={16} textAlign='right'>
                        <Button content='Manual Add' as={ Link } to='/add-item' />
                        <Button content='Authors' as={ Link } to='/authors'/>
                        <Button content='Publishers' as={ Link } to='/publishers' />
                        <Button content='All Media Types' />
                        <Button content='Reset' />
                    </GridColumn>
                </GridRow>
                <GridRow only='tablet mobile'>
                    <GridColumn width={0}/>
                    <GridColumn width={16} textAlign='left'>
                        <Button content='Manual Add' as={ Link } to='/add-item' />
                        <Button content='Authors' as={ Link } to='/authors'/>
                        <Button content='Publishers' as={ Link } to='/publishers' />
                        <Button content='All Media Types' />
                        <Button content='Reset' />
                    </GridColumn>
                </GridRow>

            </Grid>
        </>
    )
}

export default AdminCatalogSearch;