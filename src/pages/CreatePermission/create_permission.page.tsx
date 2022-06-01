import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAsync, useService } from "../../hooks/useAsync.hook";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { Permission } from "../../models/permission.model";
import { PermissionType } from "../../models/permission_type.model";
import { getPermissionTypes } from "../../services/client_permission.service";
import './create_permission.css';

const CreatePermissionPage = () => {
 
    const [employyeName, setName] = useState('');
    const [employyeLastName, setLastName] = useState('');
    const [permissionTypeSelect, setPermissionType] = useState(0);
    const [loading, setLoading] = useState(false);
    const { addPermission, response } = useService();

    const savePermission = () => {
        setLoading(true);
        const permission = {
            employeeName: employyeName,
            employeeLastName: employyeLastName,
            permissionTypeId: permissionTypeSelect
        };
        addPermission(permission);
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
                       return <option key={key} value={permissionType.permissionTypeId}>{permissionType.description}</option>
                   })
                }
            </>
        );
    }

    return (
        <div className="main-create">
            <FloatingLabel controlId="floatingInput" label="Employee Name" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" className="form-control" value={employyeName} onChange={e => setName(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Employee Last Name" >
                <Form.Control type="text" placeholder="Password" className="form-control" value={employyeLastName} onChange={e => setLastName(e.target.value)} />
            </FloatingLabel>
            <div className="div-button">
                <Form.Select aria-label="Default select example" onChange={e=>setPermissionType(Number.parseInt(e.target.value))}>
                    {<GetPermissionTypes/>}
                </Form.Select>
            </div>
            <div className="d-grid gap-2 div-button">
                <Button variant="primary" type="submit" size="sm" disabled={loading} onClick={savePermission}>
                    Submit
                </Button>
                {response && <h1>Guardado</h1>}
            </div>
        </div>
    );
}


export default CreatePermissionPage