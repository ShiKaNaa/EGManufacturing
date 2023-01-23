import { LightningElement, track, api, wire } from 'lwc';
import getOppt from '@salesforce/apex/OpportunitySearchFromAccount.getOppt';
import { NavigationMixin } from 'lightning/navigation';

export default class OpportunitySearch extends NavigationMixin(LightningElement) {
    @api recordId;

    // repasser cet api en @wire
    @api foundOppt;

    textValue = " ";

    handleSearchText(event) {
        this.textValue = event.detail.value;
    }

    searchOpptFromAccount() {
        getOppt({searchText: this.textValue, accountID: this.recordId})
            .then(result => {
                this.foundOppt = this.addSlashToId(result);
            })
            .catch(error => {
                this.foundOppt = null;
            });
    }

    addSlashToId(foundOpptWithoutSlashToId) {
        foundOpptWithoutSlashToId.forEach(opp => {
            opp.linkName = '/' + opp.Id;

        });
        return foundOpptWithoutSlashToId;
    }
    cols = [
        {
            label:'Name', 
            fieldName: 'linkName' , 
            type:'url', 
            typeAttributes: {
                label: {fieldName: 'Name'},
                target: '_blank'
            }
        } ,
        {label:'Stage', fieldName:'StageName' , type:'picklist'} ,
        {label:'Amount', fieldName:'Amount' , type:'currency'},
        {label:'Close Date', fieldName:'CloseDate' , type:'date'}    
    ]

}
