import { LightningElement, track, api } from 'lwc';
import getOppt from '@salesforce/apex/OpportunitySearchFromAccount.getOppt';
import { NavigationMixin } from 'lightning/navigation';

export default class OpportunitySearch extends NavigationMixin(LightningElement) {

    @api recordId;
    @track foundOppt;

    textValue = " ";

    // Method to get user input
    handleSearchText(event) {
        this.textValue = event.detail.value;
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
            this.searchOpptFromAccount();
        }
    }

    // Method called when use click on Search Button
    searchOpptFromAccount() {
        // retrieve data (opportunities related to the account) according to user's input
        getOppt({searchText: this.textValue, accountID: this.recordId})
            .then(result => {
                this.foundOppt = this.addSlashToId(result);
            })
            .catch(error => {
                this.foundOppt = [];
            });
    }

    // Method to add a slash
    addSlashToId(foundOpptWithoutSlashToId) {
        foundOpptWithoutSlashToId.forEach(opp => {
            opp.linkName = '/' + opp.Id;

        });
        return foundOpptWithoutSlashToId;
    }

    // columns used in the lightning datatable
    cols = [
        {
            label:'Name', 
            fieldName: 'linkName' , 
            type:'url', 
            typeAttributes: {
                label: {fieldName: 'Name'},
                target: '_blank'
            }
        },
        {
            label:'Stage', 
            fieldName:'StageName' , 
            type:'picklist'
        },
        {
            label:'Amount', 
            fieldName:'Amount' , 
            type:'currency'
        },
        {
            label:'Close Date',
            fieldName:'CloseDate' , 
            type:'date'
        }    
    ]

}
