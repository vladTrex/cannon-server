import uuid from "uuid";

const todos = [
    {id: 1, title: 'Todo 1', category: 'Daily'},
    {id: 2, title: 'Todo 2', category: 'Business'},
    {id: 3, title: 'Todo 3', category: 'Daily'},
    {id: 4, title: 'Todo 4', category: 'Learning'},
];

export const resolvers = {
    Query: {
        todos: () => {
            return todos;
        },
    },
    Mutation: {
        addTodo: (root, args) => {
            const newId = uuid.v4();
            const newTodo = {id: newId, title: args.title, category: args.category};
            todos.push(newTodo);
            return newTodo;
        },
        removeTodo: (root, args) => {
            todos.filter(item => item.id !== args.id)
            return {success: true};
        }
    },
};