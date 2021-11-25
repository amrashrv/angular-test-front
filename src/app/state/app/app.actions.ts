import { createAction, props } from '@ngrx/store';

export const setErrorState = createAction('[app] set Error', props<{hasError: boolean}>());
