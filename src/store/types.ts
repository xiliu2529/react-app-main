export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export interface AppState {
  isSidebarOpen: boolean;
}

export interface ToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR;
}

export type AppActionTypes = ToggleSidebarAction;
