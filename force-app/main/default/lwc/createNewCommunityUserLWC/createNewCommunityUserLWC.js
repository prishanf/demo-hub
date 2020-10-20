import { LightningElement } from 'lwc';
import saveUser from '@salesforce/apex/CommunityUserController.saveCommunityUser'

export default class CreateNewCommunityUserLWC extends LightningElement {
    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handleSave(){
        const data = { Name:'PPP', Type:'TTT'};
        saveUser({
            userData: JSON.stringify(data),
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error); 
        });
    }
}