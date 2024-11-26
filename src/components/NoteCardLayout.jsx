import { Plus } from "lucide-react";
import NoNotesFound from "./NoNoteFound";
import NoteCard from "./NoteCard";
import SkeletonNoteCard from "./SkeletonNoteCard";
import ReactModal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store/slices/openAddEditModalSlice";

const NoteCardLayout = ({ data, isLoading, title }) => {
  const dispatch = useDispatch();

  const { isShown, type, data: d } = useSelector((store) => store.modal);

  return (
    <div>
      <>
        <div className=" mx-auto px-5">
          {title && <h1>{title}</h1>}
          <div
            className={`${
              data?.data?.length === 0
                ? "w-full h-screen  sm:h-[90vh]  "
                : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2 "
            }`}
          >
            {isLoading ? (
              Array(10)
                .fill(10)
                ?.map((_, index) => <SkeletonNoteCard key={index} />)
            ) : data?.data?.length === 0 ? (
              <NoNotesFound />
            ) : (
              data?.data?.map(
                ({
                  _id,
                  title,
                  content,
                  isPinned,
                  createdAt,
                  noteColor,
                  isEncrypted,
                }) => {
                  console.log("comp", isEncrypted);
                  return (
                    <NoteCard
                      title={title}
                      content={content}
                      date={createdAt}
                      isPinned={isPinned}
                      noteColor={noteColor}
                      isEncrypted={isEncrypted}
                      onEdit={() =>
                        dispatch(
                          openModal({
                            isShown: true,
                            type: "edit",
                            data: { title, content, _id },
                          })
                        )
                      }
                      id={_id}
                      key={_id}
                    />
                  );
                }
              )
            )}
          </div>
        </div>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85ff] hover:bg-blue-600 absolute right-10 bottom-10 text-center "
          onClick={() => {
            dispatch(
              openModal({
                isShown: true,
                type: "add",
                data: null,
              })
            );
          }}
        >
          <Plus size={30} className="text-white text-center" />
        </button>

        <ReactModal
          isOpen={isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              background: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className={
            "w-[50%] max-md:w-[60%] max-sm:w-[90%]  bg-white rounded-md mx-auto mt-5 relative z-50"
          }
        >
          <AddEditNotes
            onClose={() =>
              dispatch(
                closeModal({
                  isShown: false,
                  type: "add",
                  data: null,
                })
              )
            }
            noteData={d}
            type={type}
          />
        </ReactModal>
      </>
    </div>
  );
};

export default NoteCardLayout;
