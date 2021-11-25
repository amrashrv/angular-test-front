import { createAction, props } from '@ngrx/store';

export const setErrorState = createAction('[appState] set Error', props<{hasError: boolean}>());
