import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import "./Events.css"

export default class EventForm extends Component {

  render() {
    return(
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        {
        (this.props.buttonId === "addEvent")
          ?<ModalHeader toggle={this.props.toggle}>Add New Event</ModalHeader>
          :<ModalHeader toggle={this.props.toggle}>Edit Your Event</ModalHeader>
        }
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Event Name</Label>
            {
              (this.props.buttonId === "addEvent")
                ?<Input type="text" name="eventName" id="name" onChange={this.props.handleFieldChange} required />
                :<Input type="text" name="eventName" id="name" onChange={this.props.handleFieldChange} required defaultValue={this.props.name}/>
            }
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            {
              (this.props.buttonId === "addEvent")
                ?<Input type="text" name="location" id="location" onChange={this.props.handleFieldChange} required />
                :<Input type="text" name="location" id="location" onChange={this.props.handleFieldChange} required defaultValue={this.props.location}/>
            }
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            {
              (this.props.buttonId === "addEvent")
                ?<Input type="date" name="date" id="date" onChange={this.props.handleFieldChange} required />
                :<Input type="date" name="date" id="date" onChange={this.props.handleFieldChange} required defaultValue={this.props.date}/>
            }
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={(e) => this.props.buildNewEvent(e)}>Save</Button>
        <Button color="secondary" onClick={(e)=> {
          this.props.getId(e)
          .then(()=> this.props.toggle())
          }}
          >Cancel</Button>
      </ModalFooter>
    </Modal>
    )
  }
}
