import { LightningElement, track, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import getOppt from '@salesforce/apex/OpportunitySearchFromAccount.getOppt';

export default class OpportunitySearch extends LightningElement {
    @api recordId;

    @track foundOppt;

    textValue = " ";

    handleSearchText(event) {
        this.textValue = event.detail.value;
    }

    searchOpptFromAccount() {
        getOppt({searchText: this.textValue, accountID: this.recordId})
            .then(result => {
                this.foundOppt = result
            })
            .catch(error => {
                this.foundOppt = null;
            });
    }

    cols = [
        {label:'Name', fieldName:'Name' , type:'text'} ,
        {label:'Stage', fieldName:'StageName' , type:'picklist'} ,
        {label:'Amount', fieldName:'Amount' , type:'currency'},
        {label:'Close Date', fieldName:'CloseDate' , type:'date'}    
    ]

    // TODO: Faire que le nom soit clickable
    
}