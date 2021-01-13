// import { GraphQLObjectType } from 'graphql';
const { GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

// Company Type
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    summary: { type: GraphQLString },
    founded: { type: GraphQLInt },
    founder: { type: GraphQLString },
    employees: { type: GraphQLInt },
    headquarters: { type: HeadquartersType },
    links: { type: CompanyLinksType }
  })
});

// Headquarters Type
const HeadquartersType = new GraphQLObjectType({
  name: 'Headquarters',
  fields: () => ({
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString }
  })
});

// CompanyLinks Type
const CompanyLinksType = new GraphQLObjectType({
  name: 'CompanyLinks',
  fields: () => ({
    website: { type: GraphQLString },
    twitter: { type: GraphQLString },
  })
});

// Crew Type
const CrewType = new GraphQLObjectType({
  name: 'Crew',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    image: { type: GraphQLString },
    agency: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    launches: { type: GraphQLList(GraphQLString) } 
  })
});

// ? Paginated Crew Type
const PaginatedCrewType = new GraphQLObjectType({
  name: 'PaginatedCrew',
  fields: () => ({
    docs: { type: GraphQLList(CrewType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

// ? Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean || null },
    rocket: { type: GraphQLString },
    launchpad: { type: GraphQLString },
    links: { type: LaunchLinksType }
  })
});

// ? Paginated Launch Type
const PaginatedLaunchType = new GraphQLObjectType({
  name: 'PaginatedLaunch',
  fields: () => ({
    docs: { type: GraphQLList(LaunchType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

// LaunchLink Type
const LaunchLinksType = new GraphQLObjectType({
  name: 'LaunchLinks',
  fields: () => ({
    article: { type: GraphQLString },
    webcast: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    description: { type: GraphQLString },    
    first_flight: { type: GraphQLString },
    height: { type: HeightType },
    diameter: { type: DiameterType },
    mass: { type: MassType },
    success_rate_pct: { type: GraphQLInt },     
    stages: { type: GraphQLInt },     
    boosters: { type: GraphQLInt },
    flickr_images: { type: GraphQLList(GraphQLString) },
    wikipedia: { type: GraphQLString }     
  })
});

// ? Paginated Rocket Type
const PaginatedRocketType = new GraphQLObjectType({
  name: 'PaginatedRocket',
  fields: () => ({
    docs: { type: GraphQLList(RocketType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

const HeightType = new GraphQLObjectType({
  name: "Height",
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat }
  })
})

const DiameterType = new GraphQLObjectType({
  name: "Diameter",
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat }
  })
})

const MassType = new GraphQLObjectType({
  name: "Mass",
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt }
  })
})

// Capsule Type
const CapsuleType = new GraphQLObjectType({
  name: 'Capsule',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    serial: { type: GraphQLString },    
    status: { type: GraphQLString },
    last_update: { type: GraphQLString },
    land_landings: { type: GraphQLInt },
    water_landings: { type: GraphQLInt },
    reuse_count: { type: GraphQLInt },
    launches: { type: GraphQLList(GraphQLString) }     
  })
});

// ? Paginated Capsule Type
const PaginatedCapsuleType = new GraphQLObjectType({
  name: 'PaginatedCapsule',
  fields: () => ({
    docs: { type: GraphQLList(CapsuleType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

// Launch Pad Type
const LaunchPadType = new GraphQLObjectType({
  name: 'LaunchPad',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    full_name: { type: GraphQLString },
    details: { type: GraphQLString },
    status: { type: GraphQLString },
    locality: { type: GraphQLString },
    region: { type: GraphQLString },
    launches: { type: GraphQLList(GraphQLString) },
    rockets: { type: GraphQLList(GraphQLString) },
    launch_attempts: { type: GraphQLInt },
    launch_successes: { type: GraphQLInt }
  })
});

// ? Paginated Launchpad Type
const PaginatedLaunchPadType = new GraphQLObjectType({
  name: 'PaginatedLaunchPad',
  fields: () => ({
    docs: { type: GraphQLList(LaunchPadType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

// Land Pad Type
const LandPadType = new GraphQLObjectType({
  name: 'LandPad',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    full_name: { type: GraphQLString },
    details: { type: GraphQLString },
    status: { type: GraphQLString },
    locality: { type: GraphQLString },
    region: { type: GraphQLString },
    launches: { type: GraphQLList(GraphQLString) },
    landing_attempts: { type: GraphQLInt },
    landing_successes: { type: GraphQLInt },
    wikipedia: { type: GraphQLString }
  })
});

// ? Paginated Landpad Type
const PaginatedLandPadType = new GraphQLObjectType({
  name: 'PaginatedLandPad',
  fields: () => ({
    docs: { type: GraphQLList(LandPadType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/company')
          .then(res => res.data);
      }
    },
    launchesSummary: {
      type: GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/launches')
          .then(res => res.data);
      }
    },
    rocketsSummary: {
      type: GraphQLList(RocketType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/rockets')
          .then(res => res.data);
      }
    },
    capsulesSummary: {
      type: GraphQLList(CapsuleType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/capsules')
          .then(res => res.data);
      }
    },
    launchpadsSummary: {
      type: GraphQLList(LaunchPadType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/launchpads')
          .then(res => res.data);
      }
    },
    landpadsSummary: {
      type: GraphQLList(LandPadType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/landpads')
          .then(res => res.data);
      }
    },
    crewsSummary: {
      type: GraphQLList(CrewType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/crew')
          .then(res => res.data);
      }
    },
    launches: {
      type: PaginatedLaunchType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "flight_number": "desc"
              },
              "page": args.page,
              "limit": args.limit,
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/launches/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    launch: {
      type: LaunchType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: PaginatedRocketType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "active": "desc"
              },
              "page": args.page,
              "limit": args.limit,
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/rockets/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then(res => res.data);
      }
    },
    capsules: {
      type: PaginatedCapsuleType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "status": "asc"
              },
              "page": args.page,
              "limit": args.limit,
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/capsules/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    capsule: {
      type: CapsuleType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/capsules/${args.id}`)
          .then(res => res.data);
      }
    },
    launchpads: {
      type: PaginatedLaunchPadType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "status": "asc"
              },
              "page": args.page,
              "limit": args.limit
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/launchpads/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    launchpad: {
      type: LaunchPadType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/launchpads/${args.id}`)
          .then(res => res.data);
      }
    },
    landpads: {
      type: PaginatedLandPadType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "status": "asc"
              },
              "page": args.page,
              "limit": args.limit,
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/landpads/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    landpad: {
      type: LandPadType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/landpads/${args.id}`)
          .then(res => res.data);
      }
    },
    crews: {
      type: PaginatedCrewType,
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const query = {
          "query": { },
          "options": {
              "sort": { 
                "name": "asc"
              },
              "page": args.page,
              "limit": args.limit,
          }
        };
        
        return axios.post('https://api.spacexdata.com/v4/crew/query', query)
          .then(res => {
            return res.data;
          });
      }
    },
    crew: {
      type: CrewType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/crew/${args.id}`)
          .then(res => res.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});