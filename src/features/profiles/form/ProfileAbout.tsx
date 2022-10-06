import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
  profile: Profile;
}

export default function ProfileAbout({ profile }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

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
            {profile.bio}
          </p>
        )}
      </Grid>
    </Tab.Pane>
  );
}
