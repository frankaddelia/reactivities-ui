import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/Store";
import ProfileEditForm from "./form/ProfileEditForm";

export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { profileRegistry } = profileStore;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(profileStore.profile);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (profile?.username) {
      const currentUser = profileRegistry.get(profile.username);
      if (currentUser) {
        setProfile(currentUser);
      }
    }
  }, [profileRegistry, profile?.username]);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />
          <Button
            floated="right"
            primary={!isEditing}
            basic
            onClick={toggleEditing}
          >
            {isEditing? "Cancel" : "Edit Profile"}
          </Button>
        </Grid.Column>
        {isEditing && profile && (
          <Grid.Column width={16}>
            <ProfileEditForm profile={profile} />
          </Grid.Column>
        )}
        {!isEditing && (
          <p style={{marginBottom: '15px', whiteSpace: 'pre-wrap'}}>
            {profile?.bio}
          </p>
        )}
      </Grid>
    </Tab.Pane>
  );
});
