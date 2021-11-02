import { api, LightningElement,track,wire } from 'lwc';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class HighlightsPanel extends LightningElement {

    @api
    alignment;
    
    @api
    gridSize;
    
    @api
    recordId;
    
    @api
    fields;

    objectAPIName;
    @track

    accountRecord;
    @track
    apiName

    meta;

    get size(){
        return 12/parseInt(this.gridSize);
    }

    get alignmentClass (){
        return "custom-box slds-box slds-p-around_medium slds-text-align_"+this.alignment;
    }

    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Full'], modes: ['View'] })
    wiredAccount({ data, error }) {
        if (data) {
            this.accountRecord = data;
            this.apiName = {objectApiName: data.apiName};
        } else if (error) {
            this.accountRecord = error;
            this.accountRecord = undefined;
        }
    }
    ;

    @wire(getObjectInfo, { objectApiName:  '$apiName'})
    getObjectMataData({ data, error }) {
        console.log('getObjectMataData',data, error);
        if (data) {
            this.meta = data;
            console.log('meta',this.meta);
        }
    }

    
    get data(){
        let data = [];
        if(this.meta && this.fields && this.accountRecord){
            console.log('1',this.fields,this.accountRecord);
            let fields = this.fields.split(',');
            
            fields.forEach(field => {
                let val = getFieldValue(this.accountRecord, {fieldApiName: field, objectApiName: this.apiName.objectApiName});
                data.push(
                    {  
                       label : this.meta.fields[field].label,
                       value: val,
                       class  : val>= 0? 'green':'red',
                       isCurrency :(this.meta.fields[field].dataType == 'Currency')
                    }
                   
                )
            });
        }
        return data;
    }
}