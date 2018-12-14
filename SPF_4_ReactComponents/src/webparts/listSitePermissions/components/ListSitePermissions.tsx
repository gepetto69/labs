import * as React from 'react';

import styles from '../ListSitePermissions.module.scss';

import { IListSitePermissionsWebPartProps } from '../IListSitePermissionsWebPartProps';

import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

// import { ISPGroupList } from '../interfaces/ISPGroupList';
// import { ISPGroup } from '../interfaces/ISPGroup';

import { ISPPermissionSet, ISPRoleAssignment } from '../../../interfaces/PermissionInterfaces';

import PermissionList from './Permissions/PermissionList';
import GroupDetails from './Permissions/GroupDetails';

import PermissionsHttpService from '../../../code/PermissionsHttpService';

export interface IListSitePermissionsProps extends IListSitePermissionsWebPartProps {
  context: IWebPartContext;
}

export interface IListSitePermissionsState {
  permissionSet?: ISPPermissionSet;
  selectedRoleAssignment?: ISPRoleAssignment;
}

export default class ListSitePermissions extends React.Component<IListSitePermissionsProps, IListSitePermissionsState> {
    
  private  _permissionsHttpService: PermissionsHttpService;
    
  constructor(props:{context:IWebPartContext}){
    super(props);
    //bind events
    this.handleRoleAssignmentSelect = this.handleRoleAssignmentSelect.bind(this);
    //set initial state
    this.state = {permissionSet:{RoleAssignments:[]}};
    //set service
    this._permissionsHttpService = new PermissionsHttpService(this.props.context);
  }

  private componentDidMount() :void{
    this._permissionsHttpService.GetRoleAssigmentData().then(
        (roleAssignments:ISPRoleAssignment[]) => { 
            this.setState({
                permissionSet: {RoleAssignments:roleAssignments}
            });                
        }
    );
  }

  private handleRoleAssignmentSelect(roleAssignment:ISPRoleAssignment): void{
      this.setState({
        selectedRoleAssignment:roleAssignment
      });
  }

  public render(): JSX.Element {
    return (
      <div className={styles.listSitePermissions}>
        <div className={styles.container}>
          <PermissionList permissionSet={this.state.permissionSet} onRoleAssignmentSelect={this.handleRoleAssignmentSelect} />
          <GroupDetails selectedRoleAssignment={this.state.selectedRoleAssignment} permissionsHttpService={this._permissionsHttpService} />        
        </div>
      </div>
    );
  }

}
