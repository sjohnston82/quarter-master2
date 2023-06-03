import { useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import SubmitButton from "../ui/SubmitButton";

interface CreateStorageProps {
  name: string;
}

const CreateStorageArea = () => {
  const {
    householdId,
    showingCreateStorageAreaModal,
    setShowingCreateStorageAreaModal,
  } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<CreateStorageProps>();

  const storageAreaRoute = api.useContext().storageAreas;

  const createNewStorageArea = api.storageAreas.createStorageArea.useMutation({
    onSuccess: () => {
      toast.success("Storage Area created successfully!");
      setShowingCreateStorageAreaModal(false);
      void storageAreaRoute.getStorageAreas.invalidate();
    },
  });

  const onSubmit = (data: CreateStorageProps) => {
    const mutationData = {
      name: data.name,
      householdId,
    };
    console.log(mutationData);
    createNewStorageArea.mutate(mutationData);
    reset();
  };

  return (
    <div>
      <Modal
        isOpen={showingCreateStorageAreaModal}
        title="Enter your storage area name "
        onClose={() => setShowingCreateStorageAreaModal(false)}
      >
        <div className="w=full flex flex-col">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <TextField
              fullWidth
              margin="dense"
              label="Storage Area"
              type="text"
              id="name"
              {...register("name")}
              helperText="Anywhere food items are stored in your house."
            />
            <div className="flex w-full justify-center">
              <SubmitButton>Add</SubmitButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateStorageArea;
