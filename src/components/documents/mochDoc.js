import { supabase } from "../../supabaseClient";

async function listAllFiles(folderPath = "") {
  let allFiles = [];
  const { data: files, error } = await supabase.storage
    .from("client_files")
    .list(folderPath, { limit: 1000 });

  if (error) {
    console.error(`Error listing files in ${folderPath}:`, error);
    return [];
  }

  const promises = files.map(async (file) => {
    // It's a file
    if (file.metadata) {
      allFiles.push({ path: folderPath + file.name, ...file });
    } else {
      // It's a folder, recursively get its contents
      const nestedFiles = await listAllFiles(`${folderPath}${file.name}/`);
      allFiles = allFiles.concat(nestedFiles);
    }
  });

  await Promise.all(promises);

  return allFiles;
}

export async function fetchDocuments(userEmail) {
  console.log("User email:", userEmail);
  const rootFolder = `${userEmail}/`;

  // Fetch all files and folders recursively starting from the root folder
  const allDocuments = await listAllFiles(rootFolder);

  // More efficient but complex version:
  const getFileExtension = (filename) => {
    return filename
      .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();
  };

  //  concise but less efficient version:
  //   const getFileExtension = (filename) => {
  //     const parts = filename.split(".");
  //     return parts.length > 1 ? parts[parts.length - 1] : "";
  //   };

  // Group the files by category based on folder structure
  const groupedDocuments = allDocuments.reduce((acc, file) => {
    const category = file.path.split("/")[1]; // Assuming the first folder after the root is the category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: file.id,
      name: file.name,
      uploadDate: file.updated_at.split("T")[0],
      type: getFileExtension(file.name), // Extract file type
      path: file.path,
    });
    return acc;
  }, {});

  return groupedDocuments;
}
