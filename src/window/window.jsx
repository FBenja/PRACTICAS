import  { useState } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import { FiMenu, FiRefreshCw, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function ClientManagement() {
    const [clients, setClients] = useState([
        { id: 1, nombre: 'Juan', apellido: 'Pérez' },
        { id: 2, nombre: 'María', apellido: 'González' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newClient, setNewClient] = useState({ nombre: '', apellido: '' });
    const [editingClient, setEditingClient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);

    const filteredClients = clients.filter(client =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClient = (e) => {
        e.preventDefault();
        if (newClient.nombre && newClient.apellido) {
            setClients([...clients, { ...newClient, id: clients.length + 1 }]);
            setNewClient({ nombre: '', apellido: '' });
        }
    };

    const handleUpdateClient = () => {
        if (editingClient.nombre && editingClient.apellido) {
            setClients(clients.map(client =>
                client.id === editingClient.id ? editingClient : client
            ));
            setShowEditModal(false);
        }
    };

    const handleDeleteClient = () => {
        setClients(clients.filter(client => client.id !== clientToDelete.id));
        setShowDeleteModal(false);
    };

    const refreshClients = () => {
        // In a real application, this would fetch clients from an API
        console.log("Refreshing clients...");
    };

    return (
        <Container fluid className="vh-100 d-flex p-0">
            {/* Sidebar */}
            <div className="bg-dark text-white" style={{ width: '200px' }}>
                <Button variant="outline-light" className="w-100 text-start mt-3 mb-3">
                    <FiMenu className="me-2" /> Menú
                </Button>
                <div className="d-flex flex-column">
                    <Button variant="dark" className="text-start">Base de Datos</Button>
                    <Button variant="dark" className="text-start">Registrar</Button>
                    <Button variant="dark" className="text-start">Actualizar</Button>
                    <Button variant="dark" className="text-start">Eliminar</Button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-grow-1 bg-secondary p-4">
                <h1 className="text-white mb-4">Clientes</h1>

                {/* Search and Add Client Form */}
                <Form className="mb-3">
                    <Row>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Buscar clientes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={newClient.nombre}
                                onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                value={newClient.apellido}
                                onChange={(e) => setNewClient({ ...newClient, apellido: e.target.value })}
                            />
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" onClick={handleAddClient}>Agregar Cliente</Button>
                        </Col>
                    </Row>
                </Form>

                {/* Clients Table */}
                <div className="bg-dark rounded p-3">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>N° cliente</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.nombre}</td>
                                    <td>{client.apellido}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => {
                                            setEditingClient(client);
                                            setShowEditModal(true);
                                        }}>
                                            <FiEdit />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => {
                                            setClientToDelete(client);
                                            setShowDeleteModal(true);
                                        }}>
                                            <FiTrash2 />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <Button variant="outline-light" onClick={refreshClients}>
                        <FiRefreshCw />
                    </Button>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingClient?.nombre || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, nombre: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingClient?.apellido || ''}
                                onChange={(e) => setEditingClient({ ...editingClient, apellido: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateClient}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro que desea eliminar al cliente {clientToDelete?.nombre} {clientToDelete?.apellido}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteClient}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}