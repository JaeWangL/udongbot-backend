import GetUserByIdHandler from './queries/getUser/getUser-by-Id.handler';
import GetUsersAllHandler from './queries/getUsers/getUsers-all.handler';
import SignInHandler from './commands/signIn/signIn.handler';
import SignInSocialHandler from './commands/signIn/signIn-social.handler';
import SignUpHandler from './commands/signUp/signUp.handler';
import UpdateProfileHandler from './commands/updateProfile/updateProfile.handler';

export { default as GetUserByIdQuery } from './queries/getUser/getUser-by-Id.query';
export { default as GetUsersAllQuery } from './queries/getUsers/getUsers-all.query';
export const AllQueryHandlers = [GetUserByIdHandler, GetUsersAllHandler];

export { default as SignInCommand } from './commands/signIn/signIn.command';
export { default as SignInSocialCommand } from './commands/signIn/signIn-social.command';
export { default as SignUpCommand } from './commands/signUp/signUp.command';
export { default as UpdateProfileCommand } from './commands/updateProfile/updateProfile.command';
export const AllCommandHandlers = [SignInHandler, SignInSocialHandler, SignUpHandler, UpdateProfileHandler];
