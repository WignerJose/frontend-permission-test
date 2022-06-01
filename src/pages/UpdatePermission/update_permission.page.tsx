import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAsync, useService } from "../../hooks/useAsync.hook";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { Permission } from "../../models/permission.model";
import { getPermissionTypes } from "../../services/client_permission.service";
import { useLocation,useHref } from "react-router-dom";
import { PermissionType } from "../../models/permission_type.model";
import './update_permission.css';

export const UpdatePermissionPage = () => {
    const [idPermission, setIdPermission] = useState(0);
    const [employyeName, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [employyeLastName, setLastName] = useState('');
    const [permissionTypeId, setPermissionType] = useState(0);
    const { updatePermission, response } = useService();

    const location = useLocation();
    const data = location.state;

    const setPermissionCurrent = () => {
        const dataString = JSON.stringify(data);
        const datObject = JSON.parse(dataString);
        adaptData(datObject);
        setLoading(false)
        return (<></>);
    }

    const adaptData = (data: Permission) => {
        setIdPermission(data.id)
        setName(data.employeeName);
        setLastName(data.employeeLastName)
        setPermissionType(data.permissionTypeId)
    }

    const editPermission = () => {
        setDisableButton(true);
        const permission = {
            employeeName: employyeName,
            employeeLastName: employyeLastName,
            permissionTypeId: permissionTypeId
        };
        updatePermission(idPermission, permission);
    }
    const GetPermissionTypes = () => {
        const { loading, callEndpoint } = useFetchAndLoad();
        const [response, setResponse] = useState([]);
        const getApiData = async () => await callEndpoint(getPermissionTypes());

        const adaptResponse = (data: []) => {
            setResponse(data);
        }
        useAsync(getApiData, adaptResponse, () => { });
        return (
            <>
                {loading ? 'LOADING' :
                   response.map((permissionType:PermissionType,key)=> {
                       return <option key={key} selected={permissionType.permissionTypeId == permissionTypeId ? true:false} value={permissionType.permissionTypeId}>{permissionType.description}</option>
                   })
                }
            </>
        );
    }

    return (
        <div className="main-update">
            {response && <h1>Modificado</h1>}
            <div className="secundary-update">
                {loading ? setPermissionCurrent() : <p>Datos a modificar</p>}
                <div style={{ paddingTop: 20 }}>
                    <FloatingLabel controlId="floatingInput" label="Employee Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" className="form-control" value={employyeName} onChange={e => setName(e.target.value)} />
                    </FloatingLabel>
                </div>
                <FloatingLabel controlId="floatingPassword" label="Employee Last Name" >
                    <Form.Control type="text" placeholder="Password" className="form-control" value={employyeLastName} onChange={e => setLastName(e.target.value)} />
                </FloatingLabel>
                <div className="secundary-update">
                <Form.Select aria-label="Default select example" onChange={e=>setPermissionType(Number.parseInt(e.target.value))}>
                    {<GetPermissionTypes/>}
                </Form.Select>
                </div>
                <div className="d-grid gap-2 secundary-update" >
                    <Button variant="primary" type="submit" size="sm" onClick={editPermission} disabled={disableButton}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdatePermissionPage