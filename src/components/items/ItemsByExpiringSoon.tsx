import React, { useContext } from 'react'
import Banner from '../ui/Banner';
import { api } from '~/utils/api';
import { GlobalContext } from '~/context/GlobalContextProvider';
import Item from './Item';

const ItemsByExpiringSoon = () => {
  const { householdId, debouncedValue } = useContext(GlobalContext)

  const getItemsByExpiryDate = api.items.getExpiredItems.useQuery({ householdId})
  return (
    <div className="flex flex-col gap-1">
      <Banner>Expiring Soon</Banner>
      {getItemsByExpiryDate.isSuccess && getItemsByExpiryDate.data
            ?.filter((item) => {
              if (debouncedValue === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(debouncedValue) ||
                item.brand?.toLowerCase().includes(debouncedValue)
              ) {
                return item;
              }
            })
            .map((item) => (
              <Item key={item.id} {...item} />
            ))}
    </div>
  );
}

export default ItemsByExpiringSoon