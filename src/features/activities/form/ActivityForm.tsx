import { observer } from 'mobx-react-lite';
import { loadavg } from 'os';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/Store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';

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
      <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
        {({handleSubmit}) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field
              name="title"
              placeholder="Title"
            />
            <Field
              placeholder="Description"
              name="description"
            />
            <Field
              name="category"
              placeholder="Category"
            />
            <Field
              type="date"
              name="date"
              placeholder="Date"
            />
            <Field
              name="city"
              placeholder="City"
            />
            <Field
              name="venue"
              placeholder="Venue"
            />
            <Button floated="right" positive type="submit" loading={loading} content="Submit" />
            <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})