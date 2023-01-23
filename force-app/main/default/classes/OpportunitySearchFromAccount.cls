public with sharing class OpportunitySearchFromAccount {
    @AuraEnabled    
    public static List<Opportunity> getOppt(String searchText, String accountID) {
        searchText = '%' + searchText + '%';

        List<Opportunity> opptList = new List<Opportunity>();

        List<Account> acc = [SELECT ID, (SELECT Id, Name, StageName, CloseDate, Amount FROM Opportunities WHERE Name LIKE :searchText) FROM Account WHERE Id = :accountID];
        for(Account a :acc) {
            System.debug('a.Opportunities' + a.Opportunities);
            opptList = a.Opportunities;
        }

        if(opptList.isEmpty()) {
            throw new AuraHandledException('No record found');
        }
        return opptList;
    }
}