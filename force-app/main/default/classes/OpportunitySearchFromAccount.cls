public with sharing class OpportunitySearchFromAccount {
    @AuraEnabled    
    public static List<Opportunity> getOppt(String searchText, String accountID) {
        searchText = '%' + searchText + '%';

        List<Opportunity> opptList = new List<Opportunity>([SELECT Id, Name, StageName, CloseDate, Amount FROM Opportunity WHERE Name LIKE :searchText AND AccountID = :accountID]);

        if(opptList.isEmpty()) {
            throw new AuraHandledException('No record found');
        }
        
        return opptList;
    }
}