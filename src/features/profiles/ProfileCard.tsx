import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

interface Props {
  profile: Profile;
}

export default observer( function ProfileCard({profile}: Props) {
  function truncateText (
      text: string,
      startingIndex = 0,
      endingIndex = 37,
      maxLength = 40,
      truncationText = '...'
    ) {
    return text.length > maxLength ? text.slice(startingIndex, endingIndex) + truncationText : text;
  }

  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>
          {profile.displayName}
        </Card.Header>
        <Card.Description>
          {profile.bio && truncateText(profile.bio)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        20 followers
      </Card.Content>
    </Card>
  )
});
