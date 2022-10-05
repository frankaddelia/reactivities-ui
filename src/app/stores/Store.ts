import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
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
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
