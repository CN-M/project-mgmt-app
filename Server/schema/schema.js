const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLEnumType,
} = require('graphql');

const Client = require('../models/Client');
const Project = require('../models/Project');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        const { clientId } = parent;
        return Client.findById(clientId);
      },
    },
  }),
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // Get All Clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find({});
      },
    },

    // Get Single Client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        const { id } = args;
        return Client.findById(id);
      },
    },

    // Get All Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },

    // Get Single Project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        const { id } = args;
        return Project.findById(id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a Client
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, email, phone } = args;
        return new Client({
          name,
          email,
          phone,
        }).save();
      },
    },

    // Remove a Client & All Their Projects
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        Project.find({ clientId: id }).then((projects) => {
          projects.forEach((project) => project.remove());
        });

        // const projects = Project.find({ clientId: id });
        // projects.forEach((project) => project.remove());

        return Client.findByIdAndDelete(id);
      },
    },

    // Add a Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const {
          name, description, status, clientId,
        } = args;

        return new Project({
          name, description, status, clientId,
        }).save();
      },
    },

    // Remove a Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Project.findByIdAndDelete(id);
      },
    },

    // Update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
        clientId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const {
          id, name, description, status, clientId,
        } = args;
        return Project.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              status,
              clientId,
            },
          },
          { new: true },
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
