/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateTaskArgs } from "./CreateTaskArgs";
import { UpdateTaskArgs } from "./UpdateTaskArgs";
import { DeleteTaskArgs } from "./DeleteTaskArgs";
import { TaskFindManyArgs } from "./TaskFindManyArgs";
import { TaskFindUniqueArgs } from "./TaskFindUniqueArgs";
import { Task } from "./Task";
import { User } from "../../user/base/User";
import { TaskService } from "../task.service";

@graphql.Resolver(() => Task)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TaskResolverBase {
  constructor(
    protected readonly service: TaskService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  async _tasksMeta(
    @graphql.Args() args: TaskFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Task])
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  async tasks(@graphql.Args() args: TaskFindManyArgs): Promise<Task[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Task, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "own",
  })
  async task(@graphql.Args() args: TaskFindUniqueArgs): Promise<Task | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "create",
    possession: "any",
  })
  async createTask(@graphql.Args() args: CreateTaskArgs): Promise<Task> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        uid: {
          connect: args.data.uid,
        },
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "update",
    possession: "any",
  })
  async updateTask(@graphql.Args() args: UpdateTaskArgs): Promise<Task | null> {
    try {
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          uid: {
            connect: args.data.uid,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "delete",
    possession: "any",
  })
  async deleteTask(@graphql.Args() args: DeleteTaskArgs): Promise<Task | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async uid(@graphql.Parent() parent: Task): Promise<User | null> {
    const result = await this.service.getUid(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
