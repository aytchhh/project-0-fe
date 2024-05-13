import { useState } from "react";
import { Modal, Button, Form, ModalHeader, ModalTitle, ModalBody, FormControl, ModalFooter } from 'react-bootstrap'
import { getUserByUsername } from "../../api";

function LoginForm({ login, setLogin, showForm, setShowForm, user, setUser }) {
    const [username, setUsername] = useState('')
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState(null)


    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        
        if (!username) {
            e.preventDefault();
            setError("please provide a username");
            return
        }

        if (form.checkValidity()===false) { e.preventDefault() } 
        
        else {
            getUserByUsername(username)
                .then((data)=>{
                    setUser(data)
                    setLogin(true)
                    setError(null)
                    setShowForm(false)
                })
                .catch((err)=>{
                    setValidated(false)
                    setError(err.response.data.message)
                })
        }
    }

    return (
        <>
            <Modal show={showForm} onHide={()=>{setShowForm(false); 
                                                setUsername('');
                                                setValidated(false)
                                                setError(null)
                                                }} centered>
                <ModalHeader closeButton>
                    <ModalTitle>Log In</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormControl
                            required 
                            type="text" 
                            placeholder="Username" 
                            autoFocus
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value); setValidated(true)}}
                            isInvalid={error !== null}
                        />
                        <Form.Text className="text-muted">
                            &nbsp;&nbsp;&nbsp; tickle122 &nbsp; grumpy19 &nbsp; happyamy2016 &nbsp; cooljmessy &nbsp; weegembump &nbsp; jessjelly
                        </Form.Text>
                        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
                        
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button variant="primary" onClick={handleSubmit}>Log In</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default LoginForm;