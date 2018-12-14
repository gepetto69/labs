declare interface IMyFirstWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'myFirstWebPartStrings' {
  const strings: IMyFirstWebPartStrings;
  export = strings;
}
