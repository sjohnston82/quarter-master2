import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const { householdId } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<CreateStorageProps>();
  const [showingCreateStorageAreaModal, setShowingCreateStorageAreaModal] =
    useState(false);

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
        // secondaryTitle="(ex: 'Pantry', 'Garage Freezer', 'Spice Rack', etc.)"
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
      <button
        className="rounded-xl border border-slate-700 p-1 disabled:border-slate-400 disabled:text-slate-400"
        onClick={() => setShowingCreateStorageAreaModal(true)}
      >
        Create Storage Area
      </button>
    </div>
  );
};

export default CreateStorageArea;
