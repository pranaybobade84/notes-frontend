import {
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react";
import useNoteActions from "../hooks/useNoteActions";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  isPinned,
  content,
  onEdit,
  id,
  noteColor,
  isEncrypted,
}) => {
  const { handleDelete, handlePinToggle, handleOnEncryption } = useNoteActions(
    isPinned,
    id,
    isEncrypted
  );

  return (
    <div
      className={`border rounded-lg p-5  shadow-sm hover:shadow-lg transition-shadow ease-in-out duration-200 relative group ${
        isPinned && "shadow-2xl"
      }`}
      style={{
        backgroundColor: noteColor,
      }}
    >
      {/* Pin Icon */}
      <Pin
        className={`absolute top-3 right-3 ${
          isPinned ? "text-red-400" : "text-black group-hover:text-gray-500"
        } cursor-pointer transition-colors duration-200`}
        size={20}
        onClick={handlePinToggle}
      />

      {/* Note Title and Date */}
      <div>
        <h6 className="text-lg font-semibold text-gray-800 truncate capitalize">
          {title}
        </h6>
        <span className="text-xs text-gray-500">
          {moment(date, moment.ISO_8601).format("MMMM D, YYYY")}
        </span>
      </div>

      {/* Note Content Preview */}
      <p className="text-sm text-gray-600 mt-3 ">
        {content?.split(0, 60) || "No content available."}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-end mt-5 space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEncrypted ? (
          <LockKeyhole
            onClick={() => handleOnEncryption(false)}
            size={20}
            className="cursor-pointer text-black hover:text-red-500 transition-colors duration-200"
          />
        ) : (
          <LockKeyholeOpen
            onClick={() => handleOnEncryption(true)}
            size={20}
            className="cursor-pointer text-black hover:text-red-500 transition-colors duration-200"
          />
        )}
        <Pencil
          size={20}
          onClick={onEdit}
          className="cursor-pointer text-black hover:text-blue-500 transition-colors duration-200"
        />
        <Trash2
          size={20}
          onClick={handleDelete}
          className="cursor-pointer text-black hover:text-red-500 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default NoteCard;
