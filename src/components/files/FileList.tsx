"use client";

import type {
  CustomerFile,
} from "../../types/files";

interface FileListProps {
  files: CustomerFile[];

  onPreview: (
    file: CustomerFile
  ) => void;

  onDownload: (
    file: CustomerFile
  ) => void;
}

export default function FileList({
  files,
  onPreview,
  onDownload,
}: FileListProps) {

  return (

    <div className="space-y-3">

      {files.map(
        file => (

          <div
            key={file.id}
            className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-gray-200
              bg-white
              p-4
            "
          >

            <div className="min-w-0">

              <div className="font-medium text-gray-900">
                {file.name}
              </div>

              <div className="mt-1 text-xs text-gray-500">

                {formatFileSize(
                  file.size
                )}

                {" • "}

                {formatDate(
                  file.uploadedAt
                )}

              </div>

            </div>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() =>
                  onPreview(file)
                }
                className="
                  rounded-md
                  border
                  px-3
                  py-2
                  text-sm
                  hover:bg-gray-50
                "
              >
                Preview
              </button>

              <button
                type="button"
                onClick={() =>
                  onDownload(file)
                }
                className="
                  rounded-md
                  bg-blue-600
                  px-3
                  py-2
                  text-sm
                  text-white
                  hover:bg-blue-700
                "
              >
                Download
              </button>

            </div>

          </div>

        )
      )}

    </div>

  );
}

function formatFileSize(
  bytes: number
): string {

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function formatDate(
  date: string
): string {

  const value =
    new Date(date);

  return value.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}