public with sharing class AccountHierarchyController {
    
   
    public static Map<String,AccountTreeModel> getChildren(){
        Map<String,AccountTreeModel> accountMap = new Map<String,AccountTreeModel>();

        for(Account item :[SELECT Id, Name, ParentId  FROM Account]){
            System.debug(item.name+'->'+item);
            String pid = item.ParentId ==null? 'ROOT':item.ParentId;
            //if(accountMap.containsKey(pid)){
            //accountMap.get(id).items.add(new AccountTreeModel(item.id,item.Name,pid, new List<AccountTreeModel>()));
            /*}else {
                */
            accountMap.put(item.id, new AccountTreeModel(item.id,item.Name,pid, new List<AccountTreeModel>()));
            
            
        }
        for(String itemKey : accountMap.keySet()){
            AccountTreeModel current = accountMap.get(itemKey);
            for(AccountTreeModel item : accountMap.values()){
                if(current.id ==item.parentId){
                    current.items.add(item);
                }
            }
        }
        return accountMap;
    }

    public class AccountTreeModel{
        
        @AuraEnabled
        public String id {get;set;}

        @AuraEnabled
        public String label {get;set;}

        public String parentId {get; set;}
       
        @AuraEnabled
        public List<AccountTreeModel> items {get;set;}

        public AccountTreeModel(String id, String label, String parentId, List<AccountTreeModel> items){
            this.id = id;
            this.label = label;
            this.parentId = parentId;
            this.items = items;
        }

    }
}