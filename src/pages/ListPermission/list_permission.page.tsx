import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useAsync } from "../../hooks/useAsync.hook";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";
import { Permission } from "../../models/permission.model";
import { getPermissions } from "../../services/client_permission.service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './list_permission.css';

export const ListPermissionPage = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [response, setResponse] = useState([]);
    const getApiData = async () => await callEndpoint(getPermissions());
    const navigate = useNavigate();

    const adaptCounter = (data: []) => {
        setResponse(data);
    }
    useAsync(getApiData, adaptCounter, () => { });
    return (
        <div className="main-list">
            {loading ? 'LOADING' :
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#id</th>
                            <th>Employee Name</th>
                            <th>Employee Last Name</th>
                            <th>Permission Type</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((permission: Permission, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{permission.employeeName}</td>
                                    <td>{permission.employeeLastName}</td>
                                    <td>{permission.permissionTypeId}</td>
                                    <td><Button variant="success" onClick={() => navigate('/update', { state: permission })} >Modificar</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default ListPermissionPage