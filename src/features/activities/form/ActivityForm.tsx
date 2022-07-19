import { observer } from 'mobx-react-lite';
import { loadavg } from 'os';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/Store';
import { v4 as uuid } from 'uuid';

export default observer (function ActivityForm() {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const {id} = useParams<{id: string}>();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then(activity => setActivity(activity!))
    };
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };

      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: value
    })
  }

  if (loadingInitial) {
    return <LoadingComponents content="Loading activity..." />
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
        <Button floated="right" positive type="submit" loading={loading} content="Submit" onChange={handleInputChange} />
        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" onChange={handleInputChange} />
      </Form>
    </Segment>
  )
})