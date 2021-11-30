import {IState} from "../state.model";
import {createSelector} from "@ngrx/store";
import {appStateKey} from "./app.reducer";
import {IAppState} from "./app.model";

export const appStateSelector = (state: IState) => state[appStateKey];

export const selectIsLoading = createSelector(
  appStateSelector,
  (state: IAppState) => state.isLoading
);


