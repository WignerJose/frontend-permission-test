import { Permission } from "../models/permission.model";
import { loadAbort } from "../utilities/load_aboart_axios.utility";
import axios from "axios";
import { PermissionType } from "../models/permission_type.model";

export const BASE_URL = "http://192.168.100.5:5221";

export const getPermissions = ()=>{
    const controller = loadAbort();
    return {call: axios.get<Permission>(`${BASE_URL}/api/v1/permission/all`,{signal:controller.signal}),controller};
}

export const getPermissionTypes = ()=>{
    const controller = loadAbort();
    return {call: axios.get<PermissionType>(`${BASE_URL}/api/v1/permission-type/all`,{signal:controller.signal}),controller};
}

export const updatePermissionApi = (id:any,datatoSend: any)=>{
    return {call: axios.put(`${BASE_URL}/api/v1/permission/${id}`,datatoSend)};
}

export const addPermissionApi = (datatoSend: any)=>{
    return {call: axios.post(`${BASE_URL}/api/v1/permission`,datatoSend)};
}
