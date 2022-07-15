import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
    setActivities([...activities.filter(activity => activity.id !== id )])
  }

  if (activityStore.loadingInitial) {
     return <LoadingComponents content="Loading app" />
  }

  return (
    <>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard
            activities={activityStore.activities}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
    </>
  );
}

export default observer(App);
