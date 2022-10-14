import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./Store";

export default class ProfileStore {
  profileRegistry = new Map<string, Profile>();
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings: Profile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }

    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      })
    } catch (error) {
      console.error(error);
      runInAction(() => this.loadingProfile = false);
    }
  }

  updateProfile = async (profile: Profile) => {
    this.loadingProfile = true;

    try {
      if (store.userStore.user) {
        await agent.Profiles.update(profile);

        runInAction(() => {
          let updatedProfile = { ...this.getProfile(profile.username), ...profile };
          this.profileRegistry.set(profile.username, updatedProfile as Profile);
          store.userStore.setDisplayName(profile.displayName);
          this.loadingProfile = false;
        });
      }
    } catch (error) {
      console.error(error);
      runInAction(() => this.loadingProfile = false);
    }
  }

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;

      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);

          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }

        this.uploading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => this.uploading = false);
    }
  }

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;

    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(p => p.isMain)!.isMain = false;
          this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      console.error(error);
      runInAction(() => this.loading = false);
    }
  }

  deletePhoto = async (photo: Photo) => {
    this.loading = true;

    try {
      await agent.Profiles.deletePhoto(photo.id);

      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
          this.loading = false;
        }
      });
    } catch (error) {
      console.error(error);
      runInAction(() => this.loading = false);
    }
  }

  private getProfile = (username: string) => {
    return this.profileRegistry.get(username);
  }

  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (this.profile && this.profile.username !== store.userStore.user?.username) {
          following ? this.profile.followersCount!++ : this.profile.followersCount!--;
          this.profile.following = !this.profile.following;
        }
        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following ? profile.followersCount!-- : profile.followersCount!++;
            profile.following = !profile.following;
          }
        });

        this.loading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => this.loading = false);
    }
  }
}
