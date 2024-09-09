import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { supabase } from "../../supabaseClient";

const { Dragger } = Upload;

const SupabaseFileUpload = ({ userId, section, handleFilePath }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("Current session:", session);
    console.log("Current user mail id", session.user.email);

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);

    try {
      // const fileExt = file.name.split(".").pop();
      // console.log("File name:", file.name.split(".").shift());
      // const fileName = `${userId}/${section}/${Math.random()}.${fileExt}`;
      const fileName = `${userId}/${section}/${file.name}`;

      const { data, error } = await supabase.storage
        .from("client_files")
        .upload(fileName, file, {
          upsert: true,
        });

      if (error) throw error;

      handleFilePath(data.fullPath);
      alert("File uploaded successfully!");
      console.log("Returned data:", data);
      return true; // used in draggerProps.customRequest.onSuccess()
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
      return false; // used in draggerProps.customRequest.onError()
    } finally {
      setUploading(false);
    }
  };

  const draggerProps = {
    name: "file",
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const result = await handleUpload(file);
      if (result) {
        onSuccess();
      } else {
        onError();
      }
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
  };

  return (
    <Dragger {...draggerProps} disabled={uploading}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default SupabaseFileUpload;
