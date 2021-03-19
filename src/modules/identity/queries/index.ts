import GetUserByIdHandler from './getUser/getUser-by-Id.handler';
import GetUsersAllHandler from './getUsers/getUsers-all.handler';

export { default as GetUserByIdQuery } from './getUser/getUser-by-Id.query';
export { default as GetUsersAllQuery } from './getUsers/getUsers-all.query';
export const AllQueryHandlers = [GetUserByIdHandler, GetUsersAllHandler];
