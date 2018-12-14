import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import{DetailsList} from 'office-ui-fabric-react';
import{IWebPartContext} from '@microsoft/sp-webpart-base';

import Facility from './Facility';

import styles from '../Facilities.module.scss';
import { IFacilitiesWebPartProps } from '../IFacilitiesWebPartProps';

export interface IFacilitiesProps extends IFacilitiesWebPartProps {
  context:IWebPartContext;
}

export interface IFacilitiesState
{
  items?: any[];
  selectedItem?: any;
}

export default class Facilities extends React.Component<IFacilitiesProps, IFacilitiesState> {
  constructor(props: { context: IWebPartContext, description : string })
  {
    super(props);
    this.state = { items: new Array() };
    var fData = require('../facilities.json');
    this.state.items = fData;  
  }

  public render(): JSX.Element {
    return (
      <div className={styles.facilities}>
        <div className="ms-font-su"> { this.props.description }</div>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6">
              <DetailsList
                items={ this.state.items }
                onItemInvoked={ (item, index) => this.setState( { selectedItem: item } ) }
                onRenderItemColumn={ _renderItemColumn }
                columns={[
                  {
                    key: "status",
                    name: "Status",
                    fieldName: "status",
                    minWidth: 60
                  },
                  {
                    key: "name",
                    name: "Name",
                    fieldName: "name",
                    minWidth: 180
                  }
                ]} />
            </div>
            <div className="ms-Grid-col ms-u-sm6"> 
              <Facility item={this.state.selectedItem}  /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function _renderItemColumn(item, index, column)
{
  const fieldContent = item[column.fieldName];
  switch (column.key)
  {
    case 'status':
      return <div style={ { backgroundColor: fieldContent, borderRadius: "16px", width: "16px", marginLeft: "6px" } }>&nbsp;</div>;
    default:
      return <span>{ fieldContent }</span>;
  }
}
