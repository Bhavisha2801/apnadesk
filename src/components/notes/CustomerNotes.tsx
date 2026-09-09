"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Button,
  Input,
  Modal,
  LoadingState,
  ErrorState,
  EmptyState,
  ConfirmationDialog,
} from "../ui";


import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  setNotes,
  addNote,
  updateNote,
  removeNote,
  setLoading,
  setError,
} from "../../features/notes/noteSlice";

import type {
  Note,
} from "@/src/types/note";
import { noteService } from "@/src/services/noteService";
import Textarea from "../ui/Textarea";

interface CustomerNotesProps {
  customerId: string;
}

export default function CustomerNotes({
  customerId,
}: CustomerNotesProps) {

  const dispatch =
    useAppDispatch();

  const {
    items: notes,
    loading,
    error,
  } = useAppSelector(
    state => state.notes
  );

  const [
    noteModalOpen,
    setNoteModalOpen,
  ] = useState(false);

  const [
    editingNote,
    setEditingNote,
  ] = useState<Note | null>(
    null
  );

  const [
    noteText,
    setNoteText,
  ] = useState<string>("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingNote,
    setDeletingNote,
  ] = useState<Note | null>(
    null
  );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {

    const loadNotes = async () => {

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const data =
          await noteService.getCustomerNotes(
            customerId
          );

        dispatch(
          setNotes(data)
        );

      } catch (error) {

        dispatch(
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load notes."
          )
        );

      } finally {
        dispatch(setLoading(false));
      }
    };

    loadNotes();

  }, [customerId, dispatch]);

  const openCreateModal = () => {
    setEditingNote(null);
    setNoteText("");
    setNoteModalOpen(true);
  };

  const openEditModal = (
    note: Note
  ) => {
    setEditingNote(note);
    setNoteText(note.content);
    setNoteModalOpen(true);
  };

  const handleSave = async () => {

    if (!noteText.trim()) {
      return;
    }

    try {

      setSaving(true);

      if (editingNote) {

        const updatedNote =
          await noteService.updateNote(
            editingNote.id,
            {
              content: noteText.trim(),
            }
          );

        dispatch(
          updateNote(updatedNote)
        );

      } else {

        const newNote =
          await noteService.createNote({
            customerId,
            content: noteText.trim(),
            createdBy: "Admin",
          });

        dispatch(
          addNote(newNote)
        );
      }

      setNoteText("");
      setEditingNote(null);
      setNoteModalOpen(false);

    } catch (error) {

      dispatch(
        setError(
          error instanceof Error
            ? error.message
            : "Failed to save note."
        )
      );

    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {

    if (!deletingNote) {
      return;
    }

    try {

      setDeleting(true);

      await noteService.deleteNote(
        deletingNote.id
      );

      dispatch(
        removeNote(
          deletingNote.id
        )
      );

      setDeletingNote(null);

    } catch (error) {

      dispatch(
        setError(
          error instanceof Error
            ? error.message
            : "Failed to delete note."
        )
      );

    } finally {
      setDeleting(false);
    }
  };

  if (
    loading &&
    notes.length === 0
  ) {
    return (
      <LoadingState
        message="Loading notes..."
      />
    );
  }

  if (
    error &&
    notes.length === 0
  ) {
    return (
      <ErrorState
        message={error}
        action={
          <Button
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            Notes
          </h2>

          <p className="text-sm text-gray-500">
            Keep track of important customer information.
          </p>
        </div>

        <Button
          onClick={
            openCreateModal
          }
        >
          Add Note
        </Button>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Notes */}

      {notes.length === 0 ? (

        <EmptyState
          title="No notes yet"
          description="Add a note to keep track of customer information."
          action={
            <Button
              onClick={
                openCreateModal
              }
            >
              Add Note
            </Button>
          }
        />

      ) : (

        <div className="space-y-4">

          {notes.map(note => (

            <div
              key={note.id}
              className="border rounded-lg p-4"
            >

              <div className="flex justify-between gap-4">

                <div className="flex-1">

                  <p className="text-sm whitespace-pre-wrap">
                    {note.content}
                  </p>

                  <div className="mt-3 text-xs text-gray-500">
                    Created by{" "}
                    {note.createdBy}
                    {" · "}
                    {new Date(
                      note.createdAt
                    ).toLocaleString()}
                  </div>

                  {note.updatedAt && (
                    <div className="mt-1 text-xs text-gray-400">
                      Updated{" "}
                      {new Date(
                        note.updatedAt
                      ).toLocaleString()}
                    </div>
                  )}

                </div>

                <div className="flex gap-2">

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      openEditModal(
                        note
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      setDeletingNote(
                        note
                      )
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Add/Edit modal */}

      <Modal
        open={noteModalOpen}
        onClose={() => {
            if (!saving) {
            setNoteModalOpen(false);
            }
        }}
        title={
            editingNote
            ? "Edit Note"
            : "Add Note"
        }
        size="md"
        footer={
            <>
            <Button
                variant="outline"
                onClick={() => {
                if (!saving) {
                    setNoteModalOpen(false);
                }
                }}
                disabled={saving}
            >
                Cancel
            </Button>

            <Button
                onClick={handleSave}
                disabled={
                saving || !noteText.trim()
                }
            >
                {saving
                ? "Saving..."
                : editingNote
                ? "Update Note"
                : "Add Note"}
            </Button>
            </>
        }
        >
        <Textarea
            label="Note"
            value={noteText}
            onChange={(event) =>
            setNoteText(event.target.value)
            }
            placeholder="Enter customer note..."
            rows={6}
        />
        </Modal>

      {/* Delete confirmation */}

      <ConfirmationDialog
        open={Boolean(
          deletingNote
        )}
        title="Delete note?"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={
          handleDelete
        }
        onClose={() => {
          if (!deleting) {
            setDeletingNote(null);
          }
        }}
      />

    </div>
  );
}