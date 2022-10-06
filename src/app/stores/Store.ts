import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
