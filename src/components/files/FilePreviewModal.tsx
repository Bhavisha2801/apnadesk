"use client";

import { CustomerFile } from "@/src/types/files";
import {
  Modal,
} from "../ui";

interface FilePreviewModalProps {
  file: CustomerFile | null;

  onClose: () => void;
}

export default function FilePreviewModal({
  file,
  onClose,
}: FilePreviewModalProps) {

  if (!file) {
    return null;
  }

  return (

    <Modal
      open={Boolean(file)}
      onClose={onClose}
      title={file.name}
      size="lg"
    >

      {file.type === "image" && (

        <img
          src={file.url}
          alt={file.name}
          className="
            max-h-[70vh]
            w-full
            rounded-lg
            object-contain
          "
        />

      )}

      {file.type === "pdf" && (

        <iframe
          src={file.url}
          title={file.name}
          className="
            h-[70vh]
            w-full
            rounded-lg
            border
          "
        />

      )}

      {file.type === "video" && (

        <video
          src={file.url}
          controls
          className="
            max-h-[70vh]
            w-full
            rounded-lg
          "
        />

      )}

      {file.type === "document" && (

        <div className="py-10 text-center">

          <p className="text-sm text-gray-500">
            Document preview is not available.
          </p>

          <button
            type="button"
            onClick={() =>
              downloadFile(file)
            }
            className="
              mt-4
              rounded-md
              bg-blue-600
              px-4
              py-2
              text-sm
              text-white
            "
          >
            Download Document
          </button>

        </div>

      )}

    </Modal>

  );
}

function downloadFile(
  file: CustomerFile
) {

  const link =
    document.createElement(
      "a"
    );

  link.href = file.url;

  link.download =
    file.name;

  link.target = "_blank";

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );
}