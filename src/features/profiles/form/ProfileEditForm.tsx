import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Tab } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { EditProfileFormValues, Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/Store";
import * as Yup from "yup";

interface Props {
  profile: Profile;
}

export default function ProfileEditForm({ profile }: Props) {
  const { profileStore } = useStore();
  const { updateProfile, profileRegistry } = profileStore;
  const [currentProfile, setCurrentProfile] = useState<Profile>(profile);

  useEffect(() => {
    const currentUser = profileRegistry.get(profile.username);
    if (profile && currentUser) {
      setCurrentProfile(currentUser);
    }
  }, [profile, profile.username, profileRegistry]);

  const validationSchema = Yup.object({
    displayName: Yup.string().required("The display name is required"),
    bio: Yup.string()
  });

  function handleFormSubmit(profile: EditProfileFormValues) {
    updateProfile(profile);
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => handleFormSubmit(values)}
      initialValues={currentProfile}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea rows={3} name="bio" placeholder="Bio" />
          <Button
            floated="right"
            positive
            type="submit"
            loading={isSubmitting}
            content="Update"
            disabled={isSubmitting || !dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  )
}
