import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import {
  EnvironmentType,
} from '@microsoft/sp-client-base';

import styles from './ListData.module.scss';
import * as strings from 'listDataStrings';
import { IListDataWebPartProps } from './IListDataWebPartProps';

export interface ISPList{
  name: string;
  id: string;
}

export interface ISPListItem{
  id: number;
  title: string;
  url?: string;
}

export default class ListDataWebPart extends BaseClientSideWebPart<IListDataWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  private _siteUrl:string = this.context.pageContext.web.absoluteUrl;
  private _formUrl:string = "";

  private _listOptions: IPropertyPaneDropdownOption[] = [];

  protected onInit<T>(): Promise<T> {
    this._GetListDataAsync()
      .then((response) => {
        this._listOptions = response.map((list: ISPList) => {
          return {
            key: list.id,
            text: list.name
          };
        });
      });
      return Promise.resolve();
  }

protected onPropertyChange(propPath:string, newValue:any){
  console.log("Loading from render");
  console.log("Property " + propPath + " changed from " + this.properties[propPath] + " to " + newValue);
  this.properties[propPath] = newValue;
  if(propPath === "ListID"){
    var p = this._getListFormUrl();
    p.then((data:any) => this._loadListItems());
  }else{
    this._loadListItems();
  }
}

public render(): void {
  this.domElement.innerHTML = `
    <div class="${styles.listData}">
      <div class="${styles.container}">
        <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
          <span class="ms-font-xl ms-fontColor-white">Items in your list:</span>
          <div id="spListItemContainer"></div>
        </div>
      </div>
    </div>`;
    this._getListFormUrl().then((data:any) => {
      console.log("Loading from render");
      this._loadListItems();
    });
}

private _getListFormUrl() :Promise<any>{
    return this.context.httpClient
        .get(this._siteUrl + "/_api/web/lists(guid'" + this.properties.ListID + "')/forms?$select=ServerRelativeUrl&$filter=FormType eq 4")
        .then((data:any) => {
            data.json().then((jsonData:any) => {
              console.log(jsonData);
              this._formUrl = jsonData.value[0].ServerRelativeUrl;
            });
        });
}

  private _GetListDataAsync(): Promise<ISPList[]> {
    if (this.context.environment.type === EnvironmentType.Local) {
      // Local environment
      return this._getMockListData();
    } else {
      // sharePoint environment
      return this._getListData();
    }
  }

  private _getMockListData(): Promise<ISPList[]> {
    var items:ISPList[] = [
      {id:"1",name:"Announcements"},
      {id:"2",name:"Calendar"}
    ];
    return new Promise<ISPList[]>(
      (resolve) => {resolve(items);}
    );
  }

  private _getData(): any {
    this.context.httpClient
      .get("https://tommytime.sharepoint.com/sites/spxdev/_api/web/lists/")
      .then((data:any) => {
        console.log(data.statusText);
      });
  }

  private _getListData(): Promise<ISPList[]> {
    this._getData();
    return this.context.httpClient
      .get(this._siteUrl + '/_api/web/lists?$filter=Hidden eq false and BaseType eq 0')//&$select=id,title')
      .then((data: any) => {
        return data.json().then((jsonData:any) => {
          return jsonData.value.map((element) => {
            //console.log(element);
            return {id:element.Id,name:element.Title};
          });
        });
      });
  }



  private _loadListItems():void{
    console.log("loading list items for list '" + this.properties.ListID + "'");
    this._getListItems(this.properties.ListID)
      .then((listItems: ISPListItem[])=>{
        this._renderListItems(listItems);
      });
  }

private _getListItems(listId:string): Promise<ISPListItem[]>{
  return this.context.httpClient
    .get(this._siteUrl + "/_api/web/lists(guid'" + listId + "')/items/?$top=" + this.properties.MaxItems)
    .then((data:any) => {
      var listItems: ISPListItem[] = [];
      return data.json().then((jsonData:any) => {
        console.log(jsonData);
        jsonData.value.forEach(element => {
          listItems.push({
            id:element.Id,
            title:element.Title,
            url: this._formUrl + "?ID=" + element.Id
          });
        });
        return listItems;
      });
    });
}

private _renderListItems(items: ISPListItem[]): void {
    let html: string = '';
    items.forEach((item: ISPListItem) => {
        html += `
        <a href="${item.url}" target="_blank">
          <div class="${styles.listItem}">
            <span class="ms-font-l">${item.id}</span>
            &nbsp;-&nbsp;
            <span class="ms-font-l">${item.title}</span>
          </div>
        </a>
        `;
    });
    const listContainer: Element = this.domElement.querySelector('#spListItemContainer');
    listContainer.innerHTML = html;
}

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneListName
          },
          groups: [
            {
              groupName: strings.ListGroupName,
              groupFields: [
                PropertyPaneDropdown('ListID', {
                  label: strings.ListNamePropertyLabel,
                  options:this._listOptions
                }),
                PropertyPaneSlider('MaxItems', {
                  label: strings.MaxItemsPropertyLabel,
                  min:0,
                  max:20
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
