import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAsync, useService } from "../../hooks/useAsync.hook";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { Permission } from "../../models/permission.model";
import { getPermissionTypes } from "../../services/client_permission.service";
import { useLocation, useHref } from "react-router-dom";
import { PermissionType } from "../../models/permission_type.model";
import './update_permission.css';

export const UpdatePermissionPage = () => {
    const { updatePermission, response } = useService();
    const [responseTypes, setResponse] = useState([]);

    const [permissionId, setPermissionId] = useState(0);
    const [employeeName, setName] = useState('');
    const [employeeLastName, setLastName] = useState('');
    const [permissionTypeId, setPermissionType] = useState(0);

    const [loading, setLoading] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const location = useLocation();
    const data = location.state;

    const PermissionCurrent = () => {
        const dataString = JSON.stringify(data);
        const datObject = JSON.parse(dataString);
        adaptData(datObject);
        setLoading(false)
        return (<> <p>No hay datos a modificar</p> </>);
    }

    const adaptData = (data: Permission) => {
        setPermissionId(data.id)
        setName(data.employeeName);
        setLastName(data.employeeLastName)
        setPermissionType(data.permissionTypeId)
    }

    const editPermission = () => {
        setDisableButton(true);
        const permission = {
            employeeName: employeeName,
            employeeLastName: employeeLastName,
            permissionTypeId: permissionTypeId
        };
        updatePermission(permissionId, permission);
    }
    
    const InitPermissionType = () => {
        const { loading, callEndpoint } = useFetchAndLoad();
        const getApiData = async () => await callEndpoint(getPermissionTypes());

        const adaptResponse = (data: []) => {
            setResponse(data);
        }
        useAsync(getApiData, adaptResponse, () => { });
        return (<><option>No hay datos en la lista</option></>);
    }

    const LoadedPermissionTypes = () => {
        return (<>{
            responseTypes.map((permissionType: PermissionType, key) => {
                return <option key={key} selected={permissionType.permissionTypeId == permissionTypeId ? true : false} 
                        value={permissionType.permissionTypeId}>{permissionType.description}</option>
            })}
        </>
        );
    }

    return (
        <div className="main-update">
            <div className="secundary-update">
                {loading ? <PermissionCurrent/> : <h3>Datos a modificar</h3>}
                <div style={{ paddingTop: 20 }}>
                    <FloatingLabel controlId="floatingInput" label="Employee Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" className="form-control" value={employeeName} onChange={e => setName(e.target.value)} />
                    </FloatingLabel>
                </div>
                <FloatingLabel controlId="floatingPassword" label="Employee Last Name" >
                    <Form.Control type="text" placeholder="Password" className="form-control" value={employeeLastName} onChange={e => setLastName(e.target.value)} />
                </FloatingLabel>
                <div className="secundary-update">
                    <Form.Select aria-label="Default select example" onChange={e => setPermissionType(Number.parseInt(e.target.value))}>
                        {responseTypes.length > 0 ? <LoadedPermissionTypes /> : <InitPermissionType />}
                    </Form.Select>
                </div>
                <div className="d-grid gap-2 secundary-update" >
                    <Button variant="primary" type="submit" size="sm" onClick={editPermission} disabled={disableButton}>
                        Update
                    </Button>
                </div>
                { response !=null? <h2> Datos actualizados</h2>: <></>}
            </div>
        </div>
    );
}

export default UpdatePermissionPage