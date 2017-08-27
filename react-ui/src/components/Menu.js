import React, { PureComponent } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'


export default class Menu extends PureComponent {

	render() {

		return (
			
			<Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Brand</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Navbar.Form pullLeft>
                    <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
		);
	}
}