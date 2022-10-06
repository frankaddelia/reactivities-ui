import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import profileStore from "../../app/stores/profileStore";
import { useStore } from "../../app/stores/Store";
import ProfileEditForm from "./form/ProfileEditForm";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
  const { profileStore } = useStore();
  const { profileRegistry } = profileStore;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentProfile, setCurrentProfile] = useState<Profile>(profile);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    const currentUser = profileRegistry.get(profile.username);
    if (profile && currentUser) {
      setCurrentProfile(currentUser);
    }
  }, [profile, profile.username, profileRegistry]);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
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
        {isEditing && (
          <Grid.Column width={16}>
            <ProfileEditForm profile={profile} />
          </Grid.Column>
        )}
        {!isEditing && (
          <p>
            {currentProfile.bio}
          </p>
        )}
      </Grid>
    </Tab.Pane>
  );
});
