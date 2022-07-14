import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: value
    })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          name="title"
          value={activity.title}
          placeholder="Title"
          onChange={handleInputChange}
        />
        <Form.TextArea placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name="category"
          value={activity.category}
          placeholder="Category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          name="date"
          value={activity.date}
          placeholder="Date"
          onChange={handleInputChange}
        />
        <Form.Input
          name="city"
          value={activity.city}
          placeholder="City"
          onChange={handleInputChange}
        />
        <Form.Input
          name="venue"
          value={activity.venue}
          placeholder="Venue"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" loading={submitting} content="Submit" onChange={handleInputChange} />
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} onChange={handleInputChange} />
      </Form>
    </Segment>
  )
}