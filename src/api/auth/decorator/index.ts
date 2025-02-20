import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: string[]) =>
  SetMetadata('roles', roles);
