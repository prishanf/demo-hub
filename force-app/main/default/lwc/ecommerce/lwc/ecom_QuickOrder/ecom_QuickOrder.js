import { LightningElement,track } from 'lwc';

export default class Ecom_QuickOrder extends LightningElement {

    myRecordId = '132';

    @track
    orderItems = [{key:1,name:"sku1",quantity:"q1"}];
    
    @track
    orderData = new Map();


    handleAddMore(){
        console.log("handleAddMore");
        let nextKey = this.orderItems.length+1;
        this.orderItems.push({key:nextKey,name:'sku'+nextKey,quantity:'q'+nextKey});
    }
    onInputValueChange(event){
        let row = event.target.dataset.row;
        if(this.orderData.has(row)){
            let rowItem = this.orderData.get(row); 
            rowItem[event.target.name] = event.target.value;
        }else{
            let name =event.target.name;
            this.orderData.set(row,{name: event.target.value});
        }
        console.log(this.orderData);
    }

    handleClick(){
        for (let dataItem of this.orderData.values()) {
            console.log(dataItem);
        }
        
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        console.log("No. of files uploaded : " + uploadedFiles.length);
    }

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

}