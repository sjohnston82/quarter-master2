import React, { useContext } from 'react'
import { GlobalContext } from '~/context/GlobalContextProvider'
import { api } from '~/utils/api'

const AllShoppingListItems = () => {
  const { householdId } = useContext(GlobalContext)
  const {data, isLoading} = api.shoppingList.getAllShoppingListItems.useQuery({ householdId })
  return (
    <div>
      {data && data.map((item) => (<div key={item.id}>{item.name} {item.location}</div>))}
      </div>
  )
}

export default AllShoppingListItems