import { gql } from "@apollo/client";
import type * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  timestamptz: { input: string; output: string };
  uuid: { input: string; output: string };
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]["input"]>;
  _gt?: InputMaybe<Scalars["Int"]["input"]>;
  _gte?: InputMaybe<Scalars["Int"]["input"]>;
  _in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]["input"]>;
  _lt?: InputMaybe<Scalars["Int"]["input"]>;
  _lte?: InputMaybe<Scalars["Int"]["input"]>;
  _neq?: InputMaybe<Scalars["Int"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]["input"]>;
  _gt?: InputMaybe<Scalars["String"]["input"]>;
  _gte?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]["input"]>;
  _in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]["input"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]["input"]>;
  _lt?: InputMaybe<Scalars["String"]["input"]>;
  _lte?: InputMaybe<Scalars["String"]["input"]>;
  _neq?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]["input"]>;
};

/** columns and relationships of "boards" */
export type Boards = {
  __typename?: "boards";
  /** An array relationship */
  columns: Array<Columns>;
  created_at: Scalars["timestamptz"]["output"];
  id: Scalars["uuid"]["output"];
  name: Scalars["String"]["output"];
  user_id?: Maybe<Scalars["uuid"]["output"]>;
};

/** columns and relationships of "boards" */
export type BoardsColumnsArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "boards". All fields are combined with a logical 'AND'. */
export type Boards_Bool_Exp = {
  _and?: InputMaybe<Array<Boards_Bool_Exp>>;
  _not?: InputMaybe<Boards_Bool_Exp>;
  _or?: InputMaybe<Array<Boards_Bool_Exp>>;
  columns?: InputMaybe<Columns_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "boards" */
export enum Boards_Constraint {
  /** unique or primary key constraint on columns "id" */
  BoardsPkey = "boards_pkey",
}

/** input type for inserting data into table "boards" */
export type Boards_Insert_Input = {
  columns?: InputMaybe<Columns_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** response of any mutation on the table "boards" */
export type Boards_Mutation_Response = {
  __typename?: "boards_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]["output"];
  /** data from the rows affected by the mutation */
  returning: Array<Boards>;
};

/** input type for inserting object relation for remote table "boards" */
export type Boards_Obj_Rel_Insert_Input = {
  data: Boards_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Boards_On_Conflict>;
};

/** on_conflict condition type for table "boards" */
export type Boards_On_Conflict = {
  constraint: Boards_Constraint;
  update_columns?: Array<Boards_Update_Column>;
  where?: InputMaybe<Boards_Bool_Exp>;
};

/** Ordering options when selecting data from "boards". */
export type Boards_Order_By = {
  columns_aggregate?: InputMaybe<Columns_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: boards */
export type Boards_Pk_Columns_Input = {
  id: Scalars["uuid"]["input"];
};

/** select columns of table "boards" */
export enum Boards_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "boards" */
export type Boards_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** Streaming cursor of the table "boards" */
export type Boards_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Boards_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Boards_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  user_id?: InputMaybe<Scalars["uuid"]["input"]>;
};

/** update columns of table "boards" */
export enum Boards_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

export type Boards_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Boards_Set_Input>;
  /** filter the rows which have to be updated */
  where: Boards_Bool_Exp;
};

/** columns and relationships of "cards" */
export type Cards = {
  __typename?: "cards";
  /** An object relationship */
  column: Columns;
  column_id: Scalars["uuid"]["output"];
  created_at: Scalars["timestamptz"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["uuid"]["output"];
  order?: Maybe<Scalars["Int"]["output"]>;
  title: Scalars["String"]["output"];
  updated_at: Scalars["timestamptz"]["output"];
};

/** order by aggregate values of table "cards" */
export type Cards_Aggregate_Order_By = {
  avg?: InputMaybe<Cards_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Cards_Max_Order_By>;
  min?: InputMaybe<Cards_Min_Order_By>;
  stddev?: InputMaybe<Cards_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Cards_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Cards_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Cards_Sum_Order_By>;
  var_pop?: InputMaybe<Cards_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Cards_Var_Samp_Order_By>;
  variance?: InputMaybe<Cards_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "cards" */
export type Cards_Arr_Rel_Insert_Input = {
  data: Array<Cards_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Cards_On_Conflict>;
};

/** order by avg() on columns of table "cards" */
export type Cards_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "cards". All fields are combined with a logical 'AND'. */
export type Cards_Bool_Exp = {
  _and?: InputMaybe<Array<Cards_Bool_Exp>>;
  _not?: InputMaybe<Cards_Bool_Exp>;
  _or?: InputMaybe<Array<Cards_Bool_Exp>>;
  column?: InputMaybe<Columns_Bool_Exp>;
  column_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "cards" */
export enum Cards_Constraint {
  /** unique or primary key constraint on columns "id" */
  CardsPkey = "cards_pkey",
}

/** input type for incrementing numeric columns in table "cards" */
export type Cards_Inc_Input = {
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

/** input type for inserting data into table "cards" */
export type Cards_Insert_Input = {
  column?: InputMaybe<Columns_Obj_Rel_Insert_Input>;
  column_id?: InputMaybe<Scalars["uuid"]["input"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
};

/** order by max() on columns of table "cards" */
export type Cards_Max_Order_By = {
  column_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "cards" */
export type Cards_Min_Order_By = {
  column_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "cards" */
export type Cards_Mutation_Response = {
  __typename?: "cards_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]["output"];
  /** data from the rows affected by the mutation */
  returning: Array<Cards>;
};

/** on_conflict condition type for table "cards" */
export type Cards_On_Conflict = {
  constraint: Cards_Constraint;
  update_columns?: Array<Cards_Update_Column>;
  where?: InputMaybe<Cards_Bool_Exp>;
};

/** Ordering options when selecting data from "cards". */
export type Cards_Order_By = {
  column?: InputMaybe<Columns_Order_By>;
  column_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cards */
export type Cards_Pk_Columns_Input = {
  id: Scalars["uuid"]["input"];
};

/** select columns of table "cards" */
export enum Cards_Select_Column {
  /** column name */
  ColumnId = "column_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
  /** column name */
  UpdatedAt = "updated_at",
}

/** input type for updating data in table "cards" */
export type Cards_Set_Input = {
  column_id?: InputMaybe<Scalars["uuid"]["input"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
};

/** order by stddev() on columns of table "cards" */
export type Cards_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "cards" */
export type Cards_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "cards" */
export type Cards_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "cards" */
export type Cards_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Cards_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Cards_Stream_Cursor_Value_Input = {
  column_id?: InputMaybe<Scalars["uuid"]["input"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
};

/** order by sum() on columns of table "cards" */
export type Cards_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "cards" */
export enum Cards_Update_Column {
  /** column name */
  ColumnId = "column_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
  /** column name */
  UpdatedAt = "updated_at",
}

export type Cards_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Cards_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Cards_Set_Input>;
  /** filter the rows which have to be updated */
  where: Cards_Bool_Exp;
};

/** order by var_pop() on columns of table "cards" */
export type Cards_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "cards" */
export type Cards_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "cards" */
export type Cards_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "columns" */
export type Columns = {
  __typename?: "columns";
  /** An object relationship */
  board: Boards;
  board_id: Scalars["uuid"]["output"];
  /** An array relationship */
  cards: Array<Cards>;
  created_at: Scalars["timestamptz"]["output"];
  id: Scalars["uuid"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
};

/** columns and relationships of "columns" */
export type ColumnsCardsArgs = {
  distinct_on?: InputMaybe<Array<Cards_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Cards_Order_By>>;
  where?: InputMaybe<Cards_Bool_Exp>;
};

/** order by aggregate values of table "columns" */
export type Columns_Aggregate_Order_By = {
  avg?: InputMaybe<Columns_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Columns_Max_Order_By>;
  min?: InputMaybe<Columns_Min_Order_By>;
  stddev?: InputMaybe<Columns_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Columns_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Columns_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Columns_Sum_Order_By>;
  var_pop?: InputMaybe<Columns_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Columns_Var_Samp_Order_By>;
  variance?: InputMaybe<Columns_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "columns" */
export type Columns_Arr_Rel_Insert_Input = {
  data: Array<Columns_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** order by avg() on columns of table "columns" */
export type Columns_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "columns". All fields are combined with a logical 'AND'. */
export type Columns_Bool_Exp = {
  _and?: InputMaybe<Array<Columns_Bool_Exp>>;
  _not?: InputMaybe<Columns_Bool_Exp>;
  _or?: InputMaybe<Array<Columns_Bool_Exp>>;
  board?: InputMaybe<Boards_Bool_Exp>;
  board_id?: InputMaybe<Uuid_Comparison_Exp>;
  cards?: InputMaybe<Cards_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "columns" */
export enum Columns_Constraint {
  /** unique or primary key constraint on columns "name", "board_id" */
  ColumnsBoardIdNameKey = "columns_board_id_name_key",
  /** unique or primary key constraint on columns "id" */
  ColumnsPkey = "columns_pkey",
}

/** input type for incrementing numeric columns in table "columns" */
export type Columns_Inc_Input = {
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

/** input type for inserting data into table "columns" */
export type Columns_Insert_Input = {
  board?: InputMaybe<Boards_Obj_Rel_Insert_Input>;
  board_id?: InputMaybe<Scalars["uuid"]["input"]>;
  cards?: InputMaybe<Cards_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

/** order by max() on columns of table "columns" */
export type Columns_Max_Order_By = {
  board_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "columns" */
export type Columns_Min_Order_By = {
  board_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "columns" */
export type Columns_Mutation_Response = {
  __typename?: "columns_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]["output"];
  /** data from the rows affected by the mutation */
  returning: Array<Columns>;
};

/** input type for inserting object relation for remote table "columns" */
export type Columns_Obj_Rel_Insert_Input = {
  data: Columns_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** on_conflict condition type for table "columns" */
export type Columns_On_Conflict = {
  constraint: Columns_Constraint;
  update_columns?: Array<Columns_Update_Column>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

/** Ordering options when selecting data from "columns". */
export type Columns_Order_By = {
  board?: InputMaybe<Boards_Order_By>;
  board_id?: InputMaybe<Order_By>;
  cards_aggregate?: InputMaybe<Cards_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
};

/** primary key columns input for table: columns */
export type Columns_Pk_Columns_Input = {
  id: Scalars["uuid"]["input"];
};

/** select columns of table "columns" */
export enum Columns_Select_Column {
  /** column name */
  BoardId = "board_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Order = "order",
}

/** input type for updating data in table "columns" */
export type Columns_Set_Input = {
  board_id?: InputMaybe<Scalars["uuid"]["input"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

/** order by stddev() on columns of table "columns" */
export type Columns_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "columns" */
export type Columns_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "columns" */
export type Columns_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "columns" */
export type Columns_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Columns_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Columns_Stream_Cursor_Value_Input = {
  board_id?: InputMaybe<Scalars["uuid"]["input"]>;
  created_at?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
};

/** order by sum() on columns of table "columns" */
export type Columns_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "columns" */
export enum Columns_Update_Column {
  /** column name */
  BoardId = "board_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Order = "order",
}

export type Columns_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Columns_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Columns_Set_Input>;
  /** filter the rows which have to be updated */
  where: Columns_Bool_Exp;
};

/** order by var_pop() on columns of table "columns" */
export type Columns_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "columns" */
export type Columns_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "columns" */
export type Columns_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "boards" */
  delete_boards?: Maybe<Boards_Mutation_Response>;
  /** delete single row from the table: "boards" */
  delete_boards_by_pk?: Maybe<Boards>;
  /** delete data from the table: "cards" */
  delete_cards?: Maybe<Cards_Mutation_Response>;
  /** delete single row from the table: "cards" */
  delete_cards_by_pk?: Maybe<Cards>;
  /** delete data from the table: "columns" */
  delete_columns?: Maybe<Columns_Mutation_Response>;
  /** delete single row from the table: "columns" */
  delete_columns_by_pk?: Maybe<Columns>;
  /** insert data into the table: "boards" */
  insert_boards?: Maybe<Boards_Mutation_Response>;
  /** insert a single row into the table: "boards" */
  insert_boards_one?: Maybe<Boards>;
  /** insert data into the table: "cards" */
  insert_cards?: Maybe<Cards_Mutation_Response>;
  /** insert a single row into the table: "cards" */
  insert_cards_one?: Maybe<Cards>;
  /** insert data into the table: "columns" */
  insert_columns?: Maybe<Columns_Mutation_Response>;
  /** insert a single row into the table: "columns" */
  insert_columns_one?: Maybe<Columns>;
  /** update data of the table: "boards" */
  update_boards?: Maybe<Boards_Mutation_Response>;
  /** update single row of the table: "boards" */
  update_boards_by_pk?: Maybe<Boards>;
  /** update multiples rows of table: "boards" */
  update_boards_many?: Maybe<Array<Maybe<Boards_Mutation_Response>>>;
  /** update data of the table: "cards" */
  update_cards?: Maybe<Cards_Mutation_Response>;
  /** update single row of the table: "cards" */
  update_cards_by_pk?: Maybe<Cards>;
  /** update multiples rows of table: "cards" */
  update_cards_many?: Maybe<Array<Maybe<Cards_Mutation_Response>>>;
  /** update data of the table: "columns" */
  update_columns?: Maybe<Columns_Mutation_Response>;
  /** update single row of the table: "columns" */
  update_columns_by_pk?: Maybe<Columns>;
  /** update multiples rows of table: "columns" */
  update_columns_many?: Maybe<Array<Maybe<Columns_Mutation_Response>>>;
};

/** mutation root */
export type Mutation_RootDelete_BoardsArgs = {
  where: Boards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Boards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

/** mutation root */
export type Mutation_RootDelete_CardsArgs = {
  where: Cards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Cards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

/** mutation root */
export type Mutation_RootDelete_ColumnsArgs = {
  where: Columns_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Columns_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

/** mutation root */
export type Mutation_RootInsert_BoardsArgs = {
  objects: Array<Boards_Insert_Input>;
  on_conflict?: InputMaybe<Boards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Boards_OneArgs = {
  object: Boards_Insert_Input;
  on_conflict?: InputMaybe<Boards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CardsArgs = {
  objects: Array<Cards_Insert_Input>;
  on_conflict?: InputMaybe<Cards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Cards_OneArgs = {
  object: Cards_Insert_Input;
  on_conflict?: InputMaybe<Cards_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ColumnsArgs = {
  objects: Array<Columns_Insert_Input>;
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Columns_OneArgs = {
  object: Columns_Insert_Input;
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_BoardsArgs = {
  _set?: InputMaybe<Boards_Set_Input>;
  where: Boards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Boards_By_PkArgs = {
  _set?: InputMaybe<Boards_Set_Input>;
  pk_columns: Boards_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Boards_ManyArgs = {
  updates: Array<Boards_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_CardsArgs = {
  _inc?: InputMaybe<Cards_Inc_Input>;
  _set?: InputMaybe<Cards_Set_Input>;
  where: Cards_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Cards_By_PkArgs = {
  _inc?: InputMaybe<Cards_Inc_Input>;
  _set?: InputMaybe<Cards_Set_Input>;
  pk_columns: Cards_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Cards_ManyArgs = {
  updates: Array<Cards_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ColumnsArgs = {
  _inc?: InputMaybe<Columns_Inc_Input>;
  _set?: InputMaybe<Columns_Set_Input>;
  where: Columns_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Columns_By_PkArgs = {
  _inc?: InputMaybe<Columns_Inc_Input>;
  _set?: InputMaybe<Columns_Set_Input>;
  pk_columns: Columns_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Columns_ManyArgs = {
  updates: Array<Columns_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "boards" */
  boards: Array<Boards>;
  /** fetch data from the table: "boards" using primary key columns */
  boards_by_pk?: Maybe<Boards>;
  /** An array relationship */
  cards: Array<Cards>;
  /** fetch data from the table: "cards" using primary key columns */
  cards_by_pk?: Maybe<Cards>;
  /** An array relationship */
  columns: Array<Columns>;
  /** fetch data from the table: "columns" using primary key columns */
  columns_by_pk?: Maybe<Columns>;
};

export type Query_RootBoardsArgs = {
  distinct_on?: InputMaybe<Array<Boards_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Boards_Order_By>>;
  where?: InputMaybe<Boards_Bool_Exp>;
};

export type Query_RootBoards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Query_RootCardsArgs = {
  distinct_on?: InputMaybe<Array<Cards_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Cards_Order_By>>;
  where?: InputMaybe<Cards_Bool_Exp>;
};

export type Query_RootCards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Query_RootColumnsArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Query_RootColumns_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "boards" */
  boards: Array<Boards>;
  /** fetch data from the table: "boards" using primary key columns */
  boards_by_pk?: Maybe<Boards>;
  /** fetch data from the table in a streaming manner: "boards" */
  boards_stream: Array<Boards>;
  /** An array relationship */
  cards: Array<Cards>;
  /** fetch data from the table: "cards" using primary key columns */
  cards_by_pk?: Maybe<Cards>;
  /** fetch data from the table in a streaming manner: "cards" */
  cards_stream: Array<Cards>;
  /** An array relationship */
  columns: Array<Columns>;
  /** fetch data from the table: "columns" using primary key columns */
  columns_by_pk?: Maybe<Columns>;
  /** fetch data from the table in a streaming manner: "columns" */
  columns_stream: Array<Columns>;
};

export type Subscription_RootBoardsArgs = {
  distinct_on?: InputMaybe<Array<Boards_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Boards_Order_By>>;
  where?: InputMaybe<Boards_Bool_Exp>;
};

export type Subscription_RootBoards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Subscription_RootBoards_StreamArgs = {
  batch_size: Scalars["Int"]["input"];
  cursor: Array<InputMaybe<Boards_Stream_Cursor_Input>>;
  where?: InputMaybe<Boards_Bool_Exp>;
};

export type Subscription_RootCardsArgs = {
  distinct_on?: InputMaybe<Array<Cards_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Cards_Order_By>>;
  where?: InputMaybe<Cards_Bool_Exp>;
};

export type Subscription_RootCards_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Subscription_RootCards_StreamArgs = {
  batch_size: Scalars["Int"]["input"];
  cursor: Array<InputMaybe<Cards_Stream_Cursor_Input>>;
  where?: InputMaybe<Cards_Bool_Exp>;
};

export type Subscription_RootColumnsArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Subscription_RootColumns_By_PkArgs = {
  id: Scalars["uuid"]["input"];
};

export type Subscription_RootColumns_StreamArgs = {
  batch_size: Scalars["Int"]["input"];
  cursor: Array<InputMaybe<Columns_Stream_Cursor_Input>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]["input"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]["input"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]["input"]>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]["input"]>;
  _gt?: InputMaybe<Scalars["uuid"]["input"]>;
  _gte?: InputMaybe<Scalars["uuid"]["input"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]["input"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]["input"]>;
  _lt?: InputMaybe<Scalars["uuid"]["input"]>;
  _lte?: InputMaybe<Scalars["uuid"]["input"]>;
  _neq?: InputMaybe<Scalars["uuid"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]["input"]>>;
};

export type BoardsQueryVariables = Exact<{ [key: string]: never }>;

export type BoardsQuery = {
  __typename?: "query_root";
  boards: Array<{ __typename?: "boards"; id: string; name: string }>;
};

export type GetBoardsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBoardsQuery = {
  __typename?: "query_root";
  boards: Array<{ __typename?: "boards"; id: string; name: string }>;
};

export type GetBoardQueryVariables = Exact<{
  id: Scalars["uuid"]["input"];
}>;

export type GetBoardQuery = {
  __typename?: "query_root";
  boards_by_pk?: {
    __typename?: "boards";
    id: string;
    name: string;
    columns: Array<{
      __typename?: "columns";
      id: string;
      name: string;
      order: number;
      cards: Array<{
        __typename?: "cards";
        id: string;
        description?: string | null;
        order?: number | null;
      }>;
    }>;
  } | null;
};

export type InsertBoardMutationVariables = Exact<{
  name: Scalars["String"]["input"];
}>;

export type InsertBoardMutation = {
  __typename?: "mutation_root";
  insert_boards_one?: {
    __typename?: "boards";
    id: string;
    name: string;
  } | null;
};

export type InsertColumnsMutationVariables = Exact<{
  objects: Array<Columns_Insert_Input> | Columns_Insert_Input;
}>;

export type InsertColumnsMutation = {
  __typename?: "mutation_root";
  insert_columns?: {
    __typename?: "columns_mutation_response";
    affected_rows: number;
  } | null;
};

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars["uuid"]["input"];
}>;

export type DeleteBoardMutation = {
  __typename?: "mutation_root";
  delete_boards_by_pk?: { __typename?: "boards"; id: string } | null;
};

export const BoardsDocument = gql`
  query Boards {
    boards {
      id
      name
    }
  }
`;

/**
 * __useBoardsQuery__
 *
 * To run a query within a React component, call `useBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    BoardsQuery,
    BoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<BoardsQuery, BoardsQueryVariables>(
    BoardsDocument,
    options,
  );
}
export function useBoardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    BoardsQuery,
    BoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<BoardsQuery, BoardsQueryVariables>(
    BoardsDocument,
    options,
  );
}
export function useBoardsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        BoardsQuery,
        BoardsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<BoardsQuery, BoardsQueryVariables>(
    BoardsDocument,
    options,
  );
}
export type BoardsQueryHookResult = ReturnType<typeof useBoardsQuery>;
export type BoardsLazyQueryHookResult = ReturnType<typeof useBoardsLazyQuery>;
export type BoardsSuspenseQueryHookResult = ReturnType<
  typeof useBoardsSuspenseQuery
>;
export type BoardsQueryResult = ApolloReactCommon.QueryResult<
  BoardsQuery,
  BoardsQueryVariables
>;
export const GetBoardsDocument = gql`
  query GetBoards {
    boards(where: { user_id: { _eq: "X-Hasura-User-Id" } }) {
      id
      name
    }
  }
`;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    options,
  );
}
export function useGetBoardsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    options,
  );
}
export function useGetBoardsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetBoardsQuery,
        GetBoardsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >(GetBoardsDocument, options);
}
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<
  typeof useGetBoardsLazyQuery
>;
export type GetBoardsSuspenseQueryHookResult = ReturnType<
  typeof useGetBoardsSuspenseQuery
>;
export type GetBoardsQueryResult = ApolloReactCommon.QueryResult<
  GetBoardsQuery,
  GetBoardsQueryVariables
>;
export const GetBoardDocument = gql`
  query GetBoard($id: uuid!) {
    boards_by_pk(id: $id) {
      id
      name
      columns(order_by: { order: asc }) {
        id
        name
        order
        cards(order_by: { order: asc }) {
          id
          description
          order
        }
      }
    }
  }
`;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoardQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetBoardQuery,
    GetBoardQueryVariables
  > &
    ({ variables: GetBoardQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetBoardQuery, GetBoardQueryVariables>(
    GetBoardDocument,
    options,
  );
}
export function useGetBoardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBoardQuery,
    GetBoardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(
    GetBoardDocument,
    options,
  );
}
export function useGetBoardSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetBoardQuery,
        GetBoardQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetBoardQuery,
    GetBoardQueryVariables
  >(GetBoardDocument, options);
}
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<
  typeof useGetBoardLazyQuery
>;
export type GetBoardSuspenseQueryHookResult = ReturnType<
  typeof useGetBoardSuspenseQuery
>;
export type GetBoardQueryResult = ApolloReactCommon.QueryResult<
  GetBoardQuery,
  GetBoardQueryVariables
>;
export const InsertBoardDocument = gql`
  mutation InsertBoard($name: String!) {
    insert_boards_one(object: { name: $name }) {
      id
      name
    }
  }
`;
export type InsertBoardMutationFn = ApolloReactCommon.MutationFunction<
  InsertBoardMutation,
  InsertBoardMutationVariables
>;

/**
 * __useInsertBoardMutation__
 *
 * To run a mutation, you first call `useInsertBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBoardMutation, { data, loading, error }] = useInsertBoardMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInsertBoardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertBoardMutation,
    InsertBoardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    InsertBoardMutation,
    InsertBoardMutationVariables
  >(InsertBoardDocument, options);
}
export type InsertBoardMutationHookResult = ReturnType<
  typeof useInsertBoardMutation
>;
export type InsertBoardMutationResult =
  ApolloReactCommon.MutationResult<InsertBoardMutation>;
export type InsertBoardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertBoardMutation,
  InsertBoardMutationVariables
>;
export const InsertColumnsDocument = gql`
  mutation InsertColumns($objects: [columns_insert_input!]!) {
    insert_columns(objects: $objects) {
      affected_rows
    }
  }
`;
export type InsertColumnsMutationFn = ApolloReactCommon.MutationFunction<
  InsertColumnsMutation,
  InsertColumnsMutationVariables
>;

/**
 * __useInsertColumnsMutation__
 *
 * To run a mutation, you first call `useInsertColumnsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertColumnsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertColumnsMutation, { data, loading, error }] = useInsertColumnsMutation({
 *   variables: {
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useInsertColumnsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertColumnsMutation,
    InsertColumnsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    InsertColumnsMutation,
    InsertColumnsMutationVariables
  >(InsertColumnsDocument, options);
}
export type InsertColumnsMutationHookResult = ReturnType<
  typeof useInsertColumnsMutation
>;
export type InsertColumnsMutationResult =
  ApolloReactCommon.MutationResult<InsertColumnsMutation>;
export type InsertColumnsMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    InsertColumnsMutation,
    InsertColumnsMutationVariables
  >;
export const DeleteBoardDocument = gql`
  mutation DeleteBoard($id: uuid!) {
    delete_boards_by_pk(id: $id) {
      id
    }
  }
`;
export type DeleteBoardMutationFn = ApolloReactCommon.MutationFunction<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteBoardMutation,
    DeleteBoardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteBoardMutation,
    DeleteBoardMutationVariables
  >(DeleteBoardDocument, options);
}
export type DeleteBoardMutationHookResult = ReturnType<
  typeof useDeleteBoardMutation
>;
export type DeleteBoardMutationResult =
  ApolloReactCommon.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;
