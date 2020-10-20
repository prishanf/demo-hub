public without sharing class CommunityUserController {

    private Contact contactToSave;
    private User userToSave;
    
    @AuraEnabled
    public static String saveCommunityUser(String userData) {
        Map<String, Object> m = (Map<String, Object>) JSON.deserializeUntyped(userData);
        System.debug(m);
        try{
            CommunityUserController ctrl = new CommunityUserController();
            ctrl.createContact();

            return 'Success';
        }catch(Exception e){
            return e.getMessage();
        }
        

    }

    private void  createContact(){
        Contact cont= new Contact();
        cont.AccountId = '0018A00000VxVooQAF';
        cont.FirstName = 'Peter 5';
        cont.LastName = 'Ho 5';
        cont.phone ='823423023423';
        cont.email='pp5@test.com';
        this.contactToSave = cont;
        
        createUserAndAssignPermissionSet(cont);
    }

    
    private void createUserAndAssignPermissionSet(Contact cont){
        Savepoint sp = Database.setSavepoint();
        try{

            insert cont;
            User usre = new User();
            usre.contactId = cont.Id;
            usre.FirstName = cont.FirstName;
            usre.LastName = cont.LastName;
            usre.email = cont.Email;
            usre.Alias =cont.FirstName.substring(0,3) + cont.LastName.substring(0,3);
            usre.CommunityNickname = cont.FirstName + cont.LastName.substring(0,3);
            usre.Username = cont.email;
            usre.ProfileID = '00e8A000000g2pXQAQ';
            //usre.CurrencyIsoCode ='USD';
            usre.EmailEncodingKey = 'UTF-8';
            usre.LanguageLocaleKey ='en_US';
            usre.TimezoneSidKey ='America/Los_Angeles';
            usre.LocaleSidKey = 'en_US';
            this.userToSave = usre;
            insert usre;
            PermissionSetAssignment pas = new PermissionSetAssignment();
            pas.AssigneeId = this.userToSave.id;
            pas.PermissionSetId ='0PS8A000000hYImWAM';
            insert pas;
        }catch(Exception e){
            Database.rollback(sp);
        }
        //commitData();
        //
    }
    
    @future
    private static void commitData(){
        try{
            // insert this.contactToSave;
            // this.userToSave.contactId = contactToSave.id ;
            // insert this.userToSave;
            // PermissionSetAssignment pas = new PermissionSetAssignment();
            // pas.AssigneeId = this.userToSave.id;
            // pas.PermissionSetId ='0PS8A000000hYImWAM';
            // insert pas;
            
        }catch(Exception e){
            System.debug(e);
        }    
    }
}
