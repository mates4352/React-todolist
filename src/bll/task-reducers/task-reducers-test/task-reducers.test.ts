import {
   tasksReducer, tasksType, taskType,
} from "../tasks-reducer";
import {todolistId1} from "../../todolist-reducers/todolist-reducer";
import {
   AddTask,
   ChangeTaskStatus,
   ChangeTaskText, DeleteTask, SetTasks
} from "../task-create-actions";
import {changeFilterTasks} from "../task.thunk";
import {taskApiType, TasksPriorities, TasksStatus} from "../../../api/taskAPI";

let state: tasksType = {}
let startTask: taskApiType = {
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
}

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
   startTask = {
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
   }
})

test('Test taskReducer case SET_TASKS', () => {
   const action = SetTasks('todolistId1', [startTask])
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0].description).toBe('')
   expect(newState['todolistId1'][0].title).toBe('React')
   expect(newState['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId1'][0].priority).toBe(TasksPriorities.Hi)
   expect(newState['todolistId1'][0].startDate).toBe('')
   expect(newState['todolistId1'][0].deadline).toBe('')
   expect(newState['todolistId1'][0].id).toBe('1')
   expect(newState['todolistId1'][0].todoListId).toBe('todolistId1')
   expect(newState['todolistId1'][0].order).toBe(0)
   expect(newState['todolistId1'][0].addedDate).toBe('')
   expect(newState['todolistId1'].length).toBe(1)

})

test('Test taskReducer case ADD_TASK', () => {
   const action = AddTask(startTask)
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][3].description).toBe('')
   expect(newState['todolistId1'][3].title).toBe('React')
   expect(newState['todolistId1'][3].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId1'][3].priority).toBe(TasksPriorities.Hi)
   expect(newState['todolistId1'][3].startDate).toBe('')
   expect(newState['todolistId1'][3].deadline).toBe('')
   expect(newState['todolistId1'][3].id).toBe('1')
   expect(newState['todolistId1'][3].todoListId).toBe('todolistId1')
   expect(newState['todolistId1'][3].order).toBe(0)
   expect(newState['todolistId1'][3].addedDate).toBe('')
   expect(newState['todolistId1'].length).toBe(4)

})

test('Test taskReducer case DELETE_TASK', () => {
   const action = DeleteTask(startTask)
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0]).toBeDefined()
   expect(newState['todolistId1'][0].description).toBe('')
   expect(newState['todolistId1'][0].title).toBe('Js')
   expect(newState['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId1'][0].priority).toBe(TasksPriorities.Hi)
   expect(newState['todolistId1'][0].startDate).toBe('')
   expect(newState['todolistId1'][0].deadline).toBe('')
   expect(newState['todolistId1'][0].id).toBe('2')
   expect(newState['todolistId1'][0].todoListId).toBe('todolistId1')
   expect(newState['todolistId1'][0].order).toBe(0)
   expect(newState['todolistId1'][0].addedDate).toBe('')
   expect(newState['todolistId1'].length).toBe(2)
   expect(newState['todolistId2'].length).toBe(3)
})

test('Test taskReducer case CHANGE_TASK_STATUS', () => {
   const action = ChangeTaskStatus(startTask)
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0].description).toBe('')
   expect(newState['todolistId1'][0].title).toBe('Html-Css')
   expect(newState['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId1'][0].priority).toBe(TasksPriorities.Hi)
   expect(newState['todolistId1'][0].startDate).toBe('')
   expect(newState['todolistId1'][0].deadline).toBe('')
   expect(newState['todolistId1'][0].id).toBe('1')
   expect(newState['todolistId1'][0].todoListId).toBe('todolistId1')
   expect(newState['todolistId1'][0].order).toBe(0)
   expect(newState['todolistId1'][0].addedDate).toBe('')
   expect(newState['todolistId1'].length).toBe(3)
   expect(newState['todolistId2'].length).toBe(3)
   expect(newState['todolistId2'][0].status).toBe(TasksStatus.Completed)
});

test('Test taskReducer case CHANGE_TASK_TEXT', () => {
   const action = ChangeTaskText(startTask, 'React')
   const newState = tasksReducer(state, action)

   expect(state).toEqual(state);
   expect(newState['todolistId1'][0].description).toBe('')
   expect(newState['todolistId1'][0].title).toBe('React')
   expect(newState['todolistId1'][0].status).toBe(TasksStatus.Completed)
   expect(newState['todolistId1'][0].priority).toBe(TasksPriorities.Hi)
   expect(newState['todolistId1'][0].startDate).toBe('')
   expect(newState['todolistId1'][0].deadline).toBe('')
   expect(newState['todolistId1'][0].id).toBe('1')
   expect(newState['todolistId1'][0].todoListId).toBe('todolistId1')
   expect(newState['todolistId1'][0].order).toBe(0)
   expect(newState['todolistId1'][0].addedDate).toBe('')
   expect(newState['todolistId1'].length).toBe(3)
   expect(newState['todolistId2'].length).toBe(3)
   expect(newState['todolistId2'][0].title).toBe('Html-Css')
});

test('Test taskReducer case CHANGE_FILTER_TASKS', () => {
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
