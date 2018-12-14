import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import ListSitePermissions, { IListSitePermissionsProps } from './components/ListSitePermissions';
import { IListSitePermissionsWebPartProps } from './IListSitePermissionsWebPartProps';

export default class ListSitePermissionsWebPart extends BaseClientSideWebPart<IListSitePermissionsWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IListSitePermissionsProps> = React.createElement(ListSitePermissions, {
      context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {pages:[]};
  }
}
