import { 
    ISPRoleAssignment, 
    ISPMemberInfo, 
    MemberType, 
    ISPRoleDefinitionBindings,
    ISPUser
} from '../interfaces/PermissionInterfaces';

import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

export default class PermissionsHttpService {

    constructor(context:IWebPartContext){
        this._context = context;
    }

    private _context: IWebPartContext;

    public GetGroupMembers(groupId:number): Promise<ISPUser[]> {
        return this._context.httpClient
            .get(this._context.pageContext.web.serverRelativeUrl + "/_api/Web/sitegroups/getbyid(" + groupId + ")/users")
            .then(data => data.json())
            .then(jsonData => {
                return jsonData.value.map((UserInfo) =>{
                    return {
                        Title: UserInfo.Title
                    };
                });
            });
    }

    public GetRoleAssigmentData(): Promise<ISPRoleAssignment[]>{
        var roleAssignmentData: ISPRoleAssignment[];
        return this.GetRoleAssignments()
            //for all role assignments, create a new Promise
            //store the promises in a collection and pass them on
            .then((roleData:ISPRoleAssignment[]) => {
                roleAssignmentData = roleData;
                var memberInfoPms = roleData.map((roleItem) => this.GetMemberInfo(roleItem.PrincipalId));
                var results = Promise.all(memberInfoPms);
                return results;
            })
            //when the member promises have completed, map the data
            //create a new promise collection for role bindings
            .then((memberInfo:ISPMemberInfo[]) => {
                roleAssignmentData = roleAssignmentData.map((ra) => {
                    ra.MemberInfo = memberInfo.filter(m => m.PrincipalId === ra.PrincipalId)[0];
                    return ra;
                });
                var roleDefInfoPms = roleAssignmentData.map((roleItem) => this.GetRoleDefinitionInfo(roleItem.PrincipalId));
                var results = Promise.all(roleDefInfoPms);
                return results;
            })
            //when second collection complete map the data
            //return the mapped data collection
            .then((roleDefInfo:ISPRoleDefinitionBindings[]) => {
                roleAssignmentData = roleAssignmentData.map((ra) => {
                    ra.RoleDefinitionBindings = roleDefInfo.filter(m => m.PrincipalId === ra.PrincipalId)[0];
                    return ra;
                });
                console.log(roleAssignmentData);
                //roleAssignmentData.forEach(el => console.log("Links:" + el.MemberInfo.Title.indexOf("SharingLinks.")))
                roleAssignmentData = roleAssignmentData.filter(e => e.MemberInfo.Title.indexOf("SharingLinks.") == -1);
                return roleAssignmentData;
            });
    }

    private GetRoleAssignments(): Promise<ISPRoleAssignment[]>{
        return this._context.httpClient
            .get(this._context.pageContext.web.serverRelativeUrl + "/_api/Web/roleassignments/")
            .then(data => data.json())
            .then(jsonData => {
                return jsonData.value.map((RoleAssignment) => {
                    return {
                        PrincipalId :RoleAssignment.PrincipalId,
                    };
                });
            });
    }

    private GetMemberInfo(PrincipalId:number): Promise<ISPMemberInfo>{
        return this._context.httpClient
            .get(this._context.pageContext.web.serverRelativeUrl + "/_api/Web/roleassignments/getbyprincipalid(" + PrincipalId + ")/member")
            .then(data => data.json())
            .then(jsonData => {
                return{
                    PrincipalId: PrincipalId,
                    Id: jsonData.Id,
                    Title: jsonData.Title,
                    Type: jsonData.PrincipalType === 8 ? MemberType.Group : MemberType.User
                };
            });
    }

    private GetRoleDefinitionInfo(PrincipalId:number): Promise<ISPRoleDefinitionBindings>{
        return this._context.httpClient
            .get(this._context.pageContext.web.serverRelativeUrl + "/_api/Web/roleassignments/getbyprincipalid(" + PrincipalId + ")/roledefinitionbindings")
            .then(data => data.json())
            .then(jsonData => {
                return jsonData.value.map(element => {
                    return{
                        Id: element.Id,
                        Name: element.Name
                    };
                });                
            }).then((roleBindingData) => {
                return {
                    PrincipalId: PrincipalId,
                    Roles: roleBindingData
                };
            });
    }

    // public GetGroups(): Promise<ISPGroupList>{
    //     return this._context.httpClient
    //         .get(this._context.pageContext.web.serverRelativeUrl + "/_api/Web/roleassignments/groups/")
    //         .then((response:Response):Promise<{ value: any[] }> => {
    //             return response.json();
    //         })
    //         .then((data: {value: any[]}) => {
    //             //console.log(data.value);
    //             //return ISPGroupList object
    //             return {
    //                 //set groups property
    //                 groups: data.value.map((groupItem) => { 
    //                     return {
    //                         Id:groupItem.Id,
    //                         Title:groupItem.Title,
    //                         Description:groupItem.Description,
    //                         Owner:groupItem.OwnerTitle
    //                     };
    //                 })
    //             };
    //         });
    // }

}