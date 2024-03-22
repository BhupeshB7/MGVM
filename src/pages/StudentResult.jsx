import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Table from "react-bootstrap/Table";
import axios from "axios";

const StudentResult = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/students?page=${currentPage}`
        );
        setStudents(response.data.students);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Background />
      <Container>
        <button
          onClick={() => navigate("/admin/result/add")}
          className="button-83 text-xl m-2"
          role="button"
        >
          Add Result
        </button>
        <div className="allResults">
          <p className="text-2xl">All Students Results</p>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Annual Result</th>
                <th>Test</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => {
                const total = item.annualExam + item.test;
                const percentage = ((total * 100) / 690);
                return (
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.className}</td>
                    <td>{item.rollNo}</td>
                    <td>{item.annualExam}</td>
                    <td>{item.test}</td>
                    <td>{total}</td>
                    <td>{percentage.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
          <div className="flex flex-row justify-center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="dark "
              className="m-1"
              style={{ width: "100px" }}
            >
              Prev
            </Button>
            <p className="text-2xl">
              {" "}
              {currentPage}/{totalPages}
            </p>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="dark "
              className="m-1"
              style={{ width: "100px" }}
            >
              Next
            </Button>
          </div>
      </Container>
    </div>
  );
};

export default StudentResult;
