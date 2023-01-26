const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLEnumType,
} = require("graphql");

const Client = require("../models/Client");
const Project = require("../models/Project");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
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
  name: "Mutation",
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
        const client = new Client({
          name,
          email,
          phone,
        });

        return client.save();
      },
    },

    // Remove a Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Client.findByIdAndDelete(id);
      },
    },

    // Add a Project
    addProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const {
          name, description, status, clientId,
        } = args;
        const project = new Project({
          name, description, status, clientId,
        });

        project.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
