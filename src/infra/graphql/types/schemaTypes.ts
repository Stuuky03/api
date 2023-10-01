/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
}

export interface NexusGenObjects {
  BadgeInfo: { // root type
    description: string; // String!
    id: string; // ID!
    imageUrl: string; // String!
    name: string; // String!
  }
  Course: { // root type
    description: string; // String!
    name: string; // ID!
  }
  Mutation: {};
  Query: {};
  Question: { // root type
    content: string; // String!
    courseId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isDraft: boolean; // Boolean!
    studentId: string; // String!
    title: string; // String!
  }
  Reference: { // root type
    id: string; // ID!
    stuukeId: string; // String!
    title: string; // String!
    url: string; // String!
  }
  Student: { // root type
    badgesCount: number; // Int!
    bio: string; // String!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    leaderBoardPosition: number; // Int!
    password: string; // String!
    questionsCount: number; // Int!
    stuukesCount: number; // Int!
    username: string; // String!
  }
  StudentBadge: { // root type
    badgeId: string; // String!
    earnedAt: NexusGenScalars['DateTime']; // DateTime!
    studentId: string; // String!
  }
  Stuuke: { // root type
    content: string; // String!
    courseId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isDraft: boolean; // Boolean!
    questionId: string; // String!
    studentId: string; // String!
    title: string; // String!
  }
  Tag: { // root type
    description: string; // String!
    name: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  BadgeInfo: { // field return type
    description: string; // String!
    id: string; // ID!
    imageUrl: string; // String!
    name: string; // String!
  }
  Course: { // field return type
    description: string; // String!
    name: string; // ID!
  }
  Mutation: { // field return type
    question: NexusGenRootTypes['Question'] | null; // Question
  }
  Query: { // field return type
    allStudents: Array<NexusGenRootTypes['Student'] | null> | null; // [Student]
    questionById: NexusGenRootTypes['Question'] | null; // Question
    questionFeed: NexusGenRootTypes['Question'][]; // [Question!]!
    stuukeFeed: NexusGenRootTypes['Stuuke'][]; // [Stuuke!]!
  }
  Question: { // field return type
    content: string; // String!
    course: NexusGenRootTypes['Course']; // Course!
    courseId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isDraft: boolean; // Boolean!
    student: NexusGenRootTypes['Student']; // Student!
    studentId: string; // String!
    stuukes: NexusGenRootTypes['Stuuke'][]; // [Stuuke!]!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
  }
  Reference: { // field return type
    id: string; // ID!
    stuuke: NexusGenRootTypes['Stuuke']; // Stuuke!
    stuukeId: string; // String!
    title: string; // String!
    url: string; // String!
  }
  Student: { // field return type
    badges: NexusGenRootTypes['StudentBadge'][]; // [StudentBadge!]!
    badgesCount: number; // Int!
    bio: string; // String!
    courses: NexusGenRootTypes['Course']; // Course!
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
    leaderBoardPosition: number; // Int!
    password: string; // String!
    questions: NexusGenRootTypes['Question'][]; // [Question!]!
    questionsCount: number; // Int!
    stuukes: NexusGenRootTypes['Stuuke'][]; // [Stuuke!]!
    stuukesCount: number; // Int!
    username: string; // String!
  }
  StudentBadge: { // field return type
    badgeId: string; // String!
    badgeInfo: NexusGenRootTypes['BadgeInfo'] | null; // BadgeInfo
    earnedAt: NexusGenScalars['DateTime']; // DateTime!
    student: NexusGenRootTypes['Student'] | null; // Student
    studentId: string; // String!
  }
  Stuuke: { // field return type
    content: string; // String!
    course: NexusGenRootTypes['Course']; // Course!
    courseId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isDraft: boolean; // Boolean!
    question: NexusGenRootTypes['Question']; // Question!
    questionId: string; // String!
    references: NexusGenRootTypes['Reference'][]; // [Reference!]!
    student: NexusGenRootTypes['Student']; // Student!
    studentId: string; // String!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
  }
  Tag: { // field return type
    description: string; // String!
    name: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  BadgeInfo: { // field return type name
    description: 'String'
    id: 'ID'
    imageUrl: 'String'
    name: 'String'
  }
  Course: { // field return type name
    description: 'String'
    name: 'ID'
  }
  Mutation: { // field return type name
    question: 'Question'
  }
  Query: { // field return type name
    allStudents: 'Student'
    questionById: 'Question'
    questionFeed: 'Question'
    stuukeFeed: 'Stuuke'
  }
  Question: { // field return type name
    content: 'String'
    course: 'Course'
    courseId: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    isDraft: 'Boolean'
    student: 'Student'
    studentId: 'String'
    stuukes: 'Stuuke'
    tags: 'Tag'
    title: 'String'
  }
  Reference: { // field return type name
    id: 'ID'
    stuuke: 'Stuuke'
    stuukeId: 'String'
    title: 'String'
    url: 'String'
  }
  Student: { // field return type name
    badges: 'StudentBadge'
    badgesCount: 'Int'
    bio: 'String'
    courses: 'Course'
    email: 'String'
    firstName: 'String'
    id: 'ID'
    lastName: 'String'
    leaderBoardPosition: 'Int'
    password: 'String'
    questions: 'Question'
    questionsCount: 'Int'
    stuukes: 'Stuuke'
    stuukesCount: 'Int'
    username: 'String'
  }
  StudentBadge: { // field return type name
    badgeId: 'String'
    badgeInfo: 'BadgeInfo'
    earnedAt: 'DateTime'
    student: 'Student'
    studentId: 'String'
  }
  Stuuke: { // field return type name
    content: 'String'
    course: 'Course'
    courseId: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    isDraft: 'Boolean'
    question: 'Question'
    questionId: 'String'
    references: 'Reference'
    student: 'Student'
    studentId: 'String'
    tags: 'Tag'
    title: 'String'
  }
  Tag: { // field return type name
    description: 'String'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    questionById: { // args
      id?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}