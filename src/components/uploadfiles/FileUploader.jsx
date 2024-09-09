// Authentication Flow for WORK/SCHOOL MICROSOFT ACCOUNT

// import React, { useEffect } from "react";
// import { message, Upload } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../../msalConfig";
// // import { jwtDecode } from "jwt-decode";

// const { Dragger } = Upload;
// const FileUploader = ({ files, clearFile, onOneDriveLink }) => {
//   const { instance, accounts } = useMsal();

//   useEffect(() => {
//     const checkLogin = async () => {
//       if (accounts.length === 0) {
//         try {
//           await instance.loginPopup(loginRequest);
//         } catch (error) {
//           console.error("Login failed", error);
//         }
//       } else {
//         console.log("Logged in account:", accounts[0]);
//         console.log("Tenant ID:", accounts[0].tenantId);
//         console.log("Home Account ID:", accounts[0].homeAccountId);
//       }
//     };
//     checkLogin();
//   }, [instance, accounts]);

//   // const decodeToken = (token) => {
//   //   const decoded = jwtDecode(token);
//   //   console.log("Decoded Token:", decoded);
//   //   return decoded;
//   // };

//   const handleFileUpload = async (file) => {
//     try {
//       let tokenResponse;
//       try {
//         tokenResponse = await instance.acquireTokenSilent({
//           ...loginRequest,
//           account: accounts[0],
//         });
//       } catch (silentError) {
//         console.error("Silent token acquisition failed:", silentError);
//         tokenResponse = await instance.acquireTokenPopup(loginRequest);
//       }

//       const accessToken = tokenResponse.accessToken;
//       const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/uploaded_files/${file.name}:/content`;

//       // const decodedToken = decodeToken(accessToken);
//       // console.log("Token Scopes:", decodedToken.scp);

//       const response = await fetch(uploadUrl, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": file.type,
//         },
//         body: file,
//       });

//       if (response.ok) {
//         const uploadedFile = await response.json(); // Parse the response to get information about the uploaded file
//         const fileId = uploadedFile.id; // Extract the file ID from the response
//         const oneDriveLink = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/`;
//         message.success(`${file.name} uploaded to OneDrive successfully.`);
//         console.log("OneDrive link:", oneDriveLink);
//         if (onOneDriveLink) {
//           onOneDriveLink(oneDriveLink); // Send the OneDrive link to the parent component
//         }
//       } else {
//         const errorResponse = await response.json();
//         console.error("File upload failed response:", errorResponse);
//         throw new Error(
//           `Failed to upload file. ${errorResponse.error.message}`
//         );
//       }
//     } catch (error) {
//       console.error("File upload error:", error);
//       message.error(`File upload failed: ${error.message}`);
//     }
//   };

//   const props = {
//     name: "file",
//     multiple: true,
//     // action: "https://run.mocky.io/v3/afef01ce-c581-42b2-a8cf-bbb7606ea59d",
//     beforeUpload: (file) => {
//       if (accounts.length > 0) {
//         handleFileUpload(file);
//       } else {
//         message.error("No accounts found. Please log in first.");
//       }
//       return false; // Prevent default upload behavior
//     },
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };
//   return (
//     <div>
//       <Dragger {...props}>
//         <p className="ant-upload-drag-icon">
//           <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">
//           Click or drag file to this area to upload
//         </p>
//         <p className="ant-upload-hint">
//           Support for a single or bulk upload. Strictly prohibited from
//           uploading company data or other banned files.
//         </p>
//       </Dragger>

//       {files.length > 0 && (
//         <div>
//           <h3>File to upload:</h3>
//           <ul>
//             <li>
//               {files[0].name}
//               <button onClick={clearFile} className="ml-2">
//                 Remove
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;

// Authentication Flow for PERSONAL MICROSOFT ACCOUNT

import React, { useEffect } from "react";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// import { useMsal } from "@azure/msal-react";
import { loginRequest, msalInstance } from "../../msalConfig";

const { Dragger } = Upload;

const FileUploader = ({ files, clearFile, onOneDriveLink }) => {
  // const { accounts } = useMsal();

  useEffect(() => {
    const checkLogin = async () => {
      const allAccounts = msalInstance.getAllAccounts();
      // console.log("Inside useEffect", allAccounts);
      if (allAccounts.length === 0) {
        try {
          await msalInstance.loginPopup(loginRequest);
        } catch (error) {
          console.error("Login failed", error);
        }
      } else {
        console.log("User is already signed in");
      }
    };
    checkLogin();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      // msalInstance.clearCacheForScope(loginRequest.scopes);

      let tokenResponse;
      const allAccounts = msalInstance.getAllAccounts();
      // console.log("inside handleFileUpload", allAccounts);

      if (allAccounts.length > 0) {
        try {
          tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: allAccounts[0], // Use allAccounts[0] instead of accounts[0]
          });
        } catch (silentError) {
          console.error("Silent token acquisition failed:", silentError);
          tokenResponse = await msalInstance.acquireTokenPopup(loginRequest);
        }
      } else {
        message.error("No accounts found. Please log in first.");
        return;
      }

      const accessToken = tokenResponse.accessToken;
      // console.log("access token", accessToken);
      const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/uploaded_files/${file.name}:/content`;

      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": file.type,
        },
        body: file,
      });

      if (response.ok) {
        const uploadedFile = await response.json();
        const fileId = uploadedFile.id;
        // Create shared link
        const createLinkUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/createLink`;
        const createLinkResponse = await fetch(createLinkUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "view", // or "edit", "embed", "editWithComment"
          }),
        });

        if (createLinkResponse.ok) {
          const sharedLinkData = await createLinkResponse.json();
          const sharedLink = sharedLinkData.link.webUrl;
          message.success(`${file.name} uploaded to OneDrive successfully.`);
          console.log("OneDrive link:", sharedLink);
          if (onOneDriveLink) {
            onOneDriveLink(sharedLink);
          }
        } else {
          const errorResponse = await createLinkResponse.json();
          console.error("Shared link creation failed:", errorResponse);
          throw new Error(
            `Failed to create shared link for the file. ${errorResponse.error.message}`
          );
        }
        // Create link end
      } else {
        const errorResponse = await response.json();
        console.error("File upload failed response:", errorResponse);
        throw new Error(
          `Failed to upload file. ${errorResponse.error.message}`
        );
      }
    } catch (error) {
      console.error("File upload error:", error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      const allAccounts = msalInstance.getAllAccounts();
      if (allAccounts.length > 0) {
        handleFileUpload(file);
      } else {
        message.error("No accounts found. Please log in first.");
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      {files.length > 0 && (
        <div>
          <h3>File to upload:</h3>
          <ul>
            <li>
              {files[0].name}
              <button onClick={clearFile} className="ml-2">
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
