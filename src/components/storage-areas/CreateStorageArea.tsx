import React, { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../layouts/ui/Modal";
import { GlobalContext } from "~/context/GlobalContextProvider";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

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
    createNewStorageArea.mutate(mutationData);
    reset();
  };

  return (
    <div>
      <Modal
        isOpen={showingCreateStorageAreaModal}
        title="Enter your storage area name "
        secondaryTitle="(ex: 'Pantry', 'Garage Freezer', 'Spice Rack', etc.)"
        onClose={() => setShowingCreateStorageAreaModal(false)}
      >
        <div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <input type="text" id="name" {...register("name")} />
            <button type="submit">Add</button>
          </form>
        </div>
      </Modal>
      <button
        className="border"
        onClick={() => setShowingCreateStorageAreaModal(true)}
      >
        Create Storage Area
      </button>
    </div>
  );
};

export default CreateStorageArea;
