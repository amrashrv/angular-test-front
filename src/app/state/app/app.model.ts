export interface IAppState {
  isLoading: boolean;
  hasError: boolean;
}

export const initialAppState: IAppState = {
  isLoading: false,
  hasError: false,
};
