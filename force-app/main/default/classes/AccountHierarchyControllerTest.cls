@isTest
public with sharing class AccountHierarchyControllerTest {
   
    @isTest
    public static void testGetChildern(){
        /*
            A -> B,C
            B -> D,E
            D-> F
        */
        Account a = new Account(Name='A');
        Account b = new Account(Name='B');
        Account c = new Account(Name='C');
        Account d = new Account(Name='D');
        Account e = new Account(Name='E');
        Account f = new Account(Name='F');
        List<Account> accs = new LIst<Account>{a,b,c,d,e,f};
        insert accs;
        b.ParentId = a.id;
        c.ParentId = a.id;
        d.ParentId = b.id;
        e.ParentId = b.id;
        f.ParentId = d.Id;
        update accs;

        
        Map<String,AccountHierarchyController.AccountTreeModel> tree = AccountHierarchyController.getChildren();
        System.debug(tree);
        for(String key : tree.keySet()){
            System.debug('--'+tree.get(key).label+'--');
            for(AccountHierarchyController.AccountTreeModel item : tree.get(key).items){
                System.debug('----'+item.label);
            }
        }
        System.assertEquals(2, tree.get(a.id).items.size());
        System.assertEquals(2, tree.get(b.id).items.size());
        System.assertEquals(2, tree.get(d.id).items.size());

    }
}