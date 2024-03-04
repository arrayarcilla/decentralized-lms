//--- Important Imports
import React from 'react';

//--- Component Imports
import SideBar from '../../components/Sidebar';

//--- Other Imports
import {
    Segment,
    Container,
    Grid, GridRow, GridColumn,
    Header,
    Form, FormInput, FormSelect, FormGroup,
    Icon,
    Image,
    Button,
    Divider
} from 'semantic-ui-react';


function AddItem() {
    const mediaOptions = [
		{ text: 'Books', value: 'books' },
		{ text: 'Audio/Visuals', value: 'audio-visuals' },
		{ text: 'Ebooks', value: 'ebooks' },
		{ text: 'Journals/Thesis', value: 'journals-thesis' },
		{ text: 'Encyclopedias', value: 'encyclopedias' },
		{ text: 'News Clippings', value: 'newsclippings' },
	];

    return (
        <>
            <SideBar />
            <div className='admin-page-content'>
                <Segment padded raised>
                    <Header as='h1' content='Add New Item' />
                    <Divider />
                    <Form>
                        <FormSelect 
                            label='Media Type'
                            options={mediaOptions}
                            placeholder='Books'
                            width={6}
                        />
                        <FormInput label='Category' width={6} />
                        <FormInput label='Title' width={6}/>
                        <FormInput label='ISBN'  width={6} />
                        <FormInput label='ISBN 13' width={6} />
                        <FormInput label='Accession No.' width={6} />
                        <FormInput label='Publisher' width={6} />
                        <FormInput label='Edition' width={6} />
                        <FormInput label='Year' width={6} />
                        <FormInput label='Tags' width={8}/>
                    </Form>
                </Segment>
            </div>
        </>
    )
}

export default AddItem;