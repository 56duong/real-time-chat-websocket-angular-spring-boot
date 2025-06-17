package org.chatapp.backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileUtils {

    @Value("${backend.url}")
    public void setBackendUrl(String value) {
        BACKEND_URL = value;
    }
    public static String BACKEND_URL;

    public final static String FOLDER_UPLOAD = "uploads";
    public final static String FOLDER_AVATAR = "avatars";


    public static String storeFile(final MultipartFile file, final String folderName) {
        // validate
        if(file.isEmpty()) throw new IllegalArgumentException("File is empty");
        if(folderName.isEmpty()) throw new IllegalArgumentException("Folder name is empty");

        // store
        final String newFileName = UUID.randomUUID() + getFileExtension(file);
        Path path = Paths.get(FOLDER_UPLOAD, folderName);

        if (!path.toFile().exists()) {
            path.toFile().mkdir();
        }

        try {
            file.transferTo(path.resolve(newFileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return newFileName;
    }



    public static boolean deleteFile(final String fileNamePath) {
        Path path = Paths.get(FOLDER_UPLOAD, fileNamePath);
        try {
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    public static String getFileExtension(final MultipartFile file) {
        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
    }



    public static String getAvatarUrl(final String fileName) {
        return BACKEND_URL + "/images/" + FOLDER_AVATAR + "/" + fileName;
    }

}
