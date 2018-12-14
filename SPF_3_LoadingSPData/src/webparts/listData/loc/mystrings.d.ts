declare interface IListDataStrings {
  PropertyPaneListName: string;
  ListGroupName: string;
  ListNamePropertyLabel: string;
  MaxItemsPropertyLabel: string;
}

declare module 'listDataStrings' {
  const strings: IListDataStrings;
  export = strings;
}
