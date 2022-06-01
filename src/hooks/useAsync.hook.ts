import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../services/client_permission.service';

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: Function,
  returnFunction: Function,
  dependencies: any[] = []
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((result) => {
      if (isActive) successFunction(result.data);
    });
    return () => {
      returnFunction && returnFunction();
      isActive = false;
    };
  }, dependencies);
};

export const useService = () => {
  const [response, setResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  const updatePermission = async (id:any,datatoSend: any) => {
    try {
      const {data} =  await axios.put(`${BASE_URL}/api/v1/permission/${id}`, datatoSend);
      setResponse(data);
    } catch (error:any) {
      setErrorResponse(error);
    }
  }

  const addPermission = async (datatoSend: any) => {
    try {
      const {data} = await axios.post(`${BASE_URL}/api/v1/permission`, datatoSend);
      setResponse(data);
    } catch (error:any) {
      setErrorResponse(error);
    }
  }
  return {
    addPermission,
    updatePermission,
    response,
    errorResponse
  };
}


