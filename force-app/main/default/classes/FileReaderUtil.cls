public with sharing class FileReaderUtil {
    public Blob fileBody;
    public FileReaderUtil() {

    }

    public static void readFile(String name){
        ContentVersion data =   [SELECT FileExtension,FileType, VersionData FROM ContentVersion where title = :name];
        Blob  fileData = data.VersionData;
        String fileBodyData = fileData.toString();
        System.debug(fileBodyData);
    }
}
