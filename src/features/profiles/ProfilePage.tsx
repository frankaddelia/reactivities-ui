import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useStore } from "../../app/stores/Store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
  const {username} = useParams<{username: string}>();
  const {profileStore, userStore} = useStore();
  const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore;

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }

    return () => {
      setActiveTab(0);
    }
  }, [loadProfile, username, userStore.user?.displayName, setActiveTab]);

  if (loadingProfile) {
    return <LoadingComponents content='Loading profile...' />
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && 
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        }
      </Grid.Column>
    </Grid>
  )
});
