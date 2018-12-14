import * as React from 'react';
import {css} from 'office-ui-fabric-react';
import styles from '../../ListSitePermissions.module.scss';

import { ISPPermissionSet, ISPRoleAssignment, MemberType } from '../../../../interfaces/PermissionInterfaces';

export interface IPermissionListProps {
    permissionSet: ISPPermissionSet;
    onRoleAssignmentSelect:any;
}

export default class PermissionList extends React.Component<IPermissionListProps,{}>{

    // constructor(props: {permissionSet:ISPPermissionSet,onRoleAssignmentSelect: EventListener}){
    //     super(props);
    //     //this.selectGroup = this.selectGroup.bind(this);
    // }
    
private selectRoleAssignment(role:ISPRoleAssignment, event): void{
    //console.log("clicked group: " + group.Id)
    this.props.onRoleAssignmentSelect(role);
}

    public render(): JSX.Element {
        //console.log("rendering");
        var roles = this.props.permissionSet.RoleAssignments.map(
            (roleAss:ISPRoleAssignment) => {
                //var typeString = roleAss.MemberInfo.Type === MemberType.User ? "User" : "Group";
                // <div className={css('ms-Grid-col ms-u-sm11 ms-u-md3 ms-bgColor-themePrimary', styles.element)} >{typeString}</div> 
                var typeString =  roleAss.MemberInfo.Type === MemberType.User ?
                    <i className={css('ms-Icon ms-Icon--Contact', styles.icon)}></i> :
                    <i className={css('ms-Icon ms-Icon--Group', styles.icon)}></i> ;
                var roleBindingsHTML = roleAss.RoleDefinitionBindings.Roles.map(element => 
                    <span className={styles.inline} key={element.Id}>{element.Name}</span>
                );
                return (
                    <div className={css('ms-Grid-row', styles.row)} role="row" key={roleAss.PrincipalId} onClick={this.selectRoleAssignment.bind(this, roleAss)}>
                        <div className={css('ms-Grid-col ms-u-sm11 ms-u-lg5 ms-bgColor-themePrimary', styles.element)} >{typeString}{roleAss.MemberInfo.Title}</div>
                        <div className={css('ms-Grid-col ms-u-sm11 ms-u-lg6 ms-bgColor-themePrimary', styles.element)} >{roleBindingsHTML}</div>
                    </div>
                );                    
            }                
        );
        return ( 
            <div clasName="ms-Grid ms-fontColor-white">
                <div className="ms-Grid-row ms-font-xl ms-fontColor-themePrimary">Who has access to this site?</div>
                {roles}
            </div>
        );
    }
}