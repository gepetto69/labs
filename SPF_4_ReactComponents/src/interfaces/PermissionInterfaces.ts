export enum MemberType{
    Group,
    User
}

export interface ISPUser{
    Title:string;
}

export interface ISPMemberInfo{
    PrincipalId:number;
    Id:number;
    Title:string;
    Type:MemberType;
}

export interface ISPRoleDefinitionBindings{
    PrincipalId:number;
    Roles: ISPRoleDefinitionBinding[];
}

export interface ISPRoleDefinitionBinding{
    Id:number;
    Name:string;
}

export interface ISPRoleAssignment{
    PrincipalId:number;
    MemberInfo?:ISPMemberInfo;
    RoleDefinitionBindings?:ISPRoleDefinitionBindings;
}

export interface ISPPermissionSet{
    RoleAssignments: ISPRoleAssignment[];
}