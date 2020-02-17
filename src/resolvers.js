import uuid from "uuid";
import remove from 'lodash/remove';

const todos = [
    {id: uuid.v4(), title: 'Todo 1', category: 'Daily'},
    {id: uuid.v4(), title: 'Todo 2', category: 'Business'},
    {id: uuid.v4(), title: 'Todo 3', category: 'Daily'},
    {id: uuid.v4(), title: 'Todo 4', category: 'Learning'},
];

export const resolvers = {
    Query: {
        todos: () => {
            return todos;
        },
        todo: (root, args) => {
            const {id} = args;
            return todos[0];
        },
        helloTwo: () => 'Real Hello'
    },
    Mutation: {
        addTodo: (root, args) => {
            const newId = uuid.v4();
            const newTodo = {id: newId, title: args.title, category: args.category};
            todos.push(newTodo);
            return newTodo;
        },
        removeTodo: (_, args) => {
            const {todoId} = args;

            remove(todos, function(item){
                return item.id === todoId;
            });
            return {success: true};
        }
    },
};