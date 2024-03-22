import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";
import Background from "../components/Background";

const ResultForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    className: "", // Class dropdown will set this value
    annualExam: "",
    test: "",
  });
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      setError("");
      setLoading(true);
      await axios.post("https://mgvmserver.onrender.com/api/students/create", formData);
      // Reset form after successful submission
     
      setFormData({
        name: "",
        rollNo: "",
        className: "",
        annualExam: "",
        test: "",
      });
      alert("Student details saved successfully");
    } catch (err) {
      setError(err.response.data.error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <>
    <Background/>
    <Container className="resultFormContainer">

    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" dismissible>{error}</Alert>}
      <Form.Group controlId="formName" className="form_input">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formRollNo" className="form_input">
        <Form.Label>Roll No</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter roll number"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formClass" className="form_input">
        <Form.Label>Class</Form.Label>
        <Form.Control
          as="select"
          name="className"
          value={formData.className}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>
          {[...Array(9)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formRollNo" className="form_input">
        <Form.Label>Annual Result (Total Number)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Annual Total number"
          name="annualExam"
          value={formData.annualExam}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formRollNo" className="form_input">
        <Form.Label>Test Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Test number"
          name="test"
          value={formData.test}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <button  type="submit" className="button-83 text-xl m-3" role="button">
        {loading ?'Submitting':'Submit'}
      </button>
    </Form>
    </Container>
    </>
  );
};

export default ResultForm;
