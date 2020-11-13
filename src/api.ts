import { Asset, AssetType } from './types';
const BASE_URL = 'http://localhost:3001/';
const ENDPOINTS: any = {
  world: 'worlds',
  map: 'maps',
  flow: 'flows',
  folder: 'directories',
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

const update = (asset: Asset) => {};
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
    return allData.flat();
  }
};
const getOne = () => {};
const remove = () => {};
const create = async (type: AssetType, parentId?: string): Promise<Asset> => {
  const endpoint = ENDPOINTS[type];
  if (!endpoint) throw new Error('No endpoint found for type: ' + type);
  const data: Partial<Asset> = {
    type,
    parentId,
  };
  return requestJSON(endpoint, 'POST', data);
};
const client = {
  create,
  getMany,
};
export default client;
