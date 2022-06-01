import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAsync, useService } from "../../hooks/useAsync.hook";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { PermissionType } from "../../models/permission_type.model";
import { getPermissionTypes } from "../../services/client_permission.service";
import './create_permission.css';

const CreatePermissionPage = () => {

    const [employyeName, setName] = useState('');
    const [employyeLastName, setLastName] = useState('');
    const [permissionTypeSelect, setPermissionType] = useState(0);
    const [initLoad, setLoading] = useState(true);
    const { addPermission, response } = useService();
    const [responseTypes, setResponse] = useState([]);
    const { loading, callEndpoint } = useFetchAndLoad();

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
        const getApiData = async () => await callEndpoint(getPermissionTypes());
        const adaptResponse = (data: []) => {
            setLoading(false);
            setResponse(data);
        }
        useAsync(getApiData, adaptResponse, () => { });
        return (<><option>No hay datos en la lista</option></>);
    }

    const ListPermissionTypes = () => {
        return (<>{
            responseTypes.map((permissionType: PermissionType, key) => {
                return <option key={key} value={permissionType.permissionTypeId}>{permissionType.description}</option>
            })}
        </>
        )
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
                <Form.Select aria-label="Default select example" value={permissionTypeSelect} onChange={e => setPermissionType(Number.parseInt(e.target.value))}>
                    {responseTypes.length > 0 ? <ListPermissionTypes /> : <GetPermissionTypes />}
                </Form.Select>
            </div>
            <div className="d-grid gap-2 div-button">
                <Button variant="primary" type="submit" size="sm" disabled={initLoad} onClick={savePermission}>
                    Submit
                </Button>
                {response && <h1>Guardado</h1>}
            </div>
        </div>
    );
}


export default CreatePermissionPage