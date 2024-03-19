/*
1) Install NgRx Dependencies:
2) Define Todo Model:
3) Define Actions:
4) Define Reducers:
5) Define Effects:
6) Define Selectors (Optional):
7) Inject Store in AppModule:
8) Use NgRx in Components and Services:

===========================================
1) Install NgRx Dependencies:
    Install NgRx dependencies using npm or yarn.
    npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools @ngrx/router-store @ngrx/schematics

2) Define Todo Model:

    Define a model for the todo item. For example:*/
    // todo.model.ts
    export interface Todo {
        id: string;
        title: string;
        completed: boolean;
    }

/*3) Define Actions:

    Define actions to represent CRUD operations on todo items. For example:*/

    // todo.actions.ts
    import { createAction, props } from '@ngrx/store';
    import { Todo } from '../models/todo.model';

    export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
    export const removeTodo = createAction('[Todo] Remove Todo', props<{ id: string }>());
    export const toggleTodo = createAction('[Todo] Toggle Todo', props<{ id: string }>());

/*4) Define Reducers:

    Define reducers to handle state changes for todo items. For example:*/


    // todo.reducer.ts
    import { createReducer, on } from '@ngrx/store';
    import * as TodoActions from '../actions/todo.actions';
    import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
    import { Todo } from '../models/todo.model';

    export interface TodoState extends EntityState<Todo> {}

    export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

    export const initialState: TodoState = todoAdapter.getInitialState();

    const todoReducer = createReducer(
    initialState,
    on(TodoActions.addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),
    on(TodoActions.removeTodo, (state, { id }) => todoAdapter.removeOne(id, state)),
    on(TodoActions.toggleTodo, (state, { id }) => {
        const todo = state.entities[id];
        return todoAdapter.updateOne({ id, changes: { completed: !todo.completed } }, state);
    })
    );

    export function reducer(state: TodoState | undefined, action: Action) {
    return todoReducer(state, action);
    }

/*5) Define Effects:

    Define effects to handle side effects such as HTTP requests. For example:*/

    // todo.effects.ts
    import { Injectable } from '@angular/core';
    import { Actions, ofType, createEffect } from '@ngrx/effects';
    import { Store } from '@ngrx/store';
    import { map } from 'rxjs/operators';
    import { TodoService } from '../services/todo.service';
    import * as TodoActions from '../actions/todo.actions';

    @Injectable()
    export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private store: Store
    ) {}

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
        ofType('[Todo] Load Todos'),
        map(() => this.todoService.getTodos()),
        map(todos => TodoActions.loadTodosSuccess({ todos }))
        )
    );
    }

/*6) Define Selectors (Optional):

    Define selectors to extract specific data from the store. For example:*/

    // todo.selectors.ts
    import { createFeatureSelector, createSelector } from '@ngrx/store';
    import { TodoState } from '../reducers/todo.reducer';

    export const selectTodoState = createFeatureSelector<TodoState>('todos');

    export const selectAllTodos = createSelector(
    selectTodoState,
    todos => Object.values(todos.entities)
    );

/*7) Inject Store in AppModule:

    Inject the store module and effects module in the AppModule.*/

    // app.module.ts
    import { StoreModule } from '@ngrx/store';
    import { EffectsModule } from '@ngrx/effects';
    import { reducer as todoReducer } from './reducers/todo.reducer';
    import { TodoEffects } from './effects/todo.effects';

    @NgModule({
    imports: [
        StoreModule.forRoot({ todos: todoReducer }),
        EffectsModule.forRoot([TodoEffects])
    ]
    })
    export class AppModule {}

/*8) Use NgRx in Components and Services:

    Use NgRx store actions, selectors, and effects in your components and services to manage todo items.

*/