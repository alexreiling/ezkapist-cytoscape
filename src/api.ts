import { end } from '@popperjs/core';
import { Asset, AssetType, TempAsset } from './types';
const BASE_URL = 'http://localhost:3001/';
const ENDPOINTS: any = {
  world: 'worlds',
  map: 'maps',
  flow: 'flows',
  folder: 'folders',
  character: 'characters',
};

const request = async (endpoint: string, method?: string, data?: any) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  return fetch(BASE_URL + endpoint, {
    method,
    body: JSON.stringify(data),
    headers,
  });
};

const requestJSON = async (endpoint: string, method?: string, data?: any) =>
  request(endpoint, method, data).then((res) => res.json());

const update = (updatedAsset: Asset) => {
  const type = updatedAsset.type!;
  const endpoint = ENDPOINTS[type];
  if (!endpoint) throw new Error('No endpoint found for type: ' + type);
  return requestJSON(endpoint + '/' + updatedAsset.id, 'PUT', updatedAsset);
};
const getMany = async (type?: AssetType) => {
  if (!type) {
    // get all assets
    const assetTypes = Object.keys(ENDPOINTS);
    const allData = await Promise.all(
      assetTypes.map(async (assetType) => {
        const endpoint = ENDPOINTS[assetType];
        return request(endpoint).then((res) => res.json());
      })
    );
    return allData.flat() as Asset[];
  }
};
const getOne = () => {};
const remove = async (asset: Asset) => {
  const type = asset.type;
  if (type === 'folder') {
    // get child folders
    let childFolders: Asset[] = await requestJSON(
      ENDPOINTS.folder + '/' + asset.id + '/' + ENDPOINTS.folder
    );
    // delete child folders
    await Promise.all(childFolders.map((childFolder) => remove(childFolder)));
    // // delete ressources
    // Object.keys(ENDPOINTS)
    //   .filter((key) => key !== 'folder')
    //   .forEach((key) => {
    //     const ressourceEndpoint = ENDPOINTS[key];
    //     requestJSON(
    //       ENDPOINTS.folder + '/' + asset.id + '/' + ressourceEndpoint,
    //       'DELETE'
    //     );
    //   });
  }
  // delete self
  const endpoint = ENDPOINTS[type];
  return requestJSON(endpoint + '/' + asset.id, 'DELETE');
};
// const remove = (asset: Asset) => {
//   const type = asset.type;
//   const endpoint = ENDPOINTS[type];
//   if (!endpoint) throw new Error('No endpoint found for type: ' + type);

//   return requestJSON(endpoint + '/' + asset.id, 'DELETE');
// };
const create = async (tempAsset: TempAsset): Promise<Asset> => {
  const type = tempAsset.type;
  const endpoint = ENDPOINTS[type];
  if (!endpoint) throw new Error('No endpoint found for type: ' + type);
  return requestJSON(endpoint, 'POST', tempAsset);
};
const client = {
  create,
  update,
  remove,
  getMany,
};
export default client;
