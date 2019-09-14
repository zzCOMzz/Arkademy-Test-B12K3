import React, { useState, useContext } from "react";
import { Table, Button, Modal, TextInput, Select } from "react-materialize";
import axios from "axios";
import sweet from "sweetalert";
import logoApus from "../assets/delete.png";
import logoEdit from "../assets/edit.png";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            link: "http://localhost:3030/api/",
            salary: [],
            work: [],
            isEdit: false,
            selectedPegawai: {}
        };
    }

    componentDidMount() {
        axios
            .get(this.state.link + "pegawai")
            .then(({ data }) => this.setState(data));
        axios
            .get(this.state.link + "salary")
            .then(({ data }) => this.setState({ salary: data.data }));
        axios
            .get(this.state.link + "work")
            .then(({ data }) => this.setState({ work: data.data }));
    }

    delete(id) {
        axios.delete(this.state.link + `pegawai/${id}`).then(() => {
            sweet({
                title: "Are you sure?",
                text: "Are you sure that you want to delete this data?",
                icon: "warning",
                dangerMode: true,
                buttons: {
                    cancel: true,
                    confirm: true
                }
            }).then(Delete => {
                if (Delete) {
                    sweet("Deleted!", "", "success");
                    this.setState({
                        data: this.state.data.filter(item => item.id !== id)
                    });
                }
            });
        });
    }

    render() {
        const user = this.state.data;
        console.log(this.state.salary);
        return (
            <div className="container" style={{ marginTop: "40px" }}>
                <Button
                    href="#modal"
                    onClick={() =>
                        this.setState({ isEdit: false, selectedPegawai: {} })
                    }
                    className="waves-effect waves-light btn modal-trigger"
                    style={{
                        float: "right",
                        backgroundColor: "#F3AC13",
                        borderRadius: "10px",
                        width: "100px"
                    }}
                >
                    Add
                </Button>
                <Table className="centered responsive-table highlight">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Work</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.work}</td>
                                    <td>{item.salary}</td>
                                    <td>
                                        <Button
                                            className="waves-effect waves-light btn-flat"
                                            onClick={() => this.delete(item.id)}
                                        >
                                            <img
                                                style={{
                                                    width: 35,
                                                    height: 35
                                                }}
                                                src={logoApus}
                                                alt="delete"
                                            />
                                        </Button>
                                        <Button
                                            href="#modal"
                                            onClick={() =>
                                                this.setState({
                                                    isEdit: true,
                                                    selectedPegawai: item
                                                })
                                            }
                                            className="waves-effect waves-light btn-flat modal-trigger"
                                        >
                                            <img
                                                style={{
                                                    width: 35,
                                                    height: 35
                                                }}
                                                src={logoEdit}
                                                alt="Edit"
                                            />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <OpenModal
                    edit={this.state.isEdit}
                    salary={this.state.salary}
                    work={this.state.work}
                    pegawai={
                        this.state.isEdit ? this.state.selectedPegawai : {}
                    }
                />
            </div>
        );
    }
}

class OpenModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salaryState: props.pegawai.id_salary || "",
            workState: props.pegawai.id_work || "",
            name: props.pegawai.name || ""
        };
    }
    addData() {
        axios
            .post("http://localhost:3030/api/pegawai", {
                name: this.state.name,
                id_work: this.state.workState,
                id_salary: this.state.salaryState
            })
            .then(({ data }) => {
                sweet(data.message, "", "success").then(() => {
                    window.location.href = "";
                });
            });
    }
    editData() {
        axios
            .put("http://localhost:3030/api/pegawai/" + this.props.pegawai.id, {
                name: this.state.name,
                id_work: this.state.workState,
                id_salary: this.state.salaryState
            })
            .then(({ data }) => {
                sweet(data.message, "", "success").then(() => {
                    window.location.href = "";
                });
            });
    }
    render() {
        return (
            <div>
                <Modal
                    id="modal"
                    header={this.props.edit ? "EDIT DATA" : "ADD DATA"}
                    actions={[
                        <Button
                            onClick={() =>
                                this.props.edit
                                    ? this.editData()
                                    : this.addData()
                            }
                            style={{
                                float: "right",
                                backgroundColor: "#F3AC13",
                                borderRadius: "10px",
                                width: "100px"
                            }}
                        >
                            {this.props.edit ? "EDIT" : "ADD"}
                        </Button>,
                        <Button waves="green" modal="close" flat>
                            Cancel
                        </Button>
                    ]}
                >
                    <TextInput
                        label="Name.."
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <Select
                        value={this.state.workState}
                        onChange={e =>
                            this.setState({ workState: e.target.value })
                        }
                    >
                        <option value="" disabled>
                            Choose your option
                        </option>
                        {this.props.work.map(item => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </Select>
                    <Select
                        value={this.state.salaryState}
                        onChange={e =>
                            this.setState({ salaryState: e.target.value })
                        }
                    >
                        <option value="" disabled>
                            Choose your option
                        </option>
                        {this.props.salary.map(item => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.salary}
                                </option>
                            );
                        })}
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default DataTable;
