import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
} from '@microsoft/sp-client-preview';

//property types import
import {
  IPropertyPaneDropdownOption
} from '@microsoft/sp-client-preview';

import {
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup,
  PropertyPaneButtonType,
  PropertyPaneHorizontalRule,
  PropertyPaneButton,
  PropertyPaneCustomField,
  IPropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-client-preview';

// import{
//   IPropertyPaneFieldType,
//   IOnCustomPropertyFieldChanged
// }from '@microsoft/sp-client-platform';

import styles from './MyFirstWebPart.module.scss';
import * as strings from 'myFirstWebPartStrings';
import { IMyFirstWebPartWebPartProps } from './IMyFirstWebPartWebPartProps';



export default class MyFirstWebPartWebPart extends BaseClientSideWebPart<IMyFirstWebPartWebPartProps> {

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public constructor(context: IWebPartContext) {
    super(context);
  }

  private _customFieldRender(elem: HTMLElement, context: any): void {
      var listName = this.properties.ListName;
      elem.innerHTML = '<input id="password" type="password" name="password" class="ms-TextField-field">';
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.myFirstWebPart}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneTextField:${this.properties.ListName}</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneCheckbox:${this.properties.Refresh}</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneLabel:${this.properties.DisplayType}</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneLabel:${this.properties.MyButton}</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneLabel:${typeof this.properties.Password}</p>
              <p class="ms-font-l ms-fontColor-white">PropertyPaneLabel:${this.properties.Password}</p>
              <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                <span class="ms-Button-label">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: "U2U Settings"
          },
          groups: [
            {
              groupName: "List Settings",
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: "List Name"
                }),
                PropertyPaneCheckbox('Refresh', {
                  text: "Refresh Data"
                }),
                {
                  type: IPropertyPaneFieldType.Custom,
                  targetProperty: 'Password',
                  properties: {
                    onRender: this._customFieldRender.bind(this),
                    value: undefined,
                    context: undefined
                  }
                }
              ]
            }
          ]
        },
        {
          header: {
            description: "Extra Settings"
          },
          groups: [
            {
              groupName: "Visual Settings",
              groupFields: [
                  PropertyPaneDropdown('DisplayType', {
                    label: "Dropdown",
                    options: this.fetchOptionsSimple()
                    // options: [
                    //   {
                    //     key:0,
                    //     text:"List",
                    //     isSelected:true
                    //   },
                    //   {
                    //     key:1,
                    //     text:"Table"
                    //   }
                    // ]
                  }),PropertyPaneSlider('value_slider', {


                  min:0,
                  max:10
                }),
                   PropertyPaneLink('value_link', {
                  text: "u2u.be",
                  href: "http://www.u2u.be"
                }),PropertyPaneToggle('value_toggle', {
                  label: "Toggle"
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  private _listsInThisSite: IPropertyPaneDropdownOption[] = [];

  private fetchOptionsSimple(): Array<IPropertyPaneDropdownOption> {
    var options = new Array<IPropertyPaneDropdownOption>();
    options.push( { key: 'Added1', text: 'Added from code 1' });
    options.push( { key: 'Added2', text: 'Added from code 2' });
    return options;
  }




  // protected get propertyPaneSettings(): IPropertyPaneSettings {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('value_textfield', {
  //                 label: strings.DescriptionFieldLabel
  //               }),
  //               PropertyPaneCheckbox('value_checkbox', {
  //                 text: "lunch?"
  //               }),
  //               PropertyPaneLabel('value_label', {
  //                 text: strings.DescriptionFieldLabel
  //               }),
  //               PropertyPaneLink('value_link', {
  //                 text: "u2u.be",
  //                 href: "http://www.u2u.be"
  //               })
  //             ]
  //           },
  //           {
  //             groupName: "MyGroup",
  //             groupFields: [
  //               PropertyPaneSlider('value_slider', {
  //                 label:"Items To Get",
  //                 value:5,
  //                 step:1,
  //                 min:0,
  //                 max:10
  //               }),
  //               PropertyPaneToggle('value_toggle', {
  //                 label: "Toggle"
  //               }),
  //               PropertyPaneHorizontalRule(),
  //               PropertyPaneDropdown('value_dropdown', {
  //                 label: "Dropdown",
  //                 options: [
  //                   {
  //                     key:0,
  //                     text:"salad",
  //                     isSelected:true
  //                   },
  //                   {
  //                     key:1,
  //                     text:"pasta"
  //                   },
  //                   {
  //                     key:2,
  //                     text:"steak"
  //                   }
  //                 ]
  //               }),
  //               PropertyPaneChoiceGroup('value_choice', {
  //                 label: "Lunch Type",

  //                 options: [
  //                   {
  //                     key:0,
  //                     text:"salad",
  //                     isChecked:true
  //                   },
  //                   {
  //                     key:1,
  //                     text:"pasta"
  //                   },
  //                   {
  //                     key:2,
  //                     text:"steak"
  //                   }
  //                 ]
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
}
