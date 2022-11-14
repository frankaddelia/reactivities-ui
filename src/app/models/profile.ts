import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  following?: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export class EditProfileFormValues {
  username: string = '';
  displayName: string = '';
  bio?: string = '';

  constructor(profile?: EditProfileFormValues) {
    if (profile) {
      this.username = profile.username;
      this.displayName = profile.displayName;
      this.bio = profile.bio;
    }
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}
