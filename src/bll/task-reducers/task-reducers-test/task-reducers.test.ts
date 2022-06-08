import {
   tasksReducer, tasksType,
} from "../tasks-reducer";
import {todolistId1} from "../../todolist-reducers/todolist-reducer";
import {
   AddTask,
   ChangeTaskStatus,
   ChangeTaskText, DeleteTask
} from "../task-create-actions";
import {changeFilterTasks} from "../task.thunk";
import {TasksPriorities, TasksStatus} from "../../../api/taskAPI";

let state: tasksType = {}

beforeEach(() => {
   state = {
      'todolistId1': [
         {
            description: '',
            title: "Html-Css",
            status: TasksStatus.Completed,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: 'todolistId1',
            order: 0,
            addedDate: '',
         },
         {
            description: '',
            title: "Js",
            status: TasksStatus.Completed,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '2',
            todoListId: 'todolistId1',
            order: 0,
            addedDate: '',
         },
         {
            description: '',
            title: "ReactJs",
            status: TasksStatus.New,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '3',
            todoListId: 'todolistId1',
            order: 0,
            addedDate: '',
         },
      ],

      'todolistId2': [
         {
            description: '',
            title: "Html-Css",
            status: TasksStatus.Completed,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: 'todolistId2',
            order: 0,
            addedDate: '',
         },
         {
            description: '',
            title: "Js",
            status: TasksStatus.New,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '2',
            todoListId: 'todolistId2',
            order: 0,
            addedDate: '',
         },
         {
            description: '',
            title: "ReactJs",
            status: TasksStatus.Completed,
            priority: TasksPriorities.Hi,
            startDate: '',
            deadline: '',
            id: '3',
            todoListId: 'todolistId2',
            order: 0,
            addedDate: '',
         },
      ]
   }
})

test('Should change state object-tasks', () => {
   const action = AddTask(
       {
          description: '',
          title: "React",
          status: TasksStatus.Completed,
          priority: TasksPriorities.Hi,
          startDate: '',
          deadline: '',
          id: '1',
          todoListId: 'todolistId1',
          order: 0,
          addedDate: '',
       },
   )
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'].length).toBe(4)
   expect(newState['todolistId1'][3].title).toBe('React')
})

test('Should change state object', () => {


   const action = DeleteTask(
       {
          description: '',
          title: "Html-Css",
          status: TasksStatus.Completed,
          priority: TasksPriorities.Hi,
          startDate: '',
          deadline: '',
          id: '1',
          todoListId: 'todolistId1',
          order: 0,
          addedDate: '',
       },
   )
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);

   expect(newState['todolistId1'].length).toBe(2)
   expect(newState['todolistId2'].length).toBe(3)
   expect(newState['todolistId1'][0]).toBeDefined()
   expect(newState['todolistId1'][0].title).toBe('Js')
})

test('status of specified Task should be changed', () => {
   const action = ChangeTaskStatus(
       {
          description: '',
          title: "Html-Css",
          status: TasksStatus.Completed,
          priority: TasksPriorities.Hi,
          startDate: '',
          deadline: '',
          id: '1',
          todoListId: 'todolistId1',
          order: 0,
          addedDate: '',
       },
   )
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId2'][0].status).toBe(TasksStatus.Completed)
});

test('text of specified Task should be changed', () => {
   const action = ChangeTaskText({
      description: '',
      title: "Html-Css",
      status: TasksStatus.Completed,
      priority: TasksPriorities.Hi,
      startDate: '',
      deadline: '',
      id: '1',
      todoListId: 'todolistId1',
      order: 0,
      addedDate: '',
   }, 'React')
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0].title).toBe('React')
   expect(newState['todolistId2'][0].title).toBe('Html-Css')
});

test('change filter tasks to test action FILTER-TASKS', () => {
   const newStateActive = changeFilterTasks(state, 'todolistId1', 'ACTIVE')

   expect(state).toEqual(state);
   expect(newStateActive['todolistId1'].length).toBe(2)
   expect(newStateActive['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newStateActive['todolistId1'][2]).toBeUndefined()
   expect(state['todolistId1']).not.toBe(newStateActive['todolistId1'])
   expect(state['todolistId2']).toBe(newStateActive['todolistId2'])
   expect(newStateActive['todolistId2'].length).toBe(3)
   expect(newStateActive['todolistId2'][3]).toBeFalsy()

   const newStateCompleted = changeFilterTasks(state, 'todolistId2', 'COMPLETED')

   expect(state).toEqual(state);
   expect(newStateCompleted['todolistId2'].length).toBe(1)
   expect(newStateCompleted['todolistId2'][0].status).toBe(TasksStatus.New)
   expect(newStateCompleted['todolistId2'][2]).toBeUndefined()
   expect(state['todolistId2']).not.toBe(newStateCompleted['todolistId2'])
   expect(state['todolistId1']).toBe(newStateCompleted['todolistId1'])
   expect(newStateCompleted['todolistId1'].length).toBe(3)
   expect(newStateCompleted['todolistId1'][0]).toBeTruthy()
   expect(newStateCompleted['todolistId1'][2]).toBeTruthy()
   expect(newStateCompleted['todolistId1'][3]).toBeFalsy()
})
