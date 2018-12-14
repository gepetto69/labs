import * as React from 'react'; 

import 
{ 
  DocumentCard, 
  DocumentCardPreview, 
  DocumentCardActivity, 
  DocumentCardTitle,
  IDocumentCardPreviewImage
} from 'office-ui-fabric-react'; 

export interface IFacilityProps { 
  item?: any; 
}

export default class Facility extends React.Component<IFacilityProps, {}> { 
    public render(): JSX.Element { 
        var imgSrc = this.props.item ? 
            [{
                previewImageSrc: 'http://www.u2u.info/Downloads/SPFx/' + this.props.item.name.toLowerCase() + ".jpg"
            }] : [];
        var ppl = this.props.item ? 
            [{
                name: this.props.item.facilitiesManagerName, 
                profileImageSrc: 'http://www.u2u.info/Downloads/SPFx/avatar-' + this.props.item.facilitiesManagerAlias + '.jpg' 
            }] : [] ;                    
        return ( 
        <DocumentCard> 
            <DocumentCardTitle title={ this.props.item ? this.props.item.name : '' } /> 
            <DocumentCardPreview previewImages={imgSrc}/> 
            <DocumentCardActivity 
                activity='Facility Manager' 
                people={ppl} 
                    /> 
        </DocumentCard> 
        ); 
    }
} 
