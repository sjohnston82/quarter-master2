import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CreateStorageProps {
  name: string;
}

const CreateStorageArea = () => {

  const { register, handleSubmit, reset } = useForm<CreateStorageProps>()
  const [showingCreateStorageAreaModal, setShowingCreateStorageAreaModal] = useState(false)


  return (
    <div>

    </div>
  )
}

export default CreateStorageArea