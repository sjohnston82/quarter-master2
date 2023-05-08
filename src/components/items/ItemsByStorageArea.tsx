import React from 'react'
import Banner from '../ui/Banner';
import { api } from '~/utils/api';
import Item from './Item';

interface ItemsByStorageAreaProps {
  storageAreaName: string;
  storageAreaId: string;
}

const ItemsByStorageArea = ({ storageAreaName, storageAreaId }: ItemsByStorageAreaProps) => {

  const {data, isLoading} = api.items.getItemsByStorageArea.useQuery( {storageAreaId })
  return (
    <div>
      <Banner>{storageAreaName}</Banner>
      {data?.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ItemsByStorageArea