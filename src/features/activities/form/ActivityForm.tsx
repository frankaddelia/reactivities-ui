import { observer } from 'mobx-react-lite';
import { loadavg } from 'os';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/Store';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';

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

  // function handleSubmit() {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };

  //     createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
  //   } else {
  //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
  //   }
  // }

  // function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = e.target;
  //   setActivity({
  //     ...activity,
  //     [name]: value
  //   })
  // }

  if (loadingInitial) {
    return <LoadingComponents content="Loading activity..." />
  }

  return (
    <Segment clearing>
      <Formik initialValues={activity} onSubmit={values => console.log(values)}>
        {({values: activity, handleChange, handleSubmit}) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input
              name="title"
              value={activity.title}
              placeholder="Title"
              onChange={handleChange}
            />
            <Form.TextArea placeholder="Description"
              name="description"
              value={activity.description}
              onChange={handleChange}
            />
            <Form.Input
              name="category"
              value={activity.category}
              placeholder="Category"
              onChange={handleChange}
            />
            <Form.Input
              type="date"
              name="date"
              value={activity.date}
              placeholder="Date"
              onChange={handleChange}
            />
            <Form.Input
              name="city"
              value={activity.city}
              placeholder="City"
              onChange={handleChange}
            />
            <Form.Input
              name="venue"
              value={activity.venue}
              placeholder="Venue"
              onChange={handleChange}
            />
            <Button floated="right" positive type="submit" loading={loading} content="Submit" onChange={handleChange} />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" onChange={handleChange} />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})