import * as React from 'react';

import {css} from 'office-ui-fabric-react';
import styles from '../../ListSitePermissions.module.scss';

import PermissionsHttpService from '../../../../code/PermissionsHttpService';

import { ISPRoleAssignment, ISPUser, MemberType } from '../../../../interfaces/PermissionInterfaces';

export interface IGroupDetailsProps {
    selectedRoleAssignment?: ISPRoleAssignment;
    permissionsHttpService: PermissionsHttpService;
}

export interface IGroupDetailsState {
    users: ISPUser[];
}

export default class GroupList extends React.Component<IGroupDetailsProps,IGroupDetailsState>{
    
    constructor(props:{selectedRoleAssignment:ISPRoleAssignment, permissionsHttpService: PermissionsHttpService}){
        super(props);
        console.log("setting state from constructor");
        this.state = { users:[] };
    }

private componentDidMount() :void{
    console.log("component mounted");
    if(this.props.selectedRoleAssignment){
        this.loadUserData(this.props.selectedRoleAssignment);
    }
}

private componentWillReceiveProps(nextProps:IGroupDetailsProps) :void{        
    console.log("props updated");
    if(nextProps.selectedRoleAssignment){
        this.loadUserData(nextProps.selectedRoleAssignment);
    }else{
        this.state = { users:[] };
    }
}

private loadUserData(roleAssignment:ISPRoleAssignment){
    if(!(roleAssignment.MemberInfo.Type === MemberType.User)){
        this.props.permissionsHttpService.GetGroupMembers(roleAssignment.MemberInfo.Id).then(
            (userData:ISPUser[]) => { 
                this.setState({
                    users: userData
                });                
            }
        );
    }else{
        this.state = { users:[] };
    }
}

    public render():JSX.Element{
        if(this.props.selectedRoleAssignment === undefined || this.props.selectedRoleAssignment.MemberInfo.Type === MemberType.User){
            return <div/>;
        }else{
            //console.log(this.state.users)
            var users = this.state.users.map((user:ISPUser) => 
                <div className={css('ms-Grid-col ms-u-sm11 ms-u-md3 ms-bgColor-themePrimary', styles.element)} key={user.Title}>{user.Title}</div>
            );
            return (
                <div clasName="ms-Grid ms-fontColor-white">
                    <div className="ms-Grid-row ms-u-sm11 ms-font-xl ms-fontColor-themePrimary">Group Members</div>
                    <div className="ms-Grid-row">
                        {users}
                    </div>
                </div>
            );
        }
    }
}